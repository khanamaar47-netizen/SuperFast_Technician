/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from "react";
import { 
  Bolt, 
  Phone, 
  MessageSquare, 
  MessageCircle,
  Menu, 
  X, 
  Play, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Search, 
  CheckCircle, 
  Plus, 
  Minus, 
  HelpCircle, 
  Compass, 
  Wrench, 
  WashingMachine, 
  Microwave, 
  Flame, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Share2,
  Lock,
  ChevronDown,
  Calendar,
  AlertTriangle,
  Wind
} from "lucide-react";
import { ServiceItem } from "./types";
import BookingModal from "./components/BookingModal";
import PricingEstimator from "./components/PricingEstimator";
import ReviewSection from "./components/ReviewSection";
// @ts-ignore
import acOutdoorUnits from "./assets/images/ac_outdoor_units_1782153185462.jpg";
// @ts-ignore
import acIndoorUnit from "./assets/images/ac_indoor_unit_1782153370776.jpg";
// @ts-ignore
import heatPumpInstallation from "./assets/images/heat_pump_installation_1782568417113.jpg";
// @ts-ignore
import microwaveOven from "./assets/images/microwave_oven_repair_1782569312063.jpg";

const logoIcon = "/favicon.svg";
const logoFull = "/logo_full.svg";

// Precise high-res services catalog
const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ac",
    name: "AC Services",
    description: "Complete cooling solutions: Split AC, Commercial AC, Centralized AC, Ductable AC, VRF/VRV systems, AMC, Installation, and Uninstallation.",
    image: acOutdoorUnits,
    tags: ["Commercial & Split AC", "Centralized & Ductable", "VRF / VRV Service", "Annual Maintenance Contract", "Installation & Dismantling"],
    features: [
      "Split AC Service (Deep Clean & Care)",
      "Commercial & Centralized AC Repair",
      "Ductable AC Service & Inspection",
      "VRF & VRV AC System Maintenance",
      "Expert AC Installation & Uninstallation",
      "Annual Maintenance Contract (AMC) Plans"
    ],
    warranty: "90-Day Warranty"
  },
  {
    id: "washing-machine",
    name: "Washing Machine",
    description: "Specialized service for both Front Load and Top Load models. Belt & drain repair.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALRa5WpDslDTas7Z9-gACbLLbo5VLr6ywEFxqzAOSMf1YcntNZCK2B2PPvGBY0mw3oL8_YzvHKHUUCWW4xvyeG_lld_uF_um7hEm2_-mfr7ul81wCQay0BqNUCUuk2dADA-WwH3NBEnH69GNY8sKTmb-NGiIfZDFbeWTNAhwSiZJJ43BPo3Q1-oPBASMq7DHWAXfrwTI4pU74_kWAMmEnOXGtSBKEmUApQOoBmhGzzFw6_2vMCewRM4qLjKYnY1sW0wD264UDsQvPu",
    tags: ["Automatic", "Semi-Auto", "Inverter Motor"],
    features: ["Drum alignments", "Water drain flush", "Solenoid coil repair"],
    warranty: "90-Day Warranty"
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    description: "All models and types repaired: Single door, Double door, and spacious Side-by-Side setups.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVUBhwRYuOhLTUUofMqCeA7b8z9hwZWC6POtgun-JWDJlRZtACd6YRJT4RD6s4v_QnT658532O8akHRayNZdyT4hBwaVwY3ro53rD3DjUqgIT21NTYKxB9RlKgAENzCjkN5iM79iqnSDoPlNbCqxEdFWYHVTMV6Qz8ELkBPj_G9gZ_xS2KNUXin_RDHt7tM6_Vnn6XPwAhwukzNN0D6hoKWj9l7F83xRIOPemFrv1lxB4GfBdSne9MVnPEoj88PkWmCBl0P7cYep_A",
    tags: ["No-Frost", "Relay Swap", "Gas topping"],
    features: ["Compressor checks", "Gas charging", "Thermostat tuning"],
    warranty: "90-Day Warranty"
  },
  {
    id: "microwave",
    name: "Microwave Oven",
    description: "Expert microwave repairs for all leading brands. Magnetron, touch panel & thermal fuse replaced.",
    image: microwaveOven,
    tags: ["No Heating Fix", "Panel Sparking", "Coupling Repair"],
    features: ["Magnetron change", "HV diode test", "Turntable alignment"],
    warranty: "90-Day Warranty"
  },
  {
    id: "water-heater",
    name: "Water Heater",
    description: "Quick installation and repair for all geyser types to ensure hot water whenever you need.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe5Y1TEJatXiZRYPR1LRITdbODNkU5sWaqOFYcKYUBe5Xd9SlAlW97zerK9G9oy5e7eo8FFf57ETC_0WBEpI0KW4rMcnBlu5FgDbI0UpO6Zo8u7ErPRKuneyybC_8CdMktf5PSLE_4MC5XO2OSg5Ytax-tQ9waXxw-cZbq4dJ_Ep91ifbPZaH_MbmPfjnWDQN_8e1_4WUWT8EjGg2tP387da2_uEjiVJQvP6_arv48HoZWhllKqJPjszGOLVm0nQJj32hIRWg4dY3_",
    tags: ["Geyser Safe", "Heating Element", "Auto cut-off"],
    features: ["Element replacement", "Auto cut-out repairs", "Plumbing couplings"],
    warranty: "90-Day Warranty"
  },
  {
    id: "heat-pump",
    name: "Domestic & Commercial Heat Pumps",
    description: "Comprehensive care for residential & high-capacity heating systems: Domestic hot water pumps, pool heaters, and commercial multi-compressor centralized heat loops.",
    image: heatPumpInstallation,
    tags: ["Domestic Heat Pumps", "Commercial Heat Loops", "Inverter Systems", "Reversing Valves", "Refrigerant Topping", "Coil Descaling"],
    features: [
      "Domestic heat pump maintenance & tuning", 
      "Commercial central heat loop diagnostics", 
      "Reversing valve & flow sensor repairs", 
      "Compressor run capacitor replacement", 
      "High-pressure descaling & coil washing",
      "Full refrigeration cycle performance log"
    ],
    warranty: "90-Day Warranty"
  }
];

