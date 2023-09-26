import Link from "next/link";
import { HTMLAttributes } from "react";

interface ILinkInfoProps extends HTMLAttributes<HTMLSpanElement> {
  isLogin?: boolean;
}

const LinkInfo = ({ isLogin }: ILinkInfoProps) => {
  return (
    <div className="flex justify-end">
      <span className="text-sm text-n-dark-gray">
        {isLogin ? "아이디가 없으시다면?" : "아이디가 있으시다면?"}
        <Link
          className="ml-1.5 hover:text-n-light-black"
          href={isLogin ? "/signup" : "/login"}
        >
          {isLogin ? "회원가입" : "로그인"}
        </Link>
      </span>
    </div>
  );
};

export default LinkInfo;
