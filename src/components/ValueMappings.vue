<template>
  <div class="valueMappings">
    <div class="typeSelect">
        <span>Type</span>
        <el-select v-model="options.mapType" placeholder="请选择"  @change="change('mapType')">
            <el-option
                v-for="item in typeOpiotn"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="setMap">
        <div class="valuMap" v-if="options.mapType === 'value'">
            <div class="forItem" v-for="(item, index) in options.valueMap" :key="index">
                <el-button type="primary" @click="closeMap('valueMap', index)"><i class="el-icon-close"></i></el-button>
                <el-input v-model="item.value" placeholder="value" @change="change()"></el-input>
                <el-button type="primary"><i class="el-icon-right"></i></el-button>
                <el-input v-model="item.text"  placeholder="text"  @change="change()"></el-input>
            </div>
            <el-button icon="el-icon-circle-plus" @click="addMap('valueMap', options.valueMap.length)">Add a value mapping</el-button>
        </div>
        <div class="rangeMap"  v-if="options.mapType === 'range'">
            <div class="forItem" v-for="(item, index) in options.rangeMap" :key="index">
                <el-button type="primary" @click="closeMap('rangeMap', index)"><i class="el-icon-close"></i> From</el-button>
                <el-input v-model="item.from" placeholder="value"  @change="change()"></el-input>
                <el-button type="primary">To</el-button>
                <el-input v-model="item.to"  placeholder="text" @change="change()"></el-input>
                <el-button type="primary">Text</el-button>
                <el-input v-model="item.text"  placeholder="text" @change="change()"></el-input>
            </div>
            <el-button icon="el-icon-circle-plus" @click="addMap('rangeMap', options.rangeMap.length)">Add a range mapping</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            typeOpiotn: [
                {
                    label: 'value to text',
                    value: 'value',
                },
                {
                    label: 'range to text',
                    value: 'range',
                }
            ],
            options: {
                mapType: 'value',
                valueMap: [],
                rangeMap: [],
            }
        }
    },
    methods: {
        /** 改变配置的时候修改 echarts 配置 */
        change () {
            let options = JSON.parse(JSON.stringify(this.options))
            this.$emit('change', 'valueMap', options)
        },
        addMap (key, index) {
            this.$set(this.options[key], index, {})
            this.change()
        },
        closeMap (key, index) {
            this.options[key].splice(index, 1)
            this.change()
        }
    },
    watch: {
        propsOptions (n) {
            let propsOptions = JSON.parse(JSON.stringify(n))
            this.$set(this, 'options', propsOptions)
        }
    },
    props: ['propsOptions'],
}
</script>

<style lang="stylus" scoped>
span
    width 120px
    display block
    padding 8px 10px
    background-color #eff5fa
    border-radius: 3px 0 0 3px;
    flex-shrink 0
.typeSelect
    display flex
.forItem
    display flex  
</style>