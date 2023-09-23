interface ITemplateDescriptionProps {
  title: string;
  description: string;
}

const TemplateDescription = ({ title, description }): JSX.Element => {
  return (
    <div className="bg-white w-[360px] h-full border-t-[16px] border-n-dark-gray rounded-t-n-lg">
      <form className="flex flex-col p-n-md space-y-n-sm ">
        <input
          className="outline-none text-n-lg"
          placeholder="제목을 작성 해주세요."
          maxLength={19}
        />
        <textarea
          className="outline-none resize-none text-n-sm bg-white"
          placeholder="해당 설문조사에 대한 설명을 작성 해주세요."
        />
      </form>
    </div>
  );
};

export default TemplateDescription;
