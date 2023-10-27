import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import Image from "next/image";
interface IDescriptiveResponse extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  order: number;
  title: string;
  placeholder?: string;
  iserror?: boolean;
}

const DescriptiveResponse = forwardRef(
  (
    { id, order, title, placeholder, iserror, ...rest }: IDescriptiveResponse,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const dynamicClassName = iserror
      ? "relative mb-3 flex border-[1px] border-n-red bg-n-white py-2 pl-n-sm pr-n-lg"
      : "relative mb-3 flex border-l-[8px] border-n-blue bg-n-white py-2 pl-n-sm pr-n-lg";
    return (
      <div className={dynamicClassName}>
        <span className="mr-n-lg text-n-2xl text-n-blue">{order}</span>
        <div className="grow">
          <h2 className="mb-3 text-n-lg">{title}</h2>
          <input
            type="text"
            id={id}
            placeholder={placeholder}
            className="w-full rounded border-[1px] border-n-gray py-1 pl-2"
            ref={ref}
            {...rest}
          />
          {iserror ? (
            <div className="flex justify-end">
              <Image
                src="/images/warning.svg"
                width={12}
                height={12}
                alt="경고아이콘"
              ></Image>
              <p className="text-n-red">본 문항에 응답해주세요</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

export default DescriptiveResponse;
