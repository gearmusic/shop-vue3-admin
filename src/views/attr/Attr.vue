<template>
  <el-container class="container">

    <el-header class="header">
      <category-select v-model:selectCategoryId="selectCategoryId"></category-select>
    </el-header>
    
    <el-main v-if="!editModel" class="main">

      <attr-grid
        :disabled="selectCategoryId.categoryId3 == ''"
        @rowAddClick="openEditForm(0)"
        @rowEditClick="openEditForm"
        @rowDeleteClick="deleteAttr"
        />

    </el-main>

    <el-main v-else>

      <attr-editor 
        :attr-id="attrId" 
        :category-id="selectCategoryId.categoryId3"
        @closeFormClick="closeEditForm"
        />

    </el-main>

  </el-container>

</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

import { SelectCategoryId } from '@/types/category'

import useAttrStore from '@/store/attr'

import CategorySelect from '@/components/category-select/CategorySelect.vue'
import AttrGrid from '@/views/attr/attr-grid/AttrGrid.vue' 
import AttrEditor from '@/views/attr/attr-editor/AttrEditor.vue' 

//穿透组件的数据操作器
const attrStore = useAttrStore()

//进出编辑模式的控制器
const editModel = ref(false)

//属性编号的传递器
const attrId = ref(0)

//三级分类选择结果存放器
const selectCategoryId = reactive({ categoryId1: '',  categoryId2: '', categoryId3: '' } as SelectCategoryId)

watch(selectCategoryId, async () => {
  editModel.value = !(selectCategoryId.categoryId1 > 0 || selectCategoryId.categoryId2 > 0 || selectCategoryId.categoryId3 > 0)
  selectCategoryId.categoryId3 > 0 && (await attrStore.getAttrsList(selectCategoryId))
})


const openEditForm = (_attrId: number) => {
  attrId.value = _attrId
  editModel.value = true
}

const deleteAttr = async (attrId: number) => {
  await attrStore.deleteAttr(attrId)
  await attrStore.getAttrsList(selectCategoryId)
}

const closeEditForm = async () => {
  await attrStore.getAttrsList(selectCategoryId)
  editModel.value = false
}

</script>

<style lang="less" scoped>

.container {

  .header {
    height: 60px;
    margin: 0;
    padding: 0;

  }



}

</style>