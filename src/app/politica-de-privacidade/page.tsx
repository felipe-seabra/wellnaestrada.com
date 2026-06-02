import { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { Heading } from '@/components/shared/heading'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Well na Estrada',
  description:
    'Conheça nossa política de privacidade e como tratamos seus dados de acordo com a LGPD e GDPR.',
}

export default function PrivacyPolicyPage() {
  const lastUpdate = '02 de Junho de 2026'

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-24">
        <Container className="max-w-3xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <Heading level={1} className="text-4xl sm:text-5xl">
                Política de Privacidade
              </Heading>
              <p className="text-zinc-500 italic">
                Última atualização: {lastUpdate}
              </p>
            </div>

            <section className="prose prose-zinc max-w-none space-y-6 text-zinc-600 leading-relaxed text-lg">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  1. Quem Somos
                </h2>
                <p>
                  A <strong>Well na Estrada</strong> é uma consultoria
                  especializada em mentoria para intercâmbio e mudança de vida
                  para a Irlanda. Nosso compromisso é com a transparência e a
                  segurança dos dados de nossos mentorados e visitantes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  2. Dados que Coletamos
                </h2>
                <p>
                  Coletamos informações essenciais para o processo de
                  consultoria, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Dados de identificação (Nome, E-mail, WhatsApp) através de
                    nossos formulários.
                  </li>
                  <li>
                    Dados demográficos e de interesse para qualificação da
                    mentoria.
                  </li>
                  <li>
                    Dados de navegação e cookies para melhorar a experiência no
                    site.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  3. Finalidade da Coleta
                </h2>
                <p>Seus dados são utilizados exclusivamente para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Avaliar seu perfil para a mentoria de intercâmbio.</li>
                  <li>
                    Entrar em contato para agendamento de chamadas estratégicas.
                  </li>
                  <li>
                    Enviar comunicações relevantes sobre sua jornada de
                    intercâmbio.
                  </li>
                  <li>
                    Otimizar o desempenho e a relevância do nosso conteúdo.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  4. Uso do Formulário
                </h2>
                <p>
                  Ao preencher nosso formulário de aplicação, você declara estar
                  ciente de que entraremos em contato via WhatsApp ou E-mail
                  para dar continuidade ao processo de consultoria.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  5. Cookies e Analytics
                </h2>
                <p>
                  Utilizamos ferramentas de análise (como Google Analytics) para
                  entender como os usuários interagem com nosso site. Isso nos
                  ajuda a oferecer uma experiência mais fluida e personalizada.
                  Você pode gerenciar as preferências de cookies em seu
                  navegador.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  6. Armazenamento e Segurança
                </h2>
                <p>
                  Seus dados são armazenados em servidores seguros com
                  criptografia e acesso restrito apenas a membros autorizados da
                  equipe Well na Estrada. Não compartilhamos, vendemos ou
                  alugamos seus dados para terceiros.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  7. Seus Direitos (LGPD/GDPR)
                </h2>
                <p>Você tem o direito de solicitar a qualquer momento:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acesso aos seus dados sob nosso controle.</li>
                  <li>A correção de dados incompletos ou inexatos.</li>
                  <li>A remoção definitiva de seus dados de nossa base.</li>
                </ul>
                <p className="mt-4">
                  Para qualquer solicitação de privacidade, entre em contato
                  através do e-mail: <strong>contato@wellnaestrada.com</strong>.
                </p>
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
