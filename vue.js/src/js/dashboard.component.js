window.dashboardComponent = Vue.extend({
    template: `
        <div class="row">
            <div class="col s11 offset-s1">    
                <h4>{{ title }}</h4>
            </div>
            <div class="col s12 divider"></div>
        </div>
        
        <div class="container">
            <div class="row">
                <div class="col s6 offset-s3">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title">
                                <i class="material-icons">account_balance</i> TOTAL
                            </p>
                            <h5 :class="{'grey-text': valueReceived - valuePaid === 0, 'green-text': valueReceived - valuePaid > 0, 'red-text': valueReceived - valuePaid < 0}">
                                {{ valueReceived - valuePaid | numberFormat 'pt-BR' }}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        
            <table class="bordered highlight centered responsive-table">
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
        </div>
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