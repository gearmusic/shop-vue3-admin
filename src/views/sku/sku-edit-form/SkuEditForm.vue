<template>
  <el-main class="edit-container">
    <el-main class="main">
      <el-form>
        <el-form-item label="所属SPU" :label-width="80" style="width: 100%;">
          {{ sku.spuName }}
        </el-form-item>     
        <el-form-item label="SKU名称" :label-width="80" style="width: 100%;">
          <el-input type="input" v-model="sku.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)"  :label-width="80" style="width: 100%;">
          <el-input-number v-model="sku.price" :min="0" :max="10000" />
        </el-form-item>
        <el-form-item label="重量(千克)" v-model="sku.weight"  :label-width="80" style="width: 100%;">
          <el-input-number v-model="_weight" :min="0" :max="100" />
        </el-form-item>
        <el-form-item label="规格描述" :label-width="80" style="width: 100%;">
          <el-input v-model="sku.skuDesc" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="平台属性" :label-width="80" style="width: 100%;">
          <el-row style="width: 100%">
            <el-col v-for="(item, index) in sku.skuAttrValueList" :key="index" :span="6" style="margin-bottom: 5px;">
              <el-form-item :label="item.attrName" :label-width="70" style="width: 100%;">
                <el-select v-model="item.valueId" placeholder="下拉选择">
                  <el-option v-for="(options, oIndex) in item.saleAttrOptions" :key="item.id + '-' + oIndex" :label="options.text" :value="options.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="销售属性" :label-width="80" style="width: 100%;">
          <el-row style="width: 100%">
            <el-col v-for="(item, index) in sku.skuSaleAttrValueList" :key="index" :span="6" style="margin-bottom: 5px;">
              <el-form-item :label="item.saleAttrName" :label-width="70" style="width: 100%;">
                <el-select v-model="item.saleAttrValueId" placeholder="下拉选择">
                  <el-option v-for="(options, oIndex) in item.saleAttrValueOptions" :key="item.id + '-' + oIndex" :label="options.text" :value="options.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="SKU图片" :label-width="80" style="width: 100%;">
          <file-uploader :fileList="(sku.skuImageList as UploadFile[])" />
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer class="footer">
      <div class="btn-panel">
        <el-button :icon="Select" type="primary" @click="saveIt">确认新增</el-button>
        <el-button :icon="Close"  @click="emit('formClose')">取消</el-button>
      </diV> 
    </el-footer>
  </el-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import { Sku } from '@/types/sku'

import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

import { Select, Close } from '@element-plus/icons-vue'
import FileUploader from '@/components/file-uploader/FileUploader.vue'

const props = defineProps<{
  sku: Sku
}>()

const _weight = ref(0)

const emit= defineEmits<{
  (e: 'update:sku', spu: Sku): void,
  (e: 'formClose'): void,
  (e: 'saveIt'): void,  
}>()

const saveIt = () => {
  if(props.sku.skuName.trim() === ''){
    ElMessage({
      message: 'SKU名称不能为空！',
      type: 'warning',
    })

    return
  }

  if(props.sku.price === 0){
    ElMessage({
      message: 'SKU价格不能为0！',
      type: 'warning',
    })

    return
  }

  if(_weight.value === 0){
    ElMessage({
      message: 'SKU重量不能为空！',
      type: 'warning',
    })

    return
  } else {
    props.sku.weight = _weight.value + ''
  }

  props.sku.skuAttrValueList.forEach(m => {
    if(m.valueId === '') {
      ElMessage({
        message: `请下拉选择 平台属性：${ m.attrName } 的值!`,
        type: 'warning',
      })
      return
    }
  })

  props.sku.skuSaleAttrValueList.forEach(m => {

    if(m.saleAttrValueId === '') {
      ElMessage({
        message: `请下拉选择 销售属性：${ m.saleAttrName } 的值!`,
        type: 'warning',
      })
      return
    }
  })

  emit('saveIt')
}

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