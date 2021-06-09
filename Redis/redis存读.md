# Redis的数据库

## 	Redis 对数据库进行了抽象，在 Redis 源码中，承担数据库角色的叫 redisDb。

我们暂且无需去了解 redisDb 的内部结构，我们可以站在一个更加宏观的角度去初步了解它，这样能得到一个更全局的认识。

​	Redis服务可以同时配置多个 redisDb，每个redisDb的数据是相互隔离的。那么怎么配置多个 redisDb 呢？有过 redis 实战经验的同学肯定会说，这太简单了，我们只需要在 redis 的配置文件中配置 databases 即可。redis 默认配置的 redisDb 数量为 16。

​	Redis 用 redisServer 表示服务，redisServer 中有个数组 db，用来记录所有的 redisDb。当 Redis 进程启动后，便会在 initServer（）中按照配置的 redisDb 数量，初始化好 Redis 服务的所有数据库。

```cpp
server.db = zmalloc(sizeof(redisDb)*server.dbnum);
```

## 	指定使用的数据库

​	每当一个新的客户端连接到 Redis 后，Redis 便会创建一个 client 对象来表示一个客户端连接，后续收到该客户端的所有命令，都会基于创建的 client 进行。Redis 在为新连接创建 client 时，便会为其分配数据库，即 redisDb。代码如下所示：

```cpp
client *createClient(int fd) {
    client *c = zmalloc(sizeof(client));
    ......
    selectDb(c,0);
    ......
}
```

selectDb（c，0）即为 client 分配 redisDb，第二个参数标志所分配的数据库在Redis服务中的索引，即第几个数据库。selectDb（）逻辑很简单：

```cpp
int selectDb(client *c, int id) {
    if (id < 0 || id >= server.dbnum)
        return C_ERR;
    c->db = &server.db[id];
    return C_OK;
}
```

现在我们知道了，事实上，所有客户端默认使用的都是Redis服务中的第一个redisDb。那么Redis 服务初始化这么多数据库干嘛呢？不是白费资源吗？

### 使用select命令

Redis 客户端有个 select 命令，使用 select 命令就可以选择使用那个 redisDb，这样不同客户端之间就实现了数据隔离。如调用 select 2，redis 服务在收到命令后，就会将该连接的数据库切换到索引为 2 的 redisDb。

# 数据库的内部结构

从宏观角度认识 redisDb 之后，我们便可以进入 redisDb 内部一探究竟。

```cpp
typedef struct redisDb {
    dict *dict;                 /* The keyspace for this DB */
    dict *expires;              /* Timeout of keys with a timeout set */
    dict *blocking_keys;        /* Keys with clients waiting for data (BLPOP)*/
    dict *ready_keys;           /* Blocked keys that received a PUSH */
    dict *watched_keys;         /* WATCHED keys for MULTI/EXEC CAS */
    int id;                     /* Database ID */
    long long avg_ttl;          /* Average TTL, just for stats */
    list *defrag_later;         /* List of key names to attempt to defrag one by one, gradually. */
} redisDb;
```

​	乍一看，redisDb 内部包括了好几个 dict，即字典。从注释来看，这些字典各有各的用处，如 dict 用来存放键值对，expires 用来存放key的超时时间。由此可见，**Redis 存放数据的核心便是这些字典了**

```cpp
typedef struct dictEntry {
    void *key;
    union {
        void *val;
        uint64_t u64;
        int64_t s64;
        double d;
    } v;
    struct dictEntry *next;
} dictEntry;

typedef struct dictType {
    uint64_t (*hashFunction)(const void *key);
    void *(*keyDup)(void *privdata, const void *key);
    void *(*valDup)(void *privdata, const void *obj);
    int (*keyCompare)(void *privdata, const void *key1, const void *key2);
    void (*keyDestructor)(void *privdata, void *key);
    void (*valDestructor)(void *privdata, void *obj);
} dictType;

/* This is our hash table structure. Every dictionary has two of this as we
 * implement incremental rehashing, for the old to the new table. */
typedef struct dictht {
    dictEntry **table;
    unsigned long size;
    unsigned long sizemask;
    unsigned long used;
} dictht;

typedef struct dict {
    dictType *type;
    void *privdata;
    dictht ht[2];
    long rehashidx; /* rehashing not in progress if rehashidx == -1 */
    unsigned long iterators; /* number of iterators currently running */
} dict;
```

​	dict 中利用 dictht 来存放数据，**dictht 其实就是 HashTable，本质也是通过计算 key 的 hash 值，将数据分布到不同的桶之中**。 这里比较有趣的是，**一个 dict 中有两个 dictht**，按道理只要一个 dictht 用来存放数据不就够了吗？其实平时用来存放数据的也就是 ht[0]，只有当要进行 rehash 的时候，才会使用 ht[1]，临时作为一个新的HashTable，存放新增数据。ht[0]中的存量数据会 rehash 到 ht[1] 中，等到 rehash 完成，ht[0] 就会再指向 ht[1] 的 dictht，完成职责交换。

​	**dictht 中存放着一个二维指针**：dictEntry **table ，第一维指针用来指向 dictEntry 链表，第二维指针指向dictEntry 链表中的某个dictEntry，dictEntry本身是也一个链表，记录着hash（key）相同的元素。

​	总结下，也就是说**真正用来存放数据的就是 dictEntry**，而 dictht 作为HashTable，将数据根据 key hash，存放到不同的 dictEntry 中，并通过 table 这个二维指针管理所有 dictEntry。

