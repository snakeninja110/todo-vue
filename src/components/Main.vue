<template>
  <section class='main' >
    <input class="toggle-all" type="checkbox" @change="toggleAll" :checked="activeCount === 0" v-if="todos && todos.length > 0" />
    <VisibleList :shownlist="getVisibleTodos" v-if="todos && todos.length > 0"></VisibleList>
    <Footer :activeCount="activeCount" :completedCount="completedCount" v-if="!!todos.length"></Footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants/constants'
import VisibleList from './VisibleList'
import Footer from './Footer'

export default {
  computed: {
    activeCount () {
      return this.todos.reduce((count, todo) => {
        return todo.completed ? count : count + 1
      }, 0)
    },
    completedCount () {
      return this.todos.length - this.activeCount
    },
    getVisibleTodos () {
      switch (this.visibilityFilter) {
        case COMPLETED_TODOS:
          return this.todos.filter(t => t.completed)
        case ACTIVE_TODOS:
          return this.todos.filter(t => !t.completed)
        case ALL_TODOS:
        default:
          return this.todos
      }
    },
    ...mapGetters([
      'todos',
      'visibilityFilter'
    ])
  },
  methods: {
    toggleAll (e) {
      this.toggleAllTodo(e.target.checked)
    },
    ...mapActions([
      'toggleAllTodo'
    ])
  },
  components: {
    VisibleList,
    Footer
  }
}
</script>

<style scoped lang="stylus">
  .main
    position: relative
    z-index: 2
    border-top: 1px solid #e6e6e6
  .toggle-all
    position: absolute
    top: -55px
    left: -12px
    width: 60px
    height: 34px
    text-align: center
    border: none /* Mobile Safari */
    &:before
      content: '❯'
      font-size: 22px
      color: #e6e6e6
      padding: 10px 27px 10px 27px
    &:checked
      &:before
        color: #737373

  /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
  */
  @media screen and (-webkit-min-device-pixel-ratio:0)
    .toggle-all
      background: none
      -webkit-transform: rotate(90deg)
      transform: rotate(90deg)
      -webkit-appearance: none
      appearance: none
</style>
