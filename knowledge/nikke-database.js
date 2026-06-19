// ============================================================
//  NIKKE DATABASE — Roster, Weapons, Icons, Slugs
//  Single source of truth for all Nikke game entity data.
// ============================================================

const SLOTS = ["Helmet", "Chest", "Gloves", "Boots"];

// Harmony Cube TID → English name (sourced from game CDN)
const HARMONY_CUBE_NAMES = {
  1000301: "Assault Cube",
  1000303: "Resilience Cube",
  1000304: "Bastion Cube",
  1000307: "Quantum Cube",
};

// Collection Doll TID → English name (sourced from game CDN)
const COLLECTION_DOLL_NAMES = {
  100101: "Cooking Commander Doll",
  100102: "Cooking Commander Doll Ltd.",
  100201: "Shopping Commander Doll",
  100202: "Shopping Commander Doll Ltd.",
  100301: "Exercising Commander Doll",
  100302: "Exercising Commander Doll Ltd.",
  100401: "Battling Commander Doll",
  100402: "Battling Commander Doll Ltd.",
  100501: "Coffee Commander Doll",
  100502: "Coffee Commander Doll Ltd.",
  100601: "Napping Commander Doll",
  100602: "Napping Commander Doll Ltd.",
  200401: "Hero Trilogy BD",
  200601: "Sheet of Paper",
  200701: "Antique Compass",
  200801: "Villain Figurine",
  201101: "Fire Starter",
  201401: "Central Government Special Medal",
  201701: "Peony Hairpin",
};

const PRIORITY_TIERS = ["Essential", "Ideal", "Passable"];

