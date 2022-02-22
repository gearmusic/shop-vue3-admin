<template>
  <el-row class="row">
    <el-col :span="5">
      SKU名称
    </el-col>
    <el-col :span="16">
      {{ sku.skuName }}
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="5">
      SKU描述
    </el-col>
    <el-col :span="16">
      {{ sku.skuDesc }}
    </el-col>
  </el-row>  
  <el-row class="row">
    <el-col :span="5">
      价格(元)
    </el-col>
    <el-col :span="16">
      {{ sku.price }}
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="5">
      重量(千克)
    </el-col>
    <el-col :span="16">
      {{ sku.weight }}
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="5">
      平台属性
    </el-col>
    <el-col :span="16">
      <el-tag
        v-for="item in sku.skuAttrValueList"
        :key="item.id"
        class="tag"
        type="warning" 
        style="margin-right:10px;">
        {{ item.attrName }} : {{ item.valueName }}
      </el-tag>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="5">
      销售属性
    </el-col>
    <el-col :span="16">
      <el-tag
        v-for="item in sku.skuSaleAttrValueList"
        :key="item.id"
        class="tag"
        type="success" 
        style="margin-right:10px;">
        {{ item.saleAttrName }} : {{ item.saleAttrValueName }}
      </el-tag>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="5">
      照片
    </el-col>
    <el-col :span="16">
      <el-carousel trigger="click" height="320px">
        <el-carousel-item v-for="item in sku.skuImageList" :key="item.id" :loop="true">
          <img :src="item.imgUrl" alt="" style="height: 320px;" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>  
  <el-row class="row">
    <el-col :span="5">
      创建时间
    </el-col>
    <el-col :span="16">
      {{ sku.createTime }}
    </el-col>
  </el-row>    
</template>

<script lang="ts" setup>
import { Sku } from '@/types/sku'

defineProps<{
  sku: Sku
}>()

</script>

<style lang="less" scoped>
.row {
  margin: 5px 0;
  line-height: 155%;
  
  .tag {
    margin: 5px;
  }
}
</style>