const FAQS_DATA = [
  {
    q: "How fast do your technicians reach my location?",
    a: "We have local dispatch centers in HSR Layout, Indiranagar, Koramangala, and Hebbal. Our assigned technician will contact you within 10 minutes of booking and reach your doorstep in under 60 minutes for priority orders."
  },
  {
    q: "Do you charge any consultation or inspection fees?",
    a: "Absolutely not! At Super-Fast Services, we believe in complete transparency. Our in-home diagnostic visit and expert consultation are 100% FREE with absolute zero fees. You select from fixed rates and pay only for the repairs we actually do."
  },
  {
    q: "Do you use genuine manufacturing spare parts?",
    a: "Absolutely! We only source certified OEM parts directly from authorized distributors. Each replaced component is backed by an official 90-day parts replacement warrantee card for absolute zero-fee safety."
  },
  {
    q: "Are there any hidden costs or weekend surge prices?",
    a: "None. Super-Fast Services operates on rigid transparent rate cards. The final price estimated via our pricing wizard is exactly what you pay. No service surge fees, even on Sundays!"
  },
  {
    q: "How can I pay for the completed repair work?",
    a: "You do not need to pay anything on scheduling. Once your appliance is completely repaired, calibrated, and tested to your satisfaction, you can pay directly to the technician via GPay, PhonePe, credit card, or cash."
  }
];

// Area Coverage Database
const SUPPORTED_PINCODES: Record<string, string> = {
  "560001": "MG Road / Shivaji Nagar / Ashok Nagar - Full Same Day Coverage Active",
  "560002": "Chickpet / Bangalore City Area - Full Same Day Coverage Active",
  "560003": "Malleshwaram - Same Day Rapid Dispatch Active",
  "560004": "Basavanagudi - Same Day Rapid Dispatch Active",
  "560008": "Indiranagar (HAL 1st & 2nd Stage) - Full Same Day Coverage Active",
  "560011": "Jayanagar - Same Day Rapid Dispatch Active",
  "560012": "Indian Institute of Science (IISc) - Same Day Priority Active",
  "560025": "Richmond Town / Victoria Layout - Same Day Coverage Active",
  "560034": "Koramangala Layout (Blocks 1-8) - Full Same Day Coverage Active",
  "560037": "Marathahalli - Same Day Rapid Dispatch Active",
  "560038": "Indiranagar Central / Domlur - Same Day Coverage Active",
  "560041": "Jayanagar 9th Block - Same Day Rapid Dispatch Active",
  "560043": "Kalyan Nagar & Banaswadi - Same Day Coverage Active",
  "560047": "Austin Town / Ejipura - Same Day Priority Active",
  "560066": "Whitefield - Same Day Rapid Dispatch Active",
  "560068": "Bommanahalli & Madivala - Same Day Priority Active",
  "560076": "JP Nagar Extension - Same Day Coverage Active",
  "560078": "JP Nagar 2nd Phase - Same Day Coverage Active",
  "560085": "Banashankari 3rd Stage - Same Day Priority Active",
  "560095": "Koramangala Block 4 - Same Day Coverage Active",
  "560102": "HSR Layout (Sectors 1-7) - Full Same Day Coverage Active",
  "560103": "Bellandur / Outer Ring Road - Same Day Priority Active"
};

