// DADOS IMPORTADOS DA PLANILHA 'Cadastrosocios.xlsx' (Aba: Cadastro de SÃ³cios 2026)
const ASSOCIADOS_EXCEL_IMPORT = [
    {
        "id":  "100",
        "cpf":  "000.923.500-03",
        "senha":  "0009",
        "nome_guerra":  "Angélica",
        "nome":  "Angélica Mateus",
        "data_nascimento":  "1977-05-23",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99814-2594",
        "email":  "amangelica14@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua João Evangelista da Costa",
        "numero":  "",
        "complemento":  "",
        "cep":  "88090-301",
        "bairro":  "Coloninha",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-07-31"
    },
    {
        "id":  "101",
        "cpf":  "074.136.669-01",
        "senha":  "0741",
        "nome_guerra":  "Antunes",
        "nome":  "Douglas Antunes",
        "data_nascimento":  "1994-09-24",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98435-4431",
        "email":  "douglas.antunes4012@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Flores da Cunha",
        "numero":  "",
        "complemento":  "",
        "cep":  "88070-460",
        "bairro":  "Capoeiras",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-30"
    },
    {
        "id":  "102",
        "cpf":  "073.716.899-41",
        "senha":  "0737",
        "nome_guerra":  "Augusto",
        "nome":  "Murilo Augusto Galdino De Souza",
        "data_nascimento":  "1990-07-04",
        "nome_mae":  "ZELIA MARIA SILVA DE SOUZA",
        "nome_pai":  "NELSON JOSÉ DE SOUZA",
        "sexo":  "Masculino",
        "telefone":  "4.8984941095E10",
        "email":  "GALDINOMUS@GMAIL.COM",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "VALDIR GUTHIA",
        "numero":  "12.0",
        "complemento":  "ANA MELO",
        "cep":  "8.8135186E7",
        "bairro":  "ARIRIU",
        "cidade":  "PALHOÇA",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-07"
    },
    {
        "id":  "103",
        "cpf":  "961.193.810-15",
        "senha":  "9611",
        "nome_guerra":  "Andreia",
        "nome":  "Andreia de Fátima Machado",
        "data_nascimento":  "1980-08-25",
        "nome_mae":  "Catarina Benedett machado",
        "nome_pai":  "Fredolino machado",
        "sexo":  "Feminino",
        "telefone":  "4.8996970295E10",
        "email":  "andreiamachado2508@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Antônio Elias",
        "numero":  "22.0",
        "complemento":  "Casa",
        "cep":  "8.810616E7",
        "bairro":  "Picadas do sul",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-10-27"
    },
    {
        "id":  "104",
        "cpf":  "069.776.559-84",
        "senha":  "0697",
        "nome_guerra":  "Bento",
        "nome":  "Daniel Bento",
        "data_nascimento":  "1989-08-01",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99616-1172",
        "email":  "bentodani1989@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Av Governador Ivo Silveira",
        "numero":  "",
        "complemento":  "",
        "cep":  "88085-000",
        "bairro":  "Capoeiras",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-03-18"
    },
    {
        "id":  "105",
        "cpf":  "083.801.589-11",
        "senha":  "0838",
        "nome_guerra":  "Binhoti",
        "nome":  "Tiago Binhoti",
        "data_nascimento":  "1991-09-30",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98497-4657",
        "email":  "tiagobinhoti@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua Francisco Lutz de Almeida",
        "numero":  "",
        "complemento":  "",
        "cep":  "88108-173",
        "bairro":  "Roçado",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-03-10"
    },
    {
        "id":  "106",
        "cpf":  "021.603.099-40",
        "senha":  "0216",
        "nome_guerra":  "Boiko",
        "nome":  "Emerson Roberto Boiko",
        "data_nascimento":  "1978-06-26",
        "nome_mae":  "Maria das dores Alves boiko",
        "nome_pai":  "Ladislau boiko",
        "sexo":  "Masculino",
        "telefone":  "9.99620506E8",
        "email":  "Emersonboiko@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua das amiexas",
        "numero":  "126.0",
        "complemento":  "Casa",
        "cep":  "8.8136303E7",
        "bairro":  "Madri",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2024-02-24"
    },
    {
        "id":  "107",
        "cpf":  "127.393.649-38",
        "senha":  "1273",
        "nome_guerra":  "Camila",
        "nome":  "Camila Coelho Soares",
        "data_nascimento":  "2000-09-25",
        "nome_mae":  "Margarida Coelho",
        "nome_pai":  "Pedro Soares",
        "sexo":  "Feminino",
        "telefone":  "4.8991264292E10",
        "email":  "Camila.coelhosoares@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Walmor Beppler",
        "numero":  "S/N",
        "complemento":  "Servidão ao lado da casa 125",
        "cep":  "8.8136257E7",
        "bairro":  "São Sebastião",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-10-04"
    },
    {
        "id":  "108",
        "cpf":  "079.962.129-37",
        "senha":  "0799",
        "nome_guerra":  "Coelho",
        "nome":  "Ricardo Augusto Coelho",
        "data_nascimento":  "1991-08-09",
        "nome_mae":  "Rute Helena do Nascimento",
        "nome_pai":  "Neri Geronimo Coelho",
        "sexo":  "Masculino",
        "telefone":  "4.898485629E10",
        "email":  "ricardo.pc15@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Santo André",
        "numero":  "518.0",
        "complemento":  "ap 201",
        "cep":  "8.810643E7",
        "bairro":  "Flor de napolis",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2024-04-29"
    },
    {
        "id":  "109",
        "cpf":  "318.036.738-50",
        "senha":  "3180",
        "nome_guerra":  "Da Silva",
        "nome":  "Alex Sandro Batista da Silva",
        "data_nascimento":  "1983-07-18",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48) 984269481",
        "email":  "alexsandrob221@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Bela Vista",
        "numero":  "",
        "complemento":  "",
        "cep":  "88119-114",
        "bairro":  "Potecas",
        "cidade":  "São Jose",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-02-15"
    },
    {
        "id":  "110",
        "cpf":  "001.637.940-30",
        "senha":  "0016",
        "nome_guerra":  "Barros",
        "nome":  "Michel da Silveira Barros",
        "data_nascimento":  "1981-07-27",
        "nome_mae":  "Ana lucia da silveira barros",
        "nome_pai":  "José António Rodrigues barros",
        "sexo":  "Masculino",
        "telefone":  "4.898821786E10",
        "email":  "michel_sbarros@yahoo.com.br",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua José Cláudio Schmidt",
        "numero":  "50.0",
        "complemento":  "50.0",
        "cep":  "8.8115558E7",
        "bairro":  "Serraria",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2024-12-28"
    },
    {
        "id":  "111",
        "cpf":  "910.414.909-25",
        "senha":  "9104",
        "nome_guerra":  "Deny",
        "nome":  "Deny Anderson Azevedo",
        "data_nascimento":  "1972-08-06",
        "nome_mae":  "Laurita Bernadete Azevedo",
        "nome_pai":  "Neri Azevedo",
        "sexo":  "Masculino",
        "telefone":  "4.8998683269E10",
        "email":  "denyazevedo1972@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Algarves",
        "numero":  "S/n",
        "complemento":  "Quadra 12 Loteb3",
        "cep":  "8.8107365E7",
        "bairro":  "Lisboa",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-30"
    },
    {
        "id":  "112",
        "cpf":  "932.603.189-68",
        "senha":  "9326",
        "nome_guerra":  "Eder",
        "nome":  "Eder Alison Da Silva",
        "data_nascimento":  "1978-06-21",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "Masculino",
        "telefone":  "(48)99834-6944",
        "email":  "eder.alisondasilva@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua Tercílio Tedesco",
        "numero":  "",
        "complemento":  "",
        "cep":  "88107-481",
        "bairro":  "Potecas",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "113",
        "cpf":  "047.913.959-80",
        "senha":  "0479",
        "nome_guerra":  "Elaine",
        "nome":  "Elaine Conrado Bittencourt",
        "data_nascimento":  "1984-06-01",
        "nome_mae":  "Maria Fátima de Pinho",
        "nome_pai":  "Sidnei Conrado",
        "sexo":  "Feminino",
        "telefone":  "4.8991192407E10",
        "email":  "corretoraimobiliariaelaine@gmail.com",
        "obm":  "Santo Amaro",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua São João",
        "numero":  "500.0",
        "complemento":  "Casa",
        "cep":  "8.814E7",
        "bairro":  "Centro",
        "cidade":  "Santo Amaro da Imperatriz",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2024-10-01"
    },
    {
        "id":  "114",
        "cpf":  "024.284.799-46",
        "senha":  "0242",
        "nome_guerra":  "Fabiana",
        "nome":  "Fabiana Oro Cericato Costa",
        "data_nascimento":  "1979-11-18",
        "nome_mae":  "Judite Therezinha Oro Cericato",
        "nome_pai":  "Domingo Cericato",
        "sexo":  "Feminino",
        "telefone":  "4.898831562E10",
        "email":  "fabicericato@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Madre Benvenuta",
        "numero":  "388.0",
        "complemento":  "Apto 911",
        "cep":  "8.80365E7",
        "bairro":  "Trindade",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-26"
    },
    {
        "id":  "115",
        "cpf":  "008.489.029-04",
        "senha":  "0084",
        "nome_guerra":  "Gabriel",
        "nome":  "Gabriel Francisco Farias da Silva",
        "data_nascimento":  "1985-01-26",
        "nome_mae":  "Maria da Graça Farias Haskel",
        "nome_pai":  "Paulo Roberto da Silva",
        "sexo":  "Masculino",
        "telefone":  "(48)99852-5717",
        "email":  "bombeirofloripa2011@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "João Batista Derner Neves",
        "numero":  "25.0",
        "complemento":  "ap1005",
        "cep":  "88102-270",
        "bairro":  "Kobrasol",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-01"
    },
    {
        "id":  "116",
        "cpf":  "046.128.369-79",
        "senha":  "0461",
        "nome_guerra":  "Henkes",
        "nome":  "Marcia Aparecida Henkes",
        "data_nascimento":  "1984-08-08",
        "nome_mae":  "Ana Geni Veloso de Linhares Henkes",
        "nome_pai":  "Antônio Adão Henkes",
        "sexo":  "Feminino",
        "telefone":  "4.8998000811E10",
        "email":  "mahenkes@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua das Ameixas",
        "numero":  "126.0",
        "complemento":  "Casa",
        "cep":  "8.8136303E7",
        "bairro":  "Madri",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2024-02-25"
    },
    {
        "id":  "117",
        "cpf":  "025.435.769-59",
        "senha":  "0254",
        "nome_guerra":  "Humberto",
        "nome":  "Carlos Humberto luiz",
        "data_nascimento":  "1972-12-02",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99117-2211",
        "email":  "carlosjr@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Madre tereza de Calcutá",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Real Parque",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-06-06"
    },
    {
        "id":  "118",
        "cpf":  "774.179.849-91",
        "senha":  "7741",
        "nome_guerra":  "Ilton",
        "nome":  "Ilton Saturnino Braz",
        "data_nascimento":  "1969-01-22",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)-999260398",
        "email":  "iltonbraz.bc@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Antonio Goncalves Chaves",
        "numero":  "",
        "complemento":  "",
        "cep":  "88130-545",
        "bairro":  "Ponte Imaruim",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-03-02"
    },
    {
        "id":  "119",
        "cpf":  "008.036.019-05",
        "senha":  "0080",
        "nome_guerra":  "Kassandra",
        "nome":  "Gabriela Kassandra Luiz Colossi",
        "data_nascimento":  "1984-10-08",
        "nome_mae":  "Katia Regina Ventura Luiz",
        "nome_pai":  "Paulo Roberto Luiz",
        "sexo":  "Feminino",
        "telefone":  "4.8984758962E10",
        "email":  "kassandracolossi@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Maria Helena Kretzer",
        "numero":  "503.0",
        "complemento":  "casa",
        "cep":  "8.810367E7",
        "bairro":  "Praia Comprida",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-11-18"
    },
    {
        "id":  "120",
        "cpf":  "092.909.549-90",
        "senha":  "0929",
        "nome_guerra":  "Linder",
        "nome":  "Gustavo Augusto Linder",
        "data_nascimento":  "1994-10-19",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99850-3832",
        "email":  "algustolinder@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Cabo Oderli Schilchting",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Passa Vinte",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "121",
        "cpf":  "015.513.347-04",
        "senha":  "0155",
        "nome_guerra":  "Lourenço",
        "nome":  "Carlos Henrique Lourenço Gonçalves",
        "data_nascimento":  "1972-09-22",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99936-9240",
        "email":  "carioca-henrique@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua Conde Afonso Celso",
        "numero":  "",
        "complemento":  "",
        "cep":  "88070-560",
        "bairro":  "Capoeiras",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-08-20"
    },
    {
        "id":  "122",
        "cpf":  "085.543.859-26",
        "senha":  "0855",
        "nome_guerra":  "Lucas",
        "nome":  "Lucas Rodrigues Antônio",
        "data_nascimento":  "1994-08-28",
        "nome_mae":  "Chirley João Rodrigues Antônio",
        "nome_pai":  "Daniel Aniceto Antônio",
        "sexo":  "Masculino",
        "telefone":  "4.8999352731E10",
        "email":  "lucasrodrigues-sc@hotmail.com.br",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Fernando José Zimmermann",
        "numero":  "33.0",
        "complemento":  "Casa",
        "cep":  "8.8160624E7",
        "bairro":  "Bom viver",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2024-06-05"
    },
    {
        "id":  "123",
        "cpf":  "109.532.709-71",
        "senha":  "1095",
        "nome_guerra":  "Mayara",
        "nome":  "Mayara Vieira Soares",
        "data_nascimento":  "2002-01-04",
        "nome_mae":  "Raquel Vieira Soares",
        "nome_pai":  "Rodrigo Soares",
        "sexo":  "Feminino",
        "telefone":  "4.899620586E10",
        "email":  "Mayarasoaresrl@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Rodney Brasil Machado",
        "numero":  "59.0",
        "complemento":  "Condomínio",
        "cep":  "8.8122049E7",
        "bairro":  "Sertão do Maruim",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-26"
    },
    {
        "id":  "124",
        "cpf":  "005.592.699-19",
        "senha":  "0055",
        "nome_guerra":  "Mina",
        "nome":  "Kleber Pacheco Mina",
        "data_nascimento":  "1979-09-30",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98430-9294",
        "email":  "kleber_dvdx@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua Pedro Paulo de Abreu",
        "numero":  "",
        "complemento":  "",
        "cep":  "88106-785",
        "bairro":  "forquilhinhas",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-08-01"
    },
    {
        "id":  "125",
        "cpf":  "097.100.159-66",
        "senha":  "0971",
        "nome_guerra":  "Mithel",
        "nome":  "Mithel Evergisto de Lima",
        "data_nascimento":  "1994-07-26",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98447-8424",
        "email":  "mithel_lima@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua 13 de Junho",
        "numero":  "",
        "complemento":  "",
        "cep":  "88106-470",
        "bairro":  "Flor de Nápolis",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-02-19"
    },
    {
        "id":  "126",
        "cpf":  "052.026.659-54",
        "senha":  "0520",
        "nome_guerra":  "Natayan",
        "nome":  "Raphael Natayan Nilsen",
        "data_nascimento":  "1988-12-27",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98404-1027",
        "email":  "raphael_nilsen@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "R. João Guilherme dos Santos",
        "numero":  "",
        "complemento":  "",
        "cep":  "88131-780",
        "bairro":  "Rio Grande",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-10"
    },
    {
        "id":  "127",
        "cpf":  "060.594.529-22",
        "senha":  "0605",
        "nome_guerra":  "Nery",
        "nome":  "Gabriel Nery Cristiano",
        "data_nascimento":  "2002-07-27",
        "nome_mae":  "Lucimara Terezinha Pierro Nery",
        "nome_pai":  "Cândido Cristiano conceição Cristiano",
        "sexo":  "Masculino",
        "telefone":  "4.8996491296E10",
        "email":  "gabrielnerycristiano1@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Av. Brasil",
        "numero":  "158.0",
        "complemento":  "Casa",
        "cep":  "8.81105E7",
        "bairro":  "Bela Vista",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-10-02"
    },
    {
        "id":  "128",
        "cpf":  "770.614.709-68",
        "senha":  "7706",
        "nome_guerra":  "Oliveira",
        "nome":  "Marcelo luiz de Oliveira",
        "data_nascimento":  "1970-07-05",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99991-3979",
        "email":  "boliveiraqap@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Domingos Pedro Hermes",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Barreiros",
        "cidade":  "São josé",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "129",
        "cpf":  "091.275.619-50",
        "senha":  "0912",
        "nome_guerra":  "Ozol",
        "nome":  "Guilherme Ozol de Assunção",
        "data_nascimento":  "1993-12-22",
        "nome_mae":  "Sandra Mara Ozol de Assunção",
        "nome_pai":  "",
        "sexo":  "Masculino",
        "telefone":  "4.8991107391E10",
        "email":  "guilherme.ozol@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Elizeu de Bernardi",
        "numero":  "641.0",
        "complemento":  "Bl c ap 302",
        "cep":  "8.810105E7",
        "bairro":  "Campinas",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2023-09-11",
        "data_desligamento":  "2026-03-26",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "130",
        "cpf":  "757.951.599-72",
        "senha":  "7579",
        "nome_guerra":  "Pereira",
        "nome":  "Emerson Pereira",
        "data_nascimento":  "1974-02-04",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98428-4002",
        "email":  "emersonobra@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Balbuino Mechen",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Boa Parana",
        "cidade":  "S.P.A",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-30"
    },
    {
        "id":  "131",
        "cpf":  "010.110.059-05",
        "senha":  "0101",
        "nome_guerra":  "Ravache",
        "nome":  "Caio Passold Ravache",
        "data_nascimento":  "2000-05-15",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(04)89907-1505",
        "email":  "caio.p.ravache@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua João Meirelles",
        "numero":  "",
        "complemento":  "",
        "cep":  "88085-435",
        "bairro":  "Itaguáçu",
        "cidade":  "florianópolis",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2023-08-14",
        "data_desligamento":  "2026-05-11",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "132",
        "cpf":  "003.357.419-76",
        "senha":  "0033",
        "nome_guerra":  "Santana",
        "nome":  "Michele Santana Quint",
        "data_nascimento":  "1977-11-26",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99606-4164",
        "email":  "jcmicheliquint@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Roberto VALDIR Manchich",
        "numero":  "",
        "complemento":  "",
        "cep":  "88123-430",
        "bairro":  "Caminho Novo",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "133",
        "cpf":  "120.391.089-47",
        "senha":  "1203",
        "nome_guerra":  "Sardá",
        "nome":  "Julia da Silva Sardá",
        "data_nascimento":  "1999-04-15",
        "nome_mae":  "Liliane Maria da Silva Sardá",
        "nome_pai":  "Claudemar Alfredo Sardá",
        "sexo":  "Feminino",
        "telefone":  "4.8984242904E10",
        "email":  "juliadasilvasarda@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Manoel Eduardo Cardoso",
        "numero":  "17.0",
        "complemento":  "Casa",
        "cep":  "8.8110792E7",
        "bairro":  "Bela Vista 1",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2023-09-26",
        "data_desligamento":  "2026-04-28",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "134",
        "cpf":  "155.303.359-00",
        "senha":  "1553",
        "nome_guerra":  "Schmitt",
        "nome":  "André Luiz Schmitt",
        "data_nascimento":  "1988-04-27",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98435-2594",
        "email":  "andréLuizschmitt@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Frei Albano",
        "numero":  "",
        "complemento":  "",
        "cep":  "88103-100",
        "bairro":  "Centro",
        "cidade":  "São josé",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "135",
        "cpf":  "002.200.260-09",
        "senha":  "0022",
        "nome_guerra":  "Spotti",
        "nome":  "Kleber Spotti Rodrigues",
        "data_nascimento":  "1982-07-06",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99903-1009",
        "email":  "kleberspotti@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua Baldicero Filomeno",
        "numero":  "",
        "complemento":  "",
        "cep":  "88064-002",
        "bairro":  "Alto Ribeirão",
        "cidade":  "Florianopolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-08-15"
    },
    {
        "id":  "136",
        "cpf":  "008.818.209-62",
        "senha":  "0088",
        "nome_guerra":  "Alves",
        "nome":  "Uelder Alves Da Costa",
        "data_nascimento":  "1985-09-10",
        "nome_mae":  "EUGÊNIA ALVES",
        "nome_pai":  "VILMO FRANCISCO DA COSTA",
        "sexo":  "Masculino",
        "telefone":  "4.898801019E10",
        "email":  "UELDER.ALVES@GMAIL.COM",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "RUA CRISTÓVÃO NUNES PIRES",
        "numero":  "180.0",
        "complemento":  "APTO 904",
        "cep":  "8.801012E7",
        "bairro":  "CENTRO",
        "cidade":  "FLORIANÓPOLIS",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-10-10"
    },
    {
        "id":  "137",
        "cpf":  "416.967.609-25",
        "senha":  "4169",
        "nome_guerra":  "Ulysséia",
        "nome":  "Ismael Vieira da Rosa Ulysséia",
        "data_nascimento":  "1961-08-02",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(04)89997-1294",
        "email":  "ismaelvru@intercop.com.br",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "av Itamarati",
        "numero":  "",
        "complemento":  "",
        "cep":  "88034-400",
        "bairro":  "Itamarati",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-08-01"
    },
    {
        "id":  "138",
        "cpf":  "104.320.579-94",
        "senha":  "1043",
        "nome_guerra":  "Yanka",
        "nome":  "Yanka Caroliny Luciano",
        "data_nascimento":  "1997-05-14",
        "nome_mae":  "NAÁRA SCHOROEDER",
        "nome_pai":  "CLAUDINEI SOARES LUCIANO",
        "sexo":  "Feminino",
        "telefone":  "048996418318",
        "email":  "yanka.carolinyy@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "R. José João de Souza",
        "numero":  "457.0",
        "complemento":  "casa",
        "cep":  "8.810817E7",
        "bairro":  "Roçado",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-26"
    },
    {
        "id":  "139",
        "cpf":  "028.667.330-45",
        "senha":  "0286",
        "nome_guerra":  "Yuri",
        "nome":  "Yuri Esmerio dos Santos",
        "data_nascimento":  "1993-09-04",
        "nome_mae":  "Janine esmerio dos Santos",
        "nome_pai":  "",
        "sexo":  "Masculino",
        "telefone":  "4.8988303826E10",
        "email":  "yurits828@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua sábia una",
        "numero":  "45.0",
        "complemento":  "Bloco 5A AP 201",
        "cep":  "8.8122021E7",
        "bairro":  "Sertão do Imarui",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-01-04"
    },
    {
        "id":  "140",
        "cpf":  "068.052.249-26",
        "senha":  "0680",
        "nome_guerra":  "Fortkamp",
        "nome":  "Markian da Silveira Fortkamp",
        "data_nascimento":  "1994-06-26",
        "nome_mae":  "Viviane da Silveira",
        "nome_pai":  "Marquian Fortkamp",
        "sexo":  "Masculino",
        "telefone":  "4.8988785387E10",
        "email":  "bcfortkamp@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Av. Patrício Antônio Teixeira",
        "numero":  "131.0",
        "complemento":  "AP 01",
        "cep":  "8.8161586E7",
        "bairro":  "Rio Caveiras",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-01-23"
    },
    {
        "id":  "141",
        "cpf":  "007.303.029-54",
        "senha":  "0073",
        "nome_guerra":  "Jesus",
        "nome":  "Karina  Maria de Jesus Sobrinho",
        "data_nascimento":  "1980-09-11",
        "nome_mae":  "Maria Mendes de Jesus sobrinho",
        "nome_pai":  "Francisco filho aobrinho",
        "sexo":  "Feminino",
        "telefone":  "4.8991806824E10",
        "email":  "Kakamania33@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Adão Shimitd",
        "numero":  "998.0",
        "complemento":  "Casa",
        "cep":  "8.811726E7",
        "bairro":  "Barreiros",
        "cidade":  "São jose",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-02-10"
    },
    {
        "id":  "142",
        "cpf":  "039.070.760-01",
        "senha":  "0390",
        "nome_guerra":  "Nakata",
        "nome":  "Nakata Garra Gomes",
        "data_nascimento":  "1999-12-12",
        "nome_mae":  "Mariselma Garra Lacerda Gomes",
        "nome_pai":  "Danilo da Fontoura Gomes",
        "sexo":  "Feminino",
        "telefone":  "5.598449257E10",
        "email":  "nakatagarra@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Avenida Ceniro Martins 1078",
        "numero":  "1078.0",
        "complemento":  "Apto 9",
        "cep":  "8.8107479E7",
        "bairro":  "Forquilhas",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2025-06-17",
        "data_desligamento":  "2026-05-06",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "143",
        "cpf":  "125.366.669-56",
        "senha":  "1253",
        "nome_guerra":  "Weverton",
        "nome":  "Weverton José Machado",
        "data_nascimento":  "2002-09-14",
        "nome_mae":  "Jerusa aparecida citadella",
        "nome_pai":  "José Jucelio Machado",
        "sexo":  "Masculino",
        "telefone":  "4.8998218785E10",
        "email":  "Machadoweverton424@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua 13 de maio",
        "numero":  "876.0",
        "complemento":  "Casa",
        "cep":  "8.816504E7",
        "bairro":  "Prado",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-07-05"
    },
    {
        "id":  "144",
        "cpf":  "919.835.099-49",
        "senha":  "9198",
        "nome_guerra":  "Martins",
        "nome":  "Alexandre Vinicius Martins",
        "data_nascimento":  "1976-09-10",
        "nome_mae":  "Mariza Salete Martins",
        "nome_pai":  "Não Declarado",
        "sexo":  "Masculino",
        "telefone":  "4.8999575275E10",
        "email":  "djxandemartins@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Olavo Bilac",
        "numero":  "498.0",
        "complemento":  "Casa",
        "cep":  "8.813335E7",
        "bairro":  "Jardim Eldorado",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-08-15"
    },
    {
        "id":  "145",
        "cpf":  "100.975.089-50",
        "senha":  "1009",
        "nome_guerra":  "Ana Carolina",
        "nome":  "Ana Carolina Nascimento",
        "data_nascimento":  "1995-09-23",
        "nome_mae":  "Katia Regina Sodre",
        "nome_pai":  "Silvonei Nascimento",
        "sexo":  "Feminino",
        "telefone":  "9.99444545E8",
        "email":  "anacarolinanascimento2309@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Johannes Lambertus Josef Bovee",
        "numero":  "16.0",
        "complemento":  "Casa",
        "cep":  "8.816849E7",
        "bairro":  "Tijuquinhas",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-08-18"
    },
    {
        "id":  "146",
        "cpf":  "083.469.799-83",
        "senha":  "0834",
        "nome_guerra":  "Andréia M",
        "nome":  "Andréia Martins dos Santos",
        "data_nascimento":  "1992-04-20",
        "nome_mae":  "Angelina da Cruz Delfino",
        "nome_pai":  "Salvador Martins dos Santos",
        "sexo":  "Feminino",
        "telefone":  "4.8984728085E10",
        "email":  "andreiamartins.ntr@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Acácio Reitz",
        "numero":  "355.0",
        "complemento":  "Casa",
        "cep":  "8.816106E7",
        "bairro":  "Universitário",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-10-02"
    },
    {
        "id":  "147",
        "cpf":  "007.064.299-07",
        "senha":  "0070",
        "nome_guerra":  "Siqueira",
        "nome":  "Fernando Pereira Siqueira Junior",
        "data_nascimento":  "1981-05-09",
        "nome_mae":  "Sandra Aparecida Ferreira",
        "nome_pai":  "Fernando Pereira Siqueira",
        "sexo":  "Masculino",
        "telefone":  "4.8999531501E10",
        "email":  "snnnarfdrums@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua sebastiana Coutinho",
        "numero":  "216.0",
        "complemento":  "Torre D apto 202",
        "cep":  "8.811324E7",
        "bairro":  "Areias",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-10-08"
    },
    {
        "id":  "148",
        "cpf":  "028.574.290-61",
        "senha":  "0285",
        "nome_guerra":  "Gonçalves",
        "nome":  "Alessandro da Costa Gonçalves",
        "data_nascimento":  "1991-10-13",
        "nome_mae":  "Sandra Mara Costa Gonçalves",
        "nome_pai":  "José João Angonezi Gonçalves",
        "sexo":  "Masculino",
        "telefone":  "4.8991466837E10",
        "email":  "acgoncalves191@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Av Paulo Roberto Vidal",
        "numero":  "2490.0",
        "complemento":  "Casa",
        "cep":  "8.8132599E7",
        "bairro":  "Bella Vista",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-12-04"
    },
    {
        "id":  "149",
        "cpf":  "147.564.459-00",
        "senha":  "1475",
        "nome_guerra":  "Neumann",
        "nome":  "Misael Dias Neumann",
        "data_nascimento":  "2005-04-11",
        "nome_mae":  "Joseane Dias Neumann",
        "nome_pai":  "Baltazar Romeiro Neumann",
        "sexo":  "Masculino",
        "telefone":  "4.8988244964E10",
        "email":  "Misaeldiasneumann@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Manoel Mariano Ferreira",
        "numero":  "621.0",
        "complemento":  "Condomínio",
        "cep":  "8.816168E7",
        "bairro":  "Rio Caveiras",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-12-15"
    },
    {
        "id":  "150",
        "cpf":  "007.178.839-57",
        "senha":  "0071",
        "nome_guerra":  "Luiz",
        "nome":  "Luiz Fernando da Silva",
        "data_nascimento":  "1979-05-11",
        "nome_mae":  "Zilma Ana da Silva",
        "nome_pai":  "Nelson da Silva",
        "sexo":  "Masculino",
        "telefone":  "4.8984372126E10",
        "email":  "Luiz_fpolis.79@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Servidão Inácia de Medeiros",
        "numero":  "263.0",
        "complemento":  "Casa",
        "cep":  "8.8037065E7",
        "bairro":  "Córrego grande",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-12-22"
    },
    {
        "id":  "151",
        "cpf":  "097.355.079-19",
        "senha":  "0973",
        "nome_guerra":  "Figueiredo",
        "nome":  "João Victor Figueiredo Chrostowski",
        "data_nascimento":  "1995-07-27",
        "nome_mae":  "Cerlei Adriane Figueiredo Chrostowski",
        "nome_pai":  "José Hélio Chrostowski",
        "sexo":  "Masculino",
        "telefone":  "047991363393",
        "email":  "j.victorfc@yahoo.com.br",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Thomé Israel da Silva",
        "numero":  "105.0",
        "complemento":  "Apto 401A",
        "cep":  "8.8132373E7",
        "bairro":  "Caminho Novo",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-10"
    },
    {
        "id":  "152",
        "cpf":  "003.747.659-95",
        "senha":  "0037",
        "nome_guerra":  "Luciano",
        "nome":  "LUCIANO PEREIRA",
        "data_nascimento":  "1979-05-10",
        "nome_mae":  "VERA LUCIA PEREIRA",
        "nome_pai":  "ADONAI PEREIRA",
        "sexo":  "Masculino",
        "telefone":  "4.8999933233E10",
        "email":  "lucianompereira@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Maria Filomena da Silva",
        "numero":  "388.0",
        "complemento":  "Ap 1001",
        "cep":  "8.811063E7",
        "bairro":  "Nsa Sra do Rosário",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-11"
    },
    {
        "id":  "153",
        "cpf":  "951.971.339-53",
        "senha":  "9519",
        "nome_guerra":  "Cardoso",
        "nome":  "Claudio cardoso",
        "data_nascimento":  "1974-10-31",
        "nome_mae":  "Maria do Carmo cardoso",
        "nome_pai":  "Sebastião Boaventura cardoso",
        "sexo":  "Masculino",
        "telefone":  "4.8999066108E10",
        "email":  "claudio3110@yahoo.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Caetano da costa coelho",
        "numero":  "1593.0",
        "complemento":  "Apto 101",
        "cep":  "8.811379E7",
        "bairro":  "Areias",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-11"
    },
    {
        "id":  "154",
        "cpf":  "079.744.619-26",
        "senha":  "0797",
        "nome_guerra":  "Carvalho",
        "nome":  "Diego Carvalho Cordova",
        "data_nascimento":  "1991-09-11",
        "nome_mae":  "Maria de Fátima Carvalho",
        "nome_pai":  "Paulo Henrique Cordova",
        "sexo":  "Masculino",
        "telefone":  "4.8998237756E10",
        "email":  "eventos_djdiego@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua geral de três riachos",
        "numero":  "Sem numero",
        "complemento":  "Casa",
        "cep":  "8.816E7",
        "bairro":  "Fundos",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-02-11",
        "data_desligamento":  "2026-06-26",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "155",
        "cpf":  "118.669.539-07",
        "senha":  "1186",
        "nome_guerra":  "Bunn",
        "nome":  "João Pedro Pereira Bunn",
        "data_nascimento":  "2004-09-15",
        "nome_mae":  "Adriana Maciel Pereira",
        "nome_pai":  "Orlando Bunn",
        "sexo":  "Masculino",
        "telefone":  "4.8999512775E10",
        "email":  "joaoppb01@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Acioli Nunes dos Santos",
        "numero":  "231.0",
        "complemento":  "Casa",
        "cep":  "8.813154E7",
        "bairro":  "Centro",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-11"
    },
    {
        "id":  "156",
        "cpf":  "065.194.139-33",
        "senha":  "0651",
        "nome_guerra":  "Costa",
        "nome":  "Vanessa David Costa",
        "data_nascimento":  "1987-04-11",
        "nome_mae":  "Elisete David Costa",
        "nome_pai":  "Marcelo Costa",
        "sexo":  "Feminino",
        "telefone":  "4.8984666195E10",
        "email":  "Vanessamodapet1209@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Inhambu",
        "numero":  "104.0",
        "complemento":  "Casa",
        "cep":  "8.811551E7",
        "bairro":  "Serraria",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-11"
    },
    {
        "id":  "157",
        "cpf":  "096.581.989-29",
        "senha":  "0965",
        "nome_guerra":  "Sofie",
        "nome":  "Izabelle Sofie Luiz",
        "data_nascimento":  "2001-12-23",
        "nome_mae":  "Kátia Regina Ventura Luiz",
        "nome_pai":  "Paulo Roberto Luiz",
        "sexo":  "Feminino",
        "telefone":  "4.8991540113E10",
        "email":  "bell.450009@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "rua Maria Helena Kretzer",
        "numero":  "503.0",
        "complemento":  "casa A ap 202",
        "cep":  "8.810367E7",
        "bairro":  "Praia Comprida",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-11"
    },
    {
        "id":  "158",
        "cpf":  "123.859.799-85",
        "senha":  "1238",
        "nome_guerra":  "Fabian",
        "nome":  "Fabian Henrique da Silva",
        "data_nascimento":  "2005-06-04",
        "nome_mae":  "Juliane Caetano Justino",
        "nome_pai":  "Rodrigo Eduardo da Silva",
        "sexo":  "Masculino",
        "telefone":  "4.8991075323E10",
        "email":  "fabiandeggy@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Prefeito Dib Cherem",
        "numero":  "2734.0",
        "complemento":  "Casa",
        "cep":  "8.809E7",
        "bairro":  "Capoeiras",
        "cidade":  "Florianópolis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-02-12"
    },
    {
        "id":  "159",
        "cpf":  "063.023.992-46",
        "senha":  "0630",
        "nome_guerra":  "Levi",
        "nome":  "Washington Levi Nascimento Dias",
        "data_nascimento":  "2004-08-31",
        "nome_mae":  "ROSYLANGE DO NASCIMENTO",
        "nome_pai":  "DUCIVALDO",
        "sexo":  "Masculino",
        "telefone":  "4.8988591896E10",
        "email":  "Vulgo.levi@2004@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Av paulo roberto vidal",
        "numero":  "475.0",
        "complemento":  "bloco c ap 310",
        "cep":  "8.8132599E7",
        "bairro":  "Bela vista",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-02-16",
        "data_desligamento":  "2026-06-12",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "160",
        "cpf":  "069.723.111-95",
        "senha":  "0697",
        "nome_guerra":  "Joaber",
        "nome":  "Reinaldo Joaber de Araújo Spengler",
        "data_nascimento":  "2002-01-15",
        "nome_mae":  "Genilce Silva de Araújo Spengler",
        "nome_pai":  "Ivo Spengler",
        "sexo":  "Masculino",
        "telefone":  "4.8988390467E10",
        "email":  "Reinaldospengler@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Demetrio Novossate",
        "numero":  "278.0",
        "complemento":  "Casa",
        "cep":  "8.8136366E7",
        "bairro":  "São Sebastião",
        "cidade":  "Palhoça",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-02-18",
        "data_desligamento":  "2026-06-09",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "161",
        "cpf":  "008.145.020-67",
        "senha":  "0081",
        "nome_guerra":  "Anderson",
        "nome":  "Anderson Rafael Souza da Silva",
        "data_nascimento":  "1984-10-28",
        "nome_mae":  "Marivane Souza da Silva",
        "nome_pai":  "",
        "sexo":  "Masculino",
        "telefone":  "4.8999938011E10",
        "email":  "anderson84negocios@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Maria Helena Kretzer",
        "numero":  "503a",
        "complemento":  "Ap301",
        "cep":  "8.810367E7",
        "bairro":  "Praia Comprida",
        "cidade":  "São José",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-03-14"
    },
    {
        "id":  "162",
        "cpf":  "092.158.639-66",
        "senha":  "0921",
        "nome_guerra":  "Sadi",
        "nome":  "Washington sadi de jesus",
        "data_nascimento":  "1994-03-15",
        "nome_mae":  "Rosane cleia dos santos",
        "nome_pai":  "Valmir de jesus",
        "sexo":  "Masculino",
        "telefone":  "4.8998558268E10",
        "email":  "washingtondejesus1509@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Rodnei Brasil machado",
        "numero":  "59.0",
        "complemento":  "Bloco 7a ap104",
        "cep":  "88122.0",
        "bairro":  "Sertão do maruim",
        "cidade":  "Sao jose",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-03-15",
        "data_desligamento":  "2026-06-26",
        "motivo_desligamento":  "Desligamento registrado na planilha de sÃ³cios 2026"
    },
    {
        "id":  "163",
        "cpf":  "235.983.728-17",
        "senha":  "2359",
        "nome_guerra":  "Perdoná",
        "nome":  "Pâmela Aparecida da Luz Perdoná",
        "data_nascimento":  "2001-05-17",
        "nome_mae":  "Juliana Aparecida da Luz Perdoná",
        "nome_pai":  "Marcos Aurélio Perdoná",
        "sexo":  "Feminino",
        "telefone":  "4.8991860157E10",
        "email":  "palperdona@gmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Servidão silvestre Prim",
        "numero":  "136.0",
        "complemento":  "Casa",
        "cep":  "8.8161144E7",
        "bairro":  "Boa VISTA",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-04-17"
    },
    {
        "id":  "164",
        "cpf":  "108.677.459-08",
        "senha":  "1086",
        "nome_guerra":  "Viapiana",
        "nome":  "Otávio Augusto Viapiana",
        "data_nascimento":  "1999-04-18",
        "nome_mae":  "Lizandra Carla Piaseski Viapiana",
        "nome_pai":  "Amirton José Viapiana",
        "sexo":  "Masculino",
        "telefone":  "4.8991861852E10",
        "email":  "otavio_viapiana@hotmail.com",
        "obm":  "SÃ£o JosÃ©",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua Júlio Teodoro Martins",
        "numero":  "1800.0",
        "complemento":  "Apt 624",
        "cep":  "8.816133E7",
        "bairro":  "Fundos",
        "cidade":  "Biguaçu",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-05-26"
    },
    {
        "id":  "165",
        "cpf":  "063.871.729-93",
        "senha":  "0638",
        "nome_guerra":  "Steimbach",
        "nome":  "Graziela steimbach",
        "data_nascimento":  "1989-09-27",
        "nome_mae":  "Andreia Conrado steimbach",
        "nome_pai":  "Jorge steimbach",
        "sexo":  "Feminino",
        "telefone":  "4.899858915E10",
        "email":  "graziela291211@gmail.com",
        "obm":  "Santo Amaro",
        "profissao":  "Bombeiro ComunitÃ¡rio",
        "logradouro":  "Rua nossa senhora das dores",
        "numero":  "1606.0",
        "complemento":  "Casa",
        "cep":  "8.8143594E7",
        "bairro":  "Vila santana",
        "cidade":  "Santo amaro da imperatriz",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-06-26"
    }
];

