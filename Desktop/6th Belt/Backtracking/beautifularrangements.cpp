#include <iostream>
#include <vector>

using namespace std;

class Solution {
    void calculate(int n,vector<bool>& visited, int& count,int pos) {
        if (pos > n) {
            count++;
            return;
        }
        for (int i = 1; i <= n; i++) {
            if (!visited[i] && (pos % i == 0 || i % pos == 0)) {
                visited[i] = true;
                calculate(n,visited, count,pos+1);
                visited[i] = false;
            }
        }  
    }

public:
    int countArrangement(int n) 
    {
        vector<bool> visited(n + 1, false);
        int count = 0;
         calculate(n,visited, count,1);
        return count;
    }
};

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;
    Solution sol;
    int result = sol.countArrangement(n);
    cout << result << endl;
    return 0;
}