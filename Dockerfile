# imagem base para Node.js
FROM node:18-alpine

# diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copy dos arquivos de dependência para o contêiner
COPY package*.json ./

# Instalando as dependências
RUN npm install --production

# Copiando o restante do código
COPY . .

# Expondo a porta em que o servidor vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
