<template>
  <el-select v-model="trademarkId" placeholder="下拉选择" @change="handleChange">
    <el-option v-for="item in trademarkStore.trademarkAllList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
import useTrademarkStore from '@/store/trademark'

const trademarkStore = useTrademarkStore()

nextTick(() => {
  trademarkStore.getAllList()
})

defineProps<{
  trademarkId: number
}>()

const emit= defineEmits<{
  (e: 'update:trademarkId', value: number): void
}>()

const handleChange = (value: number) => {
  emit("update:trademarkId", value)
}

</script>

<style lang="less" scoped>

</style>