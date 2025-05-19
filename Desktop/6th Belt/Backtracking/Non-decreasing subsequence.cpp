#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    void backtrack(vector<int>& nums, int start, vector<int>& subseq, vector<vector<int>>& result) {
        if (subseq.size() >= 2) {
            result.push_back(subseq);
        }

        unordered_set<int> used;  // To avoid duplicates at the same recursion level

        for (int i = start; i < nums.size(); i++) {
            if (!subseq.empty() && nums[i] < subseq.back()) {
                continue;  // Ensure non-decreasing order
            }
            if (used.find(nums[i]) != used.end()) {
                continue;  // Skip duplicate elements at the same depth level
            }

            used.insert(nums[i]);  // Mark the element as used in this recursion level
            subseq.push_back(nums[i]);  // Choose
            backtrack(nums, i + 1, subseq, result);  // Recurse
            subseq.pop_back();  // Backtrack
        }
    }

    vector<vector<int>> findSubsequences(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> subseq;
        backtrack(nums, 0, subseq, result);
        return result;
    }
};

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
    }
    Solution sol;
    vector<vector<int>> result = sol.findSubsequences(nums);
    for (const auto& seq : result) {
        for (int num : seq) {
            cout << num << " ";
        }
        cout << "\n";
    }

    return 0;
}