import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "uniswap-discourse-plugin",
  initialize(container) {
    withPluginApi("0.8.9", (api) => {
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
          button.className = "header-senate-button";
          button.style.position = "absolute";
          button.style.right = "50px";
          button.style.top = "50%";
          button.style.transform = "translateY(-50%)";

          const tooltip = document.createElement("div");
          tooltip.innerHTML = "This is a test tooltip";
          tooltip.className = "senate-tooltip";
          tooltip.style.display = "none";
          tooltip.style.position = "absolute";
          tooltip.style.backgroundColor = "white";
          tooltip.style.border = "1px solid black";
          tooltip.style.padding = "5px";
          tooltip.style.right = "0";
          tooltip.style.top = "100%";

          button.appendChild(tooltip);

          button.onclick = () => {
            const displayStyle = tooltip.style.display;
            tooltip.style.display = displayStyle === "none" ? "block" : "none";
          };

          const header = document.querySelector(".d-header .contents");
          header.appendChild(button);
        },

        removeButtonWithTooltip() {
          const button = document.querySelector(".header-senate-button");
          if (button) {
            button.remove();
          }
        },
      });
    });
  },
};
