<template>
  <el-row class="select-container">

    <el-space wrap> 
      <label>一级分类</label>
      <el-select v-model="selectCategoryId.categoryId1" placeholder="请选择" @change="categoryChange(0, $event)">
        <el-option
          v-for="item in categoryStore.category1List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-space>

    <el-space wrap> 
      <label>二级分类</label>
      <el-select v-model="selectCategoryId.categoryId2" placeholder="请先选择一级分类" @change="categoryChange(1, $event)">
        <el-option
          v-for="item in categoryStore.category2List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-space>

    <el-space wrap>
      <label>三级分类</label>
      <el-select v-model="selectCategoryId.categoryId3" placeholder="请先选择二级分类" @change="categoryChange(2, $event)">
        <el-option
          v-for="item in categoryStore.category3List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-space>

  </el-row>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'

import { SelectCategoryId } from '@/types/category'
import useCatagoryStore from '@/store/category'

const categoryStore = useCatagoryStore()

const props = defineProps<{
  selectCategoryId: SelectCategoryId
}>()

const emit= defineEmits<{
  (e: 'update:selectCategoryId', selectCategoryId: SelectCategoryId): void
}>()

const categoryChange = (depth: number, id: number) => {
  switch(depth) {
    case 0: 
      categoryStore.getCategory2List(id)
      props.selectCategoryId.categoryId2 = ''
      props.selectCategoryId.categoryId3 = ''
      
      break;
    case 1:
      categoryStore.getCategory3List(id)
      props.selectCategoryId.categoryId3 = ''
      break;
    case 2:
      break;
  }

  emit('update:selectCategoryId', props.selectCategoryId)
}

nextTick(() => {
  categoryStore.getCategory1List()
})




</script>

<style lang="less" scoped>

.select-container {
  width: 98%;
  padding: 10px;
  margin: 5px;
  box-sizing: border-box;
  margin-top: 10 0 px;
  display: inline-flex;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  label {
    line-height: 30px;
    margin-right: 10px;
    width: 100px;
    text-align: right;
  }

}

</style>