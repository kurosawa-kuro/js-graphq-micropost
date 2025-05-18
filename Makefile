# =============================
# GraphQL Micropost Makefile
# =============================

# サーバ開発モード起動
dev:
	npm run dev

# 本番サーバ起動
start:
	npm start

# テスト実行
 test:
	npm test

# 依存パッケージインストール
setup:
	npm install

# node_modulesとキャッシュ削除
clean:
	rm -rf node_modules package-lock.json

# 再インストール（クリーンビルド）
reinstall: clean install

.PHONY: run start test install clean reinstall
