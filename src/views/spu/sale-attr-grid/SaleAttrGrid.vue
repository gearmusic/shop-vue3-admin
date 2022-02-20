<template>

  <div class="sale-attr-grid">
    <el-row>
      <el-col :span="12">
        <el-input v-model="saleAttr" width="300" type="input"></el-input>
      </el-col>   
      <el-col :span="12">
        <el-button class="btn-add" type="success" :icon="Plus" @click="addSaleAttr" style="margin-left: 10px;">
          增加新的属性
        </el-button>
        
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="24">

        <el-table
          :border="true"
          :data="spuSaleAttrList" 
          tableLayout="auto"
          width="100%"
          >
          <el-table-column prop="id" label="序号" width="100px" />

          <el-table-column prop="saleAttrName" label="属性名称" width="280px" />

          <el-table-column label="属性值管理">
            
            <template #default="{ row, $index }">
              <TagInputGroup :tag-list="row.spuSaleAttrValueList" :meta="{$index}"></TagInputGroup>
            </template>

          </el-table-column>

          <el-table-column label="操作" width="240px">

            <template #default="{ row, $index }">
              <el-button size="small" :icon="Delete" type="warning" @click="deleteSaleAttr($index)"></el-button>
            </template>

          </el-table-column>
        </el-table>

      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { SpuSaleAttr } from '@/types/spu'

import { Plus, Delete, CloseBold } from '@element-plus/icons-vue'
import TagInputGroup from '@/components/tag-input-group/TagInputGroup.vue'

const props = defineProps<{
  spuSaleAttrList:  SpuSaleAttr[]
}>()

const emit= defineEmits<{
  (e: 'update:attrList', attrList: SpuSaleAttr[]): void
}>()

const saleAttr = ref('')
const addSaleAttr = () => {
  if(saleAttr.value.trim() !== '') {
    props.spuSaleAttrList.push({
      id: 0,
      baseSaleAttrId: 0,
      saleAttrName: saleAttr.value,
      spuId: 0,
      spuSaleAttrValueList: []
    })

    saleAttr.value = ''
  }

  emit('update:attrList', props.spuSaleAttrList)
}

const deleteSaleAttr = (rowIndex: number) => {
  props.spuSaleAttrList.splice(rowIndex, 1)

  emit('update:attrList', props.spuSaleAttrList)
}

</script>

<style lang="less" scoped>
.sale-attr-grid {
  width: 100%;

  .row {
    margin: 10px 0;
  }
}
</style>