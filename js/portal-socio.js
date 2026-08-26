// ==========================================
// PORTAL ACBCSJ - ÃREA EXCLUSIVA DO ASSOCIADO
// ==========================================

// EDIÇÃO DOS DADOS CADASTRAIS PELO PRÓPRIO INTEGRANTE
function abrirModalEditarMeusDados() {
    if (!currentUser) return;
    document.getElementById('editMeusTelefone').value = currentUser.telefone || '';
    document.getElementById('editMeusOBM').value = currentUser.obm || 'São José';
    document.getElementById('editMeusProfissao').value = currentUser.profissao || '';
    document.getElementById('editMeusLogradouro').value = currentUser.logradouro || '';
    document.getElementById('editMeusNumero').value = currentUser.numero || '';
    document.getElementById('editMeusComplemento').value = currentUser.complemento || '';
    document.getElementById('editMeusCEP').value = currentUser.cep || '';
    document.getElementById('editMeusBairro').value = currentUser.bairro || '';
    document.getElementById('editMeusCidade').value = currentUser.cidade || 'São José / SC';

    openModal('modalEditarMeusDados');
}

function salvarMeusDados(e) {
    e.preventDefault();
    if (!currentUser) return;

    const telefone = document.getElementById('editMeusTelefone').value.trim();
    const obm = document.getElementById('editMeusOBM').value.trim();
    const profissao = document.getElementById('editMeusProfissao').value.trim();
    const logradouro = document.getElementById('editMeusLogradouro').value.trim();
    const numero = document.getElementById('editMeusNumero').value.trim();
    const complemento = document.getElementById('editMeusComplemento').value.trim();
    const cep = document.getElementById('editMeusCEP').value.trim();
    const bairro = document.getElementById('editMeusBairro').value.trim();
    const cidade = document.getElementById('editMeusCidade').value.trim();

    currentUser.telefone = telefone;
    currentUser.obm = obm;
    currentUser.profissao = profissao;
    currentUser.logradouro = logradouro;
    currentUser.numero = numero;
    currentUser.complemento = complemento;
    currentUser.cep = cep;
    currentUser.bairro = bairro;
    currentUser.cidade = cidade;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const index = list.findIndex(a => a.cpf === currentUser.cpf);
    if (index >= 0) {
        list[index] = { ...list[index], ...currentUser };
    }
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        dbService.saveAssociado(currentUser);
    } catch (err) {}

    alert('Seus dados cadastrais foram atualizados com sucesso!');
    closeModal('modalEditarMeusDados');
    renderAssociadoOverview();
}


