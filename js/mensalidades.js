// ==========================================
// PORTAL ACBCSJ - GESTÃO DE MENSALIDADES
// ==========================================

const TODOS_MESES_KEYS = window.TODOS_MESES_KEYS || ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MES_MAP_EXPAND = window.MES_MAP_EXPAND || {
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

function formatarMesesReferenciaCompacto(checkedMesesKeys) {
    if (!checkedMesesKeys || checkedMesesKeys.length === 0) return 'Mensalidade';
    const nomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };
    
    if (checkedMesesKeys.length === 12) return 'Jan-Dez (12m)';

    const indices = checkedMesesKeys
        .map(k => TODOS_MESES_KEYS.indexOf(String(k).toLowerCase()))
        .filter(i => i >= 0)
        .sort((a, b) => a - b);
    
    const uniqueIndices = [...new Set(indices)];
    if (uniqueIndices.length === 0) return 'Mensalidade';

    // Agrupa intervalos contíguos: ex: [0,1,2,3,4, 7] -> [[0,1,2,3,4], [7]]
    const groups = [];
    let curGroup = [uniqueIndices[0]];
    for (let i = 1; i < uniqueIndices.length; i++) {
        if (uniqueIndices[i] === uniqueIndices[i - 1] + 1) {
            curGroup.push(uniqueIndices[i]);
        } else {
            groups.push(curGroup);
            curGroup = [uniqueIndices[i]];
        }
    }
    groups.push(curGroup);

    const groupParts = groups.map(g => {
        if (g.length === 1) {
            return nomesMap[TODOS_MESES_KEYS[g[0]]];
        } else if (g.length === 2) {
            return `${nomesMap[TODOS_MESES_KEYS[g[0]]]}, ${nomesMap[TODOS_MESES_KEYS[g[1]]]}`;
        } else {
            return `${nomesMap[TODOS_MESES_KEYS[g[0]]]}-${nomesMap[TODOS_MESES_KEYS[g[g.length - 1]]]}`;
        }
    });

    const compactString = groupParts.join(', ');
    if (compactString.length <= 20) return compactString;

    const noSpaceString = groupParts.join(',');
    if (noSpaceString.length <= 20) return noSpaceString;

    const tightParts = groups.map(g => {
        if (g.length === 1) return nomesMap[TODOS_MESES_KEYS[g[0]]];
        return `${nomesMap[TODOS_MESES_KEYS[g[0]]]}-${nomesMap[TODOS_MESES_KEYS[g[g.length - 1]]]}`;
    });
    const tightString = tightParts.join(',');
    if (tightString.length <= 20) return tightString;

    return tightString.substring(0, 20);
}
window.formatarMesesReferenciaCompacto = formatarMesesReferenciaCompacto;

function extrairAnoPagamentoEfetivo(item) {
    if (!item) return '';
    const strData = String(item.data_pagamento || item.data || item.data_iso || item.created_at || item.data_baixa || '').trim();
    if (!strData) {
        return String(item.ano || '').trim();
    }
    // Formato ISO: YYYY-MM-DD
    const matchIso = strData.match(/^(\d{4})[-/]/);
    if (matchIso) return matchIso[1];

    // Formato BR: DD/MM/YYYY
    const matchBr = strData.match(/\d{1,2}[-/]\d{1,2}[-/](\d{4})/);
    if (matchBr) return matchBr[1];

    // Formato BR 2 dígitos: DD/MM/YY
    const matchBrShort = strData.match(/\d{1,2}[-/]\d{1,2}[-/](\d{2})$/);
    if (matchBrShort) {
        let yy = parseInt(matchBrShort[1]);
        return String(yy < 100 ? (2000 + yy) : yy);
    }

    // Qualquer número de 4 dígitos (ex: 2024, 2025, 2026)
    const matchAny4 = strData.match(/\b(20\d\d)\b/);
    if (matchAny4) return matchAny4[1];

    return String(item.ano || '').trim();
}
window.extrairAnoPagamentoEfetivo = extrairAnoPagamentoEfetivo;

function parseStringMeses(str) {
    if (!str || str === 'undefined' || str === 'null') return [];
    const strLower = str.toLowerCase().trim();

    if (strLower.includes('anual') || strLower.includes('todos') || strLower.includes('12m') || strLower === 'jan-dez' || strLower === 'jan a dez' || strLower === 'jan até dez' || strLower === 'jan ate dez') {
        return [...TODOS_MESES_KEYS];
    }

    const segments = strLower.split(/[,;\/|]+/).map(s => s.trim()).filter(Boolean);
    const result = [];

    segments.forEach(seg => {
        const rangeMatch = seg.match(/\b([a-z]{3})\s*(?:-|–|—|\ba\b|\baté\b|\bate\b)\s*([a-z]{3})\b/i);
        if (rangeMatch) {
            const startKey = MES_MAP_EXPAND[rangeMatch[1].toLowerCase()];
            const endKey = MES_MAP_EXPAND[rangeMatch[2].toLowerCase()];
            if (startKey && endKey) {
                const startIdx = TODOS_MESES_KEYS.indexOf(startKey);
                const endIdx = TODOS_MESES_KEYS.indexOf(endKey);
                if (startIdx >= 0 && endIdx >= startIdx) {
                    for (let i = startIdx; i <= endIdx; i++) {
                        if (!result.includes(TODOS_MESES_KEYS[i])) {
                            result.push(TODOS_MESES_KEYS[i]);
                        }
                    }
                    return;
                }
            }
        }

        const words = seg.split(/[^a-z0-9áéíóúãõâêîôûç]+/i).filter(Boolean);
        words.forEach(w => {
            const clean = w.replace(/[^a-z0-9]/g, '');
            if (MES_MAP_EXPAND[clean] && !result.includes(MES_MAP_EXPAND[clean])) {
                result.push(MES_MAP_EXPAND[clean]);
            }
        });
    });

    return result;
}
window.parseStringMeses = parseStringMeses;

