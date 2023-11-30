import { HTMLAttributes } from "react";
import { IDashboardSelectTemplateProps } from "./DashboardSelectTemplate";

interface ISelectTemplateItemProps extends HTMLAttributes<HTMLLabelElement> {
  title: string;
  templateId: string;
  currentTemplateId: IDashboardSelectTemplateProps["currentTemplateId"];
  tempTemplateId: IDashboardSelectTemplateProps["tempTemplateId"];
}

const SelectTemplateItem = ({
  title,
  templateId,
  currentTemplateId,
  tempTemplateId,
  ...props
}: ISelectTemplateItemProps) => {
  return (
    <label className="mr-[20px] flex gap-2" {...props}>
      <input
        name="SelectTemplate"
        type="radio"
        onClick={() => {
          tempTemplateId.current = templateId;
        }}
        defaultChecked={templateId === currentTemplateId}
      />
      <span className="text-n-light-black">{title}</span>
    </label>
  );
};

export default SelectTemplateItem;
