// ==========================================
// PORTAL ACBCSJ - MÃ“DULO CORE & ESTADO GLOBAL
// ==========================================

let currentUser = null;
let selectedAssociadoId = null;
let globalSelectedSocioId = null;

const INITIAL_MENSAL_DATA = [{"nome_guerra":"Comandante","nome_completo":"Comandante / Diretoria ACBCSJ","cpf":"000.000.000-00","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Angélica","nome_completo":"Angélica Mateus","cpf":"000.923.500-03","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Antunes","nome_completo":"Douglas Antunes","cpf":"074.136.669-01","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Augusto","nome_completo":"Murilo Augusto Galdino De Souza","cpf":"073.716.899-41","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Andreia","nome_completo":"Andreia de Fátima Machado","cpf":"961.193.810-15","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Bento","nome_completo":"Daniel Bento","cpf":"069.776.559-84","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Binhoti","nome_completo":"Tiago Binhoti","cpf":"083.801.589-11","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Boiko","nome_completo":"Emerson Roberto Boiko","cpf":"021.603.099-40","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Camila","nome_completo":"Camila Coelho Soares","cpf":"127.393.649-38","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Coelho","nome_completo":"Ricardo Augusto Coelho","cpf":"079.962.129-37","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Da Silva","nome_completo":"Alex Sandro Batista da Silva","cpf":"318.036.738-50","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Barros","nome_completo":"Michel da Silveira Barros","cpf":"001.637.940-30","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Deny","nome_completo":"Deny Anderson Azevedo","cpf":"910.414.909-25","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Eder","nome_completo":"Eder Alison Da Silva","cpf":"932.603.189-68","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Elaine","nome_completo":"Elaine Conrado Bittencourt","cpf":"047.913.959-80","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Fabiana","nome_completo":"Fabiana Oro Cericato Costa","cpf":"024.284.799-46","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Gabriel","nome_completo":"Gabriel Francisco Farias da Silva","cpf":"008.489.029-04","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Henkes","nome_completo":"Marcia Aparecida Henkes","cpf":"046.128.369-79","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Humberto","nome_completo":"Carlos Humberto luiz","cpf":"025.435.769-59","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ilton","nome_completo":"Ilton Saturnino Braz","cpf":"774.179.849-91","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Kassandra","nome_completo":"Gabriela Kassandra Luiz Colossi","cpf":"008.036.019-05","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Linder","nome_completo":"Gustavo Augusto Linder","cpf":"092.909.549-90","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Lourenço","nome_completo":"Carlos Henrique Lourenço Gonçalves","cpf":"015.513.347-04","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Lucas","nome_completo":"Lucas Rodrigues Antônio","cpf":"085.543.859-26","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Mayara","nome_completo":"Mayara Vieira Soares","cpf":"109.532.709-71","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Mina","nome_completo":"Kleber Pacheco Mina","cpf":"005.592.699-19","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Mithel","nome_completo":"Mithel Evergisto de Lima","cpf":"097.100.159-66","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Natayan","nome_completo":"Raphael Natayan Nilsen","cpf":"052.026.659-54","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Nery","nome_completo":"Gabriel Nery Cristiano","cpf":"060.594.529-22","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Oliveira","nome_completo":"Marcelo luiz de Oliveira","cpf":"770.614.709-68","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ozol","nome_completo":"Guilherme Ozol de Assunção","cpf":"091.275.619-50","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Pereira","nome_completo":"Emerson Pereira","cpf":"757.951.599-72","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ravache","nome_completo":"Caio Passold Ravache","cpf":"010.110.059-05","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Santana","nome_completo":"Michele Santana Quint","cpf":"003.357.419-76","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Sardá","nome_completo":"Julia da Silva Sardá","cpf":"120.391.089-47","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Schmitt","nome_completo":"André Luiz Schmitt","cpf":"155.303.359-00","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Spotti","nome_completo":"Kleber Spotti Rodrigues","cpf":"002.200.260-09","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Alves","nome_completo":"Uelder Alves Da Costa","cpf":"008.818.209-62","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ulysséia","nome_completo":"Ismael Vieira da Rosa Ulysséia","cpf":"416.967.609-25","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Yanka","nome_completo":"Yanka Caroliny Luciano","cpf":"104.320.579-94","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Yuri","nome_completo":"Yuri Esmerio dos Santos","cpf":"028.667.330-45","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Fortkamp","nome_completo":"Markian da Silveira Fortkamp","cpf":"068.052.249-26","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Jesus","nome_completo":"Karina  Maria de Jesus Sobrinho","cpf":"007.303.029-54","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Nakata","nome_completo":"Nakata Garra Gomes","cpf":"039.070.760-01","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Weverton","nome_completo":"Weverton José Machado","cpf":"125.366.669-56","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Martins","nome_completo":"Alexandre Vinicius Martins","cpf":"919.835.099-49","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Ana Carolina","nome_completo":"Ana Carolina Nascimento","cpf":"100.975.089-50","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Andréia M","nome_completo":"Andréia Martins dos Santos","cpf":"083.469.799-83","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Siqueira","nome_completo":"Fernando Pereira Siqueira Junior","cpf":"007.064.299-07","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Gonçalves","nome_completo":"Alessandro da Costa Gonçalves","cpf":"028.574.290-61","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Neumann","nome_completo":"Misael Dias Neumann","cpf":"147.564.459-00","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Luiz","nome_completo":"Luiz Fernando da Silva","cpf":"007.178.839-57","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Figueiredo","nome_completo":"João Victor Figueiredo Chrostowski","cpf":"097.355.079-19","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Luciano","nome_completo":"LUCIANO PEREIRA","cpf":"003.747.659-95","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Cardoso","nome_completo":"Claudio cardoso","cpf":"951.971.339-53","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Carvalho","nome_completo":"Diego Carvalho Cordova","cpf":"079.744.619-26","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Bunn","nome_completo":"João Pedro Pereira Bunn","cpf":"118.669.539-07","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Costa","nome_completo":"Vanessa David Costa","cpf":"065.194.139-33","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Sofie","nome_completo":"Izabelle Sofie Luiz","cpf":"096.581.989-29","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Fabian","nome_completo":"Fabian Henrique da Silva","cpf":"123.859.799-85","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Levi","nome_completo":"Washington Levi Nascimento Dias","cpf":"063.023.992-46","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Joaber","nome_completo":"Reinaldo Joaber de Araújo Spengler","cpf":"069.723.111-95","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Anderson","nome_completo":"Anderson Rafael Souza da Silva","cpf":"008.145.020-67","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Sadi","nome_completo":"Washington sadi de jesus","cpf":"092.158.639-66","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Perdoná","nome_completo":"Pâmela Aparecida da Luz Perdoná","cpf":"235.983.728-17","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Viapiana","nome_completo":"Otávio Augusto Viapiana","cpf":"108.677.459-08","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0},{"nome_guerra":"Steimbach","nome_completo":"Graziela steimbach","cpf":"063.871.729-93","jan":0,"fev":0,"mar":0,"abr":0,"mai":0,"jun":0,"jul":0,"ago":0,"set":0,"out":0,"nov":0,"dez":0}];
const INITIAL_LANCAMENTOS_DATA = [{"tipo":"despesa","id":"desp_1","valor":35,"data":"20/01/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-01-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"01/2026"},{"tipo":"despesa","id":"desp_2","valor":50,"data":"26/01/2026","fornecedor_cliente":"Sandro Martins","data_iso":"2026-01-26","categoria":"Outros","descricao":"Sandro Martins (Copo B4 / FECABOM)","mes":"01/2026"},{"tipo":"despesa","id":"desp_3","valor":0.17,"data":"31/01/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-01-31","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"01/2026"},{"tipo":"despesa","id":"desp_4","valor":170,"data":"09/02/2026","fornecedor_cliente":"Certificadora","data_iso":"2026-02-09","categoria":"Outros","descricao":"Certificado Digital","mes":"02/2026"},{"tipo":"despesa","id":"desp_5","valor":47.61,"data":"20/02/2026","fornecedor_cliente":"Camila C Soares","data_iso":"2026-02-20","categoria":"Presentes","descricao":"Brinde ReuniÃ£o Comando (Camila C Soares)","mes":"02/2026"},{"tipo":"despesa","id":"desp_6","valor":35,"data":"20/02/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-02-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"02/2026"},{"tipo":"despesa","id":"desp_7","valor":1945,"data":"23/02/2026","fornecedor_cliente":"Fornecedor Lancheiras","data_iso":"2026-02-23","categoria":"Presentes","descricao":"Lancheira aniversÃ¡rios Compra 1","mes":"02/2026"},{"tipo":"despesa","id":"desp_8","valor":775.8,"data":"23/02/2026","fornecedor_cliente":"Fornecedor Lancheiras","data_iso":"2026-02-23","categoria":"Presentes","descricao":"Lancheira aniversÃ¡rios Compra 2","mes":"02/2026"},{"tipo":"despesa","id":"desp_9","valor":0.17,"data":"28/02/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-02-28","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"02/2026"},{"tipo":"despesa","id":"desp_10","valor":800,"data":"12/03/2026","fornecedor_cliente":"Adriano Lima","data_iso":"2026-03-12","categoria":"Presentes","descricao":"Estampa das lancheiras (Adriano Lima)","mes":"03/2026"},{"tipo":"despesa","id":"desp_11","valor":35,"data":"20/03/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-03-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"03/2026"},{"tipo":"despesa","id":"desp_12","valor":0.88,"data":"30/03/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-03-30","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"03/2026"},{"tipo":"despesa","id":"desp_13","valor":240,"data":"13/04/2026","fornecedor_cliente":"JoÃ£o Valdeci Moraes","data_iso":"2026-04-13","categoria":"Treinamentos","descricao":"Coffee Break Treinamento APH (JoÃ£o Valdeci Moraes)","mes":"04/2026"},{"tipo":"despesa","id":"desp_14","valor":132.08,"data":"13/04/2026","fornecedor_cliente":"Camila Soares","data_iso":"2026-04-13","categoria":"Treinamentos","descricao":"Coffee Break Treinamento APH (Camila Soares)","mes":"04/2026"},{"tipo":"despesa","id":"desp_15","valor":35,"data":"20/04/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-04-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"04/2026"},{"tipo":"despesa","id":"desp_16","valor":193.67,"data":"24/04/2026","fornecedor_cliente":"Gabriel F. Farias","data_iso":"2026-04-24","categoria":"CartÃ³rio ou DocumentaÃ§Ã£o em geral","descricao":"CartÃ³rio (Gabriel F.Farias)","mes":"04/2026"},{"tipo":"despesa","id":"desp_17","valor":35,"data":"20/05/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-05-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"05/2026"},{"tipo":"despesa","id":"desp_18","valor":440.66,"data":"11/06/2026","fornecedor_cliente":"Prefeitura Municipal de SÃ£o JosÃ©","data_iso":"2026-06-11","categoria":"CartÃ³rio ou DocumentaÃ§Ã£o em geral","descricao":"Taxa de funcionamento PMSJ","mes":"06/2026"},{"tipo":"despesa","id":"desp_19","valor":184,"data":"11/06/2026","fornecedor_cliente":"Safe2pay","data_iso":"2026-06-11","categoria":"CartÃ³rio ou DocumentaÃ§Ã£o em geral","descricao":"Certificado Digital (Safe2pay)","mes":"06/2026"},{"tipo":"despesa","id":"desp_20","valor":80.85,"data":"18/06/2026","fornecedor_cliente":"Yanka","data_iso":"2026-06-18","categoria":"Mercado","descricao":"DecoraÃ§Ã£o e descartaveis - Jogo Copa do Mundo (Yanka)","mes":"06/2026"},{"tipo":"despesa","id":"desp_21","valor":248.35,"data":"22/06/2026","fornecedor_cliente":"MundialMIX","data_iso":"2026-06-22","categoria":"Mercado","descricao":"Mercado - Jogo Copa do Mundo (MundialMIX)","mes":"06/2026"},{"tipo":"despesa","id":"desp_22","valor":35.66,"data":"22/06/2026","fornecedor_cliente":"Yanka","data_iso":"2026-06-22","categoria":"Mercado","descricao":"Mercado - Jogo Copa do Mundo (Yanka)","mes":"06/2026"},{"tipo":"despesa","id":"desp_23","valor":35,"data":"22/06/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-06-22","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicred","mes":"06/2026"},{"tipo":"despesa","id":"desp_24","valor":36,"data":"23/06/2026","fornecedor_cliente":"IndÃºstria de PÃ£es","data_iso":"2026-06-23","categoria":"Mercado","descricao":"PÃ£es - Jogo Copa do Mundo (Industria de Paes)","mes":"06/2026"},{"tipo":"despesa","id":"desp_25","valor":0.71,"data":"30/06/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-06-30","categoria":"Tarifas Banco","descricao":"Tarifas Caixa Economica Federal","mes":"06/2026"},{"tipo":"despesa","id":"desp_26","valor":384,"data":"17/07/2026","fornecedor_cliente":"Kiko","data_iso":"2026-07-17","categoria":"Treinamentos","descricao":"Coffee Break - Palestra (Kiko)","mes":"07/2026"},{"tipo":"despesa","id":"desp_27","valor":35,"data":"20/07/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-07-20","categoria":"Tarifas Banco","descricao":"Taxa \"Cesta de Relacionamento\" Sicredi","mes":"07/2026"},{"tipo":"despesa","id":"desp_28","valor":38.88,"data":"22/07/2026","fornecedor_cliente":"Yanka","data_iso":"2026-07-22","categoria":"Treinamentos","descricao":"Refri - Palestra (Yanka)","mes":"07/2026"},{"tipo":"despesa","id":"desp_29","valor":19.93,"data":"27/07/2026","fornecedor_cliente":"Camila","data_iso":"2026-07-27","categoria":"Treinamentos","descricao":"Chocolate Palestrante Sgt Reinaldo - Palestra (Camila)","mes":"07/2026"},{"tipo":"receita","id":"rec_1","valor":0.4,"data":"31/01/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-01-31","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"01/2026"},{"tipo":"receita","id":"rec_2","valor":0.54,"data":"28/02/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-02-28","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"02/2026"},{"tipo":"receita","id":"rec_3","valor":0.62,"data":"30/03/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-03-30","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"03/2026"},{"tipo":"receita","id":"rec_4","valor":1.34,"data":"30/04/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-04-30","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"04/2026"},{"tipo":"receita","id":"rec_5","valor":11.31,"data":"04/05/2026","fornecedor_cliente":"Sicredi","data_iso":"2026-05-04","categoria":"Rendimentos","descricao":"Rendimentos SICREDI","mes":"05/2026"},{"tipo":"receita","id":"rec_6","valor":1.28,"data":"31/05/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-05-31","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"05/2026"},{"tipo":"receita","id":"rec_7","valor":25,"data":"11/06/2026","fornecedor_cliente":"Gustavo Linder","data_iso":"2026-06-11","categoria":"Eventos / Rendimentos","descricao":"Jogo Copa do Mundo - Acompanhante (Linder)","mes":"06/2026"},{"tipo":"receita","id":"rec_8","valor":25,"data":"15/06/2026","fornecedor_cliente":"Douglas Antunes","data_iso":"2026-06-15","categoria":"Eventos / Rendimentos","descricao":"jogo Copa do Mundo - Acompanhante (Antunes)","mes":"06/2026"},{"tipo":"receita","id":"rec_9","valor":25,"data":"17/06/2026","fornecedor_cliente":"Carlos Humberto","data_iso":"2026-06-17","categoria":"Eventos / Rendimentos","descricao":"Jogo Copa do Mundo - Acompanhante (Humberto)","mes":"06/2026"},{"tipo":"receita","id":"rec_10","valor":25,"data":"24/06/2026","fornecedor_cliente":"Gabriela Kassandra","data_iso":"2026-06-24","categoria":"Eventos / Rendimentos","descricao":"Jogo Copa do Mundo - Acompanhante (Kassandra)","mes":"06/2026"},{"tipo":"receita","id":"rec_11","valor":1.35,"data":"30/06/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-06-30","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"06/2026"},{"tipo":"receita","id":"rec_12","valor":1.35,"data":"31/07/2026","fornecedor_cliente":"Caixa EconÃ´mica Federal","data_iso":"2026-07-31","categoria":"Rendimentos","descricao":"Rendimentos Caixa Economica Federal","mes":"07/2026"}];
const ASSOCIADOS_PLANILHA_REAL = [{"id":"2","cpf":"000.923.500-03","senha":"0009","nome":"Angélica Mateus","nome_guerra":"Angélica","email":"amangelica14@gmail.com","data_nascimento":"23/05/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99814-2594","logradouro":"rua João Evangelista da Costa","numero":"","complemento":"","cep":"88090-301","bairro":"Coloninha","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/07/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"3","cpf":"074.136.669-01","senha":"0741","nome":"Douglas Antunes","nome_guerra":"Antunes","email":"douglas.antunes4012@gmail.com","data_nascimento":"24/09/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-4431","logradouro":"Rua Flores da Cunha","numero":"","complemento":"","cep":"88070-460","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"4","cpf":"073.716.899-41","senha":"0737","nome":"Murilo Augusto Galdino De Souza","nome_guerra":"Augusto","email":"galdinomus@gmail.com","data_nascimento":"04/07/1990","nome_pai":"NELSON JOSÉ DE SOUZA","nome_mae":"ZELIA MARIA SILVA DE SOUZA","sexo":"Masculino","telefone":"(48) 98494-1095","logradouro":"VALDIR GUTHIA","numero":"12","complemento":"ANA MELO","cep":"88135-186","bairro":"ARIRIU","cidade":"PALHOÇA","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"09/07/2023 17:45:12","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"5","cpf":"961.193.810-15","senha":"9611","nome":"Andreia de Fátima Machado","nome_guerra":"Andreia","email":"andreiamachado2508@gmail.com","data_nascimento":"25/08/1980","nome_pai":"Fredolino machado","nome_mae":"Catarina Benedett machado","sexo":"Feminino","telefone":"(48) 99697-0295","logradouro":"Rua Antônio Elias","numero":"22","complemento":"Casa","cep":"88106-160","bairro":"Picadas do sul","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/27/2023 0:07:42","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"6","cpf":"069.776.559-84","senha":"0697","nome":"Daniel Bento","nome_guerra":"Bento","email":"bentodani1989@gmail.com","data_nascimento":"01/08/1989","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99616-1172","logradouro":"Av Governador Ivo Silveira","numero":"","complemento":"","cep":"88085-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"18/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"7","cpf":"083.801.589-11","senha":"0838","nome":"Tiago Binhoti","nome_guerra":"Binhoti","email":"tiagobinhoti@gmail.com","data_nascimento":"30/09/1991","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98497-4657","logradouro":"rua Francisco Lutz de Almeida","numero":"","complemento":"","cep":"88108-173","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"8","cpf":"021.603.099-40","senha":"0216","nome":"Emerson Roberto Boiko","nome_guerra":"Boiko","email":"emersonboiko@gmail.com","data_nascimento":"26/06/1978","nome_pai":"Ladislau boiko","nome_mae":"Maria das dores Alves boiko","sexo":"Masculino","telefone":"(48) 99962-0506","logradouro":"Rua das amiexas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"2/24/2024 19:57:52","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"9","cpf":"127.393.649-38","senha":"1273","nome":"Camila Coelho Soares","nome_guerra":"Camila","email":"camila.coelhosoares@gmail.com","data_nascimento":"25/09/2000","nome_pai":"Pedro Soares","nome_mae":"Margarida Coelho","sexo":"Feminino","telefone":"(48) 99126-4292","logradouro":"Rua Walmor Beppler","numero":"S/N","complemento":"Servidão ao lado da casa 125","cep":"88136-257","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/04/2023 12:28:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"10","cpf":"079.962.129-37","senha":"0799","nome":"Ricardo Augusto Coelho","nome_guerra":"Coelho","email":"ricardo.pc15@gmail.com","data_nascimento":"09/08/1991","nome_pai":"Neri Geronimo Coelho","nome_mae":"Rute Helena do Nascimento","sexo":"Masculino","telefone":"(48) 98485-6290","logradouro":"Rua Santo André","numero":"518","complemento":"ap 201","cep":"88106-430","bairro":"Flor de napolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"4/29/2024 9:57:27","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"11","cpf":"318.036.738-50","senha":"3180","nome":"Alex Sandro Batista da Silva","nome_guerra":"Da Silva","email":"alexsandrob221@gmail.com","data_nascimento":"18/07/1983","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98426-9481","logradouro":"Bela Vista","numero":"","complemento":"","cep":"88119-114","bairro":"Potecas","cidade":"São Jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/02/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"12","cpf":"001.637.940-30","senha":"0016","nome":"Michel da Silveira Barros","nome_guerra":"Barros","email":"michel_sbarros@yahoo.com.br","data_nascimento":"27/07/1981","nome_pai":"José António Rodrigues barros","nome_mae":"Ana lucia da silveira barros","sexo":"Masculino","telefone":"(48) 98821-7860","logradouro":"Rua José Cláudio Schmidt","numero":"50","complemento":"50","cep":"88115-558","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/28/2024 5:17:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"13","cpf":"910.414.909-25","senha":"9104","nome":"Deny Anderson Azevedo","nome_guerra":"Deny","email":"denyazevedo1972@gmail.com","data_nascimento":"06/08/1972","nome_pai":"Neri Azevedo","nome_mae":"Laurita Bernadete Azevedo","sexo":"Masculino","telefone":"(48) 99868-3269","logradouro":"Rua Algarves","numero":"S/n","complemento":"Quadra 12 Loteb3","cep":"88107-365","bairro":"Lisboa","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/30/2023 12:08:42","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"14","cpf":"932.603.189-68","senha":"9326","nome":"Eder Alison Da Silva","nome_guerra":"Eder","email":"eder.alisondasilva@gmail.com","data_nascimento":"21/06/1978","nome_pai":"","nome_mae":"","sexo":"Masculino","telefone":"(48) 99834-6944","logradouro":"rua Tercílio Tedesco","numero":"","complemento":"","cep":"88107-481","bairro":"Potecas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"15","cpf":"047.913.959-80","senha":"0479","nome":"Elaine Conrado Bittencourt","nome_guerra":"Elaine","email":"corretoraimobiliariaelaine@gmail.com","data_nascimento":"01/06/1984","nome_pai":"Sidnei Conrado","nome_mae":"Maria Fátima de Pinho","sexo":"Feminino","telefone":"(48) 99119-2407","logradouro":"Rua São João","numero":"500","complemento":"Casa","cep":"88140-000","bairro":"Centro","cidade":"Santo Amaro da Imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/01/2024 21:37:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"16","cpf":"024.284.799-46","senha":"0242","nome":"Fabiana Oro Cericato Costa","nome_guerra":"Fabiana","email":"fabicericato@gmail.com","data_nascimento":"18/11/1979","nome_pai":"Domingo Cericato","nome_mae":"Judite Therezinha Oro Cericato","sexo":"Feminino","telefone":"(48) 98831-5620","logradouro":"Madre Benvenuta","numero":"388","complemento":"Apto 911","cep":"88036-500","bairro":"Trindade","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 12:58:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"17","cpf":"008.489.029-04","senha":"0084","nome":"Gabriel Francisco Farias da Silva","nome_guerra":"Gabriel","email":"bombeirofloripa2011@hotmail.com","data_nascimento":"26/01/1985","nome_pai":"Paulo Roberto da Silva","nome_mae":"Maria da Graça Farias Haskel","sexo":"Masculino","telefone":"(48) 99852-5717","logradouro":"João Batista Derner Neves","numero":"25","complemento":"ap1005","cep":"88102-270","bairro":"Kobrasol","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/09/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"18","cpf":"046.128.369-79","senha":"0461","nome":"Marcia Aparecida Henkes","nome_guerra":"Henkes","email":"mahenkes@gmail.com","data_nascimento":"08/08/1984","nome_pai":"Antônio Adão Henkes","nome_mae":"Ana Geni Veloso de Linhares Henkes","sexo":"Feminino","telefone":"(48) 99800-0811","logradouro":"Rua das Ameixas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"2/25/2024 19:39:32","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"19","cpf":"025.435.769-59","senha":"0254","nome":"Carlos Humberto luiz","nome_guerra":"Humberto","email":"carluzjr@hotmail.com","data_nascimento":"02/12/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99117-2211","logradouro":"Rua Madre tereza de Calcutá","numero":"","complemento":"","cep":"","bairro":"Real Parque","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/06/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"20","cpf":"774.179.849-91","senha":"7741","nome":"Ilton Saturnino Braz","nome_guerra":"Ilton","email":"iltonbraz.bc@gmail.com","data_nascimento":"22/01/1969","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99926-0398","logradouro":"Antonio Goncalves Chaves","numero":"","complemento":"","cep":"88130-545","bairro":"Ponte Imaruim","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/03/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"21","cpf":"008.036.019-05","senha":"0080","nome":"Gabriela Kassandra Luiz Colossi","nome_guerra":"Kassandra","email":"kassandracolossi1090@gmail.com","data_nascimento":"08/10/1984","nome_pai":"Paulo Roberto Luiz","nome_mae":"Katia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 98475-8962","logradouro":"Maria Helena Kretzer","numero":"503","complemento":"casa","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/18/2023 12:32:54","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"22","cpf":"092.909.549-90","senha":"0929","nome":"Gustavo Augusto Linder","nome_guerra":"Linder","email":"augustolinder@gmail.com","data_nascimento":"19/10/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99850-3832","logradouro":"Rua Cabo Oderli Schilchting","numero":"","complemento":"","cep":"","bairro":"Passa Vinte","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"23","cpf":"015.513.347-04","senha":"0155","nome":"Carlos Henrique Lourenço Gonçalves","nome_guerra":"Lourenço","email":"carioca-henrique@hotmail.com","data_nascimento":"22/09/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99936-9240","logradouro":"rua Conde Afonso Celso","numero":"","complemento":"","cep":"88070-560","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"20/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"24","cpf":"085.543.859-26","senha":"0855","nome":"Lucas Rodrigues Antônio","nome_guerra":"Lucas","email":"lucasrodrigues635833lra@gmail.com","data_nascimento":"28/08/1994","nome_pai":"Daniel Aniceto Antônio","nome_mae":"Chirley João Rodrigues Antônio","sexo":"Masculino","telefone":"(48) 99935-2731","logradouro":"Rua Fernando José Zimmermann","numero":"33","complemento":"Casa","cep":"88160-624","bairro":"Bom viver","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/05/2024 11:21:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"25","cpf":"109.532.709-71","senha":"1095","nome":"Mayara Vieira Soares","nome_guerra":"Mayara","email":"mayarasoaresrl@gmail.com","data_nascimento":"04/01/2002","nome_pai":"Rodrigo Soares","nome_mae":"Raquel Vieira Soares","sexo":"Feminino","telefone":"(48) 99620-5860","logradouro":"Rua Rodney Brasil Machado","numero":"59","complemento":"Condomínio","cep":"88122-049","bairro":"Sertão do Maruim","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 20:02:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"26","cpf":"005.592.699-19","senha":"0055","nome":"Kleber Pacheco Mina","nome_guerra":"Mina","email":"kleber_dvdx@hotmail.com","data_nascimento":"30/09/1979","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98430-9294","logradouro":"rua Pedro Paulo de Abreu","numero":"","complemento":"","cep":"88106-785","bairro":"forquilhinhas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"27","cpf":"097.100.159-66","senha":"0971","nome":"Mithel Evergisto de Lima","nome_guerra":"Mithel","email":"mithel_lima@hotmail.com","data_nascimento":"26/07/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98447-8424","logradouro":"rua 13 de Junho","numero":"","complemento":"","cep":"88106-470","bairro":"Flor de Nápolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"19/02/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"28","cpf":"052.026.659-54","senha":"0520","nome":"Raphael Natayan Nilsen","nome_guerra":"Natayan","email":"raphael_nilsen@hotmail.com","data_nascimento":"27/12/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98404-1027","logradouro":"R. João Guilherme dos Santos","numero":"","complemento":"","cep":"88131-780","bairro":"Rio Grande","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"29","cpf":"060.594.529-22","senha":"0605","nome":"Gabriel Nery Cristiano","nome_guerra":"Nery","email":"gabrielnerycristiano1@gmail.com","data_nascimento":"27/07/2002","nome_pai":"Cândido Cristiano conceição Cristiano","nome_mae":"Lucimara Terezinha Pierro Nery","sexo":"Masculino","telefone":"(48) 99649-1296","logradouro":"Av. Brasil","numero":"158","complemento":"Casa","cep":"88110-500","bairro":"Bela Vista","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2023 21:37:32","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"30","cpf":"770.614.709-68","senha":"7706","nome":"Marcelo luiz de Oliveira","nome_guerra":"Oliveira","email":"bcoliveiraqap@gmail.com","data_nascimento":"05/07/1970","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99991-3979","logradouro":"Rua Domingos Pedro Hermes","numero":"","complemento":"","cep":"","bairro":"Barreiros","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"31","cpf":"091.275.619-50","senha":"0912","nome":"Guilherme Ozol de Assunção","nome_guerra":"Ozol","email":"ozol.guilherme@gmail.com","data_nascimento":"22/12/1993","nome_pai":"","nome_mae":"Sandra Mara Ozol de Assunção","sexo":"Masculino","telefone":"(48) 99110-7391","logradouro":"Rua Elizeu de Bernardi","numero":"641","complemento":"Bl c ap 302","cep":"88101-050","bairro":"Campinas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"26/03/2026","data_cadastro":"09/11/2023 18:16:01","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"32","cpf":"757.951.599-72","senha":"7579","nome":"Emerson Pereira","nome_guerra":"Pereira","email":"emersonobra@gmail.com","data_nascimento":"04/02/1974","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98428-4002","logradouro":"Balbuino Mechen","numero":"","complemento":"","cep":"","bairro":"Boa Parana","cidade":"S.P.A","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"33","cpf":"010.110.059-05","senha":"0101","nome":"Caio Passold Ravache","nome_guerra":"Ravache","email":"caio.p.ravache@gmail.com","data_nascimento":"15/05/2000","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9907-1505","logradouro":"rua João Meirelles","numero":"","complemento":"","cep":"88085-435","bairro":"Itaguáçu","cidade":"florianópolis","perfil":"associado","status":"desligado","data_desligamento":"11/05/2026","data_cadastro":"14/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"34","cpf":"003.357.419-76","senha":"0033","nome":"Michele Santana Quint","nome_guerra":"Santana","email":"jcmicheliquint@gmail.com","data_nascimento":"26/11/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99606-4164","logradouro":"Rua Roberto VALDIR Manchich","numero":"","complemento":"","cep":"88123-430","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"35","cpf":"120.391.089-47","senha":"1203","nome":"Julia da Silva Sardá","nome_guerra":"Sardá","email":"jhu22jhu@gmail.com","data_nascimento":"15/04/1999","nome_pai":"Claudemar Alfredo Sardá","nome_mae":"Liliane Maria da Silva Sardá","sexo":"Feminino","telefone":"(48) 98424-2904","logradouro":"Rua Manoel Eduardo Cardoso","numero":"17","complemento":"Casa","cep":"88110-792","bairro":"Bela Vista 1","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"28/04/2026","data_cadastro":"9/26/2023 13:18:11","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"36","cpf":"155.303.359-00","senha":"1553","nome":"André Luiz Schmitt","nome_guerra":"Schmitt","email":"andréLuizschmitt@gmail.com","data_nascimento":"27/04/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-2594","logradouro":"Rua Frei Albano","numero":"","complemento":"","cep":"88103-100","bairro":"Centro","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"37","cpf":"002.200.260-09","senha":"0022","nome":"Kleber Spotti Rodrigues","nome_guerra":"Spotti","email":"kleberspotti@gmail.com","data_nascimento":"06/07/1982","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99903-1009","logradouro":"rua Baldicero Filomeno","numero":"","complemento":"","cep":"88064-002","bairro":"Alto Ribeirão","cidade":"Florianopolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"38","cpf":"008.818.209-62","senha":"0088","nome":"Uelder Alves Da Costa","nome_guerra":"Alves","email":"10b3aux@gmail.com","data_nascimento":"10/09/1985","nome_pai":"VILMO FRANCISCO DA COSTA","nome_mae":"EUGÊNIA ALVES","sexo":"Masculino","telefone":"(48) 98801-0190","logradouro":"RUA CRISTÓVÃO NUNES PIRES","numero":"180","complemento":"APTO 904","cep":"88010-120","bairro":"CENTRO","cidade":"FLORIANÓPOLIS","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/10/2023 15:06:50","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"39","cpf":"416.967.609-25","senha":"4169","nome":"Ismael Vieira da Rosa Ulysséia","nome_guerra":"Ulysséia","email":"ismaelvru@intercop.com.br","data_nascimento":"02/08/1961","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9997-1294","logradouro":"av Itamarati","numero":"","complemento":"","cep":"88034-400","bairro":"Itamarati","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/08/2023 00:00:00","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"40","cpf":"104.320.579-94","senha":"1043","nome":"Yanka Caroliny Luciano","nome_guerra":"Yanka","email":"yanka.carolinyy@gmail.com","data_nascimento":"14/05/1997","nome_pai":"CLAUDINEI SOARES LUCIANO","nome_mae":"NAÁRA SCHOROEDER","sexo":"Feminino","telefone":"(48) 99641-8318","logradouro":"R. José João de Souza","numero":"457","complemento":"casa","cep":"88108-170","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"9/26/2023 8:56:06","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"41","cpf":"028.667.330-45","senha":"0286","nome":"Yuri Esmerio dos Santos","nome_guerra":"Yuri","email":"yurits828@gmail.com","data_nascimento":"04/09/1993","nome_pai":"","nome_mae":"Janine esmerio dos Santos","sexo":"Masculino","telefone":"(48) 98830-3826","logradouro":"Rua sábia una","numero":"45","complemento":"Bloco 5A AP 201","cep":"88122-021","bairro":"Sertão do Imarui","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/04/2025 16:13:47","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"42","cpf":"068.052.249-26","senha":"0680","nome":"Markian da Silveira Fortkamp","nome_guerra":"Fortkamp","email":"bcfortkamp@gmail.com","data_nascimento":"26/06/1994","nome_pai":"Marquian Fortkamp","nome_mae":"Viviane da Silveira","sexo":"Masculino","telefone":"(48) 98878-5387","logradouro":"Av. Patrício Antônio Teixeira","numero":"131","complemento":"AP 01","cep":"88161-586","bairro":"Rio Caveiras","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"1/23/2025 16:41:22","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"43","cpf":"007.303.029-54","senha":"0073","nome":"Karina  Maria de Jesus Sobrinho","nome_guerra":"Jesus","email":"kakamania33@gmail.com","data_nascimento":"11/09/1980","nome_pai":"Francisco filho aobrinho","nome_mae":"Maria Mendes de Jesus sobrinho","sexo":"Feminino","telefone":"(48) 99180-6824","logradouro":"Adão Shimitd","numero":"998","complemento":"Casa","cep":"88117-260","bairro":"Barreiros","cidade":"São jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2025 19:25:13","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"44","cpf":"039.070.760-01","senha":"0390","nome":"Nakata Garra Gomes","nome_guerra":"Nakata","email":"nakatagarrag@gmail.com","data_nascimento":"12/12/1999","nome_pai":"Danilo da Fontoura Gomes","nome_mae":"Mariselma Garra Lacerda Gomes","sexo":"Feminino","telefone":"(55) 98449-2570","logradouro":"Avenida Ceniro Martins 1078","numero":"1078","complemento":"Apto 9","cep":"88107-479","bairro":"Forquilhas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"06/05/2026","data_cadastro":"6/17/2025 13:00:48","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"45","cpf":"125.366.669-56","senha":"1253","nome":"Weverton José Machado","nome_guerra":"Weverton","email":"machadoweverton424@gmail.com","data_nascimento":"14/09/2002","nome_pai":"José Jucelio Machado","nome_mae":"Jerusa aparecida citadella","sexo":"Masculino","telefone":"(48) 99821-8785","logradouro":"Rua 13 de maio","numero":"876","complemento":"Casa","cep":"88165-040","bairro":"Prado","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"07/05/2025 18:41:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"46","cpf":"919.835.099-49","senha":"9198","nome":"Alexandre Vinicius Martins","nome_guerra":"Martins","email":"djxandemartins@gmail.com","data_nascimento":"10/09/1976","nome_pai":"Não Declarado","nome_mae":"Mariza Salete Martins","sexo":"Masculino","telefone":"(48) 99957-5275","logradouro":"Rua Olavo Bilac","numero":"498","complemento":"Casa","cep":"88133-350","bairro":"Jardim Eldorado","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"8/15/2025 16:01:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"47","cpf":"100.975.089-50","senha":"1009","nome":"Ana Carolina Nascimento","nome_guerra":"Ana Carolina","email":"anacarolinanascimento2309@gmail.com","data_nascimento":"23/09/1995","nome_pai":"Silvonei Nascimento","nome_mae":"Katia Regina Sodre","sexo":"Feminino","telefone":"(48) 99944-4545","logradouro":"Rua Johannes Lambertus Josef Bovee","numero":"16","complemento":"Casa","cep":"88168-490","bairro":"Tijuquinhas","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"8/18/2025 10:21:07","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"48","cpf":"083.469.799-83","senha":"0834","nome":"Andréia Martins dos Santos","nome_guerra":"Andréia M","email":"andreiamartins.ntr@gmail.com","data_nascimento":"20/04/1992","nome_pai":"Salvador Martins dos Santos","nome_mae":"Angelina da Cruz Delfino","sexo":"Feminino","telefone":"(48) 98472-8085","logradouro":"Rua Acácio Reitz","numero":"355","complemento":"Casa","cep":"88161-060","bairro":"Universitário","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2025 19:32:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"49","cpf":"007.064.299-07","senha":"0070","nome":"Fernando Pereira Siqueira Junior","nome_guerra":"Siqueira","email":"snnnarfdrums@gmail.com","data_nascimento":"09/05/1981","nome_pai":"Fernando Pereira Siqueira","nome_mae":"Sandra Aparecida Ferreira","sexo":"Masculino","telefone":"(48) 99953-1501","logradouro":"Rua sebastiana Coutinho","numero":"216","complemento":"Torre D apto 202","cep":"88113-240","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/08/2025 11:44:40","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"50","cpf":"028.574.290-61","senha":"0285","nome":"Alessandro da Costa Gonçalves","nome_guerra":"Gonçalves","email":"acgoncalves191@gmail.com","data_nascimento":"13/10/1991","nome_pai":"José João Angonezi Gonçalves","nome_mae":"Sandra Mara Costa Gonçalves","sexo":"Masculino","telefone":"(48) 99146-6837","logradouro":"Av Paulo Roberto Vidal","numero":"2490","complemento":"Casa","cep":"88132-599","bairro":"Bella Vista","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/04/2025 12:14:18","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"51","cpf":"147.564.459-00","senha":"1475","nome":"Misael Dias Neumann","nome_guerra":"Neumann","email":"misaeldiasneumann@gmail.com","data_nascimento":"11/04/2005","nome_pai":"Baltazar Romeiro Neumann","nome_mae":"Joseane Dias Neumann","sexo":"Masculino","telefone":"(48) 98824-4964","logradouro":"Rua Manoel Mariano Ferreira","numero":"621","complemento":"Condomínio","cep":"88161-680","bairro":"Rio Caveiras","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/15/2025 12:50:37","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"52","cpf":"007.178.839-57","senha":"0071","nome":"Luiz Fernando da Silva","nome_guerra":"Luiz","email":"silva.luiz0579@gmail.com","data_nascimento":"11/05/1979","nome_pai":"Nelson da Silva","nome_mae":"Zilma Ana da Silva","sexo":"Masculino","telefone":"(48) 98437-2126","logradouro":"Servidão Inácia de Medeiros","numero":"263","complemento":"Casa","cep":"88037-065","bairro":"Córrego grande","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/22/2025 12:21:46","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"53","cpf":"097.355.079-19","senha":"0973","nome":"João Victor Figueiredo Chrostowski","nome_guerra":"Figueiredo","email":"joaov.chrostowski@gmail.com","data_nascimento":"27/07/1995","nome_pai":"José Hélio Chrostowski","nome_mae":"Cerlei Adriane Figueiredo Chrostowski","sexo":"Masculino","telefone":"(47) 99136-3393","logradouro":"Rua Thomé Israel da Silva","numero":"105","complemento":"Apto 401A","cep":"88132-373","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2026 16:22:07","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"54","cpf":"003.747.659-95","senha":"0037","nome":"LUCIANO PEREIRA","nome_guerra":"Luciano","email":"lucianompereira@gmail.com","data_nascimento":"10/05/1979","nome_pai":"ADONAI PEREIRA","nome_mae":"VERA LUCIA PEREIRA","sexo":"Masculino","telefone":"(48) 99993-3233","logradouro":"Rua Maria Filomena da Silva","numero":"388","complemento":"Ap 1001","cep":"88110-630","bairro":"Nsa Sra do Rosário","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:13:55","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"55","cpf":"951.971.339-53","senha":"9519","nome":"Claudio cardoso","nome_guerra":"Cardoso","email":"claudio.cardoso311074@gmail.com","data_nascimento":"31/10/1974","nome_pai":"Sebastião Boaventura cardoso","nome_mae":"Maria do Carmo cardoso","sexo":"Masculino","telefone":"(48) 99906-6108","logradouro":"Rua Caetano da costa coelho","numero":"1593","complemento":"Apto 101","cep":"88113-790","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:47:34","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"56","cpf":"079.744.619-26","senha":"0797","nome":"Diego Carvalho Cordova","nome_guerra":"Carvalho","email":"brxf0r4ste1ro@gmail.com","data_nascimento":"11/09/1991","nome_pai":"Paulo Henrique Cordova","nome_mae":"Maria de Fátima Carvalho","sexo":"Masculino","telefone":"(48) 99823-7756","logradouro":"Rua geral de três riachos","numero":"Sem numero","complemento":"Casa","cep":"88160-000","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"02/11/2026 10:51:36","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"57","cpf":"118.669.539-07","senha":"1186","nome":"João Pedro Pereira Bunn","nome_guerra":"Bunn","email":"joaoppb01@gmail.com","data_nascimento":"15/09/2004","nome_pai":"Orlando Bunn","nome_mae":"Adriana Maciel Pereira","sexo":"Masculino","telefone":"(48) 99951-2775","logradouro":"Rua Acioli Nunes dos Santos","numero":"231","complemento":"Casa","cep":"88131-540","bairro":"Centro","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 10:56:37","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"58","cpf":"065.194.139-33","senha":"0651","nome":"Vanessa David Costa","nome_guerra":"Costa","email":"vanessamodapet1209@gmail.com","data_nascimento":"11/04/1987","nome_pai":"Marcelo Costa","nome_mae":"Elisete David Costa","sexo":"Feminino","telefone":"(48) 98466-6195","logradouro":"Rua Inhambu","numero":"104","complemento":"Casa","cep":"88115-510","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"09/08/2026","data_cadastro":"02/11/2026 12:07:04","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"59","cpf":"096.581.989-29","senha":"0965","nome":"Izabelle Sofie Luiz","nome_guerra":"Sofie","email":"bell.450009@gmail.com","data_nascimento":"23/12/2001","nome_pai":"Paulo Roberto Luiz","nome_mae":"Kátia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 99154-0113","logradouro":"rua Maria Helena Kretzer","numero":"503","complemento":"casa A ap 202","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/11/2026 18:30:59","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"60","cpf":"123.859.799-85","senha":"1238","nome":"Fabian Henrique da Silva","nome_guerra":"Fabian","email":"fabiandeggy@gmail.com","data_nascimento":"04/06/2005","nome_pai":"Rodrigo Eduardo da Silva","nome_mae":"Juliane Caetano Justino","sexo":"Masculino","telefone":"(48) 99107-5323","logradouro":"Rua Prefeito Dib Cherem","numero":"2734","complemento":"Casa","cep":"88090-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/12/2026 11:36:15","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"61","cpf":"063.023.992-46","senha":"0630","nome":"Washington Levi Nascimento Dias","nome_guerra":"Levi","email":"vulgo.levi2004@gmail.com","data_nascimento":"31/08/2004","nome_pai":"DUCIVALDO","nome_mae":"ROSYLANGE DO NASCIMENTO","sexo":"Masculino","telefone":"(48) 98859-1896","logradouro":"Av paulo roberto vidal","numero":"475","complemento":"bloco c ap 310","cep":"88132-599","bairro":"Bela vista","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"12/06/2026","data_cadastro":"2/16/2026 14:51:05","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"62","cpf":"069.723.111-95","senha":"0697","nome":"Reinaldo Joaber de Araújo Spengler","nome_guerra":"Joaber","email":"reinaldospengler@gmail.com","data_nascimento":"15/01/2002","nome_pai":"Ivo Spengler","nome_mae":"Genilce Silva de Araújo Spengler","sexo":"Masculino","telefone":"(48) 98839-0467","logradouro":"Demetrio Novossate","numero":"278","complemento":"Casa","cep":"88136-366","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"09/06/2026","data_cadastro":"2/18/2026 8:17:02","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"63","cpf":"008.145.020-67","senha":"0081","nome":"Anderson Rafael Souza da Silva","nome_guerra":"Anderson","email":"anderson84negocios@gmail.com","data_nascimento":"28/10/1984","nome_pai":"","nome_mae":"Marivane Souza da Silva","sexo":"Masculino","telefone":"(48) 99993-8011","logradouro":"Rua Maria Helena Kretzer","numero":"503a","complemento":"Ap301","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"3/14/2026 17:21:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"64","cpf":"092.158.639-66","senha":"0921","nome":"Washington sadi de jesus","nome_guerra":"Sadi","email":"washingtondejesus1509@gmail.com","data_nascimento":"15/03/1994","nome_pai":"Valmir de jesus","nome_mae":"Rosane cleia dos santos","sexo":"Masculino","telefone":"(48) 99855-8268","logradouro":"Rua Rodnei Brasil machado","numero":"59","complemento":"Bloco 7a ap104","cep":"88122-000","bairro":"Sertão do maruim","cidade":"Sao jose","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"3/15/2026 22:45:29","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"65","cpf":"235.983.728-17","senha":"2359","nome":"Pâmela Aparecida da Luz Perdoná","nome_guerra":"Perdoná","email":"palperdona@gmail.com","data_nascimento":"17/05/2001","nome_pai":"Marcos Aurélio Perdoná","nome_mae":"Juliana Aparecida da Luz Perdoná","sexo":"Feminino","telefone":"(48) 99186-0157","logradouro":"Servidão silvestre Prim","numero":"136","complemento":"Casa","cep":"88161-144","bairro":"Boa VISTA","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"4/17/2026 9:43:02","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"66","cpf":"108.677.459-08","senha":"1086","nome":"Otávio Augusto Viapiana","nome_guerra":"Viapiana","email":"viapiana65@gmail.com","data_nascimento":"18/04/1999","nome_pai":"Amirton José Viapiana","nome_mae":"Lizandra Carla Piaseski Viapiana","sexo":"Masculino","telefone":"(48) 99186-1852","logradouro":"Rua Júlio Teodoro Martins","numero":"1800","complemento":"Apt 624","cep":"88161-330","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"5/26/2026 14:00:58","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"},{"id":"67","cpf":"063.871.729-93","senha":"0638","nome":"Graziela steimbach","nome_guerra":"Steimbach","email":"graziela291211@gmail.com","data_nascimento":"27/09/1989","nome_pai":"Jorge steimbach","nome_mae":"Andreia Conrado steimbach","sexo":"Feminino","telefone":"(48) 99858-9150","logradouro":"Rua nossa senhora das dores","numero":"1606","complemento":"Casa","cep":"88143-594","bairro":"Vila santana","cidade":"Santo amaro da imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"6/26/2026 16:21:19","obm":"SÃ£o JosÃ©","profissao":"Bombeiro ComunitÃ¡rio"}];

const MOCK_DATA_INITIAL = {
    associados: ASSOCIADOS_PLANILHA_REAL,
    financeiro: INITIAL_LANCAMENTOS_DATA,
    mensalidades: INITIAL_MENSAL_DATA,
    documentos: [],
    programacao: [],
    mensagens: []
};

// STORAGE INDEXEDDB PARA ARQUIVOS
const idbStorage = {
    dbName: "ACBCSJ_DB",
    version: 1,
    db: null,
    async getDB() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, this.version);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("files")) {
                    db.createObjectStore("files");
                }
            };
            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            req.onerror = (e) => reject(e.target.error);
        });
    },
    async setFile(id, content) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction("files", "readwrite");
                const store = tx.objectStore("files");
                store.put(content, id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error("Erro no IndexedDB:", e);
            return false;
        }
    },
    async getFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction("files", "readonly");
                const store = tx.objectStore("files");
                const req = store.get(id);
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            });
        } catch (e) {
            return null;
        }
    },
    async deleteFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction("files", "readwrite");
                const store = tx.objectStore("files");
                store.delete(id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    }
};

