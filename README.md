# Édouard Automobiles — site vitrine

Site vitrine pour **Édouard Automobiles**, négociant indépendant en
« véhicules d'intérêt » (youngtimers + occasions récentes) à Paris 12ᵉ depuis 2016.

Même base technique que les autres sites (Éclat Auto Centre, MBSR Auto) :
HTML / CSS / JS statiques, **aucune étape de build**, servi tel quel par Vercel.

## Direction : « galerie cinématique »

Photo plein cadre, interface effacée, mouvement lent et marqué. Noir profond
`#0a0a0b` + salmon `#e7a78e` repris du logo. Aucune boîte encadrée : de l'espace,
des filets 1px, de grandes images. Références Kidston / Zagato / Classic Driver.

- Typo : **Marcellus** (titres, serif inscriptionnel) / **Archivo** (UI, texte) / **Spline Sans Mono** (données, prix, labels)
- Animations : séquence d'intro qui pose le logo (1×/session), parallaxe du hero,
  apparitions au scroll, hover cinétiques sur les voitures, compteurs animés.
  Tout se coupe avec `prefers-reduced-motion`.

## Stack

- `index.html` — accueil : Hero / Le stock (galerie qui défile) / Manifeste / La méthode / Services / Preuve
- `contact.html` — page dédiée « Prendre rendez-vous » (infos, formulaire `mailto`, plan OpenStreetMap)
- `assets/styles.css` — thème complet, univers unique assumé (pas de mode clair)
- `assets/stock.js` — **le stock, en saisie manuelle** : un tableau `window.STOCK`
- `assets/main.js` — intro, parallaxe, reveals, compteurs, rendu du stock, menu mobile, formulaire, année
- `assets/img/logo-edouard.png` — logo détouré (fond transparent), généré depuis le JPG fourni
- `assets/img/youngtimerporsche.jpg` — fond de hero (fournie, droits OK)
- `assets/img/*.webp` — photos véhicules **reprises de Leboncoin (filigrane)** — à remplacer par les originaux
- `assets/favicon.svg` — monogramme É salmon
- Polices via Google Fonts (CDN). Aucune autre dépendance, pas de framework.

## Gérer le stock

Tout se passe dans **`assets/stock.js`**. Chaque objet du tableau `window.STOCK`
devient une pièce dans la galerie de l'accueil, dans l'ordre.

```js
{
  titre: "Volkswagen Golf 7 R 2.0 TSI 4Motion",
  marque: "Volkswagen",                       // sur-titre de la vignette
  specs: ["310 ch", "2017", "BVM6", "Toit ouvrant"],
  km: "78 500 km",                            // optionnel
  prix: "23 990 €",
  photo: "assets/img/golf-r-1.webp",          // recommandé
  lien: "https://www.leboncoin.fr/ad/...",    // optionnel — pièce cliquable
  vendu: false                                // true = pièce gardée, marquée « vendu »
}
```

- **Retirer un véhicule** : supprimer son objet (ou `vendu: true` pour le garder marqué).
- Tableau vide → message « Stock en cours de mise à jour ».
- Les 3 véhicules présents sont réels (Leboncoin), photos à remplacer par les originaux.

## À personnaliser / compléter

| Élément | État actuel | À faire |
|---|---|---|
| Logo | `logo-edouard.png` détouré depuis le JPG fourni | Fournir le **vectoriel officiel** (SVG) pour une netteté parfaite en grand |
| Photos véhicules | `*.webp` repris de Leboncoin, **filigrane visible** | Remplacer par les originaux, **mêmes noms de fichiers** |
| Photo hero | `youngtimerporsche.jpg` (droits OK, confirmé) | Rien — ou une photo maison de l'atelier au même cadrage large |
| Avis clients | 2 emplacements placeholder dans `#proof` | Recopier 3 à 6 avis récents de Leboncoin (nom, date, modèle) |
| Plan (contact) | iframe OpenStreetMap, marqueur approché sur l'avenue | Affiner `bbox` / `marker`, ou passer à un plan Google si besoin |
| Téléphone | Non affiché (non communiqué) | Ajouter dans la `<dl>` de `contact.html` + lien `tel:` si souhaité |
| E-mail | `edouard.automobiles@gmail.com` (bio Instagram) | Confirmer / passer à une adresse `@edouard-automobiles.fr` |
| Formulaire | `mailto` pré-rempli, pas de backend | Brancher Formspree / Web3Forms pour un envoi réel |
| Textes | Rédigés d'après Leboncoin + Instagram | Relire avec le client (méthode, services, délais) |
| Domaine | — | Configurer côté Vercel |

## Déploiement

Fichiers statiques → Vercel (projet `edouard-automobiles`). `vercel.json` : `cleanUrls`,
HTML/CSS/JS en `must-revalidate`, images en cache court. Lier le dépôt GitHub au
projet Vercel pour l'auto-déploiement sur `git push`.
