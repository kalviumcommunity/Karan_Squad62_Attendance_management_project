#include <iostream>
#include <vector>
#include <algorithm>  // For max()
using namespace std;

class Solution {
public:
    string pushDominoes(string dominoes) {
        int n = dominoes.size();
        vector<int> forces(n, 0);
        
        // Left to Right (Applying 'R' force)
        int force = 0;
        for (int i = 0; i < n; i++) {
            if (dominoes[i] == 'R') force = n;  // Strongest force
            else if (dominoes[i] == 'L') force = 0; // Reset force
            else force = max(force - 1, 0); // Decrease force
            forces[i] += force;
        }

        // Right to Left (Applying 'L' force)
        force = 0;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes[i] == 'L') force = n;  
            else if (dominoes[i] == 'R') force = 0;
            else force = max(force - 1, 0);
            forces[i] -= force;
        }

        // Constructing the result
        string result = "";
        for (int i = 0; i < n; i++) {
            if (forces[i] > 0) result += 'R';
            else if (forces[i] < 0) result += 'L';
            else result += '.';
        }
        return result;
    }
};

int main() {
    string dominoes;
    cout << "Enter the dominoes string: ";
    cin >> dominoes;

    Solution sol;
    string result = sol.pushDominoes(dominoes);

    cout << "Final state of dominoes: " << result << endl;
    
    return 0;
}