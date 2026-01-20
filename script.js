const items = [
    {id:1, objetivo:"regadera"},
    {id:2, objetivo:"jirafa"},
    {id:3, objetivo:"elefante"},
    {id:4, objetivo:"saxofón"},
    {id:5, objetivo:"cuchillo"},
    {id:6, objetivo:"maleta"},
    {id:7, objetivo:"zapatillas"},
    {id:8, objetivo:"perro"},
    {id:9, objetivo:"casa de madera"},
    {id:10, objetivo:"camión"},
    {id:11, objetivo:"flores amarillas"},
    {id:12, objetivo:"estatua"},
    {id:13, objetivo:"coche"},
    {id:14, objetivo:"gato"},
    {id:15, objetivo:"peluche"},
    {id:16, objetivo:"cofre"},
    {id:17, objetivo:"tenedor"},
    {id:18, objetivo:"botella"},
    {id:19, objetivo:"mariposa"},
    {id:20, objetivo:"motorista"},
    {id:21, objetivo:"cañón"},
    {id:22, objetivo:"lazo"}
];

let chart = null;

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

function procesar() {
    // 1. Obtener los valores de los tres estudiantes/condiciones
    const c1 = parseFloat(document.getElementById("cond1").value) || 0;
    const c2 = parseFloat(document.getElementById("cond2").value) || 0;
    const c3 = parseFloat(document.getElementById("cond3").value) || 0;

    // 2. Actualizar el mensaje de texto (opcional)
    const msj = document.getElementById("condicionFinal");
    if (msj) {
        msj.innerText = `Resultados: C1 (${c1}%), C2 (${c2}%), C3 (${c3}%)`;
    }

    // 3. Quitar mensaje de espera
    const espera = document.getElementById("mensaje-espera");
    if (espera) espera.style.display = "none";

    // 4. Dibujar la gráfica con estos 3 datos
    dibujarGraficaGrupo(c1, c2, c3);
}

function dibujarGraficaGrupo(c1, c2, c3) {
    const ctx = document.getElementById("grafica").getContext("2d");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Condición 1", "Condición 2", "Condición 3"],
            datasets: [{
                label: "% de Recuerdo",
                data: [c1, c2, c3],
                backgroundColor: ["#A8E6CF", "#AEC6EF", "#FF8B94"], // Pastel: Verde, Azul, Rosa
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
                    title: { display: true, text: '% de Recuerdo' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

    // Opcional: Dibujar una gráfica de una sola barra
    dibujarGraficaSimple(porcentajeGlobal);
}

function dibujarGraficaSimple(porcentaje) {
    const ctx = document.getElementById("grafica").getContext("2d");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Recuerdo Total"],
            datasets: [{
                label: "% de Recuerdo",
                data: [porcentaje],
                backgroundColor: ["#AEC6EF"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: '%' } }
            }
        }
    });
}

window.onload = renderizarTablaItems;
