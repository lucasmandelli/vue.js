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
        
        <h5>{{ total | currency 'R$ ' }}</h5>

        <menu-component></menu-component>
        
        <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created: function() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function(bills) {
            if(!bills.length) {
                this.status = false;
            }

            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function() {
            var self = this;
            BillReceive.query().then(function(response){
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function() {
            var self = this;
            BillReceive.total().then(function(response){
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});