# LightSpark - Dashboard de Campanhas

Aplicação web para controle e visualização de campanhas de marketing digital.

## Requisitos

- Docker
- Docker Compose

## Como executar com Docker

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd lightspark
```

2. Inicie os contêineres usando Docker Compose:
```bash
docker-compose up -d
```

3. Acesse a aplicação no navegador:
```
http://localhost
```

4. Para parar os contêineres:
```bash
docker-compose down
```

## Serviços

- **Frontend**: Interface web que roda na porta 80
- **Backend**: API REST que roda na porta 3000

## CI/CD com GitHub Actions

O projeto está configurado com um pipeline de CI/CD utilizando GitHub Actions que:

1. **Testa**: Executa linting e testes automatizados no backend
2. **Constrói**: Cria as imagens Docker para frontend e backend
3. **Publica**: Envia as imagens para o Docker Hub (requer configuração de secrets)
4. **Implanta**: Prepara para implantação em ambiente de produção

### Configuração dos Secrets

Para que o pipeline funcione corretamente, adicione os seguintes secrets no seu repositório GitHub:

- `DOCKER_HUB_USERNAME`: Seu nome de usuário no Docker Hub
- `DOCKER_HUB_TOKEN`: Token de acesso ao Docker Hub

## Desenvolvimento

Para desenvolvimento local sem Docker:

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

3. Abra o arquivo `Frontend/index.html` diretamente no navegador 

### Desenvolvimento com Docker

Para desenvolvimento com Docker:

```bash
docker-compose up
```

Os arquivos são montados em volumes, permitindo editar o código sem reconstruir as imagens. 