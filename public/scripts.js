document.getElementById("imcForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
  
    const response = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, weight, height }),
    });
  
    if (response.ok) {
      alert("IMC calculado com sucesso!");
      loadHistory();
    } else {
      alert("Erro ao calcular o IMC.");
    }
  });
  
  // Carregar histórico ao carregar a página
  async function loadHistory() {
    const response = await fetch("/api/history");
    const history = await response.json();
  
    const tableBody = document.getElementById("historyTable");
    tableBody.innerHTML = "";
  
    history.forEach((record) => {
      const row = `<tr>
        <td>${record.name}</td>
        <td>${record.weight} kg</td>
        <td>${record.height} m</td>
        <td>${record.imc}</td>
        <td>${new Date(record.date).toLocaleString()}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  loadHistory();
  