
<template>
    <div>
        <h1 class="centralizado">{{ msg }}</h1>   
        <input type="search" @input="filtro = $event.target.value" class="filtro" placeholder="Filtar pelo titulo">
        <ul class="lista-fotos">
            <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
                <meu-painel :titulo="foto.titulo">
                    <imagem-responsiva :url="foto.url" :alt="foto.titulo" />
                    <meu-botao tipo="button" rotulo="REMOVER" @click.native="remove(foto)"/>
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
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
            filtro: ''      
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
        let promise = this.$http.get("http://localhost:3000/v1/fotos");
        promise
        .then((result) => { 
            this.fotos = result.body;
        }).catch((err) => {
            console.log(err);
        });
    },
    methods: {
        remove(foto){
            if(confirm('Confirma a operação?')){
                alert(foto.titulo)
            }
        }
    },
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
