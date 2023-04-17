//Carga el código con .ready cuando acaba de cargar el código html
$(document).ready(() => {
  //Inicia las variables y esconde los botones que no se usan al iniciar.
  let carAmount = 0;
  let cars = [];
  const roadContainer = $("#road-container"); //Contenedor de las carreteras
  const screenWidth = $(window).width(); //Recoge el ancho de la ventana del explorador

  //Crea las carreteras y los coches según el número seleccionado
  $("#list-car-amount").on("change", function (event) {
    event.preventDefault(); //Previene que se recargue la página

    //Esconde el boton resetear, y muestra el de resetear, indica si está generada.
    $("#reset-race").hide();
    $("#start-race").show();
    $("#road-container").empty();

    /* Un bucle recorre la cantidad indicada y pinta las imagenes
     * de carreteras y los coches.
     */
    carAmount = parseInt($("#list-car-amount").val());
    for (let carVar = 0; carVar <= carAmount - 1; carVar++) {
      cars[carVar] = {
        id: `car${carVar + 1}`,
        speed: Math.floor((Math.random() + 1) * 1000),
        img: `img/car${carVar + 1}.png`,
      };

      const newRoad = $("<div>").attr("class", "road").appendTo(roadContainer);

      $("<img>")
        .attr({
          id: "start",
          src: "img/start.png",
          class: "line",
        })
        .appendTo(newRoad);

      $("<img>")
        .attr({
          id: "finish",
          src: "img/finish.png",
          class: "line",
        })
        .appendTo(newRoad);

      $("<img>")
        .attr({
          id: cars[carVar].id,
          src: cars[carVar].img,
          class: "car",
        })
        .appendTo(newRoad);
    }
  });

  /* Al presionar el botón iniciar carrera asigna la cantidad de coches
   * a una variable. Luego recorre la cantidad con un bucle y anima los coches
   * para recorrer las carreteras.
   */
  $("#start-race").click(function () {
    let finishedCar = 0;

    /*Recoge la cantidad de coches de la lista seleccionable y recorre
     * un bucle con esa cantidad animando las imagenes de coches con
     * a una velocidad aleatoria en milisegundos hasta el borde derecho.
     */
    cars.forEach((element) => {
      // Crea el nombre de coche en cada vuelta del bucle y lo almacena
      const carElement = $("#" + element.id);
      carElement.animate(
        {
          "margin-left": screenWidth - carElement.width() - 50, //Aumenta la distancia del margen izquierdo del coche con el tiempo
        },
        {
          duration: element.speed, //Tiempo en ms
          complete: () => {
            finishedCar += 1;
            if (finishedCar == carAmount) {
              $("#reset-race").show();
              showResult();
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
    $("#start-race").hide();
  });

  function showResult() {
    /*Reordena el array de clasificación de forma descendente,
     * devuelve valor negativo si b es menor que a Actualizar la posición de cada coche en el array
     */
    cars.sort((a, b) => a.speed - b.speed);

    // Agrega los resultados de la carrera al panel modal
    const table = $("#classification-board");

    cars.forEach((element, index) => {
      const row = $("<tr>");
      const position = $("<td>").text(index + 1);
      const carImage = $("<img>").addClass("car-panel-item");
      carImage.attr({
        src: element.img,
        id: element.id,
      });

      row.append(position, carImage);
      
      table.append(row);
    });

    // Muestra el panel modal en la pantall
    $("#modal-result-panel").show();
  }

  /*
   * Cuando presionas el botón reiniciar, esconde el botón y aparece
   * el botón generar.
   */
  $("#reset-race").click(function () {
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

    // Borra el contenido de modal resultpanel
    $("#classification-board").empty();
    $("#modal-result-panel").hide();
    // Oculta y muestra los botones correspondientes
    $("#start-race").show();
    $("#reset-race").hide();
    //$("#btGenerateRoads").show();
  });

  // Ocultar ventana modal al hacer clic en el botón de cerrar
  $("#close").click(function () {
    $("#modal-result-panel").hide();
    $("#reset-race").show();
  });
});
