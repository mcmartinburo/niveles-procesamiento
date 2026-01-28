const items = [
    {id:1, objetivo:"guitarra"}, {id:2, objetivo:"elefante"}, {id:3, objetivo:"planta"},
    {id:4, objetivo:"chancla"}, {id:5, objetivo:"futbolín"}, {id:6, objetivo:"gorila"},
    {id:7, objetivo:"sombrero"}, {id:8, objetivo:"conejo"}, {id:9, objetivo:"limón"},
    {id:10, objetivo:"león"}, {id:11, objetivo:"medalla"}, {id:12, objetivo:"mariposa"},
    {id:13, objetivo:"juguete (mr.potato)"}, {id:14, objetivo:"silla"}, {id:15, objetivo:"pimiento"},
    {id:16, objetivo:"cerdo"}, {id:17, objetivo:"fichas de póker"}, {id:18, objetivo:"radiador"},
    {id:19, objetivo:"camisa"}, {id:20, objetivo:"zapatilla"}, {id:21, objetivo:"peluche"},
    {id:22, objetivo:"pandereta"}
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
                    title: { 
                        display: true, 
                        text: '% de Recuerdo', 
                        font: { weight: 'bold' } 
                    },
                    ticks: { callback: v => v + "%" }
                }
            },
            plugins: { 
                legend: { 
                    display: false // LEYENDA ELIMINADA
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
