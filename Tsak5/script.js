let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  const list = document.getElementById("list");
  const balance = document.getElementById("balance");
  list.innerHTML = "";

  let total = 0;
  const categoryTotals = {};

  transactions.forEach((tx, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${tx.desc} - ₹${tx.amount} (${tx.type}) 
      <button onclick="deleteTransaction(${index})">❌</button>`;
    list.appendChild(li);

    if (tx.type === "income") {
      total += tx.amount;
    } else {
      total -= tx.amount;
      categoryTotals[tx.desc] = (categoryTotals[tx.desc] || 0) + tx.amount;
    }
  });

  balance.innerText = total;

  updateChart(categoryTotals);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount)) {
    alert("Please enter valid description and amount");
    return;
  }

  transactions.push({ desc, amount, type });
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

let chart;
function updateChart(categoryTotals) {
  const ctx = document.getElementById("expenseChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: "Expenses",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

updateUI();
