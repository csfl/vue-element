<template>
<div>
  <el-table
   :data="origin.table.data"
   highlight-current-row
   style="width: 100%">
   <el-table-column
     type="index"
     width="100">
   </el-table-column>
   <el-table-column
     property="content"
     class-name="long-content"
     :show-overflow-tooltip="true"
     label="内容"
     >
   </el-table-column>
   <el-table-column
     label="状态"
     >
      <template scope="scope">
        <span>{{ scope.row.status === '1'  ? '跟进' : '结束'}}</span>
      </template>
   </el-table-column>
   <el-table-column
     property="created_at"
     label="创建时间"
     >
   </el-table-column>
   <el-table-column
     property="user_name"
     label="登记人">
   </el-table-column>
   <el-table-column
      label="操作"
      >
      <template scope="scope">
        <el-button @click="handleSelected(scope.row, scope.$index)" type="text" size="small">
           详情
        </el-button>
        <el-button
          type="text"
          size="small"
          @click="deleteOne(scope.row, scope.$index)">删除</el-button>
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
 <!-- Form -->

 <!--
<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
Form -->

<el-dialog title="接触记录" v-model="dialogFormVisible">
  <el-form :model="origin.selected" label-width="100px">
    <el-form-item label="内容">
      <el-input type="textarea" v-model="origin.selected.content" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="origin.selected.status">
        <el-option label="跟进" value="1"></el-option>
        <el-option label="结束" value="-1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editOne">保 存</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        origin: {
          selected: {},
          table: {}
        }
      }
    },
    methods: {
    	query (page) {
        console.log(page)
    		this.$http.get('user/contact/list/'+ this.$route.params.clientId , {page}).then( (res) => {
					if (res.success) {
            this.origin.table = res.data
					}
        })
      },
      addOne(data) {
        this.query()
      },
      deleteOne(item, index) {
        let cfm = confirm('确认删除')
        if(cfm) {
          this.$http.delete('user/contact/delete/'+ item.id).then( (res) => {
            if (res.success) {
              this.query()
            }
          })
        }
      },
      editOne() {
          let selected = this.origin.selected
          this.$http.post('user/contact/edit/'+ selected.id, selected).then( res => {
            if (res.success) {
              this.dialogFormVisible = false
              alert('保存成功')
              this.query()
            }
          })
      },
      handleSelected(item, index) {
        this.dialogFormVisible = true
        this.origin.selected = JSON.parse(JSON.stringify(item))
        this.origin.selected.index = index
      }
    },
    mounted() {
    	this.query()
    }
  }
</script>
