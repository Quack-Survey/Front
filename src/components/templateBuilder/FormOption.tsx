import Image from "next/image";

interface IFormOptionProps {
  editMode: boolean;
}

const FormOption = ({ editMode }: IFormOptionProps): JSX.Element => {
  return (
    <div className="mr-n-sm w-n-xl space-y-n-lg self-center">
      {[1, 2].map((a, i) => (
        <Image
          key={i}
          src={editMode ? "/images/quater_b.svg" : "/images/logic_g.svg"}
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
