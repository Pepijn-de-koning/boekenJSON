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
      html += `<span class="boek__uitgave">${this.datumOmzetten(boek.uitgave)}</span>`;
      html += `<span class="boek__ean">${boek.ean}</span>`;
      html += `<span class="boek__taal">${boek.taal}</span>`;
      html += `<span class="boek__paginas">${boek.paginas} paginas<br></span>`;
      html += `<span class="boek__prijs">${boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'})}</span>`;
      html += `</section>`;
    });
    uitvoer.innerHTML = html
  },
  datumOmzetten(datumString) {
    let datum = new Date(datumString);
    let jaar = datum.getFullYear();
    let maand = this.geefMaandnaam(datum.getMonth());
    return `${maand} ${jaar}`;
  },
  geefMaandnaam(m) {
    let maand = "";
    switch (m) {
      case 0 : maand = 'januari'; break;
      case 1 : maand = 'februari'; break;
      case 2 : maand = 'maart'; break;
      case 3 : maand = 'april'; break;
      case 4 : maand = 'mei'; break;
      case 5 : maand = 'juni'; break;
      case 6 : maand = 'juli'; break;
      case 7 : maand = 'augustus'; break;
      case 8 : maand = 'september'; break;
      case 9 : maand = 'oktober'; break;
      case 10 : maand = 'november'; break;
      case 11 : maand = 'december'; break;
      default : maand = m;
    }
    return maand;
  }
}
