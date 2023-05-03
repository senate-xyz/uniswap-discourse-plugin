import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

function createTooltipButton(helper) {
  let icon = iconNode("envelope");
  let isVisible = false;

  return helper.h("div", {}, [
    helper.h(
      "button.tooltip-btn",
      {
        onclick: () => {
          isVisible = !isVisible;
        },
        style: {
          height: "32px",
          width: "256px",
          color: "#E9337A",
          background: "#FFE9F1",
          border: "1px solid #F2ACC7",
          borderRadius: "16px",
          cursor: "pointer",
          padding: "0.5em 1em",
        },
      },
      helper.h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "0.5em" } },
        [icon, "Setup Proposal Notifications"]
      )
    ),
    helper.h(
      "div.tooltip-content",
      { style: { display: isVisible ? "block" : "none" } },
      [h("p", "This is a test tooltip")]
    ),
  ]);

  function render() {
    const container = document.querySelector(".tooltip-btn-container");
    if (container) {
      helper.mount(container, createTooltipButton(helper));
    }
  }
}

export default {
  name: "discourse-tooltip-button",

  initialize() {
    withPluginApi("0.8.20", (api) => {
      api.decorateWidget("header-buttons:before", (helper) => {
        if (api.getCurrentUser()) {
          return helper.h("div.tooltip-btn-container", [
            createTooltipButton(helper),
          ]);
        }
      });
    });
  },
};
