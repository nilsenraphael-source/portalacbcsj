/**
 * ESCALA OPERACIONAL MILITAR — ACBCSJ (24x72)
 * Ciclo perpétuo contínuo de 4 Guarnições (GUs):
 * 01/09/2026: VERDE (Uitajuci)
 * 02/09/2026: VERMELHA (Búrigo)
 * 03/09/2026: AZUL (Moraes)
 * 04/09/2026: AMARELA (Lapa)
 * e repete sucessivamente.
 */

const GUS_CONFIG = [
    {
        id: 'verde',
        nome: 'GU VERDE',
        responsavel: 'Uitajuci',
        cor: '#2ECC71',
        corFundo: 'rgba(46, 204, 113, 0.15)',
        corBorda: 'rgba(46, 204, 113, 0.5)',
        corTexto: '#2ECC71',
        icone: '🟢',
        descricao: 'Guarnição Verde • Coordenação: Uitajuci'
    },
    {
        id: 'vermelha',
        nome: 'GU VERMELHA',
        responsavel: 'Búrigo',
        cor: '#E74C3C',
        corFundo: 'rgba(231, 76, 60, 0.15)',
        corBorda: 'rgba(231, 76, 60, 0.5)',
        corTexto: '#FF6B6B',
        icone: '🔴',
        descricao: 'Guarnição Vermelha • Coordenação: Búrigo'
    },
    {
        id: 'azul',
        nome: 'GU AZUL',
        responsavel: 'Moraes',
        cor: '#3498DB',
        corFundo: 'rgba(52, 152, 219, 0.15)',
        corBorda: 'rgba(52, 152, 219, 0.5)',
        corTexto: '#5DADE2',
        icone: '🔵',
        descricao: 'Guarnição Azul • Coordenação: Moraes'
    },
    {
        id: 'amarela',
        nome: 'GU AMARELA',
        responsavel: 'Lapa',
        cor: '#F1C40F',
        corFundo: 'rgba(241, 196, 15, 0.15)',
        corBorda: 'rgba(241, 196, 15, 0.5)',
        corTexto: '#F1C40F',
        icone: '🟡',
        descricao: 'Guarnição Amarela • Coordenação: Lapa'
    }
];

// Data âncora: 01 de Setembro de 2026 = GU VERDE (Índice 0)
const ANCORA_ANO = 2026;
const ANCORA_MES = 8; // 0-indexed (8 = Setembro)
const ANCORA_DIA = 1;

let estadoEscala = {
    ano: 2026,
    mes: 8, // 0-indexed (8 = Setembro)
    filtroGu: 'todas', // 'todas', 'verde', 'vermelha', 'azul', 'amarela'
    modoVisualizacao: 'calendario' // 'calendario' ou 'lista'
};

/**
 * Calcula a GU de serviço para uma data específica (ano, mes 0-indexed, dia)
 */
function calcularGuPorData(ano, mesZeroIndexed, dia) {
    const dataUtc = Date.UTC(parseInt(ano), parseInt(mesZeroIndexed), parseInt(dia));
    const ancoraUtc = Date.UTC(ANCORA_ANO, ANCORA_MES, ANCORA_DIA);
    const diffDias = Math.round((dataUtc - ancoraUtc) / 86400000);
    const guIndex = ((diffDias % 4) + 4) % 4;
    return {
        gu: GUS_CONFIG[guIndex],
        indice: guIndex,
        diffDias: diffDias
    };
}

/**
 * Retorna o dia da semana por extenso
 */
function getNomeDiaSemana(dataObj) {
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return dias[dataObj.getDay()];
}

/**
 * Renderização principal da aba de Escala Militar
 */
function renderEscalaMilitar() {
    const container = document.getElementById('tab-escala-militar');
    if (!container) return;

    // Sincronizar seletores de ano e mês
    const selAno = document.getElementById('selAnoEscalaMilitar');
    const selMes = document.getElementById('selMesEscalaMilitar');

    if (selAno) selAno.value = String(estadoEscala.ano);
    if (selMes) selMes.value = String(estadoEscala.mes);

    // 1. Atualizar Plantão de Hoje
    renderPlantaoHoje();

    // 2. Renderizar Calendário ou Lista
    if (estadoEscala.modoVisualizacao === 'lista') {
        const cal = document.getElementById('containerVisualizacaoCalendario');
        const list = document.getElementById('containerVisualizacaoLista');
        if (cal) cal.style.display = 'none';
        if (list) list.style.display = 'block';
        renderListaEscala();
    } else {
        const cal = document.getElementById('containerVisualizacaoCalendario');
        const list = document.getElementById('containerVisualizacaoLista');
        if (cal) cal.style.display = 'block';
        if (list) list.style.display = 'none';
        renderGradeCalendario();
    }

    // 3. Atualizar Legendas Ativas
    atualizarLegendasEscala();
}

