<template>
  <div class="category-container">
    <div>
        <!-- 分类开始 -->
        <el-dropdown width="200" trigger="click" class="dropdown">
            <span class="el-dropdown-link">
                分类<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-checkbox-group  v-model="classificationList">
                    <el-row style="padding: 5px 20px;" v-for="c in categoryList" :key="c.id">
                        <el-checkbox  :label="c.type" name="type">{{ c.name }}</el-checkbox>
                    </el-row>
                </el-checkbox-group>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 分类结束 -->
    </div>
    <!-- 筛选开始 -->
    <el-dropdown width="200" trigger="click" class="dropdown">
        <span class="el-dropdown-link">
            筛选<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-checkbox-group :max="1"  v-model="sortList">
                <el-row style="padding: 5px 20px;"  v-for="s in sortCondition" :key="s.id">
                    <el-checkbox  :label="s.type" name="type">{{ s.name }}</el-checkbox>
                </el-row>
            </el-checkbox-group>
        </el-dropdown-menu>
    </el-dropdown>
    <!-- 筛选结束 -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data(){
        return{
            categoryList:[
                {
                    id:'0',
                    name:'上衣',
                    type:'top'
                },
                {
                    id:'1',
                    name:'裤装',
                    type:'bottom'
                },
                {
                    id:'2',
                    name:'背包',
                    type:'bag'
                },
                {
                    id:'3',
                    name:'鞋履',
                    type:'shoes'
                },
                {
                    id:'4',
                    name:'配件',
                    type:'accessories'
                },
            ],
            sortCondition:[
                {
                    id:'0',
                    name:'价格从低到高',
                    type:'priceAsc'
                },
                {
                    id:'1',
                    name:'价格从高到低',
                    type:'priceDesc'
                },
                {
                    id:'2',
                    name:'评分从高到低',
                    type:'scoreDesc'
                },
                {
                    id:'3',
                    name:'销量从低到高',
                    type:'salesAsc'
                },
            ],
            classificationList:[],
            sortList:[],
            params:{}
        }
    },
    methods:{
        ...mapMutations('equipment',{
            getProsByClassify:'getProsByClassify'
        })
    },
    watch:{
        classificationList(val){
            this.params.type = val
            this.getProsByClassify(this.params)
        },
        sortList(val){
            this.params.sort = val
            console.log(this.params.sort);
            this.getProsByClassify(this.params)
        }
    }
}
</script>

<style lang="less" scoped>
    .category-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #b3b3b3;
        margin-bottom: 30px;
        .dropdown{
            margin-left: 20px;
            .el-dropdown-link{
                font-size: 16px;
                font-weight: 700;
                color: var(--fontColor-m);
            }
        }
    }

</style>