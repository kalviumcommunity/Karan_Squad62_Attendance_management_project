#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) 
    {
        vector<int> subseq;
        for(int i=0; i<nums.size(); i++)
        {
            bool flag = false;
            for(int j=0; j<subseq.size(); j++)
            {
                if(subseq[j] >= nums[i])
                {
                    subseq[j] = nums[i];  // Replace the first greater/equal element
                    flag = true;
                    break;
                }
            }
            if(!flag)
            {
                subseq.push_back(nums[i]);  // Append if no replacement was done
            }
        } 
        return subseq.size();       
    }
};

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    Solution sol;  // Creating an instance of the Solution class
    cout << sol.lengthOfLIS(nums) << endl;  // Calling the function properly

    return 0;
}