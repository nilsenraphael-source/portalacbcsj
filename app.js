// SISTEMA ACBCSJ - ASSOCIA�?�fO CORPO DE BOMBEIROS COMUNITÁRIOS DE S�fO JOS�?

// MOCK DATA INICIAL E DECLARA�?�.ES GLOBAIS
const MOCK_DATA_INITIAL = {
    associados: [
        { id: '1', cpf: '000.000.000-00', senha: '123', nome: 'Diretoria ACBCSJ', nome_guerra: 'Diretoria', perfil: 'diretoria', status: 'ativo', obm: 'São José', profissao: 'Diretoria' },
        { id: '2', cpf: '111.111.111-11', senha: '123', nome: 'Sd. Silva (Exemplo)', nome_guerra: 'Sd. Silva', perfil: 'associado', status: 'ativo', obm: 'São José', profissao: 'Bombeiro Comunitário' }
    ],
    financeiro: [],
    mensalidades: [
        { id: 'm1', associado_cpf: '111.111.111-11', mes: 'Janeiro/2026', valor: 20.00, status: 'pago', data_pagamento: '05/01/2026' },
        { id: 'm2', associado_cpf: '111.111.111-11', mes: 'Fevereiro/2026', valor: 20.00, status: 'pago', data_pagamento: '02/02/2026' }
    ],
    documentos: [
        { id: 'doc_1', titulo: 'Estatuto Social da ACBCSJ', categoria: 'Documentos Oficiais', visibilidade: 'todos', data: '15/01/2026', link: null, arquivo_nome: 'Estatuto_ACBCSJ.pdf' },
        { id: 'doc_2', titulo: 'Ata da Reunião de Posse 2026', categoria: 'Atas', visibilidade: 'todos', data: '20/01/2026', link: null, arquivo_nome: 'Ata_Posse_2026.pdf' }
    ],
    programacao: [],
    mensagens: []
};

let currentUser = null;
let currentChart = null;

// ARMAZENAMENTO ILIMITADO DE ARQUIVOS VIA INDEXEDDB (SEM O LIMITE DE 5MB DO LOCALSTORAGE)
const idbStorage = {
    dbName: 'ACBCSJ_IndexedDB',
    version: 1,
    db: null,
    async getDB() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, this.version);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('files')) {
                    db.createObjectStore('files');
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = (e) => reject(e.target.error);
        });
    },
    async setFile(id, content) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                store.put(content, id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error('Erro no IndexedDB:', e);
            return false;
        }
    },
    async getFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction('files', 'readonly');
                const store = tx.objectStore('files');
                const req = store.get(id);
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            });
        } catch (e) {
            return null;
        }
    },
    async deleteFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                store.delete(id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            return false;
        }
    }
};

// INICIALIZA�?�fO
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    setupCPFMasks();
    setupNavigation();
});

function initMockData() {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    
    const needsReset = list.length === 0 || list.some(a => (a.obm && a.obm.includes('�f')) || (a.cidade && a.cidade.includes('�f')) || (a.nome && a.nome.includes('�f')));

    if (needsReset) {
        list = [...MOCK_DATA_INITIAL.associados];
    }

    if (typeof ASSOCIADOS_EXCEL_IMPORT !== 'undefined' && Array.isArray(ASSOCIADOS_EXCEL_IMPORT)) {
        ASSOCIADOS_EXCEL_IMPORT.forEach(socio => {
            const index = list.findIndex(a => a.cpf === socio.cpf);
            if (index >= 0) {
                list[index] = { ...list[index], ...socio };
            } else {
                list.push(socio);
            }
        });
    }

    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    // ZERA TODOS OS LAN�?AMENTOS FINANCEIROS CONFORME SOLICITA�?�fO
    localStorage.setItem('acbcsj_financeiro', JSON.stringify([]));
    localStorage.setItem('acbcsj_mensalidades', JSON.stringify(MOCK_DATA_INITIAL.mensalidades));
    localStorage.setItem('acbcsj_programacao', JSON.stringify(MOCK_DATA_INITIAL.programacao));
    localStorage.setItem('acbcsj_mensagens', JSON.stringify(MOCK_DATA_INITIAL.mensagens));
    localStorage.removeItem('acbcsj_mensalidades_grid');

    let storedDocs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    if (storedDocs.length > 0) {
        let cleaned = false;
        storedDocs.forEach(d => {
            if (d.link && d.link.startsWith('data:')) {
                idbStorage.setFile(d.id, d.link);
                d.link = null;
                cleaned = true;
            }
        });
        if (cleaned) {
            try {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(storedDocs));
            } catch (err) {
                console.warn('Concluída limpeza do localStorage');
            }
        }
    } else {
        localStorage.setItem('acbcsj_documentos', JSON.stringify(MOCK_DATA_INITIAL.documentos));
    }
}

