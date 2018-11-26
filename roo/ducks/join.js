import axios from 'axios';
import APIConfig from '../config/api';

// action types
export const JOIN_ROOM = 'roo/join/JOIN_ROOM';
export const JOIN_ROOM_SUCCESS = 'roo/join/JOIN_ROOM_SUCCESS';
export const JOIN_ROOM_FAILURE = 'roo/join/JOIN_ROOM_FAILURE';

const INITIAL_STATE = {
    roomcode: "",
    error_message: "",
    username: "",
};

// reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case JOIN_ROOM:
        case JOIN_ROOM_SUCCESS:
            if (action.payload) {
                var generateName = require('sillyname');
                var username = generateName();
                return {
                    ...state,
                    roomcode: action.payload,
                    error_message: "",
                    username: username
                }
            }
            
        case JOIN_ROOM_FAILURE:
            return {
                ...state,
                error_message: "Check with your facilitator for your room name",
                roomcode: ""
            }
        
        default:
            return state;
    }
}

// thunk combo

// thunk
export function thunk_join_room (roomcode) {
    return (dispatch, getState) => {
        dispatch({ type: JOIN_ROOM });
        const url = APIConfig.apiRoot + '/checkroom';
        return axios.post(url, {roomcode})
            .then((response) => {
                dispatch({
                    type: JOIN_ROOM_SUCCESS,
                    payload: roomcode
                })

            })
            .catch((err) => {
                dispatch({
                    type: JOIN_ROOM_FAILURE,
                })
            })
    }
}

// action creators
