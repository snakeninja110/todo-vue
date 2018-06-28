<template>
  <li :class="[completed , editing]" >
    <div class="view">
      <input class="toggle" type="checkbox" @click="toggle(item)" :checked="item.completed"/>
      <label @dblclick="onHandleEdit(item)">{{ item.title }}</label>
      <button class="destroy" @click="remove(item)"></button>
    </div>
    <input class="edit" v-model="query" ref="query" @blur="handleSubmit" @keydown="handleKeyDown"/>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      query: '',
      isEdit: false
    }
  },
  computed: {
    completed () {
      return this.item.completed ? 'completed' : ''
    },
    editing () {
      return this.isEdit ? 'editing' : ''
    }
  },
  methods: {
    toggle (item) {
      this.toggleATodo(this.item)
    },
    remove (item) {
      this.removeATodo(item)
    },
    onCancel () {
      this.isEdit = false
    },
    handleSubmit () {
      if (this.query) {
        let obj = {
          todo: this.item,
          text: this.query
        }
        this.saveATodo(obj)
      } else {
        this.removeATodo(this.item)
      }
      this.onCancel()
    },
    handleKeyDown (e) {
      if (e.keyCode === 13) {
        this.handleSubmit(e)
      } else if (e.keyCode === 27) {
        this.query = this.item.title
        this.onCancel()
      }
    },
    onHandleEdit (item) {
      this.query = item.title
      this.isEdit = true
      let $input = this.$refs.query
      this.$nextTick(() => {
        $input.focus()
        $input.setSelectionRange(this.query.length, this.query.length)
      })
    },
    ...mapActions([
      'toggleATodo',
      'removeATodo',
      'saveATodo'
    ])
  }
}
</script>

<style scoped lang="stylus">
  li
    position: relative
    font-size: 24px
    border-bottom: 1px solid #ededed

    &:last-child
      border-bottom: none
    &:hover
      .destroy
        display: block

    .edit
      display: none
      &:last-child
        margin-bottom: -1px

    .toggle
      text-align: center
      width: 40px
      /* auto, since non-WebKit browsers doesn't support input styling */
      height: auto
      position: absolute
      top: 0
      bottom: 0
      margin: auto 0
      border: none /* Mobile Safari */
      -webkit-appearance: none
      appearance: none

      &:after
        content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iLTEwIC0xOCAxMDAgMTM1Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWRlZGVkIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=')
        // content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="%23ededed" stroke-width="3"/></svg>')
        // 除非在全局入口处写入此样式，否则无法使用svg写法，只能用base64 出现原因未知
      &:checked
        &:after
          content url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iLTEwIC0xOCAxMDAgMTM1Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmRkYWQ1IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBmaWxsPSIjNWRjMmFmIiBkPSJNNzIgMjVMNDIgNzEgMjcgNTZsLTQgNCAyMCAyMCAzNC01MnoiLz48L3N2Zz4=')
          // content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="%23bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>')

    label
      white-space: pre-line
      word-break: break-all
      padding: 15px 60px 15px 15px
      margin-left: 45px
      display: block
      line-height: 1.2
      transition: color 0.4s

    .destroy
      display: none
      position: absolute
      top: 0
      right: 10px
      bottom: 0
      width: 40px
      height: 40px
      margin: auto 0
      font-size: 30px
      color: #cc9a9a
      margin-bottom: 11px
      transition: color 0.2s ease-out
      &:hover
        color: #af5b5e
      &:after
        content: '×'

  .completed
    label
      color: #d9d9d9
      text-decoration: line-through

  .editing
    border-bottom: none
    padding: 0
    .edit
      display: block
      width: 506px
      padding: 13px 17px 12px 17px
      margin: 0 0 0 43px
    .view
      display: none

@media screen and (-webkit-min-device-pixel-ratio:0)
  li .toggle
    background: none

  li .toggle
    height: 40px

</style>
