# Nourish: eating-disorder recovery support (prototype)

    npm install && npm run dev

## Design rules (keep these when you extend it)
- No calories, macros, weights, BMI, portions, or "burned" numbers anywhere.
- No streaks, scores, badges, or "perfect day" framing; missed days must feel neutral.
- Movement is optional, never earned or compensatory; rest is a first-class choice.
- Language: "Partly" and "Not yet" are valid answers. No shame wording.
- Support/crisis info is one tap away from every screen. Verify and localise `RESOURCES` in `src/data.js`.
- Involve clinicians and people with lived experience before releasing to real users.

## Structure
- `src/data.js` copy and options · `src/useLocal.js` storage (swap for an API) · `src/pages/*` screens

## Ideas
Clinician-shared summaries, reminders for meal times, exposure/"fear food" planner (with a therapist), meal-support mode, accounts + sync.
