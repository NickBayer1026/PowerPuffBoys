# PowerPuffBoys
This is a solid work of Group 7: Mobile App

---

## Team

Group 7 — Mobile App

| Member | Name | Role | Profile |
|---|---|---|---|
| [@NickBayer1026](https://github.com/NickBayer1026) | Nicholas Bayron | Project Manager & Backend Developer | [view](profiles/nickbayer1026.md) |
| [@Uttoh18](https://github.com/Uttoh18) | Jetlee L. Uttoh | Backend Developer | [view](profiles/Uttoh18.md) |

**Current focus:** both members are working on the backend parts of the system we are
about to build — data models, APIs, and business logic.

## How we work

This is a team repo, so `main` is **protected**: nobody pushes to it directly. Everything
goes through a branch and a reviewed Pull Request.

```bash
git checkout main && git pull origin main        # sync first
git checkout -b feature/my-task                  # branch
#   ...edit files...
git add .                                        # stage
git commit -m "feat: describe what you did"      # commit
git push -u origin feature/my-task               # push
#   ...open a PR, get 1 approval, merge on GitHub...
git checkout main && git pull origin main        # sync after
```

**Read [CONTRIBUTING.md](CONTRIBUTING.md) before your first commit.** It has the full
branch naming rules, commit message format, review expectations, and a troubleshooting
table for when something goes wrong.

## Repository layout

```
PowerPuffBoys/
├── CONTRIBUTING.md          team rulebook — read this first
├── README.md                you are here
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   └── team-notes.md        shared scratchpad + conflict drill
└── profiles/
    ├── README.md            team profile exercise
    ├── nickbayer1026.md     Nicholas Bayron
    └── Uttoh18.md           Jetlee L. Uttoh
```

## Current status

Repo scaffolding is in place. No application code yet — we are working through the
Git/GitHub workflow as a group before building.
