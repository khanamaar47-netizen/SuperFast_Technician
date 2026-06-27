/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  basePrice?: number;
  tags?: string[];
  features?: string[];
  warranty?: string;
}

export interface BookingState {
  serviceId: string;
  subServiceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredDate: string;
  preferredSlot: string;
  address: string;
  landmark?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  serviceType: string;
  date: string;
}

export interface ServiceLocation {
  zipCode: string;
  suburb: string;
  status: "active" | "limited" | "unavailable";
}
