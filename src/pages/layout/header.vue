<template>
  <div id="header" class='bg-gray'>
      <div id="website-logo" >
        <div class="flex center fill">
          <img src="../../assets/logo.png" alt="">
        </div>
      </div>
      <div class="current-phone">
          <div class='phone-operator icons'>
            <ul>
              <li @click="answer" :class="{'is-active-answer': currentCall.status === 'ringing'}" >
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#answer"></use> </svg>
                  </div>
                  <div>接听</div>
                </div>
              </li>
              <li @click="hangup" :class="{'is-active-hangup': currentCall.status === 'confirmed' || currentCall.status === 'ringing' }">
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#hangup"></use> </svg>
                  </div>
                  <div>挂机</div>
                </div>
              </li>
              <li>
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#callout"></use> </svg>
                  </div>
                  <div>外呼</div>
                </div>
              </li>
              <li>
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#keep"></use> </svg>
                  </div>
                  <div>保持</div>
                </div>
              </li>
              <li>
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#keepback"></use> </svg>
                  </div>
                  <div>保持找回</div>
                </div>
              </li>
              <li>
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#multiple"></use> </svg>
                  </div>
                  <div>多方</div>
                </div>
              </li>
              <li>
                <div class="fill flex center direction-column">
                  <div>
                    <svg> <use xlink:href="#transfer"></use> </svg>
                  </div>
                  <div>转移</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="phone-status-box">
            <div
              v-if="currentCall && (currentCall.status === 'confirmed' || currentCall.status === 'ringing')"
              class="flex direction-column">
              <div class="flex-1 phone-number">
                {{ currentCall.fromnum }}
              </div>
              <div class="flex-1 flex direction-row">
                <div class="flex" >
                  <span v-if="currentCall.status ==='confirmed'">正在通话</span>
                  <span v-if="currentCall.status ==='ringing'">等待接听</span>
                </div>
                <div class="flex flex-1 h-end" v-if="time !== ''">{{ time }} 秒</div>
                <div class="flex flex-1 h-end" v-else></div>
              </div>
            </div>
            <div class="" v-else>
              <div class="flex-1">
                当前无通话
              </div>
              <div class="flex-1 flex direction-row">
                <div class="flex "></div>
                <!--
                <div class="flex flex-1 h-end"></div>
                <button @click='clearTime' > cleartime</button>
                <button @click='timego' > timego</button>
                -->
              </div>
            </div>
          </div>
      </div>
      <div id="current-zuoxi">
        <div class='fr fenji'>
          分机号: <span class='text-danger'>{{ this.origin.user.extension }}</span>
          <span v-if="this.extensionStatus === 'online'"> (已就绪)</span>
          <span v-if="this.extensionStatus === 'pending'"> 正在重连... </span>
          <span v-if="this.extensionStatus === 'close'">
            (未就绪) <a class="el-button--primary el-button--mini el-button" href="Oneyun-SipClient://" :size="'mini'" type="primary">启动分机</a>
          </span>
          <span v-if="this.extensionStatus === 'offline'">
            (断线) <el-button @click='setAccount' :size="'mini'" type="primary">重连</el-button>
          </span>
        </div>
        <div class="cb">
          <span>呼叫中心欢迎你: </span>
          <span class="text-danger">
            <router-link :to="{name: 'userInfo'}"> {{ this.origin.user.name }} </router-link>
          </span>
          <el-select :size="'mini'" @change="changeUserStatus" v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :label="item.label"
              :value="item.value">
              <span class="user-zuoxi-status" style="float: left">
                <svg>
                  <use :xlink:href="'#'+item.icon"></use>
                 </svg>
              </span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
          <el-button @click='logout' :size="'mini'" type="primary">退出</el-button>
        </div>

      </div>
    </div>
</template>

