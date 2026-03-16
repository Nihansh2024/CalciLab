// Commercial Preparation SOPs and Flowcharts for Food Items
// Standard Operating Procedures for commercial food preparation

export interface SOPStep {
  step: number
  title: string
  description: string
  duration?: string
  temperature?: string
  equipment?: string[]
  criticalPoints?: string[]
  safetyNotes?: string[]
}

export interface FlowchartNode {
  id: string
  type: 'start' | 'process' | 'decision' | 'quality' | 'storage' | 'end'
  label: string
  description?: string
  nextSteps?: string[]
  branch?: {
    condition: string
    trueStep: string
    falseStep: string
  }
}

export interface CommercialSOP {
  title: string
  purpose: string
  scope: string
  responsibility: string[]
  materials: string[]
  equipment: string[]
  steps: SOPStep[]
  qualityControl: {
    checkpoints: string[]
    standards: string[]
    correctiveActions: string[]
  }
  storage: {
    temperature: string
    humidity?: string
    shelfLife: string
    packaging: string
  }
  safety: {
    hazards: string[]
    precautions: string[]
    ppe: string[]
  }
  flowchart: FlowchartNode[]
}

// Generate SOP based on food category and properties
export function generateSOP(foodId: string, foodName: string, category: string): CommercialSOP {
  const categorySOPs: Record<string, () => CommercialSOP> = {
    fruits: () => generateFruitSOP(foodName),
    vegetables: () => generateVegetableSOP(foodName),
    cereals: () => generateCerealSOP(foodName),
    pulses: () => generatePulseSOP(foodName),
    dairy: () => generateDairySOP(foodName),
    nuts: () => generateNutSOP(foodName),
    vegetarian: () => generateVegetarianSOP(foodName),
    nonveg: () => generateNonVegSOP(foodName),
    fastfood: () => generateFastFoodSOP(foodName),
    beverages: () => generateBeverageSOP(foodName),
    snacks: () => generateSnackSOP(foodName),
    other: () => generateOtherSOP(foodName),
  }

  const generator = categorySOPs[category] || categorySOPs.other
  return generator()
}

// Fruit SOP
function generateFruitSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Processing SOP`,
    purpose: `To establish standardized procedures for the selection, cleaning, preparation, and storage of ${foodName} in commercial food service operations.`,
    scope: 'Applicable to all kitchen staff, food handlers, and quality control personnel involved in fruit preparation.',
    responsibility: ['Kitchen Supervisor', 'Food Preparation Staff', 'Quality Control Officer', 'Store Manager'],
    materials: [
      `Fresh ${foodName}`,
      'Potable water',
      'Food-grade sanitizing solution',
      'Clean cutting boards',
      'Food-grade storage containers',
      'Labels and date markers',
    ],
    equipment: [
      'Commercial sinks with dual compartments',
      'Stainless steel preparation tables',
      'Sharp knives and peelers',
      'Refrigeration units (0-5°C)',
      'Food thermometers',
      'Colanders and drying racks',
    ],
    steps: [
      {
        step: 1,
        title: 'Receiving and Inspection',
        description: `Inspect incoming ${foodName} for quality, freshness, and absence of defects. Check for proper temperature during delivery.`,
        duration: '15-30 minutes',
        equipment: ['Inspection table', 'Thermometer'],
        criticalPoints: ['Reject damaged or overripe fruits', 'Verify supplier documentation', 'Check for pest contamination'],
        safetyNotes: ['Wear gloves during inspection', 'Report any quality issues immediately'],
      },
      {
        step: 2,
        title: 'Storage Before Processing',
        description: `Store ${foodName} at appropriate temperature in designated storage area until processing.`,
        duration: 'Variable',
        temperature: '2-5°C for most fruits, 10-13°C for tropical fruits',
        equipment: ['Refrigeration unit', 'Storage bins'],
        criticalPoints: ['Maintain FIFO (First In, First Out)', 'Separate from raw proteins', 'Monitor temperature continuously'],
      },
      {
        step: 3,
        title: 'Preparation and Cleaning',
        description: `Wash hands thoroughly. Rinse ${foodName} under running potable water. Remove any visible dirt or debris.`,
        duration: '5-10 minutes per batch',
        equipment: ['Handwashing station', 'Commercial sink', 'Vegetable brush'],
        criticalPoints: ['Use potable water only', 'Sanitize all surfaces before preparation', 'Remove damaged portions'],
        safetyNotes: ['Wash hands for at least 20 seconds', 'Use dedicated cutting boards for fruits'],
      },
      {
        step: 4,
        title: 'Peeling and Cutting',
        description: `Using sanitized equipment, peel (if required) and cut ${foodName} according to recipe specifications.`,
        duration: '10-20 minutes per batch',
        equipment: ['Sharp knives', 'Peelers', 'Cutting boards', 'Mandoline (if applicable)'],
        criticalPoints: ['Maintain consistent cut sizes', 'Work quickly to minimize oxidation', 'Sanitize equipment between batches'],
        safetyNotes: ['Use cut-resistant gloves', 'Keep knives sharp to reduce accidents', 'Follow proper knife handling techniques'],
      },
      {
        step: 5,
        title: 'Quality Check',
        description: 'Inspect prepared fruit for consistency, freshness, and absence of defects.',
        duration: '5 minutes',
        equipment: ['Inspection table', 'Quality checklist'],
        criticalPoints: ['Check color, texture, and aroma', 'Remove any substandard pieces', 'Document quality scores'],
      },
      {
        step: 6,
        title: 'Portioning and Packaging',
        description: `Portion prepared ${foodName} according to recipe requirements and package in food-grade containers.`,
        duration: '5-15 minutes',
        equipment: ['Digital scale', 'Food containers', 'Labeling machine'],
        criticalPoints: ['Accurate portioning', 'Proper labeling with date and contents', 'Seal containers properly'],
      },
      {
        step: 7,
        title: 'Storage After Processing',
        description: `Store prepared ${foodName} at proper temperature until use or service.`,
        duration: 'Ongoing',
        temperature: '0-5°C',
        equipment: ['Refrigeration unit', 'Temperature log'],
        criticalPoints: ['Label with preparation date and time', 'Use within 24-48 hours', 'Monitor temperature regularly'],
        safetyNotes: ['Do not store with raw proteins', 'Keep covered to prevent contamination'],
      },
    ],
    qualityControl: {
      checkpoints: [
        'Incoming inspection',
        'Pre-processing storage',
        'Post-preparation inspection',
        'Final storage conditions',
      ],
      standards: [
        'Visual: Fresh appearance, no bruising or discoloration',
        'Texture: Firm, appropriate ripeness',
        'Aroma: Characteristic fresh scent',
        'Temperature: Within specified range',
      ],
      correctiveActions: [
        'Reject substandard products',
        'Retrain staff on proper procedures',
        'Adjust storage conditions',
        'Review supplier quality',
      ],
    },
    storage: {
      temperature: '2-5°C (36-41°F)',
      humidity: '85-95% RH',
      shelfLife: 'Fresh: 3-7 days; Cut: 24-48 hours',
      packaging: 'Food-grade containers, vacuum-sealed bags, or cling-wrapped trays',
    },
    safety: {
      hazards: [
        'Biological: Pathogen contamination (Salmonella, E. coli)',
        'Physical: Cuts from knives, slips from wet floors',
        'Chemical: Sanitizer residue',
      ],
      precautions: [
        'Proper handwashing',
        'Sanitize all equipment and surfaces',
        'Use separate cutting boards for different food types',
        'Maintain proper storage temperatures',
      ],
      ppe: ['Cut-resistant gloves', 'Aprons', 'Non-slip footwear', 'Hair nets'],
    },
    flowchart: generateFruitFlowchart(foodName),
  }
}

// Vegetable SOP
function generateVegetableSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Processing SOP`,
    purpose: `To ensure safe and consistent preparation of ${foodName} for commercial food service operations.`,
    scope: 'All food service personnel involved in vegetable receiving, storage, and preparation.',
    responsibility: ['Receiving Staff', 'Kitchen Supervisor', 'Prep Cooks', 'Quality Control'],
    materials: [
      `Fresh ${foodName}`,
      'Potable water',
      'Food-grade sanitizer',
      'Clean towels',
      'Storage containers',
    ],
    equipment: [
      'Commercial prep sink',
      'Vegetable peeler',
      'Chef knives',
      'Cutting boards (color-coded)',
      'Blast chiller',
      'Walk-in cooler',
    ],
    steps: [
      {
        step: 1,
        title: 'Receiving and Verification',
        description: `Receive and verify ${foodName} shipment. Check for quality, quantity, and temperature.`,
        duration: '15-20 minutes',
        equipment: ['Receiving area', 'Thermometer', 'Scales'],
        criticalPoints: ['Temperature at receipt should be 5°C or below', 'Check for signs of spoilage', 'Verify against purchase order'],
        safetyNotes: ['Inspect for pest activity', 'Document any discrepancies'],
      },
      {
        step: 2,
        title: 'Primary Storage',
        description: `Store ${foodName} in designated vegetable storage area with proper ventilation.`,
        duration: 'Immediate',
        temperature: '0-5°C',
        equipment: ['Walk-in cooler', 'Storage bins', 'Labels'],
        criticalPoints: ['Store away from ethylene-sensitive produce', 'Maintain proper humidity', 'Follow FIFO rotation'],
      },
      {
        step: 3,
        title: 'Washing and Sanitizing',
        description: `Thoroughly wash ${foodName} under running potable water. Apply food-grade sanitizer if required.`,
        duration: '5-10 minutes',
        equipment: ['Prep sink', 'Colander', 'Sanitizer dispenser'],
        criticalPoints: ['Use potable water at appropriate temperature', 'Ensure complete coverage', 'Rinse thoroughly if sanitizer used'],
        safetyNotes: ['Do not use hot water which can promote bacterial growth'],
      },
      {
        step: 4,
        title: 'Peeling and Trimming',
        description: `Remove outer layers, peel, or trim ${foodName} as required by recipe.`,
        duration: '10-15 minutes',
        equipment: ['Peeler', 'Paring knife', 'Cutting board'],
        criticalPoints: ['Remove all damaged portions', 'Maintain consistent size', 'Minimize waste'],
        safetyNotes: ['Use proper knife safety techniques', 'Cut away from body'],
      },
      {
        step: 5,
        title: 'Cutting and Sizing',
        description: `Cut ${foodName} to specified sizes according to recipe requirements.`,
        duration: '10-20 minutes',
        equipment: ['Chef knife', 'Mandoline', 'Food processor'],
        criticalPoints: ['Uniform cuts for even cooking', 'Maintain sharp blades', 'Work efficiently to minimize exposure'],
        safetyNotes: ['Use cut-resistant gloves', 'Secure mandoline with guard'],
      },
      {
        step: 6,
        title: 'Cooking/Blanching (If Required)',
        description: `Apply appropriate cooking method: blanching, steaming, or other preparation.`,
        duration: '3-15 minutes depending on method',
        temperature: 'Boiling water (100°C) for blanching',
        equipment: ['Steam kettle', 'Blast chiller', 'Timer'],
        criticalPoints: ['Monitor cooking time precisely', 'Shock in ice water after blanching', 'Cool to 5°C within 2 hours'],
        safetyNotes: ['Use caution with hot equipment and liquids'],
      },
      {
        step: 7,
        title: 'Final Inspection and Packaging',
        description: 'Inspect finished product, portion, and package for storage or service.',
        duration: '5-10 minutes',
        equipment: ['Inspection table', 'Scales', 'Packaging materials'],
        criticalPoints: ['Verify quality standards', 'Portion accurately', 'Label with date and contents'],
      },
      {
        step: 8,
        title: 'Storage',
        description: `Store prepared ${foodName} in refrigeration until use.`,
        duration: 'Ongoing',
        temperature: '0-5°C',
        criticalPoints: ['Use within recommended time frame', 'Monitor storage temperature', 'Protect from cross-contamination'],
      },
    ],
    qualityControl: {
      checkpoints: ['Receiving inspection', 'Pre-preparation check', 'Post-cutting inspection', 'Final product verification'],
      standards: [
        'Fresh appearance without wilt',
        'No visible defects or decay',
        'Proper color characteristic of variety',
        'Appropriate texture for intended use',
      ],
      correctiveActions: [
        'Reject substandard produce',
        'Reprocess if safe to do so',
        'Adjust storage conditions',
        'Document and report issues',
      ],
    },
    storage: {
      temperature: '0-5°C (32-41°F)',
      humidity: '90-95% RH',
      shelfLife: 'Whole: 5-14 days; Cut: 3-5 days; Cooked: 2-3 days',
      packaging: 'Food-grade containers, sealed bags, or vacuum packaging',
    },
    safety: {
      hazards: [
        'Biological: Bacterial contamination (E. coli, Listeria)',
        'Physical: Cuts, foreign objects',
        'Chemical: Pesticide residue, cleaning chemicals',
      ],
      precautions: [
        'Source from approved suppliers',
        'Thorough washing and sanitizing',
        'Proper knife handling',
        'Chemical storage separation',
      ],
      ppe: ['Cut-resistant gloves', 'Apron', 'Closed-toe non-slip shoes', 'Hair restraint'],
    },
    flowchart: generateVegetableFlowchart(foodName),
  }
}

