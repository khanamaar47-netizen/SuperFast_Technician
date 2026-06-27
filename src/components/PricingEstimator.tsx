/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  Sparkles, 
  Check, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  Clock,
  Wrench
} from "lucide-react";
import { ServiceItem } from "../types";

interface PricingEstimatorProps {
  services: ServiceItem[];
  onOpenBookingWithService: (serviceId: string, subType: string) => void;
}

interface EstimateJobOption {
  name: string;
  priceModifier: number;
  badge?: string;
  description: string;
}

export default function PricingEstimator({ services, onOpenBookingWithService }: PricingEstimatorProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("ac");
  const [selectedJobIndex, setSelectedJobIndex] = useState<number>(0);
  const [includeWarranty, setIncludeWarranty] = useState<boolean>(true);
  const [weekendSlot, setWeekendSlot] = useState<boolean>(false);

  const selectedService = useMemo(() => {
    return services.find(s => s.id === selectedServiceId) || services[0];
  }, [services, selectedServiceId]);

  // Specific jobs with individual cost weights
  const jobOptions = useMemo<EstimateJobOption[]>(() => {
    switch (selectedServiceId) {
      case "ac":
        return [
          { name: "General Air Filter Clean & Deep Washing", priceModifier: 0, description: "Detailed wet-wash of indoor & outdoor coils, check operational currents." },
          { name: "Premium Foam Jet Cleaning Service", priceModifier: 200, badge: "Deep Action", description: "Specialized high-pressure chemical foam jet-cleaning for ultimate dust removal, fresh airflow and improved cooling." },
          { name: "AC Water Leakage & Unblocking Solution", priceModifier: 150, description: "Clear indoor drain tray blockages, clean out debris mold, and route drain pipeline to stop indoor drips." },
          { name: "AC Power Issue & Tripping Diagnosis", priceModifier: 250, description: "Check MCB tripping, replace burnt wires, solve compressor overload relays and startup capacitor faults safely." },
          { name: "Gas Leakage Test & Full R32/R410 Topping", priceModifier: 600, badge: "Popular", description: "Nitrogen testing, leak solder jointing, vaccum charging and pressure check." },
          { name: "Main PCB Microprocessor Board Repair", priceModifier: 900, description: "IC programming, solder repair, capacitor/resistor fault fix with warranty." },
          { name: "Complete Split Outer Unit Installation", priceModifier: 400, description: "Precision copper pipe bending, brackets anchoring, electrical coupling & setup." }
        ];
      case "washing-machine":
        return [
          { name: "General Tub Clean & Filter De-scaling", priceModifier: 0, description: "Mechanical lint collector sanitizing, pump flush, drum alignment test." },
          { name: "Washing Drum Inlet Bearings & Belt Repair", priceModifier: 550, badge: "Best Value", description: "Replacing high-wear rubber belts or stainless steel steel bearings to quiet spins." },
          { name: "Drain Water Pump / Outlet Hose Blockage", priceModifier: 250, description: "Clear pump impeller debris, replace inlet solenoid water flow valves." },
          { name: "Major Inverter Motor Repair & Carbon brush", priceModifier: 800, description: "Motor rewinding, direct drive hub tuning, diagnostic run parameters check." }
        ];
      case "refrigerator":
        return [
          { name: "Thermostat Replacement & Defrost Heat", priceModifier: 0, description: "Bi-metal sensor swap, heater diagnostics to clear ice accumulation blocks." },
          { name: "Compressor Starter Relay & Capacitor Swap", priceModifier: 350, description: "PTC starter overload protector replacement. High reliability spare." },
          { name: "Refrigerant Gas Charging (R600a/R134a)", priceModifier: 750, badge: "Critical", description: "Compressor vacuuming, filter drier replacement, precise refrigerant charging." },
          { name: "Magnetic Door Gasket Seal Replacements", priceModifier: 200, description: "Replacing cracked warm-air leaking gaskets with commercial-grade magnetic seals." }
        ];
      case "microwave":
        return [
          { name: "High-Voltage Magnetron Replacement", priceModifier: 500, badge: "Direct Fix", description: "Solves 'No Heating / Sparks' instantly. Includes replacement safety capacitor." },
          { name: "Digital Touch Control Membrane Repair", priceModifier: 150, description: "Trace recovery or complete button ribbon replacement. Restores quick options." },
          { name: "Turntable Drive Motor & Central Coupling", priceModifier: 100, description: "Resolves food not rotating or grinding noises during run cycles." }
        ];
      case "water-heater":
        return [
          { name: "Anode / Heating Element Descaling & Swap", priceModifier: 0, description: "Removing hard water scale or swapping 2kW electric heating elements safely." },
          { name: "Auto Shutoff Thermostat Safety Cutout", priceModifier: 200, description: "Overheating protection sensor upgrade to prevent steam pressure bursts." },
          { name: "Complete Wall Mounting & Plumbing Hookup", priceModifier: 300, description: "Anchor bolts installation, heavy-duty connection pipes and pressure safety valves." }
        ];
      case "heat-pump":
        return [
          { name: "Domestic Heat Pump: Diagnostics & Tuning", priceModifier: 0, description: "Complete delta-T temperature check, filter cleaning, and fan speed diagnostics for home systems." },
          { name: "Domestic Heat Pump: Reversing Valve & Capacitor Fix", priceModifier: 350, description: "Reversing valve swap, run capacitor replacement, or electrical wiring overhaul for residential models." },
          { name: "Commercial Heat Pump: High-Capacity Diagnostics", priceModifier: 150, description: "Detailed check of industrial multi-compressor setups, thermal expansion valves, and central pumps." },
          { name: "Commercial Heat Pump: Heavy-Duty System Repair & Descaling", priceModifier: 800, badge: "Industrial", description: "Full descaling, refrigerant level restoration, oil balancing, and major compressor repair." }
        ];
      default:
        return [
          { name: "General Diagnostic Inspection", priceModifier: 0, description: "Full device health testing and custom on-the-spot price summary quotes." }
        ];
    }
  }, [selectedServiceId]);

  // Adjust active job index if it exceeds length
  const activeJobIndex = selectedJobIndex >= jobOptions.length ? 0 : selectedJobIndex;
  const currentJob = jobOptions[activeJobIndex] || jobOptions[0];

  const totals = useMemo(() => {
    const base = selectedService?.basePrice || 399;
    const modifier = currentJob?.priceModifier || 0;
    const warrantyCost = includeWarranty ? 149 : 0;
    const weekendCost = weekendSlot ? 99 : 0;

    const subtotal = base + modifier + warrantyCost + weekendCost;
    const gstValue = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gstValue;

    return {
      subtotal,
      gst: gstValue,
      total: grandTotal
    };
  }, [selectedService, currentJob, includeWarranty, weekendSlot]);

  return (
    <div id="pricing-estimator" className="p-6 md:p-8 bg-white rounded-3xl border border-slate-200/80 shadow-md">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Selection panel */}
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-teal-50 text-teal-800 font-mono text-xs font-bold uppercase">
              <Wrench className="w-3.5 h-3.5" /> Service Request & Estimate Planner
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-800">
              Select Your Appliance Requirements
            </h3>
            <p className="text-sm text-slate-500">
              Pick your category and problem area to understand our service options. We will call you to discuss the final flat-rate quotation before visiting.
            </p>
          </div>

          {/* Select appliance type scrollable row */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. Selected Appliance Category</label>
            <div className="flex flex-wrap gap-2">
              {services.map((item) => {
                const isActive = item.id === selectedServiceId;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedServiceId(item.id);
                      setSelectedJobIndex(0);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all focus:outline-none flex items-center gap-1.5 ${
                      isActive 
                        ? "bg-primary border-primary text-white shadow-md shadow-blue-200" 
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select task type */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Choose Common Repair Service</label>
            <div className="space-y-2">
              {jobOptions.map((job, idx) => {
                const isSelected = idx === activeJobIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedJobIndex(idx)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 ${
                      isSelected 
                        ? "border-primary bg-blue-50/20 ring-1 ring-primary" 
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="max-w-md">
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-primary bg-primary text-white" : "border-slate-300"
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">{job.name}</h4>
                        {job.badge && (
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                            {job.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 pl-6 mt-1 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    <div className="sm:text-right pl-6 sm:pl-0">
                      <span className="text-xs text-slate-400">Option Status</span>
                      <p className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase mt-0.5 inline-block">
                        Available
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value toggles */}
          <div className="space-y-3 pt-1 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">3. Protection & Convenience Add-ons</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div 
                onClick={() => setIncludeWarranty(p => !p)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  includeWarranty ? "border-emerald-600 bg-emerald-50/10" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input 
                    type="checkbox" 
                    checked={includeWarranty}
                    onChange={() => {}} // handled by click
                    className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      90-Day Spares Warranty <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                    </h5>
                    <p className="text-[10px] text-slate-500">Zero replacement fees on spares of same fault</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-600">INCLUDED</span>
              </div>

              <div 
                onClick={() => setWeekendSlot(p => !p)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  weekendSlot ? "border-amber-600 bg-amber-50/10" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input 
                    type="checkbox" 
                    checked={weekendSlot}
                    onChange={() => {}} // handled by click
                    className="rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      Weekend Prime Slot <Clock className="w-3.5 h-3.5 text-amber-600" />
                    </h5>
                    <p className="text-[10px] text-slate-500">Lock in saturday/sunday priorities</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-amber-600">INCLUDED</span>
              </div>

            </div>
          </div>
        </div>

        {/* Estimation Result Panel */}
        <div className="w-full lg:w-[320px] bg-slate-900 text-slate-100 rounded-2xl p-6 flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle neon details */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Selected Summary</span>
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded text-[9px] font-mono font-bold tracking-widest">CALL FOR QUOTE</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between items-start">
                <span className="text-slate-400 shrink-0">Device Group:</span>
                <span className="font-bold text-right text-white">{selectedService?.name}</span>
              </div>
              <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-800/60">
                <span className="text-slate-400">Target Area:</span>
                <span className="font-bold text-white truncate text-right max-w-full block" title={currentJob?.name}>{currentJob?.name}</span>
              </div>
              <div className="flex justify-between items-center text-teal-400 bg-teal-500/10 px-2 py-1.5 rounded mt-2">
                <span>In-Home Consultation:</span>
                <span className="font-extrabold text-white">FREE (₹0)</span>
              </div>
              
              <div className="pt-2 border-t border-slate-800/60 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">90-Day Spares Shield:</span>
                  <span className={includeWarranty ? "text-emerald-400 font-semibold" : "text-slate-500"}>{includeWarranty ? "Active" : "Inactive"}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Weekend Slot Priority:</span>
                  <span className={weekendSlot ? "text-amber-400 font-semibold" : "text-slate-500"}>{weekendSlot ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-400 font-semibold block text-center">ESTIMATION TYPE</span>
              <p className="text-2xl font-display font-extrabold text-teal-400 text-center tracking-tight uppercase">
                Discuss on Call
              </p>
              <span className="text-[10px] text-slate-400 text-center block leading-normal">
                Our technicians study the problem and share a final customized phone quotation. Zero doorstep visit charges apply!
              </span>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Transparent Rates
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                We believe in human-to-human clarity. Describe your device symptoms, discuss upfront, and agree on flat-rates before we touch anything.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <button
              onClick={() => onOpenBookingWithService(selectedServiceId, currentJob ? `${selectedService.name} - ${currentJob.name}` : `${selectedService.name} - General inspection`)}
              className="w-full bg-secondary-container hover:bg-secondary-container-hover active:scale-[0.98] text-white py-3.5 px-4 rounded-xl font-bold font-display text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-400/20 cursor-pointer"
            >
              <span>Discuss Quote Over Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