// RENDERIZAR PAINEL DO ASSOCIADO (VISÃO GERAL, MENSAGENS E MENSALIDADES)
function renderAssociadoOverview() {
    if (!currentUser) return;

    // 1. Nome de boas-vindas
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }

    // 2. Resumo dos Dados Cadastrais Pessoais
    const profileContainer = document.getElementById('myProfileDetailsDisplay');
    if (profileContainer) {
        const end = [currentUser.logradouro, currentUser.numero ? `Nº ${currentUser.numero}` : '', currentUser.complemento].filter(Boolean).join(', ');
        profileContainer.innerHTML = `
            <div><b>📞 Telefone / WhatsApp:</b> ${currentUser.telefone || 'Não informado'}</div>
            <div><b>🚒 OBM:</b> ${currentUser.obm || 'São José'}</div>
            <div><b>💼 Profissão:</b> ${currentUser.profissao || 'Não informada'}</div>
            <div><b>🏠 Endereço:</b> ${end || 'Não informado'}</div>
            <div><b>📍 Bairro / Cidade:</b> ${currentUser.bairro || 'São José'} - ${currentUser.cidade || 'SC'} (CEP: ${currentUser.cep || '-'})</div>
            <div><b>🆔 CPF:</b> ${currentUser.cpf}</div>
        `;
    }

    // 3. Comunicados & Avisos da Diretoria destinados ao usuário atual
    const comunicadosContainer = document.getElementById('containerMeusComunicadosDiretoria');
    if (comunicadosContainer) {
        const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
        const lidos = getComunicadosLidosUsuario();

        const meusComunicados = comunicadosAll.filter(c => {
            if (c.destinatario_tipo === 'todos') return true;
            if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
                if (c.destinatarios_cpfs.includes('TODOS')) return true;
                return c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf);
            }
            return false;
        });

        // Somente comunicados PENDENTES DE LEITURA (!lidos.includes(c.id))
        const pendentesLeitura = meusComunicados.filter(c => !lidos.includes(c.id));

        if (pendentesLeitura.length === 0) {
            comunicadosContainer.innerHTML = `
                <div style="background: rgba(46,204,113,0.05); border: 1px dashed rgba(46,204,113,0.3); border-radius: 6px; padding: 14px; text-align: center; color: var(--text-muted); font-size: 13px;">
                    ✅ <b>Nenhum comunicado pendente de leitura.</b><br>
                    <span style="font-size: 12px; color: var(--text-muted);">Todas as suas mensagens lidas continuam salvas no <a href="#" onclick="navigateTab('comunicados-associado'); return false;" style="color: var(--accent-gold); text-decoration: underline; font-weight: bold;">Histórico de Comunicados & Avisos</a>.</span>
                </div>
            `;
        } else {
            comunicadosContainer.innerHTML = pendentesLeitura.map(c => {
                let badgePrio = '<span class="badge badge-info" style="font-size: 10px;">🟢 Informativo</span>';
                if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning" style="font-size: 10px;">🟡 Importante</span>';
                if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger" style="font-size: 10px;">🔴 Urgente</span>';

                return `
                    <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-left: 4px solid var(--accent-gold); border-radius: 6px; padding: 14px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="color: var(--accent-gold); font-size: 15px;">${c.assunto}</b>
                                ${badgePrio}
                            </div>
                            <small style="color: var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                        </div>
                        <p style="font-size: 13px; color: var(--text-color); margin: 6px 0 10px 0; white-space: pre-wrap; line-height: 1.5;">${c.mensagem}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
                            <div style="font-size: 11px; color: var(--text-muted);">
                                Enviado por: <b style="color: var(--text-color);">${c.remetente_nome || 'Diretoria ACBCSJ'}</b>
                            </div>
                            <button type="button" class="btn btn-sm btn-gold" style="font-size: 11px; padding: 4px 10px; font-weight: bold;" onclick="marcarComunicadoLido('${c.id}')">
                                ✅ Marcar como Lida
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 4. Minhas Mensalidades & Contribuições por Ano
    const selAno = document.getElementById('selAnoMeuPainel');
    const ano = selAno ? selAno.value : '2026';

    const lbls = document.querySelectorAll('.lblAnoMeuPainel');
    lbls.forEach(el => el.textContent = ano);

    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = JSON.parse(localStorage.getItem(storageKey));
    if (!grid) {
        grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
    }

    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');

    const socio = grid.find(s => {
        const sCpf = (s.cpf || '').replace(/\D/g, '');
        if (sCpf && cleanUserCpf && sCpf === cleanUserCpf) return true;
        const ng = (typeof s.nome_guerra === 'string' ? s.nome_guerra : '').toLowerCase();
        const nc = (typeof s.nome_completo === 'string' ? s.nome_completo : '').toLowerCase();
        const userNg = (typeof currentUser.nome_guerra === 'string' ? currentUser.nome_guerra : '').toLowerCase();
        const userNc = (typeof currentUser.nome === 'string' ? currentUser.nome : '').toLowerCase();
        return (ng && userNg && ng === userNg) || (nc && userNc && nc === userNc) || (userNc && nc && nc.includes(userNc));
    }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    const containerTable = document.getElementById('tableMinhasMensalidadesBody');
    if (!containerTable) return;

    const mesesList = [
        { index: 1, key: 'jan', nome: 'Janeiro' },
        { index: 2, key: 'fev', nome: 'Fevereiro' },
        { index: 3, key: 'mar', nome: 'Março' },
        { index: 4, key: 'abr', nome: 'Abril' },
        { index: 5, key: 'mai', nome: 'Maio' },
        { index: 6, key: 'jun', nome: 'Junho' },
        { index: 7, key: 'jul', nome: 'Julho' },
        { index: 8, key: 'ago', nome: 'Agosto' },
        { index: 9, key: 'set', nome: 'Setembro' },
        { index: 10, key: 'out', nome: 'Outubro' },
        { index: 11, key: 'nov', nome: 'Novembro' },
        { index: 12, key: 'dez', nome: 'Dezembro' }
    ];

    let totalPagoAno = 0;
    let totalDebitosPendente = 0;
    let temDebitoVencido = false;

    const rowsHtml = mesesList.map(m => {
        const valPago = parseFloat(socio[m.key]) || 0;
        const tarifaVigente = getValorMensalidadeVigente(m.index, ano);
        totalPagoAno += valPago;

        const info = calcularStatusMensalidade(m.index, ano, valPago);
        if (info.isVencido) {
            temDebitoVencido = true;
            totalDebitosPendente += info.debitAmount;
        }

        let badgeStatus = '';
        if (info.status === 'pago') {
            badgeStatus = `<span class="badge badge-success" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">✅ QUITADO / EM DIA</span>`;
        } else if (info.status === 'parcial') {
            badgeStatus = `<span class="badge badge-warning" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">⚠️ PAGO PARCIAL (Falta R$ ${info.debitAmount.toFixed(2).replace('.', ',')})</span>`;
        } else if (info.isVencido) {
            badgeStatus = `<span class="badge badge-danger" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">🔴 VENCIDO (Inadimplente)</span>`;
        } else {
            badgeStatus = `<span style="color: var(--text-muted); font-size: 12px; font-weight: 500;">⏳ A VENCER</span>`;
        }

        return `
            <tr>
                <td><b style="color: var(--text-color);">${m.index < 10 ? '0' + m.index : m.index} - ${m.nome} / ${ano}</b></td>
                <td><span style="font-size: 12px; font-weight: 600; color: var(--accent-gold);">${info.vencimento}</span></td>
                <td>R$ ${tarifaVigente.toFixed(2).replace('.', ',')}</td>
                <td style="font-weight: 700; color: ${valPago >= tarifaVigente ? '#2ECC71' : (valPago > 0 ? '#F39C12' : 'var(--text-muted)')};">
                    R$ ${valPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>${badgeStatus}</td>
            </tr>
        `;
    }).join('');

    containerTable.innerHTML = rowsHtml;

    // Atualiza os Banners de Métrica do Associado
    const bannerAdimplencia = document.getElementById('bannerStatusAdimplenciaAssociado');
    const elMetricTotalPago = document.getElementById('metricMeuTotalPago');
    const elMetricTotalPendente = document.getElementById('metricMeuTotalPendente');

    if (elMetricTotalPago) {
        elMetricTotalPago.textContent = `R$ ${totalPagoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    if (elMetricTotalPendente) {
        elMetricTotalPendente.textContent = `R$ ${totalDebitosPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    if (bannerAdimplencia) {
        if (temDebitoVencido) {
            bannerAdimplencia.style.background = 'rgba(231, 76, 60, 0.1)';
            bannerAdimplencia.style.borderColor = 'rgba(231, 76, 60, 0.4)';
            bannerAdimplencia.innerHTML = `
                <div style="font-size: 24px;">🔴</div>
                <div>
                    <b style="color: #E74C3C; font-size: 13px; display: block;">DÉBITO PENDENTE VENCIDO</b>
                    <span style="font-size: 11px; color: var(--text-muted);">Vencimento dia 15 do mês corrente. Entre em contato com a Diretoria para regularizar.</span>
                </div>
            `;
        } else {
            bannerAdimplencia.style.background = 'rgba(46, 204, 113, 0.1)';
            bannerAdimplencia.style.borderColor = 'rgba(46, 204, 113, 0.4)';
            bannerAdimplencia.innerHTML = `
                <div style="font-size: 24px;">🟢</div>
                <div>
                    <b style="color: #2ECC71; font-size: 13px; display: block;">CADASTRO 100% EM DIA</b>
                    <span style="font-size: 11px; color: var(--text-muted);">Parabéns! Suas contribuições estão em dia com a ACBCSJ.</span>
                </div>
            `;
        }
    }
}

// GERENCIAMENTO DE LEITURA E HISTÓRICO DE COMUNICADOS DO ASSOCIADO
function getComunicadosLidosUsuario() {
    if (!currentUser) return [];
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const storageKey = `acbcsj_comunicados_lidos_${cleanUserCpf}`;
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function marcarComunicadoLido(comunicadoId) {
    if (!currentUser || !comunicadoId) return;
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const storageKey = `acbcsj_comunicados_lidos_${cleanUserCpf}`;
    let lidos = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    if (!lidos.includes(comunicadoId)) {
        lidos.push(comunicadoId);
        localStorage.setItem(storageKey, JSON.stringify(lidos));
    }

    renderAssociadoOverview();
    renderComunicadosHistoricoAssociado();
}

function renderComunicadosHistoricoAssociado() {
    if (!currentUser) return;
    const container = document.getElementById('containerHistoricoComunicadosAssociado');
    if (!container) return;

    const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const lidos = getComunicadosLidosUsuario();

    const termoBusca = (document.getElementById('filtroTextoComunicadosAssociado')?.value || '').toLowerCase().trim();

    let meusComunicados = comunicadosAll.filter(c => {
        if (c.destinatario_tipo === 'todos') return true;
        if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
            if (c.destinatarios_cpfs.includes('TODOS')) return true;
            return c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf);
        }
        return false;
    });

    if (termoBusca) {
        meusComunicados = meusComunicados.filter(c => 
            (c.assunto || '').toLowerCase().includes(termoBusca) ||
            (c.mensagem || '').toLowerCase().includes(termoBusca) ||
            (c.remetente_nome || '').toLowerCase().includes(termoBusca)
        );
    }

    if (meusComunicados.length === 0) {
        container.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
                Nenhum comunicado encontrado no seu histórico.
            </div>
        `;
        return;
    }

    container.innerHTML = meusComunicados.map(c => {
        const isLido = lidos.includes(c.id);

        let badgePrio = '<span class="badge badge-info" style="font-size: 10px;">🟢 Informativo</span>';
        if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning" style="font-size: 10px;">🟡 Importante</span>';
        if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger" style="font-size: 10px;">🔴 Urgente</span>';

        let badgeStatus = isLido 
            ? '<span class="badge badge-success" style="font-size: 10px;">✅ Mensagem Lida</span>'
            : '<span class="badge badge-warning" style="font-size: 10px;">🟡 Pendente de Leitura</span>';

        let botaoAcao = isLido ? '' : `
            <button type="button" class="btn btn-sm btn-gold" style="font-size: 11px; padding: 4px 10px; font-weight: bold;" onclick="marcarComunicadoLido('${c.id}')">
                ✅ Marcar como Lida
            </button>
        `;

        return `
            <div style="background: rgba(0,0,0,0.2); border: 1px solid ${isLido ? 'var(--border-color)' : 'rgba(241,196,15,0.4)'}; border-left: 4px solid ${isLido ? '#2ECC71' : 'var(--accent-gold)'}; border-radius: 6px; padding: 14px; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <b style="color: var(--accent-gold); font-size: 15px;">${c.assunto}</b>
                        ${badgePrio}
                        ${badgeStatus}
                    </div>
                    <small style="color: var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                </div>
                <p style="font-size: 13px; color: var(--text-color); margin: 6px 0 10px 0; white-space: pre-wrap; line-height: 1.5;">${c.mensagem}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
                    <div style="font-size: 11px; color: var(--text-muted);">
                        Enviado por: <b style="color: var(--text-color);">${c.remetente_nome || 'Diretoria ACBCSJ'}</b> (${c.destinatarios_resumo || 'Associados'})
                    </div>
                    ${botaoAcao}
                </div>
            </div>
        `;
    }).join('');
}

// EDIÇÃO DOS DADOS CADASTRAIS PELO PRÓPRIO INTEGRANTE
function abrirModalEditarMeusDados() {
    if (!currentUser) return;
    document.getElementById('editMeusTelefone').value = currentUser.telefone || '';
    document.getElementById('editMeusOBM').value = currentUser.obm || 'São José';
    document.getElementById('editMeusProfissao').value = currentUser.profissao || '';
    document.getElementById('editMeusLogradouro').value = currentUser.logradouro || '';
    document.getElementById('editMeusNumero').value = currentUser.numero || '';
    document.getElementById('editMeusComplemento').value = currentUser.complemento || '';
    document.getElementById('editMeusCEP').value = currentUser.cep || '';
    document.getElementById('editMeusBairro').value = currentUser.bairro || '';
    document.getElementById('editMeusCidade').value = currentUser.cidade || 'São José / SC';

    openModal('modalEditarMeusDados');
}

function salvarMeusDados(e) {
    e.preventDefault();
    if (!currentUser) return;

    const telefone = document.getElementById('editMeusTelefone').value.trim();
    const obm = document.getElementById('editMeusOBM').value.trim();
    const profissao = document.getElementById('editMeusProfissao').value.trim();
    const logradouro = document.getElementById('editMeusLogradouro').value.trim();
    const numero = document.getElementById('editMeusNumero').value.trim();
    const complemento = document.getElementById('editMeusComplemento').value.trim();
    const cep = document.getElementById('editMeusCEP').value.trim();
    const bairro = document.getElementById('editMeusBairro').value.trim();
    const cidade = document.getElementById('editMeusCidade').value.trim();

    currentUser.telefone = telefone;
    currentUser.obm = obm;
    currentUser.profissao = profissao;
    currentUser.logradouro = logradouro;
    currentUser.numero = numero;
    currentUser.complemento = complemento;
    currentUser.cep = cep;
    currentUser.bairro = bairro;
    currentUser.cidade = cidade;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const index = list.findIndex(a => a.cpf === currentUser.cpf);
    if (index >= 0) {
        list[index] = { ...list[index], ...currentUser };
    }
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        dbService.saveAssociado(currentUser);
    } catch (err) {}

    alert('Seus dados cadastrais foram atualizados com sucesso!');
    closeModal('modalEditarMeusDados');
    renderAssociadoOverview();
}
