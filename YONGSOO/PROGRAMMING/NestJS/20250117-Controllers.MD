# NestJS Controllers 가이드

## 컨트롤러 개요

컨트롤러는 들어오는 요청을 처리하고 클라이언트에게 응답을 반환하는 역할을 합니다. 

## 기본 컨트롤러 생성

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

⭐ **핵심 특징**:
- `@Controller()` 데코레이터로 기본 컨트롤러 정의
- 선택적인 경로 접두사 지정 가능 (예: 'cats')
- HTTP 메서드 데코레이터 (@Get, @Post 등) 사용

## HTTP 요청 처리

### 1. 기본 라우팅

```typescript
@Controller('cats')
export class CatsController {
  @Get()         // GET /cats
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')    // GET /cats/:id
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()        // POST /cats
  create(): string {
    return 'This action adds a new cat';
  }
}
```

### 2. 요청 객체 접근

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

### 3. 사용 가능한 데코레이터들

- `@Request(), @Req()`: req 객체
- `@Response(), @Res()`: res 객체
- `@Body(key?)`: req.body / req.body[key]
- `@Query(key?)`: req.query / req.query[key]
- `@Param(key?)`: req.params / req.params[key]
- `@Headers(name?)`: req.headers / req.headers[name]

## 응답 처리

### 1. 표준 응답 (권장)

```typescript
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string[] {
    return ['cat1', 'cat2']; // 자동으로 JSON 변환
  }
}
```

### 2. 상태 코드 커스터마이즈

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

### 3. 헤더 설정

```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

## DTO (Data Transfer Object) 사용

```typescript
// create-cat.dto.ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

// cats.controller.ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

## 전체 CRUD 컨트롤러 예제

```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

## 모듈에 컨트롤러 등록

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

## Library-specific 접근 방식

Express의 Response 객체를 직접 사용하는 경우:

```typescript
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json([]);
  }
}
```

> **주의**: Library-specific 접근 방식을 사용할 때는 `passthrough: true` 옵션을 사용하여 Nest의 기본 기능들을 유지할 수 있습니다.

```typescript
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(HttpStatus.OK);
  return [];
}
```