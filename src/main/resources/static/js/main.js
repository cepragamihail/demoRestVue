 var messageApi = Vue.resource('message{/id}');

// Define a new component called message-item
Vue.component('message-item', {
    props: ['message'],
    template: '<li><i>({{ message.id }})</i> {{ message.text }}</li>'
});
// Define a new component called messages-list
Vue.component('messages-list', {
    props: ['messages'],
    template: '<ol><message-item v-for="message in messages" :key="message.id" :message="message" /></ol>',
    created: function(){
        messageApi.get().then(result =>
        result.json().then(data =>
        this.messages.push(...data)
        )
        )
    }
});

var app = new Vue({
  el: '#app',
  template: '<messages-list :messages="messages" />',
  data: {
    messages: []
  }
});
