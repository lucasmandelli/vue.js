<template>
    <div class="row">
        <div class="col s11 offset-s1">
            <h4>{{ title }}</h4>
        </div>
        <div class="col s12 divider"></div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col s6">
                <div class="card z-depth-2">
                    <div class="card-content">
                        <p class="card-title">
                            <i class="material-icons">account_balance</i>
                        </p>
                        <h5 :class="{'grey-text': status === false, 'green-text': status === 0, 'red-text': status > 0}">{{ status | statusGeneralReceive }}</h5>
                    </div>
                </div>
            </div>
            <div class="col s6">
                <div class="card z-depth-2">
                    <div class="card-content">
                        <p class="card-title">
                            <i class="material-icons">payment</i>
                        </p>
                        <h5>{{ total | numberFormat 'pt-BR' }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="col s12 divider"></div>
    </div>

    <router-view></router-view>
</template>

<script type="text/javascript">
    import {BillReceive} from '../resources';

    export default {
        data() {
            return {
                title: "Contas a receber",
                status: false,
                total: 0
            };
        },
        created() {
            this.updateStatus();
            this.updateTotal();
        },
        methods: {
            calculateStatus(bills) {
                if(!bills.length) {
                    this.status = false;
                }

                let count = 0;
                for (let i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count;
            },
            updateStatus() {
                BillReceive.query().then((response) => {
                    this.calculateStatus(response.data);
                });
            },
            updateTotal() {
                BillReceive.total().then((response) => {
                    this.total = response.data.total;
                });
            }
        },
        events: {
            'change-info'() {
                this.updateStatus();
                this.updateTotal();
            }
        }
    };
</script>