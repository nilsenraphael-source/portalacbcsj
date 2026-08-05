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
            alert('CPF não encontrado no sistema da ACBCSJ. Faça sua solicitação de pré-cadastro.');
            return;
        }

        if (found.status === 'pendente') {
            alert('Sua solicitação de cadastro ainda está em análise pela Diretoria da ACBCSJ.');
            return;
        }

        if (found.status === 'desligado') {
            alert('Este cadastro consta como desligado do sistema da ACBCSJ.');
            return;
        }

        // Validação de senha (se cadastrado com senha)
        if (found.senha && password && found.senha !== password) {
            alert('Senha incorreta. Por favor, verifique a senha digitada.');
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
            <div class="nav-item" onclick="navigateTab('associados-desligados')">📋 Associados Desligados</div>
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
    if (tabId === 'associados-desligados') renderAssociadosDesligados();
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
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma solicitação de pré-cadastro pendente.</td></tr>`;
        } else {
            container.innerHTML = pendentes.map(p => `
                <tr>
                    <td><b>${p.nome_guerra || p.nome}</b><br><small style="color:var(--text-muted)">${p.nome}</small></td>
                    <td>${p.cpf}</td>
                    <td>${p.telefone || '-'}</td>
                    <td><small style="color:var(--accent-gold);">${p.data_cadastro || '-'}</small></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="aprovarAssociado('${p.cpf}')">Aprovar</button>
                        <button class="btn btn-sm btn-outline" onclick="verFichaAssociado('${p.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C" onclick="abrirModalDesligar('${p.cpf}')">Rejeitar</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// EXIBIR APENAS ASSOCIADOS ATIVOS
function renderGestaoAssociados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = list.filter(a => a.status === 'ativo');
    const container = document.getElementById('tableTodosAssociadosBody');
    if (container) {
        if (ativos.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum associado ativo cadastrado.</td></tr>`;
        } else {
            container.innerHTML = ativos.map(a => `
                <tr>
                    <td><b>${a.nome_guerra || a.nome}</b><br><small style="color:var(--text-muted)">${a.nome}</small></td>
                    <td>${a.cpf}</td>
                    <td>${a.telefone || a.email || '-'}</td>
                    <td><span class="badge badge-${a.perfil === 'diretoria' ? 'warning' : 'info'}">${a.perfil.toUpperCase()}</span></td>
                    <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">📄 Ver Ficha Completa</button></td>
                    <td>
                        ${a.cpf !== currentUser.cpf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="abrirModalDesligar('${a.cpf}')">Desligar Associado</button>` : '<small style="color:var(--text-muted)">Você (Diretoria)</small>'}
                    </td>
                </tr>
            `).join('');
        }
    }
}

// EXIBIR ASSOCIADOS DESLIGADOS
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
                    <td><span style="font-size:12px; color:var(--text-muted);">${d.motivo_desligamento || 'Não especificado'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${d.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#2ECC71; border-color:#2ECC71" onclick="reativarAssociado('${d.cpf}')">Reativar</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// FICHA COMPLETA DO ASSOCIADO
function verFichaAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) {
        alert('Associado não encontrado.');
        return;
    }

    document.getElementById('fichaNomeTitle').textContent = `Ficha Cadastral: ${a.nome_guerra || a.nome}`;

    const body = document.getElementById('fichaContentBody');
    body.innerHTML = `
        <div style="grid-column: 1 / -1; background-color:#15181C; padding:12px; border-radius:6px; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <div><b>Status do Cadastro:</b> <span class="badge badge-${a.status === 'ativo' ? 'success' : (a.status === 'desligado' ? 'danger' : 'warning')}">${a.status.toUpperCase()}</span></div>
            <div style="font-size:11px; color:var(--text-muted)">Cadastrado em: <b>${a.data_cadastro || '-'}</b></div>
        </div>

        <div><b>Nome de Guerra:</b> ${a.nome_guerra || '-'}</div>
        <div><b>Nome Completo:</b> ${a.nome}</div>
        <div><b>CPF:</b> ${a.cpf}</div>
        <div><b>Data de Nascimento:</b> ${a.data_nascimento || '-'}</div>
        <div><b>Sexo:</b> ${a.sexo || '-'}</div>
        <div><b>Telefone / WhatsApp:</b> ${a.telefone || '-'}</div>
        
        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Filiação:</b></div>
        <div><b>Nome da Mãe:</b> ${a.nome_mae || '-'}</div>
        <div><b>Nome do Pai:</b> ${a.nome_pai || '-'}</div>

        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Endereço Residencial:</b></div>
        <div><b>Logradouro / Rua:</b> ${a.logradouro || '-'}, Nº ${a.numero || '-'}</div>
        <div><b>Complemento:</b> ${a.complemento || 'Nenhum'}</div>
        <div><b>CEP:</b> ${a.cep || '-'}</div>
        <div><b>Bairro:</b> ${a.bairro || '-'}</div>
        <div style="grid-column: 1 / -1;"><b>Cidade:</b> ${a.cidade || '-'}</div>

        ${a.status === 'desligado' ? `
            <div style="grid-column: 1 / -1; margin-top:10px; background-color:rgba(231,76,60,0.15); border:1px solid rgba(231,76,60,0.4); padding:12px; border-radius:6px; color:#FF6B6B;">
                <div><b>Data/Hora do Desligamento:</b> ${a.data_desligamento || '-'}</div>
                <div><b>Motivo do Desligamento:</b> ${a.motivo_desligamento || '-'}</div>
            </div>
        ` : ''}
    `;

    openModal('modalFichaAssociado');
}

