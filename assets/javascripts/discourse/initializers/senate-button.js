import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";
import { popupAjaxError } from "discourse/lib/ajax-error";

export default {
  name: "discourse-tooltip-button",

  initialize() {
    withPluginApi("0.8.20", (api) => {
      api.decorateWidget("header-icons:before", (helper) => {
        const state = helper.widget.state;
        const button = helper.h("button.tooltip-btn", "Tooltip Button");

        const tooltip = h(
          "div.tooltip-content",
          { style: { display: state.showTooltip ? "block" : "none" } },
          [h("p", "This is a test tooltip")]
        );

        return [button, tooltip];
      });

      api.attachWidgetAction("header-icons", "click", function (event) {
        const target = event.target;
        const tooltipBtn = this.$(".tooltip-btn")[0];

        if (target === tooltipBtn) {
          this.state.showTooltip = !this.state.showTooltip;
          this.scheduleRerender();
          event.stopPropagation();
        } else if (this.state.showTooltip) {
          this.state.showTooltip = false;
          this.scheduleRerender();
        }
      });

      api.addPopupMenuOptionsCallback(() => {
        if (this.state.showTooltip) {
          this.state.showTooltip = false;
          this.scheduleRerender();
        }
      });

      api.addGlobalClickListener((event) => {
        const target = event.target;
        const tooltipContent = this.$(".tooltip-content")[0];

        if (tooltipContent && !tooltipContent.contains(target)) {
          const headerIcons = api.container.lookup("widget:header-icons");
          if (headerIcons.state.showTooltip) {
            headerIcons.state.showTooltip = false;
            headerIcons.scheduleRerender();
          }
        }
      });
    });
  },
};
