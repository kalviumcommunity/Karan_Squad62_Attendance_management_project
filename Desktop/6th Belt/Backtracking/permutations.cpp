#include <iostream>
#include <vector>

using namespace std;

class Solution 
{ 
public:
    void solve(vector<int>& nums, vector<vector<int>>& ans, int index) {
        if (index >= nums.size()) {
            ans.push_back(nums);
            return;
        }
        for (int i = index; i < nums.size(); i++) {
            int temp = nums[index];
            nums[index] = nums[i];
            nums[i] = temp;

            solve(nums, ans, index + 1);

            temp = nums[index];
            nums[index] = nums[i];
            nums[i] = temp;
        }
    }


    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> ans;
        solve(nums, ans, 0);
        return ans;
    }
};

int main() 
{
    Solution solution;
    int n;
    
    // Taking input size
    cout << "Enter the number of elements: ";
    cin >> n;
    
    vector<int> nums(n);
    
    // Taking array input from user
    cout << "Enter the elements: ";
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    // Get all permutations
    vector<vector<int>> result = solution.permute(nums);

    // Printing results in a clean format
    cout << "All possible permutations:\n";
    for (const auto& perm : result) {
        for (int num : perm) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}