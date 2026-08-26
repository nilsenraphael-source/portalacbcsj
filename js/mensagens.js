// ==========================================
// PORTAL ACBCSJ - MENSAGENS E COMUNICADOS
// ==========================================

async function enviarMensagemAssociado(e) {
    e.preventDefault();
    if (!currentUser) {
        alert('Por favor, faça login para enviar mensagens.');
        return;
    }
    const assunto = document.getElementById('msgAssuntoAssociado').value.trim();
    const conteudo = document.getElementById('msgConteudoAssociado').value.trim();
    if (!assunto || !conteudo) {
        alert('Preencha o assunto e a mensagem.');
        return;
    }

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const msgObj = {
        id: 'msg_' + Date.now(),
        associado_id: currentUser.id || currentUser.cpf,
        associado_cpf: currentUser.cpf,
        associado_nome: currentUser.nome_guerra || currentUser.nome,
        destinatario: 'diretoria',
        assunto: assunto,
        conteudo: conteudo,
        prioridade: 'Informativo',
        status: 'pendente',
        data_envio: dataFormatada
    };

    let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    list.unshift(msgObj);
    localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));

    if (typeof dbService !== 'undefined') {
        try {
            await dbService.addMensagem(msgObj);
        } catch(err) {
            console.error('Erro ao enviar mensagem para Supabase:', err);
        }
    }

    alert('Sua mensagem/ideia foi enviada para a Diretoria com sucesso!');
    e.target.reset();
}
window.enviarMensagemAssociado = enviarMensagemAssociado;


// GESTÃO DE MENSAGENS E COMUNICADOS PELA DIRETORIA
let abaMensagensAtiva = 'recebidas';

function alternarAbaMensagensDiretoria(aba) {
    abaMensagensAtiva = aba;
    const btnRec = document.getElementById('btnTabMsgsRecebidas');
    const btnEnv = document.getElementById('btnTabMsgsEnviadas');

    if (btnRec && btnEnv) {
        if (aba === 'recebidas') {
            btnRec.className = 'btn btn-sm btn-gold';
            btnEnv.className = 'btn btn-sm btn-outline';
        } else {
            btnRec.className = 'btn btn-sm btn-outline';
            btnEnv.className = 'btn btn-sm btn-gold';
        }
    }

    renderMensagensDiretoria();
}

