import { validarTituloFilme, validarClassificacaoFilme } from './AdicionarFilme';

describe('tela adicionar filme', () => {   

    test('funcao de validar título do filme deve aceitar apenas maior ou igual a tres caracteres', () => {
        const texto = 'abc'
        expect(validarTituloFilme(texto)).toBe(true)
    })
    test('funcao de validar título do filme deve recusar menor que tres caracteres', () => {
        const texto = 'ab'
        expect(validarTituloFilme(texto)).not.toBe(true)
    })    
    test('funcao de validar classificacao indicativa deve recusar nulos', () => {
        const dados = null
        expect(validarClassificacaoFilme(dados)).not.toBe(true)
    })
    test('funcao de validar classificacao indicativa deve aceitar valores nao nulos', () => {
        const dados = 1
        expect(validarClassificacaoFilme(dados)).toBe(true)
    })
     
})