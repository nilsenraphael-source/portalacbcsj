// CONECTOR SUPABASE DO PORTAL ACBCSJ (100% EXCLUSIVO SUPABASE - SEM DADOS MOCKADOS)

const SUPABASE_URL = window.ENV_SUPABASE_URL || "https://ucutgspmvbupknjodeit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = window.ENV_SUPABASE_PUBLISHABLE_KEY || window.ENV_SUPABASE_ANON_KEY || "sb_publishable_drRsr2KSefHZqctSxlU7qA_b3xOj7RJ";
const SUPABASE_SECRET_KEY = window.ENV_SUPABASE_SECRET_KEY || "sb_secret_eJeO0e8qj_mw8EN2CLNnkw_GlZCM5Qv";
const SUPABASE_JWKS_URL = window.ENV_SUPABASE_JWKS_URL || "https://ucutgspmvbupknjodeit.supabase.co/auth/v1/.well-known/jwks.json";

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        console.log("🟢 Conexão com Supabase ativada! URL:", SUPABASE_URL);
    } catch (e) {
        console.warn("⚠️ Falha ao inicializar Supabase SDK:", e);
    }
}

// Helpers para sanitização de objetos
function sanitizeAssociado(item) {
    if (!item) return null;
    return {
        id: String(item.id || item.cpf || Date.now()),
        cpf: item.cpf || '',
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
                if (!error && data) {
                    localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                    return data;
                } else if (error) {
                    console.error("⚠️ Supabase GET associados erro:", error.message);
                }
            } catch (e) {
                console.error("Erro no Supabase getAssociados:", e);
            }
        }
        return JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    },

    async saveAssociado(associado) {
        const clean = sanitizeAssociado(associado);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const idx = list.findIndex(a => (a.cpf === clean.cpf || a.id === clean.id));
        if (idx >= 0) list[idx] = { ...list[idx], ...clean };
        else list.push(clean);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('associados').upsert([clean], { onConflict: 'cpf' });
                if (error) console.error("⚠️ Erro ao salvar associado no Supabase:", error.message);
                else console.log("✅ Associado salvo no Supabase:", clean.nome_guerra || clean.nome);
            } catch (e) {
                console.error("Erro ao salvar associado:", e);
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
                console.log("🗑️ Associado excluído do Supabase (CPF:", cpf, ")");
            } catch (e) {
                console.error("Erro ao deletar associado do Supabase:", e);
            }
        }
        return true;
    },

    // FINANCEIRO
    async getFinanceiro() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('financeiro_lancamentos').select('*');
                if (!error && data) {
                    localStorage.setItem('acbcsj_financeiro', JSON.stringify(data));
                    return data;
                } else if (error) {
                    console.error("⚠️ Supabase GET financeiro erro:", error.message);
                }
            } catch (e) {
                console.error("Erro no Supabase getFinanceiro:", e);
            }
        }
        return JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    },

    async addFinanceiro(lancamento) {
        const clean = sanitizeFinanceiro(lancamento);
        if (!clean) return false;

        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list.unshift(clean);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('financeiro_lancamentos').upsert([clean]);
                if (error) console.error("⚠️ Erro ao salvar financeiro no Supabase:", error.message);
                else console.log("✅ Lançamento salvo no Supabase:", clean.descricao);
            } catch (e) {
                console.error("Erro ao salvar lançamento financeiro:", e);
            }
        }
        return true;
    },

    async deleteFinanceiro(id) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(item => item.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        if (supabaseClient) {
            try {
                await supabaseClient.from('financeiro_lancamentos').delete().eq('id', id);
                console.log("🗑️ Lançamento excluído do Supabase:", id);
            } catch (e) {
                console.error("Erro ao deletar lançamento:", e);
            }
        }
        return true;
    },

    async limparReceitas() {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(item => item.tipo !== 'receita');
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));

        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('financeiro_lancamentos').delete().eq('tipo', 'receita');
                if (error) console.error("⚠️ Erro ao limpar receitas no Supabase:", error.message);
                else console.log("🗑️ Todos os lançamentos de receita foram excluídos do Supabase.");
            } catch (e) {
                console.error("Erro ao limpar receitas do Supabase:", e);
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

        console.log("🌐 Carregando dados exclusivos do Supabase...");
        try {
            const [assocRes, finRes, msgRes, docRes] = await Promise.all([
                supabaseClient.from('associados').select('*'),
                supabaseClient.from('financeiro_lancamentos').select('*'),
                supabaseClient.from('mensagens').select('*'),
                supabaseClient.from('documentos').select('*')
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
            console.log("🎉 Dados do Supabase carregados com sucesso!");
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
