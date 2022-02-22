<template>
  <el-container class="container">
    <el-header class="header">
      <category-select :category="categoryStore.category" @change="categoryChanged"></category-select>
    </el-header>
  
    <el-main class="main">
      <el-button class="btn-add" type="success" :icon="Plus" @click="addIt">
        新增
      </el-button>
      <spu-list-grid
        class="main-container" 
        :spu-list="spuStore.spuList"
        :page-info="spuStore.pageInfo"
        :add-btn-disabled="(categoryStore.category.category3Id === '' || categoryStore.category.category3Id === 0)"
        @edit-it="editIt"
        @delete-it="deleteIt"
        @add-sku="addSku"
        @show-sku-list="showSkuList"
        ></spu-list-grid>

    </el-main>

    <el-footer class="footer">
      <el-pagination 
        class="btn-panel" 
        background 
        layout="prev, pager, next" 
        :total="spuStore.pageInfo.total"
        :page-size="spuStore.pageInfo.size" 
        @current-change="pageChange"
        >
      </el-pagination>
    </el-footer>

  </el-container>

  <el-dialog
    v-model="dialogSpu"
    title="SPU管理"
    width="60%"
    top="10vh"
  >
      <spu-edit-form 
      class="main-container" 
      :spu="spuStore.spuObj"
      @form-close="editFormClose"
      @save-it="saveSpu"
      />
  </el-dialog>


  <el-dialog
    v-model="dialogSku"
    title="新增SKU"
    width="90%"
    top="5vh"
  >
    <sku-edit-form 
      :sku="skuStore.skuObj" 
      @form-close="skuFormClose"
      @save-it="skuSaveIt" 
      ></sku-edit-form>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useSpuStore from '@/store/spu'
import useSkuStore from '@/store/sku'
import useCatagoryStore from '@/store/category'

import { Plus } from '@element-plus/icons-vue'
import CategorySelect from '@/components/category-select/CategorySelect.vue'
import SpuListGrid from './spu-list-grid/SpuListGrid.vue'
import SpuEditForm from './spu-edit-form/SpuEditForm.vue'
import SkuEditForm from '@/views/sku/sku-edit-form/SkuEditForm.vue'


const router = useRouter()

const spuStore = useSpuStore()
const skuStore = useSkuStore()
const categoryStore = useCatagoryStore()

const dialogSpu = ref(false)
const dialogSku = ref(false)

const editFormClose = () => {
  dialogSpu.value = false
}

const categoryChanged = async (category3Id: number | '') => {
  spuStore.spuList = []
  if(category3Id > 0) {
    await spuStore.loadList(category3Id, spuStore.pageInfo.size, 1)
  }
}

const pageChange = (pageNo: number) => {
  spuStore.loadList(categoryStore.category.category3Id, spuStore.pageInfo.size, pageNo)
}

const addIt = () => {

  if(categoryStore.category.category3Id > 0) {
    spuStore.getNewObj(categoryStore.category.category3Id as number)
    dialogSpu.value = true
  }

}

const editIt = async (id: number) => {
  await spuStore.loadObj(id)

  dialogSpu.value = true
} 

const deleteIt = async (id: number) => {

  await spuStore.delete(id)
  await spuStore.loadList(categoryStore.category.category3Id,
   spuStore.pageInfo.size, spuStore.pageInfo.current > 1 && spuStore.pageInfo.current * spuStore.pageInfo.size === spuStore.pageInfo.total 
   ? spuStore.pageInfo.current - 1 : spuStore.pageInfo.current)

}

const saveSpu = async () => {
  await spuStore.saveIt()

  spuStore.loadList(categoryStore.category.category3Id, spuStore.pageInfo.size, spuStore.pageInfo.current)
  dialogSpu.value = false

}

const addSku = (spuId: number) => {
  dialogSku.value = true

  skuStore.getNewObj(spuId)
}

const showSkuList = (spuId: number) => {
  router.replace({ name: 'sku', params: { spuId } })
}

const skuFormClose = () => {
  dialogSku.value = false
}

const skuSaveIt = async () => {
  if(await skuStore.saveIt()) {
    router.replace({ name: 'sku', params: { spuId: skuStore.skuObj.spuId } })
  }
}


</script>

<style lang="less" scoped>
.container {
  margin: 0;
  padding: 0;
  height: calc(100vh - 80px);

  .header {
    height: 60px;
    margin: 0;
    padding: 0;
  }

  .main {
    margin: 5px;
    padding: 0;
    .btn-add {
      margin: 10px;
    }
  }

  .footer {
    height: 60px;
    margin: 0;
    padding: 0;

    .btn-panel {
      width: 380px;
      margin: 10px auto 0 auto;
    }    
  }

}
</style>