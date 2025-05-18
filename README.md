# js-graphq Micropost Example

このプロジェクトは Express + Apollo Server (GraphQL) による「Micropost」サンプル実装です。

## 1. セットアップ

```bash
npm install
```

## 2. サーバ起動

```bash
npm run dev
```

## 3. GraphQL Playground

ブラウザで以下にアクセス:

```
http://localhost:4000/graphql
```

## 4. サンプルクエリ

**全マイクロポスト取得:**
```graphql
query {
  listMicroposts {
    id
    title
    author { name }
    categories { name }
  }
}
```

**マイクロポスト追加:**
```graphql
mutation {
  addMicropost(input:{
    title: "Mem-only GraphQL",
    body: "Works fine!",
    authorId: "u2",
    categoryIds: ["c1", "c2"]
  }) {
    id
    title
  }
}
```

## 5. レスポンス例

```json
{
  "data": {
    "listMicroposts": [
      {
        "id": "p1",
        "title": "Hello GraphQL",
        "author": { "name": "Alice" },
        "categories": [ { "name": "GraphQL" } ]
      }
    ]
  }
}
```

## 6. curl でのリクエスト例

GraphQLエンドポイントはPOSTリクエストで受け付けます。

### マイクロポスト一覧取得（listMicroposts クエリ）

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { listMicroposts { id title author { name } categories { name } } }"
  }'
```

### マイクロポスト追加（addMicropost ミューテーション）

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: MicropostInput!) { addMicropost(input: $input) { id title } }",
    "variables": {
      "input": {
        "title": "Mem-only GraphQL",
        "body": "Works fine!",
        "authorId": "u2",
        "categoryIds": ["c1", "c2"]
      }
    }
  }'
```

// 日本語補足: curlコマンドはREST API同様にGraphQLエンドポイントへ直接リクエストできます。JSONの"query"キーにGraphQLクエリ文字列を指定し、必要に応じて"variables"も渡します。