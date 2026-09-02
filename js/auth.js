// ==========================================
// PORTAL ACBCSJ - MÓDULO DE AUTENTICAÇÃO E SEGURANÇA
// ==========================================

// Alternar visibilidade da senha na tela de login
function toggleVisibilidadeLoginSenha() {
    const passInput = document.getElementById('loginSenha');
    const btn = document.getElementById('btnToggleLoginSenha');
    if (!passInput) return;
    if (passInput.type === 'password') {
        passInput.type = 'text';
        if (btn) btn.innerHTML = '🙈 Ocultar';
    } else {
        passInput.type = 'password';
        if (btn) btn.innerHTML = '👁️ Mostrar';
    }
}
window.toggleVisibilidadeLoginSenha = toggleVisibilidadeLoginSenha;

// AUTENTICAÇÃO E LOGIN SEGURO
async function loginWithCPF(cpf, password) {
    const rawCpf = String(cpf || '').trim();
    const cleanInputCPF = rawCpf.replace(/\D/g, '');
    const inputPassword = String(password || '').trim();

    console.log("🔑 Executando validação de login seguro para CPF:", rawCpf);

    // Validação de preenchimento dos campos
    if (!rawCpf || cleanInputCPF.length === 0) {
        alert("⚠️ Por favor, informe o seu CPF cadastrado.");
        const el = document.getElementById('loginCPF');
        if (el) el.focus();
        return false;
    }

    if (!inputPassword || inputPassword.length === 0) {
        alert("⚠️ Por favor, digite a sua senha de acesso.");
        const el = document.getElementById('loginSenha');
        if (el) el.focus();
        return false;
    }

    try {
        // Tenta sincronizar os dados mais recentes do Supabase se disponível
        if (typeof dbService !== 'undefined' && typeof dbService.syncFromSupabase === 'function') {
            try {
                await dbService.syncFromSupabase();
            } catch(e) {
                console.warn("Aviso ao sincronizar dados antes do login:", e);
            }
        }

        // Obtém a lista atual de associados
        let list = [];
        try { list = JSON.parse(localStorage.getItem('acbcsj_associados')) || []; } catch(e) {}
        
        if (!list || list.length < 50) {
            if (typeof MOCK_DATA_INITIAL !== 'undefined' && MOCK_DATA_INITIAL.associados && MOCK_DATA_INITIAL.associados.length >= 50) {
                list = MOCK_DATA_INITIAL.associados;
            } else if (typeof ASSOCIADOS_PLANILHA_REAL !== 'undefined' && ASSOCIADOS_PLANILHA_REAL.length > 0) {
                list = ASSOCIADOS_PLANILHA_REAL;
            }
        }

        // Garante que os lançamentos financeiros existam
        let finList = [];
        try { finList = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || []; } catch(e) {}
        if (!finList || finList.length === 0) {
            if (typeof INITIAL_LANCAMENTOS_DATA !== 'undefined' && Array.isArray(INITIAL_LANCAMENTOS_DATA) && INITIAL_LANCAMENTOS_DATA.length > 0) {
                localStorage.setItem('acbcsj_financeiro', JSON.stringify(INITIAL_LANCAMENTOS_DATA));
            }
        }

        // Remove qualquer conta genérica legada (000.000.000-00) da lista
        list = list.filter(a => a.cpf !== '000.000.000-00' && (a.cpf || '').replace(/\D/g, '') !== '00000000000');
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        // Busca o usuário exclusivamente pelo CPF digitado
        const found = list.find(a => {
            const itemCleanCpf = (a.cpf || '').replace(/\D/g, '');
            return itemCleanCpf === cleanInputCPF || a.cpf === rawCpf;
        });

        // 1. SE O CPF NÃO EXISTE NO CADASTRO -> BLOQUEIA TOTALMENTE
        if (!found) {
            alert("🚫 ACESSO NÃO AUTORIZADO!\n\nCPF não encontrado na base de associados da ACBCSJ.\n\nVerifique os dígitos digitados ou solicite o seu Pré-Cadastro caso ainda não possua registro.");
            const passEl = document.getElementById('loginSenha');
            if (passEl) passEl.value = '';
            const cpfEl = document.getElementById('loginCPF');
            if (cpfEl) {
                cpfEl.focus();
                cpfEl.select();
            }
            return false;
        }

        // 2. SE O USUÁRIO ESTIVER DESLIGADO -> BLOQUEIA
        if (found.status === 'desligado') {
            alert("🚫 ACESSO BLOQUEADO!\n\nEste cadastro consta como DESLIGADO do quadro de associados da ACBCSJ.\n\nPara maiores esclarecimentos, entre em contato com a Diretoria.");
            const passEl = document.getElementById('loginSenha');
            if (passEl) passEl.value = '';
            return false;
        }

        // 3. SE O USUÁRIO ESTIVER PENDENTE DE APROVAÇÃO -> BLOQUEIA
        if (found.status === 'pendente') {
            alert("⏳ CADASTRO PENDENTE DE APROVAÇÃO!\n\nSua solicitação de pré-cadastro foi enviada e está aguardando homologação/aprovação pela Diretoria.\n\nVocê receberá acesso assim que for aprovado.");
            const passEl = document.getElementById('loginSenha');
            if (passEl) passEl.value = '';
            return false;
        }

        // 4. VALIDAÇÃO RIGOROSA E ESTRITA DA SENHA INDIVIDUAL
        let senhaEsperada = String(found.senha || '').trim();

        // Caso o registro no banco não possua campo senha preenchido:
        if (!senhaEsperada) {
            if (cleanInputCPF.length >= 4) {
                senhaEsperada = cleanInputCPF.substring(0, 4);
            } else {
                senhaEsperada = '1234';
            }
        }

        // Comparação ESTRITA da senha digitada com a senha individual do usuário
        if (inputPassword !== senhaEsperada) {
            alert("❌ SENHA INCORRETA!\n\nA senha digitada não confere com o cadastro deste CPF.\n\n💡 Dica: Para novos associados a senha padrão inicial são os 4 primeiros dígitos do seu CPF.");
            const passEl = document.getElementById('loginSenha');
            if (passEl) {
                passEl.value = '';
                passEl.focus();
            }
            return false;
        }

        // 5. LOGIN BEM-SUCEDIDO
        currentUser = found;
        try {
            sessionStorage.setItem('acbcsj_logged_user', JSON.stringify({ cpf: found.cpf, perfil: found.perfil, nome: found.nome_guerra || found.nome }));
        } catch(e) {}

        console.log(`✅ Login autenticado com sucesso: ${found.nome_guerra || found.nome} (${(found.perfil || 'associado').toUpperCase()})`);

        // Exibição do Dashboard
        const authScreen = document.getElementById('authScreen');
        const appDashboard = document.getElementById('appDashboard');

        if (authScreen) authScreen.setAttribute('style', 'display: none !important;');
        if (appDashboard) appDashboard.setAttribute('style', 'display: flex !important; min-height: 100vh; flex-direction: column;');

        try {
            renderUserHeader();
            renderSidebarMenu();
            navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
        } catch (uiErr) {
            console.error('Aviso ao carregar telas pós-login:', uiErr);
        }

        return true;
    } catch (err) {
        console.error('Erro no processamento do login:', err);
        alert('⚠️ Ocorreu um erro ao processar a autenticação. Por favor, tente novamente.');
        // Em caso de erro, NUNCA abre o dashboard
        const authScreen = document.getElementById('authScreen');
        const appDashboard = document.getElementById('appDashboard');
        if (appDashboard) appDashboard.setAttribute('style', 'display: none !important;');
        if (authScreen) authScreen.setAttribute('style', 'display: flex !important;');
        return false;
    }
}

window.loginWithCPF = loginWithCPF;

function logout() {
    currentUser = null;
    try {
        sessionStorage.removeItem('acbcsj_logged_user');
    } catch(e) {}

    const authScreen = document.getElementById('authScreen');
    const appDashboard = document.getElementById('appDashboard');

    if (appDashboard) appDashboard.setAttribute('style', 'display: none !important;');
    if (authScreen) authScreen.setAttribute('style', 'display: flex !important;');

    const passInput = document.getElementById('loginSenha');
    if (passInput) passInput.value = '';
    const cpfInput = document.getElementById('loginCPF');
    if (cpfInput) {
        cpfInput.value = '';
        cpfInput.focus();
    }
}

window.logout = logout;
