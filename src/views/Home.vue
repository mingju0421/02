<template>
  <div class="home">
    <div class="view">
      <h3 class="title">面板标题</h3>
      <div class="echart" ref="echart"></div>
      <div class="lineEchart" ref="lineEchart"></div>
      <div class="gaugeEchart" ref="gaugeEchart"></div>
    </div>
    <div class="config" v-if="options.config">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="General" name="first">
          <General></General>
        </el-tab-pane>
        <el-tab-pane label="Metrics" name="second">
          <Metrics></Metrics>
        </el-tab-pane>
        <el-tab-pane label="Options" name="third">
          <Options :propsOptions="options.option" @change="changeConfig"></Options>
        </el-tab-pane>
        <el-tab-pane label="Value Mappings" name="fourth">
          <ValueMappings :propsOptions="options.valueMap" @change="changeConfig"></ValueMappings>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
const Options = () => import('@/components/Options.vue')
const General = () => import('@/components/General.vue')
const ValueMappings = () => import('@/components/ValueMappings.vue')
const Metrics = () => import('@/components/Metrics.vue')
import API from '../API/api'
import asyncAPI from '../API/doDatas.js'
export default {
  name: 'Home',
  components: {
    General,
    Options,
    ValueMappings,
    Metrics
  },
  props: ['option'],
  data () {
    return {
      data: [7,13,4,11,3,9,3],
      options: {
        option: {
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
                lineColor: '#ccc',
                fillColor: '#453'
            },
        valueMap: {
          mapType: 'value',
          valueMap: {},
          rangeMap: [],
        },
        config: false
      },
      gaugeEchart: null,
      lineEchart: null,
      myEchart: null,
      activeName: 'first',
      numberOption: { // 配置 echarts
        title: {
          text: '',
          left: 'center',
          top: 'center',
        }
      },
    }
  },
  methods: {
    init () {
      if (this.option) {
        this.options = this.option
      }
    },
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
    },
    
    changeConfig (key, value) {
      let option = this.options.option

      if (key) {
        this.$set(this.options, key, value)
        option = this.options.option
      }
      if (option.gaugeShow) {
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
            text: option.unit[1]? `${option.unit[1]}sss` : 'sss',
            left: 'center',
            top: 'center',
            textStyle: {
              color: option.valueColor ? option.colors[0] : '#000'
            }
          },
          backgroundColor: option.background ? option.colors[0] : ''
        }
        this.myEchart.setOption(this.numberOption, true)
      }
      if (option.lineShow) {
        // 如果 lineShow 为 true, 绘制折线图
        if (!this.lineEchart) {
          this.lineEchartInit()
        }else {
          this.lineEchart.setOption(this.lineOption)
        }
      }else {
        this.lineEchart ? this.lineEchart.clear() : null
      }
      
    }
  },
  mounted () {
    this.echartInit()
    this.init()
    // this.getOption()
  },
  computed: {
    gaugeOption () {
      
      let option = this.options.option
      let valueMap = this.options.valueMap
      let min = option.gaugeMin, max = option.gaugeMax
      let thresholds = option.thresholds.split(',')
      let obj = {
        type: 'gauge',
        name: 'gauge',
        radius: '50%',
        min: min,
        max: max,
        splitNumber: false,
        axisLine: {
            lineStyle: {
                color: [[this.calc(min, max, thresholds[0]), option.colors[0]], [this.calc(min, max, thresholds[1] || thresholds[0]), option.colors[1]], [1, option.colors[2]]],
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
      let gaugeOption = {
        series: [
          {
            type: 'gauge',
            name: 'gauge',
            radius: option.thresholdMarkers ? '60%' :'50%',
            min: min,
            max: max,
            splitNumber: false,
            axisLine: {
                lineStyle: {
                    color: [[this.calc(min, max, thresholds[0]), option.colors[0]], [this.calc(min, max, thresholds[1] || thresholds[0]), option.colors[1]], [1, option.colors[2]]],
                    width: option.thresholdMarkers ? 20 : 60,
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
              show: !option.thresholdMarkers,
              fontSize: 30 * option.ststFontSize,
              formatter: (value) => {
                if (valueMap.mapType === 'value') {
                  for (let i = 0; i < valueMap.valueMap.length; i++) {
                    if (value == valueMap.valueMap[i].value) {
                      return  `${option.prefix}${valueMap.valueMap[i].text}${option.postfix}`
                    }
                  }
                }else if (valueMap.mapType === 'range') {
                  let rangeMap = valueMap.rangeMap
                  for (let i = 0; i < rangeMap.length; i++) {
                    if (value > rangeMap[i].from && value < rangeMap[i].to) {
                      return `${option.prefix}${rangeMap[i].text}${option.postfix}`
                    }
                  }
                }
                return `${option.prefix}${option.unit}${value}${option.postfix}`
              }
             },
          }
        ]
      }
      if (option.thresholdMarkers) {
        gaugeOption.series.push(obj)
      }
      return gaugeOption
    },
    lineOption () {
      let option = this.options.option
      let lineOption = {
          grid: {
            left: '-5%',
            right: '-5%',
            bottom: '0px',
            top: option.fullHeight ? '0' : '50%'
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
              color: option.fillColor
            },
            lineStyle: {
              color: option.lineColor
            }
          }]
        }
      return lineOption
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  background #fff
  border 1px solid #cccccc
  border-radius 4px
  height 100%
  width 100%
  padding 5px
  .view
    height 100%
    position relative
    .title
      height 30px
    .echart
      height calc(100% - 30px)
      // border 1px solid #cccccc
      border-radius 4px
      padding 5px
    .lineEchart
      position absolute
      width 100%
      top 30px
      height calc(100% - 30px)
    .gaugeEchart
      position absolute
      width 100%
      height calc(100% - 30px)
      top 30px
      left 0
      right 0
      bottom 0
      margin auto
</style>
