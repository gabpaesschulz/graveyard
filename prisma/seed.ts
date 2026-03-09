/**
 * Graveyard — Seed Data
 *
 * 10 projetos mortos. Cada um com um nome, uma alma e uma história.
 * Estes são os projetos que quase foram.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("⚰️  Preparando o terreno...");

  // Limpar dados existentes
  await prisma.timelineEvent.deleteMany();
  await prisma.reincarnationIdea.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.artifact.deleteMany();
  await prisma.project.deleteMany();
  await prisma.tag.deleteMany();

  console.log("🕯️  Assentando as primeiras pedras...");

  // ─── 1. Nocturne ──────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "nocturne",
      name: "Nocturne",
      slogan: "Música gerada para o fim do seu dia",
      epitaph: "Criou silêncio para o mundo inteiro. Nunca soube como se sustentar nele.",
      type: "PERSONAL_APP",
      stage: "MVP",
      causeOfDeath: "NO_MONEY",
      emotionalWeight: "NOSTALGIC",
      resurrectionPotential: "MEDIUM",
      bornAt: new Date("2022-09-01"),
      diedAt: new Date("2023-04-15"),
      techStack: ["React Native", "Expo", "Python", "FastAPI", "OpenAI API", "ElevenLabs API", "AWS S3", "Supabase"],
      targetAudience:
        "Pessoas com insônia, ansiedade noturna, ou que simplesmente precisam de um ritual de descanso real",
      hadRealUsers: true,
      userCount: 203,
      whatItWantedToBe:
        "Um aplicativo que gerava uma trilha sonora original para o fim do seu dia. Você escrevia como havia sido o dia — uma linha, dez linhas, o que quisesse. A IA analisava o tom emocional, os temas e o nível de estresse, e então compunha uma peça única de áudio procedural: texturas, melodias atmosféricas, sons de ambiente calibrados para aquele estado emocional específico. Não era playlist curada nem música aleatória — era composição original, gerada uma vez e nunca mais repetida. A ideia era criar um ritual: deitar, colocar o fone, escrever três linhas sobre o dia, e deixar que algo composto especificamente para aquele momento da sua vida te carregasse para o sono. Uma declaração silenciosa de que seu dia, mesmo o ruim, merecia uma música só sua.",
      whatWentWrong:
        "O custo por geração era de U$0,60 em chamadas de API. Com uma assinatura de U$5,99/mês e uma média de 20 sessões mensais por usuário ativo, o custo de servir um único usuário satisfeito era de U$12 — o dobro da receita. Cada pessoa que amava o produto era uma perda líquida. A matemática era irrecuperável sem tecnologia própria de geração de áudio.",
      whatStillWorks:
        "O sistema de análise emocional de texto para mapeamento de parâmetros de áudio é elegante e reutilizável. O algoritmo de 'score emocional noturno' ainda vive em outro projeto.",
      whatWasRepurposed:
        "O módulo de análise de emoção em texto foi portado para um sistema interno de triagem de feedback de usuários em outro produto.",
      mostPromisingMoment:
        "Quando o terceiro usuário do app enviou uma mensagem: 'Dormi sem remédio pela primeira vez em 4 anos. Obrigado.' Era 2h da manhã quando li isso. Fiquei olhando para a tela por uns cinco minutos.",
      momentOfReckoning:
        "Quando a fatura da ElevenLabs chegou: U$180 em um único mês. Receita total do mês: U$40. Abri uma planilha, calculei a projeção e fechei o laptop.",
      symptoms: [
        "Custo de servir 2× maior que a receita desde o primeiro dia",
        "APIs de terceiros sem alternativa de custo viável no mercado",
        "Modelo freemium atraía os usuários mais pesados sem converter para pago",
        "A qualidade dependia de infraestrutura que não controlávamos",
        "Cada usuário satisfeito amplificava o prejuízo",
      ],
      dreams: [
        "Ser o Calm com personalização real e geração procedural",
        "Parcerias com psicólogos e profissionais de saúde mental",
        "Feature de 'diário emocional histórico' baseado nas composições geradas",
        "Um dia lançar álbuns compostos por dias memoráveis de usuários reais",
      ],
      farewellLetter:
        "Nocturne, você foi o projeto que mais me orgulhei de mostrar para pessoas de fora do mundo de tecnologia — porque todo mundo entendia em dez segundos. Não havia pitch. Havia apenas: 'você escreve sobre o dia, ele compõe uma música para você dormir.' E todo mundo queria isso. A pessoa de 67 anos que cuido às terças. O colega de academia que não sabe o que é uma API. A médica que trabalha 14 horas e não tem paciência para app nenhum. O problema nunca foi o produto. Foi que amar você mais significava te custar mais — cada usuário satisfeito era uma perda líquida de U$6. Aprendi que uma unidade econômica invertida não é um problema de engenharia. É uma condenação. Quando as APIs de geração de áudio ficarem baratas o suficiente — e vão ficar, e em breve —, alguém vai construir o que você prometia. Quero ser eu. Não por dinheiro. Pelo usuário que me disse que dormiu sem remédio pela primeira vez em quatro anos. Ele merece outra chance.",
      tags: {
        connectOrCreate: [
          { where: { name: "mobile" }, create: { name: "mobile" } },
          { where: { name: "ai" }, create: { name: "ai" } },
          { where: { name: "audio" }, create: { name: "audio" } },
          { where: { name: "sleep" }, create: { name: "sleep" } },
          { where: { name: "wellbeing" }, create: { name: "wellbeing" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Valide o modelo de custo antes de lançar qualquer produto com chamadas de API por ação. O custo variável é o inimigo invisível do produto que funciona.",
            category: "BUSINESS",
            order: 1,
          },
          {
            body: "Produtos que funcionam emocionalmente têm a pior combinação: usuários mais ativos (maior custo) e menor propensão a pagar.",
            category: "BUSINESS",
            order: 2,
          },
          {
            body: "203 usuários com alta retenção e mensagens de gratidão provam product-market fit. Na próxima versão, resolva primeiro a unidade econômica.",
            category: "PROCESS",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Nocturne Open — modelos de áudio locais",
            description:
              "Reimplementar com modelos open source de geração de áudio (AudioCraft, Bark) rodando localmente. Custo de API próximo de zero. O conceito sobrevive; apenas a dependência de terceiros muda.",
            strategy: "REVIVAL",
            feasibilityScore: 7,
          },
          {
            title: "API de score emocional de texto",
            description:
              "Isolar e vender o módulo de análise emocional de texto como microserviço. Outros produtos de wellbeing e saúde mental poderiam usar.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 8,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2022-09-01"),
            title: "Insônia às 3h da manhã",
            description:
              "A ideia surgiu depois de uma noite sem dormir tentando encontrar uma playlist que 'combinasse com o dia ruim'. Nenhuma servia. Tinha que ser gerada.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2022-12-15"),
            title: "200 usuários orgânicos, zero anúncios",
            description:
              "Crescimento inteiramente via boca a boca e um único tweet. A retenção era de 68% — o produto funcionava.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2023-02-01"),
            title: "A conta da ElevenLabs chegou",
            description:
              "U$180 em um mês. Receita: U$40. O produto que mais me orgulhei virou a planilha que mais me assustou.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2023-04-15"),
            title: "Último ciclo de geração",
            description: "Desliguei o servidor em silêncio. Nenhuma notificação para os usuários. Me arrependo disso.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 2. Candor ────────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "candor",
      name: "Candor",
      slogan: "Feedback honesto. Sem nomes. Sem constrangimentos.",
      epitaph: "Disse o que ninguém dizia. Ninguém queria pagar para ouvir.",
      type: "MICRO_SAAS",
      stage: "BETA",
      causeOfDeath: "BETTER_ALTERNATIVE",
      emotionalWeight: "HEAVY",
      resurrectionPotential: "NONE",
      bornAt: new Date("2021-03-01"),
      diedAt: new Date("2022-09-30"),
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "SendGrid", "Tailwind CSS", "Vercel"],
      targetAudience:
        "Times de produto e engenharia de 5 a 30 pessoas que queriam cultura de feedback sem a awkwardness do cara a cara",
      hadRealUsers: true,
      userCount: 47,
      whatItWantedToBe:
        "Uma plataforma de feedback 360 assíncrono e anônimo para pequenas equipes de tecnologia. Sem ciclos anuais de performance review. Sem a rigidez do RH corporativo. Uma vez por semana, cada membro recebia perguntas contextuais sobre as pessoas com quem havia trabalhado naquela sprint. As respostas eram anonimizadas, agregadas e entregues de volta de forma digerível — foco em cultura e comportamento, não em avaliação de desempenho.",
      whatWentWrong:
        "O produto funcionava. Oito times pagantes. Feedback genuinamente positivo. O problema foi quando 15Five e Lattice — plataformas consolidadas com equipes enormes — lançaram módulos de feedback assíncrono que cobriam 80% do nosso caso de uso. Não eram melhores. Mas já estavam no cartão de crédito das empresas como parte de pacotes maiores. Não havia linha de budget separada para 'feedback tool indie'.",
      whatStillWorks:
        "O sistema de perguntas contextuais baseadas em eventos recentes da sprint era genuinamente diferente de tudo no mercado. A UX de formulário anônimo com níveis de anonimato configuráveis era a melhor que encontrei no espaço.",
      whatWasRepurposed:
        "O sistema de envio e agregação de surveys anônimos foi adaptado para um sistema interno de NPS em outro produto B2B.",
      mostPromisingMoment:
        "Quando o CTO de um time de 12 pessoas escreveu: 'Pela primeira vez na história da empresa, alguém me disse uma verdade que eu precisava ouvir e que nunca chegaria por outro canal.' Guardei essa mensagem.",
      momentOfReckoning:
        "Quando o sétimo prospect em dez semanas disse exatamente a mesma frase: 'Amamos o produto, mas já temos o 15Five e não consigo justificar outra ferramenta de pessoas para o board.' Desta vez, diferente das seis anteriores, não tentei contra-argumentar. Só anotei 'sétima vez' no caderno e fechei o computador mais cedo. Era uma terça à tarde. Não era hora de fechar o computador.",
      symptoms: [
        "Ciclo de vendas longo para um produto assíncrono em mercado consolidado",
        "Decisores de compra eram os mais resistentes ao produto que os usuários amavam",
        "15Five e Lattice adicionaram features similares sem ser o core deles",
        "Não havia budget específico para 'feedback tools' — entrava em pacotes maiores",
        "Churn silencioso: times migravam sem reclamar, apenas paravam de usar",
      ],
      dreams: [
        "Ser o Calendly do feedback — onboarding self-service sem ciclo de vendas",
        "500 times ativos em 18 meses",
        "Integração nativa com GitHub para contexto técnico automático nas perguntas",
        "Feature de 'tendências de cultura' longitudinal por time",
      ],
      farewellLetter:
        "Candor, você foi construído com raiva justa — a raiva de ter sido demitido por uma versão torta de mim que nunca me deram a chance de corrigir. Isso te deu uma honestidade que os concorrentes não tinham, porque eles foram construídos por consultores e não por pessoas que precisavam do produto de verdade. Vi CTOs mudarem a forma como se comportavam depois de uma rodada de feedback seu. Vi um engenheiro que estava à beira de pedir demissão descobrir que três pessoas do time já queriam dizer o que ele sentia — e nunca souberam como. Você foi o canal para isso. Não morreu por falta de valor. Morreu porque em orçamento de empresa, 'feedback tool indie' fica sempre abaixo da linha. O mercado não errou — eu errei em não entender antes que distribuição era o produto. Na próxima versão, começo pelo orçamento, não pelo problema.",
      tags: {
        connectOrCreate: [
          { where: { name: "saas" }, create: { name: "saas" } },
          { where: { name: "hr-tech" }, create: { name: "hr-tech" } },
          { where: { name: "feedback" }, create: { name: "feedback" } },
          { where: { name: "b2b" }, create: { name: "b2b" } },
          { where: { name: "async" }, create: { name: "async" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Em mercados com budget consolidado, novos produtos precisam ser 10× melhores para justificar uma nova linha de budget — não apenas melhores em alguns aspectos.",
            category: "BUSINESS",
            order: 1,
          },
          {
            body: "Quando o usuário ideal e o decisor de compra são pessoas diferentes, o ciclo de vendas para um produto indie se torna insustentável sem uma equipe comercial.",
            category: "BUSINESS",
            order: 2,
          },
          {
            body: "8 times pagantes em beta sem marketing é tração real. O gargalo não era o produto — era a distribuição.",
            category: "PROCESS",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Candor API — motor de anonimização como serviço",
            description:
              "Vender o motor de anonimização e agregação de surveys como API para plataformas de RH maiores. B2B2B em vez de B2B direto.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 7,
          },
          {
            title: "Candor Open — template auto-hospedado",
            description:
              "Abrir o código como template que times auto-hospedam. Sem ciclo de vendas. A distribuição acontece via comunidade técnica.",
            strategy: "OPEN_SOURCE",
            feasibilityScore: 8,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2021-03-01"),
            title: "A demissão injusta que motivou tudo",
            description:
              "Fui demitido com base em fofoca de Slack que nunca vi. Candor nasceu da raiva de não ter tido um canal de feedback real. O produto era pessoal antes de ser um negócio.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2021-11-15"),
            title: "Primeiro time pagante",
            description:
              "U$99/mês. Uma startup de fintech de 14 pessoas. O fundador disse: 'Preciso disso mais do que preciso de mais um dashboard de métricas.'",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2022-06-01"),
            title: "15Five lança módulo de feedback assíncrono",
            description:
              "A feature não era tão boa. Mas estava no plano que os clientes já pagavam. O mercado não esperou.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2022-09-30"),
            title: "Os 8 times migraram em silêncio",
            description:
              "Nenhum cancelamento formal. Apenas pararam de usar. Encerrei o servidor 30 dias depois sem aviso.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 3. Glyph ─────────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "glyph",
      name: "Glyph",
      slogan: "Seus ícones, finalmente organizados",
      epitaph: "Organizou os ícones de todo mundo. Os seus ficaram na pasta Downloads.",
      type: "TOOL",
      stage: "LAUNCHED",
      causeOfDeath: "LOST_INTEREST",
      emotionalWeight: "LIBERATING",
      resurrectionPotential: "LOW",
      bornAt: new Date("2021-07-15"),
      diedAt: new Date("2022-06-01"),
      techStack: ["Electron", "React", "TypeScript", "Node.js", "Sharp", "SQLite"],
      targetAudience:
        "Designers e desenvolvedores front-end que gerenciam grandes bibliotecas de ícones SVG em projetos profissionais",
      hadRealUsers: true,
      userCount: 2100,
      whatItWantedToBe:
        "Um gerenciador de ícones desktop, local-first, para designers e devs. Você arrastava uma pasta com centenas de SVGs e o Glyph organizava, renomeava com padrões semânticos, otimizava com SVGO, gerava sprites, exportava em PNG/WebP em qualquer resolução, e mantinha um histórico de versões de cada ícone. O conceito era 'biblioteca de ícones local como Git para assets visuais'.",
      whatWentWrong:
        "Não morreu por fracasso — morreu por desinteresse. Após 2.100 downloads e feedback positivo, percebi que não queria trabalhar em desktop apps com Electron. A stack era joyless. Cada feature nova custava 3× mais tempo do que em web. Simplesmente parei de abrir o repositório. É o tipo de abandono que dói diferente.",
      whatStillWorks:
        "O pipeline de processamento SVG (otimização + renomeação semântica + sprite generation) era sólido e bem testado. O algoritmo de sugestão de nomenclatura ainda é o melhor que escrevi.",
      whatWasRepurposed:
        "O módulo de processamento SVG foi extraído como pacote NPM independente. Ainda recebe 800 downloads por semana sem que eu faça nada.",
      mostPromisingMoment:
        "Um tweet de um designer sênior da Shopify: 'Glyph acabou com uma hora do meu workflow toda semana. Isso é tudo.' Não respondi na hora porque estava dormindo. Quando acordei, havia 340 novos usuários.",
      momentOfReckoning:
        "Quando percebi que havia deixado um PR de um colaborador sem resposta por dois meses. Ele havia corrigido um bug real. Me senti mal por uma semana. Mas não o suficiente para reabrir o projeto.",
      symptoms: [
        "Electron tornando o desenvolvimento penoso a cada nova feature",
        "Prazer em construir diminuindo visivelmente a cada semana",
        "PRs e issues acumulando sem resposta por semanas",
        "Figma melhorando a assets library nativa — caso de uso mais comum coberto",
        "Zero motivação para resolver bugs que eu mesmo conseguia reproduzir",
      ],
      dreams: [
        "Versão web como browser extension — sem Electron",
        "Plugin oficial para VS Code e Figma",
        "Sincronização de bibliotecas de ícones entre times",
        "Suporte a Lottie e SVGs animados",
      ],
      farewellLetter:
        "Glyph, você foi um projeto que funcionou. Essa é sua tragédia — e a minha. Você tinha usuários. Você tinha impacto mensurável. Mas a stack que escolhi para construí-lo me drenou de qualquer prazer. Aprendi que escolher uma tecnologia que você não gosta — mesmo que seja a 'escolha correta' — é uma sentença de abandono lenta. O pacote NPM que sobreviveu tem mais impacto hoje do que o app inteiro. 800 downloads por semana sem que eu mova um dedo é mais do que muitos projetos 'ativos' conseguem.",
      tags: {
        connectOrCreate: [
          { where: { name: "desktop" }, create: { name: "desktop" } },
          { where: { name: "svg" }, create: { name: "svg" } },
          { where: { name: "design-tools" }, create: { name: "design-tools" } },
          { where: { name: "electron" }, create: { name: "electron" } },
          { where: { name: "open-source" }, create: { name: "open-source" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Escolha de tecnologia é escolha de como você vai passar o tempo. Uma stack que não dá prazer vai matar o projeto assim que aparecer a primeira dificuldade não urgente.",
            category: "TECHNICAL",
            order: 1,
          },
          {
            body: "Extrair componentes como pacotes independentes pode gerar mais impacto do que o produto inteiro. O módulo SVG vivo prova isso.",
            category: "PROCESS",
            order: 2,
          },
          {
            body: "Não abandone um produto que funciona sem ao menos documentar o estado e transferi-lo. Usuários que confiam em você merecem uma transição.",
            category: "PERSONAL",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Glyph Web — processamento no browser",
            description:
              "Reimplementar como aplicação web com processamento no browser via WASM + SVGO. Zero Electron. Toda a funcionalidade, nenhuma da dor.",
            strategy: "PIVOT",
            feasibilityScore: 8,
          },
          {
            title: "SVG Pipeline — pacote NPM formalizado",
            description:
              "Documentar e lançar formalmente o pacote extraído com API pública estável, changelog e testes completos.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 9,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2021-07-15"),
            title: "45 minutos renomeando SVGs. 'Nunca mais.'",
            description:
              "Estava reorganizando assets de um cliente e gastei quase uma hora renomeando arquivos manualmente. O Glyph nasceu de raiva produtiva.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2022-01-10"),
            title: "2.100 downloads, zero anúncios",
            description:
              "O tweet do designer da Shopify gerou uma onda de instalações. Foi a melhor manhã do projeto. Também foi a última com energia.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2022-03-20"),
            title: "PR sem resposta por 6 semanas",
            description:
              "Um colaborador havia corrigido um bug real e aberto um PR cuidadoso. Não respondi. Não por descaso — por incapacidade de reabrir aquele ambiente.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2022-06-01"),
            title: "Último commit: 'chore: update readme'",
            description: "Sem drama. Sem aviso. O projeto simplesmente parou de receber atenção e nunca mais recebeu.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 4. Stratum ───────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "stratum",
      name: "Stratum",
      slogan: "O que seu conteúdo realmente gera",
      epitaph: "Provou que conteúdo converte. Não conseguiu converter a si mesmo.",
      type: "STARTUP",
      stage: "MVP",
      causeOfDeath: "TEAM_SPLIT",
      emotionalWeight: "HAUNTING",
      resurrectionPotential: "LOW",
      bornAt: new Date("2022-02-01"),
      diedAt: new Date("2023-01-15"),
      techStack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "Segment", "OpenAI API"],
      targetAudience:
        "Agências de conteúdo e times de marketing de startups B2B que queriam entender atribuição real de conteúdo no pipeline de vendas",
      hadRealUsers: true,
      userCount: 34,
      whatItWantedToBe:
        "Uma plataforma de analytics de atribuição de conteúdo para startups B2B — a resposta definitiva para 'qual artigo do blog gerou mais MRR?'. Não apenas page views ou tempo na página. O Stratum integrava com CRM, rastreamento de conversão e pipeline de vendas para mostrar o caminho real de um lead desde o primeiro artigo até o fechamento do contrato. O problema que todo CMO tinha e nenhuma ferramenta resolvia de verdade.",
      whatWentWrong:
        "Dois co-fundadores — amigos de faculdade, ex-companheiros de quarto por 5 anos. Dois meses antes da primeira demo enterprise (uma agência de 40 pessoas, contrato de U$2k/mês), o co-fundador recebeu uma oferta da Stripe. Tentou continuar meio período. Não funcionou. O produto ficou num limbo técnico, a demo foi cancelada e o projeto entrou em colapso silencioso.",
      whatStillWorks:
        "O modelo de atribuição multi-touch para conteúdo era tecnicamente sólido. Os conectores de CRM (HubSpot, Pipedrive) são reutilizáveis e bem testados.",
      whatWasRepurposed:
        "O conector HubSpot foi extraído como pacote open source e acumulou 200 stars no GitHub sem nenhuma divulgação ativa.",
      mostPromisingMoment:
        "Quando um cliente piloto disse: 'Acabei de mostrar esse dashboard para o CEO e ele aprovou o triplo do budget de conteúdo em 10 minutos. Vocês precisam de um depoimento?' Ficamos olhando um para o outro sem conseguir falar.",
      momentOfReckoning:
        "Quando Marcus ligou numa quarta às 19h — horário incomum para uma ligação sua — e disse: 'Recebi uma oferta da Stripe. É a oportunidade que esperava desde que comecei a programar. Não consigo recusar. Sinto muito.' Fiquei em silêncio. Não por raiva. Por genuína falta de palavras. Ao fundo da ligação dava pra ouvir o trânsito de onde ele estava. Depois de um minuto inteiro em silêncio, disse: 'Entendo.' Era tudo que tinha para dizer. Era verdade.",
      symptoms: [
        "Desenvolvimento congelado após saída do co-fundador técnico principal",
        "Impossível continuar solo com a complexidade de um produto B2B de dados",
        "Dois meses de trabalho de integração CRM sem revisão de código",
        "A motivação dependia da parceria tanto quanto do produto",
        "A demo mais importante da história do projeto cancelada por e-mail",
      ],
      dreams: [
        "Ser a ferramenta de analytics de conteúdo que toda agência B2B usaria",
        "100 agências pagantes até o final de 2023",
        "Integração com todos os CRMs relevantes do mercado",
        "Um dia ser adquirido pela HubSpot como feature nativa",
      ],
      farewellLetter:
        "Stratum, você era o produto em que mais acreditei que resolveria um problema sério. Não morreu por falta de mercado — três clientes piloto pagando U$500/mês sem produto completo provam que o mercado existia. Não morreu por falta de tecnologia — os conectores de CRM eram sólidos. Morreu porque a amizade que te construiu era estruturalmente necessária ao projeto, e amizades não podem ser escritas em acordo de cofundador. Marcus não errou em aceitar a Stripe. Eu não errei em não conseguir continuar sozinho. Às vezes projetos morrem de circunstância, não de falha — e a dor específica disso é não ter ninguém para culpar. O pior não foi perder o produto. Foi passar 8 meses sem falar com o melhor programador que já conheci. Quando voltamos a falar — uma mensagem às 11 da manhã de uma terça qualquer —, foi o suficiente para lembrar por que construímos o Stratum em primeiro lugar. O projeto morreu. A amizade não.",
      tags: {
        connectOrCreate: [
          { where: { name: "b2b" }, create: { name: "b2b" } },
          { where: { name: "analytics" }, create: { name: "analytics" } },
          { where: { name: "content-marketing" }, create: { name: "content-marketing" } },
          { where: { name: "startup" }, create: { name: "startup" } },
          { where: { name: "attribution" }, create: { name: "attribution" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Co-fundadores precisam de acordos escritos sobre o que acontece quando um deles recebe uma oportunidade irrecusável. Esse cenário é provável, não hipotético.",
            category: "BUSINESS",
            order: 1,
          },
          {
            body: "Dependência emocional de uma parceria é risco de negócio documentável. O produto que só existe enquanto a relação existe é estruturalmente frágil.",
            category: "PERSONAL",
            order: 2,
          },
          {
            body: "3 clientes piloto ativos pagando antes do MVP completo é sinal inequívoco de mercado real. Esse ponto de dor existia.",
            category: "BUSINESS",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Stratum API — conectores CRM como serviço",
            description:
              "Apenas os conectores CRM como API. Zero dashboard. Stripe-like para atribuição de conteúdo. Mais simples, mais focado, mais vendável.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 7,
          },
          {
            title: "HubSpot Attribution App",
            description:
              "Publicar no HubSpot Marketplace como app nativo com o subconjunto mais valioso do modelo de atribuição.",
            strategy: "PIVOT",
            feasibilityScore: 6,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2022-02-01"),
            title: "A conversa no café",
            description:
              "Marcus e eu reclamando de analytics de conteúdo durante um almoço: 'Por que ninguém resolve isso de verdade?' Saímos com o nome e o wireframe rabiscado no guardanapo.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2022-08-15"),
            title: "Primeiro cliente piloto paga U$500/mês",
            description:
              "Sem produto completo. Apenas uma integração funcional e um dashboard feio. Eles pagaram mesmo assim. Era o sinal que precisávamos.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2022-11-20"),
            title: "A ligação do Marcus",
            description:
              "'Recebi uma oferta da Stripe. Não consigo recusar.' Dois anos de amizade condensados em cinco minutos de silêncio no telefone.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2023-01-15"),
            title: "Último servidor desligado",
            description:
              "Sem cerimônia. Os 3 clientes piloto receberam um e-mail de encerramento com 30 dias de aviso.",
            eventType: "DEATH",
            order: 4,
          },
          {
            date: new Date("2023-09-01"),
            title: "Os dois voltam a falar",
            description:
              "Oito meses de silêncio quebrados por uma mensagem: 'Saudades de trabalhar contigo.' O projeto morreu. A amizade não.",
            eventType: "AFTERMATH",
            order: 5,
          },
        ],
      },
    },
  });

  // ─── 5. Kindling ──────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "kindling",
      name: "Kindling",
      slogan: "Construa em público. Com quem entende.",
      epitaph: "Acendeu faíscas em 200 pessoas. A última que apagou foi a do fundador.",
      type: "COMMUNITY",
      stage: "LAUNCHED",
      causeOfDeath: "BURNOUT",
      emotionalWeight: "HEAVY",
      resurrectionPotential: "NONE",
      bornAt: new Date("2022-01-10"),
      diedAt: new Date("2022-12-31"),
      techStack: ["Discourse", "Next.js", "Ghost", "Stripe", "Loom", "Notion", "Circle"],
      targetAudience:
        "Desenvolvedores e designers construindo seu primeiro produto independente, que precisavam de estrutura e comunidade real",
      hadRealUsers: true,
      userCount: 210,
      whatItWantedToBe:
        "Uma comunidade paga (U$15/mês) para pessoas construindo produtos independentes pela primeira vez. Não um fórum genérico — tinha estrutura deliberada: mentoria pareada por estágio de projeto, uma sessão semanal ao vivo de 'build in public' com critique coletivo, templates de product spec, roadmap review e office hours mensais com fundadores que tinham produtos maduros. O diferencial era qualidade curada sobre crescimento.",
      whatWentWrong:
        "210 membros pagantes geravam U$3.150/mês. Parecia sustentável. Mas gerenciar qualidade para 210 pessoas — moderação, pareamento, conteúdo semanal, sessões ao vivo, suporte individual — exigia 30 horas semanais além do emprego principal. Em dezembro, o burnout chegou sem aviso. Cancelei tudo em um e-mail de domingo à noite e nunca olhei para trás.",
      whatStillWorks:
        "O template de product spec ainda é o documento mais compartilhado que produzi. A estrutura de pareamento de mentoria por estágio de projeto era genuinamente escalável se tivesse co-moderadores.",
      whatWasRepurposed:
        "Os templates viraram uma coleção gratuita no Gumroad. Geraram 3× mais receita total do que a comunidade inteira — sem nenhum esforço de manutenção.",
      mostPromisingMoment:
        "Quando um membro postou que havia feito U$1.200 no primeiro mês do produto que começou a construir dentro da comunidade. A thread teve 47 respostas. Foi o melhor dia da Kindling. E, olhando em retrospecto, também foi quando o peso começou.",
      momentOfReckoning:
        "Um domingo às 23h. Abrindo o Notion de planejamento semanal da comunidade e não conseguindo escrever uma palavra. Nenhuma. Por duas horas. Fechei o laptop e escrevi o e-mail de encerramento às 23h50.",
      symptoms: [
        "Síndrome do fundador-produto: minha ausência era o produto desaparecendo",
        "Conteúdo semanal de qualidade dependia exclusivamente da minha energia",
        "Cada novo membro criava responsabilidade sem criar capacidade",
        "U$3.150/mês com 30h/semana de trabalho = U$26/hora — menos que freelance básico",
        "Sem co-fundador nem moderador remunerado para distribuir a carga",
      ],
      dreams: [
        "1.000 membros pagantes até 2023",
        "Programa de alumni com portfólio público de produtos lançados",
        "Livro co-escrito com a comunidade sobre o que aprendemos juntos",
        "Versão gratuita como porta de entrada para o ecossistema",
      ],
      farewellLetter:
        "Kindling, você foi meu maior sucesso e meu maior fracasso simultâneos — e a parte mais difícil é que ambos eram a mesma coisa. 210 pessoas pagando todo mês eram a prova de que eu havia criado algo real. Eram também 210 pessoas que confiaram em mim para um espaço que anunciei como sustentável, sem ter checado se era. Quando escrevi o e-mail de encerramento — 12 linhas, domingo às 23h50, sozinho na frente do computador —, tentei não tornar dramático: 'Não estou conseguindo manter a qualidade que vocês merecem.' Verdade objetiva. As respostas que chegaram na manhã seguinte quebraram alguma coisa. Uma disse que a comunidade havia mudado sua trajetória de carreira. Li esse e-mail três vezes. Não chorei de orgulho — chorei de culpa, porque se houvesse um único co-moderador, você estaria vivo. E eu sabia disso antes de precisar. Aprendi que comunidade não é produto — é responsabilidade contínua. E responsabilidade sem suporte não é dedicação. É apenas esgotamento com boa intenção como desculpa.",
      tags: {
        connectOrCreate: [
          { where: { name: "community" }, create: { name: "community" } },
          { where: { name: "education" }, create: { name: "education" } },
          { where: { name: "indie-maker" }, create: { name: "indie-maker" } },
          { where: { name: "burnout" }, create: { name: "burnout" } },
          { where: { name: "paid-community" }, create: { name: "paid-community" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Comunidades pagas onde a qualidade depende de uma única pessoa são produtos frágeis. Planeje moderação e delegação antes de crescer, não depois.",
            category: "PROCESS",
            order: 1,
          },
          {
            body: "U$3.150/mês com 30h/semana de trabalho é U$26/hora antes de impostos. O modelo econômico precisa ser calculado em tempo real antes de escalar.",
            category: "BUSINESS",
            order: 2,
          },
          {
            body: "Ter um plano de saída ou transferência antes de atingir escala não é pessimismo — é responsabilidade ética com membros pagantes.",
            category: "PERSONAL",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Kindling Templates — produtos isolados",
            description:
              "Vender apenas os templates e frameworks como produtos digitais independentes. Sem comunidade, sem manutenção contínua, sem burnout.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 9,
          },
          {
            title: "Kindling Async — sem sessões ao vivo",
            description:
              "Versão 100% assíncrona com moderadores contratados por hora. Escalável. O fundador como curador, não como âncora.",
            strategy: "PIVOT",
            feasibilityScore: 6,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2022-01-10"),
            title: "Primeiro post de lançamento",
            description:
              "Um tweet de 4 parágrafos sobre o que seria a Kindling. 80 respostas. 45 pessoas na lista de espera no mesmo dia. Deveria ter sido um sinal de alerta.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2022-04-20"),
            title: "100 membros pagantes",
            description:
              "Em 3 meses. Sem anúncios. O produto que eu queria que existisse quando comecei claramente fazia falta para outras pessoas também.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2022-10-01"),
            title: "210 membros. O peso começa silenciosamente.",
            description:
              "No papel, era o melhor momento. Na prática, as sessões ao vivo passaram a parecer uma obrigação. Mas ainda não tinha linguagem para nomear isso.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2022-12-31"),
            title: "E-mail de encerramento às 23h de domingo",
            description:
              "Doze linhas. Sem drama. Sem explicação longa. 'Não estou conseguindo manter a qualidade que vocês merecem.' Enviei e fechei o computador.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 6. Tempo ─────────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "tempo",
      name: "Tempo",
      slogan: "Saiba onde vai o seu tempo. Mesmo que doa.",
      epitaph: "Sabia exatamente onde o tempo foi embora. Exceto o dele próprio.",
      type: "MICRO_SAAS",
      stage: "MVP",
      causeOfDeath: "WRONG_TECH",
      emotionalWeight: "BITTERSWEET",
      resurrectionPotential: "HIGH",
      bornAt: new Date("2021-11-01"),
      diedAt: new Date("2022-08-20"),
      techStack: ["Electron", "React", "TypeScript", "SQLite", "Node.js", "Chart.js"],
      targetAudience:
        "Freelancers e criadores que queriam entender seus padrões de energia e produtividade — não apenas contabilizar horas",
      hadRealUsers: true,
      userCount: 89,
      whatItWantedToBe:
        "Um time tracker com personalidade. Não apenas horas logadas — contexto completo. A cada sessão de trabalho, você indicava nível de energia (1–5), estado emocional (uma palavra) e tipo de trabalho (deep, shallow, admin, criativo). O app gerava relatórios semanais reais: 'Você é 3× mais produtivo em deep work às terças de manhã' ou 'Tarefas administrativas depois das 18h têm o seu pior humor médio de semana'. Não era motivacional. Era clínico. A ideia era que dados honestos sobre quando você funciona são mais úteis do que qualquer framework de produtividade — porque são seus, não do autor de um livro. Você para de culpar a falta de disciplina e começa a entender a arquitetura real do seu próprio rendimento.",
      whatWentWrong:
        "Electron. O app pesava 180MB, consumia memória constantemente em background e drenava a bateria de MacBooks a uma taxa que chegou às reclamações de usuários em três semanas. O conceito era amado pelos 89 usuários que permaneceram. A implementação era odiada. Várias pessoas desinstalaram por performance — não por falta de interesse no produto.",
      whatStillWorks:
        "O modelo de dados de energia e contexto é sólido. Os algoritmos de detecção de padrões de produtividade são genuínos e funcionam. A ideia funciona — apenas a stack escolhida não.",
      whatWasRepurposed:
        "A lógica de detecção de padrões de produtividade foi portada para um script Python pessoal que ainda uso toda semana para planejar o dia seguinte.",
      mostPromisingMoment:
        "Quando um usuário mostrou um relatório do Tempo para seu gestor e conseguiu reorganizar seus horários de reunião. 'Esse dashboard valeu mais do que três meses de 1:1s sobre produtividade.'",
      momentOfReckoning:
        "Quando o terceiro usuário em uma única semana reclamou que o Tempo estava drenando a bateria do MacBook. Abri o Activity Monitor: 8% de CPU em idle. O produto que devia ser invisível era o mais visível de todos.",
      symptoms: [
        "Performance de Electron inaceitável para uma ferramenta que roda em background contínuo",
        "Usuários desinstalando por problema de stack, não por falta de valor percebido",
        "Reescrever a stack significava refazer 80% do produto",
        "A proposta central — 'roda em background sempre' — era incompatível com a tecnologia escolhida",
      ],
      dreams: [
        "Ser o RescueTime que você realmente quer usar e recomendar",
        "5.000 usuários pagantes a U$6/mês",
        "Integração com calendários para correlação automática de reuniões e energia",
        "Feature de 'retrospectiva de carreira' com meses de dados acumulados",
      ],
      farewellLetter:
        "Tempo, você nasceu de uma planilha de um ano que eu mantive por pura teimosia. Toda manhã, antes de começar: data, hora, nível de energia de 1 a 5, tipo de trabalho planejado. Toda noite: o que realmente aconteceu. Doze meses disso me mostraram padrões que nenhum coach de produtividade jamais conseguiria dizer sobre mim — porque eram meus, não genéricos. O insight era real. A ideia era real. O problema foi que escolhi Electron porque era o que eu sabia — não porque era correto. Para um app que precisava ser mais invisível que o relógio no menu bar, escolhi a stack mais pesada do ecossistema. 180MB. 8% de CPU em idle. As pessoas não desinstalavam por falta de valor. Desinstalavam por amor à bateria do MacBook. A próxima versão — quando existir — começa em Swift. 3MB. Zero drag. A ideia merece uma stack que não a contradiga.",
      tags: {
        connectOrCreate: [
          { where: { name: "productivity" }, create: { name: "productivity" } },
          { where: { name: "time-tracking" }, create: { name: "time-tracking" } },
          { where: { name: "electron" }, create: { name: "electron" } },
          { where: { name: "desktop" }, create: { name: "desktop" } },
          { where: { name: "wellness" }, create: { name: "wellness" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Para apps que rodam em background contínuo, Electron é uma escolha que compromete o produto. A stack precisa ser escolhida pelo padrão de uso, não pela familiaridade do desenvolvedor.",
            category: "TECHNICAL",
            order: 1,
          },
          {
            body: "89 usuários que amam o conceito mas odeiam a implementação é um sinal claro: o produto precisa existir — mas não desta forma. A reescrita é o investimento correto.",
            category: "PROCESS",
            order: 2,
          },
          {
            body: "Validar a stack com um prototype de performance antes de construir o produto real teria evitado o problema inteiro.",
            category: "TECHNICAL",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Tempo Web — PWA com background tracking",
            description:
              "Reimplementar como Progressive Web App com Service Worker para tracking em background. Zero Electron. Mesma ideia, stack correta.",
            strategy: "PIVOT",
            feasibilityScore: 8,
          },
          {
            title: "Tempo macOS nativo",
            description:
              "App nativa em Swift/SwiftUI integrada ao menu bar. 5MB. Sem impacto de bateria. O produto que o Tempo queria ser.",
            strategy: "PIVOT",
            feasibilityScore: 6,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2021-11-01"),
            title: "Um ano de planilha manual revelou os padrões",
            description:
              "Depois de 12 meses rastreando manualmente energia e tipo de trabalho em uma planilha, os padrões eram claros demais para não virar produto.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2022-02-15"),
            title: "89 usuários via Product Hunt",
            description:
              "Lançou como '#3 Product of the Day'. Os reviews elogiavam o conceito. Nenhum mencionou performance ainda.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2022-05-10"),
            title: "Primeira reclamação de bateria",
            description: "Achei que era um caso isolado. Não era. Em 3 semanas, havia 11 reports similares no GitHub.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2022-08-20"),
            title: "Última release. O peso ficou.",
            description:
              "Parei de desenvolver sem anunciar. O app continua instalado no meu Mac — como lembrete de que a ideia ainda é boa.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 7. Meridian ──────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "meridian",
      name: "Meridian",
      slogan: "Geodados que finalmente fazem sentido em TypeScript",
      epitaph: "Carregou 3.000 projetos nos ombros. Nenhum ajudou quando caiu.",
      type: "LIBRARY",
      stage: "BETA",
      causeOfDeath: "TECHNICAL_DEBT",
      emotionalWeight: "NOSTALGIC",
      resurrectionPotential: "MEDIUM",
      bornAt: new Date("2020-06-01"),
      diedAt: new Date("2023-07-01"),
      techStack: ["TypeScript", "Node.js", "Jest", "Rollup", "NPM", "GitHub Actions"],
      targetAudience:
        "Desenvolvedores TypeScript construindo aplicações com dados geográficos — mapas, logística, geofencing, análise espacial",
      hadRealUsers: true,
      userCount: 3200,
      whatItWantedToBe:
        "Uma biblioteca TypeScript tipo-safe para manipulação de dados geográficos em Node.js: projeções cartográficas, cálculos de distância geodésica, manipulação de GeoJSON, geração de map tiles, geofencing e clustering de pontos. O ecossistema geo em TypeScript era uma bagunça de wrappers mal tipados de bibliotecas C que vazavam `any` por toda a base de código. O Meridian queria ser o que deveria ter existido desde o início.",
      whatWentWrong:
        "Construído antes do TypeScript 4.7, com um sistema de tipos genéricos que fazia sentido em 2020 e se tornou um labirinto em 2022. Quando o TypeScript 5.0 chegou com melhorias incompatíveis nos tipos condicionais, migrar o Meridian exigiria reescrever 60% das assinaturas públicas — uma breaking change total em uma biblioteca com 3.200 downloads semanais. Nunca encontrei o bloco de tempo necessário para a v2.",
      whatStillWorks:
        "Os algoritmos de projeção e cálculo geodésico são matematicamente corretos e testados com 94% de cobertura. Fórmulas geográficas não envelhecem.",
      whatWasRepurposed:
        "A suite de testes geográficos — com fixtures de coordenadas de borda, casos polares e anti-meridianos — virou um conjunto de dados públicos que outros projetos ainda importam.",
      mostPromisingMoment:
        "Uma issue aberta por um engenheiro da Uber: 'Usamos o Meridian em produção para cálculos de rota de fallback. Isso é crítico para nós. Obrigado por manter o projeto.' Fiz screenshot. Ainda é o wallpaper do computador.",
      momentOfReckoning:
        "Quando abri as release notes do TypeScript 5.0 e entendi o que significava para o sistema de tipos do Meridian. Fechei o browser. Não voltei ao repositório por 3 meses.",
      symptoms: [
        "TypeScript 5.0 quebrou silenciosamente as garantias de tipo nas assinaturas existentes",
        "3 issues abertas sobre tipos incorretos que eram válidos no TS4",
        "Reescrita necessária era maior em escopo que o projeto original",
        "Energia para manutenção declinando enquanto a dívida técnica crescia",
        "Cada PR de contribuidor revelava mais inconsistências de tipo",
      ],
      dreams: [
        "Ser o padrão de fato para geodados em TypeScript — a resposta óbvia no Stack Overflow",
        "Suporte a WebAssembly para cálculos de alta performance",
        "Bindings para Rust para operações espaciais críticas",
        "Uma fundação open source para garantir manutenção de longo prazo",
      ],
      farewellLetter:
        "Meridian, você foi o projeto mais rigoroso que escrevi — no sentido literal: cada função tinha asserção de tipo, cada caso de borda estava testado, cada cálculo geodésico foi verificado contra tabelas de referência reais. Eu me orgulhava da sua precisão. A ironia é que foi exatamente essa precisão que te matou: um sistema de tipos cuidadosamente construído para TypeScript 4 se tornou incompatível com TypeScript 5 de formas que só um refactor total corrigiria. 3.200 projetos por semana dependiam de você. Um deles era da Uber. Abro aquela issue do engenheiro da Uber às vezes — ainda é o wallpaper do computador. Não por orgulho. Por memento: para lembrar que infraestrutura que você cria e não mantém é um acordo que você fez e não conseguiu honrar. A suite de testes é a herança. Os algoritmos continuam corretos. Quem construir a v2 herda a parte boa.",
      tags: {
        connectOrCreate: [
          { where: { name: "library" }, create: { name: "library" } },
          { where: { name: "typescript" }, create: { name: "typescript" } },
          { where: { name: "geo" }, create: { name: "geo" } },
          { where: { name: "open-source" }, create: { name: "open-source" } },
          { where: { name: "npm" }, create: { name: "npm" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Bibliotecas públicas com usuários reais são infraestrutura. Infraestrutura sem plano de manutenção de longo prazo é um risco para todos que dependem dela.",
            category: "PROCESS",
            order: 1,
          },
          {
            body: "Dívida técnica em tipos TypeScript é particularmente traiçoeira: o produto 'funciona' perfeitamente até o dia em que o compilador atualiza.",
            category: "TECHNICAL",
            order: 2,
          },
          {
            body: "Uma issue de gratidão de um engenheiro de empresa grande não é apenas uma mensagem — é evidência de valor de infraestrutura. Isso justifica um plano de sustentabilidade.",
            category: "BUSINESS",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Meridian v2 — reescrita com TypeScript 5+ em mente",
            description:
              "Reescrita completa com API mais simples, sem os tipos genéricos complexos que causaram o problema. Oportunidade de simplificar 40% da API pública.",
            strategy: "REVIVAL",
            feasibilityScore: 7,
          },
          {
            title: "Geo Algorithms — só as fórmulas",
            description:
              "Publicar apenas os algoritmos matemáticos como módulo zero-dependência. Sem tipos complexos. Só funções puras testadas. Útil hoje, agora.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 9,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2020-06-01"),
            title: "Farto de `any` em wrappers de bibliotecas geo",
            description:
              "Depois de uma semana debugando um erro silencioso causado por um wrapper GeoJSON mal tipado, escrevi o primeiro módulo do Meridian em raiva.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2021-09-15"),
            title: "3.000 downloads semanais",
            description:
              "Sem marketing. Só via recomendações em fóruns de TypeScript e Stack Overflow. O problema era real e havia mercado.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2022-11-01"),
            title: "Issue crítica da Uber",
            description:
              "'Usamos isso em produção.' A issue mais importante que já recebi. E a que mais pesou quando decidi parar.",
            eventType: "NEAR_MISS",
            order: 3,
          },
          {
            date: new Date("2023-03-10"),
            title: "TypeScript 5.0 — o dia que a dívida venceu",
            description:
              "As novas features de tipos condicionais tornaram o sistema de tipos do Meridian tecnicamente inconsistente. A reescrita necessária era maior que o projeto original.",
            eventType: "SETBACK",
            order: 4,
          },
          {
            date: new Date("2023-07-01"),
            title: "Último commit de manutenção",
            description:
              "Uma atualização de dependência de segurança. Não foi planejado como o último. Simplesmente foi.",
            eventType: "DEATH",
            order: 5,
          },
        ],
      },
    },
  });

  // ─── 8. Prism ─────────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "prism",
      name: "Prism",
      slogan: "Cor como linguagem, não como decoração",
      epitaph: "Tinha a teoria toda certa. Faltou o primeiro botão.",
      type: "DESIGN_PROJECT",
      stage: "PROTOTYPE",
      causeOfDeath: "SCOPE_CREEP",
      emotionalWeight: "NOSTALGIC",
      resurrectionPotential: "LOW",
      bornAt: new Date("2021-05-01"),
      diedAt: new Date("2023-02-01"),
      techStack: ["Figma", "Tokens Studio", "Style Dictionary", "React", "Storybook", "TypeScript"],
      targetAudience:
        "Times de design de produto que queriam um sistema de cores com semântica real, auditável e com acessibilidade gerada automaticamente",
      hadRealUsers: false,
      whatItWantedToBe:
        "Um sistema de design open source com uma filosofia radical sobre cor: cada decisão de cor é uma decisão de comunicação, não de estética. O Prism não definia cores por valor hexadecimal — definia por contexto semântico: 'ação primária', 'estado de atenção urgente', 'superfície de conteúdo colaborativo'. Com suporte a tema escuro, alto contraste e variantes de acessibilidade geradas automaticamente a partir da intenção semântica, sem trabalho manual.",
      whatWentWrong:
        "O projeto se tornou uma pesquisa de design theory que gerou um documento de 87 páginas e zero componentes funcionais. A cada semana, o escopo da 'filosofia de cor' crescia. Quando finalmente tentei implementar o primeiro componente real, o design system já tinha regras que o próprio componente violava. Dois anos. 87 páginas. Zero pacotes NPM.",
      whatStillWorks:
        "O documento de sistema semântico de cores é genuinamente bom — algumas empresas que conheço usaram partes como referência interna. O modelo de tokens semânticos foi adotado na íntegra por um cliente freelance.",
      whatWasRepurposed:
        "O sistema de tokens semânticos foi adaptado para o sistema de design de um cliente freelance. Ele adotou a filosofia inteira, pagou bem e lançou o produto. O Prism vive no produto de outra pessoa.",
      mostPromisingMoment:
        "Quando mostrei o documento de 87 páginas para o design lead da empresa onde eu freelancava e ele disse: 'Isso é exatamente o argumento que precisava para convencer o board de que precisamos de um design system. Posso usar partes?' Eu disse sim. Nunca terminei o meu próprio.",
      momentOfReckoning:
        "Quando tentei implementar o componente Button e percebi que as regras de hover state que havia criado violavam a filosofia de cor semântica do documento. A teoria era internamente inconsistente. Fechei o Figma.",
      symptoms: [
        "Documento de teoria crescendo enquanto o código ficava perpetuamente 'para depois'",
        "Cada nova regra de design invalidava decisões anteriores de implementação",
        "A perfeição do sistema tornava qualquer implementação 'insuficiente para o padrão'",
        "Dois anos sem um único componente publicável",
        "Adicionando regras de acessibilidade sem ter testado nenhum componente real",
      ],
      dreams: [
        "Ser o design system que designers citariam em manifestos e artigos",
        "Influenciar como times de produto pensam sobre cor como comunicação",
        "Uma talk no Config (conferência do Figma) sobre design systems semânticos",
        "Open source com 1.000 stars em 6 meses após lançamento",
      ],
      farewellLetter:
        "Prism, você foi meu projeto mais intelectualmente honesto — e o mais intelectualmente covarde. Honesto porque cada página do documento refletia o que eu genuinamente acreditava sobre cor como linguagem de comunicação. Covarde porque cada nova página era uma razão perfeitamente válida para adiar o componente. 'Preciso resolver primeiro a semântica do estado desabilitado.' 'Preciso entender alto contraste antes de implementar.' Vinte e um meses de razões honestas para não construir nada. Quando o design lead disse que ia usar o documento para convencer o board deles, senti orgulho e vergonha ao mesmo tempo — orgulho do que escrevi, vergonha de que a versão real nunca veio acompanhar. Aprendi que em design systems, teoria sem implementação não é fundação — é procrastinação bem documentada. O documento existe. Outras pessoas o aplicaram melhor do que eu. Talvez seja o legado que um projeto chamado Prism mereça.",
      tags: {
        connectOrCreate: [
          { where: { name: "design-system" }, create: { name: "design-system" } },
          { where: { name: "color-theory" }, create: { name: "color-theory" } },
          { where: { name: "figma" }, create: { name: "figma" } },
          { where: { name: "tokens" }, create: { name: "tokens" } },
          { where: { name: "accessibility" }, create: { name: "accessibility" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Design systems precisam crescer de componentes reais para abstrações — não o contrário. Construir a teoria antes do primeiro componente é garantia de paralisação.",
            category: "PROCESS",
            order: 1,
          },
          {
            body: "Perfeccionismo em sistemas de design é particularmente perigoso: o sistema perfeito que não existe é pior do que o sistema imperfeito que está em produção.",
            category: "PERSONAL",
            order: 2,
          },
          {
            body: "Um documento técnico bem escrito e compartilhado pode ter mais impacto do que o produto que nunca existiu. Só não deixe a documentação ser o produto.",
            category: "GENERAL",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Prism Tokens — apenas os tokens semânticos",
            description:
              "Publicar somente o sistema de tokens semânticos como pacote Style Dictionary. Sem componentes, sem filosofia extensa. Apenas o que já está provado e funcional.",
            strategy: "COMPONENT_REUSE",
            feasibilityScore: 8,
          },
          {
            title: "Prism Course — o documento como produto",
            description:
              "Transformar o documento de 87 páginas em um curso sobre sistemas de cor para times de produto. O conhecimento existe. Falta apenas o formato correto.",
            strategy: "TEACH_IT",
            feasibilityScore: 7,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2021-05-01"),
            title: "'Vou criar um design system diferente'",
            description:
              "Depois de usar o terceiro design system genérico e ainda precisar tomar 50 decisões de cor manualmente. A ideia era clara. O escopo, ainda não.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2021-12-01"),
            title: "50 páginas de documento. Zero componentes.",
            description:
              "A primeira revisão do documento estava linda. Não havia nenhum componente. Decidi que 'faltava mais teoria' antes de implementar.",
            eventType: "SETBACK",
            order: 2,
          },
          {
            date: new Date("2022-09-01"),
            title: "Design lead usa o documento em apresentação",
            description:
              "O momento mais próximo de impacto real. O trabalho foi útil para outra pessoa. Não para o meu produto.",
            eventType: "NEAR_MISS",
            order: 3,
          },
          {
            date: new Date("2023-02-01"),
            title: "Fechei o Figma pela última vez",
            description:
              "87 páginas. 21 meses. O documento estava ótimo. O sistema de design não existia. Encerrei sem cerimônia.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 9. Waypoint ──────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "waypoint",
      name: "Waypoint",
      slogan: "Sua vida tem uma geografia",
      epitaph: "Lembrava onde você esteve. Não conseguiu seguir para onde você foi.",
      type: "PERSONAL_APP",
      stage: "PROTOTYPE",
      causeOfDeath: "NO_TIME",
      emotionalWeight: "BITTERSWEET",
      resurrectionPotential: "MEDIUM",
      bornAt: new Date("2022-07-01"),
      diedAt: new Date("2023-05-10"),
      techStack: ["Swift", "SwiftUI", "CoreData", "MapKit", "CoreLocation"],
      targetAudience:
        "Pessoas que querem criar uma memória geográfica da própria vida — não check-ins sociais, mas diário privado vinculado a lugares reais",
      hadRealUsers: false,
      whatItWantedToBe:
        "Um app iOS de memórias geográficas — completamente privado, completamente local-first. Você passava por um lugar e o app perguntava discretamente: 'Quer guardar algo sobre aqui?' Uma linha, uma foto, dez segundos de áudio. Com o tempo, o mapa da sua cidade virava um atlas pessoal: cada marcador era uma história. Quando você voltava a um lugar, o app te mostrava o que havia sentido da última vez que esteve lá.",
      whatWentWrong:
        "Swift. Não tinha experiência anterior com o ecossistema iOS nativo. Cada semana aprendendo uma coisa nova que revelava mais três coisas desconhecidas. O ritmo era lento demais para um side project com tempo limitado. Quando um projeto crítico no trabalho consumiu os fins de semana por quatro meses seguidos, o Waypoint simplesmente parou — e cada pausa tornava o retorno tecnicamente mais custoso.",
      whatStillWorks:
        "A arquitetura de dados local-first com CoreData é sólida. O conceito de 'memória geográfica' privada ainda não foi construído por ninguém da forma que pensei — nenhum app existente chega perto.",
      whatWasRepurposed:
        "Nada ainda. O projeto dorme inteiro. O primeiro waypoint ainda está lá, no protótipo, esperando.",
      mostPromisingMoment:
        "O primeiro waypoint criado foi em um café em Lisboa que fechou 3 meses depois. A nota dizia: 'Aqui foi onde decidi pedir demissão do emprego antigo.' O app funcionou exatamente como deveria naquele momento.",
      momentOfReckoning:
        "Quando, após 4 meses sem abrir o Xcode, tentei compilar o projeto e havia 14 warnings de deprecação em APIs de SwiftUI que haviam mudado na versão nova. Estava mais longe do que quando parei.",
      symptoms: [
        "Curva de aprendizado de Swift + SwiftUI consumindo mais tempo do que a construção real",
        "Cada pausa criava uma barreira técnica de retorno crescente",
        "Trabalho principal absorvendo fins de semana de forma imprevisível",
        "Deprecações de SwiftUI tornando o código antigo cada vez mais distante do estado atual",
      ],
      dreams: [
        "Um atlas pessoal de cada cidade em que já vivi",
        "Feature de 'memórias desta semana n anos atrás' baseada em localização",
        "Versão compartilhável para casais ou famílias — a geografia de uma vida juntos",
        "Exportação como livro físico de memórias geográficas para presentear",
      ],
      farewellLetter:
        "Waypoint, você foi construído com um tipo específico de saudade — não da cidade, mas do bar de esquina que fechou, do café que existia numa rua que agora é diferente, do banco no parque onde uma conversa aconteceu e o banco ainda está lá mas a conversa sumiu. Esse tipo de saudade não tem nome fácil: a nostalgia de um lugar específico que carregou um momento que já não existe. Você era para ser uma coleção desses lugares — privados, sem likes, sem compartilhamento, só seus. O primeiro waypoint que criei ainda existe no protótipo: um café em Lisboa que fechou em novembro de 2022. A nota diz: 'Aqui foi onde decidi pedir demissão do emprego antigo.' O café não existe mais. O waypoint sim. Não consegui te terminar — mas às vezes me pergunto se essa é a versão mais fiel do que você queria ser.",
      tags: {
        connectOrCreate: [
          { where: { name: "ios" }, create: { name: "ios" } },
          { where: { name: "swift" }, create: { name: "swift" } },
          { where: { name: "location" }, create: { name: "location" } },
          { where: { name: "personal" }, create: { name: "personal" } },
          { where: { name: "local-first" }, create: { name: "local-first" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Aprender uma nova plataforma (iOS nativo) enquanto constrói um produto ambicioso é fazer duas apostas ao mesmo tempo. Uma delas vai perder.",
            category: "TECHNICAL",
            order: 1,
          },
          {
            body: "Projetos que dependem de contexto técnico específico (Swift/Xcode) são particularmente vulneráveis a interrupções. Cada pausa de semanas é uma barreira de retorno mensurável.",
            category: "PROCESS",
            order: 2,
          },
          {
            body: "O conceito mais único que já tive. Na próxima vez: proof of concept mínimo em uma stack conhecida antes de investir em uma plataforma nova.",
            category: "PERSONAL",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "Waypoint PWA — versão web com Geolocation API",
            description:
              "Reimplementar como web app progressiva com Geolocation API e storage local. Zero Swift. Acessível a mais desenvolvedores. Conceito intacto.",
            strategy: "PIVOT",
            feasibilityScore: 8,
          },
          {
            title: "Waypoint React Native",
            description:
              "Reescrever com React Native + Expo para aproveitar o conhecimento JavaScript existente e atingir iOS e Android simultaneamente.",
            strategy: "PIVOT",
            feasibilityScore: 7,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2022-07-01"),
            title: "Saudades de um café em Lisboa",
            description:
              "Morava em outro país e sentia falta de lugares específicos que só existiam na memória. 'Por que não há um app que guarda isso?'",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2022-10-15"),
            title: "Primeiro waypoint funcional criado",
            description:
              "O café em Lisboa. A decisão de pedir demissão. O app funcionou exatamente como deveria. Foi o melhor momento do projeto.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2023-01-01"),
            title: "Projeto no trabalho absorveu os fins de semana",
            description:
              "4 meses sem abrir o Xcode. Cada semana prometendo 'semana que vem retomo'. A promessa nunca virou ação.",
            eventType: "SETBACK",
            order: 3,
          },
          {
            date: new Date("2023-05-10"),
            title: "14 warnings de deprecação. O código dormiu.",
            description:
              "Tentei compilar depois de meses. 14 APIs depreciadas. Fechei o Xcode. O primeiro waypoint ainda está lá, intocado.",
            eventType: "DEATH",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── 10. Ossian ───────────────────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "ossian",
      name: "Ossian",
      slogan: "Memórias têm preço. Você decide qual pagar.",
      epitaph: "Escreveu 50.000 palavras de um mundo que nunca existiu. Esqueceu de fazer o jogo.",
      type: "GAME",
      stage: "SKETCH",
      causeOfDeath: "TOO_COMPLEX",
      emotionalWeight: "HAUNTING",
      resurrectionPotential: "LOW",
      bornAt: new Date("2020-03-01"),
      diedAt: new Date("2023-06-01"),
      techStack: ["Unity", "C#", "Blender", "FMOD", "Ink (Inkle Studios)"],
      targetAudience:
        "Jogadores de narrativa — Disco Elysium, Pentiment, 80 Days — que valorizam escolhas morais com consequências reais e irreversíveis",
      hadRealUsers: false,
      whatItWantedToBe:
        "Um jogo de aventura narrativa onde memórias eram moeda de troca. Você era um mercador de memórias em uma cidade construída sobre trocas mnemônicas: vendia recordações para sobreviver, comprava memórias de outros para navegar o mundo e entender seus segredos. O core mechanic era economia moral irreversível: quais memórias você está disposto a vender para avançar? Vender a memória do rosto da sua mãe te compra um mapa para a próxima cidade. Comprar a memória do último dia de alguém que morreu pode ser o único ato de preservação que resta naquele mundo. A parte cruel — e deliberada — era que você nunca sabia exatamente o que estava vendendo até depois de vender. Você sentia a ausência antes de conseguir nomear o que havia ido embora. Era um jogo sobre o preço da sobrevivência e sobre o que permanece quando você remove tudo o que não é essencial. Pelo menos era o que eu escrevia nos documentos.",
      whatWentWrong:
        "O projeto acumulou 50.000 palavras de worldbuilding, diálogos e lore em três anos. Zero cenas jogáveis. A complexidade do sistema de memórias exigia resolver problemas de game design que eram, na verdade, problemas filosóficos sem resposta: o que é identidade quando alguém vende as memórias que os definem? O jogo virou um problema de design que virou um projeto de escrita que nunca terminou de ser um jogo.",
      whatStillWorks:
        "O worldbuilding é genuíno e rico. Os diálogos escritos no Ink têm qualidade narrativa real. O conceito central do mercado de memórias ainda é um dos mais originais que já concebi.",
      whatWasRepurposed:
        "As 50.000 palavras revelaram que o criador é, na verdade, um escritor evitando escrever um romance. O projeto está dormindo enquanto o primeiro capítulo do livro começa.",
      mostPromisingMoment:
        "Quando mostrei a premissa para um game designer indie que havia lançado um jogo na Steam. Ele ficou em silêncio por quase um minuto. Depois disse: 'Isso é o tipo de ideia que assombra. Se você não terminar, vou pensar nessa premissa pelo resto da vida.'",
      momentOfReckoning:
        "Quando, relendo os documentos de lore, percebi que estava escrevendo ficção — não game design. E que era boa ficção. E que talvez o jogo nunca fosse o ponto. Fechei o Unity e abri o Word.",
      symptoms: [
        "Worldbuilding crescendo enquanto o protótipo jogável permanecia inexistente",
        "Cada decisão de mecânica revelava um problema filosófico não resolvido",
        "Três anos sem uma única build jogável — nem de paper prototype",
        "O processo de criação havia se tornado escrita, não desenvolvimento de jogo",
        "Cada semana surgindo uma nova camada de lore que 'precisava existir antes do jogo'",
      ],
      dreams: [
        "Ser o Disco Elysium do mercado de memórias — profundo, estranho e inesquecível",
        "Participar do Steam Next Fest com uma demo jogável de 30 minutos",
        "Uma trilha sonora procedural em FMOD baseada nas memórias que o jogador preservou",
        "Um final não-determinístico que reflete exatamente quem você se tornou ao jogar",
      ],
      farewellLetter:
        "Ossian, você foi o projeto que mais me assombrou. Literalmente: acordo às vezes pensando em como resolver o paradoxo de identidade do sistema de memórias. Três anos de escrita sobre um mundo que só existe em documentos. Mas aprendi algo que nenhum outro projeto me ensinou: às vezes o que você está criando não é o que você acha que está criando. Eu não estava fazendo um jogo. Estava evitando escrever um livro. Ossian me deu as 50.000 palavras do primeiro rascunho. Talvez você seja um romance disfarçado de jogo que nunca quis existir — e tudo bem. Obrigado pelo disfarce.",
      tags: {
        connectOrCreate: [
          { where: { name: "game" }, create: { name: "game" } },
          { where: { name: "narrative" }, create: { name: "narrative" } },
          { where: { name: "unity" }, create: { name: "unity" } },
          { where: { name: "worldbuilding" }, create: { name: "worldbuilding" } },
          { where: { name: "game-design" }, create: { name: "game-design" } },
        ],
      },
      lessons: {
        create: [
          {
            body: "Worldbuilding infinito sem um protótipo jogável é escrita criativa, não desenvolvimento de jogo. Os dois são legítimos — mas é crucial saber qual você está fazendo.",
            category: "PROCESS",
            order: 1,
          },
          {
            body: "Mecânicas de jogos narrativos precisam ser validadas com paper prototypes antes de qualquer linha de código ou página de lore.",
            category: "TECHNICAL",
            order: 2,
          },
          {
            body: "Às vezes o projeto que você está construindo é um disfarce para o projeto real que você está evitando. O trabalho verdadeiro é reconhecer isso mais cedo.",
            category: "PERSONAL",
            order: 3,
          },
        ],
      },
      reincarnationIdeas: {
        create: [
          {
            title: "O romance",
            description:
              "Escrever o livro que as 50.000 palavras apontam. O worldbuilding está completo. Os personagens existem. Falta apenas o formato correto.",
            strategy: "NEW_FORM",
            feasibilityScore: 8,
          },
          {
            title: "Ossian Demo — um único capítulo",
            description:
              "Um único capítulo jogável de 20 minutos, sem o sistema completo de memórias, apenas para validar se a premissa ressoa com jogadores reais antes de qualquer coisa.",
            strategy: "PIVOT",
            feasibilityScore: 5,
          },
        ],
      },
      timeline: {
        create: [
          {
            date: new Date("2020-03-01"),
            title: "'E se memórias fossem moeda?' — 3h da manhã, quarentena",
            description:
              "Primeira semana de lockdown. Sem dormir. A ideia chegou inteira, de uma vez. Parecia o projeto que eu havia nascido para fazer.",
            eventType: "BIRTH",
            order: 1,
          },
          {
            date: new Date("2020-12-15"),
            title: "Primeiro diálogo escrito no Ink",
            description:
              "O mercador encontra seu primeiro cliente. O diálogo é bom. Ainda é o melhor que escrevi. Fez tudo parecer possível.",
            eventType: "MILESTONE",
            order: 2,
          },
          {
            date: new Date("2021-08-01"),
            title: "O game designer diz 'isso assombra'",
            description:
              "A validação mais honesta que recebi. Também foi quando percebi que mostrar a premissa era mais fácil do que construir o jogo.",
            eventType: "NEAR_MISS",
            order: 3,
          },
          {
            date: new Date("2022-06-01"),
            title: "50.000 palavras. Zero builds.",
            description:
              "Contei o documento. 50.000 palavras de lore, diálogos, regras de mundo. Nenhuma cena jogável. Não consegui processar isso no dia.",
            eventType: "SETBACK",
            order: 4,
          },
          {
            date: new Date("2023-06-01"),
            title: "O projeto dormiu. O documento abriu.",
            description:
              "Fechei o Unity pela última vez. Abri um documento em branco intitulado 'Capítulo 1'. Talvez seja essa a reencarnação.",
            eventType: "DEATH",
            order: 5,
          },
        ],
      },
    },
  });

  console.log("✅  10 projetos mortos receberam um enterro digno.");
  console.log(`
  ⚰️  Registro Memorial:
  ──────────────────────────────────────────────────────
  1.  Nocturne     — MVP        — NO_MONEY         — 203 usuários
  2.  Candor       — BETA       — BETTER_ALT       —  47 usuários (8 times)
  3.  Glyph        — LAUNCHED   — LOST_INTEREST    — 2.100 downloads
  4.  Stratum      — MVP        — TEAM_SPLIT       —  34 usuários (3 pilotos)
  5.  Kindling     — LAUNCHED   — BURNOUT          — 210 membros
  6.  Tempo        — MVP        — WRONG_TECH       —  89 usuários
  7.  Meridian     — BETA       — TECHNICAL_DEBT   — 3.200 downloads/sem
  8.  Prism        — PROTOTYPE  — SCOPE_CREEP      —   0 usuários
  9.  Waypoint     — PROTOTYPE  — NO_TIME          —   0 usuários
  10. Ossian       — SKETCH     — TOO_COMPLEX      —   0 usuários
  ──────────────────────────────────────────────────────
  Total de projetos sepultados : 10
  Usuários / downloads afetados: ${203 + 47 + 2100 + 34 + 210 + 89 + 3200}
  Lições preservadas            : 30
  Ideias de reencarnação        : 20
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
