-- SCRIPT SQL LIMPO E COMPLETO PARA O PORTAL ACBCSJ (SUPABASE / POSTGRESQL)
-- Cole este script no SQL Editor do seu painel Supabase e clique em RUN.

-- 1. APAGAR AS TABELAS ANTIGAS E RESTRIÇÕES INCOMPATÍVEIS
DROP TABLE IF EXISTS public.mensagens CASCADE;
DROP TABLE IF EXISTS public.documentos CASCADE;
DROP TABLE IF EXISTS public.programacao_anual CASCADE;
DROP TABLE IF EXISTS public.mensalidades CASCADE;
DROP TABLE IF EXISTS public.financeiro_lancamentos CASCADE;
DROP TABLE IF EXISTS public.associados CASCADE;

-- 2. RECRIAR AS TABELAS COM ID DO TIPO TEXT E CAMPOS COMPATÍVEIS
CREATE TABLE public.associados (
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

CREATE TABLE public.financeiro_lancamentos (
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

CREATE TABLE public.mensalidades (
    id TEXT PRIMARY KEY,
    associado_id TEXT REFERENCES public.associados(id) ON DELETE CASCADE,
    cpf VARCHAR(14),
    ano VARCHAR(10),
    mes_referencia VARCHAR(20),
    valor NUMERIC(10, 2) DEFAULT 20.00,
    status VARCHAR(20) DEFAULT 'pendente',
    data_pagamento VARCHAR(50),
    observacoes TEXT
);

CREATE TABLE public.documentos (
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

CREATE TABLE public.mensagens (
    id TEXT PRIMARY KEY,
    associado_id TEXT REFERENCES public.associados(id) ON DELETE CASCADE,
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

-- 3. HABILITAR PERMISSÕES DE ACESSO (RLS)
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro_lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensalidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensagens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir tudo associados" ON public.associados FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo financeiro" ON public.financeiro_lancamentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo mensalidades" ON public.mensalidades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo documentos" ON public.documentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo mensagens" ON public.mensagens FOR ALL USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
