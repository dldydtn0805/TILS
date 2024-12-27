# React

## 02. Cors와 Proxy

출처 : [인프런 : 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의(John Ahn)](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

### 0. SOP

SOP(Same Origin Policy) : 다른 출처(Origin) 리소스를 사용하는 것을 제한하는 보안 방식

- URL의 구성 요소는 Protocol, Host, Port, Path, Query String으로 구성되어 있다
  - Origin(= Protocol+Host+Port)를 통해 출처의 같음 여부를 파악할 수 있다
  - 하나라도 다를 경우, 다른 출처(IE의 경우, Port는 달라도 같은 출처 취급)

SOP을 사용하는 이유 : 주요한 정보 유출 방지

- 동일 출처에서의 Request만 받아들임
- 다른 출처에서 온 경우(COR), SOP에 위반

SOP의 문제점 : 다른 출처의 리소스가 필요한 경우

- 난 다른 출처의 자원을 가져다 써야 함
- SOP에 의하면, 다른 출처로부터 오는 Request를 받아들이지 않음
- 어떡해~

### 1. CORS

CORS(Cross-Origin Resource Sharing) : 다른 출처의 자원을 공유하는 것

- 추가 HTTP 헤더를 사용하여 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에게 알려주는 체제

#### CORS 접근 제어 시나리오

1. Prefligh Request : 본 요청을 보내기 전, 서버에게 물어보는 Request

- OPTION 메서드를 통해 다른 도메인의 리소스에 요청이 가능한지를 확인
- 가능할 경우, 실제 요청을 보냄

2. Simple Request : 본 요청을 보내며 CORS인지 확인하는 요청

- GET, POST, HEAD 메서드 중 하나를 사용
- Content-Type이 아래 세 가지 중 하나
  - application/x-www-form-unlencoded
  - multipart/form-data
  - text/plain
- 헤더는 Accept, Accept-Language, Content-Language, Content-Type

3. Credentialed Request : 클라이언트에서 서버에게 자격 인증 정보를 실어 요청할 때 사용되는 요청

- 자격 인증 정보(Credential) : 세션 ID가 저장되어 있는 쿠키(Cookie) 혹은 Authorization 헤더에 설정하는 토큰 값 등

#### Proxy

Proxy : 브라우저와 서버 간의 통신을 도와주는 중계 서버

- CORS 에러 해결을 위해 필수적인 서버

Proxy를 활용한 CORS 해결 방법

1. 서버에서 해결하는 방법

- 서드파티 미들웨어(cors) 설치하여 활용

2. 프론트엔드에서 해결하는 방법

- 남이 만든 프록시 서버 사용
  - 요청해야 하는 URL 앞에 프록시 서버 URL을 추가하여 요청
- 직접 프록시 서버 구축
- http-proxy-middleware 라이브러리 설치하여 활용(로컬 개발 환경 한정)
