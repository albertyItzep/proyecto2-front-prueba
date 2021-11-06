document.addEventListener('DOMContentLoaded',()=>{
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('GET','POST','OPTIONS','PUT');
    const table = document.getElementById("table");
    let id=1;
    fetch('http://127.0.0.1:5000/obtenerPublicaciones')
    .then(response => response.json())
    .then(data =>{
        cargaPublicaciones(data);
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
    function cargaPublicaciones(usuarios){
        for(let us in usuarios){
            const row = table.insertRow();
            let ob= usuarios[us];
            row.setAttribute('id',id++);
            row.innerHTML=`
            <tr>
            <td>${id-1}</td>
            <td>${ob['_Publicacion__Type']}</td>
            <td>${ob['_Publicacion__Url']}</td>
            <td>${ob['_Publicacion__Category']}</td>
            <td>${ob['_Publicacion__Date']}</td>
            <td>${ob['_Publicacion__User']}</td>
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
    function verUsuarios(id,publicaciones){
        let idU=id-1;
        let objeto="";
        for(let us in publicaciones){
            if(us == idU){
                objeto= publicaciones[us];
                break;
            }
        }
        var myModal = new bootstrap.Modal(document.getElementById('myModal2'));
        const tipoP= document.getElementById('tipoP');
        tipoP.innerHTML =`${objeto['_Publicacion__Type']}`;
        const urlP= document.getElementById('urlP');
        urlP.innerHTML=`${objeto['_Publicacion__Url']}`;
        const categoriaP= document.getElementById('categoriaP');
        categoriaP.innerHTML=`${objeto['_Publicacion__Category']}`;
        const fechaP= document.getElementById('fechaP');
        fechaP.innerHTML=`${objeto['_Publicacion__Date']}`;
        const usuarioP= document.getElementById('usuarioP');
        usuarioP.innerHTML=`${objeto['_Publicacion__User']}`;
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
        let tipoE= document.getElementById('tipoE');
        tipoE.value=`${objeto['_Publicacion__Type']}`
        
        let urlE= document.getElementById('urlE');
        urlE.value=`${objeto['_Publicacion__Url']}`;
        
        let categoriaE= document.getElementById('categoriaE');
        categoriaE.value=`${objeto['_Publicacion__Category']}`;
        
        let fechaE= document.getElementById('fechaE');
        fechaE.value=`${objeto['_Publicacion__Date']}`;

        let usuarioE= document.getElementById('usuarioE');
        usuarioE.value=`${objeto['_Publicacion__User']}`;
        
        const btnMod = document.getElementById('Modificar');
        btnMod.onclick = ()=>{
            const datosEnvio={'type':tipoE.value,'url':urlE.value,'category':categoriaE.value,'date':fechaE.value,'user':usuarioE.value,'datekey':idU};
            fetch('http://127.0.0.1:5000/editarPublicacion',{
                method:'PUT',
                headers:headers,
                body:JSON.stringify({"Publicacion":datosEnvio})
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                vaciarTable();

                myModal.hide();
                cargaPublicaciones(data);
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
            if(us==id1){
                objeto= usuarios[us];
                console.log(objeto);
                validar=true;
                break;
            }
        }
        //proceso de envio de datos borrar
        if(validar == true){
            fetch(`http://127.0.0.1:5000/borrarPublicacion/${id1}/${objeto['_Publicacion__User']}`,{method:'DELETE'})
            .then(respose => respose.json())
            .then(data =>{
                vaciarTable();
                cargaPublicaciones(data);
            })
            }
        }

})