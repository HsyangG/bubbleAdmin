<template>
  <div class="echarts">
    <div ref="echartDom" :style="{height: height + 'px'}"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
// 通过resize-detector，监听到父元素的DOM发生改变，则重新渲染ECharts，否则ECharts渲染会有问题
import { addListener, removeListener } from 'resize-detector'
// 通过lodash来进行防抖处理
import debounce from 'lodash/debounce'
export default {
  props: {
    height: {
      type: Number,
      default: 300
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      charts: null
    }
  },
  watch: {
    // 当option更新时，页面要动态更新数据
    // 当option里面的某一项数据更新了下面的监听方式没有效果，需要深度监听，但是很消耗性能
    option (val) {
      this.charts.setOption(val)
    }
    // option: {
    //   handler(val) {
    //     this.charts.setOption(val)
    //   },
    //   deep: true
    // }
  },
  created () {
    // 在创建实例时开始处理resize的抖动（即执行多次的情况）
    this.resize = debounce(this.resize, 300)
  },
  mounted () {
    this.renderChart()
    addListener(this.$refs.echartDom, this.resize)
    // 使用刚指定的配置项和数据显示图表。
  },
  methods: {
    resize () {
      // 这里会执行多次，需要进行防抖处理
      console.log('resize')
      this.charts.resize()
    },
    renderChart () {
      // 基于准备好的dom，初始化echarts实例
      // 增强组件的可扩展性，所有的图表元素由父元素传递进来
      this.charts = echarts.init(this.$refs.echartDom);
      this.charts.setOption(this.option)
    }
  },
  beforeDestroy () {
    // 组件销毁前移除事件监听
    removeListener(this.$refs.echartDom, this.resize)
    // 同时销毁ECharts实例，防止内存泄漏
    this.charts.dispose()
    this.charts = null
  }
}
</script>

