#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int n1 = s1.size(), n2 = s2.size();
        if (n1 > n2) return false; // s1 can't be a substring if it's longer than s2

        vector<int> countS1(26, 0), countS2(26, 0);

        // Initialize frequency count for s1 and first window of s2
        for (int i = 0; i < n1; i++) {
            countS1[s1[i] - 'a']++;
           countS2[s2[i] - 'a']++;
        }

        // Check the first window
        if (countS1 == countS2) return true;

        // Sliding window: move right by adding a new character and removing the old one
        for (int i = n1; i < n2; i++) {
            countS2[s2[i] - 'a']++;      // Add new character
            countS2[s2[i - n1] - 'a']--; // Remove old character

            if (countS1 == countS2) return true; // If counts match, permutation found
        }

        return false; // No permutation found
    }
};

// Driver Code
int main() {
    Solution sol;
    string s1, s2;
    cout << "Enter s1: ";
    cin >> s1;
    cout << "Enter s2: ";
    cin >> s2;

    if (sol.checkInclusion(s1, s2))
        cout << "True (Permutation exists in s2)" << endl;
    else
        cout << "False (No permutation found in s2)" << endl;

    return 0;
}