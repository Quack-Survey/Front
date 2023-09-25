interface IFormContentTextProps {}

const FormContentText = ({}: IFormContentTextProps): JSX.Element => {
  return (
    <form className="w-full">
      <textarea
        className="w-[90%] bg-white resize-none outline-none"
        placeholder="답변을 작성해주세요."
      />
    </form>
  );
};

export default FormContentText;
