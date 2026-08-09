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
        "nome_completo":  [
                              [

                              ]
                          ],
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
    {
        "id":  "rec_1",
        "descricao":  "Receita de Mensalidades - Janeiro 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "31/01/2026",
        "data_iso":  "2026-01-31",
        "mes":  "Janeiro"
    },
    {
        "id":  "rec_2",
        "descricao":  "Receita de Mensalidades - Fevereiro 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "28/02/2026",
        "data_iso":  "2026-02-28",
        "mes":  "Fevereiro"
    },
    {
        "id":  "rec_3",
        "descricao":  "Receita de Mensalidades - MarÃ§o 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "31/03/2026",
        "data_iso":  "2026-03-31",
        "mes":  "MarÃ§o"
    },
    {
        "id":  "rec_4",
        "descricao":  "Receita de Mensalidades - Abril 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "30/04/2026",
        "data_iso":  "2026-04-30",
        "mes":  "Abril"
    },
    {
        "id":  "rec_5",
        "descricao":  "Receita de Mensalidades - Maio 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "31/05/2026",
        "data_iso":  "2026-05-31",
        "mes":  "Maio"
    },
    {
        "id":  "rec_6",
        "descricao":  "Receita de Mensalidades - Junho 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "30/06/2026",
        "data_iso":  "2026-06-30",
        "mes":  "Junho"
    },
    {
        "id":  "rec_7",
        "descricao":  "Receita de Mensalidades - Julho 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "31/07/2026",
        "data_iso":  "2026-07-31",
        "mes":  "Julho"
    },
    {
        "id":  "rec_8",
        "descricao":  "Receita de Mensalidades - Agosto 2026",
        "categoria":  "Mensalidade / ContribuiÃ§Ã£o",
        "valor":  1,
        "tipo":  "receita",
        "data":  "31/08/2026",
        "data_iso":  "2026-08-31",
        "mes":  "Agosto"
    },
    {
        "id":  "desp_2",
        "descricao":  "Despesa Operacional Janeiro",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "20/01/2026",
        "data_iso":  "2026-01-20",
        "mes":  "Janeiro"
    },
    {
        "id":  "desp_3",
        "descricao":  "Despesa Operacional Janeiro",
        "categoria":  "Despesa Operacional",
        "valor":  50,
        "tipo":  "despesa",
        "data":  "26/01/2026",
        "data_iso":  "2026-01-26",
        "mes":  "Janeiro"
    },
    {
        "id":  "desp_4",
        "descricao":  "Despesa Operacional Janeiro",
        "categoria":  "Despesa Operacional",
        "valor":  0.17,
        "tipo":  "despesa",
        "data":  "31/01/2026",
        "data_iso":  "2026-01-31",
        "mes":  "Janeiro"
    },
    {
        "id":  "desp_5",
        "descricao":  "Despesa Operacional Janeiro",
        "categoria":  "Despesa Operacional",
        "valor":  0.4,
        "tipo":  "despesa",
        "data":  "31/01/2026",
        "data_iso":  "2026-01-31",
        "mes":  "Janeiro"
    },
    {
        "id":  "desp_6",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  170,
        "tipo":  "despesa",
        "data":  "09/02/2026",
        "data_iso":  "2026-02-09",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_7",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  47.61,
        "tipo":  "despesa",
        "data":  "20/02/2026",
        "data_iso":  "2026-02-20",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_8",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "20/02/2026",
        "data_iso":  "2026-02-20",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_9",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  1945,
        "tipo":  "despesa",
        "data":  "23/02/2026",
        "data_iso":  "2026-02-23",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_10",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  775.8,
        "tipo":  "despesa",
        "data":  "23/02/2026",
        "data_iso":  "2026-02-23",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_11",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  0.17,
        "tipo":  "despesa",
        "data":  "28/02/2026",
        "data_iso":  "2026-02-28",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_12",
        "descricao":  "Despesa Operacional Fevereiro",
        "categoria":  "Despesa Operacional",
        "valor":  0.54,
        "tipo":  "despesa",
        "data":  "28/02/2026",
        "data_iso":  "2026-02-28",
        "mes":  "Fevereiro"
    },
    {
        "id":  "desp_13",
        "descricao":  "Despesa Operacional Março",
        "categoria":  "Despesa Operacional",
        "valor":  800,
        "tipo":  "despesa",
        "data":  "12/03/2026",
        "data_iso":  "2026-03-12",
        "mes":  "Março"
    },
    {
        "id":  "desp_14",
        "descricao":  "Despesa Operacional Março",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "20/03/2026",
        "data_iso":  "2026-03-20",
        "mes":  "Março"
    },
    {
        "id":  "desp_15",
        "descricao":  "Despesa Operacional Março",
        "categoria":  "Despesa Operacional",
        "valor":  0.88,
        "tipo":  "despesa",
        "data":  "30/03/2026",
        "data_iso":  "2026-03-30",
        "mes":  "Março"
    },
    {
        "id":  "desp_16",
        "descricao":  "Despesa Operacional Março",
        "categoria":  "Despesa Operacional",
        "valor":  0.62,
        "tipo":  "despesa",
        "data":  "30/03/2026",
        "data_iso":  "2026-03-30",
        "mes":  "Março"
    },
    {
        "id":  "desp_17",
        "descricao":  "Despesa Operacional Abril",
        "categoria":  "Despesa Operacional",
        "valor":  240,
        "tipo":  "despesa",
        "data":  "13/04/2026",
        "data_iso":  "2026-04-13",
        "mes":  "Abril"
    },
    {
        "id":  "desp_18",
        "descricao":  "Despesa Operacional Abril",
        "categoria":  "Despesa Operacional",
        "valor":  132.08,
        "tipo":  "despesa",
        "data":  "13/04/2026",
        "data_iso":  "2026-04-13",
        "mes":  "Abril"
    },
    {
        "id":  "desp_19",
        "descricao":  "Despesa Operacional Abril",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "20/04/2026",
        "data_iso":  "2026-04-20",
        "mes":  "Abril"
    },
    {
        "id":  "desp_20",
        "descricao":  "Despesa Operacional Abril",
        "categoria":  "Despesa Operacional",
        "valor":  193.67,
        "tipo":  "despesa",
        "data":  "24/04/2026",
        "data_iso":  "2026-04-24",
        "mes":  "Abril"
    },
    {
        "id":  "desp_21",
        "descricao":  "Despesa Operacional Abril",
        "categoria":  "Despesa Operacional",
        "valor":  1.34,
        "tipo":  "despesa",
        "data":  "30/04/2026",
        "data_iso":  "2026-04-30",
        "mes":  "Abril"
    },
    {
        "id":  "desp_22",
        "descricao":  "Despesa Operacional Maio",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "20/05/2026",
        "data_iso":  "2026-05-20",
        "mes":  "Maio"
    },
    {
        "id":  "desp_23",
        "descricao":  "Despesa Operacional Maio",
        "categoria":  "Despesa Operacional",
        "valor":  11.31,
        "tipo":  "despesa",
        "data":  "04/05/2026",
        "data_iso":  "2026-05-04",
        "mes":  "Maio"
    },
    {
        "id":  "desp_24",
        "descricao":  "Despesa Operacional Maio",
        "categoria":  "Despesa Operacional",
        "valor":  1.28,
        "tipo":  "despesa",
        "data":  "31/05/2026",
        "data_iso":  "2026-05-31",
        "mes":  "Maio"
    },
    {
        "id":  "desp_25",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  25,
        "tipo":  "despesa",
        "data":  "11/06/2026",
        "data_iso":  "2026-06-11",
        "mes":  "Junho"
    },
    {
        "id":  "desp_26",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  440.66,
        "tipo":  "despesa",
        "data":  "11/06/2026",
        "data_iso":  "2026-06-11",
        "mes":  "Junho"
    },
    {
        "id":  "desp_27",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  184,
        "tipo":  "despesa",
        "data":  "11/06/2026",
        "data_iso":  "2026-06-11",
        "mes":  "Junho"
    },
    {
        "id":  "desp_28",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  25,
        "tipo":  "despesa",
        "data":  "15/06/2026",
        "data_iso":  "2026-06-15",
        "mes":  "Junho"
    },
    {
        "id":  "desp_29",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  25,
        "tipo":  "despesa",
        "data":  "17/06/2026",
        "data_iso":  "2026-06-17",
        "mes":  "Junho"
    },
    {
        "id":  "desp_30",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  80.85,
        "tipo":  "despesa",
        "data":  "18/06/2026",
        "data_iso":  "2026-06-18",
        "mes":  "Junho"
    },
    {
        "id":  "desp_31",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  248.35,
        "tipo":  "despesa",
        "data":  "22/06/2026",
        "data_iso":  "2026-06-22",
        "mes":  "Junho"
    },
    {
        "id":  "desp_32",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  35.66,
        "tipo":  "despesa",
        "data":  "22/06/2026",
        "data_iso":  "2026-06-22",
        "mes":  "Junho"
    },
    {
        "id":  "desp_33",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "22/06/2026",
        "data_iso":  "2026-06-22",
        "mes":  "Junho"
    },
    {
        "id":  "desp_34",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  36,
        "tipo":  "despesa",
        "data":  "23/06/2026",
        "data_iso":  "2026-06-23",
        "mes":  "Junho"
    },
    {
        "id":  "desp_35",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  25,
        "tipo":  "despesa",
        "data":  "24/06/2026",
        "data_iso":  "2026-06-24",
        "mes":  "Junho"
    },
    {
        "id":  "desp_36",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  0.71,
        "tipo":  "despesa",
        "data":  "30/06/2026",
        "data_iso":  "2026-06-30",
        "mes":  "Junho"
    },
    {
        "id":  "desp_37",
        "descricao":  "Despesa Operacional Junho",
        "categoria":  "Despesa Operacional",
        "valor":  1.35,
        "tipo":  "despesa",
        "data":  "30/06/2026",
        "data_iso":  "2026-06-30",
        "mes":  "Junho"
    },
    {
        "id":  "desp_38",
        "descricao":  "Despesa Operacional Julho",
        "categoria":  "Despesa Operacional",
        "valor":  384,
        "tipo":  "despesa",
        "data":  "17/07/2026",
        "data_iso":  "2026-07-17",
        "mes":  "Julho"
    },
    {
        "id":  "desp_39",
        "descricao":  "Despesa Operacional Julho",
        "categoria":  "Despesa Operacional",
        "valor":  35,
        "tipo":  "despesa",
        "data":  "20/07/2026",
        "data_iso":  "2026-07-20",
        "mes":  "Julho"
    },
    {
        "id":  "desp_40",
        "descricao":  "Despesa Operacional Julho",
        "categoria":  "Despesa Operacional",
        "valor":  38.88,
        "tipo":  "despesa",
        "data":  "22/07/2026",
        "data_iso":  "2026-07-22",
        "mes":  "Julho"
    },
    {
        "id":  "desp_41",
        "descricao":  "Despesa Operacional Julho",
        "categoria":  "Despesa Operacional",
        "valor":  19.93,
        "tipo":  "despesa",
        "data":  "27/07/2026",
        "data_iso":  "2026-07-27",
        "mes":  "Julho"
    },
    {
        "id":  "desp_42",
        "descricao":  "Despesa Operacional Julho",
        "categoria":  "Despesa Operacional",
        "valor":  1.35,
        "tipo":  "despesa",
        "data":  "31/07/2026",
        "data_iso":  "2026-07-31",
        "mes":  "Julho"
    }
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
    if (tabId === 'gestao-financeira') renderGestaoFinanceira();
    if (tabId === 'overview-associado') renderAssociadoOverview();
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

