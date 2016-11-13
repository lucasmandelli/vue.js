import {BillPay} from '../resources';
import {BillClass as ClassBillPay} from '../bill';

const namesPay = [
    'conta de luz',
    'conta de água',
    'conta de telefone',
    'supermercado',
    'cartão de crédito',
    'empréstimo',
    'gasolina'
];

export default {
    template: `
        <div class="container">
            <h5 v-if="formType == 'insert'">Criar Conta</h5>
            <h5 v-else>Editar Conta</h5>
            <form name="formCriarConta" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s6">
                        <label for="name" class="active">Nome</label>
                        <select id="name" class="materialize-select browser-default" v-model="bill.name">
                            <option value="" disabled selected>Selecione</option>
                            <option v-for="name in names" :value="name">{{ name | stringUpperLowerCase }}</option>
                        </select>
                    </div>
                    <div class="input-field col s6">
                        <label for="date_due" class="active">Vencimento</label>
                        <input type="text" id="date_due" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a data" >
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <label for="value" class="active">Valor</label>
                        <input type="text" id="value" v-model="bill.value | numberFormat 'pt-BR'" >
                    </div>
                    <div class="input-field col s6">
                        <input type="checkbox" id="done" v-model="bill.done" >
                        <label for="done">Paga?</label>
                    </div>
                </div>
                <div class="row">
                    <div class="right">
                        <button type="submit" class="btn waves-effect waves-dark blue-grey" >Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    `,
    data() {
        return {
            formType: 'insert',
            names: namesPay,
            bill: new ClassBillPay()
        };
    },
    created() {
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    ready() {
        $('.materialize-select').material_select();
    },
    methods: {
        submit() {
            var data = this.bill.toJSON();
            if(this.formType == 'insert') {
                BillPay.save({}, data).then((response) => {
                    Materialize.toast('Conta criada com sucesso.', 4000);
                    this.$dispatch('change-info');

                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    Materialize.toast('Conta atualizada com sucesso.', 4000);
                    this.$dispatch('change-info');

                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id){
            BillPay.get({id: id}).then((response) => {
                this.bill = new ClassBillPay(response.data);
            });
        }
    }
};