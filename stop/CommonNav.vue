<template>
    <div class="nav">
        <el-menu :default-active="activeIndex" 
            active-text-color="#000000"
            class="el-menu-demo" mode="horizontal" 
            @select="handleSelect" background-color="#643333" 
            text-color="#ffffff">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">处理中心</el-menu-item>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-button class="setting">设置</el-button>
        </el-menu>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
.el-menu-demo{
    text-align: center;
    .is-active {
        border: none !important;
    }
    .setting {
        float: right;
    }
}
</style>