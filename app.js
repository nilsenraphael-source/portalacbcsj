// DADOS IMPORTADOS DAS PLANILHAS OFICIAIS DA ACBCSJ (Mensal.xlsx)
const INITIAL_MENSAL_DATA = [
    {
        "nome_guerra":  "Angélica",
        "nome_completo":  "Angélica Mateus",
        "jan":  0,
        "fev":  40,
        "mar":  20,
        "abr":  0,
        "mai":  40,
        "jun":  20,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Antunes",
        "nome_completo":  "Douglas Antunes",
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  0,
        "mai":  40,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Augusto",
        "nome_completo":  "Murilo Augusto Galdino De Souza",
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  0,
        "ago":  20,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Andreia",
        "nome_completo":  "Andreia",
        "jan":  0,
        "fev":  0,
        "mar":  80,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  80,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Bento",
        "nome_completo":  "Daniel Bento",
        "jan":  0,
        "fev":  0,
        "mar":  20,
        "abr":  0,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Binhoti",
        "nome_completo":  "Tiago Binhoti",
        "jan":  0,
        "fev":  120,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  120,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Boiko",
        "nome_completo":  "Emerson Roberto Boiko",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Camila",
        "nome_completo":  "Camila Coelho Soares",
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Coelho",
        "nome_completo":  "Ricardo Augusto Coelho",
        "jan":  0,
        "fev":  0,
        "mar":  60,
        "abr":  60,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  80,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Da Silva",
        "nome_completo":  "Alex Sandro Batista da Silva",
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Barros",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  20,
        "mar":  40,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Deny",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Eder",
        "nome_completo":  "Eder Alison Da Silva",
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  100,
        "mai":  0,
        "jun":  40,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Elaine",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  40,
        "mar":  20,
        "abr":  0,
        "mai":  20,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Fabiana",
        "nome_completo":  "Fabiana Oro Cericato Costa",
        "jan":  0,
        "fev":  200,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Gabriel",
        "nome_completo":  "Gabriel Francisco Farias da Silva",
        "jan":  0,
        "fev":  40,
        "mar":  20,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  40,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Henkes",
        "nome_completo":  "Marcia Aparecida Henkes",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Humberto",
        "nome_completo":  "Carlos Humberto luiz",
        "jan":  0,
        "fev":  0,
        "mar":  60,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  20,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Ilton",
        "nome_completo":  "Ilton Saturnino Braz",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Kassandra",
        "nome_completo":  "Gabriela Kassandra Luiz Colossi",
        "jan":  20,
        "fev":  40,
        "mar":  40,
        "abr":  20,
        "mai":  20,
        "jun":  0,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Linder",
        "nome_completo":  "Gustavo Augusto Linder",
        "jan":  0,
        "fev":  60,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  40,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Lourenço",
        "nome_completo":  "Carlos Henrique Lourenço Gonçalves",
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Lucas",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  100,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Mayara",
        "nome_completo":  "Mayara Vieira Soares",
        "jan":  0,
        "fev":  0,
        "mar":  120,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Mina",
        "nome_completo":  "Kleber Pacheco Mina",
        "jan":  0,
        "fev":  0,
        "mar":  60,
        "abr":  0,
        "mai":  0,
        "jun":  80,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Mithel",
        "nome_completo":  "Mithel Evergisto de Lima",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Natayan",
        "nome_completo":  "Raphael Natayan Nilsen",
        "jan":  40,
        "fev":  0,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Nery",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  80,
        "jun":  40,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Oliveira",
        "nome_completo":  "Marcelo luiz de Oliveira",
        "jan":  0,
        "fev":  0,
        "mar":  40,
        "abr":  0,
        "mai":  80,
        "jun":  0,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Ozol",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  60,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Pereira",
        "nome_completo":  "Emerson Pereira",
        "jan":  0,
        "fev":  80,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  180,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Ravache",
        "nome_completo":  "Caio Passold Ravache",
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Santana",
        "nome_completo":  "Michele Santana Quint",
        "jan":  0,
        "fev":  0,
        "mar":  60,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Sardá",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  60,
        "abr":  20,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Schmitt",
        "nome_completo":  "André Luiz Schmitt",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Spotti",
        "nome_completo":  "Kleber Spotti Rodrigues",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  100,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Alves",
        "nome_completo":  "Uelder Alves Da Costa",
        "jan":  0,
        "fev":  240,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Ulysséia",
        "nome_completo":  "Ismael Vieira da Rosa Ulysséia",
        "jan":  0,
        "fev":  0,
        "mar":  100,
        "abr":  0,
        "mai":  0,
        "jun":  100,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Yanka",
        "nome_completo":  "Yanka Caroliny Luciano",
        "jan":  20,
        "fev":  20,
        "mar":  0,
        "abr":  60,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Yuri",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  20,
        "fev":  20,
        "mar":  40,
        "abr":  0,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Fortkamp",
        "nome_completo":  "Markian da Silveira Fortkamp",
        "jan":  0,
        "fev":  20,
        "mar":  40,
        "abr":  20,
        "mai":  0,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Jesus",
        "nome_completo":  "Karina  Maria de Jesus Sobrinho",
        "jan":  20,
        "fev":  0,
        "mar":  40,
        "abr":  0,
        "mai":  0,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Nakata",
        "nome_completo":  "Nakata Garra Gomes",
        "jan":  40,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Martins",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  40,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Andréia M",
        "nome_completo":  "Andréia Martins dos Santos",
        "jan":  0,
        "fev":  40,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  20,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Siqueira",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Luiz",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  20,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  20,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Figueiredo",
        "nome_completo":  "João Victor Figueiredo Chrostowski",
        "jan":  0,
        "fev":  20,
        "mar":  20,
        "abr":  0,
        "mai":  20,
        "jun":  40,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Luciano",
        "nome_completo":  "LUCIANO PEREIRA",
        "jan":  0,
        "fev":  0,
        "mar":  40,
        "abr":  0,
        "mai":  80,
        "jun":  60,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Cardoso",
        "nome_completo":  "Claudio cardoso",
        "jan":  0,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  0,
        "jun":  80,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Bunn",
        "nome_completo":  "João Pedro Pereira Bunn",
        "jan":  0,
        "fev":  0,
        "mar":  40,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Sofie",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  40,
        "abr":  20,
        "mai":  20,
        "jun":  20,
        "jul":  20,
        "ago":  20,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Fabian",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  80,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Levi",
        "nome_completo":  "Washington Levi Nascimento Dias",
        "jan":  0,
        "fev":  0,
        "mar":  20,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Joaber",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  20,
        "mar":  20,
        "abr":  20,
        "mai":  0,
        "jun":  40,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Sadi",
        "nome_completo":  [
                              [

                              ]
                          ],
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    },
    {
        "nome_guerra":  "Restituições de Projetos (Privado, Municipal ou Estadual)\t",
        "nome_completo":  0,
        "jan":  0,
        "fev":  0,
        "mar":  0,
        "abr":  0,
        "mai":  0,
        "jun":  0,
        "jul":  0,
        "ago":  0,
        "set":  0,
        "out":  0,
        "nov":  0,
        "dez":  0
    }
];

const INITIAL_LANCAMENTOS_DATA = [
    { id: 'desp_1', descricao: 'Taxa "Cesta de Relacionamento" Sicred', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '20/01/2026', data_iso: '2026-01-20', mes: 'Janeiro' },
    { id: 'desp_2', descricao: 'Sandro Martins (Copo B4 / FECABOM)', categoria: 'Outros', valor: 50.00, tipo: 'despesa', data: '26/01/2026', data_iso: '2026-01-26', mes: 'Janeiro' },
    { id: 'desp_3', descricao: 'Tarifas Caixa Economica Federal', categoria: 'Tarifas Banco', valor: 0.17, tipo: 'despesa', data: '31/01/2026', data_iso: '2026-01-31', mes: 'Janeiro' },
    { id: 'desp_4', descricao: 'Certificado Digital', categoria: 'Outros', valor: 170.00, tipo: 'despesa', data: '09/02/2026', data_iso: '2026-02-09', mes: 'Fevereiro' },
    { id: 'desp_5', descricao: 'Brinde Reunião Comando (Camila C Soares)', categoria: 'Presentes', valor: 47.61, tipo: 'despesa', data: '20/02/2026', data_iso: '2026-02-20', mes: 'Fevereiro' },
    { id: 'desp_6', descricao: 'Taxa "Cesta de Relacionamento" Sicred', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '20/02/2026', data_iso: '2026-02-20', mes: 'Fevereiro' },
    { id: 'desp_7', descricao: 'Lancheira aniversários Compra 1', categoria: 'Presentes', valor: 1945.00, tipo: 'despesa', data: '23/02/2026', data_iso: '2026-02-23', mes: 'Fevereiro' },
    { id: 'desp_8', descricao: 'Lancheira aniversários Compra 2', categoria: 'Presentes', valor: 775.80, tipo: 'despesa', data: '23/02/2026', data_iso: '2026-02-23', mes: 'Fevereiro' },
    { id: 'desp_9', descricao: 'Tarifas Caixa Economica Federal', categoria: 'Tarifas Banco', valor: 0.17, tipo: 'despesa', data: '28/02/2026', data_iso: '2026-02-28', mes: 'Fevereiro' },
    { id: 'desp_10', descricao: 'Estampa das lancheiras (Adriano Lima)', categoria: 'Presentes', valor: 800.00, tipo: 'despesa', data: '12/03/2026', data_iso: '2026-03-12', mes: 'Março' },
    { id: 'desp_11', descricao: 'Taxa "Cesta de Relacionamento" Sicred', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '20/03/2026', data_iso: '2026-03-20', mes: 'Março' },
    { id: 'desp_12', descricao: 'Tarifas Caixa Economica Federal', categoria: 'Tarifas Banco', valor: 0.88, tipo: 'despesa', data: '30/03/2026', data_iso: '2026-03-30', mes: 'Março' },
    { id: 'desp_13', descricao: 'Coffee Break Treinamento APH (João Valdeci Moraes)', categoria: 'Treinamentos', valor: 240.00, tipo: 'despesa', data: '13/04/2026', data_iso: '2026-04-13', mes: 'Abril' },
    { id: 'desp_14', descricao: 'Coffee Break Treinamento APH (Camila Soares)', categoria: 'Treinamentos', valor: 132.08, tipo: 'despesa', data: '13/04/2026', data_iso: '2026-04-13', mes: 'Abril' },
    { id: 'desp_15', descricao: 'Taxa "Cesta de Relacionamento" Sicred', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '20/04/2026', data_iso: '2026-04-20', mes: 'Abril' },
    { id: 'desp_16', descricao: 'Cartório (Gabriel F.Farias)', categoria: 'Cartório ou Documentação em geral', valor: 193.67, tipo: 'despesa', data: '24/04/2026', data_iso: '2026-04-24', mes: 'Abril' },
    { id: 'desp_17', descricao: 'Taxa "Cesta de Relacionamento" Sicred', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '20/05/2026', data_iso: '2026-05-20', mes: 'Maio' },
    { id: 'desp_18', descricao: 'Taxa de funcionamento PMSJ', categoria: 'Cartório ou Documentação em geral', valor: 440.66, tipo: 'despesa', data: '11/06/2026', data_iso: '2026-06-11', mes: 'Junho' },
    { id: 'desp_19', descricao: 'Certificado Digital (Safe2pay)', categoria: 'Cartório ou Documentação em geral', valor: 184.00, tipo: 'despesa', data: '11/06/2026', data_iso: '2026-06-11', mes: 'Junho' },
    { id: 'desp_20', descricao: 'Decoração e descartaveis - Jogo Copa do Mundo (Yanka)', categoria: 'Mercado', valor: 80.85, tipo: 'despesa', data: '18/06/2026', data_iso: '2026-06-18', mes: 'Junho' },
    { id: 'desp_21', descricao: 'Mercado - Jogo Copa do Mundo (MundialMIX)', categoria: 'Mercado', valor: 248.35, tipo: 'despesa', data: '22/06/2026', data_iso: '2026-06-22', mes: 'Junho' },
    { id: 'desp_22', descricao: 'Mercado - Jogo Copa do Mundo (Yanka)', categoria: 'Mercado', valor: 35.66, tipo: 'despesa', data: '22/06/2026', data_iso: '2026-06-22', mes: 'Junho' },
    { id: 'desp_23', descricao: 'Taxa "Cesta de Relacionamento" Sicred', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '22/06/2026', data_iso: '2026-06-22', mes: 'Junho' },
    { id: 'desp_24', descricao: 'Pães - Jogo Copa do Mundo (Industria de Paes)', categoria: 'Mercado', valor: 36.00, tipo: 'despesa', data: '23/06/2026', data_iso: '2026-06-23', mes: 'Junho' },
    { id: 'desp_25', descricao: 'Tarifas Caixa Economica Federal', categoria: 'Tarifas Banco', valor: 0.71, tipo: 'despesa', data: '30/06/2026', data_iso: '2026-06-30', mes: 'Junho' },
    { id: 'desp_26', descricao: 'Coffee Break - Palestra (Kiko)', categoria: 'Treinamentos', valor: 384.00, tipo: 'despesa', data: '17/07/2026', data_iso: '2026-07-17', mes: 'Julho' },
    { id: 'desp_27', descricao: 'Taxa "Cesta de Relacionamento" Sicredi', categoria: 'Tarifas Banco', valor: 35.00, tipo: 'despesa', data: '20/07/2026', data_iso: '2026-07-20', mes: 'Julho' },
    { id: 'desp_28', descricao: 'Refri - Palestra (Yanka)', categoria: 'Treinamentos', valor: 38.88, tipo: 'despesa', data: '22/07/2026', data_iso: '2026-07-22', mes: 'Julho' },
    { id: 'desp_29', descricao: 'Chocolate Palestrante Sgt Reinaldo - Palestra (Camila)', categoria: 'Treinamentos', valor: 19.93, tipo: 'despesa', data: '27/07/2026', data_iso: '2026-07-27', mes: 'Julho' }
];


// MOCK DATA INICIAL E DECLARAÃ‡Ã•ES GLOBAIS
const MOCK_DATA_INITIAL = {
    associados: [
        { id: '1', cpf: '000.000.000-00', senha: '123', nome: 'Diretoria ACBCSJ', nome_guerra: 'Diretoria', perfil: 'diretoria', status: 'ativo', obm: 'SÃ£o JosÃ©', profissao: 'Diretoria' },
        { id: '2', cpf: '111.111.111-11', senha: '123', nome: 'Sd. Silva (Exemplo)', nome_guerra: 'Sd. Silva', perfil: 'associado', status: 'ativo', obm: 'SÃ£o JosÃ©', profissao: 'Bombeiro ComunitÃ¡rio' }
    ],
    financeiro: [],
    mensalidades: [],
    documentos: [
        { id: 'doc_1', titulo: 'Estatuto Social da ACBCSJ', categoria: 'Documentos Oficiais', visibilidade: 'todos', data: '15/01/2026', link: null, arquivo_nome: 'Estatuto_ACBCSJ.pdf' },
        { id: 'doc_2', titulo: 'Ata da ReuniÃ£o de Posse 2026', categoria: 'Atas', visibilidade: 'todos', data: '20/01/2026', link: null, arquivo_nome: 'Ata_Posse_2026.pdf' }
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
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    }
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    setupCPFMasks();
    setupNavigation();
});

