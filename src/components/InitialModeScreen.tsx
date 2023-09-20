const InitialModeScreen = ({
  innerText,
}: IInitialModeScreenProps): JSX.Element => {
  return (
    <div>
      <div className="flex justify-center items-center min-w-[360px] w-screen h-screen bg-n-light-gray text-n-gray text-center text-n-xl font-[bold]">
        {innerText}
      </div>
    </div>
  );
};

export default InitialModeScreen;
