import { useState } from "react";
import { create } from "@/constants/mode";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import InitialModeScreen from "../InitialModeScreen";
import FloatingFormButtonCollection from "@/components/FloatingFormButtonCollection";
import FormWrapper from "./FormWrapper";

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
  const [templateData, setTemplateData] = useState({
    title: "",
    description: "",
  });
  const [allFormData, setAllFormData] = useState<any>([]);

  const handleCreateTemplate = (e: React.MouseEvent<HTMLDivElement>) => {
    setCreateTemplate((prev) => !prev);
    setModeName(create);
  };

  const onCreateSingle = () => {
    const copyFormData = [...allFormData];
    copyFormData.push({
      formData: {
        title: "",
        type: "select",
        order: allFormData.length + 1,
        option: [],
        plural: false,
        bookMark: false,
      },
      formContentData: {
        text: "",
        select: [],
      },
    });
    setAllFormData(copyFormData);
  };

  const onCreatePlural = () => {
    const copyFormData = [...allFormData];
    copyFormData.push({
      formData: {
        title: "",
        type: "select",
        order: allFormData.length + 1,
        option: [],
        plural: true,
        bookMark: false,
      },
      formContentData: {
        text: "",
        select: [],
      },
    });
    setAllFormData(copyFormData);
  };

  const onCreateDescription = () => {
    const copyFormData = [...allFormData];
    copyFormData.push({
      formData: {
        title: "",
        type: "text",
        order: allFormData.length + 1,
        option: [],
        plural: false,
        bookMark: false,
      },
      formContentData: {
        text: "",
        select: [],
      },
    });
    setAllFormData(copyFormData);
  };

  return (
    <>
      {createTemplate ? (
        <>
          <div className="mx-auto min-h-[620px] max-w-[360px]">
            <TemplateDescriptionWrapper
              modeName={modeName}
              setModeName={setModeName}
              setTemplateData={setTemplateData}
            />
            <div className="space-y-n-md">
              {allFormData?.map((form: any, i: any) => (
                <FormWrapper
                  key={i}
                  form={form}
                  setModeName={setModeName}
                  setAllFormData={setAllFormData}
                  modeName={modeName}
                />
              ))}
            </div>
          </div>
          <FloatingFormButtonCollection
            onCreateSingle={onCreateSingle}
            onCreatePlural={onCreatePlural}
            onCreateDescription={onCreateDescription}
            isOpen={isOpen}
          />
          <InputModal isOpen={isOpen} onCancel={onOption} submitText="저장">
            {isOpen ? <TemplateOption /> : <></>}
          </InputModal>
        </>
      ) : (
        <InitialModeScreen
          createTemplate={handleCreateTemplate}
          innerText="폼을 생성해주세요."
        />
      )}
    </>
  );
};

export default TemplateWrapper;
