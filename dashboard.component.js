window.dashboardComponent = Vue.extend({
    template: `
        <h1>{{ title }}</h1>
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>Conta</th>
                <th>Valor</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>A receber</td>
                    <td>{{ valueReceived | currency 'R$ ' 2 }}</td>
                </tr>
                <tr>
                    <td>A pagar</td>
                    <td>{{ valuePaid | currency 'R$ ' 2 }}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>TOTAL</th>
                <th>{{ valueReceived - valuePaid | currency 'R$ ' 2 }}</th>
            </tr>
            </thead>
        </table>
    `,
    data: function() {
        return {
            title: "Dashboard"
        };
    },
    computed: {
        valueReceived: function() {
            var bills = this.$root.$children[0].billsReceive;
            if(!bills.length) {
                return 0;
            }

            var value = 0;
            for (var i in bills) {
                value += bills[i].value;
            }
            return value;
        },
        valuePaid: function() {
            var bills = this.$root.$children[0].billsPay;
            if(!bills.length) {
                return 0;
            }

            var value = 0;
            for (var i in bills) {
                value += bills[i].value;
            }
            return value;
        }
    }
});