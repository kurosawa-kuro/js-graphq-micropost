# js-graphq Hello World Example

This project demonstrates a minimal Express + Apollo Server (GraphQL) setup.

## 1. Project Setup

```bash
npm install
```

## 2. Start the Server

```bash
node src/app.js
```

## 3. Access GraphQL Playground

Open your browser and navigate to:

```
http://localhost:4000/graphql
```

## 4. Example Query

```
query {
  hello
}
```

## 5. Expected Response

```
{
  "data": {
    "hello": "Hello World!"
  }
}
```

---

// 日本語補足: このREADMEはセットアップから動作確認までを網羅しています。