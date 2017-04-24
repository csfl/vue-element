<template>
  <div class="flex">
    <nav class="panel admin-second-nav">
      <p class="panel-heading flex v-center">
        坐席技能组
      </p>
      <router-link :to="{name: 'banquetList', params: {skillName: item.name} }" v-for="item in list" class="panel-block">
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
      list: []
    }
  },
  methods: {
    query() {
      this.$http.get('skill/list').then( res => {
        if(res.success) {
          this.list = res.data.data
        }
      })
    }
  },
  watch: {
   'list' : function (list) {
      if(list.length > 1) {
        this.$router.push({name: 'banquetList', params: {skillName: list[0].name}})
      }
   }
  },
  mounted () {
    this.query()
  }
}
</script>

<style lang="sass" scoped>
</style>
