<template>
 <div ref="echart" style="width: 100%; height: 300px">
 
 </div>
</template>
 
<script>
export default {
    data () {
        return {
            data: [],
            myEchart: null
        }
    },
    methods: {
        init () {

            this.myEchart = this.$echarts.init(this.$refs.echart)
        },
        setEcharts () {
            let data = []
            for (let i = 0; i < 3000; i++) {
            
                data.push(~~(Math.random() * 5))
            }
            let option = {
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data
                    }
                ]
            };
            this.myEchart.setOption(option)
        },
        getOption () {
            let that = this
            fetch('/list', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
            })
                .then((data) => {
                    return data.json()
                })
                .then( data => {
                    let aaa = data.data
                    let option = {
                        series: [
                            {
                                type: 'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: aaa
                            }
                        ]
                    };
                    that.myEchart.setOption(option)
                    
                  
                    
                })
                .catch(err=> {console.log(err)})
        }
    },
    mounted () {
        this.myEchart = this.$echarts.init(this.$refs.echart)
        // this.setEcharts()
                    
        
        

    }
}

</script>
 
<style scoped lang="stylus">
 
</style>