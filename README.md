# Server Manager

A simple server management panel designed to be easy to use

- [Trello](https://trello.com/b/1zSvDrzY/server-management-panel)

## Features

- Share Editor (Currently uses FTP, will eventually use Samba)
- Virtual terminal
- User editor
- Stats viewer
- Podman viewer/controller

## Tech Stack

**Client:** React, NextUI, Typescript, Tailwind CSS, XTerm

**Server:** Golang, Sqlite3, [Gorm](https://gorm.io/index.html) 


## ERD

- User 
    - ID
    - Name
    - Password
    - Role
    - Token

- Share
    - ID
    - ShareName
    - ShareDesc

- AuditLog
    - ID
    - User
    - Action


## Screenshots

Below are media for missing parts of project (It broke when trying to get it working on another machine lmao)

![Share panel](https://cdn.discordapp.com/attachments/652934726843105292/1268193385450045520/image.png?ex=66ab88a0&is=66aa3720&hm=05ec59e803bee05c0e9e0353a2dda1a4a3f1b9f0b9b036e9233b4cbbd8754bcc&)

![Shares page](https://media.discordapp.net/attachments/652934726843105292/1268193324431573043/image.png?ex=66ab8892&is=66aa3712&hm=eaf9ccd2e0442b71d41eeee86159c4f0e52757eb252c5e3a0ad4e78f177cdafd&=&format=webp&quality=lossless&width=1101&height=644)
