<template>
 <div class="bc">
  <el-breadcrumb>
    <el-breadcrumb-item v-for="v in list" :key="v.path">
      <RouterLink :to="v.meta.title"></RouterLink>
    </el-breadcrumb-item>
  </el-breadcrumb>
 </div>
</template>
<script>
export default{
  data(){
    return {
      list:[]
    }
  },
  watch:{
    $route(to,from){
      this.list=to.matched;
      console.log(to.matched)
    }
  },
  methods:{

  },
  mounted(){
    this.list=this.$route.matched;
  }
}
</script>
<style scoped>
.bc{
  padding: 30px 0px;
}
</style>