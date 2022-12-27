<template>
  <el-table :data="tableD" style="width: 100%" min-height="400">
    <el-table-column fixed prop="name" label="姓名" width="100" />
    <el-table-column prop="phone" label="手机" width="160" />
    <el-table-column prop="email" label="邮箱" width="220" />
    <el-table-column prop="address" label="住址" width="420" />
    <el-table-column prop="remark" label="备注" width="200" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="editRow(scope.row)">
          编辑
        </el-button>
        <el-button
          link
          type="danger"
          size="small"
          @click.prevent="deleteRow(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem"
    >添加信息</el-button
  >
  <el-dialog v-model="isAdd">
    <el-form
      v-model="personData"
      label-width="55px"
      :model="personData"
      ref="ruleFormRef"
      :rules="rules"
    >
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
      <el-form-item class="form-item-btn">
        <el-button @click="exitDialog" style="margin-left: 115px;">退出</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch } from "vue";
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import dayjs from "dayjs";
import requests from "../../../api/request.js";
const ruleFormRef = ref<FormInstance>()

interface personType {
  name: String;
  phone: String;
  email: String;
  address: String;
  remark: String;
  id: Number;
  userid: Number;
}
const personData: personType = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  remark: "",
  id: -1,
  userid: -1,
});
const props = defineProps({
  searchInput: {
    type: String,
    required: true,
  }
})
const rules = reactive<FormRules>({
  name: [{required: true, message: "请填写姓名", trigger: 'blur'}]
    
})
const now = new Date();
const isAdd = ref(false);
const isEdit = ref(false);
const tableData = ref<personType[]>([]);
const getTableData = () => {
  requests.get('/info/getInfo', {
  params: {
    userid: parseInt((localStorage.getItem('userid') as string))
  }
}).then((res: any) => {
  tableData.value = res.data
}).catch((err:any) => console.log(err));
}
getTableData()
const deleteRow = (index: number, row: any) => {
  tableData.value.splice(index, 1);
  console.log(row.id);
  const data = {
    id: row.id
  }
  requests.post('/info/deleteInfo', data).then((res: any) => {
    if(res.errno == 0) {
      ElMessage.success('删除成功！')
    }
  }).catch((err: any) => {
    console.log(err);
  })
};
const editRow = (row: any) => {
  isAdd.value = true;
  isEdit.value = true;
  const {id, name, address, email, phone, remark, userid} = row;
  personData.address = address;
  personData.email = email;
  personData.id = id;
  personData.name = name;
  personData.phone = phone;
  personData.remark = remark;
  personData.userid = userid;
}
const onAddItem = () => {
  isAdd.value = !isAdd.value;
};

const addTableData = (data: personType) => {
  tableData.value.push(data);
  isAdd.value = !isAdd.value;
};
const exitDialog = () => {
  isAdd.value = false;
  
};
const submitForm =  (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      if(isEdit.value == false) {
        // 添加逻辑
        console.log(personData);
        
        const {name, phone, email, address, remark} = personData
        const data = {
          name,
          phone,
          email,
          address,
          remark,
          userid: parseInt((localStorage.getItem('userid')) as string)
        }
        requests.post('/info/insertInfo', data).then((res: any) => {
          if(res.errno == 0) {
            ElMessage.success("添加成功!")
            //push
            //tableData.value.push({...data})
            getTableData()
          } else {
            ElMessage.error("添加失败")
          }
        }).catch((err: any) => {
          console.log(err);
          
        })        
      } else {
        // 编辑逻辑
        tableData.value.forEach(item => {
          if(item.id === personData.id) {
            const {id, name, address, email, phone, remark, userid} = personData;
            // item.name = name;
            // item.address = address;
            // item.email = email;
            // item.phone = phone;
            // item.remark = remark;
            const data = {
              id,
              name,
              address,
              email,
              phone,
              remark,
              userid
            }
            requests.post('/info/updateInfo', data).then((res: any) => {
              if(res.errno == 0) {
                ElMessage.success('编辑成功!')
                getTableData()
              } else {
                ElMessage.error('编辑失败!')
              }
            }).catch((err: any) => {
              console.log(err);
              
            })
          }
        })
      }
      isAdd.value = !isAdd.value
    } else {
      console.log('error submit!', fields)
    }
  })
}
const search = ref('')
search.value = props.searchInput
const tableD = computed(() => {
  return tableData.value.filter(item => {
    return item.name.toLowerCase().indexOf(props.searchInput.toLowerCase()) !== -1
  })
})
watch(isAdd, (newVal, oldVal) => {
  if(!newVal) {
    isEdit.value = false;
    personData.address = '';
    personData.email = '';
    personData.id = -1;
    personData.name = '';
    personData.phone = '';
    personData.remark = '';
  }
})
</script>
<style scoped lang="scss">
.form-item-btn {
  .el-form-item__content{ 
    display: flex;
    justify-content: center;
    align-items: center;
}
}
</style>
