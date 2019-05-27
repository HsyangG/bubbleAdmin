<template>
  <div class="step1">
    <div>
      <a-form layout="horizontal" :form="form">
        <a-form-item label="付款账户" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="['payAccount', {
            initialValue: step.payAccount,
            rules: [{required: true, message: '请输入付款账号'}]
          }]" 
          placeholder="请输入付款账户"></a-input>
        </a-form-item>
        <a-form-item label="收款账户" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <ReceiverAccount
            v-decorator="['receiverAccount', {
              initialValue: step.receiverAccount,
              rules: [{ required: true, message: '请输入收款账户',
                validator: (rule, value, callback) => {
                  // validator自定义校验
                  if (value && value.number) {
                    // 如果value有number，则通过校验
                    callback()
                  } else {
                    callback(false)
                  }
                } }]
            }]"></ReceiverAccount>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit">下一步</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import ReceiverAccount from '@/components/ReceiverAccount'
export default {
  components: {
    ReceiverAccount
  },
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
    handleSubmit () {
      // 将...从this中取出，不用写多余的this
      const { form, $router, $store } = this
      form.validateFields((err, values) => {
        if (!err) {
          // 这里只是将第一步的表单提交到vuex中，并不是调用dispatch提交到后台
          $store.commit({
            type: 'saveStepFormData',
            payload: values
          })
          $router.push('/form/step_form/confirm')
        }
      })
    }
  }
}
</script>
