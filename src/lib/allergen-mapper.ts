// Map of header text to allergen key (including variations in different languages)
const ALLERGEN_HEADERS: Record<string, string> = {
  // Gluten
  'gluten': 'gluten-free',
  'wheat': 'gluten-free',
  'barley': 'gluten-free',
  'rye': 'gluten-free',
  'gluten-free': 'gluten-free',
  'glutenfree': 'gluten-free',
  'グルテン': 'gluten-free',
  '小麦': 'gluten-free',
  '大麦': 'gluten-free',
  'ライ麦': 'gluten-free',
  
  // Dairy
  'dairy': 'dairy-free',
  'milk': 'dairy-free',  // Standard mapping for milk to dairy-free
  'cream': 'dairy-free',
  'butter': 'dairy-free',
  'cheese': 'dairy-free',
  'yogurt': 'dairy-free',
  'yoghurt': 'dairy-free',
  'dairy-free': 'dairy-free',
  'dairyfree': 'dairy-free',
  'デイリーフリー': 'dairy-free',
  '乳製品': 'dairy-free',
  '牛乳': 'dairy-free',  // Japanese for milk
  'バター': 'dairy-free',
  'チーズ': 'dairy-free',
  'ヨーグルト': 'dairy-free',
  
  // Egg
  'egg': 'egg',
  'eggs': 'egg',
  'egg-free': 'egg',
  '卵': 'egg',
  'たまご': 'egg',
  '玉子': 'egg',
  
  // Peanut
  'peanut': 'peanut',
  'peanuts': 'peanut',
  'groundnut': 'peanut',
  'groundnuts': 'peanut',
  'peanut-free': 'peanut',
  'peanut butter': 'peanut',
  'p-nut': 'peanut',
  'pnut': 'peanut',
  'peanot': 'peanut',
  'peanutt': 'peanut',
  'ピーナッツ': 'peanut',
  '落花生': 'peanut',
  'らっかせい': 'peanut',
  
  // Soy
  'soy': 'soybean',
  'soya': 'soybean',
  'soybean': 'soybean',
  'soybeans': 'soybean',
  'soy-free': 'soybean',
  '大豆': 'soybean',
  'だいず': 'soybean',
  
  // Fish
  'fish': 'fish',
  'seafood': 'fish',
  'fish-free': 'fish',
  '魚': 'fish',
  'さかな': 'fish',
  '魚介類': 'fish',
  
  // Shellfish
  'shellfish': 'shellfish',
  'crustacean': 'shellfish',
  'crustaceans': 'shellfish',
  'shellfish-free': 'shellfish',
  '甲殻類': 'shellfish',
  'エビ': 'shellfish',
  'カニ': 'shellfish',
  'えび': 'shellfish',
  'かに': 'shellfish',
  
  // Nuts
  'nuts': 'nuts',
  'nut': 'nuts',
  'tree nut': 'nuts',
  'tree nuts': 'nuts',
  'treenut': 'nuts',
  'nut-free': 'nuts',
  'ナッツ': 'nuts',
  '木の実': 'nuts',
  'くるみ': 'nuts',
  'クルミ': 'nuts',
  'アーモンド': 'nuts',
  'カシューナッツ': 'nuts',
  'マカダミアナッツ': 'nuts',
  'ヘーゼルナッツ': 'nuts',
  'ピスタチオ': 'nuts',
  'ペカン': 'nuts',
  
  // Sesame
  'sesame': 'sesame-seeds',
  'sesame seeds': 'sesame-seeds',
  'sesame-seed': 'sesame-seeds',
  'sesameseed': 'sesame-seeds',
  'sesame seed': 'sesame-seeds',
  'sesame-free': 'sesame-seeds',
  'ごま': 'sesame-seeds',
  'ゴマ': 'sesame-seeds',
  '胡麻': 'sesame-seeds',
  
  // Mustard
  'mustard': 'mustard',
  'mustard seed': 'mustard',
  'mustard-free': 'mustard',
  'からし': 'mustard',
  'カラシ': 'mustard',
  'マスタード': 'mustard',
  
  // Celery
  'celery': 'celery',
  'celeriac': 'celery',
  'celery-free': 'celery',
  'セロリ': 'celery',
  
  // Lupin
  'lupin': 'lupin',
  'lupine': 'lupin',
  'lupins': 'lupin',
  'lupin-free': 'lupin',
  'ルピナス': 'lupin',
  
  // Mollusks
  'mollusks': 'mollusks',
  'mollusc': 'mollusks',
  'molluscs': 'mollusks',
  'mollusk-free': 'mollusks',
  '軟体動物': 'mollusks',
  'イカ': 'mollusks',
  'タコ': 'mollusks',
  '貝類': 'mollusks',
  'ホタテ': 'mollusks',
  'アサリ': 'mollusks',
  'いか': 'mollusks',
  'たこ': 'mollusks',
  'ほたて': 'mollusks',
  'あさり': 'mollusks',
  
  // Sulfites
  'sulfites': 'sulfites',
  'sulphites': 'sulfites',
  'sulfite': 'sulfites',
  'sulphite': 'sulfites',
  'sulfite-free': 'sulfites',
  '亜硫酸塩': 'sulfites',
  
  // Alcohol
  'alcohol': 'alcohol-free',
  'alcohol-free': 'alcohol-free',
  'alcohol free': 'alcohol-free',
  'alcoholfree': 'alcohol-free',
  'アルコール': 'alcohol-free',
  '酒': 'alcohol-free',
  'さけ': 'alcohol-free',
  '日本酒': 'alcohol-free',
  'ビール': 'alcohol-free',
  'ワイン': 'alcohol-free',
  
  // Pork
  'pork': 'pork-free',
  'pork-free': 'pork-free',
  'pork free': 'pork-free',
  'porkfree': 'pork-free',
  '豚肉': 'pork-free',
  'ポーク': 'pork-free',
  'ぶたにく': 'pork-free',
  
  // Soba/Buckwheat
  'soba': 'soba',
  'buckwheat': 'soba',
  'soba-free': 'soba',
  'soba noodle': 'soba',
  'そば': 'soba',
  '蕎麦': 'soba',
  'そば粉': 'soba',
  '蕎麦粉': 'soba',
  
  // Cereals
  'cereals': 'cereals',
  'cereal': 'cereals',
  'grain': 'cereals',
  'cereals-free': 'cereals',
  '穀物': 'cereals',
  'こくもつ': 'cereals',
  
  // Vegan/Vegetarian
  'vegan': 'vegan',
  'vegetarian': 'vegetarian',
  'ヴィーガン': 'vegan',
  'ビーガン': 'vegan',
  'ベジタリアン': 'vegetarian',
  'veggie': 'vegetarian',
  'vegetable': 'vegetarian',
  
  // Other common ingredients (milk is already mapped to dairy-free above)
  'milk-free': 'dairy-free',  // Map milk-free to dairy-free for consistency
  'milk product': 'dairy-free',  // Map milk products to dairy-free
  'dairy product': 'dairy-free',
  'shell fish': 'shellfish',
  'peanutbutter': 'peanut',  // Keep only one definition of peanutbutter
  'peanute': 'peanut',
  'peanutes': 'peanut',
  'peanuty': 'peanut'
};

