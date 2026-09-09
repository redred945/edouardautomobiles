/* =========================================================
   STOCK — saisie manuelle
   ---------------------------------------------------------
   Ajoutez / modifiez / retirez les objets ci-dessous.
   Chaque objet = une carte sur l'accueil, dans l'ordre.

   Champs :
     titre   : nom complet du véhicule                (obligatoire)
     marque  : filigrane affiché en haut de la vignette (obligatoire)
     specs   : tableau de courtes mentions             (obligatoire)
     km      : kilométrage, ex. "160 000 km"           (optionnel)
     prix    : ex. "9 990 €"                           (obligatoire)
     photo   : "assets/img/mon-fichier.jpg"            (optionnel — sinon vignette graphique)
     lien    : URL de l'annonce Leboncoin              (optionnel — rend la carte cliquable)
     vendu   : true pour garder la carte avec le tampon VENDU (optionnel)
   ========================================================= */

window.STOCK = [
  {
    titre: "Volkswagen Golf 7 R 2.0 TSI 4Motion",
    marque: "Volkswagen",
    specs: ["310 ch", "2017", "BVM6", "Toit ouvrant", "CarPlay"],
    prix: "23 990 €",
    lien: "https://www.leboncoin.fr/boutique/53427/edouard_automobiles.htm",
    vendu: false
  },
  {
    titre: "Audi A4 3.2 V6 FSI Quattro",
    marque: "Audi",
    specs: ["265 ch", "10/2010", "BVA", "Historique Audi"],
    km: "160 000 km",
    prix: "9 990 €",
    lien: "https://www.leboncoin.fr/boutique/53427/edouard_automobiles.htm",
    vendu: false
  },
  {
    titre: "BMW 320i E36 Cabriolet",
    marque: "BMW",
    specs: ["1999", "1re main FR", "Carnet BMW", "Youngtimer"],
    km: "147 000 km",
    prix: "12 990 €",
    vendu: true
  }
];
