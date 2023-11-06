interface IRespondentFormTitleProps {
  title: string;
  index: number;
}

const RespondentFormTitle = ({
  title,
  index,
}: IRespondentFormTitleProps): JSX.Element => {
  return (
    <div className="mx-2 mb-3 flex items-center">
      <span
        className={`mr-n-sm self-start text-n-xl ${
          false ? "text-n-light-blue" : "text-n-dark-gray"
        }`}
      >
        {index + 1}
      </span>
      <p>{title}</p>
    </div>
  );
};

export default RespondentFormTitle;
