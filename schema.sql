-- SCRIPT SQL ATUALIZADO PARA O PORTAL ACBCSJ (SUPABASE / POSTGRESQL)
-- Cole este script no SQL Editor do seu painel Supabase para criar/atualizar as tabelas e colunas.

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
    perfil VARCHAR(20) DEFAULT 'associado',
    status VARCHAR(20) DEFAULT 'pendente',
    data_cadastro VARCHAR(100),
    data_desligamento VARCHAR(100),
    motivo_desligamento TEXT,
    carta_desligamento_url TEXT,
    carta_desligamento_nome TEXT
);

-- GARANTIR QUE TODAS AS COLUNAS EXISTAM SE A TABELA JÁ FOI CRIADA ANTERIORMENTE
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS bairro VARCHAR(100);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS cidade VARCHAR(100) DEFAULT 'São José - SC';
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS obm VARCHAR(100) DEFAULT 'São José';
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS profissao VARCHAR(100) DEFAULT 'Bombeiro Comunitário';
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS data_desligamento VARCHAR(100);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS motivo_desligamento TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS carta_desligamento_url TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS carta_desligamento_nome TEXT;
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS nome_guerra VARCHAR(100);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS nome_pai VARCHAR(150);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS nome_mae VARCHAR(150);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS sexo VARCHAR(20);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS telefone VARCHAR(30);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS logradouro VARCHAR(200);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS numero VARCHAR(20);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS complemento VARCHAR(100);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS cep VARCHAR(20);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS email VARCHAR(150);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS senha VARCHAR(255);
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS perfil VARCHAR(20) DEFAULT 'associado';
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ativo';
ALTER TABLE public.associados ADD COLUMN IF NOT EXISTS data_cadastro VARCHAR(100);

-- 2. TABELA DE CONTROLE FINANCEIRO (ENTRADAS E SAÍDAS / FORNECEDORES)
CREATE TABLE IF NOT EXISTS public.financeiro_lancamentos (
    id TEXT PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
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

ALTER TABLE public.financeiro_lancamentos ADD COLUMN IF NOT EXISTS data VARCHAR(50);
ALTER TABLE public.financeiro_lancamentos ADD COLUMN IF NOT EXISTS data_iso VARCHAR(50);
ALTER TABLE public.financeiro_lancamentos ADD COLUMN IF NOT EXISTS mes VARCHAR(50);
ALTER TABLE public.financeiro_lancamentos ADD COLUMN IF NOT EXISTS comprovante_nome TEXT;
ALTER TABLE public.financeiro_lancamentos ADD COLUMN IF NOT EXISTS comprovante_url TEXT;

-- 3. TABELA DE MENSALIDADES DOS ASSOCIADOS
CREATE TABLE IF NOT EXISTS public.mensalidades (
    id TEXT PRIMARY KEY,
    associado_id TEXT,
    cpf VARCHAR(14),
    ano VARCHAR(10),
    mes_referencia VARCHAR(20),
    valor NUMERIC(10, 2) DEFAULT 20.00,
    status VARCHAR(20) DEFAULT 'pendente',
    data_pagamento VARCHAR(50),
    observacoes TEXT
);

-- 4. TABELA DE DOCUMENTOS, ATAS E BALANCETES
CREATE TABLE IF NOT EXISTS public.documentos (
    id TEXT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    visibilidade VARCHAR(20) DEFAULT 'todos',
    data_vencimento VARCHAR(50),
    descricao TEXT,
    arquivo_url TEXT,
    arquivo_nome VARCHAR(255),
    data_publicacao VARCHAR(100)
);

-- 5. TABELA DE MENSAGENS E COMUNICADOS
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
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir tudo associados" ON public.associados;
DROP POLICY IF EXISTS "Permitir tudo financeiro" ON public.financeiro_lancamentos;
DROP POLICY IF EXISTS "Permitir tudo mensalidades" ON public.mensalidades;
DROP POLICY IF EXISTS "Permitir tudo documentos" ON public.documentos;
DROP POLICY IF EXISTS "Permitir tudo mensagens" ON public.mensagens;

CREATE POLICY "Permitir tudo associados" ON public.associados FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo financeiro" ON public.financeiro_lancamentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo mensalidades" ON public.mensalidades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo documentos" ON public.documentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo mensagens" ON public.mensagens FOR ALL USING (true) WITH CHECK (true);

-- NOTIFICAR O SUPABASE PARA RECARREGAR O CACHE DE COLUNAS
NOTIFY pgrst, 'reload schema';
