    alert('Seus dados cadastrais foram atualizados com sucesso!');
    closeModal('modalEditarMeusDados');
    renderAssociadoOverview();
}

// GESTÃO DO VALOR BASE DA MENSALIDADE
function getValorMensalidadeVigente() {
    const val = parseFloat(localStorage.getItem('acbcsj_valor_mensalidade'));
    return isNaN(val) || val <= 0 ? 20.00 : val;
}

function abrirModalReajustarMensalidade() {
    const valorAtual = getValorMensalidadeVigente();
    const inputVal = document.getElementById('inputNovoValorMensalidade');
    if (inputVal) inputVal.value = valorAtual.toFixed(2);
    openModal('modalReajustarMensalidade');
}

function salvarNovoValorMensalidade(e) {
    e.preventDefault();
    const novoValor = parseFloat(document.getElementById('inputNovoValorMensalidade').value) || 20.00;

    if (novoValor <= 0) {
        alert('Por favor, informe um valor de mensalidade válido.');
        return;
    }

    localStorage.setItem('acbcsj_valor_mensalidade', novoValor.toFixed(2));
    alert(`Novo valor base da mensalidade aplicado: R$ ${novoValor.toFixed(2).replace('.', ',')}/mês.`);
    closeModal('modalReajustarMensalidade');
    renderGestaoMensalidades();
    renderAssociadoOverview();
}

// CÁLCULO DE VENCIMENTO DIA 15 E STATUS DE MENSALIDADE
function calcularStatusMensalidade(mesIndex, anoStr, valorPago) {
    const valor = parseFloat(valorPago) || 0;
    const baseVal = getValorMensalidadeVigente();
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtualNum = hoje.getMonth() + 1; // 1 a 12
    const diaAtual = hoje.getDate(); // 1 a 31

    const anoNum = parseInt(anoStr, 10);
    const dataVencimentoStr = `15/${String(mesIndex).padStart(2, '0')}/${anoNum}`;

    if (valor >= baseVal) {
        return {
            status: 'pago',
            badge: `<span class="badge badge-success" style="font-size:10px; padding:2px 4px;">✅ R$ ${valor.toFixed(2).replace('.', ',')}</span>`,
            vencimento: dataVencimentoStr,
            isVencido: false,
            debitAmount: 0
        };
    } else if (valor > 0) {
        const falta = baseVal - valor;
        const isV = (anoNum < anoAtual || (anoNum === anoAtual && (mesIndex < mesAtualNum || (mesIndex === mesAtualNum && diaAtual > 15))));
        return {
            status: 'parcial',
            badge: `<span class="badge badge-warning" style="font-size:10px; padding:2px 4px;">⚠️ R$ ${valor.toFixed(2).replace('.', ',')}</span>`,
            vencimento: dataVencimentoStr,
            isVencido: isV,
            debitAmount: falta
        };
    } else {
        let isVencido = false;
        if (anoNum < anoAtual) {
            isVencido = true;
        } else if (anoNum === anoAtual) {
            if (mesIndex < mesAtualNum) {
                isVencido = true;
            } else if (mesIndex === mesAtualNum) {
                if (diaAtual > 15) {
                    isVencido = true;
                }
            }
        }

        if (isVencido) {
            return {
                status: 'vencido',
                badge: `<span class="badge badge-danger" style="font-size:10px; padding:2px 4px;">🔴 R$ 0,00</span>`,
                vencimento: dataVencimentoStr,
                isVencido: true,
                debitAmount: baseVal
            };
        } else {
            return {
                status: 'a_vencer',
                badge: `<span style="color:var(--text-muted); font-size:11px;">-</span>`,
                vencimento: dataVencimentoStr,
                isVencido: false,
                debitAmount: 0
            };
        }
    }
}

