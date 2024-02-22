import JSONFormatter from "@mustache-cn/json-formatter-js";

export interface JSONBeautifyOptions {
  theme: string;
  hoverPreviewArrayCount: number;
  hoverPreviewFieldCount: number;
  openAtDepthCount: number;
}

export function beautifyJSON(json: string, options: JSONBeautifyOptions) {
  const {
    theme = "follow",
    hoverPreviewArrayCount = -1,
    hoverPreviewFieldCount = 5,
  } = options;

  const config = {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount,
    hoverPreviewFieldCount,
    theme,
    animateOpen: true,
    animateClose: true,
    useToJSON: true,
  };

  const formatter = new JSONFormatter(json, 2, config);
  formatter.openAtDepth(options.openAtDepthCount);
  return formatter.render();
}

export function isJson(data: string): boolean {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}