const MOCK_DATA_INITIAL = {
    associados: [
        { id: '1', cpf: '000.000.000-00', nome: 'Comandante da Diretoria', email: 'diretoria@acbcsj.org.br', telefone: '(48) 99999-0001', perfil: 'diretoria', status: 'ativo', data_cadastro: '2021-01-15' },
        { id: '2', cpf: '111.111.111-11', nome: 'Sgt. Carlos Andrade', email: 'carlos.andrade@gmail.com', telefone: '(48) 98888-1234', perfil: 'associado', status: 'ativo', data_cadastro: '2022-03-10' },
        { id: '3', cpf: '222.222.222-22', nome: 'Dra. Mariana Silva', email: 'mariana.silva@hotmail.com', telefone: '(48) 97777-5678', perfil: 'associado', status: 'ativo', data_cadastro: '2023-05-20' },
        { id: '4', cpf: '333.333.333-33', nome: 'Roberto Fernandes', email: 'roberto@empresa.com.br', telefone: '(48) 99666-4321', perfil: 'associado', status: 'pendente', data_cadastro: '2026-08-01' }
    ],
    financeiro: [
        { id: 'f1', tipo: 'receita', descricao: 'Mensalidades de Associados - Julho', valor: 4500.00, categoria: 'Mensalidades', fornecedor_cliente: 'Associados', data_lancamento: '2026-07-30' },
        { id: 'f2', tipo: 'despesa', descricao: 'Manuten��o de Equipamentos de Resgate', valor: 1200.00, categoria: 'Manuten��o', fornecedor_cliente: 'Servi�os de Seguran�a LTDA', data_lancamento: '2026-08-01' },
        { id: 'f3', tipo: 'despesa', descricao: 'Contabilidade e Assessoria Jur�dica', valor: 800.00, categoria: 'Administrativo', fornecedor_cliente: 'Contabilidade S�o Jos�', data_lancamento: '2026-08-02' },
        { id: 'f4', tipo: 'receita', descricao: 'Doa��o Institucional para Equipamentos', valor: 3000.00, categoria: 'Doa��es', fornecedor_cliente: 'Empresas Unidas SJ', data_lancamento: '2026-08-03' }
    ],
    mensalidades: [
        { id: 'm1', associado_cpf: '111.111.111-11', mes: '2026-07', valor: 50.00, status: 'pago', data_pagamento: '2026-07-10' },
        { id: 'm2', associado_cpf: '111.111.111-11', mes: '2026-08', valor: 50.00, status: 'pendente', data_pagamento: '-' },
        { id: 'm3', associado_cpf: '222.222.222-22', mes: '2026-08', valor: 50.00, status: 'pago', data_pagamento: '2026-08-02' }
    ],
    documentos: [
        { id: 'd1', titulo: 'Estatuto Social Reformulado 2024', categoria: 'Estatuto', data: '2024-01-10', link: '#' },
        { id: 'd2', titulo: 'Ata da Assembleia Geral Ordin�ria #42', categoria: 'Ata', data: '2026-06-15', link: '#' },
        { id: 'd3', titulo: 'Balancete Consolidado 1� Semestre 2026', categoria: 'Balancete', data: '2026-07-05', link: '#' }
    ],
    programacao: [
        { id: 'p1', titulo: 'Treinamento Geral de Primeiros Socorros', data: '2026-08-20', local: 'Sede ACBCSJ', status: 'agendado' },
        { id: 'p2', titulo: 'Assembleia Trimestral de Presta��o de Contas', data: '2026-09-10', local: 'Audit�rio Central', status: 'agendado' }
    ],
    mensagens: [
        { id: 'msg1', associado_nome: 'Sgt. Carlos Andrade', assunto: 'Sugest�o de Treinamento Comunit�rio', conteudo: 'Gostaria de propor um curso b�sico para moradores do bairro Barreiros.', data: '2026-08-02', status: 'pendente' }
    ]
};

