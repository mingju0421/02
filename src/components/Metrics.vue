<template>
    <div class="metrics">
        <div class="dataSourcs">
            <span>Data Sourcs</span>
            <el-select v-model="options.dataSourcs" placeholder="请选择">
                <el-option
                v-for="item in dataOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="queryList">
            <div class="query" v-for="(query, index) in options.queryArr" :key="index">
                <div class="top">
                    <span>点位名称</span>
                    <el-select v-model="query.name" placeholder="请选择">
                        <el-option
                        v-for="item in dataOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span>Aggregator</span>
                    <el-select v-model="query.aggregator" placeholder="请选择">
                        <el-option
                        v-for="item in dataOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span>Fill</span>
                    <el-select v-model="options.dataSourcs" placeholder="请选择">
                        <el-option
                        v-for="item in dataOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bottom">
                    <span>Down sample</span>
                    <el-input v-model="query.downSample" placeholder="请输入内容"></el-input>
                    <span>Aggregator</span>
                    <el-select v-model="options.dataSourcs" placeholder="请选择">
                        <el-option
                        v-for="item in dataOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span>Fill</span>
                    <el-select v-model="options.dataSourcs" placeholder="请选择">
                        <el-option
                        v-for="item in dataOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dataOption: [
                {
                    value: 'DP',
                    label: 'DP'
                }
            ],
            options: {
                dataSourcs: 'DP',
                queryArr: [],

            }
        }
    }
}
</script>

<style scoped lang="stylus">
span
    width 20%
    display block
    padding 8px 10px
    background-color #eff5fa
    border-radius: 3px 0 0 3px;
.dataSourcs
    display flex
</style>
