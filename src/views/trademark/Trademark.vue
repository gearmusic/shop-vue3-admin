<template>
  <el-container class="container">

    <el-header class="header">
      <el-button class="btn-add" type="success" :icon="Plus" @click="showAdd">
        新增
      </el-button>
    </el-header>

    <el-main class="main">

      <el-table
        class="table"
        :data="tradeStore.trademarkList" 
        :border="true" 
        tableLayout="fixed"
        style="width: 100%"
       >
        <el-table-column prop="id" label="Id" width="120px" />

        <el-table-column prop="tmName" label="品牌名称" width="300px" />

        <el-table-column prop="logoUrl" label="图片">
          <template #default="scope">
            <img :src="scope.row.logoUrl" >
          </template>
        </el-table-column>
        <el-table-column prop="logoUrl" label="操作">

          <template #default="scope">
            <el-button :icon="Edit" type="success" @click="showUpdate(scope.row.id)">修改</el-button>
            <el-button :icon="Delete" type="warning" @click="deleteTrademark(scope.row.id)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>

    </el-main>

    <el-footer class="footer">
      <el-pagination 
        class="pagination" 
        background 
        layout="prev, pager, next" 
        :total="tradeStore.pageInfo.total"
        :page-size="tradeStore.pageInfo.size" 
        @current-change="currentChange"
        >
      </el-pagination>
    </el-footer>

  </el-container>

  <el-dialog v-model="dialogSave" title="新增品牌">
    <el-form :model="form" style="width: 80%;">

      <el-form-item label="品牌名称" :label-width="120">
        <el-input v-model="form.tmName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="品牌照片" :label-width="120">
        <el-upload
          class="avatar-uploader"
          action="/dev-api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"

        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer"  style="text-align: center;">
        <el-button type="primary" @click="clickSave">保存</el-button>
        <el-button @click="dialogSave = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { Plus, Edit, Delete } from '@element-plus/icons-vue'

import { Trademark } from '@/types/trademark'

import type {
  UploadFile,
  ElUploadProgressEvent
} from 'element-plus/es/components/upload/src/upload.type'

import useTrademarkStore from '@/store/trademark'

const tradeStore = useTrademarkStore()

const dialogSave = ref(false)

const form = reactive({} as Trademark)

const toast = ref()

const showAdd = () => {
  dialogSave.value = true
  form.id = 0
  form.tmName = ''
  form.logoUrl = ''
}

const showUpdate = async (id: number) => {
  dialogSave.value = true

  let _form = await tradeStore.getTrademark(id)

  form.id = _form.id
  form.tmName = _form.tmName
  form.logoUrl = _form.logoUrl

  imageUrl.value = _form.logoUrl
}

const clickSave = async () => {
  if(form.tmName.trim() === '') {
    ElMessage({
      message: '品牌名称不能为空！',
      type: 'warning',
    })

    return
  }

  if(form.logoUrl.trim() === '') {
    ElMessage({
      message: '品牌Logo不能为空！',
      type: 'warning',
    })

    return
  }

  if(form.id === 0){
    if(await tradeStore.postTrademark(form)) {
      ElMessage({
        message: '操作执行成功',
        type: 'success',
      })
      dialogSave.value = false
    }else{
      ElMessage({
        message: '操作执行失败',
        type: 'warning',
      })
    }
  } else {
    if(await tradeStore.putTrademark(form)) {
      ElMessage({
        message: '操作执行成功',
        type: 'success',
      })

      dialogSave.value = false
    }else{
      ElMessage({
        message: '操作执行失败',
        type: 'warning',
      })
    }
  }

}

const currentChange = (pageNo: number) => {
  tradeStore.getPageList(tradeStore.pageInfo.size, pageNo)
}

const deleteTrademark = async (id: number) => {
  if(await tradeStore.deleteTrademark(id)) {
    ElMessage({
      message: '操作执行成功',
      type: 'success',
    })
  }else{
    ElMessage({
      message: '操作执行失败',
      type: 'warning',
    })
  }

}

const imageUrl = ref('')

const handleAvatarSuccess = async (res: ElUploadProgressEvent, file: UploadFile) => {
  let filename = ((await file).response! as {data: string}).data
  form.logoUrl = filename
  imageUrl.value = URL.createObjectURL(file.raw)
}

nextTick(async () => {
  await tradeStore.getPageList(5, 1)
})

</script>

<style lang="less" scoped>
.container {

  .header {
    height: 40px;
    .btn-add {
      margin-top: 5px;
    }
  }

  .main {
    height: calc(100vh - 40px - 60px - 50px);
    overflow: auto;

    .table {

      img {
        height: 75px;
      }
    }
  }

  .footer {
    height: 50px;
    text-align: center;
  
    .pagination {
      margin: 10px auto;
      width: 450px;
    }
  }
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>