# NestJS 시작하기 가이드

## 1. 프로젝트 기본 구조

NestJS 프로젝트는 다음과 같은 기본 구조를 가집니다:

```
src/
├── app.controller.ts     // HTTP 요청을 처리하는 기본 컨트롤러
├── app.service.ts        // 비즈니스 로직을 포함하는 서비스
├── app.module.ts         // 애플리케이션의 루트 모듈
└── main.ts              // 애플리케이션의 엔트리 포인트
```

## 2. 핵심 파일 설명

### main.ts - 애플리케이션 시작점

애플리케이션을 부트스트랩하는 엔트리 파일입니다:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### app.module.ts - 루트 모듈

애플리케이션의 루트 모듈을 정의합니다:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],                    // 다른 모듈 임포트
  controllers: [AppController],   // HTTP 요청 처리 컨트롤러
  providers: [AppService],        // 서비스 등 프로바이더
})
export class AppModule {}
```

### app.controller.ts - 컨트롤러

HTTP 요청을 처리하는 컨트롤러입니다:

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### app.service.ts - 서비스

비즈니스 로직을 포함하는 서비스입니다:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

## 3. 주요 개념 설명

### 데코레이터 패턴

NestJS는 데코레이터를 통해 메타데이터를 정의합니다:

- `@Module()`: 모듈 정의
- `@Controller()`: HTTP 컨트롤러 정의
- `@Injectable()`: 의존성 주입이 가능한 프로바이더 정의
- `@Get()`, `@Post()` 등: HTTP 메서드 매핑

### 의존성 주입 (DI)

생성자 기반 의존성 주입을 사용합니다:

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

### HTTP 플랫폼 선택

기본적으로 Express를 사용하지만, Fastify로 변경할 수 있습니다:

```typescript
// Fastify 사용 시 main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.listen(3000);
}
bootstrap();
```

## 4. 프로젝트 시작하기

### 새 프로젝트 생성

```bash
# Nest CLI 설치
npm i -g @nestjs/cli

# 새 프로젝트 생성
nest new project-name
```

### 개발 서버 실행

```bash
# 개발 모드 (파일 변경 감지)
npm run start:dev

# 프로덕션 모드
npm run start:prod

# SWC 빌더 사용 (빌드 속도 향상)
npm run start -- -b swc
```

### 코드 품질 관리

```bash
# ESLint로 코드 검사
npm run lint

# Prettier로 코드 포맷팅
npm run format
```

## 5. 아키텍처 특징

1. **모듈화**
   - 각 기능은 독립적인 모듈로 구성
   - 명확한 책임 분리와 코드 구조화 가능

2. **확장성**
   - 미들웨어, 파이프, 가드, 인터셉터 등 다양한 기능 제공
   - 커스텀 데코레이터를 통한 기능 확장 가능

3. **테스트 용이성**
   - Jest를 기본 테스트 프레임워크로 사용
   - 각 컴포넌트별 단위 테스트 작성 가능