"use client";

import { useForm } from "react-hook-form";

interface IFormContentInputProps {
  type: string;
}

const FormContentInput = ({ type }: IFormContentInputProps): JSX.Element => {
  const { register } = useForm();

  return (
    <div className="space-y-n-sm">
      {[1, 2, 4, 5].map((a, i) => {
        return (
          <div
            className="w-[85%] bg-n-light-gray rounded-n-sm ml-n-xlg "
            key={i}
          ></div>
        );
      })}
    </div>
  );
};

export default FormContentInput;