// Cereal SOP
function generateCerealSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Processing SOP`,
    purpose: `To establish standardized procedures for handling, preparing, and serving ${foodName} in commercial operations.`,
    scope: 'Kitchen staff and food handlers involved in grain and cereal preparation.',
    responsibility: ['Kitchen Manager', 'Prep Staff', 'Line Cooks', 'Dishwashing Staff'],
    materials: [
      `${foodName}`,
      'Potable water',
      'Salt (as required)',
      'Oil or butter (if applicable)',
      'Seasonings per recipe',
    ],
    equipment: [
      'Commercial rice cooker/steam kettle',
      'Measuring containers',
      'Stainless steel pots',
      'Colanders',
      'Thermometer',
      'Storage containers',
    ],
    steps: [
      {
        step: 1,
        title: 'Receiving and Inspection',
        description: `Inspect ${foodName} upon delivery for quality, packaging integrity, and absence of pests.`,
        duration: '10-15 minutes',
        equipment: ['Inspection area', 'Magnifying glass'],
        criticalPoints: ['Check for signs of moisture damage', 'Look for pest evidence', 'Verify expiration dates'],
        safetyNotes: ['Reject any compromised products'],
      },
      {
        step: 2,
        title: 'Dry Storage',
        description: `Store ${foodName} in airtight containers in cool, dry location.`,
        duration: 'Immediate upon receipt',
        equipment: ['Storage containers', 'Labels', 'Shelving'],
        criticalPoints: ['Store off the floor (minimum 6 inches)', 'Keep away from chemicals', 'Label with date received'],
      },
      {
        step: 3,
        title: 'Measuring and Rinsing',
        description: `Measure required quantity of ${foodName}. Rinse thoroughly if required by recipe.`,
        duration: '5-10 minutes',
        equipment: ['Measuring cups', 'Colander', 'Sink'],
        criticalPoints: ['Accurate measurement ratios', 'Rinse until water runs clear (if applicable)', 'Drain well'],
      },
      {
        step: 4,
        title: 'Cooking Preparation',
        description: 'Add measured water and any seasonings. Bring to appropriate temperature.',
        duration: '5-10 minutes',
        temperature: 'Boiling point (100°C)',
        equipment: ['Pot', 'Steam kettle', 'Measuring containers'],
        criticalPoints: ['Correct water-to-grain ratio', 'Add salt after water boils', 'Use appropriate pot size'],
      },
      {
        step: 5,
        title: 'Cooking Process',
        description: `Cook ${foodName} according to specified method and time.`,
        duration: '15-45 minutes depending on type',
        temperature: 'Simmering (85-95°C) after initial boil',
        equipment: ['Rice cooker', 'Steam kettle', 'Timer'],
        criticalPoints: ['Do not stir unnecessarily', 'Maintain consistent temperature', 'Cover tightly to retain steam'],
        safetyNotes: ['Be careful of steam when lifting lids'],
      },
      {
        step: 6,
        title: 'Resting and Fluffing',
        description: 'Allow cooked grains to rest. Fluff with fork before service.',
        duration: '5-10 minutes resting',
        equipment: ['Fork', 'Service containers'],
        criticalPoints: ['Do not skip resting period', 'Fluff gently to avoid mushiness', 'Check internal temperature (minimum 74°C)'],
      },
      {
        step: 7,
        title: 'Holding for Service',
        description: 'Hold at proper temperature for service or cool rapidly for storage.',
        duration: 'Service period (max 2 hours at hot holding)',
        temperature: 'Hot hold: above 63°C; Cold storage: below 5°C',
        equipment: ['Hot holding equipment', 'Blast chiller'],
        criticalPoints: ['Stir periodically if holding', 'Do not mix fresh and old batches', 'Cool within 2 hours if storing'],
        safetyNotes: ['Discard if held longer than 4 hours'],
      },
    ],
    qualityControl: {
      checkpoints: ['Receiving quality', 'Cooking time/temperature', 'Texture verification', 'Temperature monitoring'],
      standards: [
        'Proper water absorption',
        'Grains should be tender but intact',
        'No scorched or undercooked portions',
        'Appropriate seasoning level',
      ],
      correctiveActions: [
        'Adjust cooking time/liquid ratio',
        'Replace scorched product',
        'Review and adjust recipe',
        'Retrain staff on procedures',
      ],
    },
    storage: {
      temperature: 'Dry: 10-21°C; Cooked: 0-5°C',
      humidity: 'Dry storage: 50-60% RH',
      shelfLife: 'Dry: 6-12 months; Cooked: 3-5 days refrigerated',
      packaging: 'Airtight containers for dry; sealed containers for cooked',
    },
    safety: {
      hazards: [
        'Biological: Mold growth from moisture, Bacillus cereus in rice',
        'Physical: Foreign objects in bulk grains',
        'Chemical: Pesticide residue',
      ],
      precautions: [
        'Store in dry conditions',
        'Do not leave cooked grains at room temperature',
        'Inspect bulk grains before use',
        'Use within recommended timeframes',
      ],
      ppe: ['Heat-resistant gloves', 'Apron', 'Closed-toe shoes'],
    },
    flowchart: generateCerealFlowchart(foodName),
  }
}

// Pulse SOP
function generatePulseSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Processing SOP`,
    purpose: `To standardize the preparation and cooking of ${foodName} for commercial food service operations.`,
    scope: 'All kitchen staff involved in pulse and legume preparation.',
    responsibility: ['Prep Supervisor', 'Kitchen Staff', 'Quality Control'],
    materials: [
      `Dried or canned ${foodName}`,
      'Potable water',
      'Salt and seasonings',
      'Aromatics (onion, garlic, herbs) as per recipe',
    ],
    equipment: [
      'Large capacity pots',
      'Colanders',
      'Soaking containers',
      'Pressure cooker (optional)',
      'Storage containers',
    ],
    steps: [
      {
        step: 1,
        title: 'Inspection and Sorting',
        description: `Sort through ${foodName} to remove debris, damaged pulses, and foreign objects.`,
        duration: '5-10 minutes per batch',
        equipment: ['Sorting table', 'Trays'],
        criticalPoints: ['Remove stones and debris', 'Discard discolored pulses', 'Check for pest damage'],
      },
      {
        step: 2,
        title: 'Washing',
        description: `Rinse ${foodName} thoroughly under running water until water runs clear.`,
        duration: '3-5 minutes',
        equipment: ['Colander', 'Sink'],
        criticalPoints: ['Remove surface dirt', 'Eliminate foam/scum', 'Drain completely'],
      },
      {
        step: 3,
        title: 'Soaking (If Required)',
        description: `Soak ${foodName} in cold water for recommended time to reduce cooking time and improve digestibility.`,
        duration: '4-12 hours depending on type',
        equipment: ['Large containers', 'Refrigeration space'],
        criticalPoints: ['Use 3:1 water to pulse ratio', 'Change water if soaking extended', 'Refrigerate during long soaks'],
        safetyNotes: ['Discard soaking water before cooking'],
      },
      {
        step: 4,
        title: 'Cooking Process',
        description: `Cook ${foodName} using appropriate method: boiling, pressure cooking, or slow cooking.`,
        duration: '30-90 minutes depending on type',
        temperature: 'Simmering (85-95°C)',
        equipment: ['Stock pot', 'Pressure cooker', 'Steamer'],
        criticalPoints: ['Maintain gentle simmer', 'Add salt after cooking (prevents toughening)', 'Skim foam during cooking'],
        safetyNotes: ['Follow pressure cooker safety guidelines'],
      },
      {
        step: 5,
        title: 'Doneness Check',
        description: 'Test pulses for desired texture. Should be tender but not mushy.',
        duration: 'Ongoing during cooking',
        criticalPoints: ['Test multiple pulses for consistency', 'Check for even cooking', 'Adjust cooking time as needed'],
      },
      {
        step: 6,
        title: 'Draining and Seasoning',
        description: 'Drain excess liquid. Add seasonings and flavors as required by recipe.',
        duration: '5 minutes',
        equipment: ['Colander', 'Mixing containers'],
        criticalPoints: ['Reserve cooking liquid for recipes', 'Season while warm for better absorption', 'Avoid over-seasoning'],
      },
      {
        step: 7,
        title: 'Cooling and Storage',
        description: 'Cool rapidly if not serving immediately. Store properly labeled.',
        duration: 'Cooling: within 2 hours to 5°C',
        temperature: 'Below 5°C for storage',
        equipment: ['Blast chiller', 'Shallow containers', 'Labels'],
        criticalPoints: ['Use shallow containers for rapid cooling', 'Label with preparation date', 'Use within 5 days'],
      },
    ],
    qualityControl: {
      checkpoints: ['Raw inspection', 'Post-soaking quality', 'Cooking completion', 'Final texture'],
      standards: [
        'Uniform texture throughout batch',
        'No hard or undercooked pieces',
        'Appropriate moisture level',
        'Good flavor development',
      ],
      correctiveActions: [
        'Extend cooking time if undercooked',
        'Adjust soaking time for future batches',
        'Review water quality',
        'Check pulse age and storage conditions',
      ],
    },
    storage: {
      temperature: 'Dry: 10-21°C; Cooked: 0-5°C',
      humidity: 'Dry: 50% RH maximum',
      shelfLife: 'Dry: 1-2 years; Cooked: 4-5 days; Frozen: 3 months',
      packaging: 'Airtight containers for dry; sealed containers for cooked',
    },
    safety: {
      hazards: [
        'Biological: Bacterial growth in improperly stored cooked pulses',
        'Chemical: Natural toxins in some raw pulses (kidney beans)',
        'Physical: Foreign objects',
      ],
      precautions: [
        'Cook red kidney beans thoroughly (boil for 10+ minutes)',
        'Never use slow cooker for kidney beans without boiling first',
        'Rapid cooling of cooked pulses',
        'Proper storage labeling',
      ],
      ppe: ['Heat-resistant gloves', 'Apron', 'Closed-toe shoes'],
    },
    flowchart: generatePulseFlowchart(foodName),
  }
}

