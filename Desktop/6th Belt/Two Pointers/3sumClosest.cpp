#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

class Solution {
public:
    // Bubble Sort implementation
    void bubbleSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j+1];
                    nums[j+1] = nums[j];
                    nums[j] = temp;
                }
            }
        }
    }

    int threeSumClosest(vector<int>& nums, int target) {
        int n = nums.size();
        int closestSum = 100000;

        // Use bubble sort instead of std::sort
        bubbleSort(nums);

        for (int k = 0; k <= n - 3; k++) {
            int i = k + 1;
            int j = n - 1;

            while (i < j) {
                int sum = nums[k] + nums[i] + nums[j];

                if (abs(target - sum) < abs(target - closestSum))
                    closestSum = sum;

                if (sum < target)
                    i++;
                else
                    j--;
            }
        }
        return closestSum;
    }
};

int main() {
    int n, target;
    cout << "Enter the number of elements: ";
    cin >> n;

    vector<int> nums(n);
    cout << "Enter " << n << " elements: ";
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    cout << "Enter target value: ";
    cin >> target;

    Solution sol;
    cout << "Closest sum: " << sol.threeSumClosest(nums, target) << endl;
    return 0;
}