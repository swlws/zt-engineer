export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/login/index",
    "pages/agreement/index",
    "pages/repair/index",
    "pages/mine/index",
    "pages/ticket-detail/index",
    "pages/transfer/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#5c2222ff",
    navigationBarTitleText: "首页",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#1677ff",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "assets/logo.png",
        selectedIconPath: "assets/logo.png",
      },
      {
        pagePath: "pages/repair/index",
        text: "工单",
        iconPath: "assets/logo.png",
        selectedIconPath: "assets/logo.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "assets/logo.png",
        selectedIconPath: "assets/logo.png",
      },
    ],
  },
});
