$(document).ready(function () {
  // Función para generar frases de testimonio aleatorias
  function generarTestimonioFalso() {
    const frases = [
      "Excelente atención y trato profesional. ¡Muy recomendados!",
      "Me ayudaron a resolver mi caso con rapidez y eficacia.",
      "Un equipo comprometido que me dio confianza desde el inicio.",
      "Muy atentos y claros en todo el proceso. ¡Gracias!",
      "Recibí asesoría legal precisa y de gran calidad.",
    ];
    return frases[Math.floor(Math.random() * frases.length)];
  }

  // Función para cargar testimonios desde la API
  function cargarTestimonios() {
    $.getJSON("https://randomuser.me/api/?results=3", function (data) {
      $("#contenedor-testimonios").empty();

      $.each(data.results, function (index, usuario) {
        const testimonioHTML = `
          <div class="testimonio">
            <img src="${usuario.picture.medium}" alt="Foto de ${usuario.name.first}" />
            <p>"${generarTestimonioFalso()}"</p>
            <strong>${usuario.name.first} ${usuario.name.last}</strong>
          </div>
        `;
        $("#contenedor-testimonios").append(testimonioHTML);
      });
    }).fail(function () {
      $("#contenedor-testimonios").html("<p>Error al cargar los testimonios.</p>");
    });
  }

  cargarTestimonios();

  $("#cargar-testimonios").click(function () {
    cargarTestimonios();
  });

  // Buscador para los servicios
  $("#buscar-servicio").on("input", function () {
    const texto = $(this).val().toLowerCase();

    $(".servicio-linea").each(function () {
      const titulo = $(this).find("h3").text().toLowerCase();
      const descripcion = $(this).find("p").text().toLowerCase();

      if (titulo.includes(texto) || descripcion.includes(texto)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
