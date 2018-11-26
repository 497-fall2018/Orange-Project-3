import axios from 'axios';
import APIConfig from '../config/api';

// action types
export const MAKE_ROOM = 'roo/host/MAKE_ROOM';
export const MAKE_ROOM_SUCCESS = 'roo/host/MAKE_ROOM_SUCCESS';
export const MAKE_ROOM_FAILURE = 'roo/host/MAKE_ROOM_FAILURE';

const INITIAL_STATE = {
    roomcode: "",
    error_message: "",
    username: "",
};

// reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case MAKE_ROOM:
        case MAKE_ROOM_SUCCESS:
            if (action.payload) {
                return {
                    ...state,
                    roomcode: action.payload.roomcode,
                    username: action.payload.username,
                    error_message: "",
                }
            }
        case MAKE_ROOM_FAILURE:
            return {
                ...state,
                error_message: "Check with your facilitator for your room name"
            }
        
        default:
            return state;
    }
}

// thunk combo

// thunk
export function thunk_make_room (roomcode) {
    return (dispatch, getState) => {
        dispatch({ type: MAKE_ROOM });
        var generateName = require('sillyname');
        var username = generateName();
        const url = APIConfig.apiRoot + '/makeroom';
        return axios.post(url, {roomcode, username})
            .then((response) => {
                dispatch({
                    type: MAKE_ROOM_SUCCESS,
                    payload: {roomcode, username}
                })
            })
            .catch((err) => {
                dispatch({
                    type: MAKE_ROOM_FAILURE,
                })
            })
    }
}

// action creators