 
 1. 레파지토리 생성
  - kurly
 2. setting
  - pages 클릭 -> girhub pages -> Build and deployment 안에 Branch -> None 선택하면 원래는 master를 선택해야함 -> 배포주소가 나타난다. 배포주소.io
 3. package.json
  - "homepage": "https://github.com/SungJaeGwon/kurly.io"
                 https://github.com/SungJaeGwon/kurly.git
                   
                   ★ 이게 배포주소 : "homepage": "https://SungJaeGwon.github.io/kurly"
  
  - "homepage": "https://github.com/SungJaeGwon/kurly.io"
 4. 깃 설정
  - git init
 
 5. 깃 환경(config) 설정 => 이름, 이메일
  - git config user.name 'GwonSungJae'
  - git config user.email 'gwonsj94@naver.com'

  ++확인
 
 6. 리모트 오리진 추가 = 배포주소를 추가
  - git remote add origin https://github.com/SungJaeGwon/kurly.git  => .git을 .io로 밖면 배포주소가 된다!!
 
 ++확인
 git remote -v
 7. 스테이징 = add
  - git add .
 8. 스테이징 = commit
  - git commit -m 'kurly 프로젝트 배포'
 9. 스테이징 = push
  - git push origin master

10. Deployment(배포) => 웹사이트 주소가 있다.
 - 깃허브 사이트에서 레파지토리(kurly)클릭하면 README.md 글이 쭉 나오는데
 - 위쪽에 Deployment 글자색 다른 거 클릭하면 Deployment로 이동한다.
 - 아래쪽으로 쭉 내리다보면 step1이 보인다.

 ### Step 1: Add homepage to package.json
 -   "homepage": "https://myusername.github.io/my-app",

 ### Step 2: Install gh-pages and add deploy to scripts in package.json
  ++ 아래 3개 중에 아무거나 설치해도 된다. => 패키지 추가
  - npm install --save gh-pages
  - npm install gh-pages
  - npm i gh-pages
  
  ++ package.JSON 속성 추가하기!!!!! 스텝2에서 반드시 거쳐가야함

    // 마스터용 배포 시
    ++ package.json script에 속성을  아래 2가지 추가한다.
    "predeploy": "npm run build",
    "deploy": "gh-pages -b master -d build"
    => 위 2개를패키지제이슨 가서 "scripts" 부분 아래에 위 두가지 패키지 추가!!


    // 브랜치용 배포 시
    "predeploy": "npm run build"
    "deploy": "gh-pages -d build"


 ### Step 3: Deploy the site by running npm run deploy
    ++ Build를 실행 => 반드시 마지막에 Published 가 나와야 정상적으로 완료된 것
    ++ -d는 삭제 -b는 추가
    - npm run deploy

### 이제 깃허브 가서 새로고침한다.
