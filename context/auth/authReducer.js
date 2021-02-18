import { 
    REGISTRO_EXITOSO,  
    REGISTRO_ERROR, 
    LIMPIAR_ALERTA, 
    LOGIN_ERROR, 
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

export default (state, action ) => {
    // Se van a evaluar acciones
    switch(action.type){
        case LOGIN_ERROR:
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
            return {
                ...state, //crea una copia del state actual
                mensaje: action.payload //cambia el valor del state
            }
            break;
        case LOGIN_EXITOSO:
            localStorage.setItem('rns_token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
            break;
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
            break;
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
            break;
        case CERRAR_SESION:
            localStorage.removeItem('rns_token');
            return  {
                ...state,
                usuario: null,
                token: null,
                autenticado: null
            }
            break;
        default:
            return state;
    }
}