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

  // ------------------------------
  // MOSTRA/ESCONDE FOOTER
  const menu = document.querySelector('.menu');
  const telasComFooter = ['tela-mapa', 'tela-lista-denuncias', 'tela-notificacoes', 'tela-busca'];

  if (telasComFooter.includes(telaId)) {
    menu.style.display = 'flex';  // mostra o footer
  } else {
    menu.style.display = 'none';  // esconde o footer
  }
}

// Mostra a tela de mapa por padrão
mostrarTela('tela-mapa', document.querySelector('.menu a'));

// --------------------- TELA BUSCAR ---------------------
const campoBusca = document.getElementById('campo-busca');
const resultados = document.getElementById('resultados-busca');

// Simulação de denúncias globais
const todas_denuncias = [
  { titulo: 'Entulho - Parque Ibirapuera', autor: 'Maria Eduarda', status:'Concluída' },
  { titulo: 'Buraco - Avenida Paulista', autor: 'Rodrigo', status:'Concluída' },
  { titulo: 'Alagamento - Rua Normandia', autor: 'Júlia', status:'Em andamento' },
  { titulo: 'Árvore Caída - Rua 13 de Maio', autor: 'Bianca', status:'Aberta' },
];

function renderizarDenuncias(lista) {
  if (lista.length === 0) {
    resultados.innerHTML = '<p>Nenhuma denúncia encontrada</p>';
    return;
  }

  resultados.innerHTML = lista
    .map(
      (d) => `
      <p>
        <strong>${d.titulo}</strong>
        <small>por ${d.autor}</small><br>
        <small>Status: ${d.status}</small>
      </p>`
    )
    .join('');
}

// Exibe todas as denúncias ao abrir a tela
renderizarDenuncias(todas_denuncias);

campoBusca.addEventListener('input', e => {
  const termo = e.target.value.toLowerCase().trim();

  if (termo === '') {
    renderizarDenuncias(todas_denuncias);
    return;
  }

  const filtradas = todas_denuncias.filter(d =>
    d.titulo.toLowerCase().includes(termo)
  );

  resultados.innerHTML = filtradas.length
    ? filtradas.map(d => `<p><strong>${d.titulo}</strong><br><small>por ${d.autor}</small></p>`).join('')
    : '<p>Nenhuma denúncia encontrada</p>';
});

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

// --------------------- BLOQUEAR ZOOM NO MAPA ---------------------
document.addEventListener('wheel', e => {
  if (e.ctrlKey) e.preventDefault(); // bloqueia zoom Ctrl+scroll
}, { passive: false });

document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('gestureend', e => e.preventDefault());

// Alternar exibição dos campos de endereço
const radiosEndereco = document.querySelectorAll('input[name="tipo-endereco"]');
const camposEndereco = document.getElementById('campos-endereco');

radiosEndereco.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'informar') {
      camposEndereco.style.display = 'block';
    } else {
      camposEndereco.style.display = 'none';
    }
  });
});

// Inicializa o estado correto ao carregar
if (document.querySelector('input[name="tipo-endereco"]:checked').value === 'atual') {
  camposEndereco.style.display = 'none';
}

function criarDenunciaMock() {
  const mapa = document.getElementById('mapa');

  // Cria um novo pin com posição fixa
  const pin = document.createElement('span');
  pin.classList.add('material-symbols-outlined', 'pin');
  pin.style.top = '415px';
  pin.style.left = '530px';
  pin.textContent = 'fmd_bad';

  mapa.appendChild(pin);

  // Volta para a tela de mapa
  mostrarTela('tela-mapa');
}