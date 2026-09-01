// ==========================================
// PORTAL ACBCSJ - GESTÃO DE SENHAS E ACESSOS
// Módulo exclusivo da Diretoria
// ==========================================

const INITIAL_SENHAS_DATA = [
    {
        id: "pwd_1",
        site: "MERCADO LIVRE",
        url: "https://www.mercadolivre.com.br",
        login: "bcassociacao@gmail.com",
        senha: "514010",
        quem_criou: "RAMPINELI",
        status: "desuso",
        categoria: "Compras / Marketplace",
        observacoes: "Conta antiga da associação (em desuso)",
        criado_em: "2024-01-15 10:00:00",
        atualizado_em: "2026-09-01 18:00:00"
    },
    {
        id: "pwd_2",
        site: "GMAIL",
        url: "https://mail.google.com",
        login: "bcassociacao@gmail.com",
        senha: "Acbcsj2023@",
        quem_criou: "SEI LÁ",
        status: "ativo",
        categoria: "E-mail",
        observacoes: "E-mail institucional principal oficial da ACBCSJ",
        criado_em: "2023-01-10 09:30:00",
        atualizado_em: "2026-09-01 18:00:00"
    },
    {
        id: "pwd_3",
        site: "SHOPEE",
        url: "https://shopee.com.br",
        login: "bcassociacao@gmail.com",
        senha: "Bcs10bbm@",
        quem_criou: "YANKA",
        status: "ativo",
        categoria: "Compras / Marketplace",
        observacoes: "Conta para compras de materiais operacionais e insumos",
        criado_em: "2023-06-20 14:00:00",
        atualizado_em: "2026-09-01 18:00:00"
    },
    {
        id: "pwd_4",
        site: "GMAIL 2",
        url: "https://mail.google.com",
        login: "acbcsj25@gmail.com",
        senha: "bcs10bbm@",
        quem_criou: "YANKA",
        status: "ativo",
        categoria: "E-mail",
        observacoes: "E-mail secundário de apoio da associação",
        criado_em: "2025-01-05 11:20:00",
        atualizado_em: "2026-09-01 18:00:00"
    },
    {
        id: "pwd_5",
        site: "MERCADO LIVRE",
        url: "https://www.mercadolivre.com.br",
        login: "acessar pelo GMAIL 2",
        senha: "acessar pelo GMAIL 2",
        quem_criou: "YANKA",
        status: "ativo",
        categoria: "Compras / Marketplace",
        observacoes: "Acessar via login social do Google com acbcsj25@gmail.com",
        criado_em: "2025-01-15 15:40:00",
        atualizado_em: "2026-09-01 18:00:00"
    },
    {
        id: "pwd_6",
        site: "INSTA",
        url: "https://www.instagram.com",
        login: "bcassociacao@gmail.com",
        senha: "ignis2025",
        quem_criou: "SEI LÁ",
        status: "ativo",
        categoria: "Redes Sociais",
        observacoes: "Perfil oficial do Instagram da associação (@acbcsj)",
        criado_em: "2025-02-01 16:10:00",
        atualizado_em: "2026-09-01 18:00:00"
    },
    {
        id: "pwd_7",
        site: "NEX",
        url: "https://www.nextar.com",
        login: "bcassociacao@gmail.com",
        senha: "2025acbcsj2025",
        quem_criou: "Diretoria",
        status: "ativo",
        categoria: "Sistemas & Softwares",
        observacoes: "Sistema Nex de atendimento, cadastros e controle",
        criado_em: "2025-01-10 08:00:00",
        atualizado_em: "2026-09-01 18:00:00"
    }
];

// Estado local do módulo de senhas
let senhasRevealedIds = new Set();
let senhasAllRevealed = false;
let senhasViewMode = 'table'; // 'table' ou 'cards'
let senhasSearchQuery = '';
let senhasFilterCategoria = 'todas';
let senhasFilterStatus = 'todos';

