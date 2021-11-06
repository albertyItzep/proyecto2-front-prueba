document.addEventListener('DOMContentLoaded',()=>{
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    btn1.onclick = ()=>{
        const contener1 = document.getElementById('contener1');
        html2pdf()
            .set({
                margin: 1,
                filename: 'PublicacionesTop5.pdf',
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
            .from(contener1)
            .save()
            .catch(err => console.log(err));
    }
    btn2.onclick=()=>{
        const contener2 = document.getElementById('contener2');
        html2pdf()
            .set({
                margin: 1,
                filename: 'PublicacionesTop5.pdf',
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
            .from(contener2)
            .save()
            .catch(err => console.log(err));
    }
    fetch('http://localhost:5000/MasLikes')
    .then(response =>response.json())
    .then(data =>{
        datos=data;
        graficaBarras(datos)
    })
    function graficaBarras(arregloPublicacion){
        const objet1 = arregloPublicacion[0];
        const objet2 = arregloPublicacion[1];
        const objet3 = arregloPublicacion[2];
        const objet4 = arregloPublicacion[3];
        const objet5 = arregloPublicacion[4];
        console.log(objet1)
        const grafica1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [`Usuario:${objet1['_Publicacion__User'] }, Tipo: ${objet1['_Publicacion__Type']}`, `Usuario:${objet2['_Publicacion__User'] }, Tipo: ${objet2['_Publicacion__Type']}`, `Usuario:${objet3['_Publicacion__User'] }, Tipo: ${objet3['_Publicacion__Type']}`, `Usuario:${objet4['_Publicacion__User'] }, Tipo: ${objet4['_Publicacion__Type']}`,`Usuario:${objet5['_Publicacion__User'] }, Tipo: ${objet5['_Publicacion__Type']}`],
                datasets: [{
                    label: '# of Likes',
                    data: [objet1['Like'] , objet2['Like'], objet3['Like'], objet4['Like'], objet5['Like']],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        SegundaGrafica();
        }
        function SegundaGrafica(){
            fetch('http://localhost:5000/verestadp')
            .then(response =>response.json())
            .then(data =>{
                agregarGrafica2(data)
                console.log(data)
            })
        }
        function agregarGrafica2(usuarios){
            const objet1 = usuarios[0];
            const objet2 = usuarios[1];
            const objet3 = usuarios[2];
            const objet4 = usuarios[3];
            const objet5 = usuarios[4];

            const data = {
                labels: [
                  `${objet1['_Usuario__Usuario']}`,
                  `${objet2['_Usuario__Usuario']}`,
                  `${objet3['_Usuario__Usuario']}`,
                  `${objet4['_Usuario__Usuario']}`,
                  `${objet5['_Usuario__Usuario']}`
                ],
                datasets: [{
                  label: 'Usuarios',
                  data: [objet1['largoP'] , objet2['largoP'], objet3['largoP'], objet4['largoP'], objet5['largoP']],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                  ],
                  hoverOffset: 4
                }], 
              };
              const config = {
                type: 'doughnut',
                data: data,
              };
              const grafica2 = new Chart(ctx2,config);
        }
})
