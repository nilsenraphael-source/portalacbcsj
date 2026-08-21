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

function removerAÃ§Ã£os(str) {
    if (!str) return '';
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// HIGIENIZAÃ‡ÃƒO DE DADOS
function sanitizeAÃ§Ã£ociaÃ§Ã£o(item) {
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
        sexo: itemÃªsexo || '',
        telefone: item.telefone || '',
        logradouro: item.logradouro || '',
        numero: item.numero || '',
        complemento: item.complemento || '',
        cep: item.cep || '',
        bairro: item.bairro || '',
        cidade: item.cidade || 'SÃ£o JosÃ© - SC',
        perfil: item.perfil || 'associado',
        status: itemÃªs || 'pendente',
        data_cadastro: item.data_cadastro || new Date().toLocaleString('pt-BR'),
        data_desligamento: item.data_desligamento || null,
        motivo_desligamento: item.motivo_desligamento || null,
        carta_desligamento_url: item.carta_desligamento_url || null,
        carta_desligamento_nome: item.carta_desligamento_nome || null,
        obm: item.obm || 'SÃ£o JosÃ©',
        profissao: itemÃªssao || 'Bombeiro ComunitÃ¡rio',
        senha: itemÃªsenha || '1234'
    };
}

function sanitizeFinanceiro(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'lanc_' + Date.now()),
        tipo: item.tipo || 'despesa',
        descricao: itemÃªscricao || '',
        valor: parseFloat(item.valor) || 0,
        categoria: item.categoria || 'Geral',
        fornecedor_cliente: item.fornecedor_cliente || '',
        data: item.data || '',
        data_iso: item.data_iso || '',
        mÃªs: itemÃªs || '',
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
        visibilidade: itemÃªsibilidade || 'todos',
        data_vencimento: item.data_vencimento || null,
        descricao: itemÃªscricao || '',
        arquivo_nome: item.arquivo_nome || null,
        arquivo_url: item.arquivo_url || null,
        data_publicacao: item.data_publicacao || new Date().toLocaleDateString('pt-BR')
    };
}

function sanitizeMensalidade(item) {
    if (!item) return null;
    const cleanCpf = (item.cpf || '').replace(/\D/g, '');
    let assocId = itemÃªsociado_id || null;
    if (!assocId) {
        let list = [];
        try { list = JSON.parse(localStorage.getItem('acbcsj_associados')) || []; } catch(e) {}
        const assoc = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);
        if (assoc && assoc.id) assocId = String(assoc.id);
    }
    if (!assocId) assocId = "3"; // ID fallback para chave estrangeira

    const rawMeses = String(itemÃªs_quitados || itemÃªs_referencia || 'Jan').trim();
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

    const cleanObs = removerAÃ§Ã£os(itemÃªs || itemÃªservaÃ§Ãµes || item.comprovante_pix || 'Quitacao de mÃªsalidade PIX');

    return {
        id: String(item.id || 'mÃªsalidade_' + Date.now()),
        associado_id: String(assocId),
        cpf: String(item.cpf || '').substring(0, 20),
        ano: String(item.ano || '2026').substring(0, 20),
        mÃªs_referencia: removerAÃ§Ã£os(rawMesTruncated).substring(0, 20),
        mÃªs_quitados: rawMeses,
        data: String(item.data || item.data_pagamento || new Date().toLocaleDateString('pt-BR')).substring(0, 20),
        data_iso: item.data_iso || new Date().toISOString().split('T')[0],
        valor: (typeof item.valor !== 'undefined' && item.valor !== null && !isNaN(parseFloat(item.valor))) ? parseFloat(item.valor) : 0,
        status: String(itemÃªs || 'pago').substring(0, 20),
        data_pagamento: String(item.data || item.data_pagamento || new Date().toLocaleDateString('pt-BR')).substring(0, 20),
        observaÃ§Ãµes: cleanObs,
        comprovante_pix: item.comprovante_pix || 'PIX',
        obs: itemÃªs || cleanObs
    };
}