function excluirDocumento(id) {
    if (confirm('Deseja realmente excluir este documento do repositório?')) {
        let docs = JSON.parse(localStorage.getItem('acbcsj_documentos')) || [];
        docs = docs.filter(d => d.id !== id);
        localStorage.setItem('acbcsj_documentos', JSON.stringify(docs));
        alert('Documento excluído com sucesso.');
        renderDocumentos();
    }
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
// GESTÃƒO FINANCEIRA, RECEITAS, DESPESAS E MENSALIDADES (PLANILHA MENSAL.XLSX)
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
        modalTitle.textContent = tipo === 'despesa' ? 'âž– Inserir Despesa (SaÃ­da)' : 'âž• Inserir Receita (Entrada)';
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
            <option value="Mensalidade / ContribuiÃ§Ã£o">Mensalidade / ContribuiÃ§Ã£o</option>
            <option value="DoaÃ§Ã£o / ConvÃªnio">DoaÃ§Ã£o / ConvÃªnio</option>
            <option value="Evento / Rifa">Evento / Rifa</option>
            <option value="Outras Receitas">Outras Receitas</option>
        `;
    } else {
        catSelect.innerHTML = `
            <option value="Despesa Operacional">Despesa Operacional</option>
            <option value="ManutenÃ§Ã£o de Viatura">ManutenÃ§Ã£o de Viatura</option>
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
        alert('Por favor, preencha a descriÃ§Ã£o, valor vÃ¡lido e a data do lanÃ§amento.');
        return;
    }

    const [ano, mes, dia] = dataInput.split('-');
    const dataBR = `${dia}/${mes}/${ano}`;
    const mesesNomes = ['Janeiro','Fevereiro','MarÃ§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
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

        alert(`LanÃ§amento de ${tipo.toUpperCase()} (R$ ${valor.toFixed(2).replace('.', ',')}) cadastrado com sucesso!`);
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
    if (confirm('Deseja realmente remover este lanÃ§amento financeiro?')) {
        let list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
        list = list.filter(item => item.id !== id);
        localStorage.setItem('acbcsj_financeiro', JSON.stringify(list));
        idbStorage.deleteFile(id);
        alert('LanÃ§amento removido com sucesso.');
        renderGestaoFinanceira();
    }
}

