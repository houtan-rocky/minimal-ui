#include <iostream>
#include <filesystem>
#include <fstream>
#include <vector>
#include <string>
#include <regex>

namespace fs = std::filesystem;

std::vector<std::string> loadIgnorePatterns(const std::string& ignoreFilePath) {
    std::vector<std::string> ignorePatterns;
    std::ifstream file(ignoreFilePath);
    std::string line;
    while (getline(file, line)) {
        if (!line.empty()) {
            ignorePatterns.push_back(line);
        }
    }
    return ignorePatterns;
}

bool shouldIgnore(const fs::path& filePath, const std::vector<std::string>& ignorePatterns) {
    for (const auto& pattern : ignorePatterns) {
        if (filePath.string().find(pattern) != std::string::npos) {
            return true;
        }
    }
    return false;
}

void updateFileReferences(const fs::path& dirPath, const std::string& originalFilename, const std::string& newFilename, const std::vector<std::string>& ignorePatterns) {
    std::regex pattern("(['\"])" + originalFilename + "\\1");
    std::string replacement = "$1" + newFilename + "$1";
    for (const auto& entry : fs::recursive_directory_iterator(dirPath, fs::directory_options::skip_permission_denied)) {
        if (entry.is_regular_file() && !shouldIgnore(entry.path(), ignorePatterns)) {
            std::ifstream file(entry.path());
            std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
            file.close();

            if (std::regex_search(content, pattern)) {
                std::string updatedContent = std::regex_replace(content, pattern, replacement);
                std::ofstream outFile(entry.path());
                outFile << updatedContent;
                outFile.close();
            }
        }
    }
}

void renameFilesWithNewExtension(const fs::path& dirPath, const std::string& newExt, const std::vector<std::string>& ignorePatterns) {
    for (const auto& entry : fs::recursive_directory_iterator(dirPath, fs::directory_options::skip_permission_denied)) {
        if (entry.is_regular_file() && !shouldIgnore(entry.path(), ignorePatterns)) {
            fs::path filePath = entry.path();
            std::string originalFilename = filePath.filename().string();
            std::string originalStem = filePath.stem().string();

            if (originalFilename.find(newExt) == std::string::npos) {
                std::string newFilename = originalStem + newExt + filePath.extension().string();
                fs::path newFilePath = filePath.parent_path() / newFilename;

                try {
                    fs::rename(filePath, newFilePath);
                    std::cout << "Renamed: " << originalFilename << " to " << newFilename << std::endl;

                    // Update references in other files
                    updateFileReferences(dirPath, originalFilename, newFilename, ignorePatterns);
                } catch (const fs::filesystem_error& e) {
                    std::cerr << "Error renaming file: " << e.what() << std::endl;
                }
            }
        }
    }
}

int main(int argc, char* argv[]) {
    if (argc != 4) {
        std::cerr << "Usage: " << argv[0] << " <root_directory_path> <new_extension> <ignore_file_path>" << std::endl;
        return 1;
    }

    fs::path rootDirPath = argv[1];
    std::string newExt = argv[2];
    std::string ignoreFilePath = argv[3];

    if (newExt.front() != '.') {
        newExt = "." + newExt;
    }

    auto ignorePatterns = loadIgnorePatterns(ignoreFilePath);
    renameFilesWithNewExtension(rootDirPath, newExt, ignorePatterns);

    return 0;
}
