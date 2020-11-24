<div align="center">

![logo](logo.png)
# Discord Remote Control

</div>

```sh
Folder-Tree:
📦app
 ┣ 📂screenshots
 ┃ ┗ 📜scrshot1606137821559.jpg
 ┣ 📜config.json
 ┣ 📜index.js
 ┣ 📜logo.png
 ┣ 📜package.json
 ┗ 📜README.md
```

## Usage
### Setting up
- Install dependencies:
  + NPM: `npm install`
  + Manual install: `npm install discord.js && npm install screenshot-desktop`
- Allow/Disallow commands
  + You can allow or disallow certain commands through the `config.json` file
  + Example (this is the default configuration):
  ```js
  {
      "id": "YOUR_ID", // your discord id
      "token": "YOUR_TOKEN", // your bot token
      "prefix": ".", // the command prefix
      "allowosinfo": true, // allow people to get OS info
      "allowscreenshot": true, // allow screenshot
      "allowcmdexec": true, // allow command execution
      "allowreadfile": true, // allow the reading of files
      "allowphotoview": true, // allow the viewing of photos
      "allowntwinterfaces": true // allow the viewing of network interfaces(this might leak your ip)
  }
  ```
- Starting the bot:
  + using [node](nodejs.org)/[nodemon](https://nodemon.io):
    - node: `node index.js`
    - nodemon: `nodemon index.js`
  + using NPM:
    - `npm start`

### Commands List
- help
  + Usage: **.help**
  + Info: Lists all commands
- execute
  + Usage: **.execute `string`**
  + Info: executes a shell command
- screenshot
  + Usage: **.screenshot**
  + Info: takes a screenshot of the desktop
- host-info
  + Usage: **.host-info**
  + Info: gives all the user info
- ntw-interfaces
  + Usage: **.ntw-interfaces**
  + Info: gives all network interfaces
- readfile
  + Usage: **.readfile `path`**
  + Info: prints the content of the specified file
- photo
  + Usage: **.photo `path`**
  + Info: shows you the specified photo
