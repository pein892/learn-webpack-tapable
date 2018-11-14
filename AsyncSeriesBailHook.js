const { AsyncSeriesBailHook } = require('tapable')

// let queue1 = new AsyncSeriesBailHook(['name'])
// console.time('cost1')
// queue1.tap('1', function (name) {
//   console.log(name, 1)
//   return 'Wrong'
// })
// queue1.tap('2', function (name) {
//   console.log(name, 2)
// })
// queue1.tap('3', function (name) {
//   console.log(name, 3)
// })
// queue1.callAsync('webpack', err => {
//   console.log(err)
//   console.timeEnd('cost1')
// })

//执行结果：
/**
webpack 1
null
cost1: 7.121ms
 */

// let queue2 = new AsyncSeriesBailHook(['name'])
// console.time('cost2')
// queue2.tapAsync('1', function (name, callback) {
//   setTimeout(() => {
//     console.log(name, 1)
//     callback()
//   }, 1000)
// })
// queue2.tapAsync('2', function (name, callback) {
//   setTimeout(() => {
//     console.log(name, 2)
//     callback('wrong')
//   }, 2000)
// })
// queue2.tapAsync('1', function (name, callback) {
//   setTimeout(() => {
//     console.log(name, 3)
//     callback()
//   }, 3000)
// })
// queue2.callAsync('webpack', err => {
//   console.log(err)
//   console.log('over')
//   console.timeEnd('cost2')
// })
//执行结果
/**
webpack 1
webpack 2
wrong
over
cost2: 3014.838ms
 */

let queue3 = new AsyncSeriesBailHook(['name'])
console.time('cost3')
queue3.tapPromise('1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, 1)
      resolve()
    }, 1000)
  })
})
queue3.tapPromise('2', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, 2)
      reject()
    }, 2000)
  })
})
queue3.tapPromise('1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, 3)
      resolve()
    }, 3000)
  })
})
queue3.promise('webpack').then((err) => {
  console.log(err)
  console.log('over')
  console.timeEnd('cost3')
}, (err) => {
  console.log(err)
  console.log('error')
  console.timeEnd('cost3')
})
//执行结果：
/**
webpack 1
webpack 2
undefined
error
cost3: 3016.015ms
 */