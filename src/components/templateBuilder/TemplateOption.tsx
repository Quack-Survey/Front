"use client";

import TemplateDeadLine from "./TemplateDeadLine";
import TemplateQuater from "./TemplateQuater";
import TemplateTargetNumber from "./TemplateTargetNumber";

interface ITemplateOptionProps {
  template: any;
  quater: any;
  formsStateData: any;
  register: any;
  errors: any;
  resetField: any;
}

const TemplateOption = ({
  template,
  quater,
  formsStateData,
  register,
  errors,
  resetField,
}: ITemplateOptionProps): JSX.Element => {
  // 만약 데이터가 있으면 toggle on

  const isQuaterFormsStateData = formsStateData.filter(
    (form: any) => form.isQuater === true,
  );

  return (
    <div className="flex flex-col space-y-n-lg">
      <TemplateDeadLine deadLine={template.deadLine} register={register} />
      <TemplateTargetNumber
        targetNumber={template.targetNumber}
        register={register}
        errors={errors}
        resetField={resetField}
      />
      <TemplateQuater
        quater={quater}
        register={register}
        resetField={resetField}
        errors={errors}
        isQuaterFormStateData={isQuaterFormsStateData[0]}
      />
    </div>
  );
};

export default TemplateOption;
