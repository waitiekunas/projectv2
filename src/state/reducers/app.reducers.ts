import { createReducer } from '@reduxjs/toolkit';

import { setShowLoginRegisterForm } from './../actions/actions';

export interface AppState{
    showLoginRegister:boolean;
}

export const initialAppState:AppState={
    showLoginRegister:false
}

export const appReducer = createReducer<AppState>(
    initialAppState,
    (builder)=>{
        builder
        .addCase(setShowLoginRegisterForm,(state, {payload})=>({
            ...state,
            showLoginRegister:payload
        }))
    }
)