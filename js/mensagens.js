// ==========================================
// PORTAL ACBCSJ - MENSAGENS E COMUNICADOS
// ==========================================

async function enviarMensagemAssociado(e) {
    e.preventDefault();
    if (!currentUser) {
        alert('Por favor, faÃ§a login para enviar mensagens.');
        return;
    }
    const assunto = document.getElementById('msgAssuntoAssociado').value.trim();
    const conteudo = document.getElementById('msgConteudoAssociado').value.trim();
    if (!assunto || !conteudo) {
        alert('Preencha o assunto e a mensagem.');
        return;
    }

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' Ã s ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

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

function renderMensagensDiretoria() {
    const container = document.getElementById('listMensagensDiretoria');
    if (!container) return;

    if (abaMensagensAtiva === 'recebidas') {
        const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        if (msgs.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <p style="font-size: 14px;">📥 Nenhuma mensagem recebida de associados até o momento.</p>
                </div>
            `;
        } else {
            container.innerHTML = msgs.map(m => `
                <div class="card" style="margin-bottom: 12px; border-left: 4px solid var(--accent-gold);">
                    <div style="display:flex; justify-content:space-between; align-items: center; margin-bottom: 6px;">
                        <b style="font-size: 15px; color: var(--accent-gold);">${m.assunto || 'Sem assunto'}</b>
                        <small style="color:var(--text-muted); font-size: 11px;">📅 ${m.data || '-'}</small>
                    </div>
                    <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                        👤 Enviado por: <b style="color: #fff;">${m.associado_nome || 'Associado'}</b>
                    </div>
                    <p style="font-size:13px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; white-space: pre-wrap; margin: 0;">${m.conteudo || m.mensagem || ''}</p>
                </div>
            `).join('');
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
                            👥 Destinatários: <b style="color: #3498DB;">${c.destinatarios_resumo}</b>
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
