<template>
  <div class="carousel" @mouseover="stop" @mouseout="play">
      <ul class="picture_list" :style="containerStyle">
        <li class="picture_item">
          <img class="picture" v-if="picture_list" :src="picture_list[picture_list.length-1]" alt="">
        </li>
        <li class="picture_item" v-for="(item, index) in picture_list" :key="index">
          {{index}}
          <img v-if="item" class="picture" :src="item" alt="">
        </li>
        <li class="picture_item">
          <img class="picture" v-if="picture_list" :src="picture_list[0]" alt="">
        </li>
      </ul>
      <ul class="indicator">
        <li class="indicator_item" v-for="(item, index) in picture_list" :key="index" :class="{'active': currentIndex-1 === index}" @click="jump(index+1)"></li>
      </ul>
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
      distance: -340, // 距离是picture_item的宽度，后面涉及到距离计算的都是用这个数值
      transitionEnd: true,
      speed: this.initialSpeed
    }
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
      window.onblur = function () {
        this.stop()
      }.bind(this)
      window.onfouc = function () {
        this.play()
      }.bind(this)
    },
    move (offset, direction, speed) {
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction == -1 ? this.currentIndex += offset/340 : this.currentIndex -= offset/340
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
          // if (dest < -1500) this.distance = -340
          if (dest < -this.picture_list.length*340) this.distance = -340
          // if (dest > -340) this.distance = -1500
          if (dest > -340) this.distance = -this.picture_list.length*340
        }
      }, 20)
    },
    jump (index) {
      const direction = index - this.currentIndex >= 0 ? -1: 1
      const offset = Math.abs(index - this.currentIndex) * 340
      const jumpSpeed = Math.abs(index - this.currentIndex) == 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },
    play () {
      if (!this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.timer = window.setInterval(() => {
        this.move(340, -1, this.speed)
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
  width: 500px;
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
  width: 340px;
  padding-right: 20px;
  position: relative;
  left: -40px;
}
.picture{
  width: 300px;
  height: 300px;
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