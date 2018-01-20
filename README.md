# AVA
* AVA Backend Server

* 요청은 POST(FormUrlEncoded)로 처리하였습니다.

* 기본 URL은 http://soylatte.kr:5000 입니다.

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
    
#### /auth/regiser (회원가입)
>Requiring Params

    username, id, password 
    
>Return Values
>>Success

    HTTP : 200, JSONObject 
    
>>Already In Database

    HTTP : 409, {success:false, message:"Already In Database"}
    
#### /auth/edituser (회원정보수정)
>Requiring Params

    username, id, password
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 401, {success:false, message:"데이터를 찾을수 없음"}
    
#### /auth/edituser/img (회원프로필 수정)
>Requiring Params
    
    id, profile_img(이미지)
    
>Return Values
>>Success

    HTTP : 200, JSONObject
    
>>Not Founded
    
    HTTP : 401, {success:false, message:"데이터를 찾을수 없음"}
    
    
### Ah "아"
#### /ah/post/add ("아" 새글 작성)
>Requiring Params

    username, user_token, title, text
    
>Return Values
>>Success
    
    HTTP : 200, {success:true, message:"아껴쓰기 등록완료!"}

#### /ah/post/list ("아" 글 목록)
>Requiring Params

    NO Param

>Return Values
>>Success
    
    HTTP : 200 , JSONArray

#### /ah/post/myah (내가 쓴 "아" 글 목록)
>Requiring Params

    user_token
    
>Return Values
>>Success

    HTTP : 200, JSONArray
    
#### /ah/post/view (선택한 "아" 글 상세 정보)
>Requiring Params

    post_token
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 400, {success:false, message:"글을 찾을수 없습니다"}
    
#### /ah/post/like (글 좋아요 누르기)
>Requiring Params

    post_token
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"종아요 되었습니다"}
    
>>Not Founded

    HTTP : 400, asdf
    
#### /ah/post/rank ("아" 글 랭크 5개 불러오기)
>Requiring Params

    NO Param
    
>Return Values
>>Success 

    HTTP : 200, JSONArray
    
#### /ah/comment/add (댓글 달기)
>Requiring Params

    author, author_token, text, post_token
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"댓글등록 성공"}
    
#### /ah/comment/view (글에 대한 댓글 불러오기)
>Requiring Params

    post_token
    
>Return Values
>>Success
    
    HTTP : 200, JSONArray
    
### Na "나"

### Ba "바"

### Da "다"
