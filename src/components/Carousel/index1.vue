<template>
  <div class="carousel1">
    <div class="carousel" @mouseover="stop" @mouseout="play">
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
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    initialInterval: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
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
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    containerStyle () {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    },
    interval () {
      return this.initialInterval * 1000
    }
  },
  methods: {
    init () {
      this.play()
      // window.onblur = function () {
      //   this.stop()
      // }.bind(this)
      // window.onfouc = function () {
      //   this.play()
      // }.bind(this)
    },
    move (offset, direction, speed) {
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction == -1 ? this.currentIndex += offset/1000 : this.currentIndex -= offset/1000
      if (this.currentIndex > 4) this.currentIndex = 1
      if (this.currentIndex < 1) this.currentIndex = 4

      const destination = this.distance + offset * direction
      console.log(destination, this.distance)
      this.animate(destination, direction, speed)
    },
    animate (dest, direc, speed) {
      if (!this.temp) {
        window.clearInterval(this.temp)
        this.temp = null
      }
      this.temp = window.setInterval(() => {
        if ((direc === -1 && dest < this.distance) || (direc === 1 && dest > this.distance)) {
          this.distance += speed * direc
        } else {
          this.transitionEnd = true
          window.clearInterval(this.temp)
          this.distance = dest
          // if (dest < -1500) this.distance = -1000
          if (dest < -this.picture_list.length*1000) this.distance = -1000
          // if (dest > -1000) this.distance = -1500
          if (dest > -1000) this.distance = -this.picture_list.length*1000
        }
      }, 20)
    },
    jump (index) {
      const direction = index - this.currentIndex >= 0 ? -1: 1
      const offset = Math.abs(index - this.currentIndex) * 1000
      const jumpSpeed = Math.abs(index - this.currentIndex) == 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },
    play () {
      if (!this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.timer = window.setInterval(() => {
        this.move(1000, -1, this.speed)
      }, this.interval)
    },
    stop () {
      window.clearInterval(this.timer)
      this.timer = null
    }
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
