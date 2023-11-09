<template>
    <el-container class="equipment-container">
        <el-header class="header">
            <MenuSectionVue></MenuSectionVue>
        </el-header>
        <el-main>
            MAIN
        </el-main>
    </el-container>
</template>

<script>
import MenuSectionVue from '@/components/equipment/MenuSection'
export default {
    data(){
        return{

        }
    },
    components:{
        MenuSectionVue
    }
}
</script>
<style lang="less" scoped>
    .equipment-container{
        margin-top:80px;
        .header{
            display: flex;
            flex-direction: row;
            height: 80px !important;
            border-bottom: 1px solid rgb(179, 179, 179);
            min-width: 1300px;
        }
    }
</style>