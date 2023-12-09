<template>
    <div class="footer-nav">
        <div class="logo-name">
            <img class="logo" src="@/assets/images/logo.png" alt="">
            <span class="name">探险者</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'CommonFooter',
}
</script>

<style scoped lang="less">
    .footer-nav {
        position: relative;
        height: 100%;
        width: 100%;
        margin-top: 20px;
        background-color:#222020;
        color: aliceblue;
        .logo-name{
            position: absolute;
            left: 20px;
            top:10%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .logo{ 
                width: 60px;
                height: 60px;
                border-radius: 10%;
            }
            .name{
                margin-top: 5px;
                color: #d0cbcb;
            }
        }
    }
</style>