// MÁSCARA AUTOMÁTICA DE CPF
function setupCPFMasks() {
    const cpfInputs = document.querySelectorAll('.cpf-mask');
    cpfInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.substring(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
        });
    });
}

// AUTENTICA�?�fO E LOGIN
function loginWithCPF(cpf, password, roleHint = null) {
    try {
        const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || (typeof MOCK_DATA_INITIAL !== 'undefined' ? MOCK_DATA_INITIAL.associados : []);
        
        if (roleHint === 'diretoria') {
            currentUser = list.find(a => a.perfil === 'diretoria' && a.status === 'ativo') || (typeof MOCK_DATA_INITIAL !== 'undefined' ? MOCK_DATA_INITIAL.associados[0] : null);
        } else if (roleHint === 'associado') {
            currentUser = list.find(a => a.perfil === 'associado' && a.status === 'ativo') || (typeof MOCK_DATA_INITIAL !== 'undefined' ? MOCK_DATA_INITIAL.associados[1] : null);
        } else {
            const cleanInputCPF = (cpf || '').replace(/\D/g, '');
            const found = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanInputCPF || a.cpf === cpf);
            
            if (!found) {
                alert('CPF não encontrado no sistema da ACBCSJ. Verifique os números digitados ou faça sua solicitação de pré-cadastro.');
                return;
            }

            if (found.status === 'pendente') {
                alert('�s�️ ACESSO BLOQUEADO!\n\nSua solicitação de cadastro ainda está em análise pela Diretoria da ACBCSJ. Aguarde a aprovação para conseguir logar.');
                return;
            }

            if (found.status === 'desligado') {
                alert('�Ys� ACESSO TOTALMENTE BLOQUEADO!\n\nEste cadastro consta como DESLIGADO da Associação Corpo de Bombeiros Comunitários de São José.\nIntegrantes desligados não possuem permissão de acesso ao sistema.');
                return;
            }

            const apenasNumerosCPF = (found.cpf || '').replace(/\D/g, '');
            const senhaEsperada = (found.senha || apenasNumerosCPF.substring(0, 4)).trim();

            if (password && password.trim() !== senhaEsperada) {
                alert("Senha incorreta.\n\nLembre-se que sua senha inicial de acesso são os 4 primeiros dígitos numéricos do seu CPF (" + senhaEsperada + ").");
                return;
            }

            currentUser = found;
        }

        if (!currentUser) {
            alert('Não foi possível carregar os dados do usuário. Tente novamente.');
            return;
        }

        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('appDashboard').style.display = 'flex';
        
        renderUserHeader();
        renderSidebarMenu();
        navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
    } catch (err) {
        console.error('Erro ao efetuar login:', err);
        alert('Ocorreu um erro ao carregar os dados de login.');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('appDashboard').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
}

// RENDERIZA�?�fO DO CABE�?ALHO DO USUÁRIO
function renderUserHeader() {
    document.getElementById('headerUserName').textContent = currentUser.nome;
    const badge = document.getElementById('headerUserRole');
    badge.textContent = currentUser.perfil.toUpperCase();
    badge.className = `user-role-badge role-${currentUser.perfil}`;
}

// MENU LATERAL DIN�,MICO CONFORME PERFIL
function renderSidebarMenu() {
    const menuNav = document.getElementById('sidebarNav');
    if (!menuNav) return;
    menuNav.innerHTML = '';

    if (currentUser.perfil === 'diretoria') {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-diretoria')">�Y"S Painel Geral</div>
            <div class="nav-item" onclick="navigateTab('gestao-associados')">�Y'� Controle de Associados</div>
            <div class="nav-item" onclick="navigateTab('associados-desligados')">�Y"< Associados Desligados</div>
            <div class="nav-item" onclick="navigateTab('gestao-financeira')">�Y'� Lançamentos Financeiros</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">�Y"' Documentos & Atas</div>
            <div class="nav-item" onclick="navigateTab('mensagens-diretoria')">�Y"� Caixa de Mensagens</div>
        `;
    } else {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-associado')">�Y�� Meu Painel</div>
            <div class="nav-item" onclick="navigateTab('balancetes-associado')">�Y"^ Balancetes & Contas</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">�Y"� Documentos & Convites</div>
            <div class="nav-item" onclick="navigateTab('enviar-mensagem')">�Y'� Fale com a Diretoria</div>
        `;
    }
}