// INICIALIZAÃ‡ÃƒO E LIMPEZA DE DADOS
document.addEventListener("DOMContentLoaded", async () => {
    initMockData();
    setupCPFMasks();
    setupNavigation();
    if (typeof dbService !== 'undefined') {
        try {
            await dbService.syncFromSupabase();
            dbService.initRealtime();
        } catch (e) {
            console.error("Erro na sincronizaÃ§Ã£o inicial do Supabase:", e);
        }
    }
});

function refreshCurrentView() {
    if (!currentUser) return;
    const activeTabEl = document.querySelector('.tab-content[style*="display: block"]');
    if (!activeTabEl) return;
    const tabId = activeTabEl.id.replace('tab-', '');
    if (tabId === 'overview-diretoria') renderDiretoriaOverview();
    else if (tabId === 'gestao-associados') renderGestaoAssociados();
    else if (tabId === 'associados-desligados') renderAssociadosDesligados();
    else if (tabId === 'gestao-mensalidades') renderGestaoMensalidades();
    else if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    else if (tabId === 'overview-associado') renderAssociadoOverview();
    else if (tabId === 'comunicados-associado') renderComunicadosHistoricoAssociado();
    else if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    else if (tabId === 'documentos-associado') renderDocumentos();
    else if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}
window.refreshCurrentView = refreshCurrentView;


