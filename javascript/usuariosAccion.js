document.addEventListener('DOMContentLoaded',function(){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('GET','POST','OPTIONS','PUT');
    const editUser = document.getElementById('editUser');
    const editUser2 = document.getElementById('datos');
    const crearP = document.getElementById('crearP');
    const verP = document.getElementById('verP');
    const misP = document.getElementById('misP');
    let newLabel = document.createElement('label');
    let newLabel1 = document.createElement('label');
    let contenedor= document.getElementById('contenedor');

    const usuarioS = sessionStorage.getItem('nameUser');
    sessionStorage.setItem('nameUser',usuarioS);
    
    editUser.onclick=()=>{
        let usuario= sessionStorage.getItem('nameUser');
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        fetch(`https://proyecto2-backend-prueba.herokuapp.com/usuarioIngresado/${usuario}`)
        .then(response => response.json())
        .then(data =>{
            if(data!= "Json incorrecto"){
            agregarDatos(data)}else{
                alert('por favor volver a realizar login')
            }
        })
    }
    misP.onclick=()=>{
        const usuarioS = sessionStorage.getItem('nameUser');
        sessionStorage.setItem('nameUser',usuarioS);
        window.location.replace("RankimgUser.html");
    }
    editUser2.onclick=()=>{
        let usuario= sessionStorage.getItem('nameUser');
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        fetch(`https://proyecto2-backend-prueba.herokuapp.com/usuarioIngresado/${usuario}`)
        .then(response => response.json())
        .then(data =>{
            if(data!= "Json incorrecto"){
            agregarDatos(data)}else{
                alert('por favor volver a realizar login')
            }
        })
    }
    verP.onclick=()=>{
        const usuarioS = sessionStorage.getItem('nameUser');
        sessionStorage.setItem('nameUser',usuarioS);
        window.location.replace("publicaciones.html");
    }
    crearP.onclick = ()=>{
        let usuario= sessionStorage.getItem('nameUser');
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        fetch(`https://proyecto2-backend-prueba.herokuapp.com/usuarioIngresado/${usuario}`)
        .then(response => response.json())
        .then(data =>{
            if(data!= "Json incorrecto"){
                sessionStorage.setItem('Usuario',JSON.stringify(data));
                window.location.replace("CrearPublicacion.html");
            }else{
                alert('por favor volver a realizar login')
            }
        })
    }
    function agregarDatos(usuario){
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        let nombreU= document.getElementById('nombreE');
        nombreU.value=`${usuario['_Usuario__Nombre']}`
        let usuarioU= document.getElementById('usuarioU');
        usuarioU.value=`${usuario['_Usuario__Usuario']}`;
        let correoU= document.getElementById('correoU');
        correoU.value=`${usuario['_Usuario__Correo']}`;
        let generoU= document.getElementById('generoU');
        generoU.value=`${usuario['_Usuario__Genero']}`;
        let passwordU= document.getElementById('passwordU');
        passwordU.value=`${usuario['_Usuario__Contrasena']}`;
        const btnMod = document.getElementById('Modificar');
        btnMod.onclick=()=>{
            dataE=false
            if(usuarioU.value==usuario['_Usuario__Usuario']){
                dataE=false;
            }else{
                dataE=true;
            }
            datosEnvio={'nombre':nombreU.value,'usuario':usuarioU.value,'genero':generoU.value,'correo':correoU.value,'password':passwordU.value,'keydate':dataE,'usuarioInicial':usuario['_Usuario__Usuario']};
            fetch('https://proyecto2-backend-prueba.herokuapp.com/usuarioM',{
                method:'PUT',
                headers:headers,
                body:JSON.stringify({"usuario":datosEnvio})
            })
            .then(response => response.json())
            .then(data =>{
                if(data.data=="true"){
                newLabel.className+="alert alert-success btn-block mt-2 col-lg-12";
                newLabel.innerHTML="El usuario ingresado Correctamente";
                contenedor.appendChild(newLabel);
                setTimeout(() => {
                    contenedor.removeChild(newLabel);
                }, 3000);
                    sessionStorage.setItem('nameUser',`${usuarioU.value}`);
                }else if(data.data=="false"){
                    newLabel1.className+="alert alert-danger btn-block mt-2 col-lg-12";
                    newLabel1.innerHTML="Usuario ya existe";
                    contenedor.appendChild(newLabel1);
                    setTimeout(() => {
                        contenedor.removeChild(newLabel1);
                    }, 3000);
                }
            })
        }
        myModal.show();
    }
})