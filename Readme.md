# Simple Note app
A simple terminal note app i made to learn file system and node js

**How to run?** 
- run `node noteapp.js`

 ### **Commands:** 
* **create**: Creates a new note
    - Syntax: ``create [notename] [text]``,
* **append**: Adds to an existing note
    - Syntax: ``append [notename] [text]``,
* **delete**: Deletes a note
    - Syntax: ``delete [notename]``,
* **overwrite**: Overwrites an existing note
    - Syntax: ``create [notename] [text]``,
* **read**: Reads a note
    - Syntax: ``read [notename]``
* **rename**: Renames an existing file to newone
    - Syntax: ``rename [notename] [newfilename]``
* **create-alias**: Creates an alias to a command
- Syntax: `` create-alias [basecommandname] [alias]``
* **delete-alias**: Deletes an alias to a command
    - Syntax: `` selete-alias [basecommandname] [alias]``
* **edit**: Reads a file and allows overwrite
    - Syntax: `` edit [notename]``

## Todo:
- list all notes
- delete all command :heavy_check_mark:
- command alias :heavy_check_mark:
- edit command ( read + overwrite)  :heavy_check_mark:
- colorize the commands
- groups