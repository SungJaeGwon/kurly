import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import Sub1Component from "./wrap/sub/Sub1Component";
import Sub2Component from "./wrap/sub/Sub2Component";
import Sub3Component from "./wrap/sub/Sub3Component";
import Sub4Component from "./wrap/sub/Sub4Component";
import Sub5SignUpComponent from "./wrap/sub/Sub5SignUpComponent";
import Sub6SignInComponent from "./wrap/sub/Sub6SignInComponent";
import Sub6SignInIdSearchComponent from "./wrap/sub/Sub6SignInIdSearchComponent";
import Sub6SignInPwSearchComponent from "./wrap/sub/Sub6SignInPwSearchComponent";
import Sub7NoticeComponent from "./wrap/sub/Sub7NoticeComponent";
import FooterComponent from './wrap/FooterComponent';
import MainModalComponent from './wrap/MainModalComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
import GoTopComponent from './wrap/GoTopComponent';
import ConfirmModalComponent from "./wrap/ConfirmModalComponent";
import PostcodeComponent from "./wrap/PostcodeComponent";
import ConfirmService1ModalComponent from './wrap/ConfirmService1ModalComponent';
import ConfirmService2ModalComponent from './wrap/ConfirmService2ModalComponent';
import ConfirmService3ModalComponent from './wrap/ConfirmService3ModalComponent';
import Sub6SignInIdPwSearchResultComponent from './wrap/sub/Sub6SignInIdPwSearchResultComponent';
import Sub6SignInPwResetComponent from "./wrap/sub/Sub6SignInPwResetComponent";
import Sub7NoticeInsertFormcomponent from "./wrap/sub/Sub7NoticeInsertFormcomponent";
import Sub7NoticeViewComponent from "./wrap/sub/Sub7NoticeViewComponent";
import Sub7NoticeUpdateComponent from "./wrap/sub/Sub7NoticeUpdateComponent";
import Sub7AdminSigninComponent from './wrap/sub/Sub7AdminSigninComponent';
import Sub7AdminSignupComponent from './wrap/sub/Sub7AdminSignupComponent';
import Sub7AdminIdSearchComponent from "./wrap/sub/Sub7AdminIdSearchComponent";
import Sub7AdminPwSearchComponent from "./wrap/sub/Sub7AdminPwSearchComponent";
import Sub7AdminIdSearchResultComponent from "./wrap/sub/Sub7AdminIdSearchResultComponent";
import Sub7AdminPwResetComponent from "./wrap/sub/Sub7AdminPwResetComponent";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux"; 
import { mainModal } from "./reducer/mainModal";
import { topModal } from "./reducer/topModal";
import { address } from "./reducer/address";
import { signIn } from "./reducer/signIn";

