import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-ink grain flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
      <p className="font-hangul neon-red text-7xl">404</p>
      <p className="text-mute">Stránka sa nenašla · Page not found · 페이지를 찾을 수 없습니다</p>
      <Link href="/sk" className={buttonClass("primary", "lg")}>
        HanCook
      </Link>
    </section>
  );
}
