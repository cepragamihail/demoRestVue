import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'pages/App.vue'

Vue.use(VueResource);

new Vue({
    el: '#app',
    render: a => a(App)
})

/* var messageApi = Vue.resource('message{/id}');

// Define a new component called message-form
// it is form used for CRUD operation of messages

// Define a new component called message-item
// with buttons which allow edit and delete specific message
Vue.component('message-item', {

    template:

});
// Define a new component called messages-list
// component put together message-(form, item) components
Vue.component('messages-list', {

});

var app = new Vue({

});*/