export default function App() {
  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Booking modal state
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("ac");
  
  // Live coverage checker state
  const [pincodeCheck, setPincodeCheck] = useState<string>("");
  const [coverageStatus, setCoverageStatus] = useState<{
    searched: boolean;
    valid: boolean;
    message: string;
  }>({ searched: false, valid: false, message: "" });

  // Active bookings list loaded from local storage
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [cancellationNotice, setCancellationNotice] = useState<string | null>(null);
  const [confirmingCancelId, setConfirmingCancelId] = useState<string | null>(null);

  // Load active bookings from localStorage
  const loadBookings = () => {
    try {
      const stored = localStorage.getItem("active_bookings");
      if (stored) {
        const list = JSON.parse(stored);
        // Only show confirmed bookings
        setActiveBookings(list.filter((b: any) => b.status === "CONFIRMED"));
      } else {
        setActiveBookings([]);
      }
    } catch (err) {
      console.error("Error reading bookings from localStorage", err);
    }
  };

  useEffect(() => {
    loadBookings();

    // Setup custom event and storage event listeners
    window.addEventListener("storage", loadBookings);
    window.addEventListener("booking-updated", loadBookings);
    return () => {
      window.removeEventListener("storage", loadBookings);
      window.removeEventListener("booking-updated", loadBookings);
    };
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    try {
      const stored = localStorage.getItem("active_bookings");
      if (stored) {
        const list = JSON.parse(stored);
        let cancelledBk: any = null;
        const updated = list.map((b: any) => {
          if (b.id === bookingId) {
            cancelledBk = b;
            return { ...b, status: "CANCELLED" };
          }
          return b;
        });
        localStorage.setItem("active_bookings", JSON.stringify(updated));
        
        // Dispatch custom event to notify components
        window.dispatchEvent(new Event("booking-updated"));
        
        // Set beautiful cancellation banner message
        setCancellationNotice(`Your booking #${bookingId} has been successfully cancelled. A cancellation confirmation alert has been triggered to WhatsApp on 98866 27228.`);
        
        // Auto-open WhatsApp with cancellation details
        if (cancelledBk) {
          const text = `*Super-Fast Services Appliance Repair Booking Cancellation* ⚠️\n\n` +
            `*Order ID:* #${bookingId}\n` +
            `*Customer Name:* ${cancelledBk.customerName || "Customer"}\n` +
            `*Customer Phone:* ${cancelledBk.customerPhone || "N/A"}\n` +
            `*Service Booked:* ${cancelledBk.subServiceType || "Appliance Service"}\n` +
            `*Scheduled Date:* ${cancelledBk.preferredDate} (${cancelledBk.preferredSlot?.split("(")[0]?.trim() || ""})\n\n` +
            `I would like to cancel this booking. Please confirm.`;
          
          const cancelUrl = `https://wa.me/919886627228?text=${encodeURIComponent(text)}`;
          try {
            window.open(cancelUrl, "_blank");
          } catch (e) {
            console.warn("Blocked by popup blocker, manual alert sent", e);
          }
        }

        // Auto dismiss notice after 10 seconds
        setTimeout(() => {
          setCancellationNotice(null);
        }, 10000);
      }
    } catch (err) {
      console.error("Error cancelling booking", err);
    }
  };

  // FAQ Active Indices for expandables
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Scroll watcher to shrink topbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setBookingOpen(true);
    setMobileMenuOpen(false);
  };

  const handleOpenBookingWithPreset = (serviceId: string, subType: string) => {
    setSelectedServiceId(serviceId);
    setBookingOpen(true);
  };

  const handleCheckCoverage = (e: FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeCheck.trim();
    if (!cleanPin) return;

    if (SUPPORTED_PINCODES[cleanPin]) {
      setCoverageStatus({
        searched: true,
        valid: true,
        message: `✅ Service Available: We fully serve ${SUPPORTED_PINCODES[cleanPin]}! Same-day rapid dispatch is active.`
      });
    } else if (/^560\d{3}$/.test(cleanPin)) {
      setCoverageStatus({
        searched: true,
        valid: true,
        message: `✅ Service Available: We fully serve all pin codes across Bangalore, including Pin Code ${cleanPin}! Same-day doorstep booking is open.`
      });
    } else {
      setCoverageStatus({
        searched: true,
        valid: false,
        message: "⚠️ Outside Core Bangalore Area: We do not have high-speed 60-min responders registered for this pin code yet. However, you can call us at 98866 27228 or 70226 08017 to secure custom scheduling!"
      });
    }
  };

  return (
    <div className="bg-bg-base text-on-surface font-sans min-h-screen selection:bg-primary selection:text-white">
      
      {/* Dynamic Sticky Header */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans ${
        navbarScrolled 
          ? "bg-white/95 backdrop-blur shadow-md h-16" 
          : "bg-white h-20 shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <img 
              src={logoIcon} 
              alt="Super-Fast Services Brand Logo" 
              className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-lg font-display font-black text-[#0d3a77] tracking-tight block leading-none">Super-Fast</span>
              <span className="text-[9px] font-black text-[#fd761a] uppercase tracking-widest block mt-1">Repair &amp; Services</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services-catalog" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">Services</a>
            <a href="#pricing-estimator" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">Estimation</a>
            <a href="#why-choose-us" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">How it Works</a>
            <a href="#reviews-board" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">Testimonials</a>
            <a href="#faq-accordions" className="text-slate-600 font-medium hover:text-primary transition-colors text-sm">FAQs</a>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Helpline Channels</span>
              <div className="flex items-center gap-2 mt-0.5">
                <a 
                  href="tel:9886627228"
                  className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-primary px-3 py-1.5 rounded-lg text-xs font-bold font-mono border border-blue-200/40 transition-colors"
                  title="Call Main Line"
                >
                  <Phone className="w-3 h-3" />
                  98866 27228
                </a>
                <a 
                  href="tel:7022608017"
                  className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono border border-slate-200/50 transition-colors"
                  title="Call Alternate Line"
                >
                  <Phone className="w-3 h-3" />
                  70226 08017
                </a>
              </div>
            </div>
            <button 
              onClick={() => handleOpenBooking("ac")}
              className="bg-primary hover:bg-primary-hover active:scale-95 text-white px-5 py-2 rounded-xl text-xs font-bold font-display shadow shadow-blue-100 transition-all cursor-pointer"
            >
              Book Reparation
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 md:hidden">
            <a 
              href="https://wa.me/919886627228?text=Hi!%20I%20am%20looking%20for%20fast%20appliance%20repair%20service."
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors flex items-center justify-center"
              title="WhatsApp Us"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-emerald-600 text-emerald-50" />
            </a>
            <a 
              href="tel:9886627228"
              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center"
              title="Call Priority Line"
            >
              <Phone className="w-4.5 h-4.5 fill-blue-600 text-blue-50" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-350 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <img 
                  src={logoIcon} 
                  alt="Super-Fast Services Brand Logo" 
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-display font-black text-slate-800 tracking-tight block text-sm leading-none">Super-Fast</span>
                  <span className="text-[8px] font-bold text-secondary uppercase tracking-wider block mt-0.5">Repair &amp; Services</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-slate-100">
              <a 
                href="#services-catalog" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-primary font-bold text-sm py-1.5"
              >
                Repair Services
              </a>
              <a 
                href="#pricing-estimator" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-primary font-bold text-sm py-1.5"
              >
                Pricing Calculator
              </a>
              <a 
                href="#why-choose-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-primary font-bold text-sm py-1.5"
              >
                Why Choose Us
              </a>
              <a 
                href="#reviews-board" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-primary font-bold text-sm py-1.5"
              >
                Customer Reviews
              </a>
              <a 
                href="#faq-accordions" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-primary font-bold text-sm py-1.5"
              >
                General FAQs
              </a>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex gap-2">
              <a 
                href="tel:9886627228"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-3 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" /> Call 98866 27228
              </a>
              <a 
                href="tel:7022608017"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-3 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                title="Optional Alternate Line"
              >
                <Phone className="w-4 h-4 text-slate-600" /> Call 70226 08017
              </a>
            </div>
            <a 
              href="https://wa.me/919886627228?text=Hi!%20I%20am%20looking%20for%20fast%20appliance%20repair%20service."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-3 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-emerald-600 text-emerald-50" /> Chat on WhatsApp
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking("ac");
              }}
              className="w-full bg-primary text-white py-3 rounded-xl text-xs font-bold font-display shadow hover:bg-primary-hover active:scale-95 transition-all"
            >
              Book Service Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="pt-20">
        
        {/* 1. Hero Showcase Section */}
        <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Copywriting */}
              <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
                
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-900 px-3.5 py-1.5 rounded-full font-sans text-xs font-bold border border-orange-200/50 uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping shrink-0" />
                  <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  Fast 60-Minute Response Doorstep Guarantee
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-800 leading-tight">
                  Fast, Reliable <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Appliance Repair</span> at Your Doorstep
                </h1>

                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                  Expert senior technical partners for your Air Conditioner, Washing Machine, Refrigerator, Microwave, and more. 100% upfront pricing clarity, authentic OEM spares, and same-day certified dispatching in your city.
                </p>

                {/* Highlight AC Installation, Uninstallation & AMC Banner */}
                <div className="bg-gradient-to-r from-blue-900 to-[#0d3a77] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-blue-800/80 relative overflow-hidden flex flex-col sm:flex-row items-center gap-4 max-w-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <Wrench className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 items-center">
                      <span className="bg-orange-500 text-white font-mono text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">PREMIUM SELECTION</span>
                      <span className="bg-blue-500 text-white font-mono text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">COMMERCIAL, CENTRALIZED &amp; SPLIT AC</span>
                      <span className="bg-emerald-500 text-white font-mono text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">VRF / VRV / DUCTABLE</span>
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base tracking-tight pt-1">Commercial, Centralized, Split &amp; Ductable AC Service</h3>
                    <p className="text-blue-100 text-[11px] sm:text-xs leading-relaxed">Expert repair, dismantling &amp; installations for Split AC, Centralized plants, Ductable units, VRF, and VRV AC systems. Complete Annual Maintenance Contracts (AMC) available.</p>
                  </div>
                  <button 
                    onClick={() => handleOpenBooking("ac")}
                    className="sm:ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-black px-4 py-2.5 rounded-lg transition-all shadow-md shrink-0 active:scale-95 border border-orange-400"
                  >
                    Book Now
                  </button>
                </div>

                {/* Primary/Secondary Call Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <button
                    onClick={() => handleOpenBooking("ac")}
                    className="bg-secondary-container hover:bg-secondary-container-hover text-white py-4 px-8 rounded-xl font-display font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Repair Technician</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/919886627228?text=Hi!%20I%20am%20looking%20for%20fast%20appliance%20repair%20service."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary-container/5 py-3.5 px-8 rounded-xl font-display font-bold text-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-primary text-white" />
                    <span>WhatsApp Booking</span>
                  </a>
                </div>

                {/* Micro-proof indicator indicators */}
                <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 max-w-xl">
                  <div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">4.9/5 ★</span>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Client Rating</p>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">60 Min</span>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Mean Arrival</p>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">90 Days</span>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Parts Shield</p>
                  </div>
                  <div className="bg-teal-50 px-2 py-1 rounded border border-teal-100 flex flex-col justify-center items-center text-center">
                    <span className="text-xl sm:text-2xl font-extrabold text-teal-700 tracking-tight animate-pulse">FREE</span>
                    <p className="text-[9px] text-teal-600 font-extrabold uppercase tracking-wide">Consultation</p>
                  </div>
                </div>

              </div>

              {/* Right Column Visual Showcase */}
              <div className="lg:col-span-5 relative">
                
                {/* Decorative backgrounds */}
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Hero Frame */}
                <div className="relative z-10 bg-gradient-to-tr from-slate-100 to-white p-3 rounded-2xl border border-slate-200/60 shadow-xl max-w-md mx-auto transform hover:rotate-0 rotate-1 transition-transform duration-500">
                  <img 
                    src={acIndoorUnit} 
                    alt="Professional indoor split air conditioner unit with warm spotlights" 
                    className="w-full h-auto aspect-[4/5] object-cover rounded-xl shadow-inner bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 rounded-xl" />

                  {/* Absolute Badge Experience (Bottom Glass) */}
                  <div className="absolute bottom-8 left-6 right-6 p-4 glass-card rounded-xl shadow-xl flex items-center gap-3.5 border border-white/20">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-inner">
                      <ShieldCheck className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <span className="text-slate-850 font-display font-extrabold text-sm block">12+ Years Experience</span>
                      <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">Expertise & Quality Parts</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 2. Interactive Pincode Coverage Checker */}
        <section id="pincode-checker" className="py-8 bg-blue-50/20 border-y border-slate-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-display font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-primary shrink-0" /> Check Instant Rapid dispatch availability in your area
                </h4>
                <p className="text-xs text-slate-500">Provide your 6-digit pin code to check registered technician clusters.</p>
              </div>

              <form onSubmit={handleCheckCoverage} className="w-full md:w-auto flex gap-2 shrink-0 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 560102"
                  value={pincodeCheck}
                  onChange={(e) => setPincodeCheck(e.target.value.replace(/\D/g, ""))}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-primary focus:bg-white text-slate-850 placeholder:font-normal placeholder:text-slate-400 w-full md:w-32 text-center"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white rounded-lg px-5 py-2 text-xs font-bold font-display tracking-widest shrink-0 transition-colors"
                >
                  Verify
                </button>
              </form>
            </div>

            {coverageStatus.searched && (
              <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed border ${
                coverageStatus.valid 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200/50" 
                  : "bg-amber-50 text-amber-800 border-amber-200/50"
              }`}>
                {coverageStatus.message}
              </div>
            )}
          </div>
        </section>

        {/* 2.5 Active Bookings Management & Cancellation Panel */}
        {activeBookings.length > 0 && (
          <section className="py-8 bg-slate-50 border-b border-slate-200/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-display font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Your Active Bookings
                  </h4>
                  <span className="px-2.5 py-1 bg-blue-100 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {activeBookings.length} Active Booking{activeBookings.length > 1 ? "s" : ""}
                  </span>
                </div>
                
                {cancellationNotice && (
                  <div className="p-3 bg-red-50 border border-red-200/50 rounded-xl text-xs text-red-850 flex items-start gap-2 animate-pulse">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{cancellationNotice}</span>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {activeBookings.map((bk) => {
                    const isConfirming = confirmingCancelId === bk.id;
                    return (
                      <div key={bk.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 shadow-sm space-y-3.5 flex flex-col justify-between hover:border-slate-300 transition-all">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-slate-400">ORDER ID #{bk.id}</span>
                              <h5 className="font-display font-bold text-slate-800 text-sm mt-0.5">{bk.subServiceType}</h5>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[9px] font-mono font-extrabold tracking-widest">
                              CONFIRMED
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 space-y-1">
                            <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" /> {bk.preferredDate} ({bk.preferredSlot?.split("(")[0]?.trim() || bk.preferredSlot})
                            </p>
                            <p className="truncate font-medium text-slate-600">
                              📍 {bk.address}
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-4">
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide border border-emerald-100">
                            FREE Consultation
                          </span>
                          
                          <div className="flex gap-1.5">
                            {isConfirming && (
                              <button
                                onClick={() => setConfirmingCancelId(null)}
                                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-300 px-2 py-1 rounded-lg"
                              >
                                Keep
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (isConfirming) {
                                  handleCancelBooking(bk.id);
                                  setConfirmingCancelId(null);
                                } else {
                                  setConfirmingCancelId(bk.id);
                                  // Auto reset confirmation after 5 seconds
                                  setTimeout(() => {
                                    setConfirmingCancelId(current => current === bk.id ? null : current);
                                  }, 5000);
                                }
                              }}
                              className={`text-[11px] font-extrabold transition-all px-2.5 py-1 rounded-lg ${
                                isConfirming
                                  ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                                  : "text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80"
                              }`}
                            >
                              {isConfirming ? "Confirm Cancel?" : "Cancel Booking"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Professional Services Catalog (Bento Layout Grid matching exact design requested) */}
        <section id="services-catalog" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl my-8 md:my-16 shadow-inner">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold font-mono text-primary uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">Our Reparations Spectrum</span>
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-display font-bold text-slate-800">Professional Repair Services</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto pt-1">
              Select your diagnostic requirement. Every category comes with senior certified experts and structured rate cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* 1. AC Service: Col-span 6 (Large top left box) */}
            <div className="md:col-span-12 lg:col-span-6 group relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={SERVICES_DATA[0].image} 
                    alt="Split AC diagnostics being performed" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white rounded px-3 py-1 text-[11px] font-bold tracking-wider shadow">
                    Consultation FREE
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl font-display font-bold text-slate-800 flex items-center gap-1.5">
                      <Wrench className="w-5 h-5 text-primary shrink-0" /> {SERVICES_DATA[0].name}
                    </h3>
                    <span className="text-xs bg-emerald-100 text-emerald-850 px-2 py-0.5 rounded font-bold font-sans">90-Day Warranty</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {SERVICES_DATA[0].description} Thorough wet filtration descaling, gas pressure checkups, leak repairs, and major digital remote PCB replacement.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SERVICES_DATA[0].tags?.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-[10px] font-semibold rounded-full text-slate-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 bg-white/40">
                <button
                  onClick={() => handleOpenBooking("ac")}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-lg py-2.5 text-xs font-bold font-display transition-colors"
                >
                  Book AC Service Now
                </button>
              </div>
            </div>

            {/* 2. Washing Machine Card: Col-span 6 or 4 depending on screen */}
            <div className="md:col-span-6 lg:col-span-3 group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={SERVICES_DATA[1].image} 
                    alt="Front load washing machine laundry settings" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-teal-600 text-white rounded px-2.5 py-1 text-[10px] font-bold tracking-wider shadow">
                    Consultation FREE
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                    <WashingMachine className="w-4.5 h-4.5 text-primary shrink-0" /> {SERVICES_DATA[1].name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Diagnostics &amp; spin cycle vibration noises. High wear drum belt swap and mechanical water drain blockage clearance.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenBooking("washing-machine")}
                  className="text-primary hover:text-primary-hover text-xs font-bold flex items-center gap-1 focus:outline-none transition-colors border-t border-slate-100 pt-3 w-full"
                >
                  Book Work Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Refrigerator Card: md:col-span-6 lg:col-span-3 */}
            <div className="md:col-span-6 lg:col-span-3 group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={SERVICES_DATA[2].image} 
                    alt="Premium double door refrigerator maintenance" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-teal-600 text-white rounded px-2.5 py-1 text-[10px] font-bold tracking-wider shadow">
                    Consultation FREE
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4.5 h-4.5 text-primary shrink-0" /> {SERVICES_DATA[2].name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Deep cooling diagnostics, compressor overload relays, refrigerant gas charging leaks and magnetic door seal gaskets.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenBooking("refrigerator")}
                  className="text-primary hover:text-primary-hover text-xs font-bold flex items-center gap-1 focus:outline-none transition-colors border-t border-slate-100 pt-3 w-full"
                >
                  Book Work Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4. Microwave Oven Card: md:col-span-6 lg:col-span-4 */}
            <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={SERVICES_DATA[3].image} 
                    alt="Premium microwave oven diagnosis & repair" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-750 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider shadow">
                    90-Day Warranty Added
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-display font-bold text-slate-800 flex items-center gap-1">
                      <Microwave className="w-4 h-4 text-orange-600 shrink-0" /> {SERVICES_DATA[3].name}
                    </h3>
                    <span className="text-xs font-bold text-teal-600 uppercase">Consultation Free</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {SERVICES_DATA[3].description} High-voltage circuit testing, waveguide card cleanups, and coupling wheels replacements.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenBooking("microwave")}
                  className="text-primary hover:text-primary-hover text-xs font-bold flex items-center gap-1 focus:outline-none transition-colors border-t border-slate-100 pt-3 w-full"
                >
                  Book Work Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 5. Water Heater: md:col-span-6 lg:col-span-4 */}
            <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={SERVICES_DATA[4].image} 
                    alt="Water geyser heating coil fittings" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-750 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider shadow">
                    90-Day Warranty Added
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-display font-bold text-slate-800 flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-600 shrink-0" /> {SERVICES_DATA[4].name}
                    </h3>
                    <span className="text-xs font-bold text-teal-600 uppercase">Consultation Free</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Heavy duty element descaling, bi-metal thermostat auto cut-offs calibrations, wall mounts plumbing checks.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenBooking("water-heater")}
                  className="text-primary hover:text-primary-hover text-xs font-bold flex items-center gap-1 focus:outline-none border-t border-slate-100 pt-3 w-full"
                >
                  Book Water Geyser <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 6. Heat Pump: md:col-span-6 lg:col-span-4 */}
            <div className="md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={SERVICES_DATA[5].image} 
                    alt="High-efficiency heat pump system diagnostics" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-750 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider shadow">
                    90-Day Warranty Added
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-display font-bold text-slate-800 flex items-center gap-1.5">
                      <Wind className="w-4 h-4 text-sky-600 shrink-0" /> {SERVICES_DATA[5].name}
                    </h3>
                    <span className="text-xs font-bold text-teal-600 uppercase">Consultation Free</span>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {SERVICES_DATA[5].description}
                  </p>

                  {/* Sub-categories */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-start gap-1.5">
                      <span className="bg-blue-100 text-blue-900 font-mono text-[9px] font-black px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">DOMESTIC</span>
                      <p className="text-[11px] text-slate-600">Home geysers, swimming pool heaters, &amp; villa hot water loops.</p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="bg-purple-100 text-purple-900 font-mono text-[9px] font-black px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">COMMERCIAL</span>
                      <p className="text-[11px] text-slate-600">Central plant heating systems, multi-compressor, &amp; industrial loops.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenBooking("heat-pump")}
                  className="text-primary hover:text-primary-hover text-xs font-bold flex items-center gap-1 focus:outline-none border-t border-slate-100 pt-3 w-full"
                >
                  Book Heat Pump Service <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 7. Emergency Priority Contact Prompt Promo box: md:col-span-12 lg:col-span-12 */}
            <div className="md:col-span-12 lg:col-span-12 bg-primary text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center text-center md:text-left shadow-lg relative overflow-hidden gap-6">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
                <span className="w-12 h-12 bg-white/10 border border-white/25 rounded-full flex items-center justify-center text-white shrink-0 animate-bounce">
                  <Phone className="w-5 h-5 fill-white" />
                </span>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-display font-bold tracking-tight">Need Urgent Assistance? Emergency Heat Pump or AC Breakdown?</h3>
                  <p className="text-xs opacity-90 max-w-xl leading-relaxed">
                    Is water leaking heavily, or is your unit sparking or tripping the power? Speak directly with our active senior dispatcher cluster. Same-day emergency response is available across Bangalore.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto space-y-3 relative z-10">
                <div className="flex flex-col gap-1.5 text-right md:text-left">
                  <a 
                    href="tel:9886627228"
                    className="text-2xl sm:text-3xl font-display font-extrabold block hover:text-orange-400 transition-colors"
                  >
                    98866 27228
                  </a>
                  <a 
                    href="tel:7022608017"
                    className="text-xl sm:text-2xl font-display font-bold block text-slate-200 hover:text-orange-400 transition-colors"
                  >
                    <span className="text-xs opacity-75 font-mono mr-1">ALT:</span>70226 08017
                  </a>
                </div>
                <div className="flex gap-2">
                  <a
                    href="tel:9886627228"
                    className="flex-1 bg-white text-primary hover:bg-slate-50 px-4 block rounded-xl py-2.5 font-display font-bold text-xs shadow-md transition-colors text-center"
                  >
                    Call Primary
                  </a>
                  <a
                    href="tel:7022608017"
                    className="flex-1 bg-white/20 hover:bg-white/35 text-white border border-white/30 px-4 block rounded-xl py-2.5 font-display font-bold text-xs shadow-md transition-colors text-center"
                  >
                    Call Alternate
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Interactive Budget/Pricing Estimator Tool */}
        <section className="py-16 bg-gradient-to-b from-blue-50/10 to-slate-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingEstimator 
              services={SERVICES_DATA} 
              onOpenBookingWithService={handleOpenBookingWithPreset} 
            />
          </div>
        </section>

        {/* 5. Features Highlight / Why Choose Us Section */}
        <section id="why-choose-us" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Visual Bento Stats Left */}
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="space-y-4 pt-12">
                  <div className="bg-white shadow-sm p-6 rounded-2xl border-l-4 border-primary">
                    <span className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5 text-primary" />
                    </span>
                    <h4 className="font-display font-bold text-slate-800 text-sm mb-1.5">Lightning Speed</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      We prioritize urgent responses. Certified specialists are clustered inside active neighborhoods to arrive within 60 minutes.
                    </p>
                  </div>

                  <div className="bg-white shadow-sm p-6 rounded-2xl border-l-4 border-orange-500">
                    <span className="w-10 h-10 rounded-lg bg-orange-50 text-orange-900 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                    </span>
                    <h4 className="font-display font-bold text-slate-800 text-sm mb-1.5 font-bold">Transparent Pricing</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Absolutely zero surge overheads or redundancy. The estimated price quoted is the price written in your final bill.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white shadow-sm p-6 rounded-2xl border-l-4 border-blue-600">
                    <span className="w-10 h-10 rounded-lg bg-blue-100 text-primary flex items-center justify-center mb-3">
                      <Wrench className="w-5 h-5 text-primary" />
                    </span>
                    <h4 className="font-display font-bold text-slate-800 text-sm mb-1.5">Master Expertise</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Every engineer is senior, vetted with background checks, and carries official diagnostics instrumentation for leading brands.
                    </p>
                  </div>

                  <div className="bg-blue-600 text-white rounded-2xl p-6 text-center shadow-lg flex flex-col justify-center items-center border border-blue-700 relative overflow-hidden min-h-[170px]">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
                    <span className="text-4xl font-display font-extrabold text-orange-400">50K+</span>
                    <p className="text-xs font-bold uppercase tracking-widest pt-1">Happy Homes</p>
                    <p className="text-[10px] opacity-80 pt-1">Fully serviced nationwide</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Structured Copy Right */}
            <div className="order-1 lg:order-2 space-y-6 md:space-y-8 text-left">
              <span className="text-xs font-bold font-mono text-primary uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">Our Core Convictions</span>
              <h2 className="text-3xl font-display font-extrabold text-slate-800 tracking-tight leading-tight">
                Why Choose <br/>
                <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Super-Fast Services?</span>
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Appliance faults cause immense disruption. Our senior technical partners bypass intermediate booking bureaucracies to reach your doorstep equipped directly with matching spares. No multi-day delays.
              </p>

              <ul className="space-y-3.5 text-slate-700 font-medium text-xs sm:text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  </span>
                  <span className="font-bold text-teal-900">100% FREE Consultation &amp; In-Home Diagnostic Visit</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span>100% Genuine Certified OEM Spare Parts Guaranteed</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span>Rigid 90-Day Free Parts &amp; Labor Service Warrantee</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <span>100% Police Verified &amp; Background Checked Senior Staff</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenBooking("ac")}
                  className="bg-primary hover:bg-primary-hover active:scale-[0.98] text-white py-3.5 px-8 rounded-xl font-display font-bold text-xs tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Experience Precision Service
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Live Interactive Testimonials Dashboard */}
        <section id="reviews-board" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewSection />
        </section>

        {/* 7. FAQ Accordion Section */}
        <section id="faq-accordions" className="py-16 bg-white border-t border-slate-200/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-bold font-mono text-primary uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">Got Questions?</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-800">Frequently Answered Queries</h3>
              <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-xs text-slate-500">Everything you want to check before booking with Super-Fast Services.</p>
            </div>

            <div className="space-y-3">
              {FAQS_DATA.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/50"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4 md:p-5 flex justify-between items-center bg-white hover:bg-slate-50/50 focus:outline-none"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 pr-4 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-primary shrink-0" /> {faq.q}
                      </h4>
                      <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-4 md:p-5 border-t border-slate-200 bg-slate-50 text-xs sm:text-xs text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 8. Bottom Immersive Sticky Call-to-Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto bg-slate-900 text-slate-100 rounded-3xl overflow-hidden relative p-8 md:p-12 border border-slate-800 shadow-2xl">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
              <div className="space-y-3 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">
                  Ready to fix your home appliance today?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Book an expert technician partner in less than 2 minutes. No credit card or pre-payments necessary. We diagnose, fix, clean, and you pay only post-satisfaction.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full lg:w-auto justify-center items-stretch sm:items-center">
                <button
                  onClick={() => handleOpenBooking("ac")}
                  className="bg-secondary-container hover:bg-secondary-container-hover text-white py-3.5 px-8 rounded-xl font-display font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  Book Instant Now
                </button>
                <div className="flex gap-2">
                  <a
                    href="tel:9886627228"
                    className="flex-1 bg-white/10 hover:bg-white/15 border border-white/25 text-white py-3.5 px-5 rounded-xl font-display font-bold text-sm tracking-wide transition-colors text-center"
                  >
                    Call 98866 27228
                  </a>
                  <a
                    href="tel:7022608017"
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white/90 py-3.5 px-5 rounded-xl font-display font-bold text-sm tracking-wide transition-colors text-center"
                    title="Optional Alternate Line"
                  >
                    Call 70226 08017
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Structured Footer */}
      <footer className="w-full bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          
          {/* Column 1 Logo details */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <img 
                src={logoIcon} 
                alt="Super-Fast Services Brand Logo" 
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-base font-display font-black text-slate-900 tracking-tight block leading-none">Super-Fast</span>
                <span className="text-[8px] font-black text-secondary uppercase tracking-widest block mt-0.5">Repair &amp; Services</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The Modern Craftsman: senior punctuality, transparent rate cards, and advanced appliance repair solutions matching direct developer precision.
            </p>
            <div className="flex gap-2">
              <button className="p-2 bg-white hover:bg-white border border-slate-200 hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-700 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div className="space-y-4">
              <h5 className="font-bold text-xs text-slate-850 uppercase tracking-widest">Platform</h5>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><a href="#services-catalog" className="hover:text-primary transition-colors font-medium">Repair services</a></li>
                <li><a href="#pincode-checker" className="hover:text-primary transition-colors font-medium">Active locations</a></li>
                <li><a href="#pricing-estimator" className="hover:text-primary transition-colors font-medium">Transparent prices</a></li>
                <li><a href="#faq-accordions" className="hover:text-primary transition-colors font-medium">Common FAQs</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-xs text-slate-850 uppercase tracking-widest">Direct Help</h5>
              <ul className="space-y-2 text-xs text-slate-500 text-left">
                <li>
                  <a 
                    href="https://wa.me/919886627228" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-primary hover:text-primary-hover font-bold"
                  >
                    WhatsApp Support Live
                  </a>
                </li>
                <li className="font-bold text-slate-850 flex flex-col gap-2 pt-1 text-xs">
                  <a href="tel:9886627228" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Phone className="w-3.5 h-3.5 text-primary" /> Main: 98866 27228
                  </a>
                  <a href="tel:7022608017" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Phone className="w-3.5 h-3.5 text-primary" /> Alternate: 70226 08017
                  </a>
                </li>
                <li className="text-[10px] text-slate-400 font-semibold italic">Open 7 days: 8 AM - 9 PM</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-semibold">
          <p>© 2026 Super-Fast Services. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-500">User privacy terms</a>
            <a href="#" className="hover:text-slate-500">Service contract clauses</a>
          </div>
        </div>
      </footer>

      {/* Elegant step Wizard Booking dialogue modal */}
      <BookingModal 
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedServiceId={selectedServiceId}
        services={SERVICES_DATA}
      />

      {/* Floating Sticky Actions (Direct Call and WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Call Button - Main */}
        <a 
          href="tel:9886627228"
          className="w-14 h-14 rounded-full bg-[#0d3a77] text-white flex items-center justify-center shadow-lg hover:shadow-[#0d3a77]/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 group relative"
          title="Call priority line"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-bold shadow-md">
            Call Main: 98866 27228
          </span>
          <Phone className="w-6 h-6 fill-white text-[#0d3a77] animate-bounce" style={{ animationDuration: '3s' }} />
        </a>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/919886627228?text=Hi!%20I%20am%20looking%20for%20fast%20appliance%20repair%20service."
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 group relative"
          title="Instant WhatsApp Support"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-bold shadow-md">
            Chat on WhatsApp
          </span>
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366] stroke-[2.5]" />
          {/* Pulsing indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </a>
      </div>

    </div>
  );
}
