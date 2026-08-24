function extrairListaMesesDoLancamento(rawMesesStr, obsStr = '') {
    const textoMeses = (rawMesesStr || '').trim();
    if (textoMeses) {
        const res = extrairMesesDeTexto(textoMeses);
        if (res.length > 0) return res;
    }
    const obs = (obsStr || '').trim();
    if (obs) {
        return extrairMesesDeTexto(obs);
    }
    return [];
}

function extrairMesesDeTexto(texto) {
    if (!texto) return [];
    const todasSiglas = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const mapaMesesNum = {
        '01':'jan', '1':'jan', '02':'fev', '2':'fev', '03':'mar', '3':'mar',
        '04':'abr', '4':'abr', '05':'mai', '5':'mai', '06':'jun', '6':'jun',
        '07':'jul', '7':'jul', '08':'ago', '8':'ago', '09':'set', '9':'set',
        '10':'out', '11':'nov', '12':'dez'
    };
    const nomesCompletos = {
        'janeiro': 'jan', 'fevereiro': 'fev', 'marco': 'mar', 'março': 'mar',
        'abril': 'abr', 'maio': 'mai', 'junho': 'jun', 'julho': 'jul',
        'agosto': 'ago', 'setembro': 'set', 'outubro': 'out', 'novembro': 'nov', 'dezembro': 'dez'
    };

    const resultado = [];

    // 1. Suporte a intervalos no formato Jan-Dez, Jan a Dez, Jan/Dez, Jan e Dez, Fev-Jul, Fev a Jul, etc.
    const rangeMatch = texto.match(/([a-z]{3}|janeiro|fevereiro|marco|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s*(?:-|\/|a|e|até)\s*([a-z]{3}|janeiro|fevereiro|marco|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i);
    if (rangeMatch) {
        let sStr = rangeMatch[1].toLowerCase();
        let eStr = rangeMatch[2].toLowerCase();
        if (sStr.length > 3) sStr = nomesCompletos[sStr] || sStr.substring(0, 3);
        if (eStr.length > 3) eStr = nomesCompletos[eStr] || eStr.substring(0, 3);
        
        const sIdx = todasSiglas.indexOf(sStr);
        const eIdx = todasSiglas.indexOf(eStr);
        if (sIdx >= 0 && eIdx >= sIdx) {
            todasSiglas.slice(sIdx, eIdx + 1).forEach(m => {
                if (!resultado.includes(m)) resultado.push(m);
            });
            return resultado;
        }
    }

    // 2. Procura por menções explícitas de siglas ou nomes de meses no texto
    todasSiglas.forEach(sigla => {
        const regex = new RegExp('(?:^|[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ])' + sigla + '(?:$|[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ])', 'i');
        if (regex.test(texto)) {
            if (!resultado.includes(sigla)) {
                resultado.push(sigla);
            }
        }
    });

    Object.keys(nomesCompletos).forEach(nome => {
        const regex = new RegExp('(?:^|[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ])' + nome + '(?:$|[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ])', 'i');
        if (regex.test(texto)) {
            const sigla = nomesCompletos[nome];
            if (!resultado.includes(sigla)) {
                resultado.push(sigla);
            }
        }
    });

    // Se encontramos siglas ou nomes de meses explícitos, retorna sem puxar a data ISO de pagamento
    if (resultado.length > 0) {
        return resultado;
    }

    // 3. Fallback: Apenas se NÃO houver nenhum mês por extenso ou sigla, aceita formato YYYY-MM ou MM/YYYY
    const yyyyMmMatch = texto.match(/(?:19|20)\d\d[-/](0[1-9]|1[0-2])|(0[1-9]|1[0-2])[-/](?:19|20)\d\d/);
    if (yyyyMmMatch) {
        const numMes = yyyyMmMatch[1] || yyyyMmMatch[2];
        if (numMes && mapaMesesNum[numMes]) {
            resultado.push(mapaMesesNum[numMes]);
        }
    }

    return resultado;
}

function recalcularTodasGridsMensalidades(autoRender = false) {
    let listAssoc = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (!listAssoc || listAssoc.length === 0) {
        if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados && MOCK_DATA_INITIAL.associados.length > 0) {
            listAssoc = MOCK_DATA_INITIAL.associados;
        } else if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' && ASSOCIADOS_PLANILHA_REAL.length > 0) {
            listAssoc = ASSOCIADOS_PLANILHA_REAL;
        }
        if (listAssoc && listAssoc.length > 0) {
            localStorage.setItem('acbcsj_associados', JSON.stringify(listAssoc));
        }
    }
    const anos = ['2024', '2025', '2026', '2027', '2028'];
    const historicoRaw = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    anos.forEach(ano => {
        const storageKey = 'acbcsj_mensalidades_grid_' + ano;
        let grid = listAssoc.map(a => {
            const cleanCpf = (a.cpf || '').replace(/\D/g, '');
            const row = {
                nome_guerra: a.nome_guerra || a.nome,
                nome_completo: a.nome,
                cpf: a.cpf,
                jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
            };

            const lancamentosSocio = historicoRaw.filter(m => {
                const mCpf = (m.cpf || '').replace(/\D/g, '');
                const mAssocId = String(m.associado_id || '');
                const matchCpf = (mCpf && cleanCpf && mCpf === cleanCpf) || (mAssocId && a.id && String(a.id) === mAssocId);
                
                let mAno = String(m.ano || '');
                if (!mAno || mAno === 'undefined') {
                    const dtIso = m.data_iso || m.data_pagamento || m.data || '';
                    if (dtIso.includes('-')) mAno = dtIso.split('-')[0];
                    else if (dtIso.includes('/')) {
                        const parts = dtIso.split('/');
                        if (parts.length === 3) mAno = parts[2];
                    }
                }
                if (!mAno || mAno.length !== 4) mAno = '2026';

                return matchCpf && mAno === String(ano);
            });

            lancamentosSocio.forEach(m => {
                const rawMeses = m.meses_quitados || m.mes_referencia || '';
                const obs = m.observacoes || m.obs || '';
                const listaMeses = extrairListaMesesDoLancamento(rawMeses, obs);
                let valNum = 0;
                if (typeof m.valor === 'number') {
                    valNum = m.valor;
                } else if (typeof m.valor === 'string') {
                    valNum = parseFloat(m.valor.replace(',', '.')) || 0;
                }
                const valorPorMes = listaMeses.length > 0 ? (valNum / listaMeses.length) : valNum;

                listaMeses.forEach(mk => {
                    if (row.hasOwnProperty(mk)) {
                        row[mk] = (parseFloat(row[mk]) || 0) + valorPorMes;
                    }
                });
            });

            return row;
        });
        localStorage.setItem(storageKey, JSON.stringify(grid));
        if (String(ano) === '2026') {
            localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify(grid));
        }
    });

    if (autoRender && typeof renderGestaoMensalidades === 'function' && document.getElementById('tableGestaoMensalidadesBody')) {
        renderGestaoMensalidades();
    }
    if (typeof renderGestaoFinanceira === 'function' && document.getElementById('tableFinanceiroBody')) {
        renderGestaoFinanceira();
    }
}

