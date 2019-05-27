import request from '@/utils/request'

export function getForm (payload) {
  request({
    url: '/api/form',
    method: 'post',
    data: payload
  })
}