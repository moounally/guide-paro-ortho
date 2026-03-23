export function Footer() {
  return (
    <footer className="w-full border-t bg-sapphire-900 text-ivory py-12 mt-auto">
      <div className="container mx-auto px-4 md:flex md:items-start md:justify-between">
        <div className="mb-8 md:mb-0 md:max-w-2xl">
          <div className="font-display italic text-gold-300 border-l-2 border-gold-500 pl-6 text-sm leading-relaxed space-y-2">
            <p>
              « Ce guide clinique est basé sur : Ounally Z. & Dallel I. (2026). Impact des dispositifs orthodontiques sur la santé parodontale : aligneurs transparents versus systèmes multi-attaches. Revue systématique PRISMA, 22 études incluses. Thèse de doctorat, Université de Monastir, Tunisie. »
            </p>
          </div>
        </div>
        <div className="text-sm text-sapphire-50/70 text-right space-y-1">
          <p className="font-medium text-white-pure">© 2026 Guide Paro-Orthodontique</p>
          <p>Application à usage clinique exclusif.</p>
          <p>Ounally Z. & Dallel I. — Université de Monastir</p>
        </div>
      </div>
    </footer>
  );
}
