import Image from "next/image";
import React from "react";
import Button from "../button/Button";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { RiYoutubeLine } from "react-icons/ri";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto mt-40 mb-16 px-10">
      <div className="lg:mx-36">
        <div className="hidden lg:flex items-center gap-10 justify-between mx-32">
          <div className="relative size-[87px]">
            <Image fill alt="mail" src={"/mail.png"} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[22px] text-gray font-medium">
              Inscreva-se para receber ofertas exclusivas
            </h2>
            <input
              className="px-3 py-[6px] rounded-[6px] w-[90%] border border-[#888888] placeholder:text-[#828a90] placeholder:italic placeholder:font-normal text-[14px]"
              type="email"
              placeholder="Insira seu e-mail"
            />
            <p className="mt-3 text-[#888] text-[12px]">
              Você receberá e-mails promocionais da Decolar. Para mais
              informações, consulte <br />{" "}
              <a href="/">
                <span className="text-purple font-medium">
                  as políticas de privacidade
                </span>
              </a>
              .
            </p>
          </div>
          <div>
            <Button
              className="border-purple text-purple hover:bg-purple hover:text-white transition ease-out duration-300 font-semibold"
              variant="default"
              text="Quero recebê-las!"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-20">
          <div className="flex items-center gap-4 col-span-1">
            <Link href={"/facebook.com/decolar"}>
              <RiFacebookCircleLine className="text-2xl text-[#666666] hover:text-[#888] transition" />
            </Link>
            <Link href={"/instagram.com/decolar"}>
              <FaInstagram className="text-xl text-[#666666] hover:text-[#888] transition" />
            </Link>
            <Link href={"/twitter.com/decolar"}>
              <FiTwitter className="text-xl text-[#666666] hover:text-[#888] transition" />
            </Link>
            <Link href={"/youtube.com/c/decolar"}>
              <RiYoutubeLine className="text-2xl text-[#666666] hover:text-[#888] transition" />
            </Link>
          </div>

          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-subgrid col-span-3">
            <a className="text-sm text-[#888] col-start-2">
              <span className="text-gray font-medium">Central de vendas</span>{" "}
              0800 883 6342
            </a>
            <a className="text-sm text-[#888] col-start-3">
              <span className="text-gray font-medium">Pós-venda</span>{" "}
              Atendimento ao cliente
            </a>
          </div>
        </div>
        <nav className="flex flex-col items-start lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-2 w-fit">
            <h2 className="text-[13px]">Minha conta</h2>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Passaporte Decolar
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Cartão Decolar Santander
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Minhas Viagens
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Meu Perfil
            </a>
          </div>
          <div className="flex flex-col gap-2 w-fit">
            <h2 className="text-[13px]">Somos Decolar</h2>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              FAQs
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Trabalhe na Decolar
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Contato com a imprensa
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Relações com Investidores
            </a>
          </div>
          <div className="flex flex-col gap-2 w-fit">
            <h2 className="text-[13px]">Compra segura</h2>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Termos e condições
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Política de privacidade
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Black Friday
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Oferta Uau
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Prevenção a fraudes
            </a>
          </div>
          <div className="flex flex-col gap-2 w-fit">
            <h2 className="text-[13px]">Promova seu negócio</h2>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Cadastre sua locadora
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Programa de franquias Decolar
            </a>
            <a
              className="text-[13px] text-[#888888] hover:text-zinc-200"
              href="/"
            >
              Premium Connectivity Partner
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-center w-full my-20">
          <figure className="relative w-20 h-12">
            <Image fill alt="iata-logo" src={"/iata.png"} />
          </figure>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 w-[512px]">
            <p className="text-[12px] text-[#888]">
              <span className="text-gray font-medium">
                Decolar está presente em
              </span>{" "}
              Brasil, Argentina, Bolívia, Chile, Colômbia, Costa Rica, Equador,
              El Salvador, Guatemala, Honduras, México, Nicarágua, Panamá,
              Paraguai, Peru, Porto Rico, República Dominicana, Estados Unidos,
              Uruguai
            </p>
            <div className="flex flex-col gap-4 pr-5">
              <p className="text-[12px] text-gray font-medium">
                DECOLAR.COM - Ministério do Turismo - Cadastur
                26.012747.10.0001-6 / 26.012747.10.0002-3 Copyright 1999-2024,
                Decolar.com Ltda. Todos os direitos reservados.
              </p>
              <p className="text-[12px] text-gray font-medium">
                Alameda Grajaú, 219, 2º andar, Alphaville Centro Industrial e
                Empresarial, Barueri, São Paulo, CEP 06454-050
              </p>
            </div>
          </div>
          <div className="w-[512px]">
            <p className="text-[12px] text-[#888]">
              A Decolar comercializa os produtos de seus fornecedores apenas de
              forma direta pelo seu site (www.decolar.com). Não há qualquer
              venda por redes sociais (Facebook, Instagram, Twitter, LinkedIn,
              etc.). Pós-vendas - os canais oficiais de atendimento aos clientes
              são: por meio do telefone 11 4003 9444 e Minhas Viagens. A Decolar
              não realiza qualquer tipo de abordagem nas redes sociais ou sites
              de relacionamento, tampouco disponibiliza e-mails de contato com
              domínios distintos de @decolar.com. Endereços de e-mails com
              domínios: @hotmail.com @gmail.com @outlook.com ou qualquer outro
              neste sentido não tem qualquer relação com a Decolar. Mais
              esclarecimentos em www.decolar.com.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
