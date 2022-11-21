<template>
    <div>
        <el-row>
            <el-col :span="2">
                头像：
            </el-col>
            <el-col :span="4">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <p class="notes">只能上传jpg/png图片,且不大于500KB。</p>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2">
                用户名:
            </el-col>
            <el-col :span="4" :offset="0">
                <el-input v-model="input" placeholder="请输入" clearable />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2">
                修改密码:
            </el-col>
            <el-col :span="4" :offset="0">
                <el-input v-model="input" type="password" placeholder="请输入您的密码" show-password />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="2">
                再次输入:
            </el-col>
            <el-col :span="4" :offset="0">
                <el-input v-model="input" type="password" placeholder="请再次输入密码" show-password />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2" :offset="2">
                <el-button type="primary" plain>保存</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed #8c939d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #8c939d;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
<style lang="scss" scoped>
.notes {
    font-size: 12px;
    color: #8c939d;
}
</style>