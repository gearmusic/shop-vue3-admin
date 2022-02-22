<template>
  <el-table
    class="table"
    :border="true"
    :data="skuList" 
    tableLayout="auto"
    width="100%"
    >

    <el-table-column prop="id" label="序号" width="70" />

    <el-table-column label="SKU图片" width="150">
      <template #default="{ row }">
        <img :src="row.skuDefaultImg" style="max-width: 120px;">
      </template>
    </el-table-column>

    <el-table-column prop="skuName" label="SKU名称" width="260" />

    <el-table-column label="销售状态" width="170"  >
      <template #default="{ row }">
        <el-button-group v-if="row.isSale === 1">
          <el-button type="success">上架中</el-button>
          <el-button type="primary" @click="emit('saleIt',row.id, row.isSale)">
            <el-icon class="el-icon--right"><Sort /></el-icon>
          </el-button>
        </el-button-group>
        <el-button-group v-else>
          <el-button>已下架</el-button>
          <el-button type="primary" @click="emit('saleIt',row.id, row.isSale)">
            <el-icon class="el-icon--right"><Sort /></el-icon>
          </el-button>
        </el-button-group>
      </template>      
    </el-table-column>

    <el-table-column prop="skuDesc" label="SKU描述" />

    <el-table-column prop="price" label="价格(元)" width="100px" />

    <el-table-column prop="weight" label="重量(千克)" width="100px" />

    <el-table-column label="操作" width="180px">

      <template #default="{ row }">
        <el-button size="small" :icon="Picture" type="success" @click="emit('showSku', row.id)"></el-button>
        <el-button size="small" :icon="Edit" type="primary" @click="editIt"></el-button>
        <el-button size="small" :icon="Delete" type="warning" @click="emit('deleteIt', row.id)"></el-button>
      </template>

    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Sku } from '@/types/sku'

import { Delete, Picture, Sort, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

defineProps<{
  skuList: Sku[]
}>()

const emit= defineEmits<{
  (e: 'deleteIt', id: number): void,
  (e: 'showSku', id: number): void,
  (e: 'saleIt', id: number, isSale: 0 | 1): void,
}>()

const editIt = () => {
  ElMessage({
    message: '经测试后台Update接口无效，所以修改功能未开发！',
    type: 'warning',
  })
}

</script>

<style lang="less" scoped>

</style>