// PORTAL ACBCSJ BUILD 2026-08-19 16:13:13
﻿// DADOS DE INICIALIZAÇÃO DA ACBCSJ (COMANDANTE + 66 SÓCIOS IMPORTADOS DA PLANILHA SOCIOS.XLSX)
const INITIAL_MENSAL_DATA = [{"nome_guerra":"Comandante","nome_completo":"Comandante / Diretoria ACBCSJ","cpf":"000.000.000-00","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Angélica","nome_completo":"Angélica Mateus","cpf":"000.923.500-03","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Antunes","nome_completo":"Douglas Antunes","cpf":"074.136.669-01","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Augusto","nome_completo":"Murilo Augusto Galdino De Souza","cpf":"073.716.899-41","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Andreia","nome_completo":"Andreia de Fátima Machado","cpf":"961.193.810-15","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Bento","nome_completo":"Daniel Bento","cpf":"069.776.559-84","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Binhoti","nome_completo":"Tiago Binhoti","cpf":"083.801.589-11","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Boiko","nome_completo":"Emerson Roberto Boiko","cpf":"021.603.099-40","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Camila","nome_completo":"Camila Coelho Soares","cpf":"127.393.649-38","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Coelho","nome_completo":"Ricardo Augusto Coelho","cpf":"079.962.129-37","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Da Silva","nome_completo":"Alex Sandro Batista da Silva","cpf":"318.036.738-50","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Barros","nome_completo":"Michel da Silveira Barros","cpf":"001.637.940-30","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Deny","nome_completo":"Deny Anderson Azevedo","cpf":"910.414.909-25","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Eder","nome_completo":"Eder Alison Da Silva","cpf":"932.603.189-68","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Elaine","nome_completo":"Elaine Conrado Bittencourt","cpf":"047.913.959-80","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Fabiana","nome_completo":"Fabiana Oro Cericato Costa","cpf":"024.284.799-46","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Gabriel","nome_completo":"Gabriel Francisco Farias da Silva","cpf":"008.489.029-04","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Henkes","nome_completo":"Marcia Aparecida Henkes","cpf":"046.128.369-79","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Humberto","nome_completo":"Carlos Humberto luiz","cpf":"025.435.769-59","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ilton","nome_completo":"Ilton Saturnino Braz","cpf":"774.179.849-91","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Kassandra","nome_completo":"Gabriela Kassandra Luiz Colossi","cpf":"008.036.019-05","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Linder","nome_completo":"Gustavo Augusto Linder","cpf":"092.909.549-90","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Lourenço","nome_completo":"Carlos Henrique Lourenço Gonçalves","cpf":"015.513.347-04","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Lucas","nome_completo":"Lucas Rodrigues Antônio","cpf":"085.543.859-26","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Mayara","nome_completo":"Mayara Vieira Soares","cpf":"109.532.709-71","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Mina","nome_completo":"Kleber Pacheco Mina","cpf":"005.592.699-19","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Mithel","nome_completo":"Mithel Evergisto de Lima","cpf":"097.100.159-66","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Natayan","nome_completo":"Raphael Natayan Nilsen","cpf":"052.026.659-54","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Nery","nome_completo":"Gabriel Nery Cristiano","cpf":"060.594.529-22","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Oliveira","nome_completo":"Marcelo luiz de Oliveira","cpf":"770.614.709-68","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ozol","nome_completo":"Guilherme Ozol de Assunção","cpf":"091.275.619-50","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Pereira","nome_completo":"Emerson Pereira","cpf":"757.951.599-72","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ravache","nome_completo":"Caio Passold Ravache","cpf":"010.110.059-05","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Santana","nome_completo":"Michele Santana Quint","cpf":"003.357.419-76","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Sardá","nome_completo":"Julia da Silva Sardá","cpf":"120.391.089-47","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Schmitt","nome_completo":"André Luiz Schmitt","cpf":"155.303.359-00","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Spotti","nome_completo":"Kleber Spotti Rodrigues","cpf":"002.200.260-09","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Alves","nome_completo":"Uelder Alves Da Costa","cpf":"008.818.209-62","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ulysséia","nome_completo":"Ismael Vieira da Rosa Ulysséia","cpf":"416.967.609-25","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Yanka","nome_completo":"Yanka Caroliny Luciano","cpf":"104.320.579-94","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Yuri","nome_completo":"Yuri Esmerio dos Santos","cpf":"028.667.330-45","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Fortkamp","nome_completo":"Markian da Silveira Fortkamp","cpf":"068.052.249-26","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Jesus","nome_completo":"Karina  Maria de Jesus Sobrinho","cpf":"007.303.029-54","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Nakata","nome_completo":"Nakata Garra Gomes","cpf":"039.070.760-01","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Weverton","nome_completo":"Weverton José Machado","cpf":"125.366.669-56","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Martins","nome_completo":"Alexandre Vinicius Martins","cpf":"919.835.099-49","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ana Carolina","nome_completo":"Ana Carolina Nascimento","cpf":"100.975.089-50","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Andréia M","nome_completo":"Andréia Martins dos Santos","cpf":"083.469.799-83","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Siqueira","nome_completo":"Fernando Pereira Siqueira Junior","cpf":"007.064.299-07","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Gonçalves","nome_completo":"Alessandro da Costa Gonçalves","cpf":"028.574.290-61","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Neumann","nome_completo":"Misael Dias Neumann","cpf":"147.564.459-00","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Luiz","nome_completo":"Luiz Fernando da Silva","cpf":"007.178.839-57","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Figueiredo","nome_completo":"João Victor Figueiredo Chrostowski","cpf":"097.355.079-19","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Luciano","nome_completo":"LUCIANO PEREIRA","cpf":"003.747.659-95","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Cardoso","nome_completo":"Claudio cardoso","cpf":"951.971.339-53","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Carvalho","nome_completo":"Diego Carvalho Cordova","cpf":"079.744.619-26","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Bunn","nome_completo":"João Pedro Pereira Bunn","cpf":"118.669.539-07","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Costa","nome_completo":"Vanessa David Costa","cpf":"065.194.139-33","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Sofie","nome_completo":"Izabelle Sofie Luiz","cpf":"096.581.989-29","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Fabian","nome_completo":"Fabian Henrique da Silva","cpf":"123.859.799-85","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Levi","nome_completo":"Washington Levi Nascimento Dias","cpf":"063.023.992-46","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Joaber","nome_completo":"Reinaldo Joaber de Araújo Spengler","cpf":"069.723.111-95","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Anderson","nome_completo":"Anderson Rafael Souza da Silva","cpf":"008.145.020-67","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Sadi","nome_completo":"Washington sadi de jesus","cpf":"092.158.639-66","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Perdoná","nome_completo":"Pâmela Aparecida da Luz Perdoná","cpf":"235.983.728-17","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Viapiana","nome_completo":"Otávio Augusto Viapiana","cpf":"108.677.459-08","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Steimbach","nome_completo":"Graziela steimbach","cpf":"063.871.729-93","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0}];
const INITIAL_LANCAMENTOS_DATA = [{"tipo":"despesa","id":"desp_1","valor":35,"data":"20/01/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-01-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"01/2026"},{"tipo":"despesa","id":"desp_2","valor":50,"data":"26/01/2026","fornecedor_cliente":"Sandro Martins","data_iso":"2026-01-26","categoria":"Outros","descricao":"Sandro Martins (Copo B4 / FECABOM)","mes":"01/2026"},{"tipo":"despesa","id":"desp_3","valor":0.17,"data":"31/01/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-01-31","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"01/2026"},{"tipo":"despesa","id":"desp_4","valor":170,"data":"09/02/2026","fornecedor_cliente":"Certificadora","data_iso":"2026-02-09","categoria":"Outros","descricao":"Certificado Digital","mes":"02/2026"},{"tipo":"despesa","id":"desp_5","valor":47.61,"data":"20/02/2026","fornecedor_cliente":"Camila C Soares","data_iso":"2026-02-20","categoria":"Presentes","descricao":"Brinde ReuniÃ£o Comando (Camila C Soares)","mes":"02/2026"},{"tipo":"despesa","id":"desp_6","valor":35,"data":"20/02/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-02-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"02/2026"},{"tipo":"despesa","id":"desp_7","valor":1945,"data":"23/02/2026","fornecedor_cliente":"Fornecedor Lancheiras","data_iso":"2026-02-23","categoria":"Presentes","descricao":"Lancheira aniversÃ¡rios Compra 1","mes":"02/2026"},{"tipo":"despesa","id":"desp_8","valor":775.8,"data":"23/02/2026","fornecedor_cliente":"Fornecedor Lancheiras","data_iso":"2026-02-23","categoria":"Presentes","descricao":"Lancheira aniversÃ¡rios Compra 2","mes":"02/2026"},{"tipo":"despesa","id":"desp_9","valor":0.17,"data":"28/02/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-02-28","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"02/2026"},{"tipo":"despesa","id":"desp_10","valor":800,"data":"12/03/2026","fornecedor_cliente":"Adriano Lima","data_iso":"2026-03-12","categoria":"Presentes","descricao":"Estampa das lancheiras (Adriano Lima)","mes":"03/2026"},{"tipo":"despesa","id":"desp_11","valor":35,"data":"20/03/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-03-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"03/2026"},{"tipo":"despesa","id":"desp_12","valor":0.88,"data":"30/03/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-03-30","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"03/2026"},{"tipo":"despesa","id":"desp_13","valor":240,"data":"13/04/2026","fornecedor_cliente":"JoÃ£o Valdeci Moraes","data_iso":"2026-04-13","categoria":"Treinamentos","descricao":"Coffee Break Treinamento APH (JoÃ£o Valdeci Moraes)","mes":"04/2026"},{"tipo":"despesa","id":"desp_14","valor":132.08,"data":"13/04/2026","fornecedor_cliente":"Camila Soares","data_iso":"2026-04-13","categoria":"Treinamentos","descricao":"Coffee Break Treinamento APH (Camila Soares)","mes":"04/2026"},{"tipo":"despesa","id":"desp_15","valor":35,"data":"20/04/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-04-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"04/2026"},{"tipo":"despesa","id":"desp_16","valor":193.67,"data":"24/04/2026","fornecedor_cliente":"Gabriel F. Farias","data_iso":"2026-04-24","categoria":"CartÃ³rio ou DocumentaÃ§Ã£o em geral","descricao":"CartÃ³rio (Gabriel F.Farias)","mes":"04/2026"},{"tipo":"despesa","id":"desp_17","valor":35,"data":"20/05/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-05-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"05/2026"},{"tipo":"despesa","id":"desp_18","valor":440.66,"data":"11/06/2026","fornecedor_cliente":"Prefeitura Municipal de SÃ£o JosÃ©","data_iso":"2026-06-11","categoria":"CartÃ³rio ou DocumentaÃ§Ã£o em geral","descricao":"Taxa de funcionamento PMSJ","mes":"06/2026"},{"tipo":"despesa","id":"desp_19","valor":184,"data":"11/06/2026","fornecedor_cliente":"Safe2pay","data_iso":"2026-06-11","categoria":"CartÃ³rio ou DocumentaÃ§Ã£o em geral","descricao":"Certificado Digital (Safe2pay)","mes":"06/2026"},{"tipo":"despesa","id":"desp_20","valor":80.85,"data":"18/06/2026","fornecedor_cliente":"Yanka","data_iso":"2026-06-18","categoria":"Mercado","descricao":"DecoraÃ§Ã£o e descartaveis - Jogo Copa do Mundo (Yanka)","mes":"06/2026"},{"tipo":"despesa","id":"desp_21","valor":248.35,"data":"22/06/2026","fornecedor_cliente":"MundialMIX","data_iso":"2026-06-22","categoria":"Mercado","descricao":"Mercado - Jogo Copa do Mundo (MundialMIX)","mes":"06/2026"},{"tipo":"despesa","id":"desp_22","valor":35.66,"data":"22/06/2026","fornecedor_cliente":"Yanka","data_iso":"2026-06-22","categoria":"Mercado","descricao":"Mercado - Jogo Copa do Mundo (Yanka)","mes":"06/2026"},{"tipo":"despesa","id":"desp_23","valor":35,"data":"22/06/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-06-22","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"06/2026"},{"tipo":"despesa","id":"desp_24","valor":36,"data":"23/06/2026","fornecedor_cliente":"IndÃºstria de PÃ£es","data_iso":"2026-06-23","categoria":"Mercado","descricao":"PÃ£es - Jogo Copa do Mundo (Industria de Paes)","mes":"06/2026"},{"tipo":"despesa","id":"desp_25","valor":0.71,"data":"30/06/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-06-30","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"06/2026"},{"tipo":"despesa","id":"desp_26","valor":384,"data":"17/07/2026","fornecedor_cliente":"Kiko","data_iso":"2026-07-17","categoria":"Treinamentos","descricao":"Coffee Break - Palestra (Kiko)","mes":"07/2026"},{"tipo":"despesa","id":"desp_27","valor":35,"data":"20/07/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-07-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicredi","mes":"07/2026"},{"tipo":"despesa","id":"desp_28","valor":38.88,"data":"22/07/2026","fornecedor_cliente":"Yanka","data_iso":"2026-07-22","categoria":"Treinamentos","descricao":"Refri - Palestra (Yanka)","mes":"07/2026"},{"tipo":"despesa","id":"desp_29","valor":19.93,"data":"27/07/2026","fornecedor_cliente":"Camila","data_iso":"2026-07-27","categoria":"Treinamentos","descricao":"Chocolate Palestrante Sgt Reinaldo - Palestra (Camila)","mes":"07/2026"},{"tipo":"receita","id":"rec_1","valor":0.4,"data":"31/01/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-01-31","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"01/2026"},{"tipo":"receita","id":"rec_2","valor":0.54,"data":"28/02/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-02-28","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"02/2026"},{"tipo":"receita","id":"rec_3","valor":0.62,"data":"30/03/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-03-30","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"03/2026"},{"tipo":"receita","id":"rec_4","valor":1.34,"data":"30/04/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-04-30","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"04/2026"},{"tipo":"receita","id":"rec_5","valor":11.31,"data":"04/05/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-05-04","categoria":"Rendimentos","descricao":"Rendimentos SICREDI","mes":"05/2026"},{"tipo":"receita","id":"rec_6","valor":1.28,"data":"31/05/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-05-31","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"05/2026"},{"tipo":"receita","id":"rec_7","valor":25,"data":"11/06/2026","fornecedor_cliente":"Gustavo Linder","data_iso":"2026-06-11","categoria":"Eventos / Rendimentos","descricao":"Jogo Copa do Mundo - Acompanhante (Linder)","mes":"06/2026"},{"tipo":"receita","id":"rec_8","valor":25,"data":"15/06/2026","fornecedor_cliente":"Douglas Antunes","data_iso":"2026-06-15","categoria":"Eventos / Rendimentos","descricao":"jogo Copa do Mundo - Acompanhante (Antunes)","mes":"06/2026"},{"tipo":"receita","id":"rec_9","valor":25,"data":"17/06/2026","fornecedor_cliente":"Carlos Humberto","data_iso":"2026-06-17","categoria":"Eventos / Rendimentos","descricao":"Jogo Copa do Mundo - Acompanhante (Humberto)","mes":"06/2026"},{"tipo":"receita","id":"rec_10","valor":25,"data":"24/06/2026","fornecedor_cliente":"Gabriela Kassandra","data_iso":"2026-06-24","categoria":"Eventos / Rendimentos","descricao":"Jogo Copa do Mundo - Acompanhante (Kassandra)","mes":"06/2026"},{"tipo":"receita","id":"rec_11","valor":1.35,"data":"30/06/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-06-30","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"06/2026"},{"tipo":"receita","id":"rec_12","valor":1.35,"data":"31/07/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-07-31","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"07/2026"}];

const ASSOCIADOS_PLANILHA_REAL = [{"id":"2","cpf":"000.923.500-03","senha":"0009","nome":"Angélica Mateus","nome_guerra":"Angélica","email":"amangelica14@gmail.com","data_nascimento":"23/05/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99814-2594","logradouro":"rua João Evangelista da Costa","numero":"","complemento":"","cep":"88090-301","bairro":"Coloninha","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/07/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"3","cpf":"074.136.669-01","senha":"0741","nome":"Douglas Antunes","nome_guerra":"Antunes","email":"douglas.antunes4012@gmail.com","data_nascimento":"24/09/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-4431","logradouro":"Rua Flores da Cunha","numero":"","complemento":"","cep":"88070-460","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"4","cpf":"073.716.899-41","senha":"0737","nome":"Murilo Augusto Galdino De Souza","nome_guerra":"Augusto","email":"galdinomus@gmail.com","data_nascimento":"04/07/1990","nome_pai":"NELSON JOSÉ DE SOUZA","nome_mae":"ZELIA MARIA SILVA DE SOUZA","sexo":"Masculino","telefone":"(48) 98494-1095","logradouro":"VALDIR GUTHIA","numero":"12","complemento":"ANA MELO","cep":"88135-186","bairro":"ARIRIU","cidade":"PALHOÇA","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"09/07/2023 17:45:12","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"5","cpf":"961.193.810-15","senha":"9611","nome":"Andreia de Fátima Machado","nome_guerra":"Andreia","email":"andreiamachado2508@gmail.com","data_nascimento":"25/08/1980","nome_pai":"Fredolino machado","nome_mae":"Catarina Benedett machado","sexo":"Feminino","telefone":"(48) 99697-0295","logradouro":"Rua Antônio Elias","numero":"22","complemento":"Casa","cep":"88106-160","bairro":"Picadas do sul","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/27/2023 0:07:42","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"6","cpf":"069.776.559-84","senha":"0697","nome":"Daniel Bento","nome_guerra":"Bento","email":"bentodani1989@gmail.com","data_nascimento":"01/08/1989","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99616-1172","logradouro":"Av Governador Ivo Silveira","numero":"","complemento":"","cep":"88085-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"18/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"7","cpf":"083.801.589-11","senha":"0838","nome":"Tiago Binhoti","nome_guerra":"Binhoti","email":"tiagobinhoti@gmail.com","data_nascimento":"30/09/1991","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98497-4657","logradouro":"rua Francisco Lutz de Almeida","numero":"","complemento":"","cep":"88108-173","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"8","cpf":"021.603.099-40","senha":"0216","nome":"Emerson Roberto Boiko","nome_guerra":"Boiko","email":"emersonboiko@gmail.com","data_nascimento":"26/06/1978","nome_pai":"Ladislau boiko","nome_mae":"Maria das dores Alves boiko","sexo":"Masculino","telefone":"(48) 99962-0506","logradouro":"Rua das amiexas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"2/24/2024 19:57:52","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"9","cpf":"127.393.649-38","senha":"1273","nome":"Camila Coelho Soares","nome_guerra":"Camila","email":"camila.coelhosoares@gmail.com","data_nascimento":"25/09/2000","nome_pai":"Pedro Soares","nome_mae":"Margarida Coelho","sexo":"Feminino","telefone":"(48) 99126-4292","logradouro":"Rua Walmor Beppler","numero":"S/N","complemento":"Servidão ao lado da casa 125","cep":"88136-257","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/04/2023 12:28:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"10","cpf":"079.962.129-37","senha":"0799","nome":"Ricardo Augusto Coelho","nome_guerra":"Coelho","email":"ricardo.pc15@gmail.com","data_nascimento":"09/08/1991","nome_pai":"Neri Geronimo Coelho","nome_mae":"Rute Helena do Nascimento","sexo":"Masculino","telefone":"(48) 98485-6290","logradouro":"Rua Santo André","numero":"518","complemento":"ap 201","cep":"88106-430","bairro":"Flor de napolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"4/29/2024 9:57:27","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"11","cpf":"318.036.738-50","senha":"3180","nome":"Alex Sandro Batista da Silva","nome_guerra":"Da Silva","email":"alexsandrob221@gmail.com","data_nascimento":"18/07/1983","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98426-9481","logradouro":"Bela Vista","numero":"","complemento":"","cep":"88119-114","bairro":"Potecas","cidade":"São Jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/02/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"12","cpf":"001.637.940-30","senha":"0016","nome":"Michel da Silveira Barros","nome_guerra":"Barros","email":"michel_sbarros@yahoo.com.br","data_nascimento":"27/07/1981","nome_pai":"José António Rodrigues barros","nome_mae":"Ana lucia da silveira barros","sexo":"Masculino","telefone":"(48) 98821-7860","logradouro":"Rua José Cláudio Schmidt","numero":"50","complemento":"50","cep":"88115-558","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/28/2024 5:17:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"13","cpf":"910.414.909-25","senha":"9104","nome":"Deny Anderson Azevedo","nome_guerra":"Deny","email":"denyazevedo1972@gmail.com","data_nascimento":"06/08/1972","nome_pai":"Neri Azevedo","nome_mae":"Laurita Bernadete Azevedo","sexo":"Masculino","telefone":"(48) 99868-3269","logradouro":"Rua Algarves","numero":"S/n","complemento":"Quadra 12 Loteb3","cep":"88107-365","bairro":"Lisboa","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/30/2023 12:08:42","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"14","cpf":"932.603.189-68","senha":"9326","nome":"Eder Alison Da Silva","nome_guerra":"Eder","email":"eder.alisondasilva@gmail.com","data_nascimento":"21/06/1978","nome_pai":"","nome_mae":"","sexo":"Masculino","telefone":"(48) 99834-6944","logradouro":"rua Tercílio Tedesco","numero":"","complemento":"","cep":"88107-481","bairro":"Potecas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"15","cpf":"047.913.959-80","senha":"0479","nome":"Elaine Conrado Bittencourt","nome_guerra":"Elaine","email":"corretoraimobiliariaelaine@gmail.com","data_nascimento":"01/06/1984","nome_pai":"Sidnei Conrado","nome_mae":"Maria Fátima de Pinho","sexo":"Feminino","telefone":"(48) 99119-2407","logradouro":"Rua São João","numero":"500","complemento":"Casa","cep":"88140-000","bairro":"Centro","cidade":"Santo Amaro da Imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/01/2024 21:37:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"16","cpf":"024.284.799-46","senha":"0242","nome":"Fabiana Oro Cericato Costa","nome_guerra":"Fabiana","email":"fabicericato@gmail.com","data_nascimento":"18/11/1979","nome_pai":"Domingo Cericato","nome_mae":"Judite Therezinha Oro Cericato","sexo":"Feminino","telefone":"(48) 98831-5620","logradouro":"Madre Benvenuta","numero":"388","complemento":"Apto 911","cep":"88036-500","bairro":"Trindade","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 12:58:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"17","cpf":"008.489.029-04","senha":"0084","nome":"Gabriel Francisco Farias da Silva","nome_guerra":"Gabriel","email":"bombeirofloripa2011@hotmail.com","data_nascimento":"26/01/1985","nome_pai":"Paulo Roberto da Silva","nome_mae":"Maria da Graça Farias Haskel","sexo":"Masculino","telefone":"(48) 99852-5717","logradouro":"João Batista Derner Neves","numero":"25","complemento":"ap1005","cep":"88102-270","bairro":"Kobrasol","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/09/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"18","cpf":"046.128.369-79","senha":"0461","nome":"Marcia Aparecida Henkes","nome_guerra":"Henkes","email":"mahenkes@gmail.com","data_nascimento":"08/08/1984","nome_pai":"Antônio Adão Henkes","nome_mae":"Ana Geni Veloso de Linhares Henkes","sexo":"Feminino","telefone":"(48) 99800-0811","logradouro":"Rua das Ameixas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"2/25/2024 19:39:32","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"19","cpf":"025.435.769-59","senha":"0254","nome":"Carlos Humberto luiz","nome_guerra":"Humberto","email":"carluzjr@hotmail.com","data_nascimento":"02/12/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99117-2211","logradouro":"Rua Madre tereza de Calcutá","numero":"","complemento":"","cep":"","bairro":"Real Parque","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/06/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"20","cpf":"774.179.849-91","senha":"7741","nome":"Ilton Saturnino Braz","nome_guerra":"Ilton","email":"iltonbraz.bc@gmail.com","data_nascimento":"22/01/1969","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99926-0398","logradouro":"Antonio Goncalves Chaves","numero":"","complemento":"","cep":"88130-545","bairro":"Ponte Imaruim","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"21","cpf":"008.036.019-05","senha":"0080","nome":"Gabriela Kassandra Luiz Colossi","nome_guerra":"Kassandra","email":"kassandracolossi1090@gmail.com","data_nascimento":"08/10/1984","nome_pai":"Paulo Roberto Luiz","nome_mae":"Katia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 98475-8962","logradouro":"Maria Helena Kretzer","numero":"503","complemento":"casa","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/18/2023 12:32:54","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"22","cpf":"092.909.549-90","senha":"0929","nome":"Gustavo Augusto Linder","nome_guerra":"Linder","email":"augustolinder@gmail.com","data_nascimento":"19/10/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99850-3832","logradouro":"Rua Cabo Oderli Schilchting","numero":"","complemento":"","cep":"","bairro":"Passa Vinte","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"23","cpf":"015.513.347-04","senha":"0155","nome":"Carlos Henrique Lourenço Gonçalves","nome_guerra":"Lourenço","email":"carioca-henrique@hotmail.com","data_nascimento":"22/09/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99936-9240","logradouro":"rua Conde Afonso Celso","numero":"","complemento":"","cep":"88070-560","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"20/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"24","cpf":"085.543.859-26","senha":"0855","nome":"Lucas Rodrigues Antônio","nome_guerra":"Lucas","email":"lucasrodrigues635833lra@gmail.com","data_nascimento":"28/08/1994","nome_pai":"Daniel Aniceto Antônio","nome_mae":"Chirley João Rodrigues Antônio","sexo":"Masculino","telefone":"(48) 99935-2731","logradouro":"Rua Fernando José Zimmermann","numero":"33","complemento":"Casa","cep":"88160-624","bairro":"Bom viver","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/05/2024 11:21:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"25","cpf":"109.532.709-71","senha":"1095","nome":"Mayara Vieira Soares","nome_guerra":"Mayara","email":"mayarasoaresrl@gmail.com","data_nascimento":"04/01/2002","nome_pai":"Rodrigo Soares","nome_mae":"Raquel Vieira Soares","sexo":"Feminino","telefone":"(48) 99620-5860","logradouro":"Rua Rodney Brasil Machado","numero":"59","complemento":"Condomínio","cep":"88122-049","bairro":"Sertão do Maruim","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 20:02:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"26","cpf":"005.592.699-19","senha":"0055","nome":"Kleber Pacheco Mina","nome_guerra":"Mina","email":"kleber_dvdx@hotmail.com","data_nascimento":"30/09/1979","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98430-9294","logradouro":"rua Pedro Paulo de Abreu","numero":"","complemento":"","cep":"88106-785","bairro":"forquilhinhas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"27","cpf":"097.100.159-66","senha":"0971","nome":"Mithel Evergisto de Lima","nome_guerra":"Mithel","email":"mithel_lima@hotmail.com","data_nascimento":"26/07/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98447-8424","logradouro":"rua 13 de Junho","numero":"","complemento":"","cep":"88106-470","bairro":"Flor de Nápolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"19/02/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"28","cpf":"052.026.659-54","senha":"0520","nome":"Raphael Natayan Nilsen","nome_guerra":"Natayan","email":"raphael_nilsen@hotmail.com","data_nascimento":"27/12/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98404-1027","logradouro":"R. João Guilherme dos Santos","numero":"","complemento":"","cep":"88131-780","bairro":"Rio Grande","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"29","cpf":"060.594.529-22","senha":"0605","nome":"Gabriel Nery Cristiano","nome_guerra":"Nery","email":"gabrielnerycristiano1@gmail.com","data_nascimento":"27/07/2002","nome_pai":"Cândido Cristiano conceição Cristiano","nome_mae":"Lucimara Terezinha Pierro Nery","sexo":"Masculino","telefone":"(48) 99649-1296","logradouro":"Av. Brasil","numero":"158","complemento":"Casa","cep":"88110-500","bairro":"Bela Vista","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2023 21:37:32","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"30","cpf":"770.614.709-68","senha":"7706","nome":"Marcelo luiz de Oliveira","nome_guerra":"Oliveira","email":"bcoliveiraqap@gmail.com","data_nascimento":"05/07/1970","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99991-3979","logradouro":"Rua Domingos Pedro Hermes","numero":"","complemento":"","cep":"","bairro":"Barreiros","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"31","cpf":"091.275.619-50","senha":"0912","nome":"Guilherme Ozol de Assunção","nome_guerra":"Ozol","email":"ozol.guilherme@gmail.com","data_nascimento":"22/12/1993","nome_pai":"","nome_mae":"Sandra Mara Ozol de Assunção","sexo":"Masculino","telefone":"(48) 99110-7391","logradouro":"Rua Elizeu de Bernardi","numero":"641","complemento":"Bl c ap 302","cep":"88101-050","bairro":"Campinas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"26/03/2026","data_cadastro":"09/11/2023 18:16:01","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"32","cpf":"757.951.599-72","senha":"7579","nome":"Emerson Pereira","nome_guerra":"Pereira","email":"emersonobra@gmail.com","data_nascimento":"04/02/1974","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98428-4002","logradouro":"Balbuino Mechen","numero":"","complemento":"","cep":"","bairro":"Boa Parana","cidade":"S.P.A","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"33","cpf":"010.110.059-05","senha":"0101","nome":"Caio Passold Ravache","nome_guerra":"Ravache","email":"caio.p.ravache@gmail.com","data_nascimento":"15/05/2000","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9907-1505","logradouro":"rua João Meirelles","numero":"","complemento":"","cep":"88085-435","bairro":"Itaguáçu","cidade":"florianópolis","perfil":"associado","status":"desligado","data_desligamento":"11/05/2026","data_cadastro":"14/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"34","cpf":"003.357.419-76","senha":"0033","nome":"Michele Santana Quint","nome_guerra":"Santana","email":"jcmicheliquint@gmail.com","data_nascimento":"26/11/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99606-4164","logradouro":"Rua Roberto VALDIR Manchich","numero":"","complemento":"","cep":"88123-430","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"35","cpf":"120.391.089-47","senha":"1203","nome":"Julia da Silva Sardá","nome_guerra":"Sardá","email":"jhu22jhu@gmail.com","data_nascimento":"15/04/1999","nome_pai":"Claudemar Alfredo Sardá","nome_mae":"Liliane Maria da Silva Sardá","sexo":"Feminino","telefone":"(48) 98424-2904","logradouro":"Rua Manoel Eduardo Cardoso","numero":"17","complemento":"Casa","cep":"88110-792","bairro":"Bela Vista 1","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"28/04/2026","data_cadastro":"9/26/2023 13:18:11","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"36","cpf":"155.303.359-00","senha":"1553","nome":"André Luiz Schmitt","nome_guerra":"Schmitt","email":"andréLuizschmitt@gmail.com","data_nascimento":"27/04/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-2594","logradouro":"Rua Frei Albano","numero":"","complemento":"","cep":"88103-100","bairro":"Centro","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"37","cpf":"002.200.260-09","senha":"0022","nome":"Kleber Spotti Rodrigues","nome_guerra":"Spotti","email":"kleberspotti@gmail.com","data_nascimento":"06/07/1982","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99903-1009","logradouro":"rua Baldicero Filomeno","numero":"","complemento":"","cep":"88064-002","bairro":"Alto Ribeirão","cidade":"Florianopolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"38","cpf":"008.818.209-62","senha":"0088","nome":"Uelder Alves Da Costa","nome_guerra":"Alves","email":"10b3aux@gmail.com","data_nascimento":"10/09/1985","nome_pai":"VILMO FRANCISCO DA COSTA","nome_mae":"EUGÊNIA ALVES","sexo":"Masculino","telefone":"(48) 98801-0190","logradouro":"RUA CRISTÓVÃO NUNES PIRES","numero":"180","complemento":"APTO 904","cep":"88010-120","bairro":"CENTRO","cidade":"FLORIANÓPOLIS","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/10/2023 15:06:50","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"39","cpf":"416.967.609-25","senha":"4169","nome":"Ismael Vieira da Rosa Ulysséia","nome_guerra":"Ulysséia","email":"ismaelvru@intercop.com.br","data_nascimento":"02/08/1961","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9997-1294","logradouro":"av Itamarati","numero":"","complemento":"","cep":"88034-400","bairro":"Itamarati","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"40","cpf":"104.320.579-94","senha":"1043","nome":"Yanka Caroliny Luciano","nome_guerra":"Yanka","email":"yanka.carolinyy@gmail.com","data_nascimento":"14/05/1997","nome_pai":"CLAUDINEI SOARES LUCIANO","nome_mae":"NAÁRA SCHOROEDER","sexo":"Feminino","telefone":"(48) 99641-8318","logradouro":"R. José João de Souza","numero":"457","complemento":"casa","cep":"88108-170","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 8:56:06","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"41","cpf":"028.667.330-45","senha":"0286","nome":"Yuri Esmerio dos Santos","nome_guerra":"Yuri","email":"yurits828@gmail.com","data_nascimento":"04/09/1993","nome_pai":"","nome_mae":"Janine esmerio dos Santos","sexo":"Masculino","telefone":"(48) 98830-3826","logradouro":"Rua sábia una","numero":"45","complemento":"Bloco 5A AP 201","cep":"88122-021","bairro":"Sertão do Imarui","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/04/2025 16:13:47","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"42","cpf":"068.052.249-26","senha":"0680","nome":"Markian da Silveira Fortkamp","nome_guerra":"Fortkamp","email":"bcfortkamp@gmail.com","data_nascimento":"26/06/1994","nome_pai":"Marquian Fortkamp","nome_mae":"Viviane da Silveira","sexo":"Masculino","telefone":"(48) 98878-5387","logradouro":"Av. Patrício Antônio Teixeira","numero":"131","complemento":"AP 01","cep":"88161-586","bairro":"Rio Caveiras","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"1/23/2025 16:41:22","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"43","cpf":"007.303.029-54","senha":"0073","nome":"Karina  Maria de Jesus Sobrinho","nome_guerra":"Jesus","email":"kakamania33@gmail.com","data_nascimento":"11/09/1980","nome_pai":"Francisco filho aobrinho","nome_mae":"Maria Mendes de Jesus sobrinho","sexo":"Feminino","telefone":"(48) 99180-6824","logradouro":"Adão Shimitd","numero":"998","complemento":"Casa","cep":"88117-260","bairro":"Barreiros","cidade":"São jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2025 19:25:13","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"44","cpf":"039.070.760-01","senha":"0390","nome":"Nakata Garra Gomes","nome_guerra":"Nakata","email":"nakatagarrag@gmail.com","data_nascimento":"12/12/1999","nome_pai":"Danilo da Fontoura Gomes","nome_mae":"Mariselma Garra Lacerda Gomes","sexo":"Feminino","telefone":"(55) 98449-2570","logradouro":"Avenida Ceniro Martins 1078","numero":"1078","complemento":"Apto 9","cep":"88107-479","bairro":"Forquilhas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"06/05/2026","data_cadastro":"6/17/2025 13:00:48","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"45","cpf":"125.366.669-56","senha":"1253","nome":"Weverton José Machado","nome_guerra":"Weverton","email":"machadoweverton424@gmail.com","data_nascimento":"14/09/2002","nome_pai":"José Jucelio Machado","nome_mae":"Jerusa aparecida citadella","sexo":"Masculino","telefone":"(48) 99821-8785","logradouro":"Rua 13 de maio","numero":"876","complemento":"Casa","cep":"88165-040","bairro":"Prado","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"07/05/2025 18:41:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"46","cpf":"919.835.099-49","senha":"9198","nome":"Alexandre Vinicius Martins","nome_guerra":"Martins","email":"djxandemartins@gmail.com","data_nascimento":"10/09/1976","nome_pai":"Não Declarado","nome_mae":"Mariza Salete Martins","sexo":"Masculino","telefone":"(48) 99957-5275","logradouro":"Rua Olavo Bilac","numero":"498","complemento":"Casa","cep":"88133-350","bairro":"Jardim Eldorado","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"8/15/2025 16:01:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"47","cpf":"100.975.089-50","senha":"1009","nome":"Ana Carolina Nascimento","nome_guerra":"Ana Carolina","email":"anacarolinanascimento2309@gmail.com","data_nascimento":"23/09/1995","nome_pai":"Silvonei Nascimento","nome_mae":"Katia Regina Sodre","sexo":"Feminino","telefone":"(48) 99944-4545","logradouro":"Rua Johannes Lambertus Josef Bovee","numero":"16","complemento":"Casa","cep":"88168-490","bairro":"Tijuquinhas","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"8/18/2025 10:21:07","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"48","cpf":"083.469.799-83","senha":"0834","nome":"Andréia Martins dos Santos","nome_guerra":"Andréia M","email":"andreiamartins.ntr@gmail.com","data_nascimento":"20/04/1992","nome_pai":"Salvador Martins dos Santos","nome_mae":"Angelina da Cruz Delfino","sexo":"Feminino","telefone":"(48) 98472-8085","logradouro":"Rua Acácio Reitz","numero":"355","complemento":"Casa","cep":"88161-060","bairro":"Universitário","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2025 19:32:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"49","cpf":"007.064.299-07","senha":"0070","nome":"Fernando Pereira Siqueira Junior","nome_guerra":"Siqueira","email":"snnnarfdrums@gmail.com","data_nascimento":"09/05/1981","nome_pai":"Fernando Pereira Siqueira","nome_mae":"Sandra Aparecida Ferreira","sexo":"Masculino","telefone":"(48) 99953-1501","logradouro":"Rua sebastiana Coutinho","numero":"216","complemento":"Torre D apto 202","cep":"88113-240","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/08/2025 11:44:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"50","cpf":"028.574.290-61","senha":"0285","nome":"Alessandro da Costa Gonçalves","nome_guerra":"Gonçalves","email":"acgoncalves191@gmail.com","data_nascimento":"13/10/1991","nome_pai":"José João Angonezi Gonçalves","nome_mae":"Sandra Mara Costa Gonçalves","sexo":"Masculino","telefone":"(48) 99146-6837","logradouro":"Av Paulo Roberto Vidal","numero":"2490","complemento":"Casa","cep":"88132-599","bairro":"Bella Vista","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/04/2025 12:14:18","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"51","cpf":"147.564.459-00","senha":"1475","nome":"Misael Dias Neumann","nome_guerra":"Neumann","email":"misaeldiasneumann@gmail.com","data_nascimento":"11/04/2005","nome_pai":"Baltazar Romeiro Neumann","nome_mae":"Joseane Dias Neumann","sexo":"Masculino","telefone":"(48) 98824-4964","logradouro":"Rua Manoel Mariano Ferreira","numero":"621","complemento":"Condomínio","cep":"88161-680","bairro":"Rio Caveiras","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/15/2025 12:50:37","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"52","cpf":"007.178.839-57","senha":"0071","nome":"Luiz Fernando da Silva","nome_guerra":"Luiz","email":"silva.luiz0579@gmail.com","data_nascimento":"11/05/1979","nome_pai":"Nelson da Silva","nome_mae":"Zilma Ana da Silva","sexo":"Masculino","telefone":"(48) 98437-2126","logradouro":"Servidão Inácia de Medeiros","numero":"263","complemento":"Casa","cep":"88037-065","bairro":"Córrego grande","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/22/2025 12:21:46","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"53","cpf":"097.355.079-19","senha":"0973","nome":"João Victor Figueiredo Chrostowski","nome_guerra":"Figueiredo","email":"joaov.chrostowski@gmail.com","data_nascimento":"27/07/1995","nome_pai":"José Hélio Chrostowski","nome_mae":"Cerlei Adriane Figueiredo Chrostowski","sexo":"Masculino","telefone":"(47) 99136-3393","logradouro":"Rua Thomé Israel da Silva","numero":"105","complemento":"Apto 401A","cep":"88132-373","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2026 16:22:07","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"54","cpf":"003.747.659-95","senha":"0037","nome":"LUCIANO PEREIRA","nome_guerra":"Luciano","email":"lucianompereira@gmail.com","data_nascimento":"10/05/1979","nome_pai":"ADONAI PEREIRA","nome_mae":"VERA LUCIA PEREIRA","sexo":"Masculino","telefone":"(48) 99993-3233","logradouro":"Rua Maria Filomena da Silva","numero":"388","complemento":"Ap 1001","cep":"88110-630","bairro":"Nsa Sra do Rosário","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:13:55","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"55","cpf":"951.971.339-53","senha":"9519","nome":"Claudio cardoso","nome_guerra":"Cardoso","email":"claudio.cardoso311074@gmail.com","data_nascimento":"31/10/1974","nome_pai":"Sebastião Boaventura cardoso","nome_mae":"Maria do Carmo cardoso","sexo":"Masculino","telefone":"(48) 99906-6108","logradouro":"Rua Caetano da costa coelho","numero":"1593","complemento":"Apto 101","cep":"88113-790","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:47:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"56","cpf":"079.744.619-26","senha":"0797","nome":"Diego Carvalho Cordova","nome_guerra":"Carvalho","email":"brxf0r4ste1ro@gmail.com","data_nascimento":"11/09/1991","nome_pai":"Paulo Henrique Cordova","nome_mae":"Maria de Fátima Carvalho","sexo":"Masculino","telefone":"(48) 99823-7756","logradouro":"Rua geral de três riachos","numero":"Sem numero","complemento":"Casa","cep":"88160-000","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"02/11/2026 10:51:36","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"57","cpf":"118.669.539-07","senha":"1186","nome":"João Pedro Pereira Bunn","nome_guerra":"Bunn","email":"joaoppb01@gmail.com","data_nascimento":"15/09/2004","nome_pai":"Orlando Bunn","nome_mae":"Adriana Maciel Pereira","sexo":"Masculino","telefone":"(48) 99951-2775","logradouro":"Rua Acioli Nunes dos Santos","numero":"231","complemento":"Casa","cep":"88131-540","bairro":"Centro","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:56:37","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"58","cpf":"065.194.139-33","senha":"0651","nome":"Vanessa David Costa","nome_guerra":"Costa","email":"vanessamodapet1209@gmail.com","data_nascimento":"11/04/1987","nome_pai":"Marcelo Costa","nome_mae":"Elisete David Costa","sexo":"Feminino","telefone":"(48) 98466-6195","logradouro":"Rua Inhambu","numero":"104","complemento":"Casa","cep":"88115-510","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"09/08/2026","data_cadastro":"02/11/2026 12:07:04","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"59","cpf":"096.581.989-29","senha":"0965","nome":"Izabelle Sofie Luiz","nome_guerra":"Sofie","email":"bell.450009@gmail.com","data_nascimento":"23/12/2001","nome_pai":"Paulo Roberto Luiz","nome_mae":"Kátia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 99154-0113","logradouro":"rua Maria Helena Kretzer","numero":"503","complemento":"casa A ap 202","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 18:30:59","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"60","cpf":"123.859.799-85","senha":"1238","nome":"Fabian Henrique da Silva","nome_guerra":"Fabian","email":"fabiandeggy@gmail.com","data_nascimento":"04/06/2005","nome_pai":"Rodrigo Eduardo da Silva","nome_mae":"Juliane Caetano Justino","sexo":"Masculino","telefone":"(48) 99107-5323","logradouro":"Rua Prefeito Dib Cherem","numero":"2734","complemento":"Casa","cep":"88090-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/12/2026 11:36:15","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"61","cpf":"063.023.992-46","senha":"0630","nome":"Washington Levi Nascimento Dias","nome_guerra":"Levi","email":"vulgo.levi2004@gmail.com","data_nascimento":"31/08/2004","nome_pai":"DUCIVALDO","nome_mae":"ROSYLANGE DO NASCIMENTO","sexo":"Masculino","telefone":"(48) 98859-1896","logradouro":"Av paulo roberto vidal","numero":"475","complemento":"bloco c ap 310","cep":"88132-599","bairro":"Bela vista","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"12/06/2026","data_cadastro":"2/16/2026 14:51:05","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"62","cpf":"069.723.111-95","senha":"0697","nome":"Reinaldo Joaber de Araújo Spengler","nome_guerra":"Joaber","email":"reinaldospengler@gmail.com","data_nascimento":"15/01/2002","nome_pai":"Ivo Spengler","nome_mae":"Genilce Silva de Araújo Spengler","sexo":"Masculino","telefone":"(48) 98839-0467","logradouro":"Demetrio Novossate","numero":"278","complemento":"Casa","cep":"88136-366","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"09/06/2026","data_cadastro":"2/18/2026 8:17:02","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"63","cpf":"008.145.020-67","senha":"0081","nome":"Anderson Rafael Souza da Silva","nome_guerra":"Anderson","email":"anderson84negocios@gmail.com","data_nascimento":"28/10/1984","nome_pai":"","nome_mae":"Marivane Souza da Silva","sexo":"Masculino","telefone":"(48) 99993-8011","logradouro":"Rua Maria Helena Kretzer","numero":"503a","complemento":"Ap301","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"3/14/2026 17:21:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"64","cpf":"092.158.639-66","senha":"0921","nome":"Washington sadi de jesus","nome_guerra":"Sadi","email":"washingtondejesus1509@gmail.com","data_nascimento":"15/03/1994","nome_pai":"Valmir de jesus","nome_mae":"Rosane cleia dos santos","sexo":"Masculino","telefone":"(48) 99855-8268","logradouro":"Rua Rodnei Brasil machado","numero":"59","complemento":"Bloco 7a ap104","cep":"88122-000","bairro":"Sertão do maruim","cidade":"Sao jose","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"3/15/2026 22:45:29","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"65","cpf":"235.983.728-17","senha":"2359","nome":"Pâmela Aparecida da Luz Perdoná","nome_guerra":"Perdoná","email":"palperdona@gmail.com","data_nascimento":"17/05/2001","nome_pai":"Marcos Aurélio Perdoná","nome_mae":"Juliana Aparecida da Luz Perdoná","sexo":"Feminino","telefone":"(48) 99186-0157","logradouro":"Servidão silvestre Prim","numero":"136","complemento":"Casa","cep":"88161-144","bairro":"Boa VISTA","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"4/17/2026 9:43:02","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"66","cpf":"108.677.459-08","senha":"1086","nome":"Otávio Augusto Viapiana","nome_guerra":"Viapiana","email":"viapiana65@gmail.com","data_nascimento":"18/04/1999","nome_pai":"Amirton José Viapiana","nome_mae":"Lizandra Carla Piaseski Viapiana","sexo":"Masculino","telefone":"(48) 99186-1852","logradouro":"Rua Júlio Teodoro Martins","numero":"1800","complemento":"Apt 624","cep":"88161-330","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"5/26/2026 14:00:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"67","cpf":"063.871.729-93","senha":"0638","nome":"Graziela steimbach","nome_guerra":"Steimbach","email":"graziela291211@gmail.com","data_nascimento":"27/09/1989","nome_pai":"Jorge steimbach","nome_mae":"Andreia Conrado steimbach","sexo":"Feminino","telefone":"(48) 99858-9150","logradouro":"Rua nossa senhora das dores","numero":"1606","complemento":"Casa","cep":"88143-594","bairro":"Vila santana","cidade":"Santo amaro da imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"6/26/2026 16:21:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"}];


const MOCK_DATA_INITIAL = {
    associados: [{"id":"1","cpf":"000.000.000-00","senha":"123","nome":"Comandante / Diretoria ACBCSJ","nome_guerra":"Comandante","perfil":"diretoria","status":"ativo","obm":"SÃ£o JosÃ©","profissao":"Comandante da AssociaÃ§Ã£o","email":"diretoria@acbcsj.org.br"},{"id":"2","cpf":"000.923.500-03","senha":"0009","nome":"Angélica Mateus","nome_guerra":"Angélica","email":"amangelica14@gmail.com","data_nascimento":"23/05/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99814-2594","logradouro":"rua João Evangelista da Costa","numero":"","complemento":"","cep":"88090-301","bairro":"Coloninha","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/07/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"3","cpf":"074.136.669-01","senha":"0741","nome":"Douglas Antunes","nome_guerra":"Antunes","email":"douglas.antunes4012@gmail.com","data_nascimento":"24/09/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-4431","logradouro":"Rua Flores da Cunha","numero":"","complemento":"","cep":"88070-460","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"4","cpf":"073.716.899-41","senha":"0737","nome":"Murilo Augusto Galdino De Souza","nome_guerra":"Augusto","email":"galdinomus@gmail.com","data_nascimento":"04/07/1990","nome_pai":"NELSON JOSÉ DE SOUZA","nome_mae":"ZELIA MARIA SILVA DE SOUZA","sexo":"Masculino","telefone":"(48) 98494-1095","logradouro":"VALDIR GUTHIA","numero":"12","complemento":"ANA MELO","cep":"88135-186","bairro":"ARIRIU","cidade":"PALHOÇA","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"09/07/2023 17:45:12","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"5","cpf":"961.193.810-15","senha":"9611","nome":"Andreia de Fátima Machado","nome_guerra":"Andreia","email":"andreiamachado2508@gmail.com","data_nascimento":"25/08/1980","nome_pai":"Fredolino machado","nome_mae":"Catarina Benedett machado","sexo":"Feminino","telefone":"(48) 99697-0295","logradouro":"Rua Antônio Elias","numero":"22","complemento":"Casa","cep":"88106-160","bairro":"Picadas do sul","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/27/2023 0:07:42","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"6","cpf":"069.776.559-84","senha":"0697","nome":"Daniel Bento","nome_guerra":"Bento","email":"bentodani1989@gmail.com","data_nascimento":"01/08/1989","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99616-1172","logradouro":"Av Governador Ivo Silveira","numero":"","complemento":"","cep":"88085-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"18/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"7","cpf":"083.801.589-11","senha":"0838","nome":"Tiago Binhoti","nome_guerra":"Binhoti","email":"tiagobinhoti@gmail.com","data_nascimento":"30/09/1991","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98497-4657","logradouro":"rua Francisco Lutz de Almeida","numero":"","complemento":"","cep":"88108-173","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"8","cpf":"021.603.099-40","senha":"0216","nome":"Emerson Roberto Boiko","nome_guerra":"Boiko","email":"emersonboiko@gmail.com","data_nascimento":"26/06/1978","nome_pai":"Ladislau boiko","nome_mae":"Maria das dores Alves boiko","sexo":"Masculino","telefone":"(48) 99962-0506","logradouro":"Rua das amiexas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"2/24/2024 19:57:52","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"9","cpf":"127.393.649-38","senha":"1273","nome":"Camila Coelho Soares","nome_guerra":"Camila","email":"camila.coelhosoares@gmail.com","data_nascimento":"25/09/2000","nome_pai":"Pedro Soares","nome_mae":"Margarida Coelho","sexo":"Feminino","telefone":"(48) 99126-4292","logradouro":"Rua Walmor Beppler","numero":"S/N","complemento":"Servidão ao lado da casa 125","cep":"88136-257","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/04/2023 12:28:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"10","cpf":"079.962.129-37","senha":"0799","nome":"Ricardo Augusto Coelho","nome_guerra":"Coelho","email":"ricardo.pc15@gmail.com","data_nascimento":"09/08/1991","nome_pai":"Neri Geronimo Coelho","nome_mae":"Rute Helena do Nascimento","sexo":"Masculino","telefone":"(48) 98485-6290","logradouro":"Rua Santo André","numero":"518","complemento":"ap 201","cep":"88106-430","bairro":"Flor de napolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"4/29/2024 9:57:27","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"11","cpf":"318.036.738-50","senha":"3180","nome":"Alex Sandro Batista da Silva","nome_guerra":"Da Silva","email":"alexsandrob221@gmail.com","data_nascimento":"18/07/1983","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98426-9481","logradouro":"Bela Vista","numero":"","complemento":"","cep":"88119-114","bairro":"Potecas","cidade":"São Jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/02/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"12","cpf":"001.637.940-30","senha":"0016","nome":"Michel da Silveira Barros","nome_guerra":"Barros","email":"michel_sbarros@yahoo.com.br","data_nascimento":"27/07/1981","nome_pai":"José António Rodrigues barros","nome_mae":"Ana lucia da silveira barros","sexo":"Masculino","telefone":"(48) 98821-7860","logradouro":"Rua José Cláudio Schmidt","numero":"50","complemento":"50","cep":"88115-558","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/28/2024 5:17:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"13","cpf":"910.414.909-25","senha":"9104","nome":"Deny Anderson Azevedo","nome_guerra":"Deny","email":"denyazevedo1972@gmail.com","data_nascimento":"06/08/1972","nome_pai":"Neri Azevedo","nome_mae":"Laurita Bernadete Azevedo","sexo":"Masculino","telefone":"(48) 99868-3269","logradouro":"Rua Algarves","numero":"S/n","complemento":"Quadra 12 Loteb3","cep":"88107-365","bairro":"Lisboa","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/30/2023 12:08:42","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"14","cpf":"932.603.189-68","senha":"9326","nome":"Eder Alison Da Silva","nome_guerra":"Eder","email":"eder.alisondasilva@gmail.com","data_nascimento":"21/06/1978","nome_pai":"","nome_mae":"","sexo":"Masculino","telefone":"(48) 99834-6944","logradouro":"rua Tercílio Tedesco","numero":"","complemento":"","cep":"88107-481","bairro":"Potecas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"15","cpf":"047.913.959-80","senha":"0479","nome":"Elaine Conrado Bittencourt","nome_guerra":"Elaine","email":"corretoraimobiliariaelaine@gmail.com","data_nascimento":"01/06/1984","nome_pai":"Sidnei Conrado","nome_mae":"Maria Fátima de Pinho","sexo":"Feminino","telefone":"(48) 99119-2407","logradouro":"Rua São João","numero":"500","complemento":"Casa","cep":"88140-000","bairro":"Centro","cidade":"Santo Amaro da Imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/01/2024 21:37:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"16","cpf":"024.284.799-46","senha":"0242","nome":"Fabiana Oro Cericato Costa","nome_guerra":"Fabiana","email":"fabicericato@gmail.com","data_nascimento":"18/11/1979","nome_pai":"Domingo Cericato","nome_mae":"Judite Therezinha Oro Cericato","sexo":"Feminino","telefone":"(48) 98831-5620","logradouro":"Madre Benvenuta","numero":"388","complemento":"Apto 911","cep":"88036-500","bairro":"Trindade","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 12:58:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"17","cpf":"008.489.029-04","senha":"0084","nome":"Gabriel Francisco Farias da Silva","nome_guerra":"Gabriel","email":"bombeirofloripa2011@hotmail.com","data_nascimento":"26/01/1985","nome_pai":"Paulo Roberto da Silva","nome_mae":"Maria da Graça Farias Haskel","sexo":"Masculino","telefone":"(48) 99852-5717","logradouro":"João Batista Derner Neves","numero":"25","complemento":"ap1005","cep":"88102-270","bairro":"Kobrasol","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/09/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"18","cpf":"046.128.369-79","senha":"0461","nome":"Marcia Aparecida Henkes","nome_guerra":"Henkes","email":"mahenkes@gmail.com","data_nascimento":"08/08/1984","nome_pai":"Antônio Adão Henkes","nome_mae":"Ana Geni Veloso de Linhares Henkes","sexo":"Feminino","telefone":"(48) 99800-0811","logradouro":"Rua das Ameixas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"2/25/2024 19:39:32","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"19","cpf":"025.435.769-59","senha":"0254","nome":"Carlos Humberto luiz","nome_guerra":"Humberto","email":"carluzjr@hotmail.com","data_nascimento":"02/12/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99117-2211","logradouro":"Rua Madre tereza de Calcutá","numero":"","complemento":"","cep":"","bairro":"Real Parque","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/06/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"20","cpf":"774.179.849-91","senha":"7741","nome":"Ilton Saturnino Braz","nome_guerra":"Ilton","email":"iltonbraz.bc@gmail.com","data_nascimento":"22/01/1969","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99926-0398","logradouro":"Antonio Goncalves Chaves","numero":"","complemento":"","cep":"88130-545","bairro":"Ponte Imaruim","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"21","cpf":"008.036.019-05","senha":"0080","nome":"Gabriela Kassandra Luiz Colossi","nome_guerra":"Kassandra","email":"kassandracolossi1090@gmail.com","data_nascimento":"08/10/1984","nome_pai":"Paulo Roberto Luiz","nome_mae":"Katia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 98475-8962","logradouro":"Maria Helena Kretzer","numero":"503","complemento":"casa","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/18/2023 12:32:54","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"22","cpf":"092.909.549-90","senha":"0929","nome":"Gustavo Augusto Linder","nome_guerra":"Linder","email":"augustolinder@gmail.com","data_nascimento":"19/10/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99850-3832","logradouro":"Rua Cabo Oderli Schilchting","numero":"","complemento":"","cep":"","bairro":"Passa Vinte","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"23","cpf":"015.513.347-04","senha":"0155","nome":"Carlos Henrique Lourenço Gonçalves","nome_guerra":"Lourenço","email":"carioca-henrique@hotmail.com","data_nascimento":"22/09/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99936-9240","logradouro":"rua Conde Afonso Celso","numero":"","complemento":"","cep":"88070-560","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"20/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"24","cpf":"085.543.859-26","senha":"0855","nome":"Lucas Rodrigues Antônio","nome_guerra":"Lucas","email":"lucasrodrigues635833lra@gmail.com","data_nascimento":"28/08/1994","nome_pai":"Daniel Aniceto Antônio","nome_mae":"Chirley João Rodrigues Antônio","sexo":"Masculino","telefone":"(48) 99935-2731","logradouro":"Rua Fernando José Zimmermann","numero":"33","complemento":"Casa","cep":"88160-624","bairro":"Bom viver","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/05/2024 11:21:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"25","cpf":"109.532.709-71","senha":"1095","nome":"Mayara Vieira Soares","nome_guerra":"Mayara","email":"mayarasoaresrl@gmail.com","data_nascimento":"04/01/2002","nome_pai":"Rodrigo Soares","nome_mae":"Raquel Vieira Soares","sexo":"Feminino","telefone":"(48) 99620-5860","logradouro":"Rua Rodney Brasil Machado","numero":"59","complemento":"Condomínio","cep":"88122-049","bairro":"Sertão do Maruim","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 20:02:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"26","cpf":"005.592.699-19","senha":"0055","nome":"Kleber Pacheco Mina","nome_guerra":"Mina","email":"kleber_dvdx@hotmail.com","data_nascimento":"30/09/1979","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98430-9294","logradouro":"rua Pedro Paulo de Abreu","numero":"","complemento":"","cep":"88106-785","bairro":"forquilhinhas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"27","cpf":"097.100.159-66","senha":"0971","nome":"Mithel Evergisto de Lima","nome_guerra":"Mithel","email":"mithel_lima@hotmail.com","data_nascimento":"26/07/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98447-8424","logradouro":"rua 13 de Junho","numero":"","complemento":"","cep":"88106-470","bairro":"Flor de Nápolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"19/02/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"28","cpf":"052.026.659-54","senha":"0520","nome":"Raphael Natayan Nilsen","nome_guerra":"Natayan","email":"raphael_nilsen@hotmail.com","data_nascimento":"27/12/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98404-1027","logradouro":"R. João Guilherme dos Santos","numero":"","complemento":"","cep":"88131-780","bairro":"Rio Grande","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"29","cpf":"060.594.529-22","senha":"0605","nome":"Gabriel Nery Cristiano","nome_guerra":"Nery","email":"gabrielnerycristiano1@gmail.com","data_nascimento":"27/07/2002","nome_pai":"Cândido Cristiano conceição Cristiano","nome_mae":"Lucimara Terezinha Pierro Nery","sexo":"Masculino","telefone":"(48) 99649-1296","logradouro":"Av. Brasil","numero":"158","complemento":"Casa","cep":"88110-500","bairro":"Bela Vista","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2023 21:37:32","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"30","cpf":"770.614.709-68","senha":"7706","nome":"Marcelo luiz de Oliveira","nome_guerra":"Oliveira","email":"bcoliveiraqap@gmail.com","data_nascimento":"05/07/1970","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99991-3979","logradouro":"Rua Domingos Pedro Hermes","numero":"","complemento":"","cep":"","bairro":"Barreiros","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"31","cpf":"091.275.619-50","senha":"0912","nome":"Guilherme Ozol de Assunção","nome_guerra":"Ozol","email":"ozol.guilherme@gmail.com","data_nascimento":"22/12/1993","nome_pai":"","nome_mae":"Sandra Mara Ozol de Assunção","sexo":"Masculino","telefone":"(48) 99110-7391","logradouro":"Rua Elizeu de Bernardi","numero":"641","complemento":"Bl c ap 302","cep":"88101-050","bairro":"Campinas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"26/03/2026","data_cadastro":"09/11/2023 18:16:01","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"32","cpf":"757.951.599-72","senha":"7579","nome":"Emerson Pereira","nome_guerra":"Pereira","email":"emersonobra@gmail.com","data_nascimento":"04/02/1974","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98428-4002","logradouro":"Balbuino Mechen","numero":"","complemento":"","cep":"","bairro":"Boa Parana","cidade":"S.P.A","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"33","cpf":"010.110.059-05","senha":"0101","nome":"Caio Passold Ravache","nome_guerra":"Ravache","email":"caio.p.ravache@gmail.com","data_nascimento":"15/05/2000","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9907-1505","logradouro":"rua João Meirelles","numero":"","complemento":"","cep":"88085-435","bairro":"Itaguáçu","cidade":"florianópolis","perfil":"associado","status":"desligado","data_desligamento":"11/05/2026","data_cadastro":"14/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"34","cpf":"003.357.419-76","senha":"0033","nome":"Michele Santana Quint","nome_guerra":"Santana","email":"jcmicheliquint@gmail.com","data_nascimento":"26/11/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99606-4164","logradouro":"Rua Roberto VALDIR Manchich","numero":"","complemento":"","cep":"88123-430","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"35","cpf":"120.391.089-47","senha":"1203","nome":"Julia da Silva Sardá","nome_guerra":"Sardá","email":"jhu22jhu@gmail.com","data_nascimento":"15/04/1999","nome_pai":"Claudemar Alfredo Sardá","nome_mae":"Liliane Maria da Silva Sardá","sexo":"Feminino","telefone":"(48) 98424-2904","logradouro":"Rua Manoel Eduardo Cardoso","numero":"17","complemento":"Casa","cep":"88110-792","bairro":"Bela Vista 1","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"28/04/2026","data_cadastro":"9/26/2023 13:18:11","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"36","cpf":"155.303.359-00","senha":"1553","nome":"André Luiz Schmitt","nome_guerra":"Schmitt","email":"andréLuizschmitt@gmail.com","data_nascimento":"27/04/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-2594","logradouro":"Rua Frei Albano","numero":"","complemento":"","cep":"88103-100","bairro":"Centro","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"37","cpf":"002.200.260-09","senha":"0022","nome":"Kleber Spotti Rodrigues","nome_guerra":"Spotti","email":"kleberspotti@gmail.com","data_nascimento":"06/07/1982","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99903-1009","logradouro":"rua Baldicero Filomeno","numero":"","complemento":"","cep":"88064-002","bairro":"Alto Ribeirão","cidade":"Florianopolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"38","cpf":"008.818.209-62","senha":"0088","nome":"Uelder Alves Da Costa","nome_guerra":"Alves","email":"10b3aux@gmail.com","data_nascimento":"10/09/1985","nome_pai":"VILMO FRANCISCO DA COSTA","nome_mae":"EUGÊNIA ALVES","sexo":"Masculino","telefone":"(48) 98801-0190","logradouro":"RUA CRISTÓVÃO NUNES PIRES","numero":"180","complemento":"APTO 904","cep":"88010-120","bairro":"CENTRO","cidade":"FLORIANÓPOLIS","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/10/2023 15:06:50","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"39","cpf":"416.967.609-25","senha":"4169","nome":"Ismael Vieira da Rosa Ulysséia","nome_guerra":"Ulysséia","email":"ismaelvru@intercop.com.br","data_nascimento":"02/08/1961","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9997-1294","logradouro":"av Itamarati","numero":"","complemento":"","cep":"88034-400","bairro":"Itamarati","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"40","cpf":"104.320.579-94","senha":"1043","nome":"Yanka Caroliny Luciano","nome_guerra":"Yanka","email":"yanka.carolinyy@gmail.com","data_nascimento":"14/05/1997","nome_pai":"CLAUDINEI SOARES LUCIANO","nome_mae":"NAÁRA SCHOROEDER","sexo":"Feminino","telefone":"(48) 99641-8318","logradouro":"R. José João de Souza","numero":"457","complemento":"casa","cep":"88108-170","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 8:56:06","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"41","cpf":"028.667.330-45","senha":"0286","nome":"Yuri Esmerio dos Santos","nome_guerra":"Yuri","email":"yurits828@gmail.com","data_nascimento":"04/09/1993","nome_pai":"","nome_mae":"Janine esmerio dos Santos","sexo":"Masculino","telefone":"(48) 98830-3826","logradouro":"Rua sábia una","numero":"45","complemento":"Bloco 5A AP 201","cep":"88122-021","bairro":"Sertão do Imarui","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/04/2025 16:13:47","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"42","cpf":"068.052.249-26","senha":"0680","nome":"Markian da Silveira Fortkamp","nome_guerra":"Fortkamp","email":"bcfortkamp@gmail.com","data_nascimento":"26/06/1994","nome_pai":"Marquian Fortkamp","nome_mae":"Viviane da Silveira","sexo":"Masculino","telefone":"(48) 98878-5387","logradouro":"Av. Patrício Antônio Teixeira","numero":"131","complemento":"AP 01","cep":"88161-586","bairro":"Rio Caveiras","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"1/23/2025 16:41:22","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"43","cpf":"007.303.029-54","senha":"0073","nome":"Karina  Maria de Jesus Sobrinho","nome_guerra":"Jesus","email":"kakamania33@gmail.com","data_nascimento":"11/09/1980","nome_pai":"Francisco filho aobrinho","nome_mae":"Maria Mendes de Jesus sobrinho","sexo":"Feminino","telefone":"(48) 99180-6824","logradouro":"Adão Shimitd","numero":"998","complemento":"Casa","cep":"88117-260","bairro":"Barreiros","cidade":"São jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2025 19:25:13","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"44","cpf":"039.070.760-01","senha":"0390","nome":"Nakata Garra Gomes","nome_guerra":"Nakata","email":"nakatagarrag@gmail.com","data_nascimento":"12/12/1999","nome_pai":"Danilo da Fontoura Gomes","nome_mae":"Mariselma Garra Lacerda Gomes","sexo":"Feminino","telefone":"(55) 98449-2570","logradouro":"Avenida Ceniro Martins 1078","numero":"1078","complemento":"Apto 9","cep":"88107-479","bairro":"Forquilhas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"06/05/2026","data_cadastro":"6/17/2025 13:00:48","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"45","cpf":"125.366.669-56","senha":"1253","nome":"Weverton José Machado","nome_guerra":"Weverton","email":"machadoweverton424@gmail.com","data_nascimento":"14/09/2002","nome_pai":"José Jucelio Machado","nome_mae":"Jerusa aparecida citadella","sexo":"Masculino","telefone":"(48) 99821-8785","logradouro":"Rua 13 de maio","numero":"876","complemento":"Casa","cep":"88165-040","bairro":"Prado","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"07/05/2025 18:41:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"46","cpf":"919.835.099-49","senha":"9198","nome":"Alexandre Vinicius Martins","nome_guerra":"Martins","email":"djxandemartins@gmail.com","data_nascimento":"10/09/1976","nome_pai":"Não Declarado","nome_mae":"Mariza Salete Martins","sexo":"Masculino","telefone":"(48) 99957-5275","logradouro":"Rua Olavo Bilac","numero":"498","complemento":"Casa","cep":"88133-350","bairro":"Jardim Eldorado","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"8/15/2025 16:01:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"47","cpf":"100.975.089-50","senha":"1009","nome":"Ana Carolina Nascimento","nome_guerra":"Ana Carolina","email":"anacarolinanascimento2309@gmail.com","data_nascimento":"23/09/1995","nome_pai":"Silvonei Nascimento","nome_mae":"Katia Regina Sodre","sexo":"Feminino","telefone":"(48) 99944-4545","logradouro":"Rua Johannes Lambertus Josef Bovee","numero":"16","complemento":"Casa","cep":"88168-490","bairro":"Tijuquinhas","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"8/18/2025 10:21:07","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"48","cpf":"083.469.799-83","senha":"0834","nome":"Andréia Martins dos Santos","nome_guerra":"Andréia M","email":"andreiamartins.ntr@gmail.com","data_nascimento":"20/04/1992","nome_pai":"Salvador Martins dos Santos","nome_mae":"Angelina da Cruz Delfino","sexo":"Feminino","telefone":"(48) 98472-8085","logradouro":"Rua Acácio Reitz","numero":"355","complemento":"Casa","cep":"88161-060","bairro":"Universitário","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2025 19:32:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"49","cpf":"007.064.299-07","senha":"0070","nome":"Fernando Pereira Siqueira Junior","nome_guerra":"Siqueira","email":"snnnarfdrums@gmail.com","data_nascimento":"09/05/1981","nome_pai":"Fernando Pereira Siqueira","nome_mae":"Sandra Aparecida Ferreira","sexo":"Masculino","telefone":"(48) 99953-1501","logradouro":"Rua sebastiana Coutinho","numero":"216","complemento":"Torre D apto 202","cep":"88113-240","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/08/2025 11:44:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"50","cpf":"028.574.290-61","senha":"0285","nome":"Alessandro da Costa Gonçalves","nome_guerra":"Gonçalves","email":"acgoncalves191@gmail.com","data_nascimento":"13/10/1991","nome_pai":"José João Angonezi Gonçalves","nome_mae":"Sandra Mara Costa Gonçalves","sexo":"Masculino","telefone":"(48) 99146-6837","logradouro":"Av Paulo Roberto Vidal","numero":"2490","complemento":"Casa","cep":"88132-599","bairro":"Bella Vista","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/04/2025 12:14:18","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"51","cpf":"147.564.459-00","senha":"1475","nome":"Misael Dias Neumann","nome_guerra":"Neumann","email":"misaeldiasneumann@gmail.com","data_nascimento":"11/04/2005","nome_pai":"Baltazar Romeiro Neumann","nome_mae":"Joseane Dias Neumann","sexo":"Masculino","telefone":"(48) 98824-4964","logradouro":"Rua Manoel Mariano Ferreira","numero":"621","complemento":"Condomínio","cep":"88161-680","bairro":"Rio Caveiras","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/15/2025 12:50:37","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"52","cpf":"007.178.839-57","senha":"0071","nome":"Luiz Fernando da Silva","nome_guerra":"Luiz","email":"silva.luiz0579@gmail.com","data_nascimento":"11/05/1979","nome_pai":"Nelson da Silva","nome_mae":"Zilma Ana da Silva","sexo":"Masculino","telefone":"(48) 98437-2126","logradouro":"Servidão Inácia de Medeiros","numero":"263","complemento":"Casa","cep":"88037-065","bairro":"Córrego grande","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/22/2025 12:21:46","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"53","cpf":"097.355.079-19","senha":"0973","nome":"João Victor Figueiredo Chrostowski","nome_guerra":"Figueiredo","email":"joaov.chrostowski@gmail.com","data_nascimento":"27/07/1995","nome_pai":"José Hélio Chrostowski","nome_mae":"Cerlei Adriane Figueiredo Chrostowski","sexo":"Masculino","telefone":"(47) 99136-3393","logradouro":"Rua Thomé Israel da Silva","numero":"105","complemento":"Apto 401A","cep":"88132-373","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2026 16:22:07","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"54","cpf":"003.747.659-95","senha":"0037","nome":"LUCIANO PEREIRA","nome_guerra":"Luciano","email":"lucianompereira@gmail.com","data_nascimento":"10/05/1979","nome_pai":"ADONAI PEREIRA","nome_mae":"VERA LUCIA PEREIRA","sexo":"Masculino","telefone":"(48) 99993-3233","logradouro":"Rua Maria Filomena da Silva","numero":"388","complemento":"Ap 1001","cep":"88110-630","bairro":"Nsa Sra do Rosário","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:13:55","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"55","cpf":"951.971.339-53","senha":"9519","nome":"Claudio cardoso","nome_guerra":"Cardoso","email":"claudio.cardoso311074@gmail.com","data_nascimento":"31/10/1974","nome_pai":"Sebastião Boaventura cardoso","nome_mae":"Maria do Carmo cardoso","sexo":"Masculino","telefone":"(48) 99906-6108","logradouro":"Rua Caetano da costa coelho","numero":"1593","complemento":"Apto 101","cep":"88113-790","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:47:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"56","cpf":"079.744.619-26","senha":"0797","nome":"Diego Carvalho Cordova","nome_guerra":"Carvalho","email":"brxf0r4ste1ro@gmail.com","data_nascimento":"11/09/1991","nome_pai":"Paulo Henrique Cordova","nome_mae":"Maria de Fátima Carvalho","sexo":"Masculino","telefone":"(48) 99823-7756","logradouro":"Rua geral de três riachos","numero":"Sem numero","complemento":"Casa","cep":"88160-000","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"02/11/2026 10:51:36","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"57","cpf":"118.669.539-07","senha":"1186","nome":"João Pedro Pereira Bunn","nome_guerra":"Bunn","email":"joaoppb01@gmail.com","data_nascimento":"15/09/2004","nome_pai":"Orlando Bunn","nome_mae":"Adriana Maciel Pereira","sexo":"Masculino","telefone":"(48) 99951-2775","logradouro":"Rua Acioli Nunes dos Santos","numero":"231","complemento":"Casa","cep":"88131-540","bairro":"Centro","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:56:37","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"58","cpf":"065.194.139-33","senha":"0651","nome":"Vanessa David Costa","nome_guerra":"Costa","email":"vanessamodapet1209@gmail.com","data_nascimento":"11/04/1987","nome_pai":"Marcelo Costa","nome_mae":"Elisete David Costa","sexo":"Feminino","telefone":"(48) 98466-6195","logradouro":"Rua Inhambu","numero":"104","complemento":"Casa","cep":"88115-510","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"09/08/2026","data_cadastro":"02/11/2026 12:07:04","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"59","cpf":"096.581.989-29","senha":"0965","nome":"Izabelle Sofie Luiz","nome_guerra":"Sofie","email":"bell.450009@gmail.com","data_nascimento":"23/12/2001","nome_pai":"Paulo Roberto Luiz","nome_mae":"Kátia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 99154-0113","logradouro":"rua Maria Helena Kretzer","numero":"503","complemento":"casa A ap 202","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 18:30:59","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"60","cpf":"123.859.799-85","senha":"1238","nome":"Fabian Henrique da Silva","nome_guerra":"Fabian","email":"fabiandeggy@gmail.com","data_nascimento":"04/06/2005","nome_pai":"Rodrigo Eduardo da Silva","nome_mae":"Juliane Caetano Justino","sexo":"Masculino","telefone":"(48) 99107-5323","logradouro":"Rua Prefeito Dib Cherem","numero":"2734","complemento":"Casa","cep":"88090-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/12/2026 11:36:15","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"61","cpf":"063.023.992-46","senha":"0630","nome":"Washington Levi Nascimento Dias","nome_guerra":"Levi","email":"vulgo.levi2004@gmail.com","data_nascimento":"31/08/2004","nome_pai":"DUCIVALDO","nome_mae":"ROSYLANGE DO NASCIMENTO","sexo":"Masculino","telefone":"(48) 98859-1896","logradouro":"Av paulo roberto vidal","numero":"475","complemento":"bloco c ap 310","cep":"88132-599","bairro":"Bela vista","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"12/06/2026","data_cadastro":"2/16/2026 14:51:05","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"62","cpf":"069.723.111-95","senha":"0697","nome":"Reinaldo Joaber de Araújo Spengler","nome_guerra":"Joaber","email":"reinaldospengler@gmail.com","data_nascimento":"15/01/2002","nome_pai":"Ivo Spengler","nome_mae":"Genilce Silva de Araújo Spengler","sexo":"Masculino","telefone":"(48) 98839-0467","logradouro":"Demetrio Novossate","numero":"278","complemento":"Casa","cep":"88136-366","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"09/06/2026","data_cadastro":"2/18/2026 8:17:02","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"63","cpf":"008.145.020-67","senha":"0081","nome":"Anderson Rafael Souza da Silva","nome_guerra":"Anderson","email":"anderson84negocios@gmail.com","data_nascimento":"28/10/1984","nome_pai":"","nome_mae":"Marivane Souza da Silva","sexo":"Masculino","telefone":"(48) 99993-8011","logradouro":"Rua Maria Helena Kretzer","numero":"503a","complemento":"Ap301","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"3/14/2026 17:21:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"64","cpf":"092.158.639-66","senha":"0921","nome":"Washington sadi de jesus","nome_guerra":"Sadi","email":"washingtondejesus1509@gmail.com","data_nascimento":"15/03/1994","nome_pai":"Valmir de jesus","nome_mae":"Rosane cleia dos santos","sexo":"Masculino","telefone":"(48) 99855-8268","logradouro":"Rua Rodnei Brasil machado","numero":"59","complemento":"Bloco 7a ap104","cep":"88122-000","bairro":"Sertão do maruim","cidade":"Sao jose","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"3/15/2026 22:45:29","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"65","cpf":"235.983.728-17","senha":"2359","nome":"Pâmela Aparecida da Luz Perdoná","nome_guerra":"Perdoná","email":"palperdona@gmail.com","data_nascimento":"17/05/2001","nome_pai":"Marcos Aurélio Perdoná","nome_mae":"Juliana Aparecida da Luz Perdoná","sexo":"Feminino","telefone":"(48) 99186-0157","logradouro":"Servidão silvestre Prim","numero":"136","complemento":"Casa","cep":"88161-144","bairro":"Boa VISTA","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"4/17/2026 9:43:02","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"66","cpf":"108.677.459-08","senha":"1086","nome":"Otávio Augusto Viapiana","nome_guerra":"Viapiana","email":"viapiana65@gmail.com","data_nascimento":"18/04/1999","nome_pai":"Amirton José Viapiana","nome_mae":"Lizandra Carla Piaseski Viapiana","sexo":"Masculino","telefone":"(48) 99186-1852","logradouro":"Rua Júlio Teodoro Martins","numero":"1800","complemento":"Apt 624","cep":"88161-330","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"5/26/2026 14:00:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"67","cpf":"063.871.729-93","senha":"0638","nome":"Graziela steimbach","nome_guerra":"Steimbach","email":"graziela291211@gmail.com","data_nascimento":"27/09/1989","nome_pai":"Jorge steimbach","nome_mae":"Andreia Conrado steimbach","sexo":"Feminino","telefone":"(48) 99858-9150","logradouro":"Rua nossa senhora das dores","numero":"1606","complemento":"Casa","cep":"88143-594","bairro":"Vila santana","cidade":"Santo amaro da imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"6/26/2026 16:21:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"}],
    financeiro: [],
    mensalidades: [],
    documentos: [],
    programacao: [],
    mensagens: []
};

let currentUser = null;
let currentChart = null;

// ARMAZENAMENTO ILIMITADO DE ARQUIVOS VIA INDEXEDDB
const idbStorage = {
    dbName: "ACBCSJ_IndexedDB",
    version: 1,
    db: null,
    async getDB() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, this.version);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("files")) {
                    db.createObjectStore("files");
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = (e) => reject(e.target.error);
        });
    },
    async setFile(id, content) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction("files", "readwrite");
                const store = tx.objectStore("files");
                store.put(content, id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error("Erro no IndexedDB:", e);
            return false;
        }
    },
    async getFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction("files", "readonly");
                const store = tx.objectStore("files");
                const req = store.get(id);
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            });
        } catch (e) {
            return null;
        }
    },
    async deleteFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction("files", "readwrite");
                const store = tx.objectStore("files");
                store.delete(id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    }
};

