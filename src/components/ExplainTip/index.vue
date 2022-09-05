<template>
    <div class="explain">
        <div class="explain__ico">
            <i class="el-icon-info"></i>
        </div>
        <div class="explain__tip">内容区</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss" >
.explain {
    width: 100%;
    background: rgb(244, 244, 244);
    display: flex;
    align-items: center;
    padding: 8px 20px;
    box-sizing: border-box;
    margin:  8px 0;
    &__ico {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      i{
        font-size: 20px;
        fill: currentColor;
        color: rgb(96,96,96);
      }
 
    }

    &__tip {
        color: rgb(150,150,150);
        font-size: 14px;
    }
}
</style>