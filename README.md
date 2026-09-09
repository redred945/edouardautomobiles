# Édouard Automobiles — site vitrine

Site vitrine pour **Édouard Automobiles**, négociant indépendant en
« véhicules d'intérêt » (youngtimers + occasions récentes) à Paris 12ᵉ depuis 2016.

Même base technique que les autres sites (Éclat Auto Centre, MBSR Auto) :
HTML / CSS / JS statiques, **aucune étape de build**, servi tel quel par Vercel.

## Direction : « galerie cinématique »

Photo plein cadre, interface effacée, mouvement lent et marqué. Noir profond
`#0a0a0b` + salmon `#e7a78e` repris du logo. Aucune boîte encadrée : de l'espace,
des filets 1px, de grandes images. Références Kidston / Zagato / Classic Driver.

- Typo : **Fraunces** (titres, serif contemporain) / **Archivo** (UI, texte) / **Spline Sans Mono** (données, prix, labels)
- Animations : séquence d'intro qui pose le logo (1×/session), parallaxe du hero,
  apparitions au scroll, hover cinétiques sur les voitures, compteurs animés.
  Tout se coupe avec `prefers-reduced-motion`.

## Stack

- `index.html` — accueil : Hero / Bandeau confiance / Le stock (slider) / Patchwork atelier + Manifeste / La méthode / Services / Preuve / Appel final
- `contact.html` — page dédiée « Prendre rendez-vous » (infos, formulaire `mailto`, plan OpenStreetMap)
- `mentions-legales.html` — obligation légale ; **contient des champs `[à compléter]`** à renseigner avant diffusion
- `robots.txt` / `sitemap.xml`
- `assets/styles.css` — thème complet, univers unique assumé (pas de mode clair)
- `assets/stock.js` — **le stock, en saisie manuelle** : un tableau `window.STOCK`
- `assets/main.js` — intro, parallaxe, reveals, compteurs, rendu du stock, flèches du slider, menu mobile (fond + piège de focus), section active dans la nav, formulaire, année
- `assets/fonts/` — **polices auto-hébergées** (Fraunces, Archivo, Spline Sans Mono, sous-ensembles latins) : aucune requête vers Google, pas de sujet RGPD
- `assets/img/hero-atelier-1600.webp` + `-900.webp` — fond de hero en deux tailles (`srcset`)
- `assets/img/og-image.jpg` — image de partage social 1200×630
- `assets/img/logo-edouard.png` — logo détouré (fond transparent), 420 px
- `assets/img/atmo-1…8.webp` — patchwork atelier (visuels Instagram)
- `assets/img/*.webp` — photos véhicules **reprises de Leboncoin (filigrane)** — à remplacer par les originaux
- `assets/favicon.svg` — monogramme É salmon
- Aucune dépendance externe, pas de framework, pas de build.

### Poids

Site complet **1,35 Mo** ; chemin critique mobile **~178 Ko** (hero 900 px + logo + CSS + JS + 2 polices + HTML).

### URL de production

Les balises `canonical`, `og:*` et le `sitemap.xml` pointent vers
`https://edouard-automobiles.vercel.app`. **À mettre à jour** le jour où un nom de
domaine propre est branché (chercher/remplacer dans les 3 pages HTML + `sitemap.xml` + `robots.txt`).

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
- Les 8 véhicules présents sont réels (Leboncoin / Instagram), photos à remplacer par les originaux.

## À personnaliser / compléter

| Élément | État actuel | À faire |
|---|---|---|
| Logo | `logo-edouard.png` détouré depuis le JPG fourni | Fournir le **vectoriel officiel** (SVG) pour une netteté parfaite en grand |
| Photos véhicules | `*.webp` repris de Leboncoin, **filigrane visible** | Remplacer par les originaux, **mêmes noms de fichiers** |
| Photo hero | `hero-atelier-1600/900.webp` (droits OK, confirmé) | Rien — ou une photo maison de l'atelier au même cadrage large |
| **Mentions légales** | `mentions-legales.html`, **7 champs `[à compléter]`** | Renseigner capital, RCS, TVA, directeur de publication, médiateur de la consommation, adresse de l'hébergeur |
| Avis clients | 2 extraits **réels repris de Google** dans `#avis` | Compléter avec 3 à 6 avis récents (nom, date, modèle) ; brancher un widget Google si voulu |
| Plan (contact) | iframe OpenStreetMap, marqueur approché sur l'avenue | Affiner `bbox` / `marker`, ou passer à un plan Google si besoin |
| Téléphone | `07 50 44 27 81` (repris d'Instagram / Google) | Confirmer le numéro |
| E-mail | `edouard.automobiles@gmail.com` (bio Instagram) | Confirmer / passer à une adresse `@edouard-automobiles.fr` |
| Formulaire | `mailto` pré-rempli, pas de backend | Brancher Formspree / Web3Forms pour un envoi réel |
| Textes | Rédigés d'après Leboncoin + Instagram | Relire avec le client (méthode, services, délais) |
| Domaine | — | Configurer côté Vercel |

## Déploiement

Fichiers statiques → Vercel (projet `edouard-automobiles`). `vercel.json` : `cleanUrls`,
HTML/CSS/JS en `must-revalidate`, images en cache court. Lier le dépôt GitHub au
projet Vercel pour l'auto-déploiement sur `git push`.
