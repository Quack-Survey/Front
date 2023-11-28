<div align="center">
    <h1>Quack Survey</h1>
  <img width=700 src="https://github.com/Quack-Survey/Front/assets/52587871/fe1bc5b3-286e-4fcf-8647-d851c83356c6"/>
</div>

  <br/>

  **이메일 로그인 테스트 계정**

  |     | 관리자        |
  | --- | ------------- | 
  | ID  |  |  |
  | PW  |  |  |

  <br/>
  <br/>

<br/>

# 목차
1. [개요](#1-개요)
2. [기술 스택](#2-기술-스택)
3. [기능 소개](#3-기능-소개)
4. [팀 소개](#4-팀-소개)

<br/>

# 1. 개요
> 일반인들도 전문적으로 설문을 운영할 수 있다!

편리하게 설문을 기획하고, 응답현황을 관리하고 응답결과를 시각화할 수 있는 서비스입니다.
세미나/모임 관련 설문조사를 진행하려는 대학생/일반인, 구상 아이템에 대한 수요조사를 사전에 진행해보려는 예비 창업자를 타겟으로 합니다.
주요 기능은 아래와 같습니다.

|기능|설명|
|-|-|
|모바일 설문 에디터|모바일에 최적화된 설문개설/편집 에디터|
|설문 로직 커스텀|문항에 적용할 로직을 간편하고 직관적으로 설정가능|
|응답현황 모니터링|응답현황을 한 눈에 파악할 수 있도록 시각화|
|조사결과 시각화|조사결과를 다방면으로 분석할 수 있도록 쿼리필터 기능 지원|



<br/>

# 2. 기술 스택
<h3>Tech Stack</h3>

![기술스택](https://github.com/Quack-Survey/Front/assets/52587871/a62f1191-79b7-4845-95f4-afb9d5295091)



<h5>System Architecture</h5>

# 3. 기능 소개
> 1. 로그인
> 2. 홈
> 3. 설문에디팅
> 4. 대쉬보드
> 5. [유저단]설문응답화면
<br/>

## 1. 로그인
### ① 회원가입
- 이메일 형식체크 
- 비밀번호 자릿수 제한 및 문자/숫자/특수문자 조합
- 닉네임 미입력시 랜덤생성 (ex 슬픈 너구리)
- 이메일 인증
- 회원가입 완료 후 자동 로그인로그인 기능

|회원가입|이메일 인증|회원가입 완료시|
|--|--|--|
|![회원가입](https://github.com/Quack-Survey/Front/assets/52587871/6795bd45-1083-4af2-83b9-b46d530c11e5)|![회원가입_완료](https://github.com/Quack-Survey/Front/assets/52587871/0ad6f05a-ba08-43c9-b317-6447eb1872cf)||


### ② 로그인
- 로그인 정보 validation

|로그인|
|--|
|![로그인](https://github.com/Quack-Survey/Front/assets/52587871/cd0e62a3-f612-434c-9c7a-d880b66388b5)|


### ③ 비밀번호 분실대처
- 이메일 주소 입력시 비밀번호 변경링크 발승
- 보안을 위해 링크 유효기간 설정
- 수신한 이메일에서 링크 클릭시 비밀번호 변경 화면으로 이동

|비밀번호 찾기|비밀번호 변경메일|비밀번호 변경완료시|
|--|--|--|
|![비밀번호 찾기](https://github.com/Quack-Survey/Front/assets/52587871/166f624a-54da-49f5-8374-00005c781fdb)||![비밀번호 찾기_변경](https://github.com/Quack-Survey/Front/assets/52587871/e30cb69e-3c7e-4b8a-a4be-cac46cc3cca6)|




## 2. 홈
- 신규 템플릿 개설하기
- 생성된 설문템플릿 조회
- 셍성된 설문템플릿 수정하기

## 3. 설문에디팅
### ① 문항 CRUD
- 상태변화에 따른 즉각적인 UI 변경기능
- 단일/복수/서술형 문항구분에 따른 템플릿 생성
- 복제. 엔터, 위/아래이동 등 모바일 입력 편의기능
- 필수응답여부 설정

### ② 문항 DND 
- 순서변경 완료시 넘버링 업데이트
- 로직 기반 DND validation : 순서를 변경할 문항에 로직이 적용되어있을 경우, 링크될 문항보다 순서가 뒤로 밀릴 수 없음

### ③ 설문 편의기능
- 데드라인 설정 : 응답수집이 종료될 일자를 설정함
- 목표 응답수 설정 : 본 설문으로 목표하는 총 응답수를 설정
- 쿼터비율 설정 : 분석변수의 각 항목별로 목표하는 구성비율을 설정하며, 이때 합이 100%가 되는지 검증함

|① 문항 CRUD|② 문항 DND |③ 설문 편의기능|
|-|-|-|
|![crud](https://github.com/Quack-Survey/Front/assets/52587871/05329021-16c4-4266-9f87-b42ba6aa39cc)|![dnd](https://github.com/Quack-Survey/Front/assets/52587871/a3a28ef5-efe0-4152-a3ea-89e968b591a6)|![편의기능](https://github.com/Quack-Survey/Front/assets/52587871/b1ad2258-4f18-4f23-898b-83cd0262d9a4)|


### ④ 로직 설정
> **용어 정의**
>
> 1) 문항 : 질문을 뜻함<br/>
> 2) 항목 : 문항 내 선택지<br/>
> 3) (이동)로직 : 유저단에서 보여질 문항의 순서를 정의함. 특정 문항에서 유저가 선택한 항목에 기반해 다음에 표시될 문항을 정하는 규칙<br/>

- 로직 설정 프로세스 구현<br/>
  (1) 로직적용 항목 선택 : 로직이 적용될 항목을 선택<br/>
  (2) 링크 문항 선택 : (1)에서 지정된 항목이 실제로 응답자에 의해 선택될 경우, 다음에 표시될 문항을 선택<br/>

- 로직 대쉬보드 : 설정된 로직을 관리자가 이해하기 쉽게 시각화함

### ⑤ 미리보기 & 설문링크 생성기능
- 미리보기 : 생성한 설문을 실제 응답자가 보게될 화면으로 표출
- 설문링크 생성 : 실제로 설문에 참여할 응답자에게 발송할 링크를 생성함

|④ 로직 설정|⑤ 미리보기 & 설문링크 생성기능|
|-|-|
|![로직](https://github.com/Quack-Survey/Front/assets/52587871/614a25c6-862f-4cb9-80f7-383430a3e11b)|![미리보기](https://github.com/Quack-Survey/Front/assets/52587871/9ab13e2f-f2ef-45e8-a2a5-52a698b4bea3)|

## 4. 대쉬보드
## 5. [유저단]설문응답화면

### ① 응답페이지 뷰
- 설문 에디터에서 생성된 문항을 응답용으로 표출
- 단수문항일 경우 단일선택, 복수문항일 경우 다중선택 기능적용
- 서술형문항일 경우 textarea 적용

### ② 로직 validation
- 설문에디터에서 설정한 로직이 있는 경우, 응답한 항목에 따라 다음 응답해야하는 문항 표출
- 로직적용된 문항에서 특정 항목 선택시, 검증이 이루어짐
- 로직검증에 따라 제외되는 문항들은 fold처리

### ③ 필수응답 validation
- 응답자가 필수문항에 응답하지 않았을 경우 warning이 표시

|응답페이지 뷰|로직 validation|필수응답 validation
|-|-|-|
|![문항뷰](https://github.com/Quack-Survey/Front/assets/52587871/e6e01413-75cb-4d9d-be05-f75dc34e6060)|![로직설정](https://github.com/Quack-Survey/Front/assets/52587871/bb8c76e2-6e85-4bde-b3ce-11d9ea98fc8c)|![필수문항](https://github.com/Quack-Survey/Front/assets/52587871/29bf4a5f-1e76-41fc-ab28-f45728ddb247)|
|설문편집 내용|로직설정 내용|
|![스크린샷 2023-11-19 181611](https://github.com/Quack-Survey/Front/assets/52587871/94784564-953d-431c-88dc-06a8546651f4)|![스크린샷 2023-11-19 191155](https://github.com/Quack-Survey/Front/assets/52587871/fe598834-e3ea-487a-8f1f-a47ba10e2bc6)|



## 🗄️DB 설계


# 4. 팀 소개
<div align="center">

|이재훈|정연우|곽성재|신유정|
|:-:|:-:|:-:|:-:|