function extrairListaMesesQuitados(rawInput) {
    if (!rawInput) return [];

    let itemObj = null;
    let listaFromObs = [];
    let listaFromMes = [];

    if (typeof rawInput === 'object') {
        itemObj = rawInput;

        // 1. Extrair de observações / obs (se tiver parênteses com os meses, ex: "(Jan, Fev, Mar, Abr, Mai, Ago/2026)")
        const obsTexto = String(itemObj.obs || itemObj.observacoes || '');
        if (obsTexto && obsTexto.includes('(') && obsTexto.includes(')')) {
            const m = obsTexto.match(/\(([^)]+)\)/);
            if (m && m[1]) {
                const cleanMeses = m[1].replace(/\/\s*\d{4}/g, '').trim().toLowerCase();
                listaFromObs = parseStringMeses(cleanMeses);
            }
        }

        // 2. Extrair de meses_quitados ou mes_referencia
        const strMes = String(itemObj.meses_quitados || itemObj.mes_referencia || itemObj.meses || itemObj.mes || '').trim();
        const isTruncated = strMes.endsWith(',') || strMes.endsWith(' ') || strMes.length === 20 || /^\d+m\b/i.test(strMes);

        if (strMes && strMes !== 'undefined' && strMes !== 'null') {
            listaFromMes = parseStringMeses(strMes);
        }

        // Se observações tiver meses válidos e for mais completa que mes_referencia (ou se mes_referencia for resumido/truncado)
        if (listaFromObs.length > 0 && (listaFromObs.length >= listaFromMes.length || isTruncated || /^\d+m\b/i.test(strMes))) {
            return listaFromObs;
        }

        // Se mes_referencia tiver meses válidos
        if (listaFromMes.length > 0 && !isTruncated) {
            return listaFromMes;
        }

        // Fallback para observações
        if (listaFromObs.length > 0) {
            return listaFromObs;
        }

        if (listaFromMes.length > 0) {
            return listaFromMes;
        }

        return ['jan'];
    } else {
        const str = String(rawInput).trim();
        const res = parseStringMeses(str);
        return res.length > 0 ? res : ['jan'];
    }
}
window.extrairListaMesesQuitados = extrairListaMesesQuitados;

