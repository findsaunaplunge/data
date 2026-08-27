// Fetch the live feed and write a dated snapshot: JSON as published, plus a flat CSV.
// No dependencies. Absent fields mean "unknown", never zero — see the feed's own notes.
import { writeFileSync, mkdirSync } from 'node:fs';
const FEED = 'https://findsaunaplunge.com/api/v1/venues.json';
const res = await fetch(FEED, { headers: { 'user-agent': 'findsaunaplunge-data-snapshot' } });
if (!res.ok) throw new Error(`feed ${res.status}`);
const feed = await res.json();
mkdirSync('snapshot', { recursive: true });
writeFileSync('snapshot/venues.json', JSON.stringify(feed, null, 2) + '\n');
const q = (v) => v === undefined || v === null ? '' : `"${String(v).replace(/"/g, '""')}"`;
const cols = ['id','name','status','lastVerified','brand','street','locality','state','zip','citySlug','cityName','lat','lng','modalities','access','dropIn','dayPass','membershipMo','priceFrom','plungeF_low','plungeF_high','saunaF_low','saunaF_high','hours','website','bookingUrl','phone','url'];
const rows = feed.venues.map((v) => [
  v.id, v.name, v.status, v.lastVerified, v.brand, v.address?.street, v.address?.city, v.address?.state, v.address?.zip,
  v.city?.slug, v.city?.name, v.geo?.lat, v.geo?.lng, (v.modalities ?? []).map((m) => m.value ?? m).join('|'), v.access,
  v.pricing?.dropIn, v.pricing?.dayPass, v.pricing?.membershipMo, (v.pricing?.priceFrom ?? []).join('|'),
  v.temps?.plungeF?.[0], v.temps?.plungeF?.[1], v.temps?.saunaF?.[0], v.temps?.saunaF?.[1],
  v.hours, v.website, v.bookingUrl, v.phone, v.url,
].map(q).join(','));
writeFileSync('snapshot/venues.csv', [cols.join(','), ...rows].join('\n') + '\n');
const cities = {};
for (const v of feed.venues) { const c = v.city?.slug; if (!c) continue; cities[c] ??= { slug: c, name: v.city.name, state: v.city.state, url: v.city.url, venues: 0 }; cities[c].venues += 1; }
writeFileSync('snapshot/cities.json', JSON.stringify(Object.values(cities).sort((a, b) => b.venues - a.venues), null, 2) + '\n');
const withTemp = feed.venues.filter((v) => v.temps?.plungeF).length;
const withPrice = feed.venues.filter((v) => v.pricing?.dropIn || v.pricing?.dayPass || v.pricing?.membershipMo).length;
writeFileSync('snapshot/SNAPSHOT.md', `# Snapshot\n\n- Taken: ${new Date().toISOString().slice(0, 10)}\n- Feed generated: ${feed.generatedAt}\n- Venues: ${feed.venues.length}\n- Cities: ${Object.keys(cities).length}\n- Venues publishing a plunge temperature: ${withTemp}\n- Venues publishing any price: ${withPrice}\n\nSource: ${FEED}\n`);
console.log(`snapshot: ${feed.venues.length} venues, ${Object.keys(cities).length} cities, ${withTemp} with plunge temp, ${withPrice} with a price`);
