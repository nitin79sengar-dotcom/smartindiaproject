
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Wallet,
  Users,
  Leaf,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import destinations from "../data/Destinations";

function DestinationDetails() {
  const { id } = useParams();

  // Find destination from mock data
  const destination = destinations.find(
    (item) => item.id === Number(id)
  );

  // ================= DESTINATION NOT FOUND =================

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center px-6">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin size={28} className="text-gray-400" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Destination Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The destination you are looking for does not exist.
            </p>

            {/* BACK TO HOME */}

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              <ArrowLeft size={18} />
              Back to Explore
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // ================= CROWD STYLING =================

  const crowdStyle = {
    low: "bg-green-500 text-white",
    moderate: "bg-orange-500 text-white",
    high: "bg-red-500 text-white",
  };

  const currentCrowdStyle =
    crowdStyle[destination.crowdLevel] ||
    "bg-gray-500 text-white";

  // ================= PAGE =================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      <section className="relative h-[430px] overflow-hidden">

        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Hero Content */}

        <div className="absolute inset-x-0 bottom-0">

          <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">

            {/* Location */}

            <div className="flex items-center gap-2 text-sm font-medium text-white/90">

              <MapPin size={17} />

              {destination.state}

            </div>

            {/* Destination Name */}

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {destination.name}
            </h1>

            {/* Badges */}

            <div className="mt-5 flex flex-wrap gap-2">

              {/* Rating */}

              <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-gray-800">

                <Star
                  size={14}
                  className="fill-current text-yellow-500"
                />

                {destination.rating}

              </span>

              {/* Category */}

              <span className="rounded-full bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white">

                🌿 {destination.category}

              </span>

              {/* Crowd */}

              <span
                className={`rounded-full px-3.5 py-2 text-xs font-bold ${currentCrowdStyle}`}
              >
                👥 {destination.crowd}
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        >
          <ArrowLeft size={17} />
          Back to Explore
        </Link>

        {/* =================================================
            INFORMATION CARDS
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Rating */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50">

              <Star
                size={20}
                className="fill-current text-yellow-500"
              />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Traveler Rating
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {destination.rating} / 5
            </p>

          </div>

          {/* Duration */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">

              <Clock
                size={20}
                className="text-blue-600"
              />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Recommended Duration
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {destination.duration} Days
            </p>

          </div>

          {/* Budget */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">

              <Wallet
                size={20}
                className="text-emerald-600"
              />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Estimated Budget
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {destination.budget}
            </p>

          </div>

          {/* Crowd */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">

              <Users
                size={20}
                className="text-purple-600"
              />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Crowd Level
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {destination.crowd}
            </p>

          </div>

        </div>

        {/* =================================================
            ABOUT + WHY VISIT
        ================================================= */}

        <div className="mt-12 grid gap-10 lg:grid-cols-3">

          {/* ABOUT */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-2">

              <Leaf
                size={22}
                className="text-emerald-600"
              />

              <h2 className="text-2xl font-bold text-gray-900">
                About {destination.name}
              </h2>

            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {destination.name} is a destination in{" "}
              {destination.state} that offers travelers
              an opportunity to explore India beyond its
              most crowded tourist hotspots.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Visitors can experience the local environment,
              culture and attractions while enjoying a more
              relaxed travel experience.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Hidden India promotes destinations like this
              to help distribute tourism and create greater
              visibility for lesser-known locations.
            </p>

          </div>

          {/* WHY VISIT */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h3 className="text-lg font-bold text-gray-900">
              Why Visit?
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-600"
                />

                <span className="text-sm text-gray-600">
                  Discover a unique destination
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-600"
                />

                <span className="text-sm text-gray-600">
                  Escape heavily crowded locations
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-600"
                />

                <span className="text-sm text-gray-600">
                  Support local tourism
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-600"
                />

                <span className="text-sm text-gray-600">
                  Experience responsible travel
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            TRAVEL SNAPSHOT
        ================================================= */}

        <section className="mt-12">

          <h2 className="text-2xl font-bold text-gray-900">
            Travel Snapshot
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            {/* Experience */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

              <p className="text-sm font-semibold text-gray-400">
                EXPERIENCE
              </p>

              <h3 className="mt-2 text-lg font-bold text-gray-900">
                {destination.category} Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore local experiences and attractions
                suited to travelers interested in{" "}
                {destination.category.toLowerCase()}.
              </p>

            </div>

            {/* Crowd */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

              <p className="text-sm font-semibold text-gray-400">
                CROWD
              </p>

              <h3 className="mt-2 text-lg font-bold text-gray-900">
                {destination.crowd}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                This prototype uses crowd-level information
                to demonstrate how tourism can be distributed
                toward suitable alternatives.
              </p>

            </div>

            {/* Budget */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

              <p className="text-sm font-semibold text-gray-400">
                BUDGET
              </p>

              <h3 className="mt-2 text-lg font-bold text-gray-900">
                {destination.budget}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Estimated travel budget for the destination
                in this prototype.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            SUSTAINABLE TOURISM
        ================================================= */}

        <section className="mt-12 overflow-hidden rounded-2xl bg-emerald-600">

          <div className="p-7 sm:p-9">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">

                <Leaf
                  size={24}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Travel Responsibly
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50">
                  By exploring lesser-known destinations,
                  travelers can discover new experiences while
                  helping spread tourism opportunities to
                  local communities.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  <div className="rounded-xl bg-white/10 p-4">

                    <p className="text-sm font-semibold text-white">
                      Support Local
                    </p>

                    <p className="mt-1 text-xs text-emerald-50">
                      Choose local businesses and experiences.
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/10 p-4">

                    <p className="text-sm font-semibold text-white">
                      Respect Nature
                    </p>

                    <p className="mt-1 text-xs text-emerald-50">
                      Keep destinations clean and protected.
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/10 p-4">

                    <p className="text-sm font-semibold text-white">
                      Travel Responsibly
                    </p>

                    <p className="mt-1 text-xs text-emerald-50">
                      Respect local culture and communities.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            PLAN YOUR VISIT
        ================================================= */}

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">

                <Sparkles
                  size={22}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Plan Your Visit
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a personalized travel plan based
                  on your preferences.
                </p>

              </div>

            </div>

            <Link
              to="/ai-planner"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Open AI Planner
              <ArrowLeft
                size={17}
                className="rotate-180"
              />
            </Link>

          </div>

        </section>

        {/* =================================================
            BACK TO EXPLORE
        ================================================= */}

        <div className="mt-10 text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

        </div>

      </main>

    </div>
  );
}

export default DestinationDetails;

