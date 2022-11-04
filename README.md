<h1 align="center">VS-Lab (Todo App)</h1>

<p align="center">This Todo App was made in the Distributed and Parallel systems course at HS-Esslingen.</p>
<img src="https://user-images.githubusercontent.com/78086475/199973621-69495a54-9570-4d96-8ef5-75b7a885f851.png" alt="Preview Image of the ToDo-App"></img>

## 📌 - Description

With this ToDo App you can create and Manage your ToDos. When creating the ToDo you can specify the Label of the Todo and the Priority.
Once created The ToDos are shown in a Ordered List in the Application. With the Drag and Drop feature you can rearrange the ToDos.
Double Clicking on the Label/Priority of the ToDo, enables the edit mode. All changes gets saved automatically on the Database.
When a ToDo gets checked of as done it moves to the Marked as Done ToDo list in the Application.

## ⚙️ - Installation

1. Clone the Git-Repository.

```
git clone https://github.com/FreakeyPlays/vs-lab.git
```

2. Install Docker, Docker-Compose and WSL2.<br>
   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

3. If `make` is not provided in your OS, install a custom make like GNUmake.<br>
   [GNUmake](https://www.gnu.org/software/make/)

4. Create the `.env` File in the Base Directory accoringly to the `.env.sample` File.<br/>
   Read more at: [🧰 - Environment variables](#---environment-variables)
5. Make sure you are in the Root Directory of the Repository, then build and run the Project using make.

```
make build
```

```
make run
```

5. Now you can visit the Application via `http://localhost:8080`.

## 🛠️ - Tech Stack

- Client
  - [Agular](https://angular.io/docs)
  - [Dragula](https://github.com/valor-software/ng2-dragula#readme)
  - [yargs](https://yargs.js.org/)
- Server
  - [NestJS](https://docs.nestjs.com/)
  - [Swagger](https://swagger.io/docs/)
  - [TypeORM](https://typeorm.io/)

## 📚 - Structure

```
.
│   # The Angular Frontend
├── /client
│   ├── /src
│   │   ├── /app
|   |   |   |   # Interfaces of different Objects
│   │   |   ├── /_interface
|   |   |   |   └── ...
|   |   |   |
|   |   |   |   # Connection to the Database
│   │   |   ├── /_service
|   |   |   |   └── ...
|   |   |   |
|   |   |   |   # Components witch get used more than once
│   │   |   ├── /_template
|   |   |   |   └── ...
|   |   |   |
|   |   |   |   # Bigger Components like whole sites
|   |   |   ├── /...(components)
|   |   |   |   └── ...
|   |   |   |
|   |   |   |   # App Component Files
|   |   |   └── ...
|   |   |
│   │   ├── /assets
|   |   |   |   # All fonts files
│   │   |   ├── /font
|   |   |   |   └── ...
|   |   |   |
|   |   |   |   # All svg Images
│   │   |   └── /svg
|   |   |       └── ...
|   |   |   |
|   |   |   # Different Environment files
│   │   ├── /environment
│   │   │   └── ...
|   |   |
|   |   |   # Sass Files (e.g. _var, _font, ...)
│   │   ├── /sass
|   |   |   └──...
|   |   |
|   |   |   # Angular starter Files and setEnv.ts
|   |   └── ...
|   |
|   |   # Config Files for Angular
|   └── ...
│
│   # The NestJS Backend
├── /server
│   ├── /src
│   │   ├── /todo
│   │   |   ├── /controller
|   │   │   |   └── ...
|   │   │   |
│   │   |   ├── /models
|   │   │   |   └── ...
|   │   │   |
│   │   |   ├── /service
|   │   │   |   └── ...
|   │   │   |
|   |   |   └── todo.module.ts
|   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
|   │
│   ├── /test
|   |   └── ...
│   └── ...
│
│   # Config Files for Editor and Application
├── .configFiles
│
│   # Project Description
└── README.md
```

## 🧰 - Environment variables

| Name                   | Type     | Description                                                                       | Default            |
| :--------------------- | :------- | :-------------------------------------------------------------------------------- | ------------------ |
| `NG_APP_DATABASE_URI`  | `string` | The Base URI String to the Database.</br>**Example:** `http://localhost`          | `http://localhost` |
| `SERVER_PORT`          | `number` | The Port of the Server Application.</br>**Example:** `5000`                       | `3000`             |
| `PGDB_HOST`            | `string` | The Hostname of the Database Container.</br>**Example:** `postgres-db`            | `postgres-db`      |
| `POSTGRES_PORT`        | `number` | The Port of the PostgresSQL Database.</br>**Example:** `4321`                     | `5432`             |
| `POSTGRES_USER`        | `string` | The Username of the PostgresSQL Database.</br>**Example:** `user`                 | `postgres`         |
| `POSTGRES_PASSWORD`    | `string` | The Password of the PostgresSQL Database.</br>**Example:** `root`                 | `password`         |
| `POSTGRES_DB`          | `string` | The Name of the PostgresSQL Database.</br>**Example:** `todo_db`                  | `postgres`         |
| `NGINX_PORT`           | `number` | The Port of the NGINX server Environment.</br>**Example:** `480`                  | `80`               |
| `DOCKER_CLIENT_PORT`   | `number` | The Port of the Client Container server Environment.</br>**Example:** `7200`      | `8080`             |
| `DOCKER_SERVER_PORT`   | `number` | The Port of the Server Container server Environment.</br>**Example:** `6800`      | `8081`             |
| `DOCKER_POSTGRES_PORT` | `number` | The Port of the PostgresDB Container server Environment.</br>**Example:** `39200` | `35000`            |
| `NODE_ENV`             | `string` | The Name of the NodeJS Environment.</br>**Example:** `development`                |                    |

## ⛓️ - API

To read more about the Todo API run the Project and visit `/api` to see the swagger documentation.

<details open>
<summary><h3>🔗 - createOneTodo<h3></summary>

#### 📥 - Reqest

```http
POST /todo Content-Type: application/json {"label": "new ToDo", ...}
```

| Parameter  | Type      | Description                                                              |
| :--------- | :-------- | :----------------------------------------------------------------------- |
| `label`    | `string`  | **Required**.</br>The Label of the ToDo.                                 |
| `position` | `number`  | **Required**.</br>The Position of the ToDo.                              |
| `priority` | `number`  | **Optional**.</br>**Default:** `5`.</br>The Priority of the ToDo (0-10). |
| `done`     | `boolean` | **Optional**.</br>**Default:** `false`.</br>The status of the ToDo.      |

#### 📤 - Response

```javascript
{
  id:          number,
  label:       string,
  priority:    number,
  done:        boolean,
  position:    number
}
```

</details>

<details>
<summary><h3>🔗 - getAllTodos<h3></summary>

#### 📥 - Reqest

```http
GET /todo
```

#### 📤 - Response

```javascript
[
  {
    id:        number,
    label:     string,
    priority:  number,
    done:      boolean,
    position:  number
  },
  ...
]
```

</details>

<details>
<summary><h3>🔗 - getOneTodo<h3></summary>

#### 📥 - Reqest

```http
GET /todo/{id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `number` | **Required**.</br>The id of the ToDo. |

#### 📤 - Response

```javascript
{
  id:          number,
  label:       string,
  priority:    number,
  done:        boolean,
  position:    number
}
```

</details>

<details>
<summary><h3>🔗 - updateOneTodo<h3></summary>

#### 📥 - Reqest

```http
PUT /todo/{id} Content-Type: application/json {"label": "updated ToDo", ...}
```

| Parameter  | Type      | Description                                        |
| :--------- | :-------- | :------------------------------------------------- |
| `id`       | `number`  | **Required**.</br>The ID of the ToDo.              |
| `label`    | `string`  | **Required**.</br>The Label of the ToDo.           |
| `position` | `number`  | **Required**.</br>The Position of the ToDo.        |
| `priority` | `number`  | **Required**.</br>The Priority of the ToDo (0-10). |
| `done`     | `boolean` | **Required**.</br>The status of the ToDo.          |

#### 📤 - Response

```javascript
{
  generatedMaps:  array,
  raw:            array,
  affected:       number
}
```

</details>

<details>
<summary><h3>🔗 - deleteOneTodo<h3></summary>

#### 📥 - Reqest

```http
DELETE /todo/{id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `number` | **Required**.</br>The id of the ToDo. |

#### 📤 - Response

```javascript
{
  raw:      array,
  affected: number
}
```

</details>
