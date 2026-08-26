// ==========================================
// PORTAL ACBCSJ - MÓDULO DE ASSOCIADOS & PRÉ-CADASTRO
// ==========================================

// EXIBIR APENAS ASSOCIADOS ATIVOS COM CONTROLE DE PERFIL PELA DIRETORIA
function renderGestaoAssociados() {
    renderSolicitacoesDesligamentoDiretoria();

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let ativos = list.filter(a => a.status === 'ativo');
    ativos.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
    const container = document.getElementById('tableTodosAssociadosBody');
    const isDiretoria = currentUser && currentUser.perfil === 'diretoria';

    if (container) {
        if (ativos.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum associado ativo cadastrado.</td></tr>`;
        } else {
            container.innerHTML = ativos.map(a => {
                const isSelf = a.cpf === currentUser.cpf;
                
                // Se for DIRETORIA, exibe um seletor dropdown para alternar o perfil
                let perfilControl = `<span class="badge badge-${a.perfil === 'diretoria' ? 'warning' : 'info'}">${a.perfil.toUpperCase()}</span>`;
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
                        <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">📋 Ver Ficha Completa</button></td>
                        <td>
                            ${!isSelf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="abrirModalDesligar('${a.cpf}')">Desligar Associado</button>` : '<small style="color:var(--text-muted)">Você (Diretoria)</small>'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// GESTÃO DE SOLICITAÇÕES DE DESLIGAMENTO PELA DIRETORIA
function renderSolicitacoesDesligamentoDiretoria() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const pendentes = list.filter(a => a.solicitacao_desligamento && a.solicitacao_desligamento.status === 'pendente' && a.status !== 'desligado');

    // Atualiza contadores
    const elBadge = document.getElementById('badgeContadorDesligamentos');
    if (elBadge) elBadge.textContent = `${pendentes.length} pendente(s)`;

    const elMetric = document.getElementById('metricDesligamentosPendentes');
    if (elMetric) elMetric.textContent = pendentes.length;

    const secaoGestao = document.getElementById('secaoDesligamentosGestaoAssociados');
    if (secaoGestao) {
        secaoGestao.style.display = pendentes.length > 0 ? 'block' : 'none';
    }

    const htmlRows = pendentes.length === 0 
        ? `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 16px;">Nenhuma solicitação de desligamento pendente.</td></tr>`
        : pendentes.map(p => {
            const sol = p.solicitacao_desligamento;
            let anexoHtml = '<span style="color: var(--text-muted); font-size: 11px;">Sem carta anexa</span>';
            if (sol && sol.carta_url) {
                anexoHtml = `
                    <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 8px; color: var(--accent-gold); border-color: var(--accent-gold);" onclick="abrirCartaSolicitacaoDesligamento('${p.cpf}')">
                        📄 Ver Carta (${sol.carta_nome || 'Arquivo'})
                    </button>
                `;
            }

            return `
                <tr>
                    <td><b>${p.nome_guerra || p.nome}</b><br><small style="color:var(--text-muted)">${p.nome}</small></td>
                    <td>${p.cpf}</td>
                    <td><small style="color:var(--accent-gold); font-weight: 600;">${sol ? sol.data : '-'}</small></td>
                    <td><div style="max-width: 260px; font-size: 12px; color: var(--text-color);">${sol ? sol.motivo : '-'}</div></td>
                    <td>${anexoHtml}</td>
                    <td>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                            <button class="btn btn-sm btn-primary" style="background-color: #E74C3C; border-color: #E74C3C; font-size: 11px; padding: 4px 8px;" onclick="aprovarSolicitacaoDesligamento('${p.cpf}')">
                                ✅ Homologar Saída
                            </button>
                            <button class="btn btn-sm btn-outline" style="color: var(--accent-gold); border-color: var(--accent-gold); font-size: 11px; padding: 4px 8px;" onclick="abrirModalRecusarSolicitacao('${p.cpf}')">
                                ❌ Indeferir
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

    const tbodyOverview = document.getElementById('tableSolicitacoesDesligamentoBody');
    if (tbodyOverview) tbodyOverview.innerHTML = htmlRows;

    const tbodyGestao = document.getElementById('tableSolicitacoesDesligamentoGestaoBody');
    if (tbodyGestao) tbodyGestao.innerHTML = htmlRows;
}

function abrirCartaSolicitacaoDesligamento(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a || !a.solicitacao_desligamento || !a.solicitacao_desligamento.carta_url) {
        alert('Carta de desligamento não encontrada.');
        return;
    }

    const url = a.solicitacao_desligamento.carta_url;
    const nome = a.solicitacao_desligamento.carta_nome || `Carta_${a.cpf}.pdf`;

    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Carta de Desligamento - ${a.nome_guerra || a.nome}</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${url}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = nome;
        link.click();
    }
}

function aprovarSolicitacaoDesligamento(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    if (!confirm(`Confirma a HOMOLOGAÇÃO do desligamento do associado ${a.nome_guerra || a.nome} (${a.nome})?\n\nO integrante será movido para o quadro de associados desligados.`)) {
        return;
    }

    const agora = new Date();
    const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    a.status = 'desligado';
    a.data_desligamento = dataHoraDesligamento;
    a.motivo_desligamento = (a.solicitacao_desligamento && a.solicitacao_desligamento.motivo) 
        ? `[Pedido do Associado em ${a.solicitacao_desligamento.data}]: ${a.solicitacao_desligamento.motivo}`
        : 'Desligamento voluntário solicitado pelo associado';

    if (a.solicitacao_desligamento && a.solicitacao_desligamento.carta_url) {
        a.carta_desligamento_url = a.solicitacao_desligamento.carta_url;
        a.carta_desligamento_nome = a.solicitacao_desligamento.carta_nome || `Carta_${a.cpf}.pdf`;
    }

    if (a.solicitacao_desligamento) {
        a.solicitacao_desligamento.status = 'aprovada';
        a.solicitacao_desligamento.data_homologacao = dataHoraDesligamento;
    }

    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        if (typeof dbService !== 'undefined') {
            dbService.saveAssociado(a);
        }
    } catch(err) {}

    alert(`Desligamento do associado ${a.nome_guerra || a.nome} homologado com sucesso em ${dataHoraDesligamento}!`);
    renderGestaoAssociados();
    renderAssociadosDesligados();
    renderDiretoriaOverview();
}

function abrirModalRecusarSolicitacao(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    document.getElementById('recusarDesligamentoCPF').value = a.cpf;
    document.getElementById('recusarDesligamentoNomeDisplay').value = `${a.nome_guerra || a.nome} (${a.nome}) - CPF: ${a.cpf}`;
    document.getElementById('recusarDesligamentoJustificativa').value = '';

    openModal('modalRecusarSolicitacaoDesligamento');
}

function confirmarRecusarSolicitacao(e) {
    e.preventDefault();
    const cpf = document.getElementById('recusarDesligamentoCPF').value;
    const justificativa = document.getElementById('recusarDesligamentoJustificativa').value.trim();

    if (!justificativa) {
        alert('Por favor, informe a justificativa da Diretoria para indeferir o pedido.');
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    const agora = new Date();
    const dataHora = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    a.solicitacao_desligamento = null; // Libera o associado
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        if (typeof dbService !== 'undefined') {
            dbService.saveAssociado(a);
            // Envia mensagem ao associado
            dbService.addMensagem({
                id: 'msg_recusa_deslig_' + Date.now(),
                associado_id: a.id || null,
                associado_cpf: a.cpf,
                associado_nome: a.nome_guerra || a.nome,
                destinatario: a.cpf,
                assunto: '📢 Resposta à Solicitação de Desligamento',
                conteudo: `Olá ${a.nome_guerra || a.nome},\n\nSua solicitação de desligamento voluntário foi analisada pela Diretoria da ACBCSJ e foi INDEFERIDA / NÃO HOMOLOGADA em ${dataHora}.\n\nJustificativa da Diretoria: ${justificativa}\n\nSeu cadastro permanece ativo no quadro de associados.`,
                prioridade: 'Importante',
                status: 'enviada',
                data_envio: dataHora
            });
        }
    } catch(err) {}

    alert(`Solicitação de desligamento indeferida com sucesso. O associado ${a.nome_guerra || a.nome} foi notificado.`);
    closeModal('modalRecusarSolicitacaoDesligamento');
    renderGestaoAssociados();
    renderDiretoriaOverview();
}

// FUNÇÃO PARA ALTERAR O PERFIL DO INTEGRANTE (APENAS DIRETORIA)
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

// EXIBIR ASSOCIADOS DESLIGADOS
function renderAssociadosDesligados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let desligados = list.filter(a => a.status === 'desligado');
    desligados.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
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
                                📄 Ver Carta de Desligamento
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
        <div><b>OBM de Lotação:</b> <b style="color: var(--accent-gold);">${a.obm || '-'}</b></div>
        <div><b>Profissão:</b> ${a.profissao || '-'}</div>
        <div><b>Perfil no Portal:</b> <b style="color: var(--accent-gold);">${(a.perfil || 'associado').toUpperCase()}</b></div>
        
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
                <div style="margin-top: 8px;">
                    <b>Carta de Desligamento:</b> 
                    ${a.carta_desligamento_url ? `
                        <button class="btn btn-sm btn-gold" style="margin-left: 8px; font-size: 11px;" onclick="abrirCartaDesligamento('${a.cpf}')">
                            📄 Baixar / Visualizar Carta (${a.carta_desligamento_nome || 'Arquivo'})
                        </button>
                    ` : '<i>Nenhuma carta anexada.</i>'}
                </div>
            </div>
        ` : ''}
    `;

    openModal('modalFichaAssociado');
}

// DESLIGAMENTO MANUAL DIRETO PELA DIRETORIA
function abrirModalDesligar(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    document.getElementById('desligarCPF').value = a.cpf;
    document.getElementById('desligarNomeDisplay').value = `${a.nome_guerra || a.nome} (${a.nome}) - CPF: ${a.cpf}`;
    document.getElementById('desligarMotivo').value = '';
    const fileInput = document.getElementById('desligarCartaArquivo');
    if (fileInput) fileInput.value = '';

    openModal('modalDesligarAssociado');
}

function confirmarDesligamento(e) {
    e.preventDefault();
    const cpf = document.getElementById('desligarCPF').value;
    const motivo = document.getElementById('desligarMotivo').value.trim();
    const fileInput = document.getElementById('desligarCartaArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!motivo) {
        alert('Por favor, informe o motivo do desligamento.');
        return;
    }

    const agora = new Date();
    const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const processarSalvarDesligamento = (fileDataUrl = null, fileName = null) => {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'desligado';
            item.data_desligamento = dataHoraDesligamento;
            item.motivo_desligamento = motivo;
            if (fileDataUrl) {
                item.carta_desligamento_url = fileDataUrl;
                item.carta_desligamento_nome = fileName;
            }

            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);

            alert(`Associado ${item.nome_guerra || item.nome} foi desligado com sucesso em ${dataHoraDesligamento}.${fileDataUrl ? '\nA Carta de Desligamento foi salva e registrada no sistema.' : ''}`);
            closeModal('modalDesligarAssociado');
            renderGestaoAssociados();
            renderAssociadosDesligados();
            renderDiretoriaOverview();
        }
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            processarSalvarDesligamento(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    } else {
        processarSalvarDesligamento();
    }
}

// FUNÇÃO PARA ABRIR OU BAIXAR A CARTA DE DESLIGAMENTO
function abrirCartaDesligamento(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a || !a.carta_desligamento_url) {
        alert('Carta de desligamento não encontrada.');
        return;
    }

    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Carta de Desligamento - ${a.nome_guerra || a.nome}</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${a.carta_desligamento_url}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    } else {
        const link = document.createElement('a');
        link.href = a.carta_desligamento_url;
        link.download = a.carta_desligamento_nome || `Carta_Desligamento_${a.cpf}.pdf`;
        link.click();
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
        renderGestaoAssociados();
    }
}

function excluirAssociado(cpf) {
    if (confirm('Tem certeza que deseja excluir este associado do sistema? Esta ação é permanente.')) {
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
    const obm = document.getElementById('regOBM').value;
    const profissao = document.getElementById('regProfissao').value.trim();
    const logradouro = document.getElementById('regLogradouro').value.trim();
    const numero = document.getElementById('regNumero').value.trim();
    const complemento = document.getElementById('regComplemento').value.trim();
    const cep = document.getElementById('regCEP').value.trim();
    const bairro = document.getElementById('regBairro').value.trim();
    const cidade = document.getElementById('regCidade').value.trim();
    const termoAceito = document.getElementById('regTermoAceito').checked;

    if (!obm) {
        alert('Por favor, selecione a OBM de Lotação.');
        return;
    }

    if (!profissao) {
        alert('Por favor, preencha o campo Profissão.');
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

    // Geração automática de senha: os 4 primeiros dígitos numéricos do CPF
    const apenasNumerosCPF = cpf.replace(/\D/g, '');
    const senhaAutomatica = apenasNumerosCPF.substring(0, 4);

    const novoAssociado = {
        id: Date.now().toString(),
        cpf: cpf,
        senha: senhaAutomatica,
        nome_guerra: nomeGuerra,
        nome: nomeCompleto,
        data_nascimento: dataNascimento,
        nome_mae: nomeMae,
        nome_pai: nomePai,
        sexo: sexo,
        telefone: telefone,
        obm: obm,
        profissao: profissao,
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

    alert(`Solicitação de cadastro de ${nomeGuerra} (${nomeCompleto}) enviada com sucesso em ${dataHoraCadastro}!\n\n⚠️ O acesso estará BLOQUEADO até a APROVAÇÃO pela Diretoria.\n🔑 Após a aprovação, sua senha de acesso será os 4 primeiros dígitos do seu CPF (${senhaAutomatica}).`);
    e.target.reset();
    if (document.getElementById('regSemPai')) {
        document.getElementById('regSemPai').checked = false;
        document.getElementById('regNomePai').disabled = false;
    }
    closeModal('modalPreCadastro');
}
