 
 1. 레파지토리 생성
  - kurly
 2. setting
  - pages 클릭 -> girhub pages -> Build and deployment 안에 Branch -> None 선택하면 원래는 master를 선택해야함 -> 배포주소가 나타난다. 배포주소.io
 3. package.json
  - "homepage": "http://github.com/SungJaeGwon/kurly.io"
 
 4. 깃 설정
  - git init
 
 5. 깃 환경(config) 설정 => 이름, 이메일
  - git config user.name 'GwonSungJae'
  - git config user.email 'gwonsj94@naver.com'

  ++확인
 
 6. 리모트 오리진 추가 = 배포주소를 추가
  - git remote add origin https://github.com/SungJaeGwon/kurly.git
 
 ++확인
 git remote -v
 7. 스테이징 = add
  - git add .
 8. 스테이징 = commit
  - git commit -m 'kurly 프로젝트 배포'
 9. 스테이징 = push
  - git push origin master

10. Deployment(배포) => 웹사이트 주소가 있다.