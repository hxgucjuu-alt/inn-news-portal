# INN News Portal 記憶體與低效能裝置稽核

## 結論

本次靜態檢查未發現持續增長的事件監聽器、未清理的 interval 或常駐 requestAnimationFrame 迴圈。原有計時器均有 cleanup；搜尋與標籤頁的文章請求則補上 AbortController，頁面離開時會取消未完成的 fetch。

## 已修正的長生命週期資源

`NewsMapExplorer` 的 ResizeObserver 現在使用單一合併中的 requestAnimationFrame。連續 resize 事件不會各自堆積待執行 frame，卸載時也會取消尚未執行的 frame 並 disconnect observer。區域點擊後的延遲滾動 timeout 以 ref 保存，新的點擊會先清除舊 timeout，元件卸載時亦會清除。

搜尋頁與標籤頁的 `/api/articles` fetch 現在使用 AbortController；成功、失敗及 finally 回呼在 signal 已取消時都不再更新 state。

## 原本已具備清理的資源

`LiveClock` 與地圖首頁時間顯示的 interval 都有 `clearInterval`。語言變更事件有配對的 `removeEventListener`。FictionOpeningModal 的 Escape listener 與 OpeningAnimation 的 timeout 都有卸載 cleanup。標籤頁的定位 requestAnimationFrame 也已取消。

## 低效能裝置降級

手機寬度與 `prefers-reduced-motion: reduce` 下會關閉 ticker、新聞卡片、文章內容、狀態面板、標籤面板與導覽列的 backdrop-filter，縮小卡片陰影並限制 transition 只作用於色彩與邊框。文章卡片加入 `content-visibility: auto` 與 intrinsic size；不支援該 CSS 的瀏覽器會忽略規則，不影響基本版面。

## 建置驗證

`npm run test:bilingual` 通過全部雙語回歸案例。`npm run build` 成功完成，靜態輸出產生 500 個文章 HTML、共 512 個 HTML 頁面；首頁首次載入 JavaScript 為 99 kB，共用 chunk 為 87.4 kB。地圖測試頁維持獨立且未被移植到傳統首頁。

## 注意事項

本稽核為程式碼生命週期與正式建置驗證，並非完整 Chrome DevTools heap snapshot。實際長時間記憶體曲線仍會受到瀏覽器、裝置與使用者是否長時間操作地圖等因素影響；目前程式已移除已知的 observer/frame/fetch/timeout 累積路徑。
