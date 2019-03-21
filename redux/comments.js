import * as ActionTypes from './ActionTypes';

export const comments = (state = {
        isLoading: true,
        errMess: null,
        comments: []
    }, action) => {

        switch(action.type) {
            case ActionTypes.ADD_COMMENTS:
                return {...state, isLoading: false, errMess: null, comments: action.payload};

            case ActionTypes.COMMENTS_LOADING:
                return {...state, isLoading: true, errMess: null, comments: []};

            case ActionTypes.COMMENTS_FAILED:
                return {...state, isLoading: false, errMess: action.payload, comments: []};

            default:
                return state;
        }
    };