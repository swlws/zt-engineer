export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/login/index",
    "pages/agreement/index",
    "pages/home/index",
    "pages/mine/index",
    "pages/ticket-detail/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
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
        pagePath: "pages/index/index",
        text: "设备",
        iconPath: "assets/logo.png",
        selectedIconPath: "assets/logo.png",
      },
      {
        pagePath: "pages/agreement/index",
        text: "报修",
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
