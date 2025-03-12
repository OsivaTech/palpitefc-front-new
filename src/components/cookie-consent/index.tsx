'use client'

import { useEffect } from 'react'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'

export const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run({
      cookie: {
        name: 'cc_cookie',
        domain: location.hostname,
        expiresAfterDays: 182,
      },
      guiOptions: {
        consentModal: {
          layout: 'cloud inline',
          position: 'bottom center',
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
        ads: {},
      },
      language: {
        default: 'pt',
        translations: {
          pt: {
            consentModal: {
              title: 'Nós usamos cookies',
              description:
                'Utilizamos cookies para melhorar a sua experiência no nosso site, analisar o tráfego e personalizar o conteúdo. Ao continuar a navegar, você concorda com o uso de cookies.',
              acceptAllBtn: 'Aceitar todos',
              acceptNecessaryBtn: 'Rejeitar todos',
              showPreferencesBtn: 'Gerenciar preferências individuais',
              footer: `
                          <a href="/pt/terms" target="_blank">Termos de uso</a>
                          <a href="/pt/privacy-policies" target="_blank">Política de Privacidade</a>
                      `,
            },
            preferencesModal: {
              title: 'Gerenciar preferências de cookies',
              acceptAllBtn: 'Aceitar todos',
              acceptNecessaryBtn: 'Rejeitar todos',
              savePreferencesBtn: 'Aceitar seleção atual',
              closeIconLabel: 'Fechar modal',
              serviceCounterLabel: 'Serviço|Serviços',
              sections: [
                {
                  title: 'Suas escolhas de privacidade',
                  description: `Neste painel, você pode expressar algumas preferências relacionadas ao processamento de suas informações pessoais. Você pode revisar e alterar as escolhas expressas a qualquer momento, ressurgindo este painel através do link fornecido. Para negar seu consentimento às atividades de processamento específicas descritas abaixo, altere os botões para "desligado" ou use o botão "Rejeitar todos" e confirme que deseja salvar suas escolhas.`,
                },
                {
                  title: 'Estritamente Necessário',
                  description:
                    'Esses cookies são essenciais para o funcionamento adequado do site e não podem ser desativados.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Desempenho e Análise',
                  description:
                    'Esses cookies coletam informações sobre como você usa nosso site. Todos os dados são anonimizados e não podem ser usados para identificá-lo.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Publicidade e Segmentação',
                  description:
                    'Esses cookies são usados para tornar as mensagens publicitárias mais relevantes para você e seus interesses. A intenção é exibir anúncios que sejam relevantes e envolventes para o usuário individual e, portanto, mais valiosos para os editores e anunciantes terceiros.',
                  linkedCategory: 'ads',
                },
                {
                  title: 'Mais informações',
                  description:
                    'Para quaisquer dúvidas em relação à política de cookies e suas escolhas, por favor <a href="https://ig.me/m/palpitefutebolclube" target="_blank">entre em contato conosco</a>',
                },
              ],
            },
          },
        },
      },
    })
  }, [])

  return null
}
