"use client";

import TemplateDeadLine from "./TemplateDeadLine";
import TemplateQuater from "./TemplateQuater";
import TemplateTargetNumber from "./TemplateTargetNumber";

interface ITemplateOptionProps {}

const TemplateOption = ({}: ITemplateOptionProps): JSX.Element => {
  return (
    <form className="flex flex-col w-[400px] space-y-n-lg">
      <TemplateDeadLine />
      <TemplateTargetNumber />
      <TemplateQuater />
    </form>
  );
};

export default TemplateOption;
