#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // Bubble Sort without using swap() function
    void bubbleSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Manual swapping without swap() function
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    int numRescueBoats(vector<int>& people, int limit) {
        bubbleSort(people); // Sort the array manually using Bubble Sort
        
        int left = 0, right = people.size() - 1;
        int boats = 0;

        while (left <= right) {
            if (people[left] + people[right] <= limit) {
                left++; // Pair lightest person with the heaviest
            }
            right--; // Always take the heaviest
            boats++; // Increase boat count
        }
        return boats;
    }
};

int main() {
    int n, limit;
    cout << "Enter number of people: ";
    cin >> n;
    
    vector<int> people(n);
    cout << "Enter weights of people: ";
    for (int i = 0; i < n; i++) {
        cin >> people[i];
    }
    
    cout << "Enter boat weight limit: ";
    cin >> limit;

    Solution sol;
    int result = sol.numRescueBoats(people, limit);

    cout << "Minimum number of boats required: " << result << endl;

    return 0;
}