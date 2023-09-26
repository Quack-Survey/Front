import { InputHTMLAttributes } from "react";

const UserDataInput = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  return (
    <input
      className="mb-[15px] h-[50px] w-full min-w-[280px] rounded-n-md bg-n-light-gray p-5 text-n-lg text-n-light-black"
      {...props}
    />
  );
};

export default UserDataInput;
