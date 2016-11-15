<template>
    <ul v-bind:id="actions.id" class="dropdown-content" v-for="actions in menuDropdown">
        <li v-for="item in actions.items">
            <a v-link="{name: item.routeName}" class="blue-grey-text">{{ item.name }}</a>
        </li>
    </ul>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
                <div class="row">
                    <div class="col s12">
                        <a href="#" class="brand-logo">Vue Contas</a>
                        <a href="#" data-activates="nav-mobile" class="button-collapse">
                            <i class="material-icons">menu</i>
                        </a>
                        <ul class="right hide-on-med-and-down">
                            <li v-for="menu in menus">
                                <a v-if="menu.dropdownId" class="dropdown-button" href="!#"
                                    v-bind:data-activates="menu.dropdownId">
                                    {{ menu.name }}
                                    <i class="material-icons right">arrow_drop_down</i>
                                </a>
                                <a v-else v-link="{name: menu.routeName}">{{ menu.name }}</a>
                            </li>
                        </ul>
                        <ul id="nav-mobile" class="side-nav">
                            <li v-for="menu in menus">
                                <a v-link="{name: menu.routeName}">{{ menu.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <router-view></router-view>
</template>

<script type="text/javascript" >

    export default {
        ready() {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        },
        data() {
            return {
                menus: [
                    {name: "Dashboard", routeName: 'dashboard'},
                    {name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay'},
                    {name: "Contas a receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive'}
                ],
                menuDropdown: [
                    {
                        id: 'bill-pay',
                        items: [
                            //{id: 0, name: "Listar contas", url: '/bills'},
                            //{id: 1, name: "Criar conta", url: '/bill/create'}
                            {id: 0, name: "Listar contas", routeName: 'bill-pay.list'},
                            {id: 1, name: "Criar conta", routeName: 'bill-pay.create'}
                        ]
                    },
                    {
                        id: 'bill-receive',
                        items: [
                            {id: 0, name: "Listar contas", routeName: 'bill-receive.list'},
                            {id: 1, name: "Criar conta", routeName: 'bill-receive.create'}
                        ]
                    },
                ]
            };
        }
    };

</script>