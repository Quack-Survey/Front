"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

interface IFormContentInputProps {
  type: string;
}

const FormContentInput = ({ type }: IFormContentInputProps): JSX.Element => {
  const { register } = useForm();

  return (
    <div className="space-y-n-sm w-full ">
      {[1, 2, 4, 5].map((a, i) => {
        return (
          <div
            className="flex w-[85%] bg-n-light-gray rounded-n-sm  h-n-xlg items-center "
            key={i}
          >
            <Image
              className="cursor-pointer"
              src="/images/dragging.svg"
              width={20}
              height={24}
              alt=""
              priority
            />
            <form className="w-[90%]">
              <input
                className="shrink-0 mx-n-sm w-full outline-none bg-inherit text-n-sm"
                type="text"
                maxLength={18}
              />
            </form>
            <Image
              className="mx-n-sm cursor-pointer"
              src="/images/delete.svg"
              width={20}
              height={24}
              alt=""
              priority
            />
          </div>
        );
      })}
      <div className="flex w-[85%] cursor-pointer bg-n-light-gray rounded-n-sm  h-n-xlg items-center justify-center">
        <Image src="/images/plus.svg" width={24} height={24} alt="" priority />
      </div>
    </div>
  );
};

export default FormContentInput;
