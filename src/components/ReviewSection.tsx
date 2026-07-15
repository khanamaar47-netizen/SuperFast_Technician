/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  MessageSquare, 
  User, 
  MapPin, 
  PenTool, 
  Check, 
  Wrench,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { CustomerReview } from "../types";

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev1",
    name: "Aman Preet Singh",
    location: "Koramangala, Sector 3",
    rating: 5,
    text: "Extremely fast service! My double door refrigerator stopped cooling in the morning. Placed a request here, and Sanjeev arrived within 45 minutes. He replaced the start relay on the spot. Outstanding professional service, absolutely no hidden charges. Strongly recommended!",
    serviceType: "Refrigerator Repair",
    date: "2 days ago"
  },
  {
    id: "rev2",
    name: "Meera Nair",
    location: "HSR Layout, Sector 6",
    rating: 5,
    text: "Serviced my Split AC yesterday. The technician did a thorough deep jetspray washing of the indoor filter and repaired the gas leakage safely. The remote is fully working now and cooling is incredibly chilly. The custom options discussed on call were very clear.",
    serviceType: "AC Servicing",
    date: "1 week ago"
  },
  {
    id: "rev3",
    name: "Sarthak Sen",
    location: "Indiranagar, 12th Main",
    rating: 4,
    text: "Microwave sparking issue fixed. Prompt communication in WhatsApp by the Super-Fast team. The magnetron took one day to fetch from the official depot but everything was covered transparently with the 90-day warranty card. Honest professionals.",
    serviceType: "Microwave Oven Fix",
    date: "2 weeks ago"
  },
  {
    id: "rev4",
    name: "Ridhi Saxena",
    location: "Whitefield, Prestige Palms",
    rating: 5,
    text: "Washing machine water drain pump was completely choked. Ramesh arrived with gloves and professional diagnostic tools. Removed the coins and solved the error code issue in less than 20 mins. Honest diagnostics and very clean work.",
    serviceType: "Washing Machine Repair",
    date: "3 weeks ago"
  }
];

