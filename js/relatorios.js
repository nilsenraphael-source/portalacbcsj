// ================================================================
// PORTAL ACBCSJ - PAINEL EXECUTIVO DE RELATÓRIOS & GRÁFICOS (DIRETORIA)
// ================================================================

let chartRelatorioMensalidadesQtd = null;
let chartRelatorioMensalidadesValor = null;
let chartRelatorioMensalidadesTaxa = null;
let chartRelatorioReceitasDespesas = null;
let chartRelatorioDistribuicao = null;

function destroyChartDirectSafely(chartVarName, canvasId) {
    try {
        if (window[chartVarName] && typeof window[chartVarName].destroy === 'function') {
            window[chartVarName].destroy();
            window[chartVarName] = null;
        }
        if (typeof Chart !== 'undefined' && canvasId) {
            const chartExisting = Chart.getChart(canvasId);
            if (chartExisting) {
                chartExisting.destroy();
            }
        }
    } catch(e) {
        console.warn(`Erro ao destruir gráfico ${canvasId}:`, e);
    }
}

// RENDERIZAÇÃO COMPLETA DO PAINEL DE RELATÓRIOS DA DIRETORIA
function renderRelatoriosDiretoria() {
    const selAno = document.getElementById('relatoriosFiltroAno');
    const ano = selAno ? selAno.value : '2026';

    const lblsAno = document.querySelectorAll('.lblAnoRelatorio');
    lblsAno.forEach(el => el.textContent = ano);

    // 1. CARREGA ASSOCIADOS
    let listAssociados = [];
    try {
        listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    } catch(e) { listAssociados = []; }

    if (!listAssociados || listAssociados.length === 0) {
        if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined') listAssociados = ASSOCIADOS_PLANILHA_REAL;
        else if (typeof MOCK_DATA_INITIAL !== 'undefined') listAssociados = MOCK_DATA_INITIAL.associados || [];
    }

    const ativos = listAssociados.filter(a => a.status !== 'desligado');
    const desligados = listAssociados.filter(a => a.status === 'desligado');

    // 2. CARREGA GRADE DE MENSALIDADES DO ANO
    if (typeof recalcularTodasGridsMensalidades === 'function') {
        recalcularTodasGridsMensalidades(false);
    }
    const storageKeyGrid = `acbcsj_mensalidades_grid_${ano}`;
    let gridMensalidades = [];
    try {
        gridMensalidades = JSON.parse(localStorage.getItem(storageKeyGrid)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    } catch(e) { gridMensalidades = []; }

    // 3. CARREGA LANÇAMENTOS FINANCEIROS E HISTÓRICO DE MENSALIDADES
    let financeiro = [];
    try {
        financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    } catch(e) { financeiro = []; }

    let historicoMensalidades = [];
    try {
        historicoMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    } catch(e) { historicoMensalidades = []; }

    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const nomesMesesCompletos = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // ESTRUTURAS DE DADOS MÊS A MÊS
    const qtdCobraveisPorMes = Array(12).fill(0);
    const qtdPagantesPorMes = Array(12).fill(0);
    const qtdPendentesPorMes = Array(12).fill(0);
    const valorPrevistoPorMes = Array(12).fill(0);
    const valorRecebidoPorMes = Array(12).fill(0);
    const taxaAdimplenciaPorMes = Array(12).fill(0);

    const receitasGeraisPorMes = Array(12).fill(0);
    const despesasPorMes = Array(12).fill(0);

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtualNum = hoje.getMonth() + 1;
    const anoNum = parseInt(ano, 10) || 2026;

    // A. CÁLCULO DE MENSALIDADES (PARÂMETROS DE QUANTIDADE E VALOR MÊS A MÊS)
    mesesKeys.forEach((mKey, idx) => {
        const mIndex = idx + 1;
        const tarifaVigente = typeof getValorMensalidadeVigente === 'function' ? getValorMensalidadeVigente(mIndex, ano) : 20;

        let cobravelNoMesCount = 0;
        let paganteNoMesCount = 0;
        let valorArrecadadoMes = 0;

        // Itera sobre todos os associados (Ativos e Desligados) para avaliar competência deste mês
        listAssociados.forEach(socio => {
            const cleanCpf = (socio.cpf || '').replace(/\D/g, '');
            const itemGrid = Array.isArray(gridMensalidades) ? gridMensalidades.find(g => (g.cpf || '').replace(/\D/g, '') === cleanCpf) : null;
            const valorPagoNoMes = itemGrid ? (parseFloat(itemGrid[mKey]) || 0) : 0;

            const infoStatus = typeof calcularStatusMensalidade === 'function'
                ? calcularStatusMensalidade(mIndex, ano, valorPagoNoMes, socio)
                : { status: valorPagoNoMes >= tarifaVigente ? 'pago' : 'a_vencer', isIsento: false };

            // Se NÃO estiver isento (ex: admitido depois ou desligado antes), é cobrável
            if (!infoStatus.isIsento) {
                cobravelNoMesCount++;

                if (valorPagoNoMes >= tarifaVigente || valorPagoNoMes > 0) {
                    paganteNoMesCount++;
                }
            } else if (valorPagoNoMes >= tarifaVigente || valorPagoNoMes > 0) {
                // Se pagou mesmo tendo status de isento (ex: quitação voluntária)
                cobravelNoMesCount++;
                paganteNoMesCount++;
            }

            valorArrecadadoMes += valorPagoNoMes;
        });

        qtdCobraveisPorMes[idx] = cobravelNoMesCount;
        qtdPagantesPorMes[idx] = paganteNoMesCount;
        qtdPendentesPorMes[idx] = Math.max(0, cobravelNoMesCount - paganteNoMesCount);

        const vPrevisto = cobravelNoMesCount * tarifaVigente;
        valorPrevistoPorMes[idx] = vPrevisto;
        valorRecebidoPorMes[idx] = valorArrecadadoMes;

        const percEficiencia = vPrevisto > 0 
            ? Math.min(100, Math.round((valorArrecadadoMes / vPrevisto) * 100))
            : (cobravelNoMesCount > 0 && paganteNoMesCount >= cobravelNoMesCount ? 100 : 0);
        taxaAdimplenciaPorMes[idx] = percEficiencia;
    });

    // B. CÁLCULO FINANCEIRO GERAL (LIVRO CAIXA + ARRECADAÇÃO EFETIVA DO ANO)
    financeiro.forEach(f => {
        const dInfo = typeof extrairMesEAno === 'function' ? extrairMesEAno(f.data, f.data_iso || f.created_at) : { ano: '', mes: '' };
        if (dInfo.ano === ano) {
            const mIdx = parseInt(dInfo.mes, 10) - 1;
            if (mIdx >= 0 && mIdx < 12) {
                const val = parseFloat(f.valor) || 0;
                if (f.tipo === 'receita') {
                    receitasGeraisPorMes[mIdx] += val;
                } else if (f.tipo === 'despesa') {
                    despesasPorMes[mIdx] += val;
                }
            }
        }
    });

    // Soma das mensalidades arrecadadas pelo regime de caixa (data de entrada) para os totais financeiros
    const mensalidadesCaixaPorMes = Array(12).fill(0);
    historicoMensalidades.forEach(h => {
        const anoEfetivo = typeof extrairAnoPagamentoEfetivo === 'function' 
            ? extrairAnoPagamentoEfetivo(h) 
            : (() => {
                const s = String(h.data_pagamento || h.data || h.data_iso || '').trim();
                const m = s.match(/\b(20\d\d)\b/);
                return m ? m[1] : String(h.ano || '');
            })();

        if (String(anoEfetivo) === String(ano)) {
            const dInfo = typeof extrairMesEAno === 'function' ? extrairMesEAno(h.data_pagamento || h.data, h.data_iso || h.created_at) : { mes: '01' };
            const mIdx = parseInt(dInfo.mes, 10) - 1;
            const val = parseFloat(h.valor) || 0;
            if (mIdx >= 0 && mIdx < 12) {
                mensalidadesCaixaPorMes[mIdx] += val;
            } else {
                mensalidadesCaixaPorMes[0] += val;
            }
        }
    });

    const totalReceitasPorMes = receitasGeraisPorMes.map((rec, i) => rec + mensalidadesCaixaPorMes[i]);

    // TOTAIS ANUAIS CONSOLIDADOS
    const totalPrevistoMensalidadesAno = valorPrevistoPorMes.reduce((a, b) => a + b, 0);
    const totalRecebidoMensalidadesAno = valorRecebidoPorMes.reduce((a, b) => a + b, 0);
    const totalArrecadadoCaixaMensalidades = mensalidadesCaixaPorMes.reduce((a, b) => a + b, 0);

    const totalReceitasAno = totalReceitasPorMes.reduce((a, b) => a + b, 0);
    const totalDespesasAno = despesasPorMes.reduce((a, b) => a + b, 0);
    const saldoAno = totalReceitasAno - totalDespesasAno;

    // Média de pagantes por mês até o momento
    let mesesComCobranca = 0;
    let somaPagantes = 0;
    let somaCobraveis = 0;
    for (let i = 0; i < 12; i++) {
        if (anoNum < anoAtual || (anoNum === anoAtual && i < mesAtualNum)) {
            mesesComCobranca++;
            somaPagantes += qtdPagantesPorMes[i];
            somaCobraveis += qtdCobraveisPorMes[i];
        }
    }
    if (mesesComCobranca === 0) mesesComCobranca = 1;
    const mediaPagantesMes = Math.round(somaPagantes / mesesComCobranca);
    const mediaCobraveisMes = Math.round(somaCobraveis / mesesComCobranca);

    // C. ATUALIZA CARDS DE MÉTRICAS NO TOPO
    const elMetMens = document.getElementById('relMetricTotalMensalidades');
    const elSubMens = document.getElementById('relSubtextMensalidades');
    const elMetPag = document.getElementById('relMetricMediaPagantes');
    const elSubPag = document.getElementById('relSubtextPagantes');
    const elMetRec = document.getElementById('relMetricTotalReceitas');
    const elSubRec = document.getElementById('relSubtextReceitas');
    const elMetRes = document.getElementById('relMetricResultado');
    const elSubDes = document.getElementById('relSubtextDespesas');

    if (elMetMens) elMetMens.textContent = `R$ ${totalRecebidoMensalidadesAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSubMens) {
        const percTotal = totalPrevistoMensalidadesAno > 0 ? ((totalRecebidoMensalidadesAno / totalPrevistoMensalidadesAno) * 100).toFixed(1) : '0';
        elSubMens.innerHTML = `Meta prevista: <b>R$ ${totalPrevistoMensalidadesAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b> (${percTotal}% atingido)`;
    }

    if (elMetPag) elMetPag.textContent = `${mediaPagantesMes} associados / mês`;
    if (elSubPag) elSubPag.textContent = `De uma média de ${mediaCobraveisMes} associados cobráveis por mês`;

    if (elMetRec) elMetRec.textContent = `R$ ${totalReceitasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSubRec) elSubRec.innerHTML = `Mensalidades PIX: <b>R$ ${totalArrecadadoCaixaMensalidades.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>`;

    if (elMetRes) {
        elMetRes.textContent = `R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elMetRes.style.color = saldoAno >= 0 ? '#2ECC71' : '#E74C3C';
    }
    if (elSubDes) elSubDes.innerHTML = `Despesas Totais: <b>R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>`;

    // D. PREENCHE TABELA ANALÍTICA DE PARÂMETROS DE MENSALIDADES
    const tbodyParam = document.getElementById('tableRelatorioMensalidadesParametrosBody');
    if (tbodyParam) {
        tbodyParam.innerHTML = nomesMesesCompletos.map((mNome, idx) => {
            const cobr = qtdCobraveisPorMes[idx];
            const pag = qtdPagantesPorMes[idx];
            const pend = qtdPendentesPorMes[idx];
            const vPrev = valorPrevistoPorMes[idx];
            const vRec = valorRecebidoPorMes[idx];
            const vDef = Math.max(0, vPrev - vRec);
            const perc = taxaAdimplenciaPorMes[idx];

            let badgeStatus = '';
            const mIndex = idx + 1;
            const isFuturo = (anoNum > anoAtual || (anoNum === anoAtual && mIndex > mesAtualNum));

            if (isFuturo) {
                badgeStatus = `<span class="badge" style="background: rgba(148, 163, 184, 0.15); color: #94A3B8;">⚪ A VENCER</span>`;
            } else if (perc >= 95) {
                badgeStatus = `<span class="badge" style="background: rgba(46, 204, 113, 0.18); color: #2ECC71; border: 1px solid rgba(46, 204, 113, 0.4);">🟢 EXCELENTE (${perc}%)</span>`;
            } else if (perc >= 70) {
                badgeStatus = `<span class="badge" style="background: rgba(243, 156, 18, 0.18); color: #F39C12; border: 1px solid rgba(243, 156, 18, 0.4);">🟡 REGULAR (${perc}%)</span>`;
            } else {
                badgeStatus = `<span class="badge" style="background: rgba(231, 76, 60, 0.18); color: #E74C3C; border: 1px solid rgba(231, 76, 60, 0.4);">🔴 BAIXA ADIMPLÊNCIA (${perc}%)</span>`;
            }

            return `
                <tr>
                    <td style="text-align: left; font-weight: 700; color: #FFFFFF;">${mNome}</td>
                    <td><b>${cobr}</b></td>
                    <td style="color: #2ECC71; font-weight: 700;">${pag}</td>
                    <td style="color: ${pend > 0 ? '#E74C3C' : 'var(--text-muted)'}; font-weight: ${pend > 0 ? '700' : 'normal'};">${pend}</td>
                    <td style="font-weight: 600;">R$ ${vPrev.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="color: #2ECC71; font-weight: 700;">R$ ${vRec.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="color: ${vDef > 0 ? '#E74C3C' : 'var(--text-muted)'}; font-weight: ${vDef > 0 ? '700' : 'normal'};">R$ ${vDef.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                            <div style="flex: 1; max-width: 60px; background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                                <div style="width: ${perc}%; background: ${perc >= 80 ? '#2ECC71' : (perc >= 50 ? '#F39C12' : '#E74C3C')}; height: 100%;"></div>
                            </div>
                            <span style="font-size: 11px; font-weight: bold;">${perc}%</span>
                        </div>
                    </td>
                    <td>${badgeStatus}</td>
                </tr>
            `;
        }).join('');
    }

    // E. RENDERIZAÇÃO DOS 5 GRÁFICOS CHART.JS
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não encontrado para renderizar relatórios.');
        return;
    }

    // GRÁFICO 1: QUANTIDADE DE INTEGRANTES (PREVISTO VS REALIZADO)
    try {
        const ctxQtd = document.getElementById('chartRelatorioMensalidadesQtd');
        if (ctxQtd) {
            destroyChartDirectSafely('chartRelatorioMensalidadesQtd', 'chartRelatorioMensalidadesQtd');
            window.chartRelatorioMensalidadesQtd = new Chart(ctxQtd, {
                type: 'bar',
                data: {
                    labels: nomesMeses,
                    datasets: [
                        {
                            label: 'Cobráveis / Esperados (Meta)',
                            data: qtdCobraveisPorMes,
                            backgroundColor: 'rgba(52, 152, 219, 0.75)',
                            borderColor: '#3498DB',
                            borderWidth: 1,
                            borderRadius: 4
                        },
                        {
                            label: 'Pagaram (Realizado)',
                            data: qtdPagantesPorMes,
                            backgroundColor: 'rgba(46, 204, 113, 0.85)',
                            borderColor: '#2ECC71',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#F4F5F7', font: { size: 11 } } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ` ${context.dataset.label}: ${context.raw} associados`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        y: { ticks: { color: '#A0AEC0', precision: 0 }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
                    }
                }
            });
        }
    } catch(e1) { console.error('Erro no gráfico 1:', e1); }

    // GRÁFICO 2: VALORES FINANCEIROS (PREVISTO VS RECEBIDO)
    try {
        const ctxVal = document.getElementById('chartRelatorioMensalidadesValor');
        if (ctxVal) {
            destroyChartDirectSafely('chartRelatorioMensalidadesValor', 'chartRelatorioMensalidadesValor');
            window.chartRelatorioMensalidadesValor = new Chart(ctxVal, {
                type: 'bar',
                data: {
                    labels: nomesMeses,
                    datasets: [
                        {
                            label: 'Valor Previsto / Meta (R$)',
                            data: valorPrevistoPorMes,
                            backgroundColor: 'rgba(243, 156, 18, 0.75)',
                            borderColor: '#F39C12',
                            borderWidth: 1,
                            borderRadius: 4
                        },
                        {
                            label: 'Valor Recebido / Arrecadado (R$)',
                            data: valorRecebidoPorMes,
                            backgroundColor: 'rgba(46, 204, 113, 0.85)',
                            borderColor: '#2ECC71',
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#F4F5F7', font: { size: 11 } } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ` ${context.dataset.label}: R$ ${Number(context.raw).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        y: { 
                            ticks: { 
                                color: '#A0AEC0',
                                callback: function(val) { return 'R$ ' + val; }
                            }, 
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            beginAtZero: true 
                        }
                    }
                }
            });
        }
    } catch(e2) { console.error('Erro no gráfico 2:', e2); }

    // GRÁFICO 3: TENDÊNCIA E TAXA DE ADIMPLÊNCIA MÊS A MÊS
    try {
        const ctxTaxa = document.getElementById('chartRelatorioMensalidadesTaxa');
        if (ctxTaxa) {
            destroyChartDirectSafely('chartRelatorioMensalidadesTaxa', 'chartRelatorioMensalidadesTaxa');
            window.chartRelatorioMensalidadesTaxa = new Chart(ctxTaxa, {
                type: 'line',
                data: {
                    labels: nomesMeses,
                    datasets: [
                        {
                            label: '% Taxa de Eficiência / Adimplência',
                            data: taxaAdimplenciaPorMes,
                            borderColor: '#2ECC71',
                            backgroundColor: 'rgba(46, 204, 113, 0.15)',
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#2ECC71',
                            pointBorderColor: '#FFFFFF',
                            pointHoverRadius: 6,
                            pointRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#F4F5F7', font: { size: 11 } } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ` Adimplência: ${context.raw}% da meta`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        y: { 
                            ticks: { 
                                color: '#A0AEC0',
                                callback: function(val) { return val + '%'; }
                            }, 
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            min: 0,
                            max: 100
                        }
                    }
                }
            });
        }
    } catch(e3) { console.error('Erro no gráfico 3:', e3); }

    // GRÁFICO 4: RECEITAS TOTAIS VS DESPESAS
    try {
        const ctxRecDes = document.getElementById('chartRelatorioReceitasDespesas');
        if (ctxRecDes) {
            destroyChartDirectSafely('chartRelatorioReceitasDespesas', 'chartRelatorioReceitasDespesas');
            window.chartRelatorioReceitasDespesas = new Chart(ctxRecDes, {
                type: 'bar',
                data: {
                    labels: nomesMeses,
                    datasets: [
                        {
                            label: 'Receitas Totais (Entradas)',
                            data: totalReceitasPorMes,
                            backgroundColor: '#2ECC71',
                            borderRadius: 4
                        },
                        {
                            label: 'Despesas (Saídas)',
                            data: despesasPorMes,
                            backgroundColor: '#E74C3C',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#F4F5F7', font: { size: 11 } } }
                    },
                    scales: {
                        x: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        y: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
                    }
                }
            });
        }
    } catch(e4) { console.error('Erro no gráfico 4:', e4); }

    // GRÁFICO 5: DISTRIBUIÇÃO ANUAL (DOUGHNUT)
    try {
        const ctxDist = document.getElementById('chartRelatorioDistribuicao');
        if (ctxDist) {
            destroyChartDirectSafely('chartRelatorioDistribuicao', 'chartRelatorioDistribuicao');
            const hasMov = (totalReceitasAno > 0 || totalDespesasAno > 0);
            window.chartRelatorioDistribuicao = new Chart(ctxDist, {
                type: 'doughnut',
                data: {
                    labels: hasMov ? ['Receitas Totais', 'Despesas Totais'] : ['Sem movimentações'],
                    datasets: [{
                        data: hasMov ? [totalReceitasAno, totalDespesasAno] : [1],
                        backgroundColor: hasMov ? ['#2ECC71', '#E74C3C'] : ['rgba(255,255,255,0.1)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#F4F5F7', font: { size: 11 } } }
                    }
                }
            });
        }
    } catch(e5) { console.error('Erro no gráfico 5:', e5); }
}

// FUNÇÃO DE IMPRESSÃO DO RELATÓRIO EXECUTIVO DA DIRETORIA
function imprimirRelatorioDiretoria() {
    const selAno = document.getElementById('relatoriosFiltroAno');
    const ano = selAno ? selAno.value : '2026';
    const tabelaHTML = document.getElementById('tableRelatorioMensalidadesParametrosBody')?.innerHTML || '';

    const printWin = window.open('', '_blank', 'width=900,height=700');
    if (!printWin) {
        alert('Por favor, permita pop-ups para visualizar a versão de impressão.');
        return;
    }

    const agora = new Date().toLocaleString('pt-BR');

    printWin.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Relatório Executivo de Mensalidades & Finanças ${ano} - ACBCSJ</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #222; font-size: 13px; line-height: 1.4; }
                .header { text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 20px; }
                .header h1 { margin: 0; font-size: 18px; color: #1B263B; }
                .header h2 { margin: 4px 0 0 0; font-size: 14px; color: #D4AF37; font-weight: normal; }
                .info-bar { display: flex; justify-content: space-between; font-size: 11px; color: #666; margin-bottom: 15px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                th { background-color: #F4F6F9; font-weight: bold; color: #333; }
                .text-left { text-align: left; }
                .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 10px; }
                @media print {
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ASSOCIAÇÃO CORPO DE BOMBEIROS COMUNITÁRIOS DE SÃO JOSÉ (ACBCSJ)</h1>
                <h2>Relatório Executivo de Arrecadação de Mensalidades & Demonstrativo — Exercício ${ano}</h2>
            </div>
            <div class="info-bar">
                <span><b>Data de Emissão:</b> ${agora}</span>
                <span><b>Destinação:</b> Diretoria Executiva & Conselho Fiscal</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th class="text-left">Mês</th>
                        <th>Cobráveis (Meta)</th>
                        <th>Pagantes (Real)</th>
                        <th>Pendentes</th>
                        <th>Valor Previsto</th>
                        <th>Valor Recebido</th>
                        <th>Déficit</th>
                        <th>% Eficiência</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    ${tabelaHTML}
                </tbody>
            </table>
            <div class="footer">
                Documento gerado eletronicamente pelo Portal de Gestão ACBCSJ em ${agora}.
            </div>
            <script>
                window.onload = function() { window.print(); }
            <\/script>
        </body>
        </html>
    `);
    printWin.document.close();
}

window.renderRelatoriosDiretoria = renderRelatoriosDiretoria;
window.imprimirRelatorioDiretoria = imprimirRelatorioDiretoria;
