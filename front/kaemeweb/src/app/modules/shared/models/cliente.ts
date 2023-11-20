export interface Cliente {
  id?: number;
  nome: string;
  data_Nasc?: Date | null;
  signo?: string | null;
  cpf?: string | null;
  telefone?: string | null;
  email?: string | null;
  instagram?: string | null;
  meio_Captacao?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: number | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: number | null;
  sexo: string | null;
  data_Criacao: Date;
  criado_Por: number;
}