function resetBancoDadosComandante() {
    const listAssociados = (typeof MOCK_DATA_INITIAL !== "undefined" && MOCK_DATA_INITIAL.associados)
        ? MOCK_DATA_INITIAL.associados
        : [{
            id: "1",
            cpf: "000.000.000-00",
            senha: "123",
            nome: "Comandante / Diretoria ACBCSJ",
            nome_guerra: "Comandante",
            perfil: "diretoria",
            status: "ativo",
            obm: "São José",
            profissao: "Comandante da Associação"
        }];

    localStorage.setItem("acbcsj_associados", JSON.stringify(listAssociados));
    localStorage.setItem("acbcsj_financeiro", JSON.stringify(INITIAL_LANCAMENTOS_DATA));
    localStorage.setItem("acbcsj_mensalidades_grid", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2024", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2025", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2026", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2027", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_grid_2028", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensalidades_historico", JSON.stringify([])); localStorage.setItem("acbcsj_valor_mensalidade", "20.00"); localStorage.setItem("acbcsj_historico_reajustes_mensalidade", JSON.stringify([{ id: "reaj_inicial", valor: 20.00, mes_inicio: "01", ano_inicio: "2024", data_registro: "01/01/2024", justificativa: "Valor base padrão (R$ 20,00)" }]));
    localStorage.setItem("acbcsj_comunicados_enviados", JSON.stringify([]));
    localStorage.setItem("acbcsj_documentos", JSON.stringify([]));
    localStorage.setItem("acbcsj_programacao", JSON.stringify([]));
    localStorage.setItem("acbcsj_mensagens", JSON.stringify([]));
}

