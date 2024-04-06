import { ApiResponse } from "./api-response.interface";

export interface HotelsByCoordinates extends ApiResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: Data;
}

export interface Data {
  applied_filters: any[];
  count: number;
  extended_count: number;
  unfiltered_count: number;
  page_loading_threshold: number;
  has_low_availability: string;
  unfiltered_primary_count: number;
  result: Result[];
  primary_count: number;
  room_distribution: RoomDistribution[];
  b_max_los_data: BMaxLosData;
}

export interface Result {
  checkout: Checkout;
  class_is_estimated: number;
  has_free_parking?: number;
  is_free_cancellable: number;
  is_genius_deal: number;
  genius_discount_percentage: number;
  badges: Badge[];
  city_in_trans: string;
  hotel_has_vb_boost: number;
  review_score_word: string;
  review_nr: number;
  unit_configuration_label: string;
  type: string;
  city: string;
  hotel_include_breakfast?: number;
  default_language: string;
  hotel_name_trans: string;
  is_no_prepayment_block: number;
  extended: number;
  preferred_plus: number;
  checkin: Checkin;
  review_score: number;
  countrycode: string;
  is_smart_deal: number;
  updated_checkin: any;
  main_photo_id: number;
  main_photo_url: string;
  ufi: number;
  children_not_allowed: any;
  id: string;
  composite_price_breakdown: CompositePriceBreakdown;
  preferred: number;
  accommodation_type: number;
  hotel_id: number;
  min_total_price: number;
  cant_book: any;
  class: number;
  soldout: number;
  last_reservation_data: LastReservationData;
  timezone: string;
  default_wishlist_name: string;
  updated_checkout: any;
  distances: Distance[];
  block_ids: string[];
  is_geo_rate: any;
  longitude: number;
  latitude: number;
  hotel_name: string;
  currencycode: string;
  has_swimming_pool?: number;
  urgency_message?: string;
  ribbon_text?: string;
  booking_home?: BookingHome;
}

export interface Checkout {
  until: string;
  from: string;
}

export interface Badge {
  text: string;
  badge_variant: string;
  id: string;
}

export interface Checkin {
  until: string;
  from: string;
}

export interface CompositePriceBreakdown {
  gross_amount_per_night: GrossAmountPerNight;
  included_taxes_and_charges_amount: IncludedTaxesAndChargesAmount;
  excluded_amount: ExcludedAmount;
  items: Item[];
  strikethrough_amount_per_night?: StrikethroughAmountPerNight;
  gross_amount: GrossAmount;
  has_long_stays_weekly_rate_price: number;
  charges_details: ChargesDetails;
  benefits: Benefit[];
  has_long_stays_monthly_rate_price: number;
  discounted_amount?: DiscountedAmount;
  all_inclusive_amount: AllInclusiveAmount;
  net_amount: NetAmount;
  strikethrough_amount?: StrikethroughAmount;
  gross_amount_hotel_currency: GrossAmountHotelCurrency;
}

export interface GrossAmountPerNight {
  currency: string;
  value: number;
}

export interface IncludedTaxesAndChargesAmount {
  value: number;
  currency: string;
}

export interface ExcludedAmount {
  value: number;
  currency: string;
}

export interface Item {
  inclusion_type?: string;
  kind: string;
  item_amount: ItemAmount;
  details?: string;
  name: string;
  base: Base;
  identifier?: string;
}

export interface ItemAmount {
  currency: string;
  value: number;
}

export interface Base {
  base_amount?: number;
  kind: string;
  percentage?: number;
}

export interface StrikethroughAmountPerNight {
  value: number;
  currency: string;
}

export interface GrossAmount {
  value: number;
  currency: string;
}

export interface ChargesDetails {
  mode: string;
  amount: Amount;
  translated_copy: string;
}

export interface Amount {
  currency: string;
  value: number;
}

export interface Benefit {
  badge_variant: string;
  identifier: string;
  name: string;
  details: string;
  icon: any;
  kind: string;
}

export interface DiscountedAmount {
  currency: string;
  value: number;
}

export interface AllInclusiveAmount {
  currency: string;
  value: number;
}

export interface NetAmount {
  currency: string;
  value: number;
}

export interface StrikethroughAmount {
  currency: string;
  value: number;
}

export interface GrossAmountHotelCurrency {
  currency: string;
  value: number;
}

export interface LastReservationData {
  last_reservation_ellapsed_months: number;
}

export interface Distance {
  text: string;
  icon_name: string;
  icon_set: any;
}

export interface BookingHome {
  is_booking_home: number;
  quality_class: number;
  segment: number;
  group: string;
  is_single_unit_property: string;
}

export interface RoomDistribution {
  adults: string;
  children: any[];
}

export interface BMaxLosData {
  has_extended_los: number;
  max_allowed_los: number;
  default_los: number;
  extended_los: number;
  experiment: string;
  is_fullon: number;
}
