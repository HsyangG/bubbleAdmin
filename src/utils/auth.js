export function getCurrentAuthority () {
  // 通过调用后台接口获取权限列表
  // 这里为了方便，直接写死
  return ['admin']
}
/**
 * 校验权限
 * 传入需要校验的用户权限
 * 与后台返回的权限对比
 * 如果符合则返回true
 */
export function check (authority) {
  const current = getCurrentAuthority()
  return current.some(item => authority.includes(item))
}
/**
 * 获取登录权限
 */
export function isLogin () {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}