# msw-lens — project context
generated: 2026-05-16T11:48:01.918Z

> Drop this file into any LLM conversation for instant context about what
> is mocked in this project, what scenarios exist, and what is currently active.

## Active scenarios

| endpoint | method | active scenario |
|----------|--------|-----------------|
| `/api/resources` | GET | `slow` |
| `/api/resources` | POST | `success` |

## Scenario details

### GET `/api/resources`
manifest: `src/mocks/resources/resources.yaml`
> Returns the list of developer resources displayed on the Overview page

- **typical** — Shows several developer resources with titles, descriptions, URLs, and tags — the normal production-like view
- **empty** — Tests the zero-items state — currently renders a bare <ul> with no empty-state message; useful for verifying whether one should be added
- **overloaded** — Tests rendering with 60 resources to expose layout overflow, scroll behaviour, or the absence of pagination
- **slow** ✓ **(active)** *(delay: real)* — Tests the loading/skeleton state while the request is in flight; verifies no flash of empty content
- **unauthorized** *(401)* — Tests 401 response — verifies session-expiry handling (redirect to login or inline error) from the store or a route guard
- **server-error** *(500)* — Tests 500 response — verifies error boundary, fallback UI, or user-visible error message when the API is down

sourceHints:
- `src/app/areas/resources/data/resources.ts`
- `src/app/areas/resources/ui/list.ts`
- `src/app/areas/resources/feature-home/pages/overview.ts`

### POST `/api/resources`
manifest: `src/mocks/resources/resources-create.yaml`
> Creates a new developer resource from the Add Resource form

- **success** ✓ **(active)** — Echoes the posted payload back with a fresh UUID — tests that the new resource is appended to the store and the form resets
- **slow** *(delay: real)* — Tests that the submit button's pending/disabled state holds while the request is in flight
- **validation-error** *(400)* — Tests how the form surfaces a 400 from the server — currently rendered via the generic alert, no per-field messages
- **conflict** *(409)* — Tests how the form surfaces a 409 duplicate-URL conflict from the server (race with client-side dedupe)
- **unauthorized** *(401)* — Tests 401 mid-submit — verifies whether the form retains input and whether session-expiry handling kicks in
- **server-error** *(500)* — Tests 500 response — verifies the form retains input and shows a recoverable error

sourceHints:
- `src/app/areas/resources/data/resources.ts`
- `src/app/areas/resources/feature-home/pages/add.ts`

---

## How msw-lens works

msw-lens reads scenario manifests — YAML files co-located with MSW handlers under
`src/mocks/`. The active selection writes to two tool-owned files:

- `src/mocks/active-scenarios.ts` — which scenario is active per endpoint
- `src/mocks/bypassed-endpoints.ts` — endpoints that bypass MSW entirely (pass through to the real API)

Vite HMR picks up file changes immediately. No browser refresh needed.

These files are **tool-owned**. Do not edit them manually; msw-lens regenerates them on every run.

**Bypass requires** MSW worker started with `onUnhandledRequest: 'bypass'` —
otherwise unhandled requests will warn or error instead of passing through.

**Commands:**
- `npm run lens` — interactive scenario switcher (single run)
- `npm run lens:watch` — stay in the switcher, Ctrl+C to exit
- `npm run lens:context -- <component.ts>` — generate a prompt for an LLM

Manifests live alongside handlers: `auth/user.yaml` next to `auth/user.ts`.

---

## Manifest format

```yaml
endpoint: /api/resource/   # MUST match the handler's ENDPOINT constant exactly
method: GET
shape: document            # document | collection — determines scenario vocabulary
description: What this endpoint returns

responseType:              # the success-response type
  name: TypeScriptTypeName
  path: relative/path/to/types.ts   # path relative to where you run `lens:context`

errorType:                 # optional — 4xx/5xx response shape (e.g. RFC 9457 ProblemDetails)
  name: ProblemDetails
  path: relative/path/to/types.ts

context:
  sourceHints:             # paths to files that consume this endpoint
    - path/to/store.ts     # LLM reads these directly — provide pointers, not summaries
    - path/to/component.ts
  hints:                   # optional — free-form annotations the code doesn't make obvious
    - "401 always redirects to /login via a route guard"
    - "quantity must be between 1 and 99"

scenarios:
  scenario-name:
    description: What UI behavior this tests (not what the data looks like)
    active: true           # at most one scenario per manifest — marks the default
    httpStatus: 401        # optional — omit for 200
    delay: real            # optional — 'real', 'infinite', or integer-string ms ('2000')
```

Four things are non-negotiable:

1. **`endpoint` MUST match the handler's `ENDPOINT` constant exactly, and both must match what the source actually calls.** If the source uses an absolute URL (e.g. `fetch('https://api.example.com/posts')`), use that absolute URL as both `endpoint` and `ENDPOINT` — MSW intercepts absolute URLs directly. Do not modify the source. The switcher writes keys to `active-scenarios.ts` as `METHOD endpoint` (e.g. `GET /api/cart`); the handler reads keys in the same format. A mismatch is silent — the handler falls through to its default case forever and the switcher appears to do nothing.

2. **`shape` is `document` or `collection` (literal values) for GET endpoints. Omit `shape` for mutations** (POST/PUT/PATCH/DELETE) — the method itself drives the archetype vocabulary.

3. **At most one scenario has `active: true`** — and you should always specify one. The fallback (first scenario in declaration order) reorders silently when the manifest is edited.

4. **`delay` is one of:** `real` (realistic latency), `infinite` (never resolves — tests timeout UI), or an integer-string of milliseconds (`"2000"`).

