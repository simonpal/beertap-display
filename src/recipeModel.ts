export interface Created {
  _seconds: number
  _nanoseconds: number
}

export interface Timestamp {
  _seconds: number
  _nanoseconds: number
}

export interface Created2 {
  _seconds: number
  _nanoseconds: number
}

export interface Hop {
  usage: string
  bestBeforeDate?: any
  _version: string
  year?: any
  time: number
  _rev: string
  userNotes: string
  alpha: number
  notes: string
  origin: string
  name: string
  temp?: any
  _id: string
  _timestamp_ms: number
  _timestamp: Timestamp
  manufacturingDate?: any
  _created: Created2
  usedIn: string
  inventory: number
  ibu: number
  _editFlag: boolean
  use: string
  substitutes: string
  amount: number
  type: string
  actualTime?: number
}

export interface Timestamp2 {
  _seconds: number
  _nanoseconds: number
}

export interface Step {
  stepTime: number
  type: string
  stepTemp: number
}

export interface Fermentation {
  steps: Step[]
  _id: string
  name: string
}

export interface Defaults {
  preferred: string
  volume: string
  temp: string
  hop: string
  abv: string
  grainColor: string
  attenuation: string
  pressure: string
  ibu: string
  gravity: string
  altitude: string
  carbonation: string
  color: string
  weight: string
}

export interface Calories {
  alcohol: number
  total: number
  carbs: number
  kJ: number
}

export interface Carbs {
  total: number
}

export interface Nutrition {
  calories: Calories
  carbs: Carbs
}

export interface Equipment {
  boilSize: number
  mashWaterMin: number
  spargeTemperature?: any
  fermenterVolumeBeforeTopUp: number
  mashTunLoss: number
  name: string
  spargeWaterMax?: any
  boilOffPerHr: number
  ambientTemperature?: any
  batchSize: number
  boilTime: number
  calcMashEfficiency: boolean
  postBoilKettleVol: number
  spargeWaterFormula: string
  efficiencyType: string
  mashEfficiency: number
  calcBoilVolume: boolean
  hltDeadSpace: number
  efficiency: number
  mashWaterVolumeLimitEnabled: boolean
  fermenterVolume: number
  bottlingVolume: number
  mashTunDeadSpace: number
  _id: string
  hidden: boolean
  mashWaterFormula: string
  spargeWaterOverflow: string
  calcStrikeWaterTemperature: boolean
  fermenterLoss: number
  evaporationRate: number
  trubChillerLoss: number
  hopUtilization: number
  calcAromaHopUtilization: boolean
  mashWaterMax: number
  hopstandTemperature: number
  aromaHopUtilization: number
  fermenterLossEstimate: number
  waterCalculation: string
}

export interface Timestamp3 {
  _seconds: number
  _nanoseconds: number
}

export interface Created3 {
  _seconds: number
  _nanoseconds: number
}

export interface MashFermentable {
  bestBeforeDate?: any
  _rev: string
  _timestamp: Timestamp3
  _timestamp_ms: any
  usedIn: string
  _created: Created3
  ibuPerAmount?: any
  _id: string
  _version: string
  grainCategory: string
  potential: number
  percentage: number
  amount: number
  costPerAmount?: any
  color: number
  diastaticPower?: any
  type: string
  attenuation?: number
  userNotes: string
  protein?: any
  potentialPercentage: number
  manufacturingDate?: any
  moisture?: any
  inventory?: number
  origin: string
  substitutes: string
  notFermentable: boolean
  name: string
  notes: string
  supplier: string
  hidden: boolean
  lovibond?: number
}

export interface Created4 {
  _seconds: number
  _nanoseconds: number
}

export interface Timestamp4 {
  _seconds: number
  _nanoseconds: number
}

export interface OtherFermentable {
  supplier: string
  manufacturingDate?: any
  costPerAmount?: any
  origin: string
  userNotes: string
  moisture?: any
  protein?: any
  percentage: number
  inventory: number
  amount: number
  diastaticPower?: any
  notFermentable: boolean
  name: string
  ibuPerAmount?: any
  _id: string
  _created: Created4
  hidden: boolean
  _timestamp: Timestamp4
  _timestamp_ms: any
  bestBeforeDate?: any
  _rev: string
  attenuation: number
  potentialPercentage: number
  notes: string
  type: string
  _version: string
  usedIn: string
  potential: number
  substitutes: string
  color: number
}

export interface Data {
  otherFermentablesAmount: number
  mashFermentables: MashFermentable[]
  totalDiastaticPower: number
  mashWaterAmount: number
  strikeTemp?: any
  spargeWaterAmount: number
  hopsAmount: number
  mashVolumeSurplus: number
  topUpWater: number
  mashFermentablesAmount: number
  hltWaterAmount: number
  mashVolume: number
  totalWaterAmount: number
  otherFermentables: OtherFermentable[]
}