async function abrirComprovanteLancamento(id) {
    const fileContent = await idbStorage.getFile(id);
    if (!fileContent) {
        alert('Comprovante nÃ£o disponÃ­vel para este lanÃ§amento.');
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
        alert('VisualizaÃ§Ã£o bloqueada pelo navegador.');
    }
}

function renderGestaoFinanceira() {
    const list = JSON.parse(localStorage.getItem('acbcsj_financeiro')) || [];
    const filtroTipoSelect = document.getElementById('finFiltroTipo');
    const filtroTipo = filtroTipoSelect ? filtroTipoSelect.value : 'todos';

    let totalReceitas = 0;
    let totalDespesas = 0;

    list.forEach(item => {
        const val = parseFloat(item.valor) || 0;
        if (item.tipo === 'receita') {
            totalReceitas += val;
        } else {
            totalDespesas += val;
        }
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

    const container = document.getElementById('tableFinanceiroBody');
    if (container) {
        let filtrados = list;
        if (filtroTipo !== 'todos') {
            filtrados = list.filter(i => i.tipo === filtroTipo);
        }

        if (filtrados.length === 0) {
            container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum lançamento registrado.</td></tr>`;
        } else {
            container.innerHTML = filtrados.map(item => `
                <tr>
                    <td><b>${item.data || '-'}</b></td>
                    <td>${item.descricao}</td>
                    <td><span class="badge badge-info">${item.categoria}</span></td>
                    <td>
                        <span class="badge badge-${item.tipo === 'receita' ? 'success' : 'danger'}">
                            ${item.tipo === 'receita' ? '➕ RECEITA' : '➖ DESPESA'}
                        </span>
                    </td>
                    <td style="font-weight: 700; color: ${item.tipo === 'receita' ? '#2ECC71' : '#E74C3C'};">
                        ${item.tipo === 'receita' ? '+' : '-'} R$ ${(parseFloat(item.valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                        <div style="display:flex; gap:6px;">
                            ${item.comprovante_nome ? `<button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 6px; color:var(--accent-gold); border-color:var(--accent-gold);" onclick="abrirComprovanteLancamento('${item.id}')">📎 Ver Recibo</button>` : ''}
                            <button class="btn btn-sm btn-outline" style="font-size:11px; padding:2px 6px; color:#E74C3C; border-color:#E74C3C;" onclick="excluirLancamentoFinanceiro('${item.id}')">🗑️ Excluir</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function renderAssociadoOverview() {
    const welcome = document.getElementById('associadoWelcomeName');
    if (welcome && currentUser) {
        welcome.textContent = currentUser.nome_guerra || currentUser.nome;
    }

    const grid = JSON.parse(localStorage.getItem('acbcsj_mensalidades_grid')) || INITIAL_MENSAL_DATA || [];
    const container = document.getElementById('tableMinhasMensalidadesBody');
    if (!container || !currentUser) return;

    const socio = grid.find(s => {
        const ng = (s.nome_guerra || '').toLowerCase();
        const nc = (s.nome_completo || '').toLowerCase();
        const userNg = (currentUser.nome_guerra || '').toLowerCase();
        const userNc = (currentUser.nome || '').toLowerCase();
        return (ng && userNg && ng === userNg) || (nc && userNc && nc === userNc) || (userNc && nc.includes(userNc));
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
                </td>
            </tr>
        `;
    }).join('');
}-muted)'};">
                    R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span class="badge badge-${pago ? 'success' : 'warning'}">
                        ${pago ? 'âœ… PAGO / BAIXADO' : 'â³ EM ABERTO / PENDENTE'}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}