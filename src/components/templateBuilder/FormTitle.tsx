interface IFormTitleProps {}

const FormTitle = ({}: IFormTitleProps): JSX.Element => {
  const testValue = 50;

  return (
    <div className="mb-n-md flex h-auto w-full">
      <span
        className={`text-n-xl text-n-dark-gray ${"수정모드 일때 border보라색으로"}`}
      >
        {"1"}
      </span>
      <textarea
        className={`ml-n-md w-[300px] resize-none self-end  bg-white pt-[5px] text-n-md text-black outline-none ${
          testValue < 21 ? "disabled:h-[36px] " : "disabled:text-xs"
        }`}
        placeholder='"하루에 몇번 정도 배가 고프십니까?"'
        maxLength={60}
      />
    </div>
  );
};

export default FormTitle;
