export type Rarity = 'consumer' | 'industrial' | 'milspec' | 'restricted' | 'classified' | 'covert' | 'contraband' | 'knife' | 'rare_special';
export type ItemType = 'weapon' | 'agent' | 'music' | 'keychain' | 'egg' | 'glove' | 'signature' | 'rare_special';

export interface Skin {
  id: string;
  name: string;
  weapon: string;
  rarity: Rarity;
  price: number;
  image: string;
  color: string;
  gradient: string;
  type?: ItemType;
}

export const rarityColors: Record<Rarity, string> = {
  consumer: '#b0c3d9',
  industrial: '#5e98d9',
  milspec: '#4b69ff',
  restricted: '#8847ff',
  classified: '#d32ce6',
  covert: '#eb4b4b',
  contraband: '#e4ae39',
  knife: '#e4ae39',
  rare_special: '#e4ae39',
};

export const rarityNames: Record<Rarity, string> = {
  consumer: 'Consumer',
  industrial: 'Industrial',
  milspec: 'Mil-Spec',
  restricted: 'Restricted',
  classified: 'Classified',
  covert: 'Covert',
  contraband: '★ Contraband',
  knife: '★ Knife',
  rare_special: '★ Rare Special Item',
};

export const allSkins: Skin[] = [
  // Consumer grade
  { id: 's1', name: 'Sand Dune', weapon: 'P250', rarity: 'consumer', price: 0.03, image: 'https://image.qwenlm.ai/generated-images/aab4fc8a-2e12-4d35-ad39-8952289202bb/_result.png', color: '#b0c3d9', gradient: 'from-gray-400 to-gray-600' },
  { id: 's2', name: 'Groundwater', weapon: 'MAC-10', rarity: 'consumer', price: 0.04, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#b0c3d9', gradient: 'from-gray-400 to-gray-600' },
  { id: 's3', name: 'Safari Mesh', weapon: 'MP9', rarity: 'consumer', price: 0.03, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#b0c3d9', gradient: 'from-gray-400 to-gray-600' },
  // Industrial grade
  { id: 's4', name: 'Blue Spruce', weapon: 'MP7', rarity: 'industrial', price: 0.05, image: 'https://image.qwenlm.ai/generated-images/13c2f8f8-e236-40bf-b4a8-497ea26c8034/_result.png', color: '#5e98d9', gradient: 'from-blue-400 to-blue-600' },
  { id: 's5', name: 'Tornado', weapon: 'PP-Bizon', rarity: 'industrial', price: 0.06, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#5e98d9', gradient: 'from-blue-400 to-blue-600' },
  { id: 's6', name: 'Storm', weapon: 'Nova', rarity: 'industrial', price: 0.05, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#5e98d9', gradient: 'from-blue-400 to-blue-600' },
  // Mil-Spec
  { id: 's7', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'milspec', price: 2.50, image: 'https://image.qwenlm.ai/generated-images/d9715fb1-3c66-4e4b-beba-51ceb99212dd/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700' },
  { id: 's8', name: 'Asiimov', weapon: 'AWP', rarity: 'milspec', price: 3.20, image: 'https://image.qwenlm.ai/generated-images/8f2be26f-549f-40c6-b0f8-efa741a2cd11/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700' },
  { id: 's9', name: 'Redline', weapon: 'AK-47', rarity: 'milspec', price: 4.80, image: 'https://image.qwenlm.ai/generated-images/3e8efba8-dc3e-4da7-abdf-a4aea16ffaae/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700' },
  { id: 's10', name: 'Desolate Space', weapon: 'M4A4', rarity: 'milspec', price: 2.10, image: 'https://image.qwenlm.ai/generated-images/fdf638ae-886a-4a28-a8c1-0d4f790bb3f8/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700' },
  // Restricted
  { id: 's11', name: 'Neon Rider', weapon: 'AK-47', rarity: 'restricted', price: 12.50, image: 'https://image.qwenlm.ai/generated-images/a62bc96c-21f1-45f9-b636-7c74c5a80e62/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800' },
  { id: 's12', name: 'Bloodsport', weapon: 'AK-47', rarity: 'restricted', price: 15.00, image: 'https://image.qwenlm.ai/generated-images/1c3236f6-a56a-44e5-addf-1843f865afce/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800' },
  { id: 's13', name: 'Printstream', weapon: 'Desert Eagle', rarity: 'restricted', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/30fbafaf-81e5-42f4-a654-f4f11d21c15f/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800' },
  { id: 's14', name: 'Mecha Industries', weapon: 'AWP', rarity: 'restricted', price: 14.00, image: 'https://image.qwenlm.ai/generated-images/beca3ec4-58d1-4bc7-988a-b45f08421131/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800' },
  // Classified
  { id: 's15', name: 'Dragon Lore', weapon: 'AWP', rarity: 'classified', price: 85.00, image: 'https://image.qwenlm.ai/generated-images/8d97ee8d-c9d7-4b15-85a6-74e753f3886a/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800' },
  { id: 's16', name: 'Fire Serpent', weapon: 'AK-47', rarity: 'classified', price: 65.00, image: 'https://image.qwenlm.ai/generated-images/b593ed89-7e32-4d25-9eef-ddc4465289f9/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800' },
  { id: 's17', name: 'Howl', weapon: 'M4A4', rarity: 'classified', price: 120.00, image: 'https://image.qwenlm.ai/generated-images/bb86574f-7a01-4ecc-badf-7fa8d936ba15/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800' },
  // Covert
  { id: 's18', name: 'The Prince', weapon: 'AWP', rarity: 'covert', price: 250.00, image: 'https://image.qwenlm.ai/generated-images/5e6cea5f-d609-4386-9034-a5f369e1b220/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900' },
  { id: 's19', name: 'Wildfire', weapon: 'AK-47', rarity: 'covert', price: 180.00, image: 'https://image.qwenlm.ai/generated-images/da440839-d467-427b-bd5e-86506ffc5e41/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900' },
  { id: 's20', name: 'Neo-Noir', weapon: 'USP-S', rarity: 'covert', price: 95.00, image: 'https://image.qwenlm.ai/generated-images/3f297725-404a-42b2-bd68-72f7445ea82b/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900' },
  // Knives
  { id: 's21', name: 'Fade', weapon: 'Karambit', rarity: 'knife', price: 1200.00, image: 'https://image.qwenlm.ai/generated-images/b56a0566-8674-4850-b2ae-537feb247b37/_result.png', color: '#e4ae39', gradient: 'from-yellow-400 to-amber-700' },
  { id: 's22', name: 'Doppler', weapon: 'Butterfly Knife', rarity: 'knife', price: 1800.00, image: 'https://image.qwenlm.ai/generated-images/ba71cb9c-37af-4214-8146-5f334edbd8e5/_result.png', color: '#e4ae39', gradient: 'from-yellow-400 to-amber-700' },
  { id: 's23', name: 'Crimson Web', weapon: 'M9 Bayonet', rarity: 'knife', price: 950.00, image: 'https://image.qwenlm.ai/generated-images/c4eb80ed-9da5-4aa7-a199-27308260f9d9/_result.png', color: '#e4ae39', gradient: 'from-yellow-400 to-amber-700' },
  { id: 's24', name: 'Tiger Tooth', weapon: 'Karambit', rarity: 'knife', price: 750.00, image: 'https://image.qwenlm.ai/generated-images/275ba825-e5a0-4565-a925-b9f176c2ff57/_result.png', color: '#e4ae39', gradient: 'from-yellow-400 to-amber-700' },
  // New weapons - CS2 realistic drop rates
  { id: 's25', name: 'Asiimov', weapon: 'M4A1-S', rarity: 'milspec', price: 3.80, image: 'https://image.qwenlm.ai/generated-images/8f2be26f-549f-40c6-b0f8-efa741a2cd11/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700' },
  { id: 's26', name: 'Neo-Noir', weapon: 'M4A1-S', rarity: 'classified', price: 78.00, image: 'https://image.qwenlm.ai/generated-images/3f297725-404a-42b2-bd68-72f7445ea82b/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800' },
  { id: 's27', name: 'Printstream', weapon: 'M4A1-S', rarity: 'covert', price: 145.00, image: 'https://image.qwenlm.ai/generated-images/30fbafaf-81e5-42f4-a654-f4f11d21c15f/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900' },
  { id: 's28', name: 'Bloodsport', weapon: 'M4A4', rarity: 'restricted', price: 16.50, image: 'https://image.qwenlm.ai/generated-images/1c3236f6-a56a-44e5-addf-1843f865afce/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800' },
  { id: 's29', name: 'Desolate Space', weapon: 'AK-47', rarity: 'milspec', price: 2.80, image: 'https://image.qwenlm.ai/generated-images/fdf638ae-886a-4a28-a8c1-0d4f790bb3f8/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700' },
  { id: 's30', name: 'Wildfire', weapon: 'M4A4', rarity: 'covert', price: 195.00, image: 'https://image.qwenlm.ai/generated-images/da440839-d467-427b-bd5e-86506ffc5e41/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900' },
  
  // === 30 NEW WEAPONS ===
  { id: 's31', name: 'Vulcan', weapon: 'AK-47', rarity: 'classified', price: 72.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's32', name: 'Fuel Injector', weapon: 'AK-47', rarity: 'covert', price: 165.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's33', name: 'Ice Coated', weapon: 'AK-47', rarity: 'restricted', price: 14.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's34', name: 'Phantom', weapon: 'AK-47', rarity: 'milspec', price: 3.50, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 's35', name: 'Orbit Mk01', weapon: 'AK-47', rarity: 'restricted', price: 11.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's36', name: 'Hydrodip', weapon: 'AWP', rarity: 'milspec', price: 2.80, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 's37', name: 'Fever Dream', weapon: 'AWP', rarity: 'classified', price: 68.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's38', name: 'Chromatic Aberration', weapon: 'AWP', rarity: 'covert', price: 220.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's39', name: 'Neo-Noir', weapon: 'AWP', rarity: 'covert', price: 185.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's40', name: 'Containment Breach', weapon: 'AWP', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's41', name: 'Decimator', weapon: 'M4A4', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's42', name: 'The Emperor', weapon: 'M4A4', rarity: 'covert', price: 280.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's43', name: 'Tooth Fairy', weapon: 'M4A4', rarity: 'classified', price: 42.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's44', name: 'Hellfire', weapon: 'M4A4', rarity: 'restricted', price: 13.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's45', name: 'Converter', weapon: 'M4A4', rarity: 'milspec', price: 1.80, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 's46', name: 'Player 2', weapon: 'M4A1-S', rarity: 'covert', price: 155.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's47', name: 'Decimator', weapon: 'M4A1-S', rarity: 'restricted', price: 16.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's48', name: 'Briefing', weapon: 'M4A1-S', rarity: 'classified', price: 58.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's49', name: 'Atomic Alloy', weapon: 'M4A1-S', rarity: 'milspec', price: 2.20, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 's50', name: 'Nightmare', weapon: 'M4A1-S', rarity: 'restricted', price: 19.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's51', name: 'Code Red', weapon: 'Deagle', rarity: 'covert', price: 140.00, image: 'https://image.qwenlm.ai/generated-images/bd9a5eb3-9f3a-47f8-8c9c-895df696eb88/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's52', name: 'Kumicho Dragon', weapon: 'Deagle', rarity: 'classified', price: 52.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's53', name: 'Directive', weapon: 'Deagle', rarity: 'restricted', price: 8.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's54', name: 'Sunset Storm', weapon: 'Deagle', rarity: 'milspec', price: 1.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 's55', name: 'Oxide Blaze', weapon: 'Deagle', rarity: 'restricted', price: 9.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's56', name: 'Mecha Industries', weapon: 'P250', rarity: 'classified', price: 38.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's57', name: 'Asiimov', weapon: 'P250', rarity: 'classified', price: 45.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 's58', name: 'Undertow', weapon: 'P250', rarity: 'covert', price: 110.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 's59', name: 'Franklin', weapon: 'P250', rarity: 'restricted', price: 7.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 's60', name: 'Modern Hunter', weapon: 'P250', rarity: 'milspec', price: 1.20, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },

  // === 10 AGENTS ===
  { id: 'a1', name: 'Sir Bloody Miami Darryl', weapon: 'Agent', rarity: 'covert', price: 85.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'agent' },
  { id: 'a2', name: 'SafeCracker Voltzmann', weapon: 'Agent', rarity: 'classified', price: 42.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'agent' },
  { id: 'a3', name: 'Little Kev', weapon: 'Agent', rarity: 'restricted', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'agent' },
  { id: 'a4', name: 'Number K', weapon: 'Agent', rarity: 'classified', price: 38.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'agent' },
  { id: 'a5', name: 'Getaway Sally', weapon: 'Agent', rarity: 'restricted', price: 15.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'agent' },
  { id: 'a6', name: 'Bloody Darryl The Strapped', weapon: 'Agent', rarity: 'covert', price: 92.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'agent' },
  { id: 'a7', name: 'Two Times McCoy', weapon: 'Agent', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'agent' },
  { id: 'a8', name: 'Rezan The Ready', weapon: 'Agent', rarity: 'restricted', price: 12.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'agent' },
  { id: 'a9', name: 'Cmdr. Mae Dead Cool', weapon: 'Agent', rarity: 'covert', price: 78.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'agent' },
  { id: 'a10', name: 'Operator', weapon: 'Agent', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/4d211738-0c34-4240-9ba3-87b2808e3720/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'agent' },

  // === 10 MUSIC KITS ===
  { id: 'm1', name: 'Feed The Fury', weapon: 'Music Kit', rarity: 'restricted', price: 5.00, image: 'https://image.qwenlm.ai/generated-images/dedfaa60-97eb-4315-b7b2-07ceb3e43780/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'music' },
  { id: 'm2', name: 'Diamond Eyes', weapon: 'Music Kit', rarity: 'classified', price: 12.00, image: 'https://image.qwenlm.ai/generated-images/ba0cec2e-bcda-4489-92aa-08e504031bd9/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'music' },
  { id: 'm3', name: 'Hot Knives', weapon: 'Music Kit', rarity: 'restricted', price: 6.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'music' },
  { id: 'm4', name: 'Drum and Bass', weapon: 'Music Kit', rarity: 'classified', price: 15.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'music' },
  { id: 'm5', name: 'The Good Youth', weapon: 'Music Kit', rarity: 'restricted', price: 4.50, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'music' },
  { id: 'm6', name: 'I Am', weapon: 'Music Kit', rarity: 'covert', price: 25.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'music' },
  { id: 'm7', name: 'Battlepack', weapon: 'Music Kit', rarity: 'classified', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'music' },
  { id: 'm8', name: 'Unstoppable', weapon: 'Music Kit', rarity: 'restricted', price: 7.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'music' },
  { id: 'm9', name: 'Muted', weapon: 'Music Kit', rarity: 'classified', price: 14.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'music' },
  { id: 'm10', name: 'The 8-Bit Kit', weapon: 'Music Kit', rarity: 'covert', price: 32.00, image: 'https://image.qwenlm.ai/generated-images/08b652b0-3fa2-40ee-925a-e379f4a23d6b/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'music' },

  // === 10 KEYCHAINS ===
  { id: 'k1', name: 'Skull', weapon: 'Keychain', rarity: 'milspec', price: 1.50, image: 'https://image.qwenlm.ai/generated-images/ad890ce1-6bd0-493a-8600-6de4d0fa74c1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'keychain' },
  { id: 'k2', name: 'Dragon', weapon: 'Keychain', rarity: 'restricted', price: 3.50, image: 'https://image.qwenlm.ai/generated-images/13390621-58ef-4df3-b3d3-14fe4c28b330/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'keychain' },
  { id: 'k3', name: 'Phoenix', weapon: 'Keychain', rarity: 'classified', price: 8.00, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'keychain' },
  { id: 'k4', name: 'Tiger', weapon: 'Keychain', rarity: 'milspec', price: 1.80, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'keychain' },
  { id: 'k5', name: 'Crown', weapon: 'Keychain', rarity: 'classified', price: 10.00, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'keychain' },
  { id: 'k6', name: 'Diamond', weapon: 'Keychain', rarity: 'covert', price: 22.00, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'keychain' },
  { id: 'k7', name: 'Wolf', weapon: 'Keychain', rarity: 'restricted', price: 4.00, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'keychain' },
  { id: 'k8', name: 'Eagle', weapon: 'Keychain', rarity: 'milspec', price: 2.00, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'keychain' },
  { id: 'k9', name: 'Snake', weapon: 'Keychain', rarity: 'classified', price: 9.00, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'keychain' },
  { id: 'k10', name: 'Bear', weapon: 'Keychain', rarity: 'restricted', price: 3.80, image: 'https://image.qwenlm.ai/generated-images/aec63308-fca1-4188-8c43-38a3c9565406/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'keychain' },

  // === 10 EGGS ===
  { id: 'e1', name: 'Golden Egg', weapon: 'Egg', rarity: 'covert', price: 150.00, image: 'https://image.qwenlm.ai/generated-images/43ba31d4-54de-4c5c-842a-aaea2d089bc8/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'egg' },
  { id: 'e2', name: 'Diamond Egg', weapon: 'Egg', rarity: 'classified', price: 65.00, image: 'https://image.qwenlm.ai/generated-images/d14efa26-2bad-4b69-bbbe-b1f37da8677c/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'egg' },
  { id: 'e3', name: 'Ruby Egg', weapon: 'Egg', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/4e9f6071-9145-4fb5-ad69-09aab289925f/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'egg' },
  { id: 'e4', name: 'Emerald Egg', weapon: 'Egg', rarity: 'restricted', price: 25.00, image: 'https://image.qwenlm.ai/generated-images/1981fba3-e46c-43c3-bbd5-ce2d35488d0e/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'egg' },
  { id: 'e5', name: 'Sapphire Egg', weapon: 'Egg', rarity: 'restricted', price: 22.00, image: 'https://image.qwenlm.ai/generated-images/7482d1f1-a67b-4fa4-9e07-72ab198cd112/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'egg' },
  { id: 'e6', name: 'Amethyst Egg', weapon: 'Egg', rarity: 'milspec', price: 8.00, image: 'https://image.qwenlm.ai/generated-images/d86414b5-e784-4b1e-925b-62fc59dde3b3/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'egg' },
  { id: 'e7', name: 'Opal Egg', weapon: 'Egg', rarity: 'milspec', price: 6.50, image: 'https://image.qwenlm.ai/generated-images/3e1fe0ea-884c-446a-a83b-251bb260e4e5/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'egg' },
  { id: 'e8', name: 'Pearl Egg', weapon: 'Egg', rarity: 'restricted', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/fc311b02-24eb-4eea-851c-0fcd3f0f4c69/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'egg' },
  { id: 'e9', name: 'Obsidian Egg', weapon: 'Egg', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/0ea2a967-32e2-46ef-9752-7a9d0b1da4ad/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'egg' },
  { id: 'e10', name: 'Mystic Egg', weapon: 'Egg', rarity: 'covert', price: 120.00, image: 'https://image.qwenlm.ai/generated-images/3c8c5fcc-79a0-4aba-b127-b2b8fb5af89f/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'egg' },

  // === 100 NEW WEAPONS ===
  { id: 'w1', name: 'Emerald', weapon: 'AK-47', rarity: 'restricted', price: 15.00, image: 'https://image.qwenlm.ai/generated-images/b61da204-ebc7-4aa5-a917-cd2467cc6b22/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w2', name: 'Black Laminate', weapon: 'AK-47', rarity: 'classified', price: 45.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w3', name: 'Case Hardened', weapon: 'AK-47', rarity: 'restricted', price: 120.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w4', name: 'Frontside Misty', weapon: 'AK-47', rarity: 'covert', price: 95.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w5', name: 'Bloodsport', weapon: 'AK-47', rarity: 'classified', price: 65.00, image: 'https://image.qwenlm.ai/generated-images/1c3236f6-a56a-44e5-addf-1843f865afce/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w6', name: 'Neon Revolution', weapon: 'AK-47', rarity: 'covert', price: 85.00, image: 'https://image.qwenlm.ai/generated-images/a62bc96c-21f1-45f9-b636-7c74c5a80e62/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w7', name: 'The Empress', weapon: 'AK-47', rarity: 'covert', price: 110.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w8', name: 'Bloodsport Phantom', weapon: 'AK-47', rarity: 'classified', price: 72.00, image: 'https://image.qwenlm.ai/generated-images/1c3236f6-a56a-44e5-addf-1843f865afce/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w9', name: 'Asiimov', weapon: 'AK-47', rarity: 'covert', price: 135.00, image: 'https://image.qwenlm.ai/generated-images/8f2be26f-549f-40c6-b0f8-efa741a2cd11/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w10', name: 'Uncharted', weapon: 'AK-47', rarity: 'restricted', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w11', name: 'Medusa', weapon: 'AWP', rarity: 'covert', price: 450.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w12', name: 'Gungnir', weapon: 'AWP', rarity: 'covert', price: 520.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w13', name: 'Wildfire', weapon: 'AWP', rarity: 'covert', price: 180.00, image: 'https://image.qwenlm.ai/generated-images/da440839-d467-427b-bd5e-86506ffc5e41/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w14', name: 'Desert Hydra', weapon: 'AWP', rarity: 'classified', price: 88.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w15', name: 'The Prince', weapon: 'AWP', rarity: 'covert', price: 250.00, image: 'https://image.qwenlm.ai/generated-images/5e6cea5f-d609-4386-9034-a5f369e1b220/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w16', name: 'Lightning Strike', weapon: 'AWP', rarity: 'covert', price: 320.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w17', name: 'Neo-Noir', weapon: 'AWP', rarity: 'covert', price: 185.00, image: 'https://image.qwenlm.ai/generated-images/3f297725-404a-42b2-bd68-72f7445ea82b/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w18', name: 'Containment Breach', weapon: 'AWP', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w19', name: 'Ather', weapon: 'AWP', rarity: 'restricted', price: 22.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w20', name: 'Exoskeleton', weapon: 'AWP', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w21', name: 'Howl', weapon: 'M4A4', rarity: 'covert', price: 1200.00, image: 'https://image.qwenlm.ai/generated-images/bb86574f-7a01-4ecc-badf-7fa8d936ba15/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w22', name: 'Desolate Space', weapon: 'M4A4', rarity: 'classified', price: 42.00, image: 'https://image.qwenlm.ai/generated-images/fdf638ae-886a-4a28-a8c1-0d4f790bb3f8/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w23', name: 'The Emperor', weapon: 'M4A4', rarity: 'covert', price: 280.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w24', name: 'Tooth Fairy', weapon: 'M4A4', rarity: 'classified', price: 42.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w25', name: 'Hellfire', weapon: 'M4A4', rarity: 'restricted', price: 13.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w26', name: 'Converter', weapon: 'M4A4', rarity: 'milspec', price: 1.80, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w27', name: 'Buzz Kill', weapon: 'M4A4', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w28', name: 'Dragon King', weapon: 'M4A4', rarity: 'classified', price: 68.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w29', name: 'Poseidon', weapon: 'M4A4', rarity: 'covert', price: 380.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w30', name: 'Evil Daimyo', weapon: 'M4A4', rarity: 'classified', price: 52.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w31', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'classified', price: 75.00, image: 'https://image.qwenlm.ai/generated-images/d9715fb1-3c66-4e4b-beba-51ceb99212dd/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w32', name: 'Hot Rod', weapon: 'M4A1-S', rarity: 'restricted', price: 28.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w33', name: 'Golden Coil', weapon: 'M4A1-S', rarity: 'covert', price: 125.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w34', name: 'Chantico', weapon: 'M4A1-S', rarity: 'covert', price: 95.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w35', name: 'Mecha Industries', weapon: 'M4A1-S', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/beca3ec4-58d1-4bc7-988a-b45f08421131/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w36', name: 'Decimator', weapon: 'M4A1-S', rarity: 'restricted', price: 16.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w37', name: 'Briefing', weapon: 'M4A1-S', rarity: 'classified', price: 58.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w38', name: 'Atomic Alloy', weapon: 'M4A1-S', rarity: 'milspec', price: 2.20, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w39', name: 'Nightmare', weapon: 'M4A1-S', rarity: 'restricted', price: 19.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w40', name: 'Player 2', weapon: 'M4A1-S', rarity: 'covert', price: 155.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w41', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'restricted', price: 450.00, image: '🔥', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w42', name: 'Kumicho Dragon', weapon: 'Desert Eagle', rarity: 'classified', price: 52.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w43', name: 'Code Red', weapon: 'Desert Eagle', rarity: 'covert', price: 140.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w44', name: 'Directive', weapon: 'Desert Eagle', rarity: 'restricted', price: 8.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w45', name: 'Sunset Storm', weapon: 'Desert Eagle', rarity: 'milspec', price: 1.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w46', name: 'Oxide Blaze', weapon: 'Desert Eagle', rarity: 'restricted', price: 9.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w47', name: 'Conspiracy', weapon: 'Desert Eagle', rarity: 'milspec', price: 2.80, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w48', name: 'Heirloom', weapon: 'Desert Eagle', rarity: 'classified', price: 65.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w49', name: 'Printstream', weapon: 'Desert Eagle', rarity: 'covert', price: 180.00, image: 'https://image.qwenlm.ai/generated-images/30fbafaf-81e5-42f4-a654-f4f11d21c15f/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w50', name: 'Mecha Industries', weapon: 'Desert Eagle', rarity: 'restricted', price: 12.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w51', name: 'Asiimov', weapon: 'P250', rarity: 'classified', price: 45.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w52', name: 'Undertow', weapon: 'P250', rarity: 'covert', price: 110.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w53', name: 'Franklin', weapon: 'P250', rarity: 'restricted', price: 7.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w54', name: 'Modern Hunter', weapon: 'P250', rarity: 'milspec', price: 1.20, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w55', name: 'Muertos', weapon: 'P250', rarity: 'restricted', price: 8.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w56', name: 'Nuclear Threat', weapon: 'P250', rarity: 'classified', price: 38.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w57', name: 'Red Rock', weapon: 'P250', rarity: 'milspec', price: 2.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w58', name: 'Contamination', weapon: 'P250', rarity: 'restricted', price: 6.50, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w59', name: 'Visions', weapon: 'P250', rarity: 'classified', price: 42.00, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w60', name: 'Iron Clad', weapon: 'P250', rarity: 'milspec', price: 1.80, image: 'https://image.qwenlm.ai/generated-images/c686efcc-51f1-45b9-8b51-66200caa39b2/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w61', name: 'Hyper Beast', weapon: 'USP-S', rarity: 'classified', price: 68.00, image: 'https://image.qwenlm.ai/generated-images/d9715fb1-3c66-4e4b-beba-51ceb99212dd/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w62', name: 'Kill Confirmed', weapon: 'USP-S', rarity: 'covert', price: 95.00, image: 'https://image.qwenlm.ai/generated-images/17d98a95-351e-4843-9243-3232348a2d84/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w63', name: 'Neo-Noir', weapon: 'USP-S', rarity: 'covert', price: 85.00, image: 'https://image.qwenlm.ai/generated-images/3f297725-404a-42b2-bd68-72f7445ea82b/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w64', name: 'Cortex', weapon: 'USP-S', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w65', name: 'Orion', weapon: 'USP-S', rarity: 'restricted', price: 22.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w66', name: 'Road Rash', weapon: 'USP-S', rarity: 'restricted', price: 15.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w67', name: 'Black Lotus', weapon: 'USP-S', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w68', name: 'Ticket to Hell', weapon: 'USP-S', rarity: 'restricted', price: 12.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w69', name: 'Printstream', weapon: 'USP-S', rarity: 'covert', price: 145.00, image: 'https://image.qwenlm.ai/generated-images/30fbafaf-81e5-42f4-a654-f4f11d21c15f/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w70', name: 'Flashback', weapon: 'USP-S', rarity: 'milspec', price: 3.50, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w71', name: 'Fade', weapon: 'Glock-18', rarity: 'restricted', price: 350.00, image: 'https://image.qwenlm.ai/generated-images/0a307881-2da0-408e-b5b6-ae6260b02c46/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w72', name: 'Water Elemental', weapon: 'Glock-18', rarity: 'restricted', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w73', name: 'Wasteland Rebel', weapon: 'Glock-18', rarity: 'classified', price: 65.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w74', name: 'Twilight Galaxy', weapon: 'Glock-18', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w75', name: 'Weasel', weapon: 'Glock-18', rarity: 'covert', price: 120.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w76', name: 'Off World', weapon: 'Glock-18', rarity: 'milspec', price: 2.20, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w77', name: 'Bullet Queen', weapon: 'Glock-18', rarity: 'covert', price: 95.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w78', name: 'Moonrise', weapon: 'Glock-18', rarity: 'restricted', price: 12.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w79', name: 'Ironwork', weapon: 'Glock-18', rarity: 'restricted', price: 8.50, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w80', name: 'Nuclear Garden', weapon: 'Glock-18', rarity: 'milspec', price: 1.80, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#4b69ff', gradient: 'from-blue-500 to-indigo-700', type: 'weapon' },
  { id: 'w81', name: 'Dragon Lore', weapon: 'AWP', rarity: 'covert', price: 1500.00, image: 'https://image.qwenlm.ai/generated-images/8d97ee8d-c9d7-4b15-85a6-74e753f3886a/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w82', name: 'Fire Serpent', weapon: 'AK-47', rarity: 'covert', price: 650.00, image: 'https://image.qwenlm.ai/generated-images/b593ed89-7e32-4d25-9eef-ddc4465289f9/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w83', name: 'Crimson Web', weapon: 'M9 Bayonet', rarity: 'covert', price: 950.00, image: 'https://image.qwenlm.ai/generated-images/c4eb80ed-9da5-4aa7-a199-27308260f9d9/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w84', name: 'Doppler', weapon: 'Butterfly Knife', rarity: 'covert', price: 1800.00, image: 'https://image.qwenlm.ai/generated-images/ba71cb9c-37af-4214-8146-5f334edbd8e5/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w85', name: 'Fade', weapon: 'Karambit', rarity: 'covert', price: 1200.00, image: 'https://image.qwenlm.ai/generated-images/b56a0566-8674-4850-b2ae-537feb247b37/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w86', name: 'Tiger Tooth', weapon: 'Karambit', rarity: 'covert', price: 750.00, image: 'https://image.qwenlm.ai/generated-images/275ba825-e5a0-4565-a925-b9f176c2ff57/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w87', name: 'Marble Fade', weapon: 'Butterfly Knife', rarity: 'covert', price: 1100.00, image: 'https://image.qwenlm.ai/generated-images/b56a0566-8674-4850-b2ae-537feb247b37/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w88', name: 'Slaughter', weapon: 'M9 Bayonet', rarity: 'covert', price: 680.00, image: 'https://image.qwenlm.ai/generated-images/b56a0566-8674-4850-b2ae-537feb247b37/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w89', name: 'Lore', weapon: 'Karambit', rarity: 'covert', price: 920.00, image: 'https://image.qwenlm.ai/generated-images/b56a0566-8674-4850-b2ae-537feb247b37/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w90', name: 'Gamma Doppler', weapon: 'Butterfly Knife', rarity: 'covert', price: 1350.00, image: 'https://image.qwenlm.ai/generated-images/ba71cb9c-37af-4214-8146-5f334edbd8e5/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w91', name: 'Autotronic', weapon: 'AK-47', rarity: 'covert', price: 145.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w92', name: 'Point Disarray', weapon: 'AK-47', rarity: 'covert', price: 125.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w93', name: 'Aquamarine Revenge', weapon: 'AWP', rarity: 'covert', price: 165.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w94', name: 'Hyper Beast', weapon: 'AWP', rarity: 'covert', price: 135.00, image: 'https://image.qwenlm.ai/generated-images/d9715fb1-3c66-4e4b-beba-51ceb99212dd/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w95', name: 'Loudmouth', weapon: 'M4A4', rarity: 'restricted', price: 18.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#8847ff', gradient: 'from-purple-500 to-purple-800', type: 'weapon' },
  { id: 'w96', name: 'Evil Daimyo', weapon: 'M4A4', rarity: 'classified', price: 52.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w97', name: 'Knight', weapon: 'M4A4', rarity: 'covert', price: 280.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w98', name: 'Cyrex', weapon: 'M4A1-S', rarity: 'classified', price: 48.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },
  { id: 'w99', name: 'Master Piece', weapon: 'M4A1-S', rarity: 'covert', price: 110.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#eb4b4b', gradient: 'from-red-500 to-red-900', type: 'weapon' },
  { id: 'w100', name: 'Dark Blossom', weapon: 'M4A1-S', rarity: 'classified', price: 55.00, image: 'https://image.qwenlm.ai/generated-images/01abaf3e-46e2-4853-9937-2f43a0a9c4f1/_result.png', color: '#d32ce6', gradient: 'from-pink-500 to-fuchsia-800', type: 'weapon' },

  // === 50 NEW KNIVES ===
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `knife_${i + 1}`,
    name: ['Fade', 'Doppler', 'Tiger Tooth', 'Marble Fade', 'Crimson Web', 'Slaughter', 'Lore', 'Gamma Doppler', 'Autotronic', 'Black Laminate', 'Bright Water', 'Freehand', 'Aqua Marine', 'Blue Gem', 'Rust', 'Case Hardened', 'Forest DDPAT', 'Boreal Forest', 'Safari Mesh', 'Scorched', 'Stained', 'Vanilla', 'Night', 'Ultraviolet', 'Lemon', 'Emerald', 'Sapphire', 'Ruby', 'Black Pearl', 'Pink DDPAT', 'Purple DDPAT', 'Orange DDPAT', 'Green Gem', 'White Gem', 'Yellow Gem', 'Blue Stone', 'Red Stone', 'Green Stone', 'Purple Stone', 'Orange Stone', 'Pink Stone', 'Gold', 'Silver', 'Bronze', 'Platinum', 'Diamond', 'Obsidian', 'Amethyst', 'Topaz', 'Jade'][i],
    weapon: ['Karambit', 'Butterfly Knife', 'M9 Bayonet', 'Bayonet', 'Flip Knife', 'Gut Knife', 'Huntsman Knife', 'Bowie Knife', 'Falchion Knife', 'Shadow Daggers', 'Dual Berettas', 'Navaja Knife', 'Stiletto Knife', 'Talon Knife', 'Ursus Knife', 'Nomad Knife', 'Skeleton Knife', 'Survival Knife'][i % 18],
    rarity: 'knife' as const,
    price: Math.round((500 + Math.random() * 2000) * 100) / 100,
    image: i === 0 ? 'https://image.qwenlm.ai/generated-images/4fad57de-a77e-4c62-8106-4b71816b0160/_result.png' : 
           i === 1 ? 'https://image.qwenlm.ai/generated-images/6d28bc4d-0547-4709-b9e0-3b2f19699275/_result.png' :
           i === 2 ? 'https://image.qwenlm.ai/generated-images/9d2e17e2-a593-457f-b279-cfae8336d322/_result.png' :
           i === 4 ? 'https://image.qwenlm.ai/generated-images/1ceb24ee-1ecd-478d-bf64-efd9aaac9088/_result.png' : '🔪',
    color: '#e4ae39',
    gradient: 'from-yellow-400 to-amber-700',
    type: 'weapon' as const,
  })),

  // === 100 NEW GLOVES ===
  ...Array.from({ length: 100 }, (_, i) => ({
    id: `glove_${i + 1}`,
    name: ['Fade', 'Crimson Kimono', 'Emerald Web', 'Foundation', 'Cobalt Skulls', 'Leather Wraps', 'Diamondback', 'King Snake', 'Supermarine', 'Pandoras Box', 'Vice', 'Mogul', 'Irish Knockout', 'Jungle Slipstream', 'Blue Gemini', 'Omega', 'Amplified', 'Auto Trainer', 'Charred', 'CS20', 'Emerald', 'Faded Zebra', 'Garrison', 'Guerrilla', 'Hand Wraps', 'Leather', 'Lunar Weave', 'Mint', 'Night Stripe', 'Rezan', 'Slaughter', 'Snakebite', 'Specialist', 'Tiger', 'Violet', 'Water Elemental', 'Wildfire', 'Winter Aggressive', 'Yellowbanded', 'Fade', 'Emerald', 'Crimson', 'Blue', 'Purple', 'Orange', 'Pink', 'Gold', 'Silver', 'Bronze', 'Platinum', 'Diamond', 'Obsidian', 'Amethyst', 'Topaz', 'Jade', 'Ruby', 'Sapphire', 'Black Pearl', 'Pink DDPAT', 'Purple DDPAT', 'Orange DDPAT', 'Green Gem', 'White Gem', 'Yellow Gem', 'Blue Stone', 'Red Stone', 'Green Stone', 'Purple Stone', 'Orange Stone', 'Pink Stone', 'Gold', 'Silver', 'Bronze', 'Platinum', 'Diamond', 'Obsidian', 'Amethyst', 'Topaz', 'Jade', 'Ruby', 'Sapphire', 'Black Pearl', 'Pink DDPAT', 'Purple DDPAT', 'Orange DDPAT', 'Green Gem', 'White Gem', 'Yellow Gem', 'Blue Stone', 'Red Stone', 'Green Stone', 'Purple Stone', 'Orange Stone', 'Pink Stone', 'Gold', 'Silver', 'Bronze', 'Platinum', 'Diamond'][i],
    weapon: 'Gloves',
    rarity: (['restricted', 'classified', 'covert', 'contraband'] as const)[i % 4],
    price: Math.round((100 + Math.random() * 1500) * 100) / 100,
    image: i === 0 ? 'https://image.qwenlm.ai/generated-images/91300ab4-db66-4137-95ce-5e07d4e8a15c/_result.png' : 
           i === 9 ? 'https://image.qwenlm.ai/generated-images/f84c950a-fc25-4bbc-bfa2-824f954a2d00/_result.png' :
           i === 7 ? 'https://image.qwenlm.ai/generated-images/37cf5d95-ccc1-442b-af6f-00d1509e37ea/_result.png' : '🧤',
    color: ['#8847ff', '#d32ce6', '#eb4b4b', '#e4ae39'][i % 4],
    gradient: ['from-purple-500 to-purple-800', 'from-pink-500 to-fuchsia-800', 'from-red-500 to-red-900', 'from-yellow-400 to-amber-700'][i % 4],
    type: 'glove' as const,
  })),

  // === 50 NEW AGENTS ===
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `agent_new_${i + 1}`,
    name: ['Sir Bloody Miami Darryl', 'SafeCracker Voltzmann', 'Little Kev', 'Number K', 'Getaway Sally', 'Bloody Darryl The Strapped', 'Two Times McCoy', 'Rezan The Ready', 'Cmdr. Mae Dead Cool', 'Operator', 'Markus Delrow', 'Michael Syfers', 'B Squadron Officer', '3rd Commando Company', 'Seal Team 6 Soldier', 'Buckshot', 'Lt. Commander Ricksaw', 'Dragomir', 'Maximus', 'Rezan The Redshirt', 'The Elite Mr. Muhlik', 'Trapper Aggressor', 'Trapper', 'Commandor Mae', 'Ground Rebel', 'Blockout', 'Sir Bloody Silent Darryl', 'Sir Bloody Darryl Royale', 'Sir Bloody Miami Darryl', 'Safecracker Voltzmann', 'Little Kev', 'Number K', 'Getaway Sally', 'Bloody Darryl', 'Two Times McCoy', 'Rezan The Ready', 'Cmdr. Mae', 'Operator', 'Markus Delrow', 'Michael Syfers', 'B Squadron', '3rd Commando', 'Seal Team 6', 'Buckshot', 'Lt. Commander', 'Dragomir', 'Maximus', 'Rezan', 'The Elite', 'Trapper'][i],
    weapon: 'Agent',
    rarity: (['restricted', 'classified', 'covert'] as const)[i % 3],
    price: Math.round((15 + Math.random() * 100) * 100) / 100,
    image: i === 0 ? 'https://image.qwenlm.ai/generated-images/96295edc-f1db-44d2-8ccf-1080b7c1c0da/_result.png' : 
           i === 1 ? 'https://image.qwenlm.ai/generated-images/3675dd9e-1b55-44f6-b623-ac3f0e27f0cb/_result.png' :
           i === 2 ? 'https://image.qwenlm.ai/generated-images/7a5d1129-7b08-48ae-b1e4-c84f89720a75/_result.png' : '🕵️',
    color: ['#8847ff', '#d32ce6', '#eb4b4b'][i % 3],
    gradient: ['from-purple-500 to-purple-800', 'from-pink-500 to-fuchsia-800', 'from-red-500 to-red-900'][i % 3],
    type: 'agent' as const,
  })),

  // === MYMILTON SIGNATURE ===
  { id: 'sig_mymilton', name: 'mymilton', weapon: 'Signature', rarity: 'contraband', price: 152999.00, image: '✍️', color: '#e4ae39', gradient: 'from-yellow-400 to-amber-700', type: 'signature' },

  // === RARE SPECIAL ITEM (triggers knife/glove roll) ===
  { id: 'rare_special_item', name: 'Rare Special Item', weapon: '★', rarity: 'rare_special', price: 0, image: '⭐', color: '#e4ae39', gradient: 'from-yellow-400 to-amber-700', type: 'rare_special' },
];

export function getSkinsByRarity(rarity: Rarity): Skin[] {
  return allSkins.filter(s => s.rarity === rarity);
}

export function getRandomSkin(weights?: Partial<Record<Rarity, number>>): Skin {
  const defaultWeights: Record<Rarity, number> = {
    consumer: 30,
    industrial: 25,
    milspec: 25,
    restricted: 12,
    classified: 5,
    covert: 2.5,
    contraband: 0.1,
    knife: 0,
    rare_special: 0.5,
  };
  
  const w = { ...defaultWeights, ...weights };
  const totalWeight = Object.values(w).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const [rarity, weight] of Object.entries(w)) {
    random -= weight;
    if (random <= 0) {
      const skins = getSkinsByRarity(rarity as Rarity);
      return skins[Math.floor(Math.random() * skins.length)];
    }
  }
  
  return allSkins[0];
}

export function getRandomSkinFromList(skinList: Skin[], weights?: Partial<Record<Rarity, number>>, caseId?: string): Skin {
  if (skinList.length === 0) return allSkins[0];
  
  // Check for custom odds from localStorage
  let customWeights: Partial<Record<Rarity, number>> | undefined = weights;
  if (caseId) {
    try {
      const customOddsData = localStorage.getItem('caser_drop_custom_odds');
      if (customOddsData) {
        const customOdds = JSON.parse(customOddsData);
        if (customOdds[caseId]) {
          customWeights = customOdds[caseId];
        }
      }
    } catch (e) {
      // Ignore errors, use default weights
    }
  }
  
  const defaultWeights: Record<Rarity, number> = {
    consumer: 30,
    industrial: 25,
    milspec: 25,
    restricted: 12,
    classified: 5,
    covert: 2.5,
    contraband: 0.1,
    knife: 0,
    rare_special: 0.5,
  };
  
  const w = { ...defaultWeights, ...customWeights };
  
  // Group skins by rarity
  const skinsByRarity: Record<string, Skin[]> = {};
  for (const skin of skinList) {
    if (!skinsByRarity[skin.rarity]) {
      skinsByRarity[skin.rarity] = [];
    }
    skinsByRarity[skin.rarity].push(skin);
  }
  
  // Calculate total weight only for rarities that exist in the list
  let totalWeight = 0;
  for (const [rarity, weight] of Object.entries(w)) {
    if (skinsByRarity[rarity] && skinsByRarity[rarity].length > 0) {
      totalWeight += weight;
    }
  }
  
  // If no valid rarities, return random skin from list
  if (totalWeight === 0) {
    return skinList[Math.floor(Math.random() * skinList.length)];
  }
  
  let random = Math.random() * totalWeight;
  
  for (const [rarity, weight] of Object.entries(w)) {
    if (skinsByRarity[rarity] && skinsByRarity[rarity].length > 0) {
      random -= weight;
      if (random <= 0) {
        const skins = skinsByRarity[rarity];
        return skins[Math.floor(Math.random() * skins.length)];
      }
    }
  }
  
  // Fallback
  return skinList[Math.floor(Math.random() * skinList.length)];
}
