# PowerPuffBoys
This is a solid work of Group 7: Mobile App

---

## Team

| Member | GitHub | Role |
|---|---|---|
| NickBayer1026 | [@NickBayer1026](https://github.com/NickBayer1026) | Project Manager & Backend Developer |
| Uttoh18 | [@Uttoh18](https://github.com/Uttoh18) | Backend Developer |

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
└── profiles/                one page per team member
```

## Current status

Repo scaffolding is in place. No application code yet — we are working through the
Git/GitHub workflow as a group before building.
