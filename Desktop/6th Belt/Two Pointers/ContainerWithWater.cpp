#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int lp = 0, rp = height.size() - 1;
        int maxWater = 0;
        
        while (lp < rp) {
            int width = rp - lp;
            int ht = min(height[lp], height[rp]);
            int currWater = width * ht;
            maxWater = max(maxWater, currWater);

            if (height[lp] < height[rp]) 
            {
                lp++;
            } 
            else {
                rp--;
            }
        }
        
        return maxWater;
    }
};

int main() {
    int n;
    cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) 
    {
        cin >> height[i];
    }
    Solution sol;
    int result = sol.maxArea(height);
    cout << "Maximum Water Area: " << result << endl;

    return 0;
}