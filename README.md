# Tech Stroy Client

TODO

1. mdx-component.tsx 스타일 정의
2. rust prebuild category별 실행하도록 리팩토링
3. 포스팅 삭제 테스트

## 기본 텍스트 서식

```markdown
**굵은 글씨** → <strong>굵은 글씨</strong>
_기울임_ → <em>기울임</em>
~~취소선~~ → <del>취소선</del>
`인라인 코드` → <code>인라인 코드</code>
**_굵은 기울임_** → <strong><em>굵은 기울임</em></strong>
```

## 제목 (Headings)

```markdown
# H1 제목 → <h1>H1 제목</h1>

## H2 제목 → <h2>H2 제목</h2>

### H3 제목 → <h3>H3 제목</h3>

#### H4 제목 → <h4>H4 제목</h4>

##### H5 제목 → <h5>H5 제목</h5>

###### H6 제목 → <h6>H6 제목</h6>
```

## 목록 (Lists)

### 순서 없는 목록

```markdown
- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목
  - 또 다른 중첩 항목
- 세 번째 항목

* 별표로도 가능

- 플러스로도 가능
```

### 순서 있는 목록

```markdown
1. 첫 번째 항목
2. 두 번째 항목
   1. 중첩된 순서 목록
   2. 또 다른 중첩 항목
3. 세 번째 항목
```

### 체크리스트 (GFM)

```markdown
- [x] 완료된 작업
- [ ] 미완료 작업
- [x] 또 다른 완료 작업
```

## 링크와 이미지

### 링크

```markdown
[일반 링크](https://example.com)
[제목이 있는 링크](https://example.com "링크 제목")
[상대 경로 링크](./relative-path)
[참조 링크][1]

[1]: https://example.com

자동 링크: <https://example.com>
이메일: <email@example.com>
```

### 이미지

```markdown
![이미지 설명](image.jpg)
![제목이 있는 이미지](image.jpg "이미지 제목")
![상대 경로 이미지](./assets/image.jpg)

참조 이미지:
![참조 이미지][image-ref]

[image-ref]: ./image.jpg "이미지 설명"
```

## 코드

### 인라인 코드

```markdown
`const variable = 'value';`
`npm install package-name`
```

### 코드 블록

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

```typescript
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "John" };
```

```jsx
function Component() {
  return <div>Hello React</div>;
}
```

```css
.container {
  display: flex;
  justify-content: center;
}
```

```json
{
  "name": "project",
  "version": "1.0.0"
}
```

```bash
npm install
npm run dev
```
````

### 코드 하이라이팅

````markdown
```javascript {1,3-5}
const a = 1; // 하이라이트
const b = 2;
const c = 3; // 하이라이트
const d = 4; // 하이라이트
const e = 5; // 하이라이트
```
````

## 인용구 (Blockquotes)

> test

> 테스트

```markdown
> 단순한 인용구

> 여러 줄에 걸친
> 긴 인용구

> 중첩된 인용구
>
> > 더 깊은 중첩

> **마크다운**을 _포함한_ 인용구
>
> - 목록도 가능
> - 코드도 가능: `console.log('hello')`
```

## 테이블 (GFM)

```markdown
| 컬럼 1 | 컬럼 2 | 컬럼 3 |
| ------ | ------ | ------ |
| 값 1   | 값 2   | 값 3   |
| 값 4   | 값 5   | 값 6   |

| 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
| :-------- | :---------: | ----------: |
| 왼쪽      |   가운데    |      오른쪽 |
| 텍스트    |   텍스트    |      텍스트 |
```

## 수평선 (Horizontal Rules)

```markdown
---
---

---
```

## 이스케이프 문자

```markdown
\*굵게 되지 않음\*
\`코드가 아님\`
\[링크가 아님\](url)
\\백슬래시 표시
```

## MDX 고유 기능

### JSX 컴포넌트 임베딩

```jsx
import { CustomButton } from './components/Button';
import Image from 'next/image';

# 마크다운 제목

<CustomButton variant="primary">
  클릭하세요
</CustomButton>

<Image
  src="/image.jpg"
  alt="설명"
  width={500}
  height={300}
/>

<div className="custom-container">
  **마크다운**과 JSX를 *함께* 사용
</div>
```

### JavaScript 표현식

```jsx
export const name = 'World';
export const users = ['Alice', 'Bob', 'Charlie'];

# Hello {name}!

현재 시간: {new Date().toLocaleString()}

계산 결과: {2 + 3}

조건부 렌더링: {users.length > 0 ? '사용자가 있습니다' : '사용자가 없습니다'}

{users.map(user => (
  <div key={user}>- {user}</div>
))}
```

### export/import 구문

```jsx
import { useState } from 'react';
import CustomComponent from '../components/CustomComponent';

export const metadata = {
  title: '페이지 제목',
  description: '페이지 설명'
};

export function InteractiveExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}

# 인터랙티브 예제

<InteractiveExample />
```

### 컴포넌트를 마크다운 요소로 재정의

```jsx
import { CustomHeading } from './components/CustomHeading';

export const components = {
  h1: CustomHeading,
  p: ({ children }) => <p className="custom-paragraph">{children}</p>,
  code: ({ children }) => <code className="custom-code">{children}</code>
};

# 이 제목은 CustomHeading으로 렌더링됩니다

일반 문단도 커스텀 스타일이 적용됩니다.
```

## 고급 패턴

### 조건부 콘텐츠

```jsx
export const showAdvanced = true;

# 기본 내용

{showAdvanced && (
  <>
    ## 고급 내용

    고급 사용자를 위한 추가 정보입니다.
  </>
)}
```

### 반복 콘텐츠

```jsx
export const features = [
  { title: '빠른 성능', desc: '최적화된 렌더링' },
  { title: '간편한 사용', desc: '직관적인 API' },
  { title: '풍부한 기능', desc: '다양한 옵션 제공' }
];

# 주요 기능

{features.map((feature, index) => (
  <div key={index}>
    ## {feature.title}
    {feature.desc}
  </div>
))}
```

### MDX 내에서 Hooks 사용

```jsx
import { useEffect, useState } from 'react';

export function DynamicContent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return data ? <div>{JSON.stringify(data)}</div> : <div>로딩 중...</div>;
}

# 동적 콘텐츠

<DynamicContent />
```

## 특수 HTML 요소 (JSX 문법)

```jsx
<!-- 자체 닫는 태그 -->
<br />
<hr />
<img src="image.jpg" alt="설명" />

<!-- 속성명 변경 -->
<div className="container" htmlFor="input-id">
  <label htmlFor="email">이메일:</label>
  <input type="email" id="email" />
</div>

<!-- 스타일 객체 -->
<div style={{
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '10px'
}}>
  스타일이 적용된 요소
</div>

<!-- 이벤트 핸들러 -->
<button onClick={() => alert('클릭!')}>
  클릭하세요
</button>
```

## 주석

```jsx
{/* JSX 주석 */}
<!-- HTML 주석 (렌더링되지 않음) -->

{/*
  여러 줄
  JSX 주석
*/}
```

## 메타데이터 정의

```jsx
export const meta = {
  title: '문서 제목',
  date: '2024-03-20',
  author: '작성자',
  tags: ['react', 'mdx', 'documentation']
};

# {meta.title}

작성자: {meta.author} | 날짜: {meta.date}

태그: {meta.tags.join(', ')}
```

이 가이드를 README에서 참조하여 MDX 작성 시 필요한 문법을 빠르게 찾아 사용할 수 있습니다.
