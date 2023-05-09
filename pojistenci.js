'use strict';

const tbody = document.querySelector("tbody");
const pojistenci = [];

window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("pojistenci"));
    if (data) {
        data.forEach((pojisteny) => {
            renderTableRow(pojisteny);
            pojistenci.push(pojisteny);
        });
    }
});

function renderTableRow(pojisteny) {
    const tr = document.createElement("tr");
    const tdJmenoPrijmeni = document.createElement("td");
    const jmenoPrijmeniSpan = document.createElement("span");
    const tdVek = document.createElement("td");
    const tdTelefon = document.createElement("td");
    const tdCisloPojistence = document.createElement("td");
    const tdEditovat = document.createElement("td");

    jmenoPrijmeniSpan.innerText = `${pojisteny.jmeno} ${pojisteny.prijmeni}`;
    tdJmenoPrijmeni.appendChild(jmenoPrijmeniSpan);

    tdVek.innerText = pojisteny.vek;

    tdTelefon.innerText = pojisteny.telefon;

    tdCisloPojistence.innerText = generatePojistenyCislo();


    const editovatBtn = document.createElement("button");
    editovatBtn.classList.add("editovat-btn");
    editovatBtn.innerText = "Editovat";
    editovatBtn.addEventListener("click", () => {
    let opravovanaPolozka;
        do {
            opravovanaPolozka = prompt("Zadejte jméno opravované položky:");
            if (opravovanaPolozka) {
                const newValue = prompt("Zadejte novou hodnotu:");
                if (newValue) {
                    const lowerCasePolozka = opravovanaPolozka.toLowerCase();
                    const index = ["jmeno", "prijmeni", "telefon", "vek"].indexOf(lowerCasePolozka);
                    if (index >= 0) {
                        if (lowerCasePolozka === "jmeno" || lowerCasePolozka === "prijmeni") {
                            pojisteny[lowerCasePolozka] = newValue.charAt(0).toUpperCase() + newValue.slice(1);
                            jmenoPrijmeniSpan.textContent = `${pojisteny.jmeno} ${pojisteny.prijmeni}`;
                        } else {
                            pojisteny[lowerCasePolozka] = newValue;
                            tr.cells[index].textContent = newValue;
                        }
                        localStorage.setItem("pojistenci", JSON.stringify(pojistenci));
                        } else {
                        alert("Zadaná položka neexistuje");
                        }
                }
            }
        } while (opravovanaPolozka && confirm("Přejete si editovat další údaj?"));
    });


    const smazatBtn = document.createElement("button");
        smazatBtn.classList.add("smazat-btn");
        smazatBtn.innerText = "Smazat";
        smazatBtn.addEventListener("click", () => {
    const index = pojistenci.indexOf(pojisteny);
        if (index !== -1) {
            pojistenci.splice(index, 1);
            localStorage.setItem("pojistenci", JSON.stringify(pojistenci));
            tr.remove();
        if (pojistenci.length <= 10) {
            const pojistenciTable = document.querySelector("tbody");
                pojistenciTable.innerHTML = "";
                pojistenci.forEach((pojisteny) => {
                renderTableRow(pojisteny);
                });
        } else {
            location.href = "index.html";
        }
    }
    });

    tr.appendChild(tdJmenoPrijmeni);
    tr.appendChild(tdTelefon);
    tr.appendChild(tdCisloPojistence);
    tdEditovat.appendChild(editovatBtn);
    tdEditovat.appendChild(smazatBtn);
    tr.appendChild(tdEditovat);

    tbody.appendChild(tr);
};

function generatePojistenyCislo() {
    let cislo = "";
    const mozneZnaky = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
        cislo += mozneZnaky.charAt(Math.floor(Math.random() * mozneZnaky.length));
    }
    return cislo;
}
    
function addNewPojisteny(e) {
    e.preventDefault();
    const jmenoInput = document.querySelector("#jmeno");
    const prijmeniInput = document.querySelector("#prijmeni");
    const telefonInput = document.querySelector("#telefon");
    const vekInput = document.querySelector("#vek");
    const jmeno = jmenoInput.value.trim();
    const prijmeni = prijmeniInput.value.trim();
    const telefon = telefonInput.value.trim();
    const vek = vekInput.value.trim();

    if (!jmeno || !prijmeni || !telefon || !vek) {
        alert("Vyplňte prosím všechny údaje");
    return;
    }

    const cisloPojistence = generatePojistenyCislo();
    const pojisteny = {
        cisloPojistence: cisloPojistence,
        jmeno: jmeno,
        prijmeni: prijmeni,
        telefon: telefon,
        vek: vek
    };

    pojistenci.push(pojisteny);
    renderTableRow(pojisteny);

    jmenoInput.value = "";
    prijmeniInput.value = "";
    telefonInput.value = "";
    vekInput.value = "";

    localStorage.setItem("pojistenci", JSON.stringify(pojistenci));
}

const form = document.querySelector("form");
form.addEventListener("submit", addNewPojisteny);

console.log(localStorage.getItem("pojistenci"));
