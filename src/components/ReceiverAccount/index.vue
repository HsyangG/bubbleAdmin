<template>
  <div class="receiver_account">
     <a-input-group compact>
      <a-select v-model="type" style="width: 130px;" @change="handleTypeChange">
        <a-select-option value="alipay">支付宝</a-select-option>
        <a-select-option value="bank">银行账户</a-select-option>
      </a-select>
      <a-input style="width: calc(100% - 130px)" v-model="number" placeholder="请输入收款账号" @change="handleNumberChange" />
    </a-input-group>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data () {
    // type和number从this.value里面解构出来
    const { type, number } = this.value || {}
    return {
      type: type || 'alipay',
      number: number || ''
    }
  },
  watch: {
    value (val) {
      // 当value发生变化的时候，将值同步到data中
      Object.assign(this, val)
    }
  },
  methods: {
    handleTypeChange (val) {
      // 当type发生改变的时候，将传进来的value解构并传递出去
      this.$emit('change', { ...this.value, type: val })
    },handleNumberChange (e) {
      this.$emit('change', { ...this.value, number: e.target.value })
    }
  }
}
</script>
