import * as ActionTypes from './ActionTypes';

export const leaders = (state = {
        isLoading: true,
        errMess: null,
        leaders: []
    }, action) => {

        switch(action.type) {
            case ActionTypes.ADD_LEADERS:
                return {...state, isLoading: false, errMess: null, leaders: action.payload};

            case ActionTypes.LEADERS_LOADING:
                return {...state, isLoading: True, errMess: null, leaders: []};

            case ActionTypes.LEADERS_FAILED:
                return {...state, isLoading: false, errMess: action.payload, leaders: []};

            default:
                return state;
        }
    };