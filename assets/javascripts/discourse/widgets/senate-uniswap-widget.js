import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

export default createWidget("senate-uniswap", {
  tagName: "div.senate-uniswap",

  defaultState() {
    return { tooltipVisible: false };
  },

  buildKey: () => "senate-uniswap",

  html(attrs, state) {
    let icon = iconNode("envelope");

    return h(
      "div.senate-uniswap-container",
      {
        style: {
          display: "flex",
          maxWidth: "1090px",
          margin: "0 auto",
          justifyContent: "end",
        },
      },
      [
        h(
          "button.senate-uniswap-btn",
          {
            onclick: () => this.toggleTooltip(),
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "32px",
              width: "256px",
              color: "#E9337A",
              background: "#FFE9F1",
              border: "1px solid #F2ACC7",
              borderRadius: "16px",
              cursor: "pointer",
              padding: "0.5em 1em",
              margin: "0.5em 0",
            },
          },
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "0.5em" } },
            [icon, `Setup Proposal Notifications`]
          )
        ),
        state.tooltipVisible
          ? h(
              "div.tooltip",
              {
                style: {
                  maxWidth: "350px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(233, 51, 122, 0.25) -0.34%, rgba(251, 198, 219, 0.25) 90.27%), #482731",
                  padding: "20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                },
              },
              [
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 10px",
                    },
                  },
                  "Subscribe to Uniswap Proposal Notifications"
                ),
                h(
                  "p",
                  {
                    style: {
                      fontWeight: "400",
                      fontSize: "16px",
                      margin: "0 0 10px",
                    },
                  },
                  "Get an email to be notified of off-chain and on-chain Uniswap proposals that you can vote on."
                ),
                h(
                  "div.input-row",
                  {
                    style: {
                      display: "flex-row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                  [
                    h("input", {
                      type: "email",
                      placeholder: "voter@uniswap.org",
                      style: {
                        height: "46px",
                        width: "60%",
                        background: "#D9D9D9",
                        border: "1px solid #000",
                      },
                    }),
                    h(
                      "button",
                      {
                        type: "button",
                        style: {
                          opacity: "33%",
                          height: "46px",
                          background: "#333333",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        },
                      },
                      "Subscribe"
                    ),
                  ]
                ),
              ]
            )
          : null,
      ]
    );
  },

  toggleTooltip() {
    this.state.tooltipVisible = !this.state.tooltipVisible;
    this.scheduleRerender();
  },
});
