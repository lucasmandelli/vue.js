Vue.filter('doneLabel', function(value){
    if(!value){
        return "Não Paga";
    }else{
        return "Paga";
    }
});

var app;
app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
            {date_due: '21/08/2016', name: 'Conta de água', value: 55.39, done: false},
            {date_due: '22/08/2016', name: 'Conta de telefone', value: 105.89, done: false},
            {date_due: '23/08/2016', name: 'Supermercado', value: 384.29, done: false},
            {date_due: '24/08/2016', name: 'Cartão de crédito', value: 168.26, done: false},
            {date_due: '25/08/2016', name: 'Empréstimo', value: 1025.19, done: false},
            {date_due: '26/08/2016', name: 'Gasolina', value: 190.59, done: false}
        ]
    },
    computed: {
        amountDue: function() {
            if(this.bills.length){
                var count = 0;
                for (var i in this.bills) {
                    if (!this.bills[i].done) {
                        count++;
                    }
                }
                return count;
            }else{
                return false;
            }
        },
        status: function() {
            if(this.amountDue === 0) {
                return "Nenhuma conta a pagar";
            }else if(!this.amountDue) {
                return "Nenhuma conta cadastrada";
            }else {
                return "Existem " + this.amountDue + " contas a serem pagas";
            }
        },
        statusLabel: function () {
            if(this.amountDue === 0) {
                return "verde";
            }else if(!this.amountDue) {
                return "cinza";
            }else {
                return "vermelho";
            }
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if(id == 1){
                this.formType = 'insert';
            }
        },
        submit: function() {
            if(this.formType == 'insert') {
                this.bills.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.activedView = 0;
        },
        loadBill: function(bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        removeBill: function(bill_id) {
            if(confirm('Deseja realmente apagar essa conta?')) {
                this.bills.splice(bill_id, 1);
            }
        }
    }
});