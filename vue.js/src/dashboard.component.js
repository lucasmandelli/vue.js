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
                    <td>{{ valueReceived | numberFormat 'pt-BR' }}</td>
                </tr>
                <tr>
                    <td>A pagar</td>
                    <td>{{ valuePaid | numberFormat 'pt-BR' }}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>TOTAL</th>
                <th>{{ valueReceived - valuePaid | numberFormat 'pt-BR' }}</th>
            </tr>
            </thead>
        </table>
    `,
    data() {
        return {
            title: "Dashboard",
            valueReceived: 0,
            valuePaid: 0
        };
    },
    created() {
        let self = this;
        BillPay.total().then(function(response){
            self.valuePaid = response.data.total;response.data;
        });

        BillReceive.total().then(function(response){
            self.valueReceived = response.data.total;
        });
    }
});