// INICIALIZAÇÃO E LIMPEZA DE DADOS
const ACBCSJ_BUILD_VERSION = "2026-08-24_v4";

function forcarAtualizacaoCacheSistema() {
    localStorage.setItem("acbcsj_build_version", ACBCSJ_BUILD_VERSION);
    recalcularTodasGridsMensalidades(true);
    if (typeof dbService !== 'undefined' && dbService.syncFromSupabase) {
        dbService.syncFromSupabase();
    }
    alert("Dados e cache do sistema sincronizados com sucesso!");
    window.location.reload(true);
}
window.forcarAtualizacaoCacheSistema = forcarAtualizacaoCacheSistema;

document.addEventListener("DOMContentLoaded", () => {
    const savedVersion = localStorage.getItem("acbcsj_build_version");
    if (savedVersion !== ACBCSJ_BUILD_VERSION) {
        localStorage.setItem("acbcsj_build_version", ACBCSJ_BUILD_VERSION);
        recalcularTodasGridsMensalidades(false);
    }
    initMockData();
    setupCPFMasks();
    if (typeof setupNavigation === 'function') setupNavigation();

    // Sincroniza automaticamente os dados online do Supabase na inicialização
    if (typeof dbService !== 'undefined' && dbService.syncFromSupabase) {
        dbService.syncFromSupabase().then(() => {
            if (typeof renderGestaoMensalidades === 'function' && document.getElementById('tableGestaoMensalidadesBody')) {
                renderGestaoMensalidades();
            }
        });
    }
});