function initMockData() {
    let list = [];
    try {
        list = JSON.parse(localStorage.getItem("acbcsj_associados")) || [];
    } catch (e) {
        list = [];
    }
    
    if (!list || list.length < 60) {
        localStorage.setItem("acbcsj_associados", JSON.stringify(MOCK_DATA_INITIAL.associados));
    }

    let finList = [];
    try {
        finList = JSON.parse(localStorage.getItem("acbcsj_financeiro")) || [];
    } catch (e) {
        finList = [];
    }

    if (!finList || finList.length < 35) {
        localStorage.setItem("acbcsj_financeiro", JSON.stringify(INITIAL_LANCAMENTOS_DATA));
    }
}

// MÁSCARA AUTOMÁTICA DE CPF
function setupCPFMasks() {
    const cpfInputs = document.querySelectorAll('.cpf-mask');
    cpfInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.substring(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
        });
    });
}


function setupNavigation() {
    // InicializaÃ§Ã£o da navegaÃ§Ã£o bÃ¡sica
}

// RENDERIZAÇÃO DO CABEÇALHO DO USUÁRIO
function renderUserHeader() {
    document.getElementById('headerUserName').textContent = currentUser.nome;
    const badge = document.getElementById('headerUserRole');
    badge.textContent = currentUser.perfil.toUpperCase();
    badge.className = `user-role-badge role-${currentUser.perfil}`;
}

