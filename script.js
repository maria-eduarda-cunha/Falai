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
