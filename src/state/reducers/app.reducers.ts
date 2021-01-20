import { createReducer } from '@reduxjs/toolkit';

import { setShowLoginRegisterForm, setShowUserInfo } from './../actions/actions';

export interface AppState{
    showLoginRegister:boolean;
    showUserInfo:boolean;
}

export const initialAppState:AppState={
    showLoginRegister:false,
    showUserInfo:false,
}

export const appReducer = createReducer<AppState>(
    initialAppState,
    (builder)=>{
        builder
        .addCase(setShowLoginRegisterForm,(state, {payload})=>({
            ...state,
            showLoginRegister:payload
        }))
        .addCase(setShowUserInfo,(state,{payload})=>({
            ...state,
            showUserInfo:payload
        }))
    }
)