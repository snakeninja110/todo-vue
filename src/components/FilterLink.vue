<template>
  <a :class="{ selected : filter === visibilityFilter}" @click="setFilter">
    <slot></slot>
  </a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    filter: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'visibilityFilter'
    ])
  },
  methods: {
    setFilter () {
      console.log(this.filter)
      this.setVisibilityFilter(this.filter)
    },
    ...mapActions([
      'setVisibilityFilter'
    ])
  }
}
</script>

<style scoped lang="stylus">
a, span
  color: inherit
  margin: 3px
  padding: 3px 7px
  text-decoration: none
  border: 1px solid transparent
  border-radius: 3px
a.selected, a:hover,
span.selected, span:hover
  border-color: rgba(175, 47, 47, 0.1)
a.selected, span.selected
  border-color: rgba(175, 47, 47, 0.2)
</style>
