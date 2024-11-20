import React from 'react'

export default async function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Termos e Condições de Uso
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        <strong>Última atualização:</strong> 20 de novembro de 2024
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        1. Aceitação dos Termos
      </h2>
      <p className="mb-4">
        Ao acessar e utilizar o site Palpite Futebol Clube, você concorda
        integralmente com os presentes Termos e Condições de Uso. Caso não
        concorde, não utilize o site e suas funcionalidades.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        2. Definições
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Usuário:</strong> Qualquer pessoa que acesse ou utilize o
          site.
        </li>
        <li>
          <strong>Palpite Futebol Clube:</strong> Empresa responsável pela
          gestão do site.
        </li>
        <li>
          <strong>Serviços:</strong> Funcionalidades como palpites, enquetes,
          promoções e e-commerce.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        3. Regras de Utilização
      </h2>
      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        3.1. Cadastro
      </h3>
      <p className="mb-4">
        É necessário criar uma conta para acessar certas funcionalidades. O
        usuário é responsável por manter seus dados atualizados e a
        confidencialidade de sua senha.
      </p>

      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        3.2. Elegibilidade
      </h3>
      <p className="mb-4">
        Menores de 7 anos não podem criar contas. Usuários entre 7 e 14 anos
        devem apresentar autorização dos responsáveis.
      </p>

      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        3.3. Conduta do Usuário
      </h3>
      <p className="mb-4">
        É proibido usar o site para atividades ilegais ou que possam prejudicar
        seu funcionamento.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        4. Funcionalidades do Site
      </h2>
      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        4.1. Palpites
      </h3>
      <p className="mb-4">
        Palpites registrados não podem ser alterados após o prazo definido. A
        validação segue as regras de cada evento.
      </p>

      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        4.2. Bolões e Enquetes
      </h3>
      <p className="mb-4">
        É permitido convidar amigos para bolões e enquetes, respeitando as
        condições de uso.
      </p>

      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        4.3. E-commerce
      </h3>
      <p className="mb-4">
        Compras realizadas na &quot;Lojinha do Palpiteiro&quot; seguem as regras
        de devoluções aplicáveis no Brasil.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        5. Pagamentos e Assinaturas
      </h2>
      <p className="mb-4">
        A assinatura mensal custa R$ 9,99 e garante acesso a funcionalidades
        exclusivas e premiações. Pagamentos são processados por terceiros, e a
        assinatura pode ser cancelada a qualquer momento.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        6. Premiações
      </h2>
      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        6.1. Premiações Semanais
      </h3>
      <p className="mb-4">
        Contabilizadas de domingo a sábado, disponíveis apenas para assinantes.
      </p>

      <h3 className="text-xl font-semibold text-blue-500 mb-2">
        6.2. Premiação Mensal
      </h3>
      <p className="mb-4">
        Aberta a todos os usuários, com período de contagem de primeiro a último
        dia do mês.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        7. Política de Privacidade
      </h2>
      <p className="mb-4">
        O uso do site implica na aceitação da Política de Privacidade.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        8. Limitação de Responsabilidade
      </h2>
      <p className="mb-4">
        O site não se responsabiliza por falhas técnicas, erros causados por
        terceiros ou dados incorretos fornecidos pelo usuário.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        9. Alterações nos Termos
      </h2>
      <p className="mb-4">
        Alterações serão notificadas, e o uso contínuo após a publicação implica
        aceitação dos novos termos.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        10. Lei Aplicável e Foro
      </h2>
      <p className="mb-4">
        Estes Termos são regidos pela legislação brasileira. O foro competente é
        o da comarca de São Paulo.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">11. Contato</h2>
      <p className="mb-4">
        Em caso de dúvidas, entre em contato pelo e-mail:{' '}
        <a
          href="mailto:administrativo@palpitefutebolclube.com"
          className="text-blue-500 underline"
        >
          administrativo@palpitefutebolclube.com
        </a>
        .
      </p>
    </div>
  )
}
