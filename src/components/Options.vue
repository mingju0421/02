<template>
    <div class="Options">
        <div class="value">
            <h3>Value</h3>
            <div class="stat">
                <span>Stat</span>
                <el-select v-model="options.stat" placeholder="请选择">
                    <el-option
                        v-for="item in statOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span>Font size</span>
                <el-select v-model="options.ststFontSize" placeholder="请选择" @change="change('ststFontSize')">
                    <el-option
                        v-for="item in fontSize"
                        :key="item.value"
                        :label="item.label"
                        
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="prefix">
                <span>Prefix</span>
                <el-input
                    placeholder="请输入内容"
                    @change="change('prefix')"
                    v-model="options.prefix">
                </el-input>
                <span>Font size</span>
                <el-select v-model="options.prefixFontSize" placeholder="请选择">
                    <el-option
                        v-for="item in fontSize"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="postfix">
                <span>Postfix</span>
                <el-input
                    placeholder="请输入内容"
                    @change="change('postfix')"
                    v-model="options.postfix">
                </el-input>
                <span>Font size</span>
                <el-select v-model="options.postfixFontSize" placeholder="请选择">
                    <el-option
                        v-for="item in fontSize"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="unit">
                <span>Unit</span>
                <el-cascader
                    @change="change('unit')"
                    :show-all-levels="false"
                    v-model="options.unit"
                    :options="unitOptions">
                </el-cascader>
            </div>
            <div class="decimals">
                <span>Decimals</span>
                <el-input
                    placeholder="请输入内容"
                    v-model="options.decimals">
                </el-input>
            </div>
        </div>
        <div class="colors">
            <h3>Coloring</h3>
            <div class="background">
                <span>Background</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.background" @change="change('background')"></el-checkbox>
                </div>
                <span>Value</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.valueColor"  @change="change('valueColor')"></el-checkbox>
                </div>
            </div>
            <div class="thresholds">
                <span>Thresholds</span>
                <el-input v-model="options.thresholds" placeholder="请输入内容" @change="change('thresholds')"></el-input>
            </div>
            <div class="color">
                <span>Colors</span>
                <div class="colorPicker" v-for="(color, index) in options.colors" :key="index">
                    <el-color-picker
                        v-model="options.colors[index]"
                        show-alpha
                        @change="change('colors')"
                        :predefine="predefineColors">
                    </el-color-picker>
                </div>
                <el-button @click="invert" @change="change('colors')">invert</el-button>
            </div>
        </div>
        <div class="sparkLines" v-if="!options.lineShow">
            <h3>Spark lines</h3>
            <div class="show">
                <span>Show</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.lineShow" @change="change('lineShow')"></el-checkbox>
                </div>
            </div>
        </div>
        <div class="sparkLines" v-else>
            <h3>Spark lines</h3>
            <div class="show">
                <span>Show</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.lineShow" @change="change('lineShow')"></el-checkbox>
                </div>
            </div>
            <div class="fullHeight">
                <span>Full height</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.fullHeight" @change="change('fullHeight')"></el-checkbox>
                </div>
            </div>
            <div class="lineColor">
                <span>Line Color</span>
                <el-color-picker
                    v-model="options.lineColor"
                    show-alpha
                    @change="change('lineColor')"
                    :predefine="predefineColors">
                </el-color-picker>
            </div>
            <div class="fillColor">
                <span>Fill Color</span>
                <el-color-picker
                    v-model="options.fillColor"
                    show-alpha
                    @change="change('fillColor')"
                    :predefine="predefineColors">
                </el-color-picker>
            </div>
        </div>
        <div class="gauge" v-if="!options.gaugeShow">
            <h3>Gauge</h3>
            <div class="show">
                <span>Show</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.gaugeShow" @change="change('gaugeShow')"></el-checkbox>
                </div>
            </div>
        </div>
        <div class="gauge" v-else>
            <h3>Gauge</h3>
            <div class="show">
                <span>Show</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.gaugeShow" @change="change('gaugeShow')"></el-checkbox>
                </div>
            </div>
            <div class="min">
                <span>Min</span>
                <el-input
                    @change="change('gaugeMin')"
                    placeholder="请输入内容"
                    v-model="options.gaugeMin">
                </el-input>
            </div>
            <div class="max">
                <span>Max</span>
                <el-input
                    placeholder="请输入内容"
                    @change="change('gaugeMax')"
                    v-model="options.gaugeMax">
                </el-input>
            </div>
            <div class="thresholdLabels">
                <span>Threshold labels</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.thresholdLabels" @change="change('thresholdLabels')"></el-checkbox>
                </div>
            </div>
            <div class="thresholdMarkers">
                <span>Threshold markers</span>
                <div class="checkboxWrap">
                    <el-checkbox v-model="options.thresholdMarkers" @change="change('thresholdMarkers')"></el-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Options',
    data () {
        return {
            options: {
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
            statOptions: [
                {
                    value: 'Min',
                    label: 'Min'
                },
                {
                    value: 'Max',
                    label: 'Max'
                },
                {
                    value: 'Average',
                    label: 'Average'
                },
                {
                    value: 'Current',
                    label: 'Current'
                },
                {
                    value: 'Toatl',
                    label: 'Toatl'
                },
                {
                    value: 'Name',
                    label: 'Name'
                },
                {
                    value: 'First',
                    label: 'First'
                },
                {
                    value: 'Delta',
                    label: 'Delta'
                },
                {
                    value: 'Difference',
                    label: 'Difference'
                },
                {
                    value: 'Range',
                    label: 'Range'
                },
                {
                    value: 'Time of last point',
                    label: 'Time of last point'
                },
            ],
            fontSize: [
                {
                    value: '0.2',
                    label: '20%'
                },
                {
                    value: '0.3',
                    label: '30%'
                },
                {
                    value: '0.5',
                    label: '50%'
                },
                {
                    value: '0.7',
                    label: '70%'
                },
                {
                    value: '0.8',
                    label: '80%'
                },
                {
                    value: '1',
                    label: '100%'
                },
                {
                    value: '1.1',
                    label: '110%'
                },
            ],
            unitOptions: [
                {
                    value: 'none',
                    label: 'none',
                    children: [
                        {
                            value: 'none',
                            label: 'none'
                        },
                        {
                            value: 'short',
                            label: 'short'
                        }
                    ]
                },
                {
                    value: 'currency',
                    label: 'currency',
                    children: [
                        {
                            value: '$',
                            label: 'Dollars($)'
                        },
                        {
                            value: '£',
                            label: 'Pounds(£)'
                        }
                    ]
                }
            ],
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ]
        }
    },
