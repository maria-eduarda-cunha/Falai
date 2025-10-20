// --------------------- TELAS ---------------------
function mostrarTela(telaId, menuItem) {
  document.querySelectorAll('.bottom-sheet').forEach(bs => bs.classList.remove('show'));

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

function abrirBottomSheet(id) {
  // Fecha qualquer outro bottom sheet aberto
  document.querySelectorAll('.bottom-sheet').forEach(bs => bs.classList.remove('show'));

  // Abre o específico
  const sheet = document.getElementById(id);
  if (sheet) sheet.classList.add('show');
}

function fecharBottomSheet(id) {
  const sheet = document.getElementById(id);
  if (sheet) sheet.classList.remove('show');
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
  pin.addEventListener('click', () => abrirBottomSheet('bottom-sheet-alagamento'));

  mapa.appendChild(pin);

  // Volta para a tela de mapa
  mostrarTela('tela-mapa');
}

// --------------------- BLOQUEAR ZOOM NO MAPA ---------------------
document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('gestureend', e => e.preventDefault());

// --------------------- FILTRAR MINHAS DENÚNCIAS ---------------------
const abasLista = document.querySelectorAll('#tela-lista-denuncias .lista-denuncias-menu .aba');
const denunciasLista = document.querySelectorAll('#tela-lista-denuncias .lista-denuncias .card-denuncia');

function filtrarDenunciasLista(status) {
  denunciasLista.forEach(card => {
    card.style.display = (card.dataset.status === status) ? 'block' : 'none';
  });
}

// Inicializa mostrando apenas “Abertas”
filtrarDenunciasLista('abertas');

abasLista.forEach(aba => {
  aba.addEventListener('click', () => {
    // Atualiza o botão ativo
    abasLista.forEach(a => a.classList.remove('active'));
    aba.classList.add('active');

    // Filtra os cards
    filtrarDenunciasLista(aba.dataset.status);
  });
});

// --------------------- VOLTAR DOS COMENTARIOS ---------------------
function voltarParaMapaComBottomSheetAlagamento() {
  mostrarTela('tela-mapa');          
  abrirBottomSheet('bottom-sheet-alagamento');     
}