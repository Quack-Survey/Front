interface IFormContentTextProps {}

const FormContentText = ({}: IFormContentTextProps): JSX.Element => {
  return (
    <div className="w-full">
      <textarea
        className="w-[90%] resize-none bg-white outline-none"
        placeholder="답변을 작성해주세요."
      />
    </div>
  );
};

export default FormContentText;
