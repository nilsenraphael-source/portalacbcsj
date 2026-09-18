/**
 * PORTAL ACBCSJ — MÓDULO DE ANIVERSARIANTES DA ASSOCIAÇÃO
 * Calendário comemorativo, mural anual, cálculo de idades e felicitações via WhatsApp.
 * Exclusivo para o Painel da Diretoria.
 */

// Estado global do módulo de aniversariantes
const estadoAniversariantes = {
    ano: new Date().getFullYear(),
    mes: new Date().getMonth(), // 0 a 11
    modoVisualizacao: 'calendario', // 'calendario' ou 'mural'
    busca: '',
    filtroStatus: 'ativo' // 'ativo', 'todos', 'desligado'
};

const NOMES_MESES_ANIVERSARIO = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const DIAS_SEMANA_ANIVERSARIO = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
];

/**
 * Extrai dia, mês e ano de nascimento de forma robusta e universal.
 * Suporta formatos: DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY, etc.
 */
function extrairDadosNascimento(dataStr) {
    if (!dataStr || typeof dataStr !== 'string') return null;
    let s = dataStr.trim();
    if (!s || s === '-' || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined') return null;

    // Se tiver hora anexada (ex: 23/05/1977 00:00:00 ou 1977-05-23T00:00:00)
    if (s.includes(' ')) s = s.split(' ')[0].trim();
    if (s.includes('T')) s = s.split('T')[0].trim();

    let dia = 0, mes = 0, ano = 0;

    // Formato YYYY-MM-DD ou YYYY/MM/DD
    if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(s)) {
        const parts = s.split(/[-/]/);
        ano = parseInt(parts[0], 10);
        mes = parseInt(parts[1], 10);
        dia = parseInt(parts[2], 10);
    }
    // Formato DD/MM/YYYY ou DD-MM-YYYY
    else if (/^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$/.test(s)) {
        const parts = s.split(/[-/]/);
        dia = parseInt(parts[0], 10);
        mes = parseInt(parts[1], 10);
        ano = parseInt(parts[2], 10);
        if (ano < 100) {
            ano = ano < 40 ? 2000 + ano : 1900 + ano;
        }
    }

    if (!dia || !mes || dia < 1 || dia > 31 || mes < 1 || mes > 12) {
        return null;
    }

    return { dia, mes, ano };
}

/**
 * Calcula a idade que o integrante completa no ano de referência.
 */
function calcularIdadeAniversariante(anoNasc, anoRef) {
    if (!anoNasc || !anoRef || anoRef < anoNasc) return null;
    return anoRef - anoNasc;
}

/**
 * Obtém a lista atualizada de associados com dados de nascimento processados.
 */
function getListaAssociadosProcessados() {
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    } catch (e) {
        list = [];
    }

    // Se a lista estiver vazia por algum motivo, tentar a constante global se existir
    if ((!list || list.length === 0) && typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined') {
        list = ASSOCIADOS_PLANILHA_REAL;
    }

    return list.map(a => {
        const dadosNasc = extrairDadosNascimento(a.data_nascimento);
        return {
            ...a,
            dadosNascimento: dadosNasc
        };
    });
}

/**
 * Renderizador principal do módulo de Aniversariantes.
 * Disparado ao navegar para a aba 'aniversariantes'.
 */
function renderAniversariantes() {
    const container = document.getElementById('tab-aniversariantes');
    if (!container) return;

    // Sincronizar os controles de navegação
    sincronizarControlesAniversariantes();

    // Carregar e filtrar associados
    const todos = getListaAssociadosProcessados();
    const filtrados = filtrarAssociadosAniversariantes(todos);

    // 1. Renderizar métricas e cards de destaque no topo
    renderMetricasEDestaquesAniversariantes(todos);

    // 2. Renderizar a visualização selecionada (Calendário ou Mural)
    const calEl = document.getElementById('containerVisualizacaoCalendarioAniversariantes');
    const muralEl = document.getElementById('containerVisualizacaoMuralAniversariantes');

    if (estadoAniversariantes.modoVisualizacao === 'mural') {
        if (calEl) calEl.style.display = 'none';
        if (muralEl) muralEl.style.display = 'block';
        renderMuralAnualAniversariantes(filtrados);
    } else {
        if (calEl) calEl.style.display = 'block';
        if (muralEl) muralEl.style.display = 'none';
        renderGradeCalendarioAniversariantes(filtrados);
    }
}

