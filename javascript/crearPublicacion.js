document.addEventListener('DOMContentLoaded',function(){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('GET','POST','OPTIONS'); 

    let newLabel = document.createElement('label');
    let newLabel1 = document.createElement('label');
    let contenedor= document.getElementById('contenedor');

    const TipoNueva = document.getElementById('TipoNueva');
    const urlNueva = document.getElementById('urlNueva');
    const CategoriaNueva = document.getElementById('CategoriaNueva');
    const author = sessionStorage.getItem('nameUser');
    const add = document.getElementById('add');
    add.onclick = ()=>{
        let fecha = new Date();
        alert(author);
        const datosEnvio  = {'type':TipoNueva.value,'url':urlNueva.value,'date':fecha.toLocaleDateString(),'category':CategoriaNueva.value,'author':author} 
        fetch('https://proyecto2-backend-prueba.herokuapp.com/crearPublicacion',{
            method:"POST",
            body:JSON.stringify({"publicacion":datosEnvio}),
            headers:headers
        })
        .then(response => response.json())
        .then(data =>{
            if(data.data=="true"){
                newLabel.className+="alert alert-success btn-block mt-2 col-lg-12";
                newLabel.innerHTML="El Publicacion Agregada Correctamente";
                contenedor.appendChild(newLabel);
                setTimeout(() => {
                    contenedor.removeChild(newLabel);
                }, 3000);
                    sessionStorage.setItem('nameUser',`${usuarioU.value}`);
                }else if(data.data=="false"){
                    newLabel1.className+="alert alert-danger btn-block mt-2 col-lg-12";
                    newLabel1.innerHTML="No se agrego Publicacion";
                    contenedor.appendChild(newLabel1);
                    setTimeout(() => {
                        contenedor.removeChild(newLabel1);
                    }, 3000);
                }
        })
    }
})