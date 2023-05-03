import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";

export default {
  name: "uniswap-discourse-plugin",
  initialize(container) {
    withPluginApi("0.8.9", (api) => {
      api.modifyClass("component:site-header", {
        _appendButton() {
          const button = h("button.header-button", "Custom Button");
          button.onclick = () => {
            console.log("Header button clicked!");
          };

          const headerContents = this.element.querySelector(
            ".d-header .contents"
          );
          if (headerContents) {
            headerContents.appendChild(button);
          }
        },

        didInsertElement() {
          this._super();
          this._appendButton();
        },

        willDestroyElement() {
          this._super();
          const button = this.element.querySelector("button.header-button");
          if (button) {
            button.remove();
          }
        },
      });
    });
  },
};
