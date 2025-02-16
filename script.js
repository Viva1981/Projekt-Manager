document.addEventListener("DOMContentLoaded", function() {
    gapi.load('client', init);

    function init() {
        gapi.client.init({
            apiKey: 'AIzaSyBCqmOG3VAy21KJ0C8UV-Buh3Orc1-igKI',
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
        }).then(function() {
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1f57-NuPxwdwVKAKr7D4-IuIOrxh9l_TBxh6yDu4u3To',
                range: 'A1:Z100'
            });
        }).then(function(response) {
            const data = response.result.values;
            if (!data || data.length === 0) {
                document.querySelector('.loading').textContent = "⚠️ Nincsenek adatok!";
                return;
            }

            const tableHeader = document.getElementById("table-header");
            const tableBody = document.getElementById("table-body");
            const loadingText = document.querySelector(".loading");
            const table = document.getElementById("data-table");

            loadingText.style.display = "none";
            table.style.display = "table";

            tableHeader.innerHTML = "";
            data[0].forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                tableHeader.appendChild(th);
            });

            tableBody.innerHTML = "";
            data.slice(1).forEach((row, index) => {
                const tr = document.createElement("tr");

                // Első sor stílusának beállítása
                if (index === 0) {
                    tr.classList.add('header-row-1');
                }

                // "Egyéb Projekt" és "Menü" sorok stílusának beállítása
                if (row[0] === "Egyéb Projekt" || row[0] === "Menü") {
                    tr.classList.add('main-category-row');
                }

                row.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        }).catch(function(error) {
            console.error("Hiba:", error);
            document.querySelector('.loading').textContent = "❌ Hiba történt!";
        });

        loadSheetData();
        setInterval(loadSheetData, 30000); 
    }

    function loadSheetData() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1f57-NuPxwdwVKAKr7D4-IuIOrxh9l_TBxh6yDu4u3To',
            range: 'A1:Z100'
        }).then(function(response) {
            const data = response.result.values;
            if (!data || data.length === 0) {
                document.querySelector('.loading').textContent = "⚠️ Nincsenek adatok!";
                return;
            }

            const tableHeader = document.getElementById("table-header");
            const tableBody = document.getElementById("table-body");
            const loadingText = document.querySelector(".loading");
            const table = document.getElementById("data-table");

            loadingText.style.display = "none";
            table.style.display = "table";

            tableHeader.innerHTML = "";
            data[0].forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                tableHeader.appendChild(th);
            });

            tableBody.innerHTML = "";
            data.slice(1).forEach((row, index) => {
                const tr = document.createElement("tr");

                // Első sor stílusának beállítása
                if (index === 0) {
                    tr.classList.add('header-row-1');
                }

                // "Egyéb Projekt" és "Menü" sorok stílusának beállítása
                if (row[0] === "Egyéb Projekt" || row[0] === "Menü") {
                    tr.classList.add('main-category-row');
                }

                row.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        }).catch(function(error) {
            console.error("Hiba:", error);
            document.querySelector('.loading').textContent = "❌ Hiba történt!";
        });
    }
});
