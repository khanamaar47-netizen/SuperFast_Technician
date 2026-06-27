/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  User, 
  ShieldCheck, 
  Loader2, 
  Info, 
  Wrench,
  WashingMachine,
  SquareCheck,
  Smartphone
} from "lucide-react";
import { ServiceItem, BookingState } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceId?: string;
  services: ServiceItem[];
}

const OFFERS = [
  { code: "FIRST100", discount: 100, desc: "₹100 Off on your first repair booking!" },
  { code: "SUPER60", discount: 60, desc: "₹60 Off flash discount for same-day service" }
];

export default function BookingModal({
  isOpen,
  onClose,
  selectedServiceId = "ac",
  services
}: BookingModalProps) {
  // Wizard state: 1 = Service Select, 2 = Date & Slot & Plan, 3 = Address & Phone, 4 = Success Receipt
  const [step, setStep] = useState<number>(1);
  const [booking, setBooking] = useState<BookingState>({
    serviceId: selectedServiceId,
    subServiceType: "General Service & Diagnostics",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    preferredDate: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    preferredSlot: "10:00 AM - 12:00 PM (Morning)",
    address: "",
    landmark: ""
  });

  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedId, setGeneratedId] = useState<string>("");

  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [confirmModalCancel, setConfirmModalCancel] = useState<boolean>(false);

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setBooking({
        serviceId: selectedServiceId,
        subServiceType: "General Service & Diagnostics",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        preferredDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        preferredSlot: "10:00 AM - 12:00 PM (Morning)",
        address: "",
        landmark: ""
      });
      setAppliedPromo("");
      setPromoMessage("");
      setPromoDiscount(0);
      setIsSubmitting(false);
      setErrors({});
      setGeneratedId("");
      setIsCancelled(false);
      setConfirmModalCancel(false);
    }
  }, [isOpen, selectedServiceId]);

  const handleModalCancelBooking = () => {
    try {
      const stored = localStorage.getItem("active_bookings");
      if (stored) {
        const list = JSON.parse(stored);
        const updated = list.map((b: any) => {
          if (b.id === generatedId) {
            return { ...b, status: "CANCELLED" };
          }
          return b;
        });
        localStorage.setItem("active_bookings", JSON.stringify(updated));
        
        // Notify components
        window.dispatchEvent(new Event("booking-updated"));
        
        setIsCancelled(true);

        // Auto open WhatsApp with cancellation details
        const text = `*Super-Fast Services Appliance Repair Booking Cancellation* ⚠️\n\n` +
          `*Order ID:* #${generatedId}\n` +
          `*Customer Name:* ${booking.customerName}\n` +
          `*Customer Phone:* ${booking.customerPhone}\n` +
          `*Service Booked:* ${currentService?.name || "Appliance Service"} - ${booking.subServiceType}\n` +
          `*Scheduled Date:* ${booking.preferredDate}\n` +
          `*Time Slot:* ${booking.preferredSlot}\n\n` +
          `I would like to cancel this booking. Please confirm.`;
        
        const cancelUrl = `https://wa.me/919886627228?text=${encodeURIComponent(text)}`;
        try {
          window.open(cancelUrl, "_blank");
        } catch (e) {
          console.warn("Popup blocked, fallback to manual button", e);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentService = useMemo(() => {
    return services.find(s => s.id === booking.serviceId) || services[0];
  }, [services, booking.serviceId]);

  const whatsappUrl = useMemo(() => {
    if (!generatedId) return "";
    const text = `*Super-Fast Services Appliance Repair Booking Confirmation* 🛠️\n\n` +
      `*Order ID:* #${generatedId}\n` +
      `*Customer Name:* ${booking.customerName}\n` +
      `*Customer Phone:* ${booking.customerPhone}\n` +
      `*Customer Email:* ${booking.customerEmail || "N/A"}\n` +
      `*Service Booked:* ${currentService?.name || "Appliance Service"} - ${booking.subServiceType}\n` +
      `*Scheduled Date:* ${booking.preferredDate}\n` +
      `*Time Slot:* ${booking.preferredSlot}\n` +
      `*Address:* ${booking.address}\n` +
      `*Landmark:* ${booking.landmark || "N/A"}\n\n` +
      `Please confirm my scheduled time and dispatch the technician. Thanks!`;
    return `https://wa.me/919886627228?text=${encodeURIComponent(text)}`;
  }, [generatedId, booking, currentService]);

  const activePromoObj = useMemo(() => {
    return OFFERS.find(o => o.code === appliedPromo);
  }, [appliedPromo]);

  // Sub-service variations based on selected appliance
  const subServiceOptions = useMemo(() => {
    switch (booking.serviceId) {
      case "ac":
        return [
          "General Service & Deep Cleaning", 
          "Split AC Service (Deep Clean & Care)",
          "Commercial AC Service & Diagnosis",
          "Centralized AC Service & Overhaul",
          "Ductable AC Service & Inspection",
          "VRF AC Service & Maintenance",
          "VRV AC Service & Repair",
          "Annual Maintenance Contract (AMC) Plan",
          "Foam Jet Cleaning (Deep Action)", 
          "AC Complete Installation (Split/Window)",
          "AC Complete Uninstallation (Split/Window)",
          "Water Leakage & Drip Resolution", 
          "Power Supply & Device Tripping Fix", 
          "Gas Charging (Full Refill)", 
          "Cooling Issue Diagnostics", 
          "PCB Repair & Board Fix"
        ];
      case "washing-machine":
        return ["Diagnostics & Spin Cycle Noise", "Drum Replacement & Motor Check", "Water Leakage & Drain issues", "PCB Board & Wiring repair", "General Filter & Deep Cleaning"];
      case "refrigerator":
        return ["Not Cooling / Compressor Check", "Thermostat & Sensor Faults", "Gas Leakage & Topping", "Sealing, Gasket & Door Alignment", "Double Door Defrost Malfunction"];
      case "microwave":
        return ["Magnetron Fault (No Heating)", "Touch Pad / Panel Unresponsive", "Sparking / Heating element swap", "Turntable Motor & Glass Roller Repair", "General Inspection & Fuse change"];
      case "water-heater":
        return ["Geyser Heating Element Replacement", "Thermostat & Auto-Cutoff repairs", "Water Tank Leakage service", "Plumbing inlet/outlet pipe fixes", "Complete Unit Installation"];
      case "heat-pump":
        return [
          "Domestic Heat Pump: General Servicing & Filter Cleaning",
          "Domestic Heat Pump: Compressor & Capacitor Replacement",
          "Domestic Heat Pump: Reversing Valve & Flow Sensor Repair",
          "Commercial Heat Pump: High-Capacity Annual Maintenance",
          "Commercial Heat Pump: Industrial Multi-Compressor Overhaul",
          "Commercial Heat Pump: Thermal Expansion & PCB Board Fix"
        ];
      default:
        return ["General Service & Diagnostics"];
    }
  }, [booking.serviceId]);

  // Calculate pricing transparently
  const priceCalculation = useMemo(() => {
    const base = currentService?.basePrice || 399;
    let typeModifier = 0;
    
    if (booking.subServiceType.includes("Gas") || booking.subServiceType.includes("PCB") || booking.subServiceType.includes("Motor") || booking.subServiceType.includes("Compressor")) {
      typeModifier = 500; // Complex tasks cost more
    } else if (booking.subServiceType.includes("AMC") || booking.subServiceType.includes("Annual Maintenance")) {
      typeModifier = 1100; // Premium yearly package contract fee
    } else if (booking.subServiceType.includes("Commercial") || booking.subServiceType.includes("Centralized") || booking.subServiceType.includes("Ductable") || booking.subServiceType.includes("VRF") || booking.subServiceType.includes("VRV")) {
      typeModifier = 750; // Heavy-duty systems
    } else if (booking.subServiceType.includes("Installation")) {
      typeModifier = 300;
    } else if (booking.subServiceType.includes("Uninstallation")) {
      typeModifier = 150;
    } else if (booking.subServiceType.includes("Foam Jet")) {
      typeModifier = 200;
    } else if (booking.subServiceType.includes("Leakage")) {
      typeModifier = 150;
    } else if (booking.subServiceType.includes("Power")) {
      typeModifier = 250;
    }

    const subtotal = base + typeModifier;
    const taxes = Math.round(subtotal * 0.18); // 18% GST standard
    const grandTotal = subtotal + taxes - promoDiscount;

    return {
      baseFee: base,
      complexityFee: typeModifier,
      subtotal,
      taxes,
      discount: promoDiscount,
      total: grandTotal > 0 ? grandTotal : 0
    };
  }, [currentService, booking.subServiceType, promoDiscount]);

  const validateStep = () => {
    const currentErrors: Record<string, string> = {};
    if (step === 2) {
      if (!booking.preferredDate) {
        currentErrors.preferredDate = "Please choose a preferred service date.";
      }
    } else if (step === 3) {
      if (!booking.customerName.trim()) {
        currentErrors.customerName = "Full Name is required.";
      }
      const cleanedPhone = booking.customerPhone.replace(/\D/g, "");
      if (cleanedPhone.length < 10) {
        currentErrors.customerPhone = "Please enter a valid 10-digit mobile number.";
      }
      if (!booking.address.trim()) {
        currentErrors.address = "Complete service address is required so technician can reach you.";
      }
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleApplyPromo = (code: string) => {
    const promo = OFFERS.find(o => o.code.toUpperCase() === code.toUpperCase().trim());
    if (promo) {
      setAppliedPromo(promo.code);
      setPromoDiscount(promo.discount);
      setPromoMessage(`Promo Applied: ₹${promo.discount} discount saved!`);
    } else {
      setPromoMessage("Invalid Promo Code. Please try FIRST100 or SUPER60.");
      setAppliedPromo("");
      setPromoDiscount(0);
    }
  };

  const handleSubmitBooking = () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    
    // Simulate API request delay to build robust feeling
    setTimeout(() => {
      const generatedCode = "SB-" + Math.floor(100000 + Math.random() * 900000);
      setGeneratedId(generatedCode);

      // Persist the booking to localStorage so users can cancel it later
      try {
        const newBooking = {
          id: generatedCode,
          serviceId: booking.serviceId,
          subServiceType: booking.subServiceType,
          customerName: booking.customerName,
          customerPhone: booking.customerPhone,
          customerEmail: booking.customerEmail,
          preferredDate: booking.preferredDate,
          preferredSlot: booking.preferredSlot,
          address: booking.address,
          landmark: booking.landmark,
          status: "CONFIRMED",
          createdAt: new Date().toISOString()
        };
        const existingBookingsStr = localStorage.getItem("active_bookings");
        const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
        existingBookings.push(newBooking);
        localStorage.setItem("active_bookings", JSON.stringify(existingBookings));
        
        // Dispatch custom event to notify App.tsx
        window.dispatchEvent(new Event("booking-updated"));

        // Auto open WhatsApp with the detailed customer message
        const text = `*Super-Fast Services Appliance Repair Booking Confirmation* 🛠️\n\n` +
          `*Order ID:* #${generatedCode}\n` +
          `*Customer Name:* ${booking.customerName}\n` +
          `*Customer Phone:* ${booking.customerPhone}\n` +
          `*Customer Email:* ${booking.customerEmail || "N/A"}\n` +
          `*Service Booked:* ${currentService?.name || "Appliance Service"} - ${booking.subServiceType}\n` +
          `*Scheduled Date:* ${booking.preferredDate}\n` +
          `*Time Slot:* ${booking.preferredSlot}\n` +
          `*Address:* ${booking.address}\n` +
          `*Landmark:* ${booking.landmark || "N/A"}\n\n` +
          `Please confirm my scheduled time and dispatch the technician. Thanks!`;
        
        const bookingUrl = `https://wa.me/919886627228?text=${encodeURIComponent(text)}`;
        try {
          window.open(bookingUrl, "_blank");
        } catch (e) {
          console.warn("Blocked by popup blocker, fallback to manual button", e);
        }
      } catch (err) {
        console.error("Error saving booking to localStorage", err);
      }

      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Visual Summary & Guarantee */}
          <div className="md:col-span-4 bg-gradient-to-br from-primary pb-8 to-blue-900 text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient overlay background glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-12 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-500/30 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-orange-400" />
                </span>
                <span className="font-display font-bold text-sm tracking-widest uppercase text-blue-200">SUPER-FAST SERVICES</span>
              </div>

              {step < 4 ? (
                <>
                  <div className="space-y-2">
                    <p className="text-xs text-blue-200 font-medium">YOU ARE BOOKING</p>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">{currentService?.name}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{currentService?.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/20 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold">Fast 60-Min Arrival</h4>
                        <p className="text-xs text-blue-100">Technician dispatched immediately upon confirmation.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold">90-Day Repair Warranty</h4>
                        <p className="text-xs text-blue-100">Failures covered completely for 3 full months.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold">Background Checked Pros</h4>
                        <p className="text-xs text-blue-100">Certified staff with absolute integrity.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-center">Service Booked!</h3>
                  <p className="text-center text-sm text-blue-100">Your reservation has been locked in successfully.</p>
                  <div className="p-3 bg-white/10 rounded-lg text-center font-mono text-sm tracking-wide border border-white/10">
                    ID: {generatedId}
                  </div>
                </div>
              )}
            </div>

            {/* Price Estimator Widget (Visible in Steps 1-3) */}
            {step < 4 && (
              <div className="mt-8 pt-4 border-t border-white/20 relative z-10">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between text-xs font-semibold text-blue-200">
                    <span>Estimation & Quote</span>
                    <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Zero Upfront Fee</span>
                  </div>
                  <div className="space-y-3 text-xs leading-relaxed text-blue-100">
                    <div className="flex justify-between items-center text-teal-300 font-bold">
                      <span>In-Home Consultation</span>
                      <span>FREE (₹0)</span>
                    </div>
                    <p className="text-[11px]">
                      At Super-Fast, our senior technicians inspect your appliance in-person 100% free of charge. You pay absolutely nothing for the diagnostic visit.
                    </p>
                    <p className="text-[11px] border-l-2 border-orange-400 pl-2 text-orange-300">
                      We will discuss the final, flat-rate repair cost over the phone or during inspection before starting. No surprise charges!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Active Step Form */}
          <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between bg-slate-50">
            {/* Step Indicators */}
            {step < 4 && (
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= 1 ? "bg-primary text-white scale-110" : "bg-slate-200 text-slate-600"
                  }`}>1</span>
                  <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Select Appliance</span>
                </div>
                <div className="h-[2px] bg-slate-200 flex-1 mx-3" />
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= 2 ? "bg-primary text-white scale-110" : "bg-slate-200 text-slate-600"
                  }`}>2</span>
                  <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Choose Slot</span>
                </div>
                <div className="h-[2px] bg-slate-200 flex-1 mx-3" />
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= 3 ? "bg-primary text-white scale-110" : "bg-slate-200 text-slate-600"
                  }`}>3</span>
                  <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Address details</span>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="flex-1 py-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" /> What appliance needs attention?
                      </h3>
                      <p className="text-xs text-slate-500">Pick from our fast same-day expert repair services list below.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setBooking(prev => ({ 
                            ...prev, 
                            serviceId: s.id,
                            subServiceType: s.id === "ac" ? "General Service & Deep Cleaning" : "General Service & Diagnostics"
                          }))}
                          className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between min-h-[105px] focus:outline-none ${
                            booking.serviceId === s.id 
                              ? "border-primary bg-blue-50/50 shadow-md transform -translate-y-0.5" 
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-xs opacity-85 font-semibold text-slate-500">{s.id === "ac" ? "Cooling" : s.id === "washing-machine" ? "Laundry" : "Kitchen"}</span>
                          <span className="font-display font-bold text-sm text-slate-800 leading-tight">{s.name}</span>
                          <span className="text-xs text-primary font-bold mt-1">FREE Diagnosis (₹0)</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Specify Service Intent / Diagnostic Area</label>
                      <select 
                        value={booking.subServiceType}
                        onChange={(e) => setBooking(prev => ({ ...prev, subServiceType: e.target.value }))}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      >
                        {subServiceOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 flex items-start gap-2.5 text-xs text-teal-850">
                      <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <p>
                        <strong>Zero Consultation Fee:</strong> Diagnostic visit and consultation are 100% FREE (₹0)! Speak with our experts at no cost on arrival.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" /> Pick Date & Preferred Time
                      </h3>
                      <p className="text-xs text-slate-500">Our slots are open 7 days a week. Pick what corresponds to your schedule.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Service Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                            max={new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0]} // 2 weeks limit
                            value={booking.preferredDate}
                            onChange={(e) => setBooking(prev => ({ ...prev, preferredDate: e.target.value }))}
                            className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          />
                        </div>
                        {errors.preferredDate && (
                          <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Preferred Time Window</label>
                        <select
                          value={booking.preferredSlot}
                          onChange={(e) => setBooking(prev => ({ ...prev, preferredSlot: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                          <option value="08:00 AM - 10:00 AM (Early Booking)">08:00 AM - 10:00 AM (Early Morning Pro)</option>
                          <option value="10:00 AM - 12:00 PM (Morning)">10:00 AM - 12:00 PM (Morning Priority)</option>
                          <option value="12:00 PM - 03:00 PM (Afternoon)">12:00 PM - 03:00 PM (Afternoon Slump)</option>
                          <option value="03:00 PM - 06:00 PM (Late-Afternoon)">03:00 PM - 06:00 PM (Late-Afternoon)</option>
                          <option value="06:00 PM - 08:00 PM (Evening Special)">06:00 PM - 08:00 PM (Evening Rush Hour)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 mt-4 space-y-3">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-bold text-slate-700">Doorstep Estimation Choice</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        To maintain optimal transparency, we do not utilize rigid pricing tables. Instead, our dispatcher and senior technician will call you or inspect your appliance to offer a customized flat-rate estimate.
                      </p>
                      <div className="pt-1.5 space-y-1.5 text-xs font-medium text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                          <span>Consultation &amp; visit are 100% FREE (₹0 Visit)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                          <span>Receive full rate estimate *before* any work starts</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" /> Service Address & Information
                      </h3>
                      <p className="text-xs text-slate-500">Provide exact directions so your assigned technician arrives right on schedule.</p>
                    </div>

                    <div className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input 
                              type="text" 
                              placeholder="e.g. Ramesh Sharma"
                              value={booking.customerName}
                              onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))}
                              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                          </div>
                          {errors.customerName && (
                            <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / Contact Phone</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input 
                              type="tel" 
                              placeholder="10-digit mobile, e.g. 9886627228"
                              maxLength={12}
                              value={booking.customerPhone}
                              onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
                              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                          </div>
                          {errors.customerPhone && (
                            <p className="text-xs text-red-500 mt-1">{errors.customerPhone}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Flat / House No. & Complete Street Address</label>
                        <textarea 
                          rows={2}
                          placeholder="e.g. Flat 304, Royal Palms, Sector 4, HSR Layout"
                          value={booking.address}
                          onChange={(e) => setBooking(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                        />
                        {errors.address && (
                          <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Famous Landmark (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Opposite Central Supermarket, Near Axis Bank ATM"
                          value={booking.landmark}
                          onChange={(e) => setBooking(prev => ({ ...prev, landmark: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && isCancelled ? (
                  <motion.div
                    key="cancelled"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5 text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border-2 border-red-500/30">
                      <X className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-display font-bold text-slate-800">Booking Cancelled</h3>
                      <p className="text-xs text-slate-500">Your order ID #<strong>{generatedId}</strong> has been cancelled successfully.</p>
                    </div>

                    <div className="p-4 bg-red-50 text-red-900 rounded-lg text-xs max-w-lg mx-auto flex items-start gap-2.5 text-left border border-red-200/60">
                      <Smartphone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold mb-0.5 text-red-950">WhatsApp Cancellation Alert Sent</p>
                        <p className="text-[11px] leading-relaxed text-red-800">
                          A cancellation notification was triggered to WhatsApp on <strong className="font-extrabold text-red-950">98866 27228</strong> with your cancellation details.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={onClose}
                        className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg py-2.5 px-8 font-bold text-xs font-display tracking-wide transition-all shadow"
                      >
                        Back to Site
                      </button>
                    </div>
                  </motion.div>
                ) : step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5 text-center py-4"
                  >
                    <div className="w-20 h-20 flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <img 
                        src="/favicon.svg" 
                        alt="Super-Fast Services Success Logo" 
                        className="w-20 h-20 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-display font-bold text-slate-800">Your Booking is Confirmed!</h3>
                      <p className="text-xs text-slate-500">Order ID #<strong>{generatedId}</strong> has been secured in our system.</p>
                    </div>

                    <div className="bg-slate-100 rounded-xl p-4 text-left max-w-lg mx-auto space-y-3.5 border border-slate-200">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Booking Details</span>
                        <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-[9px] font-bold tracking-widest">CONFIRMED</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Scheduled At:</span>
                          <span className="font-semibold text-slate-800">{booking.preferredDate} ({booking.preferredSlot.split("(")[0]})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Assigned Service:</span>
                          <span className="font-semibold text-slate-800">{currentService?.name} - {booking.subServiceType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Address Location:</span>
                          <span className="font-semibold text-slate-800 truncate max-w-[200px]">{booking.address}</span>
                        </div>
                        <div className="flex justify-between text-slate-800 font-bold border-t border-dashed border-slate-200 pt-2">
                          <span>Service Assessment Visit:</span>
                          <span className="text-xs text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded font-bold uppercase">FREE Consultation</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 text-emerald-900 rounded-lg text-xs max-w-lg mx-auto flex items-start gap-2.5 text-left border border-emerald-200/60">
                      <Smartphone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold mb-0.5 text-emerald-950">WhatsApp Notification Active</p>
                        <p className="text-[11px] leading-relaxed text-emerald-800">
                          A confirmation alert has been triggered to WhatsApp on <strong className="font-extrabold text-emerald-950">98866 27228</strong> with your scheduled time and order details.
                        </p>
                      </div>
                    </div>

                    {confirmModalCancel ? (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-xs mx-auto space-y-3 animate-pulse">
                        <p className="text-xs font-bold text-red-955">Are you sure you want to cancel this booking?</p>
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={handleModalCancelBooking}
                            className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1.5 font-bold text-xs"
                          >
                            Yes, Cancel
                          </button>
                          <button
                            onClick={() => setConfirmModalCancel(false)}
                            className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded px-3 py-1.5 font-bold text-xs"
                          >
                            No, Keep
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 max-w-xs mx-auto">
                        <div className="flex gap-2 justify-center">
                          <a 
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 px-3 font-bold text-xs font-display tracking-wide transition-all shadow-md hover:shadow flex items-center justify-center gap-1"
                          >
                            <Smartphone className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                          <button
                            onClick={onClose}
                            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg py-2.5 px-3 font-bold text-xs font-display tracking-wide transition-all"
                          >
                            Done, Back
                          </button>
                        </div>
                        <button
                          onClick={() => setConfirmModalCancel(true)}
                          className="text-xs font-bold text-red-600 hover:text-red-700 block mx-auto transition-colors mt-2 underline"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
                <button
                  type="button"
                  onClick={step === 1 ? onClose : handleBack}
                  className={`px-4 py-2 text-xs font-bold flex items-center gap-1 rounded-lg transition-all ${
                    step === 1 
                      ? "text-slate-500 hover:text-slate-800" 
                      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> {step === 1 ? "Cancel" : "Back"}
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all hover:translate-x-0.5 active:scale-95"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitBooking}
                    className="bg-secondary-container hover:bg-secondary-container-hover text-white px-6 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Securing slots...
                      </>
                    ) : (
                      <>
                        Confirm Booking (PAY LATER) <SquareCheck className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
