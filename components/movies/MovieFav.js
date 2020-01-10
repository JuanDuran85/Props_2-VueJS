let MovieFav = {
    template: `
        <div v-show="show" class="movieFav-wrapper">
            <div :id="'Fav-'+_uid" class="movieFav">
            </div>
        </div>
    `,
    props: {
        show: {
            type: Boolean,
            default(){
                return false
            }
        }
    },
    methods: {
        showMensaje(){
            console.log(this.mensaje);
        }
    },
    data() {
        return {
            mensaje: 'Mensaje desde Movie Fav...'
        }
    },
    beforeCreate() {
        console.log('Antes de crear');
    },
    created() {
        console.log('creado pero no montado');
    },
    beforeMount() {
        console.log('antes de montarse');
    },
    mounted() {
        console.log('montado y mostrado');
        let elemento = document.getElementById(`Fav-${this._uid}`);
        console.log('Elemento: ');
        console.log(elemento);
        elemento.addEventListener('animationend',()=>{
            //this.$emit('hideFav', false);
            this.$emit('update:show',false);
        });
    },
    beforeUpdate() {
        console.log('antes de actualizar');
    },
    updated() {
        console.log('actualizado');
    },
    beforeDestroy() {
        console.log('antes de destruir');
    },
    destroyed() {
        console.log('destruido');
    },
}