export interface Misc {
  name: string
  unit: string
  amount: number
  type: string
  time?: number
  use: string
}

export interface Mash {
  chloride: number
  sodium: number
  soClRatio: number
  sulfate: number
  magnesium: number
  ionBalance: number
  residualAlkalinity: number
  _id: string
  ph: number
  bicarbonateMeqL: number
  type: string
  anions: number
  name: string
  ionBalanceOff: boolean
  cations: number
  alkalinity: number
  hardness: number
  calcium: number
  bicarbonate: number
  residualAlkalinityMeqLCalc: number
}

export interface TotalAdjustments {
  sulfate: number
  sodiumMetabisulfitePPM: number
  calciumSulfate: number
  calciumHydroxide: number
  sodiumMetabisulfite: number
  chloride: number
  magnesiumSulfate: number
  volume: number
  sodium: number
  calciumChloride: number
  calciumCarbonate: number
  sodiumChloride: number
  calcium: number
  magnesiumChloride: number
  sodiumBicarbonate: number
  magnesium: number
  bicarbonate: number
}

export interface Acid {
  amount: number
  alkalinityMeqL: number
  type: string
  concentration: number
}

export interface MashAdjustments {
  magnesiumSulfate?: any
  acids: Acid[]
  bicarbonate: number
  sodiumMetabisulfite: number
  calciumChloride?: any
  chloride: number
  calciumSulfate?: any
  magnesiumChloride: number
  calciumHydroxide?: any
  sodiumBicarbonate?: any
  sodium: number
  sodiumMetabisulfitePPM: number
  calcium: number
  sodiumChloride: number
  calciumCarbonate: number
  magnesium: number
  volume: number
  sulfate: number
}

export interface Sparge {
  sulfate: number
  magnesium: number
  cations: number
  bicarbonateMeqL: number
  residualAlkalinityMeqLCalc: number
  type: string
  anions: number
  ph: number
  soClRatio: number
  residualAlkalinity: number
  bicarbonate: number
  hardness: number
  ionBalanceOff: boolean
  alkalinity: number
  name: string
  calcium: number
  ionBalance: number
  sodium: number
  _id: string
  chloride: number
}

export interface Meta {
  equalSourceTotal: boolean
}

export interface Acid2 {
  type: string
  concentration: number
  amount: number
}

export interface SpargeAdjustments {
  volume: number
  chloride: number
  magnesium: number
  magnesiumSulfate: number
  sodiumMetabisulfite: number
  sodiumChloride: number
  sodiumMetabisulfitePPM: number
  acids: Acid2[]
  magnesiumChloride: number
  sodiumBicarbonate: number
  calciumSulfate: number
  calciumCarbonate: number
  calciumChloride: number
  calcium: number
  calciumHydroxide: number
  bicarbonate: number
  sulfate: number
  sodium: number
}

export interface Total {
  sulfate: number
  ionBalance: number
  ph: number
  hardness: number
  _id: string
  alkalinity: number
  anions: number
  sodium: number
  bicarbonate: number
  residualAlkalinity: number
  magnesium: number
  soClRatio: number
  name: string
  bicarbonateMeqL: number
  cations: number
  ionBalanceOff: boolean
  type: string
  calcium: number
  residualAlkalinityMeqLCalc: number
  chloride: number
}

export interface Source {
  _id: string
  ionBalance: number
  cations: number
  ionBalanceOff: boolean
  calcium: number
  soClRatio: number
  sulfate: number
  alkalinity: number
  magnesium: number
  residualAlkalinityMeqLCalc: number
  bicarbonateMeqL: number
  sodium: number
  hardness: number
  anions: number
  name: string
  ph: number
  residualAlkalinity: number
  chloride: number
  bicarbonate: number
  type: string
}

export interface SodiumBicarbonate {
  mash: boolean
  auto: boolean
  sparge: boolean
}

export interface CalciumSulfate {
  mash: boolean
  auto: boolean
  sparge: boolean
}

export interface CalciumChloride {
  auto: boolean
  sparge: boolean
  mash: boolean
  form: string
}

export interface CalciumHydroxide {
  auto: boolean
  sparge: boolean
  mash: boolean
}

export interface MagnesiumSulfate {
  mash: boolean
  auto: boolean
  sparge: boolean
}

export interface Settings {
  sodiumBicarbonate: SodiumBicarbonate
  calciumSulfate: CalciumSulfate
  adjustSparge: boolean
  calciumChloride: CalciumChloride
  calciumHydroxide: CalciumHydroxide
  magnesiumSulfate: MagnesiumSulfate
}

