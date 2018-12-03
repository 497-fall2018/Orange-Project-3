import axios from 'axios';
import APIConfig from '../config/api';

// action types
export const JOIN_ROOM = 'roo/queue/JOIN_ROOM';
export const ALL_ENTRIES = 'roo/queue/ALL_ENTRIES';
export const SEND_ENTRY = 'roo/queue/SEND_ENTRY';
export const GOT_NEW_ENTRY = 'roo/queue/GOT_NEW_ENTRY';
export const DELETE_ENTRY = 'roo/queue/DELETE_ENTRY';


const INITIAL_STATE = {
    error_message: "",
    entries: [],
};

// reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case JOIN_ROOM:
        case ALL_ENTRIES:
            if (action.payload) {
                console.log(action.payload);
                return {
                    ...state,
                    entries: action.payload
                }
            }
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

// thunk
export const join_room = (socket, room, username) => {
	return (dispatch, getState) => {
        dispatch({ 
            type: JOIN_ROOM,
        })
        socket.emit('join', {username, room})
	}	
}

export const all_entries = (entries) => {
    return (dispatch) => {
        dispatch({
            type: ALL_ENTRIES,
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

export const delete_entry = (socket, target) => {
    return (dispatch, getState) => {
        var state = getState();
        var admin = state['host']
        const username = admin['username']
        const room = admin['roomcode']
        dispatch({
            type: DELETE_ENTRY,
        })
        socket.emit('delete_entry', {username, room, target})
    }
}
