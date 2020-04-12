/* V A R I A B L E S */
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

/* E V E N T   L I S T E N E R */
eventListeners();

function eventListeners() {
    //INICIO DE LA APLICACION Y DESABILITAR BOTON
    document.addEventListener('DOMContentLoaded', inicioApp);

    //CAMPOS DEL FORMULARIO
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    //BOTON DE ENVIAR EN EL SUBMIT
    formularioEnviar.addEventListener('submit', enviarEmail);

    //BOTON RESET 
    resetBtn.addEventListener('click', resetFormulario);
}

/* F U N C I O N E S */
function inicioApp() {
    //DESABILITAR ENVIO
    btnEnviar.disabled = true;
}

//VALIDA QUE LOS CAMPOS ESTEN LLENOS
function validarCampo() {
    //SE VALIDA LONGITUD DEL TEXTO Y QUE NO ESTE VACIO
    validarLongitud(this);

    //VALIDAR EMAIL
    if(this.type === 'email') {
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if(email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if(errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

//RESET EL FORMULARIO
function resetFormulario(e){
    formularioEnviar.reset();
    e.preventDefault();
}

//CUANDO SE ENVIA EL CORREO
function enviarEmail(e) {
    //SPINER AL PRESIONAR ENVIAR
    const spinerGif = document.querySelector('#spinner');
    spinerGif.style.display = 'block';

    //GIF ENVIA EMAIL
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    //OCULATAR SPINER Y MOSTRAR ENVIADO
    setTimeout(function() {
        spinerGif.style.display = 'none';

        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(function() {
            enviado.remove();
            formularioEnviar.reset();
        },3000);
    }, 3000);
    e.preventDefault();
}

//VERIFICA LA LONGITUD DE LOS CAMPOS
function validarLongitud(campo) {
    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}