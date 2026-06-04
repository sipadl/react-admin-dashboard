.PHONY: help install dev build deploy clean

help:
	@echo "📊 React Admin Dashboard - Available Commands"
	@echo ""
	@echo "  make install        - Install dependencies"
	@echo "  make dev            - Start dev server"
	@echo "  make build          - Build for production"
	@echo "  make deploy         - Deploy to GitHub Pages"
	@echo "  make clean          - Clean build artifacts"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

deploy: build
	npm run deploy

clean:
	rm -rf dist/ node_modules/ .vite/
