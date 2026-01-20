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
    let aciertosTotales = 0;
    const totalItems = items.length;

    items.forEach((item, index) => {
        const valor = Number(document.getElementById(`resp-${index}`).value) || 0;
        if (valor === 1) aciertosTotales++;
    });

    const porcentajeGlobal = ((aciertosTotales / totalItems) * 100).toFixed(1);

    // Mostrar resultado simple en el texto
    const msjComp = document.getElementById("condicionFinal");
    if (msjComp) {
        msjComp.innerText = `Resultado Global: ${aciertosTotales} aciertos de ${totalItems} (${porcentajeGlobal}%)`;
    }

    // Actualizar Tabla de Resultados (con una sola fila)
    const tbodyRes = document.querySelector("#tabla-resultados tbody");
    if (tbodyRes) {
        tbodyRes.innerHTML = `
            <tr>
                <td>Recuerdo Total</td>
                <td>${porcentajeGlobal}%</td>
                <td>${aciertosTotales} de ${totalItems}</td>
            </tr>
        `;
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