function resetBancoDadosComandante() {
    const listAssociados = (typeof MOCK_DATA_INITIAL !== "undefined" && MOCK_DATA_INITIAL.associados)
        ? MOCK_DATA_INITIAL.associados
        : [{
            id: "1",
            cpf: "000.000.000-00",
            senha: "123",
            nome: "Comandante / Diretoria ACBCSJ",
            nome_guerra: "Comandante",
            perfil: "diretoria",
            status: "ativo",
            obm: "São José",
            profissao: "Comandante da Associação"
        }];

    localStorage.setItem("acbcsj_associados", JSON.stringify(listAssociados));
    localStorage.setItem("acbcsj_financeiro", JSON.stringify(INITIAL_LANCAMENTOS_DATA));
    localStorage.setItem("acbcsj_mensalidades_grid", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2024", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2025", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2026", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2027", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2028", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_historico", JSON.stringify([])); localStorage.setItem("acbcsj_valor_mensalidade", "20.00"); localStorage.setItem("acbcsj_historico_reajustes_mensalidade", JSON.stringify([{ id: "reaj_inicial", valor: 20.00, mes_inicio: "01", ano_inicio: "2024", data_registro: "01/01/2024", justificativa: "Valor base padrão (R$ 20,00)" }]));
    localStorage.setItem("acbcsj_comunicados_enviados", JSON.stringify([]));
    localStorage.setItem("acbcsj_documentos", JSON.stringify([]));
    localStorage.setItem("acbcsj_programacao", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensagens", JSON.stringify([]));
}

function initMockData() {
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem("acbcsj_associados")) || [];
    } catch (e) {
        list = [];
    }
    
    if (!list || list.length < 60) {
        localStorage.setItem("acbcsj_associados", JSON.stringify(MOCK_DATA_INITIAL.associados));
    }

    let finList = [];
    try {
        finList = JSON.parse(localStorage.getItem("acbcsj_financeiro")) || [];
    } catch (e) {
        finList = [];
    }

    if (!finList || finList.length < 35) {
        localStorage.setItem("acbcsj_financeiro", JSON.stringify(INITIAL_LANCAMENTOS_DATA));
    }
}

