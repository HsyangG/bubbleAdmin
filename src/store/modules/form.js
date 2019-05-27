import router from '@/router'
// import request from '@/utils/request'
import { getForm } from '@/api/form'

const state = {
  step: {
    payAccount: '123456',
    receiverAccount: {
      type: 'alipay',
      number: ''
    }
  }
}

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await getForm(payload)
    commit('saveStepFormData', { payload })
    router.push('/form/step_form/result')
  }
}

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    }
  }
}

export default {
  namespace: true,
  state,
  actions,
  mutations
}