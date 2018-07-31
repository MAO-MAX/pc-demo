<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="个人信息">
      <cell title="姓名" value="Tom" is-link></cell>
      <cell title="性别" value="man" is-link></cell>
      <cell title="爱好" value="football" is-link></cell>
      <cell title="行业" value="IT" is-link></cell>
      <cell title="手机号" value="18956895987" is-link></cell>
    </group>
    <x-button text="提交" type="primary" disabled></x-button>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'

export default {
    components: {
        Group,
        Cell,
        XButton
    },
    data () {
        return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
            msg: 'Hello World!'
        }
    },
    methods: {
        test () {
            this.$vux.alert.show('**********')
        }
    }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
