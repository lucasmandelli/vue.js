window.billPayCreateComponent = Vue.extend({
    template: `
        <form name="formCriarConta" @submit.prevent="submit">
            <label for="date_due">Vencimento:</label>
            <input type="text" id="date_due" v-model="bill.date_due" ><br><br>

            <label for="name">Nome:</label>
            <select id="name" v-model="bill.name">
                <option value="">Selecione</option>
                <option v-for="name in names" :value="name">{{ name }}</option>
            </select><br><br>

            <label for="value">Valor:</label>
            <input type="text" id="value" v-model="bill.value" ><br><br>

            <label for="done">Paga?</label>
            <input type="checkbox" id="done" v-model="bill.done" ><br><br>

            <input type="submit" value="Enviar" >
        </form>
    `,
    data: function() {
        return {
            formType: 'insert',
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function() {
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function() {
            var self = this;
            if(this.formType == 'insert') {
                BillPay.save({}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }else{
                BillPay.update({id: this.bill.id}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill: function(id){
            var self = this;
            BillPay.get({id: id}).then(function(response){
                self.bill = response.data;
            });
        }
    }
});