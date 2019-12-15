import { GET_LANGUAGE } from "../actions/actions";
import initialState from "../initialState";

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_LANGUAGE:
            return { ...state, language: action.language };
        default:
            return state;
    }
}