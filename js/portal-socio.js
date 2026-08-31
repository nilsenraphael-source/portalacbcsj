// ==========================================
// PORTAL ACBCSJ - ÁREA EXCLUSIVA DO ASSOCIADO
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

// SOLICITAÇÃO DE DESLIGAMENTO VOLUNTÁRIO PELO ASSOCIADO
function abrirModalSolicitarDesligamento() {
    if (!currentUser) return;
    if (currentUser.solicitacao_desligamento && currentUser.solicitacao_desligamento.status === 'pendente') {
        alert('Você já possui uma solicitação de desligamento em análise pela Diretoria.');
        return;
    }
    document.getElementById('solicitacaoDesligamentoMotivo').value = '';
    const fileInput = document.getElementById('solicitacaoDesligamentoArquivo');
    if (fileInput) fileInput.value = '';
    const chk = document.getElementById('solicitacaoDesligamentoConcordo');
    if (chk) chk.checked = false;
    openModal('modalSolicitarDesligamento');
}

// GERAR CARTA DE DESLIGAMENTO PREENCHIDA COM DADOS DO ASSOCIADO
function gerarCartaDesligamentoPreenchida() {
    if (!currentUser) return;

    const mesesNomes = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = mesesNomes[hoje.getMonth()];
    const ano = hoje.getFullYear();
    const dataExtenso = `${dia < 10 ? '0' + dia : dia} de ${mes} de ${ano}`;

    const nome = currentUser.nome || 'Associado';
    const cpf = currentUser.cpf || 'Não informado';

    const win = window.open('', '_blank');
    if (!win) {
        alert('Por favor, permita popups para visualizar e imprimir a Carta de Desligamento.');
        return;
    }

    const htmlDoc = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Carta de Desligamento - ${nome}</title>
            <style>
                @page {
                    size: A4;
                    margin: 25mm 20mm 20mm 20mm;
                }
                * {
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    color: #111;
                    background: #fff;
                    margin: 0;
                    padding: 40px;
                    line-height: 1.6;
                }
                .no-print-bar {
                    background: #1e293b;
                    color: #fff;
                    padding: 14px 20px;
                    border-radius: 8px;
                    margin-bottom: 35px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .btn-action {
                    background: #d4af37;
                    color: #000;
                    border: none;
                    padding: 10px 20px;
                    font-size: 13px;
                    font-weight: bold;
                    border-radius: 6px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .btn-action:hover {
                    background: #c29d2b;
                }
                .header {
                    text-align: center;
                    position: relative;
                    padding-bottom: 25px;
                }
                .header-logo {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 75px;
                    height: auto;
                }
                .header-title {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    margin: 0 auto;
                    max-width: 480px;
                    line-height: 1.3;
                    text-transform: uppercase;
                }
                .header-line {
                    margin-top: 15px;
                    height: 8px;
                    background: linear-gradient(90deg, #b0c4de 0%, #dcdcdc 100%);
                    border-radius: 4px;
                }
                .doc-title {
                    text-align: center;
                    font-size: 17px;
                    font-weight: bold;
                    margin: 45px 0 35px 0;
                    letter-spacing: 0.5px;
                }
                .greeting {
                    font-size: 15px;
                    margin-bottom: 30px;
                }
                .doc-body {
                    font-size: 15px;
                    text-align: justify;
                    line-height: 2;
                    margin-bottom: 50px;
                }
                .doc-body p {
                    margin-bottom: 18px;
                    text-indent: 40px;
                }
                .date-location {
                    text-align: right;
                    font-size: 15px;
                    margin: 60px 0 80px 0;
                }
                .signature-wrapper {
                    text-align: center;
                    margin: 0 auto;
                    width: 380px;
                }
                .signature-line {
                    border-top: 1.5px solid #000;
                    margin-bottom: 8px;
                }
                .signature-name {
                    font-weight: bold;
                    font-size: 15px;
                    text-transform: uppercase;
                }
                .footer-container {
                    margin-top: 120px;
                    text-align: center;
                    font-size: 12px;
                    color: #444;
                    line-height: 1.5;
                }
                .footer-line-red {
                    height: 14px;
                    background: #c0392b;
                    margin-top: 15px;
                    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
                }
                @media print {
                    .no-print-bar { display: none !important; }
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="no-print-bar">
                <div>
                    <b style="font-size: 15px;">📄 Carta Oficial de Desligamento</b><br>
                    <span style="font-size: 12px; color: #94a3b8;">Documento preenchido automaticamente com seus dados. Imprima ou salve em PDF para assinar.</span>
                </div>
                <button class="btn-action" onclick="window.print()">
                    🖨️ Imprimir / Salvar PDF
                </button>
            </div>

            <div class="header">
                <img src="${window.location.origin}/logo.png" alt="Logo ACBCSJ" class="header-logo" onerror="this.style.display='none'">
                <div class="header-title">
                    Associação Corpo de Bombeiros Comunitários de São José
                </div>
                <div class="header-line"></div>
            </div>

            <div class="doc-title">
                Comunicação de Desligamento
            </div>

            <div class="greeting">
                Prezado(a) Sr.(a),
            </div>

            <div class="doc-body">
                <p>
                    Eu <b>${nome}</b>, portador(a) do CPF <b>${cpf}</b>, solicito o desligamento da Associação Corpo de Bombeiros Comunitários de São José - CNPJ 07.962.460/0001-40, localizada na Rua Getúlio Vargas, Nº 278, Centro, São José – SC, CEP 88103-400.
                </p>
                <p>
                    Declaro não deixar pendências financeiras.
                </p>
            </div>

            <div class="date-location">
                São José, ${dataExtenso}.
            </div>

            <div class="signature-wrapper">
                <div class="signature-line"></div>
                <div class="signature-name">${nome}</div>
            </div>

            <div class="footer-container">
                <div>Rua Getúlio Vargas, 278 – Praia Comprida – São José – SC</div>
                <div>CEP 88103-400 — E-mail bcassociacao@gmail.com</div>
                <div class="footer-line-red"></div>
            </div>
        </body>
        </html>
    `;

    win.document.open();
    win.document.write(htmlDoc);
    win.document.close();
}

function enviarSolicitacaoDesligamento(e) {
    e.preventDefault();
    if (!currentUser) return;

    const chkConcordo = document.getElementById('solicitacaoDesligamentoConcordo');
    if (chkConcordo && !chkConcordo.checked) {
        alert('Você precisa assinalar a declaração de concordância com o seu desligamento.');
        return;
    }

    const motivo = document.getElementById('solicitacaoDesligamentoMotivo').value.trim();
    const fileInput = document.getElementById('solicitacaoDesligamentoArquivo');

    if (!motivo) {
        alert('Por favor, descreva o motivo do seu pedido de desligamento.');
        return;
    }

    const agora = new Date();
    const dataHora = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const processarEnvio = (cartaDataUrl = null, cartaNome = null) => {
        currentUser.solicitacao_desligamento = {
            data: dataHora,
            data_iso: agora.toISOString(),
            motivo: motivo,
            concordou: true,
            status: 'pendente',
            carta_url: cartaDataUrl,
            carta_nome: cartaNome
        };

        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const index = list.findIndex(a => a.cpf === currentUser.cpf);
        if (index >= 0) {
            list[index] = { ...list[index], ...currentUser };
        }
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        try {
            if (typeof dbService !== 'undefined') {
                dbService.saveAssociado(currentUser);
                // Notifica a Diretoria via Mensagens (sincronizada via Supabase)
                dbService.addMensagem({
                    id: 'msg_deslig_' + Date.now(),
                    associado_id: currentUser.id || null,
                    associado_cpf: currentUser.cpf,
                    associado_nome: currentUser.nome_guerra || currentUser.nome,
                    destinatario: 'diretoria',
                    assunto: `⚠️ Solicitação de Desligamento: ${currentUser.nome_guerra || currentUser.nome}`,
                    conteudo: `O associado ${currentUser.nome} (CPF: ${currentUser.cpf}) enviou uma solicitação de desligamento voluntário em ${dataHora}.\n\nMotivo: ${motivo}`,
                    prioridade: 'Urgente',
                    status: 'pendente',
                    data_envio: dataHora,
                    arquivo_url: cartaDataUrl,
                    arquivo_nome: cartaNome
                });
            }
        } catch(err) {}

        alert('Sua solicitação de desligamento foi enviada com sucesso à Diretoria da ACBCSJ para análise e homologação.');
        closeModal('modalSolicitarDesligamento');
        renderAssociadoOverview();
    };

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            processarEnvio(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    } else {
        processarEnvio();
    }
}

function cancelarSolicitacaoDesligamento() {
    if (!currentUser) return;
    if (!confirm('Deseja realmente cancelar sua solicitação de desligamento e permanecer como associado ativo?')) {
        return;
    }

    currentUser.solicitacao_desligamento = null;
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const index = list.findIndex(a => a.cpf === currentUser.cpf);
    if (index >= 0) {
        list[index].solicitacao_desligamento = null;
    }
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        if (typeof dbService !== 'undefined') {
            dbService.saveAssociado(currentUser);
        }
    } catch(e) {}

    alert('Sua solicitação de desligamento foi cancelada. Seu cadastro permanece ativo.');
    renderAssociadoOverview();
}

// RENDERIZAR PAINEL DO ASSOCIADO (VISÃO GERAL, MENSAGENS E MENSALIDADES)
function renderAssociadoOverview() {
    if (!currentUser) return;

    // 0. Banner de solicitação de desligamento pendente
    const bannerDesligamento = document.getElementById('bannerSolicitacaoDesligamento');
    const btnSolicitar = document.getElementById('btnSolicitarDesligamento');
    const sol = currentUser.solicitacao_desligamento;

    if (sol && sol.status === 'pendente') {
        if (bannerDesligamento) {
            bannerDesligamento.style.display = 'block';
            const lblInfo = document.getElementById('lblBannerSolicitacaoInfo');
            const lblMotivo = document.getElementById('lblBannerSolicitacaoMotivo');
            if (lblInfo) lblInfo.innerHTML = `Seu pedido voluntário de desligamento enviado em <b>${sol.data}</b> está aguardando homologação formal pela Diretoria.`;
            if (lblMotivo) lblMotivo.textContent = `Motivo informado: "${sol.motivo}" ${sol.carta_nome ? `(Anexo: ${sol.carta_nome})` : ''}`;
        }
        if (btnSolicitar) btnSolicitar.style.display = 'none';
    } else {
        if (bannerDesligamento) bannerDesligamento.style.display = 'none';
        if (btnSolicitar) btnSolicitar.style.display = 'inline-flex';
    }

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
        const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
        const lidos = getComunicadosLidosUsuario();

        const meusComunicados = obterTodosComunicadosEMensagensAssociado(cleanUserCpf);

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
        grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || (typeof INITIAL_MENSAL_DATA !== 'undefined' ? INITIAL_MENSAL_DATA : []);
    }

    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');

    const socio = grid.find(s => {
        const sCpf = (s.cpf || '').replace(/\D/g, '');
        return sCpf && cleanUserCpf && sCpf === cleanUserCpf;
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
        const tarifaVigente = typeof getValorMensalidadeVigente === 'function' ? getValorMensalidadeVigente(m.index, ano) : 50;
        totalPagoAno += valPago;

        const info = typeof calcularStatusMensalidade === 'function' 
            ? calcularStatusMensalidade(m.index, ano, valPago, currentUser) 
            : { status: valPago >= tarifaVigente ? 'pago' : 'pendente', vencimento: `15/${m.index < 10 ? '0'+m.index : m.index}/${ano}`, isVencido: false, debitAmount: Math.max(0, tarifaVigente - valPago), isIsento: false };
        
        if (info.isVencido) {
            temDebitoVencido = true;
            totalDebitosPendente += info.debitAmount;
        }

        let badgeStatus = '';
        if (info.isIsento) {
            badgeStatus = `<span class="badge" style="font-weight: 600; font-size: 11px; padding: 4px 8px; background: rgba(148, 163, 184, 0.2); color: var(--text-muted); border: 1px solid rgba(148, 163, 184, 0.35);">⚪ ISENTO (Anterior ao Ingresso)</span>`;
        } else if (info.status === 'pago') {
            badgeStatus = `<span class="badge badge-success" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">✅ QUITADO / EM DIA</span>`;
        } else if (info.status === 'parcial') {
            badgeStatus = `<span class="badge badge-warning" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">⚠️ PAGO PARCIAL (Falta R$ ${info.debitAmount.toFixed(2).replace('.', ',')})</span>`;
        } else if (info.isVencido) {
            badgeStatus = `<span class="badge badge-danger" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">🔴 VENCIDO (Inadimplente)</span>`;
        } else {
            badgeStatus = `<span style="color: var(--text-muted); font-size: 12px; font-weight: 500;">⏳ A VENCER</span>`;
        }

        return `
            <tr style="${info.isIsento ? 'opacity: 0.85; background: rgba(255,255,255,0.01);' : ''}">
                <td><b style="color: var(--text-color);">${m.index < 10 ? '0' + m.index : m.index} - ${m.nome} / ${ano}</b></td>
                <td><span style="font-size: 12px; font-weight: 600; color: var(--accent-gold);">${info.vencimento}</span></td>
                <td>${info.isIsento ? '<span style="color:var(--text-muted); font-style:italic;">Isento</span>' : 'R$ ' + tarifaVigente.toFixed(2).replace('.', ',')}</td>
                <td style="font-weight: 700; color: ${valPago >= tarifaVigente ? '#2ECC71' : (valPago > 0 ? '#F39C12' : 'var(--text-muted)')};">
                    ${info.isIsento && valPago === 0 ? '<span style="color:var(--text-muted);">-</span>' : 'R$ ' + valPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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

function obterTodosComunicadosEMensagensAssociado(cleanUserCpf) {
    const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    const mensagensAll = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];

    const itens = [];

    // 1. Comunicados gerais ou individuais enviados pela diretoria
    comunicadosAll.forEach(c => {
        let match = false;
        if (c.destinatario_tipo === 'todos') match = true;
        else if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
            if (c.destinatarios_cpfs.includes('TODOS')) match = true;
            else if (c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf)) match = true;
        }
        if (match) {
            itens.push({
                id: c.id,
                assunto: c.assunto,
                mensagem: c.mensagem,
                prioridade: c.prioridade || 'Informativo',
                data: c.data,
                remetente_nome: c.remetente_nome || 'Diretoria ACBCSJ',
                destinatarios_resumo: c.destinatarios_resumo || 'Associados'
            });
        }
    });

    // 2. Mensagens diretas ou respostas de solicitações (ex: indeferimento/homologação de desligamento ou resposta de ideia)
    mensagensAll.forEach(m => {
        const cleanDest = (m.destinatario || '').replace(/\D/g, '');
        const cleanAssoc = (m.associado_cpf || '').replace(/\D/g, '');

        if (cleanDest === cleanUserCpf || (cleanAssoc === cleanUserCpf && (m.status === 'indeferida' || m.status === 'respondida' || m.status === 'homologada' || m.resposta))) {
            let msgFormatada = m.conteudo || m.mensagem || '';
            if (m.resposta && !msgFormatada.includes(m.resposta)) {
                msgFormatada += `\n\n📌 RESPOSTA OFICIAL DA DIRETORIA:\n"${m.resposta}"\n\n(Respondido por: ${m.respondido_por || 'Diretoria'} em ${m.data_resposta || m.data_envio || ''})`;
            }

            itens.push({
                id: m.id,
                assunto: m.assunto || '📢 Notificação da Diretoria',
                mensagem: msgFormatada,
                prioridade: m.prioridade || (m.status === 'indeferida' ? 'Urgente' : 'Importante'),
                data: m.data_resposta || m.data_envio || m.data || 'Recente',
                remetente_nome: m.respondido_por ? `${m.respondido_por} (Diretoria)` : 'Diretoria ACBCSJ',
                destinatarios_resumo: '👤 Você'
            });
        }
    });

    // Se o usuário tem resposta direta de desligamento gravada em seu perfil
    if (currentUser && currentUser.solicitacao_desligamento_resposta && (!currentUser.solicitacao_desligamento || currentUser.solicitacao_desligamento.status !== 'pendente')) {
        const resp = currentUser.solicitacao_desligamento_resposta;
        const respId = 'resp_deslig_' + (resp.data || '').replace(/\D/g, '');
        if (!itens.some(it => it.id === respId || (it.assunto && it.assunto.includes('Desligamento')))) {
            itens.unshift({
                id: respId,
                assunto: '📢 Resposta à Solicitação de Desligamento (Indeferida)',
                mensagem: `Sua solicitação voluntária de desligamento foi analisada pela Diretoria da ACBCSJ e foi INDEFERIDA / NÃO HOMOLOGADA em ${resp.data}.\n\nJustificativa da Diretoria: "${resp.justificativa}"\n\nRespondido por: ${resp.respondido_por || 'Diretoria ACBCSJ'}.\nSeu cadastro permanece ativo.`,
                prioridade: 'Urgente',
                data: resp.data,
                remetente_nome: `${resp.respondido_por || 'Diretoria'} (Diretoria)`,
                destinatarios_resumo: '👤 Você'
            });
        }
    }

    // Deduplica por id
    const mapa = new Map();
    itens.forEach(it => {
        if (!mapa.has(it.id)) mapa.set(it.id, it);
    });

    return Array.from(mapa.values());
}

function renderComunicadosHistoricoAssociado() {
    if (!currentUser) return;
    const container = document.getElementById('containerHistoricoComunicadosAssociado');
    if (!container) return;

    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const lidos = getComunicadosLidosUsuario();

    const termoBusca = (document.getElementById('filtroTextoComunicadosAssociado')?.value || '').toLowerCase().trim();

    let meusComunicados = obterTodosComunicadosEMensagensAssociado(cleanUserCpf);

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
