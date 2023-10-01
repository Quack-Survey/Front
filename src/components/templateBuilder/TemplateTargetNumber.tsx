import { useState } from "react";
import ToggleButton from "../ToggleButton";

interface ITemplateTargetNumberProps {}

const TemplateTargetNumber = ({}: ITemplateTargetNumberProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const handleToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-n-md flex items-center justify-between">
        <span className="text-n-lg">목표응답수</span>
        <ToggleButton toggle={toggle} handleToggleButton={handleToggleButton} />
      </div>
      <input
        className="rounded-n-sm border border-n-gray px-[5px] py-[4px] outline-none disabled:bg-n-light-gray"
        placeholder="내용을 입력해주세요."
        disabled={!toggle}
      />
    </div>
  );
};

export default TemplateTargetNumber;
