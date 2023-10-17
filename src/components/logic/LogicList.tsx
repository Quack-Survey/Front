import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ILogicListProps {
  form: any;
  logics: any;
  templateId: string | string[];
  index: number;
  logicsLoading: boolean;
}

const LogicList = ({
  form,
  logics,
  index,
  templateId,
  logicsLoading,
}: ILogicListProps): JSX.Element => {
  const [isLogic, setIsLogic] = useState(false);

  useEffect(() => {
    if (!logicsLoading) {
      const existingIndex = logics?.findIndex(
        (logic: any) => logic.formId === form._id,
      );
      if (existingIndex !== -1) {
        setIsLogic(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logicsLoading]);

  return (
    <Link
      href={`${templateId}/${form._id}/management`}
      className="flex cursor-pointer justify-between  border bg-white hover:bg-n-light-gray"
    >
      <div className="flex items-center">
        <span className="h-full w-[53px] text-center text-n-xl font-bold leading-[63px]">
          {index + 1}
        </span>
        <p>{form.title}</p>
      </div>
      <div className="mr-n-md self-center">
        <Image
          src={`/images/${isLogic ? "logic_green" : "dash_black"}.svg`}
          alt=""
          height={24}
          width={24}
          priority
        />
      </div>
    </Link>
  );
};

export default LogicList;