export default function WrapComponent(){

    // Sub7AdminSearchComponent.jsx


    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();


    // 상태관리 변수에 새로고침해도 
    // 게속 로그인정보를 유지하도록
    // 로컬스토레이지 데이터를 가져온다.
    React.useEffect(()=>{
        if(localStorage.getItem('KURLY_SIGNIN_INFORMATION')!==null) {                        
            const result = JSON.parse(localStorage.getItem('KURLY_SIGNIN_INFORMATION'));
            // 미션 => 상태관리 리덕스 툴킷으로 구현하기
            dispatch(signIn(result));
        }
    },[]);



    // 로딩시 또는 새로고침하면
    // 세션저장소 주소1, 주소2 값 가져온다
    // 그리고 리덕스 상태관리에 저장한다.
    // 그러면 새로고침해도 주소를 계속 유지시킨다.
    React.useEffect(()=>{
        
        if(selector.signIn.로그인정보===null &&  sessionStorage.getItem('KURLY_ADDRESS_KEY')!==null){
            const result = JSON.parse(sessionStorage.getItem('KURLY_ADDRESS_KEY'));            
            const 주소 = {
                주소1: result.주소1,
                주소2: result.주소2
            }
            dispatch(address(주소));
        }
        else  if(selector.signIn.로그인정보!==null){
            const 주소 = {
                주소1: selector.signIn.로그인정보.주소.split(',')[0]===undefined?'':selector.signIn.로그인정보.주소.split(',')[0],
                주소2: selector.signIn.로그인정보.주소.split(',')[1]===undefined?'':selector.signIn.로그인정보.주소.split(',')[1]
            }
            dispatch(address(주소));
        }

    },[selector.signIn.로그인정보]);

 
 
    // 탑모달 유효기간 확인 유지하기
    React.useEffect(()=>{
        let toDay = new Date();

        if(localStorage.getItem('KURLY_TOP_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('KURLY_TOP_MODAL_KEY'));

            if( toDay <= result.expires ){
                dispatch(topModal(false));              
            }
            else{
                dispatch(topModal(true));
            }           
        }
        return;
        
    },[]);



    // 메인모달 유효기간 확인 유지하기
    React.useEffect(()=>{
        let toDay = new Date();

        if(localStorage.getItem('KURLY_MAIN_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('KURLY_MAIN_MODAL_KEY'));
            if( toDay <= result.expires ){
                dispatch(mainModal(false));
            }
            else{
                dispatch(mainModal(true));
            }           
        }
        return;

    },[]);



    return (
        <div id="wrap">
                { selector.topModal.isTopModal && <TopModalComponent />}
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path="/" element={<HeaderComponent />}>
                            <Route index element={ <MainComponent /> } />                        
                            <Route path="/index" element={ <MainComponent /> } />                        
                            <Route path="/sub1" element={ <Sub1Component /> }/>
                            <Route path="/sub2" element={ <Sub2Component /> }/>
                            <Route path="/sub3" element={ <Sub3Component /> }/>
                            <Route path="/sub4" element={ <Sub4Component /> }/>
                            <Route path="/sub5" element={ <Sub5SignUpComponent /> }/>

                            <Route path="/sub6" element={ <Sub6SignInComponent /> }/>
                            <Route path="/sub6IdSearch" element={ <Sub6SignInIdSearchComponent /> }/>
                            <Route path="/sub6PwSearch" element={ <Sub6SignInPwSearchComponent /> }/>
                            <Route path="/sub6IdPwSearchResult" element={ <Sub6SignInIdPwSearchResultComponent /> }/>
                            <Route path="/sub6PwReset" element={ <Sub6SignInPwResetComponent /> }/>

                            <Route path="/sub7" element={ <Sub7NoticeComponent /> }/>
                            <Route path="/sub7Insert" element={ <Sub7NoticeInsertFormcomponent /> }/>
                            <Route path="/sub7View" element={ <Sub7NoticeViewComponent /> }/>
                            <Route path="/sub7Update" element={ <Sub7NoticeUpdateComponent /> }/>
                            <Route path="/sub7AdminSign" element={ <Sub7AdminSigninComponent /> }/>
                            <Route path="/sub7AdminSignup" element={ <Sub7AdminSignupComponent /> }/>
                            <Route path="/sub7AdminSearch" element={ <Sub7AdminIdSearchComponent /> }/>
                            <Route path="/sub7AdminPwSearch" element={ <Sub7AdminPwSearchComponent /> }/>
                            <Route path="/sub7AdminIdSearchResult" element={ <Sub7AdminIdSearchResultComponent /> }/>
                            <Route path="/sub7AdminPwReset" element={ <Sub7AdminPwResetComponent /> }/>

                        </Route>
                    </Routes>
                </BrowserRouter>

                <FooterComponent />
                {
                    selector.mainModal.isMainModal && <MainModalComponent />
                }
                
                <QuickMenuComponent />                                
                <GoTopComponent />
                
                {
                    selector.confirmModal.isConfirmModal && <ConfirmModalComponent />
                }
                {
                    selector.confirmService1Modal.isConfirmService1Modal && <ConfirmService1ModalComponent />
                }
                {
                    selector.confirmService2Modal.isConfirmService2Modal && <ConfirmService2ModalComponent />
                }
                {
                    selector.confirmService3Modal.isConfirmService3Modal && <ConfirmService3ModalComponent />
                }
                {
                    selector.isAddress.isAddress && <PostcodeComponent />
                } 
        </div>
    )
}
