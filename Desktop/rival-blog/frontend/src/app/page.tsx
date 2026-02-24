import Link from 'next/link';
import { ArrowRight, PenSquare, Rss, Shield, Heart, MessageCircle, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="py-12 md:py-20">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-sm text-indigo-300 mb-6">
          <Zap className="h-3.5 w-3.5" />
          Built with NestJS + Next.js 15
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-white">Write. Publish.</span>
          <br />
          <span className="gradient-text from-indigo-400 via-violet-400 to-purple-400">
            Connect.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          A modern blogging platform for developers and creators.
          Share your ideas with the world.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="btn-primary px-8 py-3 text-base">
            Start writing for free
          </Link>
          <Link href="/feed" className="btn-secondary px-6 py-3 text-base group">
            Browse the feed
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {[
          {
            icon: PenSquare,
            title: 'Write with ease',
            desc: 'A clean writing experience. Create drafts, edit anytime, publish when ready.',
            gradient: 'from-indigo-500 to-blue-500',
          },
          {
            icon: Rss,
            title: 'Public feed',
            desc: 'Your published blogs appear in the public feed instantly, reaching every reader.',
            gradient: 'from-violet-500 to-purple-500',
          },
          {
            icon: Shield,
            title: 'Secure & private',
            desc: 'JWT auth, bcrypt passwords, rate limiting. Your drafts stay private until you publish.',
            gradient: 'from-emerald-500 to-teal-500',
          },
        ].map(({ icon: Icon, title, desc, gradient }, i) => (
          <div
            key={title}
            className={`card-glow p-6 animate-slide-up delay-${(i + 1) * 100}`}
            style={{ animationFillMode: 'backwards', animationDelay: `${(i + 1) * 100}ms` }}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 text-lg">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Social features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
        {[
          {
            icon: Heart,
            title: 'Like & engage',
            desc: 'Show appreciation for great content with optimistic like updates.',
            stat: 'Instant feedback',
          },
          {
            icon: MessageCircle,
            title: 'Comments',
            desc: 'Join the conversation. Share thoughts without page reloads.',
            stat: 'Real-time',
          },
        ].map(({ icon: Icon, title, desc, stat }, i) => (
          <div
            key={title}
            className="card-hover p-6 flex items-start gap-4 animate-slide-up"
            style={{ animationFillMode: 'backwards', animationDelay: `${(i + 4) * 100}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
              <Icon className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-400 mb-2">{desc}</p>
              <span className="badge-success text-xs">{stat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center card p-10 animate-fade-in bg-gradient-to-b from-indigo-500/5 to-transparent border-indigo-500/10">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to start writing?</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Join the community. Create your first blog post in minutes.
        </p>
        <Link href="/register" className="btn-primary px-8 py-3">
          Create your account
        </Link>
      </div>
    </div>
  );
}
