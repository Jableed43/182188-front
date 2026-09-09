# Servidor Local de API REST con JSON Server

Servidor local usando JSON Server para desarrollo y enseñanza de APIs REST.

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Uso](#-uso)
- [Endpoints Disponibles](#-endpoints-disponibles)
- [Agregar Nuevas Colecciones](#-agregar-nuevas-colecciones)
- [Estructura de Datos](#-estructura-de-datos)
- [Configuración en la App](#-configuración-en-la-app)
- [Características](#-características)
- [Solución de Problemas](#-solución-de-problemas)

## 🚀 Instalación

```bash
npm install
```

Esto instalará `json-server` y sus dependencias.

## ▶️ Uso

### Iniciar el servidor (modo desarrollo)

```bash
npm run dev
```

**⚠️ Importante:** Usa `npm run dev` (no `npm start`) para que el servidor sea accesible desde emuladores Android.

El servidor estará disponible en:
- **Local:** `http://localhost:3000`
- **Red local:** `http://0.0.0.0:3000` (accesible desde otros dispositivos)

### Verificar que funciona

Abre en tu navegador: `http://localhost:3000/characters`

Deberías ver un JSON con los personajes.

## 📡 Endpoints Disponibles

### Personajes (Rick and Morty) (`/characters`)

- **GET** `http://localhost:3000/characters` - Obtener todos los personajes (100 en total)
- **GET** `http://localhost:3000/characters/1` - Obtener personaje por ID
- **POST** `http://localhost:3000/characters` - Crear nuevo personaje
- **PUT** `http://localhost:3000/characters/1` - Reemplazar personaje completo
- **PATCH** `http://localhost:3000/characters/1` - Actualizar personaje parcialmente
- **DELETE** `http://localhost:3000/characters/1` - Eliminar personaje
- **GET** `http://localhost:3000/characters?_page=1&_limit=10` - Paginación (10 resultados por página)
- **GET** `http://localhost:3000/characters?status=Alive` - Filtrar por estado
- **GET** `http://localhost:3000/characters?species=Human` - Filtrar por especie

### Búsquedas y Filtros

JSON Server soporta búsquedas automáticas:

- **Filtrar:** `GET /characters?name=Rick` - Buscar por nombre
- **Ordenar:** `GET /characters?_sort=name&_order=asc` - Ordenar por nombre
- **Paginación:** `GET /characters?_page=1&_limit=5` - Paginar resultados
- **Buscar:** `GET /characters?q=Rick` - Búsqueda global

## 💡 Tips Clave para Principiantes

1. **Los IDs son automáticos:** Cuando haces una petición `POST` para crear un nuevo personaje o episodio, **no** necesitas enviarle un `"id"`. El servidor le asignará uno automáticamente.
2. **Los cambios son reales y locales:** Cualquier `POST`, `PUT`, `PATCH` o `DELETE` modificará de verdad el archivo `db.json`. Si lo usas para pruebas y borras personajes, desaparecerán del archivo físico.
3. **CORS ya configurado:** No te preocupes por errores de *CORS* en el navegador. Puedes hacer peticiones directamente desde cualquier frontend local (React, Vue, Angular, Vanilla JS) mediante `fetch` o `axios` sin configuraciones extra.
4. **Restaurar la base de datos:** Si hiciste muchas pruebas de `DELETE` o `PUT` y quieres volver a tener los 100 personajes originales intactos, simplemente ejecuta `node fetch.js` en tu terminal (dentro de esta carpeta) y volverá a descargarlos y reescribir la base de datos por ti.

## ➕ Agregar Nuevas Colecciones

Para agregar una nueva colección (recurso), simplemente añádela al archivo `db.json`:

### Ejemplo: Agregar colección de "Posts"

1. **Edita `db.json`** y agrega la nueva colección:

```json
{
  "characters": [
    // ... personajes existentes
  ],
  "episodes": [
    {
      "id": 1,
      "name": "Pilot",
      "episode": "S01E01",
      "characterId": 1
    },
    {
      "id": 2,
      "name": "Lawnmower Dog",
      "episode": "S01E02",
      "characterId": 1
    }
  ]
}
```

2. **Reinicia el servidor** (Ctrl+C y luego `npm run dev`)

3. **¡Listo!** Ahora tienes disponibles automáticamente:
   - `GET /episodes` - Obtener todos los episodios
   - `GET /episodes/1` - Obtener episodio por ID
   - `POST /episodes` - Crear nuevo episodio
   - `PUT /episodes/1` - Actualizar episodio completo
   - `PATCH /episodes/1` - Actualizar parcialmente
   - `DELETE /episodes/1` - Eliminar episodio

### Ejemplo: Agregar colección de "Comentarios"

```json
{
  "characters": [ /* ... */ ],
  "episodes": [ /* ... */ ],
  "comments": [
    {
      "id": 1,
      "episodeId": 1,
      "characterId": 2,
      "text": "Excelente episodio!",
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

### Relaciones entre Colecciones

JSON Server detecta automáticamente relaciones basadas en IDs:

- **Episodios de un personaje:** `GET /characters/1/episodes` - Obtiene todos los episodios del personaje 1
- **Comentarios de un episodio:** `GET /episodes/1/comments` - Obtiene comentarios del episodio 1
- **Personaje de un episodio:** `GET /episodes/1/character` - Obtiene el personaje asociado al episodio 1

**Regla:** Si un objeto tiene un campo `characterId`, puedes acceder a `/characters/1/episodes`. Si tiene `episodeId`, puedes acceder a `/episodes/1/comments`.

**Ejemplo de estructura con relaciones:**

```json
{
  "characters": [
    { "id": 1, "name": "Rick Sanchez" },
    { "id": 2, "name": "Morty Smith" }
  ],
  "episodes": [
    { "id": 1, "name": "Pilot", "characterId": 1 },
    { "id": 2, "name": "Lawnmower Dog", "characterId": 1 }
  ],
  "comments": [
    { "id": 1, "text": "Buen episodio", "episodeId": 1, "characterId": 2 }
  ]
}
```

Con esta estructura, automáticamente puedes usar:
- `GET /characters/1/episodes` → Devuelve episodios del personaje 1
- `GET /episodes/1/comments` → Devuelve comentarios del episodio 1
- `GET /episodes/1/character` → Devuelve el personaje del episodio 1

## 📋 Estructura de Datos

### Personaje (Rick and Morty)

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Citadel of Ricks",
    "url": "https://rickandmortyapi.com/api/location/3"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": [
    "https://rickandmortyapi.com/api/episode/1"
  ],
  "url": "https://rickandmortyapi.com/api/character/1",
  "created": "2017-11-04T18:48:46.250Z"
}
```

### Ejemplo: Episodio (si lo agregas)

```json
{
  "id": 1,
  "name": "Pilot",
  "episode": "S01E01",
  "characterId": 1
}
```

## ⚙️ Configuración en la App

La app React Native está configurada para detectar automáticamente la plataforma:

- **Android Emulator:** `http://10.0.2.2:3000`
- **iOS Simulator:** `http://localhost:3000`
- **Web:** `http://localhost:3000`

### Para Dispositivo Físico

1. **Encuentra tu IP local:**
   ```bash
   # Windows
   ipconfig
   # Busca "IPv4 Address", ej: 192.168.1.100
   
   # Mac/Linux
   ifconfig
   # Busca "inet", ej: 192.168.1.100
   ```

2. **Inicia el servidor en modo accesible:**
   ```bash
   npm run dev
   ```
   Esto hace que el servidor sea accesible desde otros dispositivos en tu red.

3. **Configura variable de entorno en la app:**
   Crea un archivo `.env` en la carpeta de la app:
   ```
   EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
   ```
   (Reemplaza con tu IP real)

4. **Reinicia la app:**
   ```bash
   npx expo start --clear
   ```

## ✨ Características

✅ **Local** - Corre en tu máquina  
✅ **Sin límites** - Sin restricciones de uso  
✅ **Persistente** - Los cambios se guardan en `db.json`  
✅ **Soporta CRUD completo** - GET, POST, PUT, PATCH, DELETE  
✅ **Hot Reload** - Se actualiza automáticamente al cambiar `db.json`  
✅ **Búsquedas automáticas** - Filtros, ordenamiento, paginación  
✅ **Relaciones automáticas** - Detecta relaciones entre colecciones  

## 📝 Modificar Datos

Simplemente edita el archivo `db.json` y el servidor se actualizará automáticamente.

**Nota:** Los cambios hechos vía API (POST, PUT, PATCH, DELETE) también se guardan automáticamente en `db.json`.

## 🔧 Solución de Problemas

### El servidor no inicia

- Verifica que el puerto 3000 no esté en uso
- Cambia el puerto en `package.json` si es necesario:
  ```json
  "dev": "json-server --watch db.json --port 3001 --host 0.0.0.0"
  ```

### La app no puede conectar

- **Android Emulator:** Asegúrate de usar `npm run dev` (con `--host 0.0.0.0`)
- Verifica que el servidor esté corriendo
- Revisa los logs de la app para ver qué URL está usando
- Para Android, debe ser `http://10.0.2.2:3000`

### Error "Cannot GET /"

- Verifica que `db.json` tenga el formato correcto (JSON válido)
- Asegúrate de que las colecciones estén en el nivel raíz del JSON

### Los cambios no se guardan

- Verifica que `db.json` tenga permisos de escritura
- Asegúrate de que el servidor esté en modo `--watch`

### Error "Network request failed"

- Verifica que el servidor esté corriendo con `npm run dev`
- Para Android, asegúrate de usar `10.0.2.2` en lugar de `localhost`
- Revisa que no haya firewall bloqueando el puerto 3000

## 📚 Recursos Adicionales

- [Documentación de JSON Server](https://github.com/typicode/json-server)
- [Guía de Filtros y Búsquedas](https://github.com/typicode/json-server#filter)

## 🎯 Ejemplos de Uso Avanzado

### Filtrar personajes por especie

```bash
GET /characters?species=Human
```

### Obtener episodios de un personaje específico

```bash
GET /characters/1/episodes
```

### Crear un episodio relacionado con un personaje

```bash
POST /episodes
Content-Type: application/json

{
  "name": "Nuevo episodio",
  "episode": "S01E01",
  "characterId": 1
}
```

### Paginar resultados (Ej: Personajes)

```bash
GET /characters?_page=1&_limit=10
```

*Nota: `json-server` incluirá el header HTTP `X-Total-Count` indicando cuántos elementos hay en total, útil para calcular la cantidad de páginas en el frontend.*

### Filtrar resultados múltiples (Ej: Personajes)

```bash
GET /characters?status=Alive&species=Human
```

### Ordenar resultados

```bash
GET /characters?_sort=name&_order=asc
```

### Combinar filtros

```bash
GET /characters?name=Rick&_sort=id&_order=desc
```

---

**¡Listo para desarrollar!** 🚀