props: ['propsOptions'],
methods: {
    invert () {
    this.options.colors.reverse()
    this.change('gaugeShow')
    },
    /** 改变配置的时候修改 echarts 配置 */
    change (key) {
        this.$emit('change', 'option', JSON.parse(JSON.stringify(this.options)))
    },
    dataInit () {
        let arr = Object.keys(this.propsOptions)
        for (let i = 0; i < arr.length; i++) {
            this.$set(this.options, arr[i], this.propsOptions[arr[i]])
        }
    }
},
mounted () {
    this.dataInit()
},
watch: {
    propsOptions: {
        handler (n) {
            this.$set(this, 'options', JSON.parse(JSON.stringify(n)))
        }
    }
}
}
</script>

<style lang="stylus" scoped>
.checkboxWrap
    width 120px
    display flex
    align-items center
    justify-content center
    border 1px solid #ccc
.Options
    position relative
    display flex
    flex-wrap wrap
    .gauge
        position relative
        .show
            display flex
        .min
            display flex
        .max
            display flex
        .thresholdLabels
            display flex
        .thresholdMarkers
            display flex
        
    .colors
        position relative
        width 50%
        padding-right 10px
        .background
            display flex
        .thresholds
            display flex
        .color
            display flex
    .sparkLines
        position relative
        width 50%
        .lineColor
            display flex
        .fillColor
            display flex
        .show
            display flex
        .fullHeight
            display flex
    .value
        padding-right 10px
        position relative
        width 50%
        .stat
            display flex
        .prefix
            display flex
        .postfix
            display flex
            margin-bottom 5px
        .unit
            display flex
            margin-bottom 5px
        .decimals
            display flex
    span
        width 120px
        display block
        padding 8px 10px
        background-color #eff5fa
        border-radius: 3px 0 0 3px;
        flex-shrink 0
</style>