// Additional synonyms that might appear in text
const ALLERGEN_SYNONYMS: Record<string, string[]> = {
  'gluten-free': ['gluten', 'wheat', 'barley', 'rye', '麦', '大麦', 'ライ麦'],
  'dairy-free': ['dairy', 'milk', 'cream', 'butter', 'cheese', 'yogurt', 'yoghurt', '乳製品', '牛乳', 'バター', 'チーズ', 'ヨーグルト'],
  'egg': ['egg', 'eggs', '卵', 'たまご', '玉子'],
  'peanut': ['peanut', 'peanuts', 'groundnut', 'groundnuts', 'ピーナッツ', '落花生'],
  'soybean': ['soy', 'soya', 'soybean', 'soybeans', 'soy bean', 'soy beans', '大豆', '枝豆'],
  'fish': ['fish', 'seafood', 'salmon', 'tuna', 'mackerel', 'sardine', 'sashimi', 'sushi', '魚', 'さかな', 'サケ', 'マグロ', 'サバ', 'イワシ', '刺身', '寿司'],
  'shellfish': ['shellfish', 'shrimp', 'prawn', 'crab', 'lobster', 'crayfish', 'エビ', 'カニ', 'ロブスター', 'ザリガニ', '甲殻類'],
  'nuts': ['nut', 'nuts', 'almond', 'almonds', 'cashew', 'cashews', 'pistachio', 'pistachios', 'hazelnut', 'hazelnuts', 'walnut', 'walnuts', 'pecan', 'pecans', 'macadamia', 'macadamias', 'brazil nut', 'brazil nuts', 'ナッツ', 'アーモンド', 'カシューナッツ', 'ピスタチオ', 'ヘーゼルナッツ', 'クルミ', 'ペカン', 'マカダミア', 'ブラジルナッツ'],
  'sesame-seeds': ['sesame', 'sesame seed', 'sesame seeds', 'sesame-seed', 'sesame-seeds', 'sesameseed', 'sesameseeds', 'ごま', 'ゴマ', '胡麻'],
  'mustard': ['mustard', 'からし', 'カラシ', 'マスタード'],
  'celery': ['celery', 'セロリ', 'セロリー'],
  'lupin': ['lupin', 'lupine', 'lupins', 'lupines', 'ルピナス', '羽扇豆'],
  'mollusks': ['mollusk', 'mollusks', 'mollusc', 'molluscs', 'squid', 'octopus', 'clam', 'clams', 'scallop', 'scallops', 'oyster', 'oysters', 'mussel', 'mussels', 'イカ', 'タコ', 'ホタテ', 'アサリ', 'ムール貝', 'カキ', '貝類', '軟体動物'],
  'sulfites': ['sulfite', 'sulfites', 'sulphite', 'sulphites', 'e220', 'e221', 'e222', 'e223', 'e224', 'e225', 'e226', 'e227', 'e228', '亜硫酸塩', '酸化防止剤'],
  'alcohol-free': ['alcohol', 'alcoholic', 'beer', 'wine', 'sake', 'saki', 'liquor', 'spirit', 'spirits', 'アルコール', 'お酒', 'ビール', 'ワイン', '日本酒', '酒', '焼酎', 'ウイスキー'],
  'pork-free': ['pork', 'bacon', 'ham', 'sausage', 'sausages', 'salami', 'pepperoni', '豚肉', 'ポーク', 'ベーコン', 'ハム', 'ソーセージ', 'サラミ', 'ペパロニ'],
  'soba': ['soba', 'buckwheat', 'そば', '蕎麦', 'ソバ'],
  'cereals': ['cereal', 'cereals', 'grain', 'grains', 'wheat', 'barley', 'rye', 'oats', 'rice', 'corn', 'maize', 'millet', 'sorghum', '穀物', '穀類', '小麦', '大麦', 'ライ麦', 'オーツ', '米', 'トウモロコシ', 'キビ', 'ソルガム'],
  'vegan': ['vegan', 'plant-based', 'plant based', '植物性', 'ビーガン'],
  'vegetarian': ['vegetarian', 'veggie', 'vegetable', 'ベジタリアン', 'ベジ'],
  'milk': ['milk', 'dairy', 'cream', 'butter', 'cheese', 'yogurt', 'yoghurt', '牛乳', 'ミルク', 'クリーム', 'バター', 'チーズ', 'ヨーグルト']
};

