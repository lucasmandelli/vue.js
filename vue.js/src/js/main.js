import './bootstrap';
import billComponent from './Bill.vue';
import dashboardComponent from './Dashboard.vue';
import billPayComponent from './bill-pay/BillPay.vue';
import billPayListComponent from './bill-pay/BillPayList.vue';
import billPayCreateComponent from './bill-pay/BillPayCreate.vue';
import billReceiveComponent from './bill-receive/BillReceive.vue';
import billReceiveListComponent from './bill-receive/BillReceiveList.vue';
import billReceiveCreateComponent from './bill-receive/BillReceiveCreate.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();
router.map({
    '/': {
        name: 'dashboard',
        component: dashboardComponent
    },
    '/bill-pays':{
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    '/bill-receives':{
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
        }
    },
    '*': {
        component: dashboardComponent
    }
});

router.start({
    components: {
        'bill-component': billComponent
    }
}, '#app');

router.redirect({
    '*': '/dashboard'
});