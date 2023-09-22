interface IFormTitleProps {}

const FormTitle = ({}: IFormTitleProps): JSX.Element => {
  const testValue = 50;

  return (
    <div className="flex w-full h-auto mb-n-md">
      <span
        className={`text-n-xl text-n-dark-gray ${"수정모드 일때 border보라색으로"}`}
      >
        {"1"}
      </span>
      <form>
        <textarea
          className={`text-black w-[300px] text-n-md ml-n-md  self-end pt-[5px] bg-white outline-none resize-none  ${
            testValue < 21 ? "disabled:h-[36px] " : "disabled:text-xs"
          }`}
          placeholder='"하루에 몇번 정도 배가 고프십니까?"'
          maxLength={60}
        />
      </form>
    </div>
  );
};

export default FormTitle;
