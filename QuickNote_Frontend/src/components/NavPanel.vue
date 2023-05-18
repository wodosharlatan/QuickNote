<template>
    <div class="navigation recBG_0">
        <p class="textStyle1">QuickNote</p>
        <div class="menubar">
            <button class="ui_ElementT1">Admin</button>
            <div class="divider recBG_0"></div>
            <button class="ui_ElementT1">Private</button>
            <button class="ui_ElementT1">Public</button>
            <button class="ui_ElementT1"> ↲ </button>
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

<style scoped>
.navigation {
    height: 50px;
    padding: 5px;
}

.navigation p {
    float: left;
    line-height: 30px;
}

.menubar {
    float: right;
    display: flex;
    flex-flow: row;
    gap: 5px;
}

.divider {
    box-sizing: border-box;
    height: 100%;
    width: 5px;
}

.menubar button {
    background-color: rgba(255, 255, 255, 0.726);
}
</style>