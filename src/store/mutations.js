import * as types from './mutation-types'

const mutations = {
  [types.SET_TODOS] (state, todos) {
    state.todos = todos
  },
  [types.SET_VISIBILITYFILTER] (state, visibilityfilter) {
    state.visibilityFilter = visibilityfilter
  }
}

export default mutations
