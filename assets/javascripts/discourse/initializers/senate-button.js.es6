import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "header-tooltip",
  initialize(container) {
    withPluginApi("0.8.31", (api) => {
      api.modifyClass("component:site-header", {
        didInsertElement() {
          this._super();
          this.addButtonWithTooltip();
        },

        willDestroyElement() {
          this._super();
          this.removeButtonWithTooltip();
        },

        addButtonWithTooltip() {
          const button = document.createElement("button");
          button.innerHTML = "Subscribe for Uniswap";
          button.className = "header-tooltip-button";
          button.style.position = "relative";

          const tooltip = document.createElement("div");
          tooltip.innerHTML = "This is a test tooltip";
          tooltip.className = "header-tooltip";
          tooltip.style.display = "none";
          tooltip.style.position = "absolute";
          tooltip.style.backgroundColor = "white";
          tooltip.style.border = "1px solid black";
          tooltip.style.padding = "5px";

          button.appendChild(tooltip);

          button.onclick = () => {
            const displayStyle = tooltip.style.display;
            tooltip.style.display = displayStyle === "none" ? "block" : "none";
          };

          const header = document.querySelector(".d-header .contents");
          header.appendChild(button);
        },

        removeButtonWithTooltip() {
          const button = document.querySelector(".header-tooltip-button");
          if (button) {
            button.remove();
          }
        },
      });
    });
  },
};
