/* bot.js */
document.addEventListener("DOMContentLoaded", function(){
  const recordBtn = document.getElementById("recordBtn");
  
  recordBtn.addEventListener("click", function(){
    fetch("record.json")
      .then(response => response.json())
      .then(data => {
        // Ordina i record in ordine decrescente in base al punteggio
        data.sort((a, b) => b.score - a.score);
        
        const tbody = document.getElementById("recordTable").querySelector("tbody");
        tbody.innerHTML = "";
        if(data.length === 0){
          tbody.innerHTML = "<tr><td colspan='4' class='text-center'>Nessun record disponibile.</td></tr>";
        } else {
          data.forEach(record => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${record.name}</td>
                            <td>${record.datetime}</td>
                            <td>${record.level}</td>
                            <td>${record.score}</td>`;
            tbody.appendChild(tr);
          });
        }
        $('#recordModal').modal('show');
      })
      .catch(error => console.error("Errore nel caricamento dei record:", error));
  });
});
