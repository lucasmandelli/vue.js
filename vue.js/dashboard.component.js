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
            title: "Dashboard",
            valueReceived: 0,
            valuePaid: 0
        };
    },
    created: function() {
        var self = this;
        BillPay.total().then(function(response){
            self.valuePaid = response.data.total;response.data;
        });

        BillReceive.total().then(function(response){
            self.valueReceived = response.data.total;
        });
    }
});