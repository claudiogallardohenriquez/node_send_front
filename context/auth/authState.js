// Este archivo tiene las acciones que disparan los reducers

import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    LIMPIAR_ALERTA, 
    LOGIN_ERROR, 
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';


// children -> son los componentes donde se va a utilizar este context
const AuthState = ({ children }) => {


    // Definir un state inicial de la aplicacion
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('rns_token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    };

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // funcion para registrar nuevos usuarios
    const registrarUsuario = async datos => {
        console.log(datos);

        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });

        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }

        // limpiar la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    };

    // function para autenticar usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }

        // limpiar la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    };

    // funcion que retorne el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('rns_token');
        
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    // cerrar la sesion
    const cerrarSesion = () => {
        console.log('Desde cerrar sesion');
        dispatch({
            type: CERRAR_SESION
        })
    };

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
};

export default AuthState;