// Inicialização segura dos dados locais
function getSenhasAcessosList() {
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem('acbcsj_senhas_acessos')) || [];
    } catch(e) {
        list = [];
    }
    if (!Array.isArray(list) || list.length === 0) {
        list = [...INITIAL_SENHAS_DATA];
        try {
            localStorage.setItem('acbcsj_senhas_acessos', JSON.stringify(list));
        } catch(e) {}
    }
    return list;
}

function saveSenhasAcessosList(list) {
    try {
        localStorage.setItem('acbcsj_senhas_acessos', JSON.stringify(list));
    } catch(e) {
        console.error("Erro ao salvar lista de senhas no localStorage:", e);
    }
}

// Renderização principal da página de Senhas e Acessos
async function renderSenhasAcessos() {
    const container = document.getElementById('containerSenhasAcessos');
    if (!container) return;

    // Se o serviço do Supabase estiver disponível, tenta sincronizar
    let lista = [];
    if (window.dbService && typeof window.dbService.getSenhasAcessos === 'function') {
        try {
            lista = await window.dbService.getSenhasAcessos();
        } catch(e) {
            lista = getSenhasAcessosList();
        }
    } else {
        lista = getSenhasAcessosList();
    }

    // Se estiver vazia, garante os dados iniciais
    if (!lista || lista.length === 0) {
        lista = [...INITIAL_SENHAS_DATA];
        saveSenhasAcessosList(lista);
    }

    // Atualizar métricas no topo
    atualizarMetricasSenhas(lista);

    // Filtrar lista conforme busca e filtros
    const listaFiltrada = aplicarFiltrosSenhas(lista);

    // Renderizar conteúdo (tabela ou cards)
    if (senhasViewMode === 'table') {
        renderTabelaSenhas(container, listaFiltrada);
    } else {
        renderCardsSenhas(container, listaFiltrada);
    }
}

// Atualiza os cartões de métricas no topo da página
function atualizarMetricasSenhas(lista) {
    const totalEl = document.getElementById('metricTotalSenhas');
    const ativasEl = document.getElementById('metricSenhasAtivas');
    const desusoEl = document.getElementById('metricSenhasDesuso');
    const categoriasEl = document.getElementById('metricSenhasCategorias');

    if (!totalEl) return;

    const total = lista.length;
    const ativas = lista.filter(s => (s.status || 'ativo').toLowerCase() === 'ativo').length;
    const desuso = lista.filter(s => (s.status || '').toLowerCase() === 'desuso').length;

    const categoriasUnicas = new Set(lista.map(s => s.categoria || 'Geral')).size;

    totalEl.textContent = `${total} conta(s)`;
    if (ativasEl) ativasEl.textContent = `${ativas} ativa(s)`;
    if (desusoEl) desusoEl.textContent = `${desuso} em desuso`;
    if (categoriasEl) categoriasEl.textContent = `${categoriasUnicas} tipo(s)`;
}

// Aplicação dos filtros de busca, categoria e status
function aplicarFiltrosSenhas(lista) {
    const q = senhasSearchQuery.trim().toLowerCase();
    const cat = senhasFilterCategoria;
    const st = senhasFilterStatus;

    return lista.filter(item => {
        // Filtro por Categoria
        if (cat !== 'todas' && (item.categoria || '').toLowerCase() !== cat.toLowerCase()) {
            return false;
        }

        // Filtro por Status
        if (st !== 'todos') {
            const itemStatus = (item.status || 'ativo').toLowerCase();
            if (st === 'ativo' && itemStatus !== 'ativo') return false;
            if (st === 'desuso' && itemStatus !== 'desuso') return false;
            if (st === 'revisao' && itemStatus !== 'revisao') return false;
        }

        // Filtro por busca de texto
        if (q) {
            const matchSite = (item.site || '').toLowerCase().includes(q);
            const matchLogin = (item.login || '').toLowerCase().includes(q);
            const matchQuem = (item.quem_criou || '').toLowerCase().includes(q);
            const matchObs = (item.observacoes || '').toLowerCase().includes(q);
            const matchCat = (item.categoria || '').toLowerCase().includes(q);
            const matchSenha = (item.senha || '').toLowerCase().includes(q);
            if (!matchSite && !matchLogin && !matchQuem && !matchObs && !matchCat && !matchSenha) {
                return false;
            }
        }

        return true;
    });
}

