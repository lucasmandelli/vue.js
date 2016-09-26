window.billPayListComponent = Vue.extend({
    template: `
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(index, bill) in bills">
                    <td>{{ index + 1 }}</td>
                    <td>{{ bill.date_due }}</td>
                    <td>{{ bill.name }}</td>
                    <td>{{ bill.value | currency 'R$ ' 2 }}</td>
                    <td :class="{'verde': bill.done, 'vermelho': !bill.done}" >{{ bill.done | doneLabelPay }}</td>
                    <td>
                        <a v-link="{ name: 'bill-pay.update', params: {index: index} }">Editar</a>
                        <a href="#" @click.prevent="removeBill(bill)">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function() {
        return {
            bills: this.$root.$children[0].billsPay
        };
    },
    methods: {
        removeBill: function(bill) {
            if(confirm('Deseja realmente apagar essa conta?')) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        }
    }
});