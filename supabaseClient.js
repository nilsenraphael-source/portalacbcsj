// CONECTOR SUPABASE DO PORTAL ACBCSJ

const SUPABASE_URL = window.ENV_SUPABASE_URL || "https://ucutgspmvbupknjodeit.supabase.co";
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || "sb_publishable_drRsr2KSefHZqctSxlU7qA_b3xOj7RJ";

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("🟢 Cofre de Contatos e Dados (Supabase) Conectado!");
    } catch (e) {
        console.warn("⚠️ Supabase não inicializado. Usando modo local.", e);
    }
} else {
    console.log("ℹ️ Sistema rodando com Banco Local.");
}

// Funções Helpers para Comunicação com Supabase / LocalStorage
const dbService = {
    async getAssociados() {
        if (supabaseClient) {
            const { data, error } = await supabaseClient.from('associados').select('*');
            if (!error && data && data.length > 0) return data;
        }
        return JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    },

    async saveAssociado(associado) {
        if (supabaseClient) {
            const { data, error } = await supabaseClient.from('associados').upsert([associado]);
            if (!error) return true;
        }
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const index = list.findIndex(a => a.cpf === associado.cpf);
        if (index >= 0) {
            list[index] = { ...list[index], ...associado };
        } else {
            list.push(associado);
        }
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        return true;
    },

    async deleteAssociado(cpf) {
        if (supabaseClient) {
            await supabaseClient.from('associados').delete().eq('cpf', cpf);
        }
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        return true;
    },

    async getFinanceiro() {
        if (supabaseClient) {
            const { data, error } = await supabaseClient.from('financeiro_lancamentos').select('*');
            if (!error && data && data.length > 0) return data;
        }
        return JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    },

    async addFinanceiro(lancamento) {
        if (supabaseClient) {
            await supabaseClient.from('financeiro_lancamentos').insert([lancamento]);
        }
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list.push(lancamento);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));
        return true;
    },

    async getMensagens() {
        if (supabaseClient) {
            const { data, error } = await supabaseClient.from('mensagens').select('*');
            if (!error && data && data.length > 0) return data;
        }
        return JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    },

    async addMensagem(msg) {
        if (supabaseClient) {
            await supabaseClient.from('mensagens').insert([msg]);
        }
        let list = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        list.push(msg);
        localStorage.setItem('acbcsj_mensagens', JSON.stringify(list));
        return true;
    },

    async getDocumentos() {
        if (supabaseClient) {
            const { data, error } = await supabaseClient.from('documentos').select('*');
            if (!error && data && data.length > 0) return data;
        }
        return JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    },

    async saveDocumento(doc) {
        if (supabaseClient) {
            try {
                const dbDoc = {
                    titulo: doc.titulo,
                    categoria: doc.categoria,
                    visibilidade: doc.visibilidade || 'todos',
                    data_vencimento: doc.data_vencimento || null,
                    arquivo_nome: doc.arquivo_nome || null
                };
                await supabaseClient.from('documentos').upsert([dbDoc]);
            } catch (e) {
                console.warn('Erro ao sincronizar com Supabase:', e);
            }
        }
        let list = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        const index = list.findIndex(d => d.id === doc.id);
        if (index >= 0) {
            list[index] = { ...list[index], ...doc };
        } else {
            list.unshift(doc);
        }
        try {
            localStorage.setItem('acbcsj_documentos', JSON.stringify(list));
        } catch (e) {}
        return true;
    },

    async deleteDocumento(id) {
        if (supabaseClient) {
            try {
                await supabaseClient.from('documentos').delete().eq('id', id);
            } catch (e) {}
        }
        let list = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        list = list.filter(d => d.id !== id);
        try {
            localStorage.setItem('acbcsj_documentos', JSON.stringify(list));
        } catch (e) {}
        return true;
    }
};
