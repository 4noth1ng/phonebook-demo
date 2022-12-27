<template>
    <div class="home-container">
        <el-row>
            <el-col :span="4"></el-col>
            <el-col :span="16">
                <div class="home-container-tab">
                    <div class="home-container-tab-header">
                        <h1>{{username}}的通讯录</h1>
                    </div>
                    <div class="home-container-tab-search">
                        <el-input
                        :prefix-icon="Search"
                        placeholder="请输入你想要查找的信息"
                        size="large"
                        v-model="searchInput"
                        ></el-input>
                    </div>
                    <div class="home-container-tab-main">
                        <PhoneBookTable :searchInput="searchInput"></PhoneBookTable>
                    </div>
                </div>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import PhoneBookTable from './PhoneBookTable/index.vue'
const username = ref("")
const name = localStorage.getItem('username')
username.value = (name as string)
const searchInput = ref("")
</script>

<style scoped lang="scss">
.home-container {
    width: 100%;
    height: 100%;
    .el-row {
        height: 100%;
        .el-col {
            &:nth-child(2) {
                position: relative;
            }
        }
    }
    &-tab {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 100%;
        border: 1px solid #eaeaea;
        margin: 20px;
        
        &-header {
            width: 100%;
            height: 60px;
            h1 {
                text-align: center;
            }
        }
        &-search {
            width: 100%;
            height: 80px;
        }
        &-main {
            height: auto;
        }
    }
}
</style>