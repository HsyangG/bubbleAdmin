<template>
  <div class="shops_list">
    <div class="filterContainer">
      <a-button type="primary" @click="onAdd">添加</a-button>
    </div>

    <a-modal
      :title="title"
      :visible="visible"
      width="800px"
      @ok="handleOK"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item label="商品名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品名称" v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="商品类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="form.type" allowClear width="300px" placeholder="请选择商品类型">
            <a-select-option v-for="item in shop_type" :key="item.id" :value="item.type">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品规格" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品规格" v-model="form.format"></a-input>
        </a-form-item>
        <a-form-item label="商品库存" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品库存" v-model="form.quantity"></a-input>
        </a-form-item>
        <a-form-item label="商品价格" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品价格" v-model="form.price"></a-input>
        </a-form-item>
        <a-form-item label="商品原价" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品原价，若不降价则填与价格相同的值即可" v-model="form.old_price"></a-input>
        </a-form-item>
        <a-form-item label="商品标签" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入降价商品标签" v-model="form.tag"></a-input>
        </a-form-item>
        <a-form-item label="商品特点" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品特点" v-model="form.specification"></a-input>
        </a-form-item>
        <a-form-item label="商品简介" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入商品简介" v-model="form.brief"></a-input>
        </a-form-item>
        <a-form-item label="商品描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input type="textarea" :rows="10" v-model="form.description"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-table
      :dataSource="list"
      bordered
      row-key="id"
      :pagination="pagination"
      style="background: #fff;margin-top: 20px;">
      <a-table-column title="ID" align="center" width="90px">
        <template slot-scope="scope">{{scope.id}}</template>
      </a-table-column>
      <a-table-column title="商品图片" align="center" width="150px">
        <template slot-scope="scope">
          <img v-if="scope.picture" :src="scope.picture" alt="" style="width: 100px;">
        </template>
      </a-table-column>
      <a-table-column title="商品名称" align="center" width="110px">
        <template slot-scope="scope">{{scope.name}}</template>
      </a-table-column>
      <a-table-column title="商品特点" align="center" width="110px">
        <template slot-scope="scope">{{scope.specification}}</template>
      </a-table-column>
      <a-table-column title="商品简介" align="center" width="110px">
        <template slot-scope="scope">{{scope.brief}}</template>
      </a-table-column>
      <a-table-column title="商品描述" align="center" width="150px">
        <template slot-scope="scope">{{scope.description}}</template>
      </a-table-column>
      <a-table-column title="商品规格" align="center" width="110px">
        <template slot-scope="scope">{{scope.format}}</template>
      </a-table-column>
      <a-table-column title="商品类型" align="center" width="110px">
        <template slot-scope="scope">{{scope.typeName}}</template>
      </a-table-column>
      <a-table-column title="商品库存" align="center" width="90px">
        <template slot-scope="scope">{{scope.quantity}}</template>
      </a-table-column>
      <a-table-column title="商品价格" align="center" width="90px">
        <template slot-scope="scope">{{scope.price}}</template>
      </a-table-column>
      <a-table-column title="商品原价" align="center" width="90px">
        <template slot-scope="scope">{{scope.old_price}}</template>
      </a-table-column>
      <a-table-column title="商品标签" align="center" width="110px">
        <template slot-scope="scope">{{scope.tag}}</template>
      </a-table-column>
      <a-table-column title="操作" align="center" width="300px">
        <template slot-scope="scope">
          <a-button type="primary" size="small" style="margin-right: 20px;">上架</a-button>
          <a-button type="primary" size="small" style="margin-right: 20px;" @click="onEdit(scope)">修改</a-button>
          <a-button type="primary" size="small" style="margin-top: 20px;">删除</a-button>
        </template>
      </a-table-column>
    </a-table>
    <!-- <div class="carousel" @mouseover="stop" @mouseout="play">
      <ul class="picture_list" :style="containerStyle">
        <li class="picture_item">
          <div class="carousel_list_item">
            <div class="carousel_list_item_left"></div>
            <div class="carousel_list_item_right">
              <img class="picture" v-if="picture_list" :src="picture_list[picture_list.length-1]" alt="">
            </div>
          </div>
        </li>
        <li class="picture_item" v-for="(item, index) in picture_list" :key="index">
          <div class="carousel_list_item">
            <div class="carousel_list_item_left">{{index}}</div>
            <div class="carousel_list_item_right">
              <img v-if="item" class="picture" :src="item" alt="">
            </div>
          </div>
        </li>
        <li class="picture_item">
          <div class="carousel_list_item">
            <div class="carousel_list_item_left"></div>
            <div class="carousel_list_item_right">
              <img class="picture" v-if="picture_list" :src="picture_list[0]" alt="">
            </div>
          </div>
        </li>
      </ul>
      <ul class="indicator">
        <li class="indicator_item" v-for="(item, index) in picture_list" :key="index" :class="{'active': currentIndex-1 === index}" @click="jump(index+1)"></li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  // props: {
  //   initialSpeed: {
  //     type: Number,
  //     default: 30
  //   },
  //   initialInterval: {
  //     type: Number,
  //     default: 4
  //   }
  // },
  data () {
    return {
      title: '添加商品',
      visible: false,
      confirmLoading: false,
      list: null,
      pagination: {
        defaultPageSize: 5,
        pageSizeOptions: ['5','10','20','30','50'],
        total: 5,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      picture_list: [
        'http://localhost:3000/public/img/shops/xiaomi_9_1.jpg',
        'http://localhost:3000/public/img/shops/xiaomi_9_1.jpg',
        'http://localhost:3000/public/img/shops/xiaomi_9_1.jpg',
        'http://localhost:3000/public/img/shops/xiaomi_9_1.jpg'
      ],
      currentIndex: 1,
      distance: -1000, // 距离是图片的宽度
      transitionEnd: true,
      speed: this.initialSpeed,
      shop_type: [],
      form: {
        id: '',
        name: '',
        quantity: '',
        price: '',
        old_price: '',
        brief: '',
        specification: '',
        description: '',
        format: '',
        type: [],
        tag: '',
        picture: ''
      }
    }
  },
  mounted () {
    // this.init()
    this.getList()
    this.getShopType()
  },
  // computed: {
  //   containerStyle () {
  //     return {
  //       transform: `translate3d(${this.distance}px, 0, 0)`
  //     }
  //   },
  //   interval () {
  //     return this.initialInterval * 1000
  //   }
  // },
  methods: {
    getList () {
      request({
        url: '/api/shop/info',
        method: 'get'
      })
      .then((response) => {
        this.list = response.data
        this.pagination.total = response.total
      }).catch((err) => {
        console.log(err)
      });
    },
    getShopType () {
      request({
        url: '/api/shops/type/index',
        method: 'get'
      })
      .then((response) => {
        this.shop_type = response.data
      }).catch((err) => {
        console.log(err)
        this.confirmLoading = false
      });
    },
    resetForm () {
      this.form = {
        id: '',
        name: '',
        quantity: '',
        price: '',
        old_price: '',
        brief: '',
        specification: '',
        description: '',
        format: '',
        type: [],
        tag: '',
        picture: ''
      }
    },
    onAdd () {
      this.title = '添加商品'
      this.resetForm()
      this.visible = true
    },
    handleOK () {
      // this.form.picture = '000'
      this.confirmLoading = true
      // console.log(this.form)
      request({
        url: '/api/shops/store',
        method: 'post',
        data: this.form
      })
      .then((response) => {
        console.log(response)
        this.confirmLoading = false
        this.getList()
        this.visible = false
      }).catch((err) => {
        console.log(err)
      });
    },
    handleCancel () {
      this.confirmLoading = false
      this.visible = false
    },
    onEdit (row) {
      this.resetForm()
      this.form = row
      this.visible = true
      console.log(this.form)
    },
    // init () {
    //   this.play()
    //   // window.onblur = function () {
    //   //   this.stop()
    //   // }.bind(this)
    //   // window.onfouc = function () {
    //   //   this.play()
    //   // }.bind(this)
    // },
    // move (offset, direction, speed) {
    //   if (!this.transitionEnd) return
    //   this.transitionEnd = false
    //   direction == -1 ? this.currentIndex += offset/1000 : this.currentIndex -= offset/1000
    //   if (this.currentIndex > 4) this.currentIndex = 1
    //   if (this.currentIndex < 1) this.currentIndex = 4

    //   const destination = this.distance + offset * direction
    //   console.log(destination, this.distance)
    //   this.animate(destination, direction, speed)
    // },
    // animate (dest, direc, speed) {
    //   if (!this.temp) {
    //     window.clearInterval(this.temp)
    //     this.temp = null
    //   }
    //   this.temp = window.setInterval(() => {
    //     if ((direc === -1 && dest < this.distance) || (direc === 1 && dest > this.distance)) {
    //       this.distance += speed * direc
    //     } else {
    //       this.transitionEnd = true
    //       window.clearInterval(this.temp)
    //       this.distance = dest
    //       // if (dest < -1500) this.distance = -1000
    //       if (dest < -this.picture_list.length*1000) this.distance = -1000
    //       // if (dest > -1000) this.distance = -1500
    //       if (dest > -1000) this.distance = -this.picture_list.length*1000
    //     }
    //   }, 20)
    // },
    // jump (index) {
    //   const direction = index - this.currentIndex >= 0 ? -1: 1
    //   const offset = Math.abs(index - this.currentIndex) * 1000
    //   const jumpSpeed = Math.abs(index - this.currentIndex) == 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
    //   this.move(offset, direction, jumpSpeed)
    // },
    // play () {
    //   if (!this.timer) {
    //     window.clearInterval(this.timer)
    //     this.timer = null
    //   }
    //   this.timer = window.setInterval(() => {
    //     this.move(1000, -1, this.speed)
    //   }, this.interval)
    // },
    // stop () {
    //   window.clearInterval(this.timer)
    //   this.timer = null
    // }
  }
}
</script>
<style scoped>
.carousel{
  left: 100px;
  width: 1000px;
  background: #ccc;
  overflow: hidden;
  position: relative;
  border: 1px solid #000;
}
.picture_list{
  width: 10000px;
  height: 500px;
}
.picture_item{
  list-style-type: none;
  /* display: inline-block; */
  float: left;
  width: 1000px;
  position: relative;
  left: -40px;
}
.carousel_list_item{
  display: flex;
  width: 1000px;
  height: 500px;
}
.carousel_list_item_left{
  width: 50%;
  background: #ccc
}
.carousel_list_item_right{
  width: 50%;
}
.picture{
  width: 100%;
  height: 100%;
}
.indicator{
  position: absolute;
  left: 30px;
  bottom: 30px;
}
.indicator_item{
  list-style: none;
  float: left;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  margin-right: 10px;
}
.active{
  background: blue;
}
</style>
