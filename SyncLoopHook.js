const { SyncLoopHook } = require('tapable')
let queue = new SyncLoopHook(['name'])

let count = 3
queue.tap('1', function (name) {
    console.log('count: ', count--)
    if (count > 0) {
        return true
    }
    return
})

queue.call('webpack')