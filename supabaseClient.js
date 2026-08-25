// CLIENTE SUPABASE OFICIAL DA ACBCSJ
const SUPABASE_URL = "https://ucutgspmvbupknjodeit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_drRsr2KSefHZqctSxlU7qA_b3xOj7RJ";
const SUPABASE_SECRET_KEY = "sb_secret_9N99Zf3L9d!q4Y3wP";
const SUPABASE_JWKS_URL = "https://ucutgspmvbupknjodeit.supabase.co/rest/v1/";

let supabaseClient = null;

if (typeof supabase !== 'undefined' && supabase.createClient) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        console.log("✅ Supabase SDK inicializado com sucesso!");
    } catch (e) {
        console.error("⚠️ Erro ao inicializar SDK Supabase:", e);
    }
}

async function rawFetchSupabase(endpoint, method = 'GET', body = null) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const headers = {
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation,resolution=merge-duplicates'
    };
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const r = await fetch(url, opts);
    if (!r.ok) {
        const text = await r.text();
        throw new Error(`HTTP ${r.status}: ${text}`);
    }
    return await r.json();
}

function removerAcentos(str) {
    if (!str) return '';
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// HIGIENIZAÇÃO DE DADOS
function sanitizeAssociado(item) {
    if (!item) return null;
    return {
        id: String(item.id || item.cpf || Date.now()),
        cpf: String(item.cpf || '').substring(0, 20),
        nome: item.nome || '',
        nome_guerra: item.nome_guerra || '',
        email: item.email || '',
        data_nascimento: item.data_nascimento || '',
        nome_pai: item.nome_pai || '',
        nome_mae: item.nome_mae || '',
        sexo: item.sexo || '',
        telefone: item.telefone || '',
        logradouro: item.logradouro || '',
        numero: item.numero || '',
        complemento: item.complemento || '',
        cep: item.cep || '',
        bairro: item.bairro || '',
        cidade: item.cidade || 'São José - SC',
        perfil: item.perfil || 'associado',
        status: item.status || 'pendente',
        data_cadastro: item.data_cadastro || new Date().toLocaleString('pt-BR'),
        data_desligamento: item.data_desligamento || null,
        motivo_desligamento: item.motivo_desligamento || null,
        carta_desligamento_url: item.carta_desligamento_url || null,
        carta_desligamento_nome: item.carta_desligamento_nome || null,
        obm: item.obm || 'São José',
        profissao: item.profissao || 'Bombeiro Comunitário',
        senha: item.senha || '1234'
    };
}

function sanitizeFinanceiro(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'lanc_' + Date.now()),
        tipo: item.tipo || 'despesa',
        descricao: item.descricao || '',
        valor: parseFloat(item.valor) || 0,
        categoria: item.categoria || 'Geral',
        fornecedor_cliente: item.fornecedor_cliente || '',
        data: item.data || '',
        data_iso: item.data_iso || '',
        mes: item.mes || '',
        comprovante_nome: item.comprovante_nome || null,
        comprovante_url: item.comprovante_url || null
    };
}

function sanitizeDocumento(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'doc_' + Date.now()),
        titulo: item.titulo || '',
        categoria: item.categoria || 'Geral',
        visibilidade: item.visibilidade || 'todos',
        data_vencimento: item.data_vencimento || null,
        descricao: item.descricao || '',
        arquivo_nome: item.arquivo_nome || null,
        arquivo_url: item.arquivo_url || null,
        data_publicacao: item.data_publicacao || new Date().toLocaleDateString('pt-BR')
    };
}

function sanitizeMensagem(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'msg_' + Date.now()),
        associado_id: item.associado_id ? String(item.associado_id) : null,
        associado_cpf: item.associado_cpf || item.cpf || '',
        associado_nome: item.associado_nome || '',
        destinatario: item.destinatario || 'todos',
        assunto: item.assunto || '',
        conteudo: item.conteudo || item.mensagem || '',
        prioridade: item.prioridade || 'Informativo',
        resposta_diretoria: item.resposta_diretoria || null,
        status: item.status || 'pendente',
        data_envio: item.data_envio || item.data || new Date().toLocaleDateString('pt-BR')
    };
}

