import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        className="hidden lg:block"
        width={120}
        height={0}
        src={"/decolar.svg"}
        alt="logo"
      />
      <div className="relative block lg:hidden size-16">
        <Image fill src={"/decolarmobile.png"} alt="logomobile" />
      </div>
    </Link>
  );
};

export default Logo;
