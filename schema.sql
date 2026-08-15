-- SCRIPT SQL ATUALIZADO PARA O PORTAL ACBCSJ (SUPABASE / POSTGRESQL)
-- Cole este script no SQL Editor do seu painel Supabase para criar/atualizar as tabelas e politicas.

-- 1. TABELA DE ASSOCIADOS E DIRETORIA
CREATE TABLE IF NOT EXISTS public.associados (
    id TEXT PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome_guerra VARCHAR(100),
    nome VARCHAR(150),
    data_nascimento VARCHAR(50),
    nome_mae VARCHAR(150),
    nome_pai VARCHAR(150),
    sexo VARCHAR(20),
    telefone VARCHAR(30),
    obm VARCHAR(100),
    profissao VARCHAR(100),
    logradouro VARCHAR(200),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    cep VARCHAR(20),
    bairro VARCHAR(100),
    cidade VARCHAR(100) DEFAULT 'São José - SC',
    email VARCHAR(150),
    senha VARCHAR(255),
    perfil VARCHAR(20) DEFAULT 'associado', -- 'diretoria' ou 'associado'
    status VARCHAR(20) DEFAULT 'pendente', -- 'ativo', 'pendente', 'desligado'
    data_cadastro VARCHAR(100),
    data_desligamento VARCHAR(100),
    motivo_desligamento TEXT,
    carta_desligamento_url TEXT,
    carta_desligamento_nome TEXT
);

-- 2. TABELA DE CONTROLE FINANCEIRO (ENTRADAS E SAÍDAS / FORNECEDORES)
CREATE TABLE IF NOT EXISTS public.financeiro_lancamentos (
    id TEXT PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL, -- 'receita' ou 'despesa'
    descricao TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    categoria VARCHAR(100),
    fornecedor_cliente VARCHAR(150),
    data VARCHAR(50),
    data_iso VARCHAR(50),
    mes VARCHAR(50),
    comprovante_nome TEXT,
    comprovante_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE MENSALIDADES DOS ASSOCIADOS
CREATE TABLE IF NOT EXISTS public.mensalidades (
    id TEXT PRIMARY KEY,
    associado_id TEXT,
    cpf VARCHAR(14),
    ano VARCHAR(10),
    mes_referencia VARCHAR(20),
    valor NUMERIC(10, 2) DEFAULT 20.00,
    status VARCHAR(20) DEFAULT 'pendente', -- 'pago', 'pendente', 'atrasado'
    data_pagamento VARCHAR(50),
    observacoes TEXT
);

-- 4. TABELA DE DOCUMENTOS, ATAS E BALANCETES
CREATE TABLE IF NOT EXISTS public.documentos (
    id TEXT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    visibilidade VARCHAR(20) DEFAULT 'todos', -- 'todos' ou 'diretoria'
    data_vencimento VARCHAR(50),
    descricao TEXT,
    arquivo_url TEXT,
    arquivo_nome VARCHAR(255),
    data_publicacao VARCHAR(100)
);

-- 5. TABELA DE PROGRAMAÇÃO ANUAL / EVENTOS
CREATE TABLE IF NOT EXISTS public.programacao_anual (
    id TEXT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    data_evento VARCHAR(50),
    local VARCHAR(200),
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'agendado'
);

-- 6. TABELA DE MENSAGENS E COMUNICADOS
CREATE TABLE IF NOT EXISTS public.mensagens (
    id TEXT PRIMARY KEY,
    associado_id TEXT,
    associado_cpf VARCHAR(14),
    associado_nome VARCHAR(150),
    destinatario VARCHAR(50) DEFAULT 'todos',
    assunto VARCHAR(200),
    conteudo TEXT,
    prioridade VARCHAR(50) DEFAULT 'Informativo',
    resposta_diretoria TEXT,
    status VARCHAR(20) DEFAULT 'pendente',
    data_envio VARCHAR(100)
);

-- POLÍTICAS DE ACESSO LIVRE (ROW LEVEL SECURITY)
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro_lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensalidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programacao_anual ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

-- REMOVER POLÍTICAS ANTIGAS SE EXISTIREM
DROP POLICY IF EXISTS "Acesso público associados" ON public.associados;
DROP POLICY IF EXISTS "Permitir tudo associados" ON public.associados;
DROP POLICY IF EXISTS "Acesso público financeiro" ON public.financeiro_lancamentos;
DROP POLICY IF EXISTS "Permitir tudo financeiro" ON public.financeiro_lancamentos;
DROP POLICY IF EXISTS "Acesso público mensalidades" ON public.mensalidades;
DROP POLICY IF EXISTS "Permitir tudo mensalidades" ON public.mensalidades;
DROP POLICY IF EXISTS "Acesso público documentos" ON public.documentos;
DROP POLICY IF EXISTS "Permitir tudo documentos" ON public.documentos;
DROP POLICY IF EXISTS "Acesso público programacao" ON public.programacao_anual;
DROP POLICY IF EXISTS "Permitir tudo programacao" ON public.programacao_anual;
DROP POLICY IF EXISTS "Acesso público mensagens" ON public.mensagens;
DROP POLICY IF EXISTS "Permitir tudo mensagens" ON public.mensagens;

-- CRIAR NOVAS POLÍTICAS COM USING (true) E WITH CHECK (true)
CREATE POLICY "Permitir tudo associados" ON public.associados FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo financeiro" ON public.financeiro_lancamentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo mensalidades" ON public.mensalidades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo documentos" ON public.documentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo programacao" ON public.programacao_anual FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo mensagens" ON public.mensagens FOR ALL USING (true) WITH CHECK (true);