/**
 * Extracts headers and data rows from the parsed Excel data
 * @param rows 2D array from the Excel file
 * @returns Object containing headers and data rows
 */
function extractExcelData(rows: any[][]): { headers: string[]; dataRows: any[][] } {
  if (!rows || !rows.length) return { headers: [], dataRows: [] };
  
  // First row is always headers
  const headers = rows[0].map(header => String(header || '').trim());
  
  // All subsequent rows are data rows
  const dataRows = rows.slice(1);
  
  return { headers, dataRows };
}

/**
 * Checks if a row contains any allergen marks
 * @param row The row to check
 * @returns boolean indicating if the row contains any marks
 */
function hasAllergenMarks(row: any[]): boolean {
  if (!row || !row.length) return false;
  
  // Skip first column (food name) and check remaining columns for checkmark
  return row.slice(1).some(cell => {
    const strValue = String(cell || '').trim();
    return strValue === '✓' || strValue.toLowerCase() === 'x';
  });
}

interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  allergens: string[];
  markCount: number;
}

/**
 * Extracts food items with their allergens from the Excel data
 * @param rows 2D array from the Excel file
 * @returns Array of MenuItem objects
 */
export function extractFoodItems(rows: any[][]): MenuItem[] {
  const { headers, dataRows } = extractExcelData(rows);
  const result: MenuItem[] = [];
  
  // Process each row
  dataRows.forEach((row, rowIndex) => {
    // Only process rows with checkmarks
    if (!hasAllergenMarks(row)) return;
    
    // Get food name (first column)
    const foodName = String(row[0] || '').trim();
    if (!foodName) return;
    
    const allergens: string[] = [];
    
    // Check each column after the first one
    for (let i = 1; i < Math.min(row.length, headers.length); i++) {
      const cellValue = String(row[i] || '').trim();
      if (cellValue === '✓' || cellValue.toLowerCase() === 'x') {
        const allergenName = headers[i]?.trim() || '';
        if (allergenName) {
          // Map the header to our internal allergen key if possible
          const allergenKey = Object.entries(ALLERGEN_HEADERS).find(
            ([key]) => allergenName.toLowerCase().includes(key.toLowerCase())
          )?.[1] || allergenName;
          
          if (!allergens.includes(allergenKey)) {
            allergens.push(allergenKey);
          }
        }
      }
    }
    
    // Extract Japanese name if present (text in Japanese characters)
    const japaneseRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u3400-\u4dbf]+/g;
    const japaneseMatches = foodName.match(japaneseRegex) || [];
    const japaneseName = japaneseMatches.join(' ').trim();
    const englishName = foodName.replace(japaneseRegex, '').replace(/[\s:;,-]+$/, '').trim();
    
    result.push({
      id: `item-${rowIndex}`,
      name: englishName || japaneseName || `Item ${rowIndex + 1}`,
      japaneseName: englishName && japaneseName ? japaneseName : '',
      allergens,
      markCount: allergens.length
    });
  });
  
  return result;
}