// MENU LATERAL DINÃ‚MICO CONFORME PERFIL

function renderSidebarMenu() {
    const menuNav = document.getElementById('sidebarNav');
    if (!menuNav) return;
    menuNav.innerHTML = '';

    if (currentUser.perfil === 'diretoria') {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-diretoria')">📊 Painel Geral</div>
            <div class="nav-item" onclick="navigateTab('gestao-associados')">👥 Controle de Associados</div>
            <div class="nav-item" onclick="navigateTab('associados-desligados')">📋 Associados Desligados</div>
            <div class="nav-item" onclick="navigateTab('gestao-mensalidades')">💳 Controle de Mensalidades</div>
            <div class="nav-item" onclick="navigateTab('gestao-financeira')">💰 Lançamentos Financeiros</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📑 Documentos & Atas</div>
            <div class="nav-item" onclick="navigateTab('mensagens-diretoria')">📬 Caixa de Mensagens</div>
        `;
    } else {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-associado')">🏠 Meu Painel</div>
            <div class="nav-item" onclick="navigateTab('comunicados-associado')">📢 Comunicados & Avisos</div>
            <div class="nav-item" onclick="navigateTab('balancetes-associado')">📈 Balancetes & Contas</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📁 Documentos & Convites</div>
            <div class="nav-item" onclick="navigateTab('enviar-mensagem')">💬 Fale com a Diretoria</div>
        `;
    }
}

