// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type HomeDocumentDataSlicesSlice =
  | AccomodationSlice
  | RegistrySlice
  | TravelSlice
  | PlaceSlice
  | PartySlice
  | RsvpSlice
  | BioSlice
  | HeroSlice;

/**
 * Content for Wedding documents
 */
interface HomeDocumentData {
  /**
   * Slice Zone field in *Wedding*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Title field in *Wedding*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Wedding*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Wedding*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Wedding document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

/**
 * Item in *Menu → Navigation*
 */
export interface MenuDocumentDataNavigationItem {
  /**
   * Link field in *Menu → Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.navigation[].link
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  link: prismic.KeyTextField;

  /**
   * Label field in *Menu → Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.navigation[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;
}

type MenuDocumentDataSlicesSlice = never;

/**
 * Content for Menu documents
 */
interface MenuDocumentData {
  /**
   * Navigation field in *Menu*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.navigation[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation: prismic.GroupField<Simplify<MenuDocumentDataNavigationItem>>;

  /**
   * Slice Zone field in *Menu*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<MenuDocumentDataSlicesSlice> /**
   * Meta Title field in *Menu*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: menu.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Menu*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: menu.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Menu*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Menu document from Prismic
 *
 * - **API ID**: `menu`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MenuDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<MenuDocumentData>, "menu", Lang>;

export type AllDocumentTypes = HomeDocument | MenuDocument;

/**
 * Item in *Accomodation → Default → Primary → hotels*
 */
export interface AccomodationSliceDefaultPrimaryHotelsItem {
  /**
   * Name field in *Accomodation → Default → Primary → hotels*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.hotels[].name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * image field in *Accomodation → Default → Primary → hotels*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.hotels[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Information field in *Accomodation → Default → Primary → hotels*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.hotels[].information
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  information: prismic.RichTextField;

  /**
   * Website field in *Accomodation → Default → Primary → hotels*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.hotels[].website
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  website: prismic.KeyTextField;
}

/**
 * Primary content in *Accomodation → Default → Primary*
 */
export interface AccomodationSliceDefaultPrimary {
  /**
   * Ttitle field in *Accomodation → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.ttitle
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  ttitle: prismic.KeyTextField;

  /**
   * Introduction field in *Accomodation → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.introduction
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  introduction: prismic.KeyTextField;

  /**
   * hotels field in *Accomodation → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: accomodation.default.primary.hotels[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  hotels: prismic.GroupField<
    Simplify<AccomodationSliceDefaultPrimaryHotelsItem>
  >;
}

/**
 * Default variation for Accomodation Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AccomodationSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<AccomodationSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Accomodation*
 */
type AccomodationSliceVariation = AccomodationSliceDefault;

/**
 * Accomodation Shared Slice
 *
 * - **API ID**: `accomodation`
 * - **Description**: Accomodation
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AccomodationSlice = prismic.SharedSlice<
  "accomodation",
  AccomodationSliceVariation
>;

/**
 * Primary content in *Bio → Default → Primary*
 */
export interface BioSliceDefaultPrimary {
  /**
   * Text field in *Bio → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: bio.default.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;
}

/**
 * Default variation for Bio Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BioSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BioSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Bio*
 */
type BioSliceVariation = BioSliceDefault;

/**
 * Bio Shared Slice
 *
 * - **API ID**: `bio`
 * - **Description**: Bio
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BioSlice = prismic.SharedSlice<"bio", BioSliceVariation>;

/**
 * Item in *Hero → Default → Primary → items*
 */
export interface HeroSliceDefaultPrimaryItemsItem {
  /**
   * Background Image field in *Hero → Default → Primary → items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.items[].background_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  background_image: prismic.ImageField<never>;
}

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
  /**
   * Title field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Wedding Date field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.wedding_date
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  wedding_date: prismic.KeyTextField;

  /**
   * items field in *Hero → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.items[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  items: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *Party → Default → Primary → events*
 */
export interface PartySliceDefaultPrimaryEventsItem {
  /**
   * Event Title field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].event_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  event_title: prismic.KeyTextField;

  /**
   * Description field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Location field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].location
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  location: prismic.KeyTextField;

  /**
   * Image field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Map field in *Party → Default → Primary → events*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].map
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  map: prismic.GeoPointField;

  /**
   * Event Day field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].event_day
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  event_day: prismic.KeyTextField;

  /**
   * Event Time field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].event_time
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  event_time: prismic.KeyTextField;

  /**
   * Event Date field in *Party → Default → Primary → events*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[].event_date
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  event_date: prismic.KeyTextField;
}

/**
 * Primary content in *Party → Default → Primary*
 */
export interface PartySliceDefaultPrimary {
  /**
   * events field in *Party → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: party.default.primary.events[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  events: prismic.GroupField<Simplify<PartySliceDefaultPrimaryEventsItem>>;
}

/**
 * Default variation for Party Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PartySliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<PartySliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Party*
 */
type PartySliceVariation = PartySliceDefault;

/**
 * Party Shared Slice
 *
 * - **API ID**: `party`
 * - **Description**: Party
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PartySlice = prismic.SharedSlice<"party", PartySliceVariation>;

/**
 * Item in *Place → Default → Primary → Places*
 */
export interface PlaceSliceDefaultPrimaryPlacesItem {
  /**
   * Name field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * address field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].address
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  address: prismic.KeyTextField;

  /**
   * location field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].location
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  location: prismic.GeoPointField;

  /**
   * description field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Picture field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].picture
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  picture: prismic.ImageField<never>;

  /**
   * Link field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].link
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  link: prismic.KeyTextField;

  /**
   * type field in *Place → Default → Primary → Places*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[].type
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  type: prismic.SelectField<"eat" | "drink" | "do">;
}

/**
 * Primary content in *Place → Default → Primary*
 */
export interface PlaceSliceDefaultPrimary {
  /**
   * Main Image field in *Place → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.main_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  main_image: prismic.ImageField<never>;

  /**
   * Title field in *Place → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Places field in *Place → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: place.default.primary.places[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  places: prismic.GroupField<Simplify<PlaceSliceDefaultPrimaryPlacesItem>>;
}

/**
 * Default variation for Place Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PlaceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<PlaceSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Place*
 */
type PlaceSliceVariation = PlaceSliceDefault;

/**
 * Place Shared Slice
 *
 * - **API ID**: `place`
 * - **Description**: Place
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PlaceSlice = prismic.SharedSlice<"place", PlaceSliceVariation>;

/**
 * Item in *Registry → Default → Primary → gifts*
 */
export interface RegistrySliceDefaultPrimaryGiftsItem {
  /**
   * Gift Title field in *Registry → Default → Primary → gifts*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.gifts[].gift_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  gift_title: prismic.KeyTextField;

  /**
   * Gift Description field in *Registry → Default → Primary → gifts*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.gifts[].gift_description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  gift_description: prismic.RichTextField;

  /**
   * Image field in *Registry → Default → Primary → gifts*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.gifts[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;
}

/**
 * Primary content in *Registry → Default → Primary*
 */
export interface RegistrySliceDefaultPrimary {
  /**
   * Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Description field in *Registry → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Instruction Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.instruction_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  instruction_title: prismic.KeyTextField;

  /**
   * Gift Card Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.gift_card_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  gift_card_title: prismic.KeyTextField;

  /**
   * Generate Gift PDF Button field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.generate_gift_pdf
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  generate_gift_pdf: prismic.KeyTextField;

  /**
   * Personal Message field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.personal_message
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  personal_message: prismic.KeyTextField;

  /**
   * Amount field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.amount
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  amount: prismic.KeyTextField;

  /**
   * Name field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * Email field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.email
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  email: prismic.KeyTextField;

  /**
   * gifts field in *Registry → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.gifts[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  gifts: prismic.GroupField<Simplify<RegistrySliceDefaultPrimaryGiftsItem>>;

  /**
   * Brazilian Instructions Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.brazilian_instructions_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  brazilian_instructions_title: prismic.KeyTextField;

  /**
   * Brazilian Instructions field in *Registry → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.brazilian_instructions
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  brazilian_instructions: prismic.RichTextField;

  /**
   * US Instructions Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.us_instructions_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  us_instructions_title: prismic.KeyTextField;

  /**
   * US Instructions field in *Registry → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.us_instructions
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  us_instructions: prismic.RichTextField;

  /**
   * Dutch Instructions Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.dutch_instructions_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  dutch_instructions_title: prismic.KeyTextField;

  /**
   * Dutch Instructions field in *Registry → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.dutch_instructions
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  dutch_instructions: prismic.RichTextField;

  /**
   * Cash Instructions Title field in *Registry → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.cash_instructions_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  cash_instructions_title: prismic.KeyTextField;

  /**
   * Cash Instructions field in *Registry → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: registry.default.primary.cash_instructions
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  cash_instructions: prismic.RichTextField;
}

/**
 * Default variation for Registry Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RegistrySliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<RegistrySliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Registry*
 */
type RegistrySliceVariation = RegistrySliceDefault;

/**
 * Registry Shared Slice
 *
 * - **API ID**: `registry`
 * - **Description**: Registry
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RegistrySlice = prismic.SharedSlice<
  "registry",
  RegistrySliceVariation
>;

/**
 * Primary content in *Rsvp → Default → Primary*
 */
export interface RsvpSliceDefaultPrimary {
  /**
   * Deadline field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.deadline
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  deadline: prismic.KeyTextField;

  /**
   * Email Input field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.email_input
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  email_input: prismic.RichTextField;

  /**
   * Invitation Lookup field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.invitation_lookup
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  invitation_lookup: prismic.RichTextField;

  /**
   * Invitation CheckBoxes field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.invitation_checkboxes
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  invitation_checkboxes: prismic.RichTextField;

  /**
   * Attending field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.attending
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  attending: prismic.RichTextField;

  /**
   * Events Selection field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.events_selection
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  events_selection: prismic.RichTextField;

  /**
   * Food Selection field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.food_selection
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  food_selection: prismic.RichTextField;

  /**
   * Allergy Selection field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.allergy_selection
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  allergy_selection: prismic.RichTextField;

  /**
   * Song Suggestion field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.song_suggestion
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  song_suggestion: prismic.RichTextField;

  /**
   * Closing Line field in *Rsvp → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: rsvp.default.primary.closing_line
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  closing_line: prismic.KeyTextField;
}

/**
 * Default variation for Rsvp Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RsvpSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<RsvpSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Rsvp*
 */
type RsvpSliceVariation = RsvpSliceDefault;

/**
 * Rsvp Shared Slice
 *
 * - **API ID**: `rsvp`
 * - **Description**: Rsvp
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RsvpSlice = prismic.SharedSlice<"rsvp", RsvpSliceVariation>;

/**
 * Item in *Travel → Default → Primary → Type*
 */
export interface TravelSliceDefaultPrimaryTypeItem {
  /**
   * Logo field in *Travel → Default → Primary → Type*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.type[].logo
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * Title field in *Travel → Default → Primary → Type*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.type[].title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * description field in *Travel → Default → Primary → Type*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.type[].description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Link field in *Travel → Default → Primary → Type*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.type[].link
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  link: prismic.KeyTextField;
}

/**
 * Primary content in *Travel → Default → Primary*
 */
export interface TravelSliceDefaultPrimary {
  /**
   * Title field in *Travel → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Description field in *Travel → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Type field in *Travel → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: travel.default.primary.type[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  type: prismic.GroupField<Simplify<TravelSliceDefaultPrimaryTypeItem>>;
}

/**
 * Default variation for Travel Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TravelSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<TravelSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Travel*
 */
type TravelSliceVariation = TravelSliceDefault;

/**
 * Travel Shared Slice
 *
 * - **API ID**: `travel`
 * - **Description**: Travel
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TravelSlice = prismic.SharedSlice<"travel", TravelSliceVariation>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataSlicesSlice,
      MenuDocument,
      MenuDocumentData,
      MenuDocumentDataNavigationItem,
      MenuDocumentDataSlicesSlice,
      AllDocumentTypes,
      AccomodationSlice,
      AccomodationSliceDefaultPrimaryHotelsItem,
      AccomodationSliceDefaultPrimary,
      AccomodationSliceVariation,
      AccomodationSliceDefault,
      BioSlice,
      BioSliceDefaultPrimary,
      BioSliceVariation,
      BioSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimaryItemsItem,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      PartySlice,
      PartySliceDefaultPrimaryEventsItem,
      PartySliceDefaultPrimary,
      PartySliceVariation,
      PartySliceDefault,
      PlaceSlice,
      PlaceSliceDefaultPrimaryPlacesItem,
      PlaceSliceDefaultPrimary,
      PlaceSliceVariation,
      PlaceSliceDefault,
      RegistrySlice,
      RegistrySliceDefaultPrimaryGiftsItem,
      RegistrySliceDefaultPrimary,
      RegistrySliceVariation,
      RegistrySliceDefault,
      RsvpSlice,
      RsvpSliceDefaultPrimary,
      RsvpSliceVariation,
      RsvpSliceDefault,
      TravelSlice,
      TravelSliceDefaultPrimaryTypeItem,
      TravelSliceDefaultPrimary,
      TravelSliceVariation,
      TravelSliceDefault,
    };
  }
}
