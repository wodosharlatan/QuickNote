<template>
    <div class="recBG_0 note_container">
        <div class="notes" >
            <div class="note" v-for="note in testNotes">
                <div :class="['noteBar',('urgnt' + note.urgent)]">
                    <h3>{{ urgencyText(note.urgent) }}</h3>
                    <h3>{{ note.date }}</h3>
                </div>
                <div class="noteBottom">
                    <h3>{{ shortenText(note.title,13) }}</h3>
                    <p class=noteText>{{ shortenText(note.text,62) }}</p>
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
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 2,
            date: "19.5.2023",
            title: "Tex1",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 3,
            date: "6.8.2028",
            title: "Tex3",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 2,
            date: "2.5.2025",
            title: "Tex1sdfhsdfhsdf",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 2,
            date: "19.5.2023",
            title: "Tex1",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 1,
            date: "6.8.2028",
            title: "Tex3",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 1,
            date: "2.5.2025",
            title: "Tex1sdfhsdfhsdf",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 2,
            date: "19.5.2023",
            title: "Tex1",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            urgent: 3,
            date: "6.8.2028",
            title: "Tex3",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }]

        const urgencyText = (id) => {
            const urgency = ["Minor task","Crucial task","Top-priority task !"]
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

.notes {
    padding: 0;
    margin: 0;

    /* make the in line but start adding them from left */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;


}

.noteBottom {
    height: calc(20rem - 25px);
    padding: 10px;
}

.noteBottom h3 {
    font-size: large;
    font-weight: bold;
    overflow: hidden;
}

.noteBottom p {
    font-size: medium;
}

.note {

    width: calc(30% - 10px);

    background-color: #ffffffb9;
    -webkit-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.18);
    -moz-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.18);
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.18);
    border-radius: 10px 10px 5px 5px;

    margin: 10px;



}

.noteBar {
    opacity: 80%;
    height: 3rem;
    border-radius: 10px 10px 0px 0px;
    padding: 2px;
    color: white;
    /* split the 2 divs align one to left other to right */
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* make them align vertically */
    flex-direction: row;
}

.noteBar h3 {
    margin: 10px 10px 10px 10px;
    font-size: large;
    font-weight: bold;
    overflow: hidden;
}

.noteText{
    height: calc(100% - 3rem);
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