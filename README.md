# Petstore API Cypress Project

Estudo de automação com IA. Treinamento de prompts de comandos a partir de um BDD informado.
Automação de API para https://petstore.swagger.io/ usando Cypress e Faker.

## Instalação

1. `npm install`

## Executar testes

- `npm run cy:run` - executa todos os testes em modo headless
- `npm run cy:open` - abre a interface do Cypress

## Estrutura

- `cypress/e2e/` - casos de teste da API
- `cypress/support/` - comandos e suporte
- `cypress/evidences/` - evidências geradas automaticamente

## Evidências

A cada teste executado, uma captura de tela (.png) é gerada automaticamente contendo:
- Nome do teste
- Status code da resposta
- Corpo da resposta

As evidências são salvas em `cypress/evidences/` com nomes formatados como: `CCT_NomeDoCenário_DDMM.png`

Caso haja múltiplas execuções do mesmo cenário no mesmo dia, é adicionado `_2`, `_3`, etc. ao final do nome.

> Esses testes usam a API pública Swagger Petstore. O ambiente pode conter dados compartilhados de outros usuários.
