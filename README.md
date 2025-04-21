# Create the content for the markdown file
md_content = """
## 📦 Dependencies

| Package | Link | Version |
|--------|------|---------|
| ![bcrypt](https://img.shields.io/badge/bcrypt-5.1.1-blue.svg) | [bcrypt on npm](https://www.npmjs.com/package/bcrypt) | `^5.1.1` |
| ![dotenv](https://img.shields.io/badge/dotenv-16.5.0-brightgreen.svg) | [dotenv on npm](https://www.npmjs.com/package/dotenv) | `^16.5.0` |
| ![express](https://img.shields.io/badge/express-5.1.0-lightgrey.svg) | [express on npm](https://www.npmjs.com/package/express) | `^5.1.0` |
| ![mongoose](https://img.shields.io/badge/mongoose-8.13.2-orange.svg) | [mongoose on npm](https://www.npmjs.com/package/mongoose) | `^8.13.2` |

---

## 🌐 API Endpoints

### `POST /api/item/getItems`
**Body:**
```json
{
    "userId": "<string>",
    "token": "<string>"
}

### `POST /api/item/create`
**Body:**
```json
{
    "userId": "<string>",
    "token": "<string>",
    "name": "<string>",
    "isPrivate": "<Boolean>",
    "callenderData": "<Object> || <String>",
    "content": "<Mixed>"
}