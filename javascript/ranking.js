document.addEventListener('DOMContentLoaded',()=>{
    const usuarioS = sessionStorage.getItem('nameUser');
    const table = document.getElementById('table');
    const table1 = document.getElementById('table1');
    const btn1 = document.getElementById('v-pills-profile-tab');
    let id2=0;
    const usuario= "pedrito123";
    let id =0;
    fetch(`https://proyecto2-backend-prueba.herokuapp.com/MasLikes`)
    .then(response => response.json())
    .then(data =>{
        cargaUsuarios(data);
        console.log(data)
    })
    function cargaUsuarios(usuarios){
        for(let us in usuarios){
            for (let x in publicaciones){
                let row = table.insertRow();
                let ob= publicaciones[x];
                if(ob['_Publicacion__Type']=="Imagen"){
                    row.setAttribute('id',id++);
                    row.innerHTML=`
                        <div class="card" style="width: 40rem;">
                        <div style="display: flex;justify-content: center;">
                        <img src="${ob['_Publicacion__Url']}" class="img-fluid img-thumbnail mt-10" alt="imagen123">
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">${ob['_Publicacion__Category']}</h5>
                          <p class="card-text text-muted">Por ${ob['_Publicacion__User']} Fecha ${ob['_Publicacion__Date']}</p>
                        </div>
                        <div class="card-body" style="display:flex; flex-direction: row;">
                        </div>
                        </div>
                    `
                    const likes= document.createElement('h5');
                    likes.style.marginTop='1%';
                    likes.style.marginLeft='1%';
                    likes.innerHTML=`${ob['Like']}`
                    row.children[0].children[2].appendChild(likes);
    
                }else{
                    row.setAttribute('id',id++);
                    row.innerHTML=`
                    <div class="card" style="width: 40rem;">
                        <div style="display: flex;justify-content: center;">
                        <iframe width="560" height="315" src="${ob['_Publicacion__Url']}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>    
                        <div class="card-body">
                        <h5 class="card-title">${ob['_Publicacion__Category']}</h5>
                        <p class="card-text text-muted">Fecha ${ob['_Publicacion__Date']}</p>
                        </div>
                        <div class="card-body" style="display:flex; flex-direction: row;">
                        </div>
                        </div>
                    `
                    const likes= document.createElement('h5');
                    likes.style.marginTop='1%';
                    likes.style.marginLeft='1%';
                    likes.innerHTML=`${ob['Like']}`
                    row.children[0].children[2].appendChild(likes);
                }
            }
        }
    }
    btn1.addEventListener('click',()=>{
        dos()
    })
    function dos(){
    fetch(`https://proyecto2-backend-prueba.herokuapp.com/graficsR/${usuarioS}`)
    .then(response => response.json())
    .then(data =>{
        let arrPublicaciones= data;
        agregarImages(arrPublicaciones)
    })}
    function agregarImages(publicaciones){
        for (let x in publicaciones){
            let row = table.insertRow();
            let ob= publicaciones[x];
            if(ob['_Publicacion__Type']=="Imagen"){
                row.setAttribute('id',id++);
                row.innerHTML=`
                    <div class="card" style="width: 40rem;">
                    <div style="display: flex;justify-content: center;">
                    <img src="${ob['_Publicacion__Url']}" class="img-fluid img-thumbnail mt-10" alt="imagen123">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${ob['_Publicacion__Category']}</h5>
                      <p class="card-text text-muted">Por ${ob['_Publicacion__User']} Fecha ${ob['_Publicacion__Date']}</p>
                    </div>
                    <div class="card-body" style="display:flex; flex-direction: row;">
                    </div>
                    </div>
                `
                const likes= document.createElement('h5');
                likes.style.marginTop='1%';
                likes.style.marginLeft='1%';
                likes.innerHTML=`${ob['Like']}`
                row.children[0].children[2].appendChild(likes);

            }else{
                row.setAttribute('id',id++);
                row.innerHTML=`
                <div class="card" style="width: 40rem;">
                    <div style="display: flex;justify-content: center;">
                    <iframe width="560" height="315" src="${ob['_Publicacion__Url']}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>    
                    <div class="card-body">
                    <h5 class="card-title">${ob['_Publicacion__Category']}</h5>
                    <p class="card-text text-muted">Fecha ${ob['_Publicacion__Date']}</p>
                    </div>
                    <div class="card-body" style="display:flex; flex-direction: row;">
                    </div>
                    </div>
                `
                const likes= document.createElement('h5');
                likes.style.marginTop='1%';
                likes.style.marginLeft='1%';
                likes.innerHTML=`${ob['Like']}`
                row.children[0].children[2].appendChild(likes);
            }
        }
    }
})