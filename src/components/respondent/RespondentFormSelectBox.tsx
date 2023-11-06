interface IRespondentFormSelectBoxProps {
  text: string;
}

const RespondentFormSelectBox = ({
  text,
}: IRespondentFormSelectBoxProps): JSX.Element => {
  return (
    <div className="ml-8 mr-2">
      <div className="h-n-xlg flex w-[85%] items-center  rounded-n-sm bg-n-light-gray ">
        <div className="flex w-full">
          <label
            htmlFor=""
            className="mx-n-sm w-full shrink-0 bg-inherit py-[5px] text-n-sm outline-none"
          >
            {text}
          </label>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
};

export default RespondentFormSelectBox;