// Obter ícone elegante de acordo com o serviço/categoria
function getIconeServico(site, categoria) {
    const nome = (site || '').toUpperCase();
    if (nome.includes('GMAIL') || nome.includes('GOOGLE')) return '📧';
    if (nome.includes('MERCADO LIVRE') || nome.includes('ML')) return '💛';
    if (nome.includes('SHOPEE')) return '🛍️';
    if (nome.includes('INSTA') || nome.includes('FACEBOOK') || nome.includes('TIKTOK')) return '📸';
    if (nome.includes('NEX') || nome.includes('SISTEMA')) return '🖥️';
    if (nome.includes('BANCO') || nome.includes('SICREDI') || nome.includes('CAIXA') || nome.includes('PIX')) return '🏦';
    if (nome.includes('SUPABASE') || nome.includes('HOST') || nome.includes('VERCEL')) return '⚡';
    if (categoria === 'E-mail') return '✉️';
    if (categoria === 'Compras / Marketplace') return '🛒';
    if (categoria === 'Redes Sociais') return '📱';
    if (categoria === 'Sistemas & Softwares') return '💻';
    if (categoria === 'Bancário / Financeiro') return '💰';
    return '🔐';
}

// Obter badge de status estilizada
function getStatusBadge(status) {
    const st = (status || 'ativo').toLowerCase();
    if (st === 'ativo') {
        return `<span class="badge" style="background: rgba(46, 204, 113, 0.15); color: #2ECC71; border: 1px solid rgba(46, 204, 113, 0.4); font-weight: 700; padding: 3px 8px; border-radius: 6px;">🟢 Ativo</span>`;
    }
    if (st === 'desuso') {
        return `<span class="badge" style="background: rgba(231, 76, 60, 0.15); color: #E74C3C; border: 1px solid rgba(231, 76, 60, 0.4); font-weight: 700; padding: 3px 8px; border-radius: 6px;">🔴 Em Desuso</span>`;
    }
    if (st === 'revisao') {
        return `<span class="badge" style="background: rgba(243, 156, 18, 0.15); color: #F39C12; border: 1px solid rgba(243, 156, 18, 0.4); font-weight: 700; padding: 3px 8px; border-radius: 6px;">🟡 Revisão</span>`;
    }
    return `<span class="badge" style="background: rgba(149, 165, 166, 0.15); color: #95A5A6; border: 1px solid rgba(149, 165, 166, 0.4); font-weight: 700; padding: 3px 8px; border-radius: 6px;">⚪ ${status}</span>`;
}

