"use client";

import Image from "next/image";

const DashboardToolbar = (): JSX.Element => {
  const scrollTopOrBottom = (name: string) => {
    switch (name) {
      case "up":
        window.scrollTo(0, 0);
        break;
      case "down":
        window.scrollTo(0, document.body.scrollHeight);
        break;
    }
  };

  return (
    <div>
      <div className="fixed bottom-[48px] left-0 flex h-[49px] w-full min-w-[360px] justify-between bg-n-light-black px-n-md py-n-sm">
        <div className="flex items-center gap-n-sm">
          {["up", "down"].map((name, index) => (
            <button
              key={index}
              onClick={() => scrollTopOrBottom(name)}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[5px] bg-[#7f7f7f]"
            >
              <Image
                priority
                src={`/images/${name}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;
