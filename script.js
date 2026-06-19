// Formate un nombre en FCFA avec séparateurs de milliers
function formatFCFA(valeur) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(valeur)) + ' FCFA';
}

// Calcule le capital final avec apport initial + versements mensuels à taux fixe
// Formule : C = I*(1+r)^N + m*[(1+r)^N - 1]/r
function calculerCapitalFinal(I, m, tauxAnnuel, nbAnnees) {
  const r = tauxAnnuel / 12;       // taux mensuel
  const N = nbAnnees * 12;         // nombre total de mois

  if (r === 0) {
    return I + m * N;
  }

  const facteur = Math.pow(1 + r, N);
  return I * facteur + m * (facteur - 1) / r;
}

function afficherResultat(I, m, t, n) {
  const capitalFinal = calculerCapitalFinal(I, m, t, n);
  const totalVerse = I + m * n * 12;
  const interets = capitalFinal - totalVerse;
  const rendement = totalVerse > 0 ? (interets / totalVerse * 100) : 0;

  const resultatDiv = document.getElementById('resultat');
  resultatDiv.innerHTML = `
    <div class="resultat-grid">
      <div class="resultat-card">
        <div class="valeur">${formatFCFA(capitalFinal)}</div>
        <div class="label">Capital final</div>
      </div>
      <div class="resultat-card gain">
        <div class="valeur">${formatFCFA(interets)}</div>
        <div class="label">Intérêts gagnés</div>
      </div>
      <div class="resultat-card rendement">
        <div class="valeur">${rendement.toFixed(1)} %</div>
        <div class="label">Rendement total</div>
      </div>
    </div>
  `;
  resultatDiv.classList.add('show');
}

document.getElementById('form-calcul').addEventListener('submit', function (e) {
  e.preventDefault();

  const I = parseFloat(document.getElementById('I').value) || 0;
  const m = parseFloat(document.getElementById('m').value) || 0;
  const t = (parseFloat(document.getElementById('t').value) || 0) / 100;
  const n = parseFloat(document.getElementById('n').value) || 0;

  afficherResultat(I, m, t, n);
});

// Calcul initial au chargement de la page
document.getElementById('form-calcul').dispatchEvent(new Event('submit'));
