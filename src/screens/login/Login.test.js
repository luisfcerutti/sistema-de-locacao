import { render, screen, fireEvent } from '@testing-library/react';
import { validarSenha, validarUsuario } from './Login';

describe('tela login', () => {   

    test('funcao de validar usuário deve passar com tamanho correto', () => {
        const texto = 'admin'
        expect(validarUsuario(texto)).toBe(true)
    })
    test('funcao de validar usuário deve rejeitar com tamanho incorreto', () => {
        const texto = 'user'
        expect(validarUsuario(texto)).not.toBe(true)
    })
    test('funcao de validar senha deve passar com tamanho correto', () => {
        const texto = '654321'
        expect(validarSenha(texto)).toBe(true)
    })
    test('funcao de validar senha deve rejeitar com tamanho incorreto', () => {
        const texto = '65432'
        expect(validarSenha(texto)).not.toBe(true)
    })    
})