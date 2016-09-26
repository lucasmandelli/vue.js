window.billReceiveCreateComponent = Vue.extend({
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

            <label for="done">Recebida?</label>
            <input type="checkbox" id="done" v-model="bill.done" ><br><br>

            <input type="submit" value="Enviar" >
        </form>
    `,
    data: function() {
        return {
            formType: 'insert',
            names: [
                'Venda de Produtos',
                'Juros aplicação',
                'Herança'
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
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function() {
            if(this.formType == 'insert') {
                this.$root.$children[0].billsReceive.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.go({name: 'bill-receive.list'});
        },
        getBill: function(index){
            var bills = this.$root.$children[0].billsReceive;
            this.bill = bills[index];
        }
    }
});