/**
 * Counts the number of marks in a row
 * @param row The row to count marks in
 * @returns Number of marks found
 */
export function countMarksInRow(row: any[]): number {
  if (!row || !row.length) return 0;
  
  // Skip first column (food name) and count marks in the rest
  return row.slice(1).reduce((count, cell) => {
    const strValue = String(cell || '').trim();
    return count + (strValue === '✓' || strValue.toLowerCase() === 'x' ? 1 : 0);
  }, 0);
}

/**
 * Extracts allergens from a data row (for backward compatibility)
 */
export function extractAllergensFromRow(row: any[], headers: string[]): string[] {
  const allergens: string[] = [];
  
  for (let i = 1; i < Math.min(row.length, headers.length); i++) {
    const cellValue = String(row[i] || '').trim();
    if (cellValue === '✓' || cellValue.toLowerCase() === 'x') {
      const allergenName = headers[i]?.trim() || '';
      if (allergenName) {
        const allergenKey = Object.entries(ALLERGEN_HEADERS).find(
          ([key]) => allergenName.toLowerCase().includes(key.toLowerCase())
        )?.[1] || allergenName;
        
        if (!allergens.includes(allergenKey)) {
          allergens.push(allergenKey);
        }
      }
    }
  }
  
  return allergens;
}



/**
 * Gets the count of detected allergens that don't have corresponding icons
 * @param detectedAllergens Array of detected allergen keys
 * @param availableIcons Set of available icon names
 * @returns Number of allergens without icons
 */
export function countMissingIcons(detectedAllergens: string[], availableIcons: Set<string>): number {
  return detectedAllergens.filter(a => !availableIcons.has(a)).length;
}
