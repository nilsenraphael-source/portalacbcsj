// DADOS DE INICIALIZAÇÃO DA ACBCSJ (COMANDANTE + 66 SÓCIOS IMPORTADOS DA PLANILHA SOCIOS.XLSX)
const INITIAL_MENSAL_DATA = [];
const INITIAL_LANCAMENTOS_DATA = [
// DESPESAS DA PLANILHA (29 ITENS)
{ id: "desp_2026_01", descricao: "Taxa \"Cesta de Relacionamento\" Sicred", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "20/01/2026", data_iso: "2026-01-20", mes: "Janeiro", comprovante_nome: null },
{ id: "desp_2026_02", descricao: "Sandro Martins (Copo B4 / FECABOM)", categoria: "Outros", valor: 50.00, tipo: "despesa", data: "26/01/2026", data_iso: "2026-01-26", mes: "Janeiro", comprovante_nome: null },
{ id: "desp_2026_03", descricao: "Tarifas Caixa Economica Federal", categoria: "Tarifas Banco", valor: 0.17, tipo: "despesa", data: "31/01/2026", data_iso: "2026-01-31", mes: "Janeiro", comprovante_nome: null },
{ id: "desp_2026_04", descricao: "Certificado Digital", categoria: "Outros", valor: 170.00, tipo: "despesa", data: "09/02/2026", data_iso: "2026-02-09", mes: "Fevereiro", comprovante_nome: null },
{ id: "desp_2026_05", descricao: "Brinde ReuniÃ£o Comando (Camila C Soares)", categoria: "Presentes", valor: 47.61, tipo: "despesa", data: "20/02/2026", data_iso: "2026-02-20", mes: "Fevereiro", comprovante_nome: null },
{ id: "desp_2026_06", descricao: "Taxa \"Cesta de Relacionamento\" Sicred", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "20/02/2026", data_iso: "2026-02-20", mes: "Fevereiro", comprovante_nome: null },
{ id: "desp_2026_07", descricao: "Lancheira aniversÃ¡rios Compra 1", categoria: "Presentes", valor: 1945.00, tipo: "despesa", data: "23/02/2026", data_iso: "2026-02-23", mes: "Fevereiro", comprovante_nome: null },
{ id: "desp_2026_08", descricao: "Lancheira aniversÃ¡rios Compra 2", categoria: "Presentes", valor: 775.80, tipo: "despesa", data: "23/02/2026", data_iso: "2026-02-23", mes: "Fevereiro", comprovante_nome: null },
{ id: "desp_2026_09", descricao: "Tarifas Caixa Economica Federal", categoria: "Tarifas Banco", valor: 0.17, tipo: "despesa", data: "28/02/2026", data_iso: "2026-02-28", mes: "Fevereiro", comprovante_nome: null },
{ id: "desp_2026_10", descricao: "Estampa das lancheiras (Adriano Lima)", categoria: "Presentes", valor: 800.00, tipo: "despesa", data: "12/03/2026", data_iso: "2026-03-12", mes: "MarÃ§o", comprovante_nome: null },
{ id: "desp_2026_11", descricao: "Taxa \"Cesta de Relacionamento\" Sicred", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "20/03/2026", data_iso: "2026-03-20", mes: "MarÃ§o", comprovante_nome: null },
{ id: "desp_2026_12", descricao: "Tarifas Caixa Economica Federal", categoria: "Tarifas Banco", valor: 0.88, tipo: "despesa", data: "30/03/2026", data_iso: "2026-03-30", mes: "MarÃ§o", comprovante_nome: null },
{ id: "desp_2026_13", descricao: "Coffee Break Treinamento APH (JoÃ£o Valdeci Moraes)", categoria: "Treinamentos", valor: 240.00, tipo: "despesa", data: "13/04/2026", data_iso: "2026-04-13", mes: "Abril", comprovante_nome: null },
{ id: "desp_2026_14", descricao: "Coffee Break Treinamento APH (Camila Soares)", categoria: "Treinamentos", valor: 132.08, tipo: "despesa", data: "13/04/2026", data_iso: "2026-04-13", mes: "Abril", comprovante_nome: null },
{ id: "desp_2026_15", descricao: "Taxa \"Cesta de Relacionamento\" Sicred", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "20/04/2026", data_iso: "2026-04-20", mes: "Abril", comprovante_nome: null },
{ id: "desp_2026_16", descricao: "CartÃ³rio (Gabriel F.Farias)", categoria: "CartÃ³rio ou DocumentaÃ§Ã£o em geral", valor: 193.67, tipo: "despesa", data: "24/04/2026", data_iso: "2026-04-24", mes: "Abril", comprovante_nome: null },
{ id: "desp_2026_17", descricao: "Taxa \"Cesta de Relacionamento\" Sicred", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "20/05/2026", data_iso: "2026-05-20", mes: "Maio", comprovante_nome: null },
{ id: "desp_2026_18", descricao: "Taxa de funcionamento PMSJ", categoria: "CartÃ³rio ou DocumentaÃ§Ã£o em geral", valor: 440.66, tipo: "despesa", data: "11/06/2026", data_iso: "2026-06-11", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_19", descricao: "Certificado Digital (Safe2pay)", categoria: "CartÃ³rio ou DocumentaÃ§Ã£o em geral", valor: 184.00, tipo: "despesa", data: "11/06/2026", data_iso: "2026-06-11", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_20", descricao: "DecoraÃ§Ã£o e descartaveis - Jogo Copa do Mundo (Yanka)", categoria: "Mercado", valor: 80.85, tipo: "despesa", data: "18/06/2026", data_iso: "2026-06-18", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_21", descricao: "Mercado - Jogo Copa do Mundo (MundialMIX)", categoria: "Mercado", valor: 248.35, tipo: "despesa", data: "22/06/2026", data_iso: "2026-06-22", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_22", descricao: "Mercado - Jogo Copa do Mundo (Yanka)", categoria: "Mercado", valor: 35.66, tipo: "despesa", data: "22/06/2026", data_iso: "2026-06-22", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_23", descricao: "Taxa \"Cesta de Relacionamento\" Sicred", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "22/06/2026", data_iso: "2026-06-22", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_24", descricao: "PÃ£es - Jogo Copa do Mundo (Industria de Paes)", categoria: "Mercado", valor: 36.00, tipo: "despesa", data: "23/06/2026", data_iso: "2026-06-23", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_25", descricao: "Tarifas Caixa Economica Federal", categoria: "Tarifas Banco", valor: 0.71, tipo: "despesa", data: "30/06/2026", data_iso: "2026-06-30", mes: "Junho", comprovante_nome: null },
{ id: "desp_2026_26", descricao: "Coffee Break - Palestra (Kiko)", categoria: "Treinamentos", valor: 384.00, tipo: "despesa", data: "17/07/2026", data_iso: "2026-07-17", mes: "Julho", comprovante_nome: null },
{ id: "desp_2026_27", descricao: "Taxa \"Cesta de Relacionamento\" Sicredi", categoria: "Tarifas Banco", valor: 35.00, tipo: "despesa", data: "20/07/2026", data_iso: "2026-07-20", mes: "Julho", comprovante_nome: null },
{ id: "desp_2026_28", descricao: "Refri - Palestra (Yanka)", categoria: "Treinamentos", valor: 38.88, tipo: "despesa", data: "22/07/2026", data_iso: "2026-07-22", mes: "Julho", comprovante_nome: null },
{ id: "desp_2026_29", descricao: "Chocolate Palestrante Sgt Reinaldo - Palestra (Camila)", categoria: "Treinamentos", valor: 19.93, tipo: "despesa", data: "27/07/2026", data_iso: "2026-07-27", mes: "Julho", comprovante_nome: null },
// RECEITAS DA PLANILHA (12 ITENS)
{ id: "rec_2026_01", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 0.40, tipo: "receita", data: "31/01/2026", data_iso: "2026-01-31", mes: "Janeiro", comprovante_nome: null },
{ id: "rec_2026_02", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 0.54, tipo: "receita", data: "28/02/2026", data_iso: "2026-02-28", mes: "Fevereiro", comprovante_nome: null },
{ id: "rec_2026_03", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 0.62, tipo: "receita", data: "30/03/2026", data_iso: "2026-03-30", mes: "MarÃ§o", comprovante_nome: null },
{ id: "rec_2026_04", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 1.34, tipo: "receita", data: "30/04/2026", data_iso: "2026-04-30", mes: "Abril", comprovante_nome: null },
{ id: "rec_2026_05", descricao: "Rendimentos SICREDI", categoria: "Rendimentos", valor: 11.31, tipo: "receita", data: "04/05/2026", data_iso: "2026-05-04", mes: "Maio", comprovante_nome: null },
{ id: "rec_2026_06", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 1.28, tipo: "receita", data: "31/05/2026", data_iso: "2026-05-31", mes: "Maio", comprovante_nome: null },
{ id: "rec_2026_07", descricao: "Jogo Copa do Mundo - Acompanhante (Linder)", categoria: "Rendimentos", valor: 25.00, tipo: "receita", data: "11/06/2026", data_iso: "2026-06-11", mes: "Junho", comprovante_nome: null },
{ id: "rec_2026_08", descricao: "jogo Copa do Mundo - Acompanhante (Antunes)", categoria: "Rendimentos", valor: 25.00, tipo: "receita", data: "15/06/2026", data_iso: "2026-06-15", mes: "Junho", comprovante_nome: null },
{ id: "rec_2026_09", descricao: "Jogo Copa do Mundo - Acompanhante (Humberto)", categoria: "Rendimentos", valor: 25.00, tipo: "receita", data: "17/06/2026", data_iso: "2026-06-17", mes: "Junho", comprovante_nome: null },
{ id: "rec_2026_10", descricao: "Jogo Copa do Mundo - Acompanhante (Kassandra)", categoria: "Rendimentos", valor: 25.00, tipo: "receita", data: "24/06/2026", data_iso: "2026-06-24", mes: "Junho", comprovante_nome: null },
{ id: "rec_2026_11", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 1.35, tipo: "receita", data: "30/06/2026", data_iso: "2026-06-30", mes: "Junho", comprovante_nome: null },
{ id: "rec_2026_12", descricao: "Rendimentos Caixa Economica Federal", categoria: "Rendimentos", valor: 1.35, tipo: "receita", data: "31/07/2026", data_iso: "2026-07-31", mes: "Julho", comprovante_nome: null }
];
const ASSOCIADOS_PLANILHA_REAL = [{"id":"2","cpf":"000.923.500-03","senha":"0009","nome":"Angélica Mateus","nome_guerra":"Angélica","email":"amangelica14@gmail.com","data_nascimento":"23/05/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99814-2594","logradouro":"rua João Evangelista da Costa","numero":"","complemento":"","cep":"88090-301","bairro":"Coloninha","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/07/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"3","cpf":"074.136.669-01","senha":"0741","nome":"Douglas Antunes","nome_guerra":"Antunes","email":"douglas.antunes4012@gmail.com","data_nascimento":"24/09/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-4431","logradouro":"Rua Flores da Cunha","numero":"","complemento":"","cep":"88070-460","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"4","cpf":"073.716.899-41","senha":"0737","nome":"Murilo Augusto Galdino De Souza","nome_guerra":"Augusto","email":"galdinomus@gmail.com","data_nascimento":"04/07/1990","nome_pai":"NELSON JOSÉ DE SOUZA","nome_mae":"ZELIA MARIA SILVA DE SOUZA","sexo":"Masculino","telefone":"(48) 98494-1095","logradouro":"VALDIR GUTHIA","numero":"12","complemento":"ANA MELO","cep":"88135-186","bairro":"ARIRIU","cidade":"PALHOÇA","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"07/09/2023 17:45:12","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"5","cpf":"961.193.810-15","senha":"9611","nome":"Andreia de Fátima Machado","nome_guerra":"Andreia","email":"andreiamachado2508@gmail.com","data_nascimento":"25/08/1980","nome_pai":"Fredolino machado","nome_mae":"Catarina Benedett machado","sexo":"Feminino","telefone":"(48) 99697-0295","logradouro":"Rua Antônio Elias","numero":"22","complemento":"Casa","cep":"88106-160","bairro":"Picadas do sul","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"27/10/2023 00:07:42","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"6","cpf":"069.776.559-84","senha":"0697","nome":"Daniel Bento","nome_guerra":"Bento","email":"bentodani1989@gmail.com","data_nascimento":"01/08/1989","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99616-1172","logradouro":"Av Governador Ivo Silveira","numero":"","complemento":"","cep":"88085-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"18/03/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"7","cpf":"083.801.589-11","senha":"0838","nome":"Tiago Binhoti","nome_guerra":"Binhoti","email":"tiagobinhoti@gmail.com","data_nascimento":"30/09/1991","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98497-4657","logradouro":"rua Francisco Lutz de Almeida","numero":"","complemento":"","cep":"88108-173","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"03/10/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"8","cpf":"021.603.099-40","senha":"0216","nome":"Emerson Roberto Boiko","nome_guerra":"Boiko","email":"emersonboiko@gmail.com","data_nascimento":"26/06/1978","nome_pai":"Ladislau boiko","nome_mae":"Maria das dores Alves boiko","sexo":"Masculino","telefone":"(48) 99962-0506","logradouro":"Rua das amiexas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"24/02/2024 19:57:52","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"9","cpf":"127.393.649-38","senha":"1273","nome":"Camila Coelho Soares","nome_guerra":"Camila","email":"camila.coelhosoares@gmail.com","data_nascimento":"25/09/2000","nome_pai":"Pedro Soares","nome_mae":"Margarida Coelho","sexo":"Feminino","telefone":"(48) 99126-4292","logradouro":"Rua Walmor Beppler","numero":"S/N","complemento":"Servidão ao lado da casa 125","cep":"88136-257","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"04/10/2023 12:28:58","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"10","cpf":"079.962.129-37","senha":"0799","nome":"Ricardo Augusto Coelho","nome_guerra":"Coelho","email":"ricardo.pc15@gmail.com","data_nascimento":"09/08/1991","nome_pai":"Neri Geronimo Coelho","nome_mae":"Rute Helena do Nascimento","sexo":"Masculino","telefone":"(48) 98485-6290","logradouro":"Rua Santo André","numero":"518","complemento":"ap 201","cep":"88106-430","bairro":"Flor de napolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"29/04/2024 09:57:27","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"11","cpf":"318.036.738-50","senha":"3180","nome":"Alex Sandro Batista da Silva","nome_guerra":"Da Silva","email":"alexsandrob221@gmail.com","data_nascimento":"18/07/1983","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98426-9481","logradouro":"Bela Vista","numero":"","complemento":"","cep":"88119-114","bairro":"Potecas","cidade":"São Jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/02/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"12","cpf":"001.637.940-30","senha":"0016","nome":"Michel da Silveira Barros","nome_guerra":"Barros","email":"michel_sbarros@yahoo.com.br","data_nascimento":"27/07/1981","nome_pai":"José António Rodrigues barros","nome_mae":"Ana lucia da silveira barros","sexo":"Masculino","telefone":"(48) 98821-7860","logradouro":"Rua José Cláudio Schmidt","numero":"50","complemento":"50","cep":"88115-558","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"28/12/2024 05:17:34","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"13","cpf":"910.414.909-25","senha":"9104","nome":"Deny Anderson Azevedo","nome_guerra":"Deny","email":"denyazevedo1972@gmail.com","data_nascimento":"06/08/1972","nome_pai":"Neri Azevedo","nome_mae":"Laurita Bernadete Azevedo","sexo":"Masculino","telefone":"(48) 99868-3269","logradouro":"Rua Algarves","numero":"S/n","complemento":"Quadra 12 Loteb3","cep":"88107-365","bairro":"Lisboa","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/09/2023 12:08:42","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"14","cpf":"932.603.189-68","senha":"9326","nome":"Eder Alison Da Silva","nome_guerra":"Eder","email":"eder.alisondasilva@gmail.com","data_nascimento":"21/06/1978","nome_pai":"","nome_mae":"","sexo":"Masculino","telefone":"(48) 99834-6944","logradouro":"rua Tercílio Tedesco","numero":"","complemento":"","cep":"88107-481","bairro":"Potecas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"15","cpf":"047.913.959-80","senha":"0479","nome":"Elaine Conrado Bittencourt","nome_guerra":"Elaine","email":"corretoraimobiliariaelaine@gmail.com","data_nascimento":"01/06/1984","nome_pai":"Sidnei Conrado","nome_mae":"Maria Fátima de Pinho","sexo":"Feminino","telefone":"(48) 99119-2407","logradouro":"Rua São João","numero":"500","complemento":"Casa","cep":"88140-000","bairro":"Centro","cidade":"Santo Amaro da Imperatriz","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"01/10/2024 21:37:40","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"16","cpf":"024.284.799-46","senha":"0242","nome":"Fabiana Oro Cericato Costa","nome_guerra":"Fabiana","email":"fabicericato@gmail.com","data_nascimento":"18/11/1979","nome_pai":"Domingo Cericato","nome_mae":"Judite Therezinha Oro Cericato","sexo":"Feminino","telefone":"(48) 98831-5620","logradouro":"Madre Benvenuta","numero":"388","complemento":"Apto 911","cep":"88036-500","bairro":"Trindade","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"26/09/2023 12:58:19","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"17","cpf":"008.489.029-04","senha":"0084","nome":"Gabriel Francisco Farias da Silva","nome_guerra":"Gabriel","email":"bombeirofloripa2011@hotmail.com","data_nascimento":"26/01/1985","nome_pai":"Paulo Roberto da Silva","nome_mae":"Maria da Graça Farias Haskel","sexo":"Masculino","telefone":"(48) 99852-5717","logradouro":"João Batista Derner Neves","numero":"25","complemento":"ap1005","cep":"88102-270","bairro":"Kobrasol","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"09/01/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"18","cpf":"046.128.369-79","senha":"0461","nome":"Marcia Aparecida Henkes","nome_guerra":"Henkes","email":"mahenkes@gmail.com","data_nascimento":"08/08/1984","nome_pai":"Antônio Adão Henkes","nome_mae":"Ana Geni Veloso de Linhares Henkes","sexo":"Feminino","telefone":"(48) 99800-0811","logradouro":"Rua das Ameixas","numero":"126","complemento":"Casa","cep":"88136-303","bairro":"Madri","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"25/02/2024 19:39:32","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"19","cpf":"025.435.769-59","senha":"0254","nome":"Carlos Humberto luiz","nome_guerra":"Humberto","email":"carluzjr@hotmail.com","data_nascimento":"02/12/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99117-2211","logradouro":"Rua Madre tereza de Calcutá","numero":"","complemento":"","cep":"","bairro":"Real Parque","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"06/06/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"20","cpf":"774.179.849-91","senha":"7741","nome":"Ilton Saturnino Braz","nome_guerra":"Ilton","email":"iltonbraz.bc@gmail.com","data_nascimento":"22/01/1969","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99926-0398","logradouro":"Antonio Goncalves Chaves","numero":"","complemento":"","cep":"88130-545","bairro":"Ponte Imaruim","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"03/02/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"21","cpf":"008.036.019-05","senha":"0080","nome":"Gabriela Kassandra Luiz Colossi","nome_guerra":"Kassandra","email":"kassandracolossi1090@gmail.com","data_nascimento":"08/10/1984","nome_pai":"Paulo Roberto Luiz","nome_mae":"Katia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 98475-8962","logradouro":"Maria Helena Kretzer","numero":"503","complemento":"casa","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"18/11/2023 12:32:54","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"22","cpf":"092.909.549-90","senha":"0929","nome":"Gustavo Augusto Linder","nome_guerra":"Linder","email":"augustolinder@gmail.com","data_nascimento":"19/10/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99850-3832","logradouro":"Rua Cabo Oderli Schilchting","numero":"","complemento":"","cep":"","bairro":"Passa Vinte","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"23","cpf":"015.513.347-04","senha":"0155","nome":"Carlos Henrique Lourenço Gonçalves","nome_guerra":"Lourenço","email":"carioca-henrique@hotmail.com","data_nascimento":"22/09/1972","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99936-9240","logradouro":"rua Conde Afonso Celso","numero":"","complemento":"","cep":"88070-560","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"20/08/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"24","cpf":"085.543.859-26","senha":"0855","nome":"Lucas Rodrigues Antônio","nome_guerra":"Lucas","email":"lucasrodrigues635833lra@gmail.com","data_nascimento":"28/08/1994","nome_pai":"Daniel Aniceto Antônio","nome_mae":"Chirley João Rodrigues Antônio","sexo":"Masculino","telefone":"(48) 99935-2731","logradouro":"Rua Fernando José Zimmermann","numero":"33","complemento":"Casa","cep":"88160-624","bairro":"Bom viver","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"05/06/2024 11:21:34","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"25","cpf":"109.532.709-71","senha":"1095","nome":"Mayara Vieira Soares","nome_guerra":"Mayara","email":"mayarasoaresrl@gmail.com","data_nascimento":"04/01/2002","nome_pai":"Rodrigo Soares","nome_mae":"Raquel Vieira Soares","sexo":"Feminino","telefone":"(48) 99620-5860","logradouro":"Rua Rodney Brasil Machado","numero":"59","complemento":"Condomínio","cep":"88122-049","bairro":"Sertão do Maruim","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"26/09/2023 20:02:58","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"26","cpf":"005.592.699-19","senha":"0055","nome":"Kleber Pacheco Mina","nome_guerra":"Mina","email":"kleber_dvdx@hotmail.com","data_nascimento":"30/09/1979","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98430-9294","logradouro":"rua Pedro Paulo de Abreu","numero":"","complemento":"","cep":"88106-785","bairro":"forquilhinhas","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"08/01/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"27","cpf":"097.100.159-66","senha":"0971","nome":"Mithel Evergisto de Lima","nome_guerra":"Mithel","email":"mithel_lima@hotmail.com","data_nascimento":"26/07/1994","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98447-8424","logradouro":"rua 13 de Junho","numero":"","complemento":"","cep":"88106-470","bairro":"Flor de Nápolis","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"19/02/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"28","cpf":"052.026.659-54","senha":"0520","nome":"Raphael Natayan Nilsen","nome_guerra":"Natayan","email":"raphael_nilsen@hotmail.com","data_nascimento":"27/12/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98404-1027","logradouro":"R. João Guilherme dos Santos","numero":"","complemento":"","cep":"88131-780","bairro":"Rio Grande","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"05/10/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"29","cpf":"060.594.529-22","senha":"0605","nome":"Gabriel Nery Cristiano","nome_guerra":"Nery","email":"gabrielnerycristiano1@gmail.com","data_nascimento":"27/07/2002","nome_pai":"Cândido Cristiano conceição Cristiano","nome_mae":"Lucimara Terezinha Pierro Nery","sexo":"Masculino","telefone":"(48) 99649-1296","logradouro":"Av. Brasil","numero":"158","complemento":"Casa","cep":"88110-500","bairro":"Bela Vista","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2023 21:37:32","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"30","cpf":"770.614.709-68","senha":"7706","nome":"Marcelo luiz de Oliveira","nome_guerra":"Oliveira","email":"bcoliveiraqap@gmail.com","data_nascimento":"05/07/1970","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99991-3979","logradouro":"Rua Domingos Pedro Hermes","numero":"","complemento":"","cep":"","bairro":"Barreiros","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"31","cpf":"091.275.619-50","senha":"0912","nome":"Guilherme Ozol de Assunção","nome_guerra":"Ozol","email":"ozol.guilherme@gmail.com","data_nascimento":"22/12/1993","nome_pai":"","nome_mae":"Sandra Mara Ozol de Assunção","sexo":"Masculino","telefone":"(48) 99110-7391","logradouro":"Rua Elizeu de Bernardi","numero":"641","complemento":"Bl c ap 302","cep":"88101-050","bairro":"Campinas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"26/03/2026","data_cadastro":"11/09/2023 18:16:01","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"32","cpf":"757.951.599-72","senha":"7579","nome":"Emerson Pereira","nome_guerra":"Pereira","email":"emersonobra@gmail.com","data_nascimento":"04/02/1974","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98428-4002","logradouro":"Balbuino Mechen","numero":"","complemento":"","cep":"","bairro":"Boa Parana","cidade":"S.P.A","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"30/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"33","cpf":"010.110.059-05","senha":"0101","nome":"Caio Passold Ravache","nome_guerra":"Ravache","email":"caio.p.ravache@gmail.com","data_nascimento":"15/05/2000","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9907-1505","logradouro":"rua João Meirelles","numero":"","complemento":"","cep":"88085-435","bairro":"Itaguáçu","cidade":"florianópolis","perfil":"associado","status":"desligado","data_desligamento":"11/05/2026","data_cadastro":"14/08/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"34","cpf":"003.357.419-76","senha":"0033","nome":"Michele Santana Quint","nome_guerra":"Santana","email":"jcmicheliquint@gmail.com","data_nascimento":"26/11/1977","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99606-4164","logradouro":"Rua Roberto VALDIR Manchich","numero":"","complemento":"","cep":"88123-430","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"35","cpf":"120.391.089-47","senha":"1203","nome":"Julia da Silva Sardá","nome_guerra":"Sardá","email":"jhu22jhu@gmail.com","data_nascimento":"15/04/1999","nome_pai":"Claudemar Alfredo Sardá","nome_mae":"Liliane Maria da Silva Sardá","sexo":"Feminino","telefone":"(48) 98424-2904","logradouro":"Rua Manoel Eduardo Cardoso","numero":"17","complemento":"Casa","cep":"88110-792","bairro":"Bela Vista 1","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"28/04/2026","data_cadastro":"26/09/2023 13:18:11","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"36","cpf":"155.303.359-00","senha":"1553","nome":"André Luiz Schmitt","nome_guerra":"Schmitt","email":"andréLuizschmitt@gmail.com","data_nascimento":"27/04/1988","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 98435-2594","logradouro":"Rua Frei Albano","numero":"","complemento":"","cep":"88103-100","bairro":"Centro","cidade":"São josé","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"31/05/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"37","cpf":"002.200.260-09","senha":"0022","nome":"Kleber Spotti Rodrigues","nome_guerra":"Spotti","email":"kleberspotti@gmail.com","data_nascimento":"06/07/1982","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 99903-1009","logradouro":"rua Baldicero Filomeno","numero":"","complemento":"","cep":"88064-002","bairro":"Alto Ribeirão","cidade":"Florianopolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/08/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"38","cpf":"008.818.209-62","senha":"0088","nome":"Uelder Alves Da Costa","nome_guerra":"Alves","email":"10b3aux@gmail.com","data_nascimento":"10/09/1985","nome_pai":"VILMO FRANCISCO DA COSTA","nome_mae":"EUGÊNIA ALVES","sexo":"Masculino","telefone":"(48) 98801-0190","logradouro":"RUA CRISTÓVÃO NUNES PIRES","numero":"180","complemento":"APTO 904","cep":"88010-120","bairro":"CENTRO","cidade":"FLORIANÓPOLIS","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/10/2023 15:06:50","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"39","cpf":"416.967.609-25","senha":"4169","nome":"Ismael Vieira da Rosa Ulysséia","nome_guerra":"Ulysséia","email":"ismaelvru@intercop.com.br","data_nascimento":"02/08/1961","nome_pai":"","nome_mae":"","sexo":"","telefone":"(48) 9997-1294","logradouro":"av Itamarati","numero":"","complemento":"","cep":"88034-400","bairro":"Itamarati","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"08/01/2023 00:00:00","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"40","cpf":"104.320.579-94","senha":"1043","nome":"Yanka Caroliny Luciano","nome_guerra":"Yanka","email":"yanka.carolinyy@gmail.com","data_nascimento":"14/05/1997","nome_pai":"CLAUDINEI SOARES LUCIANO","nome_mae":"NAÁRA SCHOROEDER","sexo":"Feminino","telefone":"(48) 99641-8318","logradouro":"R. José João de Souza","numero":"457","complemento":"casa","cep":"88108-170","bairro":"Roçado","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"26/09/2023 08:56:06","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"41","cpf":"028.667.330-45","senha":"0286","nome":"Yuri Esmerio dos Santos","nome_guerra":"Yuri","email":"yurits828@gmail.com","data_nascimento":"04/09/1993","nome_pai":"","nome_mae":"Janine esmerio dos Santos","sexo":"Masculino","telefone":"(48) 98830-3826","logradouro":"Rua sábia una","numero":"45","complemento":"Bloco 5A AP 201","cep":"88122-021","bairro":"Sertão do Imarui","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"04/01/2025 16:13:47","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"42","cpf":"068.052.249-26","senha":"0680","nome":"Markian da Silveira Fortkamp","nome_guerra":"Fortkamp","email":"bcfortkamp@gmail.com","data_nascimento":"26/06/1994","nome_pai":"Marquian Fortkamp","nome_mae":"Viviane da Silveira","sexo":"Masculino","telefone":"(48) 98878-5387","logradouro":"Av. Patrício Antônio Teixeira","numero":"131","complemento":"AP 01","cep":"88161-586","bairro":"Rio Caveiras","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"23/01/2025 16:41:22","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"43","cpf":"007.303.029-54","senha":"0073","nome":"Karina  Maria de Jesus Sobrinho","nome_guerra":"Jesus","email":"kakamania33@gmail.com","data_nascimento":"11/09/1980","nome_pai":"Francisco filho aobrinho","nome_mae":"Maria Mendes de Jesus sobrinho","sexo":"Feminino","telefone":"(48) 99180-6824","logradouro":"Adão Shimitd","numero":"998","complemento":"Casa","cep":"88117-260","bairro":"Barreiros","cidade":"São jose","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2025 19:25:13","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"44","cpf":"039.070.760-01","senha":"0390","nome":"Nakata Garra Gomes","nome_guerra":"Nakata","email":"nakatagarrag@gmail.com","data_nascimento":"12/12/1999","nome_pai":"Danilo da Fontoura Gomes","nome_mae":"Mariselma Garra Lacerda Gomes","sexo":"Feminino","telefone":"(55) 98449-2570","logradouro":"Avenida Ceniro Martins 1078","numero":"1078","complemento":"Apto 9","cep":"88107-479","bairro":"Forquilhas","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"06/05/2026","data_cadastro":"17/06/2025 13:00:48","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"45","cpf":"125.366.669-56","senha":"1253","nome":"Weverton José Machado","nome_guerra":"Weverton","email":"machadoweverton424@gmail.com","data_nascimento":"14/09/2002","nome_pai":"José Jucelio Machado","nome_mae":"Jerusa aparecida citadella","sexo":"Masculino","telefone":"(48) 99821-8785","logradouro":"Rua 13 de maio","numero":"876","complemento":"Casa","cep":"88165-040","bairro":"Prado","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"05/07/2025 18:41:40","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"46","cpf":"919.835.099-49","senha":"9198","nome":"Alexandre Vinicius Martins","nome_guerra":"Martins","email":"djxandemartins@gmail.com","data_nascimento":"10/09/1976","nome_pai":"Não Declarado","nome_mae":"Mariza Salete Martins","sexo":"Masculino","telefone":"(48) 99957-5275","logradouro":"Rua Olavo Bilac","numero":"498","complemento":"Casa","cep":"88133-350","bairro":"Jardim Eldorado","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/08/2025 16:01:19","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"47","cpf":"100.975.089-50","senha":"1009","nome":"Ana Carolina Nascimento","nome_guerra":"Ana Carolina","email":"anacarolinanascimento2309@gmail.com","data_nascimento":"23/09/1995","nome_pai":"Silvonei Nascimento","nome_mae":"Katia Regina Sodre","sexo":"Feminino","telefone":"(48) 99944-4545","logradouro":"Rua Johannes Lambertus Josef Bovee","numero":"16","complemento":"Casa","cep":"88168-490","bairro":"Tijuquinhas","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"18/08/2025 10:21:07","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"48","cpf":"083.469.799-83","senha":"0834","nome":"Andréia Martins dos Santos","nome_guerra":"Andréia M","email":"andreiamartins.ntr@gmail.com","data_nascimento":"20/04/1992","nome_pai":"Salvador Martins dos Santos","nome_mae":"Angelina da Cruz Delfino","sexo":"Feminino","telefone":"(48) 98472-8085","logradouro":"Rua Acácio Reitz","numero":"355","complemento":"Casa","cep":"88161-060","bairro":"Universitário","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"02/10/2025 19:32:58","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"49","cpf":"007.064.299-07","senha":"0070","nome":"Fernando Pereira Siqueira Junior","nome_guerra":"Siqueira","email":"snnnarfdrums@gmail.com","data_nascimento":"09/05/1981","nome_pai":"Fernando Pereira Siqueira","nome_mae":"Sandra Aparecida Ferreira","sexo":"Masculino","telefone":"(48) 99953-1501","logradouro":"Rua sebastiana Coutinho","numero":"216","complemento":"Torre D apto 202","cep":"88113-240","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"08/10/2025 11:44:40","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"50","cpf":"028.574.290-61","senha":"0285","nome":"Alessandro da Costa Gonçalves","nome_guerra":"Gonçalves","email":"acgoncalves191@gmail.com","data_nascimento":"13/10/1991","nome_pai":"José João Angonezi Gonçalves","nome_mae":"Sandra Mara Costa Gonçalves","sexo":"Masculino","telefone":"(48) 99146-6837","logradouro":"Av Paulo Roberto Vidal","numero":"2490","complemento":"Casa","cep":"88132-599","bairro":"Bella Vista","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"04/12/2025 12:14:18","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"51","cpf":"147.564.459-00","senha":"1475","nome":"Misael Dias Neumann","nome_guerra":"Neumann","email":"misaeldiasneumann@gmail.com","data_nascimento":"11/04/2005","nome_pai":"Baltazar Romeiro Neumann","nome_mae":"Joseane Dias Neumann","sexo":"Masculino","telefone":"(48) 98824-4964","logradouro":"Rua Manoel Mariano Ferreira","numero":"621","complemento":"Condomínio","cep":"88161-680","bairro":"Rio Caveiras","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"15/12/2025 12:50:37","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"52","cpf":"007.178.839-57","senha":"0071","nome":"Luiz Fernando da Silva","nome_guerra":"Luiz","email":"silva.luiz0579@gmail.com","data_nascimento":"11/05/1979","nome_pai":"Nelson da Silva","nome_mae":"Zilma Ana da Silva","sexo":"Masculino","telefone":"(48) 98437-2126","logradouro":"Servidão Inácia de Medeiros","numero":"263","complemento":"Casa","cep":"88037-065","bairro":"Córrego grande","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"22/12/2025 12:21:46","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"53","cpf":"097.355.079-19","senha":"0973","nome":"João Victor Figueiredo Chrostowski","nome_guerra":"Figueiredo","email":"joaov.chrostowski@gmail.com","data_nascimento":"27/07/1995","nome_pai":"José Hélio Chrostowski","nome_mae":"Cerlei Adriane Figueiredo Chrostowski","sexo":"Masculino","telefone":"(47) 99136-3393","logradouro":"Rua Thomé Israel da Silva","numero":"105","complemento":"Apto 401A","cep":"88132-373","bairro":"Caminho Novo","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"10/02/2026 16:22:07","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"54","cpf":"003.747.659-95","senha":"0037","nome":"LUCIANO PEREIRA","nome_guerra":"Luciano","email":"lucianompereira@gmail.com","data_nascimento":"10/05/1979","nome_pai":"ADONAI PEREIRA","nome_mae":"VERA LUCIA PEREIRA","sexo":"Masculino","telefone":"(48) 99993-3233","logradouro":"Rua Maria Filomena da Silva","numero":"388","complemento":"Ap 1001","cep":"88110-630","bairro":"Nsa Sra do Rosário","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/02/2026 10:13:55","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"55","cpf":"951.971.339-53","senha":"9519","nome":"Claudio cardoso","nome_guerra":"Cardoso","email":"claudio.cardoso311074@gmail.com","data_nascimento":"31/10/1974","nome_pai":"Sebastião Boaventura cardoso","nome_mae":"Maria do Carmo cardoso","sexo":"Masculino","telefone":"(48) 99906-6108","logradouro":"Rua Caetano da costa coelho","numero":"1593","complemento":"Apto 101","cep":"88113-790","bairro":"Areias","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/02/2026 10:47:34","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"56","cpf":"079.744.619-26","senha":"0797","nome":"Diego Carvalho Cordova","nome_guerra":"Carvalho","email":"brxf0r4ste1ro@gmail.com","data_nascimento":"11/09/1991","nome_pai":"Paulo Henrique Cordova","nome_mae":"Maria de Fátima Carvalho","sexo":"Masculino","telefone":"(48) 99823-7756","logradouro":"Rua geral de três riachos","numero":"Sem numero","complemento":"Casa","cep":"88160-000","bairro":"Fundos","cidade":"Biguaçu","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"11/02/2026 10:51:36","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"57","cpf":"118.669.539-07","senha":"1186","nome":"João Pedro Pereira Bunn","nome_guerra":"Bunn","email":"joaoppb01@gmail.com","data_nascimento":"15/09/2004","nome_pai":"Orlando Bunn","nome_mae":"Adriana Maciel Pereira","sexo":"Masculino","telefone":"(48) 99951-2775","logradouro":"Rua Acioli Nunes dos Santos","numero":"231","complemento":"Casa","cep":"88131-540","bairro":"Centro","cidade":"Palhoça","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/02/2026 10:56:37","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"58","cpf":"065.194.139-33","senha":"0651","nome":"Vanessa David Costa","nome_guerra":"Costa","email":"vanessamodapet1209@gmail.com","data_nascimento":"11/04/1987","nome_pai":"Marcelo Costa","nome_mae":"Elisete David Costa","sexo":"Feminino","telefone":"(48) 98466-6195","logradouro":"Rua Inhambu","numero":"104","complemento":"Casa","cep":"88115-510","bairro":"Serraria","cidade":"São José","perfil":"associado","status":"desligado","data_desligamento":"09/08/2026","data_cadastro":"11/02/2026 12:07:04","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"59","cpf":"096.581.989-29","senha":"0965","nome":"Izabelle Sofie Luiz","nome_guerra":"Sofie","email":"bell.450009@gmail.com","data_nascimento":"23/12/2001","nome_pai":"Paulo Roberto Luiz","nome_mae":"Kátia Regina Ventura Luiz","sexo":"Feminino","telefone":"(48) 99154-0113","logradouro":"rua Maria Helena Kretzer","numero":"503","complemento":"casa A ap 202","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"11/02/2026 18:30:59","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"60","cpf":"123.859.799-85","senha":"1238","nome":"Fabian Henrique da Silva","nome_guerra":"Fabian","email":"fabiandeggy@gmail.com","data_nascimento":"04/06/2005","nome_pai":"Rodrigo Eduardo da Silva","nome_mae":"Juliane Caetano Justino","sexo":"Masculino","telefone":"(48) 99107-5323","logradouro":"Rua Prefeito Dib Cherem","numero":"2734","complemento":"Casa","cep":"88090-000","bairro":"Capoeiras","cidade":"Florianópolis","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"12/02/2026 11:36:15","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"61","cpf":"063.023.992-46","senha":"0630","nome":"Washington Levi Nascimento Dias","nome_guerra":"Levi","email":"vulgo.levi2004@gmail.com","data_nascimento":"31/08/2004","nome_pai":"DUCIVALDO","nome_mae":"ROSYLANGE DO NASCIMENTO","sexo":"Masculino","telefone":"(48) 98859-1896","logradouro":"Av paulo roberto vidal","numero":"475","complemento":"bloco c ap 310","cep":"88132-599","bairro":"Bela vista","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"12/06/2026","data_cadastro":"16/02/2026 14:51:05","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"62","cpf":"069.723.111-95","senha":"0697","nome":"Reinaldo Joaber de Araújo Spengler","nome_guerra":"Joaber","email":"reinaldospengler@gmail.com","data_nascimento":"15/01/2002","nome_pai":"Ivo Spengler","nome_mae":"Genilce Silva de Araújo Spengler","sexo":"Masculino","telefone":"(48) 98839-0467","logradouro":"Demetrio Novossate","numero":"278","complemento":"Casa","cep":"88136-366","bairro":"São Sebastião","cidade":"Palhoça","perfil":"associado","status":"desligado","data_desligamento":"09/06/2026","data_cadastro":"18/02/2026 08:17:02","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"63","cpf":"008.145.020-67","senha":"0081","nome":"Anderson Rafael Souza da Silva","nome_guerra":"Anderson","email":"anderson84negocios@gmail.com","data_nascimento":"28/10/1984","nome_pai":"","nome_mae":"Marivane Souza da Silva","sexo":"Masculino","telefone":"(48) 99993-8011","logradouro":"Rua Maria Helena Kretzer","numero":"503a","complemento":"Ap301","cep":"88103-670","bairro":"Praia Comprida","cidade":"São José","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"14/03/2026 17:21:19","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"64","cpf":"092.158.639-66","senha":"0921","nome":"Washington sadi de jesus","nome_guerra":"Sadi","email":"washingtondejesus1509@gmail.com","data_nascimento":"15/03/1994","nome_pai":"Valmir de jesus","nome_mae":"Rosane cleia dos santos","sexo":"Masculino","telefone":"(48) 99855-8268","logradouro":"Rua Rodnei Brasil machado","numero":"59","complemento":"Bloco 7a ap104","cep":"88122-000","bairro":"Sertão do maruim","cidade":"Sao jose","perfil":"associado","status":"desligado","data_desligamento":"26/06/2026","data_cadastro":"15/03/2026 22:45:29","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"65","cpf":"235.983.728-17","senha":"2359","nome":"Pâmela Aparecida da Luz Perdoná","nome_guerra":"Perdoná","email":"palperdona@gmail.com","data_nascimento":"17/05/2001","nome_pai":"Marcos Aurélio Perdoná","nome_mae":"Juliana Aparecida da Luz Perdoná","sexo":"Feminino","telefone":"(48) 99186-0157","logradouro":"Servidão silvestre Prim","numero":"136","complemento":"Casa","cep":"88161-144","bairro":"Boa VISTA","cidade":"Biguaçu","perfil":"associado","status":"ativo","data_desligamento":null,"data_cadastro":"17/04/2026 09:43:02","obm":"São José","profissao":"Bombeiro Comunitário"},{"id":"66","cpf":"108.677.459-08","senha":"1086","nome":"Otávio Augusto Viapiana","nome_guerra":"Viapiana","email":"viapiana65@gmail.com","data_nascimento":"18/04/1999","nome_pai":"A
The above content was truncated because individual lines are very long. Only a portion of the content is shown.
"}
{"step_index":23,"source":"MODEL","type":"PLANNER_RESPONSE","status":"DONE","created_at":"2026-08-15T16:16:06Z","thinking":"**Examining Startup & Sync**

I'm now diving into the startup sequence and how data synchronization will function, particularly focusing on the role of the `supabaseClient.js` file. I'm noting the initialization using the `SUPABASE_URL` and `SUPABASE_ANON_KEY` variables. I'm also exploring the `dbService` methods such as `getAssociados`, `saveAssociado`, `deleteAssociado`, `getFinanceiro`, and `add`. I will soon address the best way to handle the data flow.


**Analyzing Data Sync Issues**

I'm now zeroing in on the flaws in the data synchronization implementation. It seems data retrieved from Supabase and data in `localStorage` are not consistently synchronized, leading to potential data loss or outdated information. I also see that the existing `dbService` methods don't properly handle errors or ensure data persistence in Supabase, meaning data can be stuck in the local storage, but never synced to the server. I have been exploring environment configurations to help fix the sync issues.


**Verifying Sync & Seed**

I'm now focusing on how `supabaseClient.js` loads environment variables, ensuring it correctly reads `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SECRET_KEY` from the environment, checking for correct initialization. I have been exploring the implementation of automatic two-way data sync and initial seeding using `dbService.syncAll()`, specifically handling data fetching from Supabase, local updates, seeding from local data to Supabase if empty, and upsert/insert operations. I am now exploring potential error scenarios.

**Validating Schema & Security**

My current focus is on comparing the database schema defined in `schema.sql` with the data fields managed by functions like `saveAssociado`, `addFinanceiro`, etc., in `app.js`. I need to ensure consistency.


**Identifying ID Conflict**

I've discovered a critical issue: the `id` field. The `app.js` and local data use string-based IDs like "2" or "desp_2026_01", but the Supabase schema defines `id` as `UUID`. This mismatch causes Supabase `upsert` failures. I'm now verifying the schema and all tables and their types to guarantee consistent types and avoid further errors. I will refine `schema.sql` and `supabaseClient.js` accordingly.


**Matching Schema & Data**

I'm now deeply involved in aligning the data structures in JavaScript with the database schema, especially the `financeiro_lancamentos` table. I've noted that `addFinanceiro` attempts to insert objects with fields that may not exist in the Supabase table, leading to insert failures. I am cataloging the fields used for each data type in JavaScript and cross-referencing them against the database schema to identify any discrepancies.


**Mapping Data & Types**

I'm now cross-referencing the database schema with the data structures used in `app.js` and `supabaseClient.js`, looking closely at all the available fields, as shown in the example data provided, for tables like `documentos`, `mensagens`, and `programacao_anual`. I have identified a critical step: mapping the data fields used in `app.js` with all of the corresponding fields in the backend. I need to make the `supabaseClient.js` support all the environment variables.


","tool_calls":[{"name":"view_file","args":{"AbsolutePath":"c:\
OTEBOOK\Sitema ACBCSJ\app.js","EndLine":1650,"StartLine":1500,"toolAction":"Viewing pre-cadastro and financeiro insertion in app.js","toolSummary":"Viewing app.js lines 1500-1650"}}]}
{"step_index":24,"source":"MODEL","type":"VIEW_FILE","status":"DONE","created_at":"2026-08-15T16:16:12Z","content":"Created At: 2026-08-15T13:16:12-03:00
Completed At: 2026-08-15T13:16:12-03:00
File Path: `file:///c:/NOTEBOOK/Sitema%20ACBCSJ/app.js`
Total Lines: 3373
Total Bytes: 209641
Showing lines 1500 to 1650
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
nome_mae: nomeMae,
nome_pai: nomePai,
sexo: sexo,
telefone: telefone,
obm: obm,
profissao: profissao,
logradouro: logradouro,
numero: numero,
complemento: complemento,
cep: cep,
bairro: bairro,
cidade: cidade,
perfil: 'associado',
status: 'pendente',
data_cadastro: dataHoraCadastro
};
list.push(novoAssociado);
localStorage.setItem('acbcsj_associados', JSON.stringify(list));
dbService.saveAssociado(novoAssociado);
alert(`Solicitação de cadastro de ${nomeGuerra} (${nomeCompleto}) enviada com sucesso em ${dataHoraCadastro}!\
\
⚠️ O acesso estará BLOQUEADO até a APROVAÇÃO pela Diretoria.\
🔑 Após a aprovação, sua senha de acesso será os 4 primeiros dígitos do seu CPF (${senhaAutomatica}).`);
e.target.reset();
if (document.getElementById('regSemPai')) {
document.getElementById('regSemPai').checked = false;
document.getElementById('regNomePai').disabled = false;
}
closeModal('modalPreCadastro');
}
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
// ==========================================
// GESTÃO FINANCEIRA, RECEITAS, DESPESAS E MENSALIDADES (PLANILHA MENSAL.XLSX)
// ==========================================
function abrirModalNovoLancamento(tipo) {
const selTipo = document.getElementById('finTipo');
const modalTitle = document.getElementById('modalLancamentoTitle');
const dataInput = document.getElementById('finData');
if (selTipo) {
selTipo.value = tipo || 'receita';
atualizarCategoriasLancamento(selTipo.value);
}
if (modalTitle) {
modalTitle.textContent = tipo === 'despesa' ? '➖ Inserir Despesa (Saída)' : '➕ Inserir Receita (Entrada)';
}
if (dataInput && !dataInput.value) {
const hoje = new Date().toISOString().split('T')[0];
dataInput.value = hoje;
}
openModal('modalNovoLancamento');
}
function atualizarCategoriasLancamento(tipo) {
const catSelect = document.getElementById('finCategoria');
if (!catSelect) return;
catSelect.innerHTML = '';
if (tipo === 'receita') {
catSelect.innerHTML = `
<option value="Mensalidade / Contribuição">Mensalidade / Contribuição</option>
<option value="Doação / Convênio">Doação / Convênio</option>
<option value="Evento / Rifa">Evento / Rifa</option>
<option value="Outras Receitas">Outras Receitas</option>
`;
} else {
catSelect.innerHTML = `
<option value="Despesa Operacional">Despesa Operacional</option>
<option value="Manutenção de Viatura">Manutenção de Viatura</option>
<option value="Administrativo / Consumo">Administrativo / Consumo</option>
<option value="Encargos / Tarifas">Encargos / Tarifas</option>
<option value="Outras Despesas">Outras Despesas</option>
`;
}
}
function salvarNovoLancamento(e) {
e.preventDefault();
const tipo = document.getElementById('finTipo').value;
const valor = parseFloat(document.getElementById('finValor').value);
const descricao = document.getElementById('finDescricao').value.trim();
const categoria = document.getElementById('finCategoria').value;
const dataInput = document.getElementById('finData').value;
const fileInput = document.getElementById('finComprovante');
const file = fileInput && fileInput.files ? fileInput.files[0] : null;
if (!valor || valor <= 0 || !descricao || !dataInput) {
alert('Por favor, preencha a descrição, valor válido e a data do lançamento.');
return;
}
const [ano, mes, dia] = dataInput.split('-');
const dataBR = `${dia}/${mes}/${ano}`;
const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const mesNome = mesesNomes[parseInt(mes, 10) - 1] || 'Janeiro';
const lancId = 'lanc_' + Date.now();
const concluirSalvarLancamento = async (fileDataUrl = null, fileName = null) => {
let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
const novoLancamento = {
id: lancId,
descricao: descricao,
categoria: categoria,
valor: valor,
tipo: tipo,
data: dataBR,
data_iso: dataInput,
mes: mesNome,
comprovante_nome: fileName
};
if (fileDataUrl) {
await idbStorage.setFile(lancId, fileDataUrl);
}
list.unshift(novoLancamento);
try {
localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));
} catch (err) {
console.warn('Salvo no sistema.');
}
try {
dbService.addFinanceiro(novoLancamento);
} catch (err) {}
alert(`Lançamento de ${tipo.toUpperCase()} (R$ ${valor.toFixed(2).replace('.', ',')}) cadastrado com sucesso!`);
e.target.reset();
closeModal('modalNovoLancamento');
renderGestaoFinanceira();
};
if (file) {
const reader = new FileReader();
reader.onload = function (event) {
concluirSalvarLancamento(event.target.result, file.name);
};
reader.readAsDataURL(file);
} else {
concluirSalvarLancamento();
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
"}
{"step_index":25,"source":"MODEL","type":"PLANNER_RESPONSE","status":"DONE","created_at":"2026-08-15T16:16:13Z","tool_calls":[{"name":"view_file","args":{"AbsolutePath":"c:\
OTEBOOK\Sitema ACBCSJ\app.js","EndLine":240,"StartLine":180,"toolAction":"Viewing initMockData in app.js","toolSummary":"Viewing app.js lines 180 to 240"}}]}
{"step_index":26,"source":"MODEL","type":"VIEW_FILE","status":"DONE","created_at":"2026-08-15T16:16:18Z","content":"Created At: 2026-08-15T13:16:18-03:00
Completed At: 2026-08-15T13:16:18-03:00
File Path: `file:///c:/NOTEBOOK/Sitema%20ACBCSJ/app.js`
Total Lines: 3373
Total Bytes: 209641
Showing lines 180 to 240
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
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
// AUTENTICAÇÃO E LOGIN
function loginWithCPF(cpf, password, roleHint = null) {
try {
const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || (typeof MOCK_DATA_INITIAL !== 'undefined' ? MOCK_DATA_INITIAL.associados : []);
if (roleHint === 'diretoria') {
currentUser = list.find(a => a.perfil === 'diretoria' && a.status === 'ativo') || (typeof MOCK_DATA_INITIAL !== 'undefined' ? MOCK_DATA_INITIAL.associados[0] : null);
} else if (roleHint === 'associado') {
currentUser = list.find(a => a.perfil === 'associado' && a.status === 'ativo') || (typeof MOCK_DATA_INITIAL !== 'undefined' ? MOCK_DATA_INITIAL.associados[1] : null);
} else {
const cleanInputCPF = (cpf || '').replace(/\D/g, '');
const found = list.find(a => (a.cpf || '').replace(/\D/g, '') === cleanInputCPF || a.cpf === cpf);
if (!found) {
alert('CPF não encontrado no sistema da ACBCSJ. Verifique os números digitados ou faça sua solicitação de pré-cadastro.');
return;
}
if (found.status === 'pendente') {
alert('⚠️ ACESSO BLOQUEADO!\
\
Sua solicitação de cadastro ainda está em análise pela Diretoria da ACBCSJ. Aguarde a aprovação para conseguir logar.');
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
"}
{"step_index":27,"source":"MODEL","type":"PLANNER_RESPONSE","status":"DONE","created_at":"2026-08-15T16:16:18Z","thinking":"**Analyzing Initialization Flow**

I've been examining the execution flow of `initMockData()` and `loginWithCPF()`. Right now, the mock data prepopulates `localStorage`, which is a good baseline. However, I've noticed Supabase isn't initialized on load, leaving potential data inconsistencies if another device registers. That initial data synchronization is a critical area for improvement!


**Addressing Data Synchronization**

I've pinpointed a critical issue: local data isn't consistently synchronized with Supabase. While the website saves data to Supabase, other users aren't seeing it because the application primarily relies on `localStorage`. I've identified that the `initMockData()` process correctly prepopulates `localStorage`, acting as a reasonable base; however, the lack of Supabase initialization on load introduces potential data inconsistencies. This gap causes data to become siloed in local storage. My solution involves setting up environmental variables properly and updating `supabaseClient.js`. I'll also fix database schema inconsistencies.


","tool_calls":[{"name":"view_file","args":{"AbsolutePath":"c:\
OTEBOOK\Sitema ACBCSJ\app.js","EndLine":3373,"StartLine":3300,"toolAction":"Viewing bottom lines of app.js","toolSummary":"Viewing app.js lines 3300 to 3373"}}]}
{"step_index":28,"source":"MODEL","type":"VIEW_FILE","status":"DONE","created_at":"2026-08-15T16:16:24Z","content":"Created At: 2026-08-15T13:16:24-03:00
Completed At: 2026-08-15T13:16:24-03:00
File Path: `file:///c:/NOTEBOOK/Sitema%20ACBCSJ/app.js`
Total Lines: 3373
Total Bytes: 209641
Showing lines 3300 to 3373
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
document.getElementById('editBaixaData').value = item.data_iso || new Date().toISOString().split('T')[0];
document.getElementById('editBaixaComprovantePix').value = item.comprovante_pix || '';
document.getElementById('editBaixaObs').value = item.obs || '';
const listaMeses = (item.meses_quitados || '').split(',').map(m => m.trim().toLowerCase());
const checkboxes = document.querySelectorAll('input[name="editBaixaMeses"]');
checkboxes.forEach(cb => {
cb.checked = listaMeses.some(m => m.startsWith(cb.value));
});
openModal('modalEditarBaixaMensalidade');
}
function salvarEdicaoBaixaMensalidade(e) {
e.preventDefault();
const id = document.getElementById('editBaixaId').value;
const valorTotal = parseFloat(document.getElementById('editBaixaValor').value) || 0;
const dataInput = document.getElementById('editBaixaData').value;
const comprovantePix = document.getElementById('editBaixaComprovantePix').value.trim();
const obs = document.getElementById('editBaixaObs').value.trim();
const checkedMeses = Array.from(document.querySelectorAll('input[name="editBaixaMeses"]:checked')).map(c => c.value);
if (valorTotal <= 0 || !dataInput || checkedMeses.length === 0) {
alert('Por favor, preencha o valor, a data e selecione ao menos um mês.');
return;
}
let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
const index = historicoGeral.findIndex(h => h.id === id);
if (index < 0) {
alert('Lançamento não encontrado.');
return;
}
const [anoD, mesD, diaD] = dataInput.split('-');
const dataBR = `${diaD}/${mesD}/${anoD}`;
const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };
const mesesTexto = checkedMeses.map(m => mesesNomesMap[m]).join(', ');
historicoGeral[index].valor = valorTotal;
historicoGeral[index].data = dataBR;
historicoGeral[index].data_iso = dataInput;
historicoGeral[index].comprovante_pix = comprovantePix || 'Comprovante PIX confirmado';
historicoGeral[index].meses_quitados = mesesTexto;
historicoGeral[index].obs = obs || `Baixa de mensalidade PIX (${mesesTexto}/${historicoGeral[index].ano})`;
localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));
recalcularGridAssociado(historicoGeral[index].cpf, historicoGeral[index].ano);
alert('Lançamento de mensalidade atualizado com sucesso!');
closeModal('modalEditarBaixaMensalidade');
renderGestaoMensalidades();
renderGestaoFinanceira();
if (historicoGeral[index].cpf) verExtratoAssociado(historicoGeral[index].cpf);
}
function excluirBaixaMensalidade(id) {
if (confirm('Deseja realmente excluir este lançamento de mensalidade PIX? Esta ação desfará o pagamento na grade anual.')) {
let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
const item = historicoGeral.find(h => h.id === id);
if (!item) return;
historicoGeral = historicoGeral.filter(h => h.id !== id);
localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));
recalcularGridAssociado(item.cpf, item.ano);
alert('Lançamento de mensalidade removido com sucesso.');
renderGestaoMensalidades();
renderGestaoFinanceira();
verExtratoAssociado(item.cpf);
}
