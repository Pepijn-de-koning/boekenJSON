const uitvoer = document.getElementById('boeken');
const xhr = new XMLHttpRequest();

const taalKeuze = document.querySelectorAll('.besturing__cb-taal');
const selectSort = document.querySelector('.besturing__select');

const aantalInWinkelwagen = document.querySelector('.ww__aantal');

xhr.onreadystatechange = () => {
  if(xhr.readyState == 4 && xhr.status ==200) {
    let resultaat = JSON.parse(xhr.responseText);
    boeken.filteren(resultaat)
    boeken.uitvoeren();
  }
}
xhr.open('GET', 'boeken.json', true);
xhr.send();

const ww = {
  bestelling: []
}

// ww.bestelling = JSON.parse(localStorage.wwBestelling);

const boeken = {

  taalFilter: ['Nederlands', 'Duits', 'engels'],
  es: 'auteurs',
  oplopend: 1,

  filteren( gegevens ) {
    // this.data = gegevens.filter( (bk) => {return bk.taal == this.taalFilter }  );
    this.data = gegevens.filter( (bk) => {
      let bool = false;
        this.taalFilter.forEach( (taal) => {
          if( bk.taal == taal ) { bool = true}
        } )
      return bool
    } )
  },

  sorteren() {
    if (this.es == 'titel') {this.data.sort( (a,b) => ( a.titel.toUpperCase() > b.titel.toUpperCase() ) ? this.oplopend :-1*this.oplopend );}
    else if (this.es == 'paginas') {this.data.sort( (a,b) => ( a.paginas > b.paginas ) ? this.oplopend :-1*this.oplopend);}
    else if (this.es == 'uitgave') {this.data.sort( (a,b) => ( a.uitgave > b.uitgave ) ? this.oplopend :-1*this.oplopend);}
    else if (this.es == 'prijs') {this.data.sort( (a,b) => ( a.prijs > b.prijs ) ? this.oplopend :-1*this.oplopend);}
    else if (this.es == 'auteurs') {this.data.sort( (a,b) => ( a.auteurs[0].achternaam > b.auteurs[0].achternaam ) ? this.oplopend :-1*this.oplopend);}
  },

  uitvoeren() {

    this.sorteren();

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
      html += `<div class="boek__info">`;
      html += `<h3   class="boek__kop">${titel}</h3>`;
      html += `<p    class="boek__auteurs">${auteurs}</p>`;
      html += `<span class="boek__uitgave">${this.datumOmzetten(boek.uitgave)} | </span>`;
      html += `<span class="boek__ean">${boek.ean} | </span>`;
      html += `<span class="boek__taal">${boek.taal} | </span>`;
      html += `<span class="boek__paginas">${boek.paginas} paginas<br></span>`;
      html += `<div class="boek__prijs">${boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'})}
               <a href="#" class="boek__bestel-knop" date-role="${boek.ean}">bestellen</a></div>`;
      html += `</div></section>`;
    });
    uitvoer.innerHTML = html

    document.querySelectorAll('.boek__bestel-knop').forEach( knop => {
      knop.addEventListener('click', e => {
        e.preventDefault();
        let boekID = e.target.getAttribute('data-role');
        console.log(boekID);
        let gekliktBoek = this.data.filter( b => b.ean == boekID);
        ww.bestelling.push(gekliktBoek[0]);
        aantalInWinkelwagen.innerHTML = ww.bestelling.length;
        localStorage.wwBestelling = JSON.stringify(ww.besteling);
      })
    });
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

const pasFilterAan = () => {
  let gecheckteTaalkeuze = [];
  taalKeuze.forEach( cb => {
    if (cb.checked) gecheckteTaalkeuze.push( cb.value);
  })
  boeken.taalFilter = gecheckteTaalkeuze;
  boeken.filteren(JSON.parse(xhr.responseText));
  boeken.uitvoeren();
}

const pasSortEigAan = () => {
  boeken.es = selectSort.value;
  boeken.uitvoeren();
}

taalKeuze.forEach( cb => cb.addEventListener('change', pasFilterAan) );

selectSort.addEventListener('change', pasSortEigAan);

document.querySelectorAll('.besturing__rb').forEach( rb => rb.addEventListener('change', () => {
  boeken.oplopend = rb.value;
  boeken.uitvoeren();
}))
