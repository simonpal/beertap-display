export interface Attributes {
  unit_of_measurement: string
  icon: string
  friendly_name: string
}

export interface Context {
  id: string
  parent_id?: any
  user_id?: any
}

export interface WeightResponse {
  entity_id: string
  state: string
  attributes: Attributes
  last_changed: Date
  last_updated: Date
  context: Context
}

export interface Equipment {
  name: string
}

export interface Style {
  name: string
}

export interface BaseRecipe {
  _id: string
  name: string
  author: string
  type: string
  equipment: Equipment
  style: Style
}

export interface StorageSettings {
  brewfatherApiKey: string
  brewfatherUserId: string
  kegs: string[]
  noKegs: number
  connectedDisplay: boolean
}