<script>
import JsClient from 'oneyun-sipclient-desktop-js-sdk'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      statusList: [
        {
          value: 'idle',
          icon: 'status_online',
          label: '空闲'
        },
        {
          value: 'busy',
          icon: 'status_busy',
          label: '忙碌'
        },
        {
          value: 'away',
          icon: 'status_offline',
          label: '离席'
        },
      ],
      status: 'busy',
      extensionStatus: 'offline', // 分机状态
      extensionClientRes: '', // 分机响应结果
      origin: {
        user: {}
      },
      time: '',
    }
  },
  computed: {
    ...mapGetters(['callLogCurrentList']),
    currentCall: function() {
      return this.callLogCurrentList[0] ? this.callLogCurrentList[0] : {}
    }
  },
  methods: {
    ...mapActions(['getCurrentList']),
    logout () {
      this.$http.get('user/logout').then( res => {
        if(res.success) {
          alert('登出成功')
          this.$router.push({name: 'logout'})
          return
        }
        alert(res.message)
      })
    },
    answer () {
      // 判断 是否可以点击
      if (this.currentCall.status === 'ringing') {
        this.client.answer()
        this.updateRecord('confirmed')
      }
      return false
    },
    hangup () {
      // 判断 是否可以点击
      let status = this.currentCall.status
      if (status === 'confirmed' || status === 'ringing') {
        this.client.hangup()
        this.updateRecord('disconnected')
      }
      return false
    },
    setAccount () {
      let ext = this.origin.user.extension_detail
      this.client.setAccount(ext.user, ext.password, ext.domain, ext.timeout)
    },
    transformRecord (origin) {

      let tonum = origin.params.call.localUri.split(':')[1].split('@')[0]
      let fromnum = origin.params.call.remoteUri.split(':')[1].split('@')[0]
      let client_num = fromnum
      let status = origin.params.call.status
      let type = 1

      return ({
        fromnum,
        tonum,
        client_num,
        status,
        type
      })
    },
    updateRecord (status) {
    	let params = {
        status
      }
      // 修改列表第一条记录的状态
      this.$http.post('user/calllog/edit/'+ this.currentCall.id, params ).then( (res) => {
        // 更新列表
        this.getCurrentList()
      })
    },
    judgeRecord (data) {
      // 添加一条记录

      // 只添加振铃, 其它状态皆由相应操作才能更改 目前只记录 振铃 ringing, 通话中 confirmed, 挂断 disconnected
      let params = this.transformRecord(data)
      if (params.status === 'ringing') {
        console.log('add, ringing', params)
        this.$http.post('user/calllog/add', params).then( (res) => {
          // 更新列表
          this.getCurrentList()
          if (this.$route.params.name !== 'current-detail') {
            this.$router.push({name: 'admin'})
          }
        })
      }

      // 如果是软件化那处理的接听，挂断，这里只做更新记录，并更新列表
      if (params.status === 'confirmed') {
        this.updateRecord('confirmed')
        this.timego()
      }
      if (params.status === 'disconnected') {
        this.updateRecord('disconnected')
        this.clearTime()

        // 进入文书状态，文书状态有两种方式进入 挂断
      }
    },

    updateExtensionStatus (data) {
      if (data.params.account) {
        this.extensionStatus = 'online'
      } else {
        this.extensionStatus = 'close'
      }
    },
    getUserInfo() {
      this.$http.get('user/info').then((res)=> {
        if(res.success) {
          this.origin.user = res.data.user
          this.status = res.data.user.status
          this.reconnect()
        }
      })
    },
    changeUserStatus() {
      this.$http.post('user/status', {status: this.status}).then((res)=> {
        // if(res.success) {
        // }
      })
    },
    timego() {
      let currentTime = new Date().getTime()
      this.timeInterval = setInterval( ()=> {
        this.time = parseInt((new Date().getTime() - currentTime)/1000)
      }, 1000)
    },
    clearTime() {
      clearInterval(this.timeInterval)
      this.time = 0
    },
    reconnect () {
      let self = this
      let client
      let processEnv =  process.env.NODE_ENV

      if( processEnv === 'production' ) {
        client = new JsClient('ws://localhost:8430/')
      } else {
        client = new JsClient('ws://192.168.10.75:8430/')
      }

      // when the connection is established, this method is called
      client.ws.onopen = function () {
        console.log('.. connection open')

        // ws 需要判断两次，一次在连接，一次在未连接
        // ws 连接之后，获取一次账号信息，判断是否已经就绪
        self.setAccount()
      };

      // when data is comming from the server, this metod is called
      client.ws.onmessage = function (evt) {
        // 待优化
        let data = JSON.parse(evt.data)
        if (data.method === 'onCallState') {
          self.judgeRecord(data)
        }

        if (data.method === 'onRegState') {
          self.updateExtensionStatus(data)
        }

        // 刷新页面判断是否 注册成功
        if (data.id === 'setAccount' && data.result === null) {
          self.extensionStatus = 'online'
        }
      };
      client.ws.onclose = function(){
          //try to reconnect in 5 seconds
          console.log('.. connection closed')
          this.extensionStatus = 'close'
          setTimeout( () => self.reconnect() , 3000);
      };

      this.client = client

      // ws 未连接, 处于 pending 状态改为 close, 请求启动分机
      if (client.ws.readyState === 0) {
        console.log('.. connection pending')
        this.extensionStatus = 'close'
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="sass">
  $color1: #c0c6df
  $color2: #333
  $green: #45c8dc
  $red: #ff2d86
  .el-select-dropdown__item.selected
    background: #e5e9f2
    &.hover
      background: #e5e9f2
  #header
    background: linear-gradient(to bottom, #fefeff, #e9f3fc)
    position: fixed
    z-index: 999
    left: 0
    right: 0
    top: 0
    bottom: 0
    height: 80px
    min-width: 1180px
    border-bottom: 1px inset #c5d5e4
    .el-select
      width: 70px
  #current-zuoxi
    color: #333
    font-size: 12px
    display: inline-block
    padding: 20px
    float: right
    .fenji
      margin-bottom: 5px
  .user-zuoxi-status
    svg
      width: 12px
      height: 12px
  #status_offline
    fill: gray
  #status_busy
    fill: #ff2d86
  #status_online
    fill: #45c8dc
  #website-logo
    display: inline-block
    height: 80px
    width: 100px
    background: #41475f
    img
      width: 48px
      height: 37px
  .current-phone
    display: inline-block
    vertical-align: baseline
  .phone-operator
    display: inline-block
    margin: 0
    svg
      margin-bottom: 5px
      fill: #41475f
    li
      color: $color1
      svg
        fill: $color1
      height: 63px
      width: 58px
      text-align: center
      display: inline-block
      margin: 0
      border-radius: 4px
      cursor: pointer
      &.is-active-answer, &.is-active-hangup
        color: $color2
      &.is-active-answer
        svg
          fill: $green
      &.is-active-hangup
        svg
          fill: $red

      &:hover
        background: white
  .phone-status-box
    width: 240px
    height: 64px
    display: inline-block
    background: #98a2cc
    border-radius: 3px
    color: #fff
    padding: 10px
    .phone-number
      color: #f8ff37
</style>
