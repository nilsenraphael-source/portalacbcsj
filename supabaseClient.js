// CONECTOR SUPABASE DO PORTAL ACBCSJ (COM SUPORTE A VERCEL E NUVEM)

const SUPABASE_URL = window.ENV_SUPABASE_URL || "https://ucutgspmvbupknjodeit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = window.ENV_SUPABASE_PUBLISHABLE_KEY || window.ENV_SUPABASE_ANON_KEY || "sb_publishable_drRsr2KSefHZqctSxlU7qA_b3xOj7RJ";
const SUPABASE_SECRET_KEY = window.ENV_SUPABASE_SECRET_KEY || "sb_secret_eJeO0e8qj_mw8EN2CLNnkw_GlZCM5Qv";
const SUPABASE_JWKS_URL = window.ENV_SUPABASE_JWKS_URL || "https://ucutgspmvbupknjodeit.supabase.co/auth/v1/.well-known/jwks.json";

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        console.log("🟢 Conexão com Supabase ativada com sucesso! URL:", SUPABASE_URL);
    } catch (e) {
        console.warn("⚠️ Falha ao inicializar o Supabase SDK. Operando em modo offline/local fallback.", e);
    }
} else {
    console.log("ℹ️ Supabase não detectado globalmente. Usando armazenamento LocalStorage.");
}

// Helper de Higienização de Objetos para evitar erros de schema no Supabase
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

