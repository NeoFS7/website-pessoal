// =====================================================
// SCROLL REVEAL — anima elementos ao entrar na viewport
// =====================================================
const revelarElementos = () => {
    const elementos = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima só uma vez
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px -60px 0px' // Dispara quando o elemento entra ~60px na viewport vindo de baixo
    });

    elementos.forEach(el => observer.observe(el));
};

// =====================================================
// NAVBAR ATIVA — destaca o link da seção atual
// =====================================================
const atualizarNavbarAtiva = () => {
    const secoes = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.getElementById('navbar-principal');

    // Sombra na navbar ao scrollar
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 10);
    }, { passive: true });

    // Detecta seção ativa quando ela cruza o centro da viewport
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('nav-ativo');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-ativo');
                    }
                });
            }
        });
    }, {
        rootMargin: '-45% 0px -45% 0px', // Ativa quando a seção cruza o centro da tela
        threshold: 0
    });

    secoes.forEach(secao => navObserver.observe(secao));
};

// =====================================================
// FECHAR MENU MOBILE ao clicar em um link
// =====================================================
const fecharMenuMobile = () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuCollapse = document.getElementById('menu');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCollapse && menuCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
};

// =====================================================
// ABRIR GMAIL com os dados do formulário
// =====================================================
function abrirGmail(event) {
    event.preventDefault();
    var destinatario = "natanferreiira27@gmail.com";
    var mensagem = document.getElementById("mensagem").value;
    var assunto = document.getElementById("assunto").value;

    const url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(destinatario) +
        "&su=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(mensagem);

    window.open(url, "_blank");

    if (typeof $.toast === 'function') {
        $.toast({
            heading: "Guia aberta!",
            text: "Uma guia foi aberta para o envio do email",
            showHideTransition: "fade",
            icon: "success",
            bgColor: "#000000",
            hideAfter: 15000,
            loaderBg: "#3b2ba1"
        });
    }
}

// =====================================================
// FORMULÁRIO COLAPSÁVEL — transição suave manual
// =====================================================
const inicializarFormularioCollapse = () => {
    const btnAbrir  = document.getElementById('btn-toggle-form');
    const btnFechar = document.getElementById('btn-fechar-form');
    const form      = document.getElementById('formulario-contato');
    const painel    = document.getElementById('contato-painel');
    if (!btnAbrir || !form || !painel) return;

    const abrirForm = () => {
        // 1. Adiciona form-aberto ao painel → cards iniciam transição de layout
        painel.classList.add('form-aberto');
        form.setAttribute('aria-hidden', 'false');
        btnAbrir.setAttribute('aria-expanded', 'true');

        // 2. Pequeno delay para o layout dos cards iniciar antes do form aparecer
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                form.classList.add('form-visivel');
            });
        });

        // 3. Scroll suave após a transição terminar
        setTimeout(() => {
            painel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 350);
    };

    const fecharForm = () => {
        // Remove visibilidade do form → inicia fade-out + shrink
        form.classList.remove('form-visivel');
        form.setAttribute('aria-hidden', 'true');
        btnAbrir.setAttribute('aria-expanded', 'false');

        // Aguarda a transição do form terminar antes de reorganizar os cards
        setTimeout(() => {
            painel.classList.remove('form-aberto');
        }, 420); // ~duração da transição de max-height
    };

    btnAbrir.addEventListener('click', (e) => {
        e.preventDefault();
        if (form.classList.contains('form-visivel')) {
            fecharForm();
        } else {
            abrirForm();
        }
    });

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharForm);
    }
};

// =====================================================
// PARTÍCULAS ESTELARES AO REDOR DA FOTO DE PERFIL
// =====================================================
const gerarParticulasAvatar = () => {
    const container = document.getElementById('particulas-avatar');
    const wrapper = document.querySelector('.foto-perfil-wrapper');
    if (!container || !wrapper) return;

    const count = 22; // quantidade de pontos ao redor
    const rect = wrapper.getBoundingClientRect();
    const raio = rect.width / 2 + 14; // um pouco fora da borda da moldura
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const angulo = (2 * Math.PI / count) * i + (Math.random() - 0.5) * 0.3; // leve jitter
        const x = cx + raio * Math.cos(angulo);
        const y = cy + raio * Math.sin(angulo);

        const ponto = document.createElement('span');
        ponto.className = 'particula';

        // Tamanho entre 1px e 2px — apenas pontinhos pequenos
        const tamanho = (1 + Math.random()).toFixed(1) + 'px';
        ponto.style.width = tamanho;
        ponto.style.height = tamanho;

        ponto.style.left = x + 'px';
        ponto.style.top = y + 'px';

        ponto.style.animationDuration = (3 + Math.random() * 5).toFixed(1) + 's';
        ponto.style.animationDelay  = (Math.random() * 6).toFixed(1) + 's';

        container.appendChild(ponto);
    }
};

// Recalcula ao redimensionar (com debounce para não spammar)
let _debounceParticulas;
window.addEventListener('resize', () => {
    clearTimeout(_debounceParticulas);
    _debounceParticulas = setTimeout(gerarParticulasAvatar, 200);
}, { passive: true });

// =====================================================
// SEÇÕES COLAPSÁVEIS (Playlists, Jogos, Livros)
// =====================================================
const configurarSecaoColapsavel = (toggleId, collapseId) => {
    const toggle   = document.getElementById(toggleId);
    const collapse = document.getElementById(collapseId);
    if (!toggle || !collapse) return;

    // Telas menores (< 992px, breakpoint lg onde as colunas empilham)
    const isMobile = () => window.innerWidth < 992;

    const abrir = () => {
        toggle.setAttribute('aria-expanded', 'true');
        collapse.classList.add('aberto');
    };

    const fechar = () => {
        toggle.setAttribute('aria-expanded', 'false');
        collapse.classList.remove('aberto');
    };

    // Estado inicial:
    // Em telas menores (como celular): fechado por padrão.
    // Em telas maiores: aberto por padrão.
    if (isMobile()) {
        fechar();
    } else {
        abrir();
    }

    toggle.addEventListener('click', () => {
        const estaAberto = toggle.getAttribute('aria-expanded') === 'true';
        if (estaAberto) {
            fechar();
        } else {
            abrir();
        }
    });

    // Ajusta o estado ao redimensionar entre mobile e desktop
    let larguraAnterior = window.innerWidth;
    window.addEventListener('resize', () => {
        const larguraAtual = window.innerWidth;
        if (larguraAnterior < 992 && larguraAtual >= 992) {
            abrir();
        } else if (larguraAnterior >= 992 && larguraAtual < 992) {
            fechar();
        }
        larguraAnterior = larguraAtual;
    }, { passive: true });
};

const inicializarSecoesColapsaveis = () => {
    configurarSecaoColapsavel('playlists-toggle', 'playlists-collapse');
    configurarSecaoColapsavel('jogos-toggle', 'jogos-collapse');
    configurarSecaoColapsavel('livros-toggle', 'livros-collapse');
};

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    revelarElementos();
    atualizarNavbarAtiva();
    fecharMenuMobile();
    inicializarFormularioCollapse();
    gerarParticulasAvatar();
    inicializarSecoesColapsaveis();
});
