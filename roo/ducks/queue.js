import axios from 'axios';
import APIConfig from '../config/api';

// action types
export const JOIN_ROOM = 'roo/queue/JOIN_ROOM';
export const JOINED_ROOM = 'roo/queue/JOINED_ROOM';
export const SEND_ENTRY = 'roo/queue/SEND_ENTRY';
export const GOT_NEW_ENTRY = 'roo/queue/GOT_NEW_ENTRY';


const INITIAL_STATE = {
    error_message: "",
    entries: ['mark', 'Pepperbinder Lady'],
};

// reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case JOIN_ROOM:
        case JOINED_ROOM:
            // if (action.payload) {
            //     console.log(action.payload)
            //     return {
            //         ...state,
            //         entries: action.payload
            //     }
            // }
        case GOT_NEW_ENTRY:
            if (action.payload) {
                var new_entries = state.entries.slice()
                new_entries.push(action.payload)
                return {
                    ...state,
                    entries: new_entries
                }
            }
        case SEND_ENTRY:
            var new_entries = state.entries.slice()
            new_entries.push(action.payload)
            return {
                ...state,
                entries: new_entries
            }
        
        default:
            return state;
    }
}

// thunk combo

// thunk

export const join_room = (socket, room, username) => {
	return (dispatch, getState) => {
        dispatch({ 
            type: JOIN_ROOM,
        })
        socket.emit('join', {username, room})
	}	
}

export const joined_room = (entries) => {
    return (dispatch) => {
        dispatch({
            type: JOINED_ROOM,
            payload: entries
        })
    }
}

export const send_entry = (socket, room, username) => {
    return (dispatch, getState) => {
        dispatch({
            type: SEND_ENTRY,
            payload: username
        })
        socket.emit('new_entry', {username, room})
    }
}

export const got_new_entry = (new_entry) => {
    return (dispatch, getState) => {
        dispatch({
            type: GOT_NEW_ENTRY,
            payload: new_entry
        }) 
    }
}

// action creators