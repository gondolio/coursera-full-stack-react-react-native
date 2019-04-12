import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import { comments } from './comments';
import { dishes } from './dishes';
import { favorites } from './favorites';
import { leaders } from './leaders';
import { promotions } from './promotions';

export const ConfigureStore = () => {  
    const config = {
        key: 'root',
        storage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers(
            config,
            {
                dishes,
                comments,
                promotions,
                leaders,
                favorites,
            }
        ),
        applyMiddleware(thunk, logger)
    );
    
    const persistor = persistStore(store);

    return { persistor, store };
};