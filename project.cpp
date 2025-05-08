#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

vector<string> textBuffer;

bool openFile(const string& filename) {
    ifstream file(filename);
    if (!file) {
        return false; // File not found
    }

    textBuffer.clear();
    string line;
    while (getline(file, line)) {
        textBuffer.push_back(line);
    }

    file.close();
    cout << "File loaded successfully.\n";
    return true;
}

void saveFile(const string& filename) {
    ofstream file(filename);
    for (const auto& line : textBuffer) {
        file << line << '\n';
    }
    file.close();
    cout << "File saved successfully.\n";
}

void displayText() {
    cout << "\n--- Text Buffer ---\n";
    for (size_t i = 0; i < textBuffer.size(); ++i) {
        cout << i + 1 << ": " << textBuffer[i] << '\n';
    }
    cout << "-------------------\n";
}

void editLine(int lineNumber) {
    if (lineNumber < 1 || lineNumber > textBuffer.size()) {
        cout << "Invalid line number.\n";
        return;
    }
    cout << "Current line: " << textBuffer[lineNumber - 1] << '\n';
    cout << "Enter new content: ";
    cin.ignore();
    getline(cin, textBuffer[lineNumber - 1]);
    cout << "Line updated.\n";
}

void deleteLine(int lineNumber) {
    if (lineNumber < 1 || lineNumber > textBuffer.size()) {
        cout << "Invalid line number.\n";
        return;
    }
    textBuffer.erase(textBuffer.begin() + lineNumber - 1);
    cout << "Line deleted.\n";
}

void searchText(const string& word) {
    bool found = false;
    for (size_t i = 0; i < textBuffer.size(); ++i) {
        if (textBuffer[i].find(word) != string::npos) {
            cout << "Found on line " << i + 1 << ": " << textBuffer[i] << '\n';
            found = true;
        }
    }
    if (!found) cout << "Word not found.\n";
}

void replaceText(const string& oldWord, const string& newWord) {
    int count = 0;
    for (auto& line : textBuffer) {
        size_t pos = 0;
        while ((pos = line.find(oldWord, pos)) != string::npos) {
            line.replace(pos, oldWord.length(), newWord);
            pos += newWord.length();
            count++;
        }
    }
    cout << "Replaced " << count << " occurrence(s).\n";
}

int main() {
    int choice;
    string filename;

    cout << "Simple Command-Line Text Editor\n";
    cout << "Enter filename to open: ";
    cin >> filename;

    // Check if file exists and load
    if (!openFile(filename)) {
        cout << "Error: File not found. Exiting program.\n";
        return 1;
    }

    // Main menu loop
    do {
        cout << "\nMenu:\n";
        cout << "1. Display Text\n";
        cout << "2. Edit Line\n";
        cout << "3. Delete Line\n";
        cout << "4. Search\n";
        cout << "5. Replace\n";
        cout << "6. Save\n";
        cout << "7. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                displayText();
                break;
            case 2: {
                int lineNumber;
                cout << "Enter line number to edit: ";
                cin >> lineNumber;
                editLine(lineNumber);
                break;
            }
            case 3: {
                int lineNumber;
                cout << "Enter line number to delete: ";
                cin >> lineNumber;
                deleteLine(lineNumber);
                break;
            }
            case 4: {
                string word;
                cout << "Enter word to search: ";
                cin >> word;
                searchText(word);
                break;
            }
            case 5: {
                string oldWord, newWord;
                cout << "Enter word to replace: ";
                cin >> oldWord;
                cout << "Enter new word: ";
                cin >> newWord;
                replaceText(oldWord, newWord);
                break;
            }
            case 6:
                saveFile(filename);
                break;
            case 7:
                cout << "Exiting editor...\n";
                break;
            default:
                cout << "Invalid choice. Try again.\n";
        }

    } while (choice != 7);

    return 0;
}
 