import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

export default createWidget("senate-uniswap", {
  tagName: "div.senate-uniswap",

  defaultState() {
    return { tooltipVisible: false, buttonEnabled: false, tooltipState: 0 };
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
        state.tooltipVisible && state.tooltipState == 0
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
                      display: "flex",
                      alignItems: "top",
                      justifyContent: "center",
                    },
                  },
                  [
                    h("input", {
                      type: "email",
                      placeholder: "voter@uniswap.org",
                      style: {
                        height: "44px",
                        width: "60%",
                        background: "#D9D9D9",
                        color: "#000000",
                        border: "1px solid #000",
                      },
                      oninput: (event) => {
                        state.buttonEnabled = event.target.value !== "";
                        this.scheduleRerender();
                      },
                    }),
                    h(
                      "button",
                      {
                        type: "button",
                        style: {
                          opacity: state.buttonEnabled ? "100%" : "33%",
                          height: "44px",
                          background: "#FFFFFF",
                          color: "#333333",
                          border: "1px solid #333333",
                          borderStyle: "solid solid solid none",
                          cursor: "pointer",
                        },
                        onclick: () => {
                          state.tooltipState = 1;
                          this.scheduleRerender();
                        },
                      },
                      "Subscribe"
                    ),
                  ]
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(115, 70, 85, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-230px",
                  },
                }),
              ]
            )
          : null,
        state.tooltipVisible && state.tooltipState == 1
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
                      fontSize: "87px",
                      margin: "0 0 10px",
                    },
                  },
                  "🙏"
                ),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 10px",
                    },
                  },
                  "Thank you!"
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
                  "Please click on the link we just sent to your email to confirm your subscription to Uniswap Proposals Notifications"
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(115, 70, 85, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-291px",
                  },
                }),
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