// ESTADO DA APLICA��O
let currentUser = null;
let currentChart = null;

// INICIALIZA��O
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    setupCPFMasks();
    setupNavigation();
});

function initMockData() {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    
    // Mescla os dados iniciais mockados se a lista estiver vazia
    if (list.length === 0) {
        list = [...MOCK_DATA_INITIAL.associados];
    }

    // Importa automaticamente os 66 sócios da planilha Cadastrosocios.xlsx se ainda não existirem
    if (typeof ASSOCIADOS_EXCEL_IMPORT !== 'undefined' && Array.isArray(ASSOCIADOS_EXCEL_IMPORT)) {
        ASSOCIADOS_EXCEL_IMPORT.forEach(socio => {
            if (!list.some(a => a.cpf === socio.cpf)) {
                list.push(socio);
            }
        });
    }

    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    if (!localStorage.getItem('acbcsj_financeiro')) localStorage.setItem('acbcsj_financeiro', JSON.stringify(MOCK_DATA_INITIAL.financeiro));
    if (!localStorage.getItem('acbcsj_mensalidades')) localStorage.setItem('acbcsj_mensalidades', JSON.stringify(MOCK_DATA_INITIAL.mensalidades));
    if (!localStorage.getItem('acbcsj_documentos')) localStorage.setItem('acbcsj_documentos', JSON.stringify(MOCK_DATA_INITIAL.documentos));
    if (!localStorage.getItem('acbcsj_programacao')) localStorage.setItem('acbcsj_programacao', JSON.stringify(MOCK_DATA_INITIAL.programacao));
    if (!localStorage.getItem('acbcsj_mensagens')) localStorage.setItem('acbcsj_mensagens', JSON.stringify(MOCK_DATA_INITIAL.mensagens));
}

