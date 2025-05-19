#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 🔹 Bubble Sort Function (Using a Third Variable for Swapping)
    void bubbleSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swapping using a third variable
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // 🔹 Bag of Tokens Score Function
    int bagOfTokensScore(vector<int>& tokens, int power) {
        bubbleSort(tokens);  // ✅ Using Bubble Sort
        int left = 0, right = tokens.size() - 1;
        int score = 0, maxScore = 0;

       while (left <= right) 
       {
            if (power >= tokens[left]) {  
                power -= tokens[left];  // Use power to gain score
                score++;
                maxScore = max(maxScore, score);
                left++;
            } 
            else if (score > 0) 
            {  
                power += tokens[right];  // Use score to gain power
                score--;
                right--;
            } 
            else break;  // No moves left
        }
        return maxScore;
    }
};
// 🔹 User Input and Execution
int main() {
    Solution sol;
    int n, power;
    
    cout << "Enter the number of tokens and initial power: ";
    cin >> n >> power;

    vector<int> tokens(n);
    cout << "Enter token values: ";
    for (int i = 0; i < n; i++) {
        cin >> tokens[i];
    }

    cout << "Max Score: " << sol.bagOfTokensScore(tokens, power) << endl;
    return 0;
}