# NestJS Providers 가이드

## Provider 개요

Provider는 NestJS의 핵심 개념으로, 서비스, 레포지토리, 팩토리, 헬퍼 등 다양한 클래스가 Provider가 될 수 있습니다. Provider의 주요 특징은 의존성 주입(Dependency Injection)이 가능하다는 것입니다.

## 서비스 생성

### 기본 서비스 예제

```typescript
// cats.service.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

// interfaces/cat.interface.ts
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

### 서비스 사용 예제

```typescript
// cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

## 의존성 주입 (Dependency Injection)

### 1. 생성자 기반 주입

```typescript
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
}
```

### 2. 속성 기반 주입

```typescript
@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

> **주의**: 다른 클래스를 상속하지 않는 경우에는 항상 생성자 기반 주입을 사용하는 것이 좋습니다.

## 선택적 Provider

특정 의존성이 반드시 해결될 필요가 없는 경우 사용합니다:

```typescript
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

## Provider 등록

Provider를 사용하기 위해서는 모듈에 등록해야 합니다:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

## 프로젝트 구조

```
src/
├── cats/
│   ├── dto/
│   │   └── create-cat.dto.ts
│   ├── interfaces/
│   │   └── cat.interface.ts
│   ├── cats.controller.ts
│   └── cats.service.ts
├── app.module.ts
└── main.ts
```

## Scope (범위)

Provider의 생명주기는 기본적으로 애플리케이션 생명주기와 동기화됩니다:
- 애플리케이션 부트스트랩 시 Provider 인스턴스 생성
- 애플리케이션 종료 시 Provider 인스턴스 제거

## Custom Providers

NestJS는 다양한 방식의 Provider 정의를 지원합니다:

1. **값 제공자**
```typescript
@Module({
  providers: [
    {
      provide: 'CONFIG',
      useValue: process.env,
    },
  ],
})
```

2. **클래스 제공자**
```typescript
@Module({
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
```

3. **팩토리 제공자**
```typescript
@Module({
  providers: [
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        const connection = await createConnection();
        return connection;
      },
    },
  ],
})
```

## 수동 인스턴스화

특별한 경우에는 내장 DI 시스템을 벗어나 수동으로 Provider를 인스턴스화해야 할 수 있습니다:

1. Module reference 사용
2. 독립 실행형 애플리케이션에서의 Provider 사용
3. 부트스트랩 과정에서의 설정 서비스 활용

이러한 경우에는 ModuleRef나 standalone 애플리케이션 기능을 활용할 수 있습니다.