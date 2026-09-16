
import {
  MapPin,
  Users,
  Leaf,
  TrendingUp,
  Compass,
  Star,
  ArrowRight,
  Sparkles,
  IndianRupee,
} from "lucide-react";

import { Link } from "react-router-dom";
import destinations from "../data/Destinations";

function Dashboard() {
  // ---------------------------------------
  // CALCULATED PROTOTYPE STATISTICS
  // ---------------------------------------

  const totalDestinations = destinations.length;

  const lowCrowdDestinations = destinations.filter(
    (item) => item.crowdLevel === "low"
  );

  const moderateCrowdDestinations = destinations.filter(
    (item) => item.crowdLevel === "moderate"
  );

  const highCrowdDestinations = destinations.filter(
    (item) => item.crowdLevel === "high"
  );

  const averageRating =
    destinations.reduce((sum, item) => sum + item.rating, 0) /
    destinations.length;

  const lowCrowdPercentage = Math.round(
    (lowCrowdDestinations.length / totalDestinations) * 100
  );

  const highCrowdPercentage = Math.round(
    (highCrowdDestinations.length / totalDestinations) * 100
  );

  const categories = [
    "Nature",
    "Adventure",
    "Culture",
    "Food",
    "Wellness",
  ];

  const categoryData = categories.map((category) => {
    const count = destinations.filter(
      (item) => item.category === category
    ).length;

    return {
      category,
      count,
    };
  });

  // ---------------------------------------
  // TOP LOW-CROWD DESTINATIONS
  // ---------------------------------------

  const featuredDestinations = [...lowCrowdDestinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================
          HERO
      ====================================== */}

      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-gray-900" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              <Sparkles size={16} />
              Tourism Insights
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Tourism Dashboard
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Explore how Hidden India can help distribute tourism
              beyond highly crowded destinations and bring attention
              to lesser-known places.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* =====================================
            STAT CARDS
        ====================================== */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <MapPin
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <span className="text-xs font-semibold text-gray-400">
                DESTINATIONS
              </span>
            </div>

            <p className="mt-5 text-3xl font-extrabold text-gray-900">
              {totalDestinations}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Destinations in prototype
            </p>
          </div>

          {/* LOW CROWD */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Users
                  size={21}
                  className="text-emerald-600"
                />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                LOW CROWD
              </span>
            </div>

            <p className="mt-5 text-3xl font-extrabold text-gray-900">
              {lowCrowdDestinations.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Lesser-known destinations
            </p>
          </div>

          {/* HIGH CROWD */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <TrendingUp
                  size={21}
                  className="text-red-600"
                />
              </div>

              <span className="text-xs font-semibold text-red-600">
                HIGH CROWD
              </span>
            </div>

            <p className="mt-5 text-3xl font-extrabold text-gray-900">
              {highCrowdDestinations.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Popular destinations
            </p>
          </div>

          {/* RATING */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">
                <Star
                  size={21}
                  className="fill-current text-yellow-500"
                />
              </div>

              <span className="text-xs font-semibold text-gray-400">
                RATING
              </span>
            </div>

            <p className="mt-5 text-3xl font-extrabold text-gray-900">
              {averageRating.toFixed(1)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Average destination rating
            </p>
          </div>
        </section>

        {/* =====================================
            CROWD DISTRIBUTION
        ====================================== */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* CROWD OVERVIEW */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                Tourism Distribution
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Crowd-level overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                The prototype compares popular destinations with
                lesser-known alternatives to encourage more balanced
                tourism.
              </p>
            </div>

            {/* LOW */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Low Crowd
                  </span>
                </div>

                <span className="text-sm font-bold text-gray-900">
                  {lowCrowdDestinations.length} destinations
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${lowCrowdPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {lowCrowdPercentage}% of prototype destinations
              </p>
            </div>

            {/* MODERATE */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Moderate Crowd
                  </span>
                </div>

                <span className="text-sm font-bold text-gray-900">
                  {moderateCrowdDestinations.length} destinations
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all"
                  style={{
                    width: `${
                      (moderateCrowdDestinations.length /
                        totalDestinations) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* HIGH */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    High Crowd
                  </span>
                </div>

                <span className="text-sm font-bold text-gray-900">
                  {highCrowdDestinations.length} destinations
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{
                    width: `${highCrowdPercentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Popular tourism hotspots
              </p>
            </div>
          </div>

          {/* SUSTAINABILITY CARD */}
          <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
              <Leaf
                size={24}
                className="text-emerald-400"
              />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-emerald-400">
              Sustainable Tourism
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              Move beyond crowded hotspots
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              Hidden India highlights lesser-known destinations
              and helps travellers discover alternatives based on
              their interests, budget and available time.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4">
                <Users
                  size={20}
                  className="text-emerald-400"
                />

                <p className="mt-3 text-sm font-bold">
                  Visitor Distribution
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Encourage tourism beyond highly concentrated
                  locations.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <Compass
                  size={20}
                  className="text-emerald-400"
                />

                <p className="mt-3 text-sm font-bold">
                  Discover Hidden Places
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Improve visibility of lesser-known destinations.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <Leaf
                  size={20}
                  className="text-emerald-400"
                />

                <p className="mt-3 text-sm font-bold">
                  Responsible Travel
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Encourage more balanced tourism behaviour.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <IndianRupee
                  size={20}
                  className="text-emerald-400"
                />

                <p className="mt-3 text-sm font-bold">
                  Local Opportunities
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Increase visibility of local tourism economies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            CATEGORY DISTRIBUTION
        ====================================== */}

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Destination Categories
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
              Explore different travel experiences
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Destinations in the prototype are grouped by traveller
              interests.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categoryData.map((item) => (
              <div
                key={item.category}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                <div className="flex items-center justify-between">
                  <Compass
                    size={20}
                    className="text-emerald-600"
                  />

                  <span className="text-2xl font-extrabold text-gray-900">
                    {item.count}
                  </span>
                </div>

                <p className="mt-4 text-sm font-bold text-gray-800">
                  {item.category}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Destination
                  {item.count !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================
            FEATURED HIDDEN DESTINATIONS
        ====================================== */}

        <section className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                Hidden India Picks
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Lesser-known destinations
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Examples of destinations that can help distribute
                tourism.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition hover:text-emerald-700"
            >
              Explore all
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
                    👥 Low Crowd
                  </div>

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800">
                    <Star
                      size={13}
                      className="fill-current text-yellow-500"
                    />
                    {destination.rating}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {destination.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={13} />
                        {destination.state}
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {destination.category}
                    </span>
                  </div>

                  <Link
                    to={`/destination/${destination.id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                  >
                    View Destination
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================
            AI PLANNER CTA
        ====================================== */}

        <section className="mt-10 overflow-hidden rounded-3xl bg-emerald-600 p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-100">
                <Sparkles size={18} />
                Smart Recommendation Engine
              </div>

              <h2 className="mt-3 text-3xl font-extrabold text-white">
                Let Hidden India plan your next trip
              </h2>

              <p className="mt-3 text-sm leading-6 text-emerald-50">
                Choose your interests, budget and available time to
                discover a destination that matches your preferences
                while encouraging low-crowd travel.
              </p>
            </div>

            <Link
              to="/ai-planner"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-emerald-700 transition hover:bg-gray-100"
            >
              Open AI Planner
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* =====================================
            PROTOTYPE NOTE
        ====================================== */}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Prototype dashboard • Data shown is mock data for
            demonstration purposes.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

