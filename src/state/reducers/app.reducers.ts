import { createReducer } from '@reduxjs/toolkit';

import { ResponseMessageInfo } from '../../types/appState';
import { setResponseMessageAction, setShowLoginRegisterForm, setShowUserInfo } from './../actions/actions';

export interface AppState{
    showLoginRegister:boolean;
    showUserInfo:boolean;
    responseMessageInfo:ResponseMessageInfo
}

export const initialAppState:AppState={
    showLoginRegister:false,
    showUserInfo:false,
    responseMessageInfo:{
        text:'',
        show:false,
    }
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
        .addCase(setResponseMessageAction,(state,{payload})=>({
            ...state,
            responseMessageInfo:payload
        }))
    }
)