window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: `
        <style type="text/css">
            .cinza {
                color: gray;
            }
            .verde {
                color: green;
            }
            .vermelho {
                color: red;
            }
        </style>
        <h1>{{ title }}</h1>

        <h5 :class="{'cinza': status === false, 'verde': status === 0, 'vermelho': status > 0}">{{ status | statusGeneralReceive }}</h5>
        
        <h5>{{ total | numberFormat 'pt-BR' }}</h5>

        <menu-component></menu-component>
        
        <router-view></router-view>
    `,
    data() {
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills) {
            if(!bills.length) {
                this.status = false;
            }

            let count = 0;
            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus() {
            BillReceive.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal() {
            BillReceive.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});