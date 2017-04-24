<template>
  <div class="admin-right-section">
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-input v-model='post.table.company'  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model='post.table.name'  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系人号码">
          <el-input  v-model='post.table.phone' placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            @change='changeDate'
            v-model="post.table.createTime">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click='query' >查询</el-button>
        <router-link :to="{name: 'newMember'}">
          <el-button type="primary">新增</el-button>
        </router-link>
      </el-form>
      </el-col>
    </el-row>
  <el-table
   :data="origin.table.data"
   highlight-current-row
   style="width: 100%">
   <el-table-column
     type="index">
   </el-table-column>
   <el-table-column
     property="created_at"
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
        <el-button type="text" size="small">拨打</el-button>
      </template>
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
        post: {
          table: {
            company: '',
            name: '',
            phone: '',
            createTime: '',
          }
        },
      }
    },
    methods: {
      query(page) {
        let params = Object.assign(this.post.table, {page})
        this.$http.get('client/list', params).then( res => {
          if (res.success) {
            this.origin.table = res.data
          }
        })
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
