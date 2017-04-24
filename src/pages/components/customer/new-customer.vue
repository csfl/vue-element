<template>
  <div class="">
    <el-form ref="form" label-width="100px">
      <h4>新增客户</h4>
      <el-form-item label="公司名称">
        <el-input v-model='origin.customer.company' ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电话1">
            <el-input v-model='origin.customer.mobile1' >
              <el-button slot="append" type="success">拨打</el-button>
              <!-- <el-button icon="search"></el-button> -->
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话2">
            <el-input v-model='origin.customer.mobile2' >
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话3">
            <el-input  v-model='origin.customer.mobile3'>
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="行业类别">
            <el-select placeholder="请选择" v-model='origin.customer.industry'>
              <el-option value="电子商务">电子商务</el-option>
              <el-option value="在线社区">经线社区</el-option>
              <el-option value="房地产">房地产</el-option>
              <el-option value="医疗">医疗</el-option>
              <el-option value="交通汽车">交通汽车</el-option>
              <el-option value="旅游">旅游</el-option>
              <el-option value="游戏">游戏</el-option>
              <el-option value="教育">教育</el-option>
              <el-option value="IT硬件">IT硬件</el-option>
              <el-option value="IT软件服务">IT软件服务</el-option>
              <el-option value="文化出版">文化出版</el-option>
              <el-option value="生活信息">生活信息</el-option>
              <el-option value="金融">金融</el-option>
              <el-option value="其他">其他</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省份">
              <el-input v-model='origin.customer.province' > </el-input>
            <!-- <el-select placeholder="省份">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">
              <el-input v-model='origin.customer.city' > </el-input>
            <!-- <el-select placeholder="城市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址">
        <el-input v-model='origin.customer.address' ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="'100px'" label="联系人姓名">
            <el-input v-model='origin.customer.name' > </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位">
            <el-input v-model='origin.customer.position'> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input  v-model='origin.customer.phone'>
              <el-button slot="append" type="success">拨打</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select placeholder="请选择" v-model='origin.customer.document_type'>
              <el-option label="区域一" value="身份证">身份证</el-option>
              <el-option label="区域一" value="护照">护照</el-option>
              <el-option label="区域一" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码">
            <el-input v-model='origin.customer.idcard' > </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ">
            <el-input v-model='origin.customer.qq' > </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱">
        <el-input v-model="origin.customer.email"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="origin.customer.remark" type="textarea" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click='newCustomer' type="primary">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      origin: {
        customer: {}
      }
    }
  },
  methods: {
    newCustomer() {
      this.$http.post('client/add', this.origin.customer).then( (res) => {
        if(res.success) {
          alert('新建成功')
          this.$router.push({name: 'customerList'})
        } else {
          alert(res.message)
        }
      })
    }
  }
}
</script>
<style lang="sass">
</style>