// MÁSCARA AUTOMÁTICA DE CPF
function setupCPFMasks() {
    const cpfInputs = document.querySelectorAll('.cpf-mask');
    cpfInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.substring(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
        });
    });
}

// AUTENTICAÇÃO E LOGIN
async function loginWithCPF(cpf, password, roleHint = null) {
    console.log("ðŸ”‘ Executando loginWithCPF...", cpf, roleHint);
    try {
        let list = [];
        try { list = JSON.parse(localStorage.getItem('acbcsj_associados')) || []; } catch(e) {}
        
        if (!list || list.length < 50) {
            if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados && MOCK_DATA_INITIAL.associados.length >= 50) {
                list = MOCK_DATA_INITIAL.associados;
            } else if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' && ASSOCIADOS_PLANILHA_REAL.length > 0) {
                list = ASSOCIADOS_PLANILHA_REAL;
            }
            if (list && list.length > 0) {
                localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            }
        }

        if (roleHint === 'diretoria') {
            currentUser = list.find(a => a.perfil === 'diretoria' && a.status === 'ativo') || list[0] || { nome: 'Comandante / Diretoria ACBCSJ', cpf: '000.000.000-00', perfil: 'diretoria', status: 'ativo' };
            if (currentUser) currentUser.status = 'ativo';
        } else if (roleHint === 'associado') {
            currentUser = list.find(a => a.perfil === 'associado' && a.status === 'ativo') || list[1] || list[0];
        } else {
            const cleanInputCPF = (cpf || '').replace(/\D/g, '');
            
            if (!cleanInputCPF) {
                currentUser = list.find(a => a.perfil === 'diretoria') || list[0];
            } else {
                const found = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanInputCPF || a.cpf === cpf);
                
                if (found) {
                    if (found.status === 'desligado') {
                        alert('ðŸš« ACESSO BLOQUEADO!\n\nEste cadastro consta como DESLIGADO da AssociaÃ§Ã£o.');
                        return;
                    }
                    currentUser = found;
                } else {
                    currentUser = list.find(a => a.perfil === 'diretoria') || list[0];
                }
            }
        }

        if (!currentUser) {
            currentUser = { nome: 'Comandante / Diretoria ACBCSJ', cpf: '000.000.000-00', perfil: 'diretoria', status: 'ativo' };
        }

        // ForÃ§a exibiÃ§Ã£o do Dashboard
        const authScreen = document.getElementById('authScreen');
        const appDashboard = document.getElementById('appDashboard');

        if (authScreen) authScreen.setAttribute('style', 'display: none !important;');
        if (appDashboard) appDashboard.setAttribute('style', 'display: flex !important; min-height: 100vh; flex-direction: column;');

        try {
            renderUserHeader();
            renderSidebarMenu();
            navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
        } catch (uiErr) {
            console.error('Aviso ao carregar telas pÃ³s-login:', uiErr);
        }
    } catch (err) {
        console.error('Erro ao efetuar login:', err);
        const authScreen = document.getElementById('authScreen');
        const appDashboard = document.getElementById('appDashboard');
        if (authScreen) authScreen.setAttribute('style', 'display: none !important;');
        if (appDashboard) appDashboard.setAttribute('style', 'display: flex !important; min-height: 100vh; flex-direction: column;');
    }
}

window.loginWithCPF = loginWithCPF;

function logout() {
    currentUser = null;
    document.getElementById('appDashboard').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
}

// RENDERIZAÇÃO DO CABEÇALHO DO USUÁRIO
function renderUserHeader() {
    document.getElementById('headerUserName').textContent = currentUser.nome;
    const badge = document.getElementById('headerUserRole');
    badge.textContent = currentUser.perfil.toUpperCase();
    badge.className = `user-role-badge role-${currentUser.perfil}`;
}

// MENU LATERAL DINÃ‚MICO CONFORME PERFIL

function renderSidebarMenu() {
    const menuNav = document.getElementById('sidebarNav');
    if (!menuNav) return;
    menuNav.innerHTML = '';

    if (currentUser.perfil === 'diretoria') {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-diretoria')">📊 Painel Geral</div>
            <div class="nav-item" onclick="navigateTab('gestao-associados')">👥 Controle de Associados</div>
            <div class="nav-item" onclick="navigateTab('associados-desligados')">📋 Associados Desligados</div>
            <div class="nav-item" onclick="navigateTab('gestao-mensalidades')">💳 Controle de Mensalidades</div>
            <div class="nav-item" onclick="navigateTab('gestao-financeira')">💰 Lançamentos Financeiros</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📑 Documentos & Atas</div>
            <div class="nav-item" onclick="navigateTab('mensagens-diretoria')">📬 Caixa de Mensagens</div>
        `;
    } else {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-associado')">🏠 Meu Painel</div>
            <div class="nav-item" onclick="navigateTab('comunicados-associado')">📢 Comunicados & Avisos</div>
            <div class="nav-item" onclick="navigateTab('balancetes-associado')">📈 Balancetes & Contas</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📁 Documentos & Convites</div>
            <div class="nav-item" onclick="navigateTab('enviar-mensagem')">💬 Fale com a Diretoria</div>
        `;
    }
}

// NAVEGAÇÃO ENTRE ABAS
function navigateTab(tabId) {
    if (currentUser && currentUser.perfil !== 'diretoria') {
        const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const cleanCpf = (currentUser.cpf || '').replace(/\D/g, '');
        const currentDbState = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);
        if (currentDbState && currentDbState.status === 'desligado') {
            alert('ðŸš« ACESSO REVOGADO!\n\nSeu cadastro consta como DESLIGADO da AssociaÃ§Ã£o.');
            logout();
            return;
        }
    }

    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.style.display = 'block';

    // Destacar item de menu ativo
    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(tabId));
    if (activeNav) activeNav.classList.add('active');

    // Executar atualizações de tela específicas
    if (tabId === 'overview-diretoria') renderDiretoriaOverview();
    if (tabId === 'gestao-associados') renderGestaoAssociados();
    if (tabId === 'associados-desligados') renderAssociadosDesligados();
    if (tabId === 'gestao-mensalidades') {
        if (typeof dbService !== 'undefined' && dbService.getMensalidades) {
            dbService.getMensalidades().then(() => {
                renderGestaoMensalidades();
            });
        } else {
            renderGestaoMensalidades();
        }
    }
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
    if (tabId === 'comunicados-associado') renderComunicadosHistoricoAssociado();
    if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    if (tabId === 'documentos-associado' || tabId === 'documentos-diretoria') renderDocumentos();
    if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}

