# Typography System Guide

## **🎯 Typography Rules - 4 Sizes, 2 Weights**

### **Font Sizes (4 sizes):**
1. **`text-lg`** - Large headings (h1, main titles, page headers)
2. **`text-base`** - Medium text (h2, section headers, important text)
3. **`text-sm`** - Small text (h3, body text, labels, form inputs)
4. **`text-xs`** - Extra small (captions, metadata, secondary info, table headers)

### **Font Weights (2 weights):**
1. **`font-medium`** - Regular weight (body text, labels, secondary info, form labels)
2. **`font-semibold`** - Bold weight (headings, important text, emphasis, customer names)

## **📋 Implementation Examples:**

### **Page Headers:**
```tsx
<h1 className="text-lg font-semibold">Page Title</h1>
<h2 className="text-lg font-semibold">Section Title</h2>
```

### **Section Headers:**
```tsx
<h3 className="text-base font-semibold">Section Name</h3>
```

### **Form Labels:**
```tsx
<label className="block text-sm font-medium mb-2">Label Text</label>
```

### **Body Text:**
```tsx
<p className="text-sm font-medium">Regular paragraph text</p>
```

### **Table Headers:**
```tsx
<div className="text-xs font-medium uppercase tracking-wide">Column Header</div>
```

### **Customer Names:**
```tsx
<div className="text-sm font-semibold">{customer.name}</div>
```

### **Statistics Numbers:**
```tsx
<div className="text-base font-semibold">{statistic.value}</div>
```

### **Metadata/Captions:**
```tsx
<div className="text-xs font-medium">{metadata.text}</div>
```

## **🚫 What NOT to Use:**

- ❌ `text-2xl`, `text-3xl` (too large)
- ❌ `font-bold`, `font-light`, `font-normal` (inconsistent weights)
- ❌ `text-gray-700`, `text-gray-900` (colors handled by CSS system)
- ❌ `font-mono` (breaks consistency)

## **✅ Benefits:**

1. **Visual Consistency** - All text follows the same scale
2. **Better Readability** - Optimized size/weight combinations
3. **Easier Maintenance** - Fewer font variations to manage
4. **Professional Appearance** - Clean, unified typography
5. **Accessibility** - Consistent contrast and sizing

## **🔧 CSS Classes Available:**

The system provides these utility classes:
- `.text-lg.font-semibold` - Large headings
- `.text-base.font-semibold` - Medium headings  
- `.text-sm.font-medium` - Body text
- `.text-xs.font-medium` - Small text
- `.text-xl.font-semibold` - Very large titles (special cases)

## **📱 Responsive Considerations:**

- All sizes work well on mobile and desktop
- `text-lg` provides good hierarchy without being overwhelming
- `text-xs` remains readable on small screens
- Consistent spacing with `space-y-` utilities

