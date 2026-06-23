// ===== MENU ATIVO =====
// Marca o link do menu correspondente à página atual
function marcarMenuAtivo() {
  const links = document.querySelectorAll('.nav-links a');
  const paginaAtual = window.location.pathname.split('/').pop();

  links.forEach(function(link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === paginaAtual) {
      link.classList.add('ativo');
    }
  });
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function validarFormulario(event) {
  event.preventDefault();
  let valido = true;

  // Limpa erros anteriores
  document.querySelectorAll('.form-group').forEach(function(g) {
    g.classList.remove('invalido');
  });

  // Nome
  const nome = document.getElementById('nome');
  if (nome && nome.value.trim().length < 3) {
    marcarInvalido('nome', 'Informe seu nome completo (mínimo 3 caracteres).');
    valido = false;
  }

  // Email
  const email = document.getElementById('email');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !regexEmail.test(email.value.trim())) {
    marcarInvalido('email', 'Informe um e-mail válido.');
    valido = false;
  }

  // Idade
  const idade = document.getElementById('idade');
  if (idade) {
    const v = parseInt(idade.value);
    if (isNaN(v) || v < 5 || v > 120) {
      marcarInvalido('idade', 'Informe uma idade entre 5 e 120 anos.');
      valido = false;
    }
  }

  // Seleção favorita
  const selecao = document.getElementById('selecao');
  if (selecao && selecao.value === '') {
    marcarInvalido('selecao', 'Selecione sua seleção favorita.');
    valido = false;
  }

  // Nível de conhecimento
  const nivel = document.getElementById('nivel');
  if (nivel && nivel.value === '') {
    marcarInvalido('nivel', 'Selecione seu nível de conhecimento.');
    valido = false;
  }

  // Aceite dos termos
  const termos = document.getElementById('termos');
  if (termos && !termos.checked) {
    marcarInvalido('termos', 'Você precisa aceitar os termos para continuar.');
    valido = false;
  }

  if (valido) {
    document.getElementById('form-cadastro').submit();
  }
}

// Marca um campo como inválido e exibe a mensagem de erro
function marcarInvalido(id, mensagem) {
  const campo = document.getElementById(id);
  if (!campo) return;
  const grupo = campo.closest('.form-group');
  grupo.classList.add('invalido');
  grupo.querySelector('.erro').textContent = mensagem;
}

// ===== RECUPERAR DADOS VIA GET (formAction.html) =====
function recuperarDadosGet() {
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById('dados-recebidos');
  if (!container) return;

  const campos = {
    nome:    'Nome',
    email:   'E-mail',
    idade:   'Idade',
    selecao: 'Seleção Favorita',
    nivel:   'Nível de Conhecimento'
  };

  let html = '';
  let temDados = false;

  for (const [chave, label] of Object.entries(campos)) {
    const valor = params.get(chave);
    if (valor) {
      temDados = true;
      html += `
        <div class="dado-item">
          <span class="dado-label">${label}:</span>
          <span class="dado-valor">${valor}</span>
        </div>`;
    }
  }

  if (temDados) {
    container.innerHTML = html;
  } else {
    container.innerHTML = '<p>Nenhum dado encontrado. <a href="form.html">Voltar ao formulário</a></p>';
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
  marcarMenuAtivo();
  recuperarDadosGet();

  // Liga a validação ao formulário, se existir na página
  const form = document.getElementById('form-cadastro');
  if (form) {
    form.addEventListener('submit', validarFormulario);
  }
});