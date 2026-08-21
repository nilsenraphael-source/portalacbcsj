// CLIENTE SUPABASE OFICIAL DA ACBCSJ
const SUPABASE_URL = "https://ucutgspmvbupknjodeit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_drRsr2KSefHZqctSxlU7qA_b3xOj7RJ";
const SUPABASE_SECRET_KEY = "sb_secret_9N99Zf3L9d!q4Y3wP";
const SUPABASE_JWKS_URL = "https://ucutgspmvbupknjodeit.supabase.co/rest/v1/";

let supabaseClient = null;

if (typeof supabase !== 'undefined' && supabase.createClient) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        console.log("âœ… Supabase inicializado com sucesso!");
    } catch (e) {
        console.error("âš ï¸ Erro ao inicializar Supabase:", e);
    }
}

function removerAcentos(str) {
    if (!str) return '';
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// HIGIENIZAÃ‡ÃƒO DE DADOS
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
    if (!assocId) assocId = "3"; // ID fallback para chave estrangeira

    const rawMeses = String(item.meses_quitados || item.mes_referencia || 'Jan').trim();
    let rawMesTruncated = rawMeses;
    if (rawMesTruncated.length > 20) {
        const parts = rawMesTruncated.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length > 1) {
            rawMesTruncated = parts[0] + '-' + parts[parts.length - 1] + ' (' + parts.length + 'm)';
        }
        if (rawMesTruncated.length > 20) {
            rawMesTruncated = rawMesTruncated.substring(0, 20);
        }
    }

    const cleanObs = removerAcentos(item.obs || item.observacoes || item.comprovante_pix || 'Quitacao de mensalidade PIX');

    return {
        id: String(item.id || 'mensalidade_' + Date.now()),
        associado_id: String(assocId),
        cpf: String(item.cpf || '').substring(0, 20),
        ano: String(item.ano || '2026').substring(0, 20),
        mes_referencia: removerAcentos(rawMesTruncated).substring(0, 20),
        meses_quitados: rawMeses,
        data: String(item.data || item.data_pagamento || new Date().toLocaleDateString('pt-BR')).substring(0, 20),
        data_iso: item.data_iso || new Date().toISOString().split('T')[0],
        valor: (typeof item.valor !== 'undefined' && item.valor !== null && !isNaN(parseFloat(item.valor))) ? parseFloat(item.valor) : 0,
        status: String(item.status || 'pago').substring(0, 20),
        data_pagamento: String(item.data || item.data_pagamento || new Date().toLocaleDateString('pt-BR')).substring(0, 20),
        observacoes: cleanObs,
        comprovante_pix: item.comprovante_pix || 'PIX',
        obs: item.obs || cleanObs
    };
}

function sanitizeMensagem(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'msg_' + Date.now()),
        associado_id: item.associado_id || item.associado_cpf || '',
        associado_cpf: item.associado_cpf || '',
        associado_nome: item.associado_nome || '',
        destinatario: item.destinatario || 'todos',
        assunto: item.assunto || '',
        conteudo: item.conteudo || item.mensagem || '',
        prioridade: item.prioridade || 'Informativo',
        resposta_diretoria: item.resposta_diretoria || '',
        status: item.status || 'pendente',
        data_envio: item.data_envio || new Date().toLocaleString('pt-BR')
    };
}

