<template>
    <div class="home-bg">
        <el-container>
            <el-header>
                <HomeNav></HomeNav>
            </el-header>
        </el-container>
        <el-container class="fu-under-header">
            <el-aside class="fu-aside" width="250px">
                <SideMenu></SideMenu>
            </el-aside>
            <el-main class="fu-main">
                <div class="fu-content-box">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import HomeNav from '@/components/home/HomeNav.vue'
import SideMenu from '@/components/home/SideMenu.vue'
</script>

<style lang="scss" scoped>
.fu-main {
    margin: 0px;
    padding: 0px;
}
.fu-content-box {
    border: solid 1px rgb(222, 222, 222);
    border-radius: 3px;
    height:auto;
    margin: 5px;
    padding: 10px;
    // overflow: hidden;
    box-shadow: 2px 2px 2px 0px rgb(231, 231, 231);
    background-color: #ffffff;
}::-webkit-scrollbar { width: 0 !important };

.el-header {
    padding: 0;
}
.home-bg {
    height: 100%;
    width: 100%;
    background: #f7f7f7;
}
.fu-aside {
    height: 100%;
    background-color: #fcfcfc;
    border-right: 1px solid rgb(243, 243, 243);

}
.fu-under-header {
    height:calc(100% - 60px);
    overflow: hidden;
}
</style>