function sanitizeMensagem(item) {
    if (!item) return null;
    return {
        id: String(item.id || 'msg_' + Date.now()),
        associado_id: itemÃªsociado_id || itemÃªsociado_cpf || '',
        associado_cpf: itemÃªsociado_cpf || '',
        associado_nome: itemÃªsociado_nome || '',
        destinatario: itemÃªstinatario || 'todos',
        assunto: itemÃªsunto || '',
        conteudo: item.conteudo || itemÃªsagem || '',
        prioridade: item.prioridade || 'Informativo',
        resposta_diretoria: itemÃªsta_diretoria || '',
        status: itemÃªs || 'pendente',
        data_envio: item.data_envio || new Date().toLocaleString('pt-BR')
    };
}

// BANCO DE DADOS 100% BASEADO NO SUPABASE
const dbService = {
    // ASSOCIADOS
    async getAÃ§Ã£ociaÃ§Ã£os() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('associados').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.error("Erro no Supabase getAÃ§Ã£ociaÃ§Ã£os:", e);
            }
        }
        return JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    },

    async saveAÃ§Ã£ociaÃ§Ã£o(item) {
        const clean = sanitizeAÃ§Ã£ociaÃ§Ã£o(item);
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

    async deleteAÃ§Ã£ociaÃ§Ã£o(cpf) {
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
                const { data, error } = await supabaseClient.from('financeiro_lancamÃªs').select('*');
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
                await supabaseClient.from('financeiro_lancamÃªs').upsert([clean]);
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
                await supabaseClient.from('financeiro_lancamÃªs').delete().eq('id', id);
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
                const { data, error } = await supabaseClient.from('mÃªsalidades').select('*');
                if (!error && data && Array.isArray(data)) {
                    const sanitized = data.map(item => sanitizeMensalidade(item)).filter(Boolean);
                    localStorage.setItem('acbcsj_mÃªsalidades_histÃ³rico', JSON.stringify(sanitized));
                    if (typeof recalcularTodasGridsMensalidades === 'function') {
                        recalcularTodasGridsMensalidades();
                    }
                    return sanitized;
                }
            } catch (e) {
                console.error("Erro no Supabase getMensalidades:", e);
            }
        }
        return JSON.parse(localStorage.getItem('acbcsj_mÃªsalidades_histÃ³rico')) || [];
    },

    async addMensalidade(item) {
        const clean = sanitizeMensalidade(item);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mÃªsalidades_histÃ³rico')) || [];
        list = list.filter(m => m.id !== clean.id);
        list.unshift(clean);
        localStorage.setItem('acbcsj_mÃªsalidades_histÃ³rico', JSON.stringify(list));

        if (supabaseClient) {
            try {
                const payloadSupabase = {
                    id: clean.id,
                    associado_id: clean.associado_id,
                    cpf: clean.cpf,
                    ano: clean.ano,
                    mÃªs_referencia: clean.mÃªs_referencia,
                    valor: clean.valor,
                    status: clean.status,
                    data_pagamento: clean.data_pagamento,
                    observaÃ§Ãµes: clean.observaÃ§Ãµes
                };
                const { error } = await supabaseClient.from('mÃªsalidades').upsert([payloadSupabase]);
                if (error) {
                    console.error("⚠️ Erro ao salvar mÃªsalidade no Supabase:", error.mÃªsage);
                } else {
                    console.log("✅ Mensalidade salva com sucesso no Supabase:", clean.cpf, clean.mÃªs_referencia, clean.valor);
                }
            } catch (e) {
                console.error("Erro ao enviar mÃªsalidade para Supabase:", e);
            }
        }
        return true;
    },

    async clearMensalidades() {
        localStorage.setItem('acbcsj_mÃªsalidades_histÃ³rico', JSON.stringify([]));
        localStorage.setItem('acbcsj_mÃªsalidades_grid_2026', JSON.stringify([]));
        if (typeof recalcularTodasGridsMensalidades === 'function') {
            recalcularTodasGridsMensalidades();
        }
        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('mÃªsalidades').delete().neq('id', '0');
                if (error) console.error("âš ï¸ Erro ao limpar mÃªsalidades no Supabase:", error.mÃªsage);
                else console.log("ðŸ—‘ï¸ Todas as mÃªsalidades foram excluÃ­das do Supabase.");
            } catch (e) {
                console.error("Erro ao limpar mÃªsalidades do Supabase:", e);
            }
        }
        return true;
    },

    async deleteMensalidade(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_mÃªsalidades_histÃ³rico')) || [];
        list = list.filter(m => m.id !== id);
        localStorage.setItem('acbcsj_mÃªsalidades_histÃ³rico', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('mÃªsalidades').delete().eq('id', id);
            } catch (e) {
                console.error("Erro ao excluir mÃªsalidade do Supabase:", e);
            }
        }
        return true;
    },

    // MENSAGENS
    async getMensagens() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('mÃªsagens').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_mÃªsagens', JSON.stringify(data));
                    return data;
                }
            } catch (e) {}
        }
        return JSON.parse(localStorage.getItem('acbcsj_mÃªsagens')) || [];
    },

    async addMensagem(msg) {
        const clean = sanitizeMensagem(msg);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_mÃªsagens')) || [];
        list.unshift(clean);
        localStorage.setItem('acbcsj_mÃªsagens', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('mÃªsagens').upsert([clean]);
            } catch (e) {}
        }
        return true;
    },

    // DOCUMENTOS
    async getDocumÃªs() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('documÃªs').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_documÃªs', JSON.stringify(data));
                    return data;
                }
            } catch (e) {}
        }
        return JSON.parse(localStorage.getItem('acbcsj_documÃªs')) || [];
    },

    async saveDocumento(doc) {
        const clean = sanitizeDocumento(doc);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_documÃªs')) || [];
        const idx = list.findIndex(d => d.id === clean.id);
        if (idx >= 0) list[idx] = clean;
        else list.unshift(clean);
        localStorage.setItem('acbcsj_documÃªs', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('documÃªs').upsert([clean]);
            } catch (e) {}
        }
        return true;
    },

    async deleteDocumento(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_documÃªs')) || [];
        list = list.filter(d => d.id !== id);
        localStorage.setItem('acbcsj_documÃªs', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('documÃªs').delete().eq('id', id);
            } catch (e) {}
        }
        return true;
    },

    // BUSCAR TUDO EXCLUSIVAMENTE DO SUPABASE
    async syncFromÃªse() {
        if (!supabaseClient) return;

        console.log("ðŸŒ Carregando dados exclusÃ£os do Supabase...");
        try {
            const [assocRes, finRes, mÃªs, docRes, mÃªs] = await PromÃªse.all([
                supabaseClient.from('associados').select('*'),
                supabaseClient.from('financeiro_lancamÃªs').select('*'),
                supabaseClient.from('mÃªsagens').select('*'),
                supabaseClient.from('documÃªs').select('*'),
                supabaseClient.from('mÃªsalidades').select('*')
            ]);

            if (!assocRes.error && assocRes.data) {
                localStorage.setItem('acbcsj_associados', JSON.stringify(assocRes.data));
            }
            if (!finRes.error && finRes.data) {
                localStorage.setItem('acbcsj_financeiro', JSON.stringify(finRes.data));
            }
            if (!mÃªs.error && mÃªs.data) {
                localStorage.setItem('acbcsj_mÃªsagens', JSON.stringify(mÃªs.data));
            }
            if (!docRes.error && docRes.data) {
                localStorage.setItem('acbcsj_documÃªs', JSON.stringify(docRes.data));
            }
            if (!mÃªs.error && mÃªs.data && Array.isArray(mÃªs.data)) {
                const sanitizedMens = mÃªs.data.map(item => sanitizeMensalidade(item)).filter(Boolean);
                localStorage.setItem('acbcsj_mÃªsalidades_histÃ³rico', JSON.stringify(sanitizedMens));
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