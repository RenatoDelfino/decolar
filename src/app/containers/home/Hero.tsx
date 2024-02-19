"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper } from "swiper/react";
import "swiper/css";

const Hero = () => {
  return (
    <section className="container mx-auto mt-20 px-10">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 xl:gap-14 2xl:gap-10">
          <div className="hidden xl:block relative xl:w-[619px] xl:h-[272px]">
            <Image
              className="rounded-lg -z-10"
              fill
              alt="banner1"
              src={"/banner1.png"}
            />
          </div>
          <div className="block xl:hidden relative  w-[269px] h-[242px] xl:w-[299px] xl:h-[272px]">
            <Image
              className="rounded-lg -z-10"
              fill
              alt="banner1mobile"
              src={"/banner1mobile.png"}
            />
          </div>
          <div className="relative  w-[269px] h-[242px] xl:w-[299px] xl:h-[272px]">
            <Image
              className="rounded-lg -z-10"
              fill
              alt="banner2"
              src={"/banner2.png"}
            />
          </div>
          <div className="relative  w-[269px] h-[242px] xl:w-[299px] xl:h-[272px]">
            <Image
              className="rounded-lg -z-10"
              fill
              alt="banner3"
              src={"/banner3.png"}
            />
          </div>
        </div>
      </Swiper>
      <div className="mt-8 ml-4">
        <div className="flex flex-col xl:flex-row gap-4 xl:justify-between">
          <div className="flex items-center gap-5">
            <Image width={75} height={0} alt="support" src={"/iconagent.svg"} />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl text-gray font-semibold font-montserrat tracking-tighter">
                Meu Agente Decolar, compre com atendimento personalizado!
              </h2>
              <p className="text-[15px] text-gray font-medium font-montserrat">
                Temos vários canais de atendimento para você planejar a sua
                viagem com a ajuda dos nossos agentes.
              </p>
            </div>
          </div>
          <button className="h-[50px] px-4 rounded-full font-semibold w-fit text-white bg-[#4300d2]">
            Conhecer canais
          </button>
        </div>
      </div>
      <div className="mt-8">
        <a
          href="/"
          className="text-2xl text-gray font-semibold font-montserrat tracking-tighter"
        >
          Receba ofertas dos melhores destinos
        </a>
        <div className="mt-4 flex flex-col gap-4 xl:gap-0 xl:flex-row items-center justify-between">
          <Image width={600} height={0} alt="banner4" src={"/banner4.png"} />
          <Link href={"/"}>
            <Image width={600} height={0} alt="banner5" src={"/banner5.png"} />
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <a
          href="/"
          className="text-2xl text-gray font-semibold font-montserrat tracking-tighter"
        >
          Compre tudo para a sua viagem na Decolar
        </a>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <main className="flex justify-between mt-16">
            <div className="flex flex-col gap-4 w-[300px] py-[42px] px-[23px]">
              <h2 className="text-xl text-gray font-semibold font-montserrat tracking-tighter">
                Como comprar na Decolar?
              </h2>
              <p className="text-sm text-[#888888]">
                Na Decolar você pode comprar tudo o que precisa para as suas
                férias. Primeiro, insira a informação da sua viagem no buscador.
                Compare entre centenas de opções e escolha a que melhor se
                adapta aos seus planos, clicando em Comprar. Cadastre os dados
                dos passageiros, selecione o meio de pagamento e insira demais
                informações necessárias. Aproveite as ofertas e promoções da
                Decolar! Por último, clique novamente em Comprar e receba os
                vouchers no seu e-mail para começar a desfrutar da sua viagem.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-[300px] py-[42px] px-[23px]">
              <h2 className="text-xl text-gray font-semibold font-montserrat tracking-tighter">
                Documentação necesssária para comprar e viajar
              </h2>
              <p className="text-sm text-[#888888]">
                Para comprar a sua viagem na Decolar, você deve ter os números
                dos documentos de identidade, os nomes, os sobrenomes e as datas
                de nascimento dos passageiros. Antes de viajar, revise o detalhe
                da sua reserva em Minha Conta e saiba quais são os vistos e
                vacinas obrigatórios no país de destino. Isso inclui as escalas
                nas viagens de avião e os tours que você realizar durante a sua
                viagem. Se uma criança precisar viajar sozinha ou acompanhada,
                deverá contar com uma autorização especial para sair do país.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-[300px] py-[42px] px-[23px]">
              <h2 className="text-xl text-gray font-semibold font-montserrat tracking-tighter">
                É possível alterar ou cancelar uma compra?
              </h2>
              <p className="text-sm text-[#888888]">
                Na Decolar você pode fazer a alteração ou o cancelamento de uma
                reserva, mas leve em consideração que alguns provedores ou
                tarifas não permitem ou cobram um custo adicional para isso. Em
                voos, hotéis e carros, você só pode fazer alterações no mesmo
                provedor. Você também pode cancelar uma reserva para todos ou
                para alguns dos passageiros. O que você não pode fazer é alterar
                o titular da reserva. Lembre-se de revisar as políticas de
                alteração e cancelamento da sua reserva em Minha Conta.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-[300px] py-[42px] px-[23px]">
              <h2 className="text-xl text-gray font-semibold font-montserrat tracking-tighter">
                Por que devo escolher a Decolar para a minha viagem?
              </h2>
              <p className="text-sm text-[#888888]">
                A Decolar é uma das agências de viagens online com maior
                trajetória na América Latina e recomendada por milhares de
                viajantes. Aproveite as ofertas e promoções no nosso site e
                conheça o mundo todo. Compre sua viagem na Decolar através da
                web ou da app. Se você tem alguma dúvida ou quer mudar algo
                sobre a sua viagem, você pode fazê-lo em Minhas Viagens. Viaje
                com a confiança de que você pode contar conosco para o que
                precisar.
              </p>
            </div>
          </main>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
