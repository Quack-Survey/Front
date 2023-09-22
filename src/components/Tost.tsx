import React, { useEffect, useState } from "react";
import Image from "next/image";

interface IToastProps {
  toastText: string;
  onClose: () => void;
}

const Toast = ({ toastText, onClose }: IToastProps): JSX.Element => {
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
          ? "z-100 shadow-n-base fixed bottom-[65px] left-[16px] flex h-[43px] min-w-[150px] max-w-[200px] items-center gap-n-sm overflow-hidden bg-n-white p-n-md text-n-md transition-all"
          : "overflow-hiddenmin-w-[150px] z-100 shadow-n-base fixed bottom-[65px] left-[16px] flex h-[43px] max-w-[200px] items-center gap-n-sm bg-n-white p-n-md text-n-md opacity-0 transition-all"
      }
    >
      <Image src="images/check_black.svg" alt="" width={24} height={24} />
      <span>{toastText}</span>
    </div>
  );
};

export default Toast;
