interface IDashboardResultWrapperProps {
  order: number;
  title: string;
  children: JSX.Element;
}

const DashboardResultWrapper = ({
  order,
  title,
  children,
}: IDashboardResultWrapperProps) => {
  return (
    <div className="bg-n-white">
      <div className="flex w-full items-baseline gap-[10px]">
        <div className="text-n-2xl font-bold text-n-gray">{order}</div>
        <div className="w-full break-words py-n-md text-n-lg font-bold text-n-black">
          {title}
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardResultWrapper;
