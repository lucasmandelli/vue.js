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

        <menu-component></menu-component>
        
        <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a receber"
        };
    },
    computed: {
        status: function() {
            var bills = this.$root.$children[0].billsReceive;
            if(!bills.length) {
                return false;
            }

            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }
});