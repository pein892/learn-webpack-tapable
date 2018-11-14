const { AsyncSeriesWaterfallHook } = require('tapable')

// let queue1 = new AsyncSeriesWaterfallHook(['name'])
// console.time('cost1')
// queue1.tap('1', function (name) {
//   console.log(name, 1)
//   return 'lily'
// })
// queue1.tap('2', function (data) {
//   console.log(2, data)
//   return 'Tom'
// })
// queue1.tap('3', function (data) {
//   console.log(3, data)
// })
// queue1.callAsync('webpack', err => {
//   console.log(err)
//   console.log('over')
//   console.timeEnd('cost1')
// })

//执行结果：
/**
webpack 1
2 'lily'
3 'Tom'
null
over
cost1: 5.391ms
 */

// let queue2 = new AsyncSeriesWaterfallHook(['name'])
// console.time('cost2')
// queue2.tapAsync('1', function (name, callback) {
//   setTimeout(() => {
//     console.log('1: ', name)
//     callback(null, 2)
//   }, 1000)
// })
// queue2.tapAsync('2', function (data, callback) {
//   setTimeout(() => {
//     console.log('2: ', data)
//     callback(null, 3)
//   }, 2000)
// })
// queue2.tapAsync('3', function (data, callback) {
//   setTimeout(() => {
//     console.log('3: ', data)
//     callback(null, 3)
//   }, 3000)
// })
// queue2.callAsync('webpack', err => {
//   console.log(err)
//   console.log('over')
//   console.timeEnd('cost2')
// })
//执行结果：
/**
1:  webpack
2:  2
3:  3
null
over
cost2: 6013.669ms
 */

let queue3 = new AsyncSeriesWaterfallHook(['name'])
console.time('cost3')
queue3.tapPromise('1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1: ', name)
      resolve()
    }, 1000)
  })
})
queue3.tapPromise('2', function (data, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2: ', data)
      resolve()
    }, 2000)
  })
})
queue3.tapPromise('1', function (data, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3: ', data)
      resolve()
    }, 3000)
  })
})

queue3.promise('webpack').then(err => {
  console.log(err)
  console.timeEnd('cost3')
}, err => {
  console.log(err)
  console.timeEnd('cost3')
})
//执行结果：
/**
1:  webpack
2:  webpack
3:  webpack
webpack
cost3: 6016.939ms
 */