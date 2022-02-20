<template>
  <el-upload 
    list-type="picture-card"
    action="/dev-api/admin/product/fileUpload"
    :on-success="handleUploadSuccess"
    :file-list="fileList"
    >
    <template #default>
      <el-icon><plus /></el-icon>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />

        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
             @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, ElUploadProgressEvent } from 'element-plus/es/components/upload/src/upload.type'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//const fileList = reactive([] as UploadFile[])

const props = defineProps<{
  fileList: UploadFile[]
}>()

const emit= defineEmits<{
  (e: 'update:fileList', fileList: UploadFile[]): void
}>()

const handleUploadSuccess = async (res: ElUploadProgressEvent, file: UploadFile) => {
  
  props.fileList.push(file)
  emit('update:fileList', props.fileList)
}

const handleRemove = async (file: UploadFile) => {
  let _file = await file
  props.fileList.splice(props.fileList.findIndex(m => m.uid === _file.uid), 1)
  emit('update:fileList', props.fileList)
}

const handlePictureCardPreview = async (file: UploadFile) => {
  let filename = (await file).url!
  dialogImageUrl.value = filename
  dialogVisible.value = true
}

</script>

<style lang="less" scoped>

</style>