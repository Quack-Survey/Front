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
      <div className="flex justify-between items-center mb-n-md">
        <span className="text-n-lg">목표응답수</span>
        <ToggleButton toggle={toggle} handleToggleButton={handleToggleButton} />
      </div>
      <input
        className="outline-none border border-n-gray rounded-n-sm px-[5px] py-[4px] disabled:bg-n-light-gray"
        placeholder="내용을 입력해주세요."
        disabled={!toggle}
      />
    </div>
  );
};

export default TemplateTargetNumber;
