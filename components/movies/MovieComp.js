/* 
    Creando el componente hijo para los props
    declarando el componente hijo de manera local
    con la propiedad props se reciben los datos del padre al hijo

    para trabajar con sync desde el padre, se debe agregar:
    @click="$emit('update:like', !like)" 

    Si se quiere modificar el dato del padre desde el hijo, con el elemento $parent
    se puede lograr de la siguiente manera:  this.$parent.showLike = true;
*/

let MovieComp = {
    template: `
        <div class="card" :class="{'movie-like': like}">
            <img :src="cover" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" v-text="title"></h5>
                <p class="card-text" v-text="synopsis" 
                    :class="{
                        'text-center' : like,
                        'text-justify': !like
                    }">
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
}