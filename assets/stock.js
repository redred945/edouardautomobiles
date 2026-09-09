/* =========================================================
   STOCK — saisie manuelle
   ---------------------------------------------------------
   Un objet = une pièce dans la galerie, dans l'ordre.

   Champs :
     titre   : nom complet du véhicule                 (obligatoire)
     marque  : sur-titre court                          (obligatoire)
     specs   : tableau de courtes mentions              (obligatoire)
     km      : ex. "160 000 km"                         (optionnel)
     prix    : ex. "9 990 €"                            (obligatoire)
     photo   : "assets/img/mon-fichier.webp"            (recommandé)
     lien    : URL de l'annonce Leboncoin               (optionnel — pièce cliquable)
     vendu   : true = pièce conservée, marquée « vendu » (optionnel)
   ---------------------------------------------------------
   Photos : reprises de Leboncoin / Instagram. À remplacer
   par les originaux (mêmes noms de fichiers).
   ========================================================= */

window.STOCK = [
  {
    titre: "Volkswagen Golf 7 R 2.0 TSI 4Motion",
    marque: "Volkswagen",
    specs: ["310 ch", "2017", "BVM6", "Toit ouvrant", "CarPlay"],
    prix: "23 990 €",
    photo: "assets/img/golf-r-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3241251512"
  },
  {
    titre: "BMW 520d Touring F11 M Sport xDrive",
    marque: "BMW",
    specs: ["190 ch", "2014", "BVA8", "Historique BMW"],
    km: "167 000 km",
    prix: "15 990 €",
    photo: "assets/img/bmw-520d-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3243634246"
  },
  {
    titre: "Audi A3 Sportback 2.0 TDI 184 Ambition Luxe",
    marque: "Audi",
    specs: ["184 ch", "2015", "S tronic", "Vidange BVA faite"],
    km: "64 500 km",
    prix: "16 990 €",
    photo: "assets/img/audi-a3-184-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3224488141"
  },
  {
    titre: "Audi A4 3.2 V6 FSI Quattro",
    marque: "Audi",
    specs: ["265 ch", "10/2010", "BVA", "Historique Audi"],
    km: "160 000 km",
    prix: "9 990 €",
    photo: "assets/img/a4-v6-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3208875700"
  },
  {
    titre: "Mini F56 One 102 ch",
    marque: "Mini",
    specs: ["102 ch", "2021", "1re main", "Historique Mini France"],
    km: "35 000 km",
    prix: "16 990 €",
    photo: "assets/img/insta-2.jpg",
    lien: "https://www.leboncoin.fr/ad/voitures/3261287984"
  },
  {
    titre: "Smart Fortwo 0.9 Brabus Xclusive",
    marque: "Smart",
    specs: ["90 ch", "Carnet Smart", "CT 2026", "Révisée"],
    prix: "18 990 €",
    photo: "assets/img/smart-brabus-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3257319837"
  },
  {
    titre: "Fiat 500 Star 1.2 69 ch",
    marque: "Fiat",
    specs: ["2020", "Toit panoramique", "GPS", "Distribution 09/2026"],
    km: "46 000 km",
    prix: "9 990 €",
    photo: "assets/img/fiat-500-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3261291305"
  },
  {
    titre: "BMW 320i E36 Cabriolet",
    marque: "BMW",
    specs: ["1999", "1re main FR", "Carnet BMW", "Youngtimer"],
    km: "147 000 km",
    prix: "12 990 €",
    photo: "assets/img/bmw-e36-1.webp",
    vendu: true
  }
];
