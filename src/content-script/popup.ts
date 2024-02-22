import { IConfig } from "../interface/config";

document.addEventListener("DOMContentLoaded", function () {
  const inputHoverPreviewArray = document.getElementById(
    "hoverPreviewArrayCount"
  ) as HTMLInputElement;
  const inputHoverPreviewField = document.getElementById(
    "hoverPreviewFieldCount"
  ) as HTMLInputElement;
  const inputOpenAtDepth = document.getElementById(
    "openAtDepthCount"
  ) as HTMLInputElement;
  const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
  const msgElement = document.getElementById("msg") as HTMLElement;
  const bodyElement = document.body;

  saveButton.addEventListener("click", function () {
    try {
      const selectedTheme = document.querySelector(
        'input[name="theme"]:checked'
      ) as HTMLInputElement;
      const theme = selectedTheme?.value ?? "follow";

      const config: IConfig = {
        theme,
        hoverPreviewArrayCount:
          (inputHoverPreviewArray?.value as unknown as number) ?? 100,
        hoverPreviewFieldCount:
          (inputHoverPreviewField?.value as unknown as number) ?? 20,
        openAtDepthCount: (inputOpenAtDepth?.value as unknown as number) ?? 5,
      };

      chrome.storage.sync.set({ config }, function () {
        toggleTheme(theme);
        setMsg("success", "Success");
      });
    } catch (error) {
      setMsg("error", error as string);
    }
  });

  chrome.storage.sync.get("config", function (data) {
    const config: IConfig | undefined = data.config;
    if (config) {
      const {
        theme,
        hoverPreviewArrayCount,
        hoverPreviewFieldCount,
        openAtDepthCount,
      } = config;

      toggleTheme(theme);

      const selectedTheme = document.querySelector(
        `input[name="theme"][value="${theme}"]`
      ) as HTMLInputElement;
      if (selectedTheme) selectedTheme.checked = true;

      inputHoverPreviewArray.value =
        hoverPreviewArrayCount?.toString() ?? "100";
      inputHoverPreviewField.value = hoverPreviewFieldCount?.toString() ?? "20";
      inputOpenAtDepth.value = openAtDepthCount?.toString() ?? "5";
    } else {
      toggleTheme("follow");
      const selectedTheme = document.querySelector(
        `input[name="theme"][value="follow"]`
      ) as HTMLInputElement;
      if (selectedTheme) selectedTheme.checked = true;
    }
  });

  function setMsg(type: string, msg: string) {
    msgElement.classList.add(
      type === "success" ? "msg-success" : "msg-failure"
    );
    msgElement.innerHTML = msg;
    msgElement.style.display = "block";

    setTimeout(() => {
      msgElement.style.display = "none";
      msgElement.classList.remove("msg-success", "msg-failure");
      msgElement.innerHTML = "";
    }, 5000);
  }

  function toggleTheme(theme: string) {
    bodyElement.classList.toggle(
      "dark-theme",
      theme === "dark" ||
        (theme === "follow" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }
});