function recalcularTodasGridsMensalidades(triggerRender = false) {
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
                const meses = extrairListaMesesQuitados(m);
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

    if (triggerRender && typeof renderGestaoMensalidades === 'function' && (document.getElementById('tableGestaoMensalidadesBody') || document.getElementById('tableMensalidadesBody'))) {
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

// CÁLCULO DE VENCIMENTO DIA 15 E STATUS DE MENSALIDADE COM REGRA DE INGRESSO E DESLIGAMENTO
function calcularStatusMensalidade(mesIndex, anoStr, valorPago, socioOuDataIngresso) {
    const valor = parseFloat(valorPago) || 0;
    const mIdx = parseInt(mesIndex, 10) || 1;
    const anoNum = parseInt(anoStr, 10) || 2026;
    const baseVal = typeof getValorMensalidadeVigente === 'function' ? getValorMensalidadeVigente(mIdx, anoStr) : 20.00;
    const dataVencimentoStr = `15/${String(mIdx).padStart(2, '0')}/${anoNum}`;

    // Regra de Ingresso (Corte no dia 15 de vencimento):
    // Se admitido até o dia 15 -> cobrança inicia no mês de admissão
    // Se admitido APÓS o dia 15 -> ISENTO também do mês de admissão (cobrança inicia no mês seguinte)
    const parserIngresso = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso : (d => {
        if (!d) return { mes: 1, ano: 2020, dia: 1, mesInicioCobranca: 1, anoInicioCobranca: 2020 };
        const s = typeof d === 'object' ? (d.data_ingresso || d.data_admissao || d.data_cadastro || '') : String(d);
        const p = s.split(' ')[0].split(/[\/\-]/);
        let dia = 1, mes = 1, ano = 2020;
        if (p.length === 3) {
            let p1 = parseInt(p[0], 10), p2 = parseInt(p[1], 10), p3 = parseInt(p[2], 10);
            if (p3 < 100) p3 += 2000;
            if (p1 > 12) { dia = p1; mes = p2; ano = p3; }
            else if (p2 > 12) { dia = p2; mes = p1; ano = p3; }
            else { dia = p1; mes = p2; ano = p3; }
        }
        let mesInicio = mes;
        let anoInicio = ano;
        if (dia > 15) {
            mesInicio = mes + 1;
            if (mesInicio > 12) { mesInicio = 1; anoInicio += 1; }
        }
        return { mes, ano, dia, mesInicioCobranca: mesInicio, anoInicioCobranca: anoInicio };
    });

    const infoIngresso = parserIngresso(socioOuDataIngresso);
    const targetScore = anoNum * 100 + mIdx;
    const cobrancaScore = (infoIngresso.anoInicioCobranca || infoIngresso.ano) * 100 + (infoIngresso.mesInicioCobranca || infoIngresso.mes);

    const isIsentoIngresso = targetScore < cobrancaScore;

    // Se o associado for desligado, verificar data de desligamento
    let isDesligado = false;
    let mesDesligamento = null;
    let anoDesligamento = null;
    let dataDesligStr = '';

    if (socioOuDataIngresso && typeof socioOuDataIngresso === 'object') {
        if (socioOuDataIngresso.status === 'desligado' || socioOuDataIngresso.data_desligamento) {
            isDesligado = true;
            dataDesligStr = socioOuDataIngresso.data_desligamento || '';
            if (dataDesligStr) {
                const sDes = String(dataDesligStr).split(' ')[0].split(/[\/\-]/);
                if (sDes.length === 3) {
                    let d1 = parseInt(sDes[0], 10), d2 = parseInt(sDes[1], 10), d3 = parseInt(sDes[2], 10);
                    if (d3 < 100) d3 += 2000;
                    if (d1 > 12) { mesDesligamento = d2; anoDesligamento = d3; }
                    else if (d2 > 12) { mesDesligamento = d1; anoDesligamento = d3; }
                    else { mesDesligamento = d2; anoDesligamento = d3; }
                }
            }
        }
    }

    // 1. SE HÁ PAGAMENTO EFETUADO (Integral ou Superior) -> SEMPRE PAGO/QUITADO (inclusive para desligados!)
    if (valor >= baseVal) {
        return {
            status: 'pago',
            badge: `<div class="mes-box mes-box-pago" title="Mensalidade quitada: R$ ${valor.toFixed(2).replace('.', ',')}"><span class="mes-box-top">☑ R$</span><span class="mes-box-bottom">${valor.toFixed(2).replace('.', ',')}</span></div>`,
            vencimento: dataVencimentoStr,
            isVencido: false,
            isIsento: false,
            debitAmount: 0
        };
    } else if (valor > 0) {
        // Pagamento parcial
        const falta = Math.max(0, baseVal - valor);
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtualNum = hoje.getMonth() + 1;
        const diaAtual = hoje.getDate();
        const isV = (anoNum < anoAtual || (anoNum === anoAtual && (mIdx < mesAtualNum || (mIdx === mesAtualNum && diaAtual > 15))));
        return {
            status: 'parcial',
            badge: `<div class="mes-box mes-box-parcial" title="Pago parcialmente (Falta R$ ${falta.toFixed(2).replace('.', ',')})"><span class="mes-box-top">⚠️ R$</span><span class="mes-box-bottom">${valor.toFixed(2).replace('.', ',')}</span></div>`,
            vencimento: dataVencimentoStr,
            isVencido: isV,
            isIsento: false,
            debitAmount: falta
        };
    }

    // 2. SE NÃO HOUVE PAGAMENTO (valor <= 0)
    // Se o mês for anterior ao início da cobrança -> ISENTO
    if (isIsentoIngresso) {
        const tooltipIsento = infoIngresso.dia > 15 && targetScore === (infoIngresso.ano * 100 + infoIngresso.mes)
            ? `Isento no mês de admissão (admitido em ${infoIngresso.dataFormatada || infoIngresso.dia + '/' + infoIngresso.mes + '/' + infoIngresso.ano}, após dia 15)`
            : `Isento (Anterior à admissão em ${infoIngresso.dataFormatada || infoIngresso.dia + '/' + infoIngresso.mes + '/' + infoIngresso.ano})`;

        return {
            status: 'isento',
            badge: `<div class="mes-box mes-box-isento" title="${tooltipIsento}"><span class="mes-box-top">⚪</span><span class="mes-box-bottom">ISENTO</span></div>`,
            vencimento: '-',
            isVencido: false,
            isIsento: true,
            debitAmount: 0
        };
    }

    // Se o associado for desligado e o mês for posterior ao desligamento -> DESLIGADO (não exigível)
    if (isDesligado && anoDesligamento && mesDesligamento) {
        const scoreDesligamento = anoDesligamento * 100 + mesDesligamento;
        if (targetScore > scoreDesligamento) {
            return {
                status: 'desligado',
                badge: `<div class="mes-box mes-box-desligado" title="Desligado em ${dataDesligStr || (mesDesligamento + '/' + anoDesligamento)} (Não exigível)"><span class="mes-box-top">⚪</span><span class="mes-box-bottom">DESLIGADO</span></div>`,
                vencimento: '-',
                isVencido: false,
                isIsento: true,
                debitAmount: 0
            };
        }
    }

    // Mensalidade em aberto: verificar se já está vencida (> dia 15)
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtualNum = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    let isVencido = false;
    if (anoNum < anoAtual) {
        isVencido = true;
    } else if (anoNum === anoAtual) {
        if (mIdx < mesAtualNum) {
            isVencido = true;
        } else if (mIdx === mesAtualNum) {
            if (diaAtual > 15) {
                isVencido = true;
            }
        }
    }

    if (isVencido) {
        return {
            status: 'vencido',
            badge: `<div class="mes-box mes-box-vencido" title="Vencido em ${dataVencimentoStr}"><span class="mes-box-top">🔴 R$</span><span class="mes-box-bottom">0,00</span></div>`,
            vencimento: dataVencimentoStr,
            isVencido: true,
            isIsento: false,
            debitAmount: baseVal
        };
    } else {
        return {
            status: 'a_vencer',
            badge: `<div class="mes-box mes-box-avencer" title="A vencer em ${dataVencimentoStr}">-</div>`,
            vencimento: dataVencimentoStr,
            isVencido: false,
            isIsento: false,
            debitAmount: 0
        };
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

    recalcularTodasGridsMensalidades(false);
    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = [];
    try {
        grid = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch(e) { grid = []; }

    const searchInput = document.getElementById('searchAssociadoMensalidade');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filterStatus = document.getElementById('filterStatusMensalidade')?.value || 'todos';

    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    const totaisMesAtivos = { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };
    const totaisMesDesligados = { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };
    const totaisMesConsolidado = { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    let totalPagoAtivos = 0;
    let totalPagoDesligados = 0;
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
            totaisMesAtivos[key] += val;
            totaisMesConsolidado[key] += val;

            const st = calcularStatusMensalidade(index + 1, ano, val, socio);
            if (st.isVencido) {
                mesesDevidos++;
            }
        });

        totalPagoAtivos += totalPagoSocio;
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

    let desligadosComPagamentoCount = 0;
    let desligadosProcessados = desligados.map(socio => {
        const sCpf = (socio.cpf || '').replace(/\D/g, '');
        const itemGrid = (Array.isArray(grid) ? grid.find(g => (g.cpf || '').replace(/\D/g, '') === sCpf) : null) 
            || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

        let totalPagoSocio = 0;
        let mesesDevidos = 0;

        mesesKeys.forEach((key, index) => {
            const val = parseFloat(itemGrid[key]) || 0;
            totalPagoSocio += val;
            totaisMesDesligados[key] += val;
            totaisMesConsolidado[key] += val;

            const st = calcularStatusMensalidade(index + 1, ano, val, socio);
            if (st.isVencido) {
                mesesDevidos++;
            }
        });

        totalPagoDesligados += totalPagoSocio;
        if (totalPagoSocio > 0) desligadosComPagamentoCount++;

        return {
            ...socio,
            gridData: itemGrid,
            totalPagoSocio,
            mesesDevidos,
            isEmDia: mesesDevidos === 0
        };
    });

    // CÁLCULO DO TOTAL ARRECADADO NO ANO (REGIME DE CAIXA / DATA DO PAGAMENTO)
    // Regra: Somar APENAS valores que REALMENTE ENTRARAM NO ANO SELECIONADO.
    // Pagamentos antecipados feitos no ano anterior (ex: 2025) NÃO contam para a arrecadação de 2026.
    let historicoGeral = [];
    try {
        historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    } catch(e) { historicoGeral = []; }

    const mapStatusAssociadoPorCpf = {};
    list.forEach(socio => {
        const clean = (socio.cpf || '').replace(/\D/g, '');
        mapStatusAssociadoPorCpf[clean] = socio.status || 'ativo';
    });

    let totalArrecadadoNoAnoAtivos = 0;
    let totalArrecadadoNoAnoDesligados = 0;

    historicoGeral.forEach(item => {
        const anoEfetivoPagamento = typeof extrairAnoPagamentoEfetivo === 'function' 
            ? extrairAnoPagamentoEfetivo(item) 
            : (() => {
                const str = String(item.data_pagamento || item.data || item.data_iso || item.created_at || '').trim();
                const m = str.match(/\b(20\d\d)\b/);
                return m ? m[1] : String(item.ano || '');
            })();

        if (String(anoEfetivoPagamento) === String(ano)) {
            const val = typeof item.valor === 'number' ? item.valor : (parseFloat(String(item.valor || '0').replace(',', '.')) || 0);
            const cleanCpf = (item.cpf || '').replace(/\D/g, '');
            const statusSocio = mapStatusAssociadoPorCpf[cleanCpf] || 'ativo';
            if (statusSocio === 'desligado') {
                totalArrecadadoNoAnoDesligados += val;
            } else {
                totalArrecadadoNoAnoAtivos += val;
            }
        }
    });

    const totalFinalArrecadado = totalArrecadadoNoAnoAtivos + totalArrecadadoNoAnoDesligados;

    const elArrecadado = document.getElementById('metricTotalArrecadadoMensalidades');
    const elSubtextArrecadado = document.getElementById('metricSubtextTotalArrecadadoMensalidades');
    const elEmDia = document.getElementById('metricAssociadosEmDia');
    const elPendentes = document.getElementById('metricAssociadosPendentes');

    if (elArrecadado) elArrecadado.textContent = `R$ ${totalFinalArrecadado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSubtextArrecadado) {
        elSubtextArrecadado.innerHTML = `🟢 Ativos: <b>R$ ${totalArrecadadoNoAnoAtivos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b> | 🚫 Desligados: <b>R$ ${totalArrecadadoNoAnoDesligados.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>`;
    }
    if (elEmDia) elEmDia.textContent = `${emDiaCount} associado${emDiaCount === 1 ? '' : 's'}`;
    if (elPendentes) elPendentes.textContent = `${pendentesCount} associado${pendentesCount === 1 ? '' : 's'}`;

    let displayAtivos = [...associadosProcessados];
    let displayDesligados = [...desligadosProcessados];

    if (searchTerm) {
        const fnMatch = a => {
            const ng = (a.nome_guerra || '').toLowerCase();
            const nc = (a.nome || '').toLowerCase();
            const cpf = (a.cpf || '').replace(/\D/g, '');
            return ng.includes(searchTerm) || nc.includes(searchTerm) || cpf.includes(searchTerm);
        };
        displayAtivos = displayAtivos.filter(fnMatch);
        displayDesligados = displayDesligados.filter(fnMatch);
    }

    if (filterStatus === 'em_dia') {
        displayAtivos = displayAtivos.filter(a => a.isEmDia);
        displayDesligados = [];
    } else if (filterStatus === 'atrasado') {
        displayAtivos = displayAtivos.filter(a => !a.isEmDia);
        displayDesligados = [];
    } else if (filterStatus === 'ativos') {
        displayDesligados = [];
    } else if (filterStatus === 'desligados') {
        displayAtivos = [];
    } else if (filterStatus === 'com_pagamento') {
        displayAtivos = displayAtivos.filter(a => a.totalPagoSocio > 0);
        displayDesligados = displayDesligados.filter(d => d.totalPagoSocio > 0);
    }

    displayAtivos.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
    displayDesligados.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));

    const container = document.getElementById('tableGestaoMensalidadesBody');
    if (container) {
        if (displayAtivos.length === 0) {
            container.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum associado ativo encontrado para os filtros selecionados.</td></tr>`;
        } else {
            container.innerHTML = displayAtivos.map(a => {
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(a.gridData[k]) || 0;
                    const info = calcularStatusMensalidade(idx + 1, ano, val, a);
                    return `<td class="col-mes">${info.badge}</td>`;
                }).join('');

                const statusBadge = a.isEmDia 
                    ? `<span class="badge-status badge-status-em-dia">🟢 EM DIA</span>` 
                    : `<span class="badge-status badge-status-inadimplente" title="${a.mesesDevidos} mês(es) em atraso">🔴 INADIMPLENTE (${a.mesesDevidos})</span>`;

                const infoIngresso = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso(a) : { dataFormatada: a.data_cadastro || '-' };

                return `
                    <tr>
                        <td class="col-associado">
                            <div style="font-weight: 700; color: #FFFFFF; font-size: 12px; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${a.nome_guerra || a.nome}">${a.nome_guerra || a.nome}</div>
                            <div style="font-size: 10px; color: var(--text-muted); line-height: 1.1; margin-top: 1px;">${a.cpf}</div>
                            <div style="font-size: 9px; color: var(--accent-gold); line-height: 1.1; margin-top: 2px;">
                                📅 Adm: <b>${infoIngresso.dataFormatada || a.data_cadastro || '-'}</b>
                            </div>
                        </td>
                        ${cellsMeses}
                        <td class="col-total">
                            R$ ${a.totalPagoSocio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td class="col-status">${statusBadge}</td>
                        <td class="col-acoes">
                            <div class="acoes-btn-group">
                                <button class="btn-acao btn-acao-baixar" onclick="abrirModalDarBaixa('${a.cpf}')" title="Dar baixa em mensalidade">💳 Baixar</button>
                                <button class="btn-acao btn-acao-historico" onclick="verExtratoAssociado('${a.cpf}')" title="Ver extrato e histórico">📋 Histórico</button>
                                <button class="btn-acao btn-acao-editar" onclick="verExtratoAssociado('${a.cpf}')" title="Editar lançamentos">✏️ Editar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // Removido totalizadores e subtotais no rodapé conforme solicitado
    const footGestao = document.getElementById('tableGestaoMensalidadesFoot');
    if (footGestao) {
        footGestao.innerHTML = '';
    }

    // PROCESSA ASSOCIADOS DESLIGADOS NA PARTE INFERIOR
    const containerDesligados = document.getElementById('tableMensalidadesDesligadosBody');
    if (containerDesligados) {
        if (displayDesligados.length === 0) {
            containerDesligados.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum associado desligado encontrado para os filtros selecionados.</td></tr>`;
        } else {
            containerDesligados.innerHTML = displayDesligados.map(socio => {
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(socio.gridData[k]) || 0;
                    const info = calcularStatusMensalidade(idx + 1, ano, val, socio);
                    return `<td class="col-mes">${info.badge}</td>`;
                }).join('');

                const dataDeslig = socio.data_desligamento || 'Data não registrada';
                const infoIngressoDeslig = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso(socio) : { dataFormatada: socio.data_cadastro || '-' };

                const statusBadge = socio.isEmDia 
                    ? `<span class="badge-status badge-status-quitado">🟢 QUITADO</span>` 
                    : `<span class="badge-status badge-status-pendente" title="${socio.mesesDevidos} mês(es) pendente(s) antes do desligamento">🔴 PENDENTE (${socio.mesesDevidos}m)</span>`;

                return `
                    <tr>
                        <td class="col-associado">
                            <div style="font-weight: 700; color: #FFFFFF; font-size: 12px; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${socio.nome_guerra || socio.nome}">${socio.nome_guerra || socio.nome}</div>
                            <div style="font-size: 10px; color: var(--text-muted); line-height: 1.1; margin-top: 1px;">${socio.cpf}</div>
                            <div style="display: flex; flex-direction: column; gap: 1px; margin-top: 2px;">
                                <span style="font-size: 9px; color: var(--accent-gold); line-height: 1;">
                                    📅 Adm: <b>${infoIngressoDeslig.dataFormatada || socio.data_cadastro || '-'}</b>
                                </span>
                                <span style="font-size: 8.5px; color: #FF6B6B; line-height: 1;">
                                    🚫 Desl: <b>${dataDeslig}</b>
                                </span>
                            </div>
                        </td>
                        ${cellsMeses}
                        <td class="col-total">
                            R$ ${socio.totalPagoSocio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td class="col-status">${statusBadge}</td>
                        <td class="col-acoes">
                            <div class="acoes-btn-group">
                                <button class="btn-acao btn-acao-baixar" onclick="abrirModalDarBaixa('${socio.cpf}')" title="Dar baixa em mensalidade">💳 Baixar</button>
                                <button class="btn-acao btn-acao-historico" onclick="verExtratoAssociado('${socio.cpf}')" title="Ver extrato e histórico">📋 Histórico</button>
                                <button class="btn-acao btn-acao-editar" onclick="verExtratoAssociado('${socio.cpf}')" title="Editar lançamentos">✏️ Editar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // Removido totalizador do rodapé de desligados conforme solicitado
    const footDesligados = document.getElementById('tableMensalidadesDesligadosFoot');
    if (footDesligados) {
        footDesligados.innerHTML = '';
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
    const compInput = document.getElementById('baixaComprovante');
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

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' ? ASSOCIADOS_PLANILHA_REAL : []);
    const socio = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf) || null;

    const socioGrid = (Array.isArray(grid) ? grid.find(g => {
        const gCpf = (g.cpf || '').replace(/\D/g, '');
        return gCpf && cleanCpf && gCpf === cleanCpf;
    }) : null) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };
    const mesesKeysList = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    // Bloco de informações do associado selecionado
    const infoHeaderEl = document.getElementById('baixaInfoAssociado');
    if (infoHeaderEl) {
        if (socio) {
            const infoIngresso = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso(socio) : { dataFormatada: socio.data_cadastro || '-' };
            const statusTexto = socio.status === 'desligado' 
                ? `<span class="badge badge-danger" style="font-size:11px;">🚫 DESLIGADO (${socio.data_desligamento || 'Data não informada'})</span>` 
                : `<span class="badge badge-success" style="font-size:11px;">🟢 ATIVO</span>`;
            infoHeaderEl.innerHTML = `
                <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 12px;">
                    <div>
                        <b>${socio.nome_guerra || socio.nome}</b> (${socio.cpf})<br>
                        <span style="color: var(--text-muted);">Data de Ingresso: <b>${infoIngresso.dataFormatada}</b> ${infoIngresso.dia > 15 ? '<span style="color:#F39C12;">(Admitido após dia 15: isento no mês de admissão)</span>' : ''}</span>
                    </div>
                    <div>${statusTexto}</div>
                </div>
            `;
            infoHeaderEl.style.display = 'block';
        } else {
            infoHeaderEl.style.display = 'none';
        }
    }

    const checkboxes = document.querySelectorAll('input[name="baixaMeses"]');
    checkboxes.forEach(cb => {
        const mKey = cb.value;
        const mIndex = mesesKeysList.indexOf(mKey) + 1;
        const valPago = parseFloat(socioGrid[mKey]) || 0;
        const parentLabel = cb.closest('label');

        // Calcula status de mensalidade com a regra de ingresso e desligamento
        const st = calcularStatusMensalidade(mIndex, anoRef, valPago, socio);

        // Remove tag antiga se houver
        const oldSpan = parentLabel ? parentLabel.querySelector('.mes-status-tag') : null;
        if (oldSpan) oldSpan.remove();

        if (st.status === 'pago') {
            // Mês já pago/quitado: pré-marcar e desabilitar
            cb.checked = true;
            cb.disabled = true;
            if (parentLabel) {
                parentLabel.style.opacity = '0.75';
                parentLabel.style.background = 'rgba(46, 204, 113, 0.18)';
                parentLabel.style.border = '1px solid rgba(46, 204, 113, 0.4)';
                parentLabel.style.padding = '4px 8px';
                parentLabel.style.borderRadius = '4px';
                parentLabel.style.cursor = 'not-allowed';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]}/${anoRef} já está quitado (R$ ${valPago.toFixed(2).replace('.', ',')})`;
                parentLabel.insertAdjacentHTML('beforeend', ` <span class="mes-status-tag" style="font-size:10px; color:#2ECC71; font-weight:bold;">(Pago)</span>`);
            }
        } else if (st.status === 'isento') {
            // MÊS ISENTO: BLOQUEAR PARA EVITAR CONFUSÃO DO OPERADOR
            cb.checked = false;
            cb.disabled = true;
            if (parentLabel) {
                parentLabel.style.opacity = '0.55';
                parentLabel.style.background = 'rgba(148, 163, 184, 0.12)';
                parentLabel.style.border = '1px dashed rgba(148, 163, 184, 0.35)';
                parentLabel.style.padding = '4px 8px';
                parentLabel.style.borderRadius = '4px';
                parentLabel.style.cursor = 'not-allowed';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]}/${anoRef} ISENTO (Anterior à admissão ou admitido após dia 15) - Bloqueado`;
                parentLabel.insertAdjacentHTML('beforeend', ` <span class="mes-status-tag" style="font-size:10px; color:var(--text-muted); font-weight:bold;">(Isento)</span>`);
            }
        } else if (st.status === 'desligado') {
            // Mês posterior ao desligamento: bloquear
            cb.checked = false;
            cb.disabled = true;
            if (parentLabel) {
                parentLabel.style.opacity = '0.55';
                parentLabel.style.background = 'rgba(231, 76, 60, 0.08)';
                parentLabel.style.border = '1px dashed rgba(231, 76, 60, 0.3)';
                parentLabel.style.padding = '4px 8px';
                parentLabel.style.borderRadius = '4px';
                parentLabel.style.cursor = 'not-allowed';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]}/${anoRef} - Associado desligado (Não exigível) - Bloqueado`;
                parentLabel.insertAdjacentHTML('beforeend', ` <span class="mes-status-tag" style="font-size:10px; color:#E74C3C; font-weight:bold;">(Desligado)</span>`);
            }
        } else {
            // Mês em aberto/pendente: disponível para seleção
            cb.checked = false;
            cb.disabled = false;
            if (parentLabel) {
                parentLabel.style.opacity = '1';
                parentLabel.style.background = 'rgba(255, 255, 255, 0.03)';
                parentLabel.style.border = '1px solid var(--border-color)';
                parentLabel.style.padding = '4px 8px';
                parentLabel.style.borderRadius = '4px';
                parentLabel.style.cursor = 'pointer';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]}/${anoRef} pendente - Clique para marcar e dar baixa`;
            }
        }
    });

    atualizarValoresBaixa();
}

function selecionarTodosMesesPendentesBaixa() {
    const checkboxes = document.querySelectorAll('input[name="baixaMeses"]:not(:disabled)');
    checkboxes.forEach(cb => { cb.checked = true; });
    atualizarValoresBaixa();
}
window.selecionarTodosMesesPendentesBaixa = selecionarTodosMesesPendentesBaixa;

function desmarcarTodosMesesPendentesBaixa() {
    const checkboxes = document.querySelectorAll('input[name="baixaMeses"]:not(:disabled)');
    checkboxes.forEach(cb => { cb.checked = false; });
    atualizarValoresBaixa();
}
window.desmarcarTodosMesesPendentesBaixa = desmarcarTodosMesesPendentesBaixa;

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

    // Pega somente os meses NOVOS selecionados e garante que não são isentos/desligados/desabilitados
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
    const mesesTexto = checkedMeses.map(m => mesesNomesMap[m] || m).join(', ');
    const mesRefCompacto = typeof formatarMesesReferenciaCompacto === 'function' ? formatarMesesReferenciaCompacto(checkedMeses) : mesesTexto;
    const obsTexto = obs || `Quitacao de mensalidade PIX (${mesesTexto}/${anoRef})`;

    const itemHistorico = {
        id: 'mensalidade_' + Date.now(),
        cpf: cpf,
        associado_nome: nomeAssociado,
        ano: anoRef,
        mes_referencia: mesRefCompacto,
        meses_quitados: mesesTexto,
        valor: valorTotal,
        data: dataBR,
        data_pagamento: dataBR,
        data_iso: dataInput,
        forma: 'PIX',
        comprovante_pix: comprovantePix || 'Comprovante PIX recebido',
        obs: obsTexto,
        observacoes: obsTexto,
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

    const infoIngresso = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso(a) : { dataFormatada: a.data_cadastro || '-' };

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
                    <div style="font-size: 11px; color: var(--text-muted);">DATA DE INGRESSO / ADMISSÃO</div>
                    <div style="font-size: 15px; font-weight: bold; color: #3498DB;">${infoIngresso.dataFormatada || a.data_cadastro || '-'}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${infoIngresso.dia > 15 ? `Admissão após dia 15: isento de ${String(infoIngresso.mes).padStart(2, '0')}/${infoIngresso.ano}, cobrança inicia em ${String(infoIngresso.mesInicioCobranca).padStart(2, '0')}/${infoIngresso.anoInicioCobranca}` : `Admissão até dia 15: cobrança inicia em ${String(infoIngresso.mesInicioCobranca).padStart(2, '0')}/${infoIngresso.anoInicioCobranca}`}</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">TOTAL CONTRIBUÍDO VIA PIX</div>
                    <div style="font-size: 16px; font-weight: bold; color: #2ECC71;">R$ ${totalPagoTodosAnos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${historicoAssociado.length} lançamentos efetuados</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">OBM / SITUAÇÃO</div>
                    <div style="font-size: 14px; font-weight: bold;">${String(a.obm || 'São José').replace(/SÃ£o/g, 'São').replace(/JosÃ©/g, 'José').replace(/Ã§Ã£/g, 'çã').replace(/Ã£/g, 'ã').replace(/Ã©/g, 'é')}</div>
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
                            ${historicoAssociado.map(h => {
                                const mesesTexto = (typeof extrairTextoMesesQuitados === 'function') 
                                    ? extrairTextoMesesQuitados(h) 
                                    : ((h.meses_quitados && h.meses_quitados !== 'undefined' && h.meses_quitados !== 'null') 
                                        ? h.meses_quitados 
                                        : ((h.mes_referencia && h.mes_referencia !== 'undefined' && h.mes_referencia !== 'null') ? h.mes_referencia : 'Mensalidade'));
                                
                                const dataExib = h.data || h.data_pagamento || (h.data_iso ? h.data_iso.split('T')[0].split('-').reverse().join('/') : '-');
                                const obsExib = (h.obs && h.obs !== 'undefined' && h.obs !== 'null') ? h.obs : ((h.observacoes && h.observacoes !== 'undefined' && h.observacoes !== 'null') ? h.observacoes : '-');
                                const compPix = (h.comprovante_pix && h.comprovante_pix !== 'undefined' && h.comprovante_pix !== 'null') ? h.comprovante_pix : '';

                                return `
                                    <tr>
                                        <td><b>${dataExib}</b></td>
                                        <td><span class="badge badge-info">${h.ano || '2026'}</span></td>
                                        <td><b>${mesesTexto}</b></td>
                                        <td style="font-weight: 700; color: #2ECC71;">+ R$ ${(parseFloat(h.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td><span class="badge badge-success">PIX</span> <small>${compPix !== 'PIX' ? compPix : ''}</small></td>
                                        <td>${obsExib}</td>
                                        <td>
                                            <div style="display: flex; gap: 4px;">
                                                <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px;" onclick="abrirModalEditarBaixa('${h.id}')">✏️ Editar</button>
                                                <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px; color: #E74C3C; border-color: #E74C3C;" onclick="excluirBaixaMensalidade('${h.id}')">🗑️ Excluir</button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
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
        const listaMeses = extrairListaMesesQuitados(b);
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
    document.getElementById('editBaixaAssociadoNome').value = item.associado_nome || '';
    document.getElementById('editBaixaAnoRef').value = item.ano || '2026';
    document.getElementById('editBaixaValor').value = item.valor || 0;
    document.getElementById('editBaixaData').value = item.data_iso || (item.data_pagamento ? item.data_pagamento.split('/').reverse().join('-') : new Date().toISOString().split('T')[0]);
    document.getElementById('editBaixaComprovantePix').value = item.comprovante_pix || item.observacoes || '';
    document.getElementById('editBaixaObs').value = item.obs || item.observacoes || '';

    const listaMeses = typeof extrairListaMesesQuitados === 'function' ? extrairListaMesesQuitados(item) : [];
    const checkboxes = document.querySelectorAll('input[name="editBaixaMeses"]');
    checkboxes.forEach(cb => {
        cb.checked = listaMeses.includes(cb.value);
    });

    openModal('modalEditarBaixaMensalidade');
}

function atualizarValoresEdicaoBaixa() {
    const anoRef = document.getElementById('editBaixaAnoRef')?.value || '2026';
    const checked = document.querySelectorAll('input[name="editBaixaMeses"]:checked');
    const mesesKeysMap = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 };
    let total = 0;
    checked.forEach(cb => {
        const mIndex = mesesKeysMap[cb.value] || 1;
        total += getValorMensalidadeVigente(mIndex, anoRef);
    });
    const inputVal = document.getElementById('editBaixaValor');
    if (inputVal && checked.length > 0) {
        inputVal.value = total.toFixed(2);
    }
}
window.atualizarValoresEdicaoBaixa = atualizarValoresEdicaoBaixa;

function selecionarTodosMesesEdicaoBaixa() {
    const checkboxes = document.querySelectorAll('input[name="editBaixaMeses"]');
    checkboxes.forEach(cb => { cb.checked = true; });
    atualizarValoresEdicaoBaixa();
}
window.selecionarTodosMesesEdicaoBaixa = selecionarTodosMesesEdicaoBaixa;

function desmarcarTodosMesesEdicaoBaixa() {
    const checkboxes = document.querySelectorAll('input[name="editBaixaMeses"]');
    checkboxes.forEach(cb => { cb.checked = false; });
    atualizarValoresEdicaoBaixa();
}
window.desmarcarTodosMesesEdicaoBaixa = desmarcarTodosMesesEdicaoBaixa;

async function salvarEdicaoBaixaMensalidade(e) {
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
    const mesesTexto = checkedMeses.map(m => mesesNomesMap[m] || m).join(', ');
    const mesRefCompacto = typeof formatarMesesReferenciaCompacto === 'function' ? formatarMesesReferenciaCompacto(checkedMeses) : mesesTexto;
    const anoRef = historicoGeral[index].ano || '2026';
    const obsTexto = obs || `Quitacao de mensalidade PIX (${mesesTexto}/${anoRef})`;

    historicoGeral[index].valor = valorTotal;
    historicoGeral[index].data = dataBR;
    historicoGeral[index].data_pagamento = dataBR;
    historicoGeral[index].data_iso = dataInput;
    historicoGeral[index].comprovante_pix = comprovantePix || 'Comprovante PIX confirmado';
    historicoGeral[index].meses_quitados = mesesTexto;
    historicoGeral[index].mes_referencia = mesRefCompacto;
    historicoGeral[index].obs = obsTexto;
    historicoGeral[index].observacoes = obsTexto;

    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));

    if (typeof dbService !== 'undefined' && dbService.addMensalidade) {
        try {
            await dbService.addMensalidade(historicoGeral[index]);
        } catch(err) {
            console.error('Erro ao atualizar mensalidade no Supabase:', err);
        }
    }

    recalcularGridAssociado(historicoGeral[index].cpf, anoRef);
    recalcularTodasGridsMensalidades(false);

    alert('Lançamento de mensalidade atualizado com sucesso!');
    closeModal('modalEditarBaixaMensalidade');
    renderGestaoMensalidades();
    renderGestaoFinanceira();
    if (typeof renderAssociadoOverview === 'function') {
        renderAssociadoOverview();
    }
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
            try { dbService.deleteMensalidade(id); } catch(e) { console.error('Erro ao excluir no Supabase:', e); }
        }
        recalcularGridAssociado(item.cpf, item.ano || '2026');
        recalcularTodasGridsMensalidades(false);

        alert('Lançamento de mensalidade removido com sucesso.');
        renderGestaoMensalidades();
        renderGestaoFinanceira();
        if (typeof renderAssociadoOverview === 'function') {
            renderAssociadoOverview();
        }
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