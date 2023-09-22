import Image from "next/image";

interface IFormOptionProps {}

const FormOption = ({}: IFormOptionProps): JSX.Element => {
  return (
    <div className="space-y-n-xlg w-n-xl mr-n-sm self-center">
      {[1, 2, 3].map((a, i) => (
        <Image
          key={i}
          className={`${"수정모드 일때 border보라색으로"}`}
          src={"/데이터에 따르는 이미지경로"}
          width={24}
          height={24}
          alt=""
          priority
        />
      ))}
    </div>
  );
};

export default FormOption;
