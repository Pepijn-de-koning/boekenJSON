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

      let auteurs = "";
      boek.auteurs.forEach((schrijver,index) => {
        let tv = schrijver.tussenvoegsel ? schrijver.tussenvoegsel+" ": "";
        let seperator = ", ";
        if( index >= boek.auteurs.length-2) { seperator = " en " }
        if( index >= boek.auteurs.length-1) { seperator = " " }
        auteurs += schrijver.voornaam + " " + tv + schrijver.achternaam + seperator;
      });


      html += `<section class="boek">`;
      html += `<img  class="boek__cover" src="${boek.cover}">`;
      html += `<h3   class="boek__kop">${titel}</h3>`;
      html += `<p    class="boek__auteurs">${auteurs}</p>`;
      html += `<span class="boek__uitgave">${boek.uitgave} | </span>`
      html += `<span class="boek__ean">${boek.ean} | </span>`
      html += `<span class="boek__taal">${boek.taal} | </span>`
      html += `<span class="boek__paginas">${boek.paginas} paginas<br></span>`
      html += `<span class="boek__prijs">&euro; ${boek.prijs}</span>`
      html += `</section>`;
    });
    uitvoer.innerHTML = html
  }

}
