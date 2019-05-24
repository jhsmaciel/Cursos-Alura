
<template>
    <div>
        <h1 class="centralizado">{{ msg }}</h1>  
        <P v-show="mensagem" class="centralizado">{{ mensagem }}</P> 
        <input type="search" @input="filtro = $event.target.value" class="filtro" placeholder="Filtar pelo titulo">
        <ul class="lista-fotos">
            <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
                <meu-painel :titulo="foto.titulo">
                    <imagem-responsiva v-meu-tranform:rotate.animate="15" :url="foto.url" :alt="foto.titulo" />
                    <router-link :to="{ name: 'altera', params: {id: foto._id}}" ><meu-botao tipo="button" rotulo="Alterar"/></router-link>
                    <meu-botao tipo="button" rotulo="Remover" @botaoAtivado="remove(foto)" :confirmacao="false" estilo="perigo"/>
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';
export default {
    components: {
        'meu-painel' : Painel,
        'imagem-responsiva': ImagemResponsiva,
        'meu-botao' : Botao
    },
    data() {
        return {
            msg: "Vue.js",
            fotos: [

            ],
            filtro: '',
            mensagem: '',     
        }
    },
    computed: {
      fotosComFiltro(){
        if(this.filtro){
            let exp = new RegExp(this.filtro.trim(), 'i');
            return  this.fotos.filter(foto => exp.test(foto.titulo))
        }
        return this.fotos;
      }  
    },
    created() {
        this.service = new FotoService(this.$resource);

        this.service.lista()
       .then(fotos => {
            this.fotos = fotos
       }).catch( err => this.mensagem = 'Não foi possível obter as imagens');
        
    },
    methods: {
        remove(foto){
            this.service.apaga(foto._id)
            .then(  ()  =>{
                this.mensagem = "Foto removida com sucesso!"
                let indice = this.fotos.indexOf(foto);
                this.fotos.splice(indice, 1)
            },
            err => {
                console.log(err);
                this.mensagem = "Não foi possível remover a foto!"
            });   
        }
    }
}
</script>

<style>
    .centralizado {
        text-align: center;
    }
    .lista-fotos {
        list-style: none;
    }
    .lista-fotos .lista-fotos-item {
        display: inline-block;
    }
    .imagem-responsiva, .filtro {
        width: 98%;
    }
</style>
