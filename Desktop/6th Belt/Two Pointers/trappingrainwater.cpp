#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        if (height.empty()) return 0;

        int left = 0, right = height.size() - 1;
        int leftmax = 0, rightmax = 0;
        int water = 0;

        while (left <= right) {
            if (height[left] <= height[right]) 
            {
                if (height[left] >= leftmax) 
                {
                    leftmax = height[left];
                } 
                else 
                {
                    water += leftmax - height[left];  // Add to the trapped water
                }
                left++;  // Move the left pointer
            }  
            else 
            {
                if (height[right] >= rightmax) 
                {
                    rightmax = height[right];
                } 
                else 
                {
                    water += rightmax - height[right];  // Add to the trapped water
                }
                right--;  // Move the right pointer
            }
        }
        return water;
    }
};

int main() {
    Solution sol;
    
    // Input the number of elements in the array
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;

    // Input the heights
    vector<int> height(n);
    cout << "Enter the heights: ";
    for (int i = 0; i < n; ++i) {
        cin >> height[i];
    }

    // Calculate and output the result
    cout << "Water trapped: " << sol.trap(height) << endl;

    return 0;
}