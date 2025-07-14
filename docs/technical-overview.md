# AllergenWise App - Technical Overview

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Data Flow](#data-flow)
3. [Core Components](#core-components)
4. [Allergen Detection System](#allergen-detection-system)
5. [State Management](#state-management)
6. [Printing System](#printing-system)
7. [Technical Stack](#technical-stack)
8. [Key Technical Decisions](#key-technical-decisions)
9. [Future Improvements](#future-improvements)

## Architecture Overview

The AllergenWise app is a Next.js 13+ application built with TypeScript, utilizing the App Router architecture. It follows a component-based architecture with a clear separation of concerns between UI components, data processing, and state management.

```
src/
├── app/                  # App Router pages and layouts
├── components/           # Reusable UI components
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Core business logic and utilities
└── styles/               # Global styles and themes
```

## Data Flow

1. **File Upload & Parsing**
   - User uploads an Excel or CSV file containing menu items and allergen information
   - File is processed client-side using `xlsx` library for Excel files or custom CSV parser
   - The parser extracts headers and data rows while handling various edge cases

2. **Data Transformation**
   - Raw spreadsheet data is transformed into a structured format
   - Menu items are processed to extract:
     - English and Japanese names (using regex pattern matching)
     - Allergen information based on column headers
   - Data is normalized and stored in the application state

3. **State Management**
   - React Context API is used for global state management
   - `MenuProvider` manages the menu items and application settings
   - `SelectionContext` handles batch operations and selections

## Core Components

### 1. `FoodTagCard`
- Displays individual food tags with allergen information
- Handles the visual representation of allergens using icons
- Manages the download functionality for individual tags

### 2. `Editor`
- Main interface for viewing and editing menu items
- Provides bulk actions and filtering capabilities
- Handles the layout of food tags in a responsive grid

### 3. `Preview`
- Displays a printable preview of food tags
- Shows both logo and no-logo versions
- Implements the download functionality for multiple tags

### 4. `HomeClient`
- Handles file upload and initial data processing
- Maps spreadsheet columns to allergen types
- Validates and processes user input

## Allergen Detection System

The app uses a flexible system for detecting allergens in menu items:

### 1. Header-Based Detection
- Maps spreadsheet column headers to allergen types
- Supports multiple languages (primarily Japanese and English)
- Example mapping:
  ```typescript
  {
    'えび': 'shrimp',
    'かに': 'crab',
    '小麦': 'wheat',
    // ... more mappings
  }
  ```

### 2. Keyword Matching
- Comprehensive keyword database in `allergens.ts`
- Supports fuzzy matching and variations
- Handles both specific ingredients and categories

### 3. Data Normalization
- Converts various input formats to a standardized internal representation
- Handles different encodings and character sets
- Normalizes whitespace and special characters

## State Management

The app uses a combination of React Context and local state:

### `MenuProvider`
- Manages the list of menu items
- Handles CRUD operations for menu items
- Persists state across navigation

### `SelectionContext`
- Tracks selected items for batch operations
- Manages selection state and bulk actions
- Provides utilities for selecting/deselecting items

## Printing System

The app generates print-ready food tags with the following specifications:

### 1. Layout
- Physical dimensions: 9cm (width) × 13cm (height)
- Folded to show 9cm × 6.5cm front face
- Bottom 1.8cm reserved for logo

### 2. Technical Implementation
- Uses CSS-in-JS for precise control over print styles
- Generates high-resolution (300 DPI) images for download
- Implements responsive design for various screen sizes

### 3. Download Process
1. Renders the food tag to an off-screen canvas
2. Converts the canvas to a PNG image
3. Triggers a download with appropriate filename and MIME type

## Technical Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **UI Library**: React 18+
- **Styling**: Tailwind CSS with custom theming
- **Data Processing**:
  - `xlsx` for Excel file parsing
  - Custom CSV parser
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## Key Technical Decisions

1. **Client-Side Processing**
   - All file processing happens in the browser
   - No server-side dependencies required
   - Better privacy as data never leaves the user's device

2. **Responsive Design**
   - Uses CSS Grid and Flexbox for responsive layouts
   - Implements print-specific styles for optimal printing

3. **Performance Optimizations**
   - Memoization with `useMemo` and `useCallback`
   - Virtualized lists for large datasets
   - Lazy loading of components

4. **Accessibility**
   - Semantic HTML elements
   - ARIA attributes where appropriate
   - Keyboard navigation support

## Future Improvements

1. **Enhanced Allergen Detection**
   - Machine learning for more accurate ingredient detection
   - Support for more languages and regional variations

2. **Advanced Features**
   - Cloud sync for saving and sharing menus
   - Template system for different food service types
   - Nutritional information integration

3. **Developer Experience**
   - Comprehensive test coverage
   - Storybook for component development
   - Better error boundaries and logging

4. **User Experience**
   - Drag-and-drop interface for menu organization
   - Real-time preview of changes
   - More customization options for tag design
