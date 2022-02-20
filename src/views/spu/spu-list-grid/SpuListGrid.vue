<template>
  <el-container class="edit-container">
    <el-header class="header">
      <el-button :disabled="addBtnDisabled" class="btn-add" type="success" :icon="Plus" @click="emit('addIt')">
        添加SPU
      </el-button>
      (图片是按要求整理传上去了，估计后台把响应接口关闭，所以没有显示)
    </el-header>
    <el-main class="main">
      <el-table
        class="table"
        :border="true"
        :data="spuList" 
        tableLayout="auto"
        width="100%"
        >
        <el-table-column prop="id" label="序号" width="100px" />

        <el-table-column prop="spuName" label="SPU名称" width="300px" />

        <el-table-column prop="description" label="SPU描述">

        </el-table-column>

        <el-table-column label="操作" width="240px">

          <template #default="{ row }">
            <el-button size="small" :icon="Monitor" type="success" @click="emit('showSku', row.id)"></el-button>
            <el-button size="small" :icon="Edit" type="primary" @click="emit('editIt', row.id)"></el-button>
            <el-button size="small" :icon="Delete" type="warning" @click="emit('deleteIt', row.id)"></el-button>
          </template>

        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer">
        <el-pagination 
          class="btn-panel" 
          background 
          layout="prev, pager, next" 
          :total="pageInfo.total"
          :page-size="pageInfo.size" 
          @current-change="currentChange"
          >
        </el-pagination>
    </el-footer>  
  </el-container>
</template>

<script lang="ts" setup>
import { Spu } from '@/types/spu'
import { PageInfo } from '@/types/api'

import { Plus, Edit, Delete, Monitor } from '@element-plus/icons-vue'

defineProps<{
  spuList: Spu[],
  pageInfo: PageInfo,
  addBtnDisabled: boolean
}>()

const emit= defineEmits<{
  (e: 'pageChange', pageNo: number): void,
  (e: 'showSku', id: number): void,
  (e: 'addIt'): void,
  (e: 'editIt', id: number): void,
  (e: 'deleteIt', id: number): void,
}>()

const currentChange = (pageNo: number) => {
  emit('pageChange', pageNo)
}

</script>

<style lang="less" scoped>
.edit-container {
  padding: 0;
  margin: 0;
  height: 100%;
  .header {
    width: 100%;
    height: 80px;
    line-height: 80px;
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
    height: 80px;
    line-height: 80px;

    .btn-panel {
      width: 380px;
      margin: 0 auto;
    }
  }
}
</style>