
describe('Acessibilidade', () => {

    const seletores = {
        usuario: '#usuario',
        password: '#senha',
        tituloProdutos: 'h3',
        titulolLogin: 'h4',
    }

    const valores = {
        tituloLogin: 'Acessar a Lojinha',
        tituloProdutos: 'Lista de Produtos',
        usuario: 'admin',
        password: 'admin',
    }


    Cypress.Commands.add('lojinhaLogin',{prevSubject: 'optional' }, (subject, usuario:string,senha:string) => {
        cy.session('loginLojinha', () => {
            cy
                .visit('/')
                .get(seletores.titulolLogin)
                .should('contain', valores.tituloLogin)
                .get(seletores.usuario)
                .click({force:true})
                .type(usuario)
                .get(seletores.password)
                .click({force:true})
                .type(senha)
                .type('{enter}')
            ;

        })
    });

    beforeEach(() => {

    });

    it('deve verificar por problemas de acessibilidade na página de login', function () {
        cy.visit('/')
        cy.injectAxe()
        cy.get(seletores.titulolLogin)
            .should('contain', valores.tituloLogin)
        cy.checkA11y()
    });

    ['.blue-grey','h3','.row'].forEach((elemento) => {
        it(`deve verificar por problemas de acessibilidade na ${elemento}`,  () => {
            cy.lojinhaLogin(valores.usuario, valores.password)
                .then(() => {
                    cy.visit('/produto')
                        .get(seletores.tituloProdutos, {timeout: 10000})
                        .should('contain', valores.tituloProdutos)
                    cy.injectAxe()
                    cy.checkA11y(elemento, {
                        runOnly: {
                            type: 'tag',
                            values: ['wcag2a']
                        }
                    })
                })
        });
    })
});