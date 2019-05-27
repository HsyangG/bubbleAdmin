<script>
/**
 * 权限控制组件 函数式组件
 */
import {check} from '@/utils/auth'
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  /**
   * params h -> createdElement
   * params context -> 可以从中取出props和slot
   */
  render(h, context) {
    // slot可以挂载到scopedSlots上，无论是具名插槽还是作用域插槽
    const {props, scopedSlots} = context
    // 如果校验通过则返回插槽，即显示子组件，否则返回null
    return check(props.authority) ? scopedSlots.default() : null
  }
}
</script>
