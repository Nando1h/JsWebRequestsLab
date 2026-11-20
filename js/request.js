// === Variables globales ===
let data = { json: [] };

const tbody      = document.getElementById("tableBodyData");
const btnRemove  = document.getElementById("btnRemove");
const btnLoad    = document.getElementById("btnLoad");
const btnSearch  = document.getElementById("btnSearch");
const inputSearch = document.getElementById("inputSearch");

const requestUrl = "https://fakestoreapi.com/products";

// === Botón Remove Data ===
btnRemove.addEventListener("click", function (e) {
    tbody.innerHTML = "";
});

// === Consumir API ===
function getData(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.error("Error HTTP:", xhr.status);
            return;
        }
        const array = JSON.parse(xhr.responseText);
        data.json = array;

        // Recorrer y pintar la tabla
        array.forEach(element => {
            tbody.append(genTr(element));
        });
    };

    xhr.send();
}

// === Crear fila <tr> a partir de un producto ===
function genTr(json) {
    const tr  = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.innerText = json.id;
    td2.innerText = json.title;
    td3.innerText = json.price;
    td4.innerText = json.description;
    td5.innerText = json.category;

    tr.append(td1, td2, td3, td4, td5);
    return tr;
}

// === Botón Load Data ===
btnLoad.addEventListener("click", function () {
    tbody.innerHTML = "";              // limpia antes de volver a cargar
    getData(requestUrl);
});

// === Botón Search (filtro) ===
btnSearch.addEventListener("click", function () {
    // 1) Filtrar por título (case-insensitive)
    const filtered = data.json.filter(e =>
        e.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );

    // 2) Vaciar la tabla
    tbody.innerHTML = "";

    // 3) Rellenar con los resultados
    filtered.forEach(element => {
        tbody.append(genTr(element));
    });
});