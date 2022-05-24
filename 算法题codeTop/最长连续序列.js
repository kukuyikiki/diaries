/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    if (!nums || !nums instanceof Array) {
        return 0
    }
    const mySet = new Set()
    for (const num of nums) {
        mySet.add(num)
    }
    let max = 0
    for (let num of mySet) {
        if (!mySet.has(num - 1)) {
            let cur = 1
            while (mySet.has(num + 1)) {
                num++
                cur++
            }
            max = Math.max(cur, max)
        }
    }
    return max
};