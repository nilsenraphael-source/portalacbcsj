// ==========================================
// PORTAL ACBCSJ - GESTÃO DE MENSALIDADES
// ==========================================

const TODOS_MESES_KEYS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MES_MAP_EXPAND = {
    jan: 'jan', janeiro: 'jan', '01': 'jan', '1': 'jan',
    fev: 'fev', fevereiro: 'fev', '02': 'fev', '2': 'fev',
    mar: 'mar', marco: 'mar', 'março': 'mar', '03': 'mar', '3': 'mar',
    abr: 'abr', abril: 'abr', '04': 'abr', '4': 'abr',
    mai: 'mai', maio: 'mai', '05': 'mai', '5': 'mai',
    jun: 'jun', junho: 'jun', '06': 'jun', '6': 'jun',
    jul: 'jul', julho: 'jul', '07': 'jul', '7': 'jul',
    ago: 'ago', agosto: 'ago', '08': 'ago', '8': 'ago',
    set: 'set', setembro: 'set', '09': 'set', '9': 'set',
    out: 'out', outubro: 'out', '10': 'out',
    nov: 'nov', novembro: 'nov', '11': 'nov',
    dez: 'dez', dezembro: 'dez', '12': 'dez'
};

function extrairListaMesesQuitados(rawString) {
    if (!rawString) return [];
    const str = String(rawString).trim().toLowerCase();
    if (!str) return [];

    if (str.includes('anual') || str.includes('todos') || str.includes('12m') || str === 'jan-dez' || str.startsWith('jan-dez') || str === 'jan a dez') {
        return [...TODOS_MESES_KEYS];
    }

    const rangeMatch = str.match(/([a-z]{3})\s*[-a]\s*([a-z]{3})/i);
    if (rangeMatch) {
        const startKey = MES_MAP_EXPAND[rangeMatch[1]];
        const endKey = MES_MAP_EXPAND[rangeMatch[2]];
        if (startKey && endKey) {
            const startIdx = TODOS_MESES_KEYS.indexOf(startKey);
            const endIdx = TODOS_MESES_KEYS.indexOf(endKey);
            if (startIdx >= 0 && endIdx >= startIdx) {
                return TODOS_MESES_KEYS.slice(startIdx, endIdx + 1);
            }
        }
    }

    const parts = str.split(/[,;\/|]+/).map(p => p.trim());
    const result = [];
    parts.forEach(p => {
        const clean = p.replace(/[^a-z0-9]/g, '');
        if (MES_MAP_EXPAND[clean]) {
            if (!result.includes(MES_MAP_EXPAND[clean])) result.push(MES_MAP_EXPAND[clean]);
        }
    });

    if (result.length > 0) return result;

    const cleanAll = str.replace(/[^a-z0-9]/g, '');
    if (MES_MAP_EXPAND[cleanAll]) return [MES_MAP_EXPAND[cleanAll]];

    return ['jan'];
}

function recalcularTodasGridsMensalidades() {
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    } catch(e) { list = []; }

    if (!list || !Array.isArray(list) || list.length === 0) {
        if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' && ASSOCIADOS_PLANILHA_REAL.length > 0) {
            list = ASSOCIADOS_PLANILHA_REAL;
        } else if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados) {
            list = MOCK_DATA_INITIAL.associados;
        }
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
    }

    const anos = ['2024', '2025', '2026', '2027', '2028'];
    const historico = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    anos.forEach(ano => {
        const storageKey = `acbcsj_mensalidades_grid_${ano}`;
        const grid = list.map(a => {
            const cleanCpf = (a.cpf || '').replace(/\D/g, '');
            const row = {
                nome_guerra: a.nome_guerra || a.nome,
                nome_completo: a.nome,
                cpf: a.cpf,
                jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
            };

            // VINCULAÇÃO ESTRITAMENTE POR CPF DO ASSOCIADO
            const lancamentosSocio = historico.filter(m => (m.cpf || '').replace(/\D/g, '') === cleanCpf && String(m.ano) === String(ano));
            lancamentosSocio.forEach(m => {
                const meses = extrairListaMesesQuitados(m.meses_quitados || m.mes_referencia);
                const valorTotal = typeof m.valor === 'number' ? m.valor : (parseFloat(String(m.valor || '0').replace(',', '.')) || 0);
                const valorPorMes = meses.length > 0 ? (valorTotal / meses.length) : valorTotal;
                meses.forEach(mk => {
                    if (row.hasOwnProperty(mk)) {
                        row[mk] = (parseFloat(row[mk]) || 0) + (valorPorMes > 0 ? valorPorMes : 20);
                    }
                });
            });

            return row;
        });

        localStorage.setItem(storageKey, JSON.stringify(grid));
        if (ano === '2026') {
            localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify(grid));
        }
    });

    if (typeof renderGestaoMensalidades === 'function' && (document.getElementById('tableGestaoMensalidadesBody') || document.getElementById('tableMensalidadesBody'))) {
        renderGestaoMensalidades();
    }
}

