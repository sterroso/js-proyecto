# Web Browser Sudoku

El juego de **Sudoku** parece muy simple. El objetivo es llenar una cuadrícula de 9
filas y 9 columnas, dividida en 9 submatrices, cada una de tres (3) filas y tres
(3) columnas, con números del uno (1) al nueve (9), en ningún orden particular, sin
que estos se repitan en una misma fila, en una misma columna, ni en la submatriz en
la que se encuentra cada celda.

## El Tablero de Sudoku

Un tablero, correctamente lleno, debe verse como el siguiente:

|     |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|**A**|  4  |  9  |  3  |  1  |  7  |  6  |  2  |  8  |  5  |
|**B**|  5  |  2  |  7  |  8  |  4  |  9  |  1  |  3  |  6  |
|**C**|  8  |  1  |  6  |  2  |  5  |  3  |  4  |  7  |  9  |
|**D**|  2  |  5  |  1  |  9  |  3  |  7  |  6  |  4  |  8  |
|**E**|  7  |  8  |  4  |  6  |  2  |  1  |  5  |  9  |  3  |
|**F**|  6  |  3  |  9  |  4  |  8  |  5  |  7  |  1  |  2  |
|**G**|  9  |  6  |  5  |  7  |  1  |  8  |  3  |  2  |  4  |
|**H**|  3  |  7  |  2  |  5  |  9  |  4  |  8  |  6  |  1  |
|**I**|  1  |  4  |  8  |  3  |  6  |  2  |  9  |  5  |  7  |

 Todos los números, del uno (1) al nueve (9), sin repetirse en fila, columna o submatriz.

## Objetivo del juego

Una vez que el tablero se encuentra completamente lleno, se borran algunos números
en unicaciones aleatorias, dejando suficientes pistas para que el jugador pueda
resolver el tablero rellenando los espacios en blanco, considerando las reglas antes
mencionadas.

## Alcances del proyecto

El código debe ser capaz de:

1. Generar un tablero completamente lleno, considerando las reglas del **Sudoku**.
2. Dejar algunos espacios en blanco con suficientes pistas para que el jugador
pueda llenarlos, de acuerdo con las reglas del **Sudoku**, y llegar al mismo
tablero generado en el paso 1.
3. Validar las respuestas del jugador contra el tablero generado en el paso 1.

## Características adicionales

Además, sería ideal que la interfaz sea capaz de permitir, al jugador, contar con
algunas pistas visuales que le permita visualizar con mayor facilidad la fila,
columna y submatriz en la que se encuentra, hacer anotaciones de los números
"candidatos" que pueden colocarse en las celdas vacías, guardar el juego para
continuarlo en otro momento, elegir entre varios niveles de dificultad, tomar
el tiempo que le lleva resolver un tablero y llevar registro de sus estadísticas
por nivel de dificultad y tiempo para resolverlo.
 