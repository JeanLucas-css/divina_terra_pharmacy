/* =====================================================
   SCRIPT.JS — Cérebro do blog
   =====================================================

   Este arquivo controla três coisas:
   1. A lista de todos os posts (array todosPosts)
   2. A paginação: quantos posts por página e qual página exibir
   3. As funções de renderização usadas em todas as páginas

   =====================================================
   COMO FUNCIONA A PAGINAÇÃO
   =====================================================

   O blog tem duas páginas HTML: index.html e pagina2.html.
   Ambas usam o mesmo script.js e a mesma função renderizarComPaginacao().

   A diferença entre elas é apenas um número: qual página exibir.
   - index.html chama:    renderizarComPaginacao(1)
   - pagina2.html chama:  renderizarComPaginacao(2)
   - pagina3.html chamaria: renderizarComPaginacao(3)  ← assim você expande

   A função recebe o número da página, calcula quais posts
   pertencem àquela página usando "fatia" do array, e renderiza
   apenas esses posts no grid.

   FÓRMULA DA FATIA:
   - Posts por página: 8
   - Página 1 → posts de índice 0 até 7   (slice(0, 8))
   - Página 2 → posts de índice 8 até 15  (slice(8, 16))
   - Página 3 → posts de índice 16 até 23 (slice(16, 24))
   - Fórmula: início = (pagina - 1) * 8

   COMO ADICIONAR MAIS PÁGINAS NO FUTURO:
   1. Adicione posts ao array todosPosts
   2. Crie uma nova página HTML (ex: pagina3.html) copiando pagina2.html
   3. No script final dessa página, mude o número: renderizarComPaginacao(3)
   4. O sistema calcula automaticamente quais posts mostrar nessa página.

   ===================================================== */


/* =====================================================
   CONFIGURAÇÕES GLOBAIS DA PAGINAÇÃO
   ===================================================== */

const POSTS_POR_PAGINA = 8;


/* =====================================================
   ARRAY DE POSTS
   ===================================================== */

const todosPosts = [
  {
    id: "post1",
    titulo: "Como criar hábitos saudáveis que realmente duram",
    imagem: "Imagens/3.png",
    link: "posts/post1.html",
    data: "2026-05-03",
    dataFormatada: "03 de Maio de 2026"
  },
  {
    id: "post2",
    titulo: "Minimalismo digital: como usar menos tecnologia e viver mais",
    imagem: "Imagens/4.png",
    link: "posts/post2.html",
    data: "2026-04-20",
    dataFormatada: "20 de Abril de 2026"
  },
  {
    id: "post3",
    titulo: "O poder da leitura: por que ler 20 minutos por dia muda tudo",
    imagem: "Imagens/2.png",
    link: "posts/post3.html",
    data: "2026-04-10",
    dataFormatada: "10 de Abril de 2026"
  },
  {
    id: "post4",
    titulo: "Culinária consciente: alimentação simples para uma vida melhor",
    imagem: "Imagens/7.png",
    link: "posts/post4.html",
    data: "2026-03-28",
    dataFormatada: "28 de Março de 2026"
  },
  {
    id: "post5",
    titulo: "Respiração consciente: o hábito gratuito que muda seu dia",
    imagem: "Imagens/8.png",
    link: "posts/post5.html",
    data: "2026-03-15",
    dataFormatada: "15 de Março de 2026"
  },
  {
    id: "post6",
    titulo: "Caminhada diária: por que andar a pé é o melhor remédio",
    imagem: "Imagens/1.png",
    link: "posts/post6.html",
    data: "2026-03-05",
    dataFormatada: "05 de Março de 2026"
  },
  {
    id: "post7",
    titulo: "Sono de qualidade: como a noite define o seu dia",
    imagem: "Imagens/6.png",
    link: "posts/post7.html",
    data: "2026-02-20",
    dataFormatada: "20 de Fevereiro de 2026"
  },
  {
    id: "post8",
    titulo: "Gratidão como prática: o diário que transforma a percepção",
    imagem: "Imagens/5.png",
    link: "posts/post8.html",
    data: "2026-02-10",
    dataFormatada: "10 de Fevereiro de 2026"
  },
  {
    id: "post9",
    titulo: "Menos compras, mais vida: o guia do consumo consciente",
    imagem: "https://picsum.photos/seed/consumo/700/500",
    link: "posts/post9.html",
    data: "2026-01-25",
    dataFormatada: "25 de Janeiro de 2026"
  },
  {
    id: "post10",
    titulo: "Contato com a natureza: por que sair de casa muda tudo",
    imagem: "https://picsum.photos/seed/natureza/700/500",
    link: "posts/post10.html",
    data: "2026-01-10",
    dataFormatada: "10 de Janeiro de 2026"
  }
];


/* =====================================================
   FUNÇÃO: ordenarPorData()

   Retorna uma cópia do array ordenada do mais recente
   para o mais antigo, usando o campo "data" (YYYY-MM-DD).
   A comparação funciona como string porque o formato ISO
   garante que a ordem alfabética = ordem cronológica.
   ===================================================== */

function ordenarPorData(posts) {
  return [...posts].sort((a, b) => {
    if (b.data > a.data) return 1;
    if (b.data < a.data) return -1;
    return 0;
  });
}


/* =====================================================
   FUNÇÃO: calcularTotalPaginas()

   Divide o total de posts por POSTS_POR_PAGINA e
   arredonda para cima com Math.ceil().
   Exemplo: 10 posts / 8 por página = Math.ceil(1.25) = 2 páginas
   ===================================================== */

function calcularTotalPaginas() {
  return Math.ceil(todosPosts.length / POSTS_POR_PAGINA);
}