// GESTÃO HISTÓRICA DO VALOR BASE DA MENSALIDADE COM DATA DE VIGÊNCIA
function getHistoricoReajustesMensalidade() {
    let historico = null;
    try {
        historico = JSON.parse(localStorage.getItem('acbcsj_historico_reajustes_mensalidade'));
    } catch(e) {}
    if (!historico || !Array.isArray(historico) || historico.length === 0 || historico.some(h => h.valor !== 20.00)) {
        historico = [{
            id: 'reaj_inicial',
            valor: 20.00,
            mes_inicio: '01',
            ano_inicio: '2024',
            data_registro: '01/01/2024',
            justificativa: 'Valor base padrão (R$ 20,00)'
        }];
        localStorage.setItem('acbcsj_historico_reajustes_mensalidade', JSON.stringify(historico));
        localStorage.setItem('acbcsj_valor_mensalidade', '20.00');
    }
    return historico;
}

function getValorMensalidadeVigente(mesIndex, anoStr) {
    const historico = getHistoricoReajustesMensalidade();
    if (!mesIndex || !anoStr) {
        const hoje = new Date();
        mesIndex = hoje.getMonth() + 1;
        anoStr = String(hoje.getFullYear());
    }

    const targetScore = parseInt(anoStr, 10) * 100 + parseInt(mesIndex, 10);

    const validos = historico.filter(h => {
        const itemScore = parseInt(h.ano_inicio, 10) * 100 + parseInt(h.mes_inicio, 10);
        return itemScore <= targetScore;
    });

    if (validos.length === 0) {
        return historico[0].valor || 20.00;
    }

    validos.sort((a, b) => {
        const scoreA = parseInt(a.ano_inicio, 10) * 100 + parseInt(a.mes_inicio, 10);
        const scoreB = parseInt(b.ano_inicio, 10) * 100 + parseInt(b.mes_inicio, 10);
        return scoreB - scoreA;
    });

    return validos[0].valor;
}

function getInfoVigenciaMensalidadeAtual() {
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = String(hoje.getFullYear());
    const historico = getHistoricoReajustesMensalidade();

    const targetScore = parseInt(anoAtual, 10) * 100 + parseInt(mesAtual, 10);
    const validos = historico.filter(h => (parseInt(h.ano_inicio, 10) * 100 + parseInt(h.mes_inicio, 10)) <= targetScore);
    validos.sort((a, b) => (parseInt(b.ano_inicio, 10) * 100 + parseInt(b.mes_inicio, 10)) - (parseInt(a.ano_inicio, 10) * 100 + parseInt(a.mes_inicio, 10)));

    const reg = validos[0] || { valor: 20.00, mes_inicio: '01', ano_inicio: '2024' };
    return {
        valor: reg.valor,
        vigenciaStr: `R$ ${reg.valor.toFixed(2).replace('.', ',')}/mês (vigente a partir de ${reg.mes_inicio}/${reg.ano_inicio})`
    };
}

function abrirModalReajustarMensalidade() {
    const hoje = new Date();
    const strMes = String(hoje.getMonth() + 1).padStart(2, '0');
    const strAno = String(hoje.getFullYear());

    const valorAtual = getValorMensalidadeVigente(parseInt(strMes, 10), strAno);
    const inputVal = document.getElementById('inputNovoValorMensalidade');
    if (inputVal) inputVal.value = valorAtual.toFixed(2);

    const selMes = document.getElementById('inputMesVigenciaReajuste');
    if (selMes) selMes.value = strMes;

    const selAno = document.getElementById('inputAnoVigenciaReajuste');
    if (selAno) selAno.value = strAno;

    const inputJust = document.getElementById('inputJustificativaReajuste');
    if (inputJust) inputJust.value = '';

    const historico = getHistoricoReajustesMensalidade();
    const containerHist = document.getElementById('listaHistoricoReajustesDisplay');
    if (containerHist) {
        if (historico.length === 0) {
            containerHist.innerHTML = '<i>Nenhum reajuste registrado.</i>';
        } else {
            containerHist.innerHTML = historico.map(h => `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding: 4px 0;">
                    <span><b>R$ ${parseFloat(h.valor).toFixed(2).replace('.', ',')}</b>/mês (A partir de ${h.mes_inicio}/${h.ano_inicio})</span>
                    <span style="font-size: 10px; color: var(--accent-gold);">${h.justificativa || 'Aprovado'}</span>
                </div>
            `).join('');
        }
    }

    openModal('modalReajustarMensalidade');
}

