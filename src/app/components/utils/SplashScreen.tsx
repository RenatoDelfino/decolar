import Image from "next/image";
import React from "react";

const SplashScreen = () => {
  return (
    <section className="flex justify-center items-center container mx-auto px-10 h-[75vh] mb-20">
      <div className="flex items-center flex-col gap-4">
        <div className="relative size-16 mb-5">
          <Image fill alt="planesvg" src={"/planesvg.svg"} />
        </div>
        <h2 className="text-2xl text-gray font-semibold">
          Buscando Passagens...
        </h2>
        <p className="text-sm text-gray text-center">
          Aguarde um momento enquanto buscamos as <br /> melhores opções de
          passagens para você.
        </p>
      </div>
    </section>
  );
};

export default SplashScreen;
