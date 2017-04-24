<template lang="html">
  <div class="">
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-input  placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-select  placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人号码">
          <el-input  placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" >查询</el-button>
      </el-form>
      </el-col>
    </el-row>
    <el-table
     :data="tableData"
     highlight-current-row
     @current-change="handleCurrentChange"
     style="width: 100%">
     <el-table-column
       type="index"
       width="50">
     </el-table-column>
     <el-table-column
       property="date"
       label="创建时间"
       >
     </el-table-column>
     <el-table-column
       property="company"
       label="公司名称"
       >
     </el-table-column>
     <el-table-column
       property="name"
       label="联系人姓名"
       >
     </el-table-column>
     <el-table-column
       property="address"
       label="联系人号码">
     </el-table-column>
     <el-table-column
        label="操作"
        >
        <template scope="scope">
          <el-button type="text" size="small">
            <router-link :to="{ name: 'member', params: { memberId: 1 }}"> 详情 </router-link>
          </el-button>
          <el-button type="text" size="small">拨打</el-button>
        </template>
      </el-table-column>
   </el-table>
  </div>
</template>

<script>
export default {
  data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '1555133333',
          company: '公司名称',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '3432111111',
          company: '公司名称',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '34222222222222',
          company: '公司名称',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '343432211111',
          company: '公司名称',
        }],
        currentRow: null
      }
    },

    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleClick () {

      }
    }
}
</script>

<style lang="sass">
</style>
