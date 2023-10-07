import { useEffect, useState } from "react";
import { create, read } from "@/constants/mode";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import InitialModeScreen from "../InitialModeScreen";
import FloatingFormButtonCollection from "@/components/FloatingFormButtonCollection";
import FormWrapper from "./FormWrapper";

interface ITemplateWrapperProps {
  templateBuilderId: string | string[];
  rawTemplateData?: any;
  isOpen: boolean;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  foldMode: boolean;
  onOption: () => void;
}

const TemplateWrapper = ({
  templateBuilderId,
  rawTemplateData,
  isOpen,
  onOption,
  modeName,
  foldMode,
  setModeName,
}: ITemplateWrapperProps): JSX.Element => {
  const { template, form, formContent, templateOption, logic } =
    rawTemplateData;
  const [templateStateData, setTemplateStateData] = useState({
    title: "",
    description: "",
  });
  const [allFormData, setAllFormData] = useState<any>([]);

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
        select: [""],
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
        select: [""],
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

  useEffect(() => {
    setTemplateStateData((prev) => {
      return {
        ...prev,
        title: template.title,
        description: template.description,
      };
    });
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[360px] bg-n-light-gray">
        <TemplateDescriptionWrapper
          templateBuilderId={templateBuilderId}
          templateStateData={templateStateData}
          modeName={modeName}
          setModeName={setModeName}
          setTemplateStateData={setTemplateStateData}
        />
        <div className="mb-[60px] space-y-n-md">
          {allFormData?.map((form: any, i: any) => (
            <FormWrapper
              key={i}
              index={i}
              form={form}
              foldMode={foldMode}
              setModeName={setModeName}
              setAllFormData={setAllFormData}
              modeName={modeName}
            />
          ))}
        </div>
      </div>
      {modeName === read ? (
        <FloatingFormButtonCollection
          modeName={read}
          onCreateSingle={onCreateSingle}
          onCreatePlural={onCreatePlural}
          onCreateDescription={onCreateDescription}
          isOpen={isOpen}
        />
      ) : null}
      <InputModal isOpen={isOpen} onCancel={onOption} submitText="저장">
        {isOpen ? <TemplateOption /> : <></>}
      </InputModal>
    </>
  );
};

export default TemplateWrapper;
