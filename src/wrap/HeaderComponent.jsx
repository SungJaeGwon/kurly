import React from "react";
import './scss/Header.scss';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { isAddress } from "../reducer/isAddress";

import { signIn } from "../reducer/signIn";
import { address } from "../reducer/address";

export default  function HeaderComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    // 웹브라우저에서 메인 페이지로 온 후 로그인 정보가 저장되어 있는지 다시 확인하기
    // console.log( selector.signIn );
    // console.log( selector.signIn.로그인정보 );

    const location = useLocation();
    const navigate = useNavigate();

    const row3 = React.useRef(); // 선택자 선언

    // 리액트.유즈스테이트 훅(상태관리)
    const [state, setState] = React.useState({
        isBar: false,
        is고객센터: false,
        isFixed: false,
        is배송지등록: false,   // 배송지 등록 툴팁메뉴
        onMouseEnterSignIn: true,

    });

    const onClickLogOut=(e)=>{
        e.preventDefault();
        dispatch(signIn(null)); // 리덕스 특징 => 로그인 정보 삭제 => 동기화(삭제됨가 동시에 바로 수행)
        dispatch(address('')); // 리덕스 특징 => 로그인 정보 삭제 => 동기화(삭제됨가 동시에 바로 수행)
        localStorage.removeItem('KURLY_SIGNIN_INFORMATION'); // 로컬스토레이지 정보 삭제
        navigate('/index'); // 메인페이지로 이동
    }

    // 로그인 후 이름에 툴팁 이벤트 
    const onMouseEnterSignIn=()=>{
        setState({
            ...state,
            onMouseEnterSignIn: true
        })
    }
    const onMouseLeaveSignIn=()=>{
        setState({
            ...state,
            onMouseEnterSignIn: false
        })
    }

    // 윈도우스크롤 이벤트
    // 자바스크립트 일반코딩
    // window  resize()  window  scroll()
    // 리액트.유즈이펙트 훅
    // React.useEffect();
    // React.useEffect(()=>{});
    React.useEffect(()=>{

        let row3Top = row3.current.offsetTop+42; // 100+42(탑모달높이)
        // console.log('row3Top ' + row3Top );
        // 스크롤이벤트
        // window.addEventListener();
        // window.addEventListener('scroll', function(){});
        window.addEventListener('scroll', function(){
            if(window.scrollY>=row3Top){
                setState({
                    ...state,
                    isFixed: true
                });
            }
            else {
                setState({
                    ...state,
                    isFixed: false
                });
            }
        });
    },[]);



    // 헤더영역 1행
    const onMouseEnterCustomer=()=>{
        setState({
            is고객센터: true
        })
    }
    const onMouseLeaveCustomer=()=>{
        setState({
            is고객센터: false
        })
    }

    // 헤더영역 3행 
    // 3Bar 이벤트
    // 마우스오버 onMouseOver  => onMouseEnter 사용권장
    const onMouseEnterIsBar=()=>{
        setState({
            isBar: true
        });
    }
    // 마우스아웃(리브) onMouseOut => onMouseLeave 사용권장
    const onMouseLeaveIsBar=()=>{
        setState({
            isBar: false
        });
    }

    // 배송지등록 마우스 엔터 이벤트
    const onMouseEnterMap=()=>{
        setState({
            ...state,
            is배송지등록: true
        })
    }

    // 배송지등록 마우스 리브 이벤트
    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            is배송지등록: false
        })
    }


    // 배송지 등록 및 변경 클릭 이벤트
    const onClickAddressUpdate=(e)=>{
        e.preventDefault();        
        
        dispatch(isAddress(true));
    }

    return(
        <>
            <header id="header">
                <div className="row1 row">
                    <div className="container">
                        <div className="content">
                            <aside id="aside">
                                {
                                    selector.signIn.로그인정보 !== null && (   // 아이디가 널이 아니면~ 즉, 로그인이 되어있다면 아래 부분을 보여라.
                                    <div className="signin_box" onMouseLeave={onMouseLeaveSignIn}>
                                            <Link to="/sub6" className="sign on" onMouseEnter={onMouseEnterSignIn}>
                                                <span>일반 </span>
                                                <span>{selector.signIn.로그인정보.이름}님</span>
                                                <span><img src="./images/sub/sub6/icon_check.png" alt="" /></span>
                                                <span><img src="./images/intro/ico_down_16x10.png" alt="" /></span>
                                            </Link>
                                            {
                                                state.signInToolTip && (
                                                <div className="sign_tooltip">
                                                    <ul>
                                                        <li><Link to="!#">주문 내역</Link></li>
                                                        <li><Link to="!#">선물 내역</Link></li>
                                                        <li><Link to="!#">찜한 상품</Link></li>
                                                        <li><Link to="!#">배송지 관리</Link></li>
                                                        <li><Link to="!#">상품 후기</Link></li>
                                                        <li><Link to="!#">결제수단·컬리페이</Link></li>
                                                        <li><Link to="!#">상품 문의</Link></li>
                                                        <li><Link to="!#">적립금·컬리캐시</Link></li>
                                                        <li><Link to="!#">쿠폰</Link></li>
                                                        <li><Link to="!#">개인 정보 수정</Link></li>
                                                        <li><Link to="!#">나의 컬리 스타일<span><img src="./images/sub/sub6/4717199886363376199b7796ad8e0c5e.png" alt="" /></span></Link></li>
                                                        <li><Link to="!#">컬리멤버스</Link></li>
                                                        <li onClick={onClickLogOut}><a href="!#">로그아웃</a></li>
                                                    </ul>
                                                </div>
                                                )
                                            }
                                    </div>
                                    )
                                }


                                {
                                    selector.signIn.로그인정보 === null && (   // 아이디가 null이면 = 로그아웃상태면 이 부분이 보여라~
                                        <>
                                            <Link to="/sub5" className="on">회원가입</Link>
                                            <i>|</i>                            
                                            <Link to="/sub6">로그인</Link>
                                        </>
                                    )
                                }
                                <i>|</i>
                                <Link 
                                    to="/sub7" 
                                    onMouseEnter={onMouseEnterCustomer}
                                    
                                >고객센터 <img src="./images/intro/ico_down_16x10.png" alt="" /></Link>
                            {  

                                    state.is고객센터 && (
                                        <div 
                                            className="customer-center" 
                                            onMouseLeave={onMouseLeaveCustomer}
                                        >
                                            <ul>
                                                {/* 
                                                    #1 공지사항 페이지 링크걸기 -> 서브7
                                                */}
                                                <li><Link to="/sub7">공지사항</Link></li>
                                                <li><a href="!#">자주하는 질문</a></li>
                                                <li><a href="!#">1:1 문의</a></li>
                                                <li><a href="!#">대량주문 문의</a></li>
                                            </ul>
                                        </div>
                                    )
                                }
                                    <i>|</i>
                            {
                                selector.signIn.로그인정보===null && (
                                <Link to="/sub7AdminSign">
                                    MyAmin
                                </Link>
                                )
                            }
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row2 row">
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <Link to="/index">
                                    <img src="./images/intro/icon_logo.svg" alt="" />
                                    <span>마켓컬리</span>
                                </Link>
                                <i>|</i>
                                <a href="!#">뷰티컬리<img src="./images/intro/icon_logo_n.svg" alt="" /></a>
                            </div>
                            <div className="center">
                                <input type="text" name="search" id="search" /* value={state.검색어} */ placeholder="검색어를 입력해주세요" />
                                <button><img src="./images/intro/icon_zoom_purple.svg" alt="" /></button>
                            </div>
                            <div className="right">
                                <span>
                                    <a 
                                        href="!#" 
                                        onMouseEnter={onMouseEnterMap}
                                    ><img src="./images/intro/icon_marp.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/icon_heart.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/icon_cart.svg" alt="" /></a>
                                </span>
                                {

                                state.is배송지등록 && (
                                    <div 
                                        className="map-address" 
                                        onMouseLeave={onMouseLeaveMap}
                                    >
                                       { 
                                           selector.address.주소==='' && (
                                                <ul>
                                                    <li><strong>배송지를 등록</strong>하고</li>
                                                    <li>구매 가능한 상품을 확인하세요!</li>
                                                    <li>
                                                        <a href="!#">로그인</a>
                                                        <button onClick={onClickAddressUpdate}>
                                                            <img src="./images/header/icon_zoom_button.png" alt="" />
                                                            <span>주소검색</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                          
                                        }

                                        {
                                            selector.address.주소!=='' && (
                                                <ul>
                                                    <li>{selector.address.주소}</li>
                                                    <li>{'샛별배송'}</li>
                                                    <li>
                                                        <button className="address-update" onClick={onClickAddressUpdate}>
                                                            <span>배송지변경</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    </div>
                                )

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={row3}  className={`row3 row${state.isFixed?' fixed':''}`}>
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <a href="!#" 
                                    onMouseEnter={onMouseEnterIsBar} 
                                    onMouseLeave={onMouseLeaveIsBar} 
                                    className={state.isBar ? "on" : ""}
                                >
                                    {/* 상태변수 isBar 이용 조건부 연산 이미지 선택 */}
                                    <img 
                                        src={state.isBar ? "./images/intro/icon_3bar_on.svg" : "./images/intro/icon_3bar.svg" } 
                                    alt="" />
                                    <span>카테고리</span>
                                </a>
                            </div>
                            <div className="center">
                                <nav> {/* 송신 useNavigate() 수신 location= useLocation() */}
                                    <Link to={{pathname:"/sub1"}} className={location.pathname==='/sub1'?"on":''}>신상품</Link>
                                    <Link to={{pathname:"/sub2", state:{name:"이순신", age: 29}}} className={location.pathname==='/sub2'?"on":''}>베스트</Link>
                                    <Link to={{pathname:"/sub3"}} className={location.pathname==='/sub3'?"on":''}>알뜰상품</Link>
                                    <Link to={{pathname:"/sub4"}} className={location.pathname==='/sub4'?"on":''}>특가/혜택</Link>
                                </nav>
                            </div>
                            <div className="right">
                                <a href="!#">
                                    <em>샛별・택배</em><span>배송안내</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}