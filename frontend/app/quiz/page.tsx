"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  buildCustomConcepts,
  getTopQuizRecommendations,
} from "@/lib/content";
import type {
  CustomConcept,
  Product,
  QuizAnswers,
  QuizDietPreference,
  QuizFlavor,
  QuizGoal,
  QuizTimeOfDay,
} from "@/types/content";

const goals: QuizGoal[] = ["energy", "indulgence", "balanced"];
const flavors: QuizFlavor[] = ["chocolate-forward", "nutty", "light"];
const diets: QuizDietPreference[] = ["high-fiber", "low-sugar", "no-preference"];
const times: QuizTimeOfDay[] = ["morning", "midday", "evening"];

export default function QuizPage() {
  const { products, addCustomRequest } = useSiteContent();
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: "energy",
    flavor: "chocolate-forward",
    dietPreference: "high-fiber",
    timeOfDay: "morning",
  });
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [concepts, setConcepts] = useState<CustomConcept[]>([]);

  const activeProducts = useMemo(
    () => products.filter((product) => product.status === "active"),
    [products],
  );

  const submitQuiz = () => {
    const nextRecommendations = getTopQuizRecommendations(products, answers, 3);
    const nextConcepts = buildCustomConcepts(answers);

    setRecommendations(nextRecommendations);
    setConcepts(nextConcepts);
    setSubmitted(true);

    addCustomRequest({
      id: `request-${Date.now()}`,
      createdAt: new Date().toISOString(),
      answers,
      recommendedProductIds: nextRecommendations.map((product) => product.id),
      concepts: nextConcepts,
      status: "open",
    });
  };

  return (
    <main className="site-shell py-12 md:py-16">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Recommendation Quiz</p>
        <h1 className="mt-2 font-serif text-4xl text-cocoa">Find your best match</h1>
        <p className="mt-2 text-sm text-muted">
          Answer 4 quick prompts. We will show top picks from the current shop and custom concepts tailored for you.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-muted">
            Goal
            <select
              className="mt-1 w-full rounded-lg border border-border bg-white p-2 text-cocoa"
              value={answers.goal}
              onChange={(event) => setAnswers((prev) => ({ ...prev, goal: event.target.value as QuizGoal }))}
            >
              {goals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            Flavor profile
            <select
              className="mt-1 w-full rounded-lg border border-border bg-white p-2 text-cocoa"
              value={answers.flavor}
              onChange={(event) => setAnswers((prev) => ({ ...prev, flavor: event.target.value as QuizFlavor }))}
            >
              {flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            Diet preference
            <select
              className="mt-1 w-full rounded-lg border border-border bg-white p-2 text-cocoa"
              value={answers.dietPreference}
              onChange={(event) =>
                setAnswers((prev) => ({
                  ...prev,
                  dietPreference: event.target.value as QuizDietPreference,
                }))
              }
            >
              {diets.map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            Time of day
            <select
              className="mt-1 w-full rounded-lg border border-border bg-white p-2 text-cocoa"
              value={answers.timeOfDay}
              onChange={(event) =>
                setAnswers((prev) => ({
                  ...prev,
                  timeOfDay: event.target.value as QuizTimeOfDay,
                }))
              }
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className={buttonVariants({ variant: "primary", size: "md" })} onClick={submitQuiz}>
            Get recommendations
          </button>
          <p className="self-center text-sm text-muted">
            Active products in catalog: {activeProducts.length}
          </p>
        </div>
      </section>

      {submitted && (
        <section className="mt-8 space-y-8">
          <div>
            <h2 className="font-serif text-3xl text-cocoa">Custom concepts for you</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {concepts.map((concept) => (
                <Card key={concept.id} className="h-full bg-white/90">
                  <h3 className="font-serif text-2xl text-cocoa">{concept.title}</h3>
                  <p className="mt-2 text-sm text-muted">{concept.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {concept.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-accentSoft px-2 py-1 text-xs uppercase tracking-wide text-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-cocoa">Top picks from shop</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {recommendations.map((product) => (
                <Card key={product.id} interactive className="h-full bg-white/90">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">{product.category}</p>
                  <h3 className="mt-2 font-serif text-2xl text-cocoa">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted">{product.description}</p>
                  <p className="mt-4 text-lg font-semibold text-cocoa">{product.priceLabel}</p>
                  <Link
                    href={`/products/${product.slug}`}
                    className={`${buttonVariants({ variant: "ghost", size: "sm" })} mt-4`}
                  >
                    View details
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
