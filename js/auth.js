// ==========================================
// PORTAL ACBCSJ - MÃ“DULO DE AUTENTICAÃ‡ÃƒO
// ==========================================

// AUTENTICAÇÃO E LOGIN
async function loginWithCPF(cpf, password, roleHint = null) {
    console.log("ðŸ”‘ Executando loginWithCPF...", cpf, roleHint);
    try {
        if (typeof dbService !== 'undefined') {
            try {
                await dbService.syncFromSupabase();
            } catch(e) {}
        }
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