// M�SCARA AUTOM�TICA DE CPF
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

// AUTENTICA��O E LOGIN
function loginWithCPF(cpf, password, roleHint = null) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    
    // Se for teste direto via atalho
    if (roleHint === 'diretoria') {
        currentUser = list.find(a => a.perfil === 'diretoria') || MOCK_DATA_INITIAL.associados[0];
    } else if (roleHint === 'associado') {
        currentUser = list.find(a => a.perfil === 'associado' && a.status === 'ativo') || MOCK_DATA_INITIAL.associados[1];
    } else {
        const found = list.find(a => a.cpf === cpf);
        if (!found) {
            alert('CPF n�o encontrado no sistema da ACBCSJ. Fa�a sua solicita��o de pr�-cadastro.');
            return;
        }

        if (found.status === 'pendente') {
            alert('Acesso bloqueado! Sua solicita��o de cadastro ainda est� em an�lise pela Diretoria da ACBCSJ. Aguarde a aprova��o para conseguir logar.');
            return;
        }

        if (found.status === 'desligado') {
            alert('Este cadastro consta como desligado do sistema da ACBCSJ.');
            return;
        }

        // Validao de senha (automtica: 4 primeiros dgitos do CPF ou senha definida)
        const apenasNumerosCPF = (found.cpf || '').replace(/\D/g, '');
        const senhaEsperada = found.senha || apenasNumerosCPF.substring(0, 4);

        if (password && password !== senhaEsperada) {
            alert(`Senha incorreta. Lembre-se que sua senha inicial de acesso so os 4 primeiros dgitos do seu CPF (${senhaEsperada}).`);
            return;
        }

        currentUser = found;
    }

    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appDashboard').style.display = 'flex';
    
    renderUserHeader();
    renderSidebarMenu();
    navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
}

