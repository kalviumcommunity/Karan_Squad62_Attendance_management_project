#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void solve(vector<int>& candidates, int target, vector<int>& current, int index, vector<vector<int>>& result) {
        if (target == 0) { 
            result.push_back(current);
            return;
        }
        if (target < 0) return; // Stop if target becomes negative

        for (int i = index; i < candidates.size(); i++) {
            current.push_back(candidates[i]);
            solve(candidates, target - candidates[i], current, i, result); // Reduce target
            current.pop_back(); // Backtrack
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        solve(candidates, target, current, 0, result);
        return result;
    }
};

int main() {
    Solution sol;
    
    int n, target;
    cout << "Enter the number of elements in candidates: ";
    cin >> n;

    vector<int> candidates(n);
    cout << "Enter the elements of candidates: ";
    for (int i = 0; i < n; i++) {
        cin >> candidates[i];
    }

    cout << "Enter the target sum: ";
    cin >> target;

    vector<vector<int>> result = sol.combinationSum(candidates, target);

    // Printing the result without square brackets
    cout << "Combinations that sum to " << target << ":\n";
    for (const auto& combination : result) {
        for (int num : combination) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}