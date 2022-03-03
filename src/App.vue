<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import useCatagoryStore from '@/store/category'
import categoryService from '@/services/categoryService';

import useSpuStore from '@/store/spu'
import useSkuStore from '@/store/sku'
import useAttrSpuStore from '@/store/attr'

import useUserStore from '@/store/user'
import useRoleStore from '@/store/role'

const categoryStore = useCatagoryStore()

categoryStore.category = { category1Id: 2, category2Id: 13, category3Id: 61, options1:[], options2:[], options3:[] }
categoryService.getCategory1List(categoryStore.category)
categoryService.getCategory2List(categoryStore.category, 2)
categoryService.getCategory3List(categoryStore.category, 13)

useAttrSpuStore().getAttrsList(categoryStore.category)
useSpuStore().loadList(61, 10, 1)
useSkuStore().loadList(5, 1)
useUserStore().getUserList(10, 1)
useRoleStore().getList(10, 1)
useRoleStore().getAllRoles()

</script>

<style lang="less" scoped>

</style>
