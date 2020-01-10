/* 
    Creando el componente hijo para los props
    declarando el componente hijo de manera local
    con la propiedad props se reciben los datos del padre al hijo

    para trabajar con sync desde el padre, se debe agregar:
    @click="$emit('update:like', !like)" 

    Si se quiere modificar el dato del padre desde el hijo, con el elemento $parent
    se puede lograr de la siguiente manera:  this.$parent.showLike = true;

    los filtos se utilizan para formatear texto. utilizando el sibmbolo |

    los watch son un objeto que reciben funciones, las funciones deben ser el mismo nombre
    de la dat o los props que queremos ver el cambio

    sirven para ver el cambio de valor de los props o comparar los valores y hacer ciertas acciones
    o metodos o para hacer llamados asincronos cuando el valor de una propiedad o data cambien
*/

let MovieComp = {
    template: `
        <div :id="id | formatId" class="card" :class="{'movie-like': like}">
            <img :src="cover" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{title | upperCase | agregarText}}</h5>
                <p class="card-text" 
                    :class="{
                        'text-center' : like,
                        'text-justify': !like
                    }">
                    {{synopsis | reducirText}}
                </p>
                <button 
                    @click="toggleLike"
                    class="btn"
                    :class="btnStatus">
                    <span v-text="like ? 'Favorito' : 'Agregar a Favoritos'" ></span>
                    <i class="fas" :class="corazonLike"></i>
                </button>
            </div>
        </div>
    `,
    data() {
        return {
            
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        synopsis: {
            type: String,
            default(){
                return 'No posee información'
            }
        },
        cover: {
            type: String, 
            required: true
        },
        message: {
            type: String,
            required: false
        },
        like: {
            type: Boolean,
            required: true,
            default(){
                return false
            }
        }
    },
    methods: {
        toggleLike () {
            //this.like = !this.like
            let data = {
                id: this.id,
                like: !this.like
            };
            console.log('Data: ');
            console.log(data);
            if (!this.like) {
                console.log(`parent movies: `);
                console.log(this.$parent.movies);
                this.$parent.showLike = true;
                this.$parent.sayHello();
                console.log(`parent showLike: `);
                console.log(this.$parent.showLike);
            }
            this.$emit('toggleLike', data);
            this.$emit('update:show',false);
        }
    },
    computed: {
        btnStatus(){
            return this.like ? 'btn-like' : 'btn-outline-primary'
        },
        corazonLike(){
            return this.like ? 'fa-heart' : 'fa-heart-broken'
        }
    },
    filters: {
        formatId(parametro) {
            return `movieCard-${parametro}`;
        },
        upperCase(parametro) {
            return parametro.toUpperCase();
        },
        agregarText(parametro) {
            let texto = "Pelicula: ";
            return texto.concat(""+parametro);
        },
        reducirText(parametro){
            return parametro.substr(0,39)+'...';
        }
    },
    watch: {
        like(newValue, oldValue){
            console.log(`nuevo: ${newValue}, viejo: ${oldValue}`);
        }
    }
}