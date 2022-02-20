<template>
  <el-container class="edit-container">
      <el-header class="header">
        
        <span v-if="spu.id > 0"><Edit style="height: 1em; width:1em; margin-right: 10px;" />SPU修改</span>

        <span v-else><Plus style="height: 1em; width:1em; margin-right: 10px;" />SPU新增</span>

        <CircleClose class="icon-close" @click="emit('formClose')"></CircleClose>  
      </el-header>
      <el-main class="main">

      <el-form :form="spu">
        <el-row>
          <el-col :span="11">
            <el-row>
              <el-form-item label="SPU名称" :label-width="70" style="width: 100%;">
                <el-input v-model="spu.spuName" type="input"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="所属品牌" :label-width="70" style="width: 100%;">
                <brand-select v-model:trademarkId="spu.tmId" style="width: 100%;" />
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="2"></el-col>          
          <el-col :span="11">
            <el-form-item label="SPU描述" :label-width="70">
              <el-input v-model="spu.description" type="textarea" rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">   
            <el-form-item label="SPU图片" :label-width="70">
              <file-uploader :fileList="(spu.spuImageList as UploadFile[])" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="属性管理" :label-width="70">
              <sale-attr-grid v-model:spuSaleAttrList="spu.spuSaleAttrList" />
            </el-form-item>
          </el-col>
        </el-row>
          
      </el-form>

      </el-main>
      <el-footer class="footer">
        <div class="btn-panel">
          <el-button :icon="Select" type="primary" @click="emit('saveIt')">保存</el-button>
          <el-button :icon="Close" @click="emit('formClose')">取消</el-button>
        </diV>

      </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import { Spu } from '@/types/spu'

import { Plus, Edit, Select, CircleClose, Close } from '@element-plus/icons-vue'
import BrandSelect from '@/components/brand-select/BrandSelect.vue'
import FileUploader from '@/components/file-uploader/FileUploader.vue'
import SaleAttrGrid from '@/views/spu/sale-attr-grid/SaleAttrGrid.vue'

defineProps<{
  spu: Spu
}>()

const emit= defineEmits<{
  (e: 'update:spu', spu: Spu): void,
  (e: 'formClose'): void,
  (e: 'saveIt'): void,
}>()

</script>

<style lang="less" scoped>
.edit-container {
  padding: 0;
  margin: 0;
  .header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;

    span {
      font-size:18px;
    }

    .icon-close {
      width: 1em; 
      height: 1em; 
      margin-right: 8px; 
      cursor: pointer;
    }
  }

  .footer {
    padding: 0;
    margin: 0;    
    height: 40px;
    line-height: 40px;

    .btn-panel {
      width: 300px;
      margin: 0 auto;
    }
  }
}
</style>