var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function(){
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.39, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 105.89, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 384.29, done: false},
                {date_due: '24/08/2016', name: 'Cartão de crédito', value: 168.26, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 1025.19, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 190.59, done: false}
            ],
            billsReceive: [
                {date_due: '20/08/2016', name: 'Venda de Produtos', value: 1970.99, done: true},
                {date_due: '21/08/2016', name: 'Juros aplicação', value: 25.39, done: false},
                {date_due: '22/08/2016', name: 'Herança', value: 10500.00, done: false}
            ]
        };
    }
});

var router = new VueRouter();
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
            '/:index/update': {
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
            '/:index/update': {
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
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/dashboard'
});