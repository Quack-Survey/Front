import { useState, useEffect } from "react";
import ToggleButton from "../ToggleButton";

interface ITemplateTargetNumberProps {
  register: any;
  errors: any;
  resetField: any;
  targetNumber: number;
}

const TemplateTargetNumber = ({
  register,
  errors,
  resetField,
  targetNumber,
}: ITemplateTargetNumberProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const handleToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => !prev);
    resetField("targetNumber");
  };

  const onlyNumbers = (value: string) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(value)) {
      return "숫자를 입력해주세요.";
    }
    return;
  };

  useEffect(() => {
    if (targetNumber !== 0) {
      setToggle((prev) => !prev);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-n-md flex items-center justify-between">
        <span className="text-n-lg">목표응답수</span>
        <ToggleButton toggle={toggle} handleToggleButton={handleToggleButton} />
      </div>
      <input
        className="mb-[4px] rounded-n-sm border border-n-gray px-[5px] py-[4px] text-center outline-none disabled:bg-n-light-gray"
        {...register("targetNumber", {
          validate: (value: string) =>
            toggle ? onlyNumbers(value) : undefined,
        })}
        placeholder="내용을 입력해주세요."
        defaultValue={toggle ? targetNumber : ""}
        maxLength={3}
        disabled={!toggle}
      />
      <span
        className={`h-[12px] text-n-xs ${
          errors?.targetNumber ? "text-n-red" : "text-black"
        }`}
      >
        {errors.targetNumber?.message}
      </span>
    </div>
  );
};

export default TemplateTargetNumber;
