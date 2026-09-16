
import { useState } from "react";
import {
  Sparkles,
  MapPin,
  Wallet,
  Users,
  CalendarDays,
  Leaf,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Star,
  Brain,
} from "lucide-react";

import destinations from "../data/Destinations";

function AIPlanner() {
  const [travelStyle, setTravelStyle] = useState("Nature & Peace");
  const [duration, setDuration] = useState("3");
  const [budget, setBudget] = useState("₹3,000 - ₹5,000");

  const [showPlan, setShowPlan] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const budgetLimits = {
    "₹3,000 - ₹5,000": 5000,
    "₹5,000 - ₹10,000": 10000,
    "₹10,000 - ₹20,000": 20000,
    "₹20,000+": Infinity,
  };

  const styleCategory = {
    "Nature & Peace": "Nature",
    Adventure: "Adventure",
    Culture: "Culture",
    Food: "Food",
    Wellness: "Wellness",
  };

  const selectedCategory = styleCategory[travelStyle];
  const selectedBudgetLimit = budgetLimits[budget];

  /*
    MOCK AI RECOMMENDATION ENGINE

    This is intentionally rule-based for the prototype.
    It simulates how an AI recommendation system could
    match a traveller with a suitable low-crowd destination.
  */

  const scoredDestinations = destinations.map((item) => {
    let score = 0;

    const styleMatch = item.category === selectedCategory;

    const budgetMatch =
      item.estimatedBudget <= selectedBudgetLimit;

    const durationMatch =
      item.duration <= Number(duration);

    const lowCrowdMatch =
      item.crowdLevel === "low";

    // Preference matching
    if (styleMatch) score += 40;
    if (budgetMatch) score += 25;
    if (durationMatch) score += 15;

    // Main project objective:
    // encourage lesser-known / low-crowd destinations
    if (lowCrowdMatch) score += 20;

    return {
      ...item,
      score,
      styleMatch,
      budgetMatch,
      durationMatch,
      lowCrowdMatch,
    };
  });

  /*
    Sort by recommendation score.
    If scores are equal, prefer low-crowd destinations.
  */
  const recommendedDestination = [...scoredDestinations].sort(
    (a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (a.crowdLevel === "low" && b.crowdLevel !== "low") {
        return -1;
      }

      if (b.crowdLevel === "low" && a.crowdLevel !== "low") {
        return 1;
      }

      return b.rating - a.rating;
    }
  )[0];

  const travelPlans = {
    "Nature & Peace": [
      "Explore scenic landscapes and peaceful viewpoints",
      "Visit a nearby local village",
      "Enjoy a nature walk and sunset experience",
      "Try local food and interact with local communities",
      "Relax and enjoy the destination at your own pace",
      "Explore nearby hidden attractions",
      "Return with a low-impact travel experience",
    ],

    Adventure: [
      "Explore the destination and nearby trails",
      "Start a guided trekking experience",
      "Try a local adventure activity",
      "Explore waterfalls, rivers or viewpoints",
      "Experience a local outdoor activity",
      "Discover an offbeat nearby attraction",
      "Relax after your adventure",
    ],

    Culture: [
      "Explore local heritage and important landmarks",
      "Visit local villages and cultural sites",
      "Interact with local artisans",
      "Experience traditional food and customs",
      "Visit a local market",
      "Explore nearby historical attractions",
      "Support local cultural businesses",
    ],

    Food: [
      "Explore local markets and food streets",
      "Try traditional regional dishes",
      "Visit local cafés and family-run restaurants",
      "Learn about local ingredients and cuisine",
      "Take a local food walk",
      "Discover hidden food spots",
      "Enjoy a final local meal before departure",
    ],

    Wellness: [
      "Start the trip with a peaceful nature walk",
      "Try a local wellness activity",
      "Spend time in a quiet natural environment",
      "Enjoy local healthy cuisine",
      "Practice relaxation or meditation",
      "Explore a peaceful nearby attraction",
      "End the trip with a slow-travel experience",
    ],
  };

  const selectedPlan =
    travelPlans[travelStyle] || travelPlans["Nature & Peace"];

  const generatePlan = () => {
    setIsGenerating(true);
    setShowPlan(false);

    setTimeout(() => {
      setIsGenerating(false);
      setShowPlan(true);
    }, 1200);
  };

  const resetPlanner = () => {
    setTravelStyle("Nature & Peace");
    setDuration("3");
    setBudget("₹3,000 - ₹5,000");
    setShowPlan(false);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-gray-900" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
              <Sparkles
                size={30}
                className="text-emerald-400"
              />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Smart Travel Planning
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your AI Travel Planner
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Tell us what kind of trip you want, and Hidden India
              will recommend a destination that matches your
              preferences while encouraging low-crowd travel.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          {/* PREFERENCES */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-600">
                  Step 1
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  Tell us your preferences
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We'll use these preferences to create your
                  recommendation.
                </p>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 sm:flex">
                <Brain
                  size={21}
                  className="text-emerald-600"
                />
              </div>
            </div>

            {/* TRAVEL STYLE */}
            <div className="mt-8">
              <label className="text-sm font-bold text-gray-800">
                What kind of experience do you want?
              </label>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Object.keys(styleCategory).map((style) => (
                  <button
                    key={style}
                    onClick={() => {
                      setTravelStyle(style);
                      setShowPlan(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      travelStyle === style
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {style === "Nature & Peace" && "🌿 "}
                    {style === "Adventure" && "🏔️ "}
                    {style === "Culture" && "🏛️ "}
                    {style === "Food" && "🍜 "}
                    {style === "Wellness" && "🧘 "}

                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* DURATION */}
            <div className="mt-7">
              <label
                htmlFor="duration"
                className="flex items-center gap-2 text-sm font-bold text-gray-800"
              >
                <CalendarDays
                  size={17}
                  className="text-emerald-600"
                />
                How many days do you have?
              </label>

              <select
                id="duration"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                  setShowPlan(false);
                }}
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </select>
            </div>

            {/* BUDGET */}
            <div className="mt-7">
              <label
                htmlFor="budget"
                className="flex items-center gap-2 text-sm font-bold text-gray-800"
              >
                <Wallet
                  size={17}
                  className="text-emerald-600"
                />
                What is your approximate budget?
              </label>

              <select
                id="budget"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  setShowPlan(false);
                }}
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option>₹3,000 - ₹5,000</option>
                <option>₹5,000 - ₹10,000</option>
                <option>₹10,000 - ₹20,000</option>
                <option>₹20,000+</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={generatePlan}
                disabled={isGenerating}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Generate My Plan
                  </>
                )}
              </button>

              <button
                onClick={resetPlanner}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw size={17} />
                Reset
              </button>
            </div>
          </section>

          {/* PREVIEW */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Sparkles
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-emerald-600">
                  Step 2
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Recommendation preview
                </h2>
              </div>
            </div>

            {!showPlan && !isGenerating && (
              <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Brain
                    size={24}
                    className="text-gray-400"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-800">
                  Ready to discover something hidden?
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Select your preferences and generate a
                  personalized destination recommendation.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="mt-8 rounded-2xl bg-emerald-50 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Sparkles
                    size={24}
                    className="animate-pulse text-emerald-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  Finding your hidden destination...
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Matching your preferences with low-crowd
                  destinations.
                </p>
              </div>
            )}

            {showPlan && recommendedDestination && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
                <div className="relative h-56">
                  <img
                    src={recommendedDestination.image}
                    alt={recommendedDestination.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
                      ✨ Recommended
                    </span>

                    {recommendedDestination.crowdLevel ===
                      "low" && (
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        👥 Low Crowd
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-sm text-white/90">
                      <MapPin size={15} />
                      {recommendedDestination.state}
                    </div>

                    <h3 className="mt-1 text-2xl font-extrabold text-white">
                      {recommendedDestination.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Star
                          size={14}
                          className="fill-current text-yellow-500"
                        />
                        Rating
                      </div>

                      <p className="mt-1 font-bold text-gray-900">
                        {recommendedDestination.rating}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Wallet size={14} />
                        Estimated
                      </div>

                      <p className="mt-1 font-bold text-gray-900">
                        {recommendedDestination.budget}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <Leaf
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <div>
                        <p className="text-sm font-bold text-emerald-800">
                          Why this destination?
                        </p>

                        <p className="mt-1 text-sm leading-6 text-emerald-700">
                          {recommendedDestination.name} matches
                          your{" "}
                          <strong>{travelStyle}</strong>{" "}
                          preference and fits your selected budget
                          and trip duration. Its low crowd level
                          also supports more distributed tourism.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Users
                        size={17}
                        className="text-emerald-600"
                      />

                      <span className="text-sm font-semibold text-gray-700">
                        Crowd Level
                      </span>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        recommendedDestination.crowdLevel ===
                        "low"
                          ? "bg-green-100 text-green-700"
                          : recommendedDestination.crowdLevel ===
                            "moderate"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {recommendedDestination.crowd}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* RESULT */}
        {showPlan && recommendedDestination && (
          <section className="mt-10">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                    <Sparkles size={17} />
                    Your personalized plan is ready
                  </div>

                  <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                    {recommendedDestination.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    A {duration}-day {travelStyle.toLowerCase()} trip
                    within your selected budget.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Recommendation Score
                  </p>

                  <p className="mt-1 text-3xl font-extrabold text-emerald-700">
                    {recommendedDestination.score}/100
                  </p>
                </div>
              </div>

              {/* WHY RECOMMENDED */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Why Hidden India recommended this
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div
                    className={`rounded-2xl border p-4 ${
                      recommendedDestination.styleMatch
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <CheckCircle2
                      size={19}
                      className={
                        recommendedDestination.styleMatch
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }
                    />

                    <p className="mt-3 text-sm font-bold text-gray-900">
                      Interest Match
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {recommendedDestination.styleMatch
                        ? "Matches your travel style"
                        : "Alternative experience"}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      recommendedDestination.budgetMatch
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <Wallet
                      size={19}
                      className={
                        recommendedDestination.budgetMatch
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }
                    />

                    <p className="mt-3 text-sm font-bold text-gray-900">
                      Budget Fit
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {recommendedDestination.budgetMatch
                        ? "Within your budget"
                        : "Slightly above selected budget"}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      recommendedDestination.durationMatch
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <CalendarDays
                      size={19}
                      className={
                        recommendedDestination.durationMatch
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }
                    />

                    <p className="mt-3 text-sm font-bold text-gray-900">
                      Duration Fit
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {recommendedDestination.durationMatch
                        ? "Fits your available time"
                        : "May need more time"}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      recommendedDestination.lowCrowdMatch
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <Users
                      size={19}
                      className={
                        recommendedDestination.lowCrowdMatch
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }
                    />

                    <p className="mt-3 text-sm font-bold text-gray-900">
                      Low Crowd
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {recommendedDestination.lowCrowdMatch
                        ? "Supports tourism distribution"
                        : "Higher visitor concentration"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ITINERARY */}
              <div className="mt-10">
                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Suggested itinerary
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold text-gray-900">
                    Your {duration}-day journey
                  </h3>
                </div>

                <div className="mt-5 space-y-3">
                  {selectedPlan
                    .slice(0, Number(duration))
                    .map((activity, index) => (
                      <div
                        key={index}
                        className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                            Day {index + 1}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {activity}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* SUSTAINABLE TRAVEL */}
              <div className="mt-10 rounded-2xl bg-gray-950 p-6 text-white sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
                    <Leaf
                      size={22}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      Travel more sustainably
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-300">
                      By discovering lesser-known destinations,
                      travellers can help distribute tourism activity
                      beyond highly concentrated hotspots and create
                      opportunities for local communities.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-2xl">👥</p>
                    <p className="mt-2 text-sm font-bold">
                      Distribute Visitors
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Encourage travel beyond crowded hotspots.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-2xl">🏡</p>
                    <p className="mt-2 text-sm font-bold">
                      Support Local Areas
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Increase visibility of local destinations.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-2xl">🌱</p>
                    <p className="mt-2 text-sm font-bold">
                      Promote Responsible Travel
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Encourage balanced tourism growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HOW IT WORKS */}
        <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Prototype Recommendation Engine
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
              How Hidden India makes recommendations
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              The prototype scores destinations against traveller
              preferences and gives additional priority to low-crowd
              destinations.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                1
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                Preferences
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Collect travel style, budget and duration.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                2
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                Match
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Compare preferences with destination data.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                3
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                Score
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Rank destinations based on multiple factors.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                4
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                Recommend
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Recommend a suitable lesser-known destination.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-10 rounded-3xl bg-emerald-600 p-8 text-center shadow-sm sm:p-10">
          <h2 className="text-3xl font-extrabold text-white">
            Discover beyond the usual.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-emerald-50">
            Hidden India helps travellers discover destinations
            that match their interests while encouraging a more
            balanced tourism ecosystem.
          </p>

          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-gray-100"
          >
            Plan Another Trip
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default AIPlanner;

