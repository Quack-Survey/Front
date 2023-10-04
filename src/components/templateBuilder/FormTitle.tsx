interface IFormTitleProps {
  order: number;
  editMode: boolean;
}

const FormTitle = ({ order, editMode }: IFormTitleProps): JSX.Element => {
  const testValue = 50;

  return (
    <div className="mb-n-md flex h-auto w-full">
      <span
        className={`text-n-xl  ${
          editMode ? "text-n-light-blue" : "text-n-dark-gray"
        }`}
      >
        {order}
      </span>
      <textarea
        className={`ml-n-md w-[300px] resize-none self-end  bg-white pt-[5px] text-n-md text-black outline-none ${
          testValue < 21 ? "disabled:h-[36px] " : "disabled:text-xs"
        }`}
        placeholder="제목을 작성해주세요."
        disabled={!editMode}
        maxLength={60}
      />
    </div>
  );
};

export default FormTitle;