// Full Nikke roster from Prydwen.gg (name, burst, element, weapon)
// Burst: I, II, III; Element: Fire, Water, Wind, Electric, Iron
// Weapon: SR=Sniper, RL=Rocket Launcher, AR=Assault Rifle, SMG=Submachine Gun, SG=Shotgun, MG=Minigun
const NIKKE_DATABASE = [
    { id: 810, name: "2B", burst: "III", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x Critical Damage"], passable: ["4x Critical Rate", "4x ATK"] }
    } },
    { id: 811, name: "A2", burst: "III", element: "Fire", weapon: "RL", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 840, name: "Ada Wong", burst: "III", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 10, s2: 4, s3: 4 }, rec: { s1: 10, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "1-2x Max Ammo", "4x ATK"], passable: ["4x Critical Damage", "4x Charge Speed"] }
    } },
    { id: 310, name: "Ade", burst: "II", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 5, s3: 1 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: ["4x Max Ammo"], passable: [] }
    } },
    { id: 315, name: "Ade: Agent Bunny", burst: "II", element: "Iron", weapon: "SMG", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 4, s3: 7 }, rec: { s1: 7, s2: 7, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: ["4x Elemental Damage", "4x ATK"] }
    } },
    { id: 172, name: "Admi", burst: "II", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 1, s3: 5 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 191, name: "Alice", burst: "III", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 10, s2: 4, s3: 10 }, max: null }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["2x Charge Speed", "3-4x ATK", "2-3x Max Ammo", "4x Elemental Damage"], passable: [] }
    } },
    { id: 195, name: "Alice: Wonderland Bunny", burst: "I", element: "Water", weapon: "RL", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 4 }, max: { s1: 7, s2: 10, s3: 4 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["1-3x Max Ammo"], passable: [] }
    } },
    { id: 351, name: "Anchor", burst: "I", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 355, name: "Anchor: Innocent Maid", burst: "II", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 4 }, rec: { s1: 7, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1-2x Max Ammo"], passable: [] }
    } },
    { id: 12, name: "Anis", burst: "II", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 15, name: "Anis: Sparkling Summer", burst: "III", element: "Electric", weapon: "RL", slug: "sparkling-summer-anis", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 5 }, min: { s1: 7, s2: 7, s3: 9 }, rec: { s1: 10, s2: 10, s3: 9 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Rate", "4x Critical Damage", "Hit Rate"] }
    } },
    { id: 17, name: "Anis: Star", burst: "I", element: "Electric", weapon: "RL", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK", "1-3x Max Ammo"], passable: ["Critical Rate", "Critical Damage", "Charge Damage"] }
    } },
    { id: 121, name: "Anne: Miracle Fairy", burst: "II", element: "Wind", weapon: "AR", slug: "miracle-fairy-anne", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: { s1: 4, s2: 4, s3: 7 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 581, name: "Arcana", burst: "II", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 4 }, rec: { s1: 10, s2: 10, s3: 4 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: ["4x Elemental Damage", "4x ATK", "2-4x Charge Speed"] }
    } },
    { id: 583, name: "Arcana: Fortune Mate", burst: "II", element: "Fire", weapon: "SMG", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 10, s2: 10, s3: 4 }, rec: { s1: 10, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Damage", "4x Critical Rate", "4x Hit Rate"] }
    } },
    { id: 432, name: "Aria", burst: "II", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 570, name: "Ark Ranger Black", burst: "III", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 7 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 7, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x Critical Damage", "4x ATK"], passable: [] }
    } },
    { id: 830, name: "Asuka Shikinami Langley", burst: "III", element: "Fire", weapon: "RL", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 7 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x Max Ammo", "4x ATK"], passable: [] }
    } },
    { id: 835, name: "Asuka Shikinami Langley: Wille", burst: "III", element: "Wind", weapon: "RL", build: {
        collection: { pvePriority: 7 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "High", ideal: ["4x Elemental Damage", "4x Max Ammo", "4x ATK"], passable: [] }
    } },
    { id: 441, name: "Avistar", burst: "I", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 1 }, rec: { s1: 4, s2: 7, s3: 1 }, max: { s1: 7, s2: 10, s3: 1 } }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 550, name: "Bay", burst: "II", element: "Fire", weapon: "SG", slug: "bay-treasure", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 60, name: "Belorta", burst: "II", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 381, name: "Biscuit", burst: "II", element: "Electric", weapon: "RL", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 4, s3: 7 }, max: { s1: 4, s2: 4, s3: 10 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 270, name: "Blanc", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 4 }, min: { s1: 4, s2: 4, s3: 7 }, rec: { s1: 4, s2: 4, s3: 10 }, max: null }, priority: "Medium" },
        overload: { priority: "Low", ideal: [], passable: [] }
    } },
    { id: 520, name: "Bready", burst: "III", element: "Water", weapon: "SG", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1x Max Ammo"], passable: ["1x Max Ammo", "2-3x Charge Speed", "2-3x Critical Rate", "2-3x Critical Damage"] }
    } },
    { id: 70, name: "Brid", burst: "III", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 73, name: "Brid: Silent Track", burst: "II", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x ATK", "1-3x Max Ammo"], passable: ["4x Critical Rate", "4x Critical Damage", "1-3x Max Ammo"] }
    } },
    { id: 80, name: "Centi", burst: "II", element: "Iron", weapon: "AR", slug: "centi-treasure", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 331, name: "Chime", burst: "II", element: "Iron", weapon: "SMG", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: [], passable: [] }
    } },
    { id: 860, name: "Chisato Nishikigi", burst: "III", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2-3x Max Ammo"], passable: ["2x Hit Rate", "2x Critical Rate", "2x Critical Damage"] }
    } },
    { id: 511, name: "Cinderella", burst: "III", element: "Electric", weapon: "RL", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 10, s2: 7, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK", "2x Max Ammo"], passable: ["1-3x Critical Rate", "1-3x Critical Damage", "1-2x Max Ammo"] }
    } },
    { id: 842, name: "Claire Redfield", burst: "I", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 551, name: "Clay", burst: "II", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 7, s3: 4 }, max: { s1: 4, s2: 10, s3: 4 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: [], passable: [] }
    } },
    { id: 311, name: "Cocoa", burst: "I", element: "Fire", weapon: "SG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 110, name: "Crow", burst: "III", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 330, name: "Crown", burst: "II", element: "Iron", weapon: "MG", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 10 }, max: null }, priority: "Meta" },
        overload: { priority: "Very High", ideal: ["2x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["Critical Rate", "Critical Damage", "Max Ammo"] }
    } },
    { id: 521, name: "Crust", burst: "II", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 3, s2: 3, s3: 3 }, rec: { s1: 4, s2: 4, s3: 4 }, max: { s1: 5, s2: 5, s3: 10 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 40, name: "D", burst: "III", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 43, name: "D: Killer Wife", burst: "I", element: "Fire", weapon: "SMG", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 7, s3: 4 }, rec: { s1: 7, s2: 10, s3: 4 }, max: { s1: 10, s2: 10, s3: 7 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 20, name: "Delta", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 23, name: "Delta: Ninja Thief", burst: "II", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 1, s3: 1 }, rec: { s1: 7, s2: 1, s3: 1 }, max: { s1: 10, s2: 3, s3: 4 } }, priority: null },
        overload: { priority: "Very Low", ideal: [], passable: ["4x Max Ammo", "4x Elemental Damage", "4x ATK"] }
    } },
    { id: 72, name: "Diesel", burst: "II", element: "Wind", weapon: "MG", slug: "diesel-treasure", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 4 }, rec: { s1: 1, s2: 7, s3: 4 }, max: { s1: 4, s2: 10, s3: 7 } }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: ["2-3x Max Ammo"], passable: [] }
    } },
    { id: 75, name: "Diesel: Winter Sweets", burst: "III", element: "Fire", weapon: "MG", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "High", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["1-2x Max Ammo", "4x Critical Rate", "4x Critical Damage"] }
    } },
    { id: 202, name: "Dolla", burst: "II", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: { s1: 7, s2: 7, s3: 4 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 233, name: "Dorothy", burst: "I", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 10, s2: 4, s3: 10 }, max: { s1: 10, s2: 7, s3: 10 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["4x ATK", "4x Elemental Damage"], passable: [] }
    } },
    { id: 234, name: "Dorothy: Serendipity", burst: "III", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "High", ideal: ["4x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["Critical Rate", "Critical Damage"] }
    } },
    { id: 101, name: "Drake", burst: "III", element: "Fire", weapon: "AR", slug: "drake-treasure", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 10, s2: 4, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["1x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["3x Max Ammo", "3x Critical Rate", "3x Critical Damage", "3x Hit Rate"] }
    } },
    { id: 113, name: "E.H.", burst: "III", element: "Wind", weapon: "SR", slug: "e-h", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 10 }, rec: { s1: 7, s2: 7, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "3x Max Ammo", "4x ATK"], passable: ["4x Hit Rate", "4x Critical Rate", "4x Critical Damage"] }
    } },
    { id: 391, name: "Ein", burst: "III", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2-3x Max Ammo"], passable: ["Max Ammo", "Charge Speed", "Critical Rate", "Critical Damage"] }
    } },
    { id: 500, name: "Elegg", burst: "II", element: "Electric", weapon: "RL", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 4, s3: 7 }, max: { s1: 7, s2: 7, s3: 10 } }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: ["2-3x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 502, name: "Elegg: Boom and Shock", burst: "III", element: "Water", weapon: "RL", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1x Max Ammo"], passable: ["Max Ammo", "Critical Damage", "Critical Rate"] }
    } },
    { id: 821, name: "Emilia", burst: "III", element: "Water", weapon: "RL", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 7 }, rec: { s1: 4, s2: 7, s3: 7 }, max: { s1: 7, s2: 10, s3: 7 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 90, name: "Emma", burst: "I", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 93, name: "Emma: Tactical Upgrade", burst: "I", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: [] }
    } },
    { id: 241, name: "Epinel", burst: "III", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: ["4x ATK", "4x Elemental Damage"], passable: [] }
    } },
    { id: 291, name: "Ether", burst: "I", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 92, name: "Eunhwa", burst: "II", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 95, name: "Eunhwa: Tactical Upgrade", burst: "II", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2x Max Ammo"], passable: ["Critical Damage", "Max Ammo", "Critical Rate"] }
    } },
    { id: 850, name: "Eve", burst: "III", element: "Iron", weapon: "MG", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 10, s2: 4, s3: 7 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "4x Critical Damage"], passable: ["1-2x Critical Rate", "1x Max Ammo"] }
    } },
    { id: 210, name: "Exia", burst: "I", element: "Electric", weapon: "AR", slug: "exia-treasure", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 7, s3: 4 }, rec: { s1: 1, s2: 10, s3: 7 }, max: { s1: 1, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Charge Speed", "Critical Rate", "Critical Damage"] }
    } },
    { id: 411, name: "Flora", burst: "II", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 7, s3: 7 }, max: null }, priority: null },
        overload: { priority: null, ideal: ["4x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 242, name: "Folkwang", burst: "II", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 142, name: "Frima", burst: "I", element: "Iron", weapon: "SMG", slug: "frima-treasure", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 4 }, rec: { s1: 1, s2: 7, s3: 7 }, max: { s1: 1, s2: 10, s3: 10 } }, priority: "Very Low" },
        overload: { priority: null, ideal: ["1-2x Max Ammo", "4x Charge Speed"], passable: [] }
    } },
    { id: 514, name: "Grave", burst: "II", element: "Fire", weapon: "SG", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 7, s2: 4, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "4x Critical Damage"], passable: [] }
    } },
    { id: 180, name: "Guillotine", burst: "III", element: "Electric", weapon: "MG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 7, s3: 4 }, max: { s1: 4, s2: 10, s3: 4 } }, priority: null },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: [] }
    } },
    { id: 182, name: "Guillotine: Winter Slayer", burst: "III", element: "Water", weapon: "MG", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "2x Max Ammo", "4x ATK"], passable: ["2x Hit Rate", "2x Max Ammo"] }
    } },
    { id: 400, name: "Guilty", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 7, s2: 1, s3: 1 }, max: { s1: 10, s2: 4, s3: 4 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x ATK", "1-2x Max Ammo"], passable: [] }
    } },
    { id: 230, name: "Harran", burst: "III", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: ["4x ATK", "4x Charge Speed", "4x Elemental Damage"], passable: [] }
    } },
    { id: 352, name: "Helm", burst: "III", element: "Water", weapon: "SR", slug: "helm-treasure", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Rate", "4x Critical Damage", "4x Charge Speed", "1x Max Ammo"] }
    } },
    { id: 353, name: "Helm: Aquamarine", burst: "II", element: "Iron", weapon: "SR", slug: "aqua-marine-helm", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 4 }, rec: { s1: 4, s2: 10, s3: 4 }, max: null }, priority: "Medium" },
        overload: { priority: "Very Low", ideal: [], passable: [] }
    } },
    { id: 802, name: "Himeno", burst: "II", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 231, name: "Isabel", burst: "III", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: [] }
    } },
    { id: 111, name: "Jackal", burst: "I", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 841, name: "Jill Valentine", burst: "III", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 150, name: "Julia", burst: "III", element: "Iron", weapon: "MG", slug: "julia-treasure", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["1x Max Ammo", "3x Critical Rate"] }
    } },
    { id: 41, name: "K", burst: "III", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 4 }, rec: { s1: 10, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: null },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Damage"] }
    } },
    { id: 361, name: "Kilo", burst: "III", element: "Fire", weapon: "SG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 4, s3: 7 }, max: null }, priority: null },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x Critical Rate", "4x Critical Damage"], passable: [] }
    } },
    { id: 862, name: "Kurumi", burst: "I", element: "Iron", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 1, s3: 4 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 582, name: "Label", burst: "I", element: "Iron", weapon: "SMG", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 1 }, rec: { s1: 1, s2: 7, s3: 1 }, max: { s1: 1, s2: 10, s3: 1 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 100, name: "Laplace", burst: "III", element: "Iron", weapon: "RL", slug: "laplace-treasure", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 7 }, rec: { s1: 4, s2: 7, s3: 10 }, max: { s1: 4, s2: 10, s3: 10 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 382, name: "Leona", burst: "II", element: "Water", weapon: "SG", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: null }, priority: "Low" },
        overload: { priority: "Low", ideal: ["1-3x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 262, name: "Liberalio", burst: "III", element: "Wind", weapon: "SR", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK", "1x Max Ammo"], passable: ["3x Charge Speed", "3x Critical Damage"] }
    } },
    { id: 852, name: "Lily", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 82, name: "Liter", burst: "I", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 7, s2: 4, s3: 10 }, max: { s1: 10, s2: 4, s3: 10 } }, priority: "Very High" },
        overload: { priority: "Medium", ideal: [], passable: [] }
    } },
    { id: 513, name: "Siren", burst: "I", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Very High", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Rate", "4x Critical Damage", "4x Max Ammo"] }
    } },
    { id: 190, name: "Ludmilla", burst: "I", element: "Water", weapon: "SG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 4, s3: 1 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 194, name: "Ludmilla: Winter Owner", burst: "III", element: "Water", weapon: "SG", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 5 }, rec: { s1: 10, s2: 4, s3: 10 }, max: { s1: 10, s2: 7, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["2x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["2x Max Ammo", "2x Critical Rate", "2x Critical Damage"] }
    } },
    { id: 181, name: "Maiden", burst: "III", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: "Very Low", ideal: ["4x ATK", "4x Elemental Damage"], passable: [] }
    } },
    { id: 183, name: "Maiden: Ice Rose", burst: "III", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: 7 },
        skill: { pve: { start: { s1: 4, s2: 7, s3: 4 }, min: { s1: 4, s2: 10, s3: 4 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1-2x Max Ammo"], passable: ["2-3x Charge Speed"] }
    } },
    { id: 800, name: "Makima", burst: "II", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: "Very Low", ideal: [], passable: [] }
    } },
    { id: 290, name: "Mana", burst: "III", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 321, name: "Marciana", burst: "II", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 1 }, min: null, rec: null, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 832, name: "Mari Makinami Illustrious", burst: "II", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 4, s3: 7 }, rec: { s1: 7, s2: 7, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 130, name: "Mary", burst: "I", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 132, name: "Mary: Bay Goddess", burst: "I", element: "Water", weapon: "SMG", slug: "bay-goddess-mary", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Low" },
        overload: { priority: null, ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 350, name: "Mast", burst: "II", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: { s1: 7, s2: 4, s3: 7 } }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: [], passable: [] }
    } },
    { id: 354, name: "Mast: Romantic Maid", burst: "II", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 4 }, rec: { s1: 7, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1x Max Ammo"], passable: ["3x Hit Rate", "3x Max Ammo"] }
    } },
    { id: 102, name: "Maxwell", burst: "III", element: "Iron", weapon: "SR", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 4, s2: 1, s3: 4 }, min: { s1: 7, s2: 1, s3: 4 }, rec: { s1: 10, s2: 1, s3: 7 }, max: { s1: 10, s2: 4, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2-4x Critical Damage", "0-2x Max Ammo"], passable: [] }
    } },
    { id: 61, name: "Mica", burst: "I", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 62, name: "Mica: Snow Buddy", burst: "I", element: "Iron", weapon: "SMG", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 161, name: "Mihara", burst: "III", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 162, name: "Mihara: Bonding Chain", burst: "III", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 5, s2: 5, s3: 5 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "High", ideal: ["4x Elemental Damage", "4x ATK", "3x Max Ammo"], passable: ["Critical Rate", "Critical Damage", "Max Ammo"] }
    } },
    { id: 141, name: "Milk", burst: "I", element: "Water", weapon: "SR", slug: "milk-treasure", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 4 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: ["1x Max Ammo", "3-4x Charge Speed"] }
    } },
    { id: 143, name: "Milk: Blooming Bunny", burst: "III", element: "Iron", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 10 }, max: null }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 600, name: "Mint", burst: "II", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 10, s2: 7, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 32, name: "Miranda", burst: "I", element: "Fire", weapon: "SMG", slug: "miranda-treasure", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 4 }, rec: { s1: 1, s2: 7, s3: 7 }, max: { s1: 7, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 833, name: "Misato Katsuragi", burst: "I", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 260, name: "Modernia", burst: "III", element: "Fire", weapon: "MG", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 4 }, rec: { s1: 10, s2: 10, s3: 4 }, max: null }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Max Ammo", "4x ATK", "4x Elemental Damage"], passable: ["1x Hit Rate", "1-2x Critical Rate"] }
    } },
    { id: 281, name: "Moran", burst: "I", element: "Electric", weapon: "SG", slug: "moran-treasure", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Damage", "4x Critical Rate", "4x DEF"] }
    } },
    { id: 590, name: "Mori", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 4 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 120, name: "N102", burst: "I", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 1, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 450, name: "Naga", burst: "II", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: 7 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Low", ideal: ["4x ATK", "4x Elemental Damage", "4x Max Ammo"], passable: ["4x Critical Rate", "4x Critical Damage"] }
    } },
    { id: 223, name: "Nayuta", burst: "II", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 10, s2: 5, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Very High", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Rate", "4x Critical Damage", "4x Charge Damage"] }
    } },
    { id: 11, name: "Neon", burst: "I", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 14, name: "Neon: Blue Ocean", burst: "III", element: "Water", weapon: "AR", slug: "blue-ocean-neon", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: [] }
    } },
    { id: 18, name: "Neon: Vision Eye", burst: "III", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x Charge Speed", "2-3x ATK", "1-2x Max Ammo"], passable: [] }
    } },
    { id: 380, name: "Nero", burst: "II", element: "Fire", weapon: "SG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 193, name: "Neve", burst: "III", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 4, s3: 1 }, max: null }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: ["4x ATK", "4x Elemental Damage"], passable: [] }
    } },
    { id: 261, name: "Nihilister", burst: "II", element: "Fire", weapon: "MG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 232, name: "Noah", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 271, name: "Noir", burst: "III", element: "Wind", weapon: "SR", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 7, s2: 5, s3: 4 }, rec: { s1: 10, s2: 9, s3: 4 }, max: { s1: 10, s2: 10, s3: 4 } }, priority: "Medium" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "2-3x Max Ammo", "4x ATK"], passable: ["4x Critical Rate", "4x Critical Damage"] }
    } },
    { id: 430, name: "Noise", burst: "I", element: "Electric", weapon: "RL", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 4, s3: 4 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 212, name: "Novel", burst: "II", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 1, s3: 7 }, max: { s1: 4, s2: 4, s3: 10 } }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 812, name: "Pascal", burst: "I", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 131, name: "Pepper", burst: "I", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 580, name: "Phantom", burst: "III", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 4 }, max: { s1: 10, s2: 10, s3: 7 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x ATK", "2-3x Max Ammo"], passable: ["2x Hit Rate", "1-2x Critical Damage", "1-2x Critical Rate", "2x Max Ammo"] }
    } },
    { id: 30, name: "Poli", burst: "II", element: "Water", weapon: "SG", slug: "poli-treasure", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 4, s3: 7 }, max: { s1: 4, s2: 4, s3: 10 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 801, name: "Power", burst: "III", element: "Fire", weapon: "MG", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: ["4x ATK", "4x Charge Speed", "4x Elemental Damage"], passable: [] }
    } },
    { id: 601, name: "Prika", burst: "II", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 7 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 170, name: "Privaty", burst: "III", element: "Water", weapon: "AR", slug: "privaty-treasure", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Rate", "4x Critical Damage"] }
    } },
    { id: 313, name: "Privaty: Unkind Maid", burst: "III", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 4 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 7, s3: 4 }, max: { s1: 10, s2: 10, s3: 7 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["3-4x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["2-3x Hit Rate", "2-3x Critical Rate", "2-3x Critical Damage"] }
    } },
    { id: 302, name: "Product 08", burst: "I", element: "Electric", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 303, name: "Product 12", burst: "III", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 307, name: "Product 23", burst: "II", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 402, name: "Quency", burst: "II", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 403, name: "Quency: Escape Queen", burst: "III", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 8 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2-3x Max Ammo", "1-2x Hit Rate"], passable: ["1-2x Critical Damage", "1-2x Critical Rate", "1x Hit Rate", "1x Max Ammo"] }
    } },
    { id: 33, name: "Quiry", burst: "III", element: "Wind", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 822, name: "Ram", burst: "I", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 10, name: "Rapi", burst: "III", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 3, s2: 3, s3: 3 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 16, name: "Rapi: Red Hood", burst: "I", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 10 }, max: null }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: [] }
    } },
    { id: 221, name: "Rapunzel", burst: "I", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 226, name: "Rapunzel: Pure Grace", burst: "I", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 851, name: "Raven", burst: "III", element: "Iron", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "High", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["Critical Rate", "Critical Damage", "1x Max Ammo"] }
    } },
    { id: 470, name: "Red Hood", burst: "All", element: "Iron", weapon: "SR", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 10 }, max: null }, priority: "Very High" },
        overload: { priority: "Very High", ideal: ["4x Elemental Damage", "1-2x Max Ammo", "4x ATK"], passable: ["2-3x Charge Speed"] }
    } },
    { id: 392, name: "Rei", burst: "I", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 831, name: "Rei Ayanami", burst: "III", element: "Fire", weapon: "RL", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 7 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x ATK", "4x Elemental Damage", "4x Max Ammo"], passable: [] }
    } },
    { id: 834, name: "Rei Ayanami (Tentative Name)", burst: "III", element: "Wind", weapon: "RL", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2-4x Max Ammo"], passable: ["2x Critical Damage", "2x Critical Rate"] }
    } },
    { id: 820, name: "Rem", burst: "II", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 4, s3: 7 }, max: { s1: 10, s2: 7, s3: 10 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["4x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["4x Critical Damage"] }
    } },
    { id: 280, name: "Rosanna", burst: "I", element: "Electric", weapon: "SG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 283, name: "Rosanna: Chic Ocean", burst: "II", element: "Wind", weapon: "SG", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 7, s3: 10 }, max: { s1: 7, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Low", ideal: [], passable: [] }
    } },
    { id: 272, name: "Rouge", burst: "I", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo"], passable: ["4x Elemental Damage", "4x ATK"] }
    } },
    { id: 240, name: "Rumani", burst: "I", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 200, name: "Rupee", burst: "II", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: null },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: [] }
    } },
    { id: 203, name: "Rupee: Winter Shopper", burst: "I", element: "Electric", weapon: "RL", slug: "winter-shopper-rupee", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 282, name: "Sakura", burst: "I", element: "Fire", weapon: "SG", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: { s1: 4, s2: 4, s3: 7 } }, priority: "Very Low" },
        overload: { priority: null, ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 836, name: "Sakura Suzuhara", burst: "I", element: "Water", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 1, s3: 1 }, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 284, name: "Sakura: Bloom in Summer", burst: "III", element: "Wind", weapon: "SG", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 5, s2: 7, s3: 7 }, max: { s1: 7, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Critical Damage"] }
    } },
    { id: 222, name: "Scarlet", burst: "III", element: "Electric", weapon: "SR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 4, s3: 7 }, max: { s1: 10, s2: 4, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "4x Max Ammo"], passable: ["1-2x Hit Rate", "1-2x Critical Rate", "1-2x Critical Damage"] }
    } },
    { id: 225, name: "Scarlet: Black Shadow", burst: "III", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 10, s2: 7, s3: 10 }, max: null }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["1x Max Ammo", "1x Charge Speed", "4x Elemental Damage", "4x ATK"], passable: ["3x Charge Speed"] }
    } },
    { id: 22, name: "Signal", burst: "II", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 401, name: "Sin", burst: "II", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: { s1: 4, s2: 4, s3: 4 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 620, name: "Snow Crane", burst: "II", element: "Water", weapon: "SG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: null, max: null }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 220, name: "Snow White", burst: "III", element: "Iron", weapon: "SR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 10 }, max: { s1: 4, s2: 7, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "4x Critical Damage"], passable: [] }
    } },
    { id: 471, name: "Snow White: Heavy Arms", burst: "III", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: 10 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 7, s2: 7, s3: 7 }, rec: { s1: 10, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Meta" },
        overload: { priority: "Meta", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["1x Max Ammo", "3-4x Critical Rate", "3-4x Critical Damage"] }
    } },
    { id: 224, name: "Snow White: Innocent Days", burst: "III", element: "Iron", weapon: "SR", slug: "innocent-dayss-snow-white", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 312, name: "Soda", burst: "I", element: "Fire", weapon: "SG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 314, name: "Soda: Twinkling Bunny", burst: "III", element: "Iron", weapon: "SG", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 4, s2: 4, s3: 4 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["1-2x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: ["1-2x Hit Rate", "1-2x Critical Rate", "1-2x Critical Damage"] }
    } },
    { id: 300, name: "Soldier EG", burst: "III", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 301, name: "Soldier FA", burst: "II", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 306, name: "Soldier OW", burst: "I", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 71, name: "Soline", burst: "III", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 74, name: "Soline: Frost Ticket", burst: "I", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 1, s3: 1 }, rec: { s1: 8, s2: 1, s3: 1 }, max: { s1: 10, s2: 4, s3: 1 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1-2x Max Ammo"], passable: ["4x Critical Damage", "4x Critical Rate", "1-2x Max Ammo"] }
    } },
    { id: 532, name: "Sora", burst: "I", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 7, s3: 4 }, max: { s1: 4, s2: 10, s3: 4 } }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 140, name: "Sugar", burst: "III", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: 3 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 1, s2: 5, s3: 5 }, max: null }, priority: "Very Low" },
        overload: { priority: "Very Low", ideal: ["2-3x Max Ammo", "4x Elemental Damage", "4x ATK"], passable: [] }
    } },
    { id: 861, name: "Takina Inoue", burst: "II", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "High" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "2x Max Ammo"], passable: ["2x Hit Rate", "2x Critical Rate", "2x Critical Damage"] }
    } },
    { id: 451, name: "Tia", burst: "I", element: "Iron", weapon: "RL", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 4, s2: 1, s3: 1 }, min: { s1: 7, s2: 4, s3: 4 }, rec: { s1: 10, s2: 4, s3: 4 }, max: null }, priority: "Medium" },
        overload: { priority: "Low", ideal: [], passable: [] }
    } },
    { id: 192, name: "Tove", burst: "I", element: "Water", weapon: "SMG", slug: "tove-treasure", build: {
        collection: { pvePriority: 9 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 3, s2: 4, s3: 4 }, rec: { s1: 6, s2: 7, s3: 7 }, max: { s1: 9, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "4x ATK", "1x Max Ammo"], passable: ["Max Ammo"] }
    } },
    { id: 412, name: "Trina", burst: "II", element: "Electric", weapon: "AR", build: {
        collection: { pvePriority: 4 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 7, s3: 7 }, max: { s1: 4, s2: 10, s3: 10 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["4x Charge Speed", "1-3x Max Ammo"], passable: ["Elemental Damage", "ATK"] }
    } },
    { id: 501, name: "Trony", burst: "III", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: 2 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 4, s2: 4, s3: 7 }, max: { s1: 4, s2: 4, s3: 10 } }, priority: "Very Low" },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK", "2x Max Ammo"], passable: [] }
    } },
    { id: 316, name: "Velvet", burst: "II", element: "Wind", weapon: "SR", build: {
        collection: { pvePriority: 6 },
        skill: { pve: { start: { s1: 1, s2: 5, s3: 1 }, min: { s1: 1, s2: 10, s3: 1 }, rec: { s1: 7, s2: 10, s3: 10 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "2-4x ATK", "0-2x Max Ammo", "2-4x Charge Speed"], passable: ["4x Critical Damage", "4x Critical Rate"] }
    } },
    { id: 91, name: "Vesti", burst: "III", element: "Water", weapon: "SR", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: null, rec: { s1: 4, s2: 4, s3: 4 }, max: null }, priority: "Very Low" },
        overload: { priority: null, ideal: ["4x Elemental Damage", "4x ATK"], passable: ["4x Charge Speed"] }
    } },
    { id: 94, name: "Vesti: Tactical Upgrade", burst: "III", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: 8 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 7, s3: 7 }, rec: { s1: 7, s2: 10, s3: 10 }, max: null }, priority: "Very High" },
        overload: { priority: "Medium", ideal: ["4x Elemental Damage", "2x Max Ammo", "2x Charge Speed", "4x ATK"], passable: ["Max Ammo", "Critical Damage", "Critical Rate"] }
    } },
    { id: 112, name: "Viper", burst: "II", element: "Water", weapon: "SG", slug: "viper-treasure", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 4, s2: 4, s3: 4 }, rec: { s1: 7, s2: 4, s3: 7 }, max: { s1: 10, s2: 4, s3: 10 } }, priority: "Low" },
        overload: { priority: "Low", ideal: ["0-4x Max Ammo", "4x ATK", "4x Elemental Damage"], passable: ["1-4x Hit Rate"] }
    } },
    { id: 431, name: "Volume", burst: "I", element: "Wind", weapon: "SMG", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 1, s3: 4 }, rec: { s1: 1, s2: 4, s3: 4 }, max: { s1: 1, s2: 7, s3: 7 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: [], passable: [] }
    } },
    { id: 201, name: "Yan", burst: "I", element: "Fire", weapon: "SR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 171, name: "Yulha", burst: "III", element: "Fire", weapon: "RL", build: {
        collection: { pvePriority: 1 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 1, s2: 4, s3: 1 }, rec: { s1: 1, s2: 7, s3: 1 }, max: { s1: 1, s2: 10, s3: 1 } }, priority: "Low" },
        overload: { priority: "Very Low", ideal: ["1-2x Max Ammo"], passable: [] }
    } },
    { id: 160, name: "Yuni", burst: "II", element: "Fire", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 390, name: "Zwei", burst: "I", element: "Electric", weapon: "RL", slug: "zwei-treasure", build: {
        collection: { pvePriority: 5 },
        skill: { pve: { start: { s1: 1, s2: 1, s3: 1 }, min: { s1: 7, s2: 4, s3: 7 }, rec: { s1: 10, s2: 7, s3: 7 }, max: { s1: 10, s2: 10, s3: 10 } }, priority: "Medium" },
        overload: { priority: "Low", ideal: ["4x Elemental Damage", "4x ATK"], passable: ["2x Hit Rate", "2x Critical Rate", "2x Critical Damage"] }
    } },
    { id: 304, name: "iDoll Flower", burst: "I", element: "Wind", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 305, name: "iDoll Ocean", burst: "I", element: "Water", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
    { id: 308, name: "iDoll Sun", burst: "III", element: "Iron", weapon: "AR", build: {
        collection: { pvePriority: null },
        skill: { pve: { start: null, min: null, rec: null, max: null }, priority: null },
        overload: { priority: null, ideal: [], passable: [] }
    } },
];

