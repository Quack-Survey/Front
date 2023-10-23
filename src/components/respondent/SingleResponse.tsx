import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import Image from "next/image";

interface ISingleResponse extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  order: number;
  title: string;
  options: string[];
  iserror?: boolean;
}

const SingleResponse = forwardRef(
  (
    { id, order, title, options, iserror, ...rest }: ISingleResponse,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const dynamicClassName = iserror
      ? "relative mb-3 flex border-[1px] border-n-red bg-n-white py-2 pl-n-sm pr-n-lg"
      : "relative mb-3 flex border-l-[8px] border-n-blue bg-n-white py-2 pl-n-sm pr-n-lg";
    return (
      <div className={dynamicClassName}>
        <span className="mr-n-lg text-n-2xl text-n-blue">{order}</span>
        <div className="flex grow flex-col">
          <h2 className="mb-3 text-n-lg">{title}</h2>
          {options.map((option) => {
            return (
              <div key={option} className="mb-2 rounded bg-n-light-gray p-1">
                <input
                  type="radio"
                  name={id}
                  value={option}
                  id={option}
                  className="mr-1"
                  ref={ref}
                  {...rest}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            );
          })}
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

export default SingleResponse;
