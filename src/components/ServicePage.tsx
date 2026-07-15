import React, { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Wind,
  WashingMachine,
  Microwave,
  Flame,
  AlertTriangle
} from "lucide-react";

interface ServicePageProps {
  path: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (serviceId: string) => void;
}

interface Symptom {
  title: string;
  desc: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

interface ServiceDetails {
  id: string;
  name: string;
  h1: string;
  icon: React.ReactNode;
  tagline: string;
  longDescription: string;
  whyChooseText: string;
  symptoms: Symptom[];
  pricingTable: { service: string; warranty: string }[];
  faqs: { q: string; a: string }[];
  seoParagraph: string;
  localitiesText: string;
}

const SERVICE_PAGES_DATA: Record<string, ServiceDetails> = {
  "/ac-repair-bangalore": {
    id: "ac",
    name: "AC Services",
    h1: "AC Repair & Servicing in Bangalore | Same-Day Doorstep Service",
    icon: <Wind className="w-8 h-8 text-sky-600" />,
    tagline: "Professional split, window, and commercial multi-VRF AC solutions. Deep cleaning, gas refilling, leak detection, and installations.",
    longDescription: "Is your AC not blowing cold air? Or is it continuously dripping water in your living room? An Air Conditioner breakdown in Bangalore's variable climate can quickly disrupt your day. Super-Fast Services delivers certified senior cooling engineers straight to your doorstep within 60 minutes. We provide specialized care for premium brands including Daikin, Voltas, Blue Star, Lloyd, LG, Samsung, and Carrier. We use advanced digital gas manifolds, premium high-pressure jet cleaners, and original OEM capacitor/valves.",
    whyChooseText: "Our AC technicians are background-verified, multi-brand specialists. We offer upfront assessments so you never face hidden bills, and back every single repair with our signature 90-day parts-and-labor warranty.",
    symptoms: [
      { title: "AC Blowing Warm Air", desc: "Usually a failing compressor capacitor, fan motor burn, or refrigerant leakage. Requires technical manifold analysis.", severity: "High" },
      { title: "Water Dripping Indoor Unit", desc: "Blocked condensate drainage channels, cracked plastic trays, or dirty coils freezing the airflow.", severity: "Medium" },
      { title: "Noisy or Vibration Noises", desc: "Damaged blower wheel, loose fan motor mount, or outdoor unit compressor vibration dampeners cracked.", severity: "Medium" },
      { title: "Frequent Tripping (Short Cycling)", desc: "Electrical overload, shorted compressor winding, or dirty condenser choking ventilation. Critical safety hazard.", severity: "Critical" },
      { title: "Gas Leakage & Low Cooling", desc: "Micro-holes in copper/aluminum evaporator loops. We locate leaks via nitrogen pressure, solder, vacuum, and refill.", severity: "High" }
    ],
    pricingTable: [
      { service: "Deep Jet Wet Wash & Servicing", warranty: "90-Day Service Guarantee" },
      { service: "Split AC Gas Charging (Full R32/R410/R22)", warranty: "90-Day Gas Leak Warranty" },
      { service: "Capacitor Swap (35/45/50 MFD)", warranty: "1-Year Part Warranty" },
      { service: "Copper Pipe Installation (Per Meter)", warranty: "90-Day Fitment Warranty" },
      { service: "Complete AC Dismantling & Uninstallation", warranty: "Fully Insured" }
    ],
    faqs: [
      { q: "Why is my AC running but not cooling the room?", a: "This is typically caused by three main issues: 1) Severely clogged air filters restricting indoor air cycle, 2) Low refrigerant gas level due to micro-leakages in the copper joints, or 3) A blown compressor start-run capacitor which prevents the outdoor compressor from turning on. Our technicians will run a manifold pressure test to pinpoint the exact root cause immediately." },
      { q: "What is included in your high-pressure jet wet wash service?", a: "Unlike dry brushings, our deep jet service includes covering the indoor unit with a waterproof collection funnel, high-pressure washing of the evaporator cooling coil, cleanout of the drainage pipeline to stop future leakages, outdoor unit condenser coil pressure washing, fan blade alignment checks, and operating current measurement." },
      { q: "Do you offer any guarantee on AC gas refilling?", a: "Absolutely. We never just top-up leaking gas. Our technician will first locate the micro-leakages in the evaporator/condenser coils using high-pressure soapy tests or nitrogen. Once found, we weld the leak with silver brazing, vacuum the entire system using a vacuum pump to remove air moisture, and recharge full eco-friendly refrigerant. This process is backed by a solid 90-day leak-free warranty." }
    ],
    seoParagraph: "Super-Fast Repair & Services is Bangalore's premier, top-rated local AC repair platform. We serve HSR Layout, Koramangala, Indiranagar, Jayanagar, Whitefield, Hebbal, Marathahalli, Bellandur, and Sarjapur Road. When you search for 'AC repair near me' or 'AC gas charging Bangalore', our certified technical dispatchers ensure a rapid response in under 60 minutes. From commercial centralized VRV servicing to residential split AC AMC contracts, we stand behind our workmanship.",
    localitiesText: "HSR Layout, Koramangala (Blocks 1-8), Indiranagar, Whitefield, Hebbal, Jayanagar, Marathahalli, Electronic City Phase 1 & 2, Bellandur, Sarjapur, JP Nagar, Banashankari, Malleshwaram."
  },
  "/washing-machine-repair-bangalore": {
    id: "washing-machine",
    name: "Washing Machine Services",
    h1: "Washing Machine Repair in Bangalore | Same-Day Front & Top Load Fixes",
    icon: <WashingMachine className="w-8 h-8 text-sky-600" />,
    tagline: "Stuck laundry? Get immediate doorstep troubleshooting for front load, top load, and automatic washers. Diagnostic visit is 100% free with repair.",
    longDescription: "Is your washing machine showing weird error codes or refusing to spin? Washing machine malfunctions can put your household to a halt. Whether you own an advanced inverter front-loader or a durable top-loader, our local Bangalore experts repair all issues on LG, Samsung, IFB, Bosch, Whirlpool, and Godrej. We carry specialized test jigs to diagnose faulty drum bearings, burnt water-drain pumps, clogged inlet solenoids, broken belt drives, and corrupted motherboard control PCBs.",
    whyChooseText: "We stock 100% original OEM spares like drain motors, carbon brushes, and door gaskets. Our diagnostics are performed transparently right in front of you, and we back our repairs with a comprehensive 90-day warranty card.",
    symptoms: [
      { title: "Drum Not Spinning", desc: "Usually a snapped drive belt, worn-out motor carbon brushes, or a failed door-lid interlock safety switch.", severity: "High" },
      { title: "Water Not Draining", desc: "A clogged coin filter, debris blocking the drain hose, or a completely burnt drain pump motor.", severity: "High" },
      { title: "Violent Vibration / Banging Noise", desc: "Broken drum suspension shock absorbers, cracked balance counterweights, or worn-out tub bearings.", severity: "Critical" },
      { title: "Water Inflow Failure", desc: "Faulty water inlet solenoid valve coil, clogged filter mesh, or low tap pressure.", severity: "Medium" },
      { title: "Error Codes & Dead Display", desc: "Microprocessor motherboard (PCB) fault caused by voltage surges. We run component-level IC repair or board swaps.", severity: "High" }
    ],
    pricingTable: [
      { service: "Water Inlet Valve Replacement", warranty: "90-Day OEM Part Warranty" },
      { service: "Heavy-Duty Drain Pump Installation", warranty: "90-Day Part Warranty" },
      { service: "Drum Suspension Shockers (Set of 2)", warranty: "180-Day Shockers Warranty" },
      { service: "Drive Belt Replacement", warranty: "90-Day Fitment Warranty" },
      { service: "Motherboard PCB Repair & Soldering", warranty: "90-Day PCB Warranty" }
    ],
    faqs: [
      { q: "Why is my washing machine making a loud grinding or banging noise during the fast spin?", a: "A loud, high-pitched grinding sound like a jet engine usually indicates the main tub bearings are worn out, allowing metal-on-metal friction. This requires a complete drum overhaul. A heavy banging sound, on the other hand, indicates the internal suspension dampers/springs have snapped or the concrete load weights have come loose." },
      { q: "Do you repair both top-load and front-load models on the same day?", a: "Yes. Our senior technicians carry common spares for both front-loaders and top-loaders in their mobile service kits. More than 90% of faults (like drain pumps, belts, inlet valves, or door locks) are successfully resolved in a single visit at your home." },
      { q: "Why is the machine not draining the dirty water?", a: "The most common culprit is a blocked coin trap filter (usually located at the bottom front for front-loaders) containing pins, coins, or lint. If cleaning this doesn't resolve it, the internal drain motor pump is likely burnt or jammed with small laundry items." }
    ],
    seoParagraph: "Get Bangalore's most reliable same-day washing machine repair service. Super-Fast Repair & Services provides premium domestic repairs across HSR Layout, Koramangala, Indiranagar, Jayanagar, Whitefield, and Hebbal. Search for 'washing machine repair near me' or 'LG washing machine service Bangalore' to access our top-rated specialists instantly. We prioritize upfront clarity and zero inspection fee policies.",
    localitiesText: "HSR Layout, Koramangala, Indiranagar, Whitefield, Hebbal, Jayanagar, Marathahalli, Bellandur, Sarjapur, Electronic City, JP Nagar, Malleshwaram, RT Nagar."
  },
  "/refrigerator-repair-bangalore": {
    id: "refrigerator",
    name: "Refrigerator Services",
    h1: "Refrigerator Repair & Gas Refilling in Bangalore | Same-Day Service",
    icon: <Wrench className="w-8 h-8 text-sky-600" />,
    tagline: "Fridge not cooling or tripping your electricity? Reliable single, double door & side-by-side refrigerator repairs. Genuine parts and 100% on-site fix.",
    longDescription: "When your refrigerator breaks down, hundreds of rupees worth of fresh groceries are at risk of spoiling. At Super-Fast Services, we understand the urgency. Our senior refrigeration mechanics offer same-day emergency on-site repair across Bangalore. We specialize in advanced double door frost-free, single door direct-cool, smart inverter, and massive premium side-by-side refrigerators. We are fully qualified to service Samsung, LG, Whirlpool, Bosch, Godrej, Panasonic, and Haier.",
    whyChooseText: "We specialize in on-site copper capillary leak detection, expert compressor swaps, relay replacements, and precise gas charging. We use genuine refrigerants (R134a/R600a) with rigorous pressure testing and provide a full 90-day parts replacement warranty.",
    symptoms: [
      { title: "No Cooling in Refrigerator", desc: "Faulty overload protector (OLP), failed start relay, or completely dead inverter compressor. Needs prompt electrical diagnostics.", severity: "Critical" },
      { title: "Freezer Working, Lower Cabin Warm", desc: "Blocked air damper duct, failed defrost heater coil, or frozen evaporator due to a faulty thermal bi-metal sensor.", severity: "High" },
      { title: "Constant Clicking Sound", desc: "The compressor is overheating or struggling to start because of a burnt relay capacitor. Turn off immediately to save the compressor.", severity: "High" },
      { title: "Water Leaking Inside or Floor", desc: "Clogged defrost drain hole or cracked drain pan causing melted frost water to overflow.", severity: "Medium" },
      { title: "Excessive Frost Ice in Freezer", desc: "Defrost timer failure, bi-metal thermostat sensor fault, or damaged magnetic door gasket seal allowing humid air inside.", severity: "High" }
    ],
    pricingTable: [
      { service: "Start Relay & OLP Assembly Swap", warranty: "90-Day Part Warranty" },
      { service: "Defrost Bi-Metal Sensor / Thermostat", warranty: "90-Day Part Warranty" },
      { service: "Genuine Gas Refilling & Capillary Flush", warranty: "90-Day Gas Warranty" },
      { service: "Inverter Compressor Replacement", warranty: "1-Year Manufacturer Warranty" },
      { service: "Defrost Timer or Fan Motor Replacement", warranty: "90-Day Part Warranty" }
    ],
    faqs: [
      { q: "Why is the freezer freezing but the food cabin warm?", a: "In frost-free refrigerators, this is a classic 'Defrost System' failure. A heater is supposed to melt accumulated ice on the evaporator coil every 8 hours. If the defrost timer, bi-metal sensor, or the thermal fuse fails, thick ice blocks the air channel, preventing the fan from pushing cold air down to the food compartment. We can test and replace the faulty component on-site." },
      { q: "Is a clicking noise from the back of my fridge dangerous?", a: "Yes, it indicates the compressor is trying to start but is drawing too much current and is being shut off by the Overload Protector (OLP) to prevent a fire. This click is usually caused by a faulty start relay, but could also mean the compressor motor windings have seized. You should unplug the fridge and wait for our technician to inspect it." },
      { q: "How long does gas refilling take, and is it done at my house?", a: "Yes, we do 100% of refrigerator gas refilling at your doorstep! The process takes about 1.5 to 2 hours. It involves: 1) Tracing the gas leak on the joints, 2) Brazing/soldering the leak, 3) Flashing the copper capillary tubes, 4) Creating a deep vacuum to remove moisture, and 5) Recharging the precise weight of genuine R134a or R600a refrigerant using a digital weighing scale." }
    ],
    seoParagraph: "Trust Bangalore's leading local refrigerator repair service. Super-Fast Repair & Services ensures high-speed technician dispatches in Koramangala, HSR Layout, Indiranagar, Whitefield, Hebbal, and Jayanagar. When looking for 'fridge repair near me' or 'Samsung double door repair Bangalore', we offer the perfect combination of experienced technical partners, OEM replacement components, and upfront assessment guarantees.",
    localitiesText: "HSR Layout, Koramangala, Indiranagar, Whitefield, Hebbal, Jayanagar, Marathahalli, Bellandur, Sarjapur, Electronic City, JP Nagar, Malleshwaram, Banashankari."
  },
  "/microwave-repair-bangalore": {
    id: "microwave",
    name: "Microwave Oven Services",
    h1: "Microwave Oven Repair in Bangalore | Same-Day Magnetron & Panel Repair",
    icon: <Microwave className="w-8 h-8 text-sky-600" />,
    tagline: "Microwave not heating or sparking inside? Safe, same-day convection, grill, and solo microwave repairs in 60 minutes.",
    longDescription: "A microwave oven is a essential kitchen convenience, but high-voltage components make it dangerous to handle without specialized safety training. At Super-Fast Services, our technicians are certified in high-voltage micro-circuits. We offer prompt, safe, and expert troubleshooting for Samsung, LG, IFB, Whirlpool, Godrej, and Morphy Richards microwaves. From high-power magnetron failures and shorted high-voltage diodes to cracked mica waveguide sheets and dead control PCBs, we restore your appliance to perfect safety.",
    whyChooseText: "Microwave radiation and high-voltage capacitors require absolute precision. Our technicians use professional insulation tools, leakage detectors, and carry genuine spare parts to ensure 100% on-site repairs with complete safety compliance.",
    symptoms: [
      { title: "Microwave Runs But No Heating", desc: "Typically a blown high-voltage fuse, a failed magnetron filament, or a short-circuited high-voltage capacitor.", severity: "Critical" },
      { title: "Sparking or Arcing Inside Cabin", desc: "A burnt mica sheet waveguide cover or exposed paint on the inner metal walls creating electrical arcs. Turn off immediately.", severity: "High" },
      { title: "Buttons/Touchpad Not Responding", desc: "Damaged touch membrane keypad, ribbon cable corrosion, or component failures on the control board PCB.", severity: "High" },
      { title: "Turntable Glass Plate Not Rotating", desc: "Faulty sync synchronous motor under the tub, cracked coupling wheel, or damaged rollers.", severity: "Medium" },
      { title: "Sudden Power Tripping or Dead Unit", desc: "Faulty door safety micro-switches, shorted main transformer winding, or a blown input thermal fuse.", severity: "Critical" }
    ],
    pricingTable: [
      { service: "Waveguide Mica Sheet Replacement", warranty: "90-Day Part Warranty" },
      { service: "High-Voltage Diode / Fuse Replacement", warranty: "90-Day Part Warranty" },
      { service: "Genuine Microwave Magnetron Replacement", warranty: "180-Day Part Warranty" },
      { service: "Glass Turntable Synchronous Motor", warranty: "90-Day Motor Warranty" },
      { service: "Touchpad Membrane Keyboard Replacement", warranty: "90-Day Membrane Warranty" }
    ],
    faqs: [
      { q: "Why is the microwave running, light is on, but food is ice cold?", a: "The heating in a microwave is powered by a high-voltage circuit. If the oven spins and counts down but does not heat, either the high-voltage diode, the high-voltage capacitor, or the magnetron itself (the component that generates heat waves) has failed or shorted. Our technician can test these safely with a high-resistance multi-meter and swap the faulty part on-site." },
      { q: "What causes sparking inside the microwave cavity?", a: "Sparking (or arcing) is almost always caused by a dirty, grease-soaked, or burnt mica waveguide sheet (the small silver card on the inside right wall). Food splatters carbonize on this card, and the microwave energy heats the carbon until it sparks. Replacing this waveguide card is quick and inexpensive, but should be done immediately to avoid destroying the magnetron." },
      { q: "Is it safe to repair a microwave oven myself?", a: "Absolutely not. Microwaves contain a massive high-voltage capacitor that stores over 2,000 Volts of electricity even when the appliance is completely unplugged! This is a lethal voltage. Microwave repair must only be performed by certified technicians using professional discharging tools." }
    ],
    seoParagraph: "Super-Fast Repair & Services is the premier choice for professional microwave repairs in Bangalore. We offer same-day doorstep services across Koramangala, HSR Layout, Indiranagar, Jayanagar, Whitefield, and Hebbal. If you search for 'microwave repair near me' or 'IFB microwave service Bangalore', our rapid action specialists arrive within 60 minutes with certified OEM spare parts.",
    localitiesText: "HSR Layout, Koramangala, Indiranagar, Whitefield, Hebbal, Jayanagar, Marathahalli, Bellandur, Sarjapur, JP Nagar, Malleshwaram, Banashankari, Kalyan Nagar."
  },
  "/water-heater-repair-bangalore": {
    id: "water-heater",
    name: "Water Heater Services",
    h1: "Water Heater & Geyser Repair in Bangalore | 100% Safe Same-Day Service",
    icon: <Flame className="w-8 h-8 text-sky-600" />,
    tagline: "No hot water? Get safe, same-day repairs for instant and storage geysers in under 60 minutes. Expert thermostat & heating element replacements.",
    longDescription: "Geyser malfunctions like lukewarm water, water leakages, or electrical shocks are highly disruptive and dangerous. At Super-Fast Services, our plumbing and electrical technicians are certified in safe water heater repair. We troubleshoot instant geysers, horizontal/vertical storage geysers, gas geysers, and solar systems on leading brands including Havells, V-Guard, AO Smith, Racold, Bajaj, Venus, and Crompton. We ensure your safety systems like thermal cut-outs and pressure relief valves are calibrated perfectly.",
    whyChooseText: "Water heater repairs demand 100% safe practices because of the combination of high-voltage electricity and water pressure. We use high-grade copper elements, non-corrosive sacrifical magnesium anode rods, and multi-point safety testing on every job.",
    symptoms: [
      { title: "Geyser Not Heating Water", desc: "A completely burnt-out copper heating element or a faulty thermostat assembly. Quick on-site replacement is available.", severity: "High" },
      { title: "Lukewarm Water / Slow Heating", desc: "Thick calcium/scaling buildup on the heating element insulating the thermal transfer, or single coil failure.", severity: "Medium" },
      { title: "Electric Shock on Hot Water Tap", desc: "The outer sheath of the heating element has ruptured, exposing live current directly to water. High danger! Unplug immediately.", severity: "Critical" },
      { title: "Water Leaking From Bottom", desc: "Corroded internal water storage tank or failed rubber flange seal washer. Needs professional dismantling and sealing.", severity: "High" },
      { title: "MCB Trips on Turning Geyser On", desc: "Direct short-circuit in the electrical coil or water ingress inside the geyser cap wetting the thermostat wiring.", severity: "Critical" }
    ],
    pricingTable: [
      { service: "Heavy-Duty Copper Heating Element (2kW/3kW)", warranty: "1-Year Element Warranty" },
      { service: "Thermostat / Thermal Cutout Swap", warranty: "90-Day Part Warranty" },
      { service: "Sacrificial Magnesium Anode Rod", warranty: "Prevents Tank Corrosion" },
      { service: "Flange Seal Ring Washer Replacement", warranty: "Stops Tank Leaks" },
      { service: "Geyser Installation & Safety Calibrating", warranty: "90-Day Fitment Warranty" }
    ],
    faqs: [
      { q: "Why is the geyser not heating water at all?", a: "This is usually caused by two main factors: 1) The heating element inside the geyser has burned out due to mineral scaling or running without water, or 2) The high-limit thermostat auto cut-off switch has tripped or failed due to overheating. Our technician can test both components and get your hot water restored in under 30 minutes." },
      { q: "Is it dangerous if I feel a mild shock/tingling in the tap water?", a: "Yes, it is EXTREMELY dangerous. It indicates the copper heating element has ruptured and live electrical currents are leaking directly into the hot water stream. This is a severe shock hazard. Turn off the main geyser power switch immediately and do not use it until our technician replaces the element and checks the earthing wiring." },
      { q: "Why is my geyser tank leaking water from the bottom?", a: "Water leakage is usually caused by a corroded inner steel tank (especially in areas with hard water) or a failed rubber gasket seal at the heating element flange. If it's a gasket leak, we can easily replace the seal. If the metal tank itself has rusted through, the geyser tank must be replaced, and we will advise you on the most durable options." }
    ],
    seoParagraph: "Super-Fast Repair & Services is the gold standard for geyser and water heater repairs in Bangalore. We cover HSR Layout, Koramangala, Indiranagar, Whitefield, Hebbal, Jayanagar, and Marathahalli. If you search for 'geyser repair near me' or 'AO smith geyser service Bangalore', our certified technical dispatchers ensure a doorstep resolution with premium parts and 1-year warranties.",
    localitiesText: "HSR Layout, Koramangala, Indiranagar, Whitefield, Hebbal, Jayanagar, Marathahalli, Bellandur, Sarjapur, Electronic City, JP Nagar, Malleshwaram."
  }
};

export default function ServicePage({ path, onNavigate, onOpenBooking }: ServicePageProps) {
  const data = SERVICE_PAGES_DATA[path];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!data) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested URL does not exist.</p>
        <button
          onClick={() => onNavigate("/")}
          className="mt-4 bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Cross links to other service pages
  const otherPages = Object.keys(SERVICE_PAGES_DATA).filter(p => p !== path);

