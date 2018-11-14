const { AsyncParallelHook } = require("tapable")

let queue1 = new AsyncParallelHook(['name'])
console.time('cost')
queue1.tap('1', function (name) {
    console.log(name, 1)
})
queue1.tap('2', function (name) {
    console.log(name, 2)
})
queue1.tap('3', function (name) {
    console.log(name, 3)
})
queue1.callAsync('webpack', err => {
    console.timeEnd('cost')
})

//执行结果：
/*
webpack 1
webpack 2
webpack 3
cost: 5.365ms
*/

let queue2 = new AsyncParallelHook(['name'])
console.time('cost2')
queue2.tapAsync('1', function (name, cb) {
    setTimeout(() => {
        console.log(name, 1)
        cb()
    }, 1000)
})
queue2.tapAsync('2', function (name, cb) {
    setTimeout(() => {
        console.log(name, 2)
        cb()
    }, 2000)
})
queue2.tapAsync('3', function (name, cb) {
    setTimeout(() => {
        console.log(name, 3)
        cb()
    }, 3000);
})
queue2.callAsync('webpack', () => {
    console.log('over')
    console.timeEnd('cost2')
})

/*
webpack 1
webpack 2
webpack 3
over
cost2: 3003.412ms
*/

let queue3 = new AsyncParallelHook(['name'])
console.time('cost3')
queue3.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 1)
            resolve()
        }, 1000);
    })
})
queue3.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 2)
            resolve()
        }, 2000);
    })
})
queue3.tapPromise('1', function (name, cb) {
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
/*
webpack 1
webpack 2
webpack 3
over
cost3: 3009.033ms
*/