// RENDERIZAR MENSAGENS NO PAINEL GERAL DA DIRETORIA (VISÃO GERAL)
function renderMensagensDiretoriaOverview() {
    const container = document.getElementById('tableMensagensDiretoriaOverviewBody');
    if (!container) return;

    const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    const recebidas = msgs.filter(m => m.destinatario === 'diretoria' || (m.associado_cpf && !m.id.startsWith('comunicado_')));

    const elBadge = document.getElementById('badgeContadorMensagensRecebidas');
    if (elBadge) {
        const pendentes = recebidas.filter(m => m.status === 'pendente').length;
        elBadge.textContent = `${pendentes} pendente(s) / ${recebidas.length} total`;
    }

    if (recebidas.length === 0) {
        container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 16px;">Nenhuma mensagem recebida de associados até o momento.</td></tr>`;
        return;
    }

    container.innerHTML = recebidas.map(m => {
        let statusBadge = '<span class="badge badge-info" style="font-size: 11px;">🟡 Pendente</span>';
        let infoResp = '';

        if (m.status === 'respondida') {
            statusBadge = '<span class="badge badge-success" style="font-size: 11px;">✅ Respondida</span>';
            if (m.respondido_por) {
                infoResp = `<br><small style="color:var(--text-muted); font-size: 11px;">Respondido por: <b style="color:var(--accent-gold);">${m.respondido_por}</b> em ${m.data_resposta || m.data_envio || ''}</small>`;
            }
        } else if (m.status === 'homologada') {
            statusBadge = '<span class="badge badge-warning" style="font-size: 11px; background:#E67E22;">📜 Homologada</span>';
            if (m.respondido_por) {
                infoResp = `<br><small style="color:var(--text-muted); font-size: 11px;">Por: <b>${m.respondido_por}</b></small>`;
            }
        } else if (m.status === 'indeferida') {
            statusBadge = '<span class="badge badge-danger" style="font-size: 11px;">❌ Indeferida</span>';
            if (m.respondido_por) {
                infoResp = `<br><small style="color:var(--text-muted); font-size: 11px;">Por: <b>${m.respondido_por}</b></small>`;
            }
        }

        const msgPreview = (m.conteudo || m.mensagem || '').substring(0, 140) + ((m.conteudo || m.mensagem || '').length > 140 ? '...' : '');

        return `
            <tr>
                <td><b>${m.associado_nome || 'Associado'}</b><br><small style="color:var(--text-muted)">${m.associado_cpf || '-'}</small></td>
                <td><small style="color:var(--accent-gold); font-weight:600;">${m.data_envio || m.data || '-'}</small></td>
                <td><b>${m.assunto || 'Sem assunto'}</b></td>
                <td><div style="max-width: 280px; font-size: 12px; white-space: pre-wrap;">${msgPreview}</div></td>
                <td>${statusBadge}${infoResp}</td>
                <td>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        ${m.status === 'pendente' ? `
                            <button class="btn btn-sm btn-primary" style="font-size: 11px; padding: 4px 8px;" onclick="abrirModalResponderMensagem('${m.id}')">
                                ✉️ Responder
                            </button>
                        ` : `
                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 4px 8px;" onclick="verDetalhesMensagem('${m.id}')">
                                👁️ Ver Resposta
                            </button>
                        `}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderMensagensDiretoria() {
    const container = document.getElementById('listMensagensDiretoria');
    if (!container) return;

    if (abaMensagensAtiva === 'recebidas') {
        const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        const recebidas = msgs.filter(m => m.destinatario === 'diretoria' || (m.associado_cpf && !m.id.startsWith('comunicado_')));

        if (recebidas.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <p style="font-size: 14px;">📥 Nenhuma mensagem recebida de associados até o momento.</p>
                </div>
            `;
        } else {
            container.innerHTML = recebidas.map(m => {
                let statusBadge = '<span class="badge badge-info">🟡 Aguardando Resposta</span>';
                if (m.status === 'respondida') statusBadge = '<span class="badge badge-success">✅ Respondida</span>';
                if (m.status === 'homologada') statusBadge = '<span class="badge badge-warning" style="background:#E67E22;">📜 Homologada</span>';
                if (m.status === 'indeferida') statusBadge = '<span class="badge badge-danger">❌ Indeferida</span>';

                let respostaHtml = '';
                if (m.resposta) {
                    respostaHtml = `
                        <div style="background: rgba(46,204,113,0.08); border: 1px solid rgba(46,204,113,0.25); border-radius: 6px; padding: 10px; margin-top: 10px;">
                            <div style="font-size: 11px; color: var(--status-success); font-weight: bold; margin-bottom: 4px;">
                                💬 Resposta da Diretoria registrada por: ${m.respondido_por || 'Diretor(a)'} em ${m.data_resposta || m.data_envio || ''}
                            </div>
                            <div style="font-size: 12px; color: var(--text-color); white-space: pre-wrap;">${m.resposta}</div>
                        </div>
                    `;
                }

                return `
                    <div class="card" style="margin-bottom: 14px; border-left: 4px solid ${m.status === 'pendente' ? 'var(--accent-gold)' : '#2ECC71'};">
                        <div style="display:flex; justify-content:space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="font-size: 15px; color: var(--accent-gold);">${m.assunto || 'Sem assunto'}</b>
                                ${statusBadge}
                            </div>
                            <small style="color:var(--text-muted); font-size: 11px;">📅 ${m.data_envio || m.data || '-'}</small>
                        </div>
                        <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                            👤 Remetente: <b style="color: #fff;">${m.associado_nome || 'Associado'}</b> (CPF: ${m.associado_cpf || '-'})
                        </div>
                        <p style="font-size:13px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; white-space: pre-wrap; margin: 0;">${m.conteudo || m.mensagem || ''}</p>
                        ${respostaHtml}
                        <div style="display: flex; justify-content: flex-end; margin-top: 10px; gap: 8px;">
                            ${m.status === 'pendente' ? `
                                <button class="btn btn-sm btn-primary" onclick="abrirModalResponderMensagem('${m.id}')">✉️ Responder Mensagem</button>
                            ` : `
                                <button class="btn btn-sm btn-outline" onclick="abrirModalResponderMensagem('${m.id}')">✏️ Atualizar Resposta</button>
                            `}
                        </div>
                    </div>
                `;
            }).join('');
        }
    } else {
        const comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        if (comunicados.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <p style="font-size: 14px;">📤 Nenhum comunicado encaminhado pela Diretoria até o momento.</p>
                    <button class="btn btn-gold btn-sm" style="margin-top: 10px;" onclick="abrirModalEnviarComunicado()">✉️ Encaminhar Primeiro Comunicado</button>
                </div>
            `;
        } else {
            container.innerHTML = comunicados.map(c => {
                let badgePrio = '<span class="badge badge-info">🟢 Informativo</span>';
                if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning">🟡 Importante</span>';
                if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger">🔴 Urgente</span>';

                return `
                    <div class="card" style="margin-bottom: 12px; border-left: 4px solid #3498DB;">
                        <div style="display:flex; justify-content:space-between; align-items: center; margin-bottom: 6px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="font-size: 15px; color: var(--accent-gold);">${c.assunto}</b>
                                ${badgePrio}
                            </div>
                            <small style="color:var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                        </div>
                        <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                            👥 Destinatários: <b style="color: #3498DB;">${c.destinatarios_resumo}</b> | Enviado por: <b style="color: #fff;">${c.remetente_nome || 'Diretoria'}</b>
                        </div>
                        <p style="font-size:13px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; white-space: pre-wrap; margin: 0 0 10px 0;">${c.mensagem}</p>
                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px; color: #E74C3C; border-color: #E74C3C;" onclick="excluirComunicadoEnviado('${c.id}')">🗑️ Excluir Comunicado</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function abrirModalResponderMensagem(msgId) {
    const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    const m = msgs.find(item => item.id === msgId);
    if (!m) {
        alert('Mensagem não localizada.');
        return;
    }

    document.getElementById('respMsgId').value = m.id;
    document.getElementById('respMsgAssociadoCpf').value = m.associado_cpf || '';
    document.getElementById('respMsgAssociadoNome').value = m.associado_nome || 'Associado';
    document.getElementById('respMsgAssuntoOriginal').value = m.assunto || 'Mensagem';

    document.getElementById('respMsgAssociadoDisplay').value = `${m.associado_nome || 'Associado'} (CPF: ${m.associado_cpf || '-'})`;
    document.getElementById('respMsgAssuntoDisplay').value = m.assunto || 'Sem assunto';
    document.getElementById('respMsgConteudoOriginalDisplay').textContent = m.conteudo || m.mensagem || '';
    document.getElementById('respMsgTexto').value = m.resposta || '';

    openModal('modalResponderMensagemDiretoria');
}

function confirmarRespostaMensagemDiretoria(e) {
    e.preventDefault();
    const id = document.getElementById('respMsgId').value;
    const assocCpf = document.getElementById('respMsgAssociadoCpf').value;
    const assocNome = document.getElementById('respMsgAssociadoNome').value;
    const assuntoOrig = document.getElementById('respMsgAssuntoOriginal').value;
    const textoResp = document.getElementById('respMsgTexto').value.trim();

    if (!textoResp) {
        alert('Por favor, informe o texto da resposta.');
        return;
    }

    const agora = new Date();
    const dataHora = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const nomeDiretor = currentUser ? (currentUser.nome_guerra || currentUser.nome) : 'Diretoria ACBCSJ';

    let msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    const idx = msgs.findIndex(item => item.id === id);

    if (idx >= 0) {
        msgs[idx].status = 'respondida';
        msgs[idx].resposta = textoResp;
        msgs[idx].respondido_por = nomeDiretor;
        msgs[idx].respondido_por_cpf = currentUser ? currentUser.cpf : '';
        msgs[idx].data_resposta = dataHora;
    }

    // Cria também uma notificação direta no histórico de comunicados para o associado
    const novoAviso = {
        id: 'resp_msg_' + Date.now(),
        remetente_cpf: currentUser ? currentUser.cpf : '',
        remetente_nome: `${nomeDiretor} (Diretoria)`,
        destinatario_tipo: 'individual',
        destinatarios_cpfs: [assocCpf],
        destinatarios_resumo: `👤 ${assocNome}`,
        assunto: `📢 Resposta: ${assuntoOrig}`,
        prioridade: 'Importante',
        mensagem: `Olá ${assocNome},\n\nSua mensagem sobre "${assuntoOrig}" foi respondida pela Diretoria:\n\n"${textoResp}"\n\nRespondido por: ${nomeDiretor} em ${dataHora}.`,
        data: dataHora
    };

    let comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    comunicados.unshift(novoAviso);
    localStorage.setItem('acbcsj_comunicados_enviados', JSON.stringify(comunicados));
    localStorage.setItem('acbcsj_mensagens', JSON.stringify(msgs));

    if (typeof dbService !== 'undefined') {
        if (idx >= 0) dbService.addMensagem(msgs[idx]);
        dbService.addMensagem({
            id: novoAviso.id,
            associado_id: null,
            associado_cpf: assocCpf,
            associado_nome: assocNome,
            destinatario: assocCpf,
            assunto: novoAviso.assunto,
            conteudo: novoAviso.mensagem,
            prioridade: 'Importante',
            status: 'enviada',
            data_envio: dataHora
        });
    }

    alert(`Resposta enviada com sucesso para ${assocNome}! O registro com seu nome (${nomeDiretor}) foi gravado.`);
    closeModal('modalResponderMensagemDiretoria');
    renderMensagensDiretoriaOverview();
    renderMensagensDiretoria();
}

function verDetalhesMensagem(msgId) {
    const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    const m = msgs.find(item => item.id === msgId);
    if (!m) return;

    document.getElementById('detMsgTitulo').textContent = `📄 ${m.assunto || 'Detalhes da Mensagem'}`;
    document.getElementById('detMsgConteudoCompleto').innerHTML = `
        <div style="margin-bottom: 12px;">
            <b>👤 Remetente:</b> ${m.associado_nome || 'Associado'} (CPF: ${m.associado_cpf || '-'})<br>
            <b>📅 Data do Envio:</b> ${m.data_envio || m.data || '-'}<br>
            <b>📌 Status:</b> <span class="badge badge-success">${(m.status || 'recebida').toUpperCase()}</span>
        </div>
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; margin-bottom: 14px;">
            <b>Mensagem do Associado:</b><br>
            <div style="white-space: pre-wrap; margin-top: 6px;">${m.conteudo || m.mensagem || ''}</div>
        </div>
        ${m.resposta ? `
            <div style="background: rgba(46,204,113,0.1); border: 1px solid rgba(46,204,113,0.3); border-radius: 6px; padding: 12px;">
                <b style="color: var(--status-success);">✅ Resposta da Diretoria:</b><br>
                <div style="white-space: pre-wrap; margin: 6px 0;">${m.resposta}</div>
                <div style="font-size: 11px; color: var(--text-muted); border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px; margin-top: 6px;">
                    Registrado por: <b>${m.respondido_por || 'Diretoria'}</b> em ${m.data_resposta || m.data_envio || ''}
                </div>
            </div>
        ` : '<p style="color: var(--text-muted); font-style: italic;">Esta mensagem ainda não foi respondida.</p>'}
    `;

    openModal('modalDetalhesMensagemDiretoria');
}

function abrirModalEnviarComunicado() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let ativos = list.filter(a => a.status === 'ativo' || !a.status);
    ativos.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));

    // Preenche select individual
    const selectUnico = document.getElementById('comunicadoAssociadoUnico');
    if (selectUnico) {
        selectUnico.innerHTML = ativos.map(a => `
            <option value="${a.cpf}">${a.nome_guerra || a.nome} (CPF: ${a.cpf})</option>
        `).join('');
    }

    // Preenche checkboxes para seleção de vários
    const containerCheck = document.getElementById('checkboxesAssociadosComunicado');
    if (containerCheck) {
        containerCheck.innerHTML = ativos.map(a => `
            <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.03); padding: 4px 6px; border-radius: 4px;">
                <input type="checkbox" name="comunicadoMesesAssociados" value="${a.cpf}">
                <span>${a.nome_guerra || a.nome}</span>
            </label>
        `).join('');
    }

    const elAssunto = document.getElementById('comunicadoAssunto');
    if (elAssunto) elAssunto.value = '';

    const elMensagem = document.getElementById('comunicadoMensagem');
    if (elMensagem) elMensagem.value = '';

    const elTipo = document.getElementById('comunicadoTipoDestinatario');
    if (elTipo) elTipo.value = 'todos';

    const elPrioridade = document.getElementById('comunicadoPrioridade');
    if (elPrioridade) elPrioridade.value = 'Informativo';

    toggleTipoDestinatario('todos');
    openModal('modalEnviarComunicado');
}

