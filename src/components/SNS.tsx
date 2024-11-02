import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import type { IconType } from "react-icons";
import React, { useEffect, useState } from "react";

interface SNSProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sns: "google" | "naver" | "kakao";
}

const SNS = ({ sns, ...props }: SNSProps) => {
  const [IconComponent, setIconComponent] = useState<IconType | null>(null);
  const [buttonClass, setButtonClass] = useState<string>("");

  useEffect(() => {
    // sns 타입에 따라 아이콘과 클래스 설정
    switch (sns) {
      case "google":
        setIconComponent(() => FcGoogle);
        setButtonClass("bg-[#f1f3f4] text-white text-2xl");
        break;
      case "naver":
        setIconComponent(() => SiNaver);
        setButtonClass("bg-[#03C75A] text-white text-bases");
        break;
      case "kakao":
        setIconComponent(() => RiKakaoTalkFill);
        setButtonClass("bg-[#FFEB00] text-[#5C3E15] text-2xl");
        break;
      default:
        throw new Error("Invalid Option!");
    }
  }, [sns]);

  return (
    <button
      className={`flex size-10 items-center justify-center rounded-full p-2 ${buttonClass}`}
      {...props}
    >
      {IconComponent && <IconComponent />}
    </button>
  );
};

export default SNS;
