<template>
  <div class="current-phone-list flex">
    <div id="left-phone-panel">
      <nav class="panel">
        <p class="panel-heading no-border flex v-center">
          当前通话
        </p>
        <div class="search  panel-block">
          <p class="flex fill center">
            <input class="input is-small" v-model="post.current.client_num"
              type="text" placeholder="请输入您要搜索的号码">
            <a class="search-text" @click="getCurrentList({client_num: post.current.client_num, page: 1})" >
              <span class="icon is-small v-end pointer">
                <i class="el-icon-search"></i>
              </span>
              <span class=" pointer">查询</span>
            </a>
          </p>
        </div>
        <div class="call-list">
          <router-link  v-for="(item, index) in callLogCurrentList"
           :class="['call-list-item', 'panel-block', 'icons', {'no-border-top': index === 0 } ]"
           :to="'/admin/current/'+ item.id + '/' + item.client_id">
            <div class="flex flex-1">
              <div class="icon-wrap flex center">
                  <img src="../../../assets/1.png" alt="">
              </div>
              <div class="flex-1">
                <div class="call-list-title">
                  <span>{{ item.client_name }}</span>
                  <svg> <use xlink:href="#call_in"></use> </svg>
                </div>
                <div class="text-blue">{{ item.fromnum }}</div>
              </div>
              <div class="call-list-status flex-1 flex h-end v-center">
                <span> {{ item.currenttime }}</span> &nbsp;&nbsp;
                <svg v-if="item.status === 'disconnected'"> <use xlink:href="#phone-status-disconnected"></use> </svg>
                <svg v-if="item.status === 'missed'"> <use xlink:href="#phone-status-missed"></use> </svg>
                <svg v-if="item.status === 'ringing'"> <use xlink:href="#phone-status-ringing"></use> </svg>
                <svg v-if="item.status === 'confirmed'"> <use xlink:href="#phone-status-confirmed"></use> </svg>
              </div>
            </div>
          </router-link>
        </div>
        <div class="call-list-footer flex center panel-block pointer">
          <span @click="more" v-if="callLogCurrentListNextPage">查看更多</span>
          <span v-else>加载完毕</span>
        </div>
      </nav>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
      ...mapGetters(['callLogCurrentList', 'callLogCurrentListNextPage'])
  },
  data() {
    return {
    	post: {
    		current: {
          client_num: '',
          page: 1
        }
      },
      list: {
      	current: []
      }
    }
  },
  methods: {
    ...mapActions(['getCurrentList', 'getCurrentListMore']),
    goSub () {
      let arr = this.callLogCurrentList
      if(arr.length > 0) {
        let callId = arr[0].id
        let clientId = arr[0].client_id
        this.$router.push({name: 'current-detail', params: {callId, clientId}})
      }
    },
    more () {
    	this.post.current.page += 1
      this.getCurrentListMore(this.post.current)
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    'callLogCurrentList': 'goSub'
  },
  mounted() {
    this.getCurrentList()
  }
}
</script>
<style lang="sass" scoped>
  #left-phone-panel
    width: 300px
    position: fixed
    bottom: 0px
    top: 90px
    border-left: 1px solid #dbdbdb;
    border-right: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    .panel-block
      border-left: none
      border-right: none
    .search
      padding: 0
      height: 42px
      input
        border: none
      .icon.is-small
        vertical-align: middle
      .search-text
        width: 80px
        color: #333

  .icon-wrap
    width: 60px
  .call-list
    position: absolute
    top: 84px
    left: 0
    right: 0
    bottom: 36px
    overflow-y: scroll
    &::-webkit-scrollbar
      display: none
    .router-link-active
      border-left: 4px solid #45c8dc !important
  .call-list-footer
    position: absolute
    left: 0
    right: 0
    bottom: 0px
    border-top: solid 1px #eee
  .call-list-item
    padding: .5em .75em .5em 0
  .call-list-title
    svg
      width: 10px
      height: 10px
      fill: #c0c6df
  .call-list-status
    svg
      fill: #45c8dc
  #right-main
    margin-left: 300px

</style>
