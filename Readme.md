# Simple Note app
A simple terminal note app i made to learn file system and node js

**How to run?** 
- run `node noteapp.js`

 ### **Commands:** 
* **create**: Creates a new note
    - Syntax: ``create [filename] [text]``,
* **append**: Adds to an existing note
    - Syntax: ``append [filename] [text]``,
* **delete**: Deletes a note
    - Syntax: ``delete [filename]``,
* **overwrite**: Overwrites an existing note
    - Syntax: ``create [filename] [text]``,
* **read**: Reads a note
    - Syntax: ``read [filename]``
* **rename**: Renames an existing file to newone
    - Syntax: ``rename [filename] [newfilename]``
* **create-alias**: Creates an alias to a command
- Syntax: `` create-alias [basecommandname] [alias]``
* **delete-alias**: Deletes an alias to a command
    - Syntax: `` selete-alias [basecommandname] [alias]``

## Todo:
- list all notes
- delete all command :heavy_check_mark:
- command alias :heavy_check_mark:
- edit command (different from overwrite or append)
- colorize the commands
- groups