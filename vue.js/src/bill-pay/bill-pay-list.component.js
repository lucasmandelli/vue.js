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
                    <td>{{ bill.date_due | dateFormat 'pt-BR' }}</td>
                    <td>{{ bill.name | stringUpperLowerCase }}</td>
                    <td>{{ bill.value | numberFormat 'pt-BR' }}</td>
                    <td :class="{'verde': bill.done, 'vermelho': !bill.done}" >{{ bill.done | doneLabelPay }}</td>
                    <td>
                        <a v-link="{ name: 'bill-pay.update', params: {id: bill.id} }">Editar</a>
                        <a href="#" @click.prevent="removeBill(bill)">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data() {
        return {
            bills: []
        };
    },
    created() {
        BillPay.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        removeBill(bill) {
            if(confirm('Deseja realmente apagar essa conta?')) {
                BillPay.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});