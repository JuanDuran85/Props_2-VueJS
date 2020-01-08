/* 
    Creando el componente hijo para los props
    declarando el componente hijo de manera local
    con la propiedad props se reciben los datos del padre al hijo
*/

let MovieComp = {
    template: `
        <div>
            <img :src="cover"/>
            <h2 v-text="title"></h2>
            <p v-text="synopsis"></p>
            <hr>
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
        }
    }
}