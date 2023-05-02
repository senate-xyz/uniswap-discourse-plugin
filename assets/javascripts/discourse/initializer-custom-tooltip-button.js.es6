import { withPluginApi } from "discourse/lib/plugin-api";

function initializeTooltipButton(api) {
  const tooltipText = "This is a tooltip!";

  api.onAppEvent("page:changed", () => {
    const button = document.querySelector(".tooltip-button");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const tooltip = document.createElement("span");
      tooltip.classList.add("tooltip");
      tooltip.innerHTML = tooltipText;

      button.parentElement.appendChild(tooltip);

      setTimeout(() => {
        tooltip.classList.add("show");
      }, 10);

      button.addEventListener("mouseout", () => {
        tooltip.classList.remove("show");

        setTimeout(() => {
          tooltip.parentElement.removeChild(tooltip);
        }, 500);
      });
    });
  });
}

export default {
  name: "custom-tooltip-button",
  initialize(container) {
    withPluginApi("0.8.31", initializeTooltipButton);
  },
};
