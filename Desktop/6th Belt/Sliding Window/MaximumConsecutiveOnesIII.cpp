#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, maxLength = 0, zeroCount = 0;

        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] == 0) zeroCount++; // Count zeros in the window

            while (zeroCount > k) { // If zeros exceed k, shrink window
                if (nums[left] == 0) zeroCount--;
                left++;
            }

            maxLength = max(maxLength, right - left + 1); // Update max length
        }

        return maxLength;
    }
};

// Driver Code
int main() {
    Solution sol;
    int n, k;
    cout << "Enter the number of elements: ";
    cin >> n;
    vector<int> nums(n);
    
    cout << "Enter the binary array: ";
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    cout << "Enter the maximum flips (k): ";
    cin >> k;
    int result = sol.longestOnes(nums,k);
    cout << result;
    return 0;
}