//importar módulos de terceros
const express = require('express');
const morgan = require('morgan');
const { getColorFromURL } = require('color-thief-node');

//Creamos una instancia del servidor Express
const app = express();

//Hacemos accesible carpeta public
app.use(express.static('public'));

//Variable global para indicar puerto escucha
const PORT = process.env.PORT || 3000 ; //variable de entorno PORT ofrecido por render en su documentacion

//Middleware para indicar a express que procesamos peticiones tipo post (vienen codificadas desde cliente)
app.use(express.urlencoded({extended:true}));

//Base de datos de imagenes
const images = [];

//Uso EJS como motor plantillas
app.set('view engine', 'ejs');

//Usamos morgan para loguear las peticiones cliente
app.use(morgan('tiny'));

//enpoint raiz (mostrar imágenes)
app.get('/', (req, res)=>{
    res.render('home', {
        images: images,
    });
})

//enpoint Añadir imagen (petición GET)
app.get('/add-image-form', (req, res)=>{
    res.render('form', {
        today: new Date().toISOString().split('T')[0], 
        imageExists: undefined
    });
    
})

//endpoint POST formulario (leemos datos formulario y actualidamos nuestra base de datos - images)
app.post('/add-image-form', async(req, res)=>{
    //Datos del cliente vienen de req.body
    //Validamos si existe url en bbdd
    if(images.find(image=> image.url == req.body.url)){
        res.render('form', {
            today : new Date().toISOString().split('T')[0], 
            imageExists: true
        })
    }else{
        try{
            //Calculamos color dominante
            const dominantColor = await getColorFromURL(req.body.url);
            //Creamos nuevo objeto image
            req.body.color = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

            images.push(req.body);
            //ordenar array images por data y se lo paso a la vista
            sortImagesByDate(images);
            res.redirect('/add-image-form');

        }
        catch{
            const dominantColor = 'No disponible';
            //Creamos nuevo objeto image
            req.body.color = `No disponible`;
            images.push(req.body);
            //ordenar array images por data y se lo paso a la vista
            sortImagesByDate(images);


        }
        
    }
})


//Levantamos servidor
app.listen(PORT, (req, res)=>{
    console.log("Servidor escuchando correctamente")
})


//Funciones
//1) Ordenar imagenes
function sortImagesByDate(array){
    //1) Creamos copia array original con slice()
    //2) si resta negativa a va antes que b (si resta positiva b va antes q a)
    return array.sort((a, b) => new Date(b.date) - new Date(a.date));
}

