import {BillReceive} from '../resources';
import modalComponent from '../Modal.vue';

export default {
    components: {
        'modal': modalComponent
    },
    template: `
        <div class="container">
            <h5>Listagem de Contas</h5>
            <table class="bordered striped highlight centered responsive-table">
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
                        <td :class="{'green-text': bill.done, 'red-text': !bill.done}" >{{ bill.done | doneLabelReceive }}</td>
                        <td>
                            <a v-link="{ name: 'bill-receive.update', params: {id: bill.id} }">Editar</a>
                            <a href="#" @click.prevent="openModalDelete(bill)">Excluir</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <modal :modal="modal">
            <div slot="content">
                <h5>Confirmar...</h5>
                <p>Deseja excluir esta conta?</p>
                <div class="divider"></div>
                <p><strong>Nome: </strong> {{ billToRemove.name }}</p>
                <p><strong>Valor: </strong> {{ billToRemove.value | numberFormat }}</p>
                <p><strong>Vencimento: </strong> {{ billToRemove.date_due | dateFormat }}</p>
                <div class="divider"></div>
            </div>
            <div slot="footer">
                <button class="btn btn-flat red waves-effect modal-close" @click.prevent="removeBill()">Excluir</button>
                <button class="btn btn-flat waves-effect modal-close">Cancelar</button>
            </div>
        </modal>
    `,
    data() {
        return {
            bills: [],
            billToRemove: null,
            modal: {
                id: 'modal-delete-bill-received'
            }
        };
    },
    created() {
        BillReceive.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        removeBill() {
            BillReceive.delete({id: this.billToRemove.id}).then((response) => {
                this.bills.$remove(this.billToRemove);
                this.billToRemove = null;

                Materialize.toast('Conta excluída com sucesso.', 4000);
                this.$dispatch('change-info');
            });
        },
        openModalDelete(bill) {
            this.billToRemove = bill;
            $('#'+this.modal.id).openModal();
        }
    }
};