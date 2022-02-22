<template>
  <el-container class="container">

    <el-main class="main">
      <sku-grid
        :sku-list="skuStore.skuList"
        @show-sku="showSku"
        @delete-it="deleteId"
        @sale-it="saleIt"
        >
      </sku-grid>
    </el-main>
    <el-footer class="footer">
      <el-button-group v-if="skuStore.spuId > 0">
        <el-button
          :icon="RefreshRight" 
          type="primary" 
          @click="$router.replace({ name: 'spu' })"
          >返回SPU列表</el-button>

        <el-button
          :icon="RefreshRight" 
          type="success" 
          @click="showAll"
          >显示所有List</el-button>
      </el-button-group>


      <el-pagination
        v-if="skuStore.spuId === 0"
        class="btn-panel" 
        background 
        layout="prev, pager, next" 
        :total="skuStore.pageInfo.total"
        :page-size="skuStore.pageInfo.size" 
        @current-change="pageChange"
        >
      </el-pagination>
    </el-footer>
  </el-container>

  <el-drawer v-model="drawer" class="drawer" direction="rtl">
    <sku-detail :sku="skuStore.skuObj"></sku-detail>
  </el-drawer>

</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import useSkuStore from '@/store/sku'

import { RefreshRight, List } from '@element-plus/icons-vue'
import SkuGrid from '@/views/sku/sku-grid/SkuGrid.vue'
import SkuDetail from '@/views/sku/sku-detail/SkuDetail.vue'

const route = useRoute()
const skuStore = useSkuStore()

const drawer = ref(false)

if(route.params.spuId) {
  nextTick(async () => await skuStore.loadSpuList(Number(route.params.spuId)))
}

const showSku = async (id: number) => {
  await skuStore.loadObj(id)
  drawer.value = true
}

const deleteId = async (id: number) => {
  let result = await skuStore.delete(id)

  if(result) {
    ElMessage({
      message: '操作执行成功。',
      type: 'success',
    })

    skuStore.pageInfo.total --
    await loadList()
  } else {
    ElMessage({
      message: '抱歉！操作执行失败！',
      type: 'error',
    })
  }
}

const saleIt = async (id: number, isSale: 0 | 1) => {
  await skuStore.onAndCancel(id, isSale)
  
  loadList()
}

const loadList = async () => {
  if(skuStore.spuId > 0) {
    await skuStore.loadSpuList(skuStore.spuId)
  } else {
    await skuStore.loadList(skuStore.pageInfo.size, 
      skuStore.pageInfo.current > 1 && skuStore.pageInfo.current * skuStore.pageInfo.size === skuStore.pageInfo.total 
        ? skuStore.pageInfo.current - 1 : skuStore.pageInfo.current)
  }
}

const pageChange = (pageNo: number) => {
  skuStore.loadList(skuStore.pageInfo.size, pageNo)
}

const showAll = () => {
  skuStore.loadList(skuStore.pageInfo.size, 1)
}

</script>

<style lang="less" scoped>

.container {

  .main {
    height: calc(100vh - 120px);
    overflow: auto;
  }
  .footer {
    padding: 0;
    margin: 0;    
    height: 70px;
    vertical-align: top;
    text-align: center;

    .btn-panel {
      width: 380px;
      margin: 10px auto 0 auto;
    }

    .btn-back {
      width: 500px;
      margin: 10px auto 0 auto;
    }    
  }
}
.drawer {
  padding: 0;
  margin:0;
}


</style>