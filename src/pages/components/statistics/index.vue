<template lang="html">
  <div class="flex">
    <nav class="panel admin-second-nav">
      <p class="panel-heading flex v-center">
        统计查询
      </p>
      <router-link v-for="item in list" :to="{name: item.path }" class="panel-block">
        <span class="panel-icon">
          <i class="fa fa-book"></i>
        </span>
        <span> {{ item.name }}</span>
      </router-link>
    </nav>
    <router-view class='flex-1'></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '消费明细',
          path: 'costStatistics'
        },
        {
          name: '通话记录',
          path: 'callStatistics'
        },
      ]
    }
  },
}
</script>
