// Centralized image asset mapping.
//
// No real artwork exists yet, so every lookup below resolves to `null`,
// which tells consuming components to render their existing icon fallback.
// Once official artwork is available, drop files into the matching
// `app/assets/images/<category>/...` folder and fill in the map below —
// no component needs to change, since components only ever receive an
// `{ src, alt }` object via props and never import assets directly.
//
// Expected folder convention (see app/assets/images/README.md):
//   troops/<tribe>/<troop-slug>.png
//   buildings/<building-slug>.png
//   resources/<resource-type>.png
//   heroes/<tribe>-portrait.png
//   heroes/adventure-<difficulty>.png

export interface ImageRef {
	src: string | null;
	alt: string;
}

const TROOP_IMAGES: Record<string, string> = {
	// e.g. 'teutons/clubswinger': '/assets/images/troops/teutons/clubswinger.png',
};

const BUILDING_IMAGES: Record<string, string> = {
	// e.g. 'main-building': '/assets/images/buildings/main-building.png',
};

const RESOURCE_IMAGES: Record<string, string> = {
	// e.g. 'wood': '/assets/images/resources/wood.png',
};

const HERO_PORTRAITS: Record<string, string> = {
	// e.g. 'teutons': '/assets/images/heroes/teutons-portrait.png',
};

const ADVENTURE_ICONS: Record<string, string> = {
	// e.g. 'easy': '/assets/images/heroes/adventure-easy.png',
};

const slugify = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

export function getTroopImage(tribe: string, troopName: string): ImageRef {
	const key = `${tribe}/${slugify(troopName)}`;
	return { src: TROOP_IMAGES[key] ?? null, alt: troopName };
}

export function getBuildingImage(buildingName: string): ImageRef {
	const key = slugify(buildingName);
	return { src: BUILDING_IMAGES[key] ?? null, alt: buildingName };
}

export function getResourceFieldImage(resourceType: string): ImageRef {
	return { src: RESOURCE_IMAGES[resourceType] ?? null, alt: `${resourceType} field` };
}

export function getResourceIcon(resourceType: string): ImageRef {
	return { src: RESOURCE_IMAGES[resourceType] ?? null, alt: `${resourceType} icon` };
}

export function getHeroPortrait(tribe: string): ImageRef {
	return { src: HERO_PORTRAITS[tribe] ?? null, alt: `${tribe} hero portrait` };
}

export function getAdventureIcon(difficulty: string): ImageRef {
	return { src: ADVENTURE_ICONS[difficulty] ?? null, alt: `${difficulty} adventure` };
}

export function getBuildingIcon(buildingName: string): ImageRef {
	return getBuildingImage(buildingName);
}
