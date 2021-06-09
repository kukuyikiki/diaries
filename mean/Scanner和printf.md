# Scanner类

java.util.Scanner 是 Java5 的新特征，我们可以通过 Scanner 类来获取用户的输入。

下面是创建 Scanner 对象的基本语法：

```java
Scanner s = new Scanner(System.in);
```

接下来我们演示一个最简单的数据输入，并通过 Scanner 类的 next() 与 nextLine() 方法获取输入的字符串，在读取前我们一般需要 使用 hasNext 与 hasNextLine 判断是否还有输入的数据：



**使用 next 方法**

```java
import java.util.Scanner; 
 
public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        // 从键盘接收数据
 
        // next方式接收字符串
        System.out.println("next方式接收：");
        // 判断是否还有输入
        if (scan.hasNext()) {
            String str1 = scan.next();
            System.out.println("输入的数据为：" + str1);
        }
        scan.close();
    }
}
```

执行以上程序输出结果为：

```
next方式接收：
runoob com
输入的数据为：runoob
```

可以看到 *com 字符串并未输出*，接下来我们看 nextLine。



**使用 nextLine 方法：**

```java
import java.util.Scanner;
 
public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        // 从键盘接收数据
 
        // nextLine方式接收字符串
        System.out.println("nextLine方式接收：");
        // 判断是否还有输入
        if (scan.hasNextLine()) {
            String str2 = scan.nextLine();
            System.out.println("输入的数据为：" + str2);
        }
        scan.close();
    }
}
```

执行以上程序输出结果为：

```
nextLine方式接收：
runoob com
输入的数据为：runoob com
```

`可以看到 com 字符串输出。`

**next() 与 nextLine() 区别**

`next():`

- 1、一定要读取到有效字符后才可以结束输入。
- 2、对输入有效字符之前遇到的空白，next() 方法会自动将其去掉。
- 3、只有输入有效字符后才将其后面输入的空白作为分隔符或者结束符。
- next() 不能得到带有空格的字符串。

`nextLine()：`

- 1、以Enter为结束符,也就是说 nextLine()方法返回的是输入回车之前的所有字符。
- 2、可以获得空白。



**如果要输入 int 或 float 类型的数据，在 Scanner 类中也有支持，但是在输入之前最好先使用 hasNextXxx() 方法进行验证，再使用 nextXxx() 来读取：**

```java
import java.util.Scanner;
 
public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        // 从键盘接收数据
        int i = 0;
        float f = 0.0f;
        System.out.print("输入整数：");
        if (scan.hasNextInt()) {
            // 判断输入的是否是整数
            i = scan.nextInt();
            // 接收整数
            System.out.println("整数数据：" + i);
        } else {
            // 输入错误的信息
            System.out.println("输入的不是整数！");
        }
        System.out.print("输入小数：");
        if (scan.hasNextFloat()) {
            // 判断输入的是否是小数
            f = scan.nextFloat();
            // 接收小数
            System.out.println("小数数据：" + f);
        } else {
            // 输入错误的信息
            System.out.println("输入的不是小数！");
        }
        scan.close();
    }
}
```

执行以上程序输出结果为：

```
输入整数：12
整数数据：12
输入小数：1.2
小数数据：1.2
```



以下实例我们可以输入多个数字，并求其总和与平均数，每输入一个数字用回车确认，通过输入非数字来结束输入并输出执行结果：

```java
import java.util.Scanner;
 
class RunoobTest {
    public static void main(String[] args) {
        System.out.println("请输入数字：");
        Scanner scan = new Scanner(System.in);
 
        double sum = 0;
        int m = 0;
 
        while (scan.hasNextDouble()) {
            double x = scan.nextDouble();
            m = m + 1;
            sum = sum + x;
        }
 
        System.out.println(m + "个数的和为" + sum);
        System.out.println(m + "个数的平均值是" + (sum / m));
        scan.close();
    }
}
```

执行以上程序输出结果为（输入非数字来结束输入）：

```
请输入数字：
12
23
15
21.4
end
4个数的和为71.4
4个数的平均值是17.85
```

# Scanner中为什么会出现换行后才能打印全部

# Java中的printf

```
         单个字符 
          %d        十进制整数 
          %f        十进制浮点数 
          %o        八进制数 
          %s        字符串 
          %u        无符号十进制数 
          %x        十六进制数 
          %%        输出百分号%
```

**`printf的格式控制的完整格式：` **

<u>% - 0 m.n l或h</u> 格式字符 

**①%：表示格式说明的起始符号，不可缺少。** 
**②-：有-表示左对齐输出，如省略表示右对齐输出。** 
**③0：有0表示指定空位填0,如省略表示指定空位不填。** 
**④m.n：m指域宽，即对应的输出项在输出设备上所占的字符数。N指精度。用于说明输出的实型数的小数位数。为指定n时，隐含的精度为n=6位。** 
**⑤l或h:l对整型指long型，对实型指double型。h用于将整型的格式字符修正为short型。** 



`**格式字符** `

格式字符用以指定输出项的数据类型和输出格式。 
①d格式：用来输出十进制整数。有以下几种用法： 
 %d：按整型数据的实际长度输出。 
 %md：m为指定的输出字段的宽度。如果数据的位数小于m，则左端补以空格，若大于m，则按实际位数输出。 
 %ld：输出长整型数据。 
②o格式：以无符号八进制形式输出整数。对长整型可以用"%lo"格式输出。同样也可以指定字段宽度用“%mo”格式输出。 
例： 

```java
   main() { 
     int a = -1; 
     printf("%d, %o", a, a); 
   } 
```

 运行结果：-1,177777 

 程序解析：-1在内存单元中（以补码形式存放）为(1111111111111111)2，转换为八进制数为(177777)8。 





```java
public class TestPrintf { 
    public static void main(String[] args) { 
        //定义一些变量，用来格式化输出。 
        double d = 345.678; 
        String s = "你好！"; 
        int i = 1234; 
        //"%"表示进行格式化输出，"%"之后的内容为格式的定义。 
        System.out.printf("%f",d); //"f"表示格式化输出浮点数。 
        System.out.println(); 
        System.out.printf("%9.2f",d); //"9.2"中的9表示输出的长度，2表示小数点后的位数。 
        System.out.println(); 
        System.out.printf("%+9.2f",d); //"+"表示输出的数带正负号。 
        System.out.println(); 
        System.out.printf("%-9.4f",d); //"-"表示输出的数左对齐（默认为右对齐）。 
        System.out.println(); 
        System.out.printf("%+-9.3f",d); //"+-"表示输出的数带正负号且左对齐。 
        System.out.println(); 
        System.out.printf("%d",i); //"d"表示输出十进制整数。 
        System.out.println(); 
        System.out.printf("%o",i); //"o"表示输出八进制整数。 
        System.out.println(); 
        System.out.printf("%x",i); //"d"表示输出十六进制整数。 
        System.out.println(); 
        System.out.printf("%#x",i); //"d"表示输出带有十六进制标志的整数。 
        System.out.println(); 
        System.out.printf("%s",s); //"d"表示输出字符串。 
        System.out.println(); 
        System.out.printf("输出一个浮点数：%f，一个整数：%d，一个字符串：%s",d,i,s); 
        //可以输出多个变量，注意顺序。 
        System.out.println(); 
        System.out.printf("字符串：%2$s，%1$d的十六进制数：%1$#x",i,s); 
        //"X$"表示第几个变量。 
    } 
}
```



























