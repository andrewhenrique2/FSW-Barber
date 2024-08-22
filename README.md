<div align="center">

# ✂️ FSW Barber 💈

**FSW Barber** é uma aplicação mobile de agendamento para barbearias, desenvolvida utilizando **React** e **Next.js**. A plataforma permite que usuários encontrem barbearias, visualizem serviços disponíveis, façam reservas e gerenciem seus agendamentos diretamente do celular.
 <br/>
🌐 Deploy:  [Live](https://fsw-barber-fawn.vercel.app )
<br/> <br/>
![barber](https://github.com/user-attachments/assets/a146180b-2034-4eb5-9d6f-6fea588345c1)
</div>

<div>

## 🚀 Funcionalidades <br/>
- 🔍 **Pesquisa de Barbearias**: Encontre rapidamente barbearias próximas e populares. <br/>
- 🗓️ **Agendamento de Serviços**: Reserve cortes de cabelo, barba e outros serviços com facilidade. <br/>
- 🔐 **Autenticação com Google**: Login seguro e rápido utilizando sua conta Google, integrado com **NextAuth**. <br/>
- 📅 **Gerenciamento de Agendamentos**: Visualize e cancele seus agendamentos diretamente na plataforma. <br/>
- 📱 **Interface Responsiva**: Design otimizado para dispositivos móveis, utilizando **Tailwind CSS**. <br/>
- 🛠️ **Sistema de Reservas**: Backend robusto com **Prisma** e **PostgreSQL** para gerenciar dados de usuários e reservas.

<br/>

## 🛠️ Tecnologias Utilizadas <br/>
- 💻 **Frontend**: React, Next.js, Tailwind CSS, TypeScript <br/>
- 🗄️ **Backend**: Node.js, Prisma, PostgreSQL <br/>
- 🔑 **Autenticação**: NextAuth <br/>
- 🛠️ **Bibliotecas Adicionais**: Lucide-react, Date-fns

<br/>

## 🔧 Configuração do Projeto <br/>
1. 🔄 **Clone este repositório**:
   ```bash
   git clone https://github.com/seu-usuario/fsw-barber.git
## Instale as dependências:
bash
Copiar código
npm install
Configure as variáveis de ambiente: <br/>
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:
plaintext
Copiar código
DATABASE_URL=postgres://usuario:senha@localhost:5432/fsw-barber
NEXTAUTH_SECRET=sua_chave_secreta
GOOGLE_CLIENT_ID=seu_cliente_id
GOOGLE_CLIENT_SECRET=seu_cliente_secreto
Execute as migrações do banco de dados:
bash
Copiar código
npx prisma migrate dev
Inicie o servidor de desenvolvimento:
bash
Copiar código
npm run dev
<br/><br/>

</div>



