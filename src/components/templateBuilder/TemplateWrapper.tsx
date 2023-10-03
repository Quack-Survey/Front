import { useState } from "react";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import InitialModeScreen from "../InitialModeScreen";

interface ITemplateWrapperProps {
  isOpen: boolean;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  onOption: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const TemplateWrapper = ({
  isOpen,
  onOption,
  modeName,
  setModeName,
}: ITemplateWrapperProps): JSX.Element => {
  const [createTemplate, setCreateTemplate] = useState(false);

  const handleCreateTemplate = (e: React.MouseEvent<HTMLDivElement>) => {
    setCreateTemplate((prev) => !prev);
    setModeName("create");
  };

  return (
    <>
      {false || createTemplate ? (
        <div className="mx-auto min-h-[620px] max-w-[360px]">
          <TemplateDescriptionWrapper setModeName={setModeName} />
        </div>
      ) : (
        <InitialModeScreen
          createTemplate={handleCreateTemplate}
          innerText="폼을 생성해주세요."
        />
      )}
      <InputModal isOpen={isOpen} onCancel={onOption} submitText="저장">
        {isOpen ? <TemplateOption /> : <></>}
      </InputModal>
    </>
  );
};

export default TemplateWrapper;