/**
 * Atualiza o banner do plantão de hoje e próximas GUs
 */
function renderPlantaoHoje() {
    const agora = new Date();
    const hojeAno = agora.getFullYear();
    const hojeMes = agora.getMonth();
    const hojeDia = agora.getDate();

    const infoHoje = calcularGuPorData(hojeAno, hojeMes, hojeDia);
    const guHoje = infoHoje.gu;

    const elCardHoje = document.getElementById('cardPlantaoHojeDestaque');
    const elNomeHoje = document.getElementById('lblPlantaoHojeNome');
    const elDataHoje = document.getElementById('lblPlantaoHojeData');
    const elProxGus = document.getElementById('containerProximasGus');

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    if (elNomeHoje) {
        elNomeHoje.innerHTML = `${guHoje.icone} <span style="color: ${guHoje.cor}; font-weight: 800; text-shadow: 0 0 10px ${guHoje.cor}40;">${guHoje.nome} (${guHoje.responsavel})</span>`;
    }

    if (elDataHoje) {
        const diaSemana = diasSemana[agora.getDay()];
        elDataHoje.textContent = `${diaSemana}, ${String(hojeDia).padStart(2, '0')} de ${mesesNomes[hojeMes]} de ${hojeAno}`;
    }

    if (elCardHoje) {
        elCardHoje.style.borderLeft = `5px solid ${guHoje.cor}`;
        elCardHoje.style.background = `linear-gradient(135deg, ${guHoje.corFundo} 0%, rgba(28, 32, 38, 0.95) 100%)`;
    }

    if (elProxGus) {
        // Calcular próximas 3 GUs em sequência
        let htmlProx = '';
        for (let i = 1; i <= 3; i++) {
            const proxData = new Date(hojeAno, hojeMes, hojeDia + i);
            const pAno = proxData.getFullYear();
            const pMes = proxData.getMonth();
            const pDia = proxData.getDate();
            const infoProx = calcularGuPorData(pAno, pMes, pDia);
            const pGu = infoProx.gu;

            const labelQuando = i === 1 ? 'Amanhã' : (i === 2 ? 'Depois de amanhã' : `${String(pDia).padStart(2, '0')}/${String(pMes + 1).padStart(2, '0')}`);

            htmlProx += `
                <div style="background: rgba(0,0,0,0.3); border: 1px solid ${pGu.corBorda}; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                    <div>
                        <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${labelQuando} (${String(pDia).padStart(2, '0')}/${String(pMes + 1).padStart(2, '0')})</div>
                        <div style="font-size: 13px; font-weight: bold; color: ${pGu.cor}; display: flex; align-items: center; gap: 4px;">
                            <span>${pGu.icone}</span> <span>${pGu.nome}</span>
                        </div>
                    </div>
                    <span class="badge" style="font-size: 11px; background: ${pGu.corFundo}; color: ${pGu.corTexto}; border: 1px solid ${pGu.corBorda}; font-weight: 600;">${pGu.responsavel}</span>
                </div>
            `;
        }
        elProxGus.innerHTML = htmlProx;
    }
}

/**
 * Renderiza a grade visual do calendário do mês selecionado
 */