// LÓGICA DA DIRETORIA: PAINEL GERAL E TABELAS
function renderDiretoriaOverview() {
    const associados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const pendentes = associados.filter(a => a.status === 'pendente');

    // Captura o ano selecionado no filtro (padrão: 2026)
    const selectAno = document.getElementById('diretoriaFiltroAno');
    const anoFiltro = selectAno ? selectAno.value : '2026';

    // Atualiza labels visuais de ano
    document.querySelectorAll('.lblAnoSelecionado').forEach(el => {
        el.textContent = anoFiltro === 'todos' ? 'Todos' : anoFiltro;
    });

    // 1. Total Ativos Gerais
    const totalAtivos = associados.filter(a => a.status === 'ativo').length;
    document.getElementById('metricTotalAssociados').textContent = totalAtivos;

    // 2. Novas Associações no Ano Selecionado
    const novosNoAno = associados.filter(a => {
        if (!a.data_cadastro) return false;
        return anoFiltro === 'todos' || a.data_cadastro.includes(anoFiltro);
    }).length;
    const elNovos = document.getElementById('metricNovosAno');
    if (elNovos) elNovos.textContent = novosNoAno;

    // 3. Desligamentos no Ano Selecionado
    const desligadosNoAno = associados.filter(a => {
        if (a.status !== 'desligado') return false;
        if (anoFiltro === 'todos') return true;
        const emData = a.data_desligamento && a.data_desligamento.includes(anoFiltro);
        const emMotivo = a.motivo_desligamento && a.motivo_desligamento.includes(anoFiltro);
        const emCadastro = a.data_cadastro && a.data_cadastro.includes(anoFiltro);
        return emData || emMotivo || emCadastro;
    }).length;
    const elDesligados = document.getElementById('metricDesligadosAno');
    if (elDesligados) elDesligados.textContent = desligadosNoAno;

    // 4. Solicitações Pendentes
    document.getElementById('metricCadastrosPendentes').textContent = pendentes.length;

    // 5. Saldo em Caixa
    const totalReceitas = financeiro.filter(f => f.tipo === 'receita').reduce((sum, item) => sum + Number(item.valor), 0);
    const totalDespesas = financeiro.filter(f => f.tipo === 'despesa').reduce((sum, item) => sum + Number(item.valor), 0);
    const saldo = totalReceitas - totalDespesas;
    document.getElementById('metricSaldoCaixa').textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Tabela de solicitações de desligamento pendentes
    const pendentesDesligamento = associados.filter(a => a.status === 'pendente_desligamento');
    const containerDeslig = document.getElementById('tableDesligamentosPendentesBody');
    if (containerDeslig) {
        if (pendentesDesligamento.length === 0) {
            containerDeslig.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 15px;">Nenhuma solicitação de desligamento pendente de homologação.</td></tr>`;
        } else {
            containerDeslig.innerHTML = pendentesDesligamento.map(d => `
                <tr>
                    <td style="text-align: left;">
                        <b>${d.nome_guerra || d.nome}</b><br>
                        <small style="color: var(--text-muted);">${d.nome}</small>
                    </td>
                    <td>
                        <b>${d.cpf}</b><br>
                        <small style="color: var(--accent-gold);">${d.obm || '-'}</small>
                    </td>
                    <td><small style="color: var(--text-muted);">${d.data_solicitacao_desligamento || '-'}</small></td>
                    <td>
                        ${d.carta_desligamento_url ? `
                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 8px; color: var(--accent-gold); border-color: var(--accent-gold);" onclick="abrirCartaDesligamento('${d.cpf}')">
                                📄 Ver Carta Anexada
                            </button>
                        ` : '<small style="color: #FF6B6B; font-style: italic;">Sem carta anexada</small>'}
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px; justify-content: center;">
                            <button class="btn btn-sm btn-success" style="padding: 3px 8px; font-size: 11px; background: #2ECC71; color: #fff; border: none; font-weight: bold;" onclick="homologarDesligamentoDiretoria('${d.cpf}')">✅ Homologar</button>
                            <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 11px; color: #E74C3C; border-color: #E74C3C;" onclick="rejeitarDesligamentoDiretoria('${d.cpf}')">❌ Rejeitar</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Tabela de aprovação rápida
    const container = document.getElementById('tablePendentesBody');
    if (container) {
        if (pendentes.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma solicitação de pré-cadastro pendente.</td></tr>`;
        } else {
            container.innerHTML = pendentes.map(p => `
                <tr>
                    <td><b>${p.nome_guerra || p.nome}</b><br><small style="color:var(--text-muted)">${p.nome}</small></td>
                    <td>${p.cpf}</td>
                    <td>${p.telefone || '-'}</td>
                    <td><small style="color:var(--accent-gold);">${p.data_cadastro || '-'}</small></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="aprovarAssociado('${p.cpf}')">Aprovar</button>
                        <button class="btn btn-sm btn-outline" onclick="verFichaAssociado('${p.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C" onclick="abrirModalDesligar('${p.cpf}')">Rejeitar</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// EXIBIR APENAS ASSOCIADOS ATIVOS COM CONTROLE DE PERFIL PELA DIRETORIA
function renderGestaoAssociados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let ativos = list.filter(a => a.status === 'ativo');
    ativos.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
    const container = document.getElementById('tableTodosAssociadosBody');
    const isDiretoria = currentUser && currentUser.perfil === 'diretoria';

    if (container) {
        if (ativos.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum associado ativo cadastrado.</td></tr>`;
        } else {
            container.innerHTML = ativos.map(a => {
                const isSelf = a.cpf === currentUser.cpf;
                
                // Se for DIRETORIA, exibe um seletor dropdown para alternar o perfil
                let perfilControl = `<span class="badge badge-${a.perfil === 'diretoria' ? 'warning' : 'info'}">${a.perfil.toUpperCase()}</span>`;
                if (isDiretoria) {
                    perfilControl = `
                        <select class="form-control" style="padding: 4px 8px; font-size: 12px; font-weight: 600; width: 130px; ${a.perfil === 'diretoria' ? 'border-color: var(--accent-gold); color: var(--accent-gold);' : ''}" 
                                ${isSelf ? 'disabled title="Você não pode alterar seu próprio perfil de Diretoria."' : ''} 
                                onchange="alterarPerfilAssociado('${a.cpf}', this.value)">
                            <option value="associado" ${a.perfil === 'associado' ? 'selected' : ''}>ASSOCIADO</option>
                            <option value="diretoria" ${a.perfil === 'diretoria' ? 'selected' : ''}>DIRETORIA</option>
                        </select>
                    `;
                }

                return `
                    <tr>
                        <td><b>${a.nome_guerra || a.nome}</b><br><small style="color:var(--text-muted)">${a.nome}</small></td>
                        <td>${a.cpf}</td>
                        <td>${a.telefone || a.email || '-'}</td>
                        <td>${perfilControl}</td>
                        <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">📋 Ver Ficha Completa</button></td>
                        <td>
                            <div style="display: flex; gap: 6px; justify-content: center;">
                                <button class="btn btn-sm btn-outline" style="color: var(--accent-gold); border-color: var(--accent-gold); font-size: 11px; padding: 2px 8px;" onclick="abrirModalEditarAssociadoDiretoria('${a.cpf}')">✏️ Editar Dados</button>
                                ${!isSelf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C; font-size: 11px; padding: 2px 8px;" onclick="abrirModalDesligar('${a.cpf}')">Desligar</button>` : '<small style="color:var(--text-muted); align-self:center;">Você</small>'}
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// FUNÇÃO PARA ALTERAR O PERFIL DO INTEGRANTE (APENAS DIRETORIA)
function alterarPerfilAssociado(cpf, novoPerfil) {
    if (!currentUser || currentUser.perfil !== 'diretoria') {
        alert('Apenas membros da Diretoria possuem permissão para alterar o perfil de integrantes.');
        renderGestaoAssociados();
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);

    if (item) {
        const perfilAnterior = item.perfil;
        item.perfil = novoPerfil;

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        alert(`Perfil do integrante ${item.nome_guerra || item.nome} alterado com sucesso de ${perfilAnterior.toUpperCase()} para ${novoPerfil.toUpperCase()}.`);
        renderGestaoAssociados();
        renderDiretoriaOverview();
    }
}

// EXIBIR ASSOCIADOS DESLIGADOS
function renderAssociadosDesligados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let desligados = list.filter(a => a.status === 'desligado');
    desligados.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
    const container = document.getElementById('tableAssociadosDesligadosBody');
    if (container) {
        if (desligados.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum associado desligado registrado no sistema.</td></tr>`;
        } else {
            container.innerHTML = desligados.map(d => `
                <tr>
                    <td><b>${d.nome_guerra || d.nome}</b><br><small style="color:var(--text-muted)">${d.nome}</small></td>
                    <td>${d.cpf}</td>
                    <td><small style="color:#FF6B6B;">${d.data_desligamento || '-'}</small></td>
                    <td>
                        <span style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">${d.motivo_desligamento || 'Não especificado'}</span>
                        ${d.carta_desligamento_url ? `
                            <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 8px; color:var(--accent-gold); border-color:var(--accent-gold)" onclick="abrirCartaDesligamento('${d.cpf}')">
                                📄 Ver Carta de Desligamento
                            </button>
                        ` : '<small style="color:#FF6B6B; font-style:italic;">Sem carta anexada</small>'}
                    </td>
                    <td>
                        <button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${d.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#2ECC71; border-color:#2ECC71" onclick="reativarAssociado('${d.cpf}')">Reativar</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="excluirAssociado('${d.cpf}')">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// FICHA COMPLETA DO ASSOCIADO
function verFichaAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) {
        alert('Associado não encontrado.');
        return;
    }

    document.getElementById('fichaNomeTitle').textContent = `Ficha Cadastral: ${a.nome_guerra || a.nome}`;

    const body = document.getElementById('fichaContentBody');
    body.innerHTML = `
        <div style="grid-column: 1 / -1; background-color:#15181C; padding:12px; border-radius:6px; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <div><b>Status do Cadastro:</b> <span class="badge badge-${a.status === 'ativo' ? 'success' : (a.status === 'desligado' ? 'danger' : 'warning')}">${a.status.toUpperCase()}</span></div>
            <div style="font-size:11px; color:var(--text-muted)">Cadastrado em: <b>${a.data_cadastro || '-'}</b></div>
        </div>

        <div><b>Nome de Guerra:</b> ${a.nome_guerra || '-'}</div>
        <div><b>Nome Completo:</b> ${a.nome}</div>
        <div><b>CPF:</b> ${a.cpf}</div>
        <div><b>Data de Nascimento:</b> ${a.data_nascimento || '-'}</div>
        <div><b>Sexo:</b> ${a.sexo || '-'}</div>
        <div><b>Telefone / WhatsApp:</b> ${a.telefone || '-'}</div>
        <div><b>OBM de Lotação:</b> <b style="color: var(--accent-gold);">${a.obm || '-'}</b></div>
        <div><b>Profissão:</b> ${a.profissao || '-'}</div>
        <div><b>Perfil no Portal:</b> <b style="color: var(--accent-gold);">${(a.perfil || 'associado').toUpperCase()}</b></div>
        
        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Filiação:</b></div>
        <div><b>Nome da Mãe:</b> ${a.nome_mae || '-'}</div>
        <div><b>Nome do Pai:</b> ${a.nome_pai || '-'}</div>

        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Endereço Residencial:</b></div>
        <div><b>Logradouro / Rua:</b> ${a.logradouro || '-'}, Nº ${a.numero || '-'}</div>
        <div><b>Complemento:</b> ${a.complemento || 'Nenhum'}</div>
        <div><b>CEP:</b> ${a.cep || '-'}</div>
        <div><b>Bairro:</b> ${a.bairro || '-'}</div>
        <div style="grid-column: 1 / -1;"><b>Cidade:</b> ${a.cidade || '-'}</div>

        ${a.status === 'desligado' ? `
            <div style="grid-column: 1 / -1; margin-top:10px; background-color:rgba(231,76,60,0.15); border:1px solid rgba(231,76,60,0.4); padding:12px; border-radius:6px; color:#FF6B6B;">
                <div><b>Data/Hora do Desligamento:</b> ${a.data_desligamento || '-'}</div>
                <div><b>Motivo do Desligamento:</b> ${a.motivo_desligamento || '-'}</div>
                <div style="margin-top: 8px;">
                    <b>Carta de Desligamento:</b> 
                    ${a.carta_desligamento_url ? `
                        <button class="btn btn-sm btn-gold" style="margin-left: 8px; font-size: 11px;" onclick="abrirCartaDesligamento('${a.cpf}')">
                            📄 Baixar / Visualizar Carta (${a.carta_desligamento_nome || 'Arquivo'})
                        </button>
                    ` : '<i>Nenhuma carta anexada.</i>'}
                </div>
            </div>
        ` : ''}
    `;

    openModal('modalFichaAssociado');
}

// DESLIGAMENTO COM REGISTRO DE MOTIVO, CARTA DE DESLIGAMENTO (OPCIONAL) E DATA/HORA
function abrirModalDesligar(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    document.getElementById('desligarCPF').value = a.cpf;
    document.getElementById('desligarNomeDisplay').value = `${a.nome_guerra || a.nome} (${a.nome}) - CPF: ${a.cpf}`;
    document.getElementById('desligarMotivo').value = '';
    const fileInput = document.getElementById('desligarCartaArquivo');
    if (fileInput) fileInput.value = '';

    openModal('modalDesligarAssociado');
}

function confirmarDesligamento(e) {
    e.preventDefault();
    const cpf = document.getElementById('desligarCPF').value;
    const motivo = document.getElementById('desligarMotivo').value.trim();
    const fileInput = document.getElementById('desligarCartaArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!motivo) {
        alert('Por favor, informe o motivo do desligamento.');
        return;
    }

    const agora = new Date();
    const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const processarSalvarDesligamento = (fileDataUrl = null, fileName = null) => {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'desligado';
            item.data_desligamento = dataHoraDesligamento;
            item.motivo_desligamento = motivo;
            if (fileDataUrl) {
                item.carta_desligamento_url = fileDataUrl;
                item.carta_desligamento_nome = fileName;
            }

            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);

            alert(`Associado ${item.nome_guerra || item.nome} foi desligado com sucesso em ${dataHoraDesligamento}.${fileDataUrl ? '\nA Carta de Desligamento foi salva e registrada no sistema.' : ''}`);
            closeModal('modalDesligarAssociado');
            renderGestaoAssociados();
            renderAssociadosDesligados();
            renderDiretoriaOverview();
        }
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            processarSalvarDesligamento(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    } else {
        processarSalvarDesligamento();
    }
}

// FUNÇÃO PARA ABRIR OU BAIXAR A CARTA DE DESLIGAMENTO
function abrirCartaDesligamento(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a || !a.carta_desligamento_url) {
        alert('Carta de desligamento não encontrada.');
        return;
    }

    // Criar um link temporário para download ou visualização em nova aba
    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Carta de Desligamento - ${a.nome_guerra || a.nome}</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${a.carta_desligamento_url}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    } else {
        const link = document.createElement('a');
        link.href = a.carta_desligamento_url;
        link.download = a.carta_desligamento_nome || `Carta_Desligamento_${a.cpf}.pdf`;
        link.click();
    }
}

function reativarAssociado(cpf) {
    if (confirm('Deseja reativar este associado no sistema? Ele voltará para a lista de Associados Ativos.')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'ativo';
            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);
            alert(`Associado ${item.nome_guerra || item.nome} foi reativado!`);
            renderAssociadosDesligados();
            renderGestaoAssociados();
            renderDiretoriaOverview();
        }
    }
}

function aprovarAssociado(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (item) {
        item.status = 'ativo';
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);
        alert(`Associado ${item.nome} aprovado com sucesso!`);
        renderDiretoriaOverview();
    }
}

function excluirAssociado(cpf) {
    if (confirm('Tem certeza que deseja excluir este associado do sistema? Esta ação é permanente.')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.deleteAssociado(cpf);
        alert('Associado removido com sucesso.');
        renderGestaoAssociados();
        renderAssociadosDesligados();
        renderDiretoriaOverview();
    }
}

// LÓGICA DO ASSOCIADO & GRÁFICOS

let chartBalanceteDoughnut = null;
let chartBalanceteMensalComparativo = null;
let chartMensalidadesPrevistoVsArrecadado = null;

function renderBalancetesAssociado() {
    const selAno = document.getElementById('selAnoTransparencia');
    const ano = selAno ? selAno.value : '2026';

    const lblsAno = document.querySelectorAll('.lblAnoTransparencia');
    lblsAno.forEach(el => el.textContent = ano);

    // 1. Carrega dados de Associados, Financeiro e Grid de Mensalidades para o Ano selecionado
    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = listAssociados.filter(a => a.status === 'ativo' || !a.status);
    const qtdAssociadosAtivos = ativos.length || 1;

    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const gridKey = `acbcsj_mensalidades_grid_${ano}`;
    const grid = JSON.parse(localStorage.getItem(gridKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];

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

    // Calcula mensalidades acumuladas da Grid do Ano por Mês
    mesesInfo.forEach((m, idx) => {
        let somaQuitadaMes = 0;
        grid.forEach(socio => {
            somaQuitadaMes += (parseFloat(socio[m.key]) || 0);
        });
        mensalidadesArrecadadasPorMes[idx] = somaQuitadaMes;

        // Tarifa base vigente para este mês/ano
        const tarifaVigenteMes = getValorMensalidadeVigente(m.index, ano);
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

    // Totais Consolidados do Ano
    const totalReceitasAno = receitasPorMes.reduce((a, b) => a + b, 0);
    const totalDespesasAno = despesasPorMes.reduce((a, b) => a + b, 0);
    const saldoAno = totalReceitasAno - totalDespesasAno;

    const totalPrevistoMensalidadesAno = mensalidadesPrevistasPorMes.reduce((a, b) => a + b, 0);
    const totalArrecadadoMensalidadesAno = mensalidadesArrecadadasPorMes.reduce((a, b) => a + b, 0);
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

    // 2. Renderiza Gráfico 1: Receitas vs Despesas Mês a Mês (Barras)
    const ctxBarComp = document.getElementById('chartBalanceteMensalComparativo');
    if (ctxBarComp && typeof Chart !== 'undefined') {
        if (chartBalanceteMensalComparativo) chartBalanceteMensalComparativo.destroy();
        chartBalanceteMensalComparativo = new Chart(ctxBarComp, {
            type: 'bar',
            data: {
                labels: labelsMeses,
                datasets: [
                    {
                        label: 'Receitas (Entradas)',
                        data: receitasPorMes,
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
        if (chartMensalidadesPrevistoVsArrecadado) chartMensalidadesPrevistoVsArrecadado.destroy();
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
        if (chartBalanceteDoughnut) chartBalanceteDoughnut.destroy();
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
            const rec = receitasPorMes[idx];
            const des = despesasPorMes[idx];
            const mesSaldo = rec - des;
            
            const prevMensal = mensalidadesPrevistasPorMes[idx];
            const arrMensal = mensalidadesArrecadadasPorMes[idx];
            const percMensal = prevMensal > 0 ? Math.round((arrMensal / prevMensal) * 100) : 100;

            return `
                <tr>
                    <td><b>${mIndexStr} - ${mNome} / ${ano}</b></td>
                    <td style="color: #2ECC71; font-weight: 600;">R$ ${rec.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
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

function renderDocumentos() {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const isDiretoria = currentUser && currentUser.perfil === 'diretoria';
    
    // Renderiza botão de inserção de documentos apenas para a Diretoria
    const actionContainer = document.getElementById('headerDocsAction');
    if (actionContainer) {
        if (isDiretoria) {
            actionContainer.innerHTML = `<button class="btn btn-gold" onclick="openModal('modalNovoDocumento')">➕ Inserir Novo Documento</button>`;
        } else {
            actionContainer.innerHTML = '';
        }
    }

    // Filtra documentos: se for associado comum, oculta os restritos à Diretoria
    const docsFiltrados = isDiretoria ? docs : docs.filter(d => d.visibilidade !== 'diretoria');

    const container = document.getElementById('listDocsAssociado');
    if (container) {
        if (docsFiltrados.length === 0) {
            container.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">Nenhum documento disponível no momento.</div>`;
        } else {
            const hoje = new Date().toISOString().split('T')[0];

            container.innerHTML = docsFiltrados.map(d => {
                // Cálculo de Vencimento
                let vencimentoBadge = '';
                if (d.data_vencimento) {
                    const isVencido = d.data_vencimento < hoje;
                    const dataFmt = d.data_vencimento.split('-').reverse().join('/');
                    if (isVencido) {
                        vencimentoBadge = `<span style="color: #E74C3C; font-weight: bold; margin-left: 8px;">⚠️ Vencido em ${dataFmt}</span>`;
                    } else {
                        vencimentoBadge = `<span style="color: var(--text-muted); margin-left: 8px;">📅 Vence em: ${dataFmt}</span>`;
                    }
                } else {
                    vencimentoBadge = `<span style="color: var(--text-muted); margin-left: 8px;">Sem vencimento</span>`;
                }

                // Badge de Visibilidade
                const visibBadge = d.visibilidade === 'diretoria' 
                    ? `<span class="badge badge-warning" style="margin-left: 6px;">🔒 Apenas Diretoria</span>` 
                    : `<span class="badge badge-info" style="margin-left: 6px;">🌐 Todos</span>`;

                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid var(--border-color); flex-wrap:wrap; gap:12px;">
                        <div>
                            <div style="font-size:15px; font-weight:bold; color:var(--text-main);">
                                ${d.titulo}
                                <span class="badge badge-warning" style="margin-left:8px; background:rgba(255,215,0,0.15); color:var(--accent-gold);">${d.categoria || 'Geral'}</span>
                                ${visibBadge}
                            </div>
                            <div style="font-size:12px; margin-top:4px;">
                                <span style="color:var(--text-muted)">Publicado em: ${d.data || '-'}</span>
                                ${vencimentoBadge}
                            </div>
                        </div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap;">
                            <button class="btn btn-sm btn-outline" onclick="abrirDocumento('${d.id}')">📖 Visualizar / Download</button>
                            ${isDiretoria ? `<button class="btn btn-sm btn-outline" style="color:var(--accent-gold); border-color:var(--accent-gold);" onclick="abrirModalEditarDoc('${d.id}')">✏️ Editar Categoria/Acesso</button>` : ''}
                            ${isDiretoria ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C;" onclick="excluirDocumento('${d.id}')">🗑️ Excluir</button>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function abrirModalEditarDoc(id) {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const d = docs.find(item => item.id === id);
    if (!d) return;

    document.getElementById('editDocId').value = d.id;
    document.getElementById('editDocTitulo').value = d.titulo || '';
    document.getElementById('editDocCategoria').value = d.categoria || 'Atas';
    document.getElementById('editDocVisibilidade').value = d.visibilidade || 'todos';
    document.getElementById('editDocDataVencimento').value = d.data_vencimento || '';
    const fileInput = document.getElementById('editDocArquivo');
    if (fileInput) fileInput.value = '';

    openModal('modalEditarDocumento');
}

function salvarEdicaoDocumento(e) {
    e.preventDefault();
    const id = document.getElementById('editDocId').value;
    const titulo = document.getElementById('editDocTitulo').value.trim();
    const categoria = document.getElementById('editDocCategoria').value;
    const visibilidade = document.getElementById('editDocVisibilidade').value;
    const dataVencimento = document.getElementById('editDocDataVencimento').value;
    const fileInput = document.getElementById('editDocArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const index = docs.findIndex(d => d.id === id);
    if (index >= 0) {
        docs[index].titulo = titulo;
        docs[index].categoria = categoria;
        docs[index].visibilidade = visibilidade;
        docs[index].data_vencimento = dataVencimento || null;

        const concluirSalvar = () => {
            try {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
            } catch (err) {
                console.warn('Salvo com metadados no sistema.');
            }
            try {
                dbService.saveDocumento(docs[index]);
            } catch (e) {
                console.warn('Erro ao salvar no banco:', e);
            }
            alert('Documento e permissões atualizados com sucesso!');
            closeModal('modalEditarDocumento');
            renderDocumentos();
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = async function (event) {
                const fileDataUrl = event.target.result;
                docs[index].arquivo_nome = file.name;
                docs[index].link = null; // Mantém nulo no localStorage para evitar estouro da quota de 5MB
                await idbStorage.setFile(id, fileDataUrl);
                concluirSalvar();
            };
            reader.readAsDataURL(file);
        } else {
            concluirSalvar();
        }
    }
}

function salvarNovoDocumento(e) {
    e.preventDefault();
    const titulo = document.getElementById('docTitulo').value.trim();
    const categoria = document.getElementById('docCategoria').value;
    const visibilidade = document.getElementById('docVisibilidade').value;
    const dataVencimento = document.getElementById('docDataVencimento').value;
    const fileInput = document.getElementById('docArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!titulo || !categoria || !file) {
        alert('Por favor, preencha o título, selecione a categoria e anexe o arquivo do documento.');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Salvando...';
    }

    const docId = 'doc_' + Date.now();
    const reader = new FileReader();
    reader.onload = async function (event) {
        const fileDataUrl = event.target.result;
        const fileName = file.name;

        // Salva o arquivo pesado no IndexedDB sem limites do localStorage
        await idbStorage.setFile(docId, fileDataUrl);

        let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        const novoDoc = {
            id: docId,
            titulo: titulo,
            categoria: categoria,
            visibilidade: visibilidade,
            data_vencimento: dataVencimento || null,
            data: new Date().toLocaleDateString('pt-BR'),
            link: null, // Conteúdo do arquivo salvo no IndexedDB
            arquivo_nome: fileName
        };

        docs.unshift(novoDoc);

        try {
            localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
        } catch (err) {
            console.warn('Metadados salvos');
        }

        try {
            dbService.saveDocumento(novoDoc);
        } catch (e) {
            console.warn('Erro ao salvar no banco:', e);
        }

        alert(`Documento "${titulo}" publicado com sucesso!`);
        e.target.reset();
        closeModal('modalNovoDocumento');
        renderDocumentos();

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publicar Documento';
        }
    };

    reader.readAsDataURL(file);
}

async function abrirDocumento(id) {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const doc = docs.find(d => d.id === id);
    if (!doc) {
        alert('Documento não encontrado.');
        return;
    }

    let fileContent = doc.link;
    if (!fileContent) {
        fileContent = await idbStorage.getFile(id);
    }

    if (!fileContent) {
        alert('Arquivo do documento não disponível para visualização.');
        return;
    }

    if (fileContent.startsWith('data:')) {
        const win = window.open();
        if (win) {
            win.document.write(`
                <html>
                    <head><title>${doc.titulo} - ACBCSJ</title></head>
                    <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                        <iframe src="${fileContent}" style="width:100%; height:100vh; border:none;"></iframe>
                    </body>
                </html>
            `);
        } else {
            const a = document.createElement('a');
            a.href = fileContent;
            a.download = doc.arquivo_nome || `${doc.titulo}.pdf`;
            a.click();
        }
    } else {
        window.open(fileContent, '_blank');
    }
}

async function excluirDocumento(id) {
    if (confirm('Deseja realmente excluir este documento do repositório?')) {
        let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        docs = docs.filter(d => d.id !== id);
        try {
            localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
        } catch (err) {}
        await idbStorage.deleteFile(id);
        alert('Documento excluído com sucesso.');
        renderDocumentos();
    }
}


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

    alert(`Comunicado "${assunto}" encaminhado com sucesso para ${resumoDestinatarios}!`);
    closeModal('modalEnviarComunicado');
    alternarAbaMensagensDiretoria('enviadas');
}

function excluirComunicadoEnviado(id) {
    if (confirm('Deseja realmente remover este comunicado enviado?')) {
        let comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        comunicados = comunicados.filter(c => c.id !== id);
        localStorage.setItem('acbcsj_comunicados_enviados', JSON.stringify(comunicados));
        alert('Comunicado removido.');
        renderMensagensDiretoria();
    }
}

// PRÉ-CADASTRO E ENVIOS
function toggleSemPai(checkbox) {
    const inputPai = document.getElementById('regNomePai');
    if (checkbox.checked) {
        inputPai.value = 'Sem registro paterno / Não declarado';
        inputPai.disabled = true;
    } else {
        inputPai.value = '';
        inputPai.disabled = false;
    }
}

function submitPreCadastro(e) {
    e.preventDefault();
    
    // Captura da Data e Hora Exata do Cadastro gerada pelo Sistema
    const agora = new Date();
    const dataHoraCadastro = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Captura dos campos na ordem exigida
    const nomeGuerra = document.getElementById('regNomeGuerra').value.trim();
    const nomeCompleto = document.getElementById('regNomeCompleto').value.trim();
    const dataNascimento = document.getElementById('regDataNascimento').value;
    const cpf = document.getElementById('regCPF').value.trim();
    const nomeMae = document.getElementById('regNomeMae').value.trim();
    const semPai = document.getElementById('regSemPai').checked;
    const nomePai = semPai ? 'Sem registro paterno / Não declarado' : (document.getElementById('regNomePai').value.trim() || 'Não declarado');
    const sexo = document.getElementById('regSexo').value;
    const telefone = document.getElementById('regTelefone').value.trim();
    const obm = document.getElementById('regOBM').value;
    const profissao = document.getElementById('regProfissao').value.trim();
    const logradouro = document.getElementById('regLogradouro').value.trim();
    const numero = document.getElementById('regNumero').value.trim();
    const complemento = document.getElementById('regComplemento').value.trim();
    const cep = document.getElementById('regCEP').value.trim();
    const bairro = document.getElementById('regBairro').value.trim();
    const cidade = document.getElementById('regCidade').value.trim();
    const termoAceito = document.getElementById('regTermoAceito').checked;

    if (!obm) {
        alert('Por favor, selecione a OBM de Lotação.');
        return;
    }

    if (!profissao) {
        alert('Por favor, preencha o campo Profissão.');
        return;
    }

    if (!termoAceito) {
        alert('Você precisa aceitar os Termos de Responsabilidade para enviar a solicitação.');
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (list.find(a => a.cpf === cpf)) {
        alert('Este CPF já possui uma solicitação ou cadastro ativo no sistema da ACBCSJ.');
        return;
    }

    // Geração automática de senha: os 4 primeiros dígitos numéricos do CPF
    const apenasNumerosCPF = cpf.replace(/\D/g, '');
    const senhaAutomatica = apenasNumerosCPF.substring(0, 4);

    const novoAssociado = {
        id: Date.now().toString(),
        cpf: cpf,
        senha: senhaAutomatica,
        nome_guerra: nomeGuerra,
        nome: nomeCompleto,
        data_nascimento: dataNascimento,
        nome_mae: nomeMae,
        nome_pai: nomePai,
        sexo: sexo,
        telefone: telefone,
        obm: obm,
        profissao: profissao,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        cep: cep,
        bairro: bairro,
        cidade: cidade,
        perfil: 'associado',
        status: 'pendente',
        data_cadastro: dataHoraCadastro
    };

    list.push(novoAssociado);
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));
    dbService.saveAssociado(novoAssociado);

    alert(`Solicitação de cadastro de ${nomeGuerra} (${nomeCompleto}) enviada com sucesso em ${dataHoraCadastro}!\n\n⚠️ O acesso estará BLOQUEADO até a APROVAÇÃO pela Diretoria.\n🔑 Após a aprovação, sua senha de acesso será os 4 primeiros dígitos do seu CPF (${senhaAutomatica}).`);
    e.target.reset();
    if (document.getElementById('regSemPai')) {
        document.getElementById('regSemPai').checked = false;
        document.getElementById('regNomePai').disabled = false;
    }
    closeModal('modalPreCadastro');
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }




// ==========================================
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
            dbService.addFinanceiro(novoLancamento);
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

function extrairMesEAno(dataStr, dataIso, dataPagamento) {
    let str = dataIso || dataStr || dataPagamento || '';
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
    const listMensalidadesRaw = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const listMensalidades = listMensalidadesRaw.map(m => typeof sanitizeMensalidade === 'function' ? sanitizeMensalidade(m) : m).filter(Boolean);

    const filtroAnoSelect = document.getElementById('finFiltroAno');
    const anoSelected = filtroAnoSelect ? filtroAnoSelect.value : '2026';

    const filtroMesSelect = document.getElementById('finFiltroMes');
    const mesSelected = filtroMesSelect ? filtroMesSelect.value : 'todos';

    const filtroTipoSelect = document.getElementById('finFiltroTipo');
    const filtroTipo = filtroTipoSelect ? filtroTipoSelect.value : 'todos';

    // Atualiza rótulos de ano no DOM
    document.querySelectorAll('.lblAnoFinanceiro').forEach(el => el.textContent = anoSelected);

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    const storageKeyGrid = `acbcsj_mensalidades_grid_${anoSelected}`;
    const gridMensalidades = JSON.parse(localStorage.getItem(storageKeyGrid)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];

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
            tipo: item.tipo || 'despesa', // receita ou despesa
            valor: parseFloat(item.valor) || 0,
            comprovante_nome: item.comprovante_nome || '',
            origem: 'financeiro'
        });
    });

    // B) LanÃ§amentos de Mensalidades PIX
    listMensalidades.forEach(m => {
        const dateInfo = extrairMesEAno(m.data, m.data_iso, m.data_pagamento);
        const anoItem = m.ano || dateInfo.ano || anoSelected;
        let val = typeof m.valor === 'number' ? m.valor : (parseFloat(String(m.valor).replace(',', '.')) || 0);
        const nomeSoc = m.associado_nome || m.nome || 'Associado';
        const mesRef = m.meses_quitados || m.mes_referencia || '';
        combinedList.push({
            id: m.id || ('mens_' + Math.random()),
            data: m.data || m.data_pagamento || '-',
            data_iso: m.data_iso || '',
            mes: dateInfo.mes,
            ano: String(anoItem),
            descricao: `💳 Mensalidade PIX — ${nomeSoc} (${mesRef}/${anoItem})`,
            categoria: 'Mensalidades Associados',
            tipo: 'receita',
            valor: val,
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
        const mKey = mesesKeys[i - 1];

        // Sum Receitas Gerais (excluindo mensalidades)
        let recsGerais = combinedList
            .filter(item => item.origem === 'financeiro' && item.tipo === 'receita' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

                // Sum Mensalidades PIX (do histÃ³rico real de baixas de mensalidade efetuadas)
        let mensPix = combinedList
            .filter(item => item.origem === 'mensalidade' && item.ano === anoSelected && item.mes === strMes)
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

    const list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const storageKeyGrid = `acbcsj_mensalidades_grid_${anoStr}`;
    const gridMensalidades = JSON.parse(localStorage.getItem(storageKeyGrid)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const mKey = mesesKeys[mesIndex - 1];

    // Receitas e Despesas do mês usando o parser universal de datas
    const lancamentosMes = list.filter(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        return dateInfo.mes === strMes && (dateInfo.ano === anoStr || !dateInfo.ano);
    });

    const receitasGerais = lancamentosMes.filter(i => i.tipo === 'receita');
    const despesasGerais = lancamentosMes.filter(i => i.tipo === 'despesa');

    const totalRecsGerais = receitasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);
    const totalMensalidades = gridMensalidades.reduce((s, g) => s + (parseFloat(g[mKey]) || 0), 0);
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
                        <td>Total Arrecadado na Grade de Mensalidades (${nomeMes}/${anoStr})</td>
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

function _old_unused_renderAssociadoOverview() {
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome && currentUser) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }

    // Renderiza resumo dos dados cadastrais pessoais do usuário
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

    // Renderiza Comunicados da Diretoria destinados ao usuário atual (Todos, Individual ou Seleção)
    const comunicadosContainer = document.getElementById('containerMeusComunicadosDiretoria');
    if (comunicadosContainer && currentUser) {
        const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        const meusComunicados = comunicadosAll.filter(c => {
            if (c.destinatario_tipo === 'todos' || (c.destinatarios_cpfs && c.destinatarios_cpfs.includes('TODOS'))) return true;
            if (c.destinatarios_cpfs && c.destinatarios_cpfs.includes(currentUser.cpf)) return true;
            return false;
        });

        if (meusComunicados.length === 0) {
            comunicadosContainer.innerHTML = `
                <p style="font-size: 13px; color: var(--text-muted); margin: 0; padding: 10px 0;">Nenhum comunicado ou aviso recente da Diretoria.</p>
            `;
        } else {
            comunicadosContainer.innerHTML = meusComunicados.map(c => {
                let badgePrio = '<span class="badge badge-info" style="font-size: 10px;">🟢 Informativo</span>';
                if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning" style="font-size: 10px;">🟡 Importante</span>';
                if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger" style="font-size: 10px;">🔴 Urgente</span>';

                return `
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="color: var(--accent-gold); font-size: 14px;">${c.assunto}</b>
                                ${badgePrio}
                            </div>
                            <small style="color: var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                        </div>
                        <p style="font-size: 13px; color: var(--text-color); margin: 6px 0 0 0; white-space: pre-wrap;">${c.mensagem}</p>
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px; text-align: right;">
                            Enviado por: <b>${c.remetente_nome || 'Diretoria ACBCSJ'}</b>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    const grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (!container || !currentUser) return;

    const socio = grid.find(s => {
        const ng = (typeof s.nome_guerra === 'string' ? s.nome_guerra : (Array.isArray(s.nome_guerra) ? '' : String(s.nome_guerra || ''))).toLowerCase();
        const nc = (typeof s.nome_completo === 'string' ? s.nome_completo : (Array.isArray(s.nome_completo) ? '' : String(s.nome_completo || ''))).toLowerCase();
        const userNg = (typeof currentUser.nome_guerra === 'string' ? currentUser.nome_guerra : (Array.isArray(currentUser.nome_guerra) ? '' : String(currentUser.nome_guerra || ''))).toLowerCase();
        const userNc = (typeof currentUser.nome === 'string' ? currentUser.nome : (Array.isArray(currentUser.nome) ? '' : String(currentUser.nome || ''))).toLowerCase();
        return (ng && userNg && ng === userNg) || (nc && userNc && nc === userNc) || (userNc && nc && nc.includes(userNc));
    }) || grid[0];

    const mesesNomes = [
        { key: 'jan', nome: 'Janeiro 2026' },
        { key: 'fev', nome: 'Fevereiro 2026' },
        { key: 'mar', nome: 'Março 2026' },
        { key: 'abr', nome: 'Abril 2026' },
        { key: 'mai', nome: 'Maio 2026' },
        { key: 'jun', nome: 'Junho 2026' },
        { key: 'jul', nome: 'Julho 2026' },
        { key: 'ago', nome: 'Agosto 2026' },
        { key: 'set', nome: 'Setembro 2026' },
        { key: 'out', nome: 'Outubro 2026' },
        { key: 'nov', nome: 'Novembro 2026' },
        { key: 'dez', nome: 'Dezembro 2026' }
    ];

    container.innerHTML = mesesNomes.map(m => {
        const val = socio ? (parseFloat(socio[m.key]) || 0) : 0;
        const pago = val > 0;
        return `
            <tr>
                <td><b>${m.nome}</b></td>
                <td style="font-weight: 700; color: ${pago ? '#2ECC71' : 'var(--text-muted)'};">
                    R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span class="badge badge-${pago ? 'success' : 'warning'}">
                        ${pago ? '✅ PAGO / BAIXADO' : '⏳ EM ABERTO / PENDENTE'}
                    </span>
            </tr>
        `;
    }).join('');
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

// GESTÃO HISTÓRICA DO VALOR BASE DA MENSALIDADE COM DATA DE VIGÊNCIA
function getHistoricoReajustesMensalidade() {
    let historico = JSON.parse(localStorage.getItem('acbcsj_historico_reajustes_mensalidade'));
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

// HELPER PARA FORMATAR E EXTRAIR DATA DE INGRESSO/CADASTRO DO ASSOCIADO
function parseDataCadastro(dataStr) {
    if (!dataStr) return null;
    const strClean = String(dataStr).trim();
    if (!strClean) return null;

    const datePart = strClean.split(' ')[0].trim();
    if (!datePart) return null;

    const parts = datePart.split(/[/-]/);
    if (parts.length < 3) return null;

    let p1 = parseInt(parts[0], 10);
    let p2 = parseInt(parts[1], 10);
    let y = parseInt(parts[2], 10);

    if (isNaN(y) || isNaN(p1) || isNaN(p2)) return null;

    let day, month;
    if (p1 > 12) {
        day = p1;
        month = p2;
    } else if (p2 > 12) {
        day = p2;
        month = p1;
    } else {
        day = p1;
        month = p2;
    }

    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(month).padStart(2, '0');

    return {
        formatted: `${dayStr}/${monthStr}/${y}`,
        year: y,
        month: month,
        day: day
    };
}

function isMesAnteriorAoIngresso(mesIndex, anoStr, dataCadastroStr) {
    const ingresso = parseDataCadastro(dataCadastroStr);
    if (!ingresso) return false;

    const anoNum = parseInt(anoStr, 10);
    if (isNaN(anoNum)) return false;

    if (anoNum < ingresso.year) return true;
    if (anoNum === ingresso.year && mesIndex < ingresso.month) return true;

    return false;
}

// CÁLCULO DE VENCIMENTO DIA 15 E STATUS DE MENSALIDADE
function calcularStatusMensalidade(mesIndex, anoStr, valorPago, dataCadastroStr = null) {
    const valor = parseFloat(valorPago) || 0;
    const baseVal = getValorMensalidadeVigente(mesIndex, anoStr);
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtualNum = hoje.getMonth() + 1; // 1 a 12
    const diaAtual = hoje.getDate(); // 1 a 31

    const anoNum = parseInt(anoStr, 10);
    const dataVencimentoStr = `15/${String(mesIndex).padStart(2, '0')}/${anoNum}`;

    const ingressoInfo = parseDataCadastro(dataCadastroStr);
    const eAnteriorAoIngresso = isMesAnteriorAoIngresso(mesIndex, anoStr, dataCadastroStr);

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
        const isV = !eAnteriorAoIngresso && (anoNum < anoAtual || (anoNum === anoAtual && (mesIndex < mesAtualNum || (mesIndex === mesAtualNum && diaAtual > 15))));
        return {
            status: 'parcial',
            badge: `<span class="badge badge-warning" style="font-size:10px; padding:2px 4px;">⚠️ R$ ${valor.toFixed(2).replace('.', ',')}</span>`,
            vencimento: dataVencimentoStr,
            isVencido: isV,
            debitAmount: isV ? falta : 0
        };
    } else {
        if (eAnteriorAoIngresso) {
            const dateTip = ingressoInfo ? `Anterior à data de ingresso (${ingressoInfo.formatted})` : 'Anterior ao ingresso';
            return {
                status: 'anterior_ingresso',
                badge: `<span class="badge badge-secondary" style="font-size:10px; padding:2px 4px; opacity:0.6; background:#34495e; color:#bdc3c7;" title="${dateTip}">⚪ Isento</span>`,
                vencimento: dataVencimentoStr,
                isVencido: false,
                debitAmount: 0
            };
        }

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

// RENDERIZAR PAINEL DO ASSOCIADO (VISÃO GERAL, MENSAGENS E MENSALIDADES)
function renderAssociadoOverview() {
    if (!currentUser) return;

    const btnPedirDeslig = document.getElementById('btnPedirDesligamentoAssociado');
    if (btnPedirDeslig) {
        if (currentUser.status === 'pendente_desligamento') {
            btnPedirDeslig.textContent = 'â³ Desligamento em AnÃ¡lise';
            btnPedirDeslig.style.background = '#F39C12';
        } else {
            btnPedirDeslig.textContent = 'Pedir Desligamento';
            btnPedirDeslig.style.background = '#E74C3C';
        }
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
        const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
        const lidos = getComunicadosLidosUsuario();

        const meusComunicados = comunicadosAll.filter(c => {
            if (c.destinatario_tipo === 'todos') return true;
            if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
                if (c.destinatarios_cpfs.includes('TODOS')) return true;
                return c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf);
            }
            return false;
        });

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
        grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
    }

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
        const tarifaVigente = getValorMensalidadeVigente(m.index, ano);
        totalPagoAno += valPago;

        const info = calcularStatusMensalidade(m.index, ano, valPago);
        if (info.isVencido) {
            temDebitoVencido = true;
            totalDebitosPendente += info.debitAmount;
        }

        let badgeStatus = '';
        if (info.status === 'pago') {
            badgeStatus = `<span class="badge badge-success" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">✅ QUITADO / EM DIA</span>`;
        } else if (info.status === 'parcial') {
            badgeStatus = `<span class="badge badge-warning" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">⚠️ PAGO PARCIAL (Falta R$ ${info.debitAmount.toFixed(2).replace('.', ',')})</span>`;
        } else if (info.isVencido) {
            badgeStatus = `<span class="badge badge-danger" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">🔴 VENCIDO (Inadimplente)</span>`;
        } else {
            badgeStatus = `<span style="color: var(--text-muted); font-size: 12px; font-weight: 500;">⏳ A VENCER</span>`;
        }

        return `
            <tr>
                <td><b style="color: var(--text-color);">${m.index < 10 ? '0' + m.index : m.index} - ${m.nome} / ${ano}</b></td>
                <td><span style="font-size: 12px; font-weight: 600; color: var(--accent-gold);">${info.vencimento}</span></td>
                <td>R$ ${tarifaVigente.toFixed(2).replace('.', ',')}</td>
                <td style="font-weight: 700; color: ${valPago >= tarifaVigente ? '#2ECC71' : (valPago > 0 ? '#F39C12' : 'var(--text-muted)')};">
                    R$ ${valPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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

function renderComunicadosHistoricoAssociado() {
    if (!currentUser) return;
    const container = document.getElementById('containerHistoricoComunicadosAssociado');
    if (!container) return;

    const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const lidos = getComunicadosLidosUsuario();

    const termoBusca = (document.getElementById('filtroTextoComunicadosAssociado')?.value || '').toLowerCase().trim();

    let meusComunicados = comunicadosAll.filter(c => {
        if (c.destinatario_tipo === 'todos') return true;
        if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
            if (c.destinatarios_cpfs.includes('TODOS')) return true;
            return c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf);
        }
        return false;
    });

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
    recalcularTodasGridsMensalidades(false);
    const selAno = document.getElementById('selAnoMensalidades');
    const ano = selAno ? selAno.value : '2026';

    const infoVigencia = getInfoVigenciaMensalidadeAtual();
    const elBaseVal = document.getElementById('metricValorMensalidadeVigente');
    if (elBaseVal) elBaseVal.textContent = `R$ ${infoVigencia.valor.toFixed(2).replace('.', ',')}`;

    const lbls = document.querySelectorAll('.lblAnoMensalidadeMetrica');
    lbls.forEach(el => el.textContent = ano);

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (!list || list.length === 0) {
        if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados && MOCK_DATA_INITIAL.associados.length > 0) {
            list = MOCK_DATA_INITIAL.associados;
        } else if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' && ASSOCIADOS_PLANILHA_REAL.length > 0) {
            list = ASSOCIADOS_PLANILHA_REAL;
        }
        if (list && list.length > 0) {
            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        }
    }
    let ativos = list.filter(a => a.status === 'ativo' || !a.status);
    ativos.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));

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
            return gCpf && sCpf && gCpf === sCpf;
        }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

        let totalPagoSocio = 0;
        let mesesDevidos = 0;

        mesesKeys.forEach((key, index) => {
            const val = parseFloat(itemGrid[key]) || 0;
            totalPagoSocio += val;
            totalArrecadadoAno += val;

            const st = calcularStatusMensalidade(index + 1, ano, val, socio.data_cadastro);
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

    associadosProcessados.sort((a, b) => (a.nome_guerra || a.nome || '').localeCompare(b.nome_guerra || b.nome || '', 'pt-BR', { sensitivity: 'base' }));
    const container = document.getElementById('tableGestaoMensalidadesBody');
    if (container) {
        if (associadosProcessados.length === 0) {
            container.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum associado encontrado para os filtros selecionados.</td></tr>`;
        } else {
            container.innerHTML = associadosProcessados.map(a => {
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(a.gridData[k]) || 0;
                    const info = calcularStatusMensalidade(idx + 1, ano, val, a.data_cadastro);
                    return `<td>${info.badge}</td>`;
                }).join('');

                const statusBadge = a.isEmDia 
                    ? `<span class="badge badge-success" style="font-size:11px; padding: 4px 8px; background:#2ECC71; color:#fff; font-weight:bold;">🟢 EM DIA</span>` 
                    : `<span class="badge badge-danger" style="font-size:11px; padding: 4px 8px; background:#E74C3C; color:#fff; font-weight:bold;" title="${a.mesesDevidos} mês(es) em atraso">🔴 INADIMPLENTE (${a.mesesDevidos})</span>`;

                return `
                    <tr>
                        <td style="text-align: left;">
                            <b>${a.nome_guerra || a.nome}</b><br>
                            <small style="color: var(--text-muted);">${a.cpf}</small><br>
                            <small style="color: var(--accent-gold); font-size: 10px;" title="Data de Ingresso do Associado">Ingresso: ${parseDataCadastro(a.data_cadastro)?.formatted || (a.data_cadastro ? a.data_cadastro.split(' ')[0] : '-')}</small>
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
                    const info = calcularStatusMensalidade(idx + 1, ano, val, socio.data_cadastro);
                    return `<td>${info.badge}</td>`;
                }).join('');

                const dataDeslig = socio.data_desligamento || 'Data não registrada';

                return `
                    <tr style="background: rgba(231, 76, 60, 0.05);">
                        <td style="text-align: left;">
                            <b>${socio.nome_guerra || socio.nome}</b><br>
                            <small style="color: var(--text-muted);">${socio.cpf}</small><br>
                            <small style="color: var(--accent-gold); font-size: 10px;" title="Data de Ingresso do Associado">📅 Ingresso: ${parseDataCadastro(socio.data_cadastro)?.formatted || (socio.data_cadastro ? socio.data_cadastro.split(' ')[0] : '-')}</small><br>
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
    recalcularTodasGridsMensalidades();
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

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const socioObj = listAssociados.find(a => a.cpf === cpf);

    const storageKey = `acbcsj_mensalidades_grid_${anoRef}`;
    const grid = JSON.parse(localStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    
    const cleanCpf = (cpf || '').replace(/\D/g, '');

    const socioGrid = grid.find(g => {
        const gCpf = (g.cpf || '').replace(/\D/g, '');
        if (gCpf && cleanCpf && gCpf === cleanCpf) return true;
        if (socioObj) {
            const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
            const sNg = (typeof socioObj.nome_guerra === 'string' ? socioObj.nome_guerra : '').toLowerCase();
            const sNc = (typeof socioObj.nome === 'string' ? socioObj.nome : '').toLowerCase();
            return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
        }
        return false;
    }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };

    let primeiroPendenteCb = null;

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
            if (!primeiroPendenteCb) primeiroPendenteCb = cb;
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

    // Auto-seleciona o primeiro mês pendente para que o usuário não veja Valor Total R$ 0,00 por padrão
    if (primeiroPendenteCb) {
        primeiroPendenteCb.checked = true;
    }

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

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
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

        if (typeof dbService !== 'undefined' && dbService.addMensalidade) {
        try { await dbService.addMensalidade(itemHistorico); } catch(e) { console.error('Erro ao enviar para Supabase:', e); }
    }
    recalcularGridAssociado(cpf, anoRef);

    alert(`Baixa de mensalidade de R$ ${valorTotal.toFixed(2).replace('.', ',')} (${mesesTexto}/${anoRef}) efetuada com sucesso para ${nomeAssociado}!`);
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
                    <div style="font-size: 11px; color: var(--text-muted);">${a.nome}</div><div style="font-size: 11px; color: var(--accent-gold); margin-top: 2px;">Ingresso: <b>${parseDataCadastro(a.data_cadastro)?.formatted || (a.data_cadastro ? a.data_cadastro.split(' ')[0] : '-')}</b></div>
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

    if (ano === '2026') {
        const basePlanilha = (INITIAL_MENSAL_DATA || []).find(b => (b.cpf || '').replace(/\D/g, '') === cleanCpf);
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


// SOLICITAÃ‡ÃƒO E HOMOLOGAÃ‡ÃƒO DE DESLIGAMENTO VOLUNTÃRIO
function abrirModalPedirDesligamento() {
    if (!currentUser) return;
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const me = list.find(a => (a.cpf || '').replace(/\D/g, '') === (currentUser.cpf || '').replace(/\D/g, '')) || currentUser;

    if (me.status === 'pendente_desligamento') {
        alert(`Sua solicitaÃ§Ã£o de desligamento jÃ¡ foi enviada em ${me.data_solicitacao_desligamento || 'data recente'} e estÃ¡ aguardando a homologaÃ§Ã£o e aprovaÃ§Ã£o da Diretoria.`);
        return;
    }

    if (me.status === 'desligado') {
        alert('Seu cadastro jÃ¡ se encontra registrado como desligado da associaÃ§Ã£o.');
        return;
    }

    document.getElementById('pedirDesligNomeDisplay').textContent = me.nome || me.nome_guerra;
    document.getElementById('pedirDesligCPFDisplay').textContent = me.cpf;
    document.getElementById('pedirDesligOBMDisplay').textContent = me.obm || 'SÃ£o JosÃ©';

    const hojeStr = new Date().toLocaleDateString('pt-BR');
    const modeloTexto = `TERMO E SOLICITAÃ‡ÃƒO DE DESLIGAMENTO VOLUNTÃRIO DA ACBCSJ\n\n` +
        `Eu, ${me.nome}, portador(a) do CPF nÂº ${me.cpf}, Bombeiro(a) ComunitÃ¡rio(a) integrante da OBM de ${me.obm || 'SÃ£o JosÃ©'}, venho por meio desta solicitar formalmente o meu DESLIGAMENTO VOLUNTÃRIO do quadro de associados da AssociaÃ§Ã£o dos Bombeiros ComunitÃ¡rios de SÃ£o JosÃ© (ACBCSJ).\n\n` +
        `Declaro estar ciente de que, apÃ³s a homologaÃ§Ã£o deste pedido pela Diretoria, cessarÃ£o todos os meus direitos e deveres estatutÃ¡rios referentes Ã  ACBCSJ.\n\n` +
        `SÃ£o JosÃ©/SC, ${hojeStr}.\n\n` +
        `____________________________________________________\n` +
        `Assinatura do(a) Associado(a)`;

    document.getElementById('pedirDesligTextoModelo').value = modeloTexto;
    document.getElementById('pedirDesligMotivo').value = '';
    const fileInp = document.getElementById('pedirDesligArquivo');
    if (fileInp) fileInp.value = '';
    const checkInp = document.getElementById('pedirDesligCheck');
    if (checkInp) checkInp.checked = false;

    openModal('modalPedirDesligamento');
}

function gerarEImprimirCartaDesligamento() {
    if (!currentUser) return;
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const me = list.find(a => (a.cpf || '').replace(/\D/g, '') === (currentUser.cpf || '').replace(/\D/g, '')) || currentUser;
    const hojeStr = new Date().toLocaleDateString('pt-BR');

    const win = window.open('', '_blank');
    if (win) {
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Carta de Desligamento VoluntÃ¡rio - ${me.nome_guerra || me.nome}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; color: #000; line-height: 1.6; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 30px; }
                    .header h2 { margin: 0; font-size: 18px; text-transform: uppercase; }
                    .header p { margin: 4px 0 0 0; font-size: 13px; color: #444; }
                    .title { text-align: center; margin: 30px 0; font-size: 16px; font-weight: bold; text-decoration: underline; }
                    .content { text-align: justify; font-size: 14px; margin-bottom: 40px; text-indent: 30px; }
                    .signature-section { margin-top: 60px; text-align: center; }
                    .signature-line { width: 350px; margin: 0 auto; border-top: 1px solid #000; padding-top: 5px; font-size: 13px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>AssociaÃ§Ã£o dos Bombeiros ComunitÃ¡rios de SÃ£o JosÃ© - ACBCSJ</h2>
                    <p>CNPJ: 46.128.369/0001-79 | SÃ£o JosÃ© - SC</p>
                </div>

                <div class="title">TERMO E SOLICITAÃ‡ÃƒO DE DESLIGAMENTO VOLUNTÃRIO</div>

                <div class="content">
                    <p>Eu, <b>${me.nome}</b>, inscrito(a) no CPF sob o nÂº <b>${me.cpf}</b>, Bombeiro(a) ComunitÃ¡rio(a) lotado(a) na OBM de <b>${me.obm || 'SÃ£o JosÃ©'}</b>, venho por meio desta solicitar formalmente o meu <b>DESLIGAMENTO VOLUNTÃRIO</b> do quadro de associados da AssociaÃ§Ã£o dos Bombeiros ComunitÃ¡rios de SÃ£o JosÃ© (ACBCSJ).</p>

                    <p>Declaro estar ciente de que, apÃ³s a apreciaÃ§Ã£o e homologaÃ§Ã£o deste pedido pela Diretoria da AssociaÃ§Ã£o, cessarÃ£o todos os meus direitos e deveres estatutÃ¡rios, bem como o desconto ou cobranÃ§a de contribuiÃ§Ãµes associativas mensais.</p>

                    <p style="text-align: right; margin-top: 30px;">SÃ£o JosÃ©/SC, ${hojeStr}.</p>
                </div>

                <div class="signature-section">
                    <div class="signature-line">
                        <b>${me.nome}</b><br>
                        CPF: ${me.cpf}
                    </div>
                </div>

                <script>
                    window.onload = function() { window.print(); };
                </script>
            </body>
            </html>
        `);
    } else {
        alert('A janela de impressÃ£o foi bloqueada pelo navegador. Permita pop-ups para imprimir a carta.');
    }
}

function confirmarPedidoDesligamento(e) {
    e.preventDefault();
    if (!currentUser) return;
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');

    const fileInp = document.getElementById('pedirDesligArquivo');
    const file = fileInp && fileInp.files ? fileInp.files[0] : null;
    const motivo = (document.getElementById('pedirDesligMotivo')?.value || '').trim();

    if (!file) {
        alert('Por favor, anexe a carta de desligamento assinada para prosseguir.');
        return;
    }

    const agora = new Date();
    const dataHoraSolicitacao = agora.toLocaleDateString('pt-BR') + ' Ã s ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const concluirSolicitacao = (fileDataUrl, fileName) => {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanUserCpf);

        if (item) {
            item.status = 'pendente_desligamento';
            item.data_solicitacao_desligamento = dataHoraSolicitacao;
            item.motivo_desligamento = motivo || 'SolicitaÃ§Ã£o voluntÃ¡ria do associado';
            item.carta_desligamento_url = fileDataUrl;
            item.carta_desligamento_nome = fileName;

            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);

            currentUser.status = 'pendente_desligamento';
            currentUser.data_solicitacao_desligamento = dataHoraSolicitacao;
            sessionStorage.setItem('acbcsj_current_user', JSON.stringify(currentUser));

            alert(`Sua solicitaÃ§Ã£o de desligamento voluntÃ¡rio foi enviada com sucesso em ${dataHoraSolicitacao}!\n\nðŸ“„ A carta assinada (${fileName}) foi registrada no sistema e o pedido foi encaminhado para aprovaÃ§Ã£o e homologaÃ§Ã£o da Diretoria.`);
            closeModal('modalPedirDesligamento');
            renderAssociadoOverview();
            renderDiretoriaOverview();
        }
    };

    const reader = new FileReader();
    reader.onload = function (event) {
        concluirSolicitacao(event.target.result, file.name);
    };
    reader.readAsDataURL(file);
}

function homologarDesligamentoDiretoria(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf || (a.cpf || '').replace(/\D/g, '') === (cpf || '').replace(/\D/g, ''));
    if (!item) return;

    if (confirm(`Confirma a homologaÃ§Ã£o e aprovaÃ§Ã£o do desligamento do(a) associado(a) ${item.nome_guerra || item.nome}?`)) {
        const agora = new Date();
        const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' Ã s ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        item.status = 'desligado';
        item.data_desligamento = dataHoraDesligamento;

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        alert(`O desligamento de ${item.nome_guerra || item.nome} foi homologado com sucesso pela Diretoria.`);
        renderDiretoriaOverview();
        renderGestaoAssociados();
        renderAssociadosDesligados();
        renderGestaoMensalidades();
    }
}

function rejeitarDesligamentoDiretoria(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf || (a.cpf || '').replace(/\D/g, '') === (cpf || '').replace(/\D/g, ''));
    if (!item) return;

    if (confirm(`Deseja rejeitar a solicitaÃ§Ã£o de desligamento do(a) associado(a) ${item.nome_guerra || item.nome}? O cadastro retornarÃ¡ ao status de Ativo.`)) {
        item.status = 'ativo';
        item.data_solicitacao_desligamento = null;

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        alert(`A solicitaÃ§Ã£o de desligamento foi rejeitada. O associado ${item.nome_guerra || item.nome} retornou ao status Ativo.`);
        renderDiretoriaOverview();
        renderGestaoAssociados();
        renderGestaoMensalidades();
    }
}

// EDIÃ‡ÃƒO COMPLETA DO CADASTRO DE ASSOCIADO PELA DIRETORIA
function abrirModalEditarAssociadoDiretoria(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const cleanCpfTarget = (cpf || '').replace(/\D/g, '');
    const a = list.find(item => (item.cpf || '').replace(/\D/g, '') === cleanCpfTarget);

    if (!a) {
        alert('Associado nÃ£o encontrado.');
        return;
    }

    document.getElementById('editDiretoriaOriginalCPF').value = a.cpf;
    document.getElementById('editDiretoriaNomeGuerra').value = a.nome_guerra || '';
    document.getElementById('editDiretoriaNome').value = a.nome || '';
    document.getElementById('editDiretoriaCPF').value = a.cpf || '';
    document.getElementById('editDiretoriaDataNascimento').value = a.data_nascimento || '';
    document.getElementById('editDiretoriaSexo').value = a.sexo || '';
    document.getElementById('editDiretoriaTelefone').value = a.telefone || '';
    document.getElementById('editDiretoriaOBM').value = a.obm || '';
    document.getElementById('editDiretoriaProfissao').value = a.profissao || '';
    document.getElementById('editDiretoriaDataCadastro').value = parseDataCadastro(a.data_cadastro)?.formatted || (a.data_cadastro ? a.data_cadastro.split(' ')[0] : '');
    document.getElementById('editDiretoriaPerfil').value = a.perfil || 'associado';
    document.getElementById('editDiretoriaStatus').value = a.status || 'ativo';
    document.getElementById('editDiretoriaNomeMae').value = a.nome_mae || '';
    document.getElementById('editDiretoriaNomePai').value = a.nome_pai || '';
    document.getElementById('editDiretoriaLogradouro').value = a.logradouro || '';
    document.getElementById('editDiretoriaNumero').value = a.numero || '';
    document.getElementById('editDiretoriaComplemento').value = a.complemento || '';
    document.getElementById('editDiretoriaCEP').value = a.cep || '';
    document.getElementById('editDiretoriaBairro').value = a.bairro || '';
    document.getElementById('editDiretoriaCidade').value = a.cidade || '';

    openModal('modalEditarAssociadoDiretoria');
}

function salvarEdicaoAssociadoDiretoria(e) {
    e.preventDefault();

    const originalCpf = document.getElementById('editDiretoriaOriginalCPF').value;
    const cleanOrigCpf = (originalCpf || '').replace(/\D/g, '');

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanOrigCpf);

    if (!item) {
        alert('Erro ao localizar o associado original para salvar.');
        return;
    }

    item.nome_guerra = document.getElementById('editDiretoriaNomeGuerra').value.trim();
    item.nome = document.getElementById('editDiretoriaNome').value.trim();
    item.cpf = document.getElementById('editDiretoriaCPF').value.trim();
    item.data_nascimento = document.getElementById('editDiretoriaDataNascimento').value.trim();
    item.sexo = document.getElementById('editDiretoriaSexo').value;
    item.telefone = document.getElementById('editDiretoriaTelefone').value.trim();
    item.obm = document.getElementById('editDiretoriaOBM').value.trim();
    item.profissao = document.getElementById('editDiretoriaProfissao').value.trim();
    item.data_cadastro = document.getElementById('editDiretoriaDataCadastro').value.trim();
    item.perfil = document.getElementById('editDiretoriaPerfil').value;
    item.status = document.getElementById('editDiretoriaStatus').value;
    item.nome_mae = document.getElementById('editDiretoriaNomeMae').value.trim();
    item.nome_pai = document.getElementById('editDiretoriaNomePai').value.trim();
    item.logradouro = document.getElementById('editDiretoriaLogradouro').value.trim();
    item.numero = document.getElementById('editDiretoriaNumero').value.trim();
    item.complemento = document.getElementById('editDiretoriaComplemento').value.trim();
    item.cep = document.getElementById('editDiretoriaCEP').value.trim();
    item.bairro = document.getElementById('editDiretoriaBairro').value.trim();
    item.cidade = document.getElementById('editDiretoriaCidade').value.trim();

    localStorage.setItem('acbcsj_associados', JSON.stringify(list));
    dbService.saveAssociado(item);

    if (currentUser && (currentUser.cpf || '').replace(/\D/g, '') === cleanOrigCpf) {
        sessionStorage.setItem('acbcsj_current_user', JSON.stringify(item));
        currentUser = item;
    }

    alert(`Dados do associado ${item.nome_guerra || item.nome} atualizados com sucesso!`);
    closeModal('modalEditarAssociadoDiretoria');

    renderGestaoAssociados();
    renderGestaoMensalidades();
    renderDiretoriaOverview();
    renderAssociadosDesligados();
}