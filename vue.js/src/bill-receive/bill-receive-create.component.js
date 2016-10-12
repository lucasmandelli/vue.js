const namesReceive = [
    'venda de produtos',
    'juros aplicação',
    'herança'
];

window.billReceiveCreateComponent = Vue.extend({
    template: `
        <form name="formCriarConta" @submit.prevent="submit">
            <label for="date_due">Vencimento:</label>
            <input type="text" id="date_due" v-model="bill.date_due | dateFormat 'pt-BR'" ><br><br>

            <label for="name">Nome:</label>
            <select id="name" v-model="bill.name">
                <option value="">Selecione</option>
                <option v-for="name in names" :value="name">{{ name | stringUpperLowerCase }}</option>
            </select><br><br>

            <label for="value">Valor:</label>
            <input type="text" id="value" v-model="bill.value | numberFormat 'pt-BR'" ><br><br>

            <label for="done">Recebida?</label>
            <input type="checkbox" id="done" v-model="bill.done" ><br><br>

            <input type="submit" value="Enviar" >
        </form>
    `,
    data() {
        return {
            formType: 'insert',
            names: namesReceive,
            bill: new ClassBillReceive()
        };
    },
    created() {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            var data = this.bill.toJSON();
            if(this.formType == 'insert') {
                BillReceive.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id){
            BillReceive.get({id: id}).then((response) => {
                this.bill = new ClassBillReceive(response.data);
            });
        }
    }
});