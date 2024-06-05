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

USERS: Contiene endpoints relacionados con la gestión de usuarios.
- UPDATE: Actualizar detalles de usuario. El ejemplo de solicitud incluye un nuevo nombre de usuario y contraseña.
- DELETE: Eliminar un usuario con un ID especificado.
- GET: Obtener detalles del usuario actualmente conectado.
- GET ALL: Obtener detalles de todos los usuarios.

Auth: Contiene endpoints relacionados con la autenticación y autorización.
- LOGIN: Autenticar un usuario con un nombre de usuario y contraseña. Genera un token de portador al autenticarse correctamente.
- LOGOUT: Cerrar sesión del usuario actualmente autenticado invalidando el token de portador.
- SIGNUP: Registrar un nuevo usuario con un nombre de usuario y contraseña. Similar al endpoint de inicio de sesión, pero para el registro de usuarios.

TRANSACTIONS: Endpoint para recuperar detalles de transacciones.

PLACES: Endpoint para recuperar información sobre restaurantes cercanos basada en una ubicación especificada (por ejemplo, nombre de ciudad). La solicitud de ejemplo incluye un parámetro de ubicación en la cadena de consulta.
