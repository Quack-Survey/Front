interface IResponseTitle {
  title: string;
  description: string;
}

const ResponseTitle = ({ title, description }: IResponseTitle) => {
  return (
    <div className="relative mb-3 rounded-t border-t-[12px] border-n-dark-gray bg-n-white p-3">
      <h1 className="mb-3 text-n-xl">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ResponseTitle;
