import { create, update } from "@/constants/mode";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ToolbarTypeCase from "../ToolbarTypingCase";

interface ITemplateDescriptionProps {
  title?: string;
  description?: string;
  mode: string;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  onValid: SubmitHandler<FieldValues>;
}

const TemplateDescription = ({
  title,
  description,
  handleSubmit,
  onValid,
  register,
  mode,
}: ITemplateDescriptionProps): JSX.Element => {
  return (
    <div className="mb-n-lg mt-[60px] h-full w-[360px] rounded-t-n-md border-t-[16px] border-n-dark-gray bg-white">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-n-sm p-n-md "
      >
        <input
          className="bg-white text-n-lg outline-none"
          placeholder="제목을 작성해주세요."
          value={title !== "" ? title : null!}
          disabled={mode === (create || update) ? false : true}
          maxLength={19}
          {...register("title", {
            required: "제목을 작성해주세요.",
          })}
        />
        <textarea
          className={`resize-none bg-white text-n-sm outline-none `}
          placeholder="해당 설문조사에 대한 설명을 작성해주세요."
          value={description !== "" ? description : null!}
          disabled={mode === (create || update) ? false : true}
          {...register("description", {
            required: "설명란을 작성해주세요.",
          })}
          maxLength={200}
        />
        {mode === create || mode === update ? <ToolbarTypeCase /> : null}
      </form>
    </div>
  );
};

export default TemplateDescription;
