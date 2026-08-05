// LÓGICA PRINCIPAL DO SISTEMA ACBCSJ (SPA & PAINÉIS)

// MOCK DATA INICIAL (Popula o sistema no primeiro acesso de teste)
const MOCK_DATA_INITIAL = {
    associados: [
        { id: '1', cpf: '000.000.000-00', nome: 'Comandante da Diretoria', email: 'diretoria@acbcsj.org.br', telefone: '(48) 99999-0001', perfil: 'diretoria', status: 'ativo', data_cadastro: '2021-01-15' },
        { id: '2', cpf: '111.111.111-11', nome: 'Sgt. Carlos Andrade', email: 'carlos.andrade@gmail.com', telefone: '(48) 98888-1234', perfil: 'associado', status: 'ativo', data_cadastro: '2022-03-10' },
        { id: '3', cpf: '222.222.222-22', nome: 'Dra. Mariana Silva', email: 'mariana.silva@hotmail.com', telefone: '(48) 97777-5678', perfil: 'associado', status: 'ativo', data_cadastro: '2023-05-20' },
        { id: '4', cpf: '333.333.333-33', nome: 'Roberto Fernandes', email: 'roberto@empresa.com.br', telefone: '(48) 99666-4321', perfil: 'associado', status: 'pendente', data_cadastro: '2026-08-01' }
    ],
    financeiro: [
        { id: 'f1', tipo: 'receita', descricao: 'Mensalidades de Associados - Julho', valor: 4500.00, categoria: 'Mensalidades', fornecedor_cliente: 'Associados', data_lancamento: '2026-07-30' },
        { id: 'f2', tipo: 'despesa', descricao: 'Manutenção de Equipamentos de Resgate', valor: 1200.00, categoria: 'Manutenção', fornecedor_cliente: 'Serviços de Segurança LTDA', data_lancamento: '2026-08-01' },
        { id: 'f3', tipo: 'despesa', descricao: 'Contabilidade e Assessoria Jurídica', valor: 800.00, categoria: 'Administrativo', fornecedor_cliente: 'Contabilidade São José', data_lancamento: '2026-08-02' },
        { id: 'f4', tipo: 'receita', descricao: 'Doação Institucional para Equipamentos', valor: 3000.00, categoria: 'Doações', fornecedor_cliente: 'Empresas Unidas SJ', data_lancamento: '2026-08-03' }
    ],
    mensalidades: [
        { id: 'm1', associado_cpf: '111.111.111-11', mes: '2026-07', valor: 50.00, status: 'pago', data_pagamento: '2026-07-10' },
        { id: 'm2', associado_cpf: '111.111.111-11', mes: '2026-08', valor: 50.00, status: 'pendente', data_pagamento: '-' },
        { id: 'm3', associado_cpf: '222.222.222-22', mes: '2026-08', valor: 50.00, status: 'pago', data_pagamento: '2026-08-02' }
    ],
    documentos: [
        { id: 'd1', titulo: 'Estatuto Social Reformulado 2024', categoria: 'Estatuto', data: '2024-01-10', link: '#' },
        { id: 'd2', titulo: 'Ata da Assembleia Geral Ordinária #42', categoria: 'Ata', data: '2026-06-15', link: '#' },
        { id: 'd3', titulo: 'Balancete Consolidado 1º Semestre 2026', categoria: 'Balancete', data: '2026-07-05', link: '#' }
    ],
    programacao: [
        { id: 'p1', titulo: 'Treinamento Geral de Primeiros Socorros', data: '2026-08-20', local: 'Sede ACBCSJ', status: 'agendado' },
        { id: 'p2', titulo: 'Assembleia Trimestral de Prestação de Contas', data: '2026-09-10', local: 'Auditório Central', status: 'agendado' }
    ],
    mensagens: [
        { id: 'msg1', associado_nome: 'Sgt. Carlos Andrade', assunto: 'Sugestão de Treinamento Comunitário', conteudo: 'Gostaria de propor um curso básico para moradores do bairro Barreiros.', data: '2026-08-02', status: 'pendente' }
    ]
};

// ESTADO DA APLICAÇÃO
let currentUser = null;
let currentChart = null;

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    setupCPFMasks();
    setupNavigation();
});