function renderGradeCalendario() {
    const container = document.getElementById('gridCalendarioEscala');
    if (!container) return;

    const ano = estadoEscala.ano;
    const mes = estadoEscala.mes;

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const totalDiasMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay(); // 0 = Domingo, 1 = Segunda...

    const diasMesAnterior = new Date(ano, mes, 0).getDate();

    const hoje = new Date();
    const isMesAtual = hoje.getFullYear() === ano && hoje.getMonth() === mes;
    const diaHoje = hoje.getDate();

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const lblMesAno = document.getElementById('lblMesAnoTituloEscala');
    if (lblMesAno) {
        lblMesAno.textContent = `${mesesNomes[mes]} de ${ano}`;
    }

    let cellsHtml = '';

    // Dias do mês anterior para preencher a primeira semana
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        const diaAnt = diasMesAnterior - i;
        const infoAnt = calcularGuPorData(mes === 0 ? ano - 1 : ano, mes === 0 ? 11 : mes - 1, diaAnt);
        const gu = infoAnt.gu;
        cellsHtml += `
            <div class="calendar-day-cell other-month" style="opacity: 0.35; filter: grayscale(40%);">
                <div class="day-number" style="color: var(--text-muted); font-size: 12px;">${diaAnt}</div>
                <div class="gu-mini-badge" style="background: ${gu.corFundo}; color: ${gu.corTexto}; border: 1px dashed ${gu.corBorda};">
                    <span>${gu.icone} ${gu.nome.replace('GU ', '')}</span>
                    <small>(${gu.responsavel})</small>
                </div>
            </div>
        `;
    }

    // Dias do mês atual
    for (let dia = 1; dia <= totalDiasMes; dia++) {
        const info = calcularGuPorData(ano, mes, dia);
        const gu = info.gu;
        const isHoje = isMesAtual && dia === diaHoje;
        const isFiltroAtivo = estadoEscala.filtroGu !== 'todas' && estadoEscala.filtroGu === gu.id;
        const isFiltroOpaco = estadoEscala.filtroGu !== 'todas' && estadoEscala.filtroGu !== gu.id;

        const dataIso = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const dataObj = new Date(ano, mes, dia);
        const diaSemanaNome = getNomeDiaSemana(dataObj);

        cellsHtml += `
            <div class="calendar-day-cell ${isHoje ? 'today-cell' : ''}" 
                 style="
                    background: ${isHoje ? 'rgba(212, 175, 55, 0.08)' : (isFiltroAtivo ? gu.corFundo : 'rgba(255, 255, 255, 0.02)')}; 
                    border: 1px solid ${isHoje ? 'var(--accent-gold)' : (isFiltroAtivo ? gu.cor : 'var(--border-color)')};
                    ${isHoje ? 'box-shadow: 0 0 12px rgba(212, 175, 55, 0.35);' : ''}
                    ${isFiltroOpaco ? 'opacity: 0.25;' : ''}
                    transition: all 0.2s ease;
                 "
                 onclick="abrirModalDetalheDiaEscala('${dataIso}', '${gu.id}')">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span class="day-number" style="font-weight: 800; font-size: 15px; color: ${isHoje ? 'var(--accent-gold)' : '#FFFFFF'};">
                        ${String(dia).padStart(2, '0')}
                    </span>
                    ${isHoje ? `<span class="badge badge-gold" style="font-size: 9px; padding: 2px 6px; font-weight: 800; text-transform: uppercase;">🔥 HOJE</span>` : `<span style="font-size: 10px; color: var(--text-muted); font-weight: 500;">${diaSemanaNome.substring(0, 3)}</span>`}
                </div>

                <div class="gu-shift-card" style="
                    background: ${gu.corFundo};
                    border: 1px solid ${gu.corBorda};
                    border-left: 4px solid ${gu.cor};
                    border-radius: 6px;
                    padding: 8px 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                ">
                    <div style="font-weight: 800; font-size: 12px; color: ${gu.corTexto}; display: flex; align-items: center; gap: 4px;">
                        <span>${gu.icone}</span> <span>${gu.nome}</span>
                    </div>
                    <div style="font-size: 11px; color: var(--text-main); font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
                        <span>👨‍🚒 ${gu.responsavel}</span>
                        <span style="font-size: 10px; color: var(--text-muted);">24h</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Preencher final da grade com dias do próximo mês para fechar 35 ou 42 células
    const totalCelulasPreenchidas = diaSemanaInicio + totalDiasMes;
    const celulasFinais = (totalCelulasPreenchidas <= 35) ? (35 - totalCelulasPreenchidas) : (42 - totalCelulasPreenchidas);

    for (let dProx = 1; dProx <= celulasFinais; dProx++) {
        const infoProx = calcularGuPorData(mes === 11 ? ano + 1 : ano, mes === 11 ? 0 : mes + 1, dProx);
        const gu = infoProx.gu;
        cellsHtml += `
            <div class="calendar-day-cell other-month" style="opacity: 0.35; filter: grayscale(40%);">
                <div class="day-number" style="color: var(--text-muted); font-size: 12px;">${dProx}</div>
                <div class="gu-mini-badge" style="background: ${gu.corFundo}; color: ${gu.corTexto}; border: 1px dashed ${gu.corBorda};">
                    <span>${gu.icone} ${gu.nome.replace('GU ', '')}</span>
                    <small>(${gu.responsavel})</small>
                </div>
            </div>
        `;
    }

    container.innerHTML = cellsHtml;
}

/**
 * Renderiza a visão em lista/tabela mensal da escala
 */
function renderListaEscala() {
    const containerTbody = document.getElementById('tableListaEscalaBody');
    if (!containerTbody) return;

    const ano = estadoEscala.ano;
    const mes = estadoEscala.mes;
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const hoje = new Date();
    const isMesAtual = hoje.getFullYear() === ano && hoje.getMonth() === mes;
    const diaHoje = hoje.getDate();

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const lblMesAno = document.getElementById('lblMesAnoTituloEscala');
    if (lblMesAno) {
        lblMesAno.textContent = `${mesesNomes[mes]} de ${ano}`;
    }

    let rowsHtml = '';
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const info = calcularGuPorData(ano, mes, dia);
        const gu = info.gu;
        const isHoje = isMesAtual && dia === diaHoje;
        const dataObj = new Date(ano, mes, dia);
        const diaSemanaNome = getNomeDiaSemana(dataObj);
        const isFiltroAtivo = estadoEscala.filtroGu !== 'todas' && estadoEscala.filtroGu === gu.id;

        if (estadoEscala.filtroGu !== 'todas' && estadoEscala.filtroGu !== gu.id) {
            continue; // Se filtrado, esconde
        }

        const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mes + 1).padStart(2, '0')}/${ano}`;

        let badgeStatus = '';
        if (isHoje) {
            badgeStatus = `<span class="badge badge-gold" style="font-weight: 800; font-size: 11px; padding: 4px 8px;">🔥 EM SERVIÇO HOJE</span>`;
        } else if (dataObj < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) {
            badgeStatus = `<span style="color: var(--text-muted); font-size: 11px;">✅ Concluído</span>`;
        } else {
            badgeStatus = `<span style="color: #3498DB; font-size: 11px; font-weight: 600;">⏳ Agendado</span>`;
        }

        rowsHtml += `
            <tr style="${isHoje ? 'background: rgba(212, 175, 55, 0.12); border-left: 4px solid var(--accent-gold);' : (isFiltroAtivo ? `background: ${gu.corFundo};` : '')}">
                <td>
                    <b style="color: ${isHoje ? 'var(--accent-gold)' : '#FFFFFF'}; font-size: 13px;">${dataFormatada}</b>
                </td>
                <td>
                    <span style="font-weight: 600; color: ${diaSemanaNome.startsWith('Sáb') || diaSemanaNome.startsWith('Dom') ? 'var(--accent-gold)' : 'var(--text-main)'};">${diaSemanaNome}</span>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span>${gu.icone}</span>
                        <b style="color: ${gu.cor}; font-size: 13px;">${gu.nome}</b>
                    </div>
                </td>
                <td>
                    <span class="badge" style="background: ${gu.corFundo}; color: ${gu.corTexto}; border: 1px solid ${gu.corBorda}; font-weight: 700; font-size: 12px;">
                        👨‍🚒 ${gu.responsavel}
                    </span>
                </td>
                <td>
                    <span style="font-size: 12px; color: var(--text-muted);">08:00h às 08:00h (24h)</span>
                </td>
                <td>
                    ${badgeStatus}
                </td>
            </tr>
        `;
    }

    containerTbody.innerHTML = rowsHtml;
}

