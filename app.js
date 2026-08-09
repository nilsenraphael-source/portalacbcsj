// SISTEMA ACBCSJ - ASSOCIA�?�fO CORPO DE BOMBEIROS COMUNITÁRIOS DE S�fO JOS�?

// MOCK DATA INICIAL E DECLARA�?�.ES GLOBAIS
const ASSOCIADOS_EXCEL_IMPORT = [
    {
        "id":  "100",
        "cpf":  "000.923.500-03",
        "senha":  "0009",
        "nome_guerra":  "Ang�lica",
        "nome":  "Ang�lica Mateus",
        "data_nascimento":  "1977-05-23",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99814-2594",
        "email":  "amangelica14@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Jo�o Evangelista da Costa",
        "numero":  "",
        "complemento":  "",
        "cep":  "88090-301",
        "bairro":  "Coloninha",
        "cidade":  "Florian�polis",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Flores da Cunha",
        "numero":  "",
        "complemento":  "",
        "cep":  "88070-460",
        "bairro":  "Capoeiras",
        "cidade":  "Florian�polis",
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
        "nome_pai":  "NELSON JOS� DE SOUZA",
        "sexo":  "Masculino",
        "telefone":  "4.8984941095E10",
        "email":  "GALDINOMUS@GMAIL.COM",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "VALDIR GUTHIA",
        "numero":  "12.0",
        "complemento":  "ANA MELO",
        "cep":  "8.8135186E7",
        "bairro":  "ARIRIU",
        "cidade":  "PALHO�A",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-09-07"
    },
    {
        "id":  "103",
        "cpf":  "961.193.810-15",
        "senha":  "9611",
        "nome_guerra":  "Andreia",
        "nome":  "Andreia de F�tima Machado",
        "data_nascimento":  "1980-08-25",
        "nome_mae":  "Catarina Benedett machado",
        "nome_pai":  "Fredolino machado",
        "sexo":  "Feminino",
        "telefone":  "4.8996970295E10",
        "email":  "andreiamachado2508@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Ant�nio Elias",
        "numero":  "22.0",
        "complemento":  "Casa",
        "cep":  "8.810616E7",
        "bairro":  "Picadas do sul",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Av Governador Ivo Silveira",
        "numero":  "",
        "complemento":  "",
        "cep":  "88085-000",
        "bairro":  "Capoeiras",
        "cidade":  "Florian�polis",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Francisco Lutz de Almeida",
        "numero":  "",
        "complemento":  "",
        "cep":  "88108-173",
        "bairro":  "Ro�ado",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua das amiexas",
        "numero":  "126.0",
        "complemento":  "Casa",
        "cep":  "8.8136303E7",
        "bairro":  "Madri",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Walmor Beppler",
        "numero":  "S/N",
        "complemento":  "Servid�o ao lado da casa 125",
        "cep":  "8.8136257E7",
        "bairro":  "S�o Sebasti�o",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Santo Andr�",
        "numero":  "518.0",
        "complemento":  "ap 201",
        "cep":  "8.810643E7",
        "bairro":  "Flor de napolis",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Bela Vista",
        "numero":  "",
        "complemento":  "",
        "cep":  "88119-114",
        "bairro":  "Potecas",
        "cidade":  "S�o Jose",
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
        "nome_pai":  "Jos� Ant�nio Rodrigues barros",
        "sexo":  "Masculino",
        "telefone":  "4.898821786E10",
        "email":  "michel_sbarros@yahoo.com.br",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Jos� Cl�udio Schmidt",
        "numero":  "50.0",
        "complemento":  "50.0",
        "cep":  "8.8115558E7",
        "bairro":  "Serraria",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Algarves",
        "numero":  "S/n",
        "complemento":  "Quadra 12 Loteb3",
        "cep":  "8.8107365E7",
        "bairro":  "Lisboa",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Terc�lio Tedesco",
        "numero":  "",
        "complemento":  "",
        "cep":  "88107-481",
        "bairro":  "Potecas",
        "cidade":  "S�o Jos�",
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
        "nome_mae":  "Maria F�tima de Pinho",
        "nome_pai":  "Sidnei Conrado",
        "sexo":  "Feminino",
        "telefone":  "4.8991192407E10",
        "email":  "corretoraimobiliariaelaine@gmail.com",
        "obm":  "Santo Amaro",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua S�o Jo�o",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Madre Benvenuta",
        "numero":  "388.0",
        "complemento":  "Apto 911",
        "cep":  "8.80365E7",
        "bairro":  "Trindade",
        "cidade":  "Florian�polis",
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
        "nome_mae":  "Maria da Gra�a Farias Haskel",
        "nome_pai":  "Paulo Roberto da Silva",
        "sexo":  "Masculino",
        "telefone":  "(48)99852-5717",
        "email":  "bombeirofloripa2011@hotmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Jo�o Batista Derner Neves",
        "numero":  "25.0",
        "complemento":  "ap1005",
        "cep":  "88102-270",
        "bairro":  "Kobrasol",
        "cidade":  "S�o Jos�",
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
        "nome_pai":  "Ant�nio Ad�o Henkes",
        "sexo":  "Feminino",
        "telefone":  "4.8998000811E10",
        "email":  "mahenkes@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua das Ameixas",
        "numero":  "126.0",
        "complemento":  "Casa",
        "cep":  "8.8136303E7",
        "bairro":  "Madri",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Madre tereza de Calcut�",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Real Parque",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Antonio Goncalves Chaves",
        "numero":  "",
        "complemento":  "",
        "cep":  "88130-545",
        "bairro":  "Ponte Imaruim",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Maria Helena Kretzer",
        "numero":  "503.0",
        "complemento":  "casa",
        "cep":  "8.810367E7",
        "bairro":  "Praia Comprida",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Cabo Oderli Schilchting",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Passa Vinte",
        "cidade":  "Palho�a",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "121",
        "cpf":  "015.513.347-04",
        "senha":  "0155",
        "nome_guerra":  "Louren�o",
        "nome":  "Carlos Henrique Louren�o Gon�alves",
        "data_nascimento":  "1972-09-22",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)99936-9240",
        "email":  "carioca-henrique@hotmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Conde Afonso Celso",
        "numero":  "",
        "complemento":  "",
        "cep":  "88070-560",
        "bairro":  "Capoeiras",
        "cidade":  "Florian�polis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-08-20"
    },
    {
        "id":  "122",
        "cpf":  "085.543.859-26",
        "senha":  "0855",
        "nome_guerra":  "Lucas",
        "nome":  "Lucas Rodrigues Ant�nio",
        "data_nascimento":  "1994-08-28",
        "nome_mae":  "Chirley Jo�o Rodrigues Ant�nio",
        "nome_pai":  "Daniel Aniceto Ant�nio",
        "sexo":  "Masculino",
        "telefone":  "4.8999352731E10",
        "email":  "lucasrodrigues-sc@hotmail.com.br",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Fernando Jos� Zimmermann",
        "numero":  "33.0",
        "complemento":  "Casa",
        "cep":  "8.8160624E7",
        "bairro":  "Bom viver",
        "cidade":  "Bigua�u",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Rodney Brasil Machado",
        "numero":  "59.0",
        "complemento":  "Condom�nio",
        "cep":  "8.8122049E7",
        "bairro":  "Sert�o do Maruim",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Pedro Paulo de Abreu",
        "numero":  "",
        "complemento":  "",
        "cep":  "88106-785",
        "bairro":  "forquilhinhas",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua 13 de Junho",
        "numero":  "",
        "complemento":  "",
        "cep":  "88106-470",
        "bairro":  "Flor de N�polis",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "R. Jo�o Guilherme dos Santos",
        "numero":  "",
        "complemento":  "",
        "cep":  "88131-780",
        "bairro":  "Rio Grande",
        "cidade":  "Palho�a",
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
        "nome_pai":  "C�ndido Cristiano concei��o Cristiano",
        "sexo":  "Masculino",
        "telefone":  "4.8996491296E10",
        "email":  "gabrielnerycristiano1@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Av. Brasil",
        "numero":  "158.0",
        "complemento":  "Casa",
        "cep":  "8.81105E7",
        "bairro":  "Bela Vista",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Domingos Pedro Hermes",
        "numero":  "",
        "complemento":  "",
        "cep":  "",
        "bairro":  "Barreiros",
        "cidade":  "S�o jos�",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "129",
        "cpf":  "091.275.619-50",
        "senha":  "0912",
        "nome_guerra":  "Ozol",
        "nome":  "Guilherme Ozol de Assun��o",
        "data_nascimento":  "1993-12-22",
        "nome_mae":  "Sandra Mara Ozol de Assun��o",
        "nome_pai":  "",
        "sexo":  "Masculino",
        "telefone":  "4.8991107391E10",
        "email":  "guilherme.ozol@hotmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Elizeu de Bernardi",
        "numero":  "641.0",
        "complemento":  "Bl c ap 302",
        "cep":  "8.810105E7",
        "bairro":  "Campinas",
        "cidade":  "S�o Jos�",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2023-09-11",
        "data_desligamento":  "2026-03-26",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Jo�o Meirelles",
        "numero":  "",
        "complemento":  "",
        "cep":  "88085-435",
        "bairro":  "Itagu��u",
        "cidade":  "florian�polis",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2023-08-14",
        "data_desligamento":  "2026-05-11",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Roberto VALDIR Manchich",
        "numero":  "",
        "complemento":  "",
        "cep":  "88123-430",
        "bairro":  "Caminho Novo",
        "cidade":  "Palho�a",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-05-31"
    },
    {
        "id":  "133",
        "cpf":  "120.391.089-47",
        "senha":  "1203",
        "nome_guerra":  "Sard�",
        "nome":  "Julia da Silva Sard�",
        "data_nascimento":  "1999-04-15",
        "nome_mae":  "Liliane Maria da Silva Sard�",
        "nome_pai":  "Claudemar Alfredo Sard�",
        "sexo":  "Feminino",
        "telefone":  "4.8984242904E10",
        "email":  "juliadasilvasarda@hotmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Manoel Eduardo Cardoso",
        "numero":  "17.0",
        "complemento":  "Casa",
        "cep":  "8.8110792E7",
        "bairro":  "Bela Vista 1",
        "cidade":  "S�o Jos�",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2023-09-26",
        "data_desligamento":  "2026-04-28",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
    },
    {
        "id":  "134",
        "cpf":  "155.303.359-00",
        "senha":  "1553",
        "nome_guerra":  "Schmitt",
        "nome":  "Andr� Luiz Schmitt",
        "data_nascimento":  "1988-04-27",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(48)98435-2594",
        "email":  "andr�Luizschmitt@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Frei Albano",
        "numero":  "",
        "complemento":  "",
        "cep":  "88103-100",
        "bairro":  "Centro",
        "cidade":  "S�o jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Baldicero Filomeno",
        "numero":  "",
        "complemento":  "",
        "cep":  "88064-002",
        "bairro":  "Alto Ribeir�o",
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
        "nome_mae":  "EUG�NIA ALVES",
        "nome_pai":  "VILMO FRANCISCO DA COSTA",
        "sexo":  "Masculino",
        "telefone":  "4.898801019E10",
        "email":  "UELDER.ALVES@GMAIL.COM",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "RUA CRIST�V�O NUNES PIRES",
        "numero":  "180.0",
        "complemento":  "APTO 904",
        "cep":  "8.801012E7",
        "bairro":  "CENTRO",
        "cidade":  "FLORIAN�POLIS",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2023-10-10"
    },
    {
        "id":  "137",
        "cpf":  "416.967.609-25",
        "senha":  "4169",
        "nome_guerra":  "Ulyss�ia",
        "nome":  "Ismael Vieira da Rosa Ulyss�ia",
        "data_nascimento":  "1961-08-02",
        "nome_mae":  "",
        "nome_pai":  "",
        "sexo":  "",
        "telefone":  "(04)89997-1294",
        "email":  "ismaelvru@intercop.com.br",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "av Itamarati",
        "numero":  "",
        "complemento":  "",
        "cep":  "88034-400",
        "bairro":  "Itamarati",
        "cidade":  "Florian�polis",
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
        "nome_mae":  "NA�RA SCHOROEDER",
        "nome_pai":  "CLAUDINEI SOARES LUCIANO",
        "sexo":  "Feminino",
        "telefone":  "048996418318",
        "email":  "yanka.carolinyy@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "R. Jos� Jo�o de Souza",
        "numero":  "457.0",
        "complemento":  "casa",
        "cep":  "8.810817E7",
        "bairro":  "Ro�ado",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua s�bia una",
        "numero":  "45.0",
        "complemento":  "Bloco 5A AP 201",
        "cep":  "8.8122021E7",
        "bairro":  "Sert�o do Imarui",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Av. Patr�cio Ant�nio Teixeira",
        "numero":  "131.0",
        "complemento":  "AP 01",
        "cep":  "8.8161586E7",
        "bairro":  "Rio Caveiras",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Ad�o Shimitd",
        "numero":  "998.0",
        "complemento":  "Casa",
        "cep":  "8.811726E7",
        "bairro":  "Barreiros",
        "cidade":  "S�o jose",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Avenida Ceniro Martins 1078",
        "numero":  "1078.0",
        "complemento":  "Apto 9",
        "cep":  "8.8107479E7",
        "bairro":  "Forquilhas",
        "cidade":  "S�o Jos�",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2025-06-17",
        "data_desligamento":  "2026-05-06",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
    },
    {
        "id":  "143",
        "cpf":  "125.366.669-56",
        "senha":  "1253",
        "nome_guerra":  "Weverton",
        "nome":  "Weverton Jos� Machado",
        "data_nascimento":  "2002-09-14",
        "nome_mae":  "Jerusa aparecida citadella",
        "nome_pai":  "Jos� Jucelio Machado",
        "sexo":  "Masculino",
        "telefone":  "4.8998218785E10",
        "email":  "Machadoweverton424@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua 13 de maio",
        "numero":  "876.0",
        "complemento":  "Casa",
        "cep":  "8.816504E7",
        "bairro":  "Prado",
        "cidade":  "Bigua�u",
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
        "nome_pai":  "N�o Declarado",
        "sexo":  "Masculino",
        "telefone":  "4.8999575275E10",
        "email":  "djxandemartins@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Olavo Bilac",
        "numero":  "498.0",
        "complemento":  "Casa",
        "cep":  "8.813335E7",
        "bairro":  "Jardim Eldorado",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Johannes Lambertus Josef Bovee",
        "numero":  "16.0",
        "complemento":  "Casa",
        "cep":  "8.816849E7",
        "bairro":  "Tijuquinhas",
        "cidade":  "Bigua�u",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-08-18"
    },
    {
        "id":  "146",
        "cpf":  "083.469.799-83",
        "senha":  "0834",
        "nome_guerra":  "Andr�ia M",
        "nome":  "Andr�ia Martins dos Santos",
        "data_nascimento":  "1992-04-20",
        "nome_mae":  "Angelina da Cruz Delfino",
        "nome_pai":  "Salvador Martins dos Santos",
        "sexo":  "Feminino",
        "telefone":  "4.8984728085E10",
        "email":  "andreiamartins.ntr@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Ac�cio Reitz",
        "numero":  "355.0",
        "complemento":  "Casa",
        "cep":  "8.816106E7",
        "bairro":  "Universit�rio",
        "cidade":  "Bigua�u",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua sebastiana Coutinho",
        "numero":  "216.0",
        "complemento":  "Torre D apto 202",
        "cep":  "8.811324E7",
        "bairro":  "Areias",
        "cidade":  "S�o Jos�",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-10-08"
    },
    {
        "id":  "148",
        "cpf":  "028.574.290-61",
        "senha":  "0285",
        "nome_guerra":  "Gon�alves",
        "nome":  "Alessandro da Costa Gon�alves",
        "data_nascimento":  "1991-10-13",
        "nome_mae":  "Sandra Mara Costa Gon�alves",
        "nome_pai":  "Jos� Jo�o Angonezi Gon�alves",
        "sexo":  "Masculino",
        "telefone":  "4.8991466837E10",
        "email":  "acgoncalves191@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Av Paulo Roberto Vidal",
        "numero":  "2490.0",
        "complemento":  "Casa",
        "cep":  "8.8132599E7",
        "bairro":  "Bella Vista",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Manoel Mariano Ferreira",
        "numero":  "621.0",
        "complemento":  "Condom�nio",
        "cep":  "8.816168E7",
        "bairro":  "Rio Caveiras",
        "cidade":  "Bigua�u",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Servid�o In�cia de Medeiros",
        "numero":  "263.0",
        "complemento":  "Casa",
        "cep":  "8.8037065E7",
        "bairro":  "C�rrego grande",
        "cidade":  "Florian�polis",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2025-12-22"
    },
    {
        "id":  "151",
        "cpf":  "097.355.079-19",
        "senha":  "0973",
        "nome_guerra":  "Figueiredo",
        "nome":  "Jo�o Victor Figueiredo Chrostowski",
        "data_nascimento":  "1995-07-27",
        "nome_mae":  "Cerlei Adriane Figueiredo Chrostowski",
        "nome_pai":  "Jos� H�lio Chrostowski",
        "sexo":  "Masculino",
        "telefone":  "047991363393",
        "email":  "j.victorfc@yahoo.com.br",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Thom� Israel da Silva",
        "numero":  "105.0",
        "complemento":  "Apto 401A",
        "cep":  "8.8132373E7",
        "bairro":  "Caminho Novo",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Maria Filomena da Silva",
        "numero":  "388.0",
        "complemento":  "Ap 1001",
        "cep":  "8.811063E7",
        "bairro":  "Nsa Sra do Ros�rio",
        "cidade":  "S�o Jos�",
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
        "nome_pai":  "Sebasti�o Boaventura cardoso",
        "sexo":  "Masculino",
        "telefone":  "4.8999066108E10",
        "email":  "claudio3110@yahoo.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Caetano da costa coelho",
        "numero":  "1593.0",
        "complemento":  "Apto 101",
        "cep":  "8.811379E7",
        "bairro":  "Areias",
        "cidade":  "S�o Jos�",
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
        "nome_mae":  "Maria de F�tima Carvalho",
        "nome_pai":  "Paulo Henrique Cordova",
        "sexo":  "Masculino",
        "telefone":  "4.8998237756E10",
        "email":  "eventos_djdiego@hotmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua geral de tr�s riachos",
        "numero":  "Sem numero",
        "complemento":  "Casa",
        "cep":  "8.816E7",
        "bairro":  "Fundos",
        "cidade":  "Bigua�u",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-02-11",
        "data_desligamento":  "2026-06-26",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
    },
    {
        "id":  "155",
        "cpf":  "118.669.539-07",
        "senha":  "1186",
        "nome_guerra":  "Bunn",
        "nome":  "Jo�o Pedro Pereira Bunn",
        "data_nascimento":  "2004-09-15",
        "nome_mae":  "Adriana Maciel Pereira",
        "nome_pai":  "Orlando Bunn",
        "sexo":  "Masculino",
        "telefone":  "4.8999512775E10",
        "email":  "joaoppb01@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Acioli Nunes dos Santos",
        "numero":  "231.0",
        "complemento":  "Casa",
        "cep":  "8.813154E7",
        "bairro":  "Centro",
        "cidade":  "Palho�a",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Inhambu",
        "numero":  "104.0",
        "complemento":  "Casa",
        "cep":  "8.811551E7",
        "bairro":  "Serraria",
        "cidade":  "S�o Jos�",
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
        "nome_mae":  "K�tia Regina Ventura Luiz",
        "nome_pai":  "Paulo Roberto Luiz",
        "sexo":  "Feminino",
        "telefone":  "4.8991540113E10",
        "email":  "bell.450009@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "rua Maria Helena Kretzer",
        "numero":  "503.0",
        "complemento":  "casa A ap 202",
        "cep":  "8.810367E7",
        "bairro":  "Praia Comprida",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Prefeito Dib Cherem",
        "numero":  "2734.0",
        "complemento":  "Casa",
        "cep":  "8.809E7",
        "bairro":  "Capoeiras",
        "cidade":  "Florian�polis",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Av paulo roberto vidal",
        "numero":  "475.0",
        "complemento":  "bloco c ap 310",
        "cep":  "8.8132599E7",
        "bairro":  "Bela vista",
        "cidade":  "Palho�a",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-02-16",
        "data_desligamento":  "2026-06-12",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
    },
    {
        "id":  "160",
        "cpf":  "069.723.111-95",
        "senha":  "0697",
        "nome_guerra":  "Joaber",
        "nome":  "Reinaldo Joaber de Ara�jo Spengler",
        "data_nascimento":  "2002-01-15",
        "nome_mae":  "Genilce Silva de Ara�jo Spengler",
        "nome_pai":  "Ivo Spengler",
        "sexo":  "Masculino",
        "telefone":  "4.8988390467E10",
        "email":  "Reinaldospengler@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Demetrio Novossate",
        "numero":  "278.0",
        "complemento":  "Casa",
        "cep":  "8.8136366E7",
        "bairro":  "S�o Sebasti�o",
        "cidade":  "Palho�a",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-02-18",
        "data_desligamento":  "2026-06-09",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Maria Helena Kretzer",
        "numero":  "503a",
        "complemento":  "Ap301",
        "cep":  "8.810367E7",
        "bairro":  "Praia Comprida",
        "cidade":  "S�o Jos�",
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
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua Rodnei Brasil machado",
        "numero":  "59.0",
        "complemento":  "Bloco 7a ap104",
        "cep":  "88122.0",
        "bairro":  "Sert�o do maruim",
        "cidade":  "Sao jose",
        "perfil":  "associado",
        "status":  "desligado",
        "data_cadastro":  "2026-03-15",
        "data_desligamento":  "2026-06-26",
        "motivo_desligamento":  "Desligamento registrado na planilha de sócios"
    },
    {
        "id":  "163",
        "cpf":  "235.983.728-17",
        "senha":  "2359",
        "nome_guerra":  "Perdon�",
        "nome":  "P�mela Aparecida da Luz Perdon�",
        "data_nascimento":  "2001-05-17",
        "nome_mae":  "Juliana Aparecida da Luz Perdon�",
        "nome_pai":  "Marcos Aur�lio Perdon�",
        "sexo":  "Feminino",
        "telefone":  "4.8991860157E10",
        "email":  "palperdona@gmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Servid�o silvestre Prim",
        "numero":  "136.0",
        "complemento":  "Casa",
        "cep":  "8.8161144E7",
        "bairro":  "Boa VISTA",
        "cidade":  "Bigua�u",
        "perfil":  "associado",
        "status":  "ativo",
        "data_cadastro":  "2026-04-17"
    },
    {
        "id":  "164",
        "cpf":  "108.677.459-08",
        "senha":  "1086",
        "nome_guerra":  "Viapiana",
        "nome":  "Ot�vio Augusto Viapiana",
        "data_nascimento":  "1999-04-18",
        "nome_mae":  "Lizandra Carla Piaseski Viapiana",
        "nome_pai":  "Amirton Jos� Viapiana",
        "sexo":  "Masculino",
        "telefone":  "4.8991861852E10",
        "email":  "otavio_viapiana@hotmail.com",
        "obm":  "São José",
        "profissao":  "Bombeiro Comunitário",
        "logradouro":  "Rua J�lio Teodoro Martins",
        "numero":  "1800.0",
        "complemento":  "Apt 624",
        "cep":  "8.816133E7",
        "bairro":  "Fundos",
        "cidade":  "Bigua�u",
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
        "profissao":  "Bombeiro Comunitário",
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
        { id: '1', cpf: '000.000.000-00', senha: '123', nome: 'Diretoria ACBCSJ', nome_guerra: 'Diretoria', perfil: 'diretoria', status: 'ativo', obm: 'São José', profissao: 'Diretoria' },
        { id: '2', cpf: '111.111.111-11', senha: '123', nome: 'Sd. Silva (Exemplo)', nome_guerra: 'Sd. Silva', perfil: 'associado', status: 'ativo', obm: 'São José', profissao: 'Bombeiro Comunitário' }
    ],
    financeiro: [],
    mensalidades: [
        { id: 'm1', associado_cpf: '111.111.111-11', mes: 'Janeiro/2026', valor: 20.00, status: 'pago', data_pagamento: '05/01/2026' },
        { id: 'm2', associado_cpf: '111.111.111-11', mes: 'Fevereiro/2026', valor: 20.00, status: 'pago', data_pagamento: '02/02/2026' }
    ],
    documentos: [
        { id: 'doc_1', titulo: 'Estatuto Social da ACBCSJ', categoria: 'Documentos Oficiais', visibilidade: 'todos', data: '15/01/2026', link: null, arquivo_nome: 'Estatuto_ACBCSJ.pdf' },
        { id: 'doc_2', titulo: 'Ata da Reunião de Posse 2026', categoria: 'Atas', visibilidade: 'todos', data: '20/01/2026', link: null, arquivo_nome: 'Ata_Posse_2026.pdf' }
    ],
    programacao: [],
    mensagens: []
};

