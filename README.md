# 🤖 Discord DM 티켓 봇 (Giseok DM Support)

> DM으로 문의하면 자동으로 서버에 1:1 비공개 채널을 만들어 관리자가 답변할 수 있도록 해주는 디스코드 봇입니다.

---

## 📌 주요 기능

- 디스코드 봇에게 DM을 보내면 자동으로 문의 채널 생성  
- 유저와 관리자 간의 메시지 실시간 전달  
- 티켓은 카테고리 안에 비공개 채널로 생성  
- 슬래시 커맨드 `/문의종료` 로 문의 종료 처리  
- 유저가 다시 DM 보내면 기존 티켓에 이어서 대화됨  

---

## ⚙️ 사전 준비물

- Node.js (v16 이상 권장)  
- Discord 봇 토큰 ([개발자 포털](https://discord.com/developers/applications) 에서 발급)  
- 봇을 추가할 디스코드 서버의 관리자 권한  

---

## 📁 파일 구조

```
Discord-DM-Support/
├── index.js              # 봇 실행 파일
├── config.js             # 봇 설정 파일
├── commands/
│   └── 문의종료.js       # /문의종료 슬래시 커맨드
├── package.json
├── start.bat             # Windows 전용 봇 실행 스크립트
```

---

## 📥 설치 및 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/JEONG-GISEOK/Discord-DM-Support.git
cd Discord-DM-Support
```

### 2. 라이브러리 설치

```bash
npm install
```

설치되는 주요 패키지:
- `discord.js`
- `@discordjs/rest`
- `discord-api-types`
- `fs`, `path` 등 (내장 모듈)

---

## 🛠️ config.js 설정 예시

`config.js` 파일을 아래와 같이 수정:

```js
module.exports = {
    token: "여기에 디스코드 봇 토큰을 입력하세요!",
    serverID: "봇을 운영할 서버의 ID를 입력하세요!",
    categoryID: "문의 채널을 생성할 카테고리 ID를 입력하세요!",
    footer: "봇 임베드 하단에 표시될 서버 이름을 입력하세요!",
    ticketCloseMessage: `> **관리자에 의해 문의가 종료되었습니다!**

> **또다른 문의내용이 있다면 작성해주세요!**

> **감사합니다 열심히 하겠습니다.**`
};
```

> 💡 **서버/카테고리 ID 확인법**  
> 1. Discord 설정 → `고급` → `개발자 모드` 켜기  
> 2. 서버나 카테고리 우클릭 → `ID 복사`

---

## ▶️ 봇 실행 방법

### 방법 1. 터미널에서 실행

```bash
node index.js
```

### 방법 2. 윈도우 전용 start.bat 파일 실행

더블 클릭해서 실행하면 콘솔로 로그 확인 가능

---

## 🧪 사용 방법

- **유저**: 봇에게 DM 보내면 문의가 접수되고 티켓 채널이 자동 생성됨.  
- **관리자**: 생성된 채널에서 유저와 메시지를 주고받을 수 있음 (DM ↔ 채널).  
- **문의 종료**: 관리자가 `/문의종료` 슬래시 커맨드를 해당 채널에서 입력하면 티켓이 종료되고 채널이 삭제됨.

---

## 📄 라이선스

MIT License  
© 2025 [JEONG-GISEOK](https://github.com/JEONG-GISEOK)
