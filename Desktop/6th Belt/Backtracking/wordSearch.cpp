#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool search(vector<vector<char>>& board, string& word, int i, int j, int index) {
        if (index == word.length()) return true;  // Word found
        
        if (i < 0 || j < 0 || i >= board.size() || j >= board[0].size() || board[i][j] != word[index])
            return false;  // Out of bounds or mismatch

        char temp = board[i][j];  // Store current character
        board[i][j] = '*';  // Mark as visited

        // Explore all 4 directions
        bool found = search(board, word, i + 1, j, index + 1) ||
                     search(board, word, i - 1, j, index + 1) ||
                     search(board, word, i, j + 1, index + 1) ||
                     search(board, word, i, j - 1, index + 1);

        board[i][j] = temp;  // Restore original value
        return found;
    }

    bool exist(vector<vector<char>>& board, string word) {
        int rows = board.size(), cols = board[0].size();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] == word[0] && search(board, word, i, j, 0))
                    return true;
            }
        }
        return false;
    }
};

int main() {
    int rows, cols;
    cin >> rows >> cols;

    vector<vector<char>> board(rows, vector<char>(cols));

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cin >> board[i][j];
        }
    }

    string word;
    cin >> word;
    
    Solution sol;
    cout << (sol.exist(board, word) ? "true" : "false") << endl;

    return 0;
}