<template>
  <footer class="footer" >
    <span class="todo-count">
      <strong>{{ activeCount }}</strong> {{ item }} left
    </span>
    <ul class="filters">
      <li v-for="(filter, key) in FILTER_TITLES" :key="filter">
        <FilterLink :filter="key">{{ filter }}</FilterLink>
      </li>
    </ul>
    <button class="clear-completed" v-if="completedCount > 0" @click="clearCompleted">
      Clear completed
    </button>
  </footer>
</template>

<script>
import Toolkit from '../common/util/util'
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants/constants'
import { mapActions } from 'vuex'
import FilterLink from './FilterLink'

export default {
  name: 'Footer',
  props: {
    activeCount: {
      type: Number,
      default: 0
    },
    completedCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      title: '',
      FILTER_TITLES: {
        [ALL_TODOS]: 'All',
        [ACTIVE_TODOS]: 'Active',
        [COMPLETED_TODOS]: 'Completed'
      }
    }
  },
  computed: {
    item () {
      return Toolkit.util.pluralize(this.activeCount, 'item')
    }
  },
  methods: {
    clearCompleted () {
      this.clearAllCompleted()
    },
    ...mapActions([
      'clearAllCompleted'
    ])
  },
  components: {
    FilterLink
  }
}
</script>

<style scoped lang="stylus">
  .footer
    color: #777
    padding: 10px 15px
    height: 20px
    text-align: center
    border-top: 1px solid #e6e6e6
    &:before
      content: ''
      position: absolute
      right: 0
      bottom: 0
      left: 0
      height: 40px
      overflow: hidden
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
        0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2),
        0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2)
    .todo-count
      float: left
      text-align: left
      strong
        font-weight: 300
    .filters
      margin: 0
      padding: 0
      list-style: none
      position: absolute
      right: 0
      left: 0
      li
        display: inline

    .clear-completed, .clear-completed:active
      float: right
      position: relative
      line-height: 20px
      text-decoration: none
      cursor: pointer
      position: relative

      &:hover
        text-decoration: underline

  @media (max-width: 430px)
    .footer
      height: 50px

    .filters
      bottom: 10px

</style>
