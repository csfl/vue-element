<template lang="html">
  <div class="admin-right-section">
    <el-row>
      <el-col :span="24">
      <el-form  label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="联系人号码">
          <el-input  v-model='post.table.phone' placeholder=""></el-input>
        </el-form-item>
        <el-button type="primary" @click='query' >查询</el-button>
      </el-form>
      </el-col>
    </el-row>
  <el-table
   :data="list.table"
   highlight-current-row
   style="width: 100%">
   <el-table-column
     type="index"
     width="100">
   </el-table-column>
   <el-table-column
     property="phone"
     label="联系人号码">
   </el-table-column>
   <el-table-column
      label="操作"
      >
      <template scope="scope">
        <el-button type="text" size="small">
          <router-link :to="{ name: 'member', params: { clientId: scope.row.id }}"> 详情 </router-link>
        </el-button>
        <el-button type="text" size="small">拨打该号码</el-button>
      </template>
    </el-table-column>
 </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: {
          table: []
        },
        post: {
          table: {
            phone: '',
            page: 1
          }
        },
        currentRow: null
      }
    },
    methods: {
      query() {
        this.$http.get('client/pool/list', this.post.table).then( res => {
          if (res.success) {
            this.list.table = [...res.data.data]
          }
        })
      },
      queryMore() {
        this.post.table.page += 1
        this.query()
      },
      changeDate(val) {
        this.post.table.createTime = val
      }
    },
    mounted() {
      this.query()
    }
  }
</script>

<style lang="sass">
</style>
