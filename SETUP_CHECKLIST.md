# Ralph Loop Setup Checklist

## Pre-Ralph Dependencies Check

This document verifies all external dependencies are available before running the Ralph Loop.

---

## ✅ System Requirements

### Environment Status
- **Node.js:** v24.9.0 ✅
- **npm:** v11.6.0 ✅
- **Python:** 3.13.3 ✅ (required for ui-ux-pro-max skill)
- **Git:** Configured ✅

---

## 📦 Required NPM Packages

The Ralph Loop will initialize a Next.js project and install:

### Core Framework
```
next@latest
react@latest
react-dom@latest
typescript@latest
```

### Styling & UI
```
tailwindcss@latest
postcss@latest
autoprefixer@latest
```

### Icons
```
lucide-react@latest
```

### Development Tools
```
@types/react@latest
@types/node@latest
@types/react-dom@latest
ts-node@latest
```

**Installation Command (Claude will run this):**
```bash
npm install next react react-dom typescript tailwindcss postcss autoprefixer lucide-react
npm install --save-dev @types/react @types/node @types/react-dom ts-node
```

---

## 🎯 Required Configuration Files

The Ralph Loop will create/configure:

### 1. `package.json`
- Must have scripts: `dev`, `build`, `start`, `lint`
- Must have dependencies listed above

### 2. `tsconfig.json`
- TypeScript configuration for Next.js
- Path aliases configured
- React JSX mode enabled

### 3. `next.config.ts`
- Next.js configuration
- Tailwind CSS integration ready

### 4. `tailwind.config.ts`
- Font families configured:
  ```typescript
  fontFamily: {
    heading: ['Poppins', 'sans-serif'],
    body: ['Open Sans', 'sans-serif'],
  }
  ```
- Animation utilities enabled
- Dark mode support enabled

### 5. `postcss.config.js`
- Tailwind CSS and autoprefixer configuration

### 6. `.env.local` (if needed)
- For environment-specific configuration

---

## 📁 Directory Structure Requirements

The Ralph Loop will create:

```
walters-controversy-timeline/
├── .claude/
│   └── PROMPT.md                           (✅ already created)
├── src/
│   ├── app/
│   │   ├── layout.tsx                      (needs creation)
│   │   ├── page.tsx                        (needs creation)
│   │   └── globals.css                     (needs creation)
│   └── components/
│       └── TimelineVisualization.tsx       (Ralph will create/update)
├── public/
│   └── (static assets if needed)
├── analysis/
│   └── visualization-critique.md           (Ralph will generate)
├── package.json                            (needs creation)
├── tsconfig.json                           (needs creation)
├── next.config.ts                          (needs creation)
├── tailwind.config.ts                      (needs creation)
├── postcss.config.js                       (needs creation)
├── .gitignore                              (needs creation)
└── .git/                                   (✅ already exists)
```

---

## 🔧 Claude Code Configuration

### Required Settings
Ensure Claude Code is configured with:
- ✅ Git access enabled
- ✅ Bash command execution enabled
- ✅ File read/write access enabled
- ✅ Skill access enabled (ui-ux-pro-max, data-visualization-critic)

### Stop Hook Configuration (Ralph Loop Requirement)
Ralph Loop requires a stop hook to intercept exits and feed the prompt again.

**Check your ~/.claude/config.json or Claude Code settings for:**
```json
{
  "hooks": {
    "stop": "cat .claude/PROMPT.md"
  }
}
```

If not configured, Ralph Loop will not cycle through iterations.

---

## 🎨 Claude Code Skills Required

### 1. `data-visualization-critic`
- **Location:** `~/.claude/skills/data-visualization-critic/`
- **Status:** ✅ Available (used for initial analysis)
- **Function:** Analyzes wireframe design quality

### 2. `ui-ux-pro-max`
- **Location:** `~/.claude/skills/ui-ux-pro-max/`
- **Status:** ✅ Available (used for design decisions)
- **Function:** Provides design tokens, color palettes, typography guidance
- **Requirements:** Python 3.6+ (✅ v3.13.3 available)
- **Database Files Needed:**
  - `scripts/search.py`
  - `data/product.csv`
  - `data/style.csv`
  - `data/typography.csv`
  - `data/color.csv`
  - `data/chart.csv`
  - `data/ux-guidelines.csv`
  - `data/stacks/nextjs.csv`

---

## 📋 Pre-Ralph Verification Checklist

Before running `/ralph-loop`, verify:

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v8+ installed (`npm --version`)
- [ ] Python 3.6+ installed (`python3 --version`)
- [ ] Git initialized in repo (`git status`)
- [ ] `.claude/PROMPT.md` exists and contains Ralph prompt
- [ ] Claude Code skills available:
  - [ ] `data-visualization-critic` (check: `ls ~/.claude/skills/data-visualization-critic`)
  - [ ] `ui-ux-pro-max` (check: `ls ~/.claude/skills/ui-ux-pro-max`)
- [ ] Stop hook configured in Claude Code settings
- [ ] Git user configured (`git config user.name` && `git config user.email`)
- [ ] Working directory is clean (`git status` shows no unexpected files)

---

## 🚀 What Ralph Loop Will Do Automatically

**Phase 1: Project Setup (Iteration 1)**
```bash
npx create-next-app@latest . --typescript --tailwind --skip-install
npm install
npm install lucide-react
# Commits initial Next.js setup
```

**Phase 2-15: Component Development**
- Analyzes wireframe using data-visualization-critic
- Creates TimelineVisualization.tsx component
- Implements all enhanced features (narrative titles, spacing, severity, evidence, etc.)
- Runs quality checks
- Commits improvements iteratively
- Exits when all checks pass

---

## ⚠️ Potential Issues & Solutions

### Issue 1: "Python not found" for ui-ux-pro-max
**Solution:** Ensure Python 3.6+ is in PATH
```bash
python3 --version
```

### Issue 2: "npm command not found"
**Solution:** Verify Node.js installation
```bash
node --version
npm --version
```

### Issue 3: Ralph Loop won't cycle (stops after first iteration)
**Solution:** Check stop hook configuration in Claude Code settings
```bash
cat ~/.claude/config.json | grep -A 2 "hooks"
```

### Issue 4: Permission denied errors on Git operations
**Solution:** Configure git user locally
```bash
cd /path/to/repo
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Issue 5: "Skill not found" error
**Solution:** Verify skills directory
```bash
ls ~/.claude/skills/ui-ux-pro-max/
ls ~/.claude/skills/data-visualization-critic/
```

---

## ✨ Ready to Launch Ralph?

Once all checklist items are verified, run:

```bash
cd C:\GitRepos\walters-controversy-timeline
/ralph-loop "Create production-ready Vercel timeline visualization" --max-iterations 15 --completion-promise "TIMELINE VISUALIZATION COMPLETE"
```

Ralph will handle all setup and implementation automatically!

---

## 📚 Reference

- **PROMPT.md Location:** `.claude/PROMPT.md`
- **Skill: Data Visualization Critic:** Analyzes design quality
- **Skill: UI/UX Pro Max:** Provides design intelligence
- **Ralph Loop Docs:** https://ghuntley.com/ralph/
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
