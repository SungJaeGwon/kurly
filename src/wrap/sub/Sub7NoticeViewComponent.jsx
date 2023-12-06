import React from 'react';
import './scss/sub7_view.scss';
// #4 라우터 적용하기
import { useNavigate, useLocation } from 'react-router-dom';
//# 7-3
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

// #3 파일만들기
export default function Sub7NoticeViewComponent () {

    // 컨펌모달창 함수
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

    // #4-1 location 가져오기 -> child
    const navigate = useNavigate();
    const location = useLocation(); // 로케이션은 state를 가져온다.
    const dispatch = useDispatch();

    console.log( location );
    // console.log( location.state );
    // console.log( location.state.유형 );
    // console.log( location.state.제목 );
    // console.log( location.state.내용 );
    // console.log( location.state.작성자 );
    // console.log( location.state.작성일 );
    // console.log( location.state.아이디 );

    // #4-5 목록누르면 다시 이동하기
    const onClickList=(e)=>{
        e.preventDefault();
        navigate('/sub7');
    }

    // #5-1 수정페이지로 이동
    const onClickUpdate=(e)=>{
        e.preventDefault();
        // #6-2 location으로 데이터 보내기 -> 업데이트
        navigate('/sub7Update', {state: location.state });  // location안에 있는 state의 모든 객체를 보낸다.
    }

    // #5-1 삭제 컴포넌트 이동
    const onClickDelete=(e)=>{
        e.preventDefault();
        navigate('/sub7');
        // #7-2 삭제구현

        let formData = new FormData();
        // #6-7 formData.append('idx', state.번호 ); 추가 -> 업데이트 php
        formData.append('idx', location.state.번호 );
        axios({
            url:'http://gksmf519.dothome.co.kr/kurly/kurly_notice_table_delete.php',
            method:'POST',
            data: formData
        })
        .then(( res )=>{
            if( res.status===200 ){
                console.log( res + '성공!!');
                confirmModalMethod('공지사항 삭제완료되었습니다..');
                navigate('/sub7');
            }
            else {
                confirmModalMethod('폼 내용을 다시 확인하고 다시 시도해주세요.');
            }
        })
        .catch(( err )=>{
            console.log( err + '실패..')
        })
    }

    

    return (
        <div id='sub7View'>
            <section id="section">
                <div className="container">
                    <div className="title">
                        <h2>공지사항</h2>
                        <h3>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</h3>
                    </div>
                    <div className="content">
                        <div className="view_box">
                            <ul>
                                <li>
                                    <ul>
                                        <li>
                                            <div className="left">
                                                <strong>제목</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.제목}</p>
                                            </div>
                                        </li>
                                        <li>
                                        <div className="left">
                                                <strong>작성자</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.작성자}</p>
                                            </div>
                                        </li>
                                        <li>
                                        <div className="left">
                                                <strong>작성일</strong>
                                            </div>
                                            <div className="right">
                                                <p>{`${new Date(location.state.작성일).getFullYear()}.${new Date(location.state.작성일).getMonth()+1}.${new Date(location.state.작성일).getDate()}`}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="gap">
                                        <div className="contents">
                                            {/* 
                                                #6 디버깅 내용이 줄바꿈이 안됨 
                                                split() 함수를 써서 배열로 처리
                                                .map()함수 써서 p태그를 반복문 처리한다.
                                            */}
                                            {
                                                // location.state.내용
                                                location.state.내용.split('<br />').map((item)=>{
                                                    return (
                                                        <p>{item}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="button_box">
                            {/* 
                                #4-4 버튼 이벤트

                                #5 수정버튼 추가하고 onClick={onClickUpdate) 이벤트 등록

                                #7-1 삭제하기 
                            */}
                            <button type='button' onClick={onClickDelete}>삭제</button>
                            <button type='button' onClick={onClickUpdate}>수정</button>
                            <button type='button' onClick={onClickList}>목록</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
