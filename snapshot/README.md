---
license: cc-by-4.0
pretty_name: US Sauna & Cold Plunge Venue Data
language:
  - en
tags:
  - sauna
  - cold-plunge
  - cold-water-immersion
  - contrast-therapy
  - wellness
  - recovery
  - prices
  - venues
  - united-states
  - open-data
size_categories:
  - n<1K
configs:
  - config_name: default
    data_files:
      - split: train
        path: venues.csv
---

# US Sauna & Cold Plunge Venue Data

Cold plunge, sauna and contrast-therapy venues across the US metros that
[findsaunaplunge.com](https://findsaunaplunge.com) covers. Every record carries the
date its details were last checked, and every published temperature and price is
traceable to the venue's own page.

- **Homepage and national summary:** https://findsaunaplunge.com/data/us-sauna-cold-plunge/
- **Live feed (updated with every site build):** https://findsaunaplunge.com/api/v1/venues.json
- **Source repository and monthly releases:** https://github.com/findsaunaplunge/data
- **DOI (all versions):** https://doi.org/10.5281/zenodo.22132913
- **Licence:** CC BY 4.0. Use it freely; attribute with a link to findsaunaplunge.com.

## Files

| File | What it is |
| --- | --- |
| `venues.csv` | One row per venue, flat columns (the table the dataset viewer shows) |
| `venues.json` | The feed exactly as published, including per-fact `sources` |
| `cities.json` | The metros covered, with venue counts |
| `SNAPSHOT.md` | When the snapshot was taken and its headline counts |

## Provenance: what a record promises

This dataset exists because published wellness prices and temperatures go stale
quietly. Each record therefore carries:

- `lastVerified` — the ISO date a person or agent last read the venue's own pages.
- `status` — how the record was checked: `community` (checked against the venue's
  own published details), `brand_import` (taken from the operator's own location
  data, dated), `verified` (corroborated across sources of different kinds).
- In `venues.json`, a `sources` object: for each published fact (`plungeF`,
  `saunaF`, `dropIn`, `dayPass`, `membershipMo`, `hours`, `access`, policies…) the
  exact `sourceUrl` it came from, the `capturedOn` date that page was read, and a
  verbatim `quote` from that page that supports the value. A weekly recheck
  re-reads every source page and flags any quote that is no longer there.

**An absent field means the venue does not publish that detail. It never means
zero.** `pricing.priceFrom` lists which prices the venue publishes only as a floor
("from $29").

## Columns in `venues.csv`

| Column | Meaning |
| --- | --- |
| `id`, `name`, `status`, `lastVerified` | Stable id, display name, check status, date last checked |
| `brand` | Chain or franchise slug where the venue belongs to one |
| `street`, `locality`, `state`, `zip` | Street address |
| `citySlug`, `cityName` | The metro the venue is listed under (metros may span state lines) |
| `lat`, `lng` | Geocoded from the address; empty when no reliable pin exists |
| `modalities` | Pipe-separated: `cold_plunge`, `traditional_sauna`, `infrared_sauna`, `steam_room`, `red_light`, `cryotherapy`, `compression`, … |
| `access` | `private_suite`, `communal`, `mixed` or `unpublished` |
| `dropIn`, `dayPass`, `membershipMo` | USD, as printed by the venue; `priceFrom` names which of these are floors |
| `plungeF_low`, `plungeF_high`, `saunaF_low`, `saunaF_high` | Published water and sauna temperatures, °F |
| `hours` | Display string as the venue publishes it |
| `website`, `bookingUrl`, `phone` | Venue contact |
| `url` | The venue's page on findsaunaplunge.com, which shows the source and date behind every figure |

## Sample rows

```csv
id,name,status,lastVerified,citySlug,modalities,access,dayPass,plungeF_low,plungeF_high,url
jeju-sauna-atlanta-ga,Jeju Sauna,community,2026-08-16,atlanta-ga,traditional_sauna|steam_room,communal,40,,,https://findsaunaplunge.com/venue/jeju-sauna-atlanta-ga/
```

## Scope and caveats

- The venues are those in the metros findsaunaplunge.com covers. They are **not a
  national sample**; say "across the metros covered", never "in the US".
- Temperatures and prices are what venues publish, read from their own pages. They
  are not measured by us.
- Releases are monthly snapshots; the live feed is more current. For the current
  count of venues, metros and checked dates, read `SNAPSHOT.md` in this snapshot
  or the feed's `counts` block.

## Citation

> FindSaunaPlunge (2026). *US Sauna & Cold Plunge Venue Data* [Data set]. Zenodo.
> https://doi.org/10.5281/zenodo.22132913

Add the release tag you used (for example `v2026.09`) when the version matters.
