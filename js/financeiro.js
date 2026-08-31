// ==========================================
// PORTAL ACBCSJ - GESTÃO FINANCEIRA & BALANCETES
// ==========================================

let chartBalanceteMensalComparativo = null;
let chartMensalidadesPrevistoVsArrecadado = null;
let chartBalanceteDoughnut = null;

function destroyChartSafely(canvasId) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    if (typeof Chart !== 'undefined' && typeof Chart.getChart === 'function') {
        try {
            const existing = Chart.getChart(el);
            if (existing) existing.destroy();
        } catch (e) {
            console.warn('Aviso ao destruir chart:', canvasId, e);
        }
    }
}

function renderBalancetesAssociado() {
    const selAno = document.getElementById('selAnoTransparencia');
    const ano = selAno ? selAno.value : '2026';

    const lblsAno = document.querySelectorAll('.lblAnoTransparencia');
    lblsAno.forEach(el => el.textContent = ano);

    // 1. Carrega dados de Associados, Financeiro e Histórico de Mensalidades para o Ano selecionado
    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = listAssociados.filter(a => a.status === 'ativo' || !a.status);
    const qtdAssociadosAtivos = ativos.length || 1;

    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    const mesesInfo = [
        { index: 1, key: 'jan', nome: 'Jan' },
        { index: 2, key: 'fev', nome: 'Fev' },
        { index: 3, key: 'mar', nome: 'Mar' },
        { index: 4, key: 'abr', nome: 'Abr' },
        { index: 5, key: 'mai', nome: 'Mai' },
        { index: 6, key: 'jun', nome: 'Jun' },
        { index: 7, key: 'jul', nome: 'Jul' },
        { index: 8, key: 'ago', nome: 'Ago' },
        { index: 9, key: 'set', nome: 'Set' },
        { index: 10, key: 'out', nome: 'Out' },
        { index: 11, key: 'nov', nome: 'Nov' },
        { index: 12, key: 'dez', nome: 'Dez' }
    ];

    const labelsMeses = mesesInfo.map(m => m.nome);
    const receitasPorMes = Array(12).fill(0);
    const despesasPorMes = Array(12).fill(0);
    const mensalidadesPrevistasPorMes = Array(12).fill(0);
    const mensalidadesArrecadadasPorMes = Array(12).fill(0);

    // Calcula mensalidades arrecadadas no caixa mês a mês (pela data de pagamento / entrada no sistema)
    mesesInfo.forEach((m, idx) => {
        const strMes = String(m.index).padStart(2, '0');
        let somaArrecadadaNoMes = 0;
        listMensalidades.forEach(itemMens => {
            const dInfo = extrairInfoMensalidade(itemMens, ano);
            if (dInfo.ano === ano && dInfo.mes === strMes) {
                somaArrecadadaNoMes += (parseFloat(itemMens.valor) || 0);
            }
        });
        mensalidadesArrecadadasPorMes[idx] = somaArrecadadaNoMes;

        // Tarifa base vigente e associados admitidos até este mês/ano
        const tarifaVigenteMes = typeof getValorMensalidadeVigente === 'function' ? getValorMensalidadeVigente(m.index, ano) : 20.00;
        const qtdAdmitidosAteMes = ativos.filter(a => {
            const ing = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso(a) : { ano: 2020, mes: 1, anoInicioCobranca: 2020, mesInicioCobranca: 1 };
            const cobrancaScore = (ing.anoInicioCobranca || ing.ano) * 100 + (ing.mesInicioCobranca || ing.mes);
            return (parseInt(ano, 10) * 100 + m.index) >= cobrancaScore;
        }).length || 1;
        mensalidadesPrevistasPorMes[idx] = qtdAdmitidosAteMes * tarifaVigenteMes;
    });

    // Filtra receitas e despesas lançadas no livro financeiro para o ano selecionado
    financeiro.forEach(f => {
        const parsed = extrairMesEAno(f.data, f.data_iso);
        const fAno = parsed.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : '2026'));
        
        if (fAno === ano) {
            const mIndex = parseInt(parsed.mes, 10);
            if (mIndex >= 1 && mIndex <= 12) {
                const idx = mIndex - 1;
                const val = parseFloat(f.valor) || 0;
                if (f.tipo === 'receita') {
                    receitasPorMes[idx] += val;
                } else if (f.tipo === 'despesa') {
                    despesasPorMes[idx] += val;
                }
            }
        }
    });

    // Totais Consolidados do Ano (incluindo mensalidades arrecadadas)
    const totalArrecadadoMensalidadesAno = mensalidadesArrecadadasPorMes.reduce((a, b) => a + b, 0);
    const totalReceitasGeraisAno = receitasPorMes.reduce((a, b) => a + b, 0);
    const totalReceitasAno = totalReceitasGeraisAno + totalArrecadadoMensalidadesAno;
    const totalDespesasAno = despesasPorMes.reduce((a, b) => a + b, 0);
    const saldoAno = totalReceitasAno - totalDespesasAno;

    const totalPrevistoMensalidadesAno = mensalidadesPrevistasPorMes.reduce((a, b) => a + b, 0);
    const percEficiencia = totalPrevistoMensalidadesAno > 0 ? ((totalArrecadadoMensalidadesAno / totalPrevistoMensalidadesAno) * 100).toFixed(1) : '100.0';

    // Atualiza elementos de métricas
    const elRec = document.getElementById('transpMetricReceitas');
    const elDes = document.getElementById('transpMetricDespesas');
    const elSal = document.getElementById('transpMetricSaldo');
    const elEfi = document.getElementById('transpMetricEficiencia');

    if (elRec) elRec.textContent = `R$ ${totalReceitasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDes) elDes.textContent = `R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSal) {
        elSal.textContent = `R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSal.style.color = saldoAno >= 0 ? '#2ECC71' : '#E74C3C';
    }
    if (elEfi) elEfi.textContent = `${percEficiencia}%`;

    // Total de receitas por mês (Gerais + Mensalidades PIX)
    const totalReceitasPorMes = receitasPorMes.map((recGeral, i) => recGeral + mensalidadesArrecadadasPorMes[i]);

    // 2. Renderiza Gráficos (com tratamento de exceções e destruição segura de instâncias anteriores)
    try {
        const ctxBarComp = document.getElementById('chartBalanceteMensalComparativo');
        if (ctxBarComp && typeof Chart !== 'undefined') {
            destroyChartSafely('chartBalanceteMensalComparativo');
            chartBalanceteMensalComparativo = new Chart(ctxBarComp, {
                type: 'bar',
                data: {
                    labels: labelsMeses,
                    datasets: [
                        {
                            label: 'Receitas (Entradas)',
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
                        y: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                }
            });
        }
    } catch (eChart1) {
        console.warn('Erro ao renderizar gráfico 1:', eChart1);
    }

    try {
        const ctxBarMensal = document.getElementById('chartMensalidadesPrevistoVsArrecadado');
        if (ctxBarMensal && typeof Chart !== 'undefined') {
            destroyChartSafely('chartMensalidadesPrevistoVsArrecadado');
            chartMensalidadesPrevistoVsArrecadado = new Chart(ctxBarMensal, {
                type: 'bar',
                data: {
                    labels: labelsMeses,
                    datasets: [
                        {
                            label: 'Previsto (Meta)',
                            data: mensalidadesPrevistasPorMes,
                            backgroundColor: '#3498DB',
                            borderRadius: 4
                        },
                        {
                            label: 'Recebido (Arrecadado)',
                            data: mensalidadesArrecadadasPorMes,
                            backgroundColor: '#2ECC71',
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
                        y: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                }
            });
        }
    } catch (eChart2) {
        console.warn('Erro ao renderizar gráfico 2:', eChart2);
    }

    try {
        const ctxDoughnut = document.getElementById('chartBalancete');
        if (ctxDoughnut && typeof Chart !== 'undefined') {
            destroyChartSafely('chartBalancete');
            const hasMov = (totalReceitasAno > 0 || totalDespesasAno > 0);
            chartBalanceteDoughnut = new Chart(ctxDoughnut, {
                type: 'doughnut',
                data: {
                    labels: hasMov ? ['Entradas / Receitas', 'Saídas / Despesas'] : ['Sem movimentações'],
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
    } catch (eChart3) {
        console.warn('Erro ao renderizar gráfico 3:', eChart3);
    }

    // 5. Preenche Tabela de Demonstrativos Mensais e Balancetes Oficiais
    const tbodyTransp = document.getElementById('tableBalancetesMensaisTransparencia');
    if (tbodyTransp) {
        const nomesMesesCompletos = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        
        tbodyTransp.innerHTML = nomesMesesCompletos.map((mNome, idx) => {
            const mIndex = idx + 1;
            const mIndexStr = String(mIndex).padStart(2, '0');
            const recGeral = receitasPorMes[idx];
            const arrMensal = mensalidadesArrecadadasPorMes[idx];
            const totalRecMes = recGeral + arrMensal;
            const des = despesasPorMes[idx];
            const mesSaldo = totalRecMes - des;
            
            const prevMensal = mensalidadesPrevistasPorMes[idx];
            const percMensal = prevMensal > 0 ? Math.round((arrMensal / prevMensal) * 100) : 100;

            return `
                <tr>
                    <td><b>${mIndexStr} - ${mNome} / ${ano}</b></td>
                    <td style="color: #2ECC71; font-weight: 600;">R$ ${recGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>
                        <b>R$ ${arrMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>
                        <small style="color: var(--text-muted);"> / R$ ${prevMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${percMensal}%)</small>
                    </td>
                    <td style="color: #E74C3C; font-weight: 600;">R$ ${des.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="font-weight: 700; color: ${mesSaldo >= 0 ? '#2ECC71' : '#E74C3C'};">
                        R$ ${mesSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                            <button type="button" class="btn btn-sm btn-gold" style="font-size: 11px; padding: 2px 8px; font-weight: 600;" onclick="gerarBalanceteMensal(${mIndex}, '${ano}')">
                                📄 Ver Balancete
                            </button>
                            <button type="button" class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 8px;" onclick="imprimirOuBaixarBalanceteMensal(${mIndex}, '${ano}')">
                                🖨️ PDF
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// GESTÃO FINANCEIRA, RECEITAS, DESPESAS E MENSALIDADES (PLANILHA MENSAL.XLSX)
// ==========================================

function abrirModalNovoLancamento(tipo) {
    const selTipo = document.getElementById('finTipo');
    const modalTitle = document.getElementById('modalLancamentoTitle');
    const dataInput = document.getElementById('finData');
    
    if (selTipo) {
        selTipo.value = tipo || 'receita';
        atualizarCategoriasLancamento(selTipo.value);
    }
    
    if (modalTitle) {
        modalTitle.textContent = tipo === 'despesa' ? '➖ Inserir Despesa (Saída)' : '➕ Inserir Receita (Entrada)';
    }

    if (dataInput && !dataInput.value) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.value = hoje;
    }

    openModal('modalNovoLancamento');
}

function atualizarCategoriasLancamento(tipo) {
    const catSelect = document.getElementById('finCategoria');
    if (!catSelect) return;
    
    catSelect.innerHTML = '';
    if (tipo === 'receita') {
        catSelect.innerHTML = `
            <option value="Mensalidade / Contribuição">Mensalidade / Contribuição</option>
            <option value="Doação / Convênio">Doação / Convênio</option>
            <option value="Evento / Rifa">Evento / Rifa</option>
            <option value="Outras Receitas">Outras Receitas</option>
        `;
    } else {
        catSelect.innerHTML = `
            <option value="Despesa Operacional">Despesa Operacional</option>
            <option value="Manutenção de Viatura">Manutenção de Viatura</option>
            <option value="Administrativo / Consumo">Administrativo / Consumo</option>
            <option value="Encargos / Tarifas">Encargos / Tarifas</option>
            <option value="Outras Despesas">Outras Despesas</option>
        `;
    }
}

function salvarNovoLancamento(e) {
    e.preventDefault();
    const tipo = document.getElementById('finTipo').value;
    const valor = parseFloat(document.getElementById('finValor').value);
    const descricao = document.getElementById('finDescricao').value.trim();
    const categoria = document.getElementById('finCategoria').value;
    const dataInput = document.getElementById('finData').value;
    const fileInput = document.getElementById('finComprovante');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!valor || valor <= 0 || !descricao || !dataInput) {
        alert('Por favor, preencha a descrição, valor válido e a data do lançamento.');
        return;
    }

    const [ano, mes, dia] = dataInput.split('-');
    const dataBR = `${dia}/${mes}/${ano}`;
    const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const mesNome = mesesNomes[parseInt(mes, 10) - 1] || 'Janeiro';

    const lancId = 'lanc_' + Date.now();

    const concluirSalvarLancamento = async (fileDataUrl = null, fileName = null) => {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        const novoLancamento = {
            id: lancId,
            descricao: descricao,
            categoria: categoria,
            valor: valor,
            tipo: tipo,
            data: dataBR,
            data_iso: dataInput,
            mes: mesNome,
            comprovante_nome: fileName
        };

        if (fileDataUrl) {
            await idbStorage.setFile(lancId, fileDataUrl);
        }

        list.unshift(novoLancamento);

        try {
            localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));
        } catch (err) {
            console.warn('Salvo no sistema.');
        }

        try {
            if (typeof dbService !== "undefined") dbService.saveFinanceiro(novoLancamento);
        } catch (err) {}

        alert(`Lançamento de ${tipo.toUpperCase()} (R$ ${valor.toFixed(2).replace('.', ',')}) cadastrado com sucesso!`);
        e.target.reset();
        closeModal('modalNovoLancamento');
        renderGestaoFinanceira();
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            concluirSalvarLancamento(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    } else {
        concluirSalvarLancamento();
    }
}

function excluirLancamentoFinanceiro(id) {
    if (confirm('Deseja realmente remover este lançamento financeiro?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(item => item.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));
        if (typeof dbService !== 'undefined') {
            try { dbService.deleteFinanceiro(id); } catch(e) {}
        }
        idbStorage.deleteFile(id);
        alert('Lançamento removido com sucesso.');
        renderGestaoFinanceira();
    }
}

async function abrirComprovanteLancamento(id) {
    const fileContent = await idbStorage.getFile(id);
    if (!fileContent) {
        alert('Comprovante não disponível para este lançamento.');
        return;
    }
    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Comprovante Financeiro - ACBCSJ</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${fileContent}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    } else {
        alert('Visualização bloqueada pelo navegador.');
    }
}

function extrairMesEAno(dataStr, dataIso) {
    let str = String(dataIso || dataStr || '').trim();
    if (!str || str === 'undefined' || str === 'null' || str === '-') {
        return { mes: '', ano: '' };
    }

    // Se tiver espaço ou T (ex: 2026-08-31T12:00 ou 31/08/2026 14:30), pegar apenas a data
    if (str.includes('T')) str = str.split('T')[0].trim();
    if (str.includes(' ')) str = str.split(' ')[0].trim();

    // Formato YYYY-MM-DD ou YYYY/MM/DD
    if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(str) || str.indexOf('-') === 4 || str.indexOf('/') === 4) {
        const parts = str.split(/[-/]/);
        if (parts.length >= 3) {
            return {
                ano: String(parts[0]).trim(),
                mes: String(parts[1]).padStart(2, '0')
            };
        }
    }

    // Formato DD/MM/YYYY ou DD-MM-YYYY
    if (str.includes('/') || str.includes('-')) {
        const parts = str.split(/[-/]/);
        if (parts.length >= 3) {
            if (parts[2].trim().length >= 4) {
                return {
                    ano: parts[2].trim().substring(0, 4),
                    mes: String(parts[1]).padStart(2, '0')
                };
            }
            if (parts[0].trim().length === 4) {
                return {
                    ano: parts[0].trim(),
                    mes: String(parts[1]).padStart(2, '0')
                };
            }
        }
    }

    return { mes: '', ano: '' };
}

function extrairInfoMensalidade(m, anoPadrao = '2026') {
    if (!m) return { ano: anoPadrao, mes: '01', dataExibicao: `01/01/${anoPadrao}` };

    const dataStr = m.data || m.data_pagamento || m.data_baixa || m.data_registro || '';
    const dataIso = m.data_iso || m.created_at || '';
    
    let dInfo = extrairMesEAno(dataStr, dataIso);
    let ano = dInfo.ano || String(m.ano || '').trim() || anoPadrao;
    let mes = dInfo.mes;

    // Se o mês não foi identificado na data, tenta inferir de mes_referencia ou meses_quitados
    if (!mes) {
        const ref = String(m.mes_referencia || m.meses_quitados || '').toLowerCase();
        const mapa = {
            'jan': '01', 'fev': '02', 'mar': '03', 'abr': '04', 'mai': '05', 'jun': '06',
            'jul': '07', 'ago': '08', 'set': '09', 'out': '10', 'nov': '11', 'dez': '12'
        };
        for (const [k, v] of Object.entries(mapa)) {
            if (ref.includes(k)) {
                mes = v;
                break;
            }
        }
    }

    if (!mes) mes = '01';

    // Monta uma data amigável de exibição
    let dataExibicao = dataStr || '';
    if (!dataExibicao && dataIso) {
        const p = dataIso.split('T')[0].split('-');
        if (p.length === 3) dataExibicao = `${p[2]}/${p[1]}/${p[0]}`;
    }
    if (!dataExibicao || dataExibicao.length < 8) {
        dataExibicao = `01/${mes}/${ano}`;
    }

    return {
        ano: String(ano).trim(),
        mes: String(mes).padStart(2, '0'),
        dataExibicao: dataExibicao
    };
}

function renderGestaoFinanceira() {
    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    const filtroAnoSelect = document.getElementById('finFiltroAno');
    const anoSelected = filtroAnoSelect ? filtroAnoSelect.value : '2026';

    const filtroMesSelect = document.getElementById('finFiltroMes');
    const mesSelected = filtroMesSelect ? filtroMesSelect.value : 'todos';

    const filtroTipoSelect = document.getElementById('finFiltroTipo');
    const filtroTipo = filtroTipoSelect ? filtroTipoSelect.value : 'todos';

    // Atualiza rótulos de ano no DOM
    document.querySelectorAll('.lblAnoFinanceiro').forEach(el => el.textContent = anoSelected);

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // 1. CONSTRÓI LISTA COMBINADA DE TODOS OS LANÇAMENTOS (FINANCEIRO + MENSALIDADES)
    let combinedList = [];

    // A) Lançamentos gerais do caixa
    listFinanceiro.forEach(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        combinedList.push({
            id: item.id || ('fin_' + Math.random()),
            data: item.data || '-',
            data_iso: item.data_iso || '',
            mes: dateInfo.mes,
            ano: dateInfo.ano || anoSelected,
            descricao: item.descricao || 'Sem descrição',
            categoria: item.categoria || 'Geral',
            tipo: item.tipo || 'despesa',
            valor: parseFloat(item.valor) || 0,
            comprovante_nome: item.comprovante_nome || '',
            origem: 'financeiro'
        });
    });

    // B) Lançamentos de Mensalidades PIX (Contabilizados pela data em que entraram no caixa)
    listMensalidades.forEach(m => {
        const infoM = extrairInfoMensalidade(m, anoSelected);

        let nomeAssociado = m.associado_nome;
        if (!nomeAssociado && m.cpf) {
            const listAssoc = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
            const cleanC = String(m.cpf).replace(/\D/g, '');
            const a = listAssoc.find(socio => String(socio.cpf || '').replace(/\D/g, '') === cleanC);
            if (a) nomeAssociado = a.nome_guerra || a.nome;
        }
        if (!nomeAssociado) nomeAssociado = 'Associado';

        const mesesQuitados = m.meses_quitados || m.mes_referencia || '';

        combinedList.push({
            id: m.id || ('mens_' + Math.random()),
            data: infoM.dataExibicao,
            data_iso: m.data_iso || m.created_at || '',
            mes: infoM.mes,
            ano: infoM.ano,
            ano_referencia: m.ano || infoM.ano,
            descricao: `💳 Mensalidade PIX — ${nomeAssociado} (${mesesQuitados}/${m.ano || infoM.ano})`,
            categoria: 'Mensalidades Associados',
            tipo: 'receita',
            valor: parseFloat(m.valor) || 0,
            comprovante_nome: m.comprovante_pix || m.observacoes || m.obs || '',
            origem: 'mensalidade'
        });
    });

    // 2. PROCESSA DEMONSTRATIVO & LEVANTAMENTO MENSAL (12 MESES DO EXERCÍCIO)
    const containerLevantamento = document.getElementById('tableLevantamentoMensalBody');
    let demonstrativoMensal = [];

    for (let i = 1; i <= 12; i++) {
        const strMes = String(i).padStart(2, '0');
        const nomeMes = mesesNomes[i - 1];

        // Sum Receitas Gerais (excluindo mensalidades)
        let recsGerais = combinedList
            .filter(item => item.origem === 'financeiro' && item.tipo === 'receita' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

        // Sum Mensalidades PIX
        let mensPix = combinedList
            .filter(item => item.origem === 'mensalidade' && item.tipo === 'receita' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

        // Sum Despesas Gerais
        let despsGerais = combinedList
            .filter(item => item.tipo === 'despesa' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

        const saldoMes = (recsGerais + mensPix) - despsGerais;
        const temMovimento = (recsGerais + mensPix + despsGerais) > 0;

        demonstrativoMensal.push({
            mesNum: strMes,
            mesIndex: i,
            nomeMes: nomeMes,
            receitasGerais: recsGerais,
            mensalidadesPix: mensPix,
            despesas: despsGerais,
            saldo: saldoMes,
            temMovimento: temMovimento
        });
    }

    if (containerLevantamento) {
        containerLevantamento.innerHTML = demonstrativoMensal.map(d => {
            const isMesSelecionado = mesSelected === d.mesNum;
            const bgRow = isMesSelecionado ? 'background: rgba(241, 196, 15, 0.2); font-weight: bold; border-left: 4px solid var(--accent-gold);' : '';
            return `
                <tr style="${bgRow}">
                    <td style="text-align: left;">
                        <b>${d.nomeMes} / ${anoSelected}</b> ${isMesSelecionado ? '<span class="badge badge-gold" style="font-size:9px;">SELECIONADO</span>' : ''}
                    </td>
                    <td style="color: #2ECC71;">R$ ${d.receitasGerais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="color: #3498DB; font-weight: bold;">R$ ${d.mensalidadesPix.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="color: #E74C3C;">R$ ${d.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="font-weight: 700; color: ${d.saldo >= 0 ? '#2ECC71' : '#E74C3C'};">
                        ${d.saldo >= 0 ? '+' : ''} R$ ${d.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <span class="badge badge-${d.temMovimento ? 'info' : 'secondary'}" style="font-size: 10px;">
                            ${d.temMovimento ? '🟢 FECHADO' : '⚪ SEM MOV.'}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 4px; justify-content: center;">
                            <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px;" onclick="filtrarExtratoMes('${d.mesNum}')">🔍 Ver Mês</button>
                            <button class="btn btn-sm btn-gold" style="padding: 2px 6px; font-size: 11px;" onclick="gerarBalanceteMensal(${d.mesIndex}, '${anoSelected}')">📄 Balancete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // 3. CALCULA MÉTRICAS DO PERÍODO SELECIONADO (MÊS OU ANO)
    let totalReceitasPer = 0;
    let totalMensalidadesPer = 0;
    let totalDespesasPer = 0;

    if (mesSelected === 'todos') {
        totalReceitasPer = demonstrativoMensal.reduce((s, d) => s + d.receitasGerais, 0);
        totalMensalidadesPer = demonstrativoMensal.reduce((s, d) => s + d.mensalidadesPix, 0);
        totalDespesasPer = demonstrativoMensal.reduce((s, d) => s + d.despesas, 0);
    } else {
        const itemM = demonstrativoMensal.find(d => d.mesNum === mesSelected);
        if (itemM) {
            totalReceitasPer = itemM.receitasGerais;
            totalMensalidadesPer = itemM.mensalidadesPix;
            totalDespesasPer = itemM.despesas;
        }
    }

    const saldoPer = (totalReceitasPer + totalMensalidadesPer) - totalDespesasPer;
    const strPeriodo = mesSelected === 'todos' ? `Ano ${anoSelected}` : `${mesesNomes[parseInt(mesSelected, 10) - 1]} / ${anoSelected}`;

    document.querySelectorAll('.lblPeriodoFinanceiro').forEach(el => el.textContent = strPeriodo);

    const elReceita = document.getElementById('finTotalReceitas');
    const elMensalidades = document.getElementById('finTotalMensalidadesAno');
    const elDespesa = document.getElementById('finTotalDespesas');
    const elSaldo = document.getElementById('finSaldoAtual');

    if (elReceita) elReceita.textContent = `R$ ${totalReceitasPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elMensalidades) elMensalidades.textContent = `R$ ${totalMensalidadesPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDespesa) elDespesa.textContent = `R$ ${totalDespesasPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSaldo) {
        elSaldo.textContent = `R$ ${saldoPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSaldo.style.color = saldoPer >= 0 ? 'var(--accent-gold)' : '#E74C3C';
    }

    // 4. RENDERIZA A TABELA DE EXTRATO DE LANÇAMENTOS COMBINADOS (FINANCEIRO + MENSALIDADES)
    const container = document.getElementById('tableFinanceiroBody');
    if (container) {
        let filtrados = combinedList;

        // Filtra por Exercício / Ano
        filtrados = filtrados.filter(i => i.ano === anoSelected);

        // Filtra por Período / Mês
        if (mesSelected !== 'todos') {
            filtrados = filtrados.filter(i => i.mes === mesSelected);
        }

        // Filtra por Tipo (todos, receita, despesa)
        if (filtroTipo !== 'todos') {
            filtrados = filtrados.filter(i => i.tipo === filtroTipo);
        }

        if (filtrados.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum lançamento financeiro ou mensalidade encontrada para o período (${strPeriodo}) com os filtros selecionados.</td></tr>`;
        } else {
            container.innerHTML = filtrados.map(item => `
                <tr style="${item.origem === 'mensalidade' ? 'background: rgba(52, 152, 219, 0.05);' : ''}">
                    <td><b>${item.data || '-'}</b></td>
                    <td>${item.descricao}</td>
                    <td><span class="badge badge-${item.origem === 'mensalidade' ? 'primary' : 'info'}">${item.categoria}</span></td>
                    <td>
                        <span class="badge badge-${item.tipo === 'receita' ? 'success' : 'danger'}">
                            ${item.tipo === 'receita' ? '➕ RECEITA' : '➖ DESPESA'}
                        </span>
                    </td>
                    <td style="font-weight: 700; color: ${item.tipo === 'receita' ? '#2ECC71' : '#E74C3C'};">
                        ${item.tipo === 'receita' ? '+' : '-'} R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <div style="display:flex; gap:6px;">
                            ${item.origem === 'mensalidade' ? `
                                <span class="badge badge-success" style="font-size:10px;">💳 PIX Confirmado</span>
                            ` : `
                                ${item.comprovante_nome ? `<button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 6px; color:var(--accent-gold); border-color:var(--accent-gold);" onclick="abrirComprovanteLancamento('${item.id}')">📎 Recibo</button>` : ''}
                                <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 6px; color:#E74C3C; border-color:#E74C3C;" onclick="excluirLancamentoFinanceiro('${item.id}')">🗑️ Excluir</button>
                            `}
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// FILTRAR EXTRATO PELO BOTÃO DA TABELA DE LEVANTAMENTO MENSAL
function filtrarExtratoMes(strMes) {
    const filtroMesSelect = document.getElementById('finFiltroMes');
    if (filtroMesSelect) {
        filtroMesSelect.value = strMes;
        renderGestaoFinanceira();
    }
}

// GERAR BALANCETE MENSAL OFICIAL DA ACBCSJ
function gerarBalanceteMensal(mesIndex, anoStr) {
    if (!anoStr) {
        const selAno = document.getElementById('selAnoTransparencia') || document.getElementById('diretoriaFiltroAno');
        anoStr = selAno ? selAno.value : '2026';
    }
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mIdx = parseInt(mesIndex, 10) || 1;
    const strMes = String(mIdx).padStart(2, '0');
    const nomeMes = mesesNomes[mIdx - 1];

    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    // Receitas e Despesas gerais do mês usando o parser universal de datas
    const lancamentosMes = listFinanceiro.filter(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        const itemAno = dateInfo.ano || (item.data_iso ? item.data_iso.substring(0, 4) : (item.data ? item.data.split('/')[2] : anoStr));
        return dateInfo.mes === strMes && itemAno === anoStr;
    });

    // Mensalidades efetivamente recebidas neste mês/ano pela data de lançamento
    const mensalidadesMes = listMensalidades.filter(m => {
        const infoM = extrairInfoMensalidade(m, anoStr);
        return infoM.mes === strMes && infoM.ano === anoStr;
    });

    const receitasGerais = lancamentosMes.filter(i => i.tipo === 'receita');
    const despesasGerais = lancamentosMes.filter(i => i.tipo === 'despesa');

    const totalRecsGerais = receitasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);
    const totalMensalidades = mensalidadesMes.reduce((s, m) => s + (parseFloat(m.valor) || 0), 0);
    const totalDespesas = despesasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);

    const totalReceitas = totalRecsGerais + totalMensalidades;
    const saldoFinal = totalReceitas - totalDespesas;

    const container = document.getElementById('conteudoBalanceteMensal');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; border-bottom: 2px solid var(--accent-gold); padding-bottom: 12px; margin-bottom: 15px;">
                <h2 style="color: var(--accent-gold); margin: 0; font-size: 17px;">ASSOCIAÇÃO CORPO DE BOMBEIROS COMUNITÁRIOS DE SÃO JOSÉ — ACBCSJ</h2>
                <h3 style="margin: 5px 0 0 0; font-size: 14px;">DEMONSTRATIVO DE BALANCETE MENSAL DE PRESTAÇÃO DE CONTAS</h3>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-muted);">Mês de Referência: <b>${nomeMes} / ${anoStr}</b> • CNPJ: 07.962.460/0001-40</p>
            </div>

            <!-- ENTRADAS / RECEITAS -->
            <h4 style="color: #2ECC71; font-size: 13px; margin-bottom: 8px;">➕ RECEITAS & ENTRADAS DO MÊS:</h4>
            <table class="custom-table" style="font-size: 12px; margin-bottom: 15px;">
                <thead>
                    <tr>
                        <th>Origem / Categoria</th>
                        <th>Descrição</th>
                        <th style="text-align: right;">Valor (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Mensalidades de Associados (PIX)</b></td>
                        <td>Total Arrecadado no Caixa via PIX em (${nomeMes}/${anoStr}) [${mensalidadesMes.length} baixa(s) efetuada(s)]</td>
                        <td style="text-align: right; color: #3498DB; font-weight: bold;">R$ ${totalMensalidades.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    ${receitasGerais.map(r => `
                        <tr>
                            <td><span class="badge badge-info">${r.categoria}</span></td>
                            <td>${r.descricao} <small style="color: var(--text-muted);">(${r.data})</small></td>
                            <td style="text-align: right; color: #2ECC71; font-weight: bold;">R$ ${(parseFloat(r.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                    <tr style="background: rgba(46, 204, 113, 0.1); font-weight: bold;">
                        <td colspan="2">TOTAL GERAL DAS ENTRADAS</td>
                        <td style="text-align: right; color: #2ECC71; font-size: 13px;">R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tbody>
            </table>

            <!-- SAÍDAS / DESPESAS -->
            <h4 style="color: #E74C3C; font-size: 13px; margin-bottom: 8px;">➖ DESPESAS & SAÍDAS DO MÊS:</h4>
            <table class="custom-table" style="font-size: 12px; margin-bottom: 15px;">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Descrição / Favorecido</th>
                        <th style="text-align: right;">Valor (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    ${despesasGerais.length === 0 ? `
                        <tr><td colspan="3" style="text-align: center; color: var(--text-muted); padding: 10px;">Nenhuma despesa registrada neste mês.</td></tr>
                    ` : despesasGerais.map(d => `
                        <tr>
                            <td><span class="badge badge-danger">${d.categoria}</span></td>
                            <td>${d.descricao} <small style="color: var(--text-muted);">(${d.data})</small></td>
                            <td style="text-align: right; color: #E74C3C; font-weight: bold;">R$ ${(parseFloat(d.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                    <tr style="background: rgba(231, 76, 60, 0.1); font-weight: bold;">
                        <td colspan="2">TOTAL GERAL DAS SAÍDAS</td>
                        <td style="text-align: right; color: #E74C3C; font-size: 13px;">R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tbody>
            </table>

            <!-- RESUMO E SALDO -->
            <div style="background: rgba(241, 196, 15, 0.1); padding: 15px; border-radius: 6px; border: 1px solid var(--accent-gold); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h4 style="margin: 0; color: var(--accent-gold); font-size: 14px;">RESULTADO DO BALANCETE (${nomeMes}/${anoStr})</h4>
                    <small style="color: var(--text-muted);">Total de Entradas (-) Total de Saídas do Caixa</small>
                </div>
                <div style="font-size: 20px; font-weight: bold; color: ${saldoFinal >= 0 ? '#2ECC71' : '#E74C3C'};">
                    ${saldoFinal >= 0 ? '+' : ''} R$ ${saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
            </div>
        `;
    }

    const botoes = document.getElementById('botoesBalanceteMensal');
    if (botoes) {
        botoes.innerHTML = `
            <button type="button" class="btn btn-outline" onclick="closeModal('modalBalanceteMensal')">Fechar</button>
            <button type="button" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 6px;" onclick="exportarBalanceteMensalCSV(${mIdx}, '${anoStr}')">
                📊 Baixar Planilha (.CSV)
            </button>
            <button type="button" class="btn btn-gold" style="display: inline-flex; align-items: center; gap: 6px; font-weight: bold;" onclick="imprimirOuBaixarBalanceteMensal(${mIdx}, '${anoStr}')">
                🖨️ Baixar / Imprimir PDF Oficial
            </button>
        `;
    }

    openModal('modalBalanceteMensal');
}

// ALIAS GLOBAL PARA ABERTURA DO BALANCETE MENSAL
function abrirModalBalanceteMensal(mesIndex, anoStr) {
    gerarBalanceteMensal(parseInt(mesIndex, 10), anoStr);
}

// GERAR BALANCETE ANUAL COMPLETO CONSOLIDADO
function gerarBalanceteAnualCompleto(anoStr) {
    if (!anoStr) {
        const selAno = document.getElementById('selAnoTransparencia') || document.getElementById('diretoriaFiltroAno');
        anoStr = selAno ? selAno.value : '2026';
    }

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = listAssociados.filter(a => a.status === 'ativo' || !a.status);
    const qtdAssociadosAtivos = ativos.length || 1;

    const tabelaMeses = mesesNomes.map((mNome, idx) => {
        const strMes = String(idx + 1).padStart(2, '0');
        
        // Mensalidades no mês
        let arrMens = 0;
        let qtdBaixas = 0;
        listMensalidades.forEach(m => {
            const infoM = extrairInfoMensalidade(m, anoStr);
            if (infoM.ano === anoStr && infoM.mes === strMes) {
                arrMens += (parseFloat(m.valor) || 0);
                qtdBaixas++;
            }
        });

        // Receitas e Despesas gerais
        let recGerais = 0;
        let despesas = 0;
        listFinanceiro.forEach(f => {
            const dInfo = extrairMesEAno(f.data, f.data_iso);
            const fAno = dInfo.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : anoStr));
            if (fAno === anoStr && dInfo.mes === strMes) {
                const val = parseFloat(f.valor) || 0;
                if (f.tipo === 'receita') recGerais += val;
                else if (f.tipo === 'despesa') despesas += val;
            }
        });

        const totalEntradas = recGerais + arrMens;
        const saldoMes = totalEntradas - despesas;
        const tarifaVigenteMes = typeof getValorMensalidadeVigente === 'function' ? getValorMensalidadeVigente(idx + 1, anoStr) : 20.00;
        const qtdAdmitidosAteMes = ativos.filter(a => {
            const ing = typeof extrairMesEAnoIngresso === 'function' ? extrairMesEAnoIngresso(a) : { ano: 2020, mes: 1, anoInicioCobranca: 2020, mesInicioCobranca: 1 };
            const cobrancaScore = (ing.anoInicioCobranca || ing.ano) * 100 + (ing.mesInicioCobranca || ing.mes);
            return (parseInt(anoStr, 10) * 100 + (idx + 1)) >= cobrancaScore;
        }).length || 1;
        const prevMensal = qtdAdmitidosAteMes * tarifaVigenteMes;

        return {
            mesIndex: idx + 1,
            mesNome: mNome,
            strMes: strMes,
            recGerais: recGerais,
            arrMens: arrMens,
            qtdBaixas: qtdBaixas,
            prevMensal: prevMensal,
            totalEntradas: totalEntradas,
            despesas: despesas,
            saldoMes: saldoMes
        };
    });

    const totalRecsGeraisAno = tabelaMeses.reduce((s, m) => s + m.recGerais, 0);
    const totalMensalidadesAno = tabelaMeses.reduce((s, m) => s + m.arrMens, 0);
    const totalEntradasAno = tabelaMeses.reduce((s, m) => s + m.totalEntradas, 0);
    const totalDespesasAno = tabelaMeses.reduce((s, m) => s + m.despesas, 0);
    const totalPrevistoAno = tabelaMeses.reduce((s, m) => s + m.prevMensal, 0);
    const saldoAno = totalEntradasAno - totalDespesasAno;
    const percEficiencia = totalPrevistoAno > 0 ? ((totalMensalidadesAno / totalPrevistoAno) * 100).toFixed(1) : '100.0';

    // Agrupamento de Despesas por Categoria no Ano
    const despesasPorCategoria = {};
    listFinanceiro.forEach(f => {
        const dInfo = extrairMesEAno(f.data, f.data_iso);
        const fAno = dInfo.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : anoStr));
        if (fAno === anoStr && f.tipo === 'despesa') {
            const cat = f.categoria || 'Outros';
            despesasPorCategoria[cat] = (despesasPorCategoria[cat] || 0) + (parseFloat(f.valor) || 0);
        }
    });

    const container = document.getElementById('conteudoBalanceteAnual');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; border-bottom: 2px solid var(--accent-gold); padding-bottom: 12px; margin-bottom: 15px;">
                <h2 style="color: var(--accent-gold); margin: 0; font-size: 18px;">ASSOCIAÇÃO CORPO DE BOMBEIROS COMUNITÁRIOS DE SÃO JOSÉ — ACBCSJ</h2>
                <h3 style="margin: 5px 0 0 0; font-size: 15px;">DEMONSTRATIVO CONSOLIDADO DO BALANCETE ANUAL — EXERCÍCIO ${anoStr}</h3>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--text-muted);">CNPJ: 07.962.460/0001-40 • Prestação de Contas e Transparência Financeira Oficial</p>
            </div>

            <!-- CARDS DE RESUMO DO EXERCÍCIO -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 20px;">
                <div style="background: rgba(46,204,113,0.1); border: 1px solid rgba(46,204,113,0.3); border-radius: 6px; padding: 12px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-muted);">TOTAL ENTRADAS (ANO)</div>
                    <div style="font-size: 18px; font-weight: bold; color: #2ECC71;">R$ ${totalEntradasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <small style="font-size: 10px; color: var(--text-muted);">Mensalidades: R$ ${totalMensalidadesAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</small>
                </div>
                <div style="background: rgba(231,76,60,0.1); border: 1px solid rgba(231,76,60,0.3); border-radius: 6px; padding: 12px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-muted);">TOTAL SAÍDAS (ANO)</div>
                    <div style="font-size: 18px; font-weight: bold; color: #E74C3C;">R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <small style="font-size: 10px; color: var(--text-muted);">Despesas Operacionais</small>
                </div>
                <div style="background: rgba(241,196,15,0.1); border: 1px solid rgba(241,196,15,0.3); border-radius: 6px; padding: 12px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-muted);">RESULTADO / SALDO FINAL</div>
                    <div style="font-size: 18px; font-weight: bold; color: ${saldoAno >= 0 ? '#2ECC71' : '#E74C3C'};">
                        ${saldoAno >= 0 ? '+' : ''} R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <small style="font-size: 10px; color: var(--text-muted);">${saldoAno >= 0 ? 'Superávit Operacional' : 'Déficit no Período'}</small>
                </div>
                <div style="background: rgba(52,152,219,0.1); border: 1px solid rgba(52,152,219,0.3); border-radius: 6px; padding: 12px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-muted);">EFICIÊNCIA MENSALIDADES</div>
                    <div style="font-size: 18px; font-weight: bold; color: #3498DB;">${percEficiencia}%</div>
                    <small style="font-size: 10px; color: var(--text-muted);">${ativos.length} associados ativos</small>
                </div>
            </div>

            <!-- TABELA CONSOLIDADA MÊS A MÊS -->
            <h4 style="color: var(--accent-gold); font-size: 14px; margin-bottom: 8px;">📑 Demonstrativo Consolidado Mês a Mês (${anoStr}):</h4>
            <div class="table-responsive" style="margin-bottom: 20px;">
                <table class="custom-table" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th>Mês / Período</th>
                            <th>Receitas Gerais</th>
                            <th>Mensalidades (PIX)</th>
                            <th>Total Entradas</th>
                            <th>Despesas (Saídas)</th>
                            <th>Saldo do Mês</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tabelaMeses.map(m => `
                            <tr>
                                <td><b>${m.strMes} - ${m.mesNome}</b></td>
                                <td style="color: #2ECC71;">R$ ${m.recGerais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                <td style="color: #3498DB; font-weight: bold;">R$ ${m.arrMens.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                <td style="font-weight: 700; color: #2ECC71;">R$ ${m.totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                <td style="color: #E74C3C; font-weight: 600;">R$ ${m.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                <td style="font-weight: bold; color: ${m.saldoMes >= 0 ? '#2ECC71' : '#E74C3C'};">
                                    ${m.saldoMes >= 0 ? '+' : ''} R$ ${m.saldoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline" style="font-size: 10px; padding: 2px 6px;" onclick="closeModal('modalBalanceteAnual'); gerarBalanceteMensal(${m.mesIndex}, '${anoStr}');">
                                        🔍 Detalhes
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                        <tr style="background: rgba(212,175,55,0.15); font-weight: bold; border-top: 2px solid var(--accent-gold);">
                            <td>TOTAIS CONSOLIDADOS (${anoStr})</td>
                            <td style="color: #2ECC71;">R$ ${totalRecsGeraisAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td style="color: #3498DB;">R$ ${totalMensalidadesAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td style="color: #2ECC71; font-size: 13px;">R$ ${totalEntradasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td style="color: #E74C3C; font-size: 13px;">R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td style="color: ${saldoAno >= 0 ? '#2ECC71' : '#E74C3C'}; font-size: 14px;">
                                ${saldoAno >= 0 ? '+' : ''} R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- DESPESAS POR CATEGORIA -->
            <h4 style="color: var(--text-color); font-size: 13px; margin-bottom: 8px;">📊 Distribuição das Despesas por Categoria (${anoStr}):</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 15px;">
                ${Object.keys(despesasPorCategoria).length === 0 ? `
                    <div style="color: var(--text-muted); font-size: 12px; grid-column: 1/-1;">Nenhuma despesa categorizada registrada no exercício.</div>
                ` : Object.entries(despesasPorCategoria).map(([cat, val]) => `
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; color: var(--text-color);">${cat}</span>
                        <b style="font-size: 12px; color: #E74C3C;">R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const botoes = document.getElementById('botoesBalanceteAnual');
    if (botoes) {
        botoes.innerHTML = `
            <button type="button" class="btn btn-outline" onclick="closeModal('modalBalanceteAnual')">Fechar</button>
            <button type="button" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 6px;" onclick="exportarBalanceteAnualCSV('${anoStr}')">
                📊 Baixar Planilha Completa (.CSV)
            </button>
            <button type="button" class="btn btn-gold" style="display: inline-flex; align-items: center; gap: 6px; font-weight: bold;" onclick="imprimirOuBaixarBalanceteAnual('${anoStr}')">
                🖨️ Baixar / Imprimir PDF Anual
            </button>
        `;
    }

    openModal('modalBalanceteAnual');
}

// IMPRESSÃO E DOWNLOAD DE BALANCETE EM PDF COM CABEÇALHO OFICIAL
function imprimirOuBaixarBalanceteDocumento(tituloDoc, subtituloDoc, htmlTabelas, htmlResumo) {
    const docWindow = window.open('', '_blank');
    if (!docWindow) {
        alert('Por favor, permita pop-ups no seu navegador para visualizar/baixar o balancete.');
        return;
    }

    const htmlCompleto = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>${tituloDoc} — ACBCSJ</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                    background: #f8fafc;
                    color: #1e293b;
                    padding: 25px;
                    line-height: 1.5;
                }
                .no-print-bar {
                    background: #1e293b;
                    color: #ffffff;
                    padding: 12px 20px;
                    border-radius: 8px;
                    margin-bottom: 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .btn-action {
                    background: #d97706;
                    color: #fff;
                    border: none;
                    padding: 8px 16px;
                    font-size: 13px;
                    font-weight: bold;
                    border-radius: 6px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .btn-action:hover { background: #b45309; }
                .btn-secondary {
                    background: #475569;
                    color: #fff;
                    border: none;
                    padding: 8px 14px;
                    font-size: 13px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-left: 8px;
                }
                .doc-page {
                    background: #ffffff;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 35px 40px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
                }
                .header-container {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border-bottom: 2px solid #b91c1c;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                .header-logo {
                    width: 75px;
                    height: 75px;
                    object-fit: contain;
                }
                .header-text h1 {
                    font-size: 16px;
                    font-weight: 800;
                    color: #8b0000;
                    text-transform: uppercase;
                    margin-bottom: 3px;
                }
                .header-text p {
                    font-size: 11px;
                    color: #64748b;
                    line-height: 1.3;
                }
                .doc-title-box {
                    background: #f1f5f9;
                    border-left: 4px solid #d97706;
                    padding: 10px 15px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }
                .doc-title-box h2 {
                    font-size: 15px;
                    color: #0f172a;
                    font-weight: 700;
                }
                .doc-title-box p {
                    font-size: 12px;
                    color: #475569;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                    margin-bottom: 20px;
                }
                th {
                    background: #f8fafc;
                    color: #334155;
                    font-weight: 700;
                    text-align: left;
                    padding: 8px 10px;
                    border: 1px solid #cbd5e1;
                }
                td {
                    padding: 7px 10px;
                    border: 1px solid #e2e8f0;
                    color: #1e293b;
                }
                tr:nth-child(even) td {
                    background: #fafafa;
                }
                .badge {
                    display: inline-block;
                    padding: 2px 6px;
                    font-size: 10px;
                    font-weight: 700;
                    border-radius: 4px;
                }
                .badge-success { background: #dcfce7; color: #166534; }
                .badge-danger { background: #fee2e2; color: #991b1b; }
                .badge-info { background: #e0f2fe; color: #075985; }
                .signatures {
                    margin-top: 40px;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                    text-align: center;
                    page-break-inside: avoid;
                }
                .signature-line {
                    border-top: 1px solid #94a3b8;
                    margin-top: 40px;
                    padding-top: 5px;
                    font-size: 11px;
                    color: #334155;
                    font-weight: 600;
                }
                @media print {
                    .no-print-bar { display: none !important; }
                    body { background: #ffffff; padding: 0; }
                    .doc-page { border: none; box-shadow: none; padding: 0; max-width: 100%; }
                    @page { size: A4; margin: 12mm; }
                }
            </style>
        </head>
        <body>
            <div class="no-print-bar">
                <div>
                    <b style="font-size: 14px;">📄 ${tituloDoc}</b><br>
                    <span style="font-size: 12px; color: #cbd5e1;">Documento oficial contábil da ACBCSJ formatado para impressão ou download em PDF.</span>
                </div>
                <div>
                    <button class="btn-action" onclick="window.print()">🖨️ Imprimir / Salvar em PDF</button>
                    <button class="btn-secondary" onclick="window.close()">❌ Fechar</button>
                </div>
            </div>

            <div class="doc-page">
                <div class="header-container">
                    <img src="${window.location.origin}/logo.png" alt="Logo ACBCSJ" class="header-logo" onerror="this.style.display='none'">
                    <div class="header-text">
                        <h1>Associação Corpo de Bombeiros Comunitários de São José — ACBCSJ</h1>
                        <p>CNPJ: 07.962.460/0001-40 | Fundação: 2006 | Entidade Sem Fins Lucrativos</p>
                        <p>Sede: Rua Getúlio Vargas, 278, Centro, São José - SC | CEP: 88103-400</p>
                    </div>
                </div>

                <div class="doc-title-box">
                    <h2>${tituloDoc}</h2>
                    <p>${subtituloDoc} • Emitido em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                ${htmlTabelas}

                ${htmlResumo}

                <div class="signatures">
                    <div>
                        <div class="signature-line">
                            DIRETORIA EXECUTIVA<br>
                            <span style="font-weight: normal; font-size: 10px; color: #64748b;">ACBCSJ</span>
                        </div>
                    </div>
                    <div>
                        <div class="signature-line">
                            TESOURARIA GERAL<br>
                            <span style="font-weight: normal; font-size: 10px; color: #64748b;">Prestação de Contas</span>
                        </div>
                    </div>
                    <div>
                        <div class="signature-line">
                            CONSELHO FISCAL<br>
                            <span style="font-weight: normal; font-size: 10px; color: #64748b;">Visto Contábil</span>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    docWindow.document.open();
    docWindow.document.write(htmlCompleto);
    docWindow.document.close();
}

function imprimirOuBaixarBalanceteMensal(mesIndex, anoStr) {
    if (!anoStr) {
        const selAno = document.getElementById('selAnoTransparencia') || document.getElementById('diretoriaFiltroAno');
        anoStr = selAno ? selAno.value : '2026';
    }
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mIdx = parseInt(mesIndex, 10) || 1;
    const strMes = String(mIdx).padStart(2, '0');
    const nomeMes = mesesNomes[mIdx - 1];

    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    const lancamentosMes = listFinanceiro.filter(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        const itemAno = dateInfo.ano || (item.data_iso ? item.data_iso.substring(0, 4) : (item.data ? item.data.split('/')[2] : anoStr));
        return dateInfo.mes === strMes && itemAno === anoStr;
    });

    const mensalidadesMes = listMensalidades.filter(m => {
        const infoM = extrairInfoMensalidade(m, anoStr);
        return infoM.mes === strMes && infoM.ano === anoStr;
    });

    const receitasGerais = lancamentosMes.filter(i => i.tipo === 'receita');
    const despesasGerais = lancamentosMes.filter(i => i.tipo === 'despesa');

    const totalRecsGerais = receitasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);
    const totalMensalidades = mensalidadesMes.reduce((s, m) => s + (parseFloat(m.valor) || 0), 0);
    const totalDespesas = despesasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);
    const totalReceitas = totalRecsGerais + totalMensalidades;
    const saldoFinal = totalReceitas - totalDespesas;

    const htmlTabelas = `
        <h3 style="font-size: 13px; color: #166534; margin-bottom: 6px;">➕ RECEITAS & ENTRADAS:</h3>
        <table>
            <thead>
                <tr>
                    <th>Origem / Categoria</th>
                    <th>Descrição</th>
                    <th style="text-align: right;">Valor (R$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Mensalidades Associados (PIX)</b></td>
                    <td>Arrecadação total de mensalidades via PIX (${mensalidadesMes.length} baixa(s))</td>
                    <td style="text-align: right; color: #0369a1; font-weight: bold;">R$ ${totalMensalidades.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
                ${receitasGerais.map(r => `
                    <tr>
                        <td><span class="badge badge-info">${r.categoria}</span></td>
                        <td>${r.descricao} (${r.data})</td>
                        <td style="text-align: right; color: #166534; font-weight: bold;">R$ ${(parseFloat(r.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                `).join('')}
                <tr style="background: #f0fdf4; font-weight: bold;">
                    <td colspan="2">TOTAL GERAL DE ENTRADAS</td>
                    <td style="text-align: right; color: #166534;">R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
            </tbody>
        </table>

        <h3 style="font-size: 13px; color: #991b1b; margin-bottom: 6px;">➖ DESPESAS & SAÍDAS:</h3>
        <table>
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Descrição / Favorecido</th>
                    <th style="text-align: right;">Valor (R$)</th>
                </tr>
            </thead>
            <tbody>
                ${despesasGerais.length === 0 ? `
                    <tr><td colspan="3" style="text-align: center; color: #64748b; padding: 8px;">Nenhuma despesa registrada neste mês.</td></tr>
                ` : despesasGerais.map(d => `
                    <tr>
                        <td><span class="badge badge-danger">${d.categoria}</span></td>
                        <td>${d.descricao} (${d.data})</td>
                        <td style="text-align: right; color: #991b1b; font-weight: bold;">R$ ${(parseFloat(d.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                `).join('')}
                <tr style="background: #fef2f2; font-weight: bold;">
                    <td colspan="2">TOTAL GERAL DE SAÍDAS</td>
                    <td style="text-align: right; color: #991b1b;">R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
            </tbody>
        </table>
    `;

    const htmlResumo = `
        <div style="background: #fffbeb; border: 2px solid #d97706; border-radius: 6px; padding: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <b style="font-size: 14px; color: #92400e;">RESULTADO OPERACIONAL DO BALANCETE (${nomeMes}/${anoStr})</b><br>
                <span style="font-size: 11px; color: #78350f;">Total de Entradas Recebidas (-) Total de Saídas Liquidadas</span>
            </div>
            <div style="font-size: 20px; font-weight: 800; color: ${saldoFinal >= 0 ? '#166534' : '#991b1b'};">
                ${saldoFinal >= 0 ? '+' : ''} R$ ${saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
        </div>
    `;

    imprimirOuBaixarBalanceteDocumento(
        `Balancete Mensal de Prestação de Contas — ${nomeMes}/${anoStr}`,
        `Demonstrativo Financeiro Oficial de Entradas, Mensalidades e Despesas da ACBCSJ`,
        htmlTabelas,
        htmlResumo
    );
}

function imprimirOuBaixarBalanceteAnual(anoStr) {
    if (!anoStr) {
        const selAno = document.getElementById('selAnoTransparencia') || document.getElementById('diretoriaFiltroAno');
        anoStr = selAno ? selAno.value : '2026';
    }
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    const tabelaMeses = mesesNomes.map((mNome, idx) => {
        const strMes = String(idx + 1).padStart(2, '0');
        let arrMens = 0;
        listMensalidades.forEach(m => {
            const infoM = extrairInfoMensalidade(m, anoStr);
            if (infoM.ano === anoStr && infoM.mes === strMes) {
                arrMens += (parseFloat(m.valor) || 0);
            }
        });

        let recGerais = 0;
        let despesas = 0;
        listFinanceiro.forEach(f => {
            const dInfo = extrairMesEAno(f.data, f.data_iso);
            const fAno = dInfo.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : anoStr));
            if (fAno === anoStr && dInfo.mes === strMes) {
                const val = parseFloat(f.valor) || 0;
                if (f.tipo === 'receita') recGerais += val;
                else if (f.tipo === 'despesa') despesas += val;
            }
        });

        const totalEntradas = recGerais + arrMens;
        const saldoMes = totalEntradas - despesas;
        return { mesIndex: idx + 1, mesNome: mNome, strMes, recGerais, arrMens, totalEntradas, despesas, saldoMes };
    });

    const totalRecsGeraisAno = tabelaMeses.reduce((s, m) => s + m.recGerais, 0);
    const totalMensalidadesAno = tabelaMeses.reduce((s, m) => s + m.arrMens, 0);
    const totalEntradasAno = tabelaMeses.reduce((s, m) => s + m.totalEntradas, 0);
    const totalDespesasAno = tabelaMeses.reduce((s, m) => s + m.despesas, 0);
    const saldoAno = totalEntradasAno - totalDespesasAno;

    const htmlTabelas = `
        <h3 style="font-size: 13px; color: #0f172a; margin-bottom: 8px;">📑 Demonstrativo Financeiro Mensal Consolidado (${anoStr}):</h3>
        <table>
            <thead>
                <tr>
                    <th>Mês / Exercício</th>
                    <th style="text-align: right;">Receitas Gerais</th>
                    <th style="text-align: right;">Mensalidades PIX</th>
                    <th style="text-align: right;">Total Entradas</th>
                    <th style="text-align: right;">Total Despesas</th>
                    <th style="text-align: right;">Resultado / Saldo</th>
                </tr>
            </thead>
            <tbody>
                ${tabelaMeses.map(m => `
                    <tr>
                        <td><b>${m.strMes} - ${m.mesNome}</b></td>
                        <td style="text-align: right; color: #166534;">R$ ${m.recGerais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td style="text-align: right; color: #0369a1; font-weight: 600;">R$ ${m.arrMens.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td style="text-align: right; color: #166534; font-weight: 700;">R$ ${m.totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td style="text-align: right; color: #991b1b; font-weight: 600;">R$ ${m.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td style="text-align: right; font-weight: bold; color: ${m.saldoMes >= 0 ? '#166534' : '#991b1b'};">
                            ${m.saldoMes >= 0 ? '+' : ''} R$ ${m.saldoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                    </tr>
                `).join('')}
                <tr style="background: #fef3c7; font-weight: 800; border-top: 2px solid #d97706;">
                    <td>TOTAIS CONSOLIDADOS (${anoStr})</td>
                    <td style="text-align: right; color: #166534;">R$ ${totalRecsGeraisAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; color: #0369a1;">R$ ${totalMensalidadesAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; color: #166534;">R$ ${totalEntradasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; color: #991b1b;">R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="text-align: right; color: ${saldoAno >= 0 ? '#166534' : '#991b1b'}; font-size: 13px;">
                        ${saldoAno >= 0 ? '+' : ''} R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    const htmlResumo = `
        <div style="background: #f8fafc; border: 2px solid #0f172a; border-radius: 6px; padding: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <b style="font-size: 14px; color: #0f172a;">BALANÇO CONSOLIDADO DO EXERCÍCIO ${anoStr}</b><br>
                <span style="font-size: 11px; color: #64748b;">Receitas Totais (R$ ${totalEntradasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}) (-) Despesas Totais (R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</span>
            </div>
            <div style="font-size: 22px; font-weight: 800; color: ${saldoAno >= 0 ? '#166534' : '#991b1b'};">
                ${saldoAno >= 0 ? '+' : ''} R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
        </div>
    `;

    imprimirOuBaixarBalanceteDocumento(
        `Balancete Anual Consolidado de Prestação de Contas — Exercício ${anoStr}`,
        `Relatório Anual Contábil de Entradas, Mensalidades, Saídas e Resultado da ACBCSJ`,
        htmlTabelas,
        htmlResumo
    );
}

// EXPORTAÇÃO DE PLANILHA CSV (MENSAL E ANUAL)
function downloadCSV(csvContent, filename) {
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportarBalanceteMensalCSV(mesIndex, anoStr) {
    if (!anoStr) {
        const selAno = document.getElementById('selAnoTransparencia') || document.getElementById('diretoriaFiltroAno');
        anoStr = selAno ? selAno.value : '2026';
    }
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mIdx = parseInt(mesIndex, 10) || 1;
    const strMes = String(mIdx).padStart(2, '0');
    const nomeMes = mesesNomes[mIdx - 1];

    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    let csv = `BALANCETE MENSAL ACBCSJ - ${nomeMes.toUpperCase()}/${anoStr}\n`;
    csv += `Data;Tipo;Categoria;Descricao;Valor (R$);Origem/Comprovante\n`;

    // Mensalidades
    listMensalidades.forEach(m => {
        const infoM = extrairInfoMensalidade(m, anoStr);
        if (infoM.mes === strMes && infoM.ano === anoStr) {
            csv += `"${infoM.dataExibicao}";"Receita";"Mensalidades Associados";"Mensalidade PIX - ${m.associado_nome || 'Associado'} (${m.meses_quitados || m.mes_referencia || ''})";"${(parseFloat(m.valor) || 0).toFixed(2).replace('.', ',')}";"${m.comprovante_pix || 'PIX'}"\n`;
        }
    });

    // Financeiro
    listFinanceiro.forEach(f => {
        const dInfo = extrairMesEAno(f.data, f.data_iso);
        const fAno = dInfo.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : anoStr));
        if (fAno === anoStr && dInfo.mes === strMes) {
            csv += `"${f.data || '-'}";"${f.tipo === 'receita' ? 'Receita' : 'Despesa'}";"${f.categoria || ''}";"${(f.descricao || '').replace(/"/g, '""')}";"${(parseFloat(f.valor) || 0).toFixed(2).replace('.', ',')}";"${f.fornecedor_cliente || ''}"\n`;
        }
    });

    downloadCSV(csv, `Balancete_ACBCSJ_${nomeMes}_${anoStr}.csv`);
}

function exportarBalanceteAnualCSV(anoStr) {
    if (!anoStr) {
        const selAno = document.getElementById('selAnoTransparencia') || document.getElementById('diretoriaFiltroAno');
        anoStr = selAno ? selAno.value : '2026';
    }
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    let csv = `BALANCETE ANUAL CONSOLIDADO ACBCSJ - EXERCICIO ${anoStr}\n`;
    csv += `Mes;Receitas Gerais (R$);Mensalidades PIX (R$);Total Entradas (R$);Despesas (R$);Saldo Mes (R$)\n`;

    let totRecGerais = 0;
    let totMens = 0;
    let totEntradas = 0;
    let totDesp = 0;

    mesesNomes.forEach((mNome, idx) => {
        const strMes = String(idx + 1).padStart(2, '0');
        let arrMens = 0;
        listMensalidades.forEach(m => {
            const infoM = extrairInfoMensalidade(m, anoStr);
            if (infoM.ano === anoStr && infoM.mes === strMes) {
                arrMens += (parseFloat(m.valor) || 0);
            }
        });

        let recGerais = 0;
        let desp = 0;
        listFinanceiro.forEach(f => {
            const dInfo = extrairMesEAno(f.data, f.data_iso);
            const fAno = dInfo.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : anoStr));
            if (fAno === anoStr && dInfo.mes === strMes) {
                const val = parseFloat(f.valor) || 0;
                if (f.tipo === 'receita') recGerais += val;
                else if (f.tipo === 'despesa') desp += val;
            }
        });

        const entMes = recGerais + arrMens;
        const saldoMes = entMes - desp;

        totRecGerais += recGerais;
        totMens += arrMens;
        totEntradas += entMes;
        totDesp += desp;

        csv += `"${strMes} - ${mNome}";"${recGerais.toFixed(2).replace('.', ',')}";"${arrMens.toFixed(2).replace('.', ',')}";"${entMes.toFixed(2).replace('.', ',')}";"${desp.toFixed(2).replace('.', ',')}";"${saldoMes.toFixed(2).replace('.', ',')}"\n`;
    });

    const saldoAnual = totEntradas - totDesp;
    csv += `\n"TOTAIS CONSOLIDADOS";"${totRecGerais.toFixed(2).replace('.', ',')}";"${totMens.toFixed(2).replace('.', ',')}";"${totEntradas.toFixed(2).replace('.', ',')}";"${totDesp.toFixed(2).replace('.', ',')}";"${saldoAnual.toFixed(2).replace('.', ',')}"\n`;

    downloadCSV(csv, `Balancete_Anual_ACBCSJ_${anoStr}.csv`);
}

// BINDINGS GLOBAIS
window.gerarBalanceteMensal = gerarBalanceteMensal;
window.abrirModalBalanceteMensal = abrirModalBalanceteMensal;
window.gerarBalanceteAnualCompleto = gerarBalanceteAnualCompleto;
window.imprimirOuBaixarBalanceteMensal = imprimirOuBaixarBalanceteMensal;
window.imprimirOuBaixarBalanceteAnual = imprimirOuBaixarBalanceteAnual;
window.exportarBalanceteMensalCSV = exportarBalanceteMensalCSV;
window.exportarBalanceteAnualCSV = exportarBalanceteAnualCSV;
window.renderBalancetesAssociado = renderBalancetesAssociado;
