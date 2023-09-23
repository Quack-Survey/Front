import { NextPage } from "next";
import TemplateDescription from "@/components/templateBuilder/TemplateDescription";
import FormWrapper from "@/components/templateBuilder/FormWrapper";

const TemplateBuilder: NextPage = () => {
  return (
    <div className="m-10">
      <TemplateDescription />
      <FormWrapper />
    </div>
  );
};

export default TemplateBuilder;
