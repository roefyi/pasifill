#!/bin/bash

echo "🚀 Setting up Formifil Dashboard..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install shadcn/ui components
echo "🎨 Installing shadcn/ui components..."
npx shadcn@latest add card button badge avatar --yes

# Create next-env.d.ts if it doesn't exist
if [ ! -f "next-env.d.ts" ]; then
    echo "📝 Creating next-env.d.ts..."
    echo "/// <reference types=\"next\" />" > next-env.d.ts
    echo "/// <reference types=\"next/image-types/global\" />" >> next-env.d.ts
fi

echo "✅ Setup complete! Run 'npm run dev' to start the dashboard"
echo "🌐 Open http://localhost:3000 in your browser"
