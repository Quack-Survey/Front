import React, { useEffect, useState } from "react";
import Image from "next/image";

interface IToastProps {
  tostText: string;
  onClose: () => void;
}

const Toast = ({ tostText, onClose }: IToastProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 3300);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={
        visible
          ? "fixed left-[16px] bottom-[65px] flex items-center gap-n-sm max-w-[200px] overflow-hidden min-w-[150px] h-[43px] bg-n-white z-100 transition-all shadow-n-base text-n-md p-n-md"
          : "fixed left-[16px] bottom-[65px] flex items-center gap-n-sm max-w-[200px] overflow-hiddenmin-w-[150px] h-[43px] bg-n-white z-100 transition-all shadow-n-base text-n-md p-n-md opacity-0"
      }
    >
      <Image src="images/체크_검.svg" alt="" width={24} height={24} />
      <span>{tostText}</span>
    </div>
  );
};

export default Toast;
