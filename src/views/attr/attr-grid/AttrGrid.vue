<template>
  <div>
    <el-row class="row">
      <el-button class="btn-add" type="success" :icon="Plus" @click="emit('rowAddClick')">
        新增
      </el-button>
    </el-row>    

    <el-table
      class="table"
      :data="attrList" 
      :border="true" 
      tableLayout="auto"
      width="100%"
      >
      <el-table-column prop="id" label="序号" width="100px" />

      <el-table-column prop="attrName" label="属性名称" width="200px" />

      <el-table-column label="属性值列表">
        <template #default="{ row, $index }">
          <el-tag class="tag" type="success" v-for="item in row.attrValueList" :key="item.id">
            {{ item.valueName }}
          </el-tag>
        </template>     
      </el-table-column>

      <el-table-column label="操作" width="220px">

        <template #default="{ row, $index }">
          <el-button :icon="Edit" type="primary" @click="emit('rowEditClick', $index)">修改</el-button>
          <el-button :icon="Delete" type="warning" @click="emit('rowDeleteClick', row.id)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

import { Attr } from '@/types/attr'

const props = defineProps<{
  attrList: Attr[]
}>()

const emit= defineEmits<{
  (e: 'rowAddClick'): void,
  (e: 'rowEditClick', attrId: number): void,
  (e: 'rowDeleteClick', attrId: number): void
}>() 

</script>

<style lang="less" scoped>
.main {
  height: calc(100vh - 40px - 70px);
  overflow: auto;
  position: relative;

  .row {
    height: 50px;

  }

  .input{
    margin: 5px;
  }

  .tag {
    margin: 5px;
  }
}
</style>