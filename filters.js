Vue.filter('doneLabelPay', function(value){
    if(!value){
        return "Não Paga";
    }else{
        return "Paga";
    }
});
Vue.filter('statusGeneralPay', function(value){
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a pagar";
    }else{
        return "Existem "+value+" contas a serem pagas";
    }
});

Vue.filter('doneLabelReceive', function(value){
    if(!value){
        return "Não Recebida";
    }else{
        return "Recebida";
    }
});
Vue.filter('statusGeneralReceive', function(value){
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a receber";
    }else{
        return "Existem "+value+" contas a receber";
    }
});