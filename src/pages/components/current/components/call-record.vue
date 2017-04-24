<template>
<div>
  <el-table
   :data="origin.table.data"
   highlight-current-row
   style="width: 100%">
   <el-table-column
     type="index"
     width="50">
   </el-table-column>
   <el-table-column
     property="seatname"
     label="坐席名称"
     >
   </el-table-column>
   <el-table-column
     property="seatnum"
     label="坐席工号"
     >
   </el-table-column>
   <el-table-column
     property="client_num"
     label="分机号码"
     >
   </el-table-column>
   <el-table-column
     property="fromnum"
     label="主叫">
   </el-table-column>
   <el-table-column
     property="type"
     label="呼叫类型">
   </el-table-column>
   <el-table-column
     property="created_at"
     label="起始时间">
   </el-table-column>
   <el-table-column
     property="endtime"
     label="结束时间">
   </el-table-column>
   <el-table-column
     property="talktime"
     label="通话时长">
   </el-table-column>
 </el-table>
  <el-pagination
    layout="total, prev, pager, next"
    :current-page="origin.table.current_page"
    @current-change="query"
    :page-size="origin.table.per_page"
    :total="origin.table.total">
  </el-pagination>
</div>
</template>
<script>
  export default {
    data() {
      return {
        origin: {
          table: {}
        },
      }
    },
    methods: {
      query (page) {
        this.$http.get('user/calllog/client/list/'+ this.$route.params.clientId, {page}).then( res => {
          if (res.success) {
           this.origin.table = res.data
          }
        })
      }
    },
    created() {
      this.query()
    }
  }
</script>
