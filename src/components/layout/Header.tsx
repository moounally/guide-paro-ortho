import Link from 'next/link';
import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white-pure/95 backdrop-blur supports-[backdrop-filter]:bg-white-pure/60 border-sapphire-50 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-sapphire-900 text-gold-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl text-sapphire-900 tracking-tight">
            Guide<span className="text-gold-600">Paro</span>Ortho
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/recherche" className="text-sm font-semibold text-sapphire-800 hover:text-gold-600 transition-colors">Revue Systématique</Link>
          <Link href="/protocoles" className="text-sm font-semibold text-sapphire-800 hover:text-gold-600 transition-colors">Protocoles Tunisie</Link>
          <Link href="/formulaire" className="text-sm font-bold bg-sapphire-50 text-sapphire-900 px-5 py-2.5 rounded-full hover:bg-sapphire-100 transition-colors">Dossier Patient</Link>
        </nav>
      </div>
    </header>
  );
}
