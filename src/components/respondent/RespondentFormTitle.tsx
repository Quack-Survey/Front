interface IRespondentFormTitleProps {
  title: string;
  index: number;
  isDisabled: (boolean | null)[];
}

const RespondentFormTitle = ({
  title,
  index,
  isDisabled,
}: IRespondentFormTitleProps): JSX.Element => {
  return (
    <div className="mx-2 mb-3 flex items-center">
      <span
        className={`mr-n-sm self-start text-n-xl ${
          isDisabled?.length !== 0 ? "text-n-dark-gray" : " text-n-light-blue"
        }`}
      >
        {index + 1}
      </span>
      <p>{title}</p>
    </div>
  );
};

export default RespondentFormTitle;
