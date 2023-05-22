<template>
    <div :class="['deadline', 'ui_ElementT1']">
        <input type="text" :placeholder="curDate.getDate()" v-model="day" @focusout="checkDate()" />
        <input type="text" :placeholder="curDate.getMonth() + 1" v-model="month" @focusout="checkDate()" />
        <input type="text" :placeholder="curDate.getFullYear()" v-model="year" @focusout="checkDate()" />
    </div>
</template>
  
<script>
import { ref, computed } from 'vue'

export default {
    setup() {
        const curDate = new Date();
        const day = ref();
        const month = ref();
        const year = ref();

        const checkDate = () => {
            checkYear();
            checkMonth();
            checkDay();

            console.log(day.value + " " + month.value + " " + year.value);
        }

        const checkDay = () => {
            if (isNaN(day.value)) { day.value = curDate.getDate(); return false; }
            const daysInMonth = new Date(year, month, 0).getDate();
            console.log(daysInMonth)
            if (day.value < 1 || day.value > daysInMonth) { day.value = curDate.getDate(); return false; }
            return true;
        }

        const checkMonth = () => {
            if (isNaN(month.value)) { month.value = curDate.getMonth() + 1; return false; }
            if (month.value < 1 || month.value > 12) { month.value = curDate.getMonth() + 1; return false; }
            return true;
        }

        const checkYear = () => {
            if (isNaN(year.value)) { year.value = curDate.getFullYear(); return false; }
            if (year.value < curDate.getFullYear()) { curDate.getFullYear(); return false; }
            return true;
        }

        checkDate();
        return {
            curDate, checkDate, day, month, year
        }
    }
}
</script>
  
<style scoped>
.deadline {
    height: 35px;
    width: 100%;
    font-weight: 500;
    background-color: white;
    display: flex;
}

input {
    border-radius: 0px;
    border-width: 0px;
    background-color: transparent;
    border: none;
    width: 100%;
    text-align: center;
}

input[type='text']:focus {
    outline: none;
}
</style>
  