# Guia de GitHub Actions para o Projeto LightSpark

Este documento explica em detalhes a configuração do GitHub Actions implementada no projeto LightSpark.

## Visão Geral do Pipeline CI/CD

O pipeline CI/CD configurado consiste em três etapas principais:

1. **Teste**
2. **Build e Push**
3. **Deploy**

## Detalhamento das Etapas

### 1. Teste (`test`)

Esta etapa executa testes automatizados no backend:

- **Checkout do código**: Obtém a versão mais recente do código
- **Configuração do Node.js**: Instala Node.js v18
- **Instalação de dependências**: Instala pacotes npm necessários para o backend
- **Linting**: Verifica a qualidade e consistência do código
- **Testes**: Executa os testes automatizados (quando configurados)

### 2. Build e Push (`build-and-push`)

Esta etapa cria e publica as imagens Docker:

- **Checkout do código**: Obtém a versão mais recente do código
- **Configuração do Docker Buildx**: Configura o ambiente de build para Docker
- **Login no Docker Hub**: Autentica com o Docker Hub usando credenciais seguras
- **Build e Push do Backend**: Cria e envia a imagem do backend para o Docker Hub
- **Build e Push do Frontend**: Cria e envia a imagem do frontend para o Docker Hub

### 3. Deploy (`deploy`)

Esta etapa está preparada para implantação:

- Atualmente, apenas exibe uma mensagem
- Deve ser personalizada para o seu ambiente específico de produção

## Configuração de Secrets

Para que o pipeline funcione corretamente, você precisa configurar os seguintes secrets no seu repositório GitHub:

1. **DOCKER_HUB_USERNAME**: Seu nome de usuário no Docker Hub
2. **DOCKER_HUB_TOKEN**: Um token de acesso pessoal do Docker Hub

### Como configurar os Secrets:

1. No GitHub, vá para o seu repositório
2. Clique em "Settings" > "Secrets and variables" > "Actions"
3. Clique em "New repository secret"
4. Adicione os secrets mencionados acima

## Personalização

### Como personalizar o deploy:

Edite a etapa `deploy` no arquivo `.github/workflows/main.yml` para incluir os comandos específicos do seu ambiente:

```yaml
deploy:
  needs: build-and-push
  runs-on: ubuntu-latest
  if: github.event_name == 'push'
  
  steps:
    - name: Deploy to production
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /caminho/para/aplicacao
          docker-compose pull
          docker-compose up -d
```

## Troubleshooting

Se o pipeline falhar em alguma etapa, verifique:

1. **Erros de linting**: O código pode precisar de correções para atender às regras do ESLint
2. **Falhas nos testes**: Verifique se os testes estão passando localmente
3. **Problemas de autenticação**: Confirme se os secrets do Docker Hub estão configurados corretamente
4. **Problemas de build**: Verifique se os Dockerfiles estão corretos e se o código pode ser construído localmente 