const NIKKE_DB_MAP = new Map(NIKKE_DATABASE.map(n => [n.name, n]));

// All possible overload stats
const ALL_LINES = [
    "ATK",
    "Elemental Damage",
    "Max Ammo",
    "Charge Speed",
    "Charge Damage",
    "Critical Rate",
    "Critical Damage",
    "Hit Rate",
    "DEF",
];

// Stats that are always trash — never worth keeping
const ALWAYS_TRASH = new Set(["DEF"]);

// Element icon URLs from Prydwen CDN
const ELEMENT_ICON = {
    Fire: "https://cdn.prydwen.gg/images/nikke/icons/fire_bg.webp",
    Water: "https://cdn.prydwen.gg/images/nikke/icons/water_bg.webp",
    Wind: "https://cdn.prydwen.gg/images/nikke/icons/wind_bg.webp",
    Electric: "https://cdn.prydwen.gg/images/nikke/icons/ele_bg.webp",
    Iron: "https://cdn.prydwen.gg/images/nikke/icons/iron_bg.webp",
};

function elemIcon(element) {
    const url = ELEMENT_ICON[element];
    return url
        ? `<img src="${url}" alt="${element}" style="width:20px;height:20px;vertical-align:middle;border-radius:3px;object-fit:contain">`
        : "";
}

