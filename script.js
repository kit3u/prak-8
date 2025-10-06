const container = document.getElementById('cards-container');
const buttons = document.querySelectorAll('.periods button');
let period = 'daily';

async function loadData() {
  const res = await fetch('data.json');
  const data = await res.json();
  displayCards(data);
}

function displayCards(data) {
  container.innerHTML = '';
  const colors = ['#ff0062ff', '#ff3b86ff', '#ff619eff', '#ff8eb9ff', '#ffbfd7ff', '#ffdeebff'];

  data.forEach((item, i) => {
    const { title, timeframes } = item;
    const { current, previous } = timeframes[period];

    container.innerHTML += `
      <div class="card" style="--color:${colors[i]}">
        <div class="card-bg"></div>
        <div class="card-content">
          <h3>${title}</h3>
          <p class="hours">${current}hrs</p>
          <p class="previous">Yesterday - ${previous}hrs</p>
        </div>
      </div>
    `;
  });
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    period = btn.dataset.period;
    loadData();
  });
});

loadData();
