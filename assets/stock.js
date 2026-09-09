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
     photo   : "assets/img/mon-fichier.webp"            (recommandé — sinon fond neutre)
     lien    : URL de l'annonce Leboncoin               (optionnel — pièce cliquable)
     vendu   : true = pièce conservée, marquée « vendu » (optionnel)
   ---------------------------------------------------------
   NB : les photos actuelles viennent de Leboncoin (filigrane).
        Les remplacer par les originaux, mêmes noms de fichiers.
   ========================================================= */

window.STOCK = [
  {
    titre: "Volkswagen Golf 7 R 2.0 TSI 4Motion",
    marque: "Volkswagen",
    specs: ["310 ch", "2017", "BVM6", "Toit ouvrant", "CarPlay"],
    prix: "23 990 €",
    photo: "assets/img/golf-r-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3241251512",
    vendu: false
  },
  {
    titre: "Audi A4 3.2 V6 FSI Quattro",
    marque: "Audi",
    specs: ["265 ch", "10/2010", "BVA", "Historique Audi"],
    km: "160 000 km",
    prix: "9 990 €",
    photo: "assets/img/a4-v6-1.webp",
    lien: "https://www.leboncoin.fr/ad/voitures/3208875700",
    vendu: false
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
