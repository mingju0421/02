<template>
  <div >
      <el-button @click="addRow">row</el-button>
      <el-button @click="addPanels('Singlestat')">面板</el-button>
      <el-button @click="setOption">保存</el-button>
      <grid-layout
        :useCssTransforms='false'
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent"
    >
        <div v-for="item in layout" :key="item.i">
        <grid-item
            class="a"
            :isResizable="item.type !== 'row'"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            dragAllowFrom='h3'
            >
            <div v-if="item.type == 'row'" @click="expand(item) ">{{item.title}}</div>
            <component v-bind:is="item.type" v-else  :option='item.option'></component>
        </grid-item>
        </div>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
const Singlestat = () => import('../views/Home.vue')
export default {
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        Singlestat,
        

    },
    data() {
        return {
            row: {y: null},
            layout: [
                // x 轴位置,y 轴位置, w 宽度, h 高度, i 插件标识, type 面板类型,
                // {"x":0,"y":0,"w":2,"h":2,"i":"0", grup: null, id: this.randomID(), type: 'Singlestat', option: null},
                // {"x":4,"y":5,"w":2,"h":4,"i":"1", grup: null, id: this.randomID(), type: 'Singlestat', option: null},
                // {"x":3,"y":0,"w":2,"h":5,"i":"2", grup: null, id: this.randomID(), type: 'Singlestat', option: null},
            ]
        };
    },
    computed: {
        rowArr () {
            let arr = this.layout.filter(v => v.type === 'row').sort((a, b) => {
                return a.y - b.y
            })
            return arr
        },
        fold () {
            let result = {}
            this.rowArr.forEach(e => result[e.i] = e.fold)
            return result
        }
    },
    mounted() {
        this.getOption()
    },
    methods: {
        expand (item) {
            console.log(item.fold)
            if (!item.fold) {
                item.fold = true
                let layout = this.layout
                let children = [], result = []
                item.children = children
                layout.forEach(e => {
                    if (e.grup === item.i) {
                        children.push(e)
                    }else {
                        result.push(e)
                    }
                })
                this.$set(this, 'layout', JSON.parse(JSON.stringify(result)))
            }else {
                item.fold = false
                let parentY = item.y
                let childrenY = 0
                item.children.forEach(e => {
                    childrenY = childrenY > e.y ? childrenY : e.y
                })
                let gap = childrenY - parentY
                this.layout.forEach(e => {
                    if (e.y > parentY) {
                        e.y += gap
                    }
                })
                this.layout.push(...item.children)
                item.children = null
            }

        },
        randomID () {
            let s = '0123456789abcd'
            let result = ''
            for (let i = 0; i < 16; i++) {
                result += s[~~(Math.random() * 14)]
            }
            return result
        },
        layoutUpdatedEvent: function(newLayout){
            let rowArr = this.rowArr
            if (rowArr.length) {
                newLayout.forEach(e => {
                    if (e.y < rowArr[0].y) {
                        e.grup = null
                    }
                })
            }
            for (let i = 0; i < rowArr.length; i++) {
                if (i < rowArr.length - 1) {
                    newLayout.forEach(element => {
                        if (element.y > rowArr[i].y && element.y < rowArr[i + 1].y) {
                            element.grup = rowArr[i].i
                        }
                    });
                }else {
                    newLayout.forEach(element => {
                        if (element.y > rowArr[i].y) {
                            element.grup = rowArr[i].i
                        }
                    });
                }
            }
        },
        addPanels (type) {
            this.layout.push({"x":0,"y":0,"w":6,"h":6,"i":this.randomID(),type: type, option: null})
            this.$nextTick(() => {
                // this.layoutUpdatedEvent(this.layout)
            })
        },

        addRow () {
            this.layout.push({"x":0,"y":0,"w":12,"h":1,"i":this.randomID(),type:'row', fold: false, title: '行标题'})
            this.$nextTick(() => {
                this.layoutUpdatedEvent(this.layout)
            })
        },
        getOption () {
            let that = this
            fetch('/getoption', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
            })
                .then((data) => {
                    return data.json()
                })
                .then( data => {
                let option = data.data.datas.option
                this.$set(this, 'layout', option)
                this.changeConfig()
                })
                .catch(err=> {console.log(err)})
        },
        setOption () {
            let data = {option: this.layoutsort((a, b) => {
                return a.y - b.y
            })}
            

            fetch('/setoption', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(data => data.json())
                .then((data) => {
                    console.log(data)
                })
                .catch(err=> {console.log(err)})
        }
    }
};
</script>
<style lang="stylus" scoped>
.a
    margin 5px
</style>