function salvarNovoValorMensalidade(e) {
    e.preventDefault();
    const novoValor = parseFloat(document.getElementById('inputNovoValorMensalidade').value) || 20.00;
    const mesInicio = document.getElementById('inputMesVigenciaReajuste').value;
    const anoInicio = document.getElementById('inputAnoVigenciaReajuste').value;
    const justificativa = document.getElementById('inputJustificativaReajuste').value.trim() || `Reajuste aprovado pela Diretoria para vigorar a partir de ${mesInicio}/${anoInicio}`;

    if (novoValor <= 0) {
        alert('Por favor, informe um valor de mensalidade válido.');
        return;
    }

    let historico = getHistoricoReajustesMensalidade();

    const indexExistente = historico.findIndex(h => h.mes_inicio === mesInicio && h.ano_inicio === anoInicio);
    const novoRegistro = {
        id: 'reaj_' + Date.now(),
        valor: novoValor,
        mes_inicio: mesInicio,
        ano_inicio: anoInicio,
        data_registro: new Date().toLocaleDateString('pt-BR'),
        justificativa: justificativa
    };

    if (indexExistente >= 0) {
        historico[indexExistente] = novoRegistro;
    } else {
        historico.push(novoRegistro);
    }

    historico.sort((a, b) => {
        const scoreA = parseInt(a.ano_inicio, 10) * 100 + parseInt(a.mes_inicio, 10);
        const scoreB = parseInt(b.ano_inicio, 10) * 100 + parseInt(b.mes_inicio, 10);
        return scoreA - scoreB;
    });

    localStorage.setItem('acbcsj_historico_reajustes_mensalidade', JSON.stringify(historico));
    localStorage.setItem('acbcsj_valor_mensalidade', novoValor.toFixed(2));

    alert(`Novo valor de mensalidade (R$ ${novoValor.toFixed(2).replace('.', ',')}) registrado com sucesso para vigorar a partir de ${mesInicio}/${anoInicio}!\n\n⚠️ Os valores e cobranças dos meses anteriores a ${mesInicio}/${anoInicio} permanecerão intactos com suas tarifas históricas.`);
    closeModal('modalReajustarMensalidade');
    renderGestaoMensalidades();
    renderAssociadoOverview();
}

