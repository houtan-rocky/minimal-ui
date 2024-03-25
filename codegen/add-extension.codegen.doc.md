<div id="message-text-1e72b6fa-6f61-45a5-be5c-be988c5c13f4" class=" markdown prose w-full flex flex-col break-words dark:prose-invert">
    <h1>Project Update Utility Documentation</h1>
<h2>Overview</h2>
<p>The Project Update Utility (<code>updateProject</code>) is a command-line tool designed to help developers refactor their codebase by renaming React component files and updating their references throughout a web development project. This utility automates the renaming of component files to follow a new naming convention and ensures that all references to these components are correctly updated in the project's code files.</p>
<h2>Features</h2>
<ul>
<li>
<strong>Recursive Directory Traversal</strong>: Searches through all directories and subdirectories from a given root directory for React component files.</li>
<li>
<strong>Smart Renaming</strong>: Renames <code>.jsx</code> and <code>.tsx</code> files according to a specified naming convention, appending a custom extension before the existing file extension.</li>
<li>
<strong>Reference Updates</strong>: Scans all project files for import statements referencing the renamed component files and updates those references to the new file names.</li>
<li>
<strong>Ignore Patterns</strong>: Supports exclusion of files and directories by specifying patterns in a <code>.codegenignore</code> file, similar to <code>.gitignore</code>.</li>
</ul>
<h2>Prerequisites</h2>
<ul>
<li>A Unix-like operating system (Linux, macOS) or Windows with a compatible shell.</li>
<li>Basic command-line interface (CLI) knowledge.</li>
</ul>
<h2>Installation</h2>
<p>Currently, the <code>updateProject</code> utility does not have an automated installation process. You need to compile the source code manually using a C++ compiler that supports C++17 or later.</p>
<ol>
<li>
<p>Clone or download the utility's source code to your local machine.</p>
</li>
<li>
<p>Navigate to the source code directory.</p>
</li>
<li>
<p>Compile the source code using a C++ compiler. For example, using <code>g++</code>:</p>
<pre dir="ltr" class="w-full"><div class="dark bg-black mb-4 rounded-md">

<div class="p-4 overflow-y-auto">
<code class="!whitespace-pre hljs language-sh">g++ -std=c++17 updateProject.cpp -o updateProject
</code>
</div>
</div>
</pre>
</li>
</ol>
<h2>Usage</h2>
<p>To use the <code>updateProject</code> utility, follow these steps:</p>
<h3>Basic Command Structure</h3>
<pre dir="ltr" class="w-full" grepper_trigger_added="1" style="position: relative;"><div class="dark bg-black mb-4 rounded-md">

<div class="p-4 overflow-y-auto">
<code class="!whitespace-pre hljs language-sh">./updateProject &lt;project_root_path&gt; &lt;new_extension&gt; &lt;ignore_file_path&gt;
</code>
</div>
</div>
<div class="open_grepper_editor gpt_grepper_add_answer_trigger" title="Edit &amp; Save To Grepper">Save to grepper</div>
</pre>
<ul>
<li>
<code>&lt;project_root_path&gt;</code>: The path to the root directory of your project where the script starts processing.</li>
<li>
<code>&lt;new_extension&gt;</code>: The new extension (or part of the new file naming convention) you're adding to your React component files. This should include the period (<code>.</code>) at the beginning.</li>
<li>
<code>&lt;ignore_file_path&gt;</code>: The path to your <code>.codegenignore</code> file, which specifies the files or patterns to ignore during processing.</li>
</ul>
<h3>Example Command</h3>
<pre dir="ltr" class="w-full" grepper_trigger_added="1" style="position: relative;"><div class="dark bg-black mb-4 rounded-md">

<div class="p-4 overflow-y-auto">
<code class="!whitespace-pre hljs language-sh">./updateProject /path/to/my/react/project .component /path/to/my/react/project/.codegenignore
</code>
</div>
</div>
<div class="open_grepper_editor gpt_grepper_add_answer_trigger" title="Edit &amp; Save To Grepper">Save to grepper</div>
</pre>
<p>This command tells the utility to start at <code>/path/to/my/react/project</code>, rename React component files by appending <code>.component</code> before their existing extension, and ignore files listed in <code>/path/to/my/react/project/.codegenignore</code>.</p>
<h3>The <code>.codegenignore</code> File</h3>
<p>Create a <code>.codegenignore</code> file in your project directory to specify files or directories that the utility should ignore. The format is similar to <code>.gitignore</code>, with one pattern per line:</p>
<pre dir="ltr" class="w-full" grepper_trigger_added="1" style="position: relative;"><div class="dark bg-black mb-4 rounded-md">

<div class="p-4 overflow-y-auto">
<code class="!whitespace-pre hljs language-plaintext">node_modules/
build/
*.test.jsx
*.test.tsx
</code>
</div>
</div>
<div class="open_grepper_editor gpt_grepper_add_answer_trigger" title="Edit &amp; Save To Grepper">Save to grepper</div>
</pre>
<h2>Best Practices</h2>
<ul>
<li>
<strong>Backup Your Project</strong>: Always ensure you have a complete backup of your project before running the utility. This precaution helps prevent accidental data loss.</li>
<li>
<strong>Review Changes</strong>: After running the utility, review the changes made to your project files to ensure everything is as expected.</li>
<li>
<strong>Version Control</strong>: It's a good idea to commit changes to your version control system (e.g., Git) before and after running the utility. This practice makes it easier to track changes and revert them if necessary.</li>
</ul>

