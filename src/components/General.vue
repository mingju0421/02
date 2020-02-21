<template>
  <div class="general">
      <div class="info">
            <div class="title">
                <span>Title</span>
                <el-input
                    placeholder="请输入内容"
                    v-model="general.title">
                </el-input>
            </div>
            <div class="description">
                <span>Description</span>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="general.description">
                </el-input>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          general: {
              title: '',
              description: ''
          },
      }
  }
}
</script>

<style lang="stylus" scoped>
.general
    position relative
    .info
        .title
            display flex
            margin-bottom 5px
        .description
            display flex
        span
            width 20%
            display block
            padding 8px 10px
            background-color #eff5fa
            border-radius: 3px 0 0 3px;
</style>