// NAVEGAÇÃO ENTRE ABAS
function navigateTab(tabId) {
    if (currentUser && currentUser.perfil !== 'diretoria') {
        const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const cleanCpf = (currentUser.cpf || '').replace(/\D/g, '');
        const currentDbState = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);
        if (currentDbState && currentDbState.status === 'desligado') {
            alert('ðŸš« ACESSO REVOGADO!\n\nSeu cadastro consta como DESLIGADO da AssociaÃ§Ã£o.');
            logout();
            return;
        }
    }

    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.style.display = 'block';

    // Destacar item de menu ativo
    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(tabId));
    if (activeNav) activeNav.classList.add('active');

    // Executar atualizações de tela específicas
    if (tabId === 'overview-diretoria') renderDiretoriaOverview();
    if (tabId === 'gestao-associados') renderGestaoAssociados();
    if (tabId === 'associados-desligados') renderAssociadosDesligados();
    if (tabId === 'gestao-mensalidades') renderGestaoMensalidades();
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
    if (tabId === 'comunicados-associado') renderComunicadosHistoricoAssociado();
    if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    if (tabId === 'documentos-associado' || tabId === 'documentos-diretoria') renderDocumentos();
    if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}

// PARSER UNIVERSAL ROBUSTO DE DATA (EXTRAI MÊS '01'-'12' E ANO 'YYYY')
function extrairMesEAno(dataStr, dataIso) {
    let str = (dataIso || dataStr || '').trim();
    if (!str) return { mes: '', ano: '' };

    // Se tiver espaço ou T (ex: 2026-08-31T12:00 ou 31/08/2026 14:30), pegar apenas a parte da data
    str = str.split('T')[0].split(' ')[0].trim();

    // Formato YYYY-MM-DD ou YYYY/MM/DD
    if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(str)) {
        const parts = str.split(/[-/]/);
        return {
            ano: parts[0].trim(),
            mes: String(parts[1]).padStart(2, '0')
        };
    }

    // Formato DD/MM/YYYY ou DD-MM-YYYY
    if (/^\d{1,2}[-/]\d{1,2}[-/]\d{4}/.test(str)) {
        const parts = str.split(/[-/]/);
        return {
            ano: parts[2].trim(),
            mes: String(parts[1]).padStart(2, '0')
        };
    }

    return { mes: '', ano: '' };
}

