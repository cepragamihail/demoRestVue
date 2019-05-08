<template>
    <v-layout align-space-around justify-start column fill-height>
        <message-form :messages="messages" :messageAttr="message" />
        <ol>
            <message-item v-for="message in sortedMessages"
            :key="message.id"
            :message="message"
            :editMessage="editMessage"
            :deleteMessage="deleteMessage"
            :messages="messages" />
        </ol>
    </v-layout>
</template>
<script>

import MessageItem from 'components/messages/MessageItem.vue'
import MessageForm from 'components/messages/MessageForm.vue'

export default {
    props: ['messages'],
      components: {
                MessageItem,
                MessageForm
            },
    data() {
        return {
            message: null
        }
    },
    computed: {
            sortedMessages() {
                return this.messages.sort((a, b) => -(a.id - b.id))
            }
          },
    methods: {
        editMessage(message) {
            this.message = message;
        },
        deleteMessage(message) {
                         this.$resource('/message{/id}').remove({id: message.id}).then(result => {
                             if (result.ok) {
                                 this.messages.splice(this.messages.indexOf(message), 1)
                             }
                         })
    }
}
}
</script>
<style>
</style>