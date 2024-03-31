<h1 align="center"> PROJECT FRONTEND: INKSOUL STUDIO </h1>

<image src="./img/imgREADME/titleInkSoulStudio.png" alt="InkSoul Studio">

## Table of Contents :file_folder:

1. [Description :classical_building:](#description-classical_building)
2. [Stack :gear:](#stack-gear)
3. [Project :open_book:](#Project-open_book)
4. [Future functionalities :star2:](#Future-functionalities-star2)
5. [Link :dart:](#link-dart)
6. [Author :wave:](#author-wave)
7. [Acknowledgments :sparkling_heart:](#acknowledgments-sparkling_heart)

---

## Description :classical_building:

In this project, we developed the backend of a social network. It allows user registration, as well as the management of their accounts, and the creation of posts with various search and interaction options.

---

## Stack :gear:

![Static Badge](https://img.shields.io/badge/VSC-blue?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/JAVASCRIPT-yellow?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/DOCKER-lightblue?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/EXPRESS-green?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/node.js-darkgreen?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/jwt-black?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/MONGO%20COMPASS-lightgreen?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/MONGO%20ATLAS-lightgreen?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/MONGOOSE-lightgreen?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/GIT-red?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/GITHUB-black?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/FL0-purple?style=for-the-badge)

---

## Project :open_book:

<image src="./img/diagrama.png" alt="diagrama">

### 1 - Local Installation:

- Clone repository.
- `npm install`.
- Fill .env with data on .env.sample.
- `npm run start`.
- Import file Collection_socialMedia.json for Thunder Client.

### 2 - Info to log 

- Super_admin:
```
_id: "1",
name: "super_admin",
email: "super_admin@email.com",
password: 123456,
role: "super_admin"
```

- Admin:
```
_id: "2",
name: "admin",
email: "'admin@email.com'",
password: 123456,
role: "admin"
```

- User:
```
_id: "3",
name: "'user1'",
email: "'user@email.com'",
password: 123456,
role: "user"
```

### 2 - Enpoints:

1. Register and Log:

- Register:

`POST https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/auth/register`


<image src="./img/Register.png" alt="register">

- Log.

`POST https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/auth/login`



<image src="./img/Log.png" alt="log">


2. User:

- Get users:

`GET https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/users`



<image src="./img/GetUsers.png" alt="Get Users">

- Get users profile:

`GET https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/users/profile`


<image src="./img/GetUserProfile.png" alt="Get User Profile">

- Put user profile:

Can update user name.

`PUT https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/users/profile`



<image src="./img/PutUserProfile.png" alt="Put User Profile">

-Delete user :


`DELETE https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/users/:id`



<image src="./img/DeleteUser.png" alt="delete user">

-Update role user :


`PUT https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/users/role/:id`



<image src="./img/UpdateRoleUser.png" alt="update role user">



3. Post:

- New post:

`POST https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts`


<image src="./img/CreatePost.png" alt="create post">

- Update post:

`PUT https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts/:id`


<image src="./img/PutPost.png" alt="put post">

- Get own post:

`GET https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts/own`


<image src="./img/GetOwnPost.png" alt="get own post">

- Get posts:

`GET https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts`

<image src="./img/GetPosts.png" alt="get posts">

- Delete post:

`DELETE https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts/:id`

<image src="./img/DeletePost.png" alt="delete post">

- Get post by id:

`GET https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts/:id`

<image src="./img/GetPostById.png" alt="get post by id">

- Get user posts:

`GET https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/users/posts/:user-id`

<image src="./img/GetUserPosts.png" alt="get user posts">

- Put like or pull like:

`PUT https://socialmedia-dev-xtcq.2.ie-1.fl0.io/api/posts/like/:id`

<image src="./img/Like.png" alt="Like">



## Future functionalities :star2:

- Generate enpoint, filter by email.

- Generate controller to push or pull followers and followings

- Generate controller to view followers posts.

- Require that users `name` do not contain numbers or special caracters.

- Refactor message error.

- Create a front-end with React for the project.


---

## Link :dart:

https://github.com/MartaGBayona/project_BACKEND2.git

---

## Author :wave:

- **Marta Gimeno Bayona**
- [GitHub](https://github.com/MartaGBayona) - [LinkedIn](https://www.linkedin.com/in/martagbayona/)


## Acknowledgments  :sparkling_heart:

My most sincere thanks to all my colleagues. Especially to Pedro, Marina, and Ana for their invaluable help and support.
