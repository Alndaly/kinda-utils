# @kinda/utils

自己封装好了的一些前端方法库

## `to`

省去了在使用await时每次都需要进行包装try...catch的操作

```ts
const a = async (params: number) => {
    return new Promise((resolve,reject) => {
        if (params == 1) {
            resolve(1)
        } else {
            reject(2)
        }
    })
}
const [ res, err ] = await to(a(1))
console.log(res, err)
```