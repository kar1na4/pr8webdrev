
## Завдання

### 1. `stream_response.js` — Стрімінг файлу у відповідь
Обробляє `GET /file?fileName=<name>` і передає вміст локального файлу у HTTP-відповідь через `fs.createReadStream()` та `pipe`.

### 2. `stream_upload.js` — Збереження тіла запиту у файл
Обробляє `POST /upload` і зберігає тіло запиту у файл `upload.txt` через `fs.createWriteStream()` та `pipe`.

### 3. `stream_transform.js` — Трансформація під час стрімінгу
Обробляє `GET /upper?fileName=<name>` і повертає вміст файлу у верхньому регістрі через `Transform` стрім.

### 4. `stream_count.js` — Підрахунок байтів та чанків
Обробляє `POST /count`, слухає події `data` на `req` і повертає JSON з кількістю байтів та чанків.

### 5. `stream_error.js` — Обробка помилок стрімів
Обробляє `GET /missing-file?fileName=<name>` і коректно повертає `500` якщо файл не існує, не падаючи при цьому.

---

## Запуск

```bash
node stream_response.js 3000
node stream_upload.js 3000
node stream_transform.js 3000
```

## Перевірка

```bash
# stream_response
curl "http://127.0.0.1:3000/file?fileName=file.txt"

# stream_upload
curl -X POST http://127.0.0.1:3000/upload --data-binary "hello"

# stream_transform
curl "http://127.0.0.1:3000/upper?fileName=file.txt"

# stream_count
curl -X POST http://127.0.0.1:3000/count --data-binary "hello world"

# stream_error
curl "http://127.0.0.1:3000/missing-file?fileName=ghost.txt"
```

---

## Що використовувала

- `fs.createReadStream()` / `fs.createWriteStream()`
- `stream.Transform`
- `pipe()`
- Події `data`, `end`, `error`, `open`
- Вбудований модуль `http`
