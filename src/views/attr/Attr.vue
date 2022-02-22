<template>
  <el-container class="container">

    <el-header class="header">
      <category-select :category="categoryStore.category" @change="categoryChanged"></category-select>
    </el-header>
    
    <el-main class="main">

      <attr-grid
        :attr-list="attrStore.attrsListOfCategory3"
        @row-add-click="rowAddClick"
        @rowEditClick="rowEditClick"
        @rowDeleteClick="deleteAttr"
        />

    </el-main>

  </el-container>

  <el-dialog
    v-model="dialogAttr"
    title=""
    width="50%"
    top="10vh"
  >
    <attr-editor 
      :attr="attrStore.attrObj"
      @closeFormClick="closeEditForm"
      @save-it="saveAttr"
      />
  </el-dialog>


</template>

<script lang="ts" setup>
import { ref } from 'vue'

import useAttrStore from '@/store/attr'
import useCategoryStore from '@/store/category'
import { ElMessage } from 'element-plus'

import CategorySelect from '@/components/category-select/CategorySelect.vue'
import AttrGrid from '@/views/attr/attr-grid/AttrGrid.vue' 
import AttrEditor from '@/views/attr/attr-editor/AttrEditor.vue' 

const attrStore = useAttrStore()
const categoryStore = useCategoryStore()

const dialogAttr = ref(false)

const categoryChanged = async (category3Id: number | '') => {
  attrStore.attrsList = []
  if(category3Id > 0) {
    await attrStore.getAttrsList(categoryStore.category)
  }
}

const rowAddClick = () => {
  if(categoryStore.category.category3Id > 0) {
    attrStore.attrObj = {
      id: 10000 + Math.ceil(Math.random() * 5000),
      attrName: '',
      categoryId: categoryStore.category.category3Id as number,
      categoryLevel: 3,
      attrValueList: []
    }
    dialogAttr.value = true
  } else {
    ElMessage({
      showClose: true,
      message: '请先选择平台属性的三级分类',
      type: 'error',
    })
  }

}

const rowEditClick = (index: number) => {
  attrStore.attrObj = attrStore.attrsListOfCategory3[index]
  dialogAttr.value = true
}

const deleteAttr = async (attrId: number) => {
  await attrStore.deleteAttr(attrId)
  await attrStore.getAttrsList(categoryStore.category)
}

const closeEditForm = async () => {
  await attrStore.getAttrsList(categoryStore.category)
  dialogAttr.value = false
}

const saveAttr = async () => {
  await attrStore.saveAttr(attrStore.attrObj)
  await attrStore.getAttrsList(categoryStore.category)
  dialogAttr.value = false
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