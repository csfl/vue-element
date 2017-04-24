<template>
<div id="admin-login">
  <div id="admin-login-bg"></div>
  <div id="admin-login-form">
    <div class="form-top flex center">
      <img src="../assets/login-logo.png" alt="">
    </div>
    <div class="form-bottom flex center">
      <el-form label-position="left">
        <el-form-item>
          <el-input auto-complete="on" placeholder="坐席名称" name='username' v-model="auth.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input auto-complete="on" placeholder="密码" name='password' type='password' v-model="auth.password"></el-input>
        </el-form-item>
        <!--<el-form-item>
          <el-input auto-complete="on" placeholder="分机号" name='agent' v-model="auth.ext_name"></el-input>
        </el-form-item>
        -->
        <!--<el-form-item>
          <el-input style="width:120px" placeholder="验证码" v-model="auth.vercode"></el-input>
          <div id='auth-vercode'></div>
        </el-form-item>-->

        <el-form-item>
          <el-button class='submit-button' type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import cookie from 'utils/cookie'
export default {
  data () {
    return {
      auth: {
        name: '',
        password: '',
        vercode: ''
      }
    }
  },
  methods: {
    login () {
      this.$router.push({ name: 'welcome' })
      // 需要登入将下段注释去掉
      // this.$http.post('login', this.auth).then((res) => {
      //   // {
      //   //   "success": true,
      //   //   "message": "请求成功",
      //   //   "status_code": 200,
      //   //   "data": {
      //   //     "token": "*"
      //   //   }
      //   // }
      //   if (res.success) {
      //     const token = res.data.token
      //     cookie.set('callcenter_token', token)
      //     this.$router.push({ name: 'welcome' })
      //   } else {
      //     window.alert(res.message)
      //   }
      // })
    },
    getCaptcha () {
      const vercode = document.getElementById('auth-vercode')
      this.$http.get('captcha-img').then(res => {
        vercode.innerHTML = res
      })
    }
  },
  mounted () {
    // this.getCaptcha()
    console.log('current env', process.env.NODE_ENV)
  }
}
</script>

<style lang="sass">
#auth-vercode
  display: inline-block
  height: 30px
.position-fill
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
#admin-login-form
  position: absolute
  left: 50%
  top: 50%
  z-index: 888
  transform: translate(-50%, -50%)
  width: 500px
  height: 360px
  background: #fff
  .el-input__inner
    height: 30px
  .form-top
    height: 100px
    background: #fbfbfb
    border-bottom: solid #f1f1f1 1px
  .form-bottom
    height: 260px
    padding-top: 20px
    form
      width: 200px
  .submit-button
    width: 100%
#admin-login
  @extend .position-fill
  overflow: hidden
#admin-login-bg
  @extend .position-fill
  background-image: url('../assets/login-bg.jpg')
  background-size: cover
  animation-name: small
  animation: breathing 10s ease-out infinite

@keyframes breathing
  0%
    -webkit-transform: scale(1)
    -ms-transform: scale(1)
    transform: scale(1)
  60%
    -webkit-transform: scale(1.1)
    -ms-transform: scale(1.1)
    transform: scale(1.1)
  100%
    -webkit-transform: scale(1)
    -ms-transform: scale(1)
    transform: scale(1)
</style>
