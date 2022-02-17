<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>属性修改</span>
        <CloseBold style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer;" @click="emit('closeFormClick')"></CloseBold>
      </div>
    </template>
    <el-form>

      <el-form-item label="属性名称" :label-width="80" style="width: 95%;">
        <el-input v-model="selectedAttr.attr.attrName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="属性值" :label-width="80" style="width: 95%">
        <el-scrollbar style="height: 400px;">

          <template
            v-for="(item, index) in selectedAttr.attr.attrValueList"
            :key="index"
            >
            <el-input 
              class="input" 
              v-if="item.selected"  
              style="width: 180px;" 
              v-model="item.valueName" 
              autocomplete="off"
              @keyup.enter="handleAttrValueConfirm(item)"
              @blur="handleAttrValueConfirm(item)"
              > 
              <template #suffix>
                <el-icon class="el-input__icon" @click="handleAttrValueConfirm(item)"><Check /></el-icon>
              </template>
            </el-input >
            <el-tag
              v-else
              class="tag" 
              type="success" 
              :closable="true"
              @close="removeTag(index)"
              @click="openAttrValue(index)"
              >
              {{ item.valueName }}
            </el-tag>
            
          </template>

          <el-input 
            class="input" 
            v-if="attrValue.selected"  
            style="width: 180px;" 
            v-model="attrValue.valueName" 
            autocomplete="off"
            @keyup.enter="handleAttrValueConfirm(0)"
            @blur="handleAttrValueConfirm(0)"
            > 
            <template #suffix>
              <el-icon class="el-input__icon" @click="handleAttrValueConfirm(0)"><Check /></el-icon>
            </template>
          </el-input >
          <el-button v-else :icon="Plus" type="primary" size="small" @click="openAttrValue(0)">新标签</el-button>

        </el-scrollbar>          
        
      </el-form-item>

      <el-form-item :label-width="80">
        <el-button type="primary" @click="handleSaveAttr">保存</el-button>
        <el-button @click="emit('closeFormClick')">取消</el-button>
      </el-form-item>

    </el-form>

  </el-card>

  <toast ref="toast" />
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue'
import { Plus, Check, CloseBold } from '@element-plus/icons-vue'

import { Attr, AttrValue } from '@/types/attr'

import useAttrStore from '@/store/attr'

import Toast from '@/components/toast/Toast.vue'


const attrStore = useAttrStore()

const props = defineProps<{
  attrId: number,
  categoryId: number | ''
}>()

const emit= defineEmits<{
  (e: 'closeFormClick' ): void
}>() 

const toast = ref()

const selectedAttr = reactive({ attr: {} as Attr })
if(props.attrId == 0) {
  selectedAttr.attr = {
    id: 9500 + Math.ceil(500 * Math.random()),
    attrName: '',
    categoryId: props.categoryId as number,
    categoryLevel: 3,
    attrValueList: []
  }
} else {
  selectedAttr.attr = attrStore.attrsListOfCategory3.filter(m => m.id === props.attrId)[0]
}

const attrValue = reactive({
  id: 0,
  valueName: '',
  attrId: 0,
  selected: false
} as AttrValue)

const removeTag = (index: number) => {
  selectedAttr.attr.attrValueList.splice(index, 1)
}

const openAttrValue = (index: number) => {
  selectedAttr.attr.attrValueList.forEach(m => m.selected = false)
  attrValue.selected = false

  if(index === 0){
    attrValue.valueName = ''
    attrValue.selected = true
  } else {
    selectedAttr.attr.attrValueList[index]!.selected = true
  }
}

const handleAttrValueConfirm = async (row: AttrValue | 0) => {
  if(row === 0) {
    selectedAttr.attr.attrValueList.push({
      id: 0,
      attrId: selectedAttr.attr.id,
      valueName: attrValue.valueName,
      selected: false
    })
  }

  selectedAttr.attr.attrValueList.forEach(m => m.selected = false)
  attrValue.selected = false
}

const handleSaveAttr = async () => {

  if(selectedAttr.attr.attrName.trim() === '') {
    toast.value.showMessage('属性名称不能为空！')
    return
  }

  if(toRaw(selectedAttr.attr.attrValueList).length === 0) {
    toast.value.showMessage('请至少设置一项属性值！')
    return
  }

  if(selectedAttr.attr.attrValueList.filter(m => m.valueName.trim() === '').length > 0) {
    toast.value.showMessage('不能有空属性值存在！')
    return
  }

  await attrStore.saveAttr(selectedAttr.attr)

  emit('closeFormClick')
  //await attrStore.getAttrsList(selectCategoryId)

  //editModel.value = false
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