function toggleTipoDestinatario(tipo) {
    const divInd = document.getElementById('divDestinatarioIndividual');
    const divMult = document.getElementById('divDestinatariosMultiplos');

    if (divInd) divInd.style.display = tipo === 'individual' ? 'block' : 'none';
    if (divMult) divMult.style.display = tipo === 'selecao' ? 'block' : 'none';
}

let todosMarcadosComunicado = false;
function marcarDesmarcarTodosComunicado() {
    todosMarcadosComunicado = !todosMarcadosComunicado;
    const checkboxes = document.querySelectorAll('input[name="comunicadoMesesAssociados"]');
    checkboxes.forEach(cb => cb.checked = todosMarcadosComunicado);
}

function salvarNovoComunicado(e) {
    e.preventDefault();
    const tipo = document.getElementById('comunicadoTipoDestinatario').value;
    const assunto = document.getElementById('comunicadoAssunto').value.trim();
    const prioridade = document.getElementById('comunicadoPrioridade').value;
    const mensagem = document.getElementById('comunicadoMensagem').value.trim();

    if (!assunto || !mensagem) {
        alert('Por favor, informe o assunto e a mensagem.');
        return;
    }

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let cpfsDestinatarios = [];
    let resumoDestinatarios = '';

    if (tipo === 'todos') {
        cpfsDestinatarios = ['TODOS'];
        resumoDestinatarios = '📢 Todos os Associados Ativos';
    } else if (tipo === 'individual') {
        const cpfSel = document.getElementById('comunicadoAssociadoUnico').value;
        const assoc = listAssociados.find(a => a.cpf === cpfSel);
        if (!assoc) {
            alert('Por favor, selecione um associado destinatário.');
            return;
        }
        cpfsDestinatarios = [cpfSel];
        resumoDestinatarios = `👤 ${assoc.nome_guerra || assoc.nome} (${assoc.cpf})`;
    } else if (tipo === 'selecao') {
        const checked = Array.from(document.querySelectorAll('input[name="comunicadoMesesAssociados"]:checked'));
        if (checked.length === 0) {
            alert('Por favor, selecione ao menos um associado para receber esta mensagem.');
            return;
        }
        cpfsDestinatarios = checked.map(c => c.value);
        const nomesSel = cpfsDestinatarios.map(cpf => {
            const a = listAssociados.find(item => item.cpf === cpf);
            return a ? (a.nome_guerra || a.nome) : cpf;
        });
        resumoDestinatarios = `👥 ${checked.length} integrantes selecionados (${nomesSel.slice(0, 3).join(', ')}${checked.length > 3 ? '...' : ''})`;
    }

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novoComunicado = {
        id: 'comunicado_' + Date.now(),
        remetente_cpf: currentUser.cpf,
        remetente_nome: currentUser.nome_guerra || currentUser.nome || 'Diretoria ACBCSJ',
        destinatario_tipo: tipo,
        destinatarios_cpfs: cpfsDestinatarios,
        destinatarios_resumo: resumoDestinatarios,
        assunto: assunto,
        prioridade: prioridade,
        mensagem: mensagem,
        data: dataFormatada
    };

    let comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    comunicados.unshift(novoComunicado);
    localStorage.setItem('acbcsj_comunicados_enviados', JSON.stringify(comunicados));

    if (typeof dbService !== 'undefined') {
        try {
            dbService.addMensagem({
                id: novoComunicado.id,
                associado_id: null,
                associado_cpf: null,
                associado_nome: novoComunicado.remetente_nome,
                destinatario: tipo === 'todos' ? 'todos' : (cpfsDestinatarios ? cpfsDestinatarios.join(',') : 'todos'),
                assunto: assunto,
                conteudo: mensagem,
                prioridade: prioridade,
                status: 'enviada',
                data_envio: dataFormatada
            });
        } catch(e) {}
    }

    alert(`Comunicado "${assunto}" encaminhado com sucesso para ${resumoDestinatarios}!`);
    closeModal('modalEnviarComunicado');
    alternarAbaMensagensDiretoria('enviadas');
}

function excluirComunicadoEnviado(id) {
    if (confirm('Deseja realmente remover este comunicado enviado?')) {
        let comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        comunicados = comunicados.filter(c => c.id !== id);
        localStorage.setItem('acbcsj_comunicados_enviados', JSON.stringify(comunicados));
        if (typeof dbService !== 'undefined') {
            try { dbService.deleteMensagem(id); } catch(e) {}
        }
        alert('Comunicado removido.');
        renderMensagensDiretoria();
    }
}
