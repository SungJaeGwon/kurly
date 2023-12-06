// 리덕스 툴킷 파일 만들기 
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    로그인정보: null   
}

const signInReducer = createSlice({ // 메소드명
    name:'isSignin',
    initialState: initState,
    reducers: {
        signIn: (state, action)=>{
            state.로그인정보 = action.payload
        }
    }
})

export default signInReducer.reducer;
export const {signIn} = signInReducer.actions;