// 리듀서 객체(Object) 생성하기
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    // #5-7 주소1과 2를 1개로 합치기 수정하기 -> 래퍼
    주소:''
}
const addressReducer = createSlice({
    name:'address',
    initialState: initState,
    reducers: {
        address: (state, action)=>{
            // 주소1과 2를 1개로 합치기
            state.주소 = action.payload;
        }
    }
});
export default addressReducer.reducer;
export const {address} = addressReducer.actions;
