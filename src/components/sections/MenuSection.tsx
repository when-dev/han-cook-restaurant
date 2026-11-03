import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuExplorer } from "@/components/menu/MenuExplorer";

/** Paper-textured menu board. No overflow-hidden here — it would break the sticky filter bar. */
export function MenuSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="menu" aria-labelledby="menu-title" className="paper relative py-24 md:py-32">
      <div className="container-site flex flex-col gap-10">
        <SectionHeading id="menu-title" tone="light" kicker={dict.menu.kicker} hangul="메뉴판" title={dict.menu.title} lead={dict.menu.lead} />
        <MenuExplorer />
        <p className="text-mute-ink border-ink/15 border-t pt-6 text-sm">{dict.menu.note}</p>
      </div>
    </section>
  );
}