  return (
    <div className="bg-slate-50/50 min-h-screen pt-4 pb-16 font-sans">
      
      {/* Breadcrumb section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-6">
          <button 
            onClick={() => onNavigate("/")} 
            className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-400">Bangalore</span>
          <span>/</span>
          <span className="text-slate-800">{data.name}</span>
        </nav>
      </div>

      {/* Main Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Main SEO & Symptoms) - Col-span-8 */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-4">
              <span className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-inner">
                {data.icon}
              </span>
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                  Verified Same-day Bangalore service
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-800 leading-tight mt-1.5">
                  {data.h1}
                </h1>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-4">
              {data.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {data.longDescription}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-slate-100">
              <button
                onClick={() => onOpenBooking(data.id)}
                className="bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-xl font-display font-bold text-xs shadow-md transition-colors text-center cursor-pointer"
              >
                Book Doorstep Visit Now (FREE Diagnostic)
              </button>
              <a
                href="tel:9886627228"
                className="bg-blue-50 border border-blue-200 text-primary py-3 px-5 rounded-xl font-display font-bold text-xs text-center hover:bg-blue-100 transition-colors"
              >
                Call Support: 98866 27228
              </a>
            </div>
          </div>

          {/* Quick Symptoms Diagnosis Guide */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-display font-bold text-slate-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" /> Common Faults &amp; Diagnosis Guide
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Find the issue you are experiencing with your {data.name.toLowerCase()} below to understand severity, approximate fix rates, and technical causes.
            </p>

            <div className="space-y-4">
              {data.symptoms.map((sym, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">{sym.title}</h4>
                      <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        sym.severity === "Critical" 
                          ? "bg-red-100 text-red-800 border border-red-200" 
                          : sym.severity === "High" 
                          ? "bg-orange-100 text-orange-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {sym.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{sym.desc}</p>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded font-extrabold uppercase tracking-wide border border-emerald-100">
                      Active Diagnostic
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Sheet */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-display font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Service Operations &amp; Official Warranty
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Every job is handled by senior certified experts. We believe in total transparency: our diagnostics are 100% free with the repair, and we provide upfront, clear assessments before starting any work. No visiting fees, no hidden overheads.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-bold text-slate-700">Service / Repair Detail</th>
                    <th className="p-4 font-bold text-slate-700">Official Warranty Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.pricingTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-800">{row.service}</td>
                      <td className="p-4 text-slate-500 font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" /> {row.warranty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Specialized FAQ Accordion */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-display font-bold text-slate-800 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" /> Service-Specific FAQs
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Read technical clarifications regarding your {data.name.toLowerCase()} common failures and our diagnostic approaches.
            </p>

            <div className="space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-150 rounded-2xl overflow-hidden bg-slate-50/30">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-slate-50/50 focus:outline-none"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 pr-4">
                        {faq.q}
                      </h4>
                      <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 border-t border-slate-150 bg-slate-50/80 text-xs text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Broad SEO crawlable block */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-sm font-display font-bold text-slate-800 mb-2.5">
              Professional local {data.name} in Bangalore
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {data.seoParagraph}
            </p>
          </div>

        </div>

        {/* Right Column (Sidebars, CTA, Cross Links) - Col-span-4 */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Contact Form Card */}
          <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-sm font-display font-extrabold uppercase tracking-widest text-orange-400 mb-1">
              Need Help Instantly?
            </h3>
            <h4 className="text-base sm:text-lg font-display font-bold tracking-tight mb-3 text-white">
              Get Free Doorstep Consultation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Our local expert technician is already present in your neighborhood. Fill the quick form or call our helpline channels directly.
            </p>

            <div className="space-y-3.5">
              <button
                onClick={() => onOpenBooking(data.id)}
                className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-display font-bold text-xs shadow-md transition-colors text-center cursor-pointer block"
              >
                Configure Appointment Now
              </button>
              
              <a
                href="tel:9886627228"
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white py-3.5 rounded-xl font-display font-bold text-xs text-center transition-colors block"
              >
                📞 Call Line: 98866 27228
              </a>

              <a
                href="https://wa.me/919886627228?text=Hi!%20I%2520am%20looking%20for%2520fast%2520appliance%2520repair%2520service."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-display font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" /> Chat on WhatsApp
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-3 text-[10px] text-slate-400 font-semibold justify-center">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>12 Techs Active in Bangalore right now</span>
            </div>
          </div>

          {/* Localized Area coverage */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-display font-bold text-slate-800 uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> Neighborhood Coverage
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              We offer full same-day express doorstep dispatch across Bangalore neighborhoods under 60 minutes, including:
            </p>
            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {data.localitiesText}
            </p>
          </div>

          {/* Cross Links to other Services */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-display font-bold text-slate-800 uppercase tracking-widest text-slate-400 mb-4">
              Explore Other Services
            </h4>
            <div className="space-y-2.5">
              {otherPages.map((p) => {
                const pData = SERVICE_PAGES_DATA[p];
                return (
                  <button
                    key={p}
                    onClick={() => onNavigate(p)}
                    className="w-full p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left flex items-center justify-between group focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center shrink-0">
                        {pData.icon}
                      </span>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">
                        {pData.name}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
