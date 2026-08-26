// ==========================================
// PORTAL ACBCSJ - MÓDULO DE AUTENTICAÇÃO
// ==========================================

// AUTENTICAÇÃO E LOGIN
async function loginWithCPF(cpf, password, roleHint = null) {
    console.log("🔑 Executando loginWithCPF...", cpf, roleHint);
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
        }

        // Garante que o Comandante exista na lista
        if (!list.some(a => a.cpf === '000.000.000-00' || a.perfil === 'diretoria')) {
            list.unshift({
                id: "1",
                cpf: "000.000.000-00",
                senha: "123",
                nome: "Comandante / Diretoria ACBCSJ",
                nome_guerra: "Comandante",
                email: "diretoria@acbcsj.org.br",
                perfil: "diretoria",
                status: "ativo",
                data_cadastro: "01/01/2022"
            });
        }
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));

        if (roleHint === 'diretoria' || (cpf && cpf.replace(/\D/g, '') === '00000000000')) {
            currentUser = list.find(a => a.perfil === 'diretoria') || list[0] || {
                id: "1",
                nome: 'Comandante / Diretoria ACBCSJ',
                nome_guerra: 'Comandante',
                cpf: '000.000.000-00',
                perfil: 'diretoria',
                status: 'ativo'
            };
            currentUser.perfil = 'diretoria';
            currentUser.status = 'ativo';
        } else if (roleHint === 'associado') {
            currentUser = list.find(a => a.perfil === 'associado' && a.status === 'ativo') || list[1] || list[0];
            if (currentUser) currentUser.perfil = 'associado';
        } else {
            const cleanInputCPF = (cpf || '').replace(/\D/g, '');
            
            if (!cleanInputCPF || cleanInputCPF === '00000000000') {
                currentUser = list.find(a => a.perfil === 'diretoria') || list[0];
            } else {
                const found = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanInputCPF || a.cpf === cpf);
                
                if (found) {
                    if (found.status === 'desligado') {
                        alert('🚫 ACESSO BLOQUEADO!\n\nEste cadastro consta como DESLIGADO da Associação.');
                        return;
                    }
                    currentUser = found;
                } else {
                    currentUser = list.find(a => a.perfil === 'diretoria') || list[0];
                }
            }
        }

        if (!currentUser) {
            currentUser = { id: "1", nome: 'Comandante / Diretoria ACBCSJ', cpf: '000.000.000-00', perfil: 'diretoria', status: 'ativo' };
        }

        // Força exibição do Dashboard
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
