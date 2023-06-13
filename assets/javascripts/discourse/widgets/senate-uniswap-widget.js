import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

export default createWidget("senate-uniswap", {
  tagName: "div.senate-uniswap",

  defaultState() {
    return {
      tooltipVisible: false,
      buttonEnabled: false,
      tooltipState: 0,
      email: "",
    };
  },

  buildKey: () => "senate-uniswap",

  async createUniswapUser(email) {
    try {
      const response = await fetch(`/senate-uniswap/create-senate-user`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const jsonData = await response.json();

      if (response.status == 200 && jsonData.senate.result == "success") {
        this.state.tooltipState = 1;
        this.scheduleRerender();
      } else if (
        response.status == 200 &&
        jsonData.senate.result == "existing"
      ) {
        this.state.tooltipState = 3;
        this.scheduleRerender();
      } else {
        this.state.tooltipState = 2;
        this.scheduleRerender();
      }
    } catch (error) {
      this.state.tooltipState = 2;
      this.scheduleRerender();
    }
  },

  html(attrs, state) {
    let icon = iconNode("envelope");

    return h(
      "div.senate-uniswap-container",
      {
        style: {
          display: "flex",
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
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(233, 51, 122, 0.25) -0.34%, rgba(251, 198, 219, 0.25) 90.27%), #482731",
                  padding: "6px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h("h3", {
                  style: {
                    width: "32px",
                    height: "32px",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='white' fill-opacity='0.2'/%3E%3Ccircle cx='16' cy='16' r='15.5' stroke='white' stroke-opacity='0.4'/%3E%3Cpath d='M22.2574 11.0502L20.8432 9.63599L15.8933 14.5858L10.9435 9.636L9.5293 11.0502L14.4791 16L9.52945 20.9497L10.9437 22.3639L15.8933 17.4142L20.843 22.3639L22.2572 20.9497L17.3075 16L22.2574 11.0502Z' fill='white' fill-opacity='0.8'/%3E%3C/svg%3E\")",
                  },
                  onclick: () => {
                    state.tooltipVisible = false;
                    state.tooltipState == 0;
                    this.scheduleRerender();
                  },
                }),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 25px",
                      padding: "0px 24px",
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
                      margin: "0 0 35px",
                      padding: "0px 24px",
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
                      padding: "0px 24px",
                      paddingBottom: "14px",
                    },
                  },
                  [
                    h("input", {
                      type: "email",
                      placeholder: "voter@uniswap.org",
                      style: {
                        height: "44px",
                        width: "100%",
                        background: "#D9D9D9",
                        color: "#000000",
                        border: "1px solid #000",
                      },
                      oninput: (event) => {
                        state.buttonEnabled = event.target.value !== "";
                        state.email = event.target.value;
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
                          this.createUniswapUser(state.email);
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
                    borderRight: "10px solid rgba(121, 74, 89, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-310px",
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
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(233, 51, 122, 0.25) -0.34%, rgba(251, 198, 219, 0.25) 90.27%), #482731",
                  padding: "6px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h("h3", {
                  style: {
                    width: "32px",
                    height: "32px",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='white' fill-opacity='0.2'/%3E%3Ccircle cx='16' cy='16' r='15.5' stroke='white' stroke-opacity='0.4'/%3E%3Cpath d='M22.2574 11.0502L20.8432 9.63599L15.8933 14.5858L10.9435 9.636L9.5293 11.0502L14.4791 16L9.52945 20.9497L10.9437 22.3639L15.8933 17.4142L20.843 22.3639L22.2572 20.9497L17.3075 16L22.2574 11.0502Z' fill='white' fill-opacity='0.8'/%3E%3C/svg%3E\")",
                  },
                  onclick: () => {
                    state.tooltipVisible = false;
                    state.tooltipState == 0;
                    this.scheduleRerender();
                  },
                }),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "87px",
                      margin: "0 0 25px",
                      padding: "0px 24px",
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
                      margin: "0 0 25px",
                      padding: "0px 24px",
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
                      margin: "0 0 25px",
                      padding: "0px 24px",
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
                    borderRight: "10px solid rgba(121, 74, 89, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-362px",
                  },
                }),
              ]
            )
          : null,
        state.tooltipVisible && state.tooltipState == 2
          ? h(
              "div.tooltip",
              {
                style: {
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(233, 51, 122, 0.25) -0.34%, rgba(251, 198, 219, 0.25) 90.27%), #482731",
                  padding: "6px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h("h3", {
                  style: {
                    width: "32px",
                    height: "32px",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='white' fill-opacity='0.2'/%3E%3Ccircle cx='16' cy='16' r='15.5' stroke='white' stroke-opacity='0.4'/%3E%3Cpath d='M22.2574 11.0502L20.8432 9.63599L15.8933 14.5858L10.9435 9.636L9.5293 11.0502L14.4791 16L9.52945 20.9497L10.9437 22.3639L15.8933 17.4142L20.843 22.3639L22.2572 20.9497L17.3075 16L22.2574 11.0502Z' fill='white' fill-opacity='0.8'/%3E%3C/svg%3E\")",
                  },
                  onclick: () => {
                    state.tooltipVisible = false;
                    state.tooltipState == 0;
                    this.scheduleRerender();
                  },
                }),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "87px",
                      margin: "0 0 25px",
                      padding: "0px 24px",
                    },
                  },
                  "😰"
                ),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 25px",
                      padding: "0px 24px",
                    },
                  },
                  "Oops"
                ),
                h(
                  "p",
                  {
                    style: {
                      fontWeight: "400",
                      fontSize: "16px",
                      margin: "0 0 25px",
                      padding: "0px 24px",
                    },
                  },
                  "Something went wrong and we couldn't create a new user for you. Please try again later."
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(121, 74, 89, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-340px",
                  },
                }),
              ]
            )
          : null,
        state.tooltipVisible && state.tooltipState == 3
          ? h(
              "div.tooltip",
              {
                style: {
                  maxWidth: "380px",
                  position: "absolute",
                  background:
                    "linear-gradient(53.9deg, rgba(233, 51, 122, 0.25) -0.34%, rgba(251, 198, 219, 0.25) 90.27%), #482731",
                  padding: "6px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: "55px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.33)",
                  zIndex: "10",
                  textAlign: "center",
                  display: "flex-row",
                  alignItems: "center",
                },
              },
              [
                h("h3", {
                  style: {
                    width: "32px",
                    height: "32px",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='white' fill-opacity='0.2'/%3E%3Ccircle cx='16' cy='16' r='15.5' stroke='white' stroke-opacity='0.4'/%3E%3Cpath d='M22.2574 11.0502L20.8432 9.63599L15.8933 14.5858L10.9435 9.636L9.5293 11.0502L14.4791 16L9.52945 20.9497L10.9437 22.3639L15.8933 17.4142L20.843 22.3639L22.2572 20.9497L17.3075 16L22.2574 11.0502Z' fill='white' fill-opacity='0.8'/%3E%3C/svg%3E\")",
                  },
                  onclick: () => {
                    state.tooltipVisible = false;
                    state.tooltipState == 0;
                    this.scheduleRerender();
                  },
                }),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "87px",
                      margin: "0 0 25px",
                    },
                  },
                  "✅"
                ),
                h(
                  "h3",
                  {
                    style: {
                      fontWeight: "700",
                      fontSize: "28px",
                      margin: "0 0 25px",
                    },
                  },
                  "All set!"
                ),
                h(
                  "p",
                  {
                    style: {
                      fontWeight: "400",
                      fontSize: "16px",
                      margin: "0 0 25px",
                    },
                  },
                  "You are already subscribed to Uniswap proposal notifications."
                ),
                h("div.tooltip-tail", {
                  style: {
                    width: "0",
                    height: "0",
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid rgba(121, 74, 89, 1)",
                    position: "absolute",
                    left: "50%",
                    transform: "rotate(90deg)",
                    marginTop: "-340px",
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
