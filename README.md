# 해커톤
* 해커톤 Server

* 요청은 POST(FormUrlEncoded)로 처리하였습니다.

* 기본 URL은 [URL]:5000 입니다.

## Server Code
### 200

    Success Processing Request

### 400

    Bad Request

### 401

    Unauthorized (Login Error)

### 403

    Forbidden -> 권한 오류

### 404

    URL Not Founded

### 409

    Conflict -> 데이터 충돌 (회원가입시 아이디 중복 등)

### 500

    Server Error


## API DOCUMENT

### Auth

#### /auth/login (로그인)
>Requiring Params

    id, password

>Return Values
>>Success

    HTTP : 200, JSONObject

>>Data Incorrect

    HTTP : 401

>>Not Founded

    HTTP : 401