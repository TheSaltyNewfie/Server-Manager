# Server-Manager
Server managment panel

- [Trello](https://trello.com/b/1zSvDrzY/server-management-panel)

# Tech Stack
- Front end
    - React + Vite
    - Typescript
    - Axios
    - Docker

- Back end
    - Golang (If approved)
    - Postgresql / Sqlite3
    - Websockets (For terminal)
    - Docker

# ERD

- User
    - ID
    - Username
    - Password
    - Permissions / Role

- ServerLog
    - ID
    - Timestamp
    - Message
    - Level

- ServerInfo
    - ID
    - ServerName
    - ServerIP
    - CPU
    - Memory
    - DiskAmount
    - DiskUsage

- FolderShare
    - ID
    - Path
    - Visibility
    - Users (Foreign key to User)

- AuditLog
    - ID
    - UserID (Foreign key to User)
    - Action (e.g. command that was ran)