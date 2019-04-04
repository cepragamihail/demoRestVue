// Define a new component called message-item
Vue.component('message-item', {
    props: ['message'],
    template: '<li><i>({{ message.id }})</i> {{ message.text }}</li>'
});
// Define a new component called messages-list
Vue.component('messages-list', {
    props: ['messages'],
    template: '<ol><message-item v-for="message in messages" :key="message.id" :message="message" /></ol>'
});

var app = new Vue({
  el: '#app',
  template: '<messages-list :messages="messages" />',
  data: {
    messages: [
    {id: '1', text: 'message 1'},
    {id: '2', text: 'message 2'},
    {id: '3', text: 'message 3'},
    {id: '4', text: 'message 4'},
    {id: '5', text: 'message 5'}
    ]
  }
});
