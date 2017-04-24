<template lang="html">
  <div id="right-main" class="flex-1">
    <el-form class="box" ref="form" label-width="80px">
      <el-form-item label="状态">
        <el-select placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >提交</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
    <customer-detail></customer-detail>
    <el-tabs>
      <el-tab-pane label="接触记录" name="first">接触记录</el-tab-pane>
      <el-tab-pane label="通话记录" name="second">通话记录</el-tab-pane>
      <el-tab-pane label="订单管理" name="third">订单管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    'customer-detail': require('./components/customer-detail.vue')
  }
}
</script>

<style lang="sass">
  #right-main
    padding: 0 10px
</style>
