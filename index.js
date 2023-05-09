'use strict'
const tbody = document.querySelector("tbody");
const pojistenci = [];
const maxRows = 10;

window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("pojistenci"));
    if (data) {
        data.forEach((pojisteny) => {
            pojistenci.push(pojisteny);
            renderTableRow(pojisteny);
        });
    }
});

function renderTable() {
    tbody.innerHTML = "";
    pojistenci.forEach((pojisteny) => {
        renderTableRow(pojisteny);
    });
    
}


function renderTableRow(pojisteny) {
    const tr = document.createElement("tr");

    const tdJmeno = document.createElement("td");
    tdJmeno.innerText = pojisteny.jmeno;

    const tdPrijmeni = document.createElement("td");
    tdPrijmeni.innerText = pojisteny.prijmeni;

    const tdTelefon = document.createElement("td");
    tdTelefon.innerText = pojisteny.telefon;

    const tdVek = document.createElement("td");
    tdVek.innerText = pojisteny.vek;

    const tdCisloPojistence = document.createElement("td");
    tdCisloPojistence.innerText = pojisteny.cisloPojistence;

    const tdEditovat = document.createElement("td");
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
                        pojisteny[lowerCasePolozka] = newValue.charAt(0).toUpperCase() + newValue.slice(1);
                        tr.cells[index].textContent = pojisteny[lowerCasePolozka];
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
        }
        renderTable();
    });
    if (pojistenci.length > maxRows) {
        tbody.removeChild(tbody.firstChild);
    }


    tdEditovat.appendChild(editovatBtn);
    tdEditovat.appendChild(smazatBtn);

    tr.appendChild(tdJmeno);
    tr.appendChild(tdPrijmeni);
    tr.appendChild(tdTelefon);
    tr.appendChild(tdVek);
    tr.appendChild(tdEditovat);

    tbody.appendChild(tr);
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
    
    const pojisteny = {
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







