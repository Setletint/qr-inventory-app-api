## 📦 Dependencies

| Package | Link | Version |
|--------|------|---------|
| ![bcrypt](https://img.shields.io/badge/bcrypt-5.1.1-blue.svg) | [bcrypt on npm](https://www.npmjs.com/package/bcrypt) | `^5.1.1` |
| ![qrcode](https://img.shields.io/badge/qrcode-1.5.4-blue.svg) | [qrcode on npm](https://www.npmjs.com/package/qrcode) | `^1.5.4` |
| ![dotenv](https://img.shields.io/badge/dotenv-16.5.0-brightgreen.svg) | [dotenv on npm](https://www.npmjs.com/package/dotenv) | `^16.5.0` |
| ![express](https://img.shields.io/badge/express-5.1.0-lightgrey.svg) | [express on npm](https://www.npmjs.com/package/express) | `^5.1.0` |
| ![cors](https://img.shields.io/badge/cors-2.8.5-lightgrey.svg) | [cors on npm](https://www.npmjs.com/package/cors) | `^2.8.5` |
| ![mongoose](https://img.shields.io/badge/mongoose-8.13.2-orange.svg) | [mongoose on npm](https://www.npmjs.com/package/mongoose) | `^8.13.2` |

---

## 🌐 API Endpoints

- ### `POST /api/item/get/:id`
**Body:**
```json
{
  "userId": "<string>",
  "token": "<string>"
}
```

- ### `GET /api/item/getQrCode/:id`

- ### `POST /api/item/getItems`
**Body:**
```json
{
  "userId": "<string>",
  "token": "<string>"
}
```

- ### `POST /api/item/create`
**Body:**
```json
{
  "userId": "<string>",
  "token": "<string>",
  "name": "<string>",
  "isPrivate": "<Boolean>",
  "calendarData": "<Object> || <String>",
  "content": "<Mixed>"
}
```

- ### `POST /api/item/update/:id`
**Body:**
```json
{
  "userId": "<string>",
  "token": "<string>",
  "name": "<string>",
  "isPrivate": "<Boolean>",
  "content": "<Mixed>"
}
```
 
- ### `POST /api/item/setAuthorizedUsers/:id`
**Body:**
```json
{
  "userId": "<string>",
  "token": "<string>",
  "forCalender": "<Boolean>",
  "authorizedUsers": "<Array> ([email@mail.com, email1@mail.com])"
}
```

- ### `POST /api/auth/login`
**Body:**
```json
{
  "email": "<string>",
  "password": "<string>"
}
```


- ### `POST /api/auth/logout`
**Body:**
```json
{
  "userId": "<string>",
  "token": "<string>"
}
```



- ### `POST /api/user/register`
**Body:**
```json
{
  "email": "<string>",
  "username": "<string>",
  "password": "<string>"
}
```
