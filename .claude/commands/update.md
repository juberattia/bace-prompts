# /update - Update CLAUDE.md

You are helping update the CLAUDE.md file with the latest workshop information.

## Context: $ARGUMENTS

---

## Task

Update the CLAUDE.md file at the root of the project with the latest workshop commands, agents, and information.

### Steps:

1. **Read the current CLAUDE.md** to understand its structure
2. **Scan .claude/commands/** directory to find all available commands
3. **Update CLAUDE.md** with:
   - Any new commands that were added
   - Updated descriptions if commands have changed
   - Ensure all command categories are current
   - Keep the existing style and formatting
   - Preserve user customizations (app-specific content)

### What to Update:

- ✅ Command lists (learning modules, building tools, project management)
- ✅ Available agents list
- ✅ New features or capabilities
- ✅ Quick reference sections

### What NOT to Change:

- ❌ User's personalized content (their app description)
- ❌ Tech stack preferences they've set
- ❌ Custom sections they've added
- ❌ Overall structure and formatting style

---

## Output

After updating:
1. Show a summary of what was updated
2. List any new commands that were added
3. Confirm CLAUDE.md is current

---

**Pro tip:** You can specify what to update by adding arguments, e.g., `/update commands` or `/update agents`
