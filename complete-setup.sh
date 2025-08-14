#!/bin/bash

echo "🚀 Complete Pasifill Dashboard Setup Starting..."
echo "================================================"

# Check if we're in the right directory
if [ ! -f "dashboard.tsx" ]; then
    echo "❌ Error: dashboard.tsx not found in current directory"
    echo "Please run this script from the wunderfile directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📋 Files found:"
ls -la

echo ""
echo "🔧 Step 1: Installing Node.js dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed. Trying to fix..."
    npm cache clean --force
    npm install
fi

echo ""
echo "🎨 Step 2: Installing shadcn/ui components..."
npx shadcn@latest add card button badge avatar --yes

echo ""
echo "📝 Step 3: Creating missing configuration files..."

# Create components.json if it doesn't exist
if [ ! -f "components.json" ]; then
    cat > components.json << 'EOF'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
EOF
    echo "✅ Created components.json"
fi

# Create next-env.d.ts if it doesn't exist
if [ ! -f "next-env.d.ts" ]; then
    cat > next-env.d.ts << 'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
EOF
    echo "✅ Created next-env.d.ts"
fi

# Create app directory structure if it doesn't exist
if [ ! -d "app" ]; then
    mkdir -p app
    echo "✅ Created app directory"
fi

# Create app/layout.tsx if it doesn't exist
if [ ! -f "app/layout.tsx" ]; then
    cat > app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pasifill Dashboard',
  description: 'Alabama Septic Contractor CEP-5 Automation Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF
    echo "✅ Created app/layout.tsx"
fi

# Create app/page.tsx if it doesn't exist
if [ ! -f "app/page.tsx" ]; then
    cat > app/page.tsx << 'EOF'
import DashboardPage from '../dashboard'

export default function Home() {
  return <DashboardPage />
}
EOF
    echo "✅ Created app/page.tsx"
fi

# Create app/globals.css if it doesn't exist
if [ ! -f "app/globals.css" ]; then
    cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF
    echo "✅ Created app/globals.css"
fi

echo ""
echo "🔧 Step 4: Final dependency check..."
npm install

echo ""
echo "🎉 Setup Complete! Starting the dashboard..."
echo "================================================"
echo "🌐 Your dashboard will be available at: http://localhost:3000"
echo "📱 Mobile-optimized for Alabama field work"
echo "🏛️ ADPH compliant CEP-5 automation"
echo ""
echo "Starting development server..."

npm run dev
