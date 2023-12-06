import React from 'react';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import './scss/sub7.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub7NoticeInsertFormcomponent () {

    const [state, setState]= React.useState({
        isSelect: false,
        유형: '',
        작성자: '마초',
        아이디: 'macho',
        제목: '',
        내용: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const onClickSelect=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSelect: true
        })
    }

    // 유형
    const onChangeSelect=(e)=>{
        setState({
            ...state,
            유형: e.target.value
        })
    }

    // 제목
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            제목: e.target.value
        })
    }

    //내용
    const onChangeContents=(e)=>{
        setState({
            ...state,
            내용: e.target.value
        })
    }
   
    // 폼전송하기
    const onSubmitInsertForm=(e)=>{
        e.preventDefault();
        if( state.제목==='' ){
            confirmModalMethod('제목을 입력해주세요');
        }
        else if( state.내용==='' ){
            confirmModalMethod('내용을 입력해주세요');
        }
        else {
            // $wType    = $_POST['wType'];
            // $wSubjuct = $_POST['wSubjuct'];
            // $wContent = $_POST['wContent'];
            // $wName    = $_POST['wName'];
            // $wId      = $_POST['wId'];
            // http://gksmf519.dothome.co.kr/kurly/kurly_create_notice_table_insert.php
            const formData = new FormData();
            formData.append('wType', state.유형 );
            formData.append('wSubjuct', state.제목 );
            formData.append('wContent', state.내용 );
            formData.append('wName', state.작성자 );
            formData.append('wId', state.아아디 );

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly/kurly_create_notice_table_insert.php',
                method:'POST',
                data: formData
            })
            .then(( res )=>{
                if( res.status===200 ){
                    console.log( res + '성공!!');
                    confirmModalMethod('공지사항 게시글이 등록되었습니다.');
                    navigate('/sub7');
                }
                else {
                    confirmModalMethod('공지사항 내용을 다시 확인하고 다시 시도해주세요.');
                }
            })
            .catch(( err )=>{
                console.log( err + '실패..')
            })
        }
    }
    

    return (
        <main id='sub7'>
            <section id="section1">
                <div className="container">                                       
                    <div className="content">
                        <Sub7NoticeLeftComponent />  
                        
                        <div  className="right sub7-insert-form">
                            <div className="right-header">
                                <h2>공지사항</h2>                               
                            </div>                            
                            <div className="right-list">
                                {/* 공지사항 글쓰기 입력폼 */}
                                <form autoComplete='off' onSubmit={onSubmitInsertForm}>
                                    <div className="insert-form">
                                        <ul>
                                            <li>
                                                <div className="gap">   
                                                    <label  className='left-label' htmlFor="wType">유형<i>*</i></label>
                                                    <select name="wType" id="wType" onClick={onClickSelect} onChange={onChangeSelect}>
                                                        <option value="">게시글</option>
                                                        <option value="공지">공지글</option>
                                                    </select>                                                    
                                                    <span className={`icon-arrow-down${state.isSelect?' on':''}`}></span>
                                                </div>                                                
                                            </li>
                                            <li>
                                                <div className="gap">   
                                                    <span className='left-label'>작성자<i>*</i></span>                                                    
                                                    <div className="admin-name">{'마초'}</div>
                                                </div>                                                
                                            </li>
                                            <li>
                                                <div className="gap">                                                    
                                                    <span className='left-label'>아이디<i>*</i></span>
                                                    <div className="admin-id">{'macho'}</div> 
                                                </div>                                                
                                            </li>
                                            <li>
                                                <div className="gap">                                                    
                                                    <label className='left-label' htmlFor="subject">제목<i>*</i></label>
                                                    <input type="text" name='subject' id='subject'  onChange={onChangeSubject} value={state.제목} />
                                                </div>                                                
                                            </li>
                                            <li>
                                                <div className="gap">                                                    
                                                    <label className='left-label' htmlFor="contents">내용<i>*</i></label>
                                                    <textarea name="contents" id="contents" cols="30" rows="10"  onChange={onChangeContents} value={state.내용} ></textarea>
                                                </div>       
                                            </li>
                                        </ul>
                                    </div>  

                                    <div className="button-box">
                                        <button type='submit'>등록</button>
                                    </div>  
                                </form> 
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};