import { useState, useEffect } from "react";
import Image from "next/image";
import ToggleButton from "../ToggleButton";

interface ITemplateQuaterProps {
  quater: any;
  isQuaterFormStateData: any;
  register: any;
  errors: any;
  resetField: any;
}

const TemplateQuater = ({
  quater,
  isQuaterFormStateData,
  register,
  errors,
  resetField,
}: ITemplateQuaterProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const errorMessage = errors?.quater?.filter(
    (error: any) => error !== undefined,
  );

  const handleToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 만약 quater데이터 값이 들어와있으면 토글버튼 on상태로.
    e.preventDefault();
    if (!isQuaterFormStateData) return;
    setToggle((prev) => !prev);

    resetField("quater", { quater: [] });
  };

  const validateNumbers = (value: string) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(value)) {
      return "숫자를 입력해주세요.";
    }
  };

  useEffect(() => {
    if (quater) {
      setToggle((prev) => !prev);
    }
  }, []);

  return (
    <div>
      <div className="mb-n-lg flex justify-between">
        <span className="items-center text-n-lg">쿼터비율 설정</span>
        <ToggleButton toggle={toggle} handleToggleButton={handleToggleButton} />
      </div>
      <span
        className={`h-[12px] text-n-xs ${
          errors?.sum?.message ? "text-n-red" : "text-black"
        }`}
      >
        {errors?.sum?.message}
      </span>
      <div className="border-x border-t border-n-gray bg-n-light-gray ">
        <p className="border-b border-n-gray py-[5px] text-center">
          {isQuaterFormStateData?.title}
        </p>
        {isQuaterFormStateData?.select.map((text: string, i: number) => {
          return (
            <div className="flex border-b border-n-gray" key={i}>
              <label
                className="w-[90%] border-r border-n-gray py-[5px] pl-n-sm"
                htmlFor={`select ${i}`}
              >
                {text}
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
                  {...register(`quater[${i}]`, {
                    validate: (value: string) =>
                      toggle ? validateNumbers(value) : undefined,
                  })}
                  defaultValue={toggle && quater ? quater[i] : ""}
                  maxLength={2}
                  id={`select ${i}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <span
        className={`h-[12px] text-n-xs ${
          errorMessage ? "text-n-red" : "text-black"
        }`}
      >
        {errorMessage ? errorMessage[0]?.message : ""}
      </span>
    </div>
  );
};

export default TemplateQuater;
