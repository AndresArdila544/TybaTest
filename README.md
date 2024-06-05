## Ejercicio API Rest

Este ejercicio consiste en desarrollar una API Rest con las siguientes funcionalidades:

1. Registro de usuario.
2. Login de usuario.
3. Endpoint para los usuarios logueados el cual reciba una ciudad (o unas coordenadas) y retorne una lista de los restaurantes cercanos a esta ciudad o coordenadas. Se utilizó Google Places.
4. Endpoint donde puedes consultar la lista de las transacciones realizadas históricamente.
5. Logout de usuario.

### Para correr el proyecto

1. Ejecutar `npm install`.
2. Iniciar la aplicación con `npm start`.

### Docker

También puedes correr la aplicación utilizando Docker:

```bash
docker build -t Tyba-test .
docker run -p 3000:3000 Tyba-test
```
### Peticiones API Rest

Contiene una colecion de POSTMAN con los siguientes endpoints: 

USERS: Contiene endpoints relacionados con la gestión de usuarios. Los usuarios tienen que estar autenticados enviando el Bearer Token en cada peticion.
- PATCH: Actualizar detalles de usuario. El ejemplo de solicitud incluye un nuevo nombre de usuario y contraseña.
#### PATCH URL/user/
```bash

{
    "username":"testuser2",
    "password":"password2"
}
```
#### Response
```bash
{
    "status": true,
    "data": {
        "id": 9,
        "username": "testuser3",
        "password": "password2",
        "createdAt": "2024-06-05T07:24:47.921Z",
        "updatedAt": "2024-06-05T08:10:18.254Z"
    }
}
```
- DELETE: Eliminar un usuario con un ID especificado.
#### DELETE URL/user/{id}

#### Response
```bash
{
    "status": true,
    "data": {
        "numberOfUsersDeleted": 1
    }
}
```
- GET: Obtener detalles del usuario dado un id.
#### GET URL/user/{id}

#### Response
```bash
{
    "status": true,
    "data": {
        "id": 1,
        "username": "test1",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "createdAt": "2024-06-04T19:47:01.317Z",
        "updatedAt": "2024-06-04T19:47:01.317Z"
    }
}
```
- GET ALL: Obtener detalles de todos los usuarios.
#### GET URL/user/

#### Response
```bash
{
    "status": true,
    "data": [
        {
            "id": 1,
            "username": "test1",
            "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            "createdAt": "2024-06-04T19:47:01.317Z",
            "updatedAt": "2024-06-04T19:47:01.317Z"
        }...
    ]
}
```

Auth: Contiene endpoints relacionados con la autenticación y autorización.
- LOGIN: Autenticar un usuario con un nombre de usuario y contraseña. Genera un token de portador al autenticarse correctamente.
#### POST URL/login
```bash
{
    "username":"testuser",
    "password":"password"
}
```
#### Response
```bash
{
    "status": true,
    "data": {
        "user": {
            "id": 10,
            "username": "testuser",
            "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            "createdAt": "2024-06-05T08:16:59.951Z",
            "updatedAt": "2024-06-05T08:16:59.951Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzE3NTc1NDk4LCJleHAiOjE3MTc1NzkwOTh9.ZBzyvtQcVkWZb985ToFdLsqfXRqjgsc1im83VoXDK_o"
    }
}
```
- LOGOUT: Cerrar sesión del usuario actualmente autenticado invalidando el token de portador.
#### POST URL/logout

#### Response
```bash
{
    "status": true,
    "message": "Logout successful"
}
```
- SIGNUP: Registrar un nuevo usuario con un nombre de usuario y contraseña. Similar al endpoint de inicio de sesión, pero para el registro de usuarios.
  #### POST URL/signup
```bash

{
    "username":"testuser",
    "password":"password"
}
```
#### Response
```bash
{
    "status": true,
    "data": {
        "user": {
            "id": 10,
            "username": "testuser",
            "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            "updatedAt": "2024-06-05T08:16:59.951Z",
            "createdAt": "2024-06-05T08:16:59.951Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzE3NTc1NDE5LCJleHAiOjE3MTc1NzkwMTl9.QD9PdcZUPzRJqLTEfezDS66e97JBAB94mCVO_RDrXbI"
    }
}
```

TRANSACTIONS: Endpoint para recuperar detalles de transacciones.
#### GET URL/transactions

#### Response
```bash
{
    "status": true,
    "data": [
        {
            "id": 1,
            "transactionType": "GETTRANSACIONS",
            "user": "ALL_USERS",
            "description": "OK",
            "createdAt": "2024-06-04T19:39:42.107Z",
            "updatedAt": "2024-06-04T19:39:42.109Z"
        },
        {
            "id": 2,
            "transactionType": "GETTRANSACIONS",
            "user": "ALL_USERS",
            "description": "OK",
            "createdAt": "2024-06-04T19:39:50.394Z",
            "updatedAt": "2024-06-04T19:39:50.394Z"
        },
        {
            "id": 3,
            "transactionType": "GETTRANSACIONS",
            "user": "ALL_USERS",
            "description": "OK",
            "createdAt": "2024-06-04T19:46:14.367Z",
            "updatedAt": "2024-06-04T19:46:14.367Z"
        }...
}
```
PLACES: Endpoint para recuperar información sobre restaurantes cercanos basada en una ubicación especificada (por ejemplo, nombre de ciudad). La solicitud de ejemplo incluye un parámetro de ubicación en la cadena de consulta.
#### GET URL/places/?location=Bogota

#### Response
```bash
{
    "status": true,
    "data": [
        {
            "name": "Hotel Lancaster House Suites",
            "vicinity": "Carrera 45 #106B -28",
            "location": {
                "lat": 4.6951155,
                "lng": -74.05548310000002
            }
        },
        {
            "name": "Hotel-Restaurante Indian Palace",
            "vicinity": "Calle 108 #48-31",
            "location": {
                "lat": 4.695735600000001,
                "lng": -74.0589638
            }
        },
        {
            "name": "Hotel Chicó 97",
            "vicinity": "Carrera 11B #97-3",
            "location": {
                "lat": 4.6808765,
                "lng": -74.0460915
            }
        }....
}
```
