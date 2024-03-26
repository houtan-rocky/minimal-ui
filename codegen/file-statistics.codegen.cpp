#include <iostream>
#include <filesystem>
#include <unordered_map>
#include <vector>
#include <string>
#include <fstream>
#include <algorithm>

namespace fs = std::filesystem;

struct Stats {
    int count = 0;
    float percent = 0.0f;
};

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

bool shouldIgnore(const fs::path& path, const std::vector<std::string>& ignorePatterns) {
    for (const auto& pattern : ignorePatterns) {
        // Check if the current path or any of its parent paths match the ignore patterns
        for (auto p = path; p != p.root_path(); p = p.parent_path()) {
            if (p.filename().string().find(pattern) != std::string::npos) {
                return true;
            }
        }
    }
    return false;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <directory_path>" << std::endl;
        return 1;
    }

    std::string path = argv[1];
    std::string ignoreFilePath = ".codegenignore";
    auto ignorePatterns = loadIgnorePatterns(ignoreFilePath);

    std::unordered_map<std::string, Stats> keywords = {
        {".util", {}},
        {".hook", {}},
        {".component", {}},
        {".page", {}},
        {".api", {}},
        {".mock-api", {}},
        {".test", {}},
        {".spec", {}},
        {".config", {}},
        {".lock", {}}
    };

    int totalFiles = 0;

    for (const auto& entry : fs::recursive_directory_iterator(path, fs::directory_options::skip_permission_denied)) {
        if (entry.is_regular_file() && !shouldIgnore(entry.path(), ignorePatterns)) {
            totalFiles++;
            std::string filename = entry.path().filename().string();

            for (auto& [key, stat] : keywords) {
                if (filename.find(key) != std::string::npos) {
                    stat.count++;
                }
            }
        }
    }

    for (auto& [key, stat] : keywords) {
        if (totalFiles > 0) {
            stat.percent = (static_cast<float>(stat.count) / totalFiles) * 100;
        }
    }

    std::cout << "Keyword, Count, Percent" << std::endl;
    for (const auto& [key, stat] : keywords) {
        std::cout << key << ", " << stat.count << ", " << stat.percent << "%" << std::endl;
    }

    return 0;
}