// Renderização em Formato Tabela
function renderTabelaSenhas(container, lista) {
    if (lista.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 40px; margin-bottom: 10px;">🔍</div>
                <h4 style="color: var(--accent-gold); margin-bottom: 6px;">Nenhum acesso encontrado</h4>
                <p style="color: var(--text-muted); font-size: 13px;">Tente alterar os termos da busca ou os filtros de categoria/status.</p>
                <button class="btn btn-primary btn-sm" style="margin-top: 15px;" onclick="limparFiltrosSenhas()">Limpar Filtros</button>
            </div>
        `;
        return;
    }

    let rowsHtml = '';
    lista.forEach((item, index) => {
        const isRevealed = senhasAllRevealed || senhasRevealedIds.has(item.id);
        const senhaDisplay = isRevealed ? escapeHtml(item.senha) : '••••••••••••';
        const icone = getIconeServico(item.site, item.categoria);
        const linkHtml = item.url ? `
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="btn-link-site" title="Abrir site em nova aba">
                <span style="color: var(--accent-gold); font-size: 11px; display: inline-flex; align-items: center; gap: 4px;">
                    🔗 Abrir Site
                </span>
            </a>
        ` : '';

        const responsavel = item.quem_criou && item.quem_criou.trim() !== '' ? item.quem_criou : '<span style="color: var(--text-muted); font-style: italic;">Não inf.</span>';
        const obsHtml = item.observacoes ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">💡 ${escapeHtml(item.observacoes)}</div>` : '';

        rowsHtml += `
            <tr style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" class="senha-table-row">
                <!-- 1. SITE / CONTA -->
                <td style="padding: 14px 12px; vertical-align: middle;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 20px; background: rgba(255,255,255,0.04); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid var(--border-color);">${icone}</span>
                        <div>
                            <strong style="color: #FFFFFF; font-size: 14px; letter-spacing: 0.5px; display: block;">${escapeHtml(item.site)}</strong>
                            <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                                <span class="badge" style="font-size: 10px; background: rgba(212, 175, 55, 0.12); color: var(--accent-gold); border: 1px solid rgba(212, 175, 55, 0.25); padding: 2px 6px; border-radius: 4px;">${escapeHtml(item.categoria || 'Geral')}</span>
                                ${linkHtml}
                            </div>
                        </div>
                    </div>
                </td>

                <!-- 2. LOGIN / USUÁRIO -->
                <td style="padding: 14px 12px; vertical-align: middle;">
                    <div class="credential-box">
                        <span class="credential-text" id="login_txt_${item.id}" title="${escapeHtml(item.login)}">${escapeHtml(item.login)}</span>
                        <button type="button" class="btn-copy-mini" id="btn_copy_login_${item.id}" onclick="copiarCredencial('${escapeJsString(item.login)}', 'btn_copy_login_${item.id}', 'Login')" title="Copiar Login">
                            📋
                        </button>
                    </div>
                </td>

                <!-- 3. SENHA -->
                <td style="padding: 14px 12px; vertical-align: middle;">
                    <div class="credential-box password-box">
                        <span class="credential-text font-mono" id="pwd_txt_${item.id}" style="${isRevealed ? 'color: #2ECC71; font-weight: bold;' : 'color: var(--text-muted);'}">${senhaDisplay}</span>
                        <div style="display: flex; gap: 4px;">
                            <button type="button" class="btn-eye-mini" onclick="toggleMostrarSenhaUnica('${item.id}')" title="${isRevealed ? 'Ocultar Senha' : 'Ver Senha'}">
                                ${isRevealed ? '🙈' : '👁️'}
                            </button>
                            <button type="button" class="btn-copy-mini" id="btn_copy_pwd_${item.id}" onclick="copiarCredencial('${escapeJsString(item.senha)}', 'btn_copy_pwd_${item.id}', 'Senha')" title="Copiar Senha">
                                📋
                            </button>
                        </div>
                    </div>
                </td>

                <!-- 4. QUEM CRIOU / RESPONSÁVEL -->
                <td style="padding: 14px 12px; vertical-align: middle;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 13px; font-weight: 600; color: var(--text-main);">${escapeHtml(responsavel)}</span>
                    </div>
                    ${obsHtml}
                </td>

                <!-- 5. STATUS -->
                <td style="padding: 14px 12px; vertical-align: middle; text-align: center;">
                    ${getStatusBadge(item.status)}
                </td>

                <!-- 6. AÇÕES -->
                <td style="padding: 14px 12px; vertical-align: middle; text-align: right; white-space: nowrap;">
                    <button type="button" class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 12px; margin-right: 4px;" onclick="abrirModalEditarSenha('${item.id}')" title="Editar este acesso">
                        ✏️ Editar
                    </button>
                    <button type="button" class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 12px; color: #E74C3C; border-color: rgba(231, 76, 60, 0.4);" onclick="confirmarExcluirSenha('${item.id}')" title="Excluir este acesso">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="card" style="padding: 0; overflow: hidden; border-radius: 8px;">
            <div class="table-responsive">
                <table class="custom-table" style="margin: 0; width: 100%;">
                    <thead>
                        <tr style="background: rgba(0,0,0,0.3); border-bottom: 2px solid var(--border-color);">
                            <th style="padding: 14px 12px; font-size: 12px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.5px;">SITE / CONTA</th>
                            <th style="padding: 14px 12px; font-size: 12px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.5px;">LOGIN / USUÁRIO</th>
                            <th style="padding: 14px 12px; font-size: 12px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.5px;">SENHA</th>
                            <th style="padding: 14px 12px; font-size: 12px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.5px;">QUEM CRIOU / OBS</th>
                            <th style="padding: 14px 12px; font-size: 12px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.5px; text-align: center;">STATUS</th>
                            <th style="padding: 14px 12px; font-size: 12px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.5px; text-align: right;">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Renderização em Formato Cards
function renderCardsSenhas(container, lista) {
    if (lista.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 40px; margin-bottom: 10px;">🔍</div>
                <h4 style="color: var(--accent-gold); margin-bottom: 6px;">Nenhum acesso encontrado</h4>
                <p style="color: var(--text-muted); font-size: 13px;">Tente alterar os termos da busca ou os filtros.</p>
                <button class="btn btn-primary btn-sm" style="margin-top: 15px;" onclick="limparFiltrosSenhas()">Limpar Filtros</button>
            </div>
        `;
        return;
    }

    let cardsHtml = '';
    lista.forEach(item => {
        const isRevealed = senhasAllRevealed || senhasRevealedIds.has(item.id);
        const senhaDisplay = isRevealed ? escapeHtml(item.senha) : '••••••••••••';
        const icone = getIconeServico(item.site, item.categoria);
        const responsavel = item.quem_criou && item.quem_criou.trim() !== '' ? item.quem_criou : 'Não informado';

        cardsHtml += `
            <div class="card senha-card-item" style="border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 8px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, border-color 0.2s;">
                <div>
                    <!-- CABEÇALHO DO CARD -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 24px; background: rgba(255,255,255,0.05); width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid var(--border-color);">${icone}</span>
                            <div>
                                <h4 style="color: #FFFFFF; font-size: 15px; margin: 0; font-weight: 700;">${escapeHtml(item.site)}</h4>
                                <span style="font-size: 11px; color: var(--accent-gold); font-weight: 600;">${escapeHtml(item.categoria || 'Geral')}</span>
                            </div>
                        </div>
                        <div>
                            ${getStatusBadge(item.status)}
                        </div>
                    </div>

                    <!-- CAMPOS DO CARD -->
                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 3px; text-transform: uppercase;">Login / Usuário:</label>
                        <div class="credential-box">
                            <span class="credential-text" style="font-size: 13px;">${escapeHtml(item.login)}</span>
                            <button type="button" class="btn-copy-mini" id="btn_card_login_${item.id}" onclick="copiarCredencial('${escapeJsString(item.login)}', 'btn_card_login_${item.id}', 'Login')" title="Copiar Login">
                                📋
                            </button>
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 3px; text-transform: uppercase;">Senha de Acesso:</label>
                        <div class="credential-box password-box">
                            <span class="credential-text font-mono" style="${isRevealed ? 'color: #2ECC71; font-weight: bold;' : 'color: var(--text-muted);'} font-size: 13px;">${senhaDisplay}</span>
                            <div style="display: flex; gap: 4px;">
                                <button type="button" class="btn-eye-mini" onclick="toggleMostrarSenhaUnica('${item.id}')" title="${isRevealed ? 'Ocultar Senha' : 'Ver Senha'}">
                                    ${isRevealed ? '🙈' : '👁️'}
                                </button>
                                <button type="button" class="btn-copy-mini" id="btn_card_pwd_${item.id}" onclick="copiarCredencial('${escapeJsString(item.senha)}', 'btn_card_pwd_${item.id}', 'Senha')" title="Copiar Senha">
                                    📋
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 8px;">
                        <div>
                            <span style="color: var(--text-muted); display: block;">Quem Criou:</span>
                            <strong style="color: var(--text-main);">${escapeHtml(responsavel)}</strong>
                        </div>
                        ${item.url ? `
                            <div>
                                <span style="color: var(--text-muted); display: block;">Link:</span>
                                <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-gold); text-decoration: none; font-weight: bold;">↗️ Abrir Site</a>
                            </div>
                        ` : ''}
                    </div>

                    ${item.observacoes ? `
                        <div style="background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 6px; font-size: 11px; color: var(--text-muted); margin-top: 8px; border-left: 3px solid var(--accent-gold);">
                            💡 <b>Obs:</b> ${escapeHtml(item.observacoes)}
                        </div>
                    ` : ''}
                </div>

                <!-- RODAPÉ DE AÇÕES -->
                <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px;">
                    <button type="button" class="btn btn-outline btn-sm" style="font-size: 12px;" onclick="abrirModalEditarSenha('${item.id}')">✏️ Editar</button>
                    <button type="button" class="btn btn-outline btn-sm" style="font-size: 12px; color: #E74C3C; border-color: rgba(231, 76, 60, 0.4);" onclick="confirmarExcluirSenha('${item.id}')">🗑️ Excluir</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
            ${cardsHtml}
        </div>
    `;
}

// Alternar visibilidade de uma senha específica
function toggleMostrarSenhaUnica(id) {
    if (senhasRevealedIds.has(id)) {
        senhasRevealedIds.delete(id);
    } else {
        senhasRevealedIds.add(id);
    }
    renderSenhasAcessos();
}

// Revelar ou ocultar todas as senhas
function toggleMostrarTodasSenhas() {
    senhasAllRevealed = !senhasAllRevealed;
    const btn = document.getElementById('btnToggleAllSenhas');
    if (btn) {
        btn.innerHTML = senhasAllRevealed ? '🙈 Ocultar Todas as Senhas' : '👁️ Revelar Todas as Senhas';
    }
    renderSenhasAcessos();
}

// Alternar modo de visualização (Tabela vs Cards)
function alternarModoVisualizacaoSenhas(modo) {
    senhasViewMode = modo;
    const btnTabela = document.getElementById('btnViewTableSenhas');
    const btnCards = document.getElementById('btnViewCardsSenhas');

    if (btnTabela && btnCards) {
        if (modo === 'table') {
            btnTabela.classList.add('btn-gold');
            btnTabela.classList.remove('btn-outline');
            btnCards.classList.add('btn-outline');
            btnCards.classList.remove('btn-gold');
        } else {
            btnCards.classList.add('btn-gold');
            btnCards.classList.remove('btn-outline');
            btnTabela.classList.add('btn-outline');
            btnTabela.classList.remove('btn-gold');
        }
    }
    renderSenhasAcessos();
}

// Filtros em tempo real
function onSearchSenhasInput(value) {
    senhasSearchQuery = value;
    renderSenhasAcessos();
}

function onFilterCategoriaSenhas(value) {
    senhasFilterCategoria = value;
    renderSenhasAcessos();
}

function onFilterStatusSenhas(value) {
    senhasFilterStatus = value;
    renderSenhasAcessos();
}

function limparFiltrosSenhas() {
    senhasSearchQuery = '';
    senhasFilterCategoria = 'todas';
    senhasFilterStatus = 'todos';

    const searchInput = document.getElementById('searchSenhasInput');
    const catSelect = document.getElementById('filterCategoriaSenhas');
    const stSelect = document.getElementById('filterStatusSenhas');

    if (searchInput) searchInput.value = '';
    if (catSelect) catSelect.value = 'todas';
    if (stSelect) stSelect.value = 'todos';

    renderSenhasAcessos();
}

// Função para copiar dados com fallback e feedback visual moderno
function copiarCredencial(texto, btnId, tipoLabel) {
    if (!texto) return;

    const executarFeedback = () => {
        const btn = document.getElementById(btnId);
        if (btn) {
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '✓';
            btn.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
            btn.style.borderColor = '#2ECC71';
            btn.style.color = '#2ECC71';

            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 1800);
        }
        mostrarToastSucesso(`${tipoLabel || 'Texto'} copiado com sucesso!`);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(executarFeedback).catch(err => {
            console.warn("Fallback clipboard:", err);
            fallbackCopiarTexto(texto);
            executarFeedback();
        });
    } else {
        fallbackCopiarTexto(texto);
        executarFeedback();
    }
}

