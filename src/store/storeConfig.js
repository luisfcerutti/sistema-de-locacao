import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'

import usuarioReducer from './reducers/usuario'
import clientesReducer from './reducers/clientes'
import locacoesReducer from './reducers/locacoes'
import filmesReducer from './reducers/filmes'

const persistConfig = {
    key: 'root',
    storage
}
  
const rootReducer = combineReducers({
    usuario: usuarioReducer,
    clientes: clientesReducer,
    filmes: filmesReducer,
    locacoes: locacoesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = () => {
    let storeConfig = createStore(persistedReducer,applyMiddleware(thunk,))
    let persistor = persistStore(storeConfig)
    return { storeConfig, persistor }
}

export default store
