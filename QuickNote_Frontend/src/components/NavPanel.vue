<template>
    <div class="navigation recBG_0">
        <p class="textStyle1">QuickNote</p>
        <div class="menubar">
            <div>
                <button></button>
                <div class="divider"></div>
            </div>
            <button></button>
            <button></button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    setup() {
        return {}
    }
}
</script>

<style>
.navigation{
    height: 50px;
}
.navigation p {
    float: left;
    line-height: 10px;
}
.menubar{
    float: right;
    display: flex;
    flex-flow: row;
}
</style>