// BANCO DE DADOS 100% BASEADO NO SUPABASE
const dbService = {
    // ASSOCIADOS
    async getAssociados() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('associados').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getAssociados:", e);
            }
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

        if (supabaseClient) {
            try {
                await supabaseClient.from('associados').upsert([clean]);
            } catch (e) {
                console.error("Erro ao salvar associado no Supabase:", e);
            }
        }
        return true;
    },

    async deleteAssociado(cpf) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('associados').delete().eq('cpf', cpf);
            } catch (e) {
                console.error("Erro ao excluir associado do Supabase:", e);
            }
        }
        return true;
    },

    // FINANCEIRO
    async getFinanceiro() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('financeiro_lancamentos').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_financeiro', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getFinanceiro:", e);
            }
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

        if (supabaseClient) {
            try {
                await supabaseClient.from('financeiro_lancamentos').upsert([clean]);
            } catch (e) {
                console.error("Erro ao salvar lanÃ§amento financeiro no Supabase:", e);
            }
        }
        return true;
    },

    async deleteFinanceiro(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(f => f.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('financeiro_lancamentos').delete().eq('id', id);
            } catch (e) {
                console.error("Erro ao excluir lanÃ§amento financeiro do Supabase:", e);
            }
        }
        return true;
    },

    // MENSALIDADES (BAIXAS)
    async getMensalidades() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('mensalidades').select('*');
                if (!error && data && Array.isArray(data)) {
                    const sanitized = data.map(item => sanitizeMensalidade(item)).filter(Boolean);
                    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(sanitized));
                    if (typeof recalcularTodasGridsMensalidades === 'function') {
                        recalcularTodasGridsMensalidades();
                    }
                    return sanitized;
                }
            } catch (e) {
                console.error("Erro no Supabase getMensalidades:", e);
            }
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

        if (supabaseClient) {
            try {
                const payloadSupabase = {
                    id: clean.id,
                    associado_id: clean.associado_id,
                    cpf: clean.cpf,
                    ano: clean.ano,
                    mes_referencia: clean.mes_referencia,
                    valor: clean.valor,
                    status: clean.status,
                    data_pagamento: clean.data_pagamento,
                    observacoes: clean.observacoes
                };
                const { error } = await supabaseClient.from('mensalidades').upsert([payloadSupabase]);
                if (error) {
                    console.error("⚠️ Erro ao salvar mensalidade no Supabase:", error.message);
                } else {
                    console.log("✅ Mensalidade salva com sucesso no Supabase:", clean.cpf, clean.mes_referencia, clean.valor);
                }
            } catch (e) {
                console.error("Erro ao enviar mensalidade para Supabase:", e);
            }
        }
        return true;
    },

    async clearMensalidades() {
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify([]));
        localStorage.setItem('acbcsj_mensalidades_grid_2026', JSON.stringify([]));
        if (typeof recalcularTodasGridsMensalidades === 'function') {
            recalcularTodasGridsMensalidades();
        }
        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('mensalidades').delete().neq('id', '0');
                if (error) console.error("âš ï¸ Erro ao limpar mensalidades no Supabase:", error.message);
                else console.log("ðŸ—‘ï¸ Todas as mensalidades foram excluÃ­das do Supabase.");
            } catch (e) {
                console.error("Erro ao limpar mensalidades do Supabase:", e);
            }
        }
        return true;
    },

    async deleteMensalidade(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
        list = list.filter(m => m.id !== id);
        localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('mensalidades').delete().eq('id', id);
            } catch (e) {
                console.error("Erro ao excluir mensalidade do Supabase:", e);
            }
        }
        return true;
    },

    // MENSAGENS
    async getMensagens() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('mensagens').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_mensagens', JSON.stringify(data));
                    return data;
                }
            } catch (e) {}
        }
        return JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    },

    async addMensagem(msg) {
        const clean = sanitizeMensagem(msg);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        list.unshift(clean);
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('mensagens').upsert([clean]);
            } catch (e) {}
        }
        return true;
    },

    // DOCUMENTOS
    async getDocumentos() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('documentos').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_documentos', JSON.stringify(data));
                    return data;
                }
            } catch (e) {}
        }
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

        if (supabaseClient) {
            try {
                await supabaseClient.from('documentos').upsert([clean]);
            } catch (e) {}
        }
        return true;
    },

    async deleteDocumento(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        list = list.filter(d => d.id !== id);
        localStorage.setItem('acbcsj_documentos', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('documentos').delete().eq('id', id);
            } catch (e) {}
        }
        return true;
    },

    // BUSCAR TUDO EXCLUSIVAMENTE DO SUPABASE
    async syncFromSupabase() {
        if (!supabaseClient) return;

        console.log("ðŸŒ Carregando dados exclusivos do Supabase...");
        try {
            const [assocRes, finRes, msgRes, docRes, mensRes] = await Promise.all([
                supabaseClient.from('associados').select('*'),
                supabaseClient.from('financeiro_lancamentos').select('*'),
                supabaseClient.from('mensagens').select('*'),
                supabaseClient.from('documentos').select('*'),
                supabaseClient.from('mensalidades').select('*')
            ]);

            if (!assocRes.error && assocRes.data) {
                localStorage.setItem('acbcsj_associados', JSON.stringify(assocRes.data));
            }
            if (!finRes.error && finRes.data) {
                localStorage.setItem('acbcsj_financeiro', JSON.stringify(finRes.data));
            }
            if (!msgRes.error && msgRes.data) {
                localStorage.setItem('acbcsj_mensagens', JSON.stringify(msgRes.data));
            }
            if (!docRes.error && docRes.data) {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(docRes.data));
            }
            if (!mensRes.error && mensRes.data && Array.isArray(mensRes.data)) {
                const sanitizedMens = mensRes.data.map(item => sanitizeMensalidade(item)).filter(Boolean);
                localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(sanitizedMens));
                if (typeof recalcularTodasGridsMensalidades === 'function') {
                    recalcularTodasGridsMensalidades();
                }
            }
            console.log("ðŸŽ‰ Dados do Supabase carregados com sucesso!");
        } catch (err) {
            console.error("âš ï¸ Erro ao consultar Supabase:", err);
        }
    }
};

window.ENV_SUPABASE_URL = SUPABASE_URL;
window.ENV_SUPABASE_PUBLISHABLE_KEY = SUPABASE_PUBLISHABLE_KEY;
window.ENV_SUPABASE_SECRET_KEY = SUPABASE_SECRET_KEY;
window.ENV_SUPABASE_JWKS_URL = SUPABASE_JWKS_URL;
window.dbService = dbService;