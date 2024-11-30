#include <stdio.h>
#include <stdbool.h>

#define N 5

int G[N][N] = {
    {0, 1, 0, 1, 0},
    {1, 0, 1, 1, 1},
    {0, 1, 0, 0, 1},
    {1, 1, 0, 0, 1},
    {0, 1, 1, 1, 0}
};

int path[N];

void printCycle() {
    printf("Hamiltonian Cycle: ");
    for (int i = 0; i < N; i++) {
        printf("%d ", path[i]);
    }
    printf("%d\n", path[0]);
}

void NextValue(int k) {
    while (1) {
        path[k] = (path[k] + 1) % N;
        if (path[k] == 0) return;

        if (G[path[k - 1]][path[k]] != 0) {
            int j;
            for (j = 0; j < k; j++) {
                if (path[j] == path[k]) break;
            }
            if (j == k) {
                if ((k < N - 1) || ((k == N - 1) && G[path[N - 1]][path[0]] != 0)) return;
            }
        }
    }
}

void Hamiltonian(int k) {
    while (1) {
        NextValue(k);
        if (path[k] == 0) return;
        if (k == N - 1) {
            printCycle();
        } else {
            Hamiltonian(k + 1);
        }
    }
}

void findHamiltonianCycle() {
    for (int i = 0; i < N; i++) {
        path[i] = 0;
    }
    path[0] = 1;
    Hamiltonian(1);
}

int main() {
    findHamiltonianCycle();
    return 0;
}
