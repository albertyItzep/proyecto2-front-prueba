document.addEventListener('DOMContentLoaded',function(){
    //agregando validaciones de cors para que no valgamos madres
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('GET','POST','OPTIONS');    

    const nombre = document.getElementById('nombre');
    const usuario = document.getElementById('usuario');
    const genero = document.getElementById('genero');
    const correo = document.getElementById('correo');
    const password = document.getElementById('password');
    const boton1 = document.getElementById('add');
    const boton2 = document.getElementById('regresar');
    let newLabel = document.createElement('label');
    let newLabel1 = document.createElement('label');
    let contenedor= document.getElementById('alert');
    boton1.onclick= function(){
        console.log('hola')
        const data1 = {'nombre':nombre.value,'usuario':usuario.value,'genero':genero.value,'correo':correo.value,'password':password.value}
        console.log(data1);
        fetch('http://localhost:5000/register',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(data1)
        })
        .then(response => response.json())
        .then(data => {
            if(data.data=== "true"){
                newLabel1.className+="alert alert-success btn-block mt-2 col-lg-12";
                newLabel1.innerHTML="El usuario ingresado Correctamente";
                contenedor.appendChild(newLabel1);
                setTimeout(() => {
                    contenedor.removeChild(newLabel1);
                }, 1500);
            }else if(data.data=="invalid password"){
                newLabel.className+="alert alert-danger btn-block mt-2 col-lg-12";
                newLabel.innerHTML="La contraseña debe poseer almenos un signo y un numero";
                contenedor.appendChild(newLabel);
                setTimeout(() => {
                    contenedor.removeChild(newLabel);
                }, 1500);
            }else if(data.data=="todos los campos son necesario"){
                newLabel.className+="alert alert-danger btn-block mt-2 col-lg-12";
                newLabel.innerHTML="Todos los campos son obligatirios";
                contenedor.appendChild(newLabel);
                setTimeout(() => {
                    contenedor.removeChild(newLabel);
                }, 1500);
            }else if(data.data=="false"){
                newLabel.className+="alert alert-danger btn-block mt-2 col-lg-12";
                newLabel.innerHTML="Usuario ya existe";
                contenedor.appendChild(newLabel);
                setTimeout(() => {
                    contenedor.removeChild(newLabel);
                }, 1500);
            }

        })
.catch((error)=> {
            console.log('error es: ',error);
        })
    }
    boton2.onclick= function(){
        window.location.replace("Inicio.html");
    }
}
)