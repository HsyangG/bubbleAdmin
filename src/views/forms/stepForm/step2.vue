<template>
  <div class="step2">
    <div>
      <a-form layout="horizontal" :form="form">
        <a-form-item label="付款账户" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <div>{{step.payAccount}}</div>
        </a-form-item>
        <a-form-item label="支付密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="['password', {
            initialValue: step.password,
            rules: [{required: true, message: '请输入支付密码'}]
          }]" 
          type="password"
          placeholder="请输入支付密码"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button style="margin-right: 20px;" @click="toPrev">上一步</a-button>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    this.form = this.$form.createForm(this)
    return {}
  },
  computed: {
    step() {
      return this.$store.state.form.step
    }
  },
  methods: {
    toPrev () {
      this.$router.push('/form/step_form/info')
    },
    handleSubmit () {
      // 将...从this中取出，不用写多余的this
      const { form, $store } = this
      form.validateFields((err, values) => {
        if (!err && values) {
          // 调用dispatch提交到后台
          $store.dispatch({
            type: 'submitStepForm',
            payload: {...this.step, ...values}
          })
        }
      })
    }
  }
}
</script>
