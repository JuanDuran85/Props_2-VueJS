let MovieFav = {
    template: `
        <div class="movieFav-wrapper">
            <div :id="'Fav-'+_uid" class="movieFav">
            </div>
        </div>
    `,
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
        console.log(elemento);
        elemento.addEventListener('animationend',()=>{
            this.$emit('hideFav', false);
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