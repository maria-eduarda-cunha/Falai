// --------------------- TELAS ---------------------
function mostrarTela(telaId, menuItem) {
  const telas = document.querySelectorAll('section');
  telas.forEach(tela => tela.classList.remove('ativo'));

  const tela = document.getElementById(telaId);
  if (tela) tela.classList.add('ativo');

  const menuItens = document.querySelectorAll('.menu a');
  menuItens.forEach(item => item.classList.remove('active'));
  if (menuItem) menuItem.classList.add('active');

  const menu = document.querySelector('.menu');
  const telasComFooter = ['tela-mapa', 'tela-lista-denuncias', 'tela-notificacoes', 'tela-busca'];
  menu.style.display = telasComFooter.includes(telaId) ? 'flex' : 'none';
}

// Mostra a tela de mapa por padrão
mostrarTela('tela-mapa', document.querySelector('.menu a'));

// --------------------- CAMPOS DE ENDEREÇO ---------------------
const radiosEndereco = document.querySelectorAll('input[name="tipo-endereco"]');
const camposEndereco = document.getElementById('campos-endereco');

function atualizarCamposEndereco() {
  const selecionado = document.querySelector('input[name="tipo-endereco"]:checked').value;
  camposEndereco.style.display = (selecionado === 'informar') ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', atualizarCamposEndereco);
radiosEndereco.forEach(radio => radio.addEventListener('change', atualizarCamposEndereco));

// --------------------- BOTTOM SHEET ---------------------
const bottomSheet = document.getElementById('bottom-sheet');

function abrirBottomSheet() {
  bottomSheet.classList.add('show');
}

function fecharBottomSheet() {
  bottomSheet.classList.remove('show');
}

// --------------------- CRIAR PIN MOCK ---------------------
function criarDenunciaMock() {
  const mapa = document.getElementById('mapa');

  // Cria um novo pin com posição fixa
  const pin = document.createElement('span');
  pin.classList.add('material-symbols-outlined', 'pin');
  pin.style.top = '415px';
  pin.style.left = '530px';
  pin.textContent = 'fmd_bad';

  // Ao clicar no pin, abre o bottom sheet já preenchido no HTML
  pin.addEventListener('click', abrirBottomSheet);

  mapa.appendChild(pin);

  // Volta para a tela de mapa
  mostrarTela('tela-mapa');
}

// --------------------- BLOQUEAR ZOOM NO MAPA ---------------------
document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('gestureend', e => e.preventDefault());
