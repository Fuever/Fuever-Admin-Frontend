<template>
    <div class="fu-bg">
        <img class="fu-bg-img"
            src="https://jwch.fzu.edu.cn/dfiles/11251/themes/46902/default_46902/jwch/images/38609a28efe1da66fb338fe868fc4428_beijing.jpg" />
    </div>
    <div class="fu-form">
        <!-- <el-tabs v-model="activeState" class="entry-tabs">
            <el-tab-pane name="logIn">
                <template #label>
                    <span class="tabs-label">
                        <el-icon>
                            <calendar />
                        </el-icon>
                        <span>登录</span>
                    </span>
                </template>
            </el-tab-pane>
            <el-tab-pane name="signIn">
                <template #label>
                    <span class="tabs-label">
                        <el-icon>
                            <calendar />
                        </el-icon>
                        <span>注册</span>
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs> -->
        <div class="switch-orm">
            <!-- <LogIn v-show="activeState=='logIn'" @switch-to-sign="switchToSign"></LogIn> -->
            <LogInWithoutCaptchaVue v-show="activeState=='logIn'" @switch-to-sign="switchToSign"></LogInWithoutCaptchaVue>
            <SignIn v-show="activeState=='signIn'"></SignIn>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import LogIn from "../components/entry/LogIn.vue";
import LogInWithoutCaptchaVue from '@/components/entry/LogInWithoutCaptcha.vue';
import SignIn from '@/components/entry/SignIn.vue';
const activeState = ref('logIn')

const switchToSign = ()=> {
    activeState.value = 'signIn'
}


</script>

<style lang="scss" scoped>
.el-tabs__nav {
    align-content: center;
}
.entry-tabs {
    // TODO 
    padding: 20px 150px 0px 150px;
}
.fu-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: 2;
    width: 25%;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #f56c6c;
    box-shadow: 5px 5px 8px 0px #707070;
}

.fu-bg-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    width: 100%;
}

.fu-bg {
    height: 100%;
    width: 100%;
    background-color: #f56c6c;
    filter: opacity(0.4);
}
</style>