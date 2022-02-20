<template>
  <el-container class="container">
    <el-header class="header">
      <category-select v-model:selectCategoryId="selectCategoryId"></category-select>
    </el-header>
    
    <el-card v-if="!editModel" class="card-container">
      <spu-list-grid
        class="main-container" 
        :spu-list="spuStore.spuList"
        :page-info="spuStore.pageInfo"
        :add-btn-disabled="(selectCategoryId.categoryId3 === '' || selectCategoryId.categoryId3 === 0)"
        @add-it="addIt"
        @edit-it="editIt"
        @delete-it="deleteIt"
        @page-change="pageChange"
        ></spu-list-grid>
    </el-card>

    <el-card v-else class="card-container">
      <spu-edit-form 
      class="main-container" 
      :spu="spuStore.spuObj"
      @form-close="editFormClose"
      @save-it="saveSpu"
      />
    </el-card>

  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'

import { SelectCategoryId } from '@/types/category'

import useSpuStore from '@/store/spu'

import CategorySelect from '@/components/category-select/CategorySelect.vue'
import SpuListGrid from './spu-list-grid/SpuListGrid.vue'
import SpuEditForm from './spu-edit-form/SpuEditForm.vue'

const spuStore = useSpuStore()

//三级分类选择结果存放器
const selectCategoryId = reactive({ categoryId1: '',  categoryId2: '', categoryId3: '' } as SelectCategoryId)

watch(selectCategoryId, async () => {
  if(selectCategoryId.categoryId3 > 0) {
    await spuStore.loadList(selectCategoryId.categoryId3, 10, 1)
    editModel.value = false
  } else {
    spuStore.spuList = []
  }
})

const editModel = ref(false)

const editFormClose = () => {
  editModel.value = false
}

const pageChange = (pageNo: number) => {
  spuStore.loadList(selectCategoryId.categoryId3, spuStore.pageInfo.size, pageNo)
}

const addIt = () => {
  if(selectCategoryId.categoryId3 > 0) {
    spuStore.getNewObj(selectCategoryId.categoryId3 as number)
    editModel.value = true
  }
}

const editIt = async (id: number) => {
  await spuStore.loadObj(id)

  editModel.value = true
} 

const deleteIt = async (id: number) => {
  await spuStore.delete(id)
  await spuStore.loadList(selectCategoryId.categoryId3,
   spuStore.pageInfo.size, spuStore.pageInfo.current > 1 && spuStore.pageInfo.current * spuStore.pageInfo.size === spuStore.pageInfo.total 
   ? spuStore.pageInfo.current - 1 : spuStore.pageInfo.current)
}

const saveSpu = async () => {
  await spuStore.saveIt()

  spuStore.loadList(selectCategoryId.categoryId3, spuStore.pageInfo.size, spuStore.pageInfo.current)
  editModel.value = false
}

</script>

<style lang="less" scoped>
.container {
  margin: 0;
  padding: 0;

  .header {
    height: 60px;
    margin: 0;
    padding: 0;
  }

  .card-container {
    margin: 5px;
    padding: 0;
    height: calc(100vh - 120px);

    .main {
      margin: 0;
      padding: 0;
    }
  }
}
</style>