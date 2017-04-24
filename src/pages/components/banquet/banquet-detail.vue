<template>
<div class="admin-right-section">
    <el-form label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="'100px'" label="坐席名称">
            <el-input disabled="true" v-model='origin.banquet.name' > </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="坐席工号">
            <el-input  disabled="true" v-model='origin.banquet.num'> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分机号">
            <el-input  disabled="true"  v-model='origin.banquet.extension'>
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input  disabled="true" v-model="origin.banquet.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱">
            <el-input  disabled="true" v-model="origin.banquet.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ">
            <el-input  disabled="true" v-model="origin.banquet.qq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs class="record-tabs">
      <el-tab-pane label="通话记录" name="first">
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="主叫">
          <el-input v-model='post.table.fromnum'  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="被叫">
          <el-input v-model='post.table.tonum'  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="呼叫类型">
          <el-select v-model="post.table.type">
            <el-option label="全部" value=""></el-option>
            <el-option label="呼入" value="1"></el-option>
            <el-option label="呼出" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            @change='changeDate'
            v-model="post.table.createTime">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click='query' >查询</el-button>
      </el-form>
      </el-col>
    </el-row>
  <el-table
   :data="origin.table.data"
   highlight-current-row
   style="width: 100%">
   <el-table-column
     type="index"
     width="50">
   </el-table-column>
   <el-table-column
     property="fromnum"
     label="主叫">
   </el-table-column>
   <el-table-column
     property="tonum"
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
     label="通话时长(s)">
   </el-table-column>
 </el-table>
      </el-tab-pane>
    </el-tabs>
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
    data () {
      return {
        origin: {
          banquet: {},
          table: {}
        },
        post: {
          table: {
            fromnum: '',
            tonum: '',
            type: '',
            createTime: '',
          }
        },
      }
    },
    methods: {
      query (page) {
        let params = Object.assign(this.post.table, {page})
        this.$http.get('user/info/'+ this.$route.params.id).then( res => {
          if (res.success) {
            this.origin.banquet = res.data
          }
        })
      },
      changeDate(val) {
        // 当 input 的值改变时触发，返回值和文本框一致
        this.post.table.createTime = val
      }
    },
    created() {
      this.query()
    }
  }
</script>
