<template>
    <div class="recBG_0">
        <div class="notes" v-for="note in testNotes">
            <div class="note">
                <div :class="['noteBar',('urgnt' + note.urgent)]">
                    <h3>{{ urgencyText(note.urgent) }}</h3>
                    <h2>{{ note.date }}</h2>
                </div>
                <div class="noteBottom">
                    <h3>{{ shortenText(note.title,13) }}</h3>
                    <p>{{ shortenText(note.text,62) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
    setup() {
        const testNotes = [{
            urgent: 3,
            date: "2.5.2025",
            title: "Tex1sdfhsdfhsdf",
            text: "AAAAAAAAAAAAAAAAAAAAAAAafafsfsdgdsgsdagdsgdgsgsdgdsssdgsdgdgssdgsdgsdgsdg"
        },
        {
            urgent: 2,
            date: "19.5.2023",
            title: "Tex1",
            text: "AAAAAAAAAAdhdghsdghAAAAAAAAAAAafafsfsdgdsgsdagdsgdgsgsdgds"
        },
        {
            urgent: 1,
            date: "6.8.2028",
            title: "Tex3",
            text: "AAAAAAAAAAAAAAAAAAAAAAAafafsfsdgdsgsdagdsgdgsgsdgds"
        }]

        const urgencyText = (id) => {
            const urgency = ["Možné","Důležité","Naléhavé!"]
            return urgency[id-1];
        };

        const shortenText = (text,len) => {
            if(text.length > len)
                return text.substring(0,len) + " . . .";
            return text;
        };


        return { testNotes,urgencyText, shortenText }
    }
}
</script>

<style scoped>
.recBG_0 {
    display: block;
    height: calc(100% - 50px);
}

.notes {}

.noteBottom {
    height: 150px;
    width: 100%;
    padding: 5px;
}

.noteBottom h3 {
    text-decoration: underline;
    overflow: hidden;
}

.noteBottom p {
    overflow-wrap: break-word;
    overflow: hidden;
}

.note {
    width: 150px;
    height: 175px;
    background-color: #ffffffb9;
    -webkit-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.432);
}

.noteBar {
    background-color: white;
    opacity: 80%;
    height: 25px;
    border-radius: 5px 5px 0px 0px;
    padding: 2px;
    color: white;
}

.noteBar h3 {
    float: left;
    font-size: 12.5px;
    font-weight: 300;
}

.noteBar h2 {
    float: right;
    font-size: 13px;
    font-weight: 500;
}

.urgnt3 {
    background-image: linear-gradient(to bottom right, red, rgb(255, 72, 0));
}

.urgnt2 {
    background-image: linear-gradient(to bottom right, rgb(255, 187, 0), rgb(229, 255, 0));
}

.urgnt1 {
    background-image: linear-gradient(to bottom right, rgb(134, 248, 3), rgb(10, 194, 4));
}
</style>