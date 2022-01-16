import { validarClienteSelecionado, validarFilmeSelecionado } from './NovaLocacao';

describe('tela adicionar locaçao', () => {   

    test('funcao de validar cliente selecionado deve recusar nulos', () => {
        const dados = null
        expect(validarClienteSelecionado(dados)).not.toBe(true)
    })
    test('funcao de validar cliente selecionado deve aceitar valores nao nulos', () => {
        const dados = 1
        expect(validarClienteSelecionado(dados)).toBe(true)
    })   
    test('funcao de validar filme selecionado deve recusar nulos', () => {
        const dados = null
        expect(validarFilmeSelecionado(dados)).not.toBe(true)
    })
    test('funcao de validar filme selecionado deve aceitar valores nao nulos', () => {
        const dados = 1
        expect(validarFilmeSelecionado(dados)).toBe(true)
    })
     
})