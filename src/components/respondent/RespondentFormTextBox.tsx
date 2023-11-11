interface IRespondentFormTextBoxProps {
  formIndex: number;
  register: any;
}

const RespondentFormTextBox = ({
  formIndex,
  register,
}: IRespondentFormTextBoxProps): JSX.Element => {
  return (
    <>
      <textarea
        className="ml-8 mr-2 h-[240px] w-[300px] resize-none rounded-md border border-n-blue p-2 text-n-sm"
        placeholder="답변을 입력해주세요."
        {...register(`form${formIndex + 1}`)}
        maxLength={300}
      />
    </>
  );
};

export default RespondentFormTextBox;
