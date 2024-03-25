File Statistics Codegen Documentation
=====================================

Overview
--------

The File Statistics Codegen utility is a command-line tool designed to analyze a specified directory (and its subdirectories) to gather and report statistics on the occurrence of specific keywords within file names. This tool is particularly useful for software development projects, enabling developers to quickly assess the usage of various file types or naming conventions across their codebase.

Features
--------

*   **Recursive Directory Analysis**: Traverses the specified directory and all its subdirectories to analyze file names.
*   **Keyword Statistics**: Counts occurrences of predefined keywords in file names and calculates the percentage of files containing each keyword.
*   **Flexible Keyword Configuration**: Allows easy modification to add or remove keywords based on project needs.
*   **Tabulated Report**: Outputs the statistics in a clear, tabular format, listing each keyword, its occurrence count, and percentage.

Prerequisites
-------------

*   A C++ compiler that supports C++17 or newer.
*   Basic command-line interface (CLI) knowledge.

Installation
------------

This utility requires manual compilation from source code. Follow these steps to compile the utility:

1.  Ensure you have a compatible C++ compiler installed on your system.

2.  Save the source code to a file, for example, `FileStats.cpp`.

3.  Open a terminal or command prompt window.

4.  Navigate to the directory containing the source code file.

5.  Compile the source code using your C++ compiler. For instance, using `g++`:

    sh

    Copy code

    `g++ -std=c++17 FileStats.cpp -o FileStats`


Usage
-----

After compiling the utility, you can run it from the command line by providing a directory path as an argument.

### Basic Command Structure

sh

Copy code

`./FileStats <directory_path>`

Save to grepper

*   `<directory_path>`: The path to the directory you wish to analyze.

### Example Command

sh

Copy code

`./FileStats /path/to/my/project`

This command analyzes `/path/to/my/project`, counting and reporting the occurrences and percentages of specified keywords in file names within that directory and its subdirectories.

### Configuring Keywords

To modify the keywords that the utility searches for, you will need to edit the source code prior to compilation. Locate the `keywords` map in the source code and modify it as needed:

cpp

Copy code

`std::unordered_map<std::string, Stats> keywords = {     {".util", {}},     {".hook", {}},     // Add or remove keywords here };`

After modifying the keywords, recompile the utility to apply the changes.

Output Format
-------------

The utility outputs the statistics in a simple table format directly to the console. The table includes the keyword, the count of files containing that keyword, and the percentage of total files:

plaintext

Copy code

`Keyword, Count, Percent .util, 15, 10% .hook, 5, 3.33% ...`

Best Practices
--------------

*   **Backup Important Files**: Before running any new tool on your project, ensure you have backups or use version control to safeguard against accidental data loss.
*   **Review Source Code Changes**: If you modify the source code to change keywords or adjust functionality, review your changes carefully to ensure the utility functions as expected.