// Dairy SOP
function generateDairySOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Handling SOP`,
    purpose: `To ensure safe handling, storage, and service of ${foodName} in commercial food operations.`,
    scope: 'All staff handling dairy products in receiving, storage, and service.',
    responsibility: ['Receiving Staff', 'Kitchen Supervisor', 'Service Staff', 'Dairy Handler'],
    materials: [
      `${foodName}`,
      'Clean containers for transfer',
      'Labels and date markers',
      'Sanitizing solution',
    ],
    equipment: [
      'Dedicated dairy refrigerator',
      'Thermometers',
      'Storage containers',
      'Mixing equipment (if applicable)',
    ],
    steps: [
      {
        step: 1,
        title: 'Receiving Temperature Check',
        description: `Check temperature of ${foodName} upon delivery. Must be within safe range.`,
        duration: '5-10 minutes',
        temperature: '0-5°C',
        equipment: ['Calibrated thermometer'],
        criticalPoints: ['Reject if above 5°C', 'Check expiration dates', 'Inspect packaging integrity'],
        safetyNotes: ['Document temperature readings'],
      },
      {
        step: 2,
        title: 'Immediate Storage',
        description: `Transfer ${foodName} to designated refrigerated storage immediately upon receipt.`,
        duration: 'Within 15 minutes of receipt',
        temperature: '0-5°C',
        equipment: ['Dairy refrigerator', 'Storage bins'],
        criticalPoints: ['Store in coldest part of refrigerator', 'Keep away from raw foods', 'Maintain original packaging when possible'],
      },
      {
        step: 3,
        title: 'Date Labeling',
        description: 'Label all products with receipt date and use-by date.',
        duration: '2-3 minutes per item',
        equipment: ['Label maker', 'Marker'],
        criticalPoints: ['Follow FIFO rotation', 'Check and honor manufacturer dates', 'Label any opened products'],
      },
      {
        step: 4,
        title: 'Preparation for Service',
        description: `Remove required amount of ${foodName} from refrigeration. Transfer to service container.`,
        duration: '2-5 minutes',
        equipment: ['Clean utensils', 'Service containers'],
        criticalPoints: ['Use clean, sanitized utensils', 'Never return unused portions to original container', 'Work quickly to minimize temperature abuse'],
      },
      {
        step: 5,
        title: 'Temperature Monitoring During Service',
        description: 'Maintain proper temperature during service period.',
        duration: 'Service period',
        temperature: 'Cold dairy: below 5°C; Hot dairy: above 63°C',
        equipment: ['Cold display units', 'Hot holding equipment'],
        criticalPoints: ['Check temperatures every 30 minutes', 'Use ice baths for cold items', 'Discard if temperature compromised'],
      },
      {
        step: 6,
        title: 'Post-Service Handling',
        description: 'Properly store or discard remaining product after service.',
        duration: '5-10 minutes',
        equipment: ['Storage containers', 'Waste bins'],
        criticalPoints: ['Never return to original container if exposed', 'Cool hot items rapidly', 'Label with new use-by date'],
      },
    ],
    qualityControl: {
      checkpoints: ['Receiving temperature', 'Storage temperature', 'Visual inspection', 'Expiration monitoring'],
      standards: [
        'Temperature always within safe range',
        'No off-odors or flavors',
        'Proper consistency and color',
        'Within date code',
      ],
      correctiveActions: [
        'Discard if temperature compromised',
        'Remove from service if quality concerns',
        'Review storage equipment',
        'Adjust ordering quantities',
      ],
    },
    storage: {
      temperature: '0-5°C (32-41°F)',
      humidity: 'N/A - sealed packaging',
      shelfLife: 'Per manufacturer date; opened products: 3-7 days depending on type',
      packaging: 'Original packaging or food-grade sealed containers',
    },
    safety: {
      hazards: [
        'Biological: Bacterial growth (Listeria, Salmonella) from temperature abuse',
        'Allergen: Major allergen - must prevent cross-contact',
        'Chemical: Cleaning chemical contamination',
      ],
      precautions: [
        'Strict temperature control',
        'Separate from allergen-free items',
        'Dedicated storage areas',
        'Regular temperature monitoring',
      ],
      ppe: ['Food handling gloves', 'Clean apron', 'Hair restraint'],
    },
    flowchart: generateDairyFlowchart(foodName),
  }
}

// Nuts SOP
function generateNutSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Handling SOP`,
    purpose: `To establish procedures for safe handling and preparation of ${foodName} while managing allergen risks.`,
    scope: 'All food handlers involved in receiving, storing, and preparing nuts and seeds.',
    responsibility: ['Allergen Control Manager', 'Kitchen Supervisor', 'Prep Staff'],
    materials: [
      `${foodName}`,
      'Airtight storage containers',
      'Allergen warning labels',
      'Dedicated preparation equipment',
    ],
    equipment: [
      'Dedicated nut storage area',
      'Roasting equipment (if applicable)',
      'Grinder/processor',
      'Sealed containers',
    ],
    steps: [
      {
        step: 1,
        title: 'Allergen-Aware Receiving',
        description: `Receive ${foodName} with awareness of allergen status. Check for cross-contamination in shipping.`,
        duration: '10-15 minutes',
        criticalPoints: ['Verify allergen labeling', 'Check for damage or pest evidence', 'Store immediately in designated area'],
        safetyNotes: ['Nuts are a major allergen - handle with extreme care'],
      },
      {
        step: 2,
        title: 'Dedicated Storage',
        description: `Store ${foodName} in dedicated allergen storage area, clearly labeled.`,
        duration: 'Immediate',
        temperature: '10-15°C recommended; refrigerate for extended storage',
        equipment: ['Sealed containers', 'Allergen labels', 'Dedicated shelving'],
        criticalPoints: ['Separate from allergen-free foods', 'Use dedicated containers', 'Label clearly as allergen'],
      },
      {
        step: 3,
        title: 'Quality Inspection',
        description: 'Inspect for rancidity, mold, or pest damage before use.',
        duration: '5 minutes',
        criticalPoints: ['Check aroma - should be fresh', 'Look for discoloration', 'Check for moisture damage'],
        safetyNotes: ['Discard any suspicious product'],
      },
      {
        step: 4,
        title: 'Roasting/Toasting (If Required)',
        description: `Roast ${foodName} to enhance flavor using appropriate method.`,
        duration: '10-20 minutes',
        temperature: '150-180°C',
        equipment: ['Oven', 'Roasting pans', 'Timer'],
        criticalPoints: ['Monitor closely to prevent burning', 'Stir occasionally for even roasting', 'Cool completely before storage'],
        safetyNotes: ['Watch for nut oils that can become rancid at high temperatures'],
      },
      {
        step: 5,
        title: 'Processing',
        description: 'Chop, grind, or process as required by recipe.',
        duration: '5-15 minutes',
        equipment: ['Dedicated processor', 'Knives', 'Cutting board'],
        criticalPoints: ['Use dedicated equipment', 'Clean thoroughly after use', 'Achieve consistent size/texture'],
        safetyNotes: ['Thoroughly clean all equipment after processing to prevent cross-contact'],
      },
      {
        step: 6,
        title: 'Storage After Processing',
        description: 'Store processed nuts in airtight containers with allergen labels.',
        duration: 'Immediate',
        temperature: 'Refrigerate or freeze for extended storage',
        criticalPoints: ['Label with processing date', 'Note allergen status', 'Use within recommended timeframe'],
      },
    ],
    qualityControl: {
      checkpoints: ['Receiving inspection', 'Storage conditions', 'Pre-use quality check', 'Post-processing verification'],
      standards: [
        'Fresh aroma without rancidity',
        'Proper color and texture',
        'Free from mold or pests',
        'Proper allergen labeling',
      ],
      correctiveActions: [
        'Discard rancid products',
        'Review storage conditions',
        'Replace equipment that cannot be properly cleaned',
        'Retrain staff on allergen protocols',
      ],
    },
    storage: {
      temperature: 'Cool storage (10-15°C) or refrigeration',
      humidity: 'Low humidity (<50%)',
      shelfLife: 'Room temp: 1-3 months; Refrigerated: 6-12 months; Frozen: 1-2 years',
      packaging: 'Airtight containers with allergen warning labels',
    },
    safety: {
      hazards: [
        'Allergen: Major allergen - can cause severe reactions',
        'Biological: Mold/aflatoxin growth',
        'Chemical: Rancidity from improper storage',
      ],
      precautions: [
        'Strict allergen separation protocols',
        'Dedicated equipment and storage',
        'Proper labeling throughout facility',
        'Staff allergen training',
      ],
      ppe: ['Gloves', 'Face mask (to prevent inhalation of fine particles)', 'Apron'],
    },
    flowchart: generateNutFlowchart(foodName),
  }
}

