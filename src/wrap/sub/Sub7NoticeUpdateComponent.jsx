import React from 'react';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import './scss/sub7.scss';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub7NoticeUpdateComponent () {

    

    const [state, setState]= React.useState({
        isSelect: false,
        유형: '',
        작성자: '마초',
        아이디: 'macho',
        제목: '',
        내용: '',

        // #6-6 번호 추가
        번호: 0
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // #6-3 안전하게 유즈이펙트 써서 데이터를 수정폼에 저장하기-> php....셀렉트
    // 이렇게하면 수정버튼 눌렀을 때 수정폼에 데이터가 들어온다.
    React.useEffect(()=>{
        if( location.state.아이디!=='' ){
            setState({
                ...state,
                번호:   location.state.번호,
                유형:   location.state.유형,
                작성자: location.state.작성자,
                아이디: location.state.아이디,
                제목:   location.state.제목,
                내용:   location.state.내용
            })
        }
    },[])

    // #6 수정을 위해 등록 => Sub7NoticeUpdateComponent 래퍼에 등록하러가기
    const location = useLocation();
    console.log('여기는 수정폼입니다.');
    console.log( location );

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
            let formData = new FormData();
            // #6-7 formData.append('idx', state.번호 ); 추가 -> 업데이트 php
            formData.append('idx', state.번호 );
            formData.append('wType', state.유형 );
            formData.append('wSubjuct', state.제목 );
            formData.append('wContent', state.내용 );
            formData.append('wName', state.작성자 );
            formData.append('wId', state.아아디 );

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly/kurly_notice_table_update.php',
                method:'POST',
                data: formData
            })
            .then(( res )=>{
                if( res.status===200 ){
                    console.log( res + '성공!!');
                    confirmModalMethod('수정내용이 수정완료되었습니다.');
                    navigate('/sub7');
                }
                else {
                    confirmModalMethod('수정 내용을 다시 확인하고 다시 시도해주세요.');
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