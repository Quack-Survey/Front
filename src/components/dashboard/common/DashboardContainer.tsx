interface IDashboardContainerProps {
  children: JSX.Element;
}

const DashboardContainer = ({
  children,
}: IDashboardContainerProps): JSX.Element => {
  return (
    <div className="mb-[97px] flex flex-col gap-[30px] p-[30px]">
      {children}
    </div>
  );
};

export default DashboardContainer;
