/* 
    Componente padre Props
    con la propiedad components se trae al componente hijo
    con la iteracion del arreglo movies, se pasa los valores al componente hijo
    el binding se realizada cuando es dato del componente propio
    para pasar texto o valores directos se hace sin el binding

    para trabajar con sync desde el padre al hijo, se debe agregar:
    :like.sync="movie.like"

    para ocultar automaticamente la animacion, se debe implementar en el componente hijo:
    v-if="showLike" @hideFav="onHideFav"

    La referencia debe ser unica, como un ID.

    <input v-model="usuario"/> ==> v-model hace al cambio directamente cada vez 
    que utilizamos el valor del input, sin hacer el cambio total. Por lo tanto se usa
    <input :value="usuario" @change="setNuevoUsaurio"/>

    El wacth no lee el valor de los key. El wacth es un objeto. Tambien consumen muchos recursos
*/

Vue.component('props-comp', {
    template: `
        <div class="container">
        <h5>Bienvenido {{usuario}}</h5>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-6 col-lg-4" v-for="(movie,index) in movies" 
                :key="index">
                    <MovieComp
                        :ref="'movie-'+movie.id"
                        :id="movie.id"
                        :title="movie.title"
                        :synopsis="movie.synopsis"
                        :cover="movie.cover"
                        message="Mensaje desde el componente padre"
                        :like="movie.like"
                        @toggleLike="onToggleLike"
                    />
                </div>
            </div>
            <br>
            <label>Cambiar nombre:
                <input :value="usuario" @change="setNuevoUsaurio"/>
                <br>
                <input :value="nombreApellido.nombre" @change="NuevoUsaurioNombre"/>
                <input :value="nombreApellido.apellido" @change="NuevoUsaurioApellido"/>
            </label>
            {{vijeoUsuario}}
            <MovieFav ref="MovieFav" :show.sync="showLike"/>
        </div>
    `,
    data() {
        return {
            movies: [
                {
                    id: 1,
                    title: 'Titanic',
                    synopsis: 'Durante las labores de recuperación de los restos del famoso trasatlántico Titanic, una anciana norteamericana se pone en contacto con la expedición para acudir…',
                    cover: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/zraTDtulFw2wrpyuYf646k95MNq.jpg',
                    like: false
                },
                {
                    id: 2,
                    title: 'El Rey León',
                    synopsis: 'Un remake del clásico animado de Disney de 1994 El rey león que estará dirigido por Jon Favreu. Simba (Donald Glover) es el hijo del rey de los leones, Mufasa…',
                    cover: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/3A8ca8WOBacCRujSKJ2tCVKsieQ.jpg',
                    like: false
                },
                {
                    id: 3,
                    title: 'Toy Story',
                    cover: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/uMZqKhT4YA6mqo2yczoznv7IDmv.jpg',
                    like: false
                }
            ],
            showLike: false,
            usuario: 'Juan Duran',
            vijeoUsuario: null,
            nombreApellido: {
                nombre: 'Juan',
                apellido: 'Duran'
            }
        }
    },
    components: {
        MovieComp,
        MovieFav
    },
    methods: {
        onToggleLike(data){
            let movieLike = this.movies.find(movie => movie.id == data.id);
            movieLike.like = data.like;
            console.log('movieLike like');
            console.log(movieLike.like);
            this.showLike = data.like;
            //this.like = like;
            if (movieLike.like) {
                console.log('Dentro del if para el alert');
                this.$swal(`${movieLike.title}`, "Pelicula Agregada a Favoritos", "success");
                //alert(`${movieLike.title} agregada a favoritos`);
            };
            setTimeout(()=>{
                this.showLike = false;
            },2000);
        },
        onHideFav(show){
            this.showLike = show;
        },
        sayHello(){
            console.log('-------mensaje desde metodo en el padre-----');
        },
        setNuevoUsaurio(event){
            this.usuario = event.target.value;
        },
        NuevoUsaurioNombre(event){
            this.nombreApellido.nombre = event.target.value;
        },
        NuevoUsaurioApellido(event){
            this.nombreApellido.apellido = event.target.value;
        }

    },
    mounted() {
        console.log(this.$refs.MovieFav.mensaje);
        this.$refs.MovieFav.mensaje = '/////// Hola desde el padre ////////';
        this.$refs.MovieFav.showMensaje();
    },
    watch: {
        usuario(nValor, vValor){
            console.log(`Nuevo: ${nValor}, Viejo: ${vValor}`);
            this.vijeoUsuario = vValor;
        },
        nombreApellido: {
            handler: function (nValor, vValor) {
                console.log('Nuevo: ', nValor, 'Viejo: ',vValor);
            },
            deep: true //profundidad del objeto
        },
        'nombreApellido.nombre': {
            handler: function (nValor, vValor) {
                console.log('Nuevo: ', nValor, 'Viejo: ',vValor);
            },
            deep: true //profundidad del objeto
        },
        'nombreApellido.apellido': {
            handler: function (nValor, vValor) {
                console.log('Nuevo: ', nValor, 'Viejo: ',vValor);
            },
            deep: true //profundidad del objeto
        }
    },
})