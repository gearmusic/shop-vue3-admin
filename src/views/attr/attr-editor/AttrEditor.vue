<template>
    <el-form>

      <el-form-item label="属性名称" :label-width="80" style="width: 95%;">
        <el-input v-model="attr.attrName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="属性值" :label-width="80" style="width: 95%">
        
        <tag-input-group :tag-list="attr.attrValueList"></tag-input-group>
        
      </el-form-item>

      <el-form-item :label-width="80">
        <el-button type="primary" @click="handleSaveAttr">保存</el-button>
        <el-button @click="emit('closeFormClick')">取消</el-button>
      </el-form-item>

    </el-form>

</template>

<script lang="ts" setup>
import { toRaw } from 'vue'
import { ElMessage } from 'element-plus'

import { Attr } from '@/types/attr'

import TagInputGroup from '@/components/tag-input-group/TagInputGroup.vue';

const props = defineProps<{
  attr: Attr
}>()

const emit= defineEmits<{
  (e: 'closeFormClick' ): void
  (e: 'saveIt' ): void
}>() 

const handleSaveAttr = async () => {

  if(props.attr.attrName.trim() === '') {
    ElMessage({
      showClose: true,
      message: '属性名称不能为空',
      type: 'warning',
    })
    return
  }

  if(toRaw(props.attr.attrValueList).length === 0) {
    ElMessage({
      showClose: true,
      message: '请至少设置一项属性值',
      type: 'warning',
    })    
    return
  }

  //整理数据
  props.attr.attrValueList.forEach(m => {
    m.attrId = props.attr.id
    m.valueName = m.value
  })

  emit('saveIt')
}

</script>

<style lang="less" scoped>
  .box-card {
    width: 550px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tag {
      margin: 5px;
    }
  }
</style>