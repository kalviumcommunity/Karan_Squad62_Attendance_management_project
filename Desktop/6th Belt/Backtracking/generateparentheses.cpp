#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void helper(vector<string>& result, string& s, int pos, int open, int close, int n) {
        if (pos == 2 * n) {
            result.push_back(s);
            return;
        }

        // Add open bracket if available
        if (open < n) 
        {
            s[pos] = '(';
            helper(result, s, pos + 1, open + 1, close, n);
        }
 
        // Add close bracket if it does not exceed open
        if (close < open) {
            s[pos] = ')';
            helper(result, s, pos + 1, open, close + 1, n);
        }
    }

    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string s(2 * n, ' '); // Preallocate string to avoid string concatenation overhead
        helper(result, s, 0, 0, 0, n);
        return result;
    }
};

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    Solution sol;
    vector<string> result = sol.generateParenthesis(n);

    cout << "Valid Parentheses Combinations:\n";
    for (const string& str : result) {
        cout << str << endl;
    }

    return 0;
}