# fido-backend-test-task

Test task for Back-end at [Fido](https://www.facebook.com/fido.naukma/)
Important: This task is build using Node.js!

---

## Project setup

```
npm install
```

### Hot-reloads for development

```
npm run dev
```

### Start for production

```
npm start
```

---

### API overview

```
127.0.0.1:3000/api/users/
```

GET: retrieves all users
POST: creates new user with unique email

```
127.0.0.1:3000/api/users/:USER_EMAIL
```

DELETE: deletes one user with taken USER_EMAIL

```
127.0.0.1:3000/api/rooms/
```

GET: retrieves all rooms
POST: creates new room with unique name

```
127.0.0.1:3000/api/rooms/:ROOM_NAME
```

DELETE: deletes one room with taken ROOM_NAME

```
127.0.0.1:3000/api/bookings/
```

POST: makes a booking for between 2 dates (example: "2021-02-30T09:59:21.497Z"). Request body REQUIRES: {userName, roomName, startTime, endTime}.

```
127.0.0.1:3000/api/bookings/:ROOM_NAME?startTime=START_TIME&endTime=END_TIME
```

GET: retrieves all bookings for room with ROOM_NAME between START_TIME and END_TIME; both ROOM_NAME and queries are REQUIRED.
