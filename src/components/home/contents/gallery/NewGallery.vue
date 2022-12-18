<template>
  <div>
    <el-row class="title">
      <el-col :span="2">
        <div>活动标题</div>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-input v-model="galleryState.gallery.title" placeholder="请输入" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
          <div>新闻封面</div>
      </el-col>
      <el-col :span="6" :offset="1">
          <el-upload
          action="" :before-upload="uploadcover" :limit="1">
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
              <div class="el-upload__tip">
                  jpg/png files with a size less than 500KB.
              </div>
          </template>
      </el-upload>
      </el-col>
      <el-row :span="6">
          <el-image v-if="galleryState.gallery.cover!=''" style="" :src="galleryState.gallery.cover" fit="fit" />
      </el-row>
  </el-row>
    <el-row>
        <el-col :span="2">
            <div>编辑内容</div>
          </el-col>
    </el-row>
    <el-row>
      <div class="editor">
        <v-md-editor
          v-model="galleryState.gallery.content"
          height="400px"
          left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear"
        ></v-md-editor>
      </div>
    </el-row>
    <el-row>
        <el-col :span="2">
            <div>选择位置</div>
          </el-col>
    </el-row>
    <el-row>
      <el-col :span="9" :offset="0">
        <div class="mapWrap">
          <div
            class="location"
            style="
              height: 10px;
              width: 10px;
              background-color: red;
              border-radius: 5px;
            "></div>
          <el-image
            style="width: 800px; height: auto"
            :src="url"
            class="img"
            fit="scale-down"
            @click="getXY"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="5">
        <el-button type="primary" @click="pubAnniv">&nbsp;发布&nbsp;</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reactive } from "vue";
import axiosInstance from "@/axios.config";
import { ElMessage } from "element-plus";
const galleryState = reactive({
  gallery: {
    title: "",
    content: "",
    position_x: 0.0,
    position_y: 0.0,
    cover:""
  },
});
const computeTS = () => {
  galleryState.gallery.position_x = parseInt(x.value.slice(0, -2)) / 800;
  galleryState.gallery.position_y = parseInt(y.value.slice(0, -2)) / 502;
};
const pubAnniv = () => {
  computeTS();
  axiosInstance.post("/api/auth/admin/gallery/", galleryState.gallery).then((res) => {
    if (res.status == 200) {
      ElMessage.success("创建成功");
      galleryState.gallery.title = "";
      galleryState.gallery.content = "";
      galleryState.gallery.cover = ""
      galleryState.gallery.position_x = 0.0;
      galleryState.gallery.position_y = 0.0;
    }
  });
};
const url = "/img/map.png";
const uploadcover = (
  uploadFile
) => {
    let formData = new FormData();
    formData.append('image', uploadFile);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axiosInstance.post('/api/auth/admin/img/', formData, config).then((res) => {
        if (res.status === 200) {
            galleryState.gallery.cover = res.data.data;
        }
    })
}
const x = ref("0px");
const y = ref("0px");
const getXY = (e) => {
  x.value = e.offsetX + "px";
  y.value = e.offsetY + "px";
};
</script>

<style lang="scss" scoped>
.mapWrap {
  position: relative;
}
.img {
  position: relative;
  top: 0px;
  left: 0px;
}
.location {
  position: absolute;
  top: v-bind(y);
  left: v-bind(x);
  z-index: 1000;
}
.editor {
  border: 1px solid #f56c6c;
  width: 100%;
  border-radius: 5px;
}
.el-row {
  text-align: center;
  margin: 20px 0;
  vertical-align: bottom;
}
.el-col {
  text-align: center;
  vertical-align: bottom;
}
</style>
