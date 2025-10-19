const pins = document.querySelectorAll('.pin');
const modal = document.getElementById('tela-denuncia-modal');
const modalContent = document.getElementById('modal-denuncia-content');
const comentariosModal = document.getElementById('tela-comentarios');
const comentariosContent = document.getElementById('modal-comentarios-content');

pins.forEach(pin => {
  pin.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalContent.querySelector('h3').textContent = pin.dataset.tipo;
    modalContent.querySelector('.endereco').textContent = pin.dataset.endereco;
    modalContent.querySelector('.descricao').textContent = pin.dataset.desc;

    const statusTexto = pin.dataset.status;
    const statusEl = modalContent.querySelector('.status');
    statusEl.className = 'status ' + (statusTexto.toLowerCase().replace(' ', ''));
    statusEl.querySelector('.texto-status').textContent = statusTexto;

    modalContent.querySelector('.btn-comentarios').onclick = () => {
      comentariosModal.style.display = 'flex';
      comentariosContent.querySelector('.tipo-denuncia').textContent = pin.dataset.tipo;
      comentariosContent.querySelector('.endereco').textContent = pin.dataset.endereco;

      const lista = comentariosContent.querySelector('.lista-comentarios');
      lista.innerHTML = '';
      const comentariosArray = pin.dataset.comentarios.split('|');
      for(let i=0;i<comentariosArray.length;i+=2){
        const div = document.createElement('div');
        div.className = 'comentario';
        div.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="perfil"><div class="conteudo"><div class="nome">${comentariosArray[i]}</div><div>${comentariosArray[i+1]}</div></div>`;
        lista.appendChild(div);
      }
    };
  });
});

modalContent.querySelector('.btn-fechar').onclick = () => modal.style.display = 'none';
comentariosContent.querySelector('.btn-fechar').onclick = () => comentariosModal.style.display = 'none';
