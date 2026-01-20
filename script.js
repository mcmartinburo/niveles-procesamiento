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
    {id:22, objetivo:"lazo"},  
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
            <td><strong>${item.condicion.toUpperCase()}</strong></td>
        `;
        tbody.appendChild(row);
    });
}

function procesar() {
    const resultados = { "rp+": 0, "rp-": 0, "nrp": 0 };
    const totales = { "rp+": 0, "rp-": 0, "nrp": 0 };

    items.forEach((item, index) => {
        const valor = Number(document.getElementById(`resp-${index}`).value) || 0;
        totales[item.condicion]++;
        if (valor === 1) resultados[item.condicion]++;
    });

    const nombresLargo = { 
        "rp+": "Practicados (RP+)",
        "nrp": "No practicados (NRP)",
        "rp-": "No practicados pero Relacionados (RP-)"
    };
    const orden = ["rp+", "nrp", "rp-"];

    const tbodyRes = document.querySelector("#tabla-resultados tbody");
    tbodyRes.innerHTML = "";
    orden.forEach(c => {
        const porc = Math.round((resultados[c] / totales[c]) * 100) || 0;
        tbodyRes.innerHTML += `<tr><td>${nombresLargo[c]}</td><td>${porc}%</td><td>${resultados[c]} de ${totales[c]}</td></tr>`;
    });

   // 1. Calculamos los porcentajes de cada una
const porcentajeNRP = (resultados["nrp"] / totales["nrp"]) * 100 || 0;
const porcentajeRPmin = (resultados["rp-"] / totales["rp-"]) * 100 || 0;

// 2. Calculamos la diferencia
const diferencia = (porcentajeNRP - porcentajeRPmin).toFixed(1);

// 3. Mostramos el mensaje dinámico
let mensajeComparacion = "";
if (porcentajeNRP > porcentajeRPmin) {
    mensajeComparacion = `Efecto RIF detectado: NRP (${porcentajeNRP.toFixed(1)}%) es mayor que RP- (${porcentajeRPmin.toFixed(1)}%) por una diferencia de ${diferencia} puntos.`;
} else if (porcentajeNRP < porcentajeRPmin) {
    mensajeComparacion = `No se observa el efecto esperado: NRP (${porcentajeNRP.toFixed(1)}%) es menor que RP- (${porcentajeRPmin.toFixed(1)}%). Diferencia: ${diferencia} puntos.`;
} else {
    mensajeComparacion = `Ambas condiciones son iguales (${porcentajeNRP.toFixed(1)}%). No hay diferencia detectable.`;
}

// 4. Lo pintamos en el HTML
document.getElementById("condicionFinal").innerText = mensajeComparacion;

    dibujarGrafica(resultados, totales, orden);
}

function dibujarGrafica(res, tot, orden) {
    const ctx = document.getElementById("grafica").getContext("2d");
    if (chart) chart.destroy();

    const datosPorcentaje = orden.map(c => (res[c] / tot[c]) * 100 || 0);

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            // Aseguramos que las etiquetas coincidan con el orden de los datos
            labels: ["Practicados (RP+)", "No Practicados (NRP)", "Relacionados (RP-)"],
            datasets: [{
                data: datosPorcentaje,
                backgroundColor: ["#A8E6CF", "#AEC6EF", "#FF8B94"], // RP+ (Verde), NRP (Azul), RP- (Rojo)
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
                        text: '% de Recuerdo', // AQUÍ ESTÁ EL TÍTULO
                        color: '#2c3e50',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) { return value + "%"; }
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Inicialización
window.onload = renderizarTablaItems;

// Inicialización
window.onload = renderizarTablaItems;
