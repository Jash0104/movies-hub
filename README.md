# Movie Hub - README 🎬🍿  

¡Bienvenido a **Movie Hub**, el Netflix que no sabías que necesitabas porque aquí tienes todo el poder! Esta plataforma está hecha para los amantes del cine... y para los que siempre dicen "¿Qué peli vemos hoy?" y nunca deciden.  

Este proyecto combina acción, drama y comedia (literalmente) con una tecnología frontend digna de un blockbuster: **Angular**.  

---

## 🌟 ¿Qué es Movie Hub?  

Movie Hub es el lugar donde el cine y la tecnología se encuentran. Administradores pueden manejar un catálogo de películas como si fueran los reyes de Hollywood, mientras que los usuarios finales pueden alquilar o comprar su próxima maratón de películas favoritas.  

---

## 🎥 Funcionalidades Épicas  

### 🎬 **Para Administradores (¡los directores del show!):**  
- **Agregar Películas**: Crea las historias que Hollywood jamás se atrevió a contar.  
- **Ver Películas**: Revisa el catálogo y presume tu colección.  
- **Editar Películas**: Da giros inesperados a las películas que ya existen.  
- **Eliminar Películas**: Porque no todas las películas merecen la secuela.  


### 🍿 **Para Usuarios Finales (¡los críticos de sillón!):**  
- **Explorar Películas**: Navega por un catálogo que no tiene fin (o eso queremos).  
- **Detalles de Películas**: Conoce todos los chismes de tus pelis favoritas.  
- **Rentar o Comprar**: Porque el cine en casa nunca fue tan fácil.  

---

🎞 **Los detalles de cada película incluyen:**  
- Título  
- Descripción  
- Género (acción, comedia, terror, drama... lo que sea menos "pelis malas").  
- Año de lanzamiento  
- Director  
- Actores principales  
- Duración (en minutos, no en vidas desperdiciadas)  
- Precio de alquiler y compra  
- Póster que atraiga fans (¡o al menos curiosos!)  
- Calificación (opcional, pero todos sabemos que es un 5/5).  


🎟️ **Las transacciones se registran con:**  
- ID de usuario  
- ID de película  
- Tipo de transacción (renta o compra)  
- Fecha y precio  

---

## 🔒 Seguridad de Primera  

### Inicia Sesión  
Solo los administradores pueden acceder al backstage de Movie Hub con su email y contraseña. Para mayor seguridad, usamos **tokens de autenticación** que guardamos en `localStorage` porque... seguridad.  

### Protegemos las Rutas  
Nada de colados. Solo quienes tienen permiso podrán administrar películas o realizar transacciones. Angular guards al rescate.  

### Cierra Sesión  
Cuando todo está dicho y hecho, ¡puedes cerrar sesión con un clic!  

---

¿Listo para unirte al mundo de Movie Hub? ¡Prepara tus palomitas y dale play al código! 🍿

## 🛠️ Detalles Técnicos 

- **Frontend**: Angular (el Spielberg del desarrollo web).  
- **Backend**: Express (porque necesitamos alguien que maneje la taquilla).  
- **Base de Datos**: Cualquier motor de base de datos que no te deje plantado.  
- **API REST**: Todo el chisme pasa por la API, como debe ser.  

