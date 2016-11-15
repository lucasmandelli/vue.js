Vue.http.options.root = 'http://192.168.10.10:8000/api';

let BillPay = Vue.resource('bills-pay{/id}', {}, {
    total: {
        method: 'GET',
        url: 'bills-pay/total'
    }
});
let BillReceive = Vue.resource('bills-receive{/id}', {}, {
    total: {
        method: 'GET',
        url: 'bills-receive/total'
    }
});

export {BillPay, BillReceive};