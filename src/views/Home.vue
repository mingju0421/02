<template>
  <div class="home">
    <div class="view">
      <h3 class="title">面板标题</h3>
      <div class="echart" ref="echart"></div>
      <div class="lineEchart" ref="lineEchart"></div>
      <div class="gaugeEchart" ref="gaugeEchart"></div>
    </div>
    <div class="config">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="General" name="first">
          <General></General>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="Options" name="third">
          <Options :propsOptions="options" @change="changeConfig"></Options>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import General from '@/components/General.vue';
import Options from '@/components/Options.vue';
import API from '../API/api'
import asyncAPI from '../API/doDatas.js'
export default {
  name: 'Home',
  components: {
    General,
    Options
  },
  data () {
    return {
      data: [7,13,4,11,3,9,3],
      options: { // 配置信息
        stat: '',
        ststFontSize: '70%',
        prefix: '',
        prefixFontSize: '70%',
        postfix: '',
        postfixFontSize: '70%',
        unit: '',
        decimals: '',
        background: false,
        valueColor: false,
        thresholds: '12,16',
        colors: ['#ff4500', '#90ee90', '#00ced1'],
        gaugeShow: false,
        gaugeMin: 10,
        gaugeMax: 20,
        thresholdLabels: false,
        thresholdMarkers: false,
        lineShow: false,
        fullHeight: false, // false = 50%, true = 100%
        lineColor: '#ccc', // 不能用单词
        fillColor: '#453'
      },
      gaugeEchart: null,
      lineEchart: null,
      myEchart: null,
      activeName: 'first',
      numberOption: { // 配置 echarts
        title: {
          text: 'Echarts',
          left: 'center',
          top: 'center',
        }
      },
    }
  },
  methods: {
    calc (min, max, n) {
      max -= min;
      n -= min
      return n / max
    },
    gaugeEchartInit () {
      this.gaugeEchart = this.$echarts.init(this.$refs.gaugeEchart)
      this.gaugeEchart.setOption(this.gaugeOption)
    },
    lineEchartInit () {
      this.lineEchart = this.$echarts.init(this.$refs.lineEchart)
      this.lineEchart.setOption(this.lineOption)
    },
    echartInit () {
      this.myEchart = this.$echarts.init(this.$refs.echart)
      this.myEchart.setOption(this.numberOption)
    },
    handleClick () {
      console.log('sss')
    },
    changeConfig (key, value) {
      // console.log(key, value)
      this.$set(this.options, key, value)
      if (this.options.gaugeShow) {
        // 如果 gaugeShow 为 true, 绘制仪表, 将数字删除
        this.myEchart ? this.myEchart.clear() : null
        if (!this.gaugeEchart) {
          this.gaugeEchartInit()
        }else {
          this.gaugeEchart.setOption(this.gaugeOption, true)
        }
      }else {
        this.gaugeEchart ? this.gaugeEchart.clear() : null
        this.numberOption = {
          title: {
            text: this.options.unit[1]? `${this.options.unit[1]}sss` : 'sss',
            left: 'center',
            top: 'center',
            textStyle: {
              color: this.options.valueColor ? this.options.colors[0] : '#000'
            }
          },
          backgroundColor: this.options.background ? this.options.colors[0] : ''
        }
        this.myEchart.setOption(this.numberOption, true)
      }
      if (this.options.lineShow) {
        // 如果 lineShow 为 true, 绘制折线图
        if (!this.lineEchart) {
          this.lineEchartInit()
        }else {
          this.lineEchart.setOption(this.lineOption)
        }
      }else {
        this.lineEchart ? this.lineEchart.clear() : null
      }
      if (key === 'background') {
        this.$refs.echart.style.backgroundColor = this.options.colors[0]
      }else {
        this.$refs.echart.style.backgroundColor = '#fff'
      }
      
    }
  },
  mounted () {
    this.echartInit()
    setInterval(() => {
      let n = ~~(Math.random() * 10 + 10)
      this.data.shift()
      this.data.push(n)
      if (this.gaugeEchart && this.options.gaugeShow)
        this.gaugeEchart.setOption(this.gaugeOption, true)
      if (this.lineEchart && this.options.lineShow)
        this.lineEchart.setOption(this.lineOption)
    }, 1000)
  },
  computed: {
    gaugeOption () {
      let min = this.options.gaugeMin, max = this.options.gaugeMax
      let thresholds = this.options.thresholds.split(',')
      let obj = {
        type: 'gauge',
        name: 'gauge',
        radius: '50%',
        min: min,
        max: max,
        splitNumber: false,
        axisLine: {
            lineStyle: {
                color: [[this.calc(min, max, thresholds[0]), this.options.colors[0]], [this.calc(min, max, thresholds[1] || thresholds[0]), this.options.colors[1]], [1, this.options.colors[2]]],
                width: 60,
            },
        },
        data: [this.data[6]],
        pointer: {
            show: false
        },
        axisLabel: {
            show: false
        },
      }
      let option = {
        series: [
          {
            type: 'gauge',
            name: 'gauge',
            radius: this.options.thresholdMarkers ? '60%' :'50%',
            min: min,
            max: max,
            splitNumber: false,
            axisLine: {
                lineStyle: {
                    color: [[this.calc(min, max, thresholds[0]), this.options.colors[0]], [this.calc(min, max, thresholds[1] || thresholds[0]), this.options.colors[1]], [1, this.options.colors[2]]],
                    width: this.options.thresholdMarkers ? 20 : 60,
                },
            },
            data: [this.data[6]],
            pointer: {
                show: false
            },
            axisLabel: {
                show: false
            },
            detail: {
                 show: !this.options.thresholdMarkers
             }
          }
        ]
      }
      if (this.options.thresholdMarkers) {
        option.series.push(obj)
      }
      return option
    },
    lineOption () {
      let option = {
          grid: {
            left: '-5%',
            right: '-5%',
            bottom: '0px',
            top: this.options.fullHeight ? '0' : '50%'
          },
          xAxis: {
            show: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            show: false
          },
          series: [{
            data: this.data,
            type: 'line',
            areaStyle: {
              color: this.options.fillColor
            },
            lineStyle: {
              color: this.options.lineColor
            }
          }]
        }
      return option
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  height 100%
  width 100%
  .view
    height 50%
    position relative
    .title
      height 30px
    .echart
      height calc(100% - 30px)
      border 1px solid #cccccc
      border-radius 4px
      padding 5px
    .lineEchart
      position absolute
      width 100%
      top 0
      height 100%
    .gaugeEchart
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      right 0
      bottom 0
      margin auto
</style>
