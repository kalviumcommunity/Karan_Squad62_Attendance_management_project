#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // Bubble Sort Implementation
    void bubbleSort(vector<int>& arr) 
    {
        int n = arr.size();
        for (int i = 0; i < n- 1; i++) 
        {
            for (int j = 0; j < n - i - 1; j++) 
            {
                if (arr[j] > arr[j + 1]) 
                {
                    // Swap without using swap()
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    void solve(vector<int>& candidates, int target, vector<int>& curr, int index, vector<vector<int>>& result) {
        if (target < 0) 
        {
            return;
        }
        if (target == 0) 
        {
            result.push_back(curr);
            return;
        }

        for (int i = index; i < candidates.size(); i++) {
            if (i > index && candidates[i] == candidates[i - 1]) 
            {
                continue;
            }

            curr.push_back(candidates[i]);  // DO
            solve(candidates, target - candidates[i], curr, i + 1, result);  // EXPLORE
            curr.pop_back();  // UNDO
        }
    }

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> curr;
        
        bubbleSort(candidates);  // Sorting using Bubble Sort
        solve(candidates, target, curr, 0, result);

        return result;
    }
};

int main() {
    int n, target;
    cin >> n;
    
    vector<int> candidates(n);
    for (int i = 0; i < n; i++) {
        cin >> candidates[i];
    }
    
    cin >> target;
    
    Solution sol;
    vector<vector<int>> result = sol.combinationSum2(candidates, target);
    for (auto& comb : result) {
        for (int num : comb) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}