// Vegetarian SOP
function generateVegetarianSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Preparation SOP`,
    purpose: `To ensure consistent, safe preparation of vegetarian dish ${foodName} while maintaining vegetarian integrity.`,
    scope: 'Kitchen staff involved in vegetarian food preparation.',
    responsibility: ['Kitchen Manager', 'Vegetarian Menu Specialist', 'Prep Cooks', 'Line Cooks'],
    materials: [
      `Ingredients for ${foodName}`,
      'Vegetable stock/broth',
      'Vegetarian-approved seasonings',
      'Plant-based oils',
    ],
    equipment: [
      'Dedicated vegetarian prep area',
      'Separate cooking vessels',
      'Color-coded utensils (green)',
      'Storage containers',
    ],
    steps: [
      {
        step: 1,
        title: 'Ingredient Verification',
        description: `Verify all ingredients for ${foodName} are vegetarian-certified or appropriate for vegetarian diet.`,
        duration: '5-10 minutes',
        criticalPoints: ['Check all labels for hidden non-vegetarian ingredients', 'Verify cheese is vegetarian (rennet-free)', 'Confirm stocks are vegetable-based'],
        safetyNotes: ['Be aware of hidden ingredients like gelatin, anchovies, some E-numbers'],
      },
      {
        step: 2,
        title: 'Equipment Sanitation',
        description: 'Ensure all equipment is clean and free from meat/fish residue.',
        duration: '5 minutes',
        equipment: ['Sanitizer', 'Clean cloths', 'Dishwasher'],
        criticalPoints: ['Use dedicated vegetarian equipment where possible', 'Deep-clean shared equipment', 'Verify no cross-contamination'],
      },
      {
        step: 3,
        title: 'Mise en Place',
        description: `Prepare all ingredients for ${foodName}: washing, chopping, measuring.`,
        duration: '15-30 minutes',
        equipment: ['Cutting boards', 'Knives', 'Measuring tools'],
        criticalPoints: ['Use separate cutting boards', 'Prepare vegetables first', 'Maintain organization'],
      },
      {
        step: 4,
        title: 'Cooking Process',
        description: `Execute cooking process for ${foodName} according to recipe specifications.`,
        duration: 'Varies by recipe',
        equipment: ['Stove', 'Oven', 'Cooking vessels'],
        criticalPoints: ['Use only vegetarian cooking fats/oils', 'No tasting with utensils that have contacted meat', 'Maintain proper temperatures'],
        safetyNotes: ['Never add non-vegetarian garnishes or ingredients'],
      },
      {
        step: 5,
        title: 'Plating and Garnishing',
        description: 'Plate dish using vegetarian-approved garnishes only.',
        duration: '3-5 minutes',
        criticalPoints: ['Verify all garnishes are vegetarian', 'Use clean plates', 'No cross-contamination during plating'],
      },
      {
        step: 6,
        title: 'Service Communication',
        description: 'Clearly communicate vegetarian status to service staff.',
        duration: 'Immediate',
        criticalPoints: ['Label clearly', 'Separate from non-vegetarian items', 'Inform staff of vegetarian status'],
      },
    ],
    qualityControl: {
      checkpoints: ['Ingredient verification', 'Cross-contamination prevention', 'Cooking standards', 'Service verification'],
      standards: [
        '100% vegetarian ingredients verified',
        'No cross-contamination with meat/fish',
        'Proper cooking temperatures achieved',
        'Clear labeling and communication',
      ],
      correctiveActions: [
        'Remove any product with doubt about vegetarian status',
        'Re-sanitize equipment if contamination suspected',
        'Retrain staff on vegetarian protocols',
        'Review supplier certifications',
      ],
    },
    storage: {
      temperature: 'Per ingredient requirements; finished dish: 0-5°C',
      shelfLife: 'Varies by dish; typically 2-3 days refrigerated',
      packaging: 'Clearly labeled vegetarian containers',
    },
    safety: {
      hazards: [
        'Cross-contamination with meat/fish products',
        'Hidden non-vegetarian ingredients',
        'Allergen concerns (nuts, dairy, gluten)',
      ],
      precautions: [
        'Dedicated preparation areas where possible',
        'Clear labeling system',
        'Staff training on vegetarian requirements',
        'Supplier verification program',
      ],
      ppe: ['Standard kitchen PPE', 'Color-coded aprons (optional)'],
    },
    flowchart: generateVegetarianFlowchart(foodName),
  }
}

// Non-Vegetarian SOP
function generateNonVegSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Preparation SOP`,
    purpose: `To establish safe handling and cooking procedures for ${foodName} in commercial food service.`,
    scope: 'Kitchen staff handling meat, poultry, and seafood products.',
    responsibility: ['Kitchen Manager', 'Meat Handler', 'Line Cooks', 'Dishwasher'],
    materials: [
      `${foodName}`,
      'Marinades/seasonings per recipe',
      'Cooking oil',
      'Sanitizing solution',
    ],
    equipment: [
      'Meat thermometers',
      'Color-coded cutting boards (red for meat)',
      'Separate prep area',
      'Cooking equipment',
      'Blast chiller',
    ],
    steps: [
      {
        step: 1,
        title: 'Receiving and Temperature Check',
        description: `Receive ${foodName} and verify temperature is within safe range.`,
        duration: '10-15 minutes',
        temperature: 'Fresh meat: 0-5°C; Frozen: -18°C or below',
        equipment: ['Thermometer', 'Inspection area'],
        criticalPoints: ['Reject if temperature is compromised', 'Check for proper packaging', 'Verify expiration dates'],
        safetyNotes: ['Document all temperature readings'],
      },
      {
        step: 2,
        title: 'Proper Storage',
        description: `Store ${foodName} in designated area on lowest shelf to prevent dripping.`,
        duration: 'Immediate',
        temperature: '0-5°C for fresh; -18°C for frozen',
        equipment: ['Meat refrigerator', 'Drip pans'],
        criticalPoints: ['Store below ready-to-eat foods', 'Prevent cross-contamination', 'Label with date received'],
      },
      {
        step: 3,
        title: 'Thawing (If Frozen)',
        description: 'Thaw using approved methods: refrigeration, cold water, or microwave.',
        duration: 'Varies (refrigerator: 24 hours per 2.5kg; cold water: 1 hour per 500g)',
        temperature: 'Refrigerator thawing: 0-5°C; Cold water: below 21°C',
        criticalPoints: ['Never thaw at room temperature', 'Change water every 30 minutes if using water method', 'Cook immediately after microwave thawing'],
        safetyNotes: ['Plan ahead for proper thawing time'],
      },
      {
        step: 4,
        title: 'Preparation',
        description: `Prepare ${foodName} on designated equipment. Trim, portion, or marinate as required.`,
        duration: '10-30 minutes',
        equipment: ['Red cutting boards', 'Meat knives', 'Marinating containers'],
        criticalPoints: ['Use dedicated equipment', 'Sanitize all surfaces after use', 'Work quickly to minimize temperature abuse'],
        safetyNotes: ['Wash hands thoroughly after handling raw meat'],
      },
      {
        step: 5,
        title: 'Cooking',
        description: `Cook ${foodName} to proper internal temperature.`,
        duration: 'Varies by cooking method and portion size',
        temperature: 'Poultry: 74°C; Ground meats: 74°C; Whole cuts: 63°C with 3-minute rest; Seafood: 63°C',
        equipment: ['Stove', 'Oven', 'Grill', 'Meat thermometer'],
        criticalPoints: ['Use calibrated thermometer', 'Check temperature in thickest part', 'Allow rest time for whole cuts'],
        safetyNotes: ['Never partially cook to finish later'],
      },
      {
        step: 6,
        title: 'Holding and Service',
        description: 'Hold at proper temperature or serve immediately.',
        duration: 'Service period (max 2 hours hot hold)',
        temperature: 'Hot hold: above 63°C',
        equipment: ['Hot holding equipment', 'Serving dishes'],
        criticalPoints: ['Check temperature every 30 minutes', 'Discard if held below 57°C for more than 2 hours', 'Do not mix batches'],
      },
      {
        step: 7,
        title: 'Cooling (If Not Served)',
        description: 'Cool rapidly if not serving immediately.',
        duration: 'Cool to 21°C within 2 hours, then to 5°C within 4 more hours',
        temperature: 'From 63°C to 21°C in 2 hours; to 5°C in 4 more hours',
        equipment: ['Blast chiller', 'Shallow pans'],
        criticalPoints: ['Use shallow containers', 'Do not cover until cooled', 'Stir to release heat'],
      },
      {
        step: 8,
        title: 'Cleaning and Sanitization',
        description: 'Thoroughly clean and sanitize all equipment and surfaces.',
        duration: '10-15 minutes',
        equipment: ['Sanitizer', 'Cleaning tools', 'Dishwasher'],
        criticalPoints: ['Sanitize all meat-contact surfaces', 'Wash hands thoroughly', 'Change aprons'],
      },
    ],
    qualityControl: {
      checkpoints: ['Receiving temperature', 'Storage temperature', 'Cooking temperature', 'Holding temperature'],
      standards: [
        'Internal cooking temperatures achieved',
        'No pink in poultry (unless verified safe)',
        'Clear juices for poultry',
        'Proper texture and doneness',
      ],
      correctiveActions: [
        'Continue cooking if temperature not reached',
        'Discard if held at unsafe temperatures',
        'Re-train staff on temperature requirements',
        'Calibrate thermometers regularly',
      ],
    },
    storage: {
      temperature: 'Fresh: 0-5°C; Frozen: -18°C or below',
      shelfLife: 'Fresh poultry: 1-2 days; Fresh red meat: 3-5 days; Frozen: 6-12 months',
      packaging: 'Original packaging or food-grade wrap; airtight for storage',
    },
    safety: {
      hazards: [
        'Biological: Salmonella, E. coli, Campylobacter, Listeria',
        'Cross-contamination to other foods',
        'Physical: Bones, packaging materials',
      ],
      precautions: [
        'Strict temperature control',
        'Separate equipment and storage',
        'Proper handwashing',
        'Thorough cooking to safe temperatures',
      ],
      ppe: ['Cut-resistant gloves', 'Heat-resistant gloves', 'Apron', 'Non-slip footwear'],
    },
    flowchart: generateNonVegFlowchart(foodName),
  }
}

