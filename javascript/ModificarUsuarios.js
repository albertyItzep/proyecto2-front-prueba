document.addEventListener('DOMContentLoaded',()=>{
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('GET','POST','OPTIONS','PUT');
    const table = document.getElementById("table");
    let id=1;
    fetch('https://proyecto2-backend-prueba.herokuapp.com/obtenerUsuarios')
    .then(response => response.json())
    .then(data =>{
        cargaUsuarios(data);

    })
    const $boton = document.getElementById('exportarPDF');
    $boton.addEventListener("click", () => {
        const $datoCaptura = document.getElementById("captura");
        html2pdf()
            .set({
                margin: 1,
                filename: 'Usuarios.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 4,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "cm",
                    format: "a3",
                    orientation: 'landscape'
                }
            })
            .from($datoCaptura)
            .save()
            .catch(err => console.log(err));
    });
    function cargaUsuarios(usuarios){
        for(let us in usuarios){
            const row = table.insertRow();
            let ob= usuarios[us];
            row.setAttribute('id',id++);
            row.innerHTML=`
            <tr>
            <td>${id-1}</td>
            <td>${ob['_Usuario__Nombre']}</td>
            <td>${ob['_Usuario__Genero']}</td>
            <td>${ob['_Usuario__Correo']}</td>
            <td>${ob['_Usuario__Usuario']}</td>
            <td>${ob['_Usuario__Contrasena']}</td>
            <td></td>
            </tr>
            `;
            //boton visualizar
            const btnVisualizar = document.createElement('button');
            btnVisualizar.classList.add('btn','btn-secondary','mb-1');
            btnVisualizar.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
            btnVisualizar.setAttribute('data-toggle', 'modal');
            btnVisualizar.setAttribute('data-target', '#modal');
            btnVisualizar.onclick=(e)=>{
                verUsuarios(row.getAttribute('id'),usuarios);
            }
            row.children[6].appendChild(btnVisualizar);
            //boton editar
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn','btn-primary','mb-1','ml-1');
            btnEdit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
            btnEdit.setAttribute('data-toggle', 'modal');
            btnEdit.setAttribute('data-target', '#modal');
            btnEdit.setAttribute('href', '#Emer1');
            btnEdit.onclick=(e)=>{
                editarUsuario(row.getAttribute('id'),usuarios);
            }
            row.children[6].appendChild(btnEdit);
            //boton borrar
            const btnVDelet = document.createElement('button');
            btnVDelet.classList.add('btn','btn-danger','mb-1','ml-1');
            btnVDelet.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            btnVDelet.setAttribute('data-toggle', 'modal');
            btnVDelet.setAttribute('data-target', '#modal');
            btnVDelet.onclick= (e)=>{
                removerUsuario(row.getAttribute('id'),usuarios);
            }
            row.children[6].appendChild(btnVDelet);
        }
    }
    //funcion visualizar usuarios
    function verUsuarios(id,usuarios){
        let idU=id-1;
        let objeto="";
        for(let us in usuarios){
            if(us == idU){
                objeto= usuarios[us];
                break;
            }
        }
        var myModal = new bootstrap.Modal(document.getElementById('myModal2'));
        const nombreV= document.getElementById('nombreV');
        nombreV.innerHTML =`${objeto['_Usuario__Nombre']}`;
        const usuarioV= document.getElementById('usuarioV');
        usuarioV.innerHTML=`${objeto['_Usuario__Usuario']}`;
        const CorreoV= document.getElementById('CorreoV');
        CorreoV.innerHTML=`${objeto['_Usuario__Correo']}`;
        const generoV= document.getElementById('generoV');
        generoV.innerHTML=`${objeto['_Usuario__Genero']}`;
        const contranaV= document.getElementById('contranaV');
        contranaV.innerHTML=`${objeto['_Usuario__Contrasena']}`;
        myModal.show();
    }
    //funcion para editar
    function editarUsuario(id,usuarios){
        let idU=id-1;
        let objeto="";
        for(let us in usuarios){
            if(us == idU){
                objeto= usuarios[us];
                break;
            }
        }
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        let nombreU= document.getElementById('nombreE');
        nombreU.value=`${objeto['_Usuario__Nombre']}`
        
        let usuarioU= document.getElementById('usuarioU');
        usuarioU.value=`${objeto['_Usuario__Usuario']}`;
        
        let correoU= document.getElementById('correoU');
        correoU.value=`${objeto['_Usuario__Correo']}`;
        
        let generoU= document.getElementById('generoU');
        generoU.value=`${objeto['_Usuario__Genero']}`;
        
        let passwordU= document.getElementById('passwordU');
        passwordU.value=`${objeto['_Usuario__Contrasena']}`;
        
        const btnMod = document.getElementById('Modificar');
        btnMod.onclick = ()=>{
            const datosEnvio={'nombre':nombreU.value,'usuario':usuarioU.value,'genero':generoU.value,'correo':correoU.value,'password':passwordU.value,'datos':objeto['_Usuario__Usuario']};
            fetch('https://proyecto2-backend-prueba.herokuapp.com/editarUsuario',{
                method:'PUT',
                headers:headers,
                body:JSON.stringify({"Usuario":datosEnvio})
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                vaciarTable();

                myModal.hide();
                cargaUsuarios(data);
            })
        }
        myModal.show();
    }
    //funcion para recargar la pagina
    function vaciarTable(){
        table.innerHTML="";
        id=1;
    }
    //funcion para remover usuario
    function removerUsuario(id,usuarios){
        id1= id-1
        let objeto="";
        let validar=false;
        for(let us in usuarios){
            if(us==id1 && us!=0){
                objeto= usuarios[us];
                console.log(objeto);
                validar=true;
                break;
            }else if(us==id1 && us==0){
                alert('El usuario No puede Eliminarse Es administrador');
            }
        }
        //proceso de envio de datos borrar
        if(validar == true){
            fetch(`https://proyecto2-backend-prueba.herokuapp.com/borrarUsuario/${objeto['_Usuario__Usuario']}`,{method:'DELETE'})
            .then(respose => respose.json())
            .then(data =>{
                vaciarTable();
                cargaUsuarios(data);
            })
            }
        }

})