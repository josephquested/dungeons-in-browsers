var redux = require('redux')
var morphdom = require('morphdom')
var reducer = require('./reducer')

module.exports = (roomid) => {
  var app = document.createElement('div')
  document.querySelector('main').appendChild(app)

  var initialState = { games: [] }
  var store = redux.createStore(reducer, initialState)

  store.subscribe(() => {
    var view = render(store.getState(), store.dispatch)
    morphdom(app, view)
  })

  function render (state, dispatch) {
    return require('./view')(state, store.dispatch)
  }

  // --- sockets --- //

  var io = require('socket.io-client')()
  io.emit('request-games')

  io.on('receive-games', (data) => {
    store.dispatch({type: 'UPDATE_GAMES', payload: data})
  })
}