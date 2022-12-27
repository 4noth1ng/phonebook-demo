<template>
  <div class="login-container">
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="12">
        <div class="login-container-form">
          <div class="login-container-form-welcome">
            欢迎使用vue-phonebook-admin
          </div>
          <el-form
            class="login-container-form-horzional"
            label-position="top"
            size="large"
            :rules="rules"
            :model="user"
            ref="ruleFormRef"
            v-model="user"
          >
            <el-form-item label="用户账号" prop="username">
              <el-input
                placeholder="请输入账号"
                v-model="user.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input
                placeholder="请输入密码"
                type="password"
                show-password
                v-model="user.password"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 60px">
              <el-button
                style="width: 100%"
                type="primary"
                plain
                v-if="isLogin"
                @click="userLogin(ruleFormRef)"
              >
                登录
              </el-button>
              <el-button
                style="width: 100%"
                type="primary"
                plain
                v-if="!isLogin"
                @click="userRegister(ruleFormRef)"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
          <div class="login-container-form-checkout" @click="checkoutEvent">
            <el-button text v-if="!isLogin"> 点我进行登录 </el-button>
            <el-button text v-if="isLogin"> 点我进行注册 </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import requests from "../../api/request.js";
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();

interface userType {
  username: String;
  password: String;
}
const user: userType = reactive({
  username: "",
  password: "",
});
const isLogin = ref(true);
const checkoutEvent = function () {
  isLogin.value = !isLogin.value;
};

const userLogin = function (formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      const data = {
        username: user.username,
        password: user.password,
      };
      requests.post("/users/login", data).then((res: any) => {
        if (res.errno === 0) {
          ElMessage.success("登录成功!");
          localStorage.setItem("token", res.message);
          localStorage.setItem("userid", res.data.id);
          localStorage.setItem("username", res.data.username);
          setTimeout(() => {
            router.push({
              path: "/",
            });
          }, 1000);
        } else {
          ElMessage.error("登录失败,请检查账号密码后重试!");
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const rules = reactive<FormRules>({
  username: { required: true, trigger: "blur", message: "请输入账号" },
  password: { required: true, trigger: "blur", message: "请输入密码" },
});
const userRegister = function (formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      const data = {
        username: user.username,
        password: user.password,
      };
      requests.post("/users/register", data).then((res: any) => {
        if (res.errno === 0) {
          ElMessage.success("注册成功!");
          isLogin.value = true;
          user.username = "";
          user.password = "";
        } else {
          ElMessage.error("注册失败!");
        }
      });    
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background-color: #1dccc4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%231DCCC4' width='11' height='11'/%3E%3Crect fill='%230fcbc6' x='10' width='11' height='11'/%3E%3Crect fill='%2300cbc7' y='10' width='11' height='11'/%3E%3Crect fill='%2300cac9' x='20' width='11' height='11'/%3E%3Crect fill='%2300c9ca' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%2300c9cc' y='20' width='11' height='11'/%3E%3Crect fill='%2300c8cd' x='30' width='11' height='11'/%3E%3Crect fill='%2300c7cf' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%2300c7d1' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%2300c6d2' y='30' width='11' height='11'/%3E%3Crect fill='%2300c5d4' x='40' width='11' height='11'/%3E%3Crect fill='%2300c5d5' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%2300c4d7' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%2300c3d8' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%2300c2da' y='40' width='11' height='11'/%3E%3Crect fill='%2300c2db' x='50' width='11' height='11'/%3E%3Crect fill='%2300c1dd' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%2300c0de' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%2300bfdf' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%2300bee1' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%2300bde2' y='50' width='11' height='11'/%3E%3Crect fill='%2300bce3' x='60' width='11' height='11'/%3E%3Crect fill='%2300bce5' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%2300bbe6' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%2300bae7' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%2300b9e8' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%2300b8ea' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%2300b7eb' x='70' width='11' height='11'/%3E%3Crect fill='%2300b6ec' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%2300b5ed' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%2300b4ee' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%2300b3ef' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%2300b2ef' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%2300b1f0' x='80' width='11' height='11'/%3E%3Crect fill='%2300b0f1' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%2300aef2' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%2300adf2' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%2300acf3' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%2300abf3' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%2300aaf4' x='90' width='11' height='11'/%3E%3Crect fill='%2300a9f4' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%2300a7f4' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%2300a6f5' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%2300a5f5' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%2300a4f5' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%2300a2f5' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%2300a1f5' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%2311a0f5' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23209ef5' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%232b9df5' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23339cf4' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%233b9af4' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%234299f3' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%234897f3' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%234e96f2' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%235394f2' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%235993f1' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%235e91f0' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%236290ef' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23678EEE' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;

  .el-row {
    height: 100%;
  }

  .el-col {
    &:nth-child(2) {
      position: relative;
      height: 100%;
    }
  }

  &-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 370px;
    height: 430px;
    border: 4px solid rgb(135, 207, 231);
    &-welcome {
      width: 100%;
      height: 60px;
      font-size: 18px;
      font-family: "Helvetica Neue";
      font-weight: 500;
      text-align: center;
      line-height: 60px;
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: #eaeaea;
        opacity: 0.5;
      }
    }

    .el-form {
      margin: 20px 20px 30px 20px;

      &-item {
        color: black;
      }
    }

    &-checkout {
      text-align: right;
      margin: 0 20px 0 20px;
    }
  }
}
</style>