function logout() {
    currentUser = null;
    document.getElementById('appDashboard').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
}

// RENDERIZAÇÃO DO CABEÇALHO DO USUÁRIO
function renderUserHeader() {
    document.getElementById('headerUserName').textContent = currentUser.nome;
    const badge = document.getElementById('headerUserRole');
    badge.textContent = currentUser.perfil.toUpperCase();
    badge.className = `user-role-badge role-${currentUser.perfil}`;
}

// MENU LATERAL DINÂMICO CONFORME PERFIL
function renderSidebarMenu() {
    const menuNav = document.getElementById('sidebarNav');
    if (!menuNav) return;
    menuNav.innerHTML = '';

    if (currentUser.perfil === 'diretoria') {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-diretoria')">📊 Painel Geral</div>
            <div class="nav-item" onclick="navigateTab('gestao-associados')">👥 Controle de Associados</div>
            <div class="nav-item" onclick="navigateTab('associados-desligados')">📋 Associados Desligados</div>
            <div class="nav-item" onclick="navigateTab('gestao-financeira')">💰 Lançamentos Financeiros</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📑 Documentos & Atas</div>
            <div class="nav-item" onclick="navigateTab('mensagens-diretoria')">📬 Caixa de Mensagens</div>
        `;
    } else {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-associado')">🏠 Meu Painel</div>
            <div class="nav-item" onclick="navigateTab('balancetes-associado')">📈 Balancetes & Contas</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">📁 Documentos & Convites</div>
            <div class="nav-item" onclick="navigateTab('enviar-mensagem')">💬 Fale com a Diretoria</div>
        `;
    }
}

