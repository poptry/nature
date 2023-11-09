<template>
    <div class="menu-container">
        <ul class="equipment-nav">
            <li>全部</li>
            <li>男装</li>
            <li>女装</li>
            <li>鞋</li>
            <li>背包/配件</li>
        </ul>
        <div class="search">
            <input type="text" placeholder="Search">
        </div>
        <div class="icons">
            <i class="iconfont icon-shangjiaduanicon-"></i>
            <i class="iconfont icon-jushoucang favorite"></i>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
}
</script>
<style lang="less" scoped>
    .menu-container{
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        .equipment-nav{
            flex: 3;
            display: flex;
            flex-direction: row;
            list-style: none;
            color: var(--fontColor-m);
            user-select: none;
            font-weight: 700;
            font-family: 'Courier New', Courier, monospace;
            li{
                padding: 15px;
                cursor: pointer;
                transition: all .5s;
                &:hover{
                    box-shadow: 0 5px 0 rgb(149, 149, 149);
                }
            }
        }
        .search{
            flex: 2;
            display: flex;
            align-items: center;
            border: 1px solid rgb(184, 184, 184);
            padding: 10px;
            background-color: #e3e3e3;
            input{
                width: 100%;
                border: 0;
                outline: none;
                background-color: #e3e3e3;
            }
        }
        .icons{
            flex: 3;
            display: flex;
            justify-content: flex-end;
            i{
                position: relative;
                font-size: 24px;
                margin-right: 40px;
                cursor: pointer;
                &:hover{
                    transform: scale(1.1);
                }
            }
        }
    }
</style>