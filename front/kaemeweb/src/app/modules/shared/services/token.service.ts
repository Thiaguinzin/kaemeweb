import { Injectable } from '@angular/core';

const key = 'hpw-tkn-hps';
@Injectable()
export class TokenService {
    setToken(token: string): void {
        window.localStorage.setItem(key, token);
    }

    getToken(): string {
        return window.localStorage.getItem(key);
    }

    hasToken(): boolean {
        return this.getToken() ? true : false;
    }

    removeToken(): void {
        window.localStorage.removeItem(key);
        window.localStorage.removeItem('k_user');
        window.localStorage.removeItem('k_unidade');
        window.localStorage.removeItem('k_user_perfil_id');
    }
}