# 数据存取流程

## Redis 一共支持 5 种基础数据结构：

- string：字符串
- list：列表
- hash：字典
- set：集合
- zset：有序集合

我们从最简单的数据结构 string 入手，窥探下 Redis 内部设计。

​	在 Redis 客户端调用命令，Redis 服务收到命令后便会调用命令对应的处理函数，如调用 set a A ，Redis 对应的命令处理函数便为 t_string.c 中的 setCommand（）。 setCommand（）解析命令附带标志后，便调用了 setGenericCommand（）处理数据。

```java
void setGenericCommand(client *c, int flags, robj *key, robj *val, robj *expire, int unit, robj *ok_reply, robj *abort_reply) {
    ......
    setKey(c->db,key,val);
    ......
}
```

setGenericCommand（）中用来存放数据就一行代码，即 setKey(c->db,key,val)，将数据<key, value>存放到 client 对应的 redisDb 中。接下来的要看的逻辑，便就是 redisDb 如何存入 <key, value>了。

```java
void setKey(redisDb *db, robj *key, robj *val) {
    if (lookupKeyWrite(db,key) == NULL) {
        dbAdd(db,key,val);
    } else {
        dbOverwrite(db,key,val);
    }
    incrRefCount(val);
    removeExpire(db,key);
    signalModifiedKey(db,key);
}
```

setKey（）首先会查询数据库中是否已存在相同的key，如果不存在，就调用 dbAdd（）插入数据，否则调用 dbOverwrite（）覆盖掉旧数据。

废话不多说，我们直接看 dbAdd（）插入数据的逻辑：

```java
void dbAdd(redisDb *db, robj *key, robj *val) {
    sds copy = sdsdup(key->ptr);
    int retval = dictAdd(db->dict, copy, val);
    ......
}
```

上面逻辑主要分为两步：

（1）调用sdsdup（），将 key 的 C 字符串转化为 redis 自定义的 sds 字符串，之所以将字符串由普通的字符数组转化为 sds，主要就是为了效率考虑，sds 规避了普通字符数组的很多问题。

（2）调用dictAdd（），将 sds 类型的key ，和 val 一起存入redisDb 的字典 dict 中。

dictAdd（）逻辑也不复杂，代码如下：

```java
int dictAdd(dict *d, void *key, void *val)
{
    dictEntry *entry = dictAddRaw(d,key,NULL);

    if (!entry) return DICT_ERR;
    dictSetVal(d, entry, val);
    return DICT_OK;
}
```

dictAdd（）同样分两步走：

（1）从dict 中找到 key 对应的哈希桶。

（2）调用dictSetVal（），将 value 存放到哈希桶中。

到此，<key, value>就被成功的存储到数据库中了。

至于从 Redis 中读取数据，那就更加简单了，也就是根据 key，从 redisDb 的 dict 中找到对应的 dictEntry，并返回 dictEntry 中存放的 value。

# 总结

总结下上面的源码分析：

（1）Redis 默认会创建 16 个数据库：redisDb，每个数据库之间数据隔离。

（2）Redis 默认为每个客户端分配第 0 号索引的 redisDb，客户端可以调用 select 命令切换需要使用的数据库。

（3）redisDb 内部采用了 HashTable 结构存放数据。



### 存放到client对应的redisDb中

setKey(c->db,key,val)，将数据<key, value>存放到 client 对应的 redisDb 中。接下来的要看的逻辑，便就是 redisDb 如何存入 <key, value>了。

```java
void setKey(redisDb *db, robj *key, robj *val) {
    if (lookupKeyWrite(db,key) == NULL) {
        dbAdd(db,key,val);
    } else {
        dbOverwrite(db,key,val);
    }
    incrRefCount(val);
    removeExpire(db,key);
    signalModifiedKey(db,key);
}
```

setKey（）**首先会查询数据库中是否已存在相同的key**，如果**不存在**，就**调用 dbAdd（）插入数据**，否则调用 **dbOverwrite（）覆盖掉旧数据。**



dbAdd（）插入数据的逻辑：

```java
void dbAdd(redisDb *db, robj *key, robj *val) {
    sds copy = sdsdup(key->ptr);
    int retval = dictAdd(db->dict, copy, val);
    ......
}
```

上面逻辑主要分为两步：

（1）调用sdsdup（），将 key 的 C 字符串转化为 redis 自定义的 sds 字符串，之所以将字符串由普通的字符数组转化为 sds，主要就是为了效率考虑，sds 规避了普通字符数组的很多问题。

（2）调用dictAdd（），将 sds 类型的key ，和 val 一起存入redisDb 的字典 dict 中。

dictAdd（）逻辑也不复杂，代码如下：

```java
int dictAdd(dict *d, void *key, void *val)
{
    dictEntry *entry = dictAddRaw(d,key,NULL);

    if (!entry) return DICT_ERR;
    dictSetVal(d, entry, val);
    return DICT_OK;
}
```

dictAdd（）同样分两步走：

（1）从dict 中找到 key 对应的哈希桶。

（2）调用dictSetVal（），将 value 存放到哈希桶中。

到此，<key, value>就被成功的存储到数据库中了。

**查找：**根据 key，从 redisDb 的 dict 中找到对应的 dictEntry，并返回 dictEntry 中存放的 value。