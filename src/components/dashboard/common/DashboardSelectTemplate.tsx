import { useGetTemplateLists } from "@/hooks/queries/useGetTemplateLists";
import { HTMLAttributes } from "react";
import SelectTemplateItem from "./DashboardSelectItem";

export interface IDashboardSelectTemplateProps
  extends HTMLAttributes<HTMLDivElement> {
  currentTemplateId: string | null;
  tempTemplateId: React.MutableRefObject<string | null>;
}

const DashboardSelectTemplate = ({
  currentTemplateId,
  tempTemplateId,
}: IDashboardSelectTemplateProps) => {
  tempTemplateId.current = currentTemplateId;
  const { data, isFetching } = useGetTemplateLists("/template");

  return (
    <div className="max-h-[130px] overflow-y-auto">
      <div className="flex flex-col gap-[5px]">
        {isFetching
          ? "Loading"
          : data.map((data) => (
              <SelectTemplateItem
                key={data._id}
                title={data.title}
                templateId={data._id}
                currentTemplateId={currentTemplateId}
                tempTemplateId={tempTemplateId}
              />
            ))}
      </div>
    </div>
  );
};

export default DashboardSelectTemplate;
