import React from 'react';
import './scss/sub6_pw_reset.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub6SignInPwResetComponent() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [state,setState] = React.useState({
        아이디: '',
        휴대폰: '',

        새비밀번호1: '',
        새비밀번호2: '',
        // #3-1 가이드 텍스트 3항연산자를 위해 상태변수 등록
        // 포커스 아웃 일때 색상 변경됨 => 빨강, 파랑
        // 포커스 인 => 기본색상은 검정색
        pw1_guid_text1: null,   // 빨강 = true
        pw1_guid_text2: null,   // 빨강 = true
        pw1_guid_text3: null,   // 파랑 = false

        pw2_guid_text1: null,   // 빨강 = true

        // #4-1 guid_text_box 쇼 하이드 이벤트
        // 포커스 인 = show 일때 보임
        // Box가 true가 되고 pw1_guid_text1~pw1_guid_text4 까지 false가 되면 = 즉, 조건에 맞게 데이터가 입력되면
        // 버튼 색이 바뀐다.
        guidTextBox1: false,    
        guidTextBox2: false,

        // #5-1 버튼 색 변경 및 사용을 가능하게 하기 위해 상태변수 등록
        submitBtn: true     // 위에 모든 제한조건이 충족되면 즉, 오류가 없다면 false로 바뀌고 그럼 버튼이 살아나 전송이 가능해진다.
    });

    // #5-8 비밀번호 등록 입력상자 제한조건 함수
    const pw1RegExp =( value )=>{ // 매개변수를 전달
        const regexp1 = /^(.){10,}$/g;    // 10자 이상 입력
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;      // 영문/숫자/특수문자만 허용, 2개 이상 조합
        const regexp3 = /\s/g;  // 공백제외
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;   // 한글제외
        const regexp5 = /(\d)\1\1/g;  // 숫자3자연속 사용 불가
        // const regexp5 = /(.)\1\1/g;  // 문자숫자3자연속

        // #5-4 정규표현식 구현하기
        let pw1_guid_text1 = null;  // 기본값 설정을 위해 임시변수 설정
        let pw1_guid_text2 = null;  // 기본값 설정을 위해 임시변수 설정
        let pw1_guid_text3 = null;  // 기본값 설정을 위해 임시변수 설정
        // const value = e.target.value;   // 키보드 입력값 = onChange => e.target.value
        // const {value} = e.target;   // 위에는 비구조화한다. => value만 적어서 사용가능
        if(regexp1.test(value)===false){
            pw1_guid_text1 = true;  // 10자 이상 오류
        }
        else {
            pw1_guid_text1 = false;     // 오류가 없다.
        }

        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
            pw1_guid_text2 = true;  // 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합, 한글도 제외
        }
        else{
            pw1_guid_text2 = false;     // 오류가 없다.
        }

        if(regexp5.test(value)===true){
            pw1_guid_text3 = true;  // 동일한 숫자 3개 이상 연속 사용 불가
        }
        else{
            pw1_guid_text3 = false;     // 오류가 없다.
        }

        // #5-5 저장하기
        setState({
            ...state,
            새비밀번호1: value, // 매개 변수를 value로 적었기 때문에 e.tartget.value가 필요없다.
            pw1_guid_text1: pw1_guid_text1,
            pw1_guid_text2: pw1_guid_text2,
            pw1_guid_text3: pw1_guid_text3
        })
    }

    // #5-9 비밀번호 확인 입력상자의 제한조건 함수2
    const pw2Function=(value)=>{
        let pw2_guid_text1 = null;
        if( value!==state.새비밀번호1 || value==='' ){    // 둘 중에 하나라도 거짓이면 
            pw2_guid_text1 = true;  // 오류가 발생
        }
        else if( value===state.새비밀번호1 ){
            pw2_guid_text1 = false;  
        }
        setState({
            ...state,
            새비밀번호2: value,
            pw2_guid_text1: pw2_guid_text1  // #6 이게 false가 되면 버튼이 살아나야 한다.
        })
    }

    // #5-12 디버깅
    // 새 비밀번호 등록이 변경되면
    // 새 비밀번호 확인 함수가 실행되어야 한다.
    React.useEffect(()=>{
        pw2Function( state.새비밀번호2 );   // 비밀번호 확인 함수를 가져와 새비밀번호2랑 비교하도록 유즈이펙트
        return; // 여러번 수행 못하도록 리턴
    },[state.새비밀번호1])  // 새비밀번호1이 변동될 때 

    // #4-3 비밀번호 등록 입력상자 포커스 인 이벤트
    // 포커스 인 = onFocus 하면 아래 가이드 텍스트가 보인다.
    const onFocusPw1=()=>{
        setState({
            ...state,
            guidTextBox1: true
        })
    }

    // #6 확인버튼 살아나기 최종
    // pw2_guid_text1가 false이면 버튼 활성화
    React.useEffect(()=>{
        if( state.pw2_guid_text1===false ){ // 입력상자가 모두 정상이면
            setState({
                ...state,
                submitBtn: false    // 전송버튼이 살아난다.
            })
        }
        else { 
            setState({
                ...state,
                submitBtn: true    // 전송버튼이 비활성화
            })
        }
        return;
    },[state.pw2_guid_text1]);
    

    // #4-3 비밀번호 등록 입력상자 포커스 아웃 이벤트
    // 포커스 아웃 = onBlur 하면 가이드 텍스트가 사라진다.
    const onBlurPw1=()=>{
        // #5-7 디버깅 
        // 조건을 충족해서 글자가 파랑색으로 바뀌었는데, 포커스 아웃이 되면 다시 빨강색으로 변함
        pw1RegExp( state.새비밀번호1 ); // value 값 => 마우스가 떠나더라도 value = 입력값을 가져와 비교하게된다.


        // setState({
        //     ...state,
        //     pw1_guid_text1: true,
        //     pw1_guid_text2: true,
        //     pw1_guid_text3: false
        // })
    }
    // #4-5 비밀번호 등록 입력상자 포커스 인 이벤트
    // 포커스 인 = onFocus 하면 아래 가이드 텍스트가 보인다.
    const onFocusPw2=()=>{
        setState({
            ...state,
            guidTextBox2: true
        })
    }
    // #4-5 비밀번호 등록 입력상자 포커스 아웃 이벤트
    // 포커스 아웃 = onBlur 하면 가이드 텍스트가 사라진다.
    const onBlurPw2=()=>{
        // #5-11
        pw2Function( state.새비밀번호2 );
        // setState({
        //     ...state,
        //     pw2_guid_text1: true
        // })
    }
   

    React.useEffect(()=>{
        if(location.state.아이디!=='' && location.state.휴대폰!==''){
            setState({
                ...state,
                아이디: location.state.아이디,
                휴대폰: location.state.휴대폰    
            });
        }
    },[]);

    // 새비밀번호 등록 입력상자 이벤트
    const onChangePw1=(e)=>{
        pw1RegExp( e.target.value );
        // #5-2 제한조건 정규표현식
        // 10자 이상 입력
        // 영문/숫자/특수문자만 허용하며, 2개 이상 조합
        // 공백제외
        // 한글 입력 불가
        // 동일한 숫자 3개 이상 연속 사용 불가

        // #5-7 디버깅을 위해 오려서 가져가기
        // const regexp1 = /^(.){10,}$/g;    // 10자 이상 입력
        // const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;      // 영문/숫자/특수문자만 허용, 2개 이상 조합
        // const regexp3 = /\s/g;  // 공백제외
        // const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;   // 한글제외
        // const regexp5 = /(\d)\1\1/g;  // 숫자3자연속 사용 불가
        // // const regexp5 = /(.)\1\1/g;  // 문자숫자3자연속

        // // #5-4 정규표현식 구현하기
        // let pw1_guid_text1 = null;  // 기본값 설정을 위해 임시변수 설정
        // let pw1_guid_text2 = null;  // 기본값 설정을 위해 임시변수 설정
        // let pw1_guid_text3 = null;  // 기본값 설정을 위해 임시변수 설정
        // // const value = e.target.value;   // 키보드 입력값 = onChange => e.target.value
        // const {value} = e.target;   // 위에는 비구조화한다. => value만 적어서 사용가능
        // if(regexp1.test(value)===false){
        //     pw1_guid_text1 = true;  // 10자 이상 오류
        // }
        // else {
        //     pw1_guid_text1 = false;     // 오류가 없다.
        // }

        // if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
        //     pw1_guid_text2 = true;  // 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합, 한글도 제외
        // }
        // else{
        //     pw1_guid_text2 = false;     // 오류가 없다.
        // }

        // if(regexp5.test(value)===true){
        //     pw1_guid_text3 = true;  // 동일한 숫자 3개 이상 연속 사용 불가
        // }
        // else{
        //     pw1_guid_text3 = false;     // 오류가 없다.
        // }

        // // #5-5 저장하기
        // setState({
        //     ...state,
        //     새비밀번호1: e.target.value,
        //     pw1_guid_text1: pw1_guid_text1,
        //     pw1_guid_text2: pw1_guid_text2,
        //     pw1_guid_text3: pw1_guid_text3
        // })
    }

    // 새비밀번호 등록 확인 입력상자 이벤트
    const onChangePw2=(e)=>{
        // #5-10
        pw2Function( e.target.value );  // 비밀번호 입력값이 들어감

        // #5-6 비밀번호 확인 구현하기
        // let pw2_guid_text1 = null;
        // if( e.target.value!==state.새비밀번호1 ){
        //     pw2_guid_text1 = true;  // 오류가 발생
        // }
        // else {
        //     pw2_guid_text1 = false; // 비밀번호 일치
        // }
        // setState({
        //     ...state,
        //     새비밀번호2: e.target.value,
        //     pw2_guid_text1: pw2_guid_text1
        // })
    }

    // 리덕스 디스패쳐 컨펌모달메서드
    const confirmModalMethod=(msg)=>{
        const obj = {
            isConfirmModal: true,
            confirmMsg: msg,
            회원가입완료: false
        }
        dispatch(confirmModal(obj));

        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }





    // 전송
    const onSubmitPwReset=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', state.아이디);
        formData.append('userHP', state.휴대폰);
        formData.append('userPw', state.새비밀번호1);

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly/kurly_pw_reset.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{

            if( res.data==1 ){
                confirmModalMethod('비밀번호 변경이 완료되었습니다.');
            }
            else{
                confirmModalMethod('다시 확인하고 시도해주세요');
            }
           
        })
        .catch((err)=>{
            console.log('AXIOS 전송 실패!');
            console.log( err );
        });
    }

    // #7-1 새비밀번호 등록 & 확인상자 입력상자 글자 삭제 이벤트
    const onClickDelPw=(e, p)=>{    // 매개변수 'pw1'과 'pw2'를 받음
        e.preventDefault();

        if( p==='pw1' ){
            setState({
                ...state,
                새비밀번호1: ''
            });
        }
        else if( p==='pw2' ){
            setState({
                ...state,
                새비밀번호2: ''
            });
        }
    }

    

    return (
        <main id='pw_reset_form'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text">비밀번호 재설정</h2>
                    </div>
                    
                    <div className="content sub6-content">
                       <form  onSubmit={onSubmitPwReset} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw1">새 비밀번호 등록</label>
                                        <input 
                                            type="password" 
                                            name='userPw1' 
                                            id='userPw1'
                                            placeholder='새 비밀번호를 입력해 주세요'
                                            value={state.새비밀번호1}
                                            onChange={onChangePw1}
                                            // #4-2 텍스트박스 쇼 하이드 이벤트
                                            // onFocus={onFocusPw1} 이벤트 등록
                                            // onBlur={onBlurPw1} 이벤트 등록
                                            onFocus={onFocusPw1}
                                            onBlur={onBlurPw1}
                                            // #5-3
                                            maxLength={16}
                                        />
                                        {/* 
                                            #7 삭제버튼 이벤트 등록 
                                            이벤트를 매개변수로 전달

                                            #7-2 조건부 연산자로 데이터가 들어오면 x버튼이 생기고 안생기고~ 쇼하이드
                                        */}
                                        {
                                            state.새비밀번호1!=='' && (
                                                <button className='delete-btn' onClick={(e)=>onClickDelPw(e, 'pw1')}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                            )
                                        }
                                    </div>
                                    {/* 
                                        #1 가이드 텍스트 삽입 => #2는 sub6_pw_reset.scss로 이동
                                        #3 red와 blue 클래스 삽입해서 이중 3항연산자 구현하기
                                           기본값은 null 오류가 있으면 true 없으면 false
                                           null 이면 공백이고 아니면 다시
                                           true(오류)면 red 아니면(정상) blue
                                        #4 guid_text_box가 안보이다가 포커스가 도달하면 guid_text_box가 보이기
                                           조건부연산자 사용
                                     */}
                                    {
                                        state.guidTextBox1 && (
                                            <div className='guid_text_box'>
                                                <p className={state.pw1_guid_text1===null ? '' : state.pw1_guid_text1===true ? 'red' : 'blue'}>10자 이상 입력</p>
                                                <p className={state.pw1_guid_text2===null ? '' : state.pw1_guid_text2===true ? 'red' : 'blue'}>영문/숫자/특수문자(공백제외)만 허용하며, 2개 이상 조합</p>
                                                <p className={state.pw1_guid_text3===null ? '' : state.pw1_guid_text3===true ? 'red' : 'blue'}>동일한 숫자 3개 이상 연속 사용 불가</p>
                                            </div>
                                        )
                                    }
                                </li>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw1">새 비밀번호 확인</label>
                                        <input 
                                            type="password" 
                                            name='userPw2' 
                                            id='userPw2' 
                                            placeholder='새 비밀번호를 한 번 더 입력해 주세요'
                                            value={state.새비밀번호2}
                                            onChange={onChangePw2}
                                            // #4-4 텍스트박스 쇼 하이드 이벤트
                                            // onFocus={onFocusPw1} 이벤트 등록
                                            // onBlur={onBlurPw1} 이벤트 등록
                                            onFocus={onFocusPw2}
                                            onBlur={onBlurPw2}
                                            // #5-3
                                            maxLength={16}
                                        />
                                        {/* 
                                            #7삭제버튼 이벤트 등록 
                                            이벤트를 매개변수로 전달

                                            #7-2 조건부 연산자로 데이터가 들어오면 x버튼이 생기고 안생기고~ 쇼하이드
                                        */}
                                        {
                                            state.새비밀번호2!=='' && (
                                                <button 
                                                    className='delete-btn' 
                                                    onClick={(e)=>onClickDelPw(e, 'pw2')}>
                                                    <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                </button>
                                            )
                                        }
                                    </div>
                                    {/* 
                                        #1 
                                    */}
                                    {
                                        state.guidTextBox2 && (
                                            <div className="guid_text_box">
                                                <p className={state.pw2_guid_text1===null ? '' : state.pw2_guid_text1===true ? 'red' : 'blue'}>동일한 비밀번호를 입력해 주세요.</p>
                                            </div>
                                        )
                                    }
                                </li>
                                <li>
                                    <div className="gap">
                                        {/* 
                                            #5 #4의 모든 데이터가 조건에 맞게 들어오면 버튼 색이 바뀐다.
                                            {state.submitBtn===true ? '' :'on'} on이 들어오면 disabled={false}로 되어 살아난다.
                                        */}
                                        <input 
                                            type="submit" 
                                            name='submitBtn' 
                                            id='submitBtn' 
                                            value={'확인'} 
                                            className={state.submitBtn===true ? '' :'on'}  // => on이 들어오면 disabled={false}로 되어 살아난다.
                                            disabled={state.submitBtn} // 버튼을 사용못하게 한다.
                                        />
                                    </div>
                                </li>
                            </ul>
                       </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
