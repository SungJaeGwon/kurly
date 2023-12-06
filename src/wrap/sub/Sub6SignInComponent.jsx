import React, { useState } from 'react';
import './scss/sub6.scss';
import { useNavigate, useLocation, Link }  from  'react-router-dom';
// #3 로그인 구현하기 
import axios from 'axios';

// #4-3 임포트하기
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducer/signIn';  // 메소드를 가져옴
// #5-4
import { Address } from 'react-daum-postcode';  // 메소드 가져옴

export default function Sub6SignInComponent() {
    
    // #4-4 선언하기
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);


    const [state, setState] = useState({
        // #3-2 상태변수 만들기
        아이디: '',
        비밀번호: '',

        // #3-7 로그인 3일 유지를 위해 상태변수 추가
        로그인정보: {}      // 객체로 저장하는 메인 상태변수
        // 로그인정보: {
        //     아이디: '',
        //     이름: '',
        //     휴대폰:'',
        //     주소:''
        // }
    });
    
    const navigate = useNavigate();

    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6IdSearch');
    }
    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6PwSearch');
    }

    const onClickSignup=(e)=>{
        e.preventDefault();
        navigate('/sub5');
    }

    // #3-3 onChange이벤트 등록 = 아이디
    const onChangeId=(e)=>{
        setState({
            ...state,
            아이디: e.target.value
        })
    }
    // #3-3 onChange이벤트 등록 = 비밀번호
    const onChangePw=(e)=>{
        setState({
            ...state,
            비밀번호: e.target.value
        })
    }

    // #3-5 REST API AXIOS = 로그인 구현하기
    const onSubmitSignIn=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', state.아이디);
        formData.append('userPw', state.비밀번호);

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly/kurly_signin.php',
            method: 'POST',     // AJAX = 자바에서는 type이다.
            data: formData
        })
        .then(( res )=>{
            // console.log( '성공!!' );
            // console.log( res );
            // console.log( res.data );
            // console.log( res.data.아이디 );
            // console.log( res.data.이름 );
            // console.log( res.data.휴대폰 );
            // console.log( res.data.주소 );
            // #3-6 로그인 시작 => 3일 간 로그인 유지하기
            if( res.status===200 ){ // 성공
                if( res.data!=='' ){    // php파일에서 else문 = 실패 에서 반환 값이 echo '' => 즉, !=='' 공백이 아니다 = 로그인 성공이다.
                    // #3-8 로컬스토레이지에 데이터 저장하기 -> 래퍼로 이동
                    let toDay = new Date(); // 현재날짜와 시간을 가져옴
                    toDay.setDate(toDay.getDate() + 3); // 현재 날짜를 가져와 +3을 해서 setDate = 저장해 toDay변수에 담는다. = 만료일을 지정함
                    // 로그인 정보를 상태관리에 저장한다.
                    // 저장데이터 : 이름, 아이디, 휴대폰, 주소, 만료일(3일)
                    const 로그인정보 = {   // 객체를 저장
                        아이디: res.data.아이디,
                        이름:   res.data.이름,
                        휴대폰: res.data.휴대폰,
                        주소:   res.data.주소,
                        만료일: toDay.getTime() // 천분의 1초 단위로 저장된다.
                    }
                    // 로컬스로테이지에 로그인 정보를 문자열로 바꿔서 = JSON.stringify 저장한다. 
                    localStorage.setItem('KURLY_SIGNIN_INFORMATION', JSON.stringify(로그인정보));

                    // #4-5 리덕스 상태변수 저장하기 -> 래퍼로 이동
                    dispatch(signIn(로그인정보));
                    // #5-5 -> 래퍼
                    // 새로고침하면 로그인 정보가 들어가고
                    // 로그인하면 주소가 들어간다.
                    dispatch(signIn(res.data.주소));
                    // #8-2 인덱스 페이지로 이동
                    navigate('/index');
                }
            }
        })
        .catch(( err )=>{
            console.log('실패...' + err);
        })

    }

    

    return (
        <main id='sub6' className='sub6'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text">로그인</h2>
                    </div>
                    
                    <div className="content sub6-content">
                        {/* 
                            #3-1 폼 submit 버튼 클릭 시 폼 데이터를 php파일로 전송하기
                            value={state.아이디}
                            onChange={onChangeId}  이렇게 value와 onChange 이벤트 폼에 등록하기

                            #3-4 폼데이터 전송을 위해 onSubmit={onSubmitSignIn} 등록
                        */}
                       <form onSubmit={onSubmitSignIn} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="text"
                                            name='userId' 
                                            id='userId'
                                            value={state.아이디}
                                            onChange={onChangeId}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="password" 
                                            name='userPw' 
                                            id='userPw' 
                                            value={state.비밀번호}
                                            onChange={onChangePw}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <span>
                                            <a href="!#" onClick={onClickIdSearch}>아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" onClick={onClickPwSearch}>비밀번호 찾기</a>
                                        </span>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="submit" 
                                            name='submitBtn' 
                                            id='submitBtn' 
                                            value={'로그인'} 
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">

                                                {/* 회원가입으로 이동 */}
                                        <input type="button" name='signupBtn' id='signupBtn' value={'회원가입'} onClick={onClickSignup} />
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