// NAVEGAÇÃO ENTRE ABAS
function navigateTab(tabId) {
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
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
    if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    if (tabId === 'documentos-associado' || tabId === 'documentos-diretoria') renderDocumentos();
    if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}

// L�GICA DA DIRETORIA: PAINEL GERAL E TABELAS
function renderDiretoriaOverview() {
    const associados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const pendentes = associados.filter(a => a.status === 'pendente');

    document.getElementById('metricTotalAssociados').textContent = associados.filter(a => a.status === 'ativo').length;
    document.getElementById('metricCadastrosPendentes').textContent = pendentes.length;

    const totalReceitas = financeiro.filter(f => f.tipo === 'receita').reduce((sum, item) => sum + Number(item.valor), 0);
    const totalDespesas = financeiro.filter(f => f.tipo === 'despesa').reduce((sum, item) => sum + Number(item.valor), 0);
    const saldo = totalReceitas - totalDespesas;

    document.getElementById('metricSaldoCaixa').textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Tabela de aprova��o r�pida
    const container = document.getElementById('tablePendentesBody');
    if (container) {
        if (pendentes.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma solicita��o de pr�-cadastro pendente.</td></tr>`;
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
}

// EXIBIR APENAS ASSOCIADOS ATIVOS COM CONTROLE DE PERFIL PELA DIRETORIA
function renderGestaoAssociados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = list.filter(a => a.status === 'ativo');
    const container = document.getElementById('tableTodosAssociadosBody');
    const isDiretoria = currentUser && currentUser.perfil === 'diretoria';

    if (container) {
        if (ativos.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum associado ativo cadastrado.</td></tr>`;
        } else {
            container.innerHTML = ativos.map(a => {
                const isSelf = a.cpf === currentUser.cpf;
                
                // Se for DIRETORIA, exibe um seletor dropdown para alternar o perfil
                let perfilControl = `<span class="badge badge-${a.perfil === 'diretoria' ? 'warning' : 'info'}">${a.perfil.toUpperCase()}</span>`;
                if (isDiretoria) {
                    perfilControl = `
                        <select class="form-control" style="padding: 4px 8px; font-size: 12px; font-weight: 600; width: 130px; ${a.perfil === 'diretoria' ? 'border-color: var(--accent-gold); color: var(--accent-gold);' : ''}" 
                                ${isSelf ? 'disabled title="Voc� n�o pode alterar seu pr�prio perfil de Diretoria."' : ''} 
                                onchange="alterarPerfilAssociado('${a.cpf}', this.value)">
                            <option value="associado" ${a.perfil === 'associado' ? 'selected' : ''}>ASSOCIADO</option>
                            <option value="diretoria" ${a.perfil === 'diretoria' ? 'selected' : ''}>DIRETORIA</option>
                        </select>
                    `;
                }

                return `
                    <tr>
                        <td><b>${a.nome_guerra || a.nome}</b><br><small style="color:var(--text-muted)">${a.nome}</small></td>
                        <td>${a.cpf}</td>
                        <td>${a.telefone || a.email || '-'}</td>
                        <td>${perfilControl}</td>
                        <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">?? Ver Ficha Completa</button></td>
                        <td>
                            ${!isSelf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="abrirModalDesligar('${a.cpf}')">Desligar Associado</button>` : '<small style="color:var(--text-muted)">Voc� (Diretoria)</small>'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// FUN��O PARA ALTERAR O PERFIL DO INTEGRANTE (APENAS DIRETORIA)
function alterarPerfilAssociado(cpf, novoPerfil) {
    if (!currentUser || currentUser.perfil !== 'diretoria') {
        alert('Apenas membros da Diretoria possuem permiss�o para alterar o perfil de integrantes.');
        renderGestaoAssociados();
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);

    if (item) {
        const perfilAnterior = item.perfil;
        item.perfil = novoPerfil;

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        alert(`Perfil do integrante ${item.nome_guerra || item.nome} alterado com sucesso de ${perfilAnterior.toUpperCase()} para ${novoPerfil.toUpperCase()}.`);
        renderGestaoAssociados();
        renderDiretoriaOverview();
    }
}

// EXIBIR ASSOCIADOS DESLIGADOS
function renderAssociadosDesligados() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const desligados = list.filter(a => a.status === 'desligado');
    const container = document.getElementById('tableAssociadosDesligadosBody');
    if (container) {
        if (desligados.length === 0) {
            container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum associado desligado registrado no sistema.</td></tr>`;
        } else {
            container.innerHTML = desligados.map(d => `
                <tr>
                    <td><b>${d.nome_guerra || d.nome}</b><br><small style="color:var(--text-muted)">${d.nome}</small></td>
                    <td>${d.cpf}</td>
                    <td><small style="color:#FF6B6B;">${d.data_desligamento || '-'}</small></td>
                    <td>
                        <span style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">${d.motivo_desligamento || 'N�o especificado'}</span>
                        ${d.carta_desligamento_url ? `
                            <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 8px; color:var(--accent-gold); border-color:var(--accent-gold)" onclick="abrirCartaDesligamento('${d.cpf}')">
                                ?? Ver Carta de Desligamento
                            </button>
                        ` : '<small style="color:#FF6B6B; font-style:italic;">Sem carta anexada</small>'}
                    </td>
                    <td>
                        <button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${d.cpf}')">Ver Ficha</button>
                        <button class="btn btn-sm btn-outline" style="color:#2ECC71; border-color:#2ECC71" onclick="reativarAssociado('${d.cpf}')">Reativar</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="excluirAssociado('${d.cpf}')">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// FICHA COMPLETA DO ASSOCIADO
function verFichaAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) {
        alert('Associado n�o encontrado.');
        return;
    }

    document.getElementById('fichaNomeTitle').textContent = `Ficha Cadastral: ${a.nome_guerra || a.nome}`;

    const body = document.getElementById('fichaContentBody');
    body.innerHTML = `
        <div style="grid-column: 1 / -1; background-color:#15181C; padding:12px; border-radius:6px; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <div><b>Status do Cadastro:</b> <span class="badge badge-${a.status === 'ativo' ? 'success' : (a.status === 'desligado' ? 'danger' : 'warning')}">${a.status.toUpperCase()}</span></div>
            <div style="font-size:11px; color:var(--text-muted)">Cadastrado em: <b>${a.data_cadastro || '-'}</b></div>
        </div>

        <div><b>Nome de Guerra:</b> ${a.nome_guerra || '-'}</div>
        <div><b>Nome Completo:</b> ${a.nome}</div>
        <div><b>CPF:</b> ${a.cpf}</div>
        <div><b>Data de Nascimento:</b> ${a.data_nascimento || '-'}</div>
        <div><b>Sexo:</b> ${a.sexo || '-'}</div>
        <div><b>Telefone / WhatsApp:</b> ${a.telefone || '-'}</div>
        <div><b>OBM de Lota��o:</b> <b style="color: var(--accent-gold);">${a.obm || '-'}</b></div>
        <div><b>Profiss�o:</b> ${a.profissao || '-'}</div>
        <div><b>Perfil no Portal:</b> <b style="color: var(--accent-gold);">${(a.perfil || 'associado').toUpperCase()}</b></div>
        
        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Filia��o:</b></div>
        <div><b>Nome da M�e:</b> ${a.nome_mae || '-'}</div>
        <div><b>Nome do Pai:</b> ${a.nome_pai || '-'}</div>

        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Endere�o Residencial:</b></div>
        <div><b>Logradouro / Rua:</b> ${a.logradouro || '-'}, N� ${a.numero || '-'}</div>
        <div><b>Complemento:</b> ${a.complemento || 'Nenhum'}</div>
        <div><b>CEP:</b> ${a.cep || '-'}</div>
        <div><b>Bairro:</b> ${a.bairro || '-'}</div>
        <div style="grid-column: 1 / -1;"><b>Cidade:</b> ${a.cidade || '-'}</div>

        ${a.status === 'desligado' ? `
            <div style="grid-column: 1 / -1; margin-top:10px; background-color:rgba(231,76,60,0.15); border:1px solid rgba(231,76,60,0.4); padding:12px; border-radius:6px; color:#FF6B6B;">
                <div><b>Data/Hora do Desligamento:</b> ${a.data_desligamento || '-'}</div>
                <div><b>Motivo do Desligamento:</b> ${a.motivo_desligamento || '-'}</div>
                <div style="margin-top: 8px;">
                    <b>Carta de Desligamento:</b> 
                    ${a.carta_desligamento_url ? `
                        <button class="btn btn-sm btn-gold" style="margin-left: 8px; font-size: 11px;" onclick="abrirCartaDesligamento('${a.cpf}')">
                            ?? Baixar / Visualizar Carta (${a.carta_desligamento_nome || 'Arquivo'})
                        </button>
                    ` : '<i>Nenhuma carta anexada.</i>'}
                </div>
            </div>
        ` : ''}
    `;

    openModal('modalFichaAssociado');
}

// DESLIGAMENTO COM REGISTRO DE MOTIVO, CARTA DE DESLIGAMENTO E DATA/HORA
function abrirModalDesligar(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a) return;

    document.getElementById('desligarCPF').value = a.cpf;
    document.getElementById('desligarNomeDisplay').value = `${a.nome_guerra || a.nome} (${a.nome}) - CPF: ${a.cpf}`;
    document.getElementById('desligarMotivo').value = '';
    const fileInput = document.getElementById('desligarCartaArquivo');
    if (fileInput) fileInput.value = '';

    openModal('modalDesligarAssociado');
}

function confirmarDesligamento(e) {
    e.preventDefault();
    const cpf = document.getElementById('desligarCPF').value;
    const motivo = document.getElementById('desligarMotivo').value.trim();
    const fileInput = document.getElementById('desligarCartaArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!motivo) {
        alert('Por favor, informe o motivo do desligamento.');
        return;
    }

    if (!file) {
        alert('Por favor, anexe a Carta de Desligamento do associado.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const fileDataUrl = event.target.result;
        const fileName = file.name;

        const agora = new Date();
        const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' �s ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'desligado';
            item.data_desligamento = dataHoraDesligamento;
            item.motivo_desligamento = motivo;
            item.carta_desligamento_url = fileDataUrl;
            item.carta_desligamento_nome = fileName;

            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);

            alert(`Associado ${item.nome_guerra || item.nome} foi desligado com sucesso em ${dataHoraDesligamento}.\nA Carta de Desligamento foi salva e registrada no sistema.`);
            closeModal('modalDesligarAssociado');
            renderGestaoAssociados();
            renderAssociadosDesligados();
            renderDiretoriaOverview();
        }
    };

    reader.readAsDataURL(file);
}

// FUN��O PARA ABRIR OU BAIXAR A CARTA DE DESLIGAMENTO
function abrirCartaDesligamento(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a || !a.carta_desligamento_url) {
        alert('Carta de desligamento n�o encontrada.');
        return;
    }

    // Criar um link tempor�rio para download ou visualiza��o em nova aba
    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Carta de Desligamento - ${a.nome_guerra || a.nome}</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${a.carta_desligamento_url}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    } else {
        const link = document.createElement('a');
        link.href = a.carta_desligamento_url;
        link.download = a.carta_desligamento_nome || `Carta_Desligamento_${a.cpf}.pdf`;
        link.click();
    }
}

function reativarAssociado(cpf) {
    if (confirm('Deseja reativar este associado no sistema? Ele voltar� para a lista de Associados Ativos.')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'ativo';
            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);
            alert(`Associado ${item.nome_guerra || item.nome} foi reativado!`);
            renderAssociadosDesligados();
            renderGestaoAssociados();
            renderDiretoriaOverview();
        }
    }
}