// Fast Food SOP
function generateFastFoodSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Preparation SOP`,
    purpose: `To standardize the preparation of ${foodName} for quick-service food operations.`,
    scope: 'All staff involved in fast food preparation and service.',
    responsibility: ['Shift Manager', 'Line Cooks', 'Cashier/Service Staff', 'Cleaning Staff'],
    materials: [
      `${foodName} ingredients`,
      'Packaging materials',
      'Condiments and sides',
      'Cleaning supplies',
    ],
    equipment: [
      'Griddle/flat top',
      'Deep fryer',
      'Sandwich station',
      'Holding equipment',
      'Point-of-sale system',
    ],
    steps: [
      {
        step: 1,
        title: 'Shift Preparation',
        description: `Prepare all components for ${foodName} service including mise en place.`,
        duration: '30-60 minutes before service',
        equipment: ['Prep station', 'Storage containers'],
        criticalPoints: ['Check inventory levels', 'Verify equipment functionality', 'Set up station efficiently'],
      },
      {
        step: 2,
        title: 'Equipment Preheating',
        description: 'Preheat all cooking equipment to proper temperatures.',
        duration: '15-30 minutes before service',
        temperature: 'Griddle: 175-200°C; Fryer: 175-190°C',
        equipment: ['Griddle', 'Fryer', 'Holding units'],
        criticalPoints: ['Verify oil quality', 'Check temperature calibration', 'Ensure proper ventilation'],
      },
      {
        step: 3,
        title: 'Cooking Process',
        description: `Prepare ${foodName} according to standardized recipe and timing.`,
        duration: '3-10 minutes depending on item',
        temperature: 'Per recipe specifications',
        equipment: ['Griddle', 'Fryer', 'Timer'],
        criticalPoints: ['Follow exact cooking times', 'Use timers for consistency', 'Check internal temperatures'],
        safetyNotes: ['Monitor oil temperature to prevent fires'],
      },
      {
        step: 4,
        title: 'Assembly',
        description: 'Assemble items on clean surface using proper portioning.',
        duration: '1-2 minutes per item',
        equipment: ['Assembly station', 'Scales', 'Portion tools'],
        criticalPoints: ['Consistent portioning', 'Proper assembly order', 'Fresh ingredients'],
      },
      {
        step: 5,
        title: 'Quality Check',
        description: 'Verify appearance, temperature, and presentation standards.',
        duration: '30 seconds per item',
        criticalPoints: ['Visual inspection', 'Temperature check if needed', 'Correct any deficiencies'],
      },
      {
        step: 6,
        title: 'Holding',
        description: 'Hold at proper temperature for limited time.',
        duration: 'Maximum hold times vary by item (typically 10-20 minutes)',
        temperature: 'Hot: above 63°C',
        equipment: ['Holding cabinets', 'Heat lamps'],
        criticalPoints: ['Label with time prepared', 'Discard after hold time limit', 'First-in, first-out'],
      },
      {
        step: 7,
        title: 'Packaging and Service',
        description: 'Package and serve to customer promptly.',
        duration: '1 minute',
        equipment: ['Packaging', 'Bags', 'Trays'],
        criticalPoints: ['Correct order verification', 'Proper packaging', 'Include condiments/sides'],
      },
    ],
    qualityControl: {
      checkpoints: ['Temperature checks', 'Hold time monitoring', 'Portion consistency', 'Customer feedback'],
      standards: [
        'Consistent taste and appearance',
        'Within temperature specifications',
        'Within hold time limits',
        'Correct order fulfillment',
      ],
      correctiveActions: [
        'Adjust cooking times/temperatures',
        'Discard items exceeding hold times',
        'Re-train staff on portioning',
        'Review customer complaints',
      ],
    },
    storage: {
      temperature: 'Frozen: -18°C; Refrigerated: 0-5°C; Dry storage: 10-21°C',
      shelfLife: 'Per manufacturer guidelines; prepared items as per hold times',
      packaging: 'Original packaging for storage; branded packaging for service',
    },
    safety: {
      hazards: [
        'Burns from hot equipment and oil',
        'Slips from grease on floors',
        'Cuts from equipment',
        'Fire risk from fryers',
      ],
      precautions: [
        'Proper training on equipment',
        'Non-slip footwear',
        'Fire suppression systems',
        'Regular cleaning and maintenance',
      ],
      ppe: ['Heat-resistant gloves', 'Apron', 'Non-slip shoes', 'Hair restraint'],
    },
    flowchart: generateFastFoodFlowchart(foodName),
  }
}

// Beverages SOP
function generateBeverageSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Preparation SOP`,
    purpose: `To standardize the preparation and service of ${foodName} in commercial settings.`,
    scope: 'Baristas, bartenders, and service staff involved in beverage preparation.',
    responsibility: ['Beverage Manager', 'Baristas/Bartenders', 'Service Staff'],
    materials: [
      `${foodName} ingredients`,
      'Water (filtered)',
      'Sweeteners',
      'Garnishes',
      'Ice',
    ],
    equipment: [
      'Espresso machine',
      'Blender',
      'Coffee grinder',
      'Refrigeration',
      'Glassware',
    ],
    steps: [
      {
        step: 1,
        title: 'Station Setup',
        description: `Prepare beverage station with all necessary ingredients and equipment for ${foodName}.`,
        duration: '15-30 minutes',
        equipment: ['Prep station', 'Refrigeration', 'Ice machine'],
        criticalPoints: ['Stock all ingredients', 'Clean and sanitize station', 'Check equipment functionality'],
      },
      {
        step: 2,
        title: 'Equipment Calibration',
        description: 'Ensure equipment is properly calibrated for consistent results.',
        duration: '5-10 minutes',
        equipment: ['Espresso machine', 'Grinder', 'Thermometer'],
        criticalPoints: ['Check water temperature', 'Calibrate grinder settings', 'Verify steam pressure'],
      },
      {
        step: 3,
        title: 'Ingredient Preparation',
        description: `Prepare fresh ingredients needed for ${foodName}.`,
        duration: '5-15 minutes',
        equipment: ['Cutting tools', 'Juicers', 'Blenders'],
        criticalPoints: ['Use fresh ingredients', 'Proper portioning', 'Maintain cold chain for dairy'],
      },
      {
        step: 4,
        title: 'Beverage Preparation',
        description: `Prepare ${foodName} according to standardized recipe.`,
        duration: '1-5 minutes per beverage',
        temperature: 'Hot: 60-70°C; Cold: 0-5°C',
        equipment: ['Espresso machine', 'Blender', 'Shaker'],
        criticalPoints: ['Follow recipe precisely', 'Use correct ratios', 'Proper technique'],
      },
      {
        step: 5,
        title: 'Quality Check',
        description: 'Verify beverage meets quality standards.',
        duration: '30 seconds',
        criticalPoints: ['Visual presentation', 'Temperature check', 'Taste verification'],
      },
      {
        step: 6,
        title: 'Presentation',
        description: 'Present beverage in appropriate glassware with garnish.',
        duration: '30 seconds',
        equipment: ['Glassware', 'Garnish tools'],
        criticalPoints: ['Clean glassware', 'Proper garnish', 'Present on appropriate service ware'],
      },
      {
        step: 7,
        title: 'Service',
        description: 'Serve promptly at correct temperature.',
        duration: 'Immediate',
        criticalPoints: ['Serve within 1 minute of preparation', 'Communicate any allergens', 'Offer accompaniments'],
      },
    ],
    qualityControl: {
      checkpoints: ['Ingredient freshness', 'Equipment calibration', 'Beverage consistency', 'Presentation'],
      standards: [
        'Consistent taste profile',
        'Proper temperature',
        'Correct portion size',
        'Appealing presentation',
      ],
      correctiveActions: [
        'Adjust recipe ratios',
        'Recalibrate equipment',
        'Replace stale ingredients',
        'Re-train staff on techniques',
      ],
    },
    storage: {
      temperature: 'Cold ingredients: 0-5°C; Hot service: 60-70°C',
      shelfLife: 'Varies by ingredient; prepared beverages: immediate service',
      packaging: 'Appropriate glassware or to-go containers',
    },
    safety: {
      hazards: [
        'Burns from hot beverages and equipment',
        'Slips from wet floors',
        'Allergens (milk, nuts, soy)',
      ],
      precautions: [
        'Proper handling of hot items',
        'Non-slip mats',
        'Clear allergen labeling',
        'Regular equipment maintenance',
      ],
      ppe: ['Heat-resistant gloves', 'Apron', 'Non-slip footwear'],
    },
    flowchart: generateBeverageFlowchart(foodName),
  }
}

