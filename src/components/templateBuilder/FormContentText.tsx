import { FieldValues, UseFormRegister } from "react-hook-form";
import ToolbarTypeCase from "../ToolbarTypingCase";

interface IFormContentTextProps {
  editMode: boolean;
  register: UseFormRegister<FieldValues>;
}

const FormContentText = ({
  editMode,
  register,
}: IFormContentTextProps): JSX.Element => {
  return (
    <>
      <div className="w-full">
        <textarea
          className="w-[90%] resize-none bg-white outline-none"
          placeholder="답변을 작성해주세요."
          {...register("text", {
            required: "답변을 작성해주세요.",
          })}
          disabled={!editMode}
        />
      </div>
      {editMode ? <ToolbarTypeCase modeName="text" /> : null}
    </>
  );
};

export default FormContentText;
