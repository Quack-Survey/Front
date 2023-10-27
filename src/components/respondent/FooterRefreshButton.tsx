import Image from "next/image";

const FooterRefreshButton = ({ ...rest }) => {
  return (
    <div className="cursor-pointer bg-n-red p-3" {...rest}>
      <Image
        src="/images/initialize.svg"
        width={24}
        height={24}
        alt="경고아이콘"
      ></Image>
    </div>
  );
};

export default FooterRefreshButton;
