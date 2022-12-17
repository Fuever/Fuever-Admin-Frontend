<template>
  <div>
    <div
      class="nav"
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>
          <a href="https://www.fzu.edu.cn/" target="_self"
            ><img src="@/../public/img/100px.png" class="logo-img"
          /></a>
        </div>
        <a style="color:gray">Fuever Management System</a>
      </div>

      <div style="margin-right: 6vw">
        <el-avatar :size="40"
          ><img src="@/../public/img/default-head.webp" class="profile-img" />
        </el-avatar>
      </div>
    </div>
    <el-row>
      <el-col :span="1"> </el-col>
      <el-col :span="3"> </el-col>
      <el-col :span="1" :offset="19">
        <el-dropdown class="profile-drop">
          <span> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>admin</el-dropdown-item>
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  background-color: #f5e3e3;
  box-shadow: 0px 0px 1px 0px gray;
  z-index: 3;
}

.profile-drop {
  margin: 5px;
  position: relative;
  top: 5px;
}

.logo-img {
  height: 44px;
  margin: 3px;
}
</style>
