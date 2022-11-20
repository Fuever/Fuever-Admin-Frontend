<template>
  <div class="side-menu">
    <el-menu default-active="1" class="el-menu-vertical-fu" @open="handleOpen" @close="handleClose">
      <el-menu-item index='1' route="postReview">
        <el-icon><ChatLineSquare /></el-icon>
        <span>论坛审核</span>
      </el-menu-item>
      <el-menu-item index='2' route="userManage">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><DocumentCopy /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item route="newsManage" >
          <span>新闻管理</span>
        </el-menu-item>
        <el-menu-item route="pubNews" >
          <span>发布新闻</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Calendar /></el-icon>
          <span>校庆管理</span>
        </template>
        <el-menu-item route="annivManage" >
          <span>校庆管理</span>
        </el-menu-item>
        <el-menu-item route >
          <span>发布校庆</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="5">
        <el-icon>
          <setting />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>