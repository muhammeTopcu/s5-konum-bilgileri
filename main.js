//import axios from "axios";

async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

const ipAdresim = await ipAdresimiAl();
console.log(ipAdresim);

/*
  AMAÇ:
  - location_card.png dosyasındakine benzer dinamik bir card oluşturmak.
  - HTML ve CSS hazır, önce IP adresini, sonra bunu kullanarak diğer bilgileri alacağız.

	ADIM 1: IP kullanarak verileri almak
  getData fonskiyonunda axios kullanarak şu adrese GET sorgusu atacağız: https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen datayı geri dönmeli.

  Not: Request sonucu gelen datayı browserda network tabından inceleyin.
  İpucu: Network tabıından inceleyemezseniz GET isteklerini gönderdiğiniz URL'i direkt browserda açabildiğinizi unutmayın. 😉

  Bu fonksiyonda return ettiğiniz veri, Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor. Bu yüzden, veride hangi key-value çiftleri olduğunu inceleyin.
*/

async function getData() {
  return axios
    .get(`https://apis.ergineer.com/ipgeoapi/${ipAdresim}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("error:", error);
    });
}

/*
	ADIM 2: Alınan veriyi sayfada gösterecek componentı oluşturmak
  getData ile aldığımız konum bazlı veriyi sayfada göstermek için cardOlustur fonskiyonu kullanılacak. DOM metodlarını ve özelliklerini kullanarak aşağıdaki yapıyı oluşturun ve dönün (return edin).

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';

	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

function cardOlustur(veri) {
  const card = document.createElement("div");
  card.classList.add("card");

  const bayrak = document.createElement("img");
  bayrak.src = `https://flaglog.com/codes/standardized-rectangle-120px/${veri.ülkeKodu}.png`;
  card.appendChild(bayrak);

  const cardinfo = document.createElement("div");
  cardinfo.classList.add("card-info");

  const h3ip = document.createElement("h3");
  h3ip.classList.add("ip");
  h3ip.textContent = veri.sorgu;
  cardinfo.appendChild(h3ip);

  const ulke = document.createElement("p");
  ulke.classList.add("ulke");
  ulke.textContent = veri.ülke + " " + "(" + veri.ülkeKodu + ")";
  cardinfo.appendChild(ulke);

  const konum = document.createElement("p");
  konum.textContent = `Enlem: ` + veri.enlem + ` - Boylam: ` + veri.boylam;
  cardinfo.appendChild(konum);

  const sehir = document.createElement("p");
  sehir.textContent = `Şehir: ` + veri.bölgeAdı;
  cardinfo.appendChild(sehir);

  const saatDilimi = document.createElement("p");
  saatDilimi.textContent = `Saat dilimi: ` + veri.saatdilimi;
  cardinfo.appendChild(saatDilimi);

  const para = document.createElement("p");
  para.textContent = `Para birimi: ` + veri.parabirimi;
  cardinfo.appendChild(para);

  const isp = document.createElement("p");
  isp.textContent = `ISP: ` + veri.isp;
  cardinfo.appendChild(isp);

  card.appendChild(cardinfo);

  return card;
}

// Buradan sonrasını değiştirmeyin, burası yazdığınız kodu sayfaya uyguluyor.
getData().then((response) => {
  const cardContent = cardOlustur(response);
  const container = document.querySelector(".container");
  container.appendChild(cardContent);
});