let currentUser = null;
let currentChart = null;

// ARMAZENAMENTO ILIMITADO DE ARQUIVOS VIA INDEXEDDB (SEM O LIMITE DE 5MB DO LOCALSTORAGE)
const idbStorage = {
    dbName: 'ACBCSJ_IndexedDB',
    version: 1,
    db: null,
    async getDB() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, this.version);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('files')) {
                    db.createObjectStore('files');
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
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                store.put(content, id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            console.error('Erro no IndexedDB:', e);
            return false;
        }
    },
    async getFile(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const tx = db.transaction('files', 'readonly');
                const store = tx.objectStore('files');
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
                const tx = db.transaction('files', 'readwrite');
                const store = tx.objectStore('files');
                store.delete(id);
                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e.target.error);
            });
        } catch (e) {
            return false;
        }
    }
};

// INICIALIZA�?�fO
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    setupCPFMasks();
    setupNavigation();
});

function initMockData() {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    
    const needsReset = list.length < 50;

    if (needsReset) {
        list = [...MOCK_DATA_INITIAL.associados];
    }

    if (typeof ASSOCIADOS_EXCEL_IMPORT !== 'undefined' && Array.isArray(ASSOCIADOS_EXCEL_IMPORT)) {
        ASSOCIADOS_EXCEL_IMPORT.forEach(socio => {
            const index = list.findIndex(a => a.cpf === socio.cpf);
            if (index >= 0) {
                list[index] = { ...list[index], ...socio };
            } else {
                list.push(socio);
            }
        });
    }

    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    // ZERA TODOS OS LAN�?AMENTOS FINANCEIROS CONFORME SOLICITA�?�fO
    localStorage.setItem('acbcsj_financeiro', JSON.stringify([]));
    localStorage.setItem('acbcsj_mensalidades', JSON.stringify(MOCK_DATA_INITIAL.mensalidades));
    localStorage.setItem('acbcsj_programacao', JSON.stringify(MOCK_DATA_INITIAL.programacao));
    localStorage.setItem('acbcsj_mensagens', JSON.stringify(MOCK_DATA_INITIAL.mensagens));
    localStorage.removeItem('acbcsj_mensalidades_grid');

    let storedDocs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    if (storedDocs.length > 0) {
        let cleaned = false;
        storedDocs.forEach(d => {
            if (d.link && d.link.startsWith('data:')) {
                idbStorage.setFile(d.id, d.link);
                d.link = null;
                cleaned = true;
            }
        });
        if (cleaned) {
            try {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(storedDocs));
            } catch (err) {
                console.warn('Concluída limpeza do localStorage');
            }
        }
    } else {
        localStorage.setItem('acbcsj_documentos', JSON.stringify(MOCK_DATA_INITIAL.documentos));
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

// AUTENTICA�?�fO E LOGIN
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
                alert('CPF não encontrado no sistema da ACBCSJ. Verifique os números digitados ou faça sua solicitaÃ§Ã£oção de pré-cadastro.');
                return;
            }

            if (found.status === 'pendente') {
                alert('�s�️ ACESSO BLOQUEADO!\n\nSua solicitaÃ§Ã£oção de cadastro ainda está em análise pela Diretoria da ACBCSJ. Aguarde a aprovação para conseguir logar.');
                return;
            }

            if (found.status === 'desligado') {
                alert('�ðŸš«� ACESSO TOTALMENTE BLOQUEADO!\n\nEste cadastro consta como DESLIGADO da Associação Corpo de Bombeiros Comunitários de São José.\nIntegrantes desligados não possuem permissão de acesso ao sistema.');
                return;
            }

            const apenasNumerosCPF = (found.cpf || '').replace(/\D/g, '');
            const senhaEsperada = (found.senha || apenasNumerosCPF.substring(0, 4)).trim();

            if (password && password.trim() !== senhaEsperada) {
                alert("Senha incorreta.\n\nLembre-se que sua senha inicial de acesso são os 4 primeiros dígitos numéricos do seu CPF (" + senhaEsperada + ").");
                return;
            }

            currentUser = found;
        }

        if (!currentUser) {
            alert('Não foi possível carregar os dados do usuário. Tente novamente.');
            return;
        }

        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('appDashboard').style.display = 'flex';
        
        renderUserHeader();
        renderSidebarMenu();
        navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
    } catch (err) {
        console.error('Erro ao efetuar login:', err);
        alert('Ocorreu um erro ao carregar os dados de login.');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('appDashboard').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
}

