<template>
  <el-row class="select-container">
    <el-space wrap> 
      <label>一级分类</label>
      <el-select v-model="category.category1Id" placeholder="请选择" @change="categoryChange(1, $event)">
        <el-option
          v-for="item in category.options1"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-space>
    <el-space wrap> 
      <label>二级分类</label>
      <el-select v-model="category.category2Id" placeholder="请先选择一级分类" @change="categoryChange(2, $event)">
        <el-option
          v-for="item in category.options2"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-space>

    <el-space wrap>
      <label>三级分类</label>
      <el-select v-model="category.category3Id" placeholder="请先选择二级分类" @change="categoryChange(3, $event)">
        <el-option
          v-for="item in category.options3"
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

import { Category } from '@/types/category'
import categoryService from '@/services/categoryService';

const props =defineProps<{
  category: Category
}>()

const emit= defineEmits<{
  (e: 'change', category3Id: number | ''): void
}>()

const categoryChange = (depth: number, id: number) => {
  switch(depth) {
    case 1: 
      categoryService.getCategory2List(props.category, id)
      props.category.category2Id = ''
      props.category.category3Id = ''
      
      break;
    case 2:
      categoryService.getCategory3List(props.category, id)
      props.category.category3Id = ''
      break;
    case 3:
      break;
  }

  emit('change', props.category.category3Id)
}

</script>

<style lang="less" scoped>

.select-container {
  width: calc(100% - 10px);
  padding: 0;
  margin: 5px;
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  margin-top: 10 0 px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  label {
    line-height: 30px;
    margin-right: 10px;
    width: 100px;
    text-align: right;
  }

}

</style>