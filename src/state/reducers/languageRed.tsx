import { GET_LANGUAGE } from "../actions/actions";
import { Language } from "../initialState";

export default (state = Language, action: any) => {
    switch (action.type) {
        case GET_LANGUAGE:
            return { ...state, language: action.payload };
        default:
            return state;
    }
}