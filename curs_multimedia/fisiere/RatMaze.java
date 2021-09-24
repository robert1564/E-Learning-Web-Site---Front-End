public class RatMaze {

    // Marimea labirintului
    static int N;

    /* O funtie utilitara care scrie
    solutile matricei sol[N][N] */
    void printSolution(int sol[][])
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(
                        " " + sol[i][j] + " ");
            System.out.println();
        }
    }

    /* O functie utilitare care verifica
        daca x, y sunt un index valid pentru labrintul N*N */
    boolean isSafe(
            int maze[][], int x, int y)
    {
        // daca (x, y nu sunt in labirint) return false
        return (x >= 0 && x < N && y >= 0
                && y < N && maze[x][y] == 1);
    }

    /* Aceasta funtie rezolva problema labirintului
    folosind backtracking. In principal foloseste
    solveMazeUtil() sa rezolve problema. Returneaza
    fals daca nu exista nici un drum posibil, alfel
    returneaza true si scrie drumul in forma pe care
    am dat-o. */
    boolean solveMaze(int maze[][])
    {
        int sol[][] = new int[N][N];

        if (solveMazeUtil(maze, 0, 0, sol) == false) {
            System.out.print("Solutia nu exista");
            return false;
        }

        printSolution(sol);
        return true;
    }

    /* O funtie recursiva are intra in algoritmul de
    rezolvare. */
    boolean solveMazeUtil(int maze[][], int x, int y,
                          int sol[][])
    {
        // daca (x, y sunt valide) return true
        if (x == N - 1 && y == N - 1
                && maze[x][y] == 1) {
            sol[x][y] = 1;
            return true;
        }

        // Verifica daca maze[x][y] este valid
        if (isSafe(maze, x, y) == true) {
            // marcheaza x, y ca parte din solutie
            sol[x][y] = 1;

            /* Se misca inainte in directia X */
            if (solveMazeUtil(maze, x + 1, y, sol))
                return true; 
  
            /* Daca miscarea in directia x nu ofera
            o solutie, atunci se muta in jos spre
            directia y  */
            if (solveMazeUtil(maze, x, y + 1, sol))
                return true; 
  
            /* Daca nici una din directile x si y nu
            * sunt bune se intoarce inapoi pe drum
            * pentru a gasi un alt drum. */
            sol[x][y] = 0;
            return false;
        }

        return false;
    }

    public static void main(String args[])
    {
        RatMaze rat = new RatMaze();
        int maze[][] = { { 1, 0, 0, 0 },
                { 1, 1, 0, 1 },
                { 0, 1, 0, 0 },
                { 1, 1, 1, 1 } };

        N = maze.length;
        rat.solveMaze(maze);
    }
} 