class Depesas{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this){
            if(this[i] === undefined || this[i] === null || this[i] === ''){
                return false;
            }
        }
        return true
    }
}

class Bd{

    constructor(){
        let id =  localStorage.getItem('id');
        if(id === null){
            localStorage.setItem('id', 0);
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1
    }
    gravar(d){
       let id = this.getProximoId();
       localStorage.setItem(id, JSON.stringify(d));
       localStorage.setItem('id', id);      
    }

    recuperTodosRegistros(){
        let despesas = []
        let id = localStorage.getItem('id');
        for(let i = 1;i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));

            if(despesa === null){
                continue;
            }

            despesas.push(despesa);
        }
        console.log(despesas)
    }
   
}

function sucessoModal(){
    let tituloSucesso = document.getElementById('modal_titulo');
    tituloSucesso.innerHTML = 'Registro inserido com sucesso';
    tituloSucesso.classList.add('text-success');

    let corpoSucesso = document.getElementById('corpo_modal');
    corpoSucesso.innerHTML = "Despesa foi cadastrada com sucesso";

    let buttonSucesso = document.getElementById('button_modal');
    buttonSucesso.classList.add('btn-success');
    buttonSucesso.innerHTML = "Voltar"
}

function erroModal(){
    let titulo = document.getElementById('modal_titulo');
    titulo.innerHTML = 'Falha ao inserir o registro';
    titulo.classList.add('text-danger');

    let corpo = document.getElementById('corpo_modal');
    corpo.innerHTML = "Cadastre todos os dados";

    let button = document.getElementById('button_modal');
    button.classList.add('btn-danger');
    button.innerHTML = "Voltar e preencher"
}


function cadastrarDespesas(){
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');


    let despesa = new Depesas(ano.value, mes.value, dia.value, tipo.value , descricao.value, valor.value);
   
    if(despesa.validarDados()){
        bd.gravar(despesa);
        sucessoModal();
        $('#modalRegistraDepesas').modal('show');
    }else{
        erroModal();
        $('#modalRegistraDepesas').modal('show');
    }
};

let bd = new Bd();

function carregaListaDepesas(){
    bd.recuperTodosRegistros()
}



