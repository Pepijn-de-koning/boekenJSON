const uitvoer = document.getElementById('boeken');
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if(xhr.readyState == 4 && xhr.status ==200) {
    let resultaat = JSON.parse(xhr.responseText);
    boeken.data = resultaat
    boeken.uitvoeren();
  }
}
xhr.open('GET', 'boeken.json', true);
xhr.send();

const boeken = {

  uitvoeren() {
    let html = "";
    this.data.forEach(boek => {

      let titel = "";
      if (boek.voortitel) {
        titel += boek.voortitel + " ";
      }
      titel += boek.titel;

      html += `<section class="boek">`;
      html += `<img  class="boek__cover" src="${boek.cover}">`;
      html += `<h3   class="boek__kop">${titel}</h3>`;
      html += `<span class="boek__uitgave"> - uitgave: ${boek.uitgave}<br></span>`
      html += `<span class="boek__ean"> - ean: ${boek.ean}<br></span>`
      html += `<span class="boek__taal"> - Taal: ${boek.taal}<br></span>`
      html += `<span class="boek__paginas"> - Paginas: ${boek.paginas} blz.<br></span>`
      html += `<span class="boek__prijs">&euro; ${boek.prijs}<br></span>`
      html += `</section>`;
    });
    uitvoer.innerHTML = html
  }

}
