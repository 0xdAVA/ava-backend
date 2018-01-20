# AVA
* AVA Backend Server

* 요청은 POST(FormUrlEncoded)로 처리하였습니다.

* 기본 URL은 http://soylatte.kr:3000 입니다.

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

### Facebook
#### /facebook/app (페이스북 로그인)
>Requiring Params

    access_token
    
>Return Values
>>Success

    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 401, Can't find User On Facebook. It May Be Unusable.

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
    
#### /auth/edituser/img (회원프로필사진 수정)
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

    username, user_token, title, text, file
    
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

    post_token, user_token
    
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

    username, user_token, text, post_token
    
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
#### /na/post/add ("나" 새글 작성)
>Requiring Params

    title, text, quality_status, tag, username, user_token, send_type
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"포스트 성공"}
    
#### /na/post/list ("나" 글 목록)
>Requiring Params

    No Param
    
>Return Values
>>Success
    
    HTTP : 200, JSONArray
    
#### /na/post/view ("나" 글 상세 정보)
>Requiring Params

    post_token
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 400, {success:false, message:"글을 찾을수 없습니다"}
    
#### /na/comment/add ("나" 선착순 댓글 작성)
>Requiring Params

    username, user_token, text, post_token
    
>Return Values
>>Success
    
    HTTP : 200, {success:true, message:"댓글등록 성공"}
    
#### /na/deal/add ("나" 나눔매칭시)
>Requiring Params

    post_token, master_token, slave_token, post_token, master_name, slave_name
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"asdf"}
    
#### /na/deal/comment ("나" 나눔시 채팅)
>Requiring Params

    deal_token, username, message

>Return Values
>>Success

    HTTP : 200, {success:true, message:"asdfa"}
  
>>Not Founded

    HTTP : 400, {success:false, message:"Not Founded"}
    
#### /na/deal/address ("나" 나눔시 수령지 주소 등록)
>Requiring Params

    deal_token, addresss
    
>Return Values
>>Success
    
    HTTP : 200, {success:true, message:"Asdf"}
    
#### /na/deal/delivery ("나" 나눔시 운송장번호 등록)
>Requiring Params

    deal_token, delivery_number, delivery_code
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"Asdf"}
    
#### /na/deal/delivery/search (운송장 번호 검색)
>Requiring Params

    code, number
    
>Return Values
>>Success

    HTTP : 200, JSONObject
    
#### /na/deal/complete ("나" 나눔 성공시 상태 코드 변경)
>Requiring Params

    post_token, deal_token
    
>Return Values
>>Success
    
    HTTP : 200, {success:true, message:"asdf"}

### Ba "바"

### Da "다"
#### /da/post/add ("다" 새글 작성)
>Requiring Params

    username, user_token, title, text, file
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"post Save Success"}
    
#### /da/post/list ("다" 글 목록)
>Requiring Params

    NO Param
    
>Return Values
>>Success

    HTTP : 200, JSONArray
    
#### /da/post/myda (내가 쓴 "다" 글 목록)
>Requiring Params

    user_token
    
>Return Values
>>Success

    HTTP : 200, JSONArray
    
#### /da/post/view (선택한 "다" 글 상세 정보)
>Requiring Params

    post_token
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 400, {success:false, message:"글을 찾을수 없습니다"}
    
#### /da/post/like ("다" 글 종아요 누르기)
>Requiring Params

    post_token, user_token
    
>Return Values
>>Success
    
    HTTP : 200, {success:true, message:"종아요 되었습니다"}
    
>>Not Founded

    HTTP : 400, asdf
    
#### /da/post/rank ("다" 글 상위 5개 랭크 불러오기)
>Requiring Params

    No Param
    
>Return Values
>>Success
    
    HTTP : 200, JSONArray
    
#### /da/post/search ("디" 글 검색)
>Requiring Params

    title
    
>Return Values
>>Success
    
    HTTP : 200, JSONArray
    


