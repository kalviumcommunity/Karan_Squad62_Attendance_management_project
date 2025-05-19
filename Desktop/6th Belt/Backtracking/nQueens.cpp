#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;
        vector<string> board(n, string(n, '.'));
        solve(0, ans, board, n);
        return ans;
    }

    bool isSafe(int row, int col, vector<string>& board, int n) {
        int x = row, y = col;

        // Check left side
        while (y >= 0) {
            if (board[x][y] == 'Q') return false;
            y--;
        }

        // Check upper-left diagonal
        x = row, y = col;
        while (x >= 0 && y >= 0) {
            if (board[x][y] == 'Q') return false;
            x--;
            y--;
        }

        // Check lower-left diagonal (fixed)
        x = row, y = col;
        while (x < n && y >= 0) {
            if (board[x][y] == 'Q') return false;
            x++;  
            y--;
        }

        return true;
    }
    
    void solve(int col, vector<vector<string>>& ans, vector<string>& board, int n) {
        if (col == n) {
            ans.push_back(board);
            return;
        }

        for (int row = 0; row < n; row++) {
            if (isSafe(row, col, board, n)) {
                board[row][col] = 'Q';
                solve(col + 1, ans, board, n);
                board[row][col] = '.'; // Backtrack
            }
        }
    }
};

int main() {
    Solution sol;
    int n;
    cout << "Enter the value of N: ";
    cin >> n;

    vector<vector<string>> solutions = sol.solveNQueens(n);

    cout << "Total solutions: " << solutions.size() << "\n";
    for (const auto& board : solutions) {
        for (const string& row : board) {
            cout << row << "\n";
        }
        cout << "\n";
    }

    return 0;
}