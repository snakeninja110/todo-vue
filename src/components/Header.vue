<template>
  <header class="header">
    <h1>Todos</h1>
    <input
      ref="query"
      v-model="query"
      class="new-todo"
      placeholder="What needs to be done?"
      @keydown.enter.prevent="handleKeyDown"
      />
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    handleKeyDown () {
      if (this.query) {
        this.addNewTodo(this.query)
        this.blur()
      }
    },
    blur () {
      // this.$refs.query.blur()
      this.query = ''
    },
    ...mapActions([
      'addNewTodo'
    ])
  }
}
</script>

<style scoped lang="stylus">
  .header
    .new-todo
      padding: 16px 16px 16px 60px
      border: none
      background: rgba(0, 0, 0, 0.003)
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03)

</style>