function sanitizeMensalidade(item) {
    if (!item) return null;

    let list = [];
    try { list = JSON.parse(localStorage.getItem('acbcsj_associados')) || []; } catch(e) {}
    if (!list || list.length === 0) {
        if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados) {
            list = MOCK_DATA_INITIAL.associados;
        } else if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined') {
            list = ASSOCIADOS_PLANILHA_REAL;
        }
    }

    let userObs = item.obs || item.observacoes || item.comprovante_pix || '';
    let metaCpf = '';
    let metaAno = '';
    let metaMeses = '';

    if (userObs && userObs.includes('CPF:') && userObs.includes('MESES:')) {
        const parts = userObs.split('|');
        parts.forEach(p => {
            if (p.startsWith('CPF:')) metaCpf = p.substring(4).trim();
            if (p.startsWith('ANO:')) metaAno = p.substring(4).trim();
            if (p.startsWith('MESES:')) metaMeses = p.substring(6).trim();
            if (p.startsWith('OBS:')) userObs = p.substring(4).trim();
        });
    }

    let cleanCpf = (metaCpf || item.cpf || '').replace(/\D/g, '');
    let assocId = item.associado_id ? String(item.associado_id) : null;

    if (!cleanCpf && assocId && assocId.replace(/\D/g, '').length === 11) {
        cleanCpf = assocId.replace(/\D/g, '');
    }

    if (!cleanCpf) {
        const txtTotal = `${userObs} ${item.mes_referencia || ''} ${item.fornecedor_cliente || ''} ${assocId || ''}`;
        const matchDigits = txtTotal.match(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{11}\b/);
        if (matchDigits) {
            cleanCpf = matchDigits[0].replace(/\D/g, '');
        }
    }

    let assoc = null;
    if (cleanCpf) {
        assoc = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);
    }
    if (!assoc && assocId) {
        assoc = list.find(a => String(a.id) === assocId || (a.cpf || '').replace(/\D/g, '') === assocId.replace(/\D/g, ''));
    }
    if (!assoc && (userObs || item.mes_referencia)) {
        const txtBusca = (userObs + ' ' + (item.mes_referencia || '')).toLowerCase();
        assoc = list.find(a => {
            const ng = (a.nome_guerra || '').trim().toLowerCase();
            const nc = (a.nome || '').trim().toLowerCase();
            const cpfNum = (a.cpf || '').replace(/\D/g, '');

            if (cpfNum && cpfNum.length === 11 && txtBusca.includes(cpfNum)) return true;
            if (nc && nc.length >= 6 && txtBusca.includes(nc)) return true;
            if (ng && ng.length >= 3) {
                const regexWord = new RegExp('(?:^|[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ])' + ng + '(?:$|[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ])', 'i');
                if (regexWord.test(txtBusca)) {
                    const colidindoOutro = list.some(other => {
                        const otherNc = (other.nome || '').toLowerCase();
                        return other.cpf !== a.cpf && otherNc && regexWord.test(otherNc);
                    });
                    if (colidindoOutro) return false;
                    return true;
                }
            }
            return false;
        });
    }

    if (assoc) {
        if (!assocId) assocId = String(assoc.id || assoc.cpf);
        if (!cleanCpf) cleanCpf = (assoc.cpf || '').replace(/\D/g, '');
    }

    let finalCpf = assoc ? assoc.cpf : (item.cpf || '');
    if (!finalCpf && cleanCpf && cleanCpf.length === 11) {
        finalCpf = cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    let mesesQuitadosStr = metaMeses || item.meses_quitados || item.mes_referencia || '';
    let anoStr = metaAno || item.ano || '2026';
    let dataPagto = item.data_pagamento || item.data || new Date().toLocaleDateString('pt-BR');

    return {
        id: String(item.id || 'mensalidade_' + Date.now()),
        associado_id: String(assocId || (assoc ? assoc.id : '1')),
        associado_nome: assoc ? (assoc.nome_guerra || assoc.nome) : (item.associado_nome || 'Associado'),
        cpf: finalCpf,
        ano: String(anoStr),
        meses_quitados: mesesQuitadosStr,
        valor: parseFloat(item.valor) || 0,
        data_pagamento: dataPagto,
        status: item.status || 'pago',
        comprovante_pix: item.comprovante_pix || 'PIX Confirmado',
        observacoes: userObs
    };
}

const dbService = {
    // ASSOCIADOS
    async getAssociados() {
        try {
            let data = null;
            if (supabaseClient) {
                const res = await supabaseClient.from('associados').select('*');
                if (!res.error && res.data && res.data.length > 0) data = res.data;
            }
            if (!data) {
                data = await rawFetchSupabase('associados?select=*');
            }
            if (data && Array.isArray(data) && data.length > 0) {
                localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("⚠️ getAssociados via Supabase usou fallback local:", e.message || e);
        }
        return JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    },

    async saveAssociado(item) {
        const clean = sanitizeAssociado(item);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const idx = list.findIndex(a => a.cpf === clean.cpf || a.id === clean.id);
        if (idx >= 0) list[idx] = clean;
        else list.push(clean);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        try {
            if (supabaseClient) {
                const { error } = await supabaseClient.from('associados').upsert([clean]);
                if (error) throw error;
            } else {
                await rawFetchSupabase('associados', 'POST', [clean]);
            }
            console.log("✅ Associado salvo com sucesso no Supabase:", clean.nome);
        } catch (e) {
            console.error("⚠️ Erro ao salvar associado no Supabase:", e.message || e);
        }
        return true;
    },

    async deleteAssociado(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.id !== id && a.cpf !== id);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('associados').delete().eq('id', id);
            } else {
                await rawFetchSupabase(`associados?id=eq.${encodeURIComponent(id)}`, 'DELETE');
            }
        } catch (e) {
            console.error("⚠️ Erro ao excluir associado no Supabase:", e.message || e);
        }
        return true;
    },

    // FINANCEIRO
    async getFinanceiro() {
        try {
            let data = null;
            if (supabaseClient) {
                const res = await supabaseClient.from('financeiro_lancamentos').select('*');
                if (!res.error && res.data) data = res.data;
            }
            if (!data) {
                data = await rawFetchSupabase('financeiro_lancamentos?select=*');
            }
            if (data && Array.isArray(data)) {
                localStorage.setItem('acbcsj_financeiro', JSON.stringify(data));
                return data;
            }
        } catch (e) {
            console.warn("⚠️ getFinanceiro via Supabase usou fallback local:", e.message || e);
        }
        return JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    },

    async saveFinanceiro(item) {
        const clean = sanitizeFinanceiro(item);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        const idx = list.findIndex(f => f.id === clean.id);
        if (idx >= 0) list[idx] = clean;
        else list.unshift(clean);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        try {
            if (supabaseClient) {
                const { error } = await supabaseClient.from('financeiro_lancamentos').upsert([clean]);
                if (error) throw error;
            } else {
                await rawFetchSupabase('financeiro_lancamentos', 'POST', [clean]);
            }
            console.log("✅ Lançamento financeiro salvo com sucesso no Supabase:", clean.descricao);
        } catch (e) {
            console.error("⚠️ Erro ao salvar financeiro no Supabase:", e.message || e);
        }
        return true;
    },

    async deleteFinanceiro(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(f => f.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('financeiro_lancamentos').delete().eq('id', id);
            } else {
                await rawFetchSupabase(`financeiro_lancamentos?id=eq.${encodeURIComponent(id)}`, 'DELETE');
            }
        } catch (e) {
            console.error("⚠️ Erro ao excluir financeiro no Supabase:", e.message || e);
        }
        return true;
    },

    // MENSALIDADES
    async getMensalidades() {
        try {
            let data = null;
            if (supabaseClient) {
                const res = await supabaseClient.from('mensalidades').select('*');
                if (!res.error && res.data) data = res.data;
            }
            if (!data) {
                data = await rawFetchSupabase('mensalidades?select=*');
            }
            if (data && Array.isArray(data)) {
                const sanitized = data.map(item => sanitizeMensalidade(item)).filter(Boolean);
                localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(sanitized));
                if (typeof recalcularTodasGridsMensalidades === 'function') {
                    recalcularTodasGridsMensalidades();
                }
                return sanitized;
            }
        } catch (e) {
            console.warn("⚠️ getMensalidades via Supabase usou fallback local:", e.message || e);
        }
        return JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    },

    async addMensalidade(item) {
        const clean = sanitizeMensalidade(item);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        list = list.filter(m => m.id !== clean.id);
        list.unshift(clean);
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(list));

        try {
            const cleanCpfDigits = (clean.cpf || '').replace(/\D/g, '');
            let validAssocId = clean.associado_id;

            if (cleanCpfDigits) {
                let assocDb = null;
                if (supabaseClient) {
                    const { data } = await supabaseClient.from('associados').select('id, cpf').eq('cpf', clean.cpf);
                    assocDb = data;
                } else {
                    try { assocDb = await rawFetchSupabase(`associados?cpf=eq.${encodeURIComponent(clean.cpf)}&select=id,cpf`); } catch(e) {}
                }

                if (!assocDb || assocDb.length === 0) {
                    if (supabaseClient) {
                        const { data: allAssoc } = await supabaseClient.from('associados').select('id, cpf');
                        assocDb = allAssoc;
                    } else {
                        try { assocDb = await rawFetchSupabase('associados?select=id,cpf'); } catch(e) {}
                    }
                }

                if (assocDb && assocDb.length > 0) {
                    const match = assocDb.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpfDigits);
                    if (match) {
                        validAssocId = String(match.id);
                    }
                }

                if (!validAssocId || validAssocId.length > 10) {
                    let localAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
                    let localAssoc = localAssociados.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpfDigits);
                    if (localAssoc) {
                        const cleanAssoc = sanitizeAssociado(localAssoc);
                        if (supabaseClient) {
                            const { data: createdAssoc } = await supabaseClient.from('associados').upsert([cleanAssoc]).select('id');
                            if (createdAssoc && createdAssoc[0]) validAssocId = String(createdAssoc[0].id);
                        } else {
                            try {
                                const createdAssoc = await rawFetchSupabase('associados', 'POST', [cleanAssoc]);
                                if (createdAssoc && createdAssoc[0]) validAssocId = String(createdAssoc[0].id);
                            } catch(e) {}
                        }
                    }
                }
            }

            const obsMeta = `CPF:${clean.cpf}|ANO:${clean.ano}|MESES:${clean.meses_quitados}|OBS:${clean.observacoes}`;
            const payloadSupabase = {
                id: clean.id,
                associado_id: validAssocId || '1',
                cpf: clean.cpf,
                ano: clean.ano,
                mes_referencia: (clean.meses_quitados || '').substring(0, 50),
                valor: clean.valor,
                status: clean.status,
                data_pagamento: clean.data_pagamento,
                observacoes: obsMeta
            };

            if (supabaseClient) {
                const { error } = await supabaseClient.from('mensalidades').upsert([payloadSupabase]);
                if (error) throw error;
            } else {
                await rawFetchSupabase('mensalidades', 'POST', [payloadSupabase]);
            }
            console.log("✅ Mensalidade salva com sucesso no Supabase:", clean.cpf, clean.meses_quitados, clean.valor, "ID Associado:", validAssocId);
        } catch (e) {
            console.error("⚠️ Erro ao salvar mensalidade no Supabase:", e.message || e);
        }
        return true;
    },

    async clearMensalidades() {
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify([]));
        localStorage.setItem('acbcsj_mensalidades_grid_2026', JSON.stringify([]));
        if (typeof recalcularTodasGridsMensalidades === 'function') {
            recalcularTodasGridsMensalidades();
        }
        try {
            if (supabaseClient) {
                const { error } = await supabaseClient.from('mensalidades').delete().neq('id', '0');
                if (error) console.error("⚠️ Erro ao limpar mensalidades no Supabase:", error.message);
                else console.log("🗑️ Todas as mensalidades foram excluídas do Supabase.");
            } else {
                await rawFetchSupabase('mensalidades?id=neq.0', 'DELETE');
            }
        } catch (e) {
            console.error("Erro ao limpar mensalidades do Supabase:", e);
        }
        return true;
    },

    async deleteMensalidade(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        list = list.filter(m => m.id !== id);
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('mensalidades').delete().eq('id', id);
            } else {
                await rawFetchSupabase(`mensalidades?id=eq.${encodeURIComponent(id)}`, 'DELETE');
            }
        } catch (e) {
            console.error("Erro ao excluir mensalidade do Supabase:", e);
        }
        return true;
    },

    // MENSAGENS
    async getMensagens() {
        try {
            let data = null;
            if (supabaseClient) {
                const res = await supabaseClient.from('mensagens').select('*');
                if (!res.error && res.data) data = res.data;
            }
            if (!data) {
                data = await rawFetchSupabase('mensagens?select=*');
            }
            if (data && Array.isArray(data)) {
                localStorage.setItem('acbcsj_mensagens', JSON.stringify(data));
                return data;
            }
        } catch (e) {}
        return JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    },

    async addMensagem(msg) {
        const clean = sanitizeMensagem(msg);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        list.unshift(clean);
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('mensagens').upsert([clean]);
            } else {
                await rawFetchSupabase('mensagens', 'POST', [clean]);
            }
        } catch (e) {}
        return true;
    },

    async deleteMensagem(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        list = list.filter(m => m.id !== id);
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('mensagens').delete().eq('id', id);
            } else {
                await rawFetchSupabase(`mensagens?id=eq.${encodeURIComponent(id)}`, 'DELETE');
            }
        } catch (e) {}
        return true;
    },

    // DOCUMENTOS
    async getDocumentos() {
        try {
            let data = null;
            if (supabaseClient) {
                const res = await supabaseClient.from('documentos').select('*');
                if (!res.error && res.data) data = res.data;
            }
            if (!data) {
                data = await rawFetchSupabase('documentos?select=*');
            }
            if (data && Array.isArray(data)) {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(data));
                return data;
            }
        } catch (e) {}
        return JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    },

    async saveDocumento(doc) {
        const clean = sanitizeDocumento(doc);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        const idx = list.findIndex(d => d.id === clean.id);
        if (idx >= 0) list[idx] = clean;
        else list.unshift(clean);
        localStorage.setItem('acbcsj_documentos', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('documentos').upsert([clean]);
            } else {
                await rawFetchSupabase('documentos', 'POST', [clean]);
            }
        } catch (e) {}
        return true;
    },

    async deleteDocumento(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        list = list.filter(d => d.id !== id);
        localStorage.setItem('acbcsj_documentos', JSON.stringify(list));

        try {
            if (supabaseClient) {
                await supabaseClient.from('documentos').delete().eq('id', id);
            } else {
                await rawFetchSupabase(`documentos?id=eq.${encodeURIComponent(id)}`, 'DELETE');
            }
        } catch (e) {}
        return true;
    },

    // BUSCAR TUDO EXCLUSIVAMENTE DO SUPABASE & SINCRONIZAR PENDÊNCIAS
    async syncFromSupabase() {
        console.log("🌐 Carregando dados exclusivos do Supabase e sincronizando pendências...");
        try {
            let assocData = null, finData = null, msgData = null, docData = null, mensData = null;

            if (supabaseClient) {
                try {
                    const [assocRes, finRes, msgRes, docRes, mensRes] = await Promise.all([
                        supabaseClient.from('associados').select('*'),
                        supabaseClient.from('financeiro_lancamentos').select('*'),
                        supabaseClient.from('mensagens').select('*'),
                        supabaseClient.from('documentos').select('*'),
                        supabaseClient.from('mensalidades').select('*')
                    ]);
                    assocData = assocRes.data;
                    finData = finRes.data;
                    msgData = msgRes.data;
                    docData = docRes.data;
                    mensData = mensRes.data;
                } catch(e) {}
            }

            if (!assocData || !mensData) {
                try {
                    const [a, f, m, d, ms] = await Promise.all([
                        rawFetchSupabase('associados?select=*'),
                        rawFetchSupabase('financeiro_lancamentos?select=*'),
                        rawFetchSupabase('mensagens?select=*'),
                        rawFetchSupabase('documentos?select=*'),
                        rawFetchSupabase('mensalidades?select=*')
                    ]);
                    assocData = a;
                    finData = f;
                    msgData = m;
                    docData = d;
                    mensData = ms;
                } catch(e) {}
            }

            if (assocData) localStorage.setItem('acbcsj_associados', JSON.stringify(assocData));
            if (finData) localStorage.setItem('acbcsj_financeiro', JSON.stringify(finData));
            if (msgData) localStorage.setItem('acbcsj_mensagens', JSON.stringify(msgData));
            if (docData) localStorage.setItem('acbcsj_documentos', JSON.stringify(docData));

            if (mensData && Array.isArray(mensData)) {
                let localHist = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
                const onlineIds = new Set(mensData.map(m => String(m.id)));

                // Envia para o Supabase qualquer mensalidade cadastrada localmente que ainda não estava lá online
                const faltantes = localHist.filter(lh => lh && lh.id && !onlineIds.has(String(lh.id)));
                if (faltantes.length > 0) {
                    console.log(`⚡ Sincronizando ${faltantes.length} mensalidades locais pendentes para o Supabase...`);
                    for (const itemFaltante of faltantes) {
                        await this.addMensalidade(itemFaltante);
                    }
                    try {
                        if (supabaseClient) {
                            const { data: reMensData } = await supabaseClient.from('mensalidades').select('*');
                            if (reMensData) mensData = reMensData;
                        } else {
                            mensData = await rawFetchSupabase('mensalidades?select=*');
                        }
                    } catch(e) {}
                }

                const sanitizedMens = mensData.map(item => sanitizeMensalidade(item)).filter(Boolean);
                localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(sanitizedMens));
                if (typeof recalcularTodasGridsMensalidades === 'function') {
                    recalcularTodasGridsMensalidades();
                }
            }
            console.log("🎉 Todos os dados do Supabase foram carregados e validados!");
        } catch (err) {
            console.error("⚠️ Erro ao consultar Supabase:", err);
        }
    }
};

window.ENV_SUPABASE_URL = SUPABASE_URL;
window.ENV_SUPABASE_PUBLISHABLE_KEY = SUPABASE_PUBLISHABLE_KEY;
window.ENV_SUPABASE_SECRET_KEY = SUPABASE_SECRET_KEY;
window.ENV_SUPABASE_JWKS_URL = SUPABASE_JWKS_URL;
window.dbService = dbService;