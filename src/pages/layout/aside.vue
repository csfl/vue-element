<template lang="html">
  <div id="aside" class="icons">
    <ul>
      <li>
        <router-link to="/admin/current">
          <div class="aside-link-wrap flex center direction-column">
              <div>
                <svg> <use xlink:href="#current-phone"></use> </svg>
              </div>
              <div> 当前通话 </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/customer">
          <div class="aside-link-wrap flex center direction-column">
              <div>
                <svg> <use xlink:href="#kehu"></use> </svg>
              </div>
              <div> 客户 </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/banquet">
          <div class="aside-link-wrap flex center direction-column">
              <div>
                <svg> <use xlink:href="#zuoxi"></use> </svg>
              </div>
              <div> 坐席 </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/statistics">
          <div class="aside-link-wrap flex center direction-column">
              <div>
                <svg> <use xlink:href="#tongji"></use> </svg>
              </div>
              <div> 统计查询 </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>
<style lang="sass">
  #aside
    width: 100px
    color: #fff
    background: #4f556e
    position: fixed
    top: 80px
    left: 0
    bottom: 0
    right: 0
    .aside-link-wrap
      width: 100%
      height: 100%
    svg
      margin-bottom: 12px
      fill: white
    ul
      margin: 0
    ul li
      display: list-item
      text-align: center
      margin: 0
      height: 80px
      a
        color: #fff
        display: inline-block
        text-decoration: none
        padding: 18px 0
        width: 100%
        height: 100%
        &.router-link-active
          background: #454b64
          position: relative
          &:before
            position: absolute
            left: 0
            top: 0
            bottom: 0
            right: 0
            content: ''
            display: inline-block
            border-left: 3px solid #f8ff37

</style>
