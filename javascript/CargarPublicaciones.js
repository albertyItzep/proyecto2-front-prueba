document.addEventListener('DOMContentLoaded',()=>{
    const usuario = sessionStorage.getItem('nameUser');
    const table = document.getElementById('table');
    let id=0
    let valorL=[0,1]
    sessionStorage.setItem('nameUser',usuario);

    fetch('https://proyecto2-backend-prueba.herokuapp.com/MasLikes')
    .then(response => response.json())
    .then(data =>{
        console.log(data)  
        agregarImages(data)  
    })
    function Ranking(){
        
    }
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

                const btnVisualizar = document.createElement('button');
                btnVisualizar.classList.add('btn','btn-primary','mb-1');
                btnVisualizar.innerHTML = '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
                btnVisualizar.setAttribute('data-toggle', 'modal');
                btnVisualizar.setAttribute('data-target', '#modal');
                btnVisualizar.onclick=(e)=>{
                    const idI = row.getAttribute('id');
                    fetch(`https://proyecto2-backend-prueba.herokuapp.com/like/${idI}`)
                    .then(response => response.json())
                    .then(data => {
                        objeto = data.data;
                        likes.innerHTML=`${objeto['Like']}`;                    })
                }
                row.children[0].children[2].appendChild(btnVisualizar);
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

                const btnVisualizar = document.createElement('button');
                btnVisualizar.classList.add('btn','btn-primary','mb-1');
                btnVisualizar.innerHTML = '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
                btnVisualizar.setAttribute('data-toggle', 'modal');
                btnVisualizar.setAttribute('data-target', '#modal');
                btnVisualizar.onclick=(e)=>{
                        const idI = row.getAttribute('id');
                        valorL.add(idI);
                        console.log(valorL);
                        fetch(`https://proyecto2-backend-prueba.herokuapp.com/like/${idI}`)
                        .then(response => response.json())
                        .then(data => {
                            objeto = data.data;
                            console.log(objeto);
                            likes.innerHTML=`${objeto['Like']}`;
                            objeto['Like']
                        })
                }
                row.children[0].children[2].appendChild(btnVisualizar);
                row.children[0].children[2].appendChild(likes);
            }
        }
    }

})