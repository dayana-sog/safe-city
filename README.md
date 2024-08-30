# <p align="center"> 🔒 Safe City </p>

**Safe City** tem a finalidade de permite descobrir quais são as regiões mais perigosas de sua cidade. 

Devido questões burocráticas muitas pessoas desistem de fazer o boletim de ocorrência e por esse motivo é mais difícil de ser contabilizado pelo órgão responsável e assim descobrir soluções para o problema.

*Como Safe City funciona*: ao ser vítima de um crime, o usuário pode cadastrar o incidente ocorrido, informando detalhes, horário, e se possível imagens do local.

Com isso, o serviço vai se transformando em um mapa de calor que mostra localidades que você pode evitar. Dessa forma, é possível planejar rotas alternativas (especialmente durante a noite) que ignorem tais lugares.




---
**Tela da aplicação**:

<p align="center">
	<img src="https://user-images.githubusercontent.com/57035171/96350070-87479700-10ab-11eb-83ad-eca82c3689a5.png" />
</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/57035171/96350085-a0504800-10ab-11eb-8544-fe00d7069169.png" />
</p>

<p align="center">
	<img src="https://user-images.githubusercontent.com/57035171/96350110-d68dc780-10ab-11eb-9335-3ec34509f154.png" />
</p>




## 🚀  Tecnologias/Ferramentas Utilizadas:
Backend:
-   [Node.js](https://nodejs.org/en/)
-	[Sqlite](https://www.sqlite.org/docs.html)
-   [Express](https://expressjs.com/pt-br/)
-   [TypeORM](https://typeorm.io/#/)
-   [Yup](https://github.com/jquense/yup#install)
-   [TypeScrip](https://www.typescriptlang.org/docs/)

Frontend:
-   [ReactJS](https://pt-br.reactjs.org/)
-   [Axios](https://github.com/axios/axios)
-   [React icons](https://react-icons.netlify.com/#/)
-   [React toastify](https://github.com/fkhadra/react-toastify)
-   [React router dom](https://www.npmjs.com/package/react-router-dom)
-   [TypeScrip](https://www.typescriptlang.org/docs/)

## :books: Instalação:

Clone o repositório:
```sh
$ git clone https://github.com/dayana-sog/safe-city
```

Aceda a pasta do projeto:
```sh
$ cd safe-city
```
Aceda a pasta do backend para rodar o servidor:
```sh
$ cd backend
```
Instale as dependências:
```sh
$ yarn
```
Run as migrations:
```sh
$ yarn typeorm migration:run
```
Inicie o servidor:
```sh
$ yarn dev
```

#### Para rodar o projeto web:
Aceda a pasta do frontend:
```sh
$ cd web
```
Inicie o servidor web:
```sh
$ yarn start
```


----------

Feito com ♥ by Dayana Gonçalves  👋 
