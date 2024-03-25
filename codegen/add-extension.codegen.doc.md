File Renaming and Reference Update Utility Documentation
========================================================

Overview
--------

The File Renaming and Reference Update Utility is a versatile command-line tool designed to assist developers in refactoring their codebases. It automates the process of renaming files within a specified directory (and its subdirectories) by appending a new extension to the filenames before their existing extension. Additionally, it updates all references to these renamed files across various code files, ensuring consistency and integrity within the project.

Features
--------

*   **Recursive File Renaming**: Automatically renames files, appending a specified extension before the file's original extension, across a specified directory and its subdirectories.
*   **Smart Reference Updating**: Scans and updates references to the renamed files in code files, supporting a range of file types including `.js`, `.jsx`, `.ts`, and `.tsx`.
*   **Ignore Pattern Support**: Excludes files and directories from being processed based on patterns specified in a `.codegenignore` file, similar to `.gitignore`.
*   **Versatile File Support**: Operates on a wide array of file types, making it suitable for projects in languages like JavaScript, TypeScript, and frameworks like React.

Prerequisites
-------------

*   A modern C++ compiler that supports C++17 or newer.
*   Familiarity with the command-line interface (CLI).
*   Basic understanding of regular expressions and file paths.

Installation
------------

This utility must be compiled from the provided source code. Follow these steps to prepare the utility for use:

1.  Ensure you have a C++ compiler installed that supports C++17 standards.

2.  Save the provided source code to a file named `fileRenameUpdate.cpp`.

3.  Open a terminal or command prompt.

4.  Navigate to the directory containing `fileRenameUpdate.cpp`.

5.  Compile the source code using the following command (example for `g++`):

    sh

    Copy code

    `g++ -std=c++17 fileRenameUpdate.cpp -o fileRenameUpdate`


Usage
-----

After compiling the utility, execute it from the command line by providing the required arguments.

### Command Structure

sh

Copy code

`./fileRenameUpdate <root_directory_path> <new_extension> <ignore_file_path>`

*   `<root_directory_path>`: Path to the root directory of the project where files should be renamed.
*   `<new_extension>`: The new extension to append to file names, before their existing extension.
*   `<ignore_file_path>`: Path to the `.codegenignore` file containing patterns of files and directories to ignore.

### Example Usage

sh

Copy code

`./fileRenameUpdate /path/to/project .new /path/to/project/.codegenignore`

This command will rename files in `/path/to/project`, appending `.new` before their current extension, and update references in the project accordingly. It will ignore files and directories specified in `/path/to/project/.codegenignore`.

### The `.codegenignore` File

The `.codegenignore` file should contain one pattern per line, specifying files and directories to be ignored during the renaming and reference updating process:

Copy code

`node_modules/ dist/ *.min.js`

Best Practices
--------------

*   **Backup Your Project**: Always backup your project before running this utility to prevent accidental data loss.
*   **Version Control**: Use a version control system like Git to track changes made by this utility. This approach allows easy reversion if necessary.
*   **Test After Use**: After running the utility, thoroughly test your project to ensure that all references have been correctly updated and that there are no broken dependencies.