// SERVIÇO DE BANCO DE DADOS INTEGRADO (SUPABASE + LOCALSTORAGE BACKUP)
const dbService = {
    // ----------------------------------------------------
    // ASSOCIADOS
    // ----------------------------------------------------
    async getAssociados() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('associados').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_associados', JSON.stringify(data));
                    return data;
                } else if (error) {
                    console.warn("⚠️ Supabase GET associados avisou:", error.message);
                }
            } catch (e) {
                console.error("Erro na busca de associados no Supabase:", e);
            }
        }
        return JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    },

    async saveAssociado(associado) {
        const clean = sanitizeAssociado(associado);
        if (!clean) return false;

        // Atualiza LocalStorage imediatamente
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const idx = list.findIndex(a => (a.cpf === clean.cpf || a.id === clean.id));
        if (idx >= 0) {
            list[idx] = { ...list[idx], ...clean };
        } else {
            list.push(clean);
        }
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        // Envia para o Supabase
        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.from('associados').upsert([clean], { onConflict: 'cpf' });
                if (error) {
                    console.warn("⚠️ Erro ao salvar associado no Supabase:", error.message);
                } else {
                    console.log("✅ Associado sincronizado com Supabase:", clean.nome_guerra || clean.nome);
                }
            } catch (e) {
                console.error("Erro ao sincronizar associado:", e);
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
                console.log("🗑️ Associado removido no Supabase (CPF:", cpf, ")");
            } catch (e) {
                console.error("Erro ao deletar associado do Supabase:", e);
            }
        }
        return true;
    },

    // ----------------------------------------------------
    // FINANCEIRO
    // ----------------------------------------------------
    async getFinanceiro() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('financeiro_lancamentos').select('*');
                if (!error && data && data.length > 0) {
                    localStorage.setItem('acbcsj_financeiro', JSON.stringify(data));
                    return data;
                } else if (error) {
                    console.warn("⚠️ Supabase GET financeiro avisou:", error.message);
                }
            } catch (e) {
                console.error("Erro na busca do financeiro no Supabase:", e);
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
                if (error) {
                    console.warn("⚠️ Erro ao salvar lançamento no Supabase:", error.message);
                } else {
                    console.log("✅ Lançamento financeiro enviado ao Supabase:", clean.descricao);
                }
            } catch (e) {
                console.error("Erro ao enviar lançamento financeiro:", e);
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
                console.log("🗑️ Lançamento removido do Supabase:", id);
            } catch (e) {
                console.error("Erro ao deletar lançamento no Supabase:", e);
            }
        }
        return true;
    },

    // ----------------------------------------------------
    // MENSAGENS E COMUNICADOS
    // ----------------------------------------------------
    async getMensagens() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('mensagens').select('*');
                if (!error && data && data.length > 0) {
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
                const { error } = await supabaseClient.from('mensagens').upsert([clean]);
                if (!error) console.log("✅ Comunicado/Mensagem sincronizada com Supabase:", clean.assunto);
            } catch (e) {}
        }
        return true;
    },

    // ----------------------------------------------------
    // DOCUMENTOS
    // ----------------------------------------------------
    async getDocumentos() {
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.from('documentos').select('*');
                if (!error && data && data.length > 0) {
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
                const { error } = await supabaseClient.from('documentos').upsert([clean]);
                if (!error) console.log("✅ Documento sincronizado com Supabase:", clean.titulo);
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

    // ----------------------------------------------------
    // SINCRONIZAÇÃO AUTOMÁTICA GERAL (PULL & SEED)
    // ----------------------------------------------------
    async syncFromSupabase() {
        if (!supabaseClient) {
            console.log("ℹ️ Modo Local Ativo (Supabase não conectado).");
            return;
        }

        console.log("🔄 Iniciando sincronização completa com o banco remoto Supabase...");

        try {
            // 1. ASSOCIADOS
            const { data: remoteAssociados, error: errAssoc } = await supabaseClient.from('associados').select('*');
            if (!errAssoc && remoteAssociados && remoteAssociados.length > 0) {
                console.log(`📥 ${remoteAssociados.length} associados baixados do Supabase.`);
                localStorage.setItem('acbcsj_associados', JSON.stringify(remoteAssociados));
            } else {
                // Se o Supabase estiver vazio, envia os associados locais/iniciais para lá (Seed)
                const localAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
                if (localAssociados.length > 0) {
                    console.log(`📤 Enviando ${localAssociados.length} associados iniciais para o Supabase...`);
                    const cleanList = localAssociados.map(sanitizeAssociado).filter(Boolean);
                    await supabaseClient.from('associados').upsert(cleanList, { onConflict: 'cpf' });
                }
            }

            // 2. FINANCEIRO
            const { data: remoteFin, error: errFin } = await supabaseClient.from('financeiro_lancamentos').select('*');
            if (!errFin && remoteFin && remoteFin.length > 0) {
                console.log(`📥 ${remoteFin.length} lançamentos financeiros baixados do Supabase.`);
                localStorage.setItem('acbcsj_financeiro', JSON.stringify(remoteFin));
            } else {
                const localFin = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
                if (localFin.length > 0) {
                    console.log(`📤 Enviando ${localFin.length} lançamentos financeiros iniciais para o Supabase...`);
                    const cleanFinList = localFin.map(sanitizeFinanceiro).filter(Boolean);
                    await supabaseClient.from('financeiro_lancamentos').upsert(cleanFinList);
                }
            }

            // 3. MENSAGENS
            const { data: remoteMsgs, error: errMsgs } = await supabaseClient.from('mensagens').select('*');
            if (!errMsgs && remoteMsgs && remoteMsgs.length > 0) {
                localStorage.setItem('acbcsj_mensagens', JSON.stringify(remoteMsgs));
            }

            // 4. DOCUMENTOS
            const { data: remoteDocs, error: errDocs } = await supabaseClient.from('documentos').select('*');
            if (!errDocs && remoteDocs && remoteDocs.length > 0) {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(remoteDocs));
            }

            console.log("✨ Sincronização em nuvem (Supabase + Vercel) concluída!");
        } catch (err) {
            console.warn("⚠️ Aviso durante a sincronização inicial:", err);
        }
    }
};

// Exportar configuracoes globalmente para acesso nos scripts da aplicacao
window.ENV_SUPABASE_URL = SUPABASE_URL;
window.ENV_SUPABASE_PUBLISHABLE_KEY = SUPABASE_PUBLISHABLE_KEY;
window.ENV_SUPABASE_SECRET_KEY = SUPABASE_SECRET_KEY;
window.ENV_SUPABASE_JWKS_URL = SUPABASE_JWKS_URL;
window.dbService = dbService;