// Nikke portrait icon from Prydwen CDN
function nikkeSlug(name) {
    const entry = NIKKE_DB_MAP.get(name);
    if (entry && entry.slug) return entry.slug;
    return name
        .toLowerCase()
        .replace(/:/g, "")
        .replace(/\./g, "")
        .replace(/'/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\s+/g, "-");
}

function nikkeIcon(name, size) {
    const sz = size || 22;
    const slug = nikkeSlug(name);
    return `<div style="width:${sz}px;height:${sz}px;border-radius:50%;overflow:hidden;flex-shrink:0;background:#1e3a5f"><img src="https://cdn.prydwen.gg/images/nikke/characters/${slug}_icon.webp" alt="${name}" style="width:${sz * 1.8}px;height:${sz * 1.8}px;object-fit:cover;object-position:top center;margin-left:-${sz * 0.4}px;margin-top:-${sz * 0.05}px" onerror="this.src='https://cdn.prydwen.gg/images/nikke/characters/${slug}_card.webp';this.onerror=function(){this.parentElement.style.display='none'}"></div>`;
}

// Preload nikke icons into browser cache to prevent flicker on re-render
const _preloadedIcons = new Set();
function preloadNikkeIcons() {
    state.nikkes.forEach((n) => {
        if (_preloadedIcons.has(n.name)) return;
        _preloadedIcons.add(n.name);
        const slug = nikkeSlug(n.name);
        const img = new Image();
        img.src = `https://cdn.prydwen.gg/images/nikke/characters/${slug}_icon.webp`;
    });
}
