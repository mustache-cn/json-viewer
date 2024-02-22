// 同步读取配置
export function getStore<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, function (data) {
      const value: T | undefined = data[key];
      resolve(value);
    });
  });
}

// 同步写入配置
export function setStore<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve) => {
    const data: { [key: string]: T } = {};
    data[key] = value;
    chrome.storage.sync.set(data, function () {
      resolve();
    });
  });
}
