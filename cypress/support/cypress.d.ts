declare namespace Cypress {
    interface Chainable<Subject> {
        lojinhaLogin(usuario: string, senha: string): Chainable<Subject>;
    }
}