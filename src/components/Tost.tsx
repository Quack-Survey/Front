import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/commonComponents.module.css";

interface IToastProps {
  toastMsg: string;
  onClose: () => void;
}

const Toast = ({ toastMsg, onClose }: IToastProps): JSX.Element => {
  const [visible, setVisible] = useState(true);

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
    <div className={visible ? styles.toast : styles.toast_hid}>
      <Image src="images/체크_검.svg" alt="" width={24} height={24} />
      <span>{toastMsg}</span>
    </div>
  );
};

export default Toast;