// Snacks SOP
function generateSnackSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Preparation SOP`,
    purpose: `To establish procedures for the preparation and service of ${foodName}.`,
    scope: 'Kitchen staff involved in snack and processed food preparation.',
    responsibility: ['Kitchen Supervisor', 'Prep Staff', 'Service Staff'],
    materials: [
      `${foodName} ingredients`,
      'Seasonings',
      'Cooking oils',
      'Packaging materials',
    ],
    equipment: [
      'Deep fryer',
      'Oven',
      'Seasoning equipment',
      'Packaging station',
    ],
    steps: [
      {
        step: 1,
        title: 'Ingredient Preparation',
        description: `Prepare all components needed for ${foodName}.`,
        duration: '15-30 minutes',
        equipment: ['Prep station', 'Measuring tools'],
        criticalPoints: ['Proper portioning', 'Ingredient quality check', 'Temperature of ingredients'],
      },
      {
        step: 2,
        title: 'Equipment Setup',
        description: 'Set up and preheat cooking equipment.',
        duration: '15-30 minutes',
        temperature: 'Fryer: 175-190°C; Oven: 180-220°C',
        equipment: ['Fryer', 'Oven', 'Thermometer'],
        criticalPoints: ['Check oil quality', 'Verify temperature', 'Ensure ventilation'],
      },
      {
        step: 3,
        title: 'Cooking/Frying',
        description: `Cook ${foodName} using appropriate method.`,
        duration: '3-15 minutes',
        temperature: 'Per recipe specification',
        equipment: ['Fryer', 'Oven', 'Timer'],
        criticalPoints: ['Monitor cooking time', 'Avoid overcrowding', 'Maintain oil temperature'],
        safetyNotes: ['Use caution with hot oil'],
      },
      {
        step: 4,
        title: 'Draining and Cooling',
        description: 'Remove from cooking medium and drain excess oil. Allow to cool.',
        duration: '2-5 minutes',
        equipment: ['Draining racks', 'Paper towels'],
        criticalPoints: ['Drain thoroughly', 'Do not stack while hot', 'Allow proper cooling'],
      },
      {
        step: 5,
        title: 'Seasoning',
        description: 'Apply seasonings while product is still warm for better adhesion.',
        duration: '1-2 minutes',
        equipment: ['Seasoning shaker', 'Mixing bowl'],
        criticalPoints: ['Season immediately while warm', 'Even distribution', 'Follow recipe proportions'],
      },
      {
        step: 6,
        title: 'Quality Check',
        description: 'Inspect for proper cooking, seasoning, and appearance.',
        duration: '1-2 minutes',
        criticalPoints: ['Texture verification', 'Color check', 'Taste test'],
      },
      {
        step: 7,
        title: 'Packaging or Service',
        description: 'Package for sale or serve immediately.',
        duration: '1-3 minutes',
        equipment: ['Packaging materials', 'Labels'],
        criticalPoints: ['Proper portioning', 'Secure packaging', 'Label with date'],
      },
    ],
    qualityControl: {
      checkpoints: ['Ingredient quality', 'Cooking temperature', 'Seasoning consistency', 'Final product quality'],
      standards: [
        'Consistent texture',
        'Proper seasoning level',
        'Appealing appearance',
        'Within temperature specifications',
      ],
      correctiveActions: [
        'Adjust cooking time/temperature',
        'Modify seasoning blend',
        'Replace cooking oil',
        'Re-train staff',
      ],
    },
    storage: {
      temperature: 'Room temperature (15-21°C) for dry snacks; 0-5°C for refrigerated items',
      shelfLife: 'Varies: Fried snacks 1-3 days; Packaged snacks per manufacturer',
      packaging: 'Airtight containers or commercial packaging',
    },
    safety: {
      hazards: [
        'Burns from hot oil and equipment',
        'Fire risk from frying',
        'Allergens (nuts, gluten, dairy)',
      ],
      precautions: [
        'Monitor oil temperature',
        'Keep fire suppression ready',
        'Clear allergen labeling',
        'Regular equipment maintenance',
      ],
      ppe: ['Heat-resistant gloves', 'Apron', 'Face shield for frying', 'Non-slip footwear'],
    },
    flowchart: generateSnackFlowchart(foodName),
  }
}

// Other SOP
function generateOtherSOP(foodName: string): CommercialSOP {
  return {
    title: `Commercial ${foodName} Handling SOP`,
    purpose: `To establish safe handling procedures for ${foodName} in commercial food service.`,
    scope: 'All food handlers involved with this product.',
    responsibility: ['Kitchen Manager', 'Food Handlers', 'Quality Control'],
    materials: [
      `${foodName}`,
      'Appropriate storage containers',
      'Labels',
    ],
    equipment: [
      'Appropriate storage facilities',
      'Preparation equipment',
      'Thermometers',
    ],
    steps: [
      {
        step: 1,
        title: 'Receiving',
        description: `Receive and inspect ${foodName} for quality and safety.`,
        duration: '5-10 minutes',
        criticalPoints: ['Check for damage', 'Verify expiration dates', 'Document receipt'],
      },
      {
        step: 2,
        title: 'Storage',
        description: 'Store according to product requirements.',
        duration: 'Immediate',
        criticalPoints: ['Proper temperature', 'Appropriate location', 'Label with date'],
      },
      {
        step: 3,
        title: 'Preparation',
        description: `Prepare ${foodName} according to recipe or application.`,
        duration: 'Varies',
        criticalPoints: ['Follow recipe precisely', 'Maintain hygiene', 'Work efficiently'],
      },
      {
        step: 4,
        title: 'Quality Check',
        description: 'Verify product meets quality standards.',
        duration: '1-2 minutes',
        criticalPoints: ['Visual inspection', 'Temperature check if applicable', 'Taste if appropriate'],
      },
      {
        step: 5,
        title: 'Service/Storage',
        description: 'Serve or store as appropriate.',
        duration: 'Immediate',
        criticalPoints: ['Proper presentation', 'Correct storage temperature', 'Labeling'],
      },
    ],
    qualityControl: {
      checkpoints: ['Receiving', 'Storage', 'Preparation', 'Service'],
      standards: [
        'Product integrity',
        'Proper temperature',
        'Correct handling',
        'Appropriate use',
      ],
      correctiveActions: [
        'Review handling procedures',
        'Adjust storage conditions',
        'Re-train staff',
        'Review supplier quality',
      ],
    },
    storage: {
      temperature: 'Per product requirements',
      shelfLife: 'Per manufacturer guidelines',
      packaging: 'Appropriate to product type',
    },
    safety: {
      hazards: ['Product-specific'],
      precautions: ['Follow product-specific guidelines', 'Proper training', 'Regular monitoring'],
      ppe: ['Appropriate to handling requirements'],
    },
    flowchart: generateOtherFlowchart(foodName),
  }
}

// Flowchart generators for each category
function generateFruitFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Processing', nextSteps: ['receive'] },
    { id: 'receive', type: 'process', label: 'Receive & Inspect', description: 'Check quality, temperature, and documentation', nextSteps: ['quality_check'] },
    { id: 'quality_check', type: 'decision', label: 'Quality OK?', branch: { condition: 'Quality acceptable?', trueStep: 'store', falseStep: 'reject' } },
    { id: 'reject', type: 'process', label: 'Reject & Document', description: 'Document issues and reject shipment', nextSteps: ['end'] },
    { id: 'store', type: 'storage', label: 'Refrigerated Storage', description: 'Store at 2-5°C until processing', nextSteps: ['wash'] },
    { id: 'wash', type: 'process', label: 'Wash & Sanitize', description: 'Rinse under running water, sanitize if required', nextSteps: ['prep'] },
    { id: 'prep', type: 'process', label: 'Peel & Cut', description: 'Prepare according to recipe specifications', nextSteps: ['qc2'] },
    { id: 'qc2', type: 'quality', label: 'Quality Inspection', description: 'Check cut quality and freshness', nextSteps: ['package'] },
    { id: 'package', type: 'process', label: 'Portion & Package', description: 'Package in food-grade containers', nextSteps: ['final_store'] },
    { id: 'final_store', type: 'storage', label: 'Cold Storage', description: 'Store at 0-5°C until use (max 48h)', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateVegetableFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Processing', nextSteps: ['receive'] },
    { id: 'receive', type: 'process', label: 'Receive & Verify', description: 'Check temperature, quality, and quantity', nextSteps: ['temp_check'] },
    { id: 'temp_check', type: 'decision', label: 'Temp ≤5°C?', branch: { condition: 'Temperature within range?', trueStep: 'store', falseStep: 'reject' } },
    { id: 'reject', type: 'process', label: 'Reject Shipment', description: 'Document and return compromised product', nextSteps: ['end'] },
    { id: 'store', type: 'storage', label: 'Cold Storage', description: 'Store at 0-5°C with proper humidity', nextSteps: ['wash'] },
    { id: 'wash', type: 'process', label: 'Wash & Sanitize', description: 'Thorough washing with potable water', nextSteps: ['trim'] },
    { id: 'trim', type: 'process', label: 'Trim & Peel', description: 'Remove outer layers, peel if required', nextSteps: ['cut'] },
    { id: 'cut', type: 'process', label: 'Cut to Specification', description: 'Uniform cuts for even cooking', nextSteps: ['cook_decision'] },
    { id: 'cook_decision', type: 'decision', label: 'Cook Required?', branch: { condition: 'Does recipe require cooking?', trueStep: 'cook', falseStep: 'qc' } },
    { id: 'cook', type: 'process', label: 'Cook/Blanch', description: 'Cook to specification, chill if blanched', nextSteps: ['qc'] },
    { id: 'qc', type: 'quality', label: 'Quality Check', description: 'Verify texture, color, temperature', nextSteps: ['package'] },
    { id: 'package', type: 'process', label: 'Package & Label', description: 'Portion and label with date', nextSteps: ['storage'] },
    { id: 'storage', type: 'storage', label: 'Cold Storage', description: 'Store properly until use', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateCerealFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Processing', nextSteps: ['inspect'] },
    { id: 'inspect', type: 'process', label: 'Inspect & Measure', description: 'Check for contaminants, measure quantity', nextSteps: ['rinse'] },
    { id: 'rinse', type: 'process', label: 'Rinse (if needed)', description: 'Rinse until water runs clear', nextSteps: ['measure_water'] },
    { id: 'measure_water', type: 'process', label: 'Add Water', description: 'Add correct water ratio', nextSteps: ['heat'] },
    { id: 'heat', type: 'process', label: 'Bring to Boil', description: 'Bring water to rolling boil', nextSteps: ['simmer'] },
    { id: 'simmer', type: 'process', label: 'Simmer & Cover', description: 'Reduce heat, cover tightly', nextSteps: ['timer'] },
    { id: 'timer', type: 'process', label: 'Cook per Time', description: 'Follow recipe timing precisely', nextSteps: ['check'] },
    { id: 'check', type: 'decision', label: 'Cooked Through?', branch: { condition: 'Are grains tender?', trueStep: 'rest', falseStep: 'simmer' } },
    { id: 'rest', type: 'process', label: 'Rest 5-10 min', description: 'Allow to rest covered', nextSteps: ['fluff'] },
    { id: 'fluff', type: 'process', label: 'Fluff & Serve', description: 'Fluff with fork, season if needed', nextSteps: ['hold'] },
    { id: 'hold', type: 'storage', label: 'Hot Hold or Cool', description: 'Hold above 63°C or cool rapidly', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generatePulseFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Processing', nextSteps: ['sort'] },
    { id: 'sort', type: 'process', label: 'Sort & Inspect', description: 'Remove debris and damaged pulses', nextSteps: ['wash'] },
    { id: 'wash', type: 'process', label: 'Wash Thoroughly', description: 'Rinse until water runs clear', nextSteps: ['soak_check'] },
    { id: 'soak_check', type: 'decision', label: 'Soaking Required?', branch: { condition: 'Does recipe require soaking?', trueStep: 'soak', falseStep: 'cook' } },
    { id: 'soak', type: 'process', label: 'Soak 4-12 Hours', description: 'Soak in cold water, refrigerate if long', nextSteps: ['drain'] },
    { id: 'drain', type: 'process', label: 'Drain & Rinse', description: 'Discard soaking water, rinse', nextSteps: ['cook'] },
    { id: 'cook', type: 'process', label: 'Cook Pulses', description: 'Boil or pressure cook as required', nextSteps: ['check'] },
    { id: 'check', type: 'decision', label: 'Tender?', branch: { condition: 'Are pulses properly cooked?', trueStep: 'season', falseStep: 'cook' } },
    { id: 'season', type: 'process', label: 'Season & Prepare', description: 'Add seasonings per recipe', nextSteps: ['qc'] },
    { id: 'qc', type: 'quality', label: 'Quality Check', description: 'Verify texture and flavor', nextSteps: ['store'] },
    { id: 'store', type: 'storage', label: 'Cool & Store', description: 'Cool rapidly, store refrigerated', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateDairyFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Handling', nextSteps: ['receive'] },
    { id: 'receive', type: 'process', label: 'Receive & Check Temp', description: 'Verify temperature 0-5°C', nextSteps: ['temp_ok'] },
    { id: 'temp_ok', type: 'decision', label: 'Temp OK?', branch: { condition: 'Is temperature acceptable?', trueStep: 'date_check', falseStep: 'reject' } },
    { id: 'reject', type: 'process', label: 'Reject & Document', description: 'Reject compromised products', nextSteps: ['end'] },
    { id: 'date_check', type: 'decision', label: 'Within Date?', branch: { condition: 'Is product within date code?', trueStep: 'store', falseStep: 'reject' } },
    { id: 'store', type: 'storage', label: 'Immediate Cold Storage', description: 'Store in dedicated dairy refrigerator', nextSteps: ['label'] },
    { id: 'label', type: 'process', label: 'Label with Dates', description: 'Apply receipt and use-by dates', nextSteps: ['hold'] },
    { id: 'hold', type: 'storage', label: 'Cold Storage', description: 'Maintain at 0-5°C', nextSteps: ['use'] },
    { id: 'use', type: 'process', label: 'Use by Date', description: 'Use within specified timeframe', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateNutFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Handling', nextSteps: ['receive'] },
    { id: 'receive', type: 'process', label: 'Receive & Inspect', description: 'Check quality and allergen status', nextSteps: ['quality'] },
    { id: 'quality', type: 'decision', label: 'Quality OK?', branch: { condition: 'Is product fresh and undamaged?', trueStep: 'store', falseStep: 'reject' } },
    { id: 'reject', type: 'process', label: 'Reject & Document', description: 'Reject substandard products', nextSteps: ['end'] },
    { id: 'store', type: 'storage', label: 'Allergen-Separate Storage', description: 'Store away from allergen-free items', nextSteps: ['roast_check'] },
    { id: 'roast_check', type: 'decision', label: 'Roast Required?', branch: { condition: 'Does recipe require roasting?', trueStep: 'roast', falseStep: 'process' } },
    { id: 'roast', type: 'process', label: 'Roast at 150-180°C', description: 'Roast to enhance flavor', nextSteps: ['cool'] },
    { id: 'cool', type: 'process', label: 'Cool Completely', description: 'Allow to cool before storage', nextSteps: ['process'] },
    { id: 'process', type: 'process', label: 'Process (Chop/Grind)', description: 'Process as required using dedicated equipment', nextSteps: ['label'] },
    { id: 'label', type: 'process', label: 'Label Allergen', description: 'Clear allergen warning label', nextSteps: ['final_store'] },
    { id: 'final_store', type: 'storage', label: 'Sealed Storage', description: 'Airtight container, proper labeling', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateVegetarianFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Preparation', nextSteps: ['verify'] },
    { id: 'verify', type: 'process', label: 'Verify Ingredients', description: 'Confirm all ingredients are vegetarian', nextSteps: ['vege_ok'] },
    { id: 'vege_ok', type: 'decision', label: 'All Vegetarian?', branch: { condition: 'Are all ingredients verified?', trueStep: 'equipment', falseStep: 'substitute' } },
    { id: 'substitute', type: 'process', label: 'Find Substitutes', description: 'Replace non-vegetarian items', nextSteps: ['equipment'] },
    { id: 'equipment', type: 'process', label: 'Sanitize Equipment', description: 'Ensure no meat contamination', nextSteps: ['prep'] },
    { id: 'prep', type: 'process', label: 'Prepare Ingredients', description: 'Mise en place with dedicated equipment', nextSteps: ['cook'] },
    { id: 'cook', type: 'process', label: 'Cook Process', description: 'Follow vegetarian recipe precisely', nextSteps: ['check'] },
    { id: 'check', type: 'quality', label: 'Quality Check', description: 'Verify taste and presentation', nextSteps: ['plate'] },
    { id: 'plate', type: 'process', label: 'Plate & Label', description: 'Clearly mark as vegetarian', nextSteps: ['serve'] },
    { id: 'serve', type: 'process', label: 'Serve & Communicate', description: 'Inform service staff of vegetarian status', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateNonVegFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Processing', nextSteps: ['receive'] },
    { id: 'receive', type: 'process', label: 'Receive & Temp Check', description: 'Verify temperature 0-5°C fresh, -18°C frozen', nextSteps: ['temp_ok'] },
    { id: 'temp_ok', type: 'decision', label: 'Temp OK?', branch: { condition: 'Is temperature within safe range?', trueStep: 'store', falseStep: 'reject' } },
    { id: 'reject', type: 'process', label: 'Reject & Document', description: 'Reject compromised products', nextSteps: ['end'] },
    { id: 'store', type: 'storage', label: 'Cold Storage', description: 'Store on lowest shelf, below RTE foods', nextSteps: ['thaw_check'] },
    { id: 'thaw_check', type: 'decision', label: 'Frozen?', branch: { condition: 'Is product frozen?', trueStep: 'thaw', falseStep: 'prep' } },
    { id: 'thaw', type: 'process', label: 'Thaw Safely', description: 'Thaw in refrigerator or cold water', nextSteps: ['prep'] },
    { id: 'prep', type: 'process', label: 'Prepare', description: 'Trim, portion on dedicated equipment', nextSteps: ['cook'] },
    { id: 'cook', type: 'process', label: 'Cook to Safe Temp', description: 'Cook to required internal temperature', nextSteps: ['temp_verify'] },
    { id: 'temp_verify', type: 'decision', label: 'Temp Reached?', branch: { condition: 'Is internal temp safe?', trueStep: 'rest', falseStep: 'cook' } },
    { id: 'rest', type: 'process', label: 'Rest & Hold', description: 'Rest if required, hot hold above 63°C', nextSteps: ['serve'] },
    { id: 'serve', type: 'process', label: 'Serve or Cool', description: 'Serve or cool within time limits', nextSteps: ['clean'] },
    { id: 'clean', type: 'process', label: 'Sanitize All', description: 'Clean and sanitize all equipment', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateFastFoodFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Shift', nextSteps: ['setup'] },
    { id: 'setup', type: 'process', label: 'Station Setup', description: 'Prepare mise en place and equipment', nextSteps: ['preheat'] },
    { id: 'preheat', type: 'process', label: 'Preheat Equipment', description: 'Heat griddle, fryer to proper temp', nextSteps: ['order'] },
    { id: 'order', type: 'process', label: 'Order Received', description: 'Receive order from POS', nextSteps: ['cook'] },
    { id: 'cook', type: 'process', label: 'Cook to Standard', description: 'Cook per recipe timing', nextSteps: ['timer'] },
    { id: 'timer', type: 'decision', label: 'Timer Complete?', branch: { condition: 'Is cooking time complete?', trueStep: 'assemble', falseStep: 'cook' } },
    { id: 'assemble', type: 'process', label: 'Assemble Item', description: 'Build according to standard', nextSteps: ['qc'] },
    { id: 'qc', type: 'quality', label: 'Quality Check', description: 'Verify appearance and temp', nextSteps: ['hold'] },
    { id: 'hold', type: 'storage', label: 'Hold or Serve', description: 'Hold for max time or serve', nextSteps: ['package'] },
    { id: 'package', type: 'process', label: 'Package & Serve', description: 'Package in branded materials', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Order Complete' },
  ]
}

function generateBeverageFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Preparation', nextSteps: ['setup'] },
    { id: 'setup', type: 'process', label: 'Station Setup', description: 'Prepare all ingredients and equipment', nextSteps: ['calibrate'] },
    { id: 'calibrate', type: 'process', label: 'Calibrate Equipment', description: 'Check temps, grind, pressure', nextSteps: ['order'] },
    { id: 'order', type: 'process', label: 'Order Received', description: 'Receive beverage order', nextSteps: ['type'] },
    { id: 'type', type: 'decision', label: 'Hot or Cold?', branch: { condition: 'Is beverage hot or cold?', trueStep: 'hot_prep', falseStep: 'cold_prep' } },
    { id: 'hot_prep', type: 'process', label: 'Prepare Hot Beverage', description: 'Brew, steam, or heat as required', nextSteps: ['qc'] },
    { id: 'cold_prep', type: 'process', label: 'Prepare Cold Beverage', description: 'Blend, shake, or build over ice', nextSteps: ['qc'] },
    { id: 'qc', type: 'quality', label: 'Quality Check', description: 'Verify taste, temp, appearance', nextSteps: ['garnish'] },
    { id: 'garnish', type: 'process', label: 'Add Garnish', description: 'Apply appropriate garnish', nextSteps: ['serve'] },
    { id: 'serve', type: 'process', label: 'Serve Immediately', description: 'Present on appropriate ware', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateSnackFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Preparation', nextSteps: ['prep'] },
    { id: 'prep', type: 'process', label: 'Prepare Ingredients', description: 'Portion and prepare all components', nextSteps: ['equip'] },
    { id: 'equip', type: 'process', label: 'Setup Equipment', description: 'Preheat fryer, oven, etc.', nextSteps: ['cook_method'] },
    { id: 'cook_method', type: 'decision', label: 'Cook Method?', branch: { condition: 'What cooking method?', trueStep: 'fry', falseStep: 'bake' } },
    { id: 'fry', type: 'process', label: 'Deep Fry', description: 'Fry at proper temperature', nextSteps: ['drain'] },
    { id: 'bake', type: 'process', label: 'Bake', description: 'Bake at proper temperature', nextSteps: ['cool'] },
    { id: 'drain', type: 'process', label: 'Drain Excess Oil', description: 'Drain on racks or paper', nextSteps: ['season'] },
    { id: 'cool', type: 'process', label: 'Cool Slightly', description: 'Allow to cool', nextSteps: ['season'] },
    { id: 'season', type: 'process', label: 'Season', description: 'Apply seasonings while warm', nextSteps: ['qc'] },
    { id: 'qc', type: 'quality', label: 'Quality Check', description: 'Verify texture and flavor', nextSteps: ['package'] },
    { id: 'package', type: 'process', label: 'Package or Serve', description: 'Portion and package', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}

function generateOtherFlowchart(name: string): FlowchartNode[] {
  return [
    { id: 'start', type: 'start', label: 'Begin Handling', nextSteps: ['receive'] },
    { id: 'receive', type: 'process', label: 'Receive & Inspect', description: 'Check quality and documentation', nextSteps: ['store'] },
    { id: 'store', type: 'storage', label: 'Proper Storage', description: 'Store according to requirements', nextSteps: ['prep'] },
    { id: 'prep', type: 'process', label: 'Prepare as Needed', description: 'Follow appropriate procedures', nextSteps: ['qc'] },
    { id: 'qc', type: 'quality', label: 'Quality Check', description: 'Verify quality standards', nextSteps: ['serve'] },
    { id: 'serve', type: 'process', label: 'Serve or Store', description: 'Use or store properly', nextSteps: ['end'] },
    { id: 'end', type: 'end', label: 'Complete' },
  ]
}
