
import { useState } from "react";
import {
  Search,
  CalendarDays,
  Wallet,
  Sparkles,
  MapPin,
  Users,
  ArrowRight,
  X,
  Leaf,
  Compass,
} from "lucide-react";

import heroImage from "../assets/hero.png";
import destinations from "../data/Destinations";
import DestinationCard from "../components/DestinationCard";

function Home() {
  const [showPlan, setShowPlan] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedCrowd, setSelectedCrowd] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const budgetLimits = {
    "₹3,000 - ₹5,000": 5000,
    "₹5,000 - ₹10,000": 10000,
    "₹10,000 - ₹20,000": 20000,
    "₹20,000+": Infinity,
  };

  const filteredDestinations = destinations
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedDuration
        ? item.duration === Number(selectedDuration)
        : true
    )
    .filter((item) =>
      selectedBudget
        ? item.estimatedBudget <= budgetLimits[selectedBudget]
        : true
    )
    .filter((item) =>
      selectedInterest
        ? item.category === selectedInterest
        : true
    )
    .filter((item) =>
      selectedCrowd
        ? item.crowdLevel === selectedCrowd
        : true
    );

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDuration("");
    setSelectedBudget("");
    setSelectedInterest("");
    setSelectedCrowd("");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedDuration ||
    selectedBudget ||
    selectedInterest ||
    selectedCrowd;

  const recommendations = {
    Nature: destinations.find(
      (item) =>
        item.category === "Nature" &&
        item.crowdLevel === "low"
    ),

    Adventure: destinations.find(
      (item) =>
        item.category === "Adventure" &&
        item.crowdLevel === "low"
    ),

    Culture: destinations.find(
      (item) =>
        item.category === "Culture" &&
        item.crowdLevel === "low"
    ),

    Food: destinations.find(
      (item) =>
        item.category === "Food" &&
        item.crowdLevel === "low"
    ),

    Wellness: destinations.find(
      (item) =>
        item.category === "Wellness" &&
        item.crowdLevel === "low"
    ),
  };

  const selectedRecommendation =
    recommendations[selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hidden India"
            className="h-full w-full object-cover opacity-60"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <Leaf size={16} />
              Discover India's Hidden Gems
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Travel Beyond the
              <span className="block text-emerald-400">
                Crowded Destinations
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Discover peaceful, affordable and lesser-known
              destinations across India while supporting local
              communities and sustainable tourism.
            </p>

            <button
              onClick={() => setShowPlan(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-xl"
            >
              <Sparkles size={18} />
              Generate AI Travel Plan
            </button>

          </div>
        </div>
      </section>

      {/* ================= SEARCH & FILTERS ================= */}

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">

          {/* Search */}

          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Duration */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Duration
                </span>
              </label>

              <select
                value={selectedDuration}
                onChange={(e) =>
                  setSelectedDuration(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Any Duration</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </select>
            </div>

            {/* Budget */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <Wallet size={16} />
                  Budget
                </span>
              </label>

              <select
                value={selectedBudget}
                onChange={(e) =>
                  setSelectedBudget(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Any Budget</option>
                <option value="₹3,000 - ₹5,000">
                  ₹3,000 - ₹5,000
                </option>
                <option value="₹5,000 - ₹10,000">
                  ₹5,000 - ₹10,000
                </option>
                <option value="₹10,000 - ₹20,000">
                  ₹10,000 - ₹20,000
                </option>
                <option value="₹20,000+">
                  ₹20,000+
                </option>
              </select>
            </div>

            {/* Interest */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Interest
              </label>

              <select
                value={selectedInterest}
                onChange={(e) =>
                  setSelectedInterest(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Any Interest</option>
                <option value="Nature">Nature</option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Food">Food</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>

            {/* Crowd Level */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <Users size={16} />
                  Crowd Level
                </span>
              </label>

              <select
                value={selectedCrowd}
                onChange={(e) =>
                  setSelectedCrowd(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Any Crowd Level</option>
                <option value="low">
                  🟢 Low Crowd
                </option>
                <option value="moderate">
                  🟠 Moderate Crowd
                </option>
                <option value="high">
                  🔴 High Crowd
                </option>
              </select>
            </div>

          </div>

          {/* Active Filters */}

          {hasActiveFilters && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">

              <span className="mr-1 text-xs font-semibold text-gray-500">
                Active:
              </span>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700"
                >
                  Search: {searchTerm}
                  <X size={13} />
                </button>
              )}

              {selectedDuration && (
                <button
                  onClick={() => setSelectedDuration("")}
                  className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                >
                  {selectedDuration} Days
                  <X size={13} />
                </button>
              )}

              {selectedBudget && (
                <button
                  onClick={() => setSelectedBudget("")}
                  className="flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700"
                >
                  {selectedBudget}
                  <X size={13} />
                </button>
              )}

              {selectedInterest && (
                <button
                  onClick={() => setSelectedInterest("")}
                  className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                >
                  {selectedInterest}
                  <X size={13} />
                </button>
              )}

              {selectedCrowd && (
                <button
                  onClick={() => setSelectedCrowd("")}
                  className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700"
                >
                  Crowd: {selectedCrowd}
                  <X size={13} />
                </button>
              )}

              <button
                onClick={clearAllFilters}
                className="ml-auto text-xs font-semibold text-red-500 hover:text-red-600"
              >
                Clear All
              </button>

            </div>
          )}

        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Discover Hidden India
            </h2>

            <p className="mt-2 text-gray-500">
              Find destinations away from the usual tourist crowds.
            </p>
          </div>

          <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
            {filteredDestinations.length} destination
            {filteredDestinations.length !== 1 ? "s" : ""}
          </div>

        </div>

        {filteredDestinations.length > 0 ? (

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>

        ) : (

          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Search size={24} className="text-gray-400" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No destinations found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters or searching for another destination.
            </p>

            <button
              onClick={clearAllFilters}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

      {/* ================= SMART RECOMMENDATION ================= */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <Compass
                size={24}
                className="text-emerald-600"
              />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Smart Destination Recommendation
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              Choose your travel interest and discover a
              suitable lesser-known destination.
            </p>

          </div>

          {/* Category Buttons */}

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">

            {[
              "Nature",
              "Adventure",
              "Culture",
              "Food",
              "Wellness",
            ].map((category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category
                      ? ""
                      : category
                  )
                }
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

          {/* Recommendation */}

          {selectedRecommendation && (
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50">

              <div className="grid md:grid-cols-2">

                <div className="h-64 md:h-full">
                  <img
                    src={selectedRecommendation.image}
                    alt={selectedRecommendation.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-7">

                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    <Sparkles size={16} />
                    Recommended Hidden Gem
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    {selectedRecommendation.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={15} />
                    {selectedRecommendation.state}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      🌿 {selectedRecommendation.category}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-700">
                      🟢 {selectedRecommendation.crowd}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700">
                      ₹ {selectedRecommendation.estimatedBudget.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    A peaceful alternative for travelers
                    looking to explore beyond India's most
                    crowded tourist destinations.
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* ================= IMPACT ================= */}

      <section className="bg-gray-950">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <Users
                size={28}
                className="text-emerald-400"
              />

              <h3 className="mt-4 text-xl font-bold text-white">
                Distribute Tourists
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Encourage visitors to explore destinations
                beyond heavily crowded tourist hotspots.
              </p>
            </div>

            <div>
              <Leaf
                size={28}
                className="text-emerald-400"
              />

              <h3 className="mt-4 text-xl font-bold text-white">
                Promote Sustainable Tourism
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Help reduce tourism pressure while supporting
                responsible travel.
              </p>
            </div>

            <div>
              <MapPin
                size={28}
                className="text-emerald-400"
              />

              <h3 className="mt-4 text-xl font-bold text-white">
                Support Local Communities
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Increase visibility for lesser-known destinations
                and their local tourism ecosystems.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="bg-emerald-50">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Compass
              size={28}
              className="text-emerald-600"
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Your next adventure may be hidden.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore lesser-known places, discover local
            experiences and travel beyond the crowds.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-600"
          >
            Start Exploring
            <ArrowRight size={18} />
          </button>

        </div>

      </section>

      {/* ================= AI TRAVEL PLAN MODAL ================= */}

      {showPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Sparkles size={20} />
                  <span className="font-bold">
                    AI Travel Plan
                  </span>
                </div>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  Your personalized plan is ready!
                </h3>
              </div>

              <button
                onClick={() => setShowPlan(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mt-6 rounded-xl bg-emerald-50 p-5">

              <p className="text-sm leading-6 text-gray-600">
                Based on your preferences, we recommend
                exploring{" "}
                <span className="font-bold text-emerald-700">
                  Tirthan Valley
                </span>{" "}
                for a peaceful, low-crowd experience.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  🌿 Nature
                </span>

                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700">
                  👥 Low Crowd
                </span>

                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700">
                  💰 Budget Friendly
                </span>

              </div>

            </div>

            <button
              onClick={() => setShowPlan(false)}
              className="mt-6 w-full rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-600"
            >
              Continue Exploring
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;



