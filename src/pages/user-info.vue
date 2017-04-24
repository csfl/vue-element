<template>
<el-form label-width="80px" :model="form">
  <h4>基本信息</h4>
  <el-form-item label="坐席名称">
    <el-input :disabled="true" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="坐席工号">
    <el-input :disabled="true" v-model="form.num"></el-input>
  </el-form-item>
  <el-form-item label="分机号">
    <el-input   :disabled="true" v-model="form.extension"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input   :disabled="true" v-model='password'></el-input>
  </el-form-item>
  <el-form-item label="手机号码">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="QQ">
    <el-input v-model="form.qq"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click='save' type="primary">保存</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        form: {}
      };
    },
    computed: {
      password: function() {
        if (this.form.extension_detail) {
          return this.form.extension_detail.password
        }
        return
      }
    },
    methods: {
      save() {
        let form = this.form
        let palyload = {
          qq: form.qq,
          email: form.email,
          phone: form.phone
        }
        this.$http.post('user/edit', palyload).then((res)=> {
          if(res.success) {
            alert('保存成功')
          }
        })
      },
      getUserInfo() {
        this.$http.get('user/info').then((res)=> {
          if(res.success) {
            this.form = res.data.user
          }
        })
      },
    },
    mounted () {
      this.getUserInfo()
    }
  }
</script>
<style lang="sass" scoped>
 form
   width: 440px
</style>
