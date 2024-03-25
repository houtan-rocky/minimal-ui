#include <fstream>
#include <iostream>
#include <filesystem>
#include <unordered_map>
#include <vector>
#include <string>

namespace fs = std::filesystem;

std::vector<std::string> loadIgnorePatterns(const std::string& ignoreFilePath) {
    std::vector<std::string> patterns;
    std::ifstream file(ignoreFilePath);
    std::string line;
    while (std::getline(file, line)) {
        if (!line.empty()) {
            patterns.push_back(line);
        }
    }
    return patterns;
}

bool shouldIgnore(const fs::path& path, const std::vector<std::string>& ignorePatterns) {
    for (const auto& pattern : ignorePatterns) {
        if (path.string().find(pattern) != std::string::npos) {
            return true;
        }
    }
    return false;
}

void updateFileReferences(const fs::path& filePath, const std::unordered_map<std::string, std::string>& renamedFiles) {
    std::ifstream file(filePath);
    std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    file.close();

    bool modified = false;
    for (const auto& [oldName, newName] : renamedFiles) {
        if (content.find(oldName) != std::string::npos) {
            content.replace(content.find(oldName), oldName.length(), newName);
            modified = true;
        }
    }

    if (modified) {
        std::ofstream outFile(filePath);
        outFile << content;
        outFile.close();
    }
}

void processDirectory(const fs::path& dirPath, const std::string& newExt, const std::vector<std::string>& ignorePatterns, std::unordered_map<std::string, std::string>& renamedFiles) {
    for (const auto& entry : fs::recursive_directory_iterator(dirPath, fs::directory_options::skip_permission_denied)) {
        if (entry.is_regular_file() && !shouldIgnore(entry.path(), ignorePatterns)) {
            fs::path filePath = entry.path();
            std::string originalFilename = filePath.filename().string();
            std::string originalStem = filePath.stem().string();

            if (!filePath.extension().empty() && originalStem.find(newExt) == std::string::npos) {
                std::string newFilename = originalStem + newExt + filePath.extension().string();
                fs::path newFilePath = filePath.parent_path() / newFilename;

                fs::rename(filePath, newFilePath);
                renamedFiles[filePath.string()] = newFilePath.string();
            }
        }
    }
}

int main(int argc, char* argv[]) {
    if (argc != 4) {
        std::cerr << "Usage: " << argv[0] << " <root_directory_path> <new_extension> <.codegenignore_path>" << std::endl;
        return 1;
    }

    std::string rootPath = argv[1];
    std::string newExt = argv[2];
    std::string ignoreFilePath = argv[3];
    auto ignorePatterns = loadIgnorePatterns(ignoreFilePath);

    if (newExt.front() != '.') {
        newExt = "." + newExt;
    }

    std::unordered_map<std::string, std::string> renamedFiles;
    processDirectory(rootPath, newExt, ignorePatterns, renamedFiles);

    // Update references in all files except those ignored
    for (const auto& entry : fs::recursive_directory_iterator(rootPath, fs::directory_options::skip_permission_denied)) {
        if (entry.is_regular_file() && !shouldIgnore(entry.path(), ignorePatterns)) {
            updateFileReferences(entry.path(), renamedFiles);
        }
    }

    return 0;
}
