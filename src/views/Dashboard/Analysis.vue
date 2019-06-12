<template>
  <div class="analysis">
    <a-date-picker></a-date-picker>
    <ECharts :option="chartOption" :height="400"></ECharts>
    <div class="toList">
      <input v-model="info" type="text"><button @click="addItem">添加</button>
      <ul>
        <TodoItem v-for="(item,index) in listData" :key="index">
          <template v-slot:item="itemProps">
            <span
              :style="{
                fontSize: '20px',
                color: itemProps.checked ? 'yellow' : 'blue'
              }">
              {{item}}
            </span>
          </template>
        </TodoItem>
      </ul>
      <!-- <ul>
        <li v-for="(item,index) in listData" :key="index">
          <input v-model="selected_box" type="checkbox">
          <span :style="{fontSize: '20px',color: selected_box ? 'yellow' : 'blue'}">{{item}}</span>
        </li>
      </ul> -->
    </div>
    <div class="text_show">
      <div class="show_title"></div>
      <div class="avatar">
        <img src="@/assets/01.jpg" alt="" style="width: 100%">
      </div>
    </div>
    <p>woshiwenzi</p>
    <aside class="common">
      {{getDate()}}
    </aside>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>
    <p>woshiwenzi</p>

  </div>
</template>
<script>
import ECharts from '@/components/ECharts'
import TodoItem from '@/views/Dashboard/todoItem'
export default {
  components: {
    ECharts,
    TodoItem
  },
  data () {
    return {
      chartOption: {
        // 指定图表的配置项和数据
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      },
      info: '',
      listData: [],
      selected_box: false
    }
  },
  methods: {
    addItem () {
      this.listData.push(this.info)
      this.info = ''
    },
    getDate() {
      // return new Date('2019-06-11 09:57:33')
      let nowDate =  Date.now()
      let day = new Date(nowDate)
      // return day
      let txtReg = /.yu/gi
      return txtReg.test('yyuissjxhgahhr')
    }
  }
}
</script>
<style scoped>
/* .analysis{
  background-image: url('./../../assets/jiemian.png');
  background-repeat: no-repeat;
  background-position: 70% 50%;
  background-attachment: fixed;
} */
.text_show{
  width: 100%;
  height: 700px;
  position: relative;
}
.show_title{
  width: 100%;
  height: 500px;
  background-image: url('./../../assets/jiemian.png');
  background-repeat: no-repeat;
  background-position: 70% 50%;
  /* background-attachment: fixed; */
  /* box-shadow: inset 0 -5px 10px rgba(0,0,0,0.3); */
}
.avatar{
  width: 200px;
  height: 250px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  /* box-shadow: 5px 5px 5px rgba(0,0,0,0.3) */
  box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  position: absolute;
  bottom: 120px;
  left: 100px;
}
/*对话框效果*/
.common{
  position: absolute;
  width: 7em;
  margin-top: -2.5em;
  margin-left: -9.5em;
  background: #def0ff;
  border-radius: 3px;
  word-break: break-all;
  padding: 5px;
}
.common::after{
  position: absolute;
  right: -1em;
  top: 0.5em;
  content: '';
  display: block;
  width: 0;
  height: 0;
  border: 0.5em solid #def0ff;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
}
</style>