/**
 * Funções de navegação do calendário
 */
function escalaMesAnterior() {
    if (estadoEscala.mes === 0) {
        estadoEscala.mes = 11;
        estadoEscala.ano--;
    } else {
        estadoEscala.mes--;
    }
    renderEscalaMilitar();
}

function escalaMesSeguinte() {
    if (estadoEscala.mes === 11) {
        estadoEscala.mes = 0;
        estadoEscala.ano++;
    } else {
        estadoEscala.mes++;
    }
    renderEscalaMilitar();
}

function escalaIrParaHoje() {
    const agora = new Date();
    estadoEscala.ano = agora.getFullYear();
    estadoEscala.mes = agora.getMonth();
    estadoEscala.filtroGu = 'todas';
    renderEscalaMilitar();
}

function mudarAnoEscala(novoAno) {
    estadoEscala.ano = parseInt(novoAno) || 2026;
    renderEscalaMilitar();
}

function mudarMesEscala(novoMes) {
    estadoEscala.mes = parseInt(novoMes) || 0;
    renderEscalaMilitar();
}

function alternarVisualizacaoEscala(modo) {
    estadoEscala.modoVisualizacao = modo;
    const btnCal = document.getElementById('btnViewCalendarioEscala');
    const btnList = document.getElementById('btnViewListaEscala');

    if (btnCal && btnList) {
        if (modo === 'calendario') {
            btnCal.classList.add('btn-gold');
            btnCal.classList.remove('btn-outline');
            btnList.classList.add('btn-outline');
            btnList.classList.remove('btn-gold');
        } else {
            btnList.classList.add('btn-gold');
            btnList.classList.remove('btn-outline');
            btnCal.classList.add('btn-outline');
            btnCal.classList.remove('btn-gold');
        }
    }
    renderEscalaMilitar();
}