function initMockData() {
    if (!localStorage.getItem('acbcsj_associados')) {
        localStorage.setItem('acbcsj_associados', JSON.stringify(MOCK_DATA_INITIAL.associados));
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(MOCK_DATA_INITIAL.financeiro));
        localStorage.setItem('acbcsj_mensalidades', JSON.stringify(MOCK_DATA_INITIAL.mensalidades));
        localStorage.setItem('acbcsj_documentos', JSON.stringify(MOCK_DATA_INITIAL.documentos));
        localStorage.setItem('acbcsj_programacao', JSON.stringify(MOCK_DATA_INITIAL.programacao));
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(MOCK_DATA_INITIAL.mensagens));
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

// AUTENTICAÇÃO E LOGIN
function loginWithCPF(cpf, password, roleHint = null) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    
    // Se for teste direto via atalho
    if (roleHint === 'diretoria') {
        currentUser = list.find(a => a.perfil === 'diretoria') || MOCK_DATA_INITIAL.associados[0];
    } else if (roleHint === 'associado') {
        currentUser = list.find(a => a.perfil === 'associado' && a.status === 'ativo') || MOCK_DATA_INITIAL.associados[1];
    } else {
        const found = list.find(a => a.cpf === cpf);
        if (!found) {
            alert('CPF não encontrado ou cadastro pendente de aprovação pela Diretoria.');
            return;
        }
        currentUser = found;
    }

    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appDashboard').style.display = 'flex';
    
    renderUserHeader();
    renderSidebarMenu();
    navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
}

function logout() {
    currentUser = null;
    document.getElementById('appDashboard').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
}

// RENDERIZAÇÃO DO CABEÇALHO DO USUÁRIO
function renderUserHeader() {
    document.getElementById('headerUserName').textContent = currentUser.nome;
    const badge = document.getElementById('headerUserRole');
    badge.textContent = currentUser.perfil.toUpperCase();
    badge.className = `user-role-badge role-${currentUser.perfil}`;
}

// MENU LATERAL DINÂMICO CONFORME PERFIL
function renderSidebarMenu() {
    const menuNav = document.getElementById('sidebarNav');
    menuNav.innerHTML = '';

    if (currentUser.perfil === 'diretoria') {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-diretoria')">📊 Painel Geral</div>
            <div class="nav-item" onclick="navigateTab('gestao-associados')">👥 Controle de Associados</div>
            <div class="nav-item" onclick="navigateTab('gestao-financeira')">💰 Lançamentos Financeiros</div>
            <div class="nav-item" onclick="navigateTab('documentos-diretoria')">📑 Publicar Documentos</div>
            <div class="nav-item" onclick="navigateTab('mensagens-diretoria')">📬 Caixa de Mensagens</div>
        `;
    } else {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-associado')">🏠 Meu Painel</div>
            <div class="nav-item" onclick="navigateTab('balancetes-associado')">📈 Balancetes & Contas</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📁 Documentos & Convites</div>
            <div class="nav-item" onclick="navigateTab('enviar-mensagem')">💬 Fale com a Diretoria</div>
        `;
    }
}

// NAVEGAÇÃO ENTRE ABAS
function navigateTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.style.display = 'block';

    // Destacar item de menu ativo
    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(tabId));
    if (activeNav) activeNav.classList.add('active');

    // Executar atualizações de tela específicas
    if (tabId === 'overview-diretoria') renderDiretoriaOverview();
    if (tabId === 'gestao-associados') renderGestaoAssociados();
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
    if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    if (tabId === 'documentos-associado' || tabId === 'documentos-diretoria') renderDocumentos();
    if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}

