// ==========================================
// PORTAL ACBCSJ - GESTÃO FINANCEIRA & BALANCETES
// ==========================================

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
            const dInfo = extrairMesEAno(itemMens.data, itemMens.data_iso);
            const mAno = dInfo.ano || (itemMens.data_iso ? itemMens.data_iso.substring(0, 4) : (itemMens.data ? itemMens.data.split('/')[2] : itemMens.ano || '2026'));
            if (mAno === ano && dInfo.mes === strMes) {
                somaArrecadadaNoMes += (parseFloat(itemMens.valor) || 0);
            }
        });
        mensalidadesArrecadadasPorMes[idx] = somaArrecadadaNoMes;

        // Tarifa base vigente para este mês/ano
        const tarifaVigenteMes = typeof getValorMensalidadeVigente === 'function' ? getValorMensalidadeVigente(m.index, ano) : 20.00;
        mensalidadesPrevistasPorMes[idx] = qtdAssociadosAtivos * tarifaVigenteMes;
    });

    // Filtra receitas e despesas lançadas no livro financeiro para o ano selecionado
    financeiro.forEach(f => {
        const parsed = extrairMesEAno(f.data, f.data_iso);
        const fAno = parsed.ano || (f.data_iso ? f.data_iso.substring(0, 4) : '2026');
        
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

    // Atualiza elementos de metricas
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

    // 2. Renderiza Gráfico 1: Receitas vs Despesas Mês a Mês (Barras)
    const ctxBarComp = document.getElementById('chartBalanceteMensalComparativo');
    if (ctxBarComp && typeof Chart !== 'undefined') {
        if (typeof chartBalanceteMensalComparativo !== 'undefined' && chartBalanceteMensalComparativo) chartBalanceteMensalComparativo.destroy();
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

    // 3. Renderiza Gráfico 2: Mensalidades - Previsto vs Recebido (Barras)
    const ctxBarMensal = document.getElementById('chartMensalidadesPrevistoVsArrecadado');
    if (ctxBarMensal && typeof Chart !== 'undefined') {
        if (typeof chartMensalidadesPrevistoVsArrecadado !== 'undefined' && chartMensalidadesPrevistoVsArrecadado) chartMensalidadesPrevistoVsArrecadado.destroy();
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

    // 4. Renderiza Gráfico 3: Rosca Proporcional do Ano (Entradas vs Saídas)
    const ctxDoughnut = document.getElementById('chartBalancete');
    if (ctxDoughnut && typeof Chart !== 'undefined') {
        if (typeof chartBalanceteDoughnut !== 'undefined' && chartBalanceteDoughnut) chartBalanceteDoughnut.destroy();
        chartBalanceteDoughnut = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Entradas / Receitas', 'Saídas / Despesas'],
                datasets: [{
                    data: [totalReceitasAno, totalDespesasAno],
                    backgroundColor: ['#2ECC71', '#E74C3C'],
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

    // 5. Preenche Tabela de Demonstrativos Mensais e Balancetes Oficiais
    const tbodyTransp = document.getElementById('tableBalancetesMensaisTransparencia');
    if (tbodyTransp) {
        const nomesMesesCompletos = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        
        tbodyTransp.innerHTML = nomesMesesCompletos.map((mNome, idx) => {
            const mIndexStr = String(idx + 1).padStart(2, '0');
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
                        <button type="button" class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 8px;" onclick="abrirModalBalanceteMensal('${mIndexStr}', '${ano}')">
                            📄 Abrir Balancete
                        </button>
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
    let str = dataIso || dataStr || '';
    if (!str) return { mes: '', ano: '' };

    // Formato YYYY-MM-DD
    if (str.includes('-')) {
        const parts = str.split('-');
        if (parts.length >= 3) {
            return {
                ano: parts[0].trim(),
                mes: String(parts[1]).padStart(2, '0')
            };
        }
    }

    // Formato DD/MM/YYYY
    if (str.includes('/')) {
        const parts = str.split('/');
        if (parts.length >= 3) {
            return {
                ano: parts[2].trim(),
                mes: String(parts[1]).padStart(2, '0')
            };
        }
    }

    return { mes: '', ano: '' };
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
        const dateInfo = extrairMesEAno(m.data, m.data_iso);
        const anoEntrada = dateInfo.ano || m.ano || anoSelected;
        combinedList.push({
            id: m.id || ('mens_' + Math.random()),
            data: m.data || '-',
            data_iso: m.data_iso || '',
            mes: dateInfo.mes,
            ano: anoEntrada,
            ano_referencia: m.ano,
            descricao: `💳 Mensalidade PIX — ${m.associado_nome || 'Associado'} (${m.meses_quitados || ''}/${m.ano || anoEntrada})`,
            categoria: 'Mensalidades Associados',
            tipo: 'receita',
            valor: parseFloat(m.valor) || 0,
            comprovante_nome: m.comprovante_pix || '',
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
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const strMes = String(mesIndex).padStart(2, '0');
    const nomeMes = mesesNomes[mesIndex - 1];

    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    // Receitas e Despesas gerais do mês usando o parser universal de datas
    const lancamentosMes = listFinanceiro.filter(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        return dateInfo.mes === strMes && (dateInfo.ano === anoStr || !dateInfo.ano);
    });

    // Mensalidades efetivamente recebidas neste mês/ano pela data de lançamento
    const mensalidadesMes = listMensalidades.filter(m => {
        const dateInfo = extrairMesEAno(m.data, m.data_iso);
        const mAno = dateInfo.ano || (m.data_iso ? m.data_iso.substring(0, 4) : (m.data ? m.data.split('/')[2] : m.ano || '2026'));
        return dateInfo.mes === strMes && mAno === anoStr;
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
                <h2 style="color: var(--accent-gold); margin: 0; font-size: 18px;">ASSOCIAÇÃO CORPO DE BOMBEIROS COMUNITÁRIOS DE SÃO JOSÉ — ACBCSJ</h2>
                <h3 style="margin: 5px 0 0 0; font-size: 15px;">DEMONSTRATIVO DE BALANCETE MENSAL DE PRESTAÇÃO DE CONTAS</h3>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-muted);">Mês de Referência: <b>${nomeMes} / ${anoStr}</b></p>
            </div>

            <!-- ENTRADAS / RECEITAS -->
            <h4 style="color: #2ECC71; font-size: 14px; margin-bottom: 8px;">➕ RECEITAS & ENTRADAS DO MÊS:</h4>
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
                        <td>Total Arrecadado no Caixa via PIX em (${nomeMes}/${anoStr}) [${mensalidadesMes.length} baixa(s)]</td>
                        <td style="text-align: right; color: #3498DB; font-weight: bold;">R$ ${totalMensalidades.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    ${receitasGerais.map(r => `
                        <tr>
                            <td><span class="badge badge-info">${r.categoria}</span></td>
                            <td>${r.descricao} (${r.data})</td>
                            <td style="text-align: right; color: #2ECC71; font-weight: bold;">R$ ${(parseFloat(r.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                    <tr style="background: rgba(46, 204, 113, 0.1); font-weight: bold;">
                        <td colspan="2">TOTAL GERAL DAS ENTRADAS</td>
                        <td style="text-align: right; color: #2ECC71;">R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tbody>
            </table>

            <!-- SAÍDAS / DESPESAS -->
            <h4 style="color: #E74C3C; font-size: 14px; margin-bottom: 8px;">➖ DESPESAS & SAÍDAS DO MÊS:</h4>
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
                        <tr><td colspan="3" style="text-align: center; color: var(--text-muted);">Nenhuma despesa registrada neste mês.</td></tr>
                    ` : despesasGerais.map(d => `
                        <tr>
                            <td><span class="badge badge-danger">${d.categoria}</span></td>
                            <td>${d.descricao} (${d.data})</td>
                            <td style="text-align: right; color: #E74C3C; font-weight: bold;">R$ ${(parseFloat(d.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                    <tr style="background: rgba(231, 76, 60, 0.1); font-weight: bold;">
                        <td colspan="2">TOTAL GERAL DAS SAÍDAS</td>
                        <td style="text-align: right; color: #E74C3C;">R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tbody>
            </table>

            <!-- RESUMO E SALDO -->
            <div style="background: rgba(241, 196, 15, 0.1); padding: 15px; border-radius: 6px; border: 1px solid var(--accent-gold); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; color: var(--accent-gold);">RESULTADO DO BALANCETE (${nomeMes}/${anoStr})</h4>
                    <small style="color: var(--text-muted);">Total de Entradas (-) Total de Saídas</small>
                </div>
                <div style="font-size: 20px; font-weight: bold; color: ${saldoFinal >= 0 ? '#2ECC71' : '#E74C3C'};">
                    ${saldoFinal >= 0 ? '+' : ''} R$ ${saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
            </div>
        `;
    }

    openModal('modalBalanceteMensal');
}