function filtrarPorGuEscala(guId) {
    if (estadoEscala.filtroGu === guId) {
        estadoEscala.filtroGu = 'todas'; // toggle off
    } else {
        estadoEscala.filtroGu = guId;
    }
    renderEscalaMilitar();
}

function atualizarLegendasEscala() {
    GUS_CONFIG.forEach(gu => {
        const elCard = document.getElementById(`cardLegendaGu_${gu.id}`);
        if (elCard) {
            if (estadoEscala.filtroGu === gu.id) {
                elCard.style.borderColor = gu.cor;
                elCard.style.boxShadow = `0 0 10px ${gu.cor}50`;
                elCard.style.transform = 'translateY(-2px)';
            } else if (estadoEscala.filtroGu !== 'todas') {
                elCard.style.opacity = '0.4';
                elCard.style.boxShadow = 'none';
                elCard.style.transform = 'none';
            } else {
                elCard.style.opacity = '1';
                elCard.style.boxShadow = 'none';
                elCard.style.transform = 'none';
            }
        }
    });
}

/**
 * Ferramenta de Consulta de Data Específica
 */
function consultarDataEscala() {
    const input = document.getElementById('inputConsultaDataEscala');
    const containerResultado = document.getElementById('resultadoConsultaDataEscala');
    if (!input || !containerResultado) return;

    const dataVal = input.value;
    if (!dataVal) {
        containerResultado.innerHTML = `<div style="color: var(--text-muted); font-size: 13px;">Selecione uma data para consultar a Guarnição escalada.</div>`;
        return;
    }

    const [anoStr, mesStr, diaStr] = dataVal.split('-');
    const ano = parseInt(anoStr);
    const mesZero = parseInt(mesStr) - 1;
    const dia = parseInt(diaStr);

    const info = calcularGuPorData(ano, mesZero, dia);
    const gu = info.gu;
    const dataObj = new Date(ano, mesZero, dia);
    const diaSemanaNome = getNomeDiaSemana(dataObj);

    const dataBR = `${String(dia).padStart(2, '0')}/${String(mesZero + 1).padStart(2, '0')}/${ano}`;

    containerResultado.innerHTML = `
        <div style="background: ${gu.corFundo}; border: 1px solid ${gu.corBorda}; border-left: 5px solid ${gu.cor}; border-radius: 8px; padding: 16px; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">📅 ${diaSemanaNome}, ${dataBR}</div>
                    <div style="font-size: 18px; font-weight: 800; color: ${gu.cor}; margin-top: 2px; display: flex; align-items: center; gap: 6px;">
                        <span>${gu.icone}</span> <span>${gu.nome}</span>
                    </div>
                </div>
                <div style="text-align: right;">
                    <span class="badge" style="background: rgba(0,0,0,0.4); color: ${gu.corTexto}; border: 1px solid ${gu.corBorda}; font-size: 13px; font-weight: 700; padding: 6px 12px;">
                        👨‍🚒 Coordenação: ${gu.responsavel}
                    </span>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Plantão 24h (08:00 às 08:00 +1d)</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Modal de Detalhe de um dia clicado no calendário
 */
function abrirModalDetalheDiaEscala(dataIso, guId) {
    const [anoStr, mesStr, diaStr] = dataIso.split('-');
    const ano = parseInt(anoStr);
    const mesZero = parseInt(mesStr) - 1;
    const dia = parseInt(diaStr);

    const info = calcularGuPorData(ano, mesZero, dia);
    const gu = info.gu;
    const dataObj = new Date(ano, mesZero, dia);
    const diaSemanaNome = getNomeDiaSemana(dataObj);
    const dataBR = `${String(dia).padStart(2, '0')}/${String(mesZero + 1).padStart(2, '0')}/${ano}`;

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const modalTitle = document.getElementById('modalDetalheEscalaTitulo');
    const modalBody = document.getElementById('modalDetalheEscalaConteudo');

    if (modalTitle) {
        modalTitle.innerHTML = `🚒 Detalhes da Escala Militar — ${dataBR}`;
    }

    if (modalBody) {
        modalBody.innerHTML = `
            <div style="background: ${gu.corFundo}; border: 1px solid ${gu.corBorda}; border-left: 5px solid ${gu.cor}; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
                <div style="font-size: 13px; color: var(--text-muted);">Data: <b>${diaSemanaNome}, ${dia} de ${mesesNomes[mesZero]} de ${ano}</b></div>
                <div style="font-size: 22px; font-weight: 800; color: ${gu.cor}; margin: 6px 0; display: flex; align-items: center; gap: 8px;">
                    <span>${gu.icone}</span> <span>${gu.nome}</span>
                </div>
                <div style="font-size: 15px; font-weight: 600; color: #FFFFFF;">
                    👨‍🚒 Responsável / Chefe de Guarnição: <span style="color: var(--accent-gold); font-weight: 800;">${gu.responsavel}</span>
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: var(--text-muted); border-top: 1px dashed ${gu.corBorda}; padding-top: 8px;">
                    ⏰ Regime de Serviço: <b>Plantão 24 Horas</b> (Início: 08:00h • Término: 08:00h do dia seguinte) • Folga: <b>72 Horas</b>
                </div>
            </div>

            <h4 style="font-size: 13px; color: var(--accent-gold); margin-bottom: 10px;">📋 Sequência de Plantões Deste Ciclo:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px;">
                ${GUS_CONFIG.map((g, idx) => {
                    const isAtual = g.id === gu.id;
                    return `
                        <div style="background: ${isAtual ? g.corFundo : 'rgba(255,255,255,0.02)'}; border: 1px solid ${isAtual ? g.cor : 'var(--border-color)'}; border-radius: 6px; padding: 10px; text-align: center;">
                            <div style="font-size: 18px;">${g.icone}</div>
                            <div style="font-weight: 700; font-size: 12px; color: ${g.cor}; margin-top: 4px;">${g.nome}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">${g.responsavel}</div>
                            ${isAtual ? '<span class="badge badge-gold" style="font-size: 9px; margin-top: 4px; display: inline-block;">Neste Dia</span>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    if (typeof openModal === 'function') {
        openModal('modalDetalheDiaEscala');
    }
}

/**
 * Função para imprimir ou exportar a escala
 */
function imprimirEscalaMilitar() {
    window.print();
}

window.renderEscalaMilitar = renderEscalaMilitar;
window.escalaMesAnterior = escalaMesAnterior;
window.escalaMesSeguinte = escalaMesSeguinte;
window.escalaIrParaHoje = escalaIrParaHoje;
window.mudarAnoEscala = mudarAnoEscala;
window.mudarMesEscala = mudarMesEscala;
window.alternarVisualizacaoEscala = alternarVisualizacaoEscala;
window.filtrarPorGuEscala = filtrarPorGuEscala;
window.consultarDataEscala = consultarDataEscala;
window.abrirModalDetalheDiaEscala = abrirModalDetalheDiaEscala;
window.imprimirEscalaMilitar = imprimirEscalaMilitar;
