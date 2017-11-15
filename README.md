# [eMarketing](https://emarketing-iaw.herokuapp.com)
por Juan Manuel Ramallo

Al probar la aplicación subida en heroku puede que sea necesario hacer un `full reload` la primer vez que se visite,
para así evitar usar las cachés del navegador las cuales podrían estar con código viejo de la aplicación.

### Dependencias
* React
* React router dom
* Materialize
* Node sass
* Lodash
* jQuery
* Cypress

Para correr esta app se requiere:

- Tener instalado yarn (npm también sirve)
- Ejecutar `yarn install`
- Correr aplicación con `yarn start`

### Tests
La aplicación de la API debe correrse con el entorno configurado para tests.
Ahora en el proyecto de la aplicación web client-side se debe abrir Cypress.
Una vez abierto hacer doble click en el test de integración que se desee correr.
Los tests disponibles hasta el momento son para el uso e interacción con:

  * Contactos: (con un usuario ingresado)
    * Lista todos los contactos
    * Crea un nuevo contacto exitósamente
    * Edita un contacto exitósamente
    * Busca contactos pasando un nombre y encuentra al menos uno
    * Elimina un contacto exitósamente
  * Usuarios:
    * Inicio de sesión con datos correctos y permite entrada al sistema
    * Inicio de sesión con datos incorrectos no inicia sesión
    * Registra un nuevo usuario

Para correr los tests se deben ejecutar los siguientes comandos en orden:

  * En el proyecto de la API correr el servidor: `RAILS_ENV=test rails s`
  * En el proyecto de la aplicación client-side empezar a correr la app: `yarn start` (npm también es válido)
  * Luego abrir Cypress con el comando: `./node_modules/.bin/cypress open`
  * Luego seleccionar el test deseado y seleccionar correr todos


### In progress
This app is still in progress. For a list of TODO things up to date see [todo.md](TODO.md)