/**
 * Sincroniza labels e selects de ano/mês
 */
function sincronizarControlesAniversariantes() {
    const selAno = document.getElementById('selAnoAniversariantes');
    const selMes = document.getElementById('selMesAniversariantes');
    const lblTitulo = document.getElementById('lblMesAnoTituloAniversariantes');
    const filtroStatusEl = document.getElementById('selFiltroStatusAniversariantes');

    if (selAno) selAno.value = String(estadoAniversariantes.ano);
    if (selMes) selMes.value = String(estadoAniversariantes.mes);
    if (filtroStatusEl) filtroStatusEl.value = estadoAniversariantes.filtroStatus;

    if (lblTitulo) {
        lblTitulo.textContent = `${NOMES_MESES_ANIVERSARIO[estadoAniversariantes.mes]} de ${estadoAniversariantes.ano}`;
    }

    // Botões de modo de visualização
    const btnCal = document.getElementById('btnModoCalendarioAniversariantes');
    const btnMural = document.getElementById('btnModoMuralAniversariantes');
    if (btnCal && btnMural) {
        if (estadoAniversariantes.modoVisualizacao === 'calendario') {
            btnCal.className = 'btn btn-sm btn-gold';
            btnCal.style.border = '';
            btnMural.className = 'btn btn-sm btn-outline';
            btnMural.style.border = 'none';
        } else {
            btnMural.className = 'btn btn-sm btn-gold';
            btnMural.style.border = '';
            btnCal.className = 'btn btn-sm btn-outline';
            btnCal.style.border = 'none';
        }
    }
}

/**
 * Filtra a lista com base no status selecionado e termo de busca.
 */
