document.addEventListener('DOMContentLoaded',function(){
    //agregando validaciones de cors para que no valgamos madres

    const btn = document.getElementById('button1');
    let usuario = document.getElementById("usuarioU");
    let password = document.getElementById("passwrodU");
    let newLabel = document.createElement('label');
    let newLabel1 = document.createElement('label');
    const divUser = document.getElementById('divUser');
    const divContrana = document.getElementById('divContrana');
    btn.onclick =function(){    
        let pass1= password.value.replace('#','~');
        console.log(pass1);
        fetch(`http://127.0.0.1:5000/inicio/${usuario.value}/${pass1}`)
        .then(response => response.json())
        .then(data=>{
           if(data.data=="false"){
                newLabel.className+="alert alert-danger btn-block mt-2 col-lg-12";
                newLabel.innerHTML="Usuario Incorrecto";
                divUser.appendChild(newLabel);
            setTimeout(() => {
                divUser.removeChild(newLabel);
            }, 1500);
           }else if(data.data =="admin"){
                window.location.replace("Admin.html");
            }else if(data.data =="contrasena incorrecta"){
                newLabel.className+="alert alert-danger btn-block mt-2 col-lg-12";
                newLabel.innerHTML="Contraseña Incorrecta";
                divContrana.appendChild(newLabel);
            setTimeout(() => {
                divContrana.removeChild(newLabel);
            }, 1500);
           }else if(data.data=="true"){
            sessionStorage.setItem('nameUser',`${usuario.value}`);
            window.location.replace("usuarioInicio.html");
           }
        })

    }
})