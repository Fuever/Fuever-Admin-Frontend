<template>
    <div class="home-bg">
        <el-container>
            <el-header>
                <HomeNav></HomeNav>
            </el-header>
        </el-container>
        <el-container>
            <el-aside>
                <SideMenu></SideMenu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.home-bg {
    height: 100%;
    width: 100%;
    background: rgb(250, 250, 250);
}
</style>