function filtrarAssociadosAniversariantes(lista) {
    let filtrados = lista;

    // Filtro por status
    if (estadoAniversariantes.filtroStatus === 'ativo') {
        filtrados = filtrados.filter(a => a.status === 'ativo');
    } else if (estadoAniversariantes.filtroStatus === 'desligado') {
        filtrados = filtrados.filter(a => a.status === 'desligado');
    }

    // Filtro por termo de busca
    const termo = (estadoAniversariantes.busca || '').trim().toLowerCase();
    if (termo) {
        const termoSemAcento = termo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        filtrados = filtrados.filter(a => {
            const nomeNorm = (a.nome || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const guerraNorm = (a.nome_guerra || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const telNorm = (a.telefone || '').replace(/\D/g, '');
            return nomeNorm.includes(termoSemAcento) ||
                   guerraNorm.includes(termoSemAcento) ||
                   (a.cpf && a.cpf.replace(/\D/g, '').includes(termo.replace(/\D/g, ''))) ||
                   (telNorm && telNorm.includes(termo.replace(/\D/g, '')));
        });
    }

    return filtrados;
}

/**
 * Renderiza os cards de métricas e o banner festivo de hoje.
 */
function renderMetricasEDestaquesAniversariantes(todosAssociados) {
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1; // 1 a 12
    const anoHoje = hoje.getFullYear();

    // Apenas ativos para as métricas gerais
    const ativos = todosAssociados.filter(a => a.status === 'ativo' && a.dadosNascimento);

    // 1. Aniversariantes de Hoje
    const aniversariantesHoje = ativos.filter(a =>
        a.dadosNascimento.dia === diaHoje && a.dadosNascimento.mes === mesHoje
    );

    // 2. Aniversariantes do Mês Selecionado (no calendário)
    const mesSelecionado = estadoAniversariantes.mes + 1; // 1 a 12
    const aniversariantesDoMes = ativos.filter(a =>
        a.dadosNascimento.mes === mesSelecionado
    );

    // 3. Próximos aniversariantes a partir de hoje (janela de 30 dias)
    const proximos = [];
    ativos.forEach(a => {
        // Criar data de aniversário no ano corrente (ou próximo se já passou este ano)
        let dataAniv = new Date(anoHoje, a.dadosNascimento.mes - 1, a.dadosNascimento.dia);
        const diffTempo = dataAniv.getTime() - new Date(anoHoje, hoje.getMonth(), diaHoje).getTime();
        let diffDias = Math.round(diffTempo / (1000 * 60 * 60 * 24));

        if (diffDias < 0) {
            // Já passou este ano, calcular para o próximo ano
            dataAniv = new Date(anoHoje + 1, a.dadosNascimento.mes - 1, a.dadosNascimento.dia);
            const diffNovo = dataAniv.getTime() - new Date(anoHoje, hoje.getMonth(), diaHoje).getTime();
            diffDias = Math.round(diffNovo / (1000 * 60 * 60 * 24));
        }

        if (diffDias >= 0 && diffDias <= 30) {
            proximos.push({
                associado: a,
                diffDias: diffDias,
                dataAniv: dataAniv
            });
        }
    });

    proximos.sort((a, b) => a.diffDias - b.diffDias);

    // Atualizar os elementos do DOM
    const elCardHoje = document.getElementById('cardAniversarianteHojeDestaque');
    const elHojeConteudo = document.getElementById('conteudoAniversarianteHoje');
    const elCardHojeCount = document.getElementById('metricAniversariantesHojeCount');
    const elMesCount = document.getElementById('metricAniversariantesMesCount');
    const elProxCount = document.getElementById('metricProximosAniversariantesCount');
    const elTotalMapeado = document.getElementById('metricTotalCadastradosComNascimento');
    const elContainerProximos = document.getElementById('containerListaProximosAniversarios');

    if (elCardHojeCount) elCardHojeCount.textContent = `${aniversariantesHoje.length} integrante(s)`;
    if (elMesCount) elMesCount.textContent = `${aniversariantesDoMes.length} no mês`;
    if (elProxCount) elProxCount.textContent = `${proximos.length} nos próx. 30 dias`;
    if (elTotalMapeado) elTotalMapeado.textContent = `${ativos.length} associados`;

    // Banner festivo de hoje
    if (elCardHoje && elHojeConteudo) {
        if (aniversariantesHoje.length > 0) {
            elCardHoje.style.display = 'block';
            elCardHoje.className = 'card bday-banner-today';
            elHojeConteudo.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span class="badge badge-gold" style="font-size: 11px; font-weight: 800; animation: pulseBadge 1.5s infinite;">🎉 HOJE É DIA DE FESTA!</span>
                            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">
                                ${DIAS_SEMANA_ANIVERSARIO[hoje.getDay()]}, ${String(diaHoje).padStart(2, '0')} de ${NOMES_MESES_ANIVERSARIO[hoje.getMonth()]}
                            </span>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                            ${aniversariantesHoje.map(a => {
                                const idade = calcularIdadeAniversariante(a.dadosNascimento.ano, anoHoje);
                                return `
                                    <div style="background: rgba(255, 215, 0, 0.12); border: 1px solid rgba(255, 215, 0, 0.4); border-radius: 8px; padding: 10px 14px; display: inline-flex; align-items: center; gap: 12px;">
                                        <div style="font-size: 28px;">🎂</div>
                                        <div>
                                            <div style="font-size: 16px; font-weight: 800; color: var(--accent-gold); display: flex; align-items: center; gap: 6px;">
                                                <span>${a.nome_guerra || a.nome}</span>
                                                ${a.perfil === 'diretoria' ? '<span class="badge badge-gold" style="font-size: 9px; padding: 2px 6px;">DIRETORIA</span>' : ''}
                                            </div>
                                            <div style="font-size: 12px; color: var(--text-main);">
                                                ${a.nome} ${idade ? `• <b style="color: #2ECC71;">Completando ${idade} anos!</b>` : ''}
                                            </div>
                                        </div>
                                        <button class="btn btn-sm btn-gold" style="margin-left: 8px; font-size: 11px; padding: 6px 10px; display: inline-flex; align-items: center; gap: 4px;" onclick="enviarParabensWhatsApp('${a.telefone}', '${a.nome_guerra || a.nome}')">
                                            <span>💬</span> Dar Parabéns
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Se não houver aniversariante hoje, mostrar card informativo suave
            elCardHoje.style.display = 'block';
            elCardHoje.className = 'card';
            elCardHoje.style.borderLeft = '4px solid var(--accent-gold)';
            elCardHoje.style.background = 'rgba(255, 255, 255, 0.02)';
            elHojeConteudo.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 26px;">📅</span>
                        <div>
                            <div style="font-size: 14px; font-weight: 700; color: var(--text-main);">Nenhum aniversariante hoje (${String(diaHoje).padStart(2, '0')}/${String(mesHoje).padStart(2, '0')})</div>
                            <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0 0 0;">
                                O próximo aniversário é de: <b>${proximos.length > 0 ? `${proximos[0].associado.nome_guerra} (${proximos[0].diffDias === 1 ? 'Amanhã' : 'em ' + proximos[0].diffDias + ' dias'})` : 'Nenhum nos próximos 30 dias.'}</b>
                            </p>
                        </div>
                    </div>
                    ${proximos.length > 0 ? `
                        <button class="btn btn-outline btn-sm" onclick="abrirModalDetalhesAniversariante('${proximos[0].associado.cpf}')">
                            👀 Ver Próximo
                        </button>
                    ` : ''}
                </div>
            `;
        }
    }

    // Lista de próximos aniversariantes no card lateral
    if (elContainerProximos) {
        if (proximos.length === 0) {
            elContainerProximos.innerHTML = `<div style="font-size: 12px; color: var(--text-muted); padding: 8px 0;">Nenhum aniversário nos próximos 30 dias.</div>`;
        } else {
            elContainerProximos.innerHTML = proximos.slice(0, 4).map(item => {
                const a = item.associado;
                const d = a.dadosNascimento;
                const idade = calcularIdadeAniversariante(d.ano, anoHoje);
                let labelQuando = '';
                let corBadge = 'var(--text-muted)';
                let bgBadge = 'rgba(255,255,255,0.05)';

                if (item.diffDias === 0) {
                    labelQuando = 'Hoje! 🎉';
                    corBadge = 'var(--accent-gold)';
                    bgBadge = 'rgba(255,215,0,0.2)';
                } else if (item.diffDias === 1) {
                    labelQuando = 'Amanhã';
                    corBadge = '#2ECC71';
                    bgBadge = 'rgba(46,204,113,0.15)';
                } else {
                    labelQuando = `Em ${item.diffDias} dias`;
                    corBadge = '#3498DB';
                    bgBadge = 'rgba(52,152,219,0.15)';
                }

                return `
                    <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 6px; padding: 6px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 16px;">🎈</span>
                            <div>
                                <div style="font-size: 12px; font-weight: bold; color: var(--text-main);">
                                    ${a.nome_guerra || a.nome}
                                    <span style="font-size: 11px; font-weight: normal; color: var(--accent-gold);">(${String(d.dia).padStart(2, '0')}/${String(d.mes).padStart(2, '0')})</span>
                                </div>
                                <div style="font-size: 10px; color: var(--text-muted);">
                                    ${idade ? `Completará ${idade} anos` : a.nome}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span class="badge" style="font-size: 10px; color: ${corBadge}; background: ${bgBadge}; border: 1px solid ${corBadge}40;">
                                ${labelQuando}
                            </span>
                            <button class="btn btn-outline btn-sm" style="padding: 2px 6px; font-size: 11px;" title="Ver detalhes" onclick="abrirModalDetalhesAniversariante('${a.cpf}')">
                                ℹ️
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

/**
 * Renderiza a grade clássica do calendário mensal com os aniversariantes posicionados.
 */
function renderGradeCalendarioAniversariantes(associadosFiltrados) {
    const container = document.getElementById('gridDiasCalendarioAniversariantes');
    if (!container) return;

    const ano = estadoAniversariantes.ano;
    const mes = estadoAniversariantes.mes; // 0 a 11

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0 (Dom) a 6 (Sab)
    const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();
    const totalDiasMesAnterior = new Date(ano, mes, 0).getDate();

    const hoje = new Date();
    const isMesAtual = (hoje.getFullYear() === ano && hoje.getMonth() === mes);
    const diaHoje = hoje.getDate();

    // Agrupar aniversariantes do mês por dia
    const mesNum = mes + 1;
    const aniversariantesPorDia = {};
    for (let d = 1; d <= totalDiasNoMes; d++) {
        aniversariantesPorDia[d] = [];
    }

    associadosFiltrados.forEach(a => {
        if (a.dadosNascimento && a.dadosNascimento.mes === mesNum) {
            const d = a.dadosNascimento.dia;
            if (aniversariantesPorDia[d]) {
                aniversariantesPorDia[d].push(a);
            }
        }
    });

    let html = '';

    // 1. Células vazias / dias do mês anterior
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaNum = totalDiasMesAnterior - primeiroDiaSemana + i + 1;
        html += `
            <div class="calendar-day-cell bday-day-cell outside-month" style="opacity: 0.25; background: rgba(0,0,0,0.15); border: 1px dashed rgba(255,255,255,0.06); cursor: default;">
                <div class="day-number" style="font-size: 11px; color: var(--text-muted);">${diaNum}</div>
            </div>
        `;
    }

    // 2. Dias do mês atual
    for (let dia = 1; dia <= totalDiasNoMes; dia++) {
        const celebrantes = aniversariantesPorDia[dia] || [];
        const isHoje = isMesAtual && (dia === diaHoje);
        const hasAniversario = celebrantes.length > 0;

        let cellClasses = 'calendar-day-cell bday-day-cell';
        if (isHoje) cellClasses += ' is-today';
        if (hasAniversario) cellClasses += ' has-birthday';

        let borderStyle = '1px solid var(--border-color)';
        let bgStyle = 'rgba(255, 255, 255, 0.02)';

        if (isHoje && hasAniversario) {
            borderStyle = '2px solid var(--accent-gold)';
            bgStyle = 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(46, 204, 113, 0.1) 100%)';
        } else if (isHoje) {
            borderStyle = '2px solid var(--accent-gold)';
            bgStyle = 'rgba(255, 215, 0, 0.08)';
        } else if (hasAniversario) {
            borderStyle = '1px solid rgba(255, 215, 0, 0.4)';
            bgStyle = 'linear-gradient(135deg, rgba(255, 215, 0, 0.06) 0%, rgba(28, 32, 38, 0.95) 100%)';
        }

        // Construir os chips dos aniversariantes
        let chipsHtml = '';
        if (hasAniversario) {
            chipsHtml = celebrantes.map(a => {
                const idade = calcularIdadeAniversariante(a.dadosNascimento.ano, ano);
                const isDir = a.perfil === 'diretoria';
                const tagGuerra = a.nome_guerra || a.nome.split(' ')[0];

                return `
                    <div class="bday-chip ${isDir ? 'is-diretoria' : ''}" 
                         onclick="event.stopPropagation(); abrirModalDetalhesAniversariante('${a.cpf}')" 
                         title="${a.nome} (${idade ? idade + ' anos' : 'Aniversário'}) - Clique para detalhes">
                        <span class="bday-chip-icon">🎂</span>
                        <span class="bday-chip-name">${tagGuerra}</span>
                        ${idade ? `<span class="bday-chip-age">${idade}a</span>` : ''}
                    </div>
                `;
            }).join('');
        }

        html += `
            <div class="${cellClasses}" style="${borderStyle}; background: ${bgStyle}; min-height: 90px; padding: 6px; border-radius: 8px; position: relative;"
                 onclick="aoClicarDiaCalendarioAniversario(${dia}, ${mes}, ${ano})">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span class="day-number" style="font-size: 13px; font-weight: ${isHoje ? '800' : '600'}; color: ${isHoje ? 'var(--accent-gold)' : 'var(--text-main)'};">
                        ${dia}
                    </span>
                    ${isHoje ? '<span class="badge badge-gold" style="font-size: 9px; padding: 1px 5px; font-weight: 800;">HOJE</span>' : ''}
                    ${hasAniversario && !isHoje ? `<span style="font-size: 11px;" title="${celebrantes.length} aniversariante(s)">🎈</span>` : ''}
                </div>
                <div class="bday-chips-container" style="display: flex; flex-direction: column; gap: 3px; overflow-y: auto; max-height: 80px;">
                    ${chipsHtml}
                </div>
            </div>
        `;
    }

    // 3. Completar a última semana com dias do próximo mês para fechar a grade (múltiplo de 7)
    const celulasTotais = primeiroDiaSemana + totalDiasNoMes;
    const celulasRestantes = (7 - (celulasTotais % 7)) % 7;
    for (let j = 1; j <= celulasRestantes; j++) {
        html += `
            <div class="calendar-day-cell bday-day-cell outside-month" style="opacity: 0.25; background: rgba(0,0,0,0.15); border: 1px dashed rgba(255,255,255,0.06); cursor: default;">
                <div class="day-number" style="font-size: 11px; color: var(--text-muted);">${j}</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Renderiza a visualização em Mural Anual (12 Meses).
 * Excelente para planejamento de homenagens e presentes da Diretoria para o ano todo.
 */
function renderMuralAnualAniversariantes(associadosFiltrados) {
    const container = document.getElementById('gridMuralAnualAniversariantes');
    if (!container) return;

    const ano = estadoAniversariantes.ano;
    const mesAtualIndex = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    // Agrupar os associados por mês (1 a 12)
    const porMes = {};
    for (let m = 1; m <= 12; m++) {
        porMes[m] = [];
    }

    associadosFiltrados.forEach(a => {
        if (a.dadosNascimento && a.dadosNascimento.mes >= 1 && a.dadosNascimento.mes <= 12) {
            porMes[a.dadosNascimento.mes].push(a);
        }
    });

    let html = '';

    for (let m = 1; m <= 12; m++) {
        const celebrantesMes = porMes[m] || [];
        celebrantesMes.sort((a, b) => a.dadosNascimento.dia - b.dadosNascimento.dia);

        const isMesCorrente = (m - 1 === mesAtualIndex && ano === anoAtual);
        const nomeMes = NOMES_MESES_ANIVERSARIO[m - 1];

        html += `
            <div class="card bday-month-card ${isMesCorrente ? 'is-current-month' : ''}" style="margin: 0; padding: 14px; border: 1px solid ${isMesCorrente ? 'var(--accent-gold)' : 'var(--border-color)'}; background: ${isMesCorrente ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(28, 32, 38, 0.95) 100%)' : 'rgba(255, 255, 255, 0.02)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 16px;">${isMesCorrente ? '🌟' : '📅'}</span>
                        <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: ${isMesCorrente ? 'var(--accent-gold)' : 'var(--text-main)'};">
                            ${nomeMes}
                        </h4>
                    </div>
                    <span class="badge ${isMesCorrente ? 'badge-gold' : 'badge-info'}" style="font-size: 11px;">
                        ${celebrantesMes.length} aniversariante(s)
                    </span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px; max-height: 280px; overflow-y: auto; padding-right: 4px;">
                    ${celebrantesMes.length === 0 ? `
                        <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 16px 0;">
                            Nenhum aniversariante neste mês.
                        </div>
                    ` : celebrantesMes.map(a => {
                        const dia = String(a.dadosNascimento.dia).padStart(2, '0');
                        const idade = calcularIdadeAniversariante(a.dadosNascimento.ano, ano);
                        const isDir = a.perfil === 'diretoria';

                        return `
                            <div style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 6px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: var(--transition);"
                                 onmouseover="this.style.borderColor='var(--accent-gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
                                <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
                                    <span style="font-size: 12px; font-weight: 800; color: var(--accent-gold); min-width: 24px; text-align: center; background: rgba(255,215,0,0.1); padding: 2px 4px; border-radius: 4px;">
                                        ${dia}
                                    </span>
                                    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                        <div style="font-size: 13px; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 4px;">
                                            <span>${a.nome_guerra || a.nome}</span>
                                            ${isDir ? '<span style="font-size: 9px; color: var(--accent-gold); font-weight: 800;">⭐</span>' : ''}
                                        </div>
                                        <div style="font-size: 11px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis;">
                                            ${a.nome} ${idade ? `(${idade} anos)` : ''}
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;">
                                    <button class="btn btn-outline btn-sm" style="font-size: 11px; padding: 2px 6px;" title="Ver detalhes" onclick="abrirModalDetalhesAniversariante('${a.cpf}')">
                                        📋
                                    </button>
                                    <button class="btn btn-gold btn-sm" style="font-size: 11px; padding: 2px 6px;" title="WhatsApp" onclick="enviarParabensWhatsApp('${a.telefone}', '${a.nome_guerra || a.nome}')">
                                        💬
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Ao clicar em um dia específico no calendário mensal, se houver aniversariantes,
 * exibe o modal do primeiro ou um menu caso haja múltiplos.
 */
function aoClicarDiaCalendarioAniversario(dia, mesIndex, ano) {
    const todos = getListaAssociadosProcessados();
    const filtrados = filtrarAssociadosAniversariantes(todos);
    const celebrantes = filtrados.filter(a =>
        a.dadosNascimento &&
        a.dadosNascimento.dia === dia &&
        a.dadosNascimento.mes === (mesIndex + 1)
    );

    if (celebrantes.length === 1) {
        abrirModalDetalhesAniversariante(celebrantes[0].cpf);
    } else if (celebrantes.length > 1) {
        // Se houver mais de um, abrir o modal do primeiro e permitir navegar ou listar
        abrirModalDetalhesAniversariante(celebrantes[0].cpf);
    }
}

/**
 * Abre o Modal com os dados completos do aniversariante e botão de ação para WhatsApp
 */
function abrirModalDetalhesAniversariante(cpf) {
    const list = getListaAssociadosProcessados();
    const cleanCpf = (cpf || '').replace(/\D/g, '');
    const a = list.find(item => (item.cpf || '').replace(/\D/g, '') === cleanCpf);
    if (!a) {
        alert('Associado não encontrado no sistema.');
        return;
    }

    const modal = document.getElementById('modalDetalhesAniversariante');
    if (!modal) return;

    const anoRef = estadoAniversariantes.ano;
    const d = a.dadosNascimento;
    const idade = d ? calcularIdadeAniversariante(d.ano, anoRef) : null;
    const dataFormatada = d ? `${String(d.dia).padStart(2, '0')}/${String(d.mes).padStart(2, '0')}/${d.ano}` : (a.data_nascimento || 'Não informada');

    // Iniciais para avatar
    const iniciais = (a.nome_guerra || a.nome || 'A')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    // Preenchimento dos dados no modal
    document.getElementById('modalBdayAvatar').textContent = iniciais;
    document.getElementById('modalBdayNomeGuerra').textContent = a.nome_guerra || a.nome;
    document.getElementById('modalBdayNomeCompleto').textContent = a.nome || '-';
    document.getElementById('modalBdayCpf').textContent = a.cpf || '-';
    document.getElementById('modalBdayPerfil').innerHTML = `
        <span class="badge ${a.perfil === 'diretoria' ? 'badge-gold' : 'badge-info'}">
            ${(a.perfil || 'associado').toUpperCase()}
        </span>
    `;
    document.getElementById('modalBdayStatus').innerHTML = `
        <span class="badge ${a.status === 'ativo' ? 'badge-success' : 'badge-danger'}">
            ${(a.status || 'ativo').toUpperCase()}
        </span>
    `;
    document.getElementById('modalBdayDataNasc').textContent = dataFormatada;
    document.getElementById('modalBdayIdade').innerHTML = idade ? `<b style="color: #2ECC71;">${idade} anos</b> (em ${anoRef})` : '-';
    document.getElementById('modalBdayTelefone').textContent = a.telefone || 'Não informado';
    document.getElementById('modalBdayEmail').textContent = a.email || 'Não informado';
    document.getElementById('modalBdayObm').textContent = a.obm || 'São José';
    document.getElementById('modalBdayProfissao').textContent = a.profissao || 'Bombeiro Comunitário';

    // Ação do botão WhatsApp
    const btnWhats = document.getElementById('btnModalBdayWhatsApp');
    if (btnWhats) {
        if (a.telefone && a.telefone.replace(/\D/g, '').length >= 10) {
            btnWhats.style.display = 'inline-flex';
            btnWhats.onclick = () => enviarParabensWhatsApp(a.telefone, a.nome_guerra || a.nome);
        } else {
            btnWhats.style.display = 'none';
        }
    }

    modal.style.display = 'flex';
}

/**
 * Dispara felicitação via WhatsApp com mensagem comemorativa oficial da Diretoria ACBCSJ.
 */
function enviarParabensWhatsApp(telefone, nomeGuerra) {
    if (!telefone) {
        alert('Este associado não possui número de telefone registrado.');
        return;
    }
    const cleanTel = String(telefone).replace(/\D/g, '');
    if (cleanTel.length < 10) {
        alert('Número de telefone cadastrado é inválido para envio via WhatsApp.');
        return;
    }

    const dddComPais = cleanTel.startsWith('55') ? cleanTel : `55${cleanTel}`;
    const textoMensagem = `Olá, *${nomeGuerra || 'Combatente'}*! 🎂🚒\n\nA Diretoria da *ACBCSJ* (Associação Corpo de Bombeiros Comunitários de São José) parabeniza você pelo seu aniversário!\n\nDesejamos muitas felicidades, saúde, paz e contínuo sucesso em sua jornada junto à nossa corporação!\n\nParabéns! 🎈🎉`;

    const url = `https://api.whatsapp.com/send?phone=${dddComPais}&text=${encodeURIComponent(textoMensagem)}`;
    window.open(url, '_blank');
}

/**
 * Navegação de mês anterior
 */
function aniversariantesMesAnterior() {
    if (estadoAniversariantes.mes === 0) {
        estadoAniversariantes.mes = 11;
        estadoAniversariantes.ano--;
    } else {
        estadoAniversariantes.mes--;
    }
    renderAniversariantes();
}

/**
 * Navegação de próximo mês
 */
function aniversariantesMesSeguinte() {
    if (estadoAniversariantes.mes === 11) {
        estadoAniversariantes.mes = 0;
        estadoAniversariantes.ano++;
    } else {
        estadoAniversariantes.mes++;
    }
    renderAniversariantes();
}

/**
 * Retornar ao mês e ano atuais
 */
function aniversariantesIrHoje() {
    const hoje = new Date();
    estadoAniversariantes.ano = hoje.getFullYear();
    estadoAniversariantes.mes = hoje.getMonth();
    renderAniversariantes();
}

/**
 * Mudança via dropdown de mês
 */
function mudarMesAniversariantes(mesVal) {
    estadoAniversariantes.mes = parseInt(mesVal, 10);
    renderAniversariantes();
}

/**
 * Mudança via dropdown de ano
 */
function mudarAnoAniversariantes(anoVal) {
    estadoAniversariantes.ano = parseInt(anoVal, 10);
    renderAniversariantes();
}

/**
 * Alternar modo de visualização entre 'calendario' e 'mural'
 */
function alternarVisualizacaoAniversariantes(modo) {
    estadoAniversariantes.modoVisualizacao = modo;
    renderAniversariantes();
}

/**
 * Filtro de status (ativo / todos / desligado)
 */
function mudarFiltroStatusAniversariantes(statusVal) {
    estadoAniversariantes.filtroStatus = statusVal;
    renderAniversariantes();
}

/**
 * Campo de busca em tempo real por nome/guerra
 */
function onSearchAniversariantesInput(termo) {
    estadoAniversariantes.busca = termo;
    const todos = getListaAssociadosProcessados();
    const filtrados = filtrarAssociadosAniversariantes(todos);

    if (estadoAniversariantes.modoVisualizacao === 'mural') {
        renderMuralAnualAniversariantes(filtrados);
    } else {
        renderGradeCalendarioAniversariantes(filtrados);
    }
}

/**
 * Disparo para impressão da página de aniversariantes
 */
function imprimirCalendarioAniversariantes() {
    window.print();
}
