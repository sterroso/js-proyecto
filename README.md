# Web Browser Sudoku

El juego de **Sudoku** es muy simple. El objetivo es llenar una cuadrícula de 9
filas y 9 columnas, dividida en 9 submatrices, cada una de tres (3) filas y tres
(3) columnas, con números del uno (1) al nueve (9), en ningún orden particular, sin
que estos se repitan en una misma fila, en una misma columna, ni en la submatriz en
la que se encuentra cada celda.

## Objetivo del juego

Generalmente, el juego inicia con una cuadrícula parcialmente llena, es tarea del
jugador llenarla por completo con los números que hacen falta, siguiendo siempre
las siguientes siete reglas:

1. El **tablero** de **Sudoku** se compone por una matriz de nueve (9) **filas** x nueve
(9) **columnas**, subdividido en nueve (9) **submatrices**, cada una de tres (3) **filas** x
tres (3) **columnas**.
2. Al cruce de una **fila** y una **columna** se le llama **celda**. El **tablero** tiene
un total de ochenta y un **celdas**.
3. En cada **fila** del **tablero** deben ir **todos** los números del uno (1) al nueve
(9), sin ningún orden específico.
4. En cada **columna** del **tablero** deben ir **todos** los números del uno (1) al nueve
(9), sin ningún orden específico.
5. En cada **sumbatriz** del **tablero** deben ir **todos** los números de uno (1) al nueve
(9), sin ningún orden específico.
6. Considerando lo anterior, ninguna **celda** queda vacía, ningún número se repite en
cada **fila**, **columna** o **submatriz** del **tablero**.
7. Cada **tablero** tiene una, y sólo una, posible **solución**.

Cuando el jugador ha llenado todas las **celdas** del tablero, y todas cumplen con las reglas
anteriores, se puede decir que el **tablero** ha sido resuelto satisfactoriamente.

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

## Objetivo del proyecto

El objetivo principal del proyecto es generar un tablero de Sudoku con algunos espacios
vacíos para que el usuario pueda jugar tratando de rellenarlos cumpliendo las reglas
del juego de Sudoku. Para ello, el resultado final deberá:

1. Generar un tablero de **Sudoku** completamente lleno (la respuesta correcta),
2. Permitir al usuario elegir entre tres niveles de dificultad: *fácil*, *medio* y
*difícil*, en orden creciente de dificultad.
3. Dependiendo del nivel de dificultad elegido por el usuario, generar un segundo
tablero (el tablero de juego) borrando algunos números en celdas ubicadas
aleatoriamente para que el usuario las intente rellenar con las respuestas correctas,
4. Dibujar correctamente el tablero de juego en la página.
5. Permitir la interacción del usuario haciendo clic en las celdas vacías para que
introduzca el número que desee (del 1 al 9),
6. Permitir al usuario pausar el juego, guardándolo para continuar después.
7. Permitir al usuario cargar un juego guardado para continuar resolviéndolo.
8. Una vez completamente lleno el tablero, permitirle al usuario validar sus respuestas.
9. Si el tablero de juego es igual a la respuesta correcta, guardar la estadística del
usuario, incluyendo nivel de dificultad, fecha de inicio, fecha de terminación y tiempo
total de juego (minutos, segundos y décimas de segundo).

## Alcances mínimos del proyecto (MVP)

El código debe ser capaz de:

1. Generar un tablero completamente lleno, considerando las reglas del **Sudoku**.
2. Dejar algunos espacios en blanco con suficientes pistas para que el jugador
pueda llenarlos, de acuerdo con las reglas del **Sudoku**, y llegar al mismo
tablero generado en el paso 1.
3. Dibujar correctamente el tablero en el navegador.
4. Permitir la interacción con el usuario: elegir las celdas vacías y permitir
que introduzca números del 1 al 9.
5. Validar las respuestas del jugador contra el tablero generado en el paso 1.

## Características adicionales deseables

Además, sería ideal que la interfaz sea capaz de permitir, al jugador, contar con
algunas pistas visuales que le permita visualizar con mayor facilidad la fila,
columna y submatriz en la que se encuentra, hacer anotaciones de los números
"candidatos" que pueden colocarse en las celdas vacías, guardar el juego para
continuarlo en otro momento, elegir entre varios niveles de dificultad, tomar
el tiempo que le lleva resolver un tablero y llevar registro de sus estadísticas
por nivel de dificultad y tiempo para resolverlo.

## Autor

Mi nombre es [Sergio Terroso Cabrera](mailto:sergio.terroso@gmail.com), estudiante
del curso de JavaScript, comisión 37515, en [Coderhouse](https://www.coderhouse.com.mx/)
durante la primavera de 2022.

## Dedicatorias y Agradecimientos

Dedico este proyecto a mis hijos **Diego** y **Pablo**, por su apoyo y entusiasmo;
a **Marisol** por su comprensión; a mi Papá **Carlos** y a mi Mamá **Esperanza**,
quienes aunque no entendían lo que les compartía sobre mi curso y mi proyecto,
siempre me dieron ánimos para continuar, a mis hermanas **Alejandra** y **Silvia**,
por su entusiarmo y por creer en mí; a **Don Sixto** y **Don Pepe**, mis jefes, quienes
me apoyaron dándome la flexibilidad de horarios necearia para tomar mis cursos; a mis
compañeras **Gloria** y **Sandra**, y a mi compañero **Genaro Daniel**, por su comprensión
por mi humor los días después de mis desvelos; a mis compañeros de cursada por sus consejos
y ayudarme a resolver dudas; a mi mentor **Jorge "*Coki*" Figueroa** por su guía y consejo,
y por animarme a tomar este curso en **Coderhouse**.

Desde luego que también agradezco a **Coderhouse** por poner el conocimiento de calidad al
alcance gracias a sus excelentes contenidos y la *Coder Beca*, sin la cual no hubiese podido
tomar el curso que me permitió llevar a cabo este proyecto.

Agradezco a mi profesor **Nicolás "*Nico*" Martini**, y en especial a mi Tutor
**Francisco "*Fran*" Imanol Suárez**, por su apoyo y consejos para que pudiera aprender las
habilidades necesarias para hacer este proyecto.

También agradezco a todos aquellos que estuvieron alrededor de mí y, sin saberlo, fueron
apoyo y me dieron ánimos para concretar este curso y este proyecto.