function aprovarAssociado(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (item) {
        item.status = 'ativo';
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);
        alert(`Associado ${item.nome} aprovado com sucesso!`);
        renderDiretoriaOverview();
    }
}

function excluirAssociado(cpf) {
    if (confirm('Tem certeza que deseja excluir este associado do sistema? Esta a��o � permanente.')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.deleteAssociado(cpf);
        alert('Associado removido com sucesso.');
        renderGestaoAssociados();
        renderAssociadosDesligados();
        renderDiretoriaOverview();
    }
}

// L�GICA DO ASSOCIADO & GR�FICOS
function renderAssociadoOverview() {
    document.getElementById('associadoWelcomeName').textContent = currentUser.nome;
    const mensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades')) || [];
    const minhas = mensalidades.filter(m => m.associado_cpf === currentUser.cpf);

    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (container) {
        if (minhas.length === 0) {
            container.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Nenhuma mensalidade registrada para o seu CPF at� o momento.</td></tr>`;
        } else {
            container.innerHTML = minhas.map(m => `
                <tr>
                    <td>${m.mes}</td>
                    <td>R$ ${Number(m.valor).toFixed(2)}</td>
                    <td><span class="badge badge-${m.status === 'pago' ? 'success' : 'warning'}">${m.status.toUpperCase()}</span></td>
                    <td>${m.data_pagamento || '-'}</td>
                </tr>
            `).join('');
        }
    }
}

function renderBalancetesAssociado() {
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const totalReceitas = financeiro.filter(f => f.tipo === 'receita').reduce((sum, i) => sum + Number(i.valor), 0);
    const totalDespesas = financeiro.filter(f => f.tipo === 'despesa').reduce((sum, i) => sum + Number(i.valor), 0);

    const ctx = document.getElementById('chartBalancete');
    if (ctx && typeof Chart !== 'undefined') {
        if (currentChart) currentChart.destroy();
        currentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Entradas / Receitas', 'Sa�das / Despesas'],
                datasets: [{
                    data: [totalReceitas, totalDespesas],
                    backgroundColor: ['#2ECC71', '#E74C3C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#F4F5F7' } }
                }
            }
        });
    }
}

function renderDocumentos() {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const containers = [document.getElementById('listDocsAssociado'), document.getElementById('listDocsDiretoria')];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = docs.map(d => `
                <div style="display:flex; justify-between; align-items:center; padding:12px; border-bottom:1px solid var(--border-color)">
                    <div>
                        <b>${d.titulo}</b> <small style="color:var(--accent-gold); margin-left:8px">[${d.categoria}]</small>
                        <div style="font-size:11px; color:var(--text-muted)">Publicado em: ${d.data}</div>
                    </div>
                    <a href="${d.link}" class="btn btn-sm btn-outline">Visualizar / Download</a>
                </div>
            `).join('');
        }
    });
}

function renderMensagensDiretoria() {
    const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
    const container = document.getElementById('listMensagensDiretoria');
    if (container) {
        if (msgs.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted)">Nenhuma mensagem ou ideia enviada recentemente.</p>`;
        } else {
            container.innerHTML = msgs.map(m => `
                <div class="card">
                    <div style="display:flex; justify-content:space-between">
                        <b>${m.assunto}</b>
                        <small style="color:var(--text-muted)">${m.data}</small>
                    </div>
                    <div style="font-size:12px; color:var(--accent-gold); margin-bottom:8px">Por: ${m.associado_nome}</div>
                    <p style="font-size:13px">${m.conteudo}</p>
                </div>
            `).join('');
        }
    }
}

