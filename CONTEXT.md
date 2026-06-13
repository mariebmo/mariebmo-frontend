# Feast of the Rings

A companion for watching The Lord of the Rings trilogy: eat what the characters eat, when they eat it.

## Language

**Feast of the Rings**:
The practice of eating the same foods as characters in the films, timed to when they appear on screen.
_Avoid_: LOTR dinner party, sync meal

**Film**:
One of the three Lord of the Rings movies — *The Fellowship of the Ring*, *The Two Towers*, or *The Return of the King*.
_Avoid_: Movie, part, installment

**Edition**:
Either the theatrical cut or the extended edition of a film. Each dish stores separate timestamps per edition where they differ. Extended-only dishes appear only when extended edition is selected. The companion currently targets extended edition only; theatrical data is retained for a future release.
_Avoid_: Version, cut, director's cut

**Dish**:
A food or drink item tied to a moment in a film — what the viewer prepares and eats during playback. Includes items visibly consumed and items strongly implied (prepared, served, or offered on screen). Shows minimal detail by default; complex dishes expand to full recipes.
_Avoid_: Meal, snack, item

**Prep lead time**:
How far before its on-screen moment a dish should be ready. Drives early warnings in watch mode (e.g. "start rabbit stew now — scene in 90 min").
_Avoid_: Cook time, prep time, advance notice

**Scene role**:
How prominently food appears in a scene. Drives visual hierarchy in the UI — more prominent roles are shown larger, higher, or with stronger emphasis.
_Avoid_: Category, type, group

- **Consumed**: A character eats or drinks it on screen.
- **Interaction**: Food is prepared, served, offered, or handled — but not visibly eaten.
- **Background**: Food is present in the scene (feast spread, market stall, table setting) but not a focal beat.

**Tier**:
A curator-assigned recommendation level on each dish — how central it is to the Feast experience. Nothing is required; tiers guide defaults and filtering. Three levels: **Iconic**, **Suggested**, and **Extra**.
_Avoid_: Must, Essential, Classic, Optional, priority, rank

**Timeline**:
The ordered list of dishes for a single film, each anchored to a timestamp.
_Avoid_: Schedule, agenda, rundown

**Timestamp**:
When a dish appears on screen, measured from the opening narration ("The world is changed…") — not from studio logos or chapter markers.
_Avoid_: Timecode, marker, cue point

**Watch mode**:
Viewing one film's timeline during playback, with play sync and a countdown to the next planned dish. Toggled on the same route as Plan mode; sync controls appear only in Watch.

When the plan includes dishes for this film, Watch shows only those. When it doesn't, Watch defaults to the full curated timeline — no extra prompt.
_Avoid_: Play mode, sync mode

**Plan mode**:
On a film route, choosing which dishes to include and previewing when they happen on the timeline. Same route as Watch mode; dish selection happens here via cards or list.

The timeline shows all curated dishes for the film as faint markers; dishes in the plan are highlighted. Dish browse filters (tier, kind, view) are grouped in a single filter control.
_Avoid_: Browse, explore, gallery

**Menu**:
The middle step between planning and watching — what and how you'll serve each selected dish. Covers serving options now; recipes, shopping list, and variations later. Reached from the film page stepper (Plan → Menu → Watch), not a separate planning concept from the persisted **Plan**.

On a film route, Menu shows serving options for that film's selected food dishes only. A cross-film Menu (all films at once) is planned for a later release.
_Avoid_: Meal plan (confused with Plan)

**Film stepper**:
The primary navigation on a film route: **Plan → Menu → Watch**, shown as a linked sequence below the film title. All three steps live on the same film route; the user can jump to any step freely. Watch is never blocked if Menu was skipped — serving options default to Standard.

Desktop: three-segment bar. Mobile: text labels with arrows between them.

**Plan**:
The user's chosen set of dishes across one or more films, plus serving options where defined. Pre-selects **Iconic** tier dishes; supports tier filtering. Persisted in the browser between visits.
_Avoid_: Menu, selection, playlist

**Sync**:
Keeping the timeline timer aligned with the film the user is watching elsewhere. The user starts playback manually and can nudge the timer if their copy differs from the curated timestamps. The primary countdown targets the on-screen moment; dishes with prep lead time show a persistent banner when their prep window opens.
_Avoid_: Play mode, auto-sync

**Serving options**:
Alternative ways to hit the same on-screen food beat — e.g. a nibble vs a full spread, or a vegetarian take. Part of **Menu** today; chosen per dish after planning.
_Avoid_: Variant, substitution

**Shopping list**:
Ingredients aggregated from all dishes in the plan, scaled to a headcount. Part of **Menu** in a future release.
_Avoid_: Grocery list, ingredients list

**Headcount**:
The number of people eating. Scales each dish's ingredient quantities from its base serving size: `quantity × (headcount / baseServings)`.
_Avoid_: Servings, guests, party size
