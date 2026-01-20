const items = [
    {id:1, objetivo:"regadera"}, {id:2, objetivo:"jirafa"}, {id:3, objetivo:"elefante"},
    {id:4, objetivo:"saxofón"}, {id:5, objetivo:"cuchillo"}, {id:6, objetivo:"maleta"},
    {id:7, objetivo:"zapatillas"}, {id:8, objetivo:"perro"}, {id:9, objetivo:"casa de madera"},
    {id:10, objetivo:"camión"}, {id:11, objetivo:"flores amarillas"}, {id:12, objetivo:"estatua"},
    {id:13, objetivo:"coche"}, {id:14, objetivo:"gato"}, {id:15, objetivo:"peluche"},
    {id:16, objetivo:"cofre"}, {id:17, objetivo:"tenedor"}, {id:18, objetivo:"botella"},
    {id:19, objetivo:"mariposa"}, {id:20, objetivo:"motorista"}, {id:21, objetivo:"cañón"},
    {id:22, objetivo:"lazo"}
];

let chart = null;

// 1. Dibuja la tabla de 22 ítems al cargar la página
function renderizarTablaItems() {
    const tbody = document.getElementById("tabla-items");
    if (!tbody) return;
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.objetivo}</td>
            <td><input type="number" min="0" max="1" id="resp-${index}" value="0"></td>
        `;
        tbody.appendChild(row);
    });
}

// 2. Calcula el rendimiento individual (Botón de arriba)
function procesarIndividual() {
    let aciertos = 0;
    const total = items.length;

    items.forEach((item, index) => {
        const valor = Number(document.getElementById(`resp-${index}`).value) || 0;
        if (valor === 1) aciertos++;
    });

    const porcentaje = ((aciertos / total) * 100).toFixed(1);

    // Rellenar la tabla de resumen
    const tbodyRes = document.querySelector("#tabla-resultados tbody");
    tbodyRes.innerHTML = `
        <tr>
            <td>Total Individual</td>
            <td>${porcentaje}%</td>
            <td>${aciertos} de ${total}</td>
        </tr>
    `;

    document.getElementById("condicionFinal").innerText = `Tu rendimiento individual es del ${porcentaje}%`;
}

// 3. Genera la gráfica comparativa (Botón de abajo)
function procesarGrupo() {
    const v1 = parseFloat(document.getElementById("dato1").value) || 0;
    const v2 = parseFloat(document.getElementById("dato2").value) || 0;
    const v3 = parseFloat(document.getElementById("dato3").value) || 0;

    const msj = document.getElementById("condicionFinal");
    msj.innerText = `Comparativa: C1 (${v1}%) | C2 (${v2}%) | C3 (${v3}%)`;

    const ctx = document.getElementById("grafica").getContext("2d");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            // CAMBIO: Ahora las etiquetas del eje X son Condiciones
            labels: ["Condición 1", "Condición 2", "Condición 3"],
            datasets: [{
                data: [v1, v2, v3],
                backgroundColor: ["#A8E6CF", "#AEC6EF", "#FF8B94"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true, 
                    max: 100,
                    title: { display: true, text: '% de Recuerdo', font: { weight: 'bold' } },
                    ticks: { callback: v => v + "%" }
                }
            },
            plugins: { 
                legend: { 
                    display: true,
                    position: 'right', // Leyenda a la derecha
                    labels: {
                        generateLabels: (chart) => {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: label,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].backgroundColor[i],
                                lineWidth: 0,
                                index: i
                            }));
                        }
                    }
                } 
            }
        }
    });
}

// Inicialización
function renderizarTablaItems() {
    console.log("Cargando tabla..."); // Esto te confirmará en la consola que la función corre
    const tbody = document.getElementById("tabla-items");
    
    if (!tbody) {
        console.error("No se encontró el elemento 'tabla-items'");
        return;
    }

    tbody.innerHTML = ""; // Limpia la tabla
    
    items.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.objetivo}</td>
            <td><input type="number" min="0" max="1" id="resp-${index}" value="0" class="input-acierto"></td>
        `;
        tbody.appendChild(row);
    });
    console.log("Tabla cargada con " + items.length + " ítems.");
}

// Inicialización segura
window.addEventListener("DOMContentLoaded", renderizarTablaItems);
