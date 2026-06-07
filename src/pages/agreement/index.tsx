import { View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";

import "./index.scss";

interface AgreementSection {
  title: string;
  desc: string;
}

interface AgreementContent {
  title: string;
  updatedAt: string;
  sections: AgreementSection[];
}

const AGREEMENT_CONTENT: Record<"privacy" | "user", AgreementContent> = {
  privacy: {
    title: "隐私政策",
    updatedAt: "更新日期：2026-06-07",
    sections: [
      {
        title: "信息收集说明",
        desc: "为完成登录、工单提交和个人资料展示，我们会在获得你授权后收集手机号、头像和昵称等必要信息。",
      },
      {
        title: "信息使用范围",
        desc: "收集的信息仅用于账号识别、服务通知、报修进度同步和安全风控，不会超出约定范围另作他用。",
      },
      {
        title: "信息保护措施",
        desc: "我们会采用访问控制和传输加密等措施保护你的个人信息，并持续优化安全策略。",
      },
    ],
  },
  user: {
    title: "用户协议",
    updatedAt: "更新日期：2026-06-07",
    sections: [
      {
        title: "服务内容",
        desc: "智庭科技为用户提供登录认证、自助报修、进度查询和基础个人中心等服务能力。",
      },
      {
        title: "使用规范",
        desc: "你需要确保提交的信息真实、完整，不得通过本服务从事违法违规活动或干扰平台正常运行。",
      },
      {
        title: "责任说明",
        desc: "因网络、不可抗力或第三方平台限制导致的服务波动，我们会尽力修复，但不承诺绝对无中断。",
      },
    ],
  },
};

export default function AgreementPage() {
  const router = useRouter();
  const type = router.params.type === "privacy" ? "privacy" : "user";
  const content = AGREEMENT_CONTENT[type];

  Taro.setNavigationBarTitle({
    title: content.title,
  });

  return (
    <View className="agreement">
      <View className="agreement__card">
        <View className="agreement__title">{content.title}</View>
        <View className="agreement__updatedAt">{content.updatedAt}</View>
        {content.sections.map((section) => (
          <View className="agreement__section" key={section.title}>
            <View className="agreement__sectionTitle">{section.title}</View>
            <View className="agreement__sectionDesc">{section.desc}</View>
          </View>
        ))}
      </View>
    </View>
  );
}
