import { UsuarioLogin } from "./usuario-login";

export interface UsuarioToken {

    authenticated: boolean;
    token: string;
    Expiracao: Date;
    usuario: UsuarioLogin;
    errorMessage: string;

}
