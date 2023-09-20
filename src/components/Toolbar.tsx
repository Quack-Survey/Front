import Image from "next/image";
import { IMAGE_TOOLBAR, FUNCTION_TOOLBAR } from "@/constants/tool";

const Toolbar = ({ modeName, toolCollection }: IToolbarProps): JSX.Element => {
  return (
    <div>
      {modeName === "type" ? (
        <div className="fixed bottom-[0px] flex justify-between min-w-[360px] w-full h-[49px] bg-n-light-black py-n-sm px-n-md">
          <div className="flex  items-center gap-n-sm">
            {IMAGE_TOOLBAR[modeName][0].map((image) => (
              <button
                key="modeName"
                className="flex justify-center items-center w-[34px] h-[34px] bg-[#7f7f7f] rounded-[5px]"
              >
                <Image
                  priority
                  src={`/images/${image}.svg`}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-n-sm">
            <div className="w-[1px] h-[30px] bg-n-dark-gray mr-n-sm"></div>
            <button className="flex justify-center items-center w-[34px] h-[34px] bg-n-blue rounded-[5px]">
              <Image
                priority
                src="/images/확정.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            <button className="flex justify-center items-center  w-[51px] h-[34px] bg-n-purple rounded-[5px]">
              <Image
                priority
                src="/images/엔터.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-[0px] flex items-center min-w-[360px] w-full h-[49px] bg-n-light-black p-n-md">
          {modeName === "initial" || modeName === "clicked" ? (
            <div>
              {IMAGE_TOOLBAR[modeName].map((image: string, index: number) => (
                <button
                  key={image}
                  onClick={toolCollection[FUNCTION_TOOLBAR[modeName][index]]}
                >
                  <Image
                    priority
                    src={`./images/${image}.svg`}
                    alt=""
                    width={24}
                    height={24}
                  ></Image>
                </button>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
