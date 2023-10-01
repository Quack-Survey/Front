import { useState } from "react";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import FloatingFormButtonCollection from "../FloatingFormButtonCollection";
import InitialModeScreen from "../InitialModeScreen";

interface ITemplateWrapperProps {
  isOpen: boolean;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  onOption: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const TemplateWrapper = ({
  isOpen,
  onOption,
  mode,
  setMode,
}: ITemplateWrapperProps): JSX.Element => {
  const [createTemplate, setCreateTemplate] = useState(false);

  const handleCreateTemplate = (e: React.MouseEvent<HTMLDivElement>) => {
    setCreateTemplate((prev) => !prev);
  };

  return (
    <>
      {false || createTemplate ? (
        <div className="mx-auto min-h-[620px] max-w-[360px]">
          <TemplateDescriptionWrapper mode={mode} setMode={setMode} />
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

{
  /* <div className="mx-auto min-h-[620px] max-w-[360px]"></div> */
}
