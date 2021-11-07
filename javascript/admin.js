document.addEventListener('DOMContentLoaded',()=>{
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('GET','POST','OPTIONS'); 
    const btn1 = document.getElementById('button1');
    const btn2 = document.getElementById('button2');
    const confUs= document.getElementById('confUs');
    const confPub = document.getElementById('confPub');
    const usuariosDiv = document.getElementById('usuariosDiv');
    const graficas =document.getElementById('graficas');
    const publicacionesDiv = document.getElementById('publicacionesDiv');
    const salirbtn = document.getElementById('salir');
    let newLabel = document.createElement('label');
    let newLabel1 = document.createElement('label');
    salirbtn.onclick = ()=>{
        window.location.replace("Inicio.html");
    }
    graficas.onclick=()=>{
        window.location.replace("Graficas.html");
    }
    btn1.onclick = ()=>{
        cargaMasivaUsuarios();
    }
    btn2.onclick = ()=>{
        cargaMasivaPublicaciones();
    }
    confUs.onclick= ()=>{
        window.location.replace("ModificarUsuarios.html");
    }
    confPub.onclick=()=>{
        window.location.replace("ModificarPublicaciones.html");
    }

    // leer archivo y pasarlo a envio de datos
    async function cargaMasivaUsuarios(){
        let archivo = document.getElementById('usuarioU').files[0];
        console.log(archivo);
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            let usuarios = JSON.parse(event.target.result);
            enviarDatosUsuarios(usuarios);
        })
        reader.readAsText(archivo,"UTF-8");

    }
    async function cargaMasivaPublicaciones(){
        let archivo = document.getElementById('publicacioneU').files[0];
        console.log(archivo);
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            let publicaciones = JSON.parse(event.target.result);
            enviarDatosPublicaciones(publicaciones);
        })
        reader.readAsText(archivo,"UTF-8");

    }

    //envio de datos a servidor
    async function enviarDatosUsuarios(jsonEnviar){
        console.log(jsonEnviar);
        const envio = await fetch('https://proyecto2-backend-prueba.herokuapp.com/cargaUsuarios',{
            method:"POST",
            body:JSON.stringify({"usuarios":jsonEnviar}),
            headers:headers
        })
        const response = await envio.json()
         if (response.response=="true"){
            newLabel.className+="alert alert-success btn-block mt-2 col-lg-12";
            newLabel.innerHTML="Cargado Exitosamente";
            usuariosDiv.appendChild(newLabel);
            setTimeout(() => {
                usuariosDiv.removeChild(newLabel);
            }, 5000);
         }else{
            newLabel1.className+="alert alert-danger btn-block mt-2 col-lg-12";
            newLabel1.innerHTML="Errores con Json";
            usuariosDiv.appendChild(newLabel1);
            setTimeout(() => {
                usuariosDiv.removeChild(newLabel1);
            }, 5000);
         }
    }
    
    async function enviarDatosPublicaciones(jsonEnviar){
        console.log(jsonEnviar);
        const envio = await fetch('https://proyecto2-backend-prueba.herokuapp.com/cargaPublicaciones',{
            method:"POST",
            body:JSON.stringify({"publicaciones":jsonEnviar}),
            headers:headers
        })
        const response = await envio.json()
        if(response.response=="true"){
            newLabel.className+="alert alert-success btn-block mt-2 col-lg-12";
            newLabel.innerHTML="Cargado Exitosamente";
            publicacionesDiv.appendChild(newLabel);
            setTimeout(() => {
                publicacionesDiv.removeChild(newLabel);
            }, 5000);
        }else{
            newLabel1.className+="alert alert-danger btn-block mt-2 col-lg-12";
            newLabel1.innerHTML="Errores con Json";
            publicacionesDiv.appendChild(newLabel1);
            setTimeout(() => {
                publicacionesDiv.removeChild(newLabel1);
            }, 5000);
         }
    }
})