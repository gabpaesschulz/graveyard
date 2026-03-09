"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Ornament() {
  return <div className="text-center my-8 sm:my-12 text-gold/20 text-2xl tracking-[0.6em] select-none">✦ ✦ ✦</div>;
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <blockquote className="relative my-10 mx-auto max-w-lg text-center">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl text-gold/10 font-serif leading-none select-none">
          &ldquo;
        </div>
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-gold/80 leading-snug italic px-6 sm:px-8">
          {children}
        </p>
      </blockquote>
    </FadeIn>
  );
}

export default function ManifestoPage() {
  return (
    <main className="flex-1">
      {/* Ornamental top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <article className="container py-12 sm:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-12 sm:mb-20"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-gold/40 mb-6">Manifesto · Graveyard</p>
            <h1
              className="font-serif font-bold text-parchment leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Sobre a dignidade de
              <br />
              <span className="text-gold">encerrar em público</span>
            </h1>
            <div className="w-12 h-px bg-gold/30 mx-auto" />
          </motion.header>

          {/* Body */}
          <div className="prose-custom space-y-6 text-parchment-muted leading-[1.85] text-[1.0625rem]">
            <FadeIn>
              <p>
                Todo desenvolvedor tem uma gaveta de projetos mortos. Uma pasta chamada <em>old</em>, ou <em>backup</em>
                , ou simplesmente <em>arquivo</em> — cheia de repositórios que um dia tiveram README, tiveram logo,
                tiveram aquela energia de começo que parece que dessa vez vai ser diferente.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                E então param. Às vezes de repente, às vezes lentamente — como uma vela que diminui antes de apagar. O
                último commit foi há oito meses. O domínio expirou. A landing page ainda está no ar, constrangedora, com
                seu formulário de &ldquo;seja o primeiro a saber&rdquo; que nunca vai mandar nada.
              </p>
            </FadeIn>

            <PullQuote>O projeto não falhou. Ele ensinou.</PullQuote>

            <FadeIn>
              <p>
                A cultura de startups criou um paradoxo cruel: celebrate failure é o mantra, mas na prática ninguém fala
                sobre seus projetos abandonados. Os portfolios mostram sucessos. Os LinkedIn celebram lançamentos. Os
                case studies são sempre sobre o que deu certo.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                O que ficou para trás — as ideias que morreram no protótipo, os MVPs que ninguém usou, os SaaS que
                tiveram 12 usuários pagantes e foram descontinuados — esses são os projetos mais honestos que um
                profissional já criou.
              </p>
            </FadeIn>

            <Ornament />

            <FadeIn>
              <h2 className="font-serif text-2xl text-parchment mt-10 mb-4">
                I. Documentar o fracasso é um ato de maturidade
              </h2>
            </FadeIn>

            <FadeIn>
              <p>
                Existe uma diferença entre quem abandona projetos e quem os enterra com cuidado. O primeiro some, o
                segundo entende. Documentar o que deu errado — não como post-mortem corporativo, mas como reflexão
                honesta — é uma das poucas formas de transformar tempo perdido em sabedoria real.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                O que você aprendeu sobre escopo quando o projeto morreu por scope creep? O que você entendeu sobre
                mercado quando percebeu que ninguém precisava do que você construiu? O que a falta de foco revelou sobre
                como você trabalha?
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                Essas respostas não estão nos projetos que funcionaram. Estão nos que não funcionaram. E na maioria das
                vezes, ninguém nunca pergunta.
              </p>
            </FadeIn>

            <Ornament />

            <FadeIn>
              <h2 className="font-serif text-2xl text-parchment mt-10 mb-4">
                II. Projetos abandonados são matéria-prima
              </h2>
            </FadeIn>

            <FadeIn>
              <p>
                Não existe projeto morto que não deixou alguma coisa. Um módulo de autenticação que você vai reutilizar.
                Um sistema de design que ficou melhor do que o do projeto que sobreviveu. Uma ideia de produto que
                estava certa, mas no timing errado. Uma arquitetura que você só entendeu quando ela quebrou.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                A ironia é que muitos dos melhores produtos nasceram da autopsia de projetos anteriores. Não como plágio
                — como compostagem. O que apodreceu alimentou o que cresceu.
              </p>
            </FadeIn>

            <PullQuote>Nenhum código é realmente descartado. Ele vira experiência.</PullQuote>

            <Ornament />

            <FadeIn>
              <h2 className="font-serif text-2xl text-parchment mt-10 mb-4">III. O velório como ritual</h2>
            </FadeIn>

            <FadeIn>
              <p>
                Um velório não é sobre o morto. É sobre os vivos — sobre o processo de reconhecer que algo existiu, teve
                valor, e agora foi. É sobre ter um lugar para dizer: isso importou para mim, mesmo que não tenha dado
                certo.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                Os projetos merecem esse rito. Não porque eles importam objetivamente, mas porque o tempo investido
                importa. Porque as noites em claro importam. Porque a versão de você que acreditava naquela ideia
                importa — mesmo que ela tenha errado sobre o mercado, sobre a tecnologia, sobre o timing.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p>
                Então este projeto existe para isso: para ser o arquivo onde os projetos mortos ganham epitáfios. Onde
                os fracassos são documentados com o mesmo cuidado que os sucessos. Onde ninguém precisa fingir que
                aquela ideia nunca existiu.
              </p>
            </FadeIn>

            <Ornament />

            <FadeIn>
              <h2 className="font-serif text-2xl text-parchment mt-10 mb-4">IV. Sobre honestidade no portfólio</h2>
            </FadeIn>

            <FadeIn>
              <p>
                Portfolios profissionais são documentos de venda. Isso é legítimo. Mas existe algo estranho em um
                portfólio que só mostra sucessos: ele não revela como a pessoa pensa quando as coisas não funcionam.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p>
                Documentar um projeto fracassado com clareza — com a causa real da morte, com o que foi aprendido, com o
                que ainda poderia ser aproveitado — diz muito mais sobre julgamento, sobre autoconsciência, sobre a
                capacidade de aprender do que qualquer case study de sucesso.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p>
                Este graveyard é um portfólio de outra espécie. O portfólio do que foi tentado, não do que foi
                concluído.
              </p>
            </FadeIn>

            {/* Closing */}
            <FadeIn>
              <div className="mt-16 pt-10 border-t border-border/30 text-center">
                <p className="font-serif text-xl text-parchment mb-2">Que os projetos mortos descansem bem.</p>
                <p className="text-sm text-muted-foreground">E que o que eles ensinaram não descanse nunca.</p>
                <div className="mt-8 text-gold/20 text-xl tracking-[0.6em] select-none">✦</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </article>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </main>
  );
}