// LÓGICA DA DIRETORIA: PAINEL GERAL E TABELAS
function renderDiretoriaOverview() {
    const associados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const pendentes = associados.filter(a => a.status === 'pendente');

    // Captura o ano selecionado no filtro (padrão: 2026)
    const selectAno = document.getElementById('diretoriaFiltroAno');
    const anoFiltro = selectAno ? selectAno.value : '2026';

    // Atualiza labels visuais de ano
    document.querySelectorAll('.lblAnoSelecionado').forEach(el => {
        el.textContent = anoFiltro === 'todos' ? 'Todos' : anoFiltro;
    });

    // 1. Total Ativos Gerais
    const totalAtivos = associados.filter(a => a.status === 'ativo').length;
    const elTotal = document.getElementById('metricTotalAssociados');
    if (elTotal) elTotal.textContent = `${totalAtivos} associados`;

    // 2. Novas Associações no Ano Selecionado
    const novosNoAno = associados.filter(a => {
        if (!a.data_cadastro) return false;
        return anoFiltro === 'todos' || a.data_cadastro.includes(anoFiltro);
    }).length;
    const elNovos = document.getElementById('metricNovosAno');
    if (elNovos) elNovos.textContent = `${novosNoAno} associado${novosNoAno === 1 ? '' : 's'}`;

    // 3. Desligamentos no Ano Selecionado
    const desligadosNoAno = associados.filter(a => {
        if (a.status !== 'desligado') return false;
        if (anoFiltro === 'todos') return true;
        const emData = a.data_desligamento && a.data_desligamento.includes(anoFiltro);
        const emMotivo = a.motivo_desligamento && a.motivo_desligamento.includes(anoFiltro);
        const emCadastro = a.data_cadastro && a.data_cadastro.includes(anoFiltro);
        return emData || emMotivo || emCadastro;
    }).length;
    const elDesligados = document.getElementById('metricDesligadosAno');
    if (elDesligados) elDesligados.textContent = `${desligadosNoAno} associado${desligadosNoAno === 1 ? '' : 's'}`;

    // 4. Solicitações Pendentes de Pré-Cadastro
    const elCadastrosPendentes = document.getElementById('metricCadastrosPendentes');
    if (elCadastrosPendentes) elCadastrosPendentes.textContent = `${pendentes.length} associado${pendentes.length === 1 ? '' : 's'}`;
    
    const elBadgePreCadastros = document.getElementById('badgeContadorPreCadastros');
    if (elBadgePreCadastros) elBadgePreCadastros.textContent = `${pendentes.length} pendente(s)`;

    // 5. Saldo em Caixa (Contabilizado pela data em que o valor entrou no sistema/caixa)
    const historicoMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    let totalMensalidadesArrecadadas = 0;
    historicoMensalidades.forEach(m => {
        const parsed = extrairMesEAno(m.data, m.data_iso);
        const mAno = parsed.ano || (m.data_iso ? m.data_iso.substring(0, 4) : (m.data ? m.data.split('/')[2] : m.ano || '2026'));
        if (anoFiltro === 'todos' || mAno === anoFiltro) {
            totalMensalidadesArrecadadas += (parseFloat(m.valor) || 0);
        }
    });

    const totalReceitasGerais = financeiro.filter(f => {
        if (f.tipo !== 'receita') return false;
        if (anoFiltro === 'todos') return true;
        const parsed = typeof extrairMesEAno === 'function' ? extrairMesEAno(f.data, f.data_iso) : { ano: '' };
        const fAno = parsed.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : '2026'));
        return fAno === anoFiltro;
    }).reduce((sum, item) => sum + (parseFloat(item.valor) || 0), 0);

    const totalReceitas = totalReceitasGerais + totalMensalidadesArrecadadas;

    const totalDespesas = financeiro.filter(f => {
        if (f.tipo !== 'despesa') return false;
        if (anoFiltro === 'todos') return true;
        const parsed = typeof extrairMesEAno === 'function' ? extrairMesEAno(f.data, f.data_iso) : { ano: '' };
        const fAno = parsed.ano || (f.data_iso ? f.data_iso.substring(0, 4) : (f.data ? f.data.split('/')[2] : '2026'));
        return fAno === anoFiltro;
    }).reduce((sum, item) => sum + (parseFloat(item.valor) || 0), 0);

    const saldo = totalReceitas - totalDespesas;
    
    const elSaldoCaixa = document.getElementById('metricSaldoCaixa');
    if (elSaldoCaixa) {
        elSaldoCaixa.textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSaldoCaixa.style.color = saldo < 0 ? '#E74C3C' : 'var(--status-success)';
    }

    // Tabela de aprovação rápida de Pré-Cadastros
    const container = document.getElementById('tablePendentesBody');
    if (container) {
        if (pendentes.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma solicitação de pré-cadastro pendente.</td></tr>`;
        } else {
            container.innerHTML = pendentes.map(p => `
                <tr>
                    <td><b>${p.nome_guerra || p.nome}</b><br><small style="color:var(--text-muted)">${p.nome}</small></td>
                    <td>${p.cpf}</td>
                    <td>${p.telefone || '-'}</td>
                    <td><small style="color:var(--accent-gold);">${p.data_cadastro || '-'}</small></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="aprovarAssociado('${p.cpf}')">Aprovar</button>
                        <button class="btn btn-sm btn-outline" onclick="verFichaAssociado('${p.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C" onclick="abrirModalDesligar('${p.cpf}')">Rejeitar</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    if (typeof renderSolicitacoesDesligamentoDiretoria === 'function') {
        renderSolicitacoesDesligamentoDiretoria();
    }

    if (typeof renderMensagensDiretoriaOverview === 'function') {
        renderMensagensDiretoriaOverview();
    }
}


function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }




// ==========================================