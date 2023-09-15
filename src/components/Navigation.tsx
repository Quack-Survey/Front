"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/commonComponents.module.css";

const Navigation = (): JSX.Element => {
  const [route, setRoute] = useState(2);

  return (
    <nav>
      <div className={styles.nav}>
        <div className="flex w-[360px] h-[48px] m-auto">
          <Link
            href="#"
            onClick={() => {
              setRoute(1);
            }}
            className={route === 1 ? styles.nav_icon_on : styles.nav_icon_off}
          >
            <Image src="images/대쉬보드.svg" alt="" width={24} height={24} />
          </Link>
          <Link
            href="#"
            onClick={() => {
              setRoute(2);
            }}
            className={route === 2 ? styles.nav_icon_on : styles.nav_icon_off}
          >
            <Image src="images/홈.svg" alt="" width={24} height={24} />
          </Link>
          <Link
            href="#"
            onClick={() => {
              setRoute(3);
            }}
            className={route === 3 ? styles.nav_icon_on : styles.nav_icon_off}
          >
            <Image src="images/마이페이지.svg" alt="" width={24} height={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
