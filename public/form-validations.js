//Eliminar mensaje ERROR si imagen ya existe
message = document.querySelector('.wrong-image-input');

setTimeout(()=>{
    if(message){
        message.style.display = 'none';
    }
}, 2000)

//Validación inputs formulario
//1) Titulo:
forminputValidation('#title', /^[a-zA-Z0-9_ ]+$/);
//2) url:
const url_pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=]*)?$/;
forminputValidation('#url', url_pattern);






//Funciones

//Validación campos formulario
function forminputValidation(id, regex){
    const form_field = document.querySelector(id);
    form_field.addEventListener('input', (event)=>{
        //Cuando elemento tiene el foco, validamos si contenido se ajusta al pattern
        const form_field_value = event.target;
    
        //Compruebo si es valido y añado clases
        if(regex.test(form_field_value.value)){
            form_field.classList.remove('wrong-form-input');
            form_field.classList.add('correct-form-input');
            
    
        }else{
            form_field.classList.remove('correct-form-input');
            form_field.classList.add('wrong-form-input');
        }
    
    })
}




//Mostramos mensaje error
// const errorMessage = document.createElement('p');
// errorMessage.innerHTML='Error. Formato campo incorrecto.'
// document.querySelector('#title').insertBefore(errorMessage, title_image);

