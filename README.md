# Web Browser Sudoku

El juego de **Sudoku** es muy simple. El objetivo es llenar una cuadrícula de nueve (9)
**filas** × nueve (9) **columnas**, dividida en nueve (9) **submatrices**, cada una de
tres (3) **filas** × tres (3) **columnas**, con números del uno (1) al nueve (9), en
ningún orden particular, sin que estos se repitan en una misma **fila**, en una misma
**columna**, ni en la **submatriz** en la que se encuentra cada **celda**.

## Objetivo del juego

El objetivo del juego de **Sudoku** es resolver satisfactoriamente un **tablero**
parcialmente lleno.

El juego inicia con un **tablero** parcialmente lleno, es tarea del jugador llenarlo por
completo con los números, del uno (1) al nueve (9), que hacen falta en las **celdas** vacías,
siguiendo las siguientes siete reglas:

1. El **tablero** de **Sudoku** se compone por una matriz de nueve (9) **filas** × nueve
(9) **columnas**, subdividido en nueve (9) **submatrices**, cada una de tres (3) **filas** ×
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
7. No se pueden mover, o cambiar las posición, los números colocados inicialmente en
el **tablero**.

Cuando el jugador ha llenado todas las **celdas** vacías del tablero, y todas cumplen con
las reglas anteriores, se puede decir que el **tablero** ha sido resuelto satisfactoriamente.

## El Tablero de Sudoku

Un **tablero**, correctamente lleno, debe verse como el siguiente:

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

 Todos los números, del uno (1) al nueve (9), sin repetirse en **fila**, **columna** o
 **submatriz**. Ninguna **celda** vacía.

## Objetivo del proyecto

El objetivo principal del proyecto es generar un **tablero** de **Sudoku** con algunas
**celdas** vacías para que el usuario pueda jugar tratando de rellenarlas con los números
del uno (1) al nueve (9), cumpliendo las reglas del juego de **Sudoku**. Para ello, el
código final del proyecto deberá ser capaz de:

1. Generar un **tablero** de **Sudoku** completamente lleno (la **respuesta correcta**),
2. Permitir al usuario elegir entre tres niveles: *fácil*, *medio* y *difícil*, en orden
creciente de dificultad.
3. Dependiendo del nivel de dificultad elegido por el usuario, generar un segundo
**tablero** (el **tablero de juego**) borrando algunos números en **celdas** ubicadas
aleatoriamente para que el usuario las intente rellenar con las respuestas correctas,
4. Dibujar correctamente el **tablero de juego**, generado en el paso 3, en la página.
5. Permitir la interacción del usuario haciendo clic en las **celdas** vacías para que
introduzca el número que desee, del uno (1) al nueve (9),
6. Permitir al usuario pausar el juego, guardándolo para continuar después.
7. Permitir al usuario cargar un juego guardado para continuar resolviéndolo.
8. Una vez que el jugador ha llenado completamente el **tablero**, el juego deberá
permitirle al usuario validar sus respuestas.
9. Si el **tablero de juego**, generado en el paso 3, es igual a la **respuesta correcta**,
generada en el paso 1, debe ser capaz de guardar la estadística de jueg del usuario, incluyendo
nivel de dificultad, fecha de inicio, fecha de terminación y tiempo total efectivo de juego
(horas, minutos, segundos y décimas de segundo, sin contar el tiempo en pausa o suspensión).
10. El evento que provoca el inicio del reloj de tiempo de juego debe ser disparado por
la interacción (clic) del jugador con un botón de arranque.
11. Los eventos que desencadenan el paro del reloj de tiempo de juego, pueden ser disparados
por cualquiera de los siguientes sucesos:
    - La interacción del jugador con un botón de pausa.
    - La pérdida de foco de la ventana en que se ejecuta el juego.
    - El cierre del navegador y/o la ventana en que se ejecuta el juego.
12. Una vez qie el reloj de tiempo de juego ha sido parado, es necesario que el jugador
reinicie el juego explícitamente haga clic en el botón de arranque para reanudar el juego
y el reloj de tiempo de juego.
13. Mientras el reloj de tiempo de juego se encuentra detenido, el **tablero de juego** debe
mantenerse oculto al jugador para evitar que éste lo copie en otro medio e intente resolverlo
de manera paralela mientras el reloj de juego se encuentra detenido.

## Alcances mínimos del proyecto (MVP)

El código debe ser capaz de:

1. Generar un **tablero** de **Sudoku** completamente lleno, considerando las reglas antes
descritas.
2. Dejar algunas **celdas** en blanco con suficientes pistas para que el jugador
pueda llenarloa, de acuerdo con las reglas del **Sudoku**, y llegar al mismo
**tablero** generado en el paso 1. A este segundo **tablero** se le conocerá como el
**tablero de juego**.
3. Dibujar correctamente el **tablero de juego** en el navegador.
4. Permitir la interacción del usuario con el **tablero de juego**: elegir las **celdas**
vacías y permitir al usuario que introduzca números del uno (1) al nueve (9).
5. Validar los números introducidos por el jugador, contra el **tablero** generado en el
paso 1, e indicarle si sus respuestas son correctas o hay errores.

## Características adicionales deseables

Además, sería ideal que la interfaz sea capaz de permitir, al jugador, contar con
algunas pistas visuales que le permita visualizar con mayor facilidad la **fila**,
**columna** y **submatriz** en la que se encuentra, hacer anotaciones de los números
"*candidatos*" que pueden colocarse en las **celdas** vacías, guardar el juego para
continuarlo en otro momento, elegir entre diferentes niveles de dificultad, tomar
el tiempo que le lleva resolver un **tablero** y llevar registro de sus estadísticas
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
