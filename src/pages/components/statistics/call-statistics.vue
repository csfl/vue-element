<template lang="html">
  <div class="admin-right-section">
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="坐席名称">
          <el-input  placeholder="" v-model="post.table.seatname"></el-input>
        </el-form-item>
        <el-form-item label="坐席工号">
          <el-input  placeholder="" v-model="post.table.seatnum"></el-input>
        </el-form-item>
        <el-form-item label="分机号">
          <el-input  placeholder="" v-model="post.table.extnum"></el-input>
        </el-form-item>
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
        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            @change="formatStartDate"
            placeholder="选择日期"
            v-model="post.table.createtime">
          </el-date-picker>
          <span> &nbsp; 至 &nbsp;</span>
          <el-date-picker
            type="date"
            @change="formatEndDate"
            placeholder="选择日期"
            v-model="post.table.endtime">
          </el-date-picker>
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
     property="extnum"
     label="分机号码"
     >
   </el-table-column>
   <el-table-column
     property="fromnum"
     label="主叫">
   </el-table-column>
   <el-table-column
     property="tonum"
     label="被叫">
   </el-table-column>
   <el-table-column
     label="呼叫类型"
     >
     <template scope='scope'>
      <span>{{ scope.row.type === '1' ? '呼入' : '呼出' }}</span>
     </template>
   </el-table-column>
   <el-table-column
     property="confirmtime"
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
            fromnum: '',
            tonum: '',
            seatname: '',
            seatnum: '',
            extnum: '',
            type: '',
            createtime: '',
            endtime: '',
            page: 1
          }
        },
        currentRow: null
      }
    },
    methods: {
      query() {
        this.$http.get('statistics/calllog/list', this.post.table).then((res) => {
          if (res.success) {
            this.list.table = [...res.data.data]
          }
        })
      },
      formatStartDate(val) {
        this.post.table.createtime = val
      },
      formatEndDate(val) {
        this.post.table.endtime = val
      },
    },
    mounted() {
      this.query()
    },
  }
</script>

