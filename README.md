# 🚧 Construction AI | Autonomous Multi-Agent Command Center

**Construction AI** is a state-of-the-art, premium command-center application designed for advanced physical infrastructure tracking, autonomous risk analysis, automated scheduling, and multi-agent site synthesis.

Built on **Next.js**, **Tailwind CSS**, **Prisma 7**, and **MySQL**, it translates unstructured spatial directives into fully relational, tracking-ready operative footprints using secure AI integrations.

---

## 🚀 Quick Start Guide

Follow these steps to clone, provision, and launch the Platform on your local machine.

### 1. Clone & Install Dependencies
Clone the repository and install the underlying node module fleet:

```bash
git clone https://github.com/AbdulhadiYaseen/construction-ai.git
cd construction-ai
npm install
```

### 2. Configure Local Environment
Create a `.env` file at the root directory of the project:

```env
# 🗄️ Local MySQL Database Routing
DATABASE_URL="mysql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:3306/construction_ai"

# 🔐 Session Encryption Keys
JWT_SECRET="generate_a_secure_random_string_here"

# 🧠 Agent Engines (Optional, fallbacks configured automatically)
OPENAI_API_KEY="your_openai_api_key"
```

### 3. Provision Database Schemas (Prisma 7)
This platform runs on **Prisma 7**. Ensure you have your local MySQL database server running, then execute the following to synchronize the tables and generate the driver bindings:

```bash
# Push schema directly onto your database
npx prisma db push

# Synthesize native client wrappers
npx prisma generate
```

### 4. Boot Up Dev Server
Launch the Next.js compiler:

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to initialize your Command Center!

---

## 📡 Major Architecture Components

*   **⚛️ Frontend UI Shell**: Next.js App Router wrapping custom-styled Tailwind visual systems, including ambient glows, glassmorphic panels, and conditional Layout wrappers.
*   **🔐 Security Middleware**: Strict Edge `proxy.ts` mapping reading cryptographic JWT persistence cookies to secure restricted internal views.
*   **💾 Data Interface**: Complete Prisma 7 connection pipeline backed by JavaScript-native `@prisma/adapter-mariadb` driver layers.
*   **🤖 Synthesizer Core**: High-performance multi-agent prompt handlers running in `agents/plannerAgent.ts` with local synthesis fallback blocks.

---

## 📂 Application Layout Blueprint

*   `app/dashboard/` - Operational metrics grids & footprint welcome counters.
*   `app/projects/` - Extended site inventory tables with text searches.
*   `app/projects/[id]/` - Individual Project Commander node loaded with Live Tab controllers (**Tasks**, **Risks**, **Autonomous Logs**).
*   `app/planner/` - Interactive synthesis sandbox utilizing prompt templates.
*   `app/login/` & `app/signup/` - Pristine distraction-free authentication interfaces.

---

**Author**: *[Abdulhadi Yaseen](https://github.com/AbdulhadiYaseen)*
