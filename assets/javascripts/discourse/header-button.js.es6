import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";
import { createWidget } from "discourse/widgets/widget";

createWidget("header-button-tooltip", {
  tagName: "div.header-button-tooltip",

  html(attrs) {
    return `<div class="tooltip-content">${attrs.content}</div>`;
  },

  clickOutside(e) {
    this.sendWidgetAction("toggleTooltip");
  },

  click(e) {
    e.preventDefault();
    e.stopPropagation();
  },
});
function initializeHeaderButton(api) {
  api.decorateWidget("header-icons:before", (helper) => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      return;
    }

    const showTooltip = helper.attrs.showTooltip;

    return [
      h(
        "a.header-button",
        {
          onclick: () => helper.widget.sendWidgetAction("toggleTooltip"),
          attributes: {
            title: "Custom Header Button",
            "aria-label": "Custom Header Button",
            "data-auto-route": true,
          },
        },
        [
          h("i.d-icon.d-icon-cog", {
            attributes: {
              "aria-hidden": "true",
            },
          }),
        ]
      ),
      showTooltip &&
        helper.attach("header-button-tooltip", {
          content: "This is a custom tooltip.",
        }),
    ];
  });

  api.createWidget("header-button", {
    tagName: "li.header-button",

    settings: {
      showTooltip: false,
    },

    toggleTooltip() {
      this.settings.showTooltip = !this.settings.showTooltip;
      this.scheduleRerender();
    },

    clickOutside() {
      if (this.settings.showTooltip) {
        this.toggleTooltip();
      }
    },
  });
}

export default {
  name: "uniswap-discourse-plugin",
  initialize: function () {
    withPluginApi("0.8.31", (api) => initializeHeaderButton(api));
  },
};
