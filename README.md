# chatbot

## 前端技術

react
react-query
tailwindcss

## AI 功能

openrouter API
https://openrouter.ai/

## 跨平台兼容性

RWD 設計 & UX 友善

## 功能

發送訊息、接收 AI 回覆

## 開發紀錄

### 5.27

參考 chatgpt 及 messenger 的介面，區分畫面板塊，建立需要的元件。

使用 radix-ui, react-icons 來處理 UI。

1. Hedaer
2. ChatWindow
3. Message
4. ChatInput

### 5.28

繼續前一天的任務，初步切版。

### 5.29

版面定案，管理訊息狀態，簡單測試輸入訊息。

### 5.30

串接 API
原本使用 openai，但因為額度問題，所以改為使用 openrouter，能找到免費的 model 使用。

支援自動滾動

### 5.31

處理 UX

1. loading 效果
2. 跳回當前對話的按鈕，當你滑到之前對話時，想要快速回到當前對話時可以按
3. 將訊息儲存到 localstorage

## 使用說明

請至 https://openrouter.ai/ 申請 API

並於該專案的根目錄建立存放 API key 的環境變數檔案

1. .env.development
2. .env.production

```
VITE_AI_KEY=YourAPIKey
```
