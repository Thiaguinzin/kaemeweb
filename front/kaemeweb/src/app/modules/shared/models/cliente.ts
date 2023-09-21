export interface Cliente {
  id?: number;
  nome: string;
  dataNasc: Date | null;
  signo: string | null;
  cpf: string | null;
  telefone: string | null;
  email: string | null;
  instagram: string | null;
  meioCaptacao: string | null;
  logradouro: string | null;
  numero: number | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: number | null;
  sexo: string | null;
  dataCriacao: Date;
  criadoPor: number;
}
