import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { MenuSection } from "@/components/sections/MenuSection";
import { Order } from "@/components/sections/Order";
import { Reviews } from "@/components/sections/Reviews";
import { Signature } from "@/components/sections/Signature";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Hero locale={lang} dict={dict} />
      <Marquee />
      <About dict={dict} />
      <Signature locale={lang} dict={dict} />
      <MenuSection dict={dict} />
      <Gallery locale={lang} dict={dict} />
      <Reviews locale={lang} dict={dict} />
      <Order dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
