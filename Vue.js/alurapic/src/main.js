import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';
import './assets/js/teste'
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.js';

// import './assets/css/teste.css';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL ? process.env.API_URL : process.env.API_LOCAL;

Vue.use(VueRouter);

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

