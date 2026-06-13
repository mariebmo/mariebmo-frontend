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
Either the theatrical cut or the extended edition of a film. Each dish stores separate timestamps per edition where they differ. Extended-only dishes appear only when extended edition is selected.
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
Viewing one film's timeline during playback, with play sync and a countdown to the next planned dish. Toggled on the same route as Browse; sync controls appear only in Watch.

When the plan includes dishes for this film, Watch shows only those. When it doesn't, the user chooses **All** (full curated timeline with sync) or **None** (empty timeline, sync only).
_Avoid_: Play mode, sync mode

**Browse**:
The full curated timeline for a film — all dishes, grouped by scene role, labelled by tier. No plan filtering applied. Same route as Watch mode, toggled off.
_Avoid_: Explore, gallery

**Plan**:
The user's chosen set of dishes across one or more films. Filters each film's watch timeline to planned dishes only, and generates a single shopping list across all selected films. Pre-selects **Iconic** tier dishes; supports tier filtering. Persisted in the browser between visits. Dishes can be added or removed from any timeline view, not only here.

Film scope is chosen explicitly (per film or trilogy shortcut); only selected films' dishes are shown.
_Avoid_: Menu, selection, playlist

**Sync**:
Keeping the timeline timer aligned with the film the user is watching elsewhere. The user starts playback manually and can nudge the timer if their copy differs from the curated timestamps. The primary countdown targets the on-screen moment; dishes with prep lead time show a persistent banner when their prep window opens.
_Avoid_: Play mode, auto-sync

**Shopping list**:
Ingredients aggregated from all dishes in the plan, scaled to a headcount the user specifies. Identical ingredients merge with normalised units (e.g. 500g + 200g → 700g). Copyable to clipboard as plain text.
_Avoid_: Grocery list, ingredients list

**Headcount**:
The number of people eating. Scales each dish's ingredient quantities from its base serving size: `quantity × (headcount / baseServings)`.
_Avoid_: Servings, guests, party size
