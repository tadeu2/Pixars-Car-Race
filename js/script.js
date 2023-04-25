//Carga el código con .ready cuando acaba de cargar el código html
$(document).ready(() => {
  //Inicia las variables
  let carAmount = 0; //Variable de cantidad de coches
  let cars = []; //Array de coches
  const roadContainer = $("#road-container"); //Contenedor de las carreteras
  const carAmountSelector = $("#list-car-amount"); //Lista desplegable de cantidad de coches
  const screenWidth = $(window).width(); //Recoge el ancho de la ventana del explorador
  const modalResultPanel = $("#modal-result-panel"); //Ventana modal con los resultados de la carrera
  const classificationBoard = $("#classification-board"); //Cuadro de clasificación
  const btStartRace = $("#start-race"); //Botón de inicio de carrera
  const btResetRace = $("#reset-race"); //Botón de reinicio de carrera
  const btCloseModal = $("#close"); //Botón de cerrado de la ventana modal

  //Crea las carreteras y los coches según el número seleccionado
  carAmountSelector.change((event) => {
    event.preventDefault(); //Previene que se recargue la página

    //Esconde el boton resetear, y muestra el de resetear.
    btResetRace.fadeOut();
    btStartRace.fadeIn();
    roadContainer.empty(); //Vacia el contenedor de carreteras si estuviese pintado.

    /* Vacia el array por si estuviese lleno al cambiar el valor7
     * crea una variable donde almacenar el valor del desplegable
     * convirtiendolo explicitamente en entero
     */
    cars = [];
    carAmount = parseInt(carAmountSelector.val());
    /* Un bucle recorre la cantidad indicada y pinta las imagenes
     * de carreteras y los coches.
     * Calcula la velocidad del coche con un número aleatorio del 1 al 10
     */
    for (i = 0; i <= carAmount - 1; i++) {
      cars[i] = {
        id: `car` + (i + 1),
        speed: Math.floor(Math.random() * 10 + 1), //
        img: `img/car` + (i + 1) + `.png`,
      };

      //Crea una nueva carretera y se le agrega al contenedor.
      const newRoad = $("<div>").addClass("road").appendTo(roadContainer);

      //Añade la línea de salida
      $("<img>")
        .attr({
          id: "start",
          src: "img/start.png",
          class: "line",
        })
        .appendTo(newRoad);

      //Añade la línea de meta a la carretera
      $("<img>")
        .attr({
          id: "finish",
          src: "img/finish.png",
          class: "line",
        })
        .appendTo(newRoad);

      //Añade el coche a la carretera
      $("<img>")
        .attr({
          id: cars[i].id,
          src: cars[i].img,
          class: "car",
        })
        .appendTo(newRoad);
    }
  });

  /* Al presionar el botón iniciar carrera asigna la cantidad de coches
   * a una variable. Luego recorre la cantidad con un bucle y anima los coches
   * para recorrer las carreteras.
   */
  btStartRace.click(() => {
    let finishedCar = 0;

    /*Recoge la cantidad de coches de la lista seleccionable y recorre
     * un bucle con esa cantidad animando las imagenes de coches con
     * a una velocidad aleatoria en milisegundos hasta el borde derecho.
     */
    cars.forEach((car) => {
      // Crea el nombre de coche en cada vuelta del bucle y lo almacena
      const carElement = $("#" + car.id);
      carElement.animate(
        {
          "margin-left": screenWidth - carElement.width() - 25, //Aumenta la distancia del margen izquierdo del coche con el tiempo
        },
        {
          duration: car.speed * 500, //Tiempo en ms
          /*Al completarse llama a una función callback, que suma +1 a los coches
           * finalizados, si la variable coches finalizados es igual a la cantidad
           * de coches seleccionados, se muestra el botón de reset y el botón reiniciar
           */
          complete: () => {
            finishedCar += 1;
            if (finishedCar == carAmount) {
              showResult();
              btResetRace.fadeIn();
            }
          },
        }
      );
    });

    //Crea una variable con un sonido almacenado y lo ejecuta cuando
    //presionamos el botón iniciar
    let sound = new Audio("sounds/racecarsound.mp3");
    sound.play();

    //Esconde y muestra los botones
    btStartRace.fadeOut();
  });

  function showResult() {
    /* Reordena el array de clasificación de forma descendente,
     * si la velocidad de b es menor que la de a lo deja como está
     * si b es mayor lo coloca delante de a.
     */
    cars.sort((a, b) => a.speed - b.speed);

    /*Recorre el array cars y pasa como parámetros a la función lambda
     * el elemento coche actual y el índice. Por cada elemento car
     * se crea una fila, y por cada fila un elemento img de la
     * clase car-panel-item con los atributos src e id de carItem
     */
    cars.forEach((carItem, index) => {
      const row = $("<tr>");
      const position = $("<td>").text(index + 1);
      const carImage = $("<img>").addClass("car-panel-item");
      carImage.attr({
        src: carItem.img,
        id: carItem.id,
      });

      //Se agrega a la fila el elemento y la imagen
      row.append(position, carImage);
      //Se agrega la fila al tablón de la clasificación
      classificationBoard.append(row);
    });
    
    // Muestra el panel modal en la pantall
    modalResultPanel.fadeIn();
  }

  /*
   * Cuando presionas el botón reiniciar, esconde el botón y aparece
   * el botón generar.
   */
  btResetRace.click(() => {
    cars.forEach((element) => {
      // Crea el nombre de coche en cada vuelta del bucle y lo almacena
      const carElement = $(`#${element.id}`);
      carElement.animate(
        {
          "margin-left": 0, //Aumenta la distancia del margen izquierdo del coche con el tiempo
        },
        {
          duration: 1000, ///Tiempo en ms
        }
      );
    });

    // Oculta y muestra los botones correspondientes
    btStartRace.show();
    btResetRace.hide();
  });

  // Ocultar ventana modal al hacer clic en el botón de cerrar
  btCloseModal.click(() => {
    modalResultPanel.fadeOut();
    // Borra el contenido dela tabla de clasificaciones
    classificationBoard.empty();
    btResetRace.show(); //Muestra el botón de reiniciar.
  });
});
