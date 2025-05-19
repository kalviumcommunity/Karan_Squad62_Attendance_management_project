#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        unordered_map<int, int> fruitCount;
        int left = 0, maxFruits = 0, uniqueFruits = 0;
        for (int right = 0; right < fruits.size(); right++) {
            if (fruitCount[fruits[right]] == 0) 
            uniqueFruits++; // New fruit type
            fruitCount[fruits[right]]++;

            while (uniqueFruits > 2) { // If more than 2 fruit types
                fruitCount[fruits[left]]--; // Remove one fruit from left
                if (fruitCount[fruits[left]] == 0) uniqueFruits--; // Update count
                left++; // Shrink the window
            }

            maxFruits = max(maxFruits, right - left + 1); // Update max size
        }
        
        return maxFruits;
    }
};

// Driver Code
int main() {
    Solution sol;
    int n;
    cout << "Enter the number of fruits: ";
    cin >> n;

    vector<int> fruits(n);
    cout << "Enter the types of fruits in the row: ";
    for (int i = 0; i < n; i++) {
        cin >> fruits[i]; // Take input for fruit types
    }

    cout << "Max Fruits Collected: " << sol.totalFruit(fruits) << endl;
    return 0;
}