function fallbackCopiarTexto(texto) {
    const textArea = document.createElement("textarea");
    textArea.value = texto;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback cópia falhou:', err);
    }
    document.body.removeChild(textArea);
}

// Toast notification elegante
function mostrarToastSucesso(mensagem) {
    let toast = document.getElementById('acbcsjToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'acbcsjToast';
        toast.className = 'acbcsj-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

// Modal de Inserir / Editar Acesso e Senha
function abrirModalNovoAcessoSenha() {
    document.getElementById('formSenhaAcesso').reset();
    document.getElementById('senhaAcessoId').value = '';
    document.getElementById('modalSenhaAcessoTitulo').textContent = '🔐 Cadastrar Novo Acesso / Senha';
    document.getElementById('senhaAcessoStatus').value = 'ativo';
    document.getElementById('senhaAcessoCategoria').value = 'E-mail';

    // Auto-preencher criador com usuário logado se disponível
    if (typeof currentUser !== 'undefined' && currentUser && currentUser.nome_guerra) {
        document.getElementById('senhaAcessoQuemCriou').value = currentUser.nome_guerra.toUpperCase();
    }

    openModal('modalSenhaAcesso');
}

function abrirModalEditarSenha(id) {
    const lista = getSenhasAcessosList();
    const item = lista.find(s => s.id === id);
    if (!item) {
        alert("Acesso não encontrado!");
        return;
    }

    document.getElementById('senhaAcessoId').value = item.id;
    document.getElementById('senhaAcessoSite').value = item.site || '';
    document.getElementById('senhaAcessoUrl').value = item.url || '';
    document.getElementById('senhaAcessoCategoria').value = item.categoria || 'Geral';
    document.getElementById('senhaAcessoLogin').value = item.login || '';
    document.getElementById('senhaAcessoSenha').value = item.senha || '';
    document.getElementById('senhaAcessoQuemCriou').value = item.quem_criou || '';
    document.getElementById('senhaAcessoStatus').value = item.status || 'ativo';
    document.getElementById('senhaAcessoObservacoes').value = item.observacoes || '';

    document.getElementById('modalSenhaAcessoTitulo').textContent = `✏️ Editar Acesso: ${item.site}`;
    openModal('modalSenhaAcesso');
}

// Salvar / Atualizar Acesso
async function salvarSenhaAcesso(event) {
    event.preventDefault();

    const id = document.getElementById('senhaAcessoId').value || ('pwd_' + Date.now());
    const site = document.getElementById('senhaAcessoSite').value.trim().toUpperCase();
    let url = document.getElementById('senhaAcessoUrl').value.trim();
    const categoria = document.getElementById('senhaAcessoCategoria').value;
    const login = document.getElementById('senhaAcessoLogin').value.trim();
    const senha = document.getElementById('senhaAcessoSenha').value;
    const quem_criou = document.getElementById('senhaAcessoQuemCriou').value.trim().toUpperCase();
    const status = document.getElementById('senhaAcessoStatus').value;
    const observacoes = document.getElementById('senhaAcessoObservacoes').value.trim();

    if (!site || !login || !senha) {
        alert("Por favor, preencha o Site/Conta, Login e a Senha!");
        return;
    }

    // Auto-completar URL com https se digitou sem
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    const payload = {
        id,
        site,
        url: url || null,
        categoria: categoria || 'Geral',
        login,
        senha,
        quem_criou: quem_criou || 'DIRETORIA',
        status: status || 'ativo',
        observacoes: observacoes || null,
        atualizado_em: new Date().toISOString()
    };

    let list = getSenhasAcessosList();
    const index = list.findIndex(s => s.id === id);
    if (index >= 0) {
        payload.criado_em = list[index].criado_em || new Date().toISOString();
        list[index] = payload;
    } else {
        payload.criado_em = new Date().toISOString();
        list.unshift(payload);
    }

    saveSenhasAcessosList(list);

    // Salvar no Supabase se disponível
    if (window.dbService && typeof window.dbService.saveSenhaAcesso === 'function') {
        try {
            await window.dbService.saveSenhaAcesso(payload);
        } catch(e) {
            console.warn("Aviso ao salvar senha no Supabase:", e);
        }
    }

    closeModal('modalSenhaAcesso');
    mostrarToastSucesso('Acesso e senha salvos com sucesso!');
    renderSenhasAcessos();
}

// Exclusão com confirmação segura
async function confirmarExcluirSenha(id) {
    const list = getSenhasAcessosList();
    const item = list.find(s => s.id === id);
    if (!item) return;

    const confirma = confirm(`⚠️ Tem certeza que deseja excluir o acesso de "${item.site}" (${item.login})?\n\nEsta ação não poderá ser desfeita.`);
    if (!confirma) return;

    const novaLista = list.filter(s => s.id !== id);
    saveSenhasAcessosList(novaLista);

    // Excluir no Supabase se disponível
    if (window.dbService && typeof window.dbService.deleteSenhaAcesso === 'function') {
        try {
            await window.dbService.deleteSenhaAcesso(id);
        } catch(e) {
            console.warn("Aviso ao excluir senha no Supabase:", e);
        }
    }

    mostrarToastSucesso(`Acesso "${item.site}" excluído com sucesso.`);
    renderSenhasAcessos();
}

// Gerador de senhas seguras
function gerarSenhaAleatoria() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*_-';
    let pwd = '';
    const length = 14;
    for (let i = 0; i < length; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const input = document.getElementById('senhaAcessoSenha');
    if (input) {
        input.value = pwd;
        input.type = 'text'; // mostra a senha gerada temporariamente
        mostrarToastSucesso('Nova senha forte gerada!');
    }
}

// Alternar visibilidade no formulário do modal
function toggleVisibilidadeSenhaModal() {
    const input = document.getElementById('senhaAcessoSenha');
    const btn = document.getElementById('btnToggleSenhaModal');
    if (!input || !btn) return;

    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈 Ocultar';
    } else {
        input.type = 'password';
        btn.textContent = '👁️ Mostrar';
    }
}

// Exportar Backup para CSV
function exportarBackupSenhas() {
    const list = getSenhasAcessosList();
    if (!list || list.length === 0) {
        alert("Nenhuma senha cadastrada para exportar!");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "SITE/CONTA;CATEGORIA;LOGIN;SENHA;QUEM CRIOU;STATUS;URL;OBSERVACOES\n";

    list.forEach(item => {
        const row = [
            `"${(item.site || '').replace(/"/g, '""')}"`,
            `"${(item.categoria || '').replace(/"/g, '""')}"`,
            `"${(item.login || '').replace(/"/g, '""')}"`,
            `"${(item.senha || '').replace(/"/g, '""')}"`,
            `"${(item.quem_criou || '').replace(/"/g, '""')}"`,
            `"${(item.status || '').replace(/"/g, '""')}"`,
            `"${(item.url || '').replace(/"/g, '""')}"`,
            `"${(item.observacoes || '').replace(/"/g, '""')}"`
        ].join(";");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dataHora = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `ACBCSJ_Senhas_Acessos_${dataHora}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    mostrarToastSucesso('Backup CSV baixado com sucesso!');
}

// Funções auxiliares de escape de strings para HTML e JS
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeJsString(text) {
    if (!text) return '';
    return String(text)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
}

// Exportações globais para compatibilidade total
window.renderSenhasAcessos = renderSenhasAcessos;
window.abrirModalNovoAcessoSenha = abrirModalNovoAcessoSenha;
window.abrirModalEditarSenha = abrirModalEditarSenha;
window.salvarSenhaAcesso = salvarSenhaAcesso;
window.confirmarExcluirSenha = confirmarExcluirSenha;
window.copiarCredencial = copiarCredencial;
window.toggleMostrarSenhaUnica = toggleMostrarSenhaUnica;
window.toggleMostrarTodasSenhas = toggleMostrarTodasSenhas;
window.alternarModoVisualizacaoSenhas = alternarModoVisualizacaoSenhas;
window.onSearchSenhasInput = onSearchSenhasInput;
window.onFilterCategoriaSenhas = onFilterCategoriaSenhas;
window.onFilterStatusSenhas = onFilterStatusSenhas;
window.limparFiltrosSenhas = limparFiltrosSenhas;
window.gerarSenhaAleatoria = gerarSenhaAleatoria;
window.toggleVisibilidadeSenhaModal = toggleVisibilidadeSenhaModal;
window.exportarBackupSenhas = exportarBackupSenhas;
