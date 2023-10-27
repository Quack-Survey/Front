"use client";

import TemplateDeadLine from "./TemplateDeadLine";
import TemplateQuater from "./TemplateQuater";
import TemplateTargetNumber from "./TemplateTargetNumber";

interface ITemplateOptionProps {
  template: any;
  templateOption: any;
  forms: any;
  register: any;
  setValue: any;
  errors: any;
  resetField: any;
}

const TemplateOption = ({
  template,
  templateOption,
  forms,
  register,
  setValue,
  errors,
  resetField,
}: ITemplateOptionProps): JSX.Element => {
  const selectTypeForms = forms?.filter((form: any) => form?.type === "select");

  const existingIndex = selectTypeForms?.findIndex(
    (form: any) => form?._id === templateOption?.formId,
  );

  return (
    <div className="flex flex-col space-y-n-lg">
      <TemplateDeadLine deadline={template.deadline} register={register} />
      <TemplateTargetNumber
        targetNumber={template.targetNumber}
        register={register}
        errors={errors}
        resetField={resetField}
      />
      <TemplateQuater
        existingIndex={existingIndex}
        templateOption={templateOption}
        register={register}
        setValue={setValue}
        resetField={resetField}
        errors={errors}
        selectTypeForms={selectTypeForms}
      />
    </div>
  );
};

export default TemplateOption;
