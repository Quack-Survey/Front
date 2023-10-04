import Image from "next/image";
import ToolbarTypeCase from "../ToolbarTypingCase";

interface IFormContentSelectProps {
  select: string[];
  editMode: boolean;
  setAllFormData: any;
}

const FormContentSelect = ({
  select,
  editMode,
  setAllFormData,
}: IFormContentSelectProps): JSX.Element => {
  const addInputForm = () => {};

  return (
    <>
      <div className="w-full space-y-n-sm pb-n-md ">
        {[...select, ""]?.map((a, i) => {
          return (
            <div
              className="h-n-xlg flex w-[85%] items-center  rounded-n-sm bg-n-light-gray "
              key={i}
            >
              <Image
                className="cursor-pointer"
                src="/images/dragging.svg"
                width={20}
                height={24}
                alt=""
                priority
              />
              <div className="w-[90%]">
                <input
                  className="mx-n-sm w-full shrink-0 bg-inherit text-n-sm outline-none"
                  type="text"
                  placeholder="보기를 작성해주세요"
                  disabled={!editMode}
                  maxLength={18}
                />
              </div>
              <Image
                className="mx-n-sm cursor-pointer"
                src="/images/delete.svg"
                width={20}
                height={24}
                alt=""
                priority
              />
            </div>
          );
        })}
        <div
          className="h-n-xlg flex w-[85%] cursor-pointer items-center  justify-center rounded-n-sm bg-n-light-gray"
          onClick={addInputForm}
        >
          <Image
            src="/images/plus.svg"
            width={24}
            height={24}
            alt=""
            priority
          />
        </div>
      </div>
      {editMode ? <ToolbarTypeCase modeName="form" /> : null}
    </>
  );
};

export default FormContentSelect;