// RENDERIZA�?�fO DO CABE�?ALHO DO USUÁRIO
function renderUserHeader() {
    document.getElementById('headerUserName').textContent = currentUser.nome;
    const badge = document.getElementById('headerUserRole');
    badge.textContent = currentUser.perfil.toUpperCase();
    badge.className = `user-role-badge role-${currentUser.perfil}`;
}

// MENU LATERAL DIN�,MICO CONFORME PERFIL
function renderSidebarMenu() {
    const menuNav = document.getElementById('sidebarNav');
    if (!menuNav) return;
    menuNav.innerHTML = '';

    if (currentUser.perfil === 'diretoria') {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-diretoria')">�Y"S Painel Geral</div>
            <div class="nav-item" onclick="navigateTab('gestao-associados')">�Y'� Controle de Associados</div>
            <div class="nav-item" onclick="navigateTab('associados-desligados')">�Y"< Associados Desligados</div>
            <div class="nav-item" onclick="navigateTab('gestao-financeira')">�Y'� Lançamentos Financeiros</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">�Y"' Documentos & Atas</div>
            <div class="nav-item" onclick="navigateTab('mensagens-diretoria')">�Y"� Caixa de Mensagens</div>
        `;
    } else {
        menuNav.innerHTML = `
            <div class="nav-item active" onclick="navigateTab('overview-associado')">�Y�� Meu Painel</div>
            <div class="nav-item" onclick="navigateTab('balancetes-associado')">�Y"^ Balancetes & Contas</div>
            <div class="nav-item" onclick="navigateTab('documentos-associado')">�Y"� Documentos & Convites</div>
            <div class="nav-item" onclick="navigateTab('enviar-mensagem')">�Y'� Fale com a Diretoria</div>
        `;
    }
}

// NAVEGA�?�fO ENTRE ABAS
function navigateTab(tabId) {
    if (currentUser) {
        const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const currentDbState = list.find(a => a.cpf === currentUser.cpf);
        if (currentDbState && currentDbState.status === 'desligado') {
            alert('�ðŸš«� ACESSO REVOGADO!\n\nSeu cadastro consta como DESLIGADO da Associação. Você foi desconectado do sistema.');
            logout();
            return;
        }
    }

    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.style.display = 'block';

    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(tabId));
    if (activeNav) activeNav.classList.add('active');

    if (tabId === 'overview-diretoria') renderDiretoriaOverview();
    if (tabId === 'gestao-associados') renderGestaoAssociados();
    if (tabId === 'associados-desligados') renderAssociadosDesligados();
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
    if (tabId === 'balancetes-associado') renderBalancetesAssociado();
    if (tabId === 'documentos-associado' || tabId === 'documentos-diretoria') renderDocumentos();
    if (tabId === 'mensagens-diretoria') renderMensagensDiretoria();
}

// L�"GICA DA DIRETORIA: PAINEL GERAL E TABELAS
function renderDiretoriaOverview() {
    const associados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const pendentes = associados.filter(a => a.status === 'pendente');

    const selectAno = document.getElementById('diretoriaFiltroAno');
    const anoFiltro = selectAno ? selectAno.value : '2026';

    document.querySelectorAll('.lblAnoSelecionado').forEach(el => {
        el.textContent = anoFiltro === 'todos' ? 'Todos' : anoFiltro;
    });

    const totalAtivos = associados.filter(a => a.status === 'ativo').length;
    document.getElementById('metricTotalAssociados').textContent = totalAtivos;

    const novosNoAno = associados.filter(a => {
        if (!a.data_cadastro) return false;
        return anoFiltro === 'todos' || a.data_cadastro.includes(anoFiltro);
    }).length;
    const elNovos = document.getElementById('metricNovosAno');
    if (elNovos) elNovos.textContent = novosNoAno;

    const desligadosNoAno = associados.filter(a => {
        if (a.status !== 'desligado') return false;
        if (anoFiltro === 'todos') return true;
        const emData = a.data_desligamento && a.data_desligamento.includes(anoFiltro);
        const emMotivo = a.motivo_desligamento && a.motivo_desligamento.includes(anoFiltro);
        const emCadastro = a.data_cadastro && a.data_cadastro.includes(anoFiltro);
        return emData || emMotivo || emCadastro;
    }).length;
    const elDesligados = document.getElementById('metricDesligadosAno');
    if (elDesligados) elDesligados.textContent = desligadosNoAno;

    let totalReceitas = 0;
    financeiro.filter(f => f.tipo === 'receita').forEach(f => totalReceitas += Number(f.valor));
    document.getElementById('metricSaldoCaixa').textContent = `R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const elPendenteCount = document.getElementById('metricCadastrosPendentes');
    if (elPendenteCount) elPendenteCount.textContent = pendentes.length;

    const containerPendentes = document.getElementById('tablePendentesBody');
    if (containerPendentes) {
        if (pendentes.length === 0) {
            containerPendentes.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma solicitaÃ§Ã£oção pendente no momento.</td></tr>`;
        } else {
            containerPendentes.innerHTML = pendentes.map(p => `
                <tr>
                    <td><b>${p.nome_guerra || p.nome}</b><br><small style="color:var(--text-muted)">${p.nome}</small></td>
                    <td>${p.cpf}</td>
                    <td>${p.obm || '-'}</td>
                    <td>${p.data_cadastro || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-gold" onclick="aprovarAssociado('${p.cpf}')">Aprovar</button>
                        <button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="rejeitarAssociado('${p.cpf}')">Recusar</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    renderGraficoDiretoria(associados, financeiro);
}

function renderGraficoDiretoria(associados, financeiro) {
    const ctx = document.getElementById('chartGeralDiretoria');
    if (!ctx) return;

    if (currentChart) {
        currentChart.destroy();
    }

    const ativos = associados.filter(a => a.status === 'ativo').length;
    const pendentes = associados.filter(a => a.status === 'pendente').length;
    const desligados = associados.filter(a => a.status === 'desligado').length;

    currentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Associados Ativos', 'Solicitações Pendentes', 'Desligados'],
            datasets: [{
                data: [ativos, pendentes, desligados],
                backgroundColor: ['#D4AF37', '#F39C12', '#E74C3C'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#E0E0E0', font: { family: 'Inter' } }
                }
            }
        }
    });
}

function aprovarAssociado(cpf) {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (item) {
        item.status = 'ativo';
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);
        alert(`Pré-cadastro de ${item.nome} aprovado com sucesso!`);
        renderDiretoriaOverview();
        renderGestaoAssociados();
    }
}

function rejeitarAssociado(cpf) {
    if (confirm('Deseja realmente recusar esta solicitaÃ§Ã£oção de cadastro?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        list = list.filter(a => a.cpf !== cpf);
        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.deleteAssociado(cpf);
        alert('Solicitação recusada e removida.');
        renderDiretoriaOverview();
    }
}

// GEST�fO DE ASSOCIADOS
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
                const isSelf = currentUser && a.cpf === currentUser.cpf;
                let perfilControl = `<span class="badge badge-info">${a.perfil ? a.perfil.toUpperCase() : 'ASSOCIADO'}</span>`;

                if (isDiretoria) {
                    perfilControl = `
                        <select class="form-control" style="padding: 4px 8px; font-size: 12px; font-weight: 600; width: 130px; ${a.perfil === 'diretoria' ? 'border-color: var(--accent-gold); color: var(--accent-gold);' : ''}" 
                                ${isSelf ? 'disabled title="Você não pode alterar seu próprio perfil de Diretoria."' : ''} 
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
                        <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">�Y"< Ver Ficha Completa</button></td>
                        <td>
                            ${!isSelf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="abrirModalDesligar('${a.cpf}')">Desligar Associado</button>` : '<small style="color:var(--text-muted)">Você (Diretoria)</small>'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

function alterarPerfilAssociado(cpf, novoPerfil) {
    if (!currentUser || currentUser.perfil !== 'diretoria') {
        alert('Apenas membros da Diretoria possuem permissão para alterar o perfil de integrantes.');
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
                        <span style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">${d.motivo_desligamento || 'Não especificado'}</span>
                        ${d.carta_desligamento_url ? `
                            <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 8px; color:var(--accent-gold); border-color:var(--accent-gold)" onclick="abrirCartaDesligamento('${d.cpf}')">
                                �Y"< Ver Carta de Desligamento
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

function abrirModalDesligar(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (!item) return;

    document.getElementById('desligarCPF').value = cpf;
    document.getElementById('desligarNomeDisplay').textContent = item.nome_guerra || item.nome;
    document.getElementById('desligarData').value = new Date().toISOString().split('T')[0];
    document.getElementById('desligarMotivo').value = '';
    document.getElementById('desligarCartaArquivo').value = '';

    openModal('modalDesligarAssociado');
}

function confirmarDesligamento(e) {
    e.preventDefault();
    const cpf = document.getElementById('desligarCPF').value;
    const data = document.getElementById('desligarData').value;
    const motivo = document.getElementById('desligarMotivo').value.trim();
    const fileInput = document.getElementById('desligarCartaArquivo');
    const file = fileInput.files ? fileInput.files[0] : null;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => a.cpf === cpf);
    if (!item) return;

    const [ano, mes, dia] = data.split('-');
    const dataBR = `${dia}/${mes}/${ano}`;

    const concluirDesligamento = async (cartaUrl = null) => {
        item.status = 'desligado';
        item.data_desligamento = dataBR;
        item.motivo_desligamento = motivo || 'Desligamento a pedido ou administrativo';

        if (cartaUrl) {
            await idbStorage.setFile(`carta_${cpf}`, cartaUrl);
            item.carta_desligamento_url = true;
        }

        localStorage.setItem('acbcsj_associados', JSON.stringify(list));
        dbService.saveAssociado(item);

        if (currentUser && currentUser.cpf === cpf) {
            alert('�ðŸš«� Seu cadastro foi desligado. Você será desconectado do sistema.');
            logout();
        } else {
            alert(`Associado ${item.nome_guerra || item.nome} desligado com sucesso.`);
            closeModal('modalDesligarAssociado');
            renderGestaoAssociados();
            renderAssociadosDesligados();
            renderDiretoriaOverview();
        }
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            concluirDesligamento(event.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        concluirDesligamento();
    }
}

async function abrirCartaDesligamento(cpf) {
    const fileContent = await idbStorage.getFile(`carta_${cpf}`);
    if (!fileContent) {
        alert('Carta de desligamento não encontrada para este associado.');
        return;
    }
    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Carta de Desligamento - ACBCSJ</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${fileContent}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    }
}

function reativarAssociado(cpf) {
    if (confirm('Deseja realmente reativar este associado no sistema da ACBCSJ?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'ativo';
            item.data_desligamento = null;
            item.motivo_desligamento = null;
            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);
            alert(`Associado ${item.nome_guerra || item.nome} reativado com sucesso.`);
            renderAssociadosDesligados();
            renderGestaoAssociados();
            renderDiretoriaOverview();
        }
    }
}

function excluirAssociado(cpf) {
    if (confirm('Deseja realmente excluir permanentemente este registro de associado?')) {
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

// L�"GICA DO ASSOCIADO & GRÁFICOS
function renderAssociadoOverview() {
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome && currentUser) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }
    const mensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades')) || [];
    const minhas = mensalidades.filter(m => m.associado_cpf === currentUser.cpf);

    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (container) {
        if (minhas.length === 0) {
            container.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Nenhuma mensalidade registrada para o seu CPF até o momento.</td></tr>`;
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
    const ctx = document.getElementById('chartBalancete');
    if (!ctx) return;

    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    let totalReceitas = 0;
    let totalDespesas = 0;

    financeiro.forEach(f => {
        if (f.tipo === 'receita') totalReceitas += Number(f.valor);
        else totalDespesas += Number(f.valor);
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Arrecadado', 'Total de Despesas'],
            datasets: [{
                label: 'Valores em R$',
                data: [totalReceitas, totalDespesas],
                backgroundColor: ['#2ECC71', '#E74C3C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { ticks: { color: '#E0E0E0' } },
                x: { ticks: { color: '#E0E0E0' } }
            }
        }
    });
}

function renderGestaoFinanceira() {
    const list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const container = document.getElementById('tableFinanceiroBody');
    let totalReceitas = 0;
    let totalDespesas = 0;

    list.forEach(f => {
        if (f.tipo === 'receita') totalReceitas += Number(f.valor);
        else totalDespesas += Number(f.valor);
    });

    const saldo = totalReceitas - totalDespesas;

    const elReceita = document.getElementById('finTotalReceitas');
    const elDespesa = document.getElementById('finTotalDespesas');
    const elSaldo = document.getElementById('finSaldoAtual');

    if (elReceita) elReceita.textContent = `R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDespesa) elDespesa.textContent = `R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSaldo) {
        elSaldo.textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSaldo.style.color = saldo >= 0 ? 'var(--accent-gold)' : '#E74C3C';
    }

    if (container) {
        if (list.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum lançamento registrado.</td></tr>`;
        } else {
            container.innerHTML = list.map(f => `
                <tr>
                    <td>${f.data}</td>
                    <td>${f.descricao}</td>
                    <td><span class="badge badge-info">${f.categoria}</span></td>
                    <td><span class="badge badge-${f.tipo === 'receita' ? 'success' : 'danger'}">${f.tipo.toUpperCase()}</span></td>
                    <td style="font-weight: 700; color: ${f.tipo === 'receita' ? '#2ECC71' : '#E74C3C'};">R$ ${Number(f.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>-</td>
                </tr>
            `).join('');
        }
    }
}

function verFichaAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const item = list.find(a => (a.cpf || '').replace(/\D/g, '') === (cpf || '').replace(/\D/g, ''));
    if (!item) {
        alert('Ficha do associado não encontrada.');
        return;
    }

    const titleEl = document.getElementById('fichaNomeTitle');
    if (titleEl) {
        titleEl.textContent = `📋 Ficha Cadastral — ${item.nome_guerra || item.nome}`;
    }

    const container = document.getElementById('fichaContentBody');
    if (container) {
        container.innerHTML = `
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Nome de Guerra</span>
                <strong style="font-size: 16px; color: var(--accent-gold);">${item.nome_guerra || item.nome}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Nome Completo</span>
                <strong style="font-size: 14px; color: var(--text-color);">${item.nome || '-'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">CPF Registrado</span>
                <strong style="font-size: 14px;">${item.cpf || '-'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Telefone / WhatsApp</span>
                <strong style="font-size: 14px;">${item.telefone || 'Não informado'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">E-mail</span>
                <strong style="font-size: 14px;">${item.email || 'Não informado'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">OBM / Unidade</span>
                <strong style="font-size: 14px;">${item.obm || 'São José'}</strong>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Status no Sistema</span>
                <span class="badge badge-${item.status === 'ativo' ? 'success' : (item.status === 'desligado' ? 'danger' : 'warning')}" style="font-size: 12px; padding: 4px 8px;">
                    ${(item.status || 'ativo').toUpperCase()}
                </span>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <span style="color: var(--text-muted); font-size: 11px; display: block; text-transform: uppercase; margin-bottom: 4px;">Perfil de Acesso</span>
                <span class="badge badge-info" style="font-size: 12px; padding: 4px 8px;">
                    ${(item.perfil || 'associado').toUpperCase()}
                </span>
            </div>
        `;
    }

    openModal('modalFichaAssociado');
}

function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.style.display = 'flex';
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.style.display = 'none';
}

function setupNavigation() {
    window.onclick = function(event) {
        if (event.target.classList.contains('modal-wrapper')) {
            event.target.style.display = 'none';
        }
    };
}