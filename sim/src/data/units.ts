import type { TribeDefinition, UnitDefinition } from '@/types/units'

/**
 * SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Stats, categories, and training costs below were extracted directly from a
 * real Travian game server engine (TravianZ-derived), specifically
 * `Data/unitdata.php` (base stats + costs) and `Battle.php` (unit category
 * groupings: `$unitsbytype`).
 *
 * Tribe IDs correspond to the engine's numeric tribe slots: Romans=1,
 * Teutons=2, Gauls=3, Huns=6, Egyptians=7, Spartans=8, Vikings=9 (slots 4/5
 * are Nature/Natars — non-playable — and are not modeled here).
 */

export const TRIBES: TribeDefinition[] = [
  { id: 'romans', name: 'Romans', wallBonusPerLevel: 0.03, wallName: 'City Wall' },
  { id: 'teutons', name: 'Teutons', wallBonusPerLevel: 0.02, wallName: 'Earth Wall' },
  { id: 'gauls', name: 'Gauls', wallBonusPerLevel: 0.025, wallName: 'Palisade' },
  { id: 'huns', name: 'Huns', wallBonusPerLevel: 0.015, wallName: 'Makeshift Wall' },
  { id: 'egyptians', name: 'Egyptians', wallBonusPerLevel: 0.03, wallName: 'Stone Wall' },
  { id: 'spartans', name: 'Spartans', wallBonusPerLevel: 0.028, wallName: 'Defensive Wall' },
  { id: 'vikings', name: 'Vikings', wallBonusPerLevel: 0.022, wallName: 'Barricade' },
]