// PR�-CADASTRO E ENVIOS
function toggleSemPai(checkbox) {
    const inputPai = document.getElementById('regNomePai');
    if (checkbox.checked) {
        inputPai.value = 'Sem registro paterno / N�o declarado';
        inputPai.disabled = true;
    } else {
        inputPai.value = '';
        inputPai.disabled = false;
    }
}

function submitPreCadastro(e) {
    e.preventDefault();
    
    // Captura da Data e Hora Exata do Cadastro gerada pelo Sistema
    const agora = new Date();
    const dataHoraCadastro = agora.toLocaleDateString('pt-BR') + ' �s ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Captura dos campos na ordem exigida
    const nomeGuerra = document.getElementById('regNomeGuerra').value.trim();
    const nomeCompleto = document.getElementById('regNomeCompleto').value.trim();
    const dataNascimento = document.getElementById('regDataNascimento').value;
    const cpf = document.getElementById('regCPF').value.trim();
    const nomeMae = document.getElementById('regNomeMae').value.trim();
    const semPai = document.getElementById('regSemPai').checked;
    const nomePai = semPai ? 'Sem registro paterno / N�o declarado' : (document.getElementById('regNomePai').value.trim() || 'N�o declarado');
    const sexo = document.getElementById('regSexo').value;
    const telefone = document.getElementById('regTelefone').value.trim();
    const obm = document.getElementById('regOBM').value;
    const profissao = document.getElementById('regProfissao').value.trim();
    const logradouro = document.getElementById('regLogradouro').value.trim();
    const numero = document.getElementById('regNumero').value.trim();
    const complemento = document.getElementById('regComplemento').value.trim();
    const cep = document.getElementById('regCEP').value.trim();
    const bairro = document.getElementById('regBairro').value.trim();
    const cidade = document.getElementById('regCidade').value.trim();
    const termoAceito = document.getElementById('regTermoAceito').checked;

    if (!obm) {
        alert('Por favor, selecione a OBM de Lota��o.');
        return;
    }

    if (!profissao) {
        alert('Por favor, preencha o campo Profiss�o.');
        return;
    }

    if (!termoAceito) {
        alert('Voc� precisa aceitar os Termos de Responsabilidade para enviar a solicita��o.');
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (list.find(a => a.cpf === cpf)) {
        alert('Este CPF j� possui uma solicita��o ou cadastro ativo no sistema da ACBCSJ.');
        return;
    }

    // Gera��o autom�tica de senha: os 4 primeiros d�gitos num�ricos do CPF
    const apenasNumerosCPF = cpf.replace(/\D/g, '');
    const senhaAutomatica = apenasNumerosCPF.substring(0, 4);

    const novoAssociado = {
        id: Date.now().toString(),
        cpf: cpf,
        senha: senhaAutomatica,
        nome_guerra: nomeGuerra,
        nome: nomeCompleto,
        data_nascimento: dataNascimento,
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

    alert(`Solicita��o de cadastro de ${nomeGuerra} (${nomeCompleto}) enviada com sucesso em ${dataHoraCadastro}!\n\n?? O acesso estar� BLOQUEADO at� a APROVA��O pela Diretoria.\n?? Ap�s a aprova��o, sua senha de acesso ser� os 4 primeiros d�gitos do seu CPF (${senhaAutomatica}).`);
    e.target.reset();
    if (document.getElementById('regSemPai')) {
        document.getElementById('regSemPai').checked = false;
        document.getElementById('regNomePai').disabled = false;
    }
    closeModal('modalPreCadastro');
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

