<template>
  <el-checkbox-group v-model="rolename">
    <el-checkbox :label="item.roleName" v-for="(item, index) in roleStore.allRole" :key="index" @change="handleChange" />
  </el-checkbox-group>
    
</template>

<script lang="ts" setup>
import useRoleStore from '@/store/role'

const roleStore = useRoleStore()

const props = defineProps<{
  rolename: string[]
}>()

const emit= defineEmits<{
  (e: 'roleChange', value: string): void
}>()

const handleChange = () => {
  emit("roleChange", props.rolename.join(','))
}

</script>

<style lang="less" scoped>

</style>