function initMockData() {
    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    
    // Se estiver vazio ou contiver itens com codificação antiga desformatada, recarrega com dados limpos
    const needsReset = list.length === 0 || list.some(a => (a.obm && a.obm.includes('Ã')) || (a.cidade && a.cidade.includes('Ã')) || (a.nome && a.nome.includes('Ã')));

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

    localStorage.setItem('acbcsj_financeiro', JSON.stringify(INITIAL_LANCAMENTOS_DATA));
    localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify(INITIAL_MENSAL_DATA));
    localStorage.setItem('acbcsj_mensalidades', JSON.stringify(MOCK_DATA_INITIAL.mensalidades));
    localStorage.setItem('acbcsj_programacao', JSON.stringify(MOCK_DATA_INITIAL.programacao));
    localStorage.setItem('acbcsj_mensagens', JSON.stringify(MOCK_DATA_INITIAL.mensagens));

    // MIGRATION / CLEANUP DE DOCUMENTOS: Move arquivos pesados do localStorage para o IndexedDB para zerar o uso de cota do navegador
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
                console.warn('ConcluÃ­da limpeza do localStorage');
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
                alert('⚠️ ACESSO BLOQUEADO!\n\nSua solicitação de cadastro ainda está em análise pela Diretoria da ACBCSJ. Aguarde a aprovação para conseguir logar.');
                return;
            }

            if (found.status === 'desligado') {
                alert('🚫 ACESSO TOTALMENTE BLOQUEADO!\n\nEste cadastro consta como DESLIGADO da Associação Corpo de Bombeiros Comunitários de São José.\nIntegrantes desligados não possuem permissão de acesso ao sistema.');
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
        
        try {
            renderUserHeader();
            renderSidebarMenu();
            navigateTab(currentUser.perfil === 'diretoria' ? 'overview-diretoria' : 'overview-associado');
        } catch (uiErr) {
            console.error('Aviso ao carregar telas pós-login:', uiErr);
        }
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
    if (currentUser) {
        const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const currentDbState = list.find(a => a.cpf === currentUser.cpf);
        if (currentDbState && currentDbState.status === 'desligado') {
            alert('🚫 ACESSO REVOGADO!\n\nSeu cadastro consta como DESLIGADO da Associação. Você foi desconectado do sistema.');
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
    document.getElementById('metricTotalAssociados').textContent = totalAtivos;

    // 2. Novas Associações no Ano Selecionado
    const novosNoAno = associados.filter(a => {
        if (!a.data_cadastro) return false;
        return anoFiltro === 'todos' || a.data_cadastro.includes(anoFiltro);
    }).length;
    const elNovos = document.getElementById('metricNovosAno');
    if (elNovos) elNovos.textContent = novosNoAno;

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
    if (elDesligados) elDesligados.textContent = desligadosNoAno;

    // 4. Solicitações Pendentes
    document.getElementById('metricCadastrosPendentes').textContent = pendentes.length;

    // 5. Saldo em Caixa
    const totalReceitas = financeiro.filter(f => f.tipo === 'receita').reduce((sum, item) => sum + Number(item.valor), 0);
    const totalDespesas = financeiro.filter(f => f.tipo === 'despesa').reduce((sum, item) => sum + Number(item.valor), 0);
    const saldo = totalReceitas - totalDespesas;
    document.getElementById('metricSaldoCaixa').textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Tabela de aprovação rápida
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
                        <td><button class="btn btn-sm btn-gold" onclick="verFichaAssociado('${a.cpf}')">📋 Ver Ficha Completa</button></td>
                        <td>
                            ${!isSelf ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C; border-color:#E74C3C" onclick="abrirModalDesligar('${a.cpf}')">Desligar Associado</button>` : '<small style="color:var(--text-muted)">Você (Diretoria)</small>'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// FUNÇÃO PARA ALTERAR O PERFIL DO INTEGRANTE (APENAS DIRETORIA)
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
                        <span style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">${d.motivo_desligamento || 'Não especificado'}</span>
                        ${d.carta_desligamento_url ? `
                            <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 8px; color:var(--accent-gold); border-color:var(--accent-gold)" onclick="abrirCartaDesligamento('${d.cpf}')">
                                📄 Ver Carta de Desligamento
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
        alert('Associado não encontrado.');
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
        <div><b>OBM de Lotação:</b> <b style="color: var(--accent-gold);">${a.obm || '-'}</b></div>
        <div><b>Profissão:</b> ${a.profissao || '-'}</div>
        <div><b>Perfil no Portal:</b> <b style="color: var(--accent-gold);">${(a.perfil || 'associado').toUpperCase()}</b></div>
        
        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Filiação:</b></div>
        <div><b>Nome da Mãe:</b> ${a.nome_mae || '-'}</div>
        <div><b>Nome do Pai:</b> ${a.nome_pai || '-'}</div>

        <div style="grid-column: 1 / -1; margin-top:8px; border-top:1px dashed var(--border-color); padding-top:8px;"><b>Endereço Residencial:</b></div>
        <div><b>Logradouro / Rua:</b> ${a.logradouro || '-'}, Nº ${a.numero || '-'}</div>
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
                            📄 Baixar / Visualizar Carta (${a.carta_desligamento_nome || 'Arquivo'})
                        </button>
                    ` : '<i>Nenhuma carta anexada.</i>'}
                </div>
            </div>
        ` : ''}
    `;

    openModal('modalFichaAssociado');
}

// DESLIGAMENTO COM REGISTRO DE MOTIVO, CARTA DE DESLIGAMENTO (OPCIONAL) E DATA/HORA
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

    const agora = new Date();
    const dataHoraDesligamento = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const processarSalvarDesligamento = (fileDataUrl = null, fileName = null) => {
        let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
        const item = list.find(a => a.cpf === cpf);
        if (item) {
            item.status = 'desligado';
            item.data_desligamento = dataHoraDesligamento;
            item.motivo_desligamento = motivo;
            if (fileDataUrl) {
                item.carta_desligamento_url = fileDataUrl;
                item.carta_desligamento_nome = fileName;
            }

            localStorage.setItem('acbcsj_associados', JSON.stringify(list));
            dbService.saveAssociado(item);

            alert(`Associado ${item.nome_guerra || item.nome} foi desligado com sucesso em ${dataHoraDesligamento}.${fileDataUrl ? '\nA Carta de Desligamento foi salva e registrada no sistema.' : ''}`);
            closeModal('modalDesligarAssociado');
            renderGestaoAssociados();
            renderAssociadosDesligados();
            renderDiretoriaOverview();
        }
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            processarSalvarDesligamento(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    } else {
        processarSalvarDesligamento();
    }
}

// FUNÇÃO PARA ABRIR OU BAIXAR A CARTA DE DESLIGAMENTO
function abrirCartaDesligamento(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf);
    if (!a || !a.carta_desligamento_url) {
        alert('Carta de desligamento não encontrada.');
        return;
    }

    // Criar um link temporário para download ou visualização em nova aba
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
    if (confirm('Deseja reativar este associado no sistema? Ele voltará para a lista de Associados Ativos.')) {
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
    if (confirm('Tem certeza que deseja excluir este associado do sistema? Esta ação é permanente.')) {
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

// LÓGICA DO ASSOCIADO & GRÁFICOS

let chartBalanceteDoughnut = null;
let chartBalanceteMensalComparativo = null;
let chartMensalidadesPrevistoVsArrecadado = null;

function renderBalancetesAssociado() {
    const selAno = document.getElementById('selAnoTransparencia');
    const ano = selAno ? selAno.value : '2026';

    const lblsAno = document.querySelectorAll('.lblAnoTransparencia');
    lblsAno.forEach(el => el.textContent = ano);

    // 1. Carrega dados de Associados, Financeiro e Grid de Mensalidades para o Ano selecionado
    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = listAssociados.filter(a => a.status === 'ativo' || !a.status);
    const qtdAssociadosAtivos = ativos.length || 1;

    const financeiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const gridKey = `acbcsj_mensalidades_grid_${ano}`;
    const grid = JSON.parse(localStorage.getItem(gridKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];

    const mesesInfo = [
        { index: 1, key: 'jan', nome: 'Jan' },
        { index: 2, key: 'fev', nome: 'Fev' },
        { index: 3, key: 'mar', nome: 'Mar' },
        { index: 4, key: 'abr', nome: 'Abr' },
        { index: 5, key: 'mai', nome: 'Mai' },
        { index: 6, key: 'jun', nome: 'Jun' },
        { index: 7, key: 'jul', nome: 'Jul' },
        { index: 8, key: 'ago', nome: 'Ago' },
        { index: 9, key: 'set', nome: 'Set' },
        { index: 10, key: 'out', nome: 'Out' },
        { index: 11, key: 'nov', nome: 'Nov' },
        { index: 12, key: 'dez', nome: 'Dez' }
    ];

    const labelsMeses = mesesInfo.map(m => m.nome);
    const receitasPorMes = Array(12).fill(0);
    const despesasPorMes = Array(12).fill(0);
    const mensalidadesPrevistasPorMes = Array(12).fill(0);
    const mensalidadesArrecadadasPorMes = Array(12).fill(0);

    // Calcula mensalidades acumuladas da Grid do Ano por Mês
    mesesInfo.forEach((m, idx) => {
        let somaQuitadaMes = 0;
        grid.forEach(socio => {
            somaQuitadaMes += (parseFloat(socio[m.key]) || 0);
        });
        mensalidadesArrecadadasPorMes[idx] = somaQuitadaMes;

        // Tarifa base vigente para este mês/ano
        const tarifaVigenteMes = getValorMensalidadeVigente(m.index, ano);
        mensalidadesPrevistasPorMes[idx] = qtdAssociadosAtivos * tarifaVigenteMes;
    });

    // Filtra receitas e despesas lançadas no livro financeiro para o ano selecionado
    financeiro.forEach(f => {
        const parsed = extrairMesEAno(f.data, f.data_iso);
        const fAno = parsed.ano || (f.data_iso ? f.data_iso.substring(0, 4) : '2026');
        
        if (fAno === ano) {
            const mIndex = parseInt(parsed.mes, 10);
            if (mIndex >= 1 && mIndex <= 12) {
                const idx = mIndex - 1;
                const val = parseFloat(f.valor) || 0;
                if (f.tipo === 'receita') {
                    receitasPorMes[idx] += val;
                } else if (f.tipo === 'despesa') {
                    despesasPorMes[idx] += val;
                }
            }
        }
    });

    // Totais Consolidados do Ano
    const totalReceitasAno = receitasPorMes.reduce((a, b) => a + b, 0);
    const totalDespesasAno = despesasPorMes.reduce((a, b) => a + b, 0);
    const saldoAno = totalReceitasAno - totalDespesasAno;

    const totalPrevistoMensalidadesAno = mensalidadesPrevistasPorMes.reduce((a, b) => a + b, 0);
    const totalArrecadadoMensalidadesAno = mensalidadesArrecadadasPorMes.reduce((a, b) => a + b, 0);
    const percEficiencia = totalPrevistoMensalidadesAno > 0 ? ((totalArrecadadoMensalidadesAno / totalPrevistoMensalidadesAno) * 100).toFixed(1) : '100.0';

    // Atualiza elementos de métricas
    const elRec = document.getElementById('transpMetricReceitas');
    const elDes = document.getElementById('transpMetricDespesas');
    const elSal = document.getElementById('transpMetricSaldo');
    const elEfi = document.getElementById('transpMetricEficiencia');

    if (elRec) elRec.textContent = `R$ ${totalReceitasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDes) elDes.textContent = `R$ ${totalDespesasAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSal) {
        elSal.textContent = `R$ ${saldoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSal.style.color = saldoAno >= 0 ? '#2ECC71' : '#E74C3C';
    }
    if (elEfi) elEfi.textContent = `${percEficiencia}%`;

    // 2. Renderiza Gráfico 1: Receitas vs Despesas Mês a Mês (Barras)
    const ctxBarComp = document.getElementById('chartBalanceteMensalComparativo');
    if (ctxBarComp && typeof Chart !== 'undefined') {
        if (chartBalanceteMensalComparativo) chartBalanceteMensalComparativo.destroy();
        chartBalanceteMensalComparativo = new Chart(ctxBarComp, {
            type: 'bar',
            data: {
                labels: labelsMeses,
                datasets: [
                    {
                        label: 'Receitas (Entradas)',
                        data: receitasPorMes,
                        backgroundColor: '#2ECC71',
                        borderRadius: 4
                    },
                    {
                        label: 'Despesas (Saídas)',
                        data: despesasPorMes,
                        backgroundColor: '#E74C3C',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#F4F5F7', font: { size: 11 } } }
                },
                scales: {
                    x: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }

    // 3. Renderiza Gráfico 2: Mensalidades - Previsto vs Recebido (Barras)
    const ctxBarMensal = document.getElementById('chartMensalidadesPrevistoVsArrecadado');
    if (ctxBarMensal && typeof Chart !== 'undefined') {
        if (chartMensalidadesPrevistoVsArrecadado) chartMensalidadesPrevistoVsArrecadado.destroy();
        chartMensalidadesPrevistoVsArrecadado = new Chart(ctxBarMensal, {
            type: 'bar',
            data: {
                labels: labelsMeses,
                datasets: [
                    {
                        label: 'Previsto (Meta)',
                        data: mensalidadesPrevistasPorMes,
                        backgroundColor: '#3498DB',
                        borderRadius: 4
                    },
                    {
                        label: 'Recebido (Arrecadado)',
                        data: mensalidadesArrecadadasPorMes,
                        backgroundColor: '#2ECC71',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#F4F5F7', font: { size: 11 } } }
                },
                scales: {
                    x: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#A0AEC0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }

    // 4. Renderiza Gráfico 3: Rosca Proporcional do Ano (Entradas vs Saídas)
    const ctxDoughnut = document.getElementById('chartBalancete');
    if (ctxDoughnut && typeof Chart !== 'undefined') {
        if (chartBalanceteDoughnut) chartBalanceteDoughnut.destroy();
        chartBalanceteDoughnut = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Entradas / Receitas', 'Saídas / Despesas'],
                datasets: [{
                    data: [totalReceitasAno, totalDespesasAno],
                    backgroundColor: ['#2ECC71', '#E74C3C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#F4F5F7', font: { size: 11 } } }
                }
            }
        });
    }

    // 5. Preenche Tabela de Demonstrativos Mensais e Balancetes Oficiais
    const tbodyTransp = document.getElementById('tableBalancetesMensaisTransparencia');
    if (tbodyTransp) {
        const nomesMesesCompletos = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        
        tbodyTransp.innerHTML = nomesMesesCompletos.map((mNome, idx) => {
            const mIndexStr = String(idx + 1).padStart(2, '0');
            const rec = receitasPorMes[idx];
            const des = despesasPorMes[idx];
            const mesSaldo = rec - des;
            
            const prevMensal = mensalidadesPrevistasPorMes[idx];
            const arrMensal = mensalidadesArrecadadasPorMes[idx];
            const percMensal = prevMensal > 0 ? Math.round((arrMensal / prevMensal) * 100) : 100;

            return `
                <tr>
                    <td><b>${mIndexStr} - ${mNome} / ${ano}</b></td>
                    <td style="color: #2ECC71; font-weight: 600;">R$ ${rec.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>
                        <b>R$ ${arrMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>
                        <small style="color: var(--text-muted);"> / R$ ${prevMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${percMensal}%)</small>
                    </td>
                    <td style="color: #E74C3C; font-weight: 600;">R$ ${des.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="font-weight: 700; color: ${mesSaldo >= 0 ? '#2ECC71' : '#E74C3C'};">
                        R$ ${mesSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 8px;" onclick="abrirModalBalanceteMensal('${mIndexStr}', '${ano}')">
                            📄 Abrir Balancete
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function renderDocumentos() {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const isDiretoria = currentUser && currentUser.perfil === 'diretoria';
    
    // Renderiza botão de inserção de documentos apenas para a Diretoria
    const actionContainer = document.getElementById('headerDocsAction');
    if (actionContainer) {
        if (isDiretoria) {
            actionContainer.innerHTML = `<button class="btn btn-gold" onclick="openModal('modalNovoDocumento')">➕ Inserir Novo Documento</button>`;
        } else {
            actionContainer.innerHTML = '';
        }
    }

    // Filtra documentos: se for associado comum, oculta os restritos à Diretoria
    const docsFiltrados = isDiretoria ? docs : docs.filter(d => d.visibilidade !== 'diretoria');

    const container = document.getElementById('listDocsAssociado');
    if (container) {
        if (docsFiltrados.length === 0) {
            container.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">Nenhum documento disponível no momento.</div>`;
        } else {
            const hoje = new Date().toISOString().split('T')[0];

            container.innerHTML = docsFiltrados.map(d => {
                // Cálculo de Vencimento
                let vencimentoBadge = '';
                if (d.data_vencimento) {
                    const isVencido = d.data_vencimento < hoje;
                    const dataFmt = d.data_vencimento.split('-').reverse().join('/');
                    if (isVencido) {
                        vencimentoBadge = `<span style="color: #E74C3C; font-weight: bold; margin-left: 8px;">⚠️ Vencido em ${dataFmt}</span>`;
                    } else {
                        vencimentoBadge = `<span style="color: var(--text-muted); margin-left: 8px;">📅 Vence em: ${dataFmt}</span>`;
                    }
                } else {
                    vencimentoBadge = `<span style="color: var(--text-muted); margin-left: 8px;">Sem vencimento</span>`;
                }

                // Badge de Visibilidade
                const visibBadge = d.visibilidade === 'diretoria' 
                    ? `<span class="badge badge-warning" style="margin-left: 6px;">🔒 Apenas Diretoria</span>` 
                    : `<span class="badge badge-info" style="margin-left: 6px;">🌐 Todos</span>`;

                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid var(--border-color); flex-wrap:wrap; gap:12px;">
                        <div>
                            <div style="font-size:15px; font-weight:bold; color:var(--text-main);">
                                ${d.titulo}
                                <span class="badge badge-warning" style="margin-left:8px; background:rgba(255,215,0,0.15); color:var(--accent-gold);">${d.categoria || 'Geral'}</span>
                                ${visibBadge}
                            </div>
                            <div style="font-size:12px; margin-top:4px;">
                                <span style="color:var(--text-muted)">Publicado em: ${d.data || '-'}</span>
                                ${vencimentoBadge}
                            </div>
                        </div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap;">
                            <button class="btn btn-sm btn-outline" onclick="abrirDocumento('${d.id}')">📖 Visualizar / Download</button>
                            ${isDiretoria ? `<button class="btn btn-sm btn-outline" style="color:var(--accent-gold); border-color:var(--accent-gold);" onclick="abrirModalEditarDoc('${d.id}')">✏️ Editar Categoria/Acesso</button>` : ''}
                            ${isDiretoria ? `<button class="btn btn-sm btn-outline" style="color:#E74C3C;" onclick="excluirDocumento('${d.id}')">🗑️ Excluir</button>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function abrirModalEditarDoc(id) {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const d = docs.find(item => item.id === id);
    if (!d) return;

    document.getElementById('editDocId').value = d.id;
    document.getElementById('editDocTitulo').value = d.titulo || '';
    document.getElementById('editDocCategoria').value = d.categoria || 'Atas';
    document.getElementById('editDocVisibilidade').value = d.visibilidade || 'todos';
    document.getElementById('editDocDataVencimento').value = d.data_vencimento || '';
    const fileInput = document.getElementById('editDocArquivo');
    if (fileInput) fileInput.value = '';

    openModal('modalEditarDocumento');
}

function salvarEdicaoDocumento(e) {
    e.preventDefault();
    const id = document.getElementById('editDocId').value;
    const titulo = document.getElementById('editDocTitulo').value.trim();
    const categoria = document.getElementById('editDocCategoria').value;
    const visibilidade = document.getElementById('editDocVisibilidade').value;
    const dataVencimento = document.getElementById('editDocDataVencimento').value;
    const fileInput = document.getElementById('editDocArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const index = docs.findIndex(d => d.id === id);
    if (index >= 0) {
        docs[index].titulo = titulo;
        docs[index].categoria = categoria;
        docs[index].visibilidade = visibilidade;
        docs[index].data_vencimento = dataVencimento || null;

        const concluirSalvar = () => {
            try {
                localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
            } catch (err) {
                console.warn('Salvo com metadados no sistema.');
            }
            try {
                dbService.saveDocumento(docs[index]);
            } catch (e) {
                console.warn('Erro ao salvar no banco:', e);
            }
            alert('Documento e permissões atualizados com sucesso!');
            closeModal('modalEditarDocumento');
            renderDocumentos();
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = async function (event) {
                const fileDataUrl = event.target.result;
                docs[index].arquivo_nome = file.name;
                docs[index].link = null; // Mantém nulo no localStorage para evitar estouro da quota de 5MB
                await idbStorage.setFile(id, fileDataUrl);
                concluirSalvar();
            };
            reader.readAsDataURL(file);
        } else {
            concluirSalvar();
        }
    }
}

function salvarNovoDocumento(e) {
    e.preventDefault();
    const titulo = document.getElementById('docTitulo').value.trim();
    const categoria = document.getElementById('docCategoria').value;
    const visibilidade = document.getElementById('docVisibilidade').value;
    const dataVencimento = document.getElementById('docDataVencimento').value;
    const fileInput = document.getElementById('docArquivo');
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!titulo || !categoria || !file) {
        alert('Por favor, preencha o título, selecione a categoria e anexe o arquivo do documento.');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Salvando...';
    }

    const docId = 'doc_' + Date.now();
    const reader = new FileReader();
    reader.onload = async function (event) {
        const fileDataUrl = event.target.result;
        const fileName = file.name;

        // Salva o arquivo pesado no IndexedDB sem limites do localStorage
        await idbStorage.setFile(docId, fileDataUrl);

        let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        const novoDoc = {
            id: docId,
            titulo: titulo,
            categoria: categoria,
            visibilidade: visibilidade,
            data_vencimento: dataVencimento || null,
            data: new Date().toLocaleDateString('pt-BR'),
            link: null, // Conteúdo do arquivo salvo no IndexedDB
            arquivo_nome: fileName
        };

        docs.unshift(novoDoc);

        try {
            localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
        } catch (err) {
            console.warn('Metadados salvos');
        }

        try {
            dbService.saveDocumento(novoDoc);
        } catch (e) {
            console.warn('Erro ao salvar no banco:', e);
        }

        alert(`Documento "${titulo}" publicado com sucesso!`);
        e.target.reset();
        closeModal('modalNovoDocumento');
        renderDocumentos();

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publicar Documento';
        }
    };

    reader.readAsDataURL(file);
}

async function abrirDocumento(id) {
    const docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
    const doc = docs.find(d => d.id === id);
    if (!doc) {
        alert('Documento não encontrado.');
        return;
    }

    let fileContent = doc.link;
    if (!fileContent) {
        fileContent = await idbStorage.getFile(id);
    }

    if (!fileContent) {
        alert('Arquivo do documento não disponível para visualização.');
        return;
    }

    if (fileContent.startsWith('data:')) {
        const win = window.open();
        if (win) {
            win.document.write(`
                <html>
                    <head><title>${doc.titulo} - ACBCSJ</title></head>
                    <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                        <iframe src="${fileContent}" style="width:100%; height:100vh; border:none;"></iframe>
                    </body>
                </html>
            `);
        } else {
            const a = document.createElement('a');
            a.href = fileContent;
            a.download = doc.arquivo_nome || `${doc.titulo}.pdf`;
            a.click();
        }
    } else {
        window.open(fileContent, '_blank');
    }
}

async function excluirDocumento(id) {
    if (confirm('Deseja realmente excluir este documento do repositório?')) {
        let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        docs = docs.filter(d => d.id !== id);
        try {
            localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
        } catch (err) {}
        await idbStorage.deleteFile(id);
        alert('Documento excluído com sucesso.');
        renderDocumentos();
    }
}


// GESTÃO DE MENSAGENS E COMUNICADOS PELA DIRETORIA
let abaMensagensAtiva = 'recebidas';

function alternarAbaMensagensDiretoria(aba) {
    abaMensagensAtiva = aba;
    const btnRec = document.getElementById('btnTabMsgsRecebidas');
    const btnEnv = document.getElementById('btnTabMsgsEnviadas');

    if (btnRec && btnEnv) {
        if (aba === 'recebidas') {
            btnRec.className = 'btn btn-sm btn-gold';
            btnEnv.className = 'btn btn-sm btn-outline';
        } else {
            btnRec.className = 'btn btn-sm btn-outline';
            btnEnv.className = 'btn btn-sm btn-gold';
        }
    }

    renderMensagensDiretoria();
}

function renderMensagensDiretoria() {
    const container = document.getElementById('listMensagensDiretoria');
    if (!container) return;

    if (abaMensagensAtiva === 'recebidas') {
        const msgs = JSON.parse(localStorage.getItem('acbcsj_mensagens')) || [];
        if (msgs.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <p style="font-size: 14px;">📥 Nenhuma mensagem recebida de associados até o momento.</p>
                </div>
            `;
        } else {
            container.innerHTML = msgs.map(m => `
                <div class="card" style="margin-bottom: 12px; border-left: 4px solid var(--accent-gold);">
                    <div style="display:flex; justify-content:space-between; align-items: center; margin-bottom: 6px;">
                        <b style="font-size: 15px; color: var(--accent-gold);">${m.assunto || 'Sem assunto'}</b>
                        <small style="color:var(--text-muted); font-size: 11px;">📅 ${m.data || '-'}</small>
                    </div>
                    <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                        👤 Enviado por: <b style="color: #fff;">${m.associado_nome || 'Associado'}</b>
                    </div>
                    <p style="font-size:13px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; white-space: pre-wrap; margin: 0;">${m.conteudo || m.mensagem || ''}</p>
                </div>
            `).join('');
        }
    } else {
        const comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        if (comunicados.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    <p style="font-size: 14px;">📤 Nenhum comunicado encaminhado pela Diretoria até o momento.</p>
                    <button class="btn btn-gold btn-sm" style="margin-top: 10px;" onclick="abrirModalEnviarComunicado()">✉️ Encaminhar Primeiro Comunicado</button>
                </div>
            `;
        } else {
            container.innerHTML = comunicados.map(c => {
                let badgePrio = '<span class="badge badge-info">🟢 Informativo</span>';
                if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning">🟡 Importante</span>';
                if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger">🔴 Urgente</span>';

                return `
                    <div class="card" style="margin-bottom: 12px; border-left: 4px solid #3498DB;">
                        <div style="display:flex; justify-content:space-between; align-items: center; margin-bottom: 6px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="font-size: 15px; color: var(--accent-gold);">${c.assunto}</b>
                                ${badgePrio}
                            </div>
                            <small style="color:var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                        </div>
                        <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                            👥 Destinatários: <b style="color: #3498DB;">${c.destinatarios_resumo}</b>
                        </div>
                        <p style="font-size:13px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; white-space: pre-wrap; margin: 0 0 10px 0;">${c.mensagem}</p>
                        <div style="display: flex; justify-content: flex-end;">
                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px; color: #E74C3C; border-color: #E74C3C;" onclick="excluirComunicadoEnviado('${c.id}')">🗑️ Excluir Comunicado</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function abrirModalEnviarComunicado() {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = list.filter(a => a.status === 'ativo' || !a.status);

    // Preenche select individual
    const selectUnico = document.getElementById('comunicadoAssociadoUnico');
    if (selectUnico) {
        selectUnico.innerHTML = ativos.map(a => `
            <option value="${a.cpf}">${a.nome_guerra || a.nome} (CPF: ${a.cpf})</option>
        `).join('');
    }

    // Preenche checkboxes para seleção de vários
    const containerCheck = document.getElementById('checkboxesAssociadosComunicado');
    if (containerCheck) {
        containerCheck.innerHTML = ativos.map(a => `
            <label style="font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.03); padding: 4px 6px; border-radius: 4px;">
                <input type="checkbox" name="comunicadoMesesAssociados" value="${a.cpf}">
                <span>${a.nome_guerra || a.nome}</span>
            </label>
        `).join('');
    }

    const elAssunto = document.getElementById('comunicadoAssunto');
    if (elAssunto) elAssunto.value = '';

    const elMensagem = document.getElementById('comunicadoMensagem');
    if (elMensagem) elMensagem.value = '';

    const elTipo = document.getElementById('comunicadoTipoDestinatario');
    if (elTipo) elTipo.value = 'todos';

    const elPrioridade = document.getElementById('comunicadoPrioridade');
    if (elPrioridade) elPrioridade.value = 'Informativo';

    toggleTipoDestinatario('todos');
    openModal('modalEnviarComunicado');
}

function toggleTipoDestinatario(tipo) {
    const divInd = document.getElementById('divDestinatarioIndividual');
    const divMult = document.getElementById('divDestinatariosMultiplos');

    if (divInd) divInd.style.display = tipo === 'individual' ? 'block' : 'none';
    if (divMult) divMult.style.display = tipo === 'selecao' ? 'block' : 'none';
}

let todosMarcadosComunicado = false;
function marcarDesmarcarTodosComunicado() {
    todosMarcadosComunicado = !todosMarcadosComunicado;
    const checkboxes = document.querySelectorAll('input[name="comunicadoMesesAssociados"]');
    checkboxes.forEach(cb => cb.checked = todosMarcadosComunicado);
}

function salvarNovoComunicado(e) {
    e.preventDefault();
    const tipo = document.getElementById('comunicadoTipoDestinatario').value;
    const assunto = document.getElementById('comunicadoAssunto').value.trim();
    const prioridade = document.getElementById('comunicadoPrioridade').value;
    const mensagem = document.getElementById('comunicadoMensagem').value.trim();

    if (!assunto || !mensagem) {
        alert('Por favor, informe o assunto e a mensagem.');
        return;
    }

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    let cpfsDestinatarios = [];
    let resumoDestinatarios = '';

    if (tipo === 'todos') {
        cpfsDestinatarios = ['TODOS'];
        resumoDestinatarios = '📢 Todos os Associados Ativos';
    } else if (tipo === 'individual') {
        const cpfSel = document.getElementById('comunicadoAssociadoUnico').value;
        const assoc = listAssociados.find(a => a.cpf === cpfSel);
        if (!assoc) {
            alert('Por favor, selecione um associado destinatário.');
            return;
        }
        cpfsDestinatarios = [cpfSel];
        resumoDestinatarios = `👤 ${assoc.nome_guerra || assoc.nome} (${assoc.cpf})`;
    } else if (tipo === 'selecao') {
        const checked = Array.from(document.querySelectorAll('input[name="comunicadoMesesAssociados"]:checked'));
        if (checked.length === 0) {
            alert('Por favor, selecione ao menos um associado para receber esta mensagem.');
            return;
        }
        cpfsDestinatarios = checked.map(c => c.value);
        const nomesSel = cpfsDestinatarios.map(cpf => {
            const a = listAssociados.find(item => item.cpf === cpf);
            return a ? (a.nome_guerra || a.nome) : cpf;
        });
        resumoDestinatarios = `👥 ${checked.length} integrantes selecionados (${nomesSel.slice(0, 3).join(', ')}${checked.length > 3 ? '...' : ''})`;
    }

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novoComunicado = {
        id: 'comunicado_' + Date.now(),
        remetente_cpf: currentUser.cpf,
        remetente_nome: currentUser.nome_guerra || currentUser.nome || 'Diretoria ACBCSJ',
        destinatario_tipo: tipo,
        destinatarios_cpfs: cpfsDestinatarios,
        destinatarios_resumo: resumoDestinatarios,
        assunto: assunto,
        prioridade: prioridade,
        mensagem: mensagem,
        data: dataFormatada
    };

    let comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    comunicados.unshift(novoComunicado);
    localStorage.setItem('acbcsj_comunicados_enviados', JSON.stringify(comunicados));

    alert(`Comunicado "${assunto}" encaminhado com sucesso para ${resumoDestinatarios}!`);
    closeModal('modalEnviarComunicado');
    alternarAbaMensagensDiretoria('enviadas');
}

function excluirComunicadoEnviado(id) {
    if (confirm('Deseja realmente remover este comunicado enviado?')) {
        let comunicados = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        comunicados = comunicados.filter(c => c.id !== id);
        localStorage.setItem('acbcsj_comunicados_enviados', JSON.stringify(comunicados));
        alert('Comunicado removido.');
        renderMensagensDiretoria();
    }
}

// PRÉ-CADASTRO E ENVIOS
function toggleSemPai(checkbox) {
    const inputPai = document.getElementById('regNomePai');
    if (checkbox.checked) {
        inputPai.value = 'Sem registro paterno / Não declarado';
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
    const dataHoraCadastro = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Captura dos campos na ordem exigida
    const nomeGuerra = document.getElementById('regNomeGuerra').value.trim();
    const nomeCompleto = document.getElementById('regNomeCompleto').value.trim();
    const dataNascimento = document.getElementById('regDataNascimento').value;
    const cpf = document.getElementById('regCPF').value.trim();
    const nomeMae = document.getElementById('regNomeMae').value.trim();
    const semPai = document.getElementById('regSemPai').checked;
    const nomePai = semPai ? 'Sem registro paterno / Não declarado' : (document.getElementById('regNomePai').value.trim() || 'Não declarado');
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
        alert('Por favor, selecione a OBM de Lotação.');
        return;
    }

    if (!profissao) {
        alert('Por favor, preencha o campo Profissão.');
        return;
    }

    if (!termoAceito) {
        alert('Você precisa aceitar os Termos de Responsabilidade para enviar a solicitação.');
        return;
    }

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    if (list.find(a => a.cpf === cpf)) {
        alert('Este CPF já possui uma solicitação ou cadastro ativo no sistema da ACBCSJ.');
        return;
    }

    // Geração automática de senha: os 4 primeiros dígitos numéricos do CPF
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

    alert(`Solicitação de cadastro de ${nomeGuerra} (${nomeCompleto}) enviada com sucesso em ${dataHoraCadastro}!\n\n⚠️ O acesso estará BLOQUEADO até a APROVAÇÃO pela Diretoria.\n🔑 Após a aprovação, sua senha de acesso será os 4 primeiros dígitos do seu CPF (${senhaAutomatica}).`);
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
    }
}

function excluirLancamentoFinanceiro(id) {
    if (confirm('Deseja realmente remover este lançamento financeiro?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(item => item.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));
        idbStorage.deleteFile(id);
        alert('Lançamento removido com sucesso.');
        renderGestaoFinanceira();
    }
}

async function abrirComprovanteLancamento(id) {
    const fileContent = await idbStorage.getFile(id);
    if (!fileContent) {
        alert('Comprovante não disponível para este lançamento.');
        return;
    }
    const win = window.open();
    if (win) {
        win.document.write(`
            <html>
                <head><title>Comprovante Financeiro - ACBCSJ</title></head>
                <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <iframe src="${fileContent}" style="width:100%; height:100vh; border:none;"></iframe>
                </body>
            </html>
        `);
    } else {
        alert('Visualização bloqueada pelo navegador.');
    }
}

function extrairMesEAno(dataStr, dataIso) {
    let str = dataIso || dataStr || '';
    if (!str) return { mes: '', ano: '' };

    // Formato YYYY-MM-DD
    if (str.includes('-')) {
        const parts = str.split('-');
        if (parts.length >= 3) {
            return {
                ano: parts[0].trim(),
                mes: String(parts[1]).padStart(2, '0')
            };
        }
    }

    // Formato DD/MM/YYYY
    if (str.includes('/')) {
        const parts = str.split('/');
        if (parts.length >= 3) {
            return {
                ano: parts[2].trim(),
                mes: String(parts[1]).padStart(2, '0')
            };
        }
    }

    return { mes: '', ano: '' };
}

function renderGestaoFinanceira() {
    const listFinanceiro = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const listMensalidades = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];

    const filtroAnoSelect = document.getElementById('finFiltroAno');
    const anoSelected = filtroAnoSelect ? filtroAnoSelect.value : '2026';

    const filtroMesSelect = document.getElementById('finFiltroMes');
    const mesSelected = filtroMesSelect ? filtroMesSelect.value : 'todos';

    const filtroTipoSelect = document.getElementById('finFiltroTipo');
    const filtroTipo = filtroTipoSelect ? filtroTipoSelect.value : 'todos';

    // Atualiza rótulos de ano no DOM
    document.querySelectorAll('.lblAnoFinanceiro').forEach(el => el.textContent = anoSelected);

    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    const storageKeyGrid = `acbcsj_mensalidades_grid_${anoSelected}`;
    const gridMensalidades = JSON.parse(localStorage.getItem(storageKeyGrid)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];

    // 1. CONSTRÓI LISTA COMBINADA DE TODOS OS LANÇAMENTOS (FINANCEIRO + MENSALIDADES)
    let combinedList = [];

    // A) Lançamentos gerais do caixa
    listFinanceiro.forEach(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        combinedList.push({
            id: item.id || ('fin_' + Math.random()),
            data: item.data || '-',
            data_iso: item.data_iso || '',
            mes: dateInfo.mes,
            ano: dateInfo.ano || anoSelected,
            descricao: item.descricao || 'Sem descrição',
            categoria: item.categoria || 'Geral',
            tipo: item.tipo || 'despesa', // receita ou despesa
            valor: parseFloat(item.valor) || 0,
            comprovante_nome: item.comprovante_nome || '',
            origem: 'financeiro'
        });
    });

    // B) Lançamentos de Mensalidades PIX
    listMensalidades.forEach(m => {
        const dateInfo = extrairMesEAno(m.data, m.data_iso);
        const anoItem = m.ano || dateInfo.ano || anoSelected;
        combinedList.push({
            id: m.id || ('mens_' + Math.random()),
            data: m.data || '-',
            data_iso: m.data_iso || '',
            mes: dateInfo.mes,
            ano: anoItem,
            descricao: `💳 Mensalidade PIX — ${m.associado_nome || 'Associado'} (${m.meses_quitados || ''}/${anoItem})`,
            categoria: 'Mensalidades Associados',
            tipo: 'receita',
            valor: parseFloat(m.valor) || 0,
            comprovante_nome: m.comprovante_pix || '',
            origem: 'mensalidade'
        });
    });

    // 2. PROCESSA DEMONSTRATIVO & LEVANTAMENTO MENSAL (12 MESES DO EXERCÍCIO)
    const containerLevantamento = document.getElementById('tableLevantamentoMensalBody');
    let demonstrativoMensal = [];

    for (let i = 1; i <= 12; i++) {
        const strMes = String(i).padStart(2, '0');
        const nomeMes = mesesNomes[i - 1];
        const mKey = mesesKeys[i - 1];

        // Sum Receitas Gerais (excluindo mensalidades)
        let recsGerais = combinedList
            .filter(item => item.origem === 'financeiro' && item.tipo === 'receita' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

        // Sum Mensalidades PIX (do histórico de transações OU da grade anual)
        let mensPixHistorico = combinedList
            .filter(item => item.origem === 'mensalidade' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

        let mensPixGrid = gridMensalidades.reduce((sum, g) => sum + (parseFloat(g[mKey]) || 0), 0);

        // Usa o valor da grade ou histórico para consistência total
        let mensPix = Math.max(mensPixHistorico, mensPixGrid);

        // Sum Despesas Gerais
        let despsGerais = combinedList
            .filter(item => item.tipo === 'despesa' && item.ano === anoSelected && item.mes === strMes)
            .reduce((sum, item) => sum + item.valor, 0);

        const saldoMes = (recsGerais + mensPix) - despsGerais;
        const temMovimento = (recsGerais + mensPix + despsGerais) > 0;

        demonstrativoMensal.push({
            mesNum: strMes,
            mesIndex: i,
            nomeMes: nomeMes,
            receitasGerais: recsGerais,
            mensalidadesPix: mensPix,
            despesas: despsGerais,
            saldo: saldoMes,
            temMovimento: temMovimento
        });
    }

    if (containerLevantamento) {
        containerLevantamento.innerHTML = demonstrativoMensal.map(d => {
            const isMesSelecionado = mesSelected === d.mesNum;
            const bgRow = isMesSelecionado ? 'background: rgba(241, 196, 15, 0.2); font-weight: bold; border-left: 4px solid var(--accent-gold);' : '';
            return `
                <tr style="${bgRow}">
                    <td style="text-align: left;">
                        <b>${d.nomeMes} / ${anoSelected}</b> ${isMesSelecionado ? '<span class="badge badge-gold" style="font-size:9px;">SELECIONADO</span>' : ''}
                    </td>
                    <td style="color: #2ECC71;">R$ ${d.receitasGerais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="color: #3498DB; font-weight: bold;">R$ ${d.mensalidadesPix.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="color: #E74C3C;">R$ ${d.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td style="font-weight: 700; color: ${d.saldo >= 0 ? '#2ECC71' : '#E74C3C'};">
                        ${d.saldo >= 0 ? '+' : ''} R$ ${d.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <span class="badge badge-${d.temMovimento ? 'info' : 'secondary'}" style="font-size: 10px;">
                            ${d.temMovimento ? '🟢 FECHADO' : '⚪ SEM MOV.'}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 4px; justify-content: center;">
                            <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px;" onclick="filtrarExtratoMes('${d.mesNum}')">🔍 Ver Mês</button>
                            <button class="btn btn-sm btn-gold" style="padding: 2px 6px; font-size: 11px;" onclick="gerarBalanceteMensal(${d.mesIndex}, '${anoSelected}')">📄 Balancete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // 3. CALCULA MÉTRICAS DO PERÍODO SELECIONADO (MÊS OU ANO)
    let totalReceitasPer = 0;
    let totalMensalidadesPer = 0;
    let totalDespesasPer = 0;

    if (mesSelected === 'todos') {
        totalReceitasPer = demonstrativoMensal.reduce((s, d) => s + d.receitasGerais, 0);
        totalMensalidadesPer = demonstrativoMensal.reduce((s, d) => s + d.mensalidadesPix, 0);
        totalDespesasPer = demonstrativoMensal.reduce((s, d) => s + d.despesas, 0);
    } else {
        const itemM = demonstrativoMensal.find(d => d.mesNum === mesSelected);
        if (itemM) {
            totalReceitasPer = itemM.receitasGerais;
            totalMensalidadesPer = itemM.mensalidadesPix;
            totalDespesasPer = itemM.despesas;
        }
    }

    const saldoPer = (totalReceitasPer + totalMensalidadesPer) - totalDespesasPer;
    const strPeriodo = mesSelected === 'todos' ? `Ano ${anoSelected}` : `${mesesNomes[parseInt(mesSelected, 10) - 1]} / ${anoSelected}`;

    document.querySelectorAll('.lblPeriodoFinanceiro').forEach(el => el.textContent = strPeriodo);

    const elReceita = document.getElementById('finTotalReceitas');
    const elMensalidades = document.getElementById('finTotalMensalidadesAno');
    const elDespesa = document.getElementById('finTotalDespesas');
    const elSaldo = document.getElementById('finSaldoAtual');

    if (elReceita) elReceita.textContent = `R$ ${totalReceitasPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elMensalidades) elMensalidades.textContent = `R$ ${totalMensalidadesPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elDespesa) elDespesa.textContent = `R$ ${totalDespesasPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elSaldo) {
        elSaldo.textContent = `R$ ${saldoPer.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elSaldo.style.color = saldoPer >= 0 ? 'var(--accent-gold)' : '#E74C3C';
    }

    // 4. RENDERIZA A TABELA DE EXTRATO DE LANÇAMENTOS COMBINADOS (FINANCEIRO + MENSALIDADES)
    const container = document.getElementById('tableFinanceiroBody');
    if (container) {
        let filtrados = combinedList;

        // Filtra por Exercício / Ano
        filtrados = filtrados.filter(i => i.ano === anoSelected);

        // Filtra por Período / Mês
        if (mesSelected !== 'todos') {
            filtrados = filtrados.filter(i => i.mes === mesSelected);
        }

        // Filtra por Tipo (todos, receita, despesa)
        if (filtroTipo !== 'todos') {
            filtrados = filtrados.filter(i => i.tipo === filtroTipo);
        }

        if (filtrados.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum lançamento financeiro ou mensalidade encontrada para o período (${strPeriodo}) com os filtros selecionados.</td></tr>`;
        } else {
            container.innerHTML = filtrados.map(item => `
                <tr style="${item.origem === 'mensalidade' ? 'background: rgba(52, 152, 219, 0.05);' : ''}">
                    <td><b>${item.data || '-'}</b></td>
                    <td>${item.descricao}</td>
                    <td><span class="badge badge-${item.origem === 'mensalidade' ? 'primary' : 'info'}">${item.categoria}</span></td>
                    <td>
                        <span class="badge badge-${item.tipo === 'receita' ? 'success' : 'danger'}">
                            ${item.tipo === 'receita' ? '➕ RECEITA' : '➖ DESPESA'}
                        </span>
                    </td>
                    <td style="font-weight: 700; color: ${item.tipo === 'receita' ? '#2ECC71' : '#E74C3C'};">
                        ${item.tipo === 'receita' ? '+' : '-'} R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <div style="display:flex; gap:6px;">
                            ${item.origem === 'mensalidade' ? `
                                <span class="badge badge-success" style="font-size:10px;">💳 PIX Confirmado</span>
                            ` : `
                                ${item.comprovante_nome ? `<button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 6px; color:var(--accent-gold); border-color:var(--accent-gold);" onclick="abrirComprovanteLancamento('${item.id}')">📎 Recibo</button>` : ''}
                                <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 6px; color:#E74C3C; border-color:#E74C3C;" onclick="excluirLancamentoFinanceiro('${item.id}')">🗑️ Excluir</button>
                            `}
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// FILTRAR EXTRATO PELO BOTÃO DA TABELA DE LEVANTAMENTO MENSAL
function filtrarExtratoMes(strMes) {
    const filtroMesSelect = document.getElementById('finFiltroMes');
    if (filtroMesSelect) {
        filtroMesSelect.value = strMes;
        renderGestaoFinanceira();
    }
}

// GERAR BALANCETE MENSAL OFICIAL DA ACBCSJ
function gerarBalanceteMensal(mesIndex, anoStr) {
    const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const strMes = String(mesIndex).padStart(2, '0');
    const nomeMes = mesesNomes[mesIndex - 1];

    const list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const storageKeyGrid = `acbcsj_mensalidades_grid_${anoStr}`;
    const gridMensalidades = JSON.parse(localStorage.getItem(storageKeyGrid)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const mKey = mesesKeys[mesIndex - 1];

    // Receitas e Despesas do mês usando o parser universal de datas
    const lancamentosMes = list.filter(item => {
        const dateInfo = extrairMesEAno(item.data, item.data_iso);
        return dateInfo.mes === strMes && (dateInfo.ano === anoStr || !dateInfo.ano);
    });

    const receitasGerais = lancamentosMes.filter(i => i.tipo === 'receita');
    const despesasGerais = lancamentosMes.filter(i => i.tipo === 'despesa');

    const totalRecsGerais = receitasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);
    const totalMensalidades = gridMensalidades.reduce((s, g) => s + (parseFloat(g[mKey]) || 0), 0);
    const totalDespesas = despesasGerais.reduce((s, i) => s + (parseFloat(i.valor) || 0), 0);

    const totalReceitas = totalRecsGerais + totalMensalidades;
    const saldoFinal = totalReceitas - totalDespesas;

    const container = document.getElementById('conteudoBalanceteMensal');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; border-bottom: 2px solid var(--accent-gold); padding-bottom: 12px; margin-bottom: 15px;">
                <h2 style="color: var(--accent-gold); margin: 0; font-size: 18px;">ASSOCIAÇÃO CORPO DE BOMBEIROS COMUNITÁRIOS DE SÃO JOSÉ — ACBCSJ</h2>
                <h3 style="margin: 5px 0 0 0; font-size: 15px;">DEMONSTRATIVO DE BALANCETE MENSAL DE PRESTAÇÃO DE CONTAS</h3>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--text-muted);">Mês de Referência: <b>${nomeMes} / ${anoStr}</b></p>
            </div>

            <!-- ENTRADAS / RECEITAS -->
            <h4 style="color: #2ECC71; font-size: 14px; margin-bottom: 8px;">➕ RECEITAS & ENTRADAS DO MÊS:</h4>
            <table class="custom-table" style="font-size: 12px; margin-bottom: 15px;">
                <thead>
                    <tr>
                        <th>Origem / Categoria</th>
                        <th>Descrição</th>
                        <th style="text-align: right;">Valor (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Mensalidades de Associados (PIX)</b></td>
                        <td>Total Arrecadado na Grade de Mensalidades (${nomeMes}/${anoStr})</td>
                        <td style="text-align: right; color: #3498DB; font-weight: bold;">R$ ${totalMensalidades.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    ${receitasGerais.map(r => `
                        <tr>
                            <td><span class="badge badge-info">${r.categoria}</span></td>
                            <td>${r.descricao} (${r.data})</td>
                            <td style="text-align: right; color: #2ECC71; font-weight: bold;">R$ ${(parseFloat(r.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                    <tr style="background: rgba(46, 204, 113, 0.1); font-weight: bold;">
                        <td colspan="2">TOTAL GERAL DAS ENTRADAS</td>
                        <td style="text-align: right; color: #2ECC71;">R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tbody>
            </table>

            <!-- SAÍDAS / DESPESAS -->
            <h4 style="color: #E74C3C; font-size: 14px; margin-bottom: 8px;">➖ DESPESAS & SAÍDAS DO MÊS:</h4>
            <table class="custom-table" style="font-size: 12px; margin-bottom: 15px;">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Descrição / Favorecido</th>
                        <th style="text-align: right;">Valor (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    ${despesasGerais.length === 0 ? `
                        <tr><td colspan="3" style="text-align: center; color: var(--text-muted);">Nenhuma despesa registrada neste mês.</td></tr>
                    ` : despesasGerais.map(d => `
                        <tr>
                            <td><span class="badge badge-danger">${d.categoria}</span></td>
                            <td>${d.descricao} (${d.data})</td>
                            <td style="text-align: right; color: #E74C3C; font-weight: bold;">R$ ${(parseFloat(d.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                    `).join('')}
                    <tr style="background: rgba(231, 76, 60, 0.1); font-weight: bold;">
                        <td colspan="2">TOTAL GERAL DAS SAÍDAS</td>
                        <td style="text-align: right; color: #E74C3C;">R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tbody>
            </table>

            <!-- RESUMO E SALDO -->
            <div style="background: rgba(241, 196, 15, 0.1); padding: 15px; border-radius: 6px; border: 1px solid var(--accent-gold); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; color: var(--accent-gold);">RESULTADO DO BALANCETE (${nomeMes}/${anoStr})</h4>
                    <small style="color: var(--text-muted);">Total de Entradas (-) Total de Saídas</small>
                </div>
                <div style="font-size: 20px; font-weight: bold; color: ${saldoFinal >= 0 ? '#2ECC71' : '#E74C3C'};">
                    ${saldoFinal >= 0 ? '+' : ''} R$ ${saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
            </div>
        `;
    }

    openModal('modalBalanceteMensal');
}

function _old_unused_renderAssociadoOverview() {
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome && currentUser) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }

    // Renderiza resumo dos dados cadastrais pessoais do usuário
    const profileContainer = document.getElementById('myProfileDetailsDisplay');
    if (profileContainer && currentUser) {
        const end = [currentUser.logradouro, currentUser.numero ? `Nº ${currentUser.numero}` : '', currentUser.complemento].filter(Boolean).join(', ');
        profileContainer.innerHTML = `
            <div><b>📞 Telefone / WhatsApp:</b> ${currentUser.telefone || 'Não informado'}</div>
            <div><b>🚒 OBM:</b> ${currentUser.obm || 'São José'}</div>
            <div><b>💼 Profissão:</b> ${currentUser.profissao || 'Não informada'}</div>
            <div><b>🏠 Endereço:</b> ${end || 'Não informado'}</div>
            <div><b>📍 Bairro / Cidade:</b> ${currentUser.bairro || 'São José'} - ${currentUser.cidade || 'SC'} (CEP: ${currentUser.cep || '-'})</div>
            <div><b>🆔 CPF:</b> ${currentUser.cpf}</div>
        `;
    }

    // Renderiza Comunicados da Diretoria destinados ao usuário atual (Todos, Individual ou Seleção)
    const comunicadosContainer = document.getElementById('containerMeusComunicadosDiretoria');
    if (comunicadosContainer && currentUser) {
        const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        const meusComunicados = comunicadosAll.filter(c => {
            if (c.destinatario_tipo === 'todos' || (c.destinatarios_cpfs && c.destinatarios_cpfs.includes('TODOS'))) return true;
            if (c.destinatarios_cpfs && c.destinatarios_cpfs.includes(currentUser.cpf)) return true;
            return false;
        });

        if (meusComunicados.length === 0) {
            comunicadosContainer.innerHTML = `
                <p style="font-size: 13px; color: var(--text-muted); margin: 0; padding: 10px 0;">Nenhum comunicado ou aviso recente da Diretoria.</p>
            `;
        } else {
            comunicadosContainer.innerHTML = meusComunicados.map(c => {
                let badgePrio = '<span class="badge badge-info" style="font-size: 10px;">🟢 Informativo</span>';
                if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning" style="font-size: 10px;">🟡 Importante</span>';
                if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger" style="font-size: 10px;">🔴 Urgente</span>';

                return `
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="color: var(--accent-gold); font-size: 14px;">${c.assunto}</b>
                                ${badgePrio}
                            </div>
                            <small style="color: var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                        </div>
                        <p style="font-size: 13px; color: var(--text-color); margin: 6px 0 0 0; white-space: pre-wrap;">${c.mensagem}</p>
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px; text-align: right;">
                            Enviado por: <b>${c.remetente_nome || 'Diretoria ACBCSJ'}</b>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    const grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (!container || !currentUser) return;

    const socio = grid.find(s => {
        const ng = (typeof s.nome_guerra === 'string' ? s.nome_guerra : (Array.isArray(s.nome_guerra) ? '' : String(s.nome_guerra || ''))).toLowerCase();
        const nc = (typeof s.nome_completo === 'string' ? s.nome_completo : (Array.isArray(s.nome_completo) ? '' : String(s.nome_completo || ''))).toLowerCase();
        const userNg = (typeof currentUser.nome_guerra === 'string' ? currentUser.nome_guerra : (Array.isArray(currentUser.nome_guerra) ? '' : String(currentUser.nome_guerra || ''))).toLowerCase();
        const userNc = (typeof currentUser.nome === 'string' ? currentUser.nome : (Array.isArray(currentUser.nome) ? '' : String(currentUser.nome || ''))).toLowerCase();
        return (ng && userNg && ng === userNg) || (nc && userNc && nc === userNc) || (userNc && nc && nc.includes(userNc));
    }) || grid[0];

    const mesesNomes = [
        { key: 'jan', nome: 'Janeiro 2026' },
        { key: 'fev', nome: 'Fevereiro 2026' },
        { key: 'mar', nome: 'Março 2026' },
        { key: 'abr', nome: 'Abril 2026' },
        { key: 'mai', nome: 'Maio 2026' },
        { key: 'jun', nome: 'Junho 2026' },
        { key: 'jul', nome: 'Julho 2026' },
        { key: 'ago', nome: 'Agosto 2026' },
        { key: 'set', nome: 'Setembro 2026' },
        { key: 'out', nome: 'Outubro 2026' },
        { key: 'nov', nome: 'Novembro 2026' },
        { key: 'dez', nome: 'Dezembro 2026' }
    ];

    container.innerHTML = mesesNomes.map(m => {
        const val = socio ? (parseFloat(socio[m.key]) || 0) : 0;
        const pago = val > 0;
        return `
            <tr>
                <td><b>${m.nome}</b></td>
                <td style="font-weight: 700; color: ${pago ? '#2ECC71' : 'var(--text-muted)'};">
                    R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span class="badge badge-${pago ? 'success' : 'warning'}">
                        ${pago ? '✅ PAGO / BAIXADO' : '⏳ EM ABERTO / PENDENTE'}
                    </span>
            </tr>
        `;
    }).join('');
}

// EDIÇÃO DOS DADOS CADASTRAIS PELO PRÓPRIO INTEGRANTE
function abrirModalEditarMeusDados() {
    if (!currentUser) return;
    document.getElementById('editMeusTelefone').value = currentUser.telefone || '';
    document.getElementById('editMeusOBM').value = currentUser.obm || 'São José';
    document.getElementById('editMeusProfissao').value = currentUser.profissao || '';
    document.getElementById('editMeusLogradouro').value = currentUser.logradouro || '';
    document.getElementById('editMeusNumero').value = currentUser.numero || '';
    document.getElementById('editMeusComplemento').value = currentUser.complemento || '';
    document.getElementById('editMeusCEP').value = currentUser.cep || '';
    document.getElementById('editMeusBairro').value = currentUser.bairro || '';
    document.getElementById('editMeusCidade').value = currentUser.cidade || 'São José / SC';

    openModal('modalEditarMeusDados');
}

function salvarMeusDados(e) {
    e.preventDefault();
    if (!currentUser) return;

    const telefone = document.getElementById('editMeusTelefone').value.trim();
    const obm = document.getElementById('editMeusOBM').value.trim();
    const profissao = document.getElementById('editMeusProfissao').value.trim();
    const logradouro = document.getElementById('editMeusLogradouro').value.trim();
    const numero = document.getElementById('editMeusNumero').value.trim();
    const complemento = document.getElementById('editMeusComplemento').value.trim();
    const cep = document.getElementById('editMeusCEP').value.trim();
    const bairro = document.getElementById('editMeusBairro').value.trim();
    const cidade = document.getElementById('editMeusCidade').value.trim();

    currentUser.telefone = telefone;
    currentUser.obm = obm;
    currentUser.profissao = profissao;
    currentUser.logradouro = logradouro;
    currentUser.numero = numero;
    currentUser.complemento = complemento;
    currentUser.cep = cep;
    currentUser.bairro = bairro;
    currentUser.cidade = cidade;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const index = list.findIndex(a => a.cpf === currentUser.cpf);
    if (index >= 0) {
        list[index] = { ...list[index], ...currentUser };
    }
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        dbService.saveAssociado(currentUser);
    } catch (err) {}

    alert('Seus dados cadastrais foram atualizados com sucesso!');
    closeModal('modalEditarMeusDados');
    renderAssociadoOverview();
}

// GESTÃO HISTÓRICA DO VALOR BASE DA MENSALIDADE COM DATA DE VIGÊNCIA
function getHistoricoReajustesMensalidade() {
    let historico = JSON.parse(localStorage.getItem('acbcsj_historico_reajustes_mensalidade'));
    if (!historico || !Array.isArray(historico) || historico.length === 0) {
        const oldVal = parseFloat(localStorage.getItem('acbcsj_valor_mensalidade')) || 20.00;
        historico = [{
            id: 'reaj_inicial',
            valor: oldVal,
            mes_inicio: '01',
            ano_inicio: '2024',
            data_registro: '01/01/2024',
            justificativa: 'Valor base inicial (R$ 20,00)'
        }];
        localStorage.setItem('acbcsj_historico_reajustes_mensalidade', JSON.stringify(historico));
    }
    return historico;
}

function getValorMensalidadeVigente(mesIndex, anoStr) {
    const historico = getHistoricoReajustesMensalidade();

    if (!mesIndex || !anoStr) {
        const hoje = new Date();
        mesIndex = hoje.getMonth() + 1;
        anoStr = String(hoje.getFullYear());
    }

    const targetScore = parseInt(anoStr, 10) * 100 + parseInt(mesIndex, 10);

    const validos = historico.filter(h => {
        const itemScore = parseInt(h.ano_inicio, 10) * 100 + parseInt(h.mes_inicio, 10);
        return itemScore <= targetScore;
    });

    if (validos.length === 0) {
        return historico[0].valor || 20.00;
    }

    validos.sort((a, b) => {
        const scoreA = parseInt(a.ano_inicio, 10) * 100 + parseInt(a.mes_inicio, 10);
        const scoreB = parseInt(b.ano_inicio, 10) * 100 + parseInt(b.mes_inicio, 10);
        return scoreB - scoreA;
    });

    return validos[0].valor;
}

function getInfoVigenciaMensalidadeAtual() {
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = String(hoje.getFullYear());
    const historico = getHistoricoReajustesMensalidade();

    const targetScore = parseInt(anoAtual, 10) * 100 + parseInt(mesAtual, 10);
    const validos = historico.filter(h => (parseInt(h.ano_inicio, 10) * 100 + parseInt(h.mes_inicio, 10)) <= targetScore);
    validos.sort((a, b) => (parseInt(b.ano_inicio, 10) * 100 + parseInt(b.mes_inicio, 10)) - (parseInt(a.ano_inicio, 10) * 100 + parseInt(a.mes_inicio, 10)));

    const reg = validos[0] || { valor: 20.00, mes_inicio: '01', ano_inicio: '2024' };
    return {
        valor: reg.valor,
        vigenciaStr: `R$ ${reg.valor.toFixed(2).replace('.', ',')}/mês (vigente a partir de ${reg.mes_inicio}/${reg.ano_inicio})`
    };
}

function abrirModalReajustarMensalidade() {
    const hoje = new Date();
    const strMes = String(hoje.getMonth() + 1).padStart(2, '0');
    const strAno = String(hoje.getFullYear());

    const valorAtual = getValorMensalidadeVigente(parseInt(strMes, 10), strAno);
    const inputVal = document.getElementById('inputNovoValorMensalidade');
    if (inputVal) inputVal.value = valorAtual.toFixed(2);

    const selMes = document.getElementById('inputMesVigenciaReajuste');
    if (selMes) selMes.value = strMes;

    const selAno = document.getElementById('inputAnoVigenciaReajuste');
    if (selAno) selAno.value = strAno;

    const inputJust = document.getElementById('inputJustificativaReajuste');
    if (inputJust) inputJust.value = '';

    const historico = getHistoricoReajustesMensalidade();
    const containerHist = document.getElementById('listaHistoricoReajustesDisplay');
    if (containerHist) {
        if (historico.length === 0) {
            containerHist.innerHTML = '<i>Nenhum reajuste registrado.</i>';
        } else {
            containerHist.innerHTML = historico.map(h => `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding: 4px 0;">
                    <span><b>R$ ${parseFloat(h.valor).toFixed(2).replace('.', ',')}</b>/mês (A partir de ${h.mes_inicio}/${h.ano_inicio})</span>
                    <span style="font-size: 10px; color: var(--accent-gold);">${h.justificativa || 'Aprovado'}</span>
                </div>
            `).join('');
        }
    }

    openModal('modalReajustarMensalidade');
}

function salvarNovoValorMensalidade(e) {
    e.preventDefault();
    const novoValor = parseFloat(document.getElementById('inputNovoValorMensalidade').value) || 20.00;
    const mesInicio = document.getElementById('inputMesVigenciaReajuste').value;
    const anoInicio = document.getElementById('inputAnoVigenciaReajuste').value;
    const justificativa = document.getElementById('inputJustificativaReajuste').value.trim() || `Reajuste aprovado pela Diretoria para vigorar a partir de ${mesInicio}/${anoInicio}`;

    if (novoValor <= 0) {
        alert('Por favor, informe um valor de mensalidade válido.');
        return;
    }

    let historico = getHistoricoReajustesMensalidade();

    const indexExistente = historico.findIndex(h => h.mes_inicio === mesInicio && h.ano_inicio === anoInicio);
    const novoRegistro = {
        id: 'reaj_' + Date.now(),
        valor: novoValor,
        mes_inicio: mesInicio,
        ano_inicio: anoInicio,
        data_registro: new Date().toLocaleDateString('pt-BR'),
        justificativa: justificativa
    };

    if (indexExistente >= 0) {
        historico[indexExistente] = novoRegistro;
    } else {
        historico.push(novoRegistro);
    }

    historico.sort((a, b) => {
        const scoreA = parseInt(a.ano_inicio, 10) * 100 + parseInt(a.mes_inicio, 10);
        const scoreB = parseInt(b.ano_inicio, 10) * 100 + parseInt(b.mes_inicio, 10);
        return scoreA - scoreB;
    });

    localStorage.setItem('acbcsj_historico_reajustes_mensalidade', JSON.stringify(historico));
    localStorage.setItem('acbcsj_valor_mensalidade', novoValor.toFixed(2));

    alert(`Novo valor de mensalidade (R$ ${novoValor.toFixed(2).replace('.', ',')}) registrado com sucesso para vigorar a partir de ${mesInicio}/${anoInicio}!\n\n⚠️ Os valores e cobranças dos meses anteriores a ${mesInicio}/${anoInicio} permanecerão intactos com suas tarifas históricas.`);
    closeModal('modalReajustarMensalidade');
    renderGestaoMensalidades();
    renderAssociadoOverview();
}

// CÁLCULO DE VENCIMENTO DIA 15 E STATUS DE MENSALIDADE
function calcularStatusMensalidade(mesIndex, anoStr, valorPago) {
    const valor = parseFloat(valorPago) || 0;
    const baseVal = getValorMensalidadeVigente(mesIndex, anoStr);
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtualNum = hoje.getMonth() + 1; // 1 a 12
    const diaAtual = hoje.getDate(); // 1 a 31

    const anoNum = parseInt(anoStr, 10);
    const dataVencimentoStr = `15/${String(mesIndex).padStart(2, '0')}/${anoNum}`;

    if (valor >= baseVal) {
        return {
            status: 'pago',
            badge: `<span class="badge badge-success" style="font-size:10px; padding:2px 4px;">✅ R$ ${valor.toFixed(2).replace('.', ',')}</span>`,
            vencimento: dataVencimentoStr,
            isVencido: false,
            debitAmount: 0
        };
    } else if (valor > 0) {
        const falta = baseVal - valor;
        const isV = (anoNum < anoAtual || (anoNum === anoAtual && (mesIndex < mesAtualNum || (mesIndex === mesAtualNum && diaAtual > 15))));
        return {
            status: 'parcial',
            badge: `<span class="badge badge-warning" style="font-size:10px; padding:2px 4px;">⚠️ R$ ${valor.toFixed(2).replace('.', ',')}</span>`,
            vencimento: dataVencimentoStr,
            isVencido: isV,
            debitAmount: falta
        };
    } else {
        let isVencido = false;
        if (anoNum < anoAtual) {
            isVencido = true;
        } else if (anoNum === anoAtual) {
            if (mesIndex < mesAtualNum) {
                isVencido = true;
            } else if (mesIndex === mesAtualNum) {
                if (diaAtual > 15) {
                    isVencido = true;
                }
            }
        }

        if (isVencido) {
            return {
                status: 'vencido',
                badge: `<span class="badge badge-danger" style="font-size:10px; padding:2px 4px;">🔴 R$ 0,00</span>`,
                vencimento: dataVencimentoStr,
                isVencido: true,
                debitAmount: baseVal
            };
        } else {
            return {
                status: 'a_vencer',
                badge: `<span style="color:var(--text-muted); font-size:11px;">-</span>`,
                vencimento: dataVencimentoStr,
                isVencido: false,
                debitAmount: 0
            };
        }
    }
}

// RENDERIZAR PAINEL DO ASSOCIADO (VISÃO GERAL, MENSAGENS E MENSALIDADES)
function renderAssociadoOverview() {
    if (!currentUser) return;

    // 1. Nome de boas-vindas
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }

    // 2. Resumo dos Dados Cadastrais Pessoais
    const profileContainer = document.getElementById('myProfileDetailsDisplay');
    if (profileContainer) {
        const end = [currentUser.logradouro, currentUser.numero ? `Nº ${currentUser.numero}` : '', currentUser.complemento].filter(Boolean).join(', ');
        profileContainer.innerHTML = `
            <div><b>📞 Telefone / WhatsApp:</b> ${currentUser.telefone || 'Não informado'}</div>
            <div><b>🚒 OBM:</b> ${currentUser.obm || 'São José'}</div>
            <div><b>💼 Profissão:</b> ${currentUser.profissao || 'Não informada'}</div>
            <div><b>🏠 Endereço:</b> ${end || 'Não informado'}</div>
            <div><b>📍 Bairro / Cidade:</b> ${currentUser.bairro || 'São José'} - ${currentUser.cidade || 'SC'} (CEP: ${currentUser.cep || '-'})</div>
            <div><b>🆔 CPF:</b> ${currentUser.cpf}</div>
        `;
    }

    // 3. Comunicados & Avisos da Diretoria destinados ao usuário atual
    const comunicadosContainer = document.getElementById('containerMeusComunicadosDiretoria');
    if (comunicadosContainer) {
        const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
        const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
        const lidos = getComunicadosLidosUsuario();

        const meusComunicados = comunicadosAll.filter(c => {
            if (c.destinatario_tipo === 'todos') return true;
            if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
                if (c.destinatarios_cpfs.includes('TODOS')) return true;
                return c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf);
            }
            return false;
        });

        // Somente comunicados PENDENTES DE LEITURA (!lidos.includes(c.id))
        const pendentesLeitura = meusComunicados.filter(c => !lidos.includes(c.id));

        if (pendentesLeitura.length === 0) {
            comunicadosContainer.innerHTML = `
                <div style="background: rgba(46,204,113,0.05); border: 1px dashed rgba(46,204,113,0.3); border-radius: 6px; padding: 14px; text-align: center; color: var(--text-muted); font-size: 13px;">
                    ✅ <b>Nenhum comunicado pendente de leitura.</b><br>
                    <span style="font-size: 12px; color: var(--text-muted);">Todas as suas mensagens lidas continuam salvas no <a href="#" onclick="navigateTab('comunicados-associado'); return false;" style="color: var(--accent-gold); text-decoration: underline; font-weight: bold;">Histórico de Comunicados & Avisos</a>.</span>
                </div>
            `;
        } else {
            comunicadosContainer.innerHTML = pendentesLeitura.map(c => {
                let badgePrio = '<span class="badge badge-info" style="font-size: 10px;">🟢 Informativo</span>';
                if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning" style="font-size: 10px;">🟡 Importante</span>';
                if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger" style="font-size: 10px;">🔴 Urgente</span>';

                return `
                    <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-left: 4px solid var(--accent-gold); border-radius: 6px; padding: 14px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <b style="color: var(--accent-gold); font-size: 15px;">${c.assunto}</b>
                                ${badgePrio}
                            </div>
                            <small style="color: var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                        </div>
                        <p style="font-size: 13px; color: var(--text-color); margin: 6px 0 10px 0; white-space: pre-wrap; line-height: 1.5;">${c.mensagem}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
                            <div style="font-size: 11px; color: var(--text-muted);">
                                Enviado por: <b style="color: var(--text-color);">${c.remetente_nome || 'Diretoria ACBCSJ'}</b>
                            </div>
                            <button type="button" class="btn btn-sm btn-gold" style="font-size: 11px; padding: 4px 10px; font-weight: bold;" onclick="marcarComunicadoLido('${c.id}')">
                                ✅ Marcar como Lida
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 4. Minhas Mensalidades & Contribuições por Ano
    const selAno = document.getElementById('selAnoMeuPainel');
    const ano = selAno ? selAno.value : '2026';

    const lbls = document.querySelectorAll('.lblAnoMeuPainel');
    lbls.forEach(el => el.textContent = ano);

    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = JSON.parse(localStorage.getItem(storageKey));
    if (!grid) {
        grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
    }

    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');

    const socio = grid.find(s => {
        const sCpf = (s.cpf || '').replace(/\D/g, '');
        if (sCpf && cleanUserCpf && sCpf === cleanUserCpf) return true;
        const ng = (typeof s.nome_guerra === 'string' ? s.nome_guerra : '').toLowerCase();
        const nc = (typeof s.nome_completo === 'string' ? s.nome_completo : '').toLowerCase();
        const userNg = (typeof currentUser.nome_guerra === 'string' ? currentUser.nome_guerra : '').toLowerCase();
        const userNc = (typeof currentUser.nome === 'string' ? currentUser.nome : '').toLowerCase();
        return (ng && userNg && ng === userNg) || (nc && userNc && nc === userNc) || (userNc && nc && nc.includes(userNc));
    }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    const containerTable = document.getElementById('tableMinhasMensalidadesBody');
    if (!containerTable) return;

    const mesesList = [
        { index: 1, key: 'jan', nome: 'Janeiro' },
        { index: 2, key: 'fev', nome: 'Fevereiro' },
        { index: 3, key: 'mar', nome: 'Março' },
        { index: 4, key: 'abr', nome: 'Abril' },
        { index: 5, key: 'mai', nome: 'Maio' },
        { index: 6, key: 'jun', nome: 'Junho' },
        { index: 7, key: 'jul', nome: 'Julho' },
        { index: 8, key: 'ago', nome: 'Agosto' },
        { index: 9, key: 'set', nome: 'Setembro' },
        { index: 10, key: 'out', nome: 'Outubro' },
        { index: 11, key: 'nov', nome: 'Novembro' },
        { index: 12, key: 'dez', nome: 'Dezembro' }
    ];

    let totalPagoAno = 0;
    let totalDebitosPendente = 0;
    let temDebitoVencido = false;

    const rowsHtml = mesesList.map(m => {
        const valPago = parseFloat(socio[m.key]) || 0;
        const tarifaVigente = getValorMensalidadeVigente(m.index, ano);
        totalPagoAno += valPago;

        const info = calcularStatusMensalidade(m.index, ano, valPago);
        if (info.isVencido) {
            temDebitoVencido = true;
            totalDebitosPendente += info.debitAmount;
        }

        let badgeStatus = '';
        if (info.status === 'pago') {
            badgeStatus = `<span class="badge badge-success" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">✅ QUITADO / EM DIA</span>`;
        } else if (info.status === 'parcial') {
            badgeStatus = `<span class="badge badge-warning" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">⚠️ PAGO PARCIAL (Falta R$ ${info.debitAmount.toFixed(2).replace('.', ',')})</span>`;
        } else if (info.isVencido) {
            badgeStatus = `<span class="badge badge-danger" style="font-weight: bold; font-size: 11px; padding: 4px 8px;">🔴 VENCIDO (Inadimplente)</span>`;
        } else {
            badgeStatus = `<span style="color: var(--text-muted); font-size: 12px; font-weight: 500;">⏳ A VENCER</span>`;
        }

        return `
            <tr>
                <td><b style="color: var(--text-color);">${m.index < 10 ? '0' + m.index : m.index} - ${m.nome} / ${ano}</b></td>
                <td><span style="font-size: 12px; font-weight: 600; color: var(--accent-gold);">${info.vencimento}</span></td>
                <td>R$ ${tarifaVigente.toFixed(2).replace('.', ',')}</td>
                <td style="font-weight: 700; color: ${valPago >= tarifaVigente ? '#2ECC71' : (valPago > 0 ? '#F39C12' : 'var(--text-muted)')};">
                    R$ ${valPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>${badgeStatus}</td>
            </tr>
        `;
    }).join('');

    containerTable.innerHTML = rowsHtml;

    // Atualiza os Banners de Métrica do Associado
    const bannerAdimplencia = document.getElementById('bannerStatusAdimplenciaAssociado');
    const elMetricTotalPago = document.getElementById('metricMeuTotalPago');
    const elMetricTotalPendente = document.getElementById('metricMeuTotalPendente');

    if (elMetricTotalPago) {
        elMetricTotalPago.textContent = `R$ ${totalPagoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    if (elMetricTotalPendente) {
        elMetricTotalPendente.textContent = `R$ ${totalDebitosPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    if (bannerAdimplencia) {
        if (temDebitoVencido) {
            bannerAdimplencia.style.background = 'rgba(231, 76, 60, 0.1)';
            bannerAdimplencia.style.borderColor = 'rgba(231, 76, 60, 0.4)';
            bannerAdimplencia.innerHTML = `
                <div style="font-size: 24px;">🔴</div>
                <div>
                    <b style="color: #E74C3C; font-size: 13px; display: block;">DÉBITO PENDENTE VENCIDO</b>
                    <span style="font-size: 11px; color: var(--text-muted);">Vencimento dia 15 do mês corrente. Entre em contato com a Diretoria para regularizar.</span>
                </div>
            `;
        } else {
            bannerAdimplencia.style.background = 'rgba(46, 204, 113, 0.1)';
            bannerAdimplencia.style.borderColor = 'rgba(46, 204, 113, 0.4)';
            bannerAdimplencia.innerHTML = `
                <div style="font-size: 24px;">🟢</div>
                <div>
                    <b style="color: #2ECC71; font-size: 13px; display: block;">CADASTRO 100% EM DIA</b>
                    <span style="font-size: 11px; color: var(--text-muted);">Parabéns! Suas contribuições estão em dia com a ACBCSJ.</span>
                </div>
            `;
        }
    }
}

// GERENCIAMENTO DE LEITURA E HISTÓRICO DE COMUNICADOS DO ASSOCIADO
function getComunicadosLidosUsuario() {
    if (!currentUser) return [];
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const storageKey = `acbcsj_comunicados_lidos_${cleanUserCpf}`;
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function marcarComunicadoLido(comunicadoId) {
    if (!currentUser || !comunicadoId) return;
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const storageKey = `acbcsj_comunicados_lidos_${cleanUserCpf}`;
    let lidos = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    if (!lidos.includes(comunicadoId)) {
        lidos.push(comunicadoId);
        localStorage.setItem(storageKey, JSON.stringify(lidos));
    }

    renderAssociadoOverview();
    renderComunicadosHistoricoAssociado();
}

function renderComunicadosHistoricoAssociado() {
    if (!currentUser) return;
    const container = document.getElementById('containerHistoricoComunicadosAssociado');
    if (!container) return;

    const comunicadosAll = JSON.parse(localStorage.getItem('acbcsj_comunicados_enviados')) || [];
    const cleanUserCpf = (currentUser.cpf || '').replace(/\D/g, '');
    const lidos = getComunicadosLidosUsuario();

    const termoBusca = (document.getElementById('filtroTextoComunicadosAssociado')?.value || '').toLowerCase().trim();

    let meusComunicados = comunicadosAll.filter(c => {
        if (c.destinatario_tipo === 'todos') return true;
        if (c.destinatarios_cpfs && Array.isArray(c.destinatarios_cpfs)) {
            if (c.destinatarios_cpfs.includes('TODOS')) return true;
            return c.destinatarios_cpfs.some(cpfItem => (cpfItem || '').replace(/\D/g, '') === cleanUserCpf);
        }
        return false;
    });

    if (termoBusca) {
        meusComunicados = meusComunicados.filter(c => 
            (c.assunto || '').toLowerCase().includes(termoBusca) ||
            (c.mensagem || '').toLowerCase().includes(termoBusca) ||
            (c.remetente_nome || '').toLowerCase().includes(termoBusca)
        );
    }

    if (meusComunicados.length === 0) {
        container.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
                Nenhum comunicado encontrado no seu histórico.
            </div>
        `;
        return;
    }

    container.innerHTML = meusComunicados.map(c => {
        const isLido = lidos.includes(c.id);

        let badgePrio = '<span class="badge badge-info" style="font-size: 10px;">🟢 Informativo</span>';
        if (c.prioridade === 'Importante') badgePrio = '<span class="badge badge-warning" style="font-size: 10px;">🟡 Importante</span>';
        if (c.prioridade === 'Urgente') badgePrio = '<span class="badge badge-danger" style="font-size: 10px;">🔴 Urgente</span>';

        let badgeStatus = isLido 
            ? '<span class="badge badge-success" style="font-size: 10px;">✅ Mensagem Lida</span>'
            : '<span class="badge badge-warning" style="font-size: 10px;">🟡 Pendente de Leitura</span>';

        let botaoAcao = isLido ? '' : `
            <button type="button" class="btn btn-sm btn-gold" style="font-size: 11px; padding: 4px 10px; font-weight: bold;" onclick="marcarComunicadoLido('${c.id}')">
                ✅ Marcar como Lida
            </button>
        `;

        return `
            <div style="background: rgba(0,0,0,0.2); border: 1px solid ${isLido ? 'var(--border-color)' : 'rgba(241,196,15,0.4)'}; border-left: 4px solid ${isLido ? '#2ECC71' : 'var(--accent-gold)'}; border-radius: 6px; padding: 14px; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <b style="color: var(--accent-gold); font-size: 15px;">${c.assunto}</b>
                        ${badgePrio}
                        ${badgeStatus}
                    </div>
                    <small style="color: var(--text-muted); font-size: 11px;">📅 ${c.data}</small>
                </div>
                <p style="font-size: 13px; color: var(--text-color); margin: 6px 0 10px 0; white-space: pre-wrap; line-height: 1.5;">${c.mensagem}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
                    <div style="font-size: 11px; color: var(--text-muted);">
                        Enviado por: <b style="color: var(--text-color);">${c.remetente_nome || 'Diretoria ACBCSJ'}</b> (${c.destinatarios_resumo || 'Associados'})
                    </div>
                    ${botaoAcao}
                </div>
            </div>
        `;
    }).join('');
}

// EDIÇÃO DOS DADOS CADASTRAIS PELO PRÓPRIO INTEGRANTE
function abrirModalEditarMeusDados() {
    if (!currentUser) return;
    document.getElementById('editMeusTelefone').value = currentUser.telefone || '';
    document.getElementById('editMeusOBM').value = currentUser.obm || 'São José';
    document.getElementById('editMeusProfissao').value = currentUser.profissao || '';
    document.getElementById('editMeusLogradouro').value = currentUser.logradouro || '';
    document.getElementById('editMeusNumero').value = currentUser.numero || '';
    document.getElementById('editMeusComplemento').value = currentUser.complemento || '';
    document.getElementById('editMeusCEP').value = currentUser.cep || '';
    document.getElementById('editMeusBairro').value = currentUser.bairro || '';
    document.getElementById('editMeusCidade').value = currentUser.cidade || 'São José / SC';

    openModal('modalEditarMeusDados');
}

function salvarMeusDados(e) {
    e.preventDefault();
    if (!currentUser) return;

    const telefone = document.getElementById('editMeusTelefone').value.trim();
    const obm = document.getElementById('editMeusOBM').value.trim();
    const profissao = document.getElementById('editMeusProfissao').value.trim();
    const logradouro = document.getElementById('editMeusLogradouro').value.trim();
    const numero = document.getElementById('editMeusNumero').value.trim();
    const complemento = document.getElementById('editMeusComplemento').value.trim();
    const cep = document.getElementById('editMeusCEP').value.trim();
    const bairro = document.getElementById('editMeusBairro').value.trim();
    const cidade = document.getElementById('editMeusCidade').value.trim();

    currentUser.telefone = telefone;
    currentUser.obm = obm;
    currentUser.profissao = profissao;
    currentUser.logradouro = logradouro;
    currentUser.numero = numero;
    currentUser.complemento = complemento;
    currentUser.cep = cep;
    currentUser.bairro = bairro;
    currentUser.cidade = cidade;

    let list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const index = list.findIndex(a => a.cpf === currentUser.cpf);
    if (index >= 0) {
        list[index] = { ...list[index], ...currentUser };
    }
    localStorage.setItem('acbcsj_associados', JSON.stringify(list));

    try {
        dbService.saveAssociado(currentUser);
    } catch (err) {}

    alert('Seus dados cadastrais foram atualizados com sucesso!');
    closeModal('modalEditarMeusDados');
    renderAssociadoOverview();
}

// CONTROLE DE MENSALIDADES DOS ASSOCIADOS (DIRETORIA)
function renderGestaoMensalidades() {
    const selAno = document.getElementById('selAnoMensalidades');
    const ano = selAno ? selAno.value : '2026';

    const infoVigencia = getInfoVigenciaMensalidadeAtual();
    const elBaseVal = document.getElementById('metricValorMensalidadeVigente');
    if (elBaseVal) elBaseVal.textContent = `R$ ${infoVigencia.valor.toFixed(2).replace('.', ',')}`;

    const lbls = document.querySelectorAll('.lblAnoMensalidadeMetrica');
    lbls.forEach(el => el.textContent = ano);

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const ativos = list.filter(a => a.status === 'ativo' || !a.status);

    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = JSON.parse(localStorage.getItem(storageKey));

    if (!grid) {
        if (ano === '2026') {
            grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
        } else {
            grid = ativos.map(a => ({
                nome_guerra: a.nome_guerra || a.nome,
                nome_completo: a.nome,
                cpf: a.cpf,
                jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
            }));
        }
        localStorage.setItem(storageKey, JSON.stringify(grid));
    }

    const searchInput = document.getElementById('searchAssociadoMensalidade');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filterStatus = document.getElementById('filterStatusMensalidade')?.value || 'todos';

    const mesesKeys = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    let totalArrecadadoAno = 0;
    let emDiaCount = 0;
    let pendentesCount = 0;

    let associadosProcessados = ativos.map(socio => {
        const itemGrid = grid.find(g => {
            const gCpf = (g.cpf || '').replace(/\D/g, '');
            const sCpf = (socio.cpf || '').replace(/\D/g, '');
            if (gCpf && sCpf && gCpf === sCpf) return true;
            const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
            const sNg = (typeof socio.nome_guerra === 'string' ? socio.nome_guerra : '').toLowerCase();
            const sNc = (typeof socio.nome === 'string' ? socio.nome : '').toLowerCase();
            return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
        }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

        let totalPagoSocio = 0;
        let mesesDevidos = 0;

        mesesKeys.forEach((key, index) => {
            const val = parseFloat(itemGrid[key]) || 0;
            totalPagoSocio += val;
            totalArrecadadoAno += val;

            const st = calcularStatusMensalidade(index + 1, ano, val);
            if (st.isVencido) {
                mesesDevidos++;
            }
        });

        const isEmDia = mesesDevidos === 0;
        if (isEmDia) emDiaCount++; else pendentesCount++;

        return {
            ...socio,
            gridData: itemGrid,
            totalPagoSocio,
            mesesDevidos,
            isEmDia
        };
    });

    const elArrecadado = document.getElementById('metricTotalArrecadadoMensalidades');
    const elEmDia = document.getElementById('metricAssociadosEmDia');
    const elPendentes = document.getElementById('metricAssociadosPendentes');

    if (elArrecadado) elArrecadado.textContent = `R$ ${totalArrecadadoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elEmDia) elEmDia.textContent = `${emDiaCount} associados`;
    if (elPendentes) elPendentes.textContent = `${pendentesCount} associados`;

    if (searchTerm) {
        associadosProcessados = associadosProcessados.filter(a => {
            const ng = (a.nome_guerra || '').toLowerCase();
            const nc = (a.nome || '').toLowerCase();
            const cpf = (a.cpf || '').replace(/\D/g, '');
            return ng.includes(searchTerm) || nc.includes(searchTerm) || cpf.includes(searchTerm);
        });
    }

    if (filterStatus === 'em_dia') {
        associadosProcessados = associadosProcessados.filter(a => a.isEmDia);
    } else if (filterStatus === 'atrasado') {
        associadosProcessados = associadosProcessados.filter(a => !a.isEmDia);
    }

    const container = document.getElementById('tableGestaoMensalidadesBody');
    if (container) {
        if (associadosProcessados.length === 0) {
            container.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum associado encontrado para os filtros selecionados.</td></tr>`;
        } else {
            container.innerHTML = associadosProcessados.map(a => {
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(a.gridData[k]) || 0;
                    const info = calcularStatusMensalidade(idx + 1, ano, val);
                    return `<td>${info.badge}</td>`;
                }).join('');

                const statusBadge = a.isEmDia 
                    ? `<span class="badge badge-success" style="font-size:11px; padding: 4px 8px; background:#2ECC71; color:#fff; font-weight:bold;">🟢 EM DIA</span>` 
                    : `<span class="badge badge-danger" style="font-size:11px; padding: 4px 8px; background:#E74C3C; color:#fff; font-weight:bold;" title="${a.mesesDevidos} mês(es) em atraso">🔴 INADIMPLENTE (${a.mesesDevidos})</span>`;

                return `
                    <tr>
                        <td style="text-align: left;">
                            <b>${a.nome_guerra || a.nome}</b><br>
                            <small style="color: var(--text-muted);">${a.cpf}</small>
                        </td>
                        ${cellsMeses}
                        <td style="font-weight: 700; color: var(--accent-gold);">
                            R$ ${a.totalPagoSocio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td>${statusBadge}</td>
                        <td>
                            <div style="display: flex; gap: 4px; justify-content: center;">
                                <button class="btn btn-sm btn-gold" style="padding: 2px 6px; font-size: 11px;" onclick="abrirModalDarBaixa('${a.cpf}')">💳 Baixar</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px;" onclick="verExtratoAssociado('${a.cpf}')">📋 Histórico</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px; color: var(--accent-gold); border-color: var(--accent-gold);" onclick="verExtratoAssociado('${a.cpf}')">✏️ Editar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // PROCESSA ASSOCIADOS DESLIGADOS NA PARTE INFERIOR
    const desligados = list.filter(a => a.status === 'desligado');
    const containerDesligados = document.getElementById('tableMensalidadesDesligadosBody');
    if (containerDesligados) {
        if (desligados.length === 0) {
            containerDesligados.innerHTML = `<tr><td colspan="16" style="text-align: center; color: var(--text-muted); padding: 15px;">Nenhum associado desligado registrado no sistema.</td></tr>`;
        } else {
            containerDesligados.innerHTML = desligados.map(socio => {
                const itemGrid = grid.find(g => {
                    const gCpf = (g.cpf || '').replace(/\D/g, '');
                    const sCpf = (socio.cpf || '').replace(/\D/g, '');
                    if (gCpf && sCpf && gCpf === sCpf) return true;
                    const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
                    const sNg = (typeof socio.nome_guerra === 'string' ? socio.nome_guerra : '').toLowerCase();
                    const sNc = (typeof socio.nome === 'string' ? socio.nome : '').toLowerCase();
                    return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
                }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

                let totalPagoSocio = 0;
                const cellsMeses = mesesKeys.map((k, idx) => {
                    const val = parseFloat(itemGrid[k]) || 0;
                    totalPagoSocio += val;
                    const info = calcularStatusMensalidade(idx + 1, ano, val);
                    return `<td>${info.badge}</td>`;
                }).join('');

                const dataDeslig = socio.data_desligamento || 'Data não registrada';

                return `
                    <tr style="background: rgba(231, 76, 60, 0.05);">
                        <td style="text-align: left;">
                            <b>${socio.nome_guerra || socio.nome}</b><br>
                            <small style="color: var(--text-muted);">${socio.cpf}</small><br>
                            <span class="badge badge-danger" style="font-size: 9px; margin-top: 2px;">🚫 DESLIGADO em ${dataDeslig}</span>
                        </td>
                        ${cellsMeses}
                        <td style="font-weight: 700; color: var(--accent-gold);">
                            R$ ${totalPagoSocio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td><span class="badge badge-secondary" style="font-size: 10px;">DESLIGADO</span></td>
                        <td>
                            <div style="display: flex; gap: 4px; justify-content: center;">
                                <button class="btn btn-sm btn-gold" style="padding: 2px 6px; font-size: 11px;" onclick="abrirModalDarBaixa('${socio.cpf}')">💳 Baixar</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px;" onclick="verExtratoAssociado('${socio.cpf}')">📋 Histórico</button>
                                <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 11px; color: var(--accent-gold); border-color: var(--accent-gold);" onclick="verExtratoAssociado('${socio.cpf}')">✏️ Editar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// BAIXA DE MENSALIDADE VIA PIX
function abrirModalDarBaixa(cpf = null) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];

    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    if (selectAssoc) {
        selectAssoc.innerHTML = list.map(a => `
            <option value="${a.cpf}" ${cpf && a.cpf === cpf ? 'selected' : ''}>
                ${a.nome_guerra || a.nome} ${a.status === 'desligado' ? '(DESLIGADO)' : ''} (CPF: ${a.cpf})
            </option>
        `).join('');
    }

    const dataInput = document.getElementById('baixaData');
    if (dataInput) dataInput.value = new Date().toISOString().split('T')[0];

    const obsInput = document.getElementById('baixaObs');
    if (obsInput) obsInput.value = '';

    const compInput = document.getElementById('baixaComprovantePix');
    if (compInput) compInput.value = '';

    atualizarCheckboxesBaixa();
    openModal('modalDarBaixaMensalidade');
}

function atualizarCheckboxesBaixa() {
    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    const cpf = selectAssoc ? selectAssoc.value : '';
    const selectAno = document.getElementById('baixaAnoRef');
    const anoRef = selectAno ? selectAno.value : '2026';

    const baseVal = getValorMensalidadeVigente();

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const socioObj = listAssociados.find(a => a.cpf === cpf);

    const storageKey = `acbcsj_mensalidades_grid_${anoRef}`;
    const grid = JSON.parse(localStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    
    const cleanCpf = (cpf || '').replace(/\D/g, '');

    const socioGrid = grid.find(g => {
        const gCpf = (g.cpf || '').replace(/\D/g, '');
        if (gCpf && cleanCpf && gCpf === cleanCpf) return true;
        if (socioObj) {
            const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
            const sNg = (typeof socioObj.nome_guerra === 'string' ? socioObj.nome_guerra : '').toLowerCase();
            const sNc = (typeof socioObj.nome === 'string' ? socioObj.nome : '').toLowerCase();
            return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
        }
        return false;
    }) || { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 };

    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };

    const checkboxes = document.querySelectorAll('input[name="baixaMeses"]');
    checkboxes.forEach(cb => {
        const mKey = cb.value;
        const valPago = parseFloat(socioGrid[mKey]) || 0;
        const parentLabel = cb.closest('label');

        if (valPago >= baseVal) {
            // Mês já pago/quitado: pré-marcar e desabilitar
            cb.checked = true;
            cb.disabled = true;
            if (parentLabel) {
                parentLabel.style.opacity = '0.65';
                parentLabel.style.background = 'rgba(46, 204, 113, 0.25)';
                parentLabel.style.borderColor = '#2ECC71';
                parentLabel.style.padding = '4px 6px';
                parentLabel.style.borderRadius = '4px';
                parentLabel.style.cursor = 'not-allowed';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]} já foi quitado (R$ ${valPago.toFixed(2).replace('.', ',')})`;
            }
        } else {
            // Mês em aberto: desmarcar e habilitar
            cb.checked = false;
            cb.disabled = false;
            if (parentLabel) {
                parentLabel.style.opacity = '1';
                parentLabel.style.background = 'transparent';
                parentLabel.style.borderColor = 'transparent';
                parentLabel.style.padding = '0';
                parentLabel.style.borderRadius = '0';
                parentLabel.style.cursor = 'pointer';
                parentLabel.title = `Mês de ${mesesNomesMap[mKey]} pendente para baixa`;
            }
        }
    });

    atualizarValoresBaixa();
}

function atualizarValoresBaixa() {
    const anoRef = document.getElementById('baixaAnoRef')?.value || '2026';
    const checkedNovos = document.querySelectorAll('input[name="baixaMeses"]:checked:not(:disabled)');
    
    const mesesKeysMap = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 };
    
    let total = 0;
    checkedNovos.forEach(cb => {
        const mIndex = mesesKeysMap[cb.value] || 1;
        total += getValorMensalidadeVigente(mIndex, anoRef);
    });

    const inputTotal = document.getElementById('baixaValorTotal');
    if (inputTotal) inputTotal.value = total.toFixed(2);
}

function salvarBaixaMensalidade(e) {
    e.preventDefault();
    const selectAssoc = document.getElementById('baixaAssociadoCPF');
    const cpf = selectAssoc ? selectAssoc.value : '';
    const anoRef = document.getElementById('baixaAnoRef').value;
    const dataInput = document.getElementById('baixaData').value;
    const valorTotal = parseFloat(document.getElementById('baixaValorTotal').value) || 0;
    const comprovantePix = document.getElementById('baixaComprovantePix').value.trim();
    const obs = document.getElementById('baixaObs').value.trim();

    // Pega somente os meses NOVOS selecionados (que não estavam previamente marcados/desabilitados)
    const checkedMeses = Array.from(document.querySelectorAll('input[name="baixaMeses"]:checked:not(:disabled)')).map(c => c.value);

    if (!cpf || checkedMeses.length === 0 || valorTotal <= 0 || !dataInput) {
        alert('Por favor, selecione ao menos um mês pendente para dar baixa e informe a data e valor.');
        return;
    }

    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const socio = list.find(a => a.cpf === cpf);
    const nomeAssociado = socio ? (socio.nome_guerra || socio.nome) : 'Associado';

    const [anoD, mesD, diaD] = dataInput.split('-');
    const dataBR = `${diaD}/${mesD}/${anoD}`;

    const mesesNomesMap = { jan:'Jan', fev:'Fev', mar:'Mar', abr:'Abr', mai:'Mai', jun:'Jun', jul:'Jul', ago:'Ago', set:'Set', out:'Out', nov:'Nov', dez:'Dez' };
    const mesesTexto = checkedMeses.map(m => mesesNomesMap[m]).join(', ');

    const itemHistorico = {
        id: 'mensalidade_' + Date.now(),
        cpf: cpf,
        associado_nome: nomeAssociado,
        ano: anoRef,
        valor: valorTotal,
        data: dataBR,
        data_iso: dataInput,
        forma: 'PIX',
        comprovante_pix: comprovantePix || 'Comprovante PIX recebido',
        meses_quitados: mesesTexto,
        obs: obs || `Quitação de mensalidade PIX (${mesesTexto}/${anoRef})`
    };

    let historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    historicoGeral.unshift(itemHistorico);
    localStorage.setItem('acbcsj_mensalidades_historico', JSON.stringify(historicoGeral));

    recalcularGridAssociado(cpf, anoRef);

    alert(`Baixa de mensalidade de R$ ${valorTotal.toFixed(2).replace('.', ',')} (${mesesTexto}/${anoRef}) efetuada com sucesso para ${nomeAssociado}!`);
    closeModal('modalDarBaixaMensalidade');
    renderGestaoMensalidades();
    renderGestaoFinanceira();
}

// VER EXTRATO DO ASSOCIADO E OPÇÕES DE EDIÇÃO
function verExtratoAssociado(cpf) {
    const list = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const a = list.find(item => item.cpf === cpf) || { nome: 'Associado', nome_guerra: 'Associado', cpf: cpf };

    const historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const cleanCpf = (cpf || '').replace(/\D/g, '');
    const historicoAssociado = historicoGeral.filter(h => (h.cpf || '').replace(/\D/g, '') === cleanCpf);

    const totalPagoTodosAnos = historicoAssociado.reduce((sum, h) => sum + (parseFloat(h.valor) || 0), 0);

    const container = document.getElementById('extratoAssociadoConteudo');
    if (container) {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 15px;">
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">ASSOCIADO</div>
                    <div style="font-size: 15px; font-weight: bold; color: var(--accent-gold);">${a.nome_guerra || a.nome}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${a.nome}</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">TOTAL CONTRIBUÍDO VIA PIX</div>
                    <div style="font-size: 16px; font-weight: bold; color: #2ECC71;">R$ ${totalPagoTodosAnos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${historicoAssociado.length} lançamentos efetuados</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div style="font-size: 11px; color: var(--text-muted);">OBM / SITUAÇÃO</div>
                    <div style="font-size: 14px; font-weight: bold;">${a.obm || 'São José'}</div>
                    <span class="badge badge-${a.status === 'desligado' ? 'danger' : 'success'}" style="font-size: 10px;">${a.status === 'desligado' ? 'CADASTRO DESLIGADO' : 'CADASTRO ATIVO'}</span>
                </div>
            </div>

            <h4 style="font-size: 14px; color: var(--accent-gold); margin-bottom: 10px;">💳 Histórico de Baixas PIX Efetuadas:</h4>
            ${historicoAssociado.length === 0 ? `
                <p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 6px;">Nenhum pagamento registrado no histórico individual até o momento.</p>
            ` : `
                <div class="table-responsive">
                    <table class="custom-table" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th>Data Pagamento</th>
                                <th>Exercício / Ano</th>
                                <th>Meses Quitados</th>
                                <th>Valor (R$)</th>
                                <th>Forma / Comprovante PIX</th>
                                <th>Observações</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${historicoAssociado.map(h => `
                                <tr>
                                    <td><b>${h.data}</b></td>
                                    <td><span class="badge badge-info">${h.ano}</span></td>
                                    <td><b>${h.meses_quitados}</b></td>
                                    <td style="font-weight: 700; color: #2ECC71;">+ R$ ${(parseFloat(h.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td><span class="badge badge-success">PIX</span> <small>${h.comprovante_pix || ''}</small></td>
                                    <td>${h.obs || '-'}</td>
                                    <td>
                                        <div style="display: flex; gap: 4px;">
                                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px;" onclick="abrirModalEditarBaixa('${h.id}')">✏️ Editar</button>
                                            <button class="btn btn-sm btn-outline" style="font-size: 11px; padding: 2px 6px; color: #E74C3C; border-color: #E74C3C;" onclick="excluirBaixaMensalidade('${h.id}')">🗑️ Excluir</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        `;
    }

    openModal('modalExtratoAssociado');
}

// RECALCULAR GRADE DO ASSOCIADO APÓS EDIÇÃO / EXCLUSÃO
function recalcularGridAssociado(cpf, ano) {
    const storageKey = `acbcsj_mensalidades_grid_${ano}`;
    let grid = JSON.parse(localStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || [];
    const historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const cleanCpf = (cpf || '').replace(/\D/g, '');
    const baixasDoAno = historicoGeral.filter(h => (h.cpf || '').replace(/\D/g, '') === cleanCpf && h.ano === ano);

    const listAssociados = JSON.parse(localStorage.getItem('acbcsj_associados')) || [];
    const assocObj = listAssociados.find(a => (a.cpf || '').replace(/\D/g, '') === cleanCpf);

    let socioGrid = grid.find(g => {
        const gCpf = (g.cpf || '').replace(/\D/g, '');
        if (gCpf && cleanCpf && gCpf === cleanCpf) return true;
        if (assocObj) {
            const ng = (typeof g.nome_guerra === 'string' ? g.nome_guerra : '').toLowerCase();
            const sNg = (typeof assocObj.nome_guerra === 'string' ? socioGrid ? socioGrid.nome_guerra : assocObj.nome_guerra : '').toLowerCase();
            const sNc = (typeof assocObj.nome === 'string' ? assocObj.nome : '').toLowerCase();
            return (ng && sNg && ng === sNg) || (sNc && ng && sNc.includes(ng));
        }
        return false;
    });

    if (!socioGrid && assocObj) {
        socioGrid = {
            nome_guerra: assocObj.nome_guerra || assocObj.nome,
            nome_completo: assocObj.nome,
            cpf: assocObj.cpf,
            jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
        };
        grid.push(socioGrid);
    }

    if (!socioGrid) return;
    socioGrid.cpf = cpf;

    if (ano === '2026') {
        const basePlanilha = (INITIAL_MENSAL_DATA || []).find(b => {
            const ng = (typeof b.nome_guerra === 'string' ? b.nome_guerra : '').toLowerCase();
            const sNg = (typeof socioGrid.nome_guerra === 'string' ? socioGrid.nome_guerra : '').toLowerCase();
            return ng && sNg && ng === sNg;
        });
        const mesesKeys = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        mesesKeys.forEach(k => {
            socioGrid[k] = basePlanilha ? (parseFloat(basePlanilha[k]) || 0) : 0;
        });
    } else {
        const mesesKeys = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        mesesKeys.forEach(k => socioGrid[k] = 0);
    }

    const mesesNomesMapInv = { Jan:'jan', Fev:'fev', Mar:'mar', Abr:'abr', Mai:'mai', Jun:'jun', Jul:'jul', Ago:'ago', Set:'set', Out:'out', Nov:'nov', Dez:'dez' };
    baixasDoAno.forEach(b => {
        const listaMeses = (b.meses_quitados || '').split(',').map(m => m.trim());
        const valorPorMes = (parseFloat(b.valor) || 0) / (listaMeses.length || 1);
        listaMeses.forEach(mSigla => {
            const key = mesesNomesMapInv[mSigla];
            if (key) {
                socioGrid[key] = (parseFloat(socioGrid[key]) || 0) + valorPorMes;
            }
        });
    });

    localStorage.setItem(storageKey, JSON.stringify(grid));
    if (ano === '2026') {
        localStorage.setItem('acbcsj_mensalidades_grid', JSON.stringify(grid));
    }
}

// EDITAR BAIXA DE MENSALIDADE
function abrirModalEditarBaixa(id) {
    const historicoGeral = JSON.parse(localStorage.getItem('acbcsj_mensalidades_historico')) || [];
    const item = historicoGeral.find(h => h.id === id);
    if (!item) {
        alert('Lançamento não encontrado.');
        return;
    }

    document.getElementById('editBaixaId').value = item.id;
    document.getElementById('editBaixaAssociadoNome').value = item.associado_nome;
    document.getElementById('editBaixaAnoRef').value = item.ano;
    document.getElementById('editBaixaValor').value = item.valor;
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
}
