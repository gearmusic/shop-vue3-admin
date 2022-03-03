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
        :data="userStore.userList"
        tableLayout="auto"
        width="100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" />
          <el-table-column property="username" label="用户名" width="180" />
          <el-table-column property="nickName" label="用户昵称" width="180" />
          <el-table-column  label="权限列表">
            <template #default="{ row }">
              <role-select :rolename="row.roleName.split(',')" @role-change="roleChange(row.id, $event)"></role-select>
            </template>
          </el-table-column>
          <el-table-column property="gmtCreate" label="创建时间" width="180" />
          <el-table-column property="gmtModified" label="更新时间" width="180" />
          <el-table-column label="操作" width="80px">
            <template #default="{ row }">
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
        :total="userStore.total"
        :page-size="10"
        @current-change="pageChange"
        >
      </el-pagination>
      
    </el-footer>
  </el-container>

  <el-dialog
    v-model="dialogEdit"
    title="新增用户"
    width="50%"
    top="10vh"
  >
    <el-form>
      <el-form-item label="用户名称" :label-width="70" style="width: 95%;">
        <el-input v-model="userStore.userObj.username" type="input" />
      </el-form-item>
      <el-form-item label="用户昵称" :label-width="70" style="width: 95%;">
        <el-input v-model="userStore.userObj.nickName" type="input" />
      </el-form-item>
      <el-form-item label="密码" :label-width="70" style="width: 95%;">
        <el-input v-model="userStore.userObj.password" type="input" />
      </el-form-item>

      <div style="text-align: center;">
        <el-button :icon="Select" type="primary" @click="saveIt">确认新增</el-button>
        <el-button :icon="Close"  @click="dialogEdit=false">取消</el-button>
      </diV>

    </el-form>

  </el-dialog>


</template>

<script lang="ts" setup>
import { ref } from 'vue'

import useUserStore from '@/store/user'
import useRoleStore from '@/store/role'

import { Plus, Delete, Select, Close } from '@element-plus/icons-vue'

import { ElMessageBox, ElMessage } from 'element-plus'
import RoleSelect from '@/components/role-select/RoleSelect.vue'
import useStore from 'element-plus/es/components/table/src/store'

const dialogEdit = ref(false)

const userStore = useUserStore()
const roleStore = useRoleStore()

const pageChange = (pageNo: number) => {
  userStore.getUserList(10, pageNo)
}

const roleChange = async (id: string, rolename: string) => {
  let roleIds = await roleStore.getRoleIds(rolename)

  userStore.assign(id, roleIds)
}

const addIt = () => {
  userStore.getNewObj()

  dialogEdit.value = true
}

const saveIt = async () => {
  let result = await userStore.add()
  if(result) {
    ElMessage({
      message: '操作执行成功。',
      type: 'success',
    })

    await userStore.getUserList(10, 1)
  } else {
    ElMessage({
      message: '抱歉！操作执行失败！',
      type: 'error',
    })
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
    let result = await userStore.delete(id)
    if(result){
      ElMessage({
        type: 'success',
        message: '操作执行成功',
      })

      userStore.getUserList(10, 1)
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