// LÓGICA DA DIRETORIA: PAINEL GERAL E TABELAS
function renderDiretoriaOverview() {
    const associados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const pendentes = associados.filter(a => a.status === 'pendente');

    document.getElementById('metricTotalAssociados').textContent = associados.filter(a => a.status === 'ativo').length;
    document.getElementById('metricCadastrosPendentes').textContent = pendentes.length;

    const totalReceitas = financeiro.filter(f => f.tipo === 'receita').reduce((sum, item) => sum + Number(item.valor), 0);
    const totalDespesas = financeiro.filter(f => f.tipo === 'despesa').reduce((sum, item) => sum + Number(item.valor), 0);
    const saldo = totalReceitas - totalDespesas;

    document.getElementById('metricSaldoCaixa').textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Tabela de aprovação rápida
    const container = document.getElementById('tablePendentesBody');
    if (container) {
        if (pendentes.length === 0) {
            container.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Nenhuma solicitação de pré-cadastro pendente.</td></tr>`;
        } else {
            container.innerHTML = pendentes.map(p => `
                <tr>
                    <td><b>${p.nome}</b></td>
                    <td>${p.cpf}</td>
                    <td>${p.telefone || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="aprovarAssociado('${p.cpf}')">Aprovar</button>
                        <button class="btn btn-sm btn-outline" onclick="rejeitarAssociado('${p.cpf}')">Rejeitar</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function renderGestaoAssociados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const container = document.getElementById('tableTodosAssociadosBody');
    if (container) {
        container.innerHTML = list.map(a => `
            <tr>
                <td><b>${a.nome}</b></td>
                <td>${a.cpf}</td>
                <td>${a.email || '-'}</td>
                <td><span class="badge badge-${a.perfil === 'diretoria' ? 'warning' : 'info'}">${a.perfil.toUpperCase()}</span></td>
                <td><span class="badge badge-${a.status === 'ativo' ? 'success' : 'danger'}">${a.status.toUpperCase()}</span></td>
                <td>
                    ${a.cpf !== currentUser.cpf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="excluirAssociado('${a.cpf}')">Excluir</button>` : '<small style="color:var(--text-muted)">Você</small>'}
                </td>
            </tr>
        `).join('');
    }
}

function aprovarAssociado(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (item) {
        item.status = 'ativo';
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);
        alert(`Associado ${item.nome} aprovado com sucesso!`);
        renderDiretoriaOverview();
    }
}

function excluirAssociado(cpf) {
    if (confirm('Tem certeza que deseja excluir este associado do sistema? Esta ação é permanente.')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.deleteAssociado(cpf);
        alert('Associado removido.');
        renderGestaoAssociados();
        renderDiretoriaOverview();
    }
}

// LÓGICA DO ASSOCIADO & GRÁFICOS
function renderAssociadoOverview() {
    document.getElementById('associadoWelcomeName').textContent = currentUser.nome;
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
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const totalReceitas = financeiro.filter(f => f.tipo === 'receita').reduce((sum, i) => sum + Number(i.valor), 0);
    const totalDespesas = financeiro.filter(f => f.tipo === 'despesa').reduce((sum, i) => sum + Number(i.valor), 0);

    const ctx = document.getElementById('chartBalancete');
    if (ctx && typeof Chart !== 'undefined') {
        if (currentChart) currentChart.destroy();
        currentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Entradas / Receitas', 'Saídas / Despesas'],
                datasets: [{
                    data: [totalReceitas, totalDespesas],
                    backgroundColor: ['#2ECC71', '#E74C3C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#F4F5F7' } }
                }
            }
        });
    }
}

function renderDocumentos() {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const containers = [document.getElementById('listDocsAssociado'), document.getElementById('listDocsDiretoria')];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = docs.map(d => `
                <div style="display:flex; justify-between; align-items:center; padding:12px; border-bottom:1px solid var(--border-color)">
                    <div>
                        <b>${d.titulo}</b> <small style="color:var(--accent-gold); margin-left:8px">[${d.categoria}]</small>
                        <div style="font-size:11px; color:var(--text-muted)">Publicado em: ${d.data}</div>
                    </div>
                    <a href="${d.link}" class="btn btn-sm btn-outline">Visualizar / Download</a>
                </div>
            `).join('');
        }
    });
}

function renderMensagensDiretoria() {
    const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    const container = document.getElementById('listMensagensDiretoria');
    if (container) {
        if (msgs.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted)">Nenhuma mensagem ou ideia enviada recentemente.</p>`;
        } else {
            container.innerHTML = msgs.map(m => `
                <div class="card">
                    <div style="display:flex; justify-content:space-between">
                        <b>${m.assunto}</b>
                        <small style="color:var(--text-muted)">${m.data}</small>
                    </div>
                    <div style="font-size:12px; color:var(--accent-gold); margin-bottom:8px">Por: ${m.associado_nome}</div>
                    <p style="font-size:13px">${m.conteudo}</p>
                </div>
            `).join('');
        }
    }
}

// PRÉ-CADASTRO E ENVIOS
function submitPreCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('regNome').value;
    const cpf = document.getElementById('regCPF').value;
    const email = document.getElementById('regEmail').value;
    const telefone = document.getElementById('regTelefone').value;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (list.find(a => a.cpf === cpf)) {
        alert('Este CPF já possui cadastro no sistema.');
        return;
    }

    const novo = { id: Date.now().toString(), cpf, nome, email, telefone, perfil: 'associado', status: 'pendente', data_cadastro: new Date().toISOString().split('T')[0] };
    list.push(novo);
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));
    dbService.saveAssociado(novo);

    alert('Solicitação enviada com sucesso! A Diretoria da ACBCSJ analisará seu pedido em breve.');
    closeModal('modalPreCadastro');
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
