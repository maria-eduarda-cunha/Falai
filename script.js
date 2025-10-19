// --------------------- TELAS ---------------------
function mostrarTela(telaId, menuItem) {
  // Esconde todas as telas
  const telas = document.querySelectorAll('section');
  telas.forEach(tela => tela.classList.remove('ativo'));

  // Mostra a tela selecionada
  const tela = document.getElementById(telaId);
  if (tela) tela.classList.add('ativo');

  // Atualiza o menu ativo
  const menuItens = document.querySelectorAll('.menu a');
  menuItens.forEach(item => item.classList.remove('active'));
  if (menuItem) menuItem.classList.add('active');
}

// Mostra a tela de mapa por padrão
mostrarTela('tela-mapa', document.querySelector('.menu a'));


// --------------------- TELA LISTA DENUNCIAS ---------------------
const abas = document.querySelectorAll('.lista-denuncias-menu .aba');
const denuncias = document.querySelectorAll('.lista-denuncias .denuncia');

function filtrarDenuncias(status) {
  denuncias.forEach(d => {
    d.style.display = d.dataset.status === status ? 'block' : 'none';
  });
}

// Inicializa com “Abertas” visíveis
filtrarDenuncias('abertas');

abas.forEach(aba => {
  aba.addEventListener('click', () => {
    abas.forEach(a => a.classList.remove('active'));
    aba.classList.add('active');

    filtrarDenuncias(aba.dataset.status);
  });
});
