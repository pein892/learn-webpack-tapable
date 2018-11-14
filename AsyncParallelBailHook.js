const { AsyncParallelBailHook } = require('tapable')

// let queue1 = new AsyncParallelBailHook(['name'])
// console.time('cost')
// queue1.tap('1', function (name) {
//     console.log(name, 1)
// })
// queue1.tap('2', function (name) {
//     console.log(name, 2)
//     return 'wrong'
// })
// queue1.tap('3', function (name) {
//     console.log(name, 3)
// })
// queue1.callAsync('webpack', err => {
//     console.timeEnd('cost')
// })

//执行结果：
/**
webpack 1
webpack 2
cost: 4.363ms
 */

// let queue2 = new AsyncParallelBailHook(['name'])
// console.time('cost2')
// queue2.tapAsync('1', function (name, cb) {
//     setTimeout(() => {
//         console.log(name, 1)
//         cb()
//     }, 1000);
// })
// queue2.tapAsync('2', function (name, cb) {
//     setTimeout(() => {
//         console.log(name, 2)
//         return 'wrong'  //最后的回调就不会调用了
//         cb()
//     }, 2000);
// })
// queue2.tapAsync('3', function (name, cb) {
//     setTimeout(() => {
//         console.log(name, 3)
//         cb()
//     }, 3000);
// })
// queue2.callAsync('webpack', () => {
//     console.log('over')
//     console.timeEnd('cost2')  
// })

//执行结果：
/**
webpack 1
webpack 2
webpack 3
 */

let queue3 = new AsyncParallelBailHook(['name'])
console.time('cost3')
queue3.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 1)
            resolve()
        }, 1000);
    })
})
queue3.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 2)
            reject('wrong')
        }, 2000);
    })
})
queue3.tapPromise('3', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 3)
            resolve()
        }, 3000);
    })
})
queue3.promise('webpack')
    .then(() => {
        console.log('over')
        console.timeEnd('cost3')
    }, () => {
        console.log('error')
        console.timeEnd('cost3')
    })

//执行结果：
/**
webpack 1
webpack 2
error
cost3: 2005.338ms
webpack 3
 */