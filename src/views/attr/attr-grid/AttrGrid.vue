<template>
  <div>
    <el-row class="row">
      <el-button class="btn-add" type="success" :icon="Plus" @click="emit('rowAddClick')" :disabled="disabled">
        新增
      </el-button>

      <span> 由于后台设了限制，新增功能比较玄学，你得大概猜测相应模块允许的id范围就能成功，修改非系统默认是没问题的</span>
    </el-row>    

    <el-table
      class="table"
      :data="attrStore.attrsListOfCategory3" 
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

        <template #default="{ row }">
          <el-button :icon="Edit" type="primary" @click="emit('rowEditClick', row.id)" :disabled="disabled">修改</el-button>
          <el-button :icon="Delete" type="warning" @click="emit('rowDeleteClick', row.id)" :disabled="disabled">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

import useAttrStore from '@/store/attr'

const attrStore = useAttrStore()

defineProps<{
  disabled: boolean
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