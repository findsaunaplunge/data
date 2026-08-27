# US Sauna & Cold Plunge Venue Data

Monthly snapshots of [findsaunaplunge.com](https://findsaunaplunge.com)'s public feed:
cold plunge, sauna and contrast-therapy venues across US metros, each record
carrying **the date its details were last checked**.

- `snapshot/venues.json` — the feed exactly as published (`/api/v1/venues.json`)
- `snapshot/venues.csv` — one row per venue, flat columns
- `snapshot/cities.json` — metros covered, with venue counts
- `snapshot/SNAPSHOT.md` — when it was taken and the headline counts

## What is in a record

`lastVerified` is the date the venue's own pages were last read. `status` says how:
`community` — checked against the venue's own published details; `brand_import` —
taken from the operator's own location data, dated; `verified` — corroborated across
sources of different kinds.

Temperatures (`temps.plungeF`, `temps.saunaF`, °F ranges) and prices (`pricing.dropIn`,
`dayPass`, `membershipMo`, USD) are read from the venue's own website or booking pages.
**An absent field means the venue does not publish that detail. It never means zero.**
`pricing.priceFrom` lists which prices are published as floors ("from $29").

The live site shows, for every temperature and price, the page it came from, the date
it was read, and the quote that supports it: `https://findsaunaplunge.com/venue/<id>/`.

## Licence and citation

[CC BY 4.0](LICENSE). Use it freely; attribute with a link. Please quote denominators
with numbers ("of the 548 venues checked…") — the figures describe this dataset's
coverage, not the whole US market.

See [CITATION.cff](CITATION.cff). Releases are tagged monthly (`vYYYY.MM`).

## Also available

- Live feed: https://findsaunaplunge.com/api/v1/venues.json (CC BY 4.0, no key)
- MCP server for assistants: https://findsaunaplunge.com/mcp
- National summary: https://findsaunaplunge.com/data/us-sauna-cold-plunge/
- For writers: https://findsaunaplunge.com/press/
