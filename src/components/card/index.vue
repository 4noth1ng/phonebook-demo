<template>

    <el-form v-model="personData" label-width="55px" :rules="rules" :model="personData" ref="ruleFormRef">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="personData.name" autofocus></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
            <el-input v-model="personData.phone" autofocus></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="personData.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
            <el-input v-model="personData.address"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model="personData.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="margin-left: 400px" @click="closeCard">退出</el-button>
            <el-button type="primary" @click="submitCard(ruleFormRef)">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

interface personType {
    name: String,
    phone: String,
    email: String,
    address: String,
    remark: String
}
const personData: personType = reactive({
    name: "",
    phone: "",
    email: "",
    address: "",
    remark: ""
})
// const checkPhone = (rule: any, value: any, callback: any) => {
    
//     if (regMobile.test(value)) {
//         return callback()
//     }
//     callback(new Error("请输入正确手机号"))
// }
const regMobile = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: regMobile,
            trigger: ['blur', 'change'],
            message: "请输入正确手机号"
        }
    ]
})
const emits = defineEmits(['closeCard', 'submitCard'])
const closeCard = () => {
    emits('closeCard', false)
}
const submitCard =  (formEl: FormInstance | undefined) => {
  if (!formEl) return  
   formEl.validate((valid, fields) => {
    if (valid) {
        emits('submitCard', personData)
    } else {
      console.log('error submit!', fields)
    }
  })
}



</script>

<style scoped lang="scss">
.el-form {
    margin-top: 20px;
}
</style>