export interface Water {
  mashPh: number
  mash: Mash
  totalAdjustments: TotalAdjustments
  acidPhAdjustment: number
  mashAdjustments: MashAdjustments
  sparge: Sparge
  diluted?: any
  spargeAcidPhAdjustment: number
  mashWaterAmount?: any
  mashTargetDiff?: any
  meta: Meta
  spargeTargetDiff?: any
  mashPhDistilled: number
  enableSpargeAdjustments: boolean
  sourceTargetDiff?: any
  dilutionPercentage?: any
  spargeAdjustments: SpargeAdjustments
  spargeWaterAmount?: any
  total: Total
  source: Source
  settings: Settings
  totalTargetDiff?: any
}

export interface Timestamp5 {
  _seconds: number
  _nanoseconds: number
}

export interface Created5 {
  _seconds: number
  _nanoseconds: number
}

export interface Yeast {
  _timestamp_ms: number
  productId: string
  minTemp: number
  hidden: boolean
  bestBeforeDate?: any
  maxTemp: number
  amount: number
  maxAbv?: any
  form: string
  _timestamp: Timestamp5
  _id: string
  description: string
  laboratory: string
  type: string
  maxAttenuation?: any
  minAttenuation?: any
  userNotes: string
  _created: Created5
  _rev: string
  attenuation: number
  fermentsAll: boolean
  _version: string
  unit: string
  manufacturingDate?: any
  name: string
  inventory: number
  flocculation: string
}

export interface CarbonationStyle {
  _id: string
  name: string
  carbMax: number
  carbMin: number
}

export interface Style {
  abvMax: number
  rbrMax: number
  rbrMin: number
  styleLetter: string
  type: string
  abvMin: number
  colorMax: number
  styleGuide: string
  buGuMin: number
  name: string
  ibuMax: number
  fgMin: number
  ogMin: number
  lovibondMin: number
  _id: string
  categoryNumber: string
  ibuMin: number
  fgMax: number
  carbonationStyle: string
  colorMin: number
  lovibondMax: number
  ogMax: number
  category: string
  buGuMax: number
}

export interface Step2 {
  name: string
  type: string
  stepTemp: number
  stepTime: number
}

export interface Mash2 {
  _id: string
  name: string
  steps: Step2[]
}

export interface Timestamp6 {
  _seconds: number
  _nanoseconds: number
}

export interface Created6 {
  _seconds: number
  _nanoseconds: number
}

export interface Fermentable {
  _version: string
  userNotes: string
  inventory?: number
  potentialPercentage: number
  _timestamp_ms: any
  amount: number
  moisture?: any
  hidden: boolean
  grainCategory: string
  protein?: any
  _rev: string
  substitutes: string
  manufacturingDate?: any
  origin: string
  usedIn: string
  diastaticPower?: any
  potential: number
  percentage: number
  color: number
  supplier: string
  costPerAmount?: any
  notes: string
  bestBeforeDate?: any
  _timestamp: Timestamp6
  type: string
  _id: string
  _created: Created6
  attenuation?: number
  name: string
  notFermentable: boolean
  ibuPerAmount?: any
  lovibond?: number
  fgdb?: string | number
  acid?: string | number
  cgdb?: string | number
  maxInBatch?: number
  friability?: string | number
  coarseFineDiff?: number
  fan?: string | number
}

export interface FullRecipe {
  _origin: string
  attenuation: number
  abv: number
  searchTags: string[]
  boilSize: number
  styleColor: boolean
  _created: Created
  styleAbv: boolean
  ibuFormula: string
  hopStandMinutes: number
  hops: Hop[]
  efficiency: number
  _id: string
  _version: string
  postBoilGravity: number
  batchSize: number
  avgWeightedHopstandTemp: number
  styleConformity: boolean
  buGuRatio: number
  _share: string
  fgEstimated: number
  hopsTotalAmount: number
  mashEfficiency: number
  boilTime: number
  styleOg: boolean
  totalGravity: number
  _rev: string
  styleIbu: boolean
  fg: number
  _timestamp: Timestamp2
  styleCarb: boolean
  fermentation: Fermentation
  og: number
  defaults: Defaults
  primaryTemp: number
  origin?: any
  sumDryHopPerLiter: number
  path: string
  nutrition: Nutrition
  equipment: Equipment
  styleFg: boolean
  author: string
  data: Data
  miscs: Misc[]
  hidden: boolean
  rbRatio: number
  ogPlato: number
  fermentablesTotalAmount: number
  firstWortGravity?: any
  fgFormula: string
  water: Water
  styleBuGu: boolean
  yeasts: Yeast[]
  diastaticPower: number
  preBoilGravity: number
  _init: boolean
  _ev: number
  teaser: string
  carbonation: number
  ibu: number
  _uid?: any
  _public: boolean
  fermentableIbu: number
  type: string
  public: boolean
  carbonationStyle: CarbonationStyle
  yeastToleranceExceededBy?: any
  styleRbr: boolean
  style: Style
  mash: Mash2
  color: number
  tags?: any
  extraGravity: number
  _type: string
  fermentables: Fermentable[]
  name: string
  _timestamp_ms: number
}
