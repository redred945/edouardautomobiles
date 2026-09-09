# Édouard Automobiles — site vitrine

Site vitrine one-page pour **Édouard Automobiles**, négociant indépendant en
« véhicules d'intérêt » (youngtimers + occasions récentes) à Paris 12ᵉ depuis 2016.

Même base technique que les autres sites (Éclat Auto Centre, MBSR Auto) :
HTML / CSS / JS statiques, **aucune étape de build**, servi tel quel par Vercel.

## Stack

- `index.html` — page unique : Hero / Bandeau confiance / Le stock / La méthode / Services / Avis / Contact
- `assets/styles.css` — thème « négociant » sombre : encre `#14120d` + cuivre `#c17a45`,
  typo **Archivo** (titres) / **Newsreader** (texte) / **Spline Sans Mono** (données),
  grain léger, filets et tampons plutôt que cartes arrondies. Univers unique assumé (pas de mode clair).
- `assets/stock.js` — **le stock, en saisie manuelle** : un tableau `window.STOCK` d'objets véhicule.
- `assets/main.js` — rendu du stock, menu mobile, header au scroll, reveals dégradables,
  formulaire de contact (ouvre la messagerie en `mailto`), année du pied de page.
- `assets/favicon.svg` — monogramme É cuivre sur médaillon encre.
- `assets/img/` — vide au départ ; y déposer les photos véhicules / atelier.
- Polices via Google Fonts (CDN). Aucune autre dépendance externe, pas de framework.

## Gérer le stock

Tout se passe dans **`assets/stock.js`**. Chaque objet du tableau `window.STOCK`
devient une carte sur l'accueil, dans l'ordre.

```js
{
  titre: "Volkswagen Golf 7 R 2.0 TSI 4Motion",
  marque: "Volkswagen",                       // filigrane de la vignette
  specs: ["310 ch", "2017", "BVM6", "Toit ouvrant"],
  km: "78 500 km",                            // optionnel
  prix: "23 990 €",
  photo: "assets/img/golf-r-01.jpg",          // optionnel — sinon vignette graphique
  lien: "https://www.leboncoin.fr/...",       // optionnel — carte cliquable vers l'annonce
  vendu: false                                // true = carte conservée avec le tampon VENDU
}
```

- **Sans `photo`** : une silhouette + « Visuel indicatif » s'affiche. Remplacer par de vraies
  photos dès que possible (`assets/img/`).
- **Retirer un véhicule** : supprimer son objet du tableau (ou passer `vendu: true` pour le garder affiché barré).
- Tableau vide → un message « Stock en cours de mise à jour » s'affiche à la place.

Les 3 véhicules présents sont des exemples repris de la boutique Leboncoin (à ajuster / compléter).

## À personnaliser / compléter

| Élément | État actuel | À faire |
|---|---|---|
| Logo | Wordmark en texte (Archivo) dans le header | Fournir le logo vectoriel officiel (médaillon EDOUARD cuivre) → l'intégrer en `assets/logo-edouard.svg` |
| Photos véhicules | Aucune — vignettes graphiques | Déposer les photos dans `assets/img/`, renseigner `photo:` dans `stock.js` |
| Photos atelier / hero | Fond dégradé + silhouette SVG | Ajouter une vraie photo d'atelier sombre en fond de hero si souhaité |
| Avis clients | 2 emplacements placeholder | Recopier 3 à 6 avis récents de la boutique Leboncoin (nom, date, modèle) dans la section `#avis` |
| Carte contact | Bloc graphique stylisé (pas de vraie carte) | Brancher une iframe OpenStreetMap / Google Maps centrée sur le 28 av. de Saint-Mandé |
| Téléphone | Non affiché (non communiqué) | Ajouter dans la `<dl>` de `#contact` + lien `tel:` si le client veut le publier |
| E-mail | `edouard.automobiles@gmail.com` (bio Instagram) | Confirmer / remplacer par une adresse `@edouard-automobiles.fr` |
| Formulaire | `mailto` pré-rempli, pas de backend | Brancher Formspree / Web3Forms pour un envoi réel si besoin |
| Textes | Rédigés d'après Leboncoin + Instagram | Relire avec le client (méthode, services, délais) |
| Domaine | — | Configurer `edouard-automobiles.fr` (ou autre) côté Vercel |

## Déploiement

Fichiers statiques → Vercel (projet `edouard-automobiles`). `vercel.json` : `cleanUrls`,
HTML/CSS/JS en `must-revalidate`, images en cache court. Lier le dépôt GitHub au projet
Vercel pour l'auto-déploiement sur `git push`.
