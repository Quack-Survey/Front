import Image from "next/image";
import styles from '@/components/commonComponents.module.css'
import React, { useEffect, useState } from "react";

interface props {
  toastMsg: string;
  onClose: () => void;
};

export default function Toast ({ 
  toastMsg, 
  onClose 
}: props):JSX.Element {
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
    <div
      className={visible ? styles.toast : styles.toast_hid}
    >
      <Image 
        src="images/체크_검.svg" alt="" width={24} height={24}/>
      <span>
        {toastMsg}
      </span>
    </div>
  );
};