// DESLIGAMENTO COM REGISTRO DE MOTIVO E DATA/HORA
function abrirModalDesligar(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    document.getElementById('desligarCPF').value = a.cpf;
    document.getElementById('desligarNomeDisplay').value = `${a.nome_guerra || a.nome} (${a.nome}) - CPF: ${a.cpf}`;
    document.getElementById('desligarMotivo').value = '';

    openModal('modalDesligarAssociado');
}

function confirmarDesligamento(e) {
    e.preventDefault();
    const cpf = document.getElementById('desligarCPF').value;
    const motivo = document.getElementById('desligarMotivo').value.trim();

    if (!motivo) {
        alert('Por favor, informe o motivo do desligamento.');
        return;
    }

    const agora = new Date();
    const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (item) {
        item.status = 'desligado';
        item.data_desligamento = dataHoraDesligamento;
        item.motivo_desligamento = motivo;

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        alert(`Associado ${item.nome_guerra || item.nome} foi desligado em ${dataHoraDesligamento}.\nOs dados foram mantidos na página "Associados Desligados".`);
        closeModal('modalDesligarAssociado');
        renderGestaoAssociados();
        renderDiretoriaOverview();
    }
}

function reativarAssociado(cpf) {
    if (confirm('Deseja reativar este associado no sistema? Ele voltará para a lista de Associados Ativos.')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'ativo';
            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);
            alert(`Associado ${item.nome_guerra || item.nome} foi reativado!`);
            renderAssociadosDesligados();
            renderGestaoAssociados();
            renderDiretoriaOverview();
        }
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
function toggleSemPai(checkbox) {
    const inputPai = document.getElementById('regNomePai');
    if (checkbox.checked) {
        inputPai.value = 'Sem registro paterno / Não declarado';
        inputPai.disabled = true;
    } else {
        inputPai.value = '';
        inputPai.disabled = false;
    }
}

function submitPreCadastro(e) {
    e.preventDefault();
    
    // Captura da Data e Hora Exata do Cadastro gerada pelo Sistema
    const agora = new Date();
    const dataHoraCadastro = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Captura dos campos na ordem exigida
    const nomeGuerra = document.getElementById('regNomeGuerra').value.trim();
    const nomeCompleto = document.getElementById('regNomeCompleto').value.trim();
    const dataNascimento = document.getElementById('regDataNascimento').value;
    const cpf = document.getElementById('regCPF').value.trim();
    const nomeMae = document.getElementById('regNomeMae').value.trim();
    const semPai = document.getElementById('regSemPai').checked;
    const nomePai = semPai ? 'Sem registro paterno / Não declarado' : (document.getElementById('regNomePai').value.trim() || 'Não declarado');
    const sexo = document.getElementById('regSexo').value;
    const telefone = document.getElementById('regTelefone').value.trim();
    const senha = document.getElementById('regSenha').value;
    const confirmarSenha = document.getElementById('regConfirmarSenha').value;
    const logradouro = document.getElementById('regLogradouro').value.trim();
    const numero = document.getElementById('regNumero').value.trim();
    const complemento = document.getElementById('regComplemento').value.trim();
    const cep = document.getElementById('regCEP').value.trim();
    const bairro = document.getElementById('regBairro').value.trim();
    const cidade = document.getElementById('regCidade').value.trim();
    const termoAceito = document.getElementById('regTermoAceito').checked;

    if (senha !== confirmarSenha) {
        alert('As senhas digitadas não coincidem. Por favor, digite a mesma senha nos dois campos.');
        return;
    }

    if (!termoAceito) {
        alert('Você precisa aceitar os Termos de Responsabilidade para enviar a solicitação.');
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (list.find(a => a.cpf === cpf)) {
        alert('Este CPF já possui uma solicitação ou cadastro ativo no sistema da ACBCSJ.');
        return;
    }

    const novoAssociado = {
        id: Date.now().toString(),
        cpf: cpf,
        senha: senha,
        nome_guerra: nomeGuerra,
        nome: nomeCompleto,
        data_nascimento: dataNascimento,
        nome_mae: nomeMae,
        nome_pai: nomePai,
        sexo: sexo,
        telefone: telefone,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        cep: cep,
        bairro: bairro,
        cidade: cidade,
        perfil: 'associado',
        status: 'pendente',
        data_cadastro: dataHoraCadastro
    };

    list.push(novoAssociado);
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));
    dbService.saveAssociado(novoAssociado);

    alert(`Solicitação de cadastro de ${nomeGuerra} (${nomeCompleto}) enviada com sucesso em ${dataHoraCadastro}!\n\nA Diretoria da ACBCSJ analisará seus dados em breve.`);
    e.target.reset();
    if (document.getElementById('regSemPai')) {
        document.getElementById('regSemPai').checked = false;
        document.getElementById('regNomePai').disabled = false;
    }
    closeModal('modalPreCadastro');
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

