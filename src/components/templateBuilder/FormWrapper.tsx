import FormTitle from "./FormTitle";
import FormOption from "./FormOption";
import FormContentSelect from "./FormContentSelect";
import FormContentText from "./FormContentText";

interface IFormWrapperProps {
  form: any;
}

const FormWrapper = ({ form }: IFormWrapperProps): JSX.Element => {
  const { type, plural, option } = form.formData;

  return (
    <form
      className={`h-full w-[360px] flex-col border-l-[8px] border-n-dark-gray bg-white ${
        plural ? "border-dotted" : ""
      } ${"수정모드 일때 border보라색으로"}`}
    >
      <div className="pb-n-xlg ml-n-sm pt-n-sm">
        <FormTitle />
        <div className={`flex ${"옵션 및 로직이 있으면" ? "" : "ml-n-xl"}`}>
          {"옵션 및 로직이 있으면" ? <FormOption /> : null}
          {type === "select" ? <FormContentSelect /> : <FormContentText />}
        </div>
      </div>
    </form>
  );
};

export default FormWrapper;
