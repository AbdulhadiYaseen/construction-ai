---
name: Constructify Autonomous Core
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#87d3d5'
  on-secondary: '#003738'
  secondary-container: '#006466'
  on-secondary-container: '#92dee0'
  tertiary: '#83cfff'
  on-tertiary: '#00344b'
  tertiary-container: '#00a3e1'
  on-tertiary-container: '#00354c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#a3f0f1'
  secondary-fixed-dim: '#87d3d5'
  on-secondary-fixed: '#002021'
  on-secondary-fixed-variant: '#004f51'
  tertiary-fixed: '#c6e7ff'
  tertiary-fixed-dim: '#83cfff'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#004c6b'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
  surface-elevated: '#1A1D23'
  surface-glass: rgba(26, 29, 35, 0.7)
  safety-risk: '#EE4444'
  env-risk: '#22C55E'
  logistics-risk: '#EAB308'
  agent-planner: '#A855F7'
  agent-risk: '#F43F5E'
  agent-scheduler: '#3B82F6'
  agent-decision: '#10B981'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  agent-tag:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 12px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-edge: 32px
  container-max: 1440px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is engineered for a multi-agent construction ecosystem where precision, autonomy, and safety are paramount. The aesthetic is **Modern Corporate** with a **Tactile Tech** edge, drawing inspiration from high-end architectural software and industrial automation interfaces.

The brand personality is authoritative yet approachable, utilizing a high-contrast dark-mode foundation to reduce eye strain for project managers and site supervisors. The visual language balances "heavy" industrial reliability with "light" autonomous intelligence through the use of glassmorphism, refined micro-borders, and a sophisticated data-driven hierarchy.

**Design Pillars:**
- **Autonomous Precision:** Sharp execution of layout and alignment to mirror the accuracy of AI agents.
- **Safety First:** Strategic use of high-visibility accents to highlight critical risk and logistical alerts.
- **Data Density:** Efficient use of space to present complex multi-agent workflows without cognitive overload.

## Colors

The palette is rooted in a "Deep Slate" environment to provide a professional, focused workspace. 

- **Primary (Safety Orange):** Reserved strictly for primary actions, critical alerts, and physical site safety indicators.
- **Secondary (Teal):** Used for "Constructify Intelligence" features—where the AI agents are actively processing.
- **Tertiary (Architectural Blue):** Used for structural elements, blueprints, and drafting-related data.
- **Neutral:** A deep navy-tinted charcoal (#0F1115) serves as the canvas, providing better depth than pure black.

**Risk & Agent Tokens:**
- **Risk Severity:** Red (Safety), Yellow (Logistical), and Green (Environmental) follow international industrial standards.
- **Agent Identifiers:** Distinct colors are assigned to AI roles to allow users to instantly identify which agent is providing feedback or performing an action in the collaborative stream.

## Typography

The system utilizes a tri-font strategy to differentiate between branding, content, and system logic.

1.  **Hanken Grotesk (Headlines):** A sharp, contemporary sans-serif that conveys engineering precision.
2.  **Inter (Body):** The industry standard for readability in complex dashboards. Used for all multi-line text and agent communication logs.
3.  **JetBrains Mono (Labels/Data):** Used for timestamps, coordinates, sensor readings, and agent technical metadata. This font reinforces the "autonomous/code-driven" nature of the platform.

**Hierarchy Rules:**
- All technical data and agent IDs must be set in `label-caps` or `agent-tag`.
- Use `body-sm` for dense data tables to maximize information density.

## Layout & Spacing

The design system employs a **Fixed-Fluid Hybrid Grid**. On desktop, content is contained within a 1440px centered track with a 12-column structure. On tablet and mobile, the layout shifts to a fluid 4-column structure with reduced margins.

**Spacing Rhythm:**
A strict 4px baseline grid ensures alignment between data points. 
- **Dashboards:** Use "Compact" spacing (16px gutters) to allow for more visual modules per screen.
- **Log Views:** Use "Comfortable" vertical spacing (stack-md) for agent message threads to ensure readability.

**Breakpoints:**
- Mobile: < 768px (Single column, full-width cards)
- Tablet: 768px - 1199px (2-column layouts)
- Desktop: 1200px+ (12-column grid, persistent agent-sidebar)

## Elevation & Depth

Constructify uses **Tonal Glassmorphism** to represent levels of autonomy and focus.

1.  **Background (Level 0):** The deep slate neutral base.
2.  **Surfaces (Level 1):** Solid `#1A1D23` cards with a subtle 1px border (`rgba(255,255,255,0.08)`).
3.  **Overlays/Modals (Level 2):** Glassmorphic surfaces with a 12px backdrop blur and `rgba(26, 29, 35, 0.7)` background.
4.  **Active Agent Focus:** A glowing 2px border using the specific Agent's Identifier color to indicate which AI is currently "thinking" or "suggesting."

Shadows are avoided in favor of "Inner Glows" and "Micro-Borders," creating a sleeker, more digital-first interface that feels like a HUD (Heads-Up Display).

## Shapes

The shape language is **Industrial Soft-Geometric**. 

- **Components:** A base radius of 4px (Soft) is used for buttons, inputs, and small cards to maintain a technical, engineered feel.
- **Large Containers:** `rounded-lg` (8px) is reserved for main dashboard panels.
- **Agent Avatars:** Hexagonal clips are used for agent icons to distinguish them from human user avatars (which are circular).
- **Status Badges:** Use a 2px radius or "Squircle" for a distinct look from standard buttons.

## Components

### Buttons
- **Primary:** Safety Orange background, White text, 4px radius. High-impact shadow on hover.
- **Ghost/Outline:** 1px border in Architectural Blue. Used for secondary navigation.
- **Agent Action:** Using the color of the specific agent (e.g., Scheduler Blue) to denote an AI-triggered action.

### Agent Identifiers
- **Agent Cards:** Small cards featuring a monospaced "Role" label, a hexagonal icon, and a pulsing "Active" state indicator.
- **Decision Badges:** High-contrast badges that show "AI Recommended" next to proposed scheduling changes.

### Status Badges
- **Status Pills:** Solid background for 'Completed' (Green), Outlined for 'In Progress' (Blue), and Dotted-border for 'Pending' (Gray).
- **Risk Badges:** Located at the top right of cards. Features a small warning icon + risk category (e.g., ⚠️ LOGISTICAL).

### Cards
- **Data Cards:** No padding on the header; 1px divider between header and content. High-density data tables inside cards should use zebra-striping with `rgba(255,255,255,0.03)`.

### Inputs
- **Technical Inputs:** Dark backgrounds with 1px architectural blue bottom-border. On focus, the border glows and expands to 2px.