// CÁLCULO DE VENCIMENTO DIA 15 E STATUS DE MENSALIDADE
function calcularStatusMensalidade(mesIndex, anoStr, valorPago) {
    const valor = parseFloat(valorPago) || 0;
    const baseVal = getValorMensalidadeVigente(mesIndex, anoStr);
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

// CONTROLE DE MENSALIDADES DOS ASSOCIADOS (DIRETORIA)
function renderGestaoMensalidades() {
    const selAno = document.getElementById('selAnoMensalidades');
    const ano = selAno ? selAno.value : '2026';

    const infoVigencia = getInfoVigenciaMensalidadeAtual();
    const elBaseVal = document.getElementById('metricValorMensalidadeVigente');
    if (elBaseVal) elBaseVal.textContent = `R$ ${parseFloat(infoVigencia.valor || 20).toFixed(2).replace('.', ',')}`;

    const lbls = document.querySelectorAll('.lblAnoMensalidadeMetrica');
    lbls.forEach(el => el.textContent = ano);

    let list = [];
    try {
        list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    } catch(e) { list = []; }

    if (!list || !Array.isArray(list) || list.length === 0) {
        if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' && ASSOCIADOS_PLANILHA_REAL.length > 0) {
            list = ASSOCIADOS_PLANILHA_REAL;
        } else if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados) {
            list = MOCK_DATA_INITIAL.associados;
        }
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
    }

    let ativos = list.filter(a => a.status !== 'desligado');
    let desligados = list.filter(a => a.status === 'desligado');
    ativos.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
    desligados.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));

    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = [];
    try {
        grid = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch(e) { grid = []; }

    if (!grid || !Array.isArray(grid) || grid.length === 0) {
        recalcularTodasGridsMensalidades();
        try {
            grid = JSON.parse(localStorage.getItem(storageKey)) || [];
        } catch(e) { grid = []; }
    }

    const searchInput = document.getElementById('searchAssociadoMensalidade');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filterStatus = document.getElementById('filterStatusMensalidade')?.value || 'todos';

    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    let totalArrecadadoAno = 0;
    let emDiaCount = 0;
    let pendentesCount = 0;

    let associadosProcessados = ativos.map(socio => {
        const sCpf = (socio.cpf || '').replace(/\D/g, '');
        const itemGrid = (Array.isArray(grid) ? grid.find(g => (g.cpf || '').replace(/\D/g, '') === sCpf) : null) 
            || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

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
    if (elEmDia) elEmDia.textContent = `${emDiaCount} associado${emDiaCount === 1 ? '' : 's'}`;
    if (elPendentes) elPendentes.textContent = `${pendentesCount} associado${pendentesCount === 1 ? '' : 's'}`;

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

    associadosProcessados.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
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
    const containerDesligados = document.getElementById('tableMensalidadesDesligadosBody');
    if (containerDesligados) {
        if (desligados.length === 0) {
            containerDesligados.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 15px;">Nenhum associado desligado registrado no sistema.</td></tr>`;
        } else {
            containerDesligados.innerHTML = desligados.map(socio => {
                const sCpf = (socio.cpf || '').replace(/\D/g, '');
                const itemGrid = (Array.isArray(grid) ? grid.find(g => (g.cpf || '').replace(/\D/g, '') === sCpf) : null) 
                    || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

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
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    list.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));

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
    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    const cpf = selectAssoc ? selectAssoc.value : '';
    const selectAno = document.getElementById('baixaAnoRef');
    const anoRef = selectAno ? selectAno.value : '2026';

    const baseVal = getValorMensalidadeVigente();

    const storageKey = `acbcsj_mensalidades_grid_${anoRef}`;
    const grid = JSON.parse(localStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    
    const cleanCpf = (cpf || '').replace(/\D/g, '');

    const socioGrid = grid.find(g => {
        const gCpf = (g.cpf || '').replace(/\D/g, '');
        return gCpf && cleanCpf && gCpf === cleanCpf;
    }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };

    const checkboxes = document.querySelectorAll('input[name="baixaMeses"]');
    checkboxes.forEach(cb => {
        const mKey = cb.value;
        const valPago = parseFloat(socioGrid[mKey]) || 0;
        const parentLabel = cb.closest('label');

        if (valPago >= baseVal) {
            // Mês já pago/quitado: pré-marcar e desabilitar
            cb.checked = true;
            cb.disabled = true;
            if (parentLabel) {
                parentLabel.style.opacity = '0.65';
                parentLabel.style.background = 'rgba(46, 204, 113, 0.25)';
                parentLabel.style.borderColor = '#2ECC71';
                parentLabel.style.padding = '4px 6px';
                parentLabel.style.borderRadius = '4px';
                parentLabel.style.cursor = 'not-allowed';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]} já foi quitado (R$ ${valPago.toFixed(2).replace('.', ',')})`;
            }
        } else {
            // Mês em aberto: desmarcar e habilitar
            cb.checked = false;
            cb.disabled = false;
            if (parentLabel) {
                parentLabel.style.opacity = '1';
                parentLabel.style.background = 'transparent';
                parentLabel.style.borderColor = 'transparent';
                parentLabel.style.padding = '0';
                parentLabel.style.borderRadius = '0';
                parentLabel.style.cursor = 'pointer';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]} pendente para baixa`;
            }
        }
    });

    atualizarValoresBaixa();
}

function atualizarValoresBaixa() {
    const anoRef = document.getElementById('baixaAnoRef')?.value || '2026';
    const checkedNovos = document.querySelectorAll('input[name="baixaMeses"]:checked:not(:disabled)');
    
    const mesesKeysMap = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 };
    
    let total = 0;
    checkedNovos.forEach(cb => {
        const mIndex = mesesKeysMap[cb.value] || 1;
        total += getValorMensalidadeVigente(mIndex, anoRef);
    });

        const inputTotal = document.getElementById('baixaValorTotal');
    if (inputTotal) inputTotal.value = total.toFixed(2);
}

async function salvarBaixaMensalidade(e) {
    e.preventDefault();
    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    const cpf = selectAssoc ? selectAssoc.value : '';
    const anoRef = document.getElementById('baixaAnoRef').value;
    const dataInput = document.getElementById('baixaData').value;
    const valorTotal = parseFloat(document.getElementById('baixaValorTotal').value) || 0;
    const comprovantePix = document.getElementById('baixaComprovantePix').value.trim();
    const obs = document.getElementById('baixaObs').value.trim();

    // Pega somente os meses NOVOS selecionados (que não estavam previamente marcados/desabilitados)
    const checkedMeses = Array.from(document.querySelectorAll('input[name="baixaMeses"]:checked:not(:disabled)')).map(c => c.value);

    if (!cpf || checkedMeses.length === 0 || valorTotal <= 0 || !dataInput) {
        alert('Por favor, selecione ao menos um mês pendente para dar baixa e informe a data e valor.');
        return;
    }

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' ? ASSOCIADOS_PLANILHA_REAL : []);
    const socio = list.find(a => (a.cpf || '').replace(/\D/g, '') === (cpf || '').replace(/\D/g, ''));
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
        mes_referencia: mesesTexto,
        meses_quitados: mesesTexto,
        valor: valorTotal,
        data: dataBR,
        data_iso: dataInput,
        forma: 'PIX',
        comprovante_pix: comprovantePix || 'Comprovante PIX recebido',
        obs: obs || `Quitação de mensalidade PIX (${mesesTexto}/${anoRef})`,
        status: 'pago'
    };

    let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    historicoGeral.unshift(itemHistorico);
    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));

    if (typeof dbService !== 'undefined' && dbService.addMensalidade) {
        try { await dbService.addMensalidade(itemHistorico); } catch(e) { console.error('Erro ao enviar para Supabase:', e); }
    }
    recalcularGridAssociado(cpf, anoRef);
    recalcularTodasGridsMensalidades();

    alert(`Baixa de mensalidade de R$ ${valorTotal.toFixed(2).replace('.', ',')} (${mesesTexto}/${anoRef}) efetuada com sucesso para ${nomeAssociado}!`);
    closeModal('modalDarBaixaMensalidade');
    renderGestaoMensalidades();
    renderGestaoFinanceira();
    if (typeof renderAssociadoOverview === 'function') {
        renderAssociadoOverview();
    }
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
    const baixasDoAno = historicoGeral.filter(h => (h.cpf || '').replace(/\D/g, '') === cleanCpf && String(h.ano) === String(ano));

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' ? ASSOCIADOS_PLANILHA_REAL : []);
    const assocObj = listAssociados.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);

    let socioGrid = grid.find(g => (g.cpf || '').replace(/\D/g, '') === cleanCpf);

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

    const mesesKeys = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    mesesKeys.forEach(k => socioGrid[k] = 0);

    baixasDoAno.forEach(b => {
        const listaMeses = extrairListaMesesQuitados(b.meses_quitados || b.mes_referencia);
        const valorTotal = typeof b.valor === 'number' ? b.valor : (parseFloat(String(b.valor || '0').replace(',', '.')) || 0);
        const valorPorMes = listaMeses.length > 0 ? (valorTotal / listaMeses.length) : valorTotal;
        listaMeses.forEach(mk => {
            if (socioGrid.hasOwnProperty(mk)) {
                socioGrid[mk] = (parseFloat(socioGrid[mk]) || 0) + (valorPorMes > 0 ? valorPorMes : 20);
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
        if (typeof dbService !== 'undefined' && dbService.addMensalidade) {
        dbService.addMensalidade(historicoGeral[index]);
    }
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

            if (typeof dbService !== 'undefined' && dbService.deleteMensalidade) {
        dbService.deleteMensalidade(id);
    }
    recalcularGridAssociado(item.cpf, item.ano);

        alert('Lançamento de mensalidade removido com sucesso.');
        renderGestaoMensalidades();
        renderGestaoFinanceira();
        verExtratoAssociado(item.cpf);
    }
}

async function limparBancoMensalidadesCompletamente() {
    if (!currentUser || currentUser.perfil !== 'diretoria') {
        alert('Apenas membros da Diretoria podem zerar o banco de dados de mensalidades.');
        return;
    }
    if (confirm('Atenção: Deseja realmente ZERAR todos os registros de mensalidades do banco de dados e deixar todos os associados zerados (sem pagamentos)?')) {
        if (typeof dbService !== 'undefined' && dbService.clearMensalidades) {
            await dbService.clearMensalidades();
        } else {
            localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify([]));
            localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify([]));
            ['2024','2025','2026','2027','2028'].forEach(ano => {
                localStorage.setItem('acbcsj_mensalidades_grid_' + ano, JSON.stringify([]));
            });
            recalcularTodasGridsMensalidades();
        }
        alert('Banco de mensalidades zerado com sucesso! Todos os associados estão com R$ 0,00.');
        renderGestaoMensalidades();
        renderGestaoFinanceira();
    }
}