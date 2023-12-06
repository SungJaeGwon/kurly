import React from 'react';
import './scss/sub.scss';
import './scss/sub5.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAddress } from '../../reducer/isAddress';
import { confirmModal } from '../../reducer/confirmModal';
import { confirmService1 } from '../../reducer/confirmService1Modal';
import { confirmService2 } from '../../reducer/confirmService2Modal';
import { confirmService3 } from '../../reducer/confirmService3Modal';

export default function Sub5SignUpComponent() {

    // 네비게이트 선언
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // 리덕스 상태관리 변수에서 주소 가져오기
    const selector = useSelector((state)=>state);
    
    // 리덕스 디스패쳐 컨펌모달메서드 => 반복구현
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

    // 온체인지 이벤트 => 자신의 이벤트 구현
    // 상태변수 값 변경되면 => 온체인지 이벤트 => 자신의 이벤트 구현
    const [state, setState] = React.useState({
        아이디:'',
        idGuidText:'',

        아이디중복확인: false,

        비밀번호:'',
        pw1GuidText:'',

        비밀번호확인:'',
        pw2GuidText:'',

        이름:'',
        nameGuidText:'',

        이메일:'',
        이메일중복확인: false,
        emailGuidText:'',

        휴대폰:'',
        휴대폰번호인증: false,
        발급된인증번호: null,
        입력된인증번호: '',  // 인증번호 받아서 입력한 입력상자 값
        isHpNum: false, // !
        isHpNum2: false,
        isHpNum3: true,  // 인증번호받기

        주소1:'',
        주소2:'',
        isAddress: false,

        생년: '',
        생월: '',
        생일: '',
        birthGuidText:'',



        성별:'선택안함',                     // 라디오 이벤트 : 단일 항목

        추가입력사항: '',             // 라디오 이벤트 : 단일 항목
        추천인아이디: '',  
        추천인아이디확인: false,      // 참여 이벤트 가능/불가능
        참여이벤트명: '',
        isUserChoogaId: false,       // 추가입력사항 친구초대 추천인 아이디
        isUserChoogaEvent: false,    // 추가입력사항 참여 이벤명

        이용약관 : [
            '이용약관 동의(필수)',
            '개인정보 수집∙이용 동의(필수)',
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
            'SNS',
            '이메일',
            '본인은 만 14세 이상입니다.(필수)'
        ],
        이용약관동의: [],             // 체크박스 이벤트 : 여러 항목
        전체동의: ''
    });

    // 회원가입 버튼 클릭 => 가입완료 
    // 모달창 닫으면 실행되는 네비게이트 실행    
    // 리덕스에 회원가입완료 = true 이면 이동
    // React.useEffect(()=>{

    //     if(selector.confirmModal.회원가입완료===true){
    //         navigate('/index');
    //     }
       
    // },[selector.confirmModal.회원가입완료]);



    // 리덕스 상태변수 값 주소1, 주소2 저장되면
    React.useEffect(()=>{

        // 1. 페이지 이동하고
        // 2. 그리고 주소 화면에 띄우기(setTimeout())
        setTimeout(()=>{
            if(selector.address.주소1!=='' && selector.address.주소2!=='' ){
                return (
                    setState({
                        ...state,
                        주소1: selector.address.주소1,
                        주소2: selector.address.주소2,
                        isAddress: true
                    })    
                )
            }
        }, 10);


    },[selector.address.주소1, selector.address.주소2]);




    // 입력상자 키 입력
    // [1-1]. 아이디
    // 정규표현식[RegExp]
    // 1. 특수문자 => 입력과 동시 삭제  
    //    -, ], \  3개의 특수문자는 이스케이프 처리 =>  \-, \], \\
    // 2. 영문 혹은(이거나, 또는) 영문과 숫자를 조합(영문필수+, 숫자선택*)
    // 3. 한글 허용안함
    // 4. 공백 허용안함
    // 5. 6자 이상 16자 이하 글자 수 범위
    const onChangeId=(e)=>{
        const   {value} = e.target;
        let     아이디 = '';
        let     idGuidText= '';
        const   regexp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        //const   regexp2 = /[A-Za-z]+[0-9]*/g; // 영문필수, 숫자선택
        const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g; // 전방탐색 ?= // 후방택색 ?<= | & ! = +  .  *  ?
        
        // const   regexp2 = /([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z]+)/g; // 영문필수 숫자필수인 경우 버그 그래서 아래의 전방탐색 사용
        // const   regexp2 = /[A-Za-z]+[0-9]+/g; // 영문필수 숫자필수인 경우 버그 그래서 아래의 전방탐색 사용
        // const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])+/g;   // 전방탐색 ?= // 후방택색 ?<=
        const   regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const   regexp4 = /\s/g;
        const   regexp5 = /^(.){6,16}$/g;  //^ 처음부터 끝까지 글자 세라  $
        // 아이디 = 입력문자열.replace(정규표현식, '');
        아이디 = value.replace(regexp1, '');

        // 영문필수+, 숫자선택* test() => true, false반환
        // 정규표현식.test(입력문자열) === false 
        // 정규표현식.test(입력문자열) === true 
        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true  ||  regexp5.test(value)===false ){
            idGuidText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            idGuidText = '';
        }
        setState({
            ...state,
            아이디: 아이디,
            idGuidText: idGuidText
        });
    }

    // [1-2] 아이디 중복확인 버튼 클릭 이벤트
    const onClickIdBtn=(e)=>{
        e.preventDefault();
        let value = state.아이디;
        let idGuidText = '';
        let 아이디중복확인 = false;
        const   regexp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const   regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const   regexp4 = /\s/g;
        const   regexp5 = /^(.){6,16}$/g;

        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true  ||  regexp5.test(value)===false ){
            idGuidText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            아이디중복확인 = false;
            confirmModalMethod( idGuidText );
            setState({
                ...state,
                아이디중복확인: 아이디중복확인
            });
        }
        else{

            // AXIOS API 구현    
            const formData = new FormData();
            formData.append('userId', state.아이디);

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly/kurly_id_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{

                if(res.status===200){
                    if(res.data===0){                                               
                        idGuidText = '사용 할 수 있는 아이디 입니다';
                        아이디중복확인 = true;                        
                    }
                    else if(res.data===1){                        
                        idGuidText = '사용 불가능한 아이디 입니다';
                        아이디중복확인 = false;
                    }
                    confirmModalMethod( idGuidText );
                    setState({
                        ...state,
                        아이디중복확인: 아이디중복확인
                    });
                }

            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log( err );
            });
        }
    }


    // [2]. 비밀번호:'',
    // 1. 최소 10자 이상 입력 (10~16)
    // 2. 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합  => 전방탐색
    //    (1) 영문 필수+숫자 필수+  =>  (?=.*[A-Za-z])+(?=.*[0-9])+
    //    (2) 영문 필수+특수문자 필수+ =>  (?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+
    //    (3) 숫자 필수+특수문자 필수+ =>  (?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+
    //    (영문 필수+숫자 필수+) | (영문 필수+특수문자 필수+)  | (숫자 필수+특수문자 필수+)
    //    /((?=.*[영문])+(?=.*[숫자])+)|((?=.*[영문])+(?=.*[특수])+)|((?=.*[숫자])+(?=.*[특수])+)/g;
    // gksmf5191234()
    // 1234()%^$#@React(_+)
    // gksmf519$#@!&*()
    // gksmf519$#@!&*()대한

    // 3. 공백 허용 안함
    // 4. 한글 허용 안함
    // 5. 동일한 숫자 3개 이상 연속 사용 불가
    const onChangePw1=(e)=>{
        const {value} = e.target;
        let pw1GuidText = '';
        const regexp1 = /^(.){10,16}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        // const regexp5 = /(.)\1\1/g;  // 문자숫자3자연속
        const regexp5 = /(\d)\1\1/g;  // 숫자3자연속

        
        if(regexp1.test(value)===false){
            pw1GuidText = "최소 10자 이상 입력";
        }
        else if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
            pw1GuidText = "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
        }
        else if(regexp5.test(value)===true){
            pw1GuidText = "동일한 숫자 3개 이상 연속 사용 불가";
        }
        else{
            pw1GuidText = ""
        }
        setState({
            ...state,
            비밀번호: value,
            pw1GuidText: pw1GuidText
        });
    }
    
    
    // 3. 비밀번호확인:'',
    // 비밀번호를 한번 더 입력해 주세요.
    // 동일한 비밀번호를 입력
    const onChangePw2=(e)=>{
        let pw2GuidText = ''
        const {value} = e.target;

        if(value===''){
            pw2GuidText = '비밀번호를 한번 더 입력해 주세요.'
        }
        else if(value!==state.비밀번호){
            pw2GuidText = '동일한 비밀번호를 입력해 주세요.'
        }
        else {
            pw2GuidText = '';
        }

        setState({
            ...state,
            비밀번호확인: value,
            pw2GuidText: pw2GuidText
        });
    }

    // 4. 이름:'',
    // *  한글 숫자 영문 공백허용
    // 1. 이름을 입력해 주세요.
    // 2. 특수문자 => 입력과 동시 삭제
    const onChangeName=(e)=>{
        const {value} = e.target;
        let nameGuidText = '';
        let 이름 = '';
        const regexp = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;

        이름 = value.replace(regexp, '');

        if(이름===''){
            nameGuidText = '이름을 입력해 주세요.';
        }
        else{
            nameGuidText = '';
        }

        setState({
            ...state,
            이름: 이름,
            nameGuidText: nameGuidText
        });
    }


    // 5-1. 이메일:'',
    // /^[영문숫자한글특수]+((\.)?[영문숫자한글특수]+)*@[영문숫자한글특수.]+((\.)?[영문숫자한글특수]+)*\.[영문숫자한글특수.]+$/g;
    // 1. 이메일을 입력해 주세요.
    // 2. @ / ( )  []  \  "  ;  :  < > ,
    // 3. . 0회 1회  ?
    // 4. 영문숫자특수한글@영문숫자특수한글.영문숫자특수한글.com
    // 5. 영문숫자특수한글@영문숫자특수한글.영문숫자특수한글.co.kr {2,3}

    //    @ 좌측 특징 ///////////////////////////////////////////////////////    
    //    @ 앳사인 좌측에 . 점을 찍으면 반드시 다음 문자열이 와야한다.
    ///      ((\.)?[영문숫자한글특수]+)*@

    //    @ 우측 특징 ///////////////////////////////////////////////////////
    //    @ 우측 . 점을 찍으면 반드시 다음 문자열이 와야한다.
    //    ((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*

    //    맨우측 끝에 . 점을 찍으면 반드시 다음 문자열이 와야한다.
    //    \.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+   브라켓안에 점이 없다. 


    //    gksmf519123@sshinchon.co.kr
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuidText = '';
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;

        if(value===''){
            emailGuidText ='이메일을 입력해 주세요.';
        }
        else if(regexp.test(value)===false){
            emailGuidText ='이메일 형식으로 입력해 주세요.';
        }
        else {
            emailGuidText ='';
        }

        setState({
            ...state,
            이메일: value,
            emailGuidText: emailGuidText
        });
    }


    // 5-2 이메일 중복확인 버튼 클릭 이벤트
    const onClickEmailBtn=(e)=>{
        e.preventDefault();
        const value = state.이메일;
        let emailGuidText = '';
        let 이메일중복확인 = false;

        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        if(value===''){
            emailGuidText ='이메일을 입력해 주세요.';
            이메일중복확인 = false;                    
            confirmModalMethod( emailGuidText );
        }
        else if(regexp.test(value)===false){
            emailGuidText ='이메일 형식으로 입력해 주세요.';
            이메일중복확인 = false;                    
            confirmModalMethod( emailGuidText );
        }
        else {
            // AXIOS API 구현            
            const formData = new FormData();
            formData.append('userEmail', state.이메일);

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly/kurly_email_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{

                if(res.status===200){
                    if(res.data===0){
                        emailGuidText = '사용 할 수 있는 이메일 입니다';
                        이메일중복확인 = true;                        
                    }
                    else if(res.data===1){                        
                        emailGuidText = '사용 불가능한 이메일 입니다';
                        이메일중복확인 = false;
                    }
                    confirmModalMethod( emailGuidText );
                    setState({
                        ...state,
                        이메일중복확인: 이메일중복확인
                    });
                }

            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log( err );
            });
        }
    }
    
    // 6-1. 휴대폰번호 입력상자:'',
    const onChangeHp1=(e)=>{        
        let isHpNum = false;

        if(e.target.value.length > 0){
            isHpNum = true
        }
        else {
            isHpNum = false;
        }

        setState({
            ...state,
            휴대폰: e.target.value,
            isHpNum: isHpNum
        });
    }
    
    // 6-2. 휴대폰 인증번호받기 클릭 이벤트
    const onClickHpBtn=(e)=>{
        e.preventDefault();
        const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
        let num = 0;
        let isHpNum = true; //!
        let isHpNum2 = false;
        let isHpNum3 = true;

        if(state.isHpNum3===true){

            // 0. 잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.
            // 1. 인증번호를 발급하고 6자리 렌덤(Random)번호 생성하여
            // 2. 컨펌모달창에 모달창 열기 그리고 인증번호 전송하기
            // 3. 모달창 인증번호확인(OK)하고  닫기
            // 010 7942 5305
            // 011 348  6441
            // :
            // 019 348  6441            
            num = Math.floor(Math.random() * 900000 + 100000);
            isHpNum = false; //!
            isHpNum2 = false;
            if(regexp.test(state.휴대폰)===false){
                confirmModalMethod('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');             
            }
            else{
                confirmModalMethod(`인증번호가 발송되었습니다.  ${num}`);
                // 다시 버튼을 사용불가로 변환
                // 그리고 아래 인증번호 입력상자가 보인다.
                isHpNum = false;
                isHpNum2 = true;
            }

            setState({
                ...state,
                isHpNum: isHpNum,
                isHpNum2: isHpNum2,
                발급된인증번호: num
            });

        }
        else{  // 다른번호인증 => 인증번호받기
            isHpNum3 = true;  // 인증번호받기버튼 클릭 가능한상태로 변경
            isHpNum = true;  // 인증번호받기 버튼 사용가능
            setState({
                ...state,
                휴대폰:'',
                isHpNum: isHpNum,
                isHpNum3: isHpNum3
            });
        }

    }



    // 6-3. 인증번호입력상자:'',
    const onChangeHp2=(e)=>{
        setState({
            ...state,
            입력된인증번호: e.target.value
        });
    }

    // 6-4. 인증번호 비교 확인 버튼 글릭 이벤트
    const onClickHpBtnOk=(e)=>{
        e.preventDefault();
        let isHpNum  = false;
        let isHpNum2 = false;
        let isHpNum3 = true;
        let 휴대폰번호인증 = false;

        if(state.발급된인증번호 === Number(state.입력된인증번호)){
            confirmModalMethod('인증에 성공 하였습니다.');
            isHpNum  = true; 
            isHpNum2 = false; 
            isHpNum3 = false; 
            휴대폰번호인증 = true;
        }
        else{
            confirmModalMethod('잘못된 인증 코드 입니다.');
            isHpNum2 = true;  // 다시 입력 대기
            isHpNum  = false; 
            isHpNum3 = true; 
            휴대폰번호인증 = false;
        }

        setState({
            ...state,
            isHpNum: isHpNum,
            isHpNum2: isHpNum2,
            isHpNum3: isHpNum3,
            휴대폰번호인증: 휴대폰번호인증
        });

    }

    
    // 8-1. 주소검색 버튼 클릭 이벤트 => 주소검색 모달창 오픈
    const onClickAddressSearch=(e)=>{
        e.preventDefault();        
        dispatch(isAddress(true));
    }


    // 8-2. 주소1:'', 입력상자
    const onChangeAddress1=(e)=>{
        setState({
            ...state,
            주소1: e.target.value
        });
    }

    // 8-3. 주소2:'', 입력상자
    const onChangeAddress2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        });
    }


    // 9 성별 
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        })
    }
    // 10-0 생년월월 유효성 검사체크 이벤트 => 생년 입력값 들어오면 유효검사체크
    // 1. 생년, 생월, 생일 모두 빈칸이면 오류메시지 출력안함(가이드 텍스트)

    // 2-1. 생년월일 숫자 자릿수 4자리 입력 => 태어난 년도 4자리를 정확하게 입력해주세요.
    // 2-2. 생년입력 100살초과 입력불가 => 생년월일을 다시 확인해주세요.  
    // 2-3. 생년입력 현재년보다 초과시 => 생년월일이 미래로 입력 되었습니다.  
    // 2-4. 생년입력 14세 미만 => 만 14세 미만은 가입이 불가합니다.

    // 3. 생월입력 1~12 사이 입력 => 태어난 월을 정확하게 입력해주세요.
    // 4. 생일입력 1~31 사이 입력 => 태어난 일을 정확하게 입력해주세요.
    React.useEffect(()=>{
       
        let birthGuidText = '';

        if( state.생년==='' && state.생월==='' &&  state.생일=='' ){
            birthGuidText = '';
        }
        else{  // 모두 빈칸이 아니면

            if(state.생년.length<4){  //태어난 년도 4자리를 정확하게 입력해주세요.
                birthGuidText = '태어난 년도 4자리를 정확하게 입력해주세요.';
            }
            else if( Number(state.생년) < (new Date().getFullYear()-100) ){ // 생년입력 100살 초과 입력불가
                birthGuidText = '생년월일을 다시 확인해주세요.';
            }            
            else if(  Number(state.생년) > new Date().getFullYear()  ){
                birthGuidText = '생년월일이 미래로 입력 되었습니다. ';
            }            
            else{  // 생년 체크 다음 생월
                
                if( state.생월 < 1 || state.생월 > 12 ){
                    birthGuidText = '태어난 월을 정확하게 입력해주세요.';
                }
                else {
                    if(state.생일 < 1 || state.생일 > 31 ){
                        birthGuidText = '태어난 일을 정확하게 입력해주세요.';
                    }
                    else {

                        // 입력된 생년, 생월, 생일을   현재 기준년, 기준월, 기준일과 비교
                        // 1-1. 입력된 생년이 현재 년과 같으면 '' / 크면 => '만 14세 미만은 가입이 불가합니다.';
                        // 1-2. 입력된 생월이 현재월과 같으면 ''  / 크면 => '만 14세 미만은 가입이 불가합니다.';
                        // 1-3  입력된 생일이 현재일과 같으면 ''  / 크면 => '만 14세 미만은 가입이 불가합니다.';

                        if(  Number(state.생년) === (new Date().getFullYear()-14)  ){
                            if( Number(state.생월) === (new Date().getMonth()+1) ){
                                if( Number(state.생일) === new Date().getDate() ){
                                    birthGuidText = ''; 
                                }
                                else if( Number(state.생일) > new Date().getDate() ){
                                    birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                                }
                            }
                            else if(Number(state.생월) > (new Date().getMonth()+1)){
                                birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                            }                            
                        }
                        else if(  Number(state.생년) > (new Date().getFullYear()-14)  ){
                            birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                        }          

                    }
                }

            }
        }

        // 상태변수에 저장
        setState({
            ...state,
            birthGuidText: birthGuidText
        }) 

    },[state.생년,state.생월,state.생일]);



    // 10-1. 생년: '',    
    const onChangeYear=(e)=>{
        // 정규표현식(RegExp) : 숫자만 입력
        const regExp = /[^0-9]/g;
        let 생년 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            생년: 생년
        });
    }
    // 10-2. 생월: '',
    const onChangeMonth=(e)=>{
        // 정규표현식(RegExp) : 숫자만 입력
        const regExp = /[^0-9]/g;
        let 생월 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            생월: 생월
        });
    }    
    // 10-3. 생일: '',
    const onChangeDate=(e)=>{
       // 정규표현식(RegExp) : 숫자만 입력
        const regExp = /[^0-9]/g;
        let 생일 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            생일: 생일
        });
    }

    // 11-1. 추천인아이디:'',
    const onChangeChooga1=(e)=>{
       
        setState({
            ...state,
            추천인아이디: e.target.value
        });    

    }


    // 11-2 추천인아이디 확인 클릭 이벤트
    const onClickIdOk=(e)=>{
        e.preventDefault();
        let 추천인아이디확인 = false;
        let idGuidText ='';
        const formData = new FormData();
        formData.append('userId', state.추천인아이디);

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly/kurly_id_ok.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{

            if(res.status===200){
                if(res.data===0){
                    idGuidText = '존재하지 않는 아이디 입니다.';  
                    추천인아이디확인=false;             
                }
                else if(res.data===1){                                            
                    idGuidText = '존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.';                    
                    추천인아이디확인=true;
                }
                confirmModalMethod( idGuidText );           
                setState({
                    ...state,
                    추천인아이디확인: 추천인아이디확인
                });   
            }
        })
        .catch((err)=>{
            console.log('AXIOS 오류');
            console.log( err );
        });


    }



    // 11-3. 참여이벤트명:'',
    const onChangeChooga2=(e)=>{
        setState({
            ...state,
            참여이벤트명: e.target.value
        });
    }
    // 11-4 추가입력 사항 : 친구초대 추천인아이디 & 참여이벤트명
    const onChangeChooga=(e)=>{
        setState({
            ...state,
            추가입력사항: e.target.value
        });
    }
    // 11-5 추가입력사항 값 변경되면 즉시 동작 이펙트 이벤트
    React.useEffect(()=>{
        let isUserChoogaId = false;
        let isUserChoogaEvent = false;
        if(state.추가입력사항==="친구초대 추천인 아이디"){
            isUserChoogaId = true;
            isUserChoogaEvent = false;
        }
        else if(state.추가입력사항==="참여 이벤트명"){
            isUserChoogaId = false;
            isUserChoogaEvent = true;
        }
        setState({
            ...state,
            isUserChoogaId: isUserChoogaId,
            isUserChoogaEvent: isUserChoogaEvent
        })
    },[state.추가입력사항]);

    // 12-1  이용약관동의 : 개별체크
    const onChangeServiceCheck=(e)=>{
        let 이용약관동의 = state.이용약관동의;

        if(e.target.checked===true){
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                // 이용약관동의 배열안에 SNS 이메일이 모두 없다면 삽입한다.
                // 이용약관동의 배열안 없는 항목만 넣는다.
                if( 이용약관동의.includes('SNS')===false &&  이용약관동의.includes('이메일')===false ){
                    이용약관동의 = [...이용약관동의, e.target.value,'SNS','이메일'];
                }
                else if( 이용약관동의.includes('SNS')===true &&  이용약관동의.includes('이메일')===false ){
                    이용약관동의 = [...이용약관동의, e.target.value,'이메일'];
                }
                else if( 이용약관동의.includes('SNS')===false &&  이용약관동의.includes('이메일')===true ){
                    이용약관동의 = [...이용약관동의, e.target.value,'SNS'];
                }                
            }
            else if(e.target.value==='SNS'){
                if( 이용약관동의.includes('이메일')===true ){
                    이용약관동의 = [...이용약관동의, e.target.value,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'];
                }
                else{
                    이용약관동의 = [...이용약관동의, e.target.value];
                }   
            }
            else if(e.target.value==='이메일'){
                if( 이용약관동의.includes('SNS')===true ){
                    이용약관동의 = [...이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'];
                }
                else{
                    이용약관동의 = [...이용약관동의, e.target.value];
                }
            }
            else{
                이용약관동의 = [...이용약관동의, e.target.value]
            }
        }
        else {
            let arr = state.이용약관동의; // 이용약관 동의 배열 모두 가져오기
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                arr = arr.filter((item)=> item!==e.target.value);
                arr = arr.filter((item)=> item!=='SNS');
                arr = arr.filter((item)=> item!=='이메일');
                이용약관동의 = arr;
            }
            else if(e.target.value==='SNS'){
                arr = arr.filter((item)=> item!==e.target.value);
                arr = arr.filter((item)=> item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                이용약관동의 = arr;
            }
            else if(e.target.value==='이메일'){
                arr = arr.filter((item)=> item!==e.target.value);
                arr = arr.filter((item)=> item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                이용약관동의 = arr;
            }
            else{
                이용약관동의 = 이용약관동의.filter((item)=>item !== e.target.value);
            }
            
        }

        // 최종 저장
        setState({
            ...state,
            이용약관동의: 이용약관동의
        })
    }

    const onChangeServiceAllCheck=(e)=>{
        let 이용약관동의 = [];

        if(e.target.checked){
            이용약관동의 = state.이용약관;
        }
        else{
            이용약관동의 = []; //빈배열
        }
        setState({
            ...state,
            이용약관동의: 이용약관동의,
        })
    }

    // 이용약관보기 1
    const onClickServiceView1=(e)=>{
        e.preventDefault();

        dispatch(confirmService1(true));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }
    // 이용약관보기 2
    const onClickServiceView2=(e)=>{
        e.preventDefault();

        dispatch(confirmService2(true));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }
    // 이용약관보기 3
    const onClickServiceView3=(e)=>{
        e.preventDefault();

        dispatch(confirmService3(true));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }

    // 13  전체 유효성 검사 후 폼전송 => DATABASE 서버에 전송
    const onSubmitForm=(e)=>{
        e.preventDefault();

        // 이용약관동의필수 항목 카운트
        let cnt = 0;
        state.이용약관동의.map((item)=>{
            if(item.includes('필수')){
                cnt++;
            }
        });

        if(state.아이디===''){
            confirmModalMethod('아이디를 입력하세요');
        }
        else if(state.아이디중복확인===false){
            confirmModalMethod('아이디를 중복확인을 해주세요');
        }
        else if(state.비밀번호===''){
            confirmModalMethod('비밀번호를 입력하세요');
        }
        else if(state.비밀번호확인===''){
            confirmModalMethod('한번더 비밀번호를 입력하세요');
        }        
        else if(state.이름===''){
            confirmModalMethod('이름을 입력하세요');
        }
        else if(state.이메일===''){
            confirmModalMethod('이메일을 입력하세요');
        }        
        else if(state.이메일중복확인===false){
            confirmModalMethod('이메일 중복확인을 해주세요');
        }
        else if(state.휴대폰===''){
            confirmModalMethod('휴대폰 번호를 입력하세요');
        }
        else if(state.휴대폰번호인증===false){
            confirmModalMethod('휴대폰 번호를 인증 해주세요');
        }
        else if(state.주소1===''){
            confirmModalMethod('주소를 검색 해주세요');
        }
        else if(state.주소2===''){
            confirmModalMethod('나머지 주소를 입력 해주세요');
        }        
        else if(cnt < 3){
            confirmModalMethod('이용약관동의 필수 항목을 선택 해주세요');
        }
        else {  // 유효성 검사 성공적으로 완료되면 데이터 전송
            // 휴대폰 정규표현식 
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g; // 010-7943-5305  010-348-6441

            // userId      아이디          gksmf519 
            // userPw      비밀번호        gksmf519123
            // userName    이름            이순신
            // userEmail   이메일          gksmf519@naver.com
            // userHp      휴대폰          01079425305
            // userAddress 주소            신촌로
            // userGender  성별            여성
            // userBirth   생년월일        1970 10 9
            // userAddInput 추가입력사항   친구초대 추천인 아이디 gksmf519
            // userService 이용약관동의    체크


            const formData = new FormData(); 
            formData.append('userId',       state.아이디);
            formData.append('userPw',       state.비밀번호);
            formData.append('userName',     state.이름);
            formData.append('userEmail',    state.이메일);
            formData.append('userHp',       state.휴대폰.replace(regExp, '$1-$2-$3'));
            formData.append('userAddress',  `${state.주소1} ${state.주소2}` );
            formData.append('userGender',   state.성별);
            formData.append('userBirth',    `${state.생년}-${state.생일}-${state.생일}` );
            formData.append('userAddInput', `${state.추가입력사항} ${state.추천인아이디} ${state.추천인아이디확인} ${state.참여이벤트명}` );
            formData.append('userService',  state.이용약관동의);

            axios({
                url: 'http://gksmf519.dothome.co.kr/kurly/kurly_insert.php',
                method: 'POST',
                data: formData   // 클라이언트가 서버에게 요청 Request 
            })
            .then((res)=>{
                if(res.status===200){  // 전송성공 스테이터스 200 
                    console.log( res.data );  // 서버가 클라이언트에게 응답 리스판스 Response 
                    // 회원가입 완료되면                    
                    if(res.data===1){  // 인트로 페이지로 이동하는 라우터 네비게이션 구현                        
                        // 미션
                        // 회원가입이 완료되면 => 가입축하인사 컨펌모달창 뜨고 
                        // 컨펌모달창 닫으면 => 인트로페이지로 이동하도록 네비게이션 구현
                        confirmModalMethod('마켓컬리 회원가입을 진심으로 감사드립니다.');
                    }   
                    else if(res.data===0){  // 회원가입 실패 입력된 폼데이터 확인하고 다시 시도하세요
                        confirmModalMethod('확인하고 다시 시도해주세요');
                    }
                }                              
            })
            .catch((err)=>{
                console.log(`AXIOS 전송 실패! ${err} `);
            });
        }
    }

    return (
        <main id='sub5' className='sub'>
            <section id="signUp">
                <div className="container">

                    <div className="title">
                        <h2 className="title-text">회원가입</h2>
                        <div className="sub-title">
                            <h3><i>*</i><span>필수입력사항</span></h3>
                        </div>
                    </div>
                    
                    <div className="content sub5-content">
                       <form onSubmit={onSubmitForm}>
                            <ul className='signup-form'>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userId"><span>아이디</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={16}
                                                name='userId' 
                                                id='userId' 
                                                placeholder='아이디를 입력해주세요' 
                                                value={state.아이디}  
                                                onChange={onChangeId}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button onClick={onClickIdBtn}>중복확인</button>
                                        </div>
                                        <p className={`guid-text${state.idGuidText!==''?' on':''}`}>{state.idGuidText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userPw1"><span>비밀번호</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password"
                                                maxLength={16}   
                                                name='userPw1' 
                                                id='userPw1' 
                                                placeholder='비밀번호를 입력해주세요' 
                                                value={state.비밀번호} 
                                                onChange={onChangePw1}
                                            />
                                        </div>

                                        <div className="right-box">
                                           
                                        </div>
                                        <p className={`guid-text${state.pw1GuidText!==''?' on':''}`}>{state.pw1GuidText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userPw2"><span>비밀번호확인</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password" 
                                                maxLength={16}  
                                                name='userPw2' 
                                                id='userPw2' 
                                                placeholder='비밀번호를 한번 더 입력해주세요' 
                                                value={state.비밀번호확인} 
                                                onChange={onChangePw2}
                                            />
                                        </div>

                                        <div className="right-box">
                                            
                                        </div>
                                        <p className={`guid-text${state.pw2GuidText!==''?' on':''}`}>{state.pw2GuidText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userName"><span>이름</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='userName' 
                                                id='userName' 
                                                placeholder='이름을 입력해주세요' 
                                                value={state.이름} 
                                                onChange={onChangeName}
                                            />
                                        </div>

                                        <div className="right-box">
                                            
                                        </div>
                                        <p className={`guid-text${state.nameGuidText!==''?' on':''}`}>{state.nameGuidText}</p>  
                                    </div>                                   
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userEmail"><span>이메일</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='userEmail' 
                                                id='userEmail' 
                                                placeholder='이메일을 입력해주세요'  
                                                value={state.이메일} 
                                                onChange={onChangeEmail}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button onClick={onClickEmailBtn}>중복확인</button>
                                        </div>
                                        <p className={`guid-text${state.emailGuidText!==''?' on':''}`}>{state.emailGuidText}</p>   
                                    </div>
                                </li>
                                <li className='list hp1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userHp"><span>휴대폰</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={11}  
                                                name='userHp' 
                                                id='userHp' 
                                                placeholder='숫자만 입력해주세요' 
                                                value={state.휴대폰} 
                                                onChange={onChangeHp1}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button 
                                                disabled={!state.isHpNum} 
                                                className={`hp-btn${state.isHpNum?'':' off'}`}
                                                onClick={onClickHpBtn}
                                            >{state.isHpNum3?'인증번호받기':'다른번호인증'}</button>
                                        </div>
                                        <p className='guid-text'></p>  
                                    </div>
                                </li>
                                {
                                    state.isHpNum2 && (
                                        <>
                                            <li className='list hp2'>
                                                <div className="list-box">
                                                
                                                    <div className="input-box">
                                                        <input 
                                                            type="text"   
                                                            name='userHpAuthen' 
                                                            id='userHpAuthen' 
                                                            placeholder='인증번홓를 입력해주세요'  
                                                            value={state.인증번호} 
                                                            onChange={onChangeHp2}
                                                        />
                                                        <span className='time-box'><em>03</em><em>00</em></span>
                                                    </div>

                                                    <div className="right-box">
                                                        <button onClick={onClickHpBtnOk}>인증번호확인</button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='list hp3'>
                                                <div className="list-box">
                                                    
                                                    <p className='guid-text show'>
                                                        인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)
                                                    </p>
                                                                                        
                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                                <li className='list address1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor=""><span>주소</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">                                            
                                            {
                                                !state.isAddress && (
                                                    <button onClick={onClickAddressSearch} className='address-search-btn'>주소검색</button>
                                                )
                                            }
                                            {
                                                state.isAddress && (
                                                    <input 
                                                        type="text"   
                                                        name='userAddress1' 
                                                        id='userAddress1' 
                                                        placeholder='검색 주소' 
                                                        value={state.주소1} 
                                                        onChange={onChangeAddress1}
                                                    />
                                                )
                                            }
                                        </div>

                                        <div className="right-box">
                                            {
                                                state.isAddress && (
                                                    <button onClick={onClickAddressSearch}>재검색</button>
                                                )  
                                            }
                                        </div>

                                    </div>
                                </li>
                                {
                                    state.isAddress && (
                                        <>
                                            <li className='list address2'>
                                                <div className="list-box">
                                                
                                                    <div className="input-box">
                                                        <input 
                                                            type="text"   
                                                            name='userAddress2' 
                                                            id='userAddress2' 
                                                            placeholder='나머지 주소를 입력하세요'  
                                                            value={state.주소2} 
                                                            onChange={onChangeAddress2}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </li>
                                            <li className='list address3'>
                                                <div className="list-box">
                                                
                                                    <p className='guid-text show'>
                                                        <strong>샛별배송</strong>
                                                        배송지에 따라 상품 정보가 달라질 수 있습니다.
                                                    </p>

                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                                <li className='list radio gender'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label><span>성별</span></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <label htmlFor="userMale">
                                                <input 
                                                    type="radio"   
                                                    name='userGender' 
                                                    id='userMale' 
                                                    value={'남자'} 
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes('남자')}
                                                />
                                                <span>남자</span>
                                            </label>
                                            <label htmlFor="userFemale">
                                                <input 
                                                    type="radio"  
                                                    name='userGender' 
                                                    id='userFemale' 
                                                    value={'여자'} 
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes('여자')}
                                                />
                                                <span>여자</span>
                                            </label>
                                            <label htmlFor="userNone">
                                                <input 
                                                    type="radio"   
                                                    name='userGender' 
                                                    id='userNone' 
                                                    value={'선택안함'}  
                                                    // defaultChecked    /* 기본선택 */
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes('선택안함')}
                                                />
                                                <span>선택안함</span>
                                            </label>
                                        </div>
                                    </div>      
                                </li>
                                <li className='list birth'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userYear"><span>생년월일</span></label>
                                        </div>                                       
                                        <div className="input-box">
                                            <ul>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        maxLength={4}   
                                                        name='userYear' 
                                                        id='userYear' 
                                                        placeholder='YYY'  
                                                        value={state.생년}  
                                                        onChange={onChangeYear}
                                                    />
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        maxLength={2}  
                                                        name='userMonth' 
                                                        id='userMonth' 
                                                        placeholder='MM' 
                                                        value={state.생월} 
                                                        onChange={onChangeMonth}
                                                    />
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        maxLength={2}  
                                                        name='userDate' 
                                                        id='userDate' 
                                                        placeholder='DD' 
                                                        value={state.생일} 
                                                        onChange={onChangeDate}
                                                    />
                                                </li>
                                            </ul>                                            
                                        </div>
                                        <p className={`guid-text${state.birthGuidText!==''?' on':''}`}>{state.birthGuidText}</p>  
                                    </div>        
                                </li>
                                <li className='list radio chooga'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label><span>추가입력사항</span></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <label htmlFor="userChooga1">
                                                <input 
                                                    type="radio"   
                                                    name='userChooga' 
                                                    id='userChooga1' 
                                                    value={'친구초대 추천인 아이디'} 
                                                    onChange={onChangeChooga}
                                                    checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                                />
                                                <span>친구초대 추천인 아이디</span>
                                            </label>
                                            <label htmlFor="userChooga2">
                                                <input 
                                                    type="radio"  
                                                    name='userChooga' 
                                                    id='userChooga2' 
                                                    value={'참여 이벤트명'} 
                                                    onChange={onChangeChooga}
                                                    checked={state.추가입력사항.includes('참여 이벤트명')}
                                                />
                                                <span>참여 이벤트명</span>
                                            </label>                                            
                                        </div>
                                    </div>      
                                </li>
                                {
                                    state.isUserChoogaId && (
                                        <li className='list chooga userChoogaId'>
                                            <div className="list-box">
                                            
                                                <div className="input-box">
                                                    <input 
                                                        type="text"   
                                                        name='userChoogaId' 
                                                        id='userChoogaId' 
                                                        placeholder='추천인 아이디를 입력해주세요' 
                                                        value={state.추천인아이디}  
                                                        onChange={onChangeChooga1}
                                                    />
                                                </div>
                                                <div className="right-box">
                                                    <button onClick={onClickIdOk}>아이디 확인</button>
                                                </div>
                                                <p className='guid-text show'>
                                                    가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.
                                                </p> 

                                            </div>                                   
                                        </li>                      
                                    )          
                                }
                                {
                                    state.isUserChoogaEvent && (
                                        <li className='list chooga userChoogaEvent'>
                                            <div className="list-box">
                                            
                                                <div className="input-box">
                                                    <input 
                                                        type="text"   
                                                        name='userChoogaEvent' 
                                                        id='userChoogaEvent' 
                                                        placeholder='참여 이벤트명을 입력해주세요' 
                                                        value={state.참여이벤트명}  
                                                        onChange={onChangeChooga2}
                                                    />
                                                </div>                                        
                                                <p className='guid-text show'>
                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                    가입 이후는 수정이 불가능 합니다.<br/>
                                                    대소문자 및 띄어쓰기에 유의해주세요.
                                                </p> 

                                            </div>                                   
                                        </li>                      
                                    )          
                                }
                                <li className='list hr'>
                                    <div className="list-box">
                                        <hr />
                                    </div>
                                </li>

                                <li className='list servie servie1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label><span>이용약관동의</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <label htmlFor="userServiceAll">
                                                <input 
                                                    type="checkbox"   
                                                    name='userServiceAll' 
                                                    id='userServiceAll' 
                                                    value={'전체 동의합니다.'} 
                                                    onChange={onChangeServiceAllCheck}
                                                    checked={state.이용약관동의.length===7}
                                                    // checked={state.이용약관동의.length===7?true:false}
                                                />
                                                <span>전체 동의합니다.</span>
                                            </label>
                                        </div>                                        
                                        <p className='guid-text show'>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>  
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService1">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService1' 
                                                    value={'이용약관 동의(필수)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                />
                                                <span>이용약관 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>  

                                        {/* 약관보기 */}
                                        <button className='service-view'  onClick={onClickServiceView1}><span>약관보기</span><img src="http://localhost:3000/images/sub/sub5/icon_arrow_right.svg" alt="" /></button>
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService2">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService2' 
                                                    value={'개인정보 수집∙이용 동의(필수)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>                                        

                                        {/* 약관보기 */}
                                        <button className='service-view' onClick={onClickServiceView2}><span>약관보기</span><img src="http://localhost:3000/images/sub/sub5/icon_arrow_right.svg" alt="" /></button>

                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService3">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService3' 
                                                    value={'개인정보 수집∙이용 동의(선택)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>             
                                       
                                        {/* 약관보기 */}
                                        <button className='service-view'  onClick={onClickServiceView3}><span>약관보기</span><img src="http://localhost:3000/images/sub/sub5/icon_arrow_right.svg" alt="" /></button>
                           
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService4">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService4' 
                                                    value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                />
                                                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>                                        
                                    </div>
                                </li>
                                <li className='list servie servie5'>
                                    <div className="list-box">
                                        <div className="input-box">
                                            <label htmlFor="userService5">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService5' 
                                                    value={'SNS'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('SNS')}
                                                />
                                                <span>SNS</span>
                                            </label>
                                            <label htmlFor="userService6">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService6' 
                                                    value={'이메일'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('이메일')}
                                                />
                                                <span>이메일</span>
                                            </label>
                                        </div>                                        
                                        <p className='guid-text show'>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>  
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                      
                                        <div className="input-box">
                                            <label htmlFor="userService7">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService7' 
                                                    value={'본인은 만 14세 이상입니다.(필수)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                />
                                                <span>본인은 만 14세 이상입니다.</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>                                        
                                    </div>
                                </li>                               
                            </ul>
                            <div className="button-box">
                                <button type='submit'>가입하기</button>
                            </div>
                       </form>
                    </div>

                </div>
            </section>
        </main>
    );
};
