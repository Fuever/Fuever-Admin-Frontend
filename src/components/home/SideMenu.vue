<template>
  <div class="side-menu">
    <el-menu default-active="/forum" class="el-menu-vertical-fu" @select="handleSelect">
      <el-menu-item index='/forum'>
        <el-icon><ChatLineSquare /></el-icon>
        <span>论坛审核</span>
      </el-menu-item>
      <el-menu-item index='/user'>
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-sub-menu index="/news">
        <template #title>
          <el-icon><DocumentCopy /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news">
          <span>新闻管理</span>
        </el-menu-item>
        <el-menu-item index="/new_news">
          <span>发布新闻</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/anniv">
        <template #title>
          <el-icon><Calendar /></el-icon>
          <span>校庆管理</span>
        </template>
        <el-menu-item  index="/anniv">
          <span>校庆管理</span>
        </el-menu-item>
        <el-menu-item  index="/new_anniv">
          <span>发布校庆</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/personal">
        <el-icon>
          <setting />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import router from '@/router';

const handleSelect = (index)=> {
  router.push(index)
}

</script>

<style lang="scss" scoped>

</style>