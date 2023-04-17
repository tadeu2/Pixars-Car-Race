$(document).ready(function () {
  let coches = [];
  //Al principio del programa, ocultamos los elementos que no queremos que se vean. Como los resultados, el botón reiniciar, etc.
  $("#pintaCoches").hide();
  $("#Reiniciar").hide();
  $("#resultado").hide();
  $("h2").hide();
  //Con esta función pintamos los coches
  function cochesElegidos() {
    $("#Iniciar").show();
    $("#Reiniciar").hide();
    $("h2").hide();
    $("#resultado").hide();
    $("#pintaCoches").empty();
    $("#resultado").empty();
    let numero = parseInt($("#numeroCoches").val());
    coches = [];
    for (let i = 0; i < numero; i++) {
      let nImg = i + 1;

      //Guardamos un array con los objetos coche, con los atributos img que será la imagen y velocidad que rellenamos en la función correr
      coches[i] = {
        id: i + 1,
        img: `<img id=${nImg} src='img/car${nImg}.png'>`,
        velocidad: 0,
      };

      $("#pintaCoches").append(`<li>${coches[i].img}</li>`);
    }

    $("#pintaCoches").show();
  }

  //Hacemos la animación y guardamos en el array de objetos coches el valor del atributo velocidad
  function correr() {
    $("#Iniciar").hide();
    $("#Reiniciar").show();

    for (let i = 0; i < coches.length; i++) {
      let vel = Math.random(10) * 3000;
      coches[i].velocidad = vel;
      let id = `#${i + 1}`;
      $(id).animate({ left: "85%" }, vel);
    }

    //Ordenamos el array con la función sort en función de la velocidad. De mayor a menor velocidad
    coches.sort(function (a, b) {
      return a.velocidad - b.velocidad;
    });

    //Al acabar la carrera, mostramos el resultado final llamando a la función crearTablaPosiciones
    setTimeout(crearTablaPosiciones, 3000);
  }

  //Función para mostrar el resultado final
  function crearTablaPosiciones() {
    for (let i = 0; i < coches.length; i++) {
      $("#resultado").append(
        `<div class='tabla'><h3>Posición ${i + 1}</h3>${coches[i].img}</div>`
      );
    }
    $("h2").show();
    $("#resultado").show();
  }

  //Esta función devuelve los coches a su posición de salida
  function reiniciar() {
    $("#Reiniciar").hide();
    $("#Iniciar").show();
    $("h2").hide();
    $("#resultado").hide();
    $("#resultado").empty();
    for (let i = 0; i < coches.length; i++) {
      let id = `#${i + 1}`;
      $(id).animate({ left: "0" }, 2000);
    }

    //Reseteo las posiciones del array
    coches.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  //Estos son los eventos de la página. Les pasamos las funciones correspondientes para que el juego funcione
  $("#numeroCoches").change(cochesElegidos);
  $("#Iniciar").click(correr);
  $("#Reiniciar").click(reiniciar);
});