// NAVEGA�?�fO ENTRE ABAS
function navigateTab(tabId) {
    if (currentUser) {
        const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const currentDbState = list.find(a => a.cpf === currentUser.cpf);
        if (currentDbState && currentDbState.status === 'desligado') {
            alert('�Ys� ACESSO REVOGADO!\n\nSeu cadastro consta como DESLIGADO da Associação. Você foi desconectado do sistema.');
            logout();
            return;
        }
    }

    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.style.display = 'block';

    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(tabId));
    if (activeNav) activeNav.classList.add('active');

    if (tabId === 'overview-diretoria') renderDiretoriaOverview();
    if (tabId === 'gestao-associados') renderGestaoAssociados();
    if (tabId === 'associados-desligados') renderAssociadosDesligados();
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
    if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    if (tabId === 'documentos-associado' || tabId === 'documentos-diretoria') renderDocumentos();
    if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}

// L�"GICA DA DIRETORIA: PAINEL GERAL E TABELAS
function renderDiretoriaOverview() {
    const associados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const pendentes = associados.filter(a => a.status === 'pendente');

    const selectAno = document.getElementById('diretoriaFiltroAno');
    const anoFiltro = selectAno ? selectAno.value : '2026';

    document.querySelectorAll('.lblAnoSelecionado').forEach(el => {
        el.textContent = anoFiltro === 'todos' ? 'Todos' : anoFiltro;
    });

    const totalAtivos = associados.filter(a => a.status === 'ativo').length;
    document.getElementById('metricTotalAssociados').textContent = totalAtivos;

    const novosNoAno = associados.filter(a => {
        if (!a.data_cadastro) return false;
        return anoFiltro === 'todos' || a.data_cadastro.includes(anoFiltro);
    }).length;
    const elNovos = document.getElementById('metricNovosAno');
    if (elNovos) elNovos.textContent = novosNoAno;

    const desligadosNoAno = associados.filter(a => {
        if (a.status !== 'desligado') return false;
        if (anoFiltro === 'todos') return true;
        const emData = a.data_desligamento && a.data_desligamento.includes(anoFiltro);
        const emMotivo = a.motivo_desligamento && a.motivo_desligamento.includes(anoFiltro);
        const emCadastro = a.data_cadastro && a.data_cadastro.includes(anoFiltro);
        return emData || emMotivo || emCadastro;
    }).length;
    const elDesligados = document.getElementById('metricDesligadosAno');
    if (elDesligados) elDesligados.textContent = desligadosNoAno;

    let totalReceitas = 0;
    financeiro.filter(f => f.tipo === 'receita').forEach(f => totalReceitas += Number(f.valor));
    document.getElementById('metricSaldoFinanceiro').textContent = `R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const elPendenteCount = document.getElementById('metricNovasSolicitacoes');
    if (elPendenteCount) elPendenteCount.textContent = pendentes.length;

    const containerPendentes = document.getElementById('tableSolicitacoesPendentesBody');
    if (containerPendentes) {
        if (pendentes.length === 0) {
            containerPendentes.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma solicitação pendente no momento.</td></tr>`;
        } else {
            containerPendentes.innerHTML = pendentes.map(p => `
                <tr>
                    <td><b>${p.nome_guerra || p.nome}</b><br><small style="color:var(--text-muted)">${p.nome}</small></td>
                    <td>${p.cpf}</td>
                    <td>${p.obm || '-'}</td>
                    <td>${p.data_cadastro || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-gold" onclick="aprovarAssociado('${p.cpf}')">Aprovar</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="rejeitarAssociado('${p.cpf}')">Recusar</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    renderGraficoDiretoria(associados, financeiro);
}

function renderGraficoDiretoria(associados, financeiro) {
    const ctx = document.getElementById('chartGeralDiretoria');
    if (!ctx) return;

    if (currentChart) {
        currentChart.destroy();
    }

    const ativos = associados.filter(a => a.status === 'ativo').length;
    const pendentes = associados.filter(a => a.status === 'pendente').length;
    const desligados = associados.filter(a => a.status === 'desligado').length;

    currentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Associados Ativos', 'Solicitações Pendentes', 'Desligados'],
            datasets: [{
                data: [ativos, pendentes, desligados],
                backgroundColor: ['#D4AF37', '#F39C12', '#E74C3C'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#E0E0E0', font: { family: 'Inter' } }
                }
            }
        }
    });
}

function aprovarAssociado(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (item) {
        item.status = 'ativo';
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);
        alert(`Pré-cadastro de ${item.nome} aprovado com sucesso!`);
        renderDiretoriaOverview();
        renderGestaoAssociados();
    }
}

function rejeitarAssociado(cpf) {
    if (confirm('Deseja realmente recusar esta solicitação de cadastro?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.deleteAssociado(cpf);
        alert('Solicitação recusada e removida.');
        renderDiretoriaOverview();
    }
}

// GEST�fO DE ASSOCIADOS
function renderGestaoAssociados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = list.filter(a => a.status === 'ativo');
    const container = document.getElementById('tableAssociadosBody');
    const isDiretoria = currentUser && currentUser.perfil === 'diretoria';

    if (container) {
        if (ativos.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum associado ativo cadastrado.</td></tr>`;
        } else {
            container.innerHTML = ativos.map(a => {
                const isSelf = currentUser && a.cpf === currentUser.cpf;
                let perfilControl = `<span class="badge badge-info">${a.perfil ? a.perfil.toUpperCase() : 'ASSOCIADO'}</span>`;

                if (isDiretoria) {
                    perfilControl = `
                        <select class="form-control" style="padding: 4px 8px; font-size: 12px; font-weight: 600; width: 130px; ${a.perfil === 'diretoria' ? 'border-color: var(--accent-gold); color: var(--accent-gold);' : ''}" 
                                ${isSelf ? 'disabled title="Você não pode alterar seu próprio perfil de Diretoria."' : ''} 
                                onchange="alterarPerfilAssociado('${a.cpf}', this.value)">
                            <option value="associado" ${a.perfil === 'associado' ? 'selected' : ''}>ASSOCIADO</option>
                            <option value="diretoria" ${a.perfil === 'diretoria' ? 'selected' : ''}>DIRETORIA</option>
                        </select>
                    `;
                }

                return `
                    <tr>
                        <td><b>${a.nome_guerra || a.nome}</b><br><small style="color:var(--text-muted)">${a.nome}</small></td>
                        <td>${a.cpf}</td>
                        <td>${a.telefone || a.email || '-'}</td>
                        <td>${perfilControl}</td>
                        <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">�Y"< Ver Ficha Completa</button></td>
                        <td>
                            ${!isSelf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="abrirModalDesligar('${a.cpf}')">Desligar Associado</button>` : '<small style="color:var(--text-muted)">Você (Diretoria)</small>'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

function alterarPerfilAssociado(cpf, novoPerfil) {
    if (!currentUser || currentUser.perfil !== 'diretoria') {
        alert('Apenas membros da Diretoria possuem permissão para alterar o perfil de integrantes.');
        renderGestaoAssociados();
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);

    if (item) {
        const perfilAnterior = item.perfil;
        item.perfil = novoPerfil;

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        alert(`Perfil do integrante ${item.nome_guerra || item.nome} alterado com sucesso de ${perfilAnterior.toUpperCase()} para ${novoPerfil.toUpperCase()}.`);
        renderGestaoAssociados();
        renderDiretoriaOverview();
    }
}

function renderAssociadosDesligados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const desligados = list.filter(a => a.status === 'desligado');
    const container = document.getElementById('tableAssociadosDesligadosBody');
    if (container) {
        if (desligados.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum associado desligado registrado no sistema.</td></tr>`;
        } else {
            container.innerHTML = desligados.map(d => `
                <tr>
                    <td><b>${d.nome_guerra || d.nome}</b><br><small style="color:var(--text-muted)">${d.nome}</small></td>
                    <td>${d.cpf}</td>
                    <td><small style="color:#FF6B6B;">${d.data_desligamento || '-'}</small></td>
                    <td>
                        <span style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">${d.motivo_desligamento || 'Não especificado'}</span>
                        ${d.carta_desligamento_url ? `
                            <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 8px; color:var(--accent-gold); border-color:var(--accent-gold)" onclick="abrirCartaDesligamento('${d.cpf}')">
                                �Y"< Ver Carta de Desligamento
                            </button>
                        ` : '<small style="color:#FF6B6B; font-style:italic;">Sem carta anexada</small>'}
                    </td>
                    <td>
                        <button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${d.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#2ECC71; border-color:#2ECC71" onclick="reativarAssociado('${d.cpf}')">Reativar</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="excluirAssociado('${d.cpf}')">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function abrirModalDesligar(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (!item) return;

    document.getElementById('desligarCPF').value = cpf;
    document.getElementById('desligarNomeTarget').textContent = item.nome_guerra || item.nome;
    document.getElementById('desligarData').value = new Date().toISOString().split('T')[0];
    document.getElementById('desligarMotivo').value = '';
    document.getElementById('desligarCartaFile').value = '';

    openModal('modalDesligarAssociado');
}

function confirmarDesligamento(e) {
    e.preventDefault();
    const cpf = document.getElementById('desligarCPF').value;
    const data = document.getElementById('desligarData').value;
    const motivo = document.getElementById('desligarMotivo').value.trim();
    const fileInput = document.getElementById('desligarCartaFile');
    const file = fileInput.files ? fileInput.files[0] : null;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (!item) return;

    const [ano, mes, dia] = data.split('-');
    const dataBR = `${dia}/${mes}/${ano}`;

    const concluirDesligamento = async (cartaUrl = null) => {
        item.status = 'desligado';
        item.data_desligamento = dataBR;
        item.motivo_desligamento = motivo || 'Desligamento a pedido ou administrativo';

        if (cartaUrl) {
            await idbStorage.setFile(`carta_${cpf}`, cartaUrl);
            item.carta_desligamento_url = true;
        }

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        if (currentUser && currentUser.cpf === cpf) {
            alert('�Ys� Seu cadastro foi desligado. Você será desconectado do sistema.');
            logout();
        } else {
            alert(`Associado ${item.nome_guerra || item.nome} desligado com sucesso.`);
            closeModal('modalDesligarAssociado');
            renderGestaoAssociados();
            renderAssociadosDesligados();
            renderDiretoriaOverview();
        }
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            concluirDesligamento(event.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        concluirDesligamento();
    }
}

async function abrirCartaDesligamento(cpf) {
    const fileContent = await idbStorage.getFile(`carta_${cpf}`);
    if (!fileContent) {
        alert('Carta de desligamento não encontrada para este associado.');
        return;
    }
    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Carta de Desligamento - ACBCSJ</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${fileContent}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    }
}

function reativarAssociado(cpf) {
    if (confirm('Deseja realmente reativar este associado no sistema da ACBCSJ?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'ativo';
            item.data_desligamento = null;
            item.motivo_desligamento = null;
            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);
            alert(`Associado ${item.nome_guerra || item.nome} reativado com sucesso.`);
            renderAssociadosDesligados();
            renderGestaoAssociados();
            renderDiretoriaOverview();
        }
    }
}

function excluirAssociado(cpf) {
    if (confirm('Deseja realmente excluir permanentemente este registro de associado?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.deleteAssociado(cpf);
        alert('Associado removido com sucesso.');
        renderGestaoAssociados();
        renderAssociadosDesligados();
        renderDiretoriaOverview();
    }
}

// L�"GICA DO ASSOCIADO & GRÁFICOS
function renderAssociadoOverview() {
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome && currentUser) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }
    const mensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades')) || [];
    const minhas = mensalidades.filter(m => m.associado_cpf === currentUser.cpf);

    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (container) {
        if (minhas.length === 0) {
            container.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Nenhuma mensalidade registrada para o seu CPF até o momento.</td></tr>`;
        } else {
            container.innerHTML = minhas.map(m => `
                <tr>
                    <td>${m.mes}</td>
                    <td>R$ ${Number(m.valor).toFixed(2)}</td>
                    <td><span class="badge badge-${m.status === 'pago' ? 'success' : 'warning'}">${m.status.toUpperCase()}</span></td>
                    <td>${m.data_pagamento || '-'}</td>
                </tr>
            `).join('');
        }
    }
}

function renderBalancetesAssociado() {
    const ctx = document.getElementById('chartBalanceteAssociado');
    if (!ctx) return;

    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    let totalReceitas = 0;
    let totalDespesas = 0;

    financeiro.forEach(f => {
        if (f.tipo === 'receita') totalReceitas += Number(f.valor);
        else totalDespesas += Number(f.valor);
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Arrecadado', 'Total de Despesas'],
            datasets: [{
                label: 'Valores em R$',
                data: [totalReceitas, totalDespesas],
                backgroundColor: ['#2ECC71', '#E74C3C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { ticks: { color: '#E0E0E0' } },
                x: { ticks: { color: '#E0E0E0' } }
            }
        }
    });
}

function renderGestaoFinanceira() {
    const list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const container = document.getElementById('tableFinanceiroBody');
    let totalReceitas = 0;
    let totalDespesas = 0;

    list.forEach(f => {
        if (f.tipo === 'receita') totalReceitas += Number(f.valor);
        else totalDespesas += Number(f.valor);
    });

    const saldo = totalReceitas - totalDespesas;

    const elReceita = document.getElementById('finTotalReceitas');
    const elDespesa = document.getElementById('finTotalDespesas');
    const elSaldo = document.getElementById('finSaldoAtual');

    if (elReceita) elReceita.textContent = `R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDespesa) elDespesa.textContent = `R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSaldo) {
        elSaldo.textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSaldo.style.color = saldo >= 0 ? 'var(--accent-gold)' : '#E74C3C';
    }

    if (container) {
        if (list.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum lançamento registrado.</td></tr>`;
        } else {
            container.innerHTML = list.map(f => `
                <tr>
                    <td>${f.data}</td>
                    <td>${f.descricao}</td>
                    <td><span class="badge badge-info">${f.categoria}</span></td>
                    <td><span class="badge badge-${f.tipo === 'receita' ? 'success' : 'danger'}">${f.tipo.toUpperCase()}</span></td>
                    <td style="font-weight: 700; color: ${f.tipo === 'receita' ? '#2ECC71' : '#E74C3C'};">R$ ${Number(f.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>-</td>
                </tr>
            `).join('');
        }
    }
}

function verFichaAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => (a.cpf || '').replace(/\D/g, '') === (cpf || '').replace(/\D/g, ''));
    if (!item) {
        alert('Ficha do associado não encontrada.');
        return;
    }

    const titleEl = document.getElementById('fichaNomeTitle');
    if (titleEl) {
        titleEl.textContent = `📋 Ficha Cadastral — ${item.nome_guerra || item.nome}`;
    }

    const container = document.getElementById('fichaContentBody');
    if (container) {
        container.innerHTML = `
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Nome de Guerra</span>
                <strong style="font-size: 16px; color: var(--accent-gold);">${item.nome_guerra || item.nome}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Nome Completo</span>
                <strong style="font-size: 14px; color: var(--text-color);">${item.nome || '-'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">CPF Registrado</span>
                <strong style="font-size: 14px;">${item.cpf || '-'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Telefone / WhatsApp</span>
                <strong style="font-size: 14px;">${item.telefone || 'Não informado'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">E-mail</span>
                <strong style="font-size: 14px;">${item.email || 'Não informado'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">OBM / Unidade</span>
                <strong style="font-size: 14px;">${item.obm || 'São José'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Status no Sistema</span>
                <span class="badge badge-${item.status === 'ativo' ? 'success' : (item.status === 'desligado' ? 'danger' : 'warning')}" style="font-size: 12px; padding: 4px 8px;">
                    ${(item.status || 'ativo').toUpperCase()}
                </span>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Perfil de Acesso</span>
                <span class="badge badge-info" style="font-size: 12px; padding: 4px 8px;">
                    ${(item.perfil || 'associado').toUpperCase()}
                </span>
            </div>
        `;
    }

    openModal('modalFichaAssociado');
}

function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.style.display = 'flex';
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.style.display = 'none';
}

function setupNavigation() {
    window.onclick = function(event) {
        if (event.target.classList.contains('modal-wrapper')) {
            event.target.style.display = 'none';
        }
    };
}