/* =====================================================
   FUNÇÃO: criarCardHTML()

   Gera o HTML de um card. O card tem:
   - Imagem do post
   - Título clicável
   - Data no formato "04 de Maio de 2026"
   O card inteiro é envolto em um link <a>.
   ===================================================== */

function criarCardHTML(post, caminhoRelativo = "") {
  return `
    <article class="post-card">
      <a href="${caminhoRelativo}${post.link}" class="card-link">
        <div class="card-imagem-wrap">
          <img
            src="${post.imagem}"
            alt="${post.titulo}"
            loading="lazy"
          />
        </div>
        <div class="card-body">
          <h2 class="card-titulo">${post.titulo}</h2>
          <span class="card-data">${post.dataFormatada}</span>
        </div>
      </a>
    </article>
  `;
}


/* =====================================================
   FUNÇÃO: criarPaginacaoHTML()

   Gera o HTML da barra de paginação:
   [← anterior]  [1]  [2]  [3]  [próxima →]

   Mapeamento de número para arquivo HTML:
   - Página 1 → index.html
   - Página 2 → pagina2.html
   - Página 3 → pagina3.html
   - E assim por diante...

   Setas ficam desabilitadas nas extremidades:
   - Seta ← desabilitada na página 1
   - Seta → desabilitada na última página
   ===================================================== */

function criarPaginacaoHTML(paginaAtual, totalPaginas, caminhoRelativo = "") {
  if (totalPaginas <= 1) return "";

  // Converte número da página em nome de arquivo
  function urlDaPagina(num) {
    if (num === 1) return caminhoRelativo + "menublogs.html";
    return caminhoRelativo + "pagina" + num + ".html";
  }

  // Seta esquerda (← voltar)
  const setaEsquerda = paginaAtual === 1
    ? `<span class="pag-seta desabilitada">&#8592;</span>`
    : `<a href="${urlDaPagina(paginaAtual - 1)}" class="pag-seta">&#8592;</a>`;

  // Seta direita (→ avançar)
  const setaDireita = paginaAtual === totalPaginas
    ? `<span class="pag-seta desabilitada">&#8594;</span>`
    : `<a href="${urlDaPagina(paginaAtual + 1)}" class="pag-seta">&#8594;</a>`;

  // Botões numerados
  const botoes = Array.from({ length: totalPaginas }, (_, i) => {
    const num = i + 1;
    const classe = num === paginaAtual ? "pag-numero ativa" : "pag-numero";
    return `<a href="${urlDaPagina(num)}" class="${classe}">${num}</a>`;
  }).join("");

  return `
    <nav class="paginacao">
      ${setaEsquerda}
      <div class="pag-numeros">${botoes}</div>
      ${setaDireita}
    </nav>
  `;
}


/* =====================================================
   FUNÇÃO PRINCIPAL: renderizarComPaginacao()

   Chamada por cada página HTML do blog:
   - index.html   → renderizarComPaginacao(1)
   - pagina2.html → renderizarComPaginacao(2)
   - pagina3.html → renderizarComPaginacao(3)

   O que ela faz, passo a passo:
   1. Ordena todos os posts por data
   2. Calcula o total de páginas
   3. Fatia o array para pegar só os posts desta página
   4. Renderiza os cards no grid
   5. Renderiza a barra de paginação
   ===================================================== */

function renderizarComPaginacao(paginaAtual, caminhoRelativo = "") {
  const gridContainer = document.getElementById("posts-container");
  const paginacaoContainer = document.getElementById("paginacao-container");

  if (!gridContainer) return;

  const postsOrdenados = ordenarPorData(todosPosts);
  const totalPaginas = calcularTotalPaginas();

  // Calcula os índices de início e fim da fatia desta página
  const inicio = (paginaAtual - 1) * POSTS_POR_PAGINA;
  const fim = inicio + POSTS_POR_PAGINA;
  const postsDaPagina = postsOrdenados.slice(inicio, fim);

  // Renderiza os cards
  if (postsDaPagina.length === 0) {
    gridContainer.innerHTML = '<p class="sem-posts">Nenhum post encontrado nesta página.</p>';
  } else {
    gridContainer.innerHTML = postsDaPagina
      .map(post => criarCardHTML(post, caminhoRelativo))
      .join("");
  }

  // Renderiza a paginação
  if (paginacaoContainer) {
    paginacaoContainer.innerHTML = criarPaginacaoHTML(paginaAtual, totalPaginas, caminhoRelativo);
  }
}


/* =====================================================
   FUNÇÃO: renderizarRecentes()

   Usada dentro dos posts individuais.
   Mostra os 4 mais recentes, excluindo o post atual.
   ===================================================== */

function renderizarRecentes(containerId, postAtualId, caminhoRelativo = "") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const recentes = ordenarPorData(todosPosts)
    .filter(post => post.id !== postAtualId)
    .slice(0, 4);

  if (recentes.length === 0) {
    container.innerHTML = '<p class="sem-posts">Sem outros posts no momento.</p>';
    return;
  }

  container.innerHTML = `
    <div class="posts-grid">
      ${recentes.map(post => criarCardHTML(post, caminhoRelativo)).join("")}
    </div>
  `;


/* =====================================================
   FUNÇÃO: BANNER-SLIDER
  Avança e retorna os banners
   ===================================================== */
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  let autoplayTimer;
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  function updateSlider() {
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }
  
  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    updateSlider();
    resetAutoplay();
  }
  
  function slideMove(dir) { goToSlide(currentSlide + dir); }
  
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }
  
  resetAutoplay();
}