export const UNITS: UnitDefinition[] = [
  // ---------------------------------------------------------------- ROMANS
  { id: 'legionnaire', tribe: 'romans', name: 'Legionnaire', category: 'infantry', role: 'offense', attack: 40, defenseInfantry: 35, defenseCavalry: 50, speed: 6, capacity: 50, populationCost: 1, cost: { wood: 120, clay: 100, iron: 150, crop: 30 }, trainingTimeSeconds: 1600 },
  { id: 'praetorian', tribe: 'romans', name: 'Praetorian', category: 'infantry', role: 'defense', attack: 30, defenseInfantry: 65, defenseCavalry: 35, speed: 5, capacity: 20, populationCost: 1, cost: { wood: 100, clay: 130, iron: 160, crop: 70 }, trainingTimeSeconds: 1760 },
  { id: 'imperian', tribe: 'romans', name: 'Imperian', category: 'infantry', role: 'offense', attack: 70, defenseInfantry: 40, defenseCavalry: 25, speed: 7, capacity: 50, populationCost: 1, cost: { wood: 150, clay: 160, iron: 210, crop: 80 }, trainingTimeSeconds: 1920 },
  { id: 'equites_legati', tribe: 'romans', name: 'Equites Legati', category: 'cavalry', role: 'scout', attack: 0, defenseInfantry: 20, defenseCavalry: 10, speed: 16, capacity: 0, populationCost: 2, cost: { wood: 140, clay: 160, iron: 20, crop: 40 }, trainingTimeSeconds: 1360 },
  { id: 'equites_imperatoris', tribe: 'romans', name: 'Equites Imperatoris', category: 'cavalry', role: 'offense', attack: 120, defenseInfantry: 65, defenseCavalry: 50, speed: 14, capacity: 100, populationCost: 3, cost: { wood: 550, clay: 440, iron: 320, crop: 100 }, trainingTimeSeconds: 2640 },
  { id: 'equites_caesaris', tribe: 'romans', name: 'Equites Caesaris', category: 'cavalry', role: 'offense', attack: 180, defenseInfantry: 80, defenseCavalry: 105, speed: 10, capacity: 70, populationCost: 4, cost: { wood: 550, clay: 640, iron: 800, crop: 180 }, trainingTimeSeconds: 3520 },
  { id: 'roman_ram', tribe: 'romans', name: 'Battering Ram', category: 'infantry', role: 'siege', attack: 60, defenseInfantry: 30, defenseCavalry: 75, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 900, clay: 360, iron: 500, crop: 70 }, trainingTimeSeconds: 4600 },
  { id: 'roman_catapult', tribe: 'romans', name: 'Fire Catapult', category: 'infantry', role: 'siege', attack: 75, defenseInfantry: 60, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 950, clay: 1350, iron: 600, crop: 90 }, trainingTimeSeconds: 9000 },
  { id: 'roman_senator', tribe: 'romans', name: 'Senator', category: 'infantry', role: 'admin', attack: 50, defenseInfantry: 40, defenseCavalry: 30, speed: 5, capacity: 0, populationCost: 5, cost: { wood: 30750, clay: 27200, iron: 45000, crop: 37500 }, trainingTimeSeconds: 90700 },
  { id: 'roman_settler', tribe: 'romans', name: 'Settler', category: 'infantry', role: 'settler', attack: 0, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 5800, clay: 5300, iron: 7200, crop: 5500 }, trainingTimeSeconds: 26900 },

  // --------------------------------------------------------------- TEUTONS
  { id: 'clubswinger', tribe: 'teutons', name: 'Clubswinger', category: 'infantry', role: 'offense', attack: 40, defenseInfantry: 20, defenseCavalry: 5, speed: 7, capacity: 60, populationCost: 1, cost: { wood: 95, clay: 75, iron: 40, crop: 40 }, trainingTimeSeconds: 720 },
  { id: 'spearman', tribe: 'teutons', name: 'Spearman', category: 'infantry', role: 'defense', attack: 10, defenseInfantry: 35, defenseCavalry: 60, speed: 7, capacity: 40, populationCost: 1, cost: { wood: 145, clay: 70, iron: 85, crop: 40 }, trainingTimeSeconds: 1120 },
  { id: 'axeman_teuton', tribe: 'teutons', name: 'Axeman', category: 'infantry', role: 'offense', attack: 60, defenseInfantry: 30, defenseCavalry: 30, speed: 6, capacity: 50, populationCost: 1, cost: { wood: 130, clay: 120, iron: 170, crop: 70 }, trainingTimeSeconds: 1200 },
  { id: 'teuton_scout', tribe: 'teutons', name: 'Scout', category: 'infantry', role: 'scout', attack: 0, defenseInfantry: 10, defenseCavalry: 5, speed: 9, capacity: 0, populationCost: 1, cost: { wood: 160, clay: 100, iron: 50, crop: 50 }, trainingTimeSeconds: 1120 },
  { id: 'paladin', tribe: 'teutons', name: 'Paladin', category: 'cavalry', role: 'defense', attack: 55, defenseInfantry: 100, defenseCavalry: 40, speed: 10, capacity: 110, populationCost: 2, cost: { wood: 370, clay: 270, iron: 290, crop: 75 }, trainingTimeSeconds: 2400 },
  { id: 'teutonic_knight', tribe: 'teutons', name: 'Teutonic Knight', category: 'cavalry', role: 'offense', attack: 150, defenseInfantry: 50, defenseCavalry: 75, speed: 9, capacity: 80, populationCost: 3, cost: { wood: 450, clay: 515, iron: 480, crop: 80 }, trainingTimeSeconds: 2960 },
  { id: 'teuton_ram', tribe: 'teutons', name: 'Ram', category: 'infantry', role: 'siege', attack: 65, defenseInfantry: 30, defenseCavalry: 80, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 1000, clay: 300, iron: 350, crop: 70 }, trainingTimeSeconds: 4200 },
  { id: 'teuton_catapult', tribe: 'teutons', name: 'Catapult', category: 'infantry', role: 'siege', attack: 50, defenseInfantry: 60, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 900, clay: 1200, iron: 600, crop: 60 }, trainingTimeSeconds: 9000 },
  { id: 'teuton_chief', tribe: 'teutons', name: 'Chief', category: 'infantry', role: 'admin', attack: 40, defenseInfantry: 60, defenseCavalry: 40, speed: 5, capacity: 0, populationCost: 4, cost: { wood: 35500, clay: 26600, iron: 25000, crop: 27200 }, trainingTimeSeconds: 70500 },
  { id: 'teuton_settler', tribe: 'teutons', name: 'Settler', category: 'infantry', role: 'settler', attack: 0, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 7200, clay: 5500, iron: 5800, crop: 6500 }, trainingTimeSeconds: 31000 },

  // ----------------------------------------------------------------- GAULS
  { id: 'phalanx', tribe: 'gauls', name: 'Phalanx', category: 'infantry', role: 'defense', attack: 15, defenseInfantry: 40, defenseCavalry: 50, speed: 7, capacity: 35, populationCost: 1, cost: { wood: 100, clay: 130, iron: 55, crop: 30 }, trainingTimeSeconds: 1040 },
  { id: 'swordsman', tribe: 'gauls', name: 'Swordsman', category: 'infantry', role: 'offense', attack: 65, defenseInfantry: 35, defenseCavalry: 20, speed: 6, capacity: 45, populationCost: 1, cost: { wood: 140, clay: 150, iron: 185, crop: 60 }, trainingTimeSeconds: 1440 },
  { id: 'pathfinder', tribe: 'gauls', name: 'Pathfinder', category: 'cavalry', role: 'scout', attack: 0, defenseInfantry: 20, defenseCavalry: 10, speed: 17, capacity: 0, populationCost: 1, cost: { wood: 170, clay: 150, iron: 20, crop: 40 }, trainingTimeSeconds: 1360 },
  { id: 'theutates_thunder', tribe: 'gauls', name: 'Theutates Thunder', category: 'cavalry', role: 'offense', attack: 90, defenseInfantry: 25, defenseCavalry: 40, speed: 19, capacity: 75, populationCost: 2, cost: { wood: 350, clay: 450, iron: 230, crop: 60 }, trainingTimeSeconds: 2480 },
  { id: 'druidrider', tribe: 'gauls', name: 'Druidrider', category: 'cavalry', role: 'defense', attack: 45, defenseInfantry: 115, defenseCavalry: 55, speed: 16, capacity: 35, populationCost: 2, cost: { wood: 360, clay: 330, iron: 280, crop: 120 }, trainingTimeSeconds: 2560 },
  { id: 'haeduan', tribe: 'gauls', name: 'Haeduan', category: 'cavalry', role: 'offense', attack: 140, defenseInfantry: 50, defenseCavalry: 165, speed: 13, capacity: 65, populationCost: 3, cost: { wood: 500, clay: 620, iron: 675, crop: 170 }, trainingTimeSeconds: 3120 },
  { id: 'gaul_ram', tribe: 'gauls', name: 'Ram', category: 'infantry', role: 'siege', attack: 50, defenseInfantry: 30, defenseCavalry: 105, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 950, clay: 555, iron: 330, crop: 75 }, trainingTimeSeconds: 5000 },
  { id: 'gaul_trebuchet', tribe: 'gauls', name: 'Trebuchet', category: 'infantry', role: 'siege', attack: 70, defenseInfantry: 45, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 960, clay: 1450, iron: 630, crop: 90 }, trainingTimeSeconds: 9000 },
  { id: 'gaul_chieftain', tribe: 'gauls', name: 'Chieftain', category: 'infantry', role: 'admin', attack: 40, defenseInfantry: 50, defenseCavalry: 50, speed: 4, capacity: 0, populationCost: 4, cost: { wood: 30750, clay: 45400, iron: 31000, crop: 37500 }, trainingTimeSeconds: 90700 },
  { id: 'gaul_settler', tribe: 'gauls', name: 'Settler', category: 'infantry', role: 'settler', attack: 0, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 5500, clay: 7000, iron: 5300, crop: 4900 }, trainingTimeSeconds: 22700 },

  // ----------------------------------------------------------------- HUNS
  { id: 'hun_warrior', tribe: 'huns', name: 'Hun Warrior', category: 'infantry', role: 'offense', attack: 35, defenseInfantry: 40, defenseCavalry: 30, speed: 6, capacity: 50, populationCost: 1, cost: { wood: 130, clay: 80, iron: 40, crop: 40 }, trainingTimeSeconds: 1120 },
  { id: 'scout_rider', tribe: 'huns', name: 'Scout Rider', category: 'infantry', role: 'scout', attack: 0, defenseInfantry: 20, defenseCavalry: 10, speed: 19, capacity: 0, populationCost: 2, cost: { wood: 170, clay: 150, iron: 20, crop: 40 }, trainingTimeSeconds: 1360 },
  { id: 'horse_archer', tribe: 'huns', name: 'Horse Archer', category: 'cavalry', role: 'offense', attack: 120, defenseInfantry: 30, defenseCavalry: 15, speed: 16, capacity: 75, populationCost: 2, cost: { wood: 290, clay: 370, iron: 190, crop: 45 }, trainingTimeSeconds: 2400 },
  { id: 'steppe_rider', tribe: 'huns', name: 'Steppe Rider', category: 'cavalry', role: 'defense', attack: 110, defenseInfantry: 80, defenseCavalry: 70, speed: 15, capacity: 105, populationCost: 2, cost: { wood: 320, clay: 350, iron: 330, crop: 50 }, trainingTimeSeconds: 2480 },
  { id: 'hun_lancer', tribe: 'huns', name: 'Hun Lancer', category: 'cavalry', role: 'offense', attack: 180, defenseInfantry: 60, defenseCavalry: 40, speed: 14, capacity: 80, populationCost: 3, cost: { wood: 450, clay: 560, iron: 610, crop: 140 }, trainingTimeSeconds: 2960 },
  { id: 'elite_rider', tribe: 'huns', name: 'Elite Rider', category: 'cavalry', role: 'offense', attack: 230, defenseInfantry: 90, defenseCavalry: 65, speed: 13, capacity: 70, populationCost: 4, cost: { wood: 660, clay: 750, iron: 800, crop: 180 }, trainingTimeSeconds: 3520 },
  { id: 'hun_ram', tribe: 'huns', name: 'Ram', category: 'infantry', role: 'siege', attack: 65, defenseInfantry: 30, defenseCavalry: 90, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 1060, clay: 330, iron: 360, crop: 70 }, trainingTimeSeconds: 4400 },
  { id: 'hun_catapult', tribe: 'huns', name: 'Catapult', category: 'infantry', role: 'siege', attack: 45, defenseInfantry: 55, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 950, clay: 1280, iron: 620, crop: 60 }, trainingTimeSeconds: 9000 },
  { id: 'tribal_chief', tribe: 'huns', name: 'Tribal Chief', category: 'infantry', role: 'admin', attack: 50, defenseInfantry: 40, defenseCavalry: 30, speed: 5, capacity: 0, populationCost: 5, cost: { wood: 37200, clay: 27600, iron: 25200, crop: 27600 }, trainingTimeSeconds: 90700 },
  { id: 'hun_settler', tribe: 'huns', name: 'Hun Settler', category: 'infantry', role: 'settler', attack: 10, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 6100, clay: 4600, iron: 4800, crop: 5400 }, trainingTimeSeconds: 28950 },

  // ------------------------------------------------------------- EGYPTIANS
  { id: 'armed_slave', tribe: 'egyptians', name: 'Armed Slave', category: 'infantry', role: 'offense', attack: 10, defenseInfantry: 30, defenseCavalry: 20, speed: 7, capacity: 20, populationCost: 1, cost: { wood: 45, clay: 60, iron: 30, crop: 30 }, trainingTimeSeconds: 640 },
  { id: 'egyptian_fighter', tribe: 'egyptians', name: 'Egyptian Fighter', category: 'infantry', role: 'defense', attack: 30, defenseInfantry: 55, defenseCavalry: 40, speed: 6, capacity: 45, populationCost: 1, cost: { wood: 115, clay: 100, iron: 145, crop: 60 }, trainingTimeSeconds: 1450 },
  { id: 'temple_guardian', tribe: 'egyptians', name: 'Temple Guardian', category: 'infantry', role: 'defense', attack: 25, defenseInfantry: 110, defenseCavalry: 80, speed: 6, capacity: 35, populationCost: 1, cost: { wood: 170, clay: 180, iron: 220, crop: 80 }, trainingTimeSeconds: 1760 },
  { id: 'horse_scout', tribe: 'egyptians', name: 'Horse Scout', category: 'cavalry', role: 'scout', attack: 0, defenseInfantry: 20, defenseCavalry: 10, speed: 16, capacity: 0, populationCost: 2, cost: { wood: 170, clay: 150, iron: 20, crop: 40 }, trainingTimeSeconds: 1360 },
  { id: 'chariot', tribe: 'egyptians', name: 'Chariot', category: 'cavalry', role: 'defense', attack: 50, defenseInfantry: 110, defenseCavalry: 50, speed: 15, capacity: 50, populationCost: 2, cost: { wood: 360, clay: 330, iron: 280, crop: 120 }, trainingTimeSeconds: 2560 },
  { id: 'royal_chariot', tribe: 'egyptians', name: 'Royal Chariot', category: 'cavalry', role: 'offense', attack: 110, defenseInfantry: 120, defenseCavalry: 150, speed: 10, capacity: 70, populationCost: 3, cost: { wood: 450, clay: 560, iron: 610, crop: 180 }, trainingTimeSeconds: 3120 },
  { id: 'egyptian_ram', tribe: 'egyptians', name: 'Ram', category: 'infantry', role: 'siege', attack: 55, defenseInfantry: 30, defenseCavalry: 95, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 995, clay: 575, iron: 340, crop: 80 }, trainingTimeSeconds: 4800 },
  { id: 'egyptian_catapult', tribe: 'egyptians', name: 'Catapult', category: 'infantry', role: 'siege', attack: 65, defenseInfantry: 55, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 980, clay: 1510, iron: 660, crop: 100 }, trainingTimeSeconds: 9000 },
  { id: 'nomarch', tribe: 'egyptians', name: 'Nomarch', category: 'infantry', role: 'admin', attack: 40, defenseInfantry: 50, defenseCavalry: 50, speed: 4, capacity: 0, populationCost: 4, cost: { wood: 34000, clay: 50000, iron: 34000, crop: 42000 }, trainingTimeSeconds: 90700 },
  { id: 'egyptian_settler', tribe: 'egyptians', name: 'Egyptian Settler', category: 'infantry', role: 'settler', attack: 0, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 5040, clay: 6510, iron: 4830, crop: 4620 }, trainingTimeSeconds: 24800 },

  // -------------------------------------------------------------- SPARTANS
  { id: 'spartan_hoplite', tribe: 'spartans', name: 'Spartan Hoplite', category: 'infantry', role: 'offense', attack: 50, defenseInfantry: 35, defenseCavalry: 30, speed: 6, capacity: 60, populationCost: 1, cost: { wood: 110, clay: 185, iron: 110, crop: 35 }, trainingTimeSeconds: 1700 },
  { id: 'agoge_warrior', tribe: 'spartans', name: 'Agoge Warrior', category: 'infantry', role: 'defense', attack: 40, defenseInfantry: 85, defenseCavalry: 45, speed: 6, capacity: 40, populationCost: 1, cost: { wood: 145, clay: 95, iron: 245, crop: 45 }, trainingTimeSeconds: 1950 },
  { id: 'homoioi', tribe: 'spartans', name: 'Homoioi', category: 'infantry', role: 'offense', attack: 95, defenseInfantry: 80, defenseCavalry: 75, speed: 5, capacity: 50, populationCost: 1, cost: { wood: 130, clay: 200, iron: 400, crop: 65 }, trainingTimeSeconds: 2200 },
  { id: 'perioikoi_scout', tribe: 'spartans', name: 'Perioikoi Scout', category: 'infantry', role: 'scout', attack: 0, defenseInfantry: 25, defenseCavalry: 12, speed: 16, capacity: 0, populationCost: 2, cost: { wood: 185, clay: 150, iron: 35, crop: 75 }, trainingTimeSeconds: 1360 },
  { id: 'spartan_rider', tribe: 'spartans', name: 'Spartan Rider', category: 'cavalry', role: 'defense', attack: 55, defenseInfantry: 120, defenseCavalry: 90, speed: 16, capacity: 110, populationCost: 2, cost: { wood: 555, clay: 445, iron: 330, crop: 110 }, trainingTimeSeconds: 2600 },
  { id: 'hippeis', tribe: 'spartans', name: 'Hippeis', category: 'cavalry', role: 'offense', attack: 195, defenseInfantry: 55, defenseCavalry: 80, speed: 9, capacity: 80, populationCost: 3, cost: { wood: 660, clay: 495, iron: 995, crop: 165 }, trainingTimeSeconds: 3450 },
  { id: 'spartan_ram', tribe: 'spartans', name: 'Ram', category: 'infantry', role: 'siege', attack: 65, defenseInfantry: 30, defenseCavalry: 85, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 980, clay: 545, iron: 390, crop: 80 }, trainingTimeSeconds: 4600 },
  { id: 'spartan_catapult', tribe: 'spartans', name: 'Catapult', category: 'infantry', role: 'siege', attack: 60, defenseInfantry: 55, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 1200, clay: 1240, iron: 610, crop: 80 }, trainingTimeSeconds: 9000 },
  { id: 'ephor', tribe: 'spartans', name: 'Ephor', category: 'infantry', role: 'admin', attack: 45, defenseInfantry: 50, defenseCavalry: 45, speed: 4, capacity: 0, populationCost: 4, cost: { wood: 33450, clay: 30665, iron: 36240, crop: 27375 }, trainingTimeSeconds: 90700 },
  { id: 'spartan_settler', tribe: 'spartans', name: 'Spartan Settler', category: 'infantry', role: 'settler', attack: 10, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 5115, clay: 5580, iron: 6360, crop: 4485 }, trainingTimeSeconds: 26900 },

  // --------------------------------------------------------------- VIKINGS
  { id: 'viking_raider', tribe: 'vikings', name: 'Viking Raider', category: 'infantry', role: 'offense', attack: 45, defenseInfantry: 30, defenseCavalry: 15, speed: 7, capacity: 70, populationCost: 1, cost: { wood: 105, clay: 85, iron: 65, crop: 35 }, trainingTimeSeconds: 960 },
  { id: 'viking_scout', tribe: 'vikings', name: 'Viking Scout', category: 'infantry', role: 'scout', attack: 0, defenseInfantry: 15, defenseCavalry: 8, speed: 10, capacity: 0, populationCost: 1, cost: { wood: 155, clay: 110, iron: 45, crop: 45 }, trainingTimeSeconds: 1120 },
  { id: 'axeman_viking', tribe: 'vikings', name: 'Axeman', category: 'infantry', role: 'offense', attack: 70, defenseInfantry: 35, defenseCavalry: 25, speed: 6, capacity: 55, populationCost: 1, cost: { wood: 145, clay: 135, iron: 185, crop: 70 }, trainingTimeSeconds: 1400 },
  { id: 'berserker', tribe: 'vikings', name: 'Berserker', category: 'infantry', role: 'offense', attack: 105, defenseInfantry: 45, defenseCavalry: 30, speed: 6, capacity: 60, populationCost: 2, cost: { wood: 190, clay: 220, iron: 340, crop: 90 }, trainingTimeSeconds: 1960 },
  { id: 'viking_rider', tribe: 'vikings', name: 'Viking Rider', category: 'cavalry', role: 'defense', attack: 100, defenseInfantry: 70, defenseCavalry: 55, speed: 12, capacity: 90, populationCost: 2, cost: { wood: 415, clay: 380, iron: 305, crop: 85 }, trainingTimeSeconds: 2640 },
  { id: 'huscarl', tribe: 'vikings', name: 'Huscarl', category: 'cavalry', role: 'offense', attack: 165, defenseInfantry: 95, defenseCavalry: 100, speed: 10, capacity: 75, populationCost: 3, cost: { wood: 590, clay: 640, iron: 715, crop: 160 }, trainingTimeSeconds: 3300 },
  { id: 'viking_ram', tribe: 'vikings', name: 'Ram', category: 'infantry', role: 'siege', attack: 65, defenseInfantry: 35, defenseCavalry: 80, speed: 4, capacity: 0, populationCost: 3, cost: { wood: 1010, clay: 415, iron: 440, crop: 75 }, trainingTimeSeconds: 4700 },
  { id: 'viking_catapult', tribe: 'vikings', name: 'Catapult', category: 'infantry', role: 'siege', attack: 55, defenseInfantry: 60, defenseCavalry: 10, speed: 3, capacity: 0, populationCost: 6, cost: { wood: 930, clay: 1350, iron: 640, crop: 80 }, trainingTimeSeconds: 9000 },
  { id: 'jarl', tribe: 'vikings', name: 'Jarl', category: 'infantry', role: 'admin', attack: 50, defenseInfantry: 45, defenseCavalry: 40, speed: 5, capacity: 0, populationCost: 4, cost: { wood: 35800, clay: 29200, iron: 28600, crop: 31500 }, trainingTimeSeconds: 90700 },
  { id: 'viking_settler', tribe: 'vikings', name: 'Viking Settler', category: 'infantry', role: 'settler', attack: 10, defenseInfantry: 80, defenseCavalry: 80, speed: 5, capacity: 3000, populationCost: 1, cost: { wood: 5900, clay: 5200, iron: 5700, crop: 5800 }, trainingTimeSeconds: 27500 },
]

export function getUnitsForTribe(tribe: string): UnitDefinition[] {
  return UNITS.filter((u) => u.tribe === tribe)
}

export function getUnitDefinition(unitId: string): UnitDefinition | undefined {
  return UNITS.find((u) => u.id === unitId)
}

export function getTribe(tribeId: string): TribeDefinition | undefined {
  return TRIBES.find((t) => t.id === tribeId)
}
