interface IFormTitleProps {
  order: number;
  title: string;
}

const FormTitle = ({ order, title }: IFormTitleProps): JSX.Element => {
  return (
    <div className="flex items-center w-full mb-n-md">
      <span className="text-n-xl text-n-dark-gray">{"1"}</span>
      <p className="text-black text-n-md ml-n-md">
        {"하루에 몇번 정도 배가 고프십니까?"}
      </p>
    </div>
  );
};

export default FormTitle;
