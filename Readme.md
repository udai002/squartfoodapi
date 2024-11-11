
# Sqaurtf

Here are the api's created using Express JS.

## API Reference

#### Get all user
This is a user api to get all users
```http
  GET /api/user/details
```
## Response

```response
    [
    {
        "_id": "672a2daa3328d141e9869eff",
        "username": "udai",
        "password": "udai@002",
        "email": "udai2@gmail.com",
        "Admin": true,
        "mobileNo": 8898842232,
        "__v": 0
    },
    {
        "_id": "672a4536b342b6a5905bd07f",
        "username": "udai002",
        "password": "udai@002",
        "email": "udai002@gmail.com",
        "Admin": true,
        "mobileNo": 8898842232,
        "__v": 0
    },
    {
        "_id": "672a485b407961dd6d757125",
        "username": "udai0022",
        "password": "udai@002",
        "email": "udai0022@gmail.com",
        "Admin": true,
        "mobileNo": 8898842232,
        "userId": "user1730824283443",
        "__v": 0
    }
]

```

#### User Login

```http
  POST /api/user/login
```

## Request body
```request
{
    "email":"udai232@gmail.com",
    "password":"udai123"
}
```
#### create user

```http
  POST /api/user/signup
```
## Request body
```request
{
   "username":"udai0022",
   "password":"udai@002",
   "email":"udai0022@gmail.com",
   "mobileNo":8898842232,
   "Admin":true
}
```


#### user details using header authorization

```http
  GET /api/user/
```
| headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your API key |