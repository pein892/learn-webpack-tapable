const { SyncBailHook } = require('tapable')
let queue = new SyncBailHook(['name'])

queue.tap('1', function (name) {
    console.log(name, 1)
})
queue.tap('2', function (name) {
    console.log(name, 2)
    return 'wrong'
})
queue.tap('3', function (name) {
    console.log(name, 3)
})

queue.call('webpack')