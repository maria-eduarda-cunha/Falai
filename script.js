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

// --------------------- ZOOM NO MAPA ---------------------
let zoom = 1;
const mapa = document.getElementById('mapa');

document.addEventListener('wheel', e => {
  if (!mapa.closest('#tela-mapa.ativo')) return; // só se mapa visível
  e.preventDefault();

  if (e.deltaY < 0) zoom *= 1.1; // zoom in
  else zoom /= 1.1; // zoom out

  zoom = Math.min(Math.max(zoom, 0.5), 3); // limita zoom
  mapa.style.transform = `scale(${zoom})`;
}, { passive: false });

