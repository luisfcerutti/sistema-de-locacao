import { validarCPF, validarDataNascimento, validarNomeCompleto } from './AdicionarCliente';
import moment from 'moment'

describe('tela adicionar cliente', () => {   

    test('funcao de validar CPF deve aceitar CPFs corretos', () => {
        const texto = '063.778.201-19'
        expect(validarCPF(texto)).toBe(true)
    })
    test('funcao de validar CPF deve recusar CPFs incorretos', () => {
        const texto = '111.111.111-11'
        expect(validarCPF(texto)).not.toBe(true)
    })
    test('funcao de validar nome completo deve recusar uma palavra', () => {
        const texto = 'luis'
        expect(validarNomeCompleto(texto)).not.toBe(true)
    })
    test('funcao de validar nome completo deve aceitar mais de uma palavra', () => {
        const texto = 'luis fernando'
        expect(validarNomeCompleto(texto)).toBe(true)
    })
    test('funcao de validar data nascimento deve recusar nulos', () => {
        const data = null
        expect(validarDataNascimento(data)).not.toBe(true)
    })
    test('funcao de validar data nascimento deve recusar idades inferiores a 12 anos', () => {
        const data = moment().subtract(11, 'years')
        expect(validarDataNascimento(data)).not.toBe(true)
    })
    test('funcao de validar data nascimento deve aceitar idades superiores a 12 anos', () => {
        const data = moment().subtract(12, 'years')
        expect(validarDataNascimento(data)).toBe(true)
    })    
})