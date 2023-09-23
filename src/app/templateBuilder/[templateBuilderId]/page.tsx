import { NextPage } from "next";
// import TemplateDescription from "@/components/templateBuilder/TemplateDescription";
// import FormWrapper from "@/components/templateBuilder/FormWrapper";
import TemplateOption from "@/components/templateBuilder/TemplateOption";
const TemplateBuilder: NextPage = () => {
  return (
    <div className="m-10">
      <TemplateOption />
      {/* <TemplateDescription /> */}
      {/* <FormWrapper /> */}
    </div>
  );
};

export default TemplateBuilder;
