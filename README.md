<h1 align="center">VS-Lab (Todo App)</h1>

<p align="center">This Todo App was made in the Distributed and Parallel systems course at HS-Esslingen.</p>

## 📌 - Description

With this ToDo App you can create and Manage your ToDos. When creating the ToDo you can specify the Label of the Todo and the Priority.
Once created The ToDos are shown in a Ordered List in the Application. With the Drag and Drop feature you can rearrange the ToDos.
Double Clicking on the Label/Priority of the ToDo, enables the edit mode. All changes gets saved automatically on the Database.
When a ToDo gets checked of as done it moves to the Marked as Done ToDo list in the Application.

## ⚙️ - Installation

1. Clone the Git-Repository.

```
foo@bar:~$ git clone https://github.com/FreakeyPlays/vs-lab.git
```

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
|   │   │   |   ├── todo.controller.spec.ts
|   │   │   |   └── todo.controller.ts
|   │   │   |
│   │   |   ├── /models
|   │   │   |   ├── todo.entity.ts
|   │   │   |   └── todo.interface.ts
|   │   │   |
│   │   |   ├── /service
|   │   │   |   ├── todo.service.spec.ts
|   │   │   |   └── todo.service.ts
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

| Name                  | Type     | Description                                                                     | Default       |
| :-------------------- | :------- | :------------------------------------------------------------------------------ | ------------- |
| `DB_HOST_NAME`        | `string` | The Hostname of the Database Container.</br>**Example:** `postgres-db`          | `postgres-db` |
| `POSTGRES_PORT`       | `number` | The Port of the PostgresSQL Database.</br>**Example:** `5432`                   | `5432`        |
| `POSTGRES_USER`       | `string` | The Username of the PostgresSQL Database.</br>**Example:** `user`               | `postgres`    |
| `POSTGRES_PASSWORD`   | `string` | The Password of the PostgresSQL Database.</br>**Example:** `root`               | `password`    |
| `POSTGRES_DB`         | `string` | The Name of the PostgresSQL Database.</br>**Example:** `todo_db`                | `postgres`    |
| `NODE_ENV`            | `string` | The Name of the NodeJD Environment.</br>**Example:** `development`              |               |
| `SERVER_PORT`         | `number` | The Port of the Server Application.</br>**Example:** `5000`                     | `5000`        |
| `NG_APP_DATABASE_URI` | `string` | The Connection String to the Database.</br>**Example:** `http://localhost:3000` |               |

## ⛓️ - API

To read more about the Todo API run the Project and visit `/api` to see the swagger documentation.

<details open>
<summary><h3>🔗 - createOneTodo<h3></summary>

#### 📥 - Reqest

```http
POST /todo Content-Type: application/json {"label": "new ToDo", ...}
```

| Parameter  | Type      | Description                                                               |
| :--------- | :-------- | :------------------------------------------------------------------------ |
| `label`    | `string`  | **Required**.</br>The Label of the ToDo.                                  |
| `position` | `number`  | **Required**.</br>The Position of the ToDo.                               |
| `priority` | `number`  | **Optional**.</br>**Deafault:** `5`.</br>The Priority of the ToDo (0-10). |
| `done`     | `boolean` | **Optional**.</br>**Deafault:** `false`.</br>The status of the ToDo.      |

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