export default function ReviewSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);
  const [newService, setNewService] = useState<string>("AC Services");

  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const filteredReviews = useMemo(() => {
    if (activeFilter === "all") return reviews;
    return reviews.filter(r => r.serviceType.toLowerCase().includes(activeFilter.toLowerCase()) || r.text.toLowerCase().includes(activeFilter.toLowerCase()));
  }, [reviews, activeFilter]);

  const metrics = useMemo(() => {
    const total = reviews.length;
    const avg = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) : "0.0";
    const fiveStars = reviews.filter(r => r.rating === 5).length;
    return { total, avg, fiveStars };
  }, [reviews]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newLocation.trim() || !newText.trim()) {
      setFormError("Please fill out your Name, Location, and Review Text.");
      return;
    }

    const brandNew: CustomerReview = {
      id: "rev-" + Date.now(),
      name: newName.trim(),
      location: newLocation.trim(),
      rating: newRating,
      text: newText.trim(),
      serviceType: newService,
      date: "Just now"
    };

    setReviews(prev => [brandNew, ...prev]);
    setNewName("");
    setNewLocation("");
    setNewText("");
    setNewRating(5);
    setFormSuccess(true);
    setFormError("");

    setTimeout(() => {
      setFormSuccess(false);
      setFormOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 bg-surface-container-lowest rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
            <TrendingUp className="w-3 h-3 text-amber-600" /> Customer Stories
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-slate-800">
            Hear From 50,000+ Happy Homes
          </h3>
          <p className="text-xs text-slate-500">
            Real feedback from verified clients in your city who experience lighting speed appliance repairs.
          </p>
        </div>

        <button
          onClick={() => setFormOpen(p => !p)}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-xs font-bold font-display flex items-center gap-1.5 transition-all shadow-sm focus:outline-none"
        >
          <PenTool className="w-3.5 h-3.5" /> {formOpen ? "Close Review Blank" : "Write a Review"}
        </button>
      </div>

      {/* Stats summary banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
        <div>
          <span className="text-3xl md:text-4xl font-extrabold text-primary font-display">{metrics.avg}</span>
          <div className="flex items-center justify-center gap-0.5 text-amber-500 my-1">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
            ))}
          </div>
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Average Score</p>
        </div>
        <div>
          <span className="text-3xl md:text-4xl font-extrabold text-slate-800 font-display">{metrics.total}</span>
          <p className="text-sm text-slate-500 font-medium my-1">Verified Critiques</p>
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Platform Total</p>
        </div>
        <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0">
          <span className="text-3xl md:text-4xl font-extrabold text-emerald-600 font-display">
            {Math.round((metrics.fiveStars / metrics.total) * 100)}%
          </span>
          <p className="text-sm text-slate-500 font-medium my-1">Rated 5 out of 5 stars</p>
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Delight Quotient</p>
        </div>
      </div>

      {/* Review Submission Accordion */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-5 bg-blue-50/30 rounded-2xl border border-blue-100 space-y-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Share Your Appraisal with Super-Fast Services</h4>
              
              {formSuccess ? (
                <div className="p-4 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 rounded-xl text-xs flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <div>
                    <strong>Review Posted!</strong> Thank you for your support, it helps other home owners select dependable services with trust.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Priyanjali Sen"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Neighborhood / City</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Indiranagar, Bangalore"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Service Type Done</label>
                      <select
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="AC Services">AC Services</option>
                        <option value="Washing Machine Repair">Washing Machine Repair</option>
                        <option value="Refrigerator Repair">Refrigerator Repair</option>
                        <option value="Microwave Oven Fix">Microwave Oven Fix</option>
                        <option value="Water Heater Service">Water Heater Service</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Star Rating</label>
                      <div className="flex items-center gap-1 pt-1.5">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const isActive = starValue <= newRating;
                          return (
                            <button
                              key={starValue}
                              type="button"
                              onClick={() => setNewRating(starValue)}
                              className="focus:outline-none"
                            >
                              <Star className={`w-5 h-5 ${isActive ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Your Detailed Experience</label>
                    <textarea
                      rows={3}
                      placeholder="Share exact comments about Sanjeev's punctuality, pricing transparency, or cleanup..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-1 focus:ring-primary outline-none resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-500 font-semibold">{formError}</p>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="px-3 py-1.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded text-xs font-bold transition-all"
                    >
                      Submit Verified Review
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <span className="text-xs text-slate-500 font-semibold uppercase pr-1 shrink-0">Filter By tag:</span>
        {[
          { key: "all", label: "All Reviews" },
          { key: "ac", label: "AC Services" },
          { key: "washing", label: "Washing Machine" },
          { key: "refrigerator", label: "Refrigerator" },
          { key: "microwave", label: "Microwave" },
          { key: "heater", label: "Water Geyser" }
        ].map((chip) => {
          const isSelected = activeFilter === chip.key;
          return (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all focus:outline-none ${
                isSelected 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredReviews.length === 0 ? (
            <div className="col-span-1 md:col-span-2 text-center p-8 bg-slate-50 rounded-2xl text-slate-400 text-sm italic">
              No matching reviews discovered for this appliance type yet. Be the first to post!
            </div>
          ) : (
            filteredReviews.map((rev) => {
              return (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs select-none uppercase">
                          {rev.name.charAt(0)}{rev.name.split(" ")[1]?.charAt(0) || ""}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 leading-tight">{rev.name}</h4>
                          <span className="text-[10px] text-slate-500 font-medium flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-slate-400" /> {rev.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-200/50 text-[10px]">
                    <span className="bg-primary-container-bg text-primary px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                      <Wrench className="w-2.5 h-2.5 text-primary" /> {rev.serviceType}
                    </span>
                    <span className="text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
