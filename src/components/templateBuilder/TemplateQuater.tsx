import { useState } from "react";
import Image from "next/image";
import ToggleButton from "../ToggleButton";

interface ITemplateQuaterProps {}

const TemplateQuater = ({}: ITemplateQuaterProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const handleToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <div className="mb-n-lg flex justify-between">
        <span className="items-center text-n-lg">쿼터비율 설정</span>
        <ToggleButton toggle={toggle} handleToggleButton={handleToggleButton} />
      </div>
      <div className="border-x border-t border-n-gray bg-n-light-gray ">
        <p className="border-b border-n-gray py-[5px] text-center">
          {"하루에 몇번 배가 고프십니까?"}
        </p>
        {[1, 2, 3].map((a, i) => {
          return (
            <div className="flex border-b border-n-gray" key={i}>
              <label
                className="w-[90%] border-r border-n-gray py-[5px] pl-n-sm"
                htmlFor={`select ${i}`}
              >
                {a}
              </label>
              {!toggle ? (
                <div className="flex w-[10%] items-center justify-center bg-white">
                  <Image
                    src="/images/create_b.svg"
                    width={24}
                    height={16}
                    alt=""
                    priority
                  />
                </div>
              ) : (
                <input
                  className="w-[10%] text-center outline-none"
                  maxLength={2}
                  id={`select ${i}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateQuater;
