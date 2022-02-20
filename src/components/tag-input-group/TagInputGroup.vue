<template>
  <span v-for="(item, index) in tagList" :key="index">
    <el-input 
      class="input" 
      v-if="item.selected"
      v-model="item.value" 
      autocomplete="off"
      style="width: 180px;margin-right:10px;" 
      @keyup.enter="handleConfirm(index)"
      @blur="handleConfirm(index)"
      > 
      <template #suffix>
        <el-icon class="el-input__icon"><Check @click="handleConfirm(index)" /></el-icon>
      </template>
    </el-input >
    <el-tag 
      v-else
      :closable="true"
      @close="removeTag(index)"
      @click="openInput(index)"           
      type="success" 
      style="margin-right:10px;">
      {{ item.value }}
    </el-tag>
  </span>

  <el-input 
    class="input" 
    v-if="tag4Add.selected"  
    style="width: 180px;" 
    v-model="tag4Add.value" 
    autocomplete="off"
    @keyup.enter="handleConfirm(-1)"
    @blur="handleConfirm(-1)"
    > 
    <template #suffix>
      <el-icon class="el-input__icon" @click="handleConfirm(-1)"><Check /></el-icon>
    </template>
  </el-input >
  <el-button 
    v-else 
    :icon="Plus" 
    type="primary" 
    size="small" 
    @click="openInput(-1)" 
    plain
    >
    新标签
  </el-button>  

</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Plus, Check } from '@element-plus/icons-vue'
import { TagSelect } from '@/types'

const tag4Add = reactive({ value: '', selected: false } as TagSelect)

const props = defineProps<{
  tagList: TagSelect[]
}>()

const emit= defineEmits<{
  (e: 'update:tagList', tagList: TagSelect[]): void
}>()

const handleConfirm =  (index: number) => {
  if(index >= 0){
    if(props.tagList[index].value.trim() === ''){
      props.tagList.splice(index, 1)
    } else {
      props.tagList[index].selected = false
    }
  } else {
    if(tag4Add.value.trim() !== ''){
      props.tagList.push({
        selected: false,
        value: tag4Add.value
      })
    }else{
      tag4Add.selected = false
    }

  }

  emit('update:tagList', props.tagList)
  resetSelected()
}
  


const openInput = (index: number) => {
  resetSelected()

  if(index >= 0){
    props.tagList[index].selected = true
  } else {
    tag4Add.selected = true
  } 
}

const removeTag = (index: number) => {
  resetSelected()

  props.tagList.splice(index, 1)
  emit('update:tagList', props.tagList)
}

const resetSelected = () => {
  props.tagList.forEach(m => {
    m.selected = false
  })

  tag4Add.selected = false
  tag4Add.value = ''
}

</script>

<style lang="less" scoped>

</style>