// RENDERIZAR PAINEL DO ASSOCIADO
function renderAssociadoOverview() {
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome && currentUser) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }

    const profileContainer = document.getElementById('myProfileDetailsDisplay');
    if (profileContainer && currentUser) {
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

    const selAno = document.getElementById('selAnoMeuPainel');
    const ano = selAno ? selAno.value : '2026';
    const lbls = document.querySelectorAll('.lblAnoMeuPainel');
    lbls.forEach(el => el.textContent = ano);

    const baseVal = getValorMensalidadeVigente();
    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    const grid = JSON.parse(localStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (!container || !currentUser) return;

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
    let totalDebitos = 0;
    let temDebitoVencido = false;

    const rowsHtml = mesesList.map(m => {
        const valPago = parseFloat(socio[m.key]) || 0;
        totalPagoAno += valPago;

        const info = calcularStatusMensalidade(m.index, ano, valPago);
        if (info.isVencido) {
            temDebitoVencido = true;
            totalDebitos += info.debitAmount;
        }

        return `
            <tr>
                <td><b>${m.nome} / ${ano}</b></td>
                <td><span class="badge badge-info">${info.vencimento}</span></td>
                <td>R$ ${baseVal.toFixed(2).replace('.', ',')}</td>
                <td style="font-weight: 700; color: ${valPago > 0 ? '#2ECC71' : 'var(--text-muted)'};">
                    R$ ${valPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>${info.badge}</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = rowsHtml;

    const elTotalPago = document.getElementById('myMetricTotalPago');
    const elDebitos = document.getElementById('myMetricDebitos');
    const elSituacao = document.getElementById('myMetricSituacao');

    if (elTotalPago) elTotalPago.textContent = `R$ ${totalPagoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDebitos) elDebitos.textContent = `R$ ${totalDebitos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSituacao) {
        if (temDebitoVencido) {
            elSituacao.innerHTML = `<span class="badge badge-danger">🔴 POSSUI PENDÊNCIAS (Vencidas após dia 15)</span>`;
        } else {
            elSituacao.innerHTML = `<span class="badge badge-success">🟢 EM DIA COM A ASSOCIAÇÃO</span>`;
        }
    }
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

// CONTROLE DE MENSALIDADES DOS ASSOCIADOS (DIRETORIA)
function renderGestaoMensalidades() {
    const selAno = document.getElementById('selAnoMensalidades');
    const ano = selAno ? selAno.value : '2026';

    const baseVal = getValorMensalidadeVigente();
    const elBaseVal = document.getElementById('metricValorMensalidadeVigente');
    if (elBaseVal) elBaseVal.textContent = `R$ ${baseVal.toFixed(2).replace('.', ',')}`;

    const lbls = document.querySelectorAll('.lblAnoMensalidadeMetrica');
    lbls.forEach(el => el.textContent = ano);

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = list.filter(a => a.status === 'ativo' || !a.status);

    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = JSON.parse(localStorage.getItem(storageKey));

    if (!grid) {
        if (ano === '2026') {
            grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
        } else {
            grid = ativos.map(a => ({
                nome_guerra: a.nome_guerra || a.nome,
                nome_completo: a.nome,
                cpf: a.cpf,
                jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
            }));
        }
        localStorage.setItem(storageKey, JSON.stringify(grid));
    }

    const searchInput = document.getElementById('searchAssociadoMensalidade');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filterStatus = document.getElementById('filterStatusMensalidade')?.value || 'todos';

    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    let totalArrecadadoAno = 0;
    let emDiaCount = 0;
    let pendentesCount = 0;

    let associadosProcessados = ativos.map(socio => {
        const itemGrid = grid.find(g => {
            const gCpf = (g.cpf || '').replace(/\D/g, '');
            const sCpf = (socio.cpf || '').replace(/\D/g, '');
            if (gCpf && sCpf && gCpf === sCpf) return true;
            const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
            const sNg = (typeof socio.nome_guerra === 'string' ? socio.nome_guerra : '').toLowerCase();
            const sNc = (typeof socio.nome === 'string' ? socio.nome : '').toLowerCase();
            return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
        }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

        let totalPagoSocio = 0;
        let mesesDevidos = 0;

        mesesKeys.forEach((key, index) => {
            const val = parseFloat(itemGrid[key]) || 0;
            totalPagoSocio += val;
            totalArrecadadoAno += val;

            const st = calcularStatusMensalidade(index + 1, ano, val);
            if (st.isVencido) {
                mesesDevidos++;
            }
        });

        const isEmDia = mesesDevidos === 0;
        if (isEmDia) emDiaCount++; else pendentesCount++;

        return {
            ...socio,
            gridData: itemGrid,
            totalPagoSocio,
            mesesDevidos,
            isEmDia
        };
    });

    const elArrecadado = document.getElementById('metricTotalArrecadadoMensalidades');
    const elEmDia = document.getElementById('metricAssociadosEmDia');
    const elPendentes = document.getElementById('metricAssociadosPendentes');

    if (elArrecadado) elArrecadado.textContent = `R$ ${totalArrecadadoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elEmDia) elEmDia.textContent = `${emDiaCount} associados`;
    if (elPendentes) elPendentes.textContent = `${pendentesCount} associados`;

    if (searchTerm) {
        associadosProcessados = associadosProcessados.filter(a => {
            const ng = (a.nome_guerra || '').toLowerCase();
            const nc = (a.nome || '').toLowerCase();
            const cpf = (a.cpf || '').replace(/\D/g, '');
            return ng.includes(searchTerm) || nc.includes(searchTerm) || cpf.includes(searchTerm);
        });
    }

    if (filterStatus === 'em_dia') {
        associadosProcessados = associadosProcessados.filter(a => a.isEmDia);
    } else if (filterStatus === 'atrasado') {
        associadosProcessados = associadosProcessados.filter(a => !a.isEmDia);
    }

    const container = document.getElementById('tableGestaoMensalidadesBody');
    if (container) {
        if (associadosProcessados.length === 0) {
            container.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum associado encontrado para os filtros selecionados.</td></tr>`;
        } else {
            container.innerHTML = associadosProcessados.map(a => {
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(a.gridData[k]) || 0;
                    const info = calcularStatusMensalidade(idx + 1, ano, val);
                    return `<td>${info.badge}</td>`;
                }).join('');

                const statusBadge = a.isEmDia 
                    ? `<span class="badge badge-success" style="font-size:11px; padding: 4px 8px; background:#2ECC71; color:#fff; font-weight:bold;">🟢 EM DIA</span>` 
                    : `<span class="badge badge-danger" style="font-size:11px; padding: 4px 8px; background:#E74C3C; color:#fff; font-weight:bold;" title="${a.mesesDevidos} mês(es) em atraso">🔴 INADIMPLENTE (${a.mesesDevidos})</span>`;

                return `
                    <tr>
                        <td style="text-align: left;">
                            <b>${a.nome_guerra || a.nome}</b><br>
                            <small style="color: var(--text-muted);">${a.cpf}</small>
                        </td>
                        ${cellsMeses}
                        <td style="font-weight: 700; color: var(--accent-gold);">
                            R$ ${a.totalPagoSocio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td>${statusBadge}</td>
                        <td>
                            <div style="display: flex; gap: 4px; justify-content: center;">
                                <button class="btn btn-sm btn-gold" style="padding: 2px 6px; font-size: 11px;" onclick="abrirModalDarBaixa('${a.cpf}')">💳 Baixar</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px;" onclick="verExtratoAssociado('${a.cpf}')">📋 Histórico</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px; color: var(--accent-gold); border-color: var(--accent-gold);" onclick="verExtratoAssociado('${a.cpf}')">✏️ Editar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // PROCESSA ASSOCIADOS DESLIGADOS NA PARTE INFERIOR
    const desligados = list.filter(a => a.status === 'desligado');
    const containerDesligados = document.getElementById('tableMensalidadesDesligadosBody');
    if (containerDesligados) {
        if (desligados.length === 0) {
            containerDesligados.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 15px;">Nenhum associado desligado registrado no sistema.</td></tr>`;
        } else {
            containerDesligados.innerHTML = desligados.map(socio => {
                const itemGrid = grid.find(g => {
                    const gCpf = (g.cpf || '').replace(/\D/g, '');
                    const sCpf = (socio.cpf || '').replace(/\D/g, '');
                    if (gCpf && sCpf && gCpf === sCpf) return true;
                    const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
                    const sNg = (typeof socio.nome_guerra === 'string' ? socio.nome_guerra : '').toLowerCase();
                    const sNc = (typeof socio.nome === 'string' ? socio.nome : '').toLowerCase();
                    return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
                }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

                let totalPagoSocio = 0;
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(itemGrid[k]) || 0;
                    totalPagoSocio += val;
                    const info = calcularStatusMensalidade(idx + 1, ano, val);
                    return `<td>${info.badge}</td>`;
                }).join('');

                const dataDeslig = socio.data_desligamento || 'Data não registrada';

                return `
                    <tr style="background: rgba(231, 76, 60, 0.05);">
                        <td style="text-align: left;">
                            <b>${socio.nome_guerra || socio.nome}</b><br>
                            <small style="color: var(--text-muted);">${socio.cpf}</small><br>
                            <span class="badge badge-danger" style="font-size: 9px; margin-top: 2px;">🚫 DESLIGADO em ${dataDeslig}</span>
                        </td>
                        ${cellsMeses}
                        <td style="font-weight: 700; color: var(--accent-gold);">
                            R$ ${totalPagoSocio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td><span class="badge badge-secondary" style="font-size: 10px;">DESLIGADO</span></td>
                        <td>
                            <div style="display: flex; gap: 4px; justify-content: center;">
                                <button class="btn btn-sm btn-gold" style="padding: 2px 6px; font-size: 11px;" onclick="abrirModalDarBaixa('${socio.cpf}')">💳 Baixar</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px;" onclick="verExtratoAssociado('${socio.cpf}')">📋 Histórico</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px; color: var(--accent-gold); border-color: var(--accent-gold);" onclick="verExtratoAssociado('${socio.cpf}')">✏️ Editar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// BAIXA DE MENSALIDADE VIA PIX
function abrirModalDarBaixa(cpf = null) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];

    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    if (selectAssoc) {
        selectAssoc.innerHTML = list.map(a => `
            <option value="${a.cpf}" ${cpf && a.cpf === cpf ? 'selected' : ''}>
                ${a.nome_guerra || a.nome} ${a.status === 'desligado' ? '(DESLIGADO)' : ''} (CPF: ${a.cpf})
            </option>
        `).join('');
    }

    const dataInput = document.getElementById('baixaData');
    if (dataInput) dataInput.value = new Date().toISOString().split('T')[0];

    const obsInput = document.getElementById('baixaObs');
    if (obsInput) obsInput.value = '';

    const compInput = document.getElementById('baixaComprovantePix');
    if (compInput) compInput.value = '';

    atualizarCheckboxesBaixa();
    openModal('modalDarBaixaMensalidade');
}

function atualizarCheckboxesBaixa() {
    const checkboxes = document.querySelectorAll('input[name="baixaMeses"]');
    checkboxes.forEach(cb => cb.checked = false);
    atualizarValoresBaixa();
}

function atualizarValoresBaixa() {
    const baseVal = getValorMensalidadeVigente();
    const checked = document.querySelectorAll('input[name="baixaMeses"]:checked');
    const total = checked.length * baseVal;
    const inputTotal = document.getElementById('baixaValorTotal');
    if (inputTotal) inputTotal.value = total.toFixed(2);
}

function salvarBaixaMensalidade(e) {
    e.preventDefault();
    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    const cpf = selectAssoc ? selectAssoc.value : '';
    const anoRef = document.getElementById('baixaAnoRef').value;
    const dataInput = document.getElementById('baixaData').value;
    const valorTotal = parseFloat(document.getElementById('baixaValorTotal').value) || 0;
    const comprovantePix = document.getElementById('baixaComprovantePix').value.trim();
    const obs = document.getElementById('baixaObs').value.trim();

    const checkedMeses = Array.from(document.querySelectorAll('input[name="baixaMeses"]:checked')).map(c => c.value);

    if (!cpf || valorTotal <= 0 || !dataInput || checkedMeses.length === 0) {
        alert('Por favor, preencha o associado, selecione ao menos um mês e informe a data e valor.');
        return;
    }

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const socio = list.find(a => a.cpf === cpf);
    const nomeAssociado = socio ? (socio.nome_guerra || socio.nome) : 'Associado';

    const [anoD, mesD, diaD] = dataInput.split('-');
    const dataBR = `${diaD}/${mesD}/${anoD}`;

    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };
    const mesesTexto = checkedMeses.map(m => mesesNomesMap[m]).join(', ');

    const itemHistorico = {
        id: 'mensalidade_' + Date.now(),
        cpf: cpf,
        associado_nome: nomeAssociado,
        ano: anoRef,
        valor: valorTotal,
        data: dataBR,
        data_iso: dataInput,
        forma: 'PIX',
        comprovante_pix: comprovantePix || 'Comprovante PIX recebido',
        meses_quitados: mesesTexto,
        obs: obs || `Quitação de mensalidade PIX (${mesesTexto}/${anoRef})`
    };

    let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    historicoGeral.unshift(itemHistorico);
    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));

    recalcularGridAssociado(cpf, anoRef);

    alert(`Baixa de mensalidade de R$ ${valorTotal.toFixed(2).replace('.', ',')} efetuada com sucesso para ${nomeAssociado}!`);
    closeModal('modalDarBaixaMensalidade');
    renderGestaoMensalidades();
    renderGestaoFinanceira();
}

// VER EXTRATO DO ASSOCIADO E OPÇÕES DE EDIÇÃO
function verExtratoAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf) || { nome: 'Associado', nome_guerra: 'Associado', cpf: cpf };

    const historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const cleanCpf = (cpf || '').replace(/\D/g, '');
    const historicoAssociado = historicoGeral.filter(h => (h.cpf || '').replace(/\D/g, '') === cleanCpf);

    const totalPagoTodosAnos = historicoAssociado.reduce((sum, h) => sum + (parseFloat(h.valor) || 0), 0);

    const container = document.getElementById('extratoAssociadoConteudo');
    if (container) {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 15px;">
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">ASSOCIADO</div>
                    <div style="font-size: 15px; font-weight: bold; color: var(--accent-gold);">${a.nome_guerra || a.nome}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${a.nome}</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">TOTAL CONTRIBUÍDO VIA PIX</div>
                    <div style="font-size: 16px; font-weight: bold; color: #2ECC71;">R$ ${totalPagoTodosAnos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${historicoAssociado.length} lançamentos efetuados</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">OBM / SITUAÇÃO</div>
                    <div style="font-size: 14px; font-weight: bold;">${a.obm || 'São José'}</div>
                    <span class="badge badge-${a.status === 'desligado' ? 'danger' : 'success'}" style="font-size: 10px;">${a.status === 'desligado' ? 'CADASTRO DESLIGADO' : 'CADASTRO ATIVO'}</span>
                </div>
            </div>

            <h4 style="font-size: 14px; color: var(--accent-gold); margin-bottom: 10px;">💳 Histórico de Baixas PIX Efetuadas:</h4>
            ${historicoAssociado.length === 0 ? `
                <p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 6px;">Nenhum pagamento registrado no histórico individual até o momento.</p>
            ` : `
                <div class="table-responsive">
                    <table class="custom-table" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th>Data Pagamento</th>
                                <th>Exercício / Ano</th>
                                <th>Meses Quitados</th>
                                <th>Valor (R$)</th>
                                <th>Forma / Comprovante PIX</th>
                                <th>Observações</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${historicoAssociado.map(h => `
                                <tr>
                                    <td><b>${h.data}</b></td>
                                    <td><span class="badge badge-info">${h.ano}</span></td>
                                    <td><b>${h.meses_quitados}</b></td>
                                    <td style="font-weight: 700; color: #2ECC71;">+ R$ ${(parseFloat(h.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td><span class="badge badge-success">PIX</span> <small>${h.comprovante_pix || ''}</small></td>
                                    <td>${h.obs || '-'}</td>
                                    <td>
                                        <div style="display: flex; gap: 4px;">
                                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px;" onclick="abrirModalEditarBaixa('${h.id}')">✏️ Editar</button>
                                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px; color: #E74C3C; border-color: #E74C3C;" onclick="excluirBaixaMensalidade('${h.id}')">🗑️ Excluir</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        `;
    }

    openModal('modalExtratoAssociado');
}

// RECALCULAR GRADE DO ASSOCIADO APÓS EDIÇÃO / EXCLUSÃO
function recalcularGridAssociado(cpf, ano) {
    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = JSON.parse(localStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    const historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const cleanCpf = (cpf || '').replace(/\D/g, '');
    const baixasDoAno = historicoGeral.filter(h => (h.cpf || '').replace(/\D/g, '') === cleanCpf && h.ano === ano);

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const assocObj = listAssociados.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);

    let socioGrid = grid.find(g => {
        const gCpf = (g.cpf || '').replace(/\D/g, '');
        if (gCpf && cleanCpf && gCpf === cleanCpf) return true;
        if (assocObj) {
            const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
            const sNg = (typeof assocObj.nome_guerra === 'string' ? socioGrid ? socioGrid.nome_guerra : assocObj.nome_guerra : '').toLowerCase();
            const sNc = (typeof assocObj.nome === 'string' ? assocObj.nome : '').toLowerCase();
            return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
        }
        return false;
    });

    if (!socioGrid && assocObj) {
        socioGrid = {
            nome_guerra: assocObj.nome_guerra || assocObj.nome,
            nome_completo: assocObj.nome,
            cpf: assocObj.cpf,
            jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
        };
        grid.push(socioGrid);
    }

    if (!socioGrid) return;
    socioGrid.cpf = cpf;

    if (ano === '2026') {
        const basePlanilha = (INITIAL_MENSAL_DATA || []).find(b => {
            const ng = (typeof b.nome_guerra === 'string' ? b.nome_guerra : '').toLowerCase();
            const sNg = (typeof socioGrid.nome_guerra === 'string' ? socioGrid.nome_guerra : '').toLowerCase();
            return ng && sNg && ng === sNg;
        });
        const mesesKeys = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        mesesKeys.forEach(k => {
            socioGrid[k] = basePlanilha ? (parseFloat(basePlanilha[k]) || 0) : 0;
        });
    } else {
        const mesesKeys = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        mesesKeys.forEach(k => socioGrid[k] = 0);
    }

    const mesesNomesMapInv = { Jan:'jan', Fev:'fev', Mar:'mar', Abr:'abr', Mai:'mai', Jun:'jun', Jul:'jul', Ago:'ago', Set:'set', Out:'out', Nov:'nov', Dez:'dez' };
    baixasDoAno.forEach(b => {
        const listaMeses = (b.meses_quitados || '').split(',').map(m => m.trim());
        const valorPorMes = (parseFloat(b.valor) || 0) / (listaMeses.length || 1);
        listaMeses.forEach(mSigla => {
            const key = mesesNomesMapInv[mSigla];
            if (key) {
                socioGrid[key] = (parseFloat(socioGrid[key]) || 0) + valorPorMes;
            }
        });
    });

    localStorage.setItem(storageKey, JSON.stringify(grid));
    if (ano === '2026') {
        localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify(grid));
    }
}

// EDITAR BAIXA DE MENSALIDADE
function abrirModalEditarBaixa(id) {
    const historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const item = historicoGeral.find(h => h.id === id);
    if (!item) {
        alert('Lançamento não encontrado.');
        return;
    }

    document.getElementById('editBaixaId').value = item.id;
    document.getElementById('editBaixaAssociadoNome').value = item.associado_nome;
    document.getElementById('editBaixaAnoRef').value = item.ano;
    document.getElementById('editBaixaValor').value = item.valor;
    document.getElementById('editBaixaData').value = item.data_iso || new Date().toISOString().split('T')[0];
    document.getElementById('editBaixaComprovantePix').value = item.comprovante_pix || '';
    document.getElementById('editBaixaObs').value = item.obs || '';

    const listaMeses = (item.meses_quitados || '').split(',').map(m => m.trim().toLowerCase());
    const checkboxes = document.querySelectorAll('input[name="editBaixaMeses"]');
    checkboxes.forEach(cb => {
        cb.checked = listaMeses.some(m => m.startsWith(cb.value));
    });

    openModal('modalEditarBaixaMensalidade');
}

function salvarEdicaoBaixaMensalidade(e) {
    e.preventDefault();
    const id = document.getElementById('editBaixaId').value;
    const valorTotal = parseFloat(document.getElementById('editBaixaValor').value) || 0;
    const dataInput = document.getElementById('editBaixaData').value;
    const comprovantePix = document.getElementById('editBaixaComprovantePix').value.trim();
    const obs = document.getElementById('editBaixaObs').value.trim();
    const checkedMeses = Array.from(document.querySelectorAll('input[name="editBaixaMeses"]:checked')).map(c => c.value);

    if (valorTotal <= 0 || !dataInput || checkedMeses.length === 0) {
        alert('Por favor, preencha o valor, a data e selecione ao menos um mês.');
        return;
    }

    let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const index = historicoGeral.findIndex(h => h.id === id);
    if (index < 0) {
        alert('Lançamento não encontrado.');
        return;
    }

    const [anoD, mesD, diaD] = dataInput.split('-');
    const dataBR = `${diaD}/${mesD}/${anoD}`;
    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };
    const mesesTexto = checkedMeses.map(m => mesesNomesMap[m]).join(', ');

    historicoGeral[index].valor = valorTotal;
    historicoGeral[index].data = dataBR;
    historicoGeral[index].data_iso = dataInput;
    historicoGeral[index].comprovante_pix = comprovantePix || 'Comprovante PIX confirmado';
    historicoGeral[index].meses_quitados = mesesTexto;
    historicoGeral[index].obs = obs || `Baixa de mensalidade PIX (${mesesTexto}/${historicoGeral[index].ano})`;

    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));
    recalcularGridAssociado(historicoGeral[index].cpf, historicoGeral[index].ano);

    alert('Lançamento de mensalidade atualizado com sucesso!');
    closeModal('modalEditarBaixaMensalidade');
    renderGestaoMensalidades();
    renderGestaoFinanceira();
    if (historicoGeral[index].cpf) verExtratoAssociado(historicoGeral[index].cpf);
}

function excluirBaixaMensalidade(id) {
    if (confirm('Deseja realmente excluir este lançamento de mensalidade PIX? Esta ação desfará o pagamento na grade anual.')) {
        let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        const item = historicoGeral.find(h => h.id === id);
        if (!item) return;

        historicoGeral = historicoGeral.filter(h => h.id !== id);
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));

        recalcularGridAssociado(item.cpf, item.ano);

        alert('Lançamento de mensalidade removido com sucesso.');
        renderGestaoMensalidades();
        renderGestaoFinanceira();
        verExtratoAssociado(item.cpf);
    }
}