<template>

  <el-container class="container">
    <el-header class="header">
      <el-button class="btn-add" type="success" :icon="Plus" @click="addIt">
        新增
      </el-button>
    </el-header>
    <el-main>

  <el-table
    class="table"
    :border="true"
    :data="store.objList"
    tableLayout="auto"
    width="100%"
    >
      <el-table-column type="index" width="50" />
      <el-table-column property="roleName" label="角色名称" />
      <el-table-column property="remark" label="备注" />
      <el-table-column label="操作" width="180px">

        <template #default="{ row }">
          
          <el-button size="small" :icon="Edit" type="primary" @click="editIt(row.id)"></el-button>
          <el-button size="small" :icon="Delete" type="warning" @click="deleteIt(row.id)"></el-button>
        </template>

      </el-table-column>
    </el-table>

    </el-main>
    <el-footer class="footer">

      <el-pagination
        class="btn-panel" 
        background 
        layout="prev, pager, next" 
        :total="store.total"
        :page-size="10"
        @current-change="pageChange"
        >
      </el-pagination>

    </el-footer>
  </el-container>

  <el-dialog
    v-model="dialogEdit"
    title="新增权限"
    width="50%"
    top="10vh"
  >
    <el-form>
      <el-form-item label="角色名称" :label-width="70" style="width: 95%;">
        <el-input v-model="store.obj.roleName" type="input" />
      </el-form-item>
      <el-form-item label="备 注" :label-width="70" style="width: 95%;">
        <el-input type="textarea" rows="3" v-model="store.obj.remark" />
      </el-form-item>

      <div style="text-align: center;">
        <el-button :icon="Select" type="primary" @click="saveIt">确认保存</el-button>
        <el-button :icon="Close"  @click="dialogEdit=false">取消</el-button>
      </diV>

    </el-form>

  </el-dialog>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

import useRoleStore from '@/store/role'

import { Plus, Delete, Select, Close, Edit } from '@element-plus/icons-vue'

import { ElMessageBox, ElMessage } from 'element-plus'


const dialogEdit = ref(false)

const store = useRoleStore()

const pageChange = (pageNo: number) => {
  store.getList(10, pageNo)
}


const addIt = () => {
  store.getNewObj()

  dialogEdit.value = true
}

const editIt = (id: string) => {
  store.loadObj(id)

  dialogEdit.value = true
}


const saveIt = async () => {
  let result = false

  if(store.obj.id !== ''){
    result = await store.save()
    
    if(result) {
      ElMessage({
        message: '操作执行成功。',
        type: 'success',
      })

      await store.getList(10, 1)
    } else {
      ElMessage({
        message: '抱歉！操作执行失败！',
        type: 'error',
      })
    }
  } else {
    result = await store.add()

    if(result) {
      ElMessage({
        message: '操作执行成功。',
        type: 'success',
      })

      await store.getList(10, 1)
    } else {
      ElMessage({
        message: '抱歉！操作执行失败！',
        type: 'error',
      })
    }
  }


  dialogEdit.value = false
}

const deleteIt = async (id: string) => {
  let confirm = await ElMessageBox.confirm(
    '确认删除指定记录?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )

  if(confirm) {
    let result = await store.delete(id)
    if(result){
      ElMessage({
        type: 'success',
        message: '操作执行成功',
      })

      store.getList(10, 1)
      pageChange(1)
    } else {
      ElMessage({
        type: 'info',
        message: '操作执行失败',
      })
    }
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
    line-height: 60px;
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
  }
}
</style>