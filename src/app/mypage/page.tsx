"use client";

import useModal from "@/hooks/useModal";
import { handleLogout } from "@/utils/users";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Mypage = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>("");
  const router = useRouter();
  const { ModalContainer, openModal } = useModal(() => handleLogout(router));

  useEffect(() => {
    const userEmail = getCookie("email");
    setUserEmail(userEmail);
  }, []);

  return (
    <div className="m-auto max-w-[768px] px-[20px] py-[10px]">
      <div className="border-b border-n-gray px-[5px] py-[10px]">
        <p className="mb-[5px] text-n-lg">계정</p>
        <p className="text-n-sm text-n-blue">{userEmail}</p>
      </div>
      <div className="border-b border-n-gray px-[5px] py-[10px]">
        <button className="text-n-lg" onClick={openModal}>
          로그아웃
        </button>
      </div>
      <ModalContainer>
        <p className="text-center">로그아웃 하시겠습니까?</p>
      </ModalContainer>
    </div>
  );
};

export default Mypage;
