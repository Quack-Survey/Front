"use client";

import { useState } from "react";

interface ITemplateOptionProps {}

const TemplateOption = ({}: ITemplateOptionProps) => {
  const [toggle, setToggle] = useState({
    targetNumber: false,
    quater: false,
  });
  const today = new Date().toISOString().split("T")[0];

  const handleTargetNumberButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => {
      return { ...prev, targetNumber: !prev.targetNumber };
    });
  };

  const handleQuaterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => {
      return { ...prev, quater: !prev.quater };
    });
  };

  return (
    <form className="flex flex-col w-[400px] space-y-n-lg">
      <div className="flex justify-between items-center">
        <label className="text-n-lg" htmlFor="deadline">
          데드라인
        </label>
        <input
          className="border border-n-gray p-[2.5px] rounded-n-sm outline-none"
          id="deadline"
          type="date"
          min={today}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-n-md">
          <span className="text-n-lg">목표응답수</span>
          <button
            name="targetNumber"
            className={`flex  items-center border border-n-gray w-[3.5rem] h-[1.75rem] rounded-[20px] ease-linear duration-300 ${
              toggle.targetNumber === false ? "bg-white  " : "bg-n-blue "
            }`}
            onClick={handleTargetNumberButton}
          >
            <div
              className={`bg-white border border-n-gray rounded-full w-[1.75rem] h-[1.75rem] ease-linear duration-100 ${
                toggle.targetNumber === false
                  ? "translate-x-0"
                  : " translate-x-full"
              }`}
            ></div>
          </button>
        </div>
        <input
          className="outline-none border border-n-gray rounded-n-sm px-[5px] py-[4px]"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div>
        <div className="flex justify-between mb-n-lg">
          <span className="text-n-lg items-center">쿼터비율 설정</span>
          <button
            className={`flex  items-center border border-n-gray w-[3.5rem] h-[1.75rem] rounded-[20px] ease-linear duration-300 ${
              toggle.quater === false ? "bg-white  " : "bg-n-blue "
            }`}
            onClick={handleQuaterButton}
          >
            <div
              className={`bg-white border border-n-gray rounded-full w-[1.75rem] h-[1.75rem] ease-linear duration-100 ${
                toggle.quater === false ? "translate-x-0" : " translate-x-full"
              }`}
            ></div>
          </button>
        </div>
        <div className="border-x border-t border-n-gray bg-n-light-gray ">
          <p className="text-center border-b border-n-gray py-[5px]">
            {"하루에 몇번 배가 고프십니까?"}
          </p>
          {[1, 2, 3].map((a, i) => {
            return (
              <div className="flex border-b border-n-gray" key={i}>
                <label
                  className="w-[90%] py-[5px] border-r border-n-gray pl-n-sm"
                  htmlFor={`select ${i}`}
                >
                  {a}
                </label>
                <input
                  className="w-[10%] outline-none text-center"
                  maxLength={2}
                  id={`select ${i}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default TemplateOption;
