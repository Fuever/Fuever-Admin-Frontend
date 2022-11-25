<template>
    <div class="form">
        <el-form  :model="logInForm" status-icon :rules="rules" label-width="60px" class="logInForm">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="logInForm.username"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="logInForm.password" type="password" autocomplete="off" />
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="16">
                    <el-form-item label="验证码" prop="captchacode">
                        <el-input v-model="logInForm.captchacode" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <img src="" alt="base64 verify">
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-button type="primary" @click="handleLogIn">登录</el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-button type="primary" plain @click="$emit('switchToSign')">注册</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import axiosInstance from '@/axios.config';
const logInForm = reactive({
    username: '1234567',
    password: '1234567',
})
const handleLogIn = () => {
    const args = {
        name: logInForm.username,
        password: logInForm.password,
    }
    axiosInstance.post('/api/pub/admin/login',args).then((res) => {
        if (res.status == 200) {
            ElMessage({
                message: '登录成功',
                type: 'success'
            })
            console.log(res);
            window.localStorage.setItem('token', res.data.data.token)
            router.push('/home')
        } else {
    ElMessage.error("登录失败，请稍后再试！")
return false
        }
    })
} 


const checkUserame = (_, value, callback) => {
    if (!value) {
        return callback(new Error('请输入用户名！'))
    } else if (!/^\w+$/.test(logInForm.username)) {
        return callback(new Error('用户名不应含有特殊字符！'))
    } else {
        return callback()
    }
}
const checkPassword = (_, value, callback) => {
    if (!value) {
        return callback(new Error('请输入密码！'))
    } else {
        return callback()
    }
}
const checkCaptcha = (_, value, callback) => {
    if (!value) {
        return callback(new Error('请输入验证码！'))
    } else {
        return callback()
    }
}

const rules = reactive({
    username: [{ validator: checkUserame, trigger: 'change' }],
    passowrd: [{ validator: checkPassword, trigger: 'blur' }],
    captchacode: [{ validator: checkCaptcha, trigger: 'blur' }],
})
</script>

<style lang="scss" scoped>
.form {
    padding: 20px;
}
</style>