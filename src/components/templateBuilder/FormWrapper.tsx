import Image from "next/image";
import FormContentInput from "./FormContentInput";
import FormTitle from "./FormTitle";
import FormOption from "./FormOption";

interface IFormWrapperProps {}

const FormWrapper = ({}: IFormWrapperProps): JSX.Element => {
  return (
    <>
      <div
        className={`flex-col bg-white w-[360px] h-full border-l-[8px] border-n-dark-gray ${"복수형 응답이면 border을 dotted"} ${"수정모드 일때 border보라색으로"}`}
      >
        <div className="ml-n-sm pt-n-sm pb-n-xlg">
          <FormTitle />
          <div className="flex">
            <FormOption />
            <FormContentInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormWrapper;
