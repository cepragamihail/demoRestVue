 var messageApi = Vue.resource('message{/id}');

// Define a new component called message-form
// it is form used for CRUD operation of messages
 Vue.component('message-form', {
    props: ['messages', 'messageAttr'],
    data: function() {
        return {
            text: '',
            id: ''
        }
    },
    watch: {
        messageAttr: function(newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:
        '<div>' +
            '<input type="text" placeholder="Write something" v-model="text" />' +
            '<input type="button" value="save" @click="save" />' +
        '</div>',
        methods: {
            save: function() {
                var message = { text: this.text };

                if (this.id) {
                    messageApi.update({id: this.id}, message).then(result =>
                        result.json().then(data => {
                            var index = this.messages.findIndex( item => item.id === data.id);
                            this.messages.splice(index, 1, data);
                            this.text = '';
                            this.id = '';
                        })
                    )
                } else {
                    messageApi.save({}, message ).then( result =>
                        result.json().then(data => {
                            this.messages.push(data);
                            this.text = '';
                        })
                    )
                }
            }
        }
 });

// Define a new component called message-item
// with buttons which allow edit and delete specific message
Vue.component('message-item', {
    props: ['message', 'editMethod', 'messages'],
    template: '<li>' +
                '<i>({{ message.id }})</i> {{ message.text }}' +
                '<span style="position: absolute; right: 0">' +
                    '<input type="button" value="Edit" @click="edit" />' +
                    '<input type="button" value="X" @click="del" />' +
                '</span>' +
                '</li>',
    methods: {
        edit: function() {
            this.editMethod(this.message);
        },
        del: function() {
            messageApi.remove({id: this.message.id}).then(result => {
                if(result.ok) {
                    this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});
// Define a new component called messages-list
// component put together message-(form, item) components
Vue.component('messages-list', {
    props: ['messages'],
    data: function() {
        return {
            message: null
        }
    },
    template:'<div style="position: relative; width: 300px;">' +
            '<message-form :messages="messages" :messageAttr="message" />' +
            '<ol>' +
                '<message-item v-for="message in messages" :key="message.id" :message="message"' +
                 ' :editMethod="editMethod" :messages="messages" />' +
            '</ol>' +
            '</div>',
    methods: {
        editMethod: function(message) {
            this.message = message;
        }
    }
});

var app = new Vue({
  el: '#app',
  template: '<div>' +
    '<div v-if="!profile">Must login with <a href="/login">Google</a></div>' +
    '<div v-else>' +
        '<div>{{profile.name}}&nbsp;<a href="/logout">Logout</a></div>' +
        '<messages-list :messages="messages" />' +
    '</div>' +
  '</div>',
  data: {
    messages: frontendData.messages,
    profile: frontendData.profile
  },
  created: function(){
//      messageApi.get().then(result =>
//          result.json().then( data => this.messages.push(...data) )
//      )
  },
});
