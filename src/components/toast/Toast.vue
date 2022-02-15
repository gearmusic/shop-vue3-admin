<template>
  <el-dialog
    v-model="_isShow"
    title="Tips"
    width="320px"
  >
    <span>{{ _message }}</span>

  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const _isShow = ref(false)
const _message = ref('')

const showMessage = (message: '', duration = 1500): void => {
  _message.value = message
  _isShow.value = true
  setTimeout(() => {
    _isShow.value = false
  }, duration)
}

defineExpose({
  showMessage
})

</script>

<style lang="less" scoped>

</style>