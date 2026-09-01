// CLIENTE SUPABASE OFICIAL DA ACBCSJ
const SUPABASE_URL = "https://ucutgspmvbupknjodeit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_drRsr2KSefHZqctSxlU7qA_b3xOj7RJ";
const SUPABASE_SECRET_KEY = "sb_secret_9N99Zf3L9d!q4Y3wP";
const SUPABASE_JWKS_URL = "https://ucutgspmvbupknjodeit.supabase.co/rest/v1/";

let supabaseClient = null;

function getSupabaseClient() {
    if (!supabaseClient && typeof supabase !== 'undefined' && supabase.createClient) {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
            console.log("✅ Supabase inicializado com sucesso!");
        } catch (e) {
            console.error("⚠️ Erro ao inicializar Supabase:", e);
        }
    }
    return supabaseClient;
}

getSupabaseClient();

// Helper seguro para salvar no LocalStorage sem estourar cota de 5MB
function safeSetLocalStorage(key, data) {
    if (!data) return;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn(`LocalStorage quota excedida ao salvar ${key}. Otimizando campos...`, e);
        try {
            if (Array.isArray(data)) {
                const cleanedData = data.map(item => {
                    if (typeof item === 'object' && item !== null) {
                        const copy = { ...item };
                        if (copy.carta_desligamento_url && copy.carta_desligamento_url.length > 500) {
                            copy.carta_desligamento_url = '[ARMAZENADO_NO_SUPABASE]';
                        }
                        if (copy.arquivo_url && copy.arquivo_url.length > 500) {
                            copy.arquivo_url = '[ARMAZENADO_NO_SUPABASE]';
                        }
                        if (copy.comprovante_url && copy.comprovante_url.length > 500) {
                            copy.comprovante_url = '[ARMAZENADO_NO_SUPABASE]';
                        }
                        return copy;
                    }
                    return item;
                });
                localStorage.setItem(key, JSON.stringify(cleanedData));
            }
        } catch(innerErr) {
            console.error(`Erro ao salvar no LocalStorage (${key}):`, innerErr);
        }
    }
}

// Helper REST direto com fallback infalível e controle de timeout
async function supabaseRest(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const headers = {
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    let controller = null;
    let timeoutId = null;
    if (typeof AbortController !== 'undefined') {
        controller = new AbortController();
        timeoutId = setTimeout(() => {
            try { controller.abort(); } catch(e) {}
        }, options.timeout || 10000);
    }

    try {
        const fetchOptions = {
            ...options,
            headers,
            ...(controller ? { signal: controller.signal } : {})
        };
        const res = await fetch(url, fetchOptions);
        if (timeoutId) clearTimeout(timeoutId);
        if (!res.ok) {
            console.warn(`Supabase REST aviso HTTP ${res.status}: ${res.statusText} (${endpoint})`);
            return null;
        }
        const text = await res.text();
        return text ? JSON.parse(text) : [];
    } catch (err) {
        if (timeoutId) clearTimeout(timeoutId);
        console.warn(`Supabase REST fetch aviso (${endpoint}):`, err.message || err);
        return null;
    }
}

async function supabaseRestUpsert(table, row) {
    try {
        return await supabaseRest(table, {
            method: 'POST',
            headers: {
                'Prefer': 'resolution=merge-duplicates,return=representation'
            },
            body: JSON.stringify(row)
        });
    } catch(e) {
        console.warn(`Aviso no supabaseRestUpsert (${table}):`, e);
        return null;
    }
}

async function supabaseRestDelete(table, query) {
    try {
        return await supabaseRest(`${table}?${query}`, {
            method: 'DELETE'
        });
    } catch(e) {
        console.warn(`Aviso no supabaseRestDelete (${table}):`, e);
        return null;
    }
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
        solicitacao_desligamento: item.solicitacao_desligamento || null,
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

function sanitizeMensalidade(item) {
    if (!item) return null;
    const cleanCpf = (item.cpf || '').replace(/\D/g, '');
    let assocId = item.associado_id || null;
    if (!assocId) {
        let list = [];
        try { list = JSON.parse(localStorage.getItem('acbcsj_associados')) || []; } catch(e) {}
        const assoc = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);
        if (assoc && assoc.id) assocId = String(assoc.id);
    }
    if (!assocId) assocId = "3"; // ID fallback válido para integridade

    let rawMes = String(item.mes_referencia || item.meses_quitados || 'Jan').trim();
    if (rawMes.length > 20) {
        if (typeof formatarMesesReferenciaCompacto === 'function' && typeof extrairListaMesesQuitados === 'function') {
            const keys = extrairListaMesesQuitados(item);
            rawMes = formatarMesesReferenciaCompacto(keys);
        }
        if (rawMes.length > 20) {
            rawMes = rawMes.substring(0, 20);
        }
    }
    const cleanObs = item.observacoes || item.obs || item.comprovante_pix || 'Quitacao de mensalidade PIX';

    return {
        id: String(item.id || 'mensalidade_' + Date.now()),
        associado_id: String(assocId),
        cpf: String(item.cpf || ''),
        ano: String(item.ano || '2026'),
        mes_referencia: rawMes,
        valor: parseFloat(item.valor) || 20.00,
        status: String(item.status || 'pago'),
        data_pagamento: String(item.data_pagamento || item.data || new Date().toLocaleDateString('pt-BR')),
        observacoes: cleanObs
    };
}

function sanitizeMensagem(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'msg_' + Date.now()),
        associado_id: item.associado_id || item.associado_cpf || null,
        associado_cpf: item.associado_cpf || null,
        associado_nome: item.associado_nome || '',
        destinatario: item.destinatario || 'todos',
        assunto: item.assunto || '',
        conteudo: item.conteudo || item.mensagem || '',
        prioridade: item.prioridade || 'Informativo',
        resposta_diretoria: item.resposta_diretoria || null,
        status: item.status || 'pendente',
        data_envio: item.data_envio || new Date().toLocaleString('pt-BR')
    };
}

// BANCO DE DADOS 100% BASEADO NO SUPABASE
const dbService = {
    // ASSOCIADOS
    async getAssociados() {
        const client = getSupabaseClient();
        if (client) {
            try {
                const { data, error } = await client.from('associados').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getAssociados:", e);
            }
        }
        try {
            const data = await supabaseRest('associados?select=*');
            if (Array.isArray(data) && data.length > 0) {
                localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                return data;
            }
        } catch(e) {}
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

        const client = getSupabaseClient();
        if (client) {
            try {
                let payload = { ...clean };
                let { error } = await client.from('associados').upsert([payload]);
                if (error && error.message && error.message.includes('solicitacao_desligamento')) {
                    delete payload.solicitacao_desligamento;
                    const resRetry = await client.from('associados').upsert([payload]);
                    if (resRetry.error) console.error("Erro retry salvar associado:", resRetry.error.message);
                } else if (error) {
                    console.error("Erro ao salvar associado no Supabase:", error.message);
                } else {
                    console.log("✅ Associado salvo no Supabase:", clean.nome_guerra || clean.nome);
                    return true;
                }
            } catch (e) {
                console.error("Erro ao salvar associado no Supabase:", e);
            }
        }
        await supabaseRestUpsert('associados', clean);
        return true;
    },

    async deleteAssociado(cpf) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('associados').delete().eq('cpf', cpf);
                if (error) console.error("Erro ao excluir associado do Supabase:", error.message);
                else console.log("🗑️ Associado excluído do Supabase:", cpf);
            } catch (e) {
                console.error("Erro ao excluir associado do Supabase:", e);
            }
        } else {
            await supabaseRestDelete('associados', `cpf=eq.${cpf}`);
        }
        return true;
    },

    // FINANCEIRO
    async getFinanceiro() {
        const client = getSupabaseClient();
        if (client) {
            try {
                const { data, error } = await client.from('financeiro_lancamentos').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_financeiro', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getFinanceiro:", e);
            }
        }
        try {
            const data = await supabaseRest('financeiro_lancamentos?select=*');
            if (Array.isArray(data) && data.length > 0) {
                localStorage.setItem('acbcsj_financeiro', JSON.stringify(data));
                return data;
            }
        } catch(e) {}
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

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('financeiro_lancamentos').upsert([clean]);
                if (error) console.error("Erro ao salvar lançamento no Supabase:", error.message);
                else console.log("✅ Lançamento financeiro salvo no Supabase:", clean.descricao, clean.valor);
                return true;
            } catch (e) {
                console.error("Erro ao salvar lançamento financeiro no Supabase:", e);
            }
        }
        await supabaseRestUpsert('financeiro_lancamentos', clean);
        return true;
    },

    // Alias para compatibilidade
    async addFinanceiro(item) {
        return this.saveFinanceiro(item);
    },

    async deleteFinanceiro(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(f => f.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('financeiro_lancamentos').delete().eq('id', id);
                if (error) console.error("Erro ao excluir lançamento do Supabase:", error.message);
                else console.log("🗑️ Lançamento financeiro excluído do Supabase:", id);
            } catch (e) {
                console.error("Erro ao excluir lançamento financeiro do Supabase:", e);
            }
        } else {
            await supabaseRestDelete('financeiro_lancamentos', `id=eq.${id}`);
        }
        return true;
    },

    // MENSALIDADES (BAIXAS)
    normalizarMensalidades(lista) {
        if (!Array.isArray(lista)) return [];
        return lista.map(item => {
            const mesesTexto = (item.meses_quitados && item.meses_quitados !== 'undefined' && item.meses_quitados !== 'null')
                ? item.meses_quitados
                : (item.mes_referencia && item.mes_referencia !== 'undefined' && item.mes_referencia !== 'null' ? item.mes_referencia : (typeof extrairTextoMesesQuitados === 'function' ? extrairTextoMesesQuitados(item) : 'Jan'));
            
            return {
                ...item,
                meses_quitados: mesesTexto,
                mes_referencia: item.mes_referencia || mesesTexto,
                data: item.data || item.data_pagamento || '',
                data_pagamento: item.data_pagamento || item.data || '',
                obs: item.obs || item.observacoes || '-',
                comprovante_pix: item.comprovante_pix || 'PIX'
            };
        });
    },

    async getMensalidades() {
        const client = getSupabaseClient();
        if (client) {
            try {
                const { data, error } = await client.from('mensalidades').select('*');
                if (!error && data && Array.isArray(data)) {
                    const norm = this.normalizarMensalidades(data);
                    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(norm));
                    if (typeof recalcularTodasGridsMensalidades === 'function') {
                        recalcularTodasGridsMensalidades();
                    }
                    return norm;
                }
            } catch (e) {
                console.error("Erro no Supabase getMensalidades:", e);
            }
        }
        try {
            const data = await supabaseRest('mensalidades?select=*');
            if (Array.isArray(data)) {
                const norm = this.normalizarMensalidades(data);
                localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(norm));
                if (typeof recalcularTodasGridsMensalidades === 'function') {
                    recalcularTodasGridsMensalidades();
                }
                return norm;
            }
        } catch(e) {}
        const local = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        return normalizarLista(local);
    },

    async addMensalidade(item) {
        const clean = sanitizeMensalidade(item);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        list = list.filter(m => m.id !== clean.id);
        list.unshift(clean);
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('mensalidades').upsert([clean]);
                if (error) {
                    console.error("⚠️ Erro ao salvar mensalidade no Supabase:", error.message);
                } else {
                    console.log("✅ Mensalidade salva com sucesso no Supabase:", clean.cpf, clean.mes_referencia, clean.valor);
                    return true;
                }
            } catch (e) {
                console.error("Erro ao enviar mensalidade para Supabase:", e);
            }
        }
        await supabaseRestUpsert('mensalidades', clean);
        return true;
    },

    async clearMensalidades() {
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify([]));
        localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify([]));
        ['2024','2025','2026','2027','2028'].forEach(ano => {
            localStorage.setItem('acbcsj_mensalidades_grid_' + ano, JSON.stringify([]));
        });
        if (typeof recalcularTodasGridsMensalidades === 'function') {
            recalcularTodasGridsMensalidades();
        }
        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('mensalidades').delete().not('id', 'is', null);
                if (error) console.error("⚠️ Erro ao limpar mensalidades no Supabase:", error.message);
                else console.log("🗑️ Todas as mensalidades foram excluídas do Supabase.");
            } catch (e) {
                console.error("Erro ao limpar mensalidades do Supabase:", e);
            }
        }
        await supabaseRestDelete('mensalidades', 'id=neq.null_never_match');
        return true;
    },

    async deleteMensalidade(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        list = list.filter(m => m.id !== id);
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('mensalidades').delete().eq('id', id);
                if (error) console.error("Erro ao excluir mensalidade do Supabase:", error.message);
                else console.log("🗑️ Mensalidade excluída do Supabase:", id);
            } catch (e) {
                console.error("Erro ao excluir mensalidade do Supabase:", e);
            }
        } else {
            await supabaseRestDelete('mensalidades', `id=eq.${id}`);
        }
        return true;
    },

    // MENSAGENS E COMUNICADOS
    async getMensagens() {
        const client = getSupabaseClient();
        if (client) {
            try {
                const { data, error } = await client.from('mensagens').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_mensagens', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getMensagens:", e);
            }
        }
        try {
            const data = await supabaseRest('mensagens?select=*');
            if (Array.isArray(data)) {
                localStorage.setItem('acbcsj_mensagens', JSON.stringify(data));
                return data;
            }
        } catch(e) {}
        return JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    },

    async addMensagem(msg) {
        const clean = sanitizeMensagem(msg);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        list.unshift(clean);
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('mensagens').upsert([clean]);
                if (error) console.error("Erro ao salvar mensagem no Supabase:", error.message);
                else console.log("✅ Mensagem salva no Supabase:", clean.assunto);
                return true;
            } catch (e) {
                console.error("Erro ao enviar mensagem para Supabase:", e);
            }
        }
        await supabaseRestUpsert('mensagens', clean);
        return true;
    },

    async deleteMensagem(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        list = list.filter(m => m.id !== id);
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                await client.from('mensagens').delete().eq('id', id);
            } catch (e) {}
        } else {
            await supabaseRestDelete('mensagens', `id=eq.${id}`);
        }
        return true;
    },

    // DOCUMENTOS
    async getDocumentos() {
        const client = getSupabaseClient();
        if (client) {
            try {
                const { data, error } = await client.from('documentos').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_documentos', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getDocumentos:", e);
            }
        }
        try {
            const data = await supabaseRest('documentos?select=*');
            if (Array.isArray(data)) {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(data));
                return data;
            }
        } catch(e) {}
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

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('documentos').upsert([clean]);
                if (error) console.error("Erro ao salvar documento no Supabase:", error.message);
                else console.log("✅ Documento salvo no Supabase:", clean.titulo);
                return true;
            } catch (e) {
                console.error("Erro ao salvar documento no Supabase:", e);
            }
        }
        await supabaseRestUpsert('documentos', clean);
        return true;
    },

    async deleteDocumento(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        list = list.filter(d => d.id !== id);
        localStorage.setItem('acbcsj_documentos', JSON.stringify(list));

        const client = getSupabaseClient();
        if (client) {
            try {
                const { error } = await client.from('documentos').delete().eq('id', id);
                if (error) console.error("Erro ao excluir documento do Supabase:", error.message);
                else console.log("🗑️ Documento excluído do Supabase:", id);
            } catch (e) {
                console.error("Erro ao excluir documento do Supabase:", e);
            }
        } else {
            await supabaseRestDelete('documentos', `id=eq.${id}`);
        }
        return true;
    },

    // BUSCAR TUDO EXCLUSIVAMENTE DO SUPABASE
    async syncFromSupabase() {
        this.updateOnlineBadge(null, "Sincronizando...");
        console.log("🌐 Sincronizando dados exclusivos do Supabase...");

        try {
            let sucessos = 0;
            let countTotal = 0;

            // Executa requisições de forma resiliente e individual
            const fetchPromises = [
                supabaseRest('associados?select=*').then(data => {
                    if (data && Array.isArray(data)) {
                        safeSetLocalStorage('acbcsj_associados', data);
                        countTotal += data.length;
                        sucessos++;
                    }
                }),
                supabaseRest('financeiro_lancamentos?select=*').then(data => {
                    if (data && Array.isArray(data)) {
                        safeSetLocalStorage('acbcsj_financeiro', data);
                        countTotal += data.length;
                        sucessos++;
                    }
                }),
                supabaseRest('mensagens?select=*').then(data => {
                    if (data && Array.isArray(data)) {
                        safeSetLocalStorage('acbcsj_mensagens', data);
                        countTotal += data.length;
                        sucessos++;
                    }
                }),
                supabaseRest('documentos?select=*').then(data => {
                    if (data && Array.isArray(data)) {
                        safeSetLocalStorage('acbcsj_documentos', data);
                        countTotal += data.length;
                        sucessos++;
                    }
                }),
                supabaseRest('mensalidades?select=*').then(data => {
                    if (data && Array.isArray(data)) {
                        const norm = (typeof dbService !== 'undefined' && dbService.normalizarMensalidades)
                            ? dbService.normalizarMensalidades(data)
                            : data;
                        safeSetLocalStorage('acbcsj_mensalidades_historico', norm);
                        countTotal += data.length;
                        sucessos++;
                    }
                })
            ];

            await Promise.allSettled(fetchPromises);

            try {
                if (typeof recalcularTodasGridsMensalidades === 'function') {
                    recalcularTodasGridsMensalidades();
                }
            } catch(calcErr) {
                console.warn("Aviso ao recalcular grids:", calcErr);
            }

            // Se pelo menos uma tabela respondeu ou se a conexão está ativa
            if (sucessos > 0) {
                this.updateOnlineBadge(true, "Supabase Online");
                console.log(`🎉 Dados do Supabase sincronizados com sucesso! (${countTotal} registros no total)`);
            } else {
                const ping = await supabaseRest('associados?select=id&limit=1', { timeout: 4000 });
                if (ping !== null) {
                    this.updateOnlineBadge(true, "Supabase Online");
                } else {
                    this.updateOnlineBadge(false, "Modo Local");
                }
            }

            try {
                if (typeof refreshCurrentView === 'function') {
                    refreshCurrentView();
                }
            } catch(uiErr) {
                console.warn("Aviso ao atualizar tela:", uiErr);
            }

            return true;
        } catch (err) {
            console.error("⚠️ Aviso na sincronização do Supabase:", err);
            this.updateOnlineBadge(false, "Modo Local");
            return false;
        }
    },

    // INICIALIZAÇÃO DE REALTIME
    initRealtime() {
        if (!supabaseClient || typeof supabaseClient.channel !== 'function') return;

        try {
            const channel = supabaseClient.channel('acbcsj-realtime')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'associados' }, () => {
                    console.log("⚡ Realtime: Tabela 'associados' alterada.");
                    dbService.getAssociados().then(() => { if (typeof refreshCurrentView === 'function') refreshCurrentView(); });
                })
                .on('postgres_changes', { event: '*', schema: 'public', table: 'financeiro_lancamentos' }, () => {
                    console.log("⚡ Realtime: Tabela 'financeiro_lancamentos' alterada.");
                    dbService.getFinanceiro().then(() => { if (typeof refreshCurrentView === 'function') refreshCurrentView(); });
                })
                .on('postgres_changes', { event: '*', schema: 'public', table: 'mensalidades' }, () => {
                    console.log("⚡ Realtime: Tabela 'mensalidades' alterada.");
                    dbService.getMensalidades().then(() => { if (typeof refreshCurrentView === 'function') refreshCurrentView(); });
                })
                .on('postgres_changes', { event: '*', schema: 'public', table: 'documentos' }, () => {
                    console.log("⚡ Realtime: Tabela 'documentos' alterada.");
                    dbService.getDocumentos().then(() => { if (typeof refreshCurrentView === 'function') refreshCurrentView(); });
                })
                .on('postgres_changes', { event: '*', schema: 'public', table: 'mensagens' }, () => {
                    console.log("⚡ Realtime: Tabela 'mensagens' alterada.");
                    dbService.getMensagens().then(() => { if (typeof refreshCurrentView === 'function') refreshCurrentView(); });
                })
                .subscribe();

            console.log("⚡ Supabase Realtime Ativado com sucesso!");
        } catch (e) {
            console.warn("Aviso ao ativar Realtime:", e);
        }
    },

    updateOnlineBadge(isOnline, text) {
        const badges = document.querySelectorAll('.supabase-status-badge');
        badges.forEach(b => {
            if (isOnline === true) {
                b.innerHTML = `🟢 <span>${text || 'Supabase Online'}</span>`;
                b.style.color = '#2ECC71';
                b.style.borderColor = 'rgba(46, 204, 113, 0.4)';
                b.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            } else if (isOnline === false) {
                b.innerHTML = `🔴 <span>${text || 'Supabase Offline'}</span>`;
                b.style.color = '#E74C3C';
                b.style.borderColor = 'rgba(231, 76, 60, 0.4)';
                b.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            } else {
                b.innerHTML = `🔄 <span>${text || 'Sincronizando...'}</span>`;
                b.style.color = '#F39C12';
                b.style.borderColor = 'rgba(243, 156, 18, 0.4)';
                b.style.backgroundColor = 'rgba(243, 156, 18, 0.1)';
            }
        });
    }
};

window.ENV_SUPABASE_URL = SUPABASE_URL;
window.ENV_SUPABASE_PUBLISHABLE_KEY = SUPABASE_PUBLISHABLE_KEY;
window.ENV_SUPABASE_SECRET_KEY = SUPABASE_SECRET_KEY;
window.ENV_SUPABASE_JWKS_URL = SUPABASE_JWKS_URL;
window.dbService = dbService;