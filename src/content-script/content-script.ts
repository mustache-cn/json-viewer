import { beautifyJSON, isJson, JSONBeautifyOptions } from "../util/json";
import { isDarkMode } from "../util/common";
import { getStore } from "../util/store";
import { IConfig } from "../interface/config";

function isPureJsonPage(): boolean {
  // 1. contentType 检查
  if (
    document.contentType === "application/json" ||
    document.contentType === "text/json"
  ) {
    return true;
  }
  // 2. 只包含一个pre，且body无其他内容
  const preElements = document.querySelectorAll("body > pre");
  if (
    preElements.length === 1 &&
    document.body.childElementCount === 1 &&
    preElements[0].textContent &&
    isJson(preElements[0].textContent.trim())
  ) {
    return true;
  }
  // 3. URL 以 .json 结尾
  if (window.location.pathname.endsWith(".json")) {
    return true;
  }
  return false;
}

function formatJson() {
  if (!isPureJsonPage()) return;
  const preElements = document.querySelectorAll("pre");
  preElements.forEach(async (preElement) => {
    try {
      if (!preElement.textContent) return;

      const jsonText = preElement.textContent.trim();
      if (jsonText && isJson(jsonText)) {
        const json = JSON.parse(jsonText);

        const data = await getStore<IConfig>("config");
        const theme = getTheme(data?.theme);
        document.body.style.backgroundColor =
          theme === "dark" ? "#222" : "#fff";

        const options: JSONBeautifyOptions = {
          theme: theme,
          hoverPreviewArrayCount: data?.hoverPreviewArrayCount ?? 100,
          hoverPreviewFieldCount: data?.hoverPreviewFieldCount ?? 5,
          openAtDepthCount: data?.openAtDepthCount ?? 5,
        };
        const beautifiedJson = await beautifyJSON(json, options);
        preElement.innerHTML = "";
        preElement.appendChild(beautifiedJson);
      }
    } catch (error) {
      console.error("Error beautifying JSON:", error);
    }
  });
}

function getTheme(theme: string | undefined): string {
  if (theme === "light") {
    return "";
  } else if (theme === "follow" || theme === undefined) {
    return isDarkMode() ? "dark" : "";
  }
  return theme ?? "follow";
}

formatJson();
