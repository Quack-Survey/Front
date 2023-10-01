import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface IUserDataInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const UserDataInput = forwardRef(
  (
    { isError, ...props }: IUserDataInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    return (
      <input
        className="mb-[15px] h-[50px] w-full min-w-[280px] rounded-n-md bg-n-light-gray p-5 text-n-lg text-n-light-black"
        ref={ref}
        {...props}
      />
    );
  },
);

export default UserDataInput;
