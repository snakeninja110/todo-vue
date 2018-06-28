<template>
  <transition-group tag="ul" class="todo-list" name="fade-list">
    <Item v-for="item in shownlist" :key="item.uuid" :item="item"></Item>
  </transition-group>
</template>

<script>
import Item from './Item'
export default {
  props: {
    shownlist: {
      type: Array,
      default: null
    }
  },
  components: {
    Item
  }
}
</script>

<style scoped lang="stylus">
  .fade-list-enter-active, .fade-list-leave-active
    transition all .4s
  .fade-list-enter, .fade-list-leave-to
    opacity .5
    transform translate3d(600px, 0, 0)

  .todo-list
    margin: 0
    padding: 0
    list-style: none

  /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
  */
  @media screen and (-webkit-min-device-pixel-ratio:0)
    .todo-list li .toggle
      background: none

    .todo-list li .toggle
      height: 40px

</style>
