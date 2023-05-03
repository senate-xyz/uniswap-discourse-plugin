import { withPluginApi } from "discourse/lib/plugin-api";
import { on } from "discourse-common/utils/decorators";

export default {
  name: "custom-tooltip-plugin",
  initialize(container) {
    withPluginApi("0.8.9", (api) => {
      api.reopenWidget("header-buttons:before", {
        buildKey() {
          return "custom-tooltip-button";
        },

        defaultState() {
          return { tooltipVisible: false };
        },

        html() {
          return this.attach("button", {
            icon: "info-circle",
            className: "tooltip-button",
            action: "toggleTooltip",
          });
        },

        toggleTooltip() {
          this.state.tooltipVisible = !this.state.tooltipVisible;
          this.scheduleRerender();
        },

        @on("didInsertElement")
        setupTooltip() {
          const tooltip = document.createElement("div");
          tooltip.innerHTML = "This is a custom tooltip";
          tooltip.className = "custom-tooltip";
          tooltip.style.display = "none";
          tooltip.style.position = "absolute";
          tooltip.style.backgroundColor = "white";
          tooltip.style.border = "1px solid black";
          tooltip.style.padding = "5px";
          tooltip.style.right = "0";
          tooltip.style.top = "100%";

          const button = document.querySelector(".tooltip-button");
          button.appendChild(tooltip);

          button.onclick = () => {
            tooltip.style.display =
              tooltip.style.display === "none" ? "block" : "none";
          };
        },

        actions: {
          toggleTooltip() {
            this.toggleTooltip();
          },
        },
      });

      api.addPopupMenuOptionsCallback(() => {
        return {
          id: "close-tooltip",
          action: () => {
            const tooltip = document.querySelector(".custom-tooltip");
            if (tooltip) {
              tooltip.style.display = "none";
            }
          },
        };
      });
    });
  },
};
