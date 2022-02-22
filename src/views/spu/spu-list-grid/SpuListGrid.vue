<template>
  <el-table
    class="table"
    :border="true"
    :data="spuList" 
    tableLayout="auto"
    width="100%"
    >
    <el-table-column prop="id" label="序号" width="100px" />

    <el-table-column prop="spuName" label="SPU名称" width="280px" />

    <el-table-column prop="description" label="SPU描述" width="280px" />

    <el-table-column label="销售属性">
      <template #default="{ row, $index }">
        <div class="tag-row" v-for="(item,index) in row.spuSaleAttrList" :key="index" style="width: 100%;"> 
          <span>{{ item.saleAttrName }}</span> :
          <el-tag :type="($index%2 === 0 ? 'success' : 'warning')" class="tag" v-for="(itemChild, indexChild) in item.spuSaleAttrValueList" :key="index + '-' + indexChild">{{ itemChild.saleAttrValueName }}</el-tag>
        </div>
      </template>

    </el-table-column>

    <el-table-column label="数据操作" width="130px">

      <template #default="{ row }">

        <el-button size="small" :icon="Edit" type="primary" @click="emit('editIt', row.id)"></el-button>
        <el-button size="small" :icon="Delete" type="warning" @click="emit('deleteIt', row.id)"></el-button>
      </template>

    </el-table-column>

    <el-table-column label="关联SKU操作" width="130px">

      <template #default="{ row }">
        <el-button size="small" :icon="Monitor" type="success" @click="emit('showSkuList', row.id)"></el-button>
        <el-button size="small" :icon="Plus" type="success" @click="emit('addSku', row.id)"></el-button>
      </template>

    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Spu } from '@/types/spu'
import { PageInfo } from '@/types/api'

import { Plus, Edit, Delete, Monitor } from '@element-plus/icons-vue'

defineProps<{
  spuList: Spu[]
}>()

const emit= defineEmits<{
  (e: 'editIt', id: number): void,
  (e: 'deleteIt', id: number): void,
  (e: 'addSku', id: number): void,
  (e: 'showSkuList', id: number): void,
}>()

</script>

<style lang="less" scoped>
.table {
  .tag-row {
    line-height: 30px;

    .tag {
      margin: 0 10px 0 0;
    }
  }

}
</style>