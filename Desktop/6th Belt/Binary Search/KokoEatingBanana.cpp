#include <iostream>
#include <vector>
using namespace std;

// Function to calculate total hours needed to eat bananas at speed K
long long totalHours(vector<int>& piles, long long K) {
    long long hours = 0;
    for (int bananas : piles) {
        hours += (bananas + K - 1) / K;  // Equivalent to ceil(bananas / K)
    }
    return hours;
}

// Function to find the minimum rate to eat bananas
int minimumRateToEatBananas(vector<int>& v, int h) {
    long long low = 1;  

    // Find max element manually
    long long high = v[0];
    for (int i = 1; i < v.size(); i++) {
        if (v[i] > high) {
            high = v[i];
        }
    }

    int result = high;

    while (low <= high) {
        long long mid = low + (high - low) / 2; // Avoid overflow

        if (totalHours(v, mid) <= h) {
            result = mid;  // Try lower speed
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return result;
}

int main() {
    int n, h;
    cin >> n;
    vector<int> piles(n);
    for (int i = 0; i < n; i++) {
        cin >> piles[i];
    }
    cin >> h;
    int result = minimumRateToEatBananas(piles, h);
    cout<< result << endl;
    return 0;
}