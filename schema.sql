-- SCRIPT SQL PARA O PORTAL ACBCSJ (SUPABASE / POSTGRESQL)
-- Cole este script no SQL Editor do seu projeto Supabase para criar as tabelas automaticamente.

-- 1. TABELA DE ASSOCIADOS E DIRETORIA
CREATE TABLE IF NOT EXISTS public.associados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    nome_guerra VARCHAR(100) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    data_nascimento DATE,
    nome_mae VARCHAR(150) NOT NULL,
    nome_pai VARCHAR(150),
    sexo VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    cep VARCHAR(10),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL DEFAULT 'São José - SC',
    email VARCHAR(150),
    senha VARCHAR(255),
    perfil VARCHAR(20) NOT NULL DEFAULT 'associado', -- 'diretoria' ou 'associado'
    status VARCHAR(20) NOT NULL DEFAULT 'pendente', -- 'ativo', 'pendente', 'desligado'
    data_cadastro VARCHAR(100),
    data_desligamento VARCHAR(100),
    motivo_desligamento TEXT,
    carta_desligamento_url TEXT,
    carta_desligamento_nome TEXT
);

-- 2. TABELA DE CONTROLE FINANCEIRO (ENTRADAS E SAÍDAS / FORNECEDORES)
CREATE TABLE IF NOT EXISTS public.financeiro_lancamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(10) NOT NULL, -- 'receita' ou 'despesa'
    descricao VARCHAR(255) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    fornecedor_cliente VARCHAR(150),
    data_lancamento DATE NOT NULL DEFAULT CURRENT_DATE,
    comprovante_url TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE MENSALIDADES DOS ASSOCIADOS
CREATE TABLE IF NOT EXISTS public.mensalidades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    associado_id UUID REFERENCES public.associados(id) ON DELETE CASCADE,
    mes_referencia VARCHAR(7) NOT NULL, -- formato YYYY-MM (ex: 2026-08)
    valor NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente', -- 'pago', 'pendente', 'atrasado'
    data_pagamento DATE,
    observacoes TEXT
);

-- 4. TABELA DE DOCUMENTOS, ATAS E BALANCETES
CREATE TABLE IF NOT EXISTS public.documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL, -- 'ata', 'balancete', 'estatuto', 'convite', 'outro'
    descricao TEXT,
    arquivo_url TEXT,
    data_publicacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABELA DE PROGRAMAÇÃO ANUAL / EVENTOS
CREATE TABLE IF NOT EXISTS public.programacao_anual (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    data_evento DATE NOT NULL,
    local VARCHAR(200),
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'agendado' -- 'agendado', 'realizado', 'cancelado'
);

-- 6. TABELA DE MENSAGENS E IDEIAS ENVIADAS PELOS ASSOCIADOS
CREATE TABLE IF NOT EXISTS public.mensagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    associado_id UUID REFERENCES public.associados(id) ON DELETE CASCADE,
    assunto VARCHAR(200) NOT NULL,
    conteudo TEXT NOT NULL,
    resposta_diretoria TEXT,
    status VARCHAR(20) DEFAULT 'pendente', -- 'pendente', 'respondida', 'arquivada'
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- POLÍTICAS DE USO GERAL
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro_lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensalidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programacao_anual ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso público associados" ON public.associados FOR ALL USING (true);
CREATE POLICY "Acesso público financeiro" ON public.financeiro_lancamentos FOR ALL USING (true);
CREATE POLICY "Acesso público mensalidades" ON public.mensalidades FOR ALL USING (true);
CREATE POLICY "Acesso público documentos" ON public.documentos FOR ALL USING (true);
CREATE POLICY "Acesso público programacao" ON public.programacao_anual FOR ALL USING (true);
CREATE POLICY "Acesso público mensagens" ON public.mensagens FOR ALL USING (true);
