<template>
    <div class="form">
        <el-form ref="signInFormRef" :model="signInForm" status-icon label-width="60px"
            class="signInForm">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="signInForm.username" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="signInForm.password" type="password" autocomplete="off" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="重复" prop="repeatpw">
                    <el-input v-model="signInForm.checkPass" type="password" autocomplete="off" />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="16">
                    <el-form-item label="邮箱" prop="repeatpw">
                    <el-input v-model="signInForm.email" autocomplete="off" />
                </el-form-item>
                </el-col>
                <el-col :span="6" :offset="0" >
                    <el-button type="primary">验证</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="验证码" prop="captchacode">
                        <el-input v-model="signInForm.captchacode" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <img src="" alt="base64 verify">
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-button type="primary" @click="handleLogIn(logInFormRef)">登录</el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-button type="primary" plain @click="$emit('switchToSign')">注册</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
// import { ElMessage } from 'element-plus';
// import axios from '@/axios.config';
const signInForm = reactive({
    username: '',
    password: '',
    email:'',
    verifycode: ''
})
const logInFormRef = ref('logInFormRef')
</script>

<style lang="scss" scoped>
.form {
    padding: 20px;
}
</style>