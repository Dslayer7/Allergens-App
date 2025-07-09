# **App Name**: AllergenWise

## Core Features:

- File Upload: Home page with file upload component to upload menu files in .xlsx or .csv format.
- Menu Processing: Process menu file using a Cloud Function with a mock AI tool for intelligent column mapping. The mock will need to be updated with the proper mapping to Groq. The LLM will use a tool to decide when or if to incorporate some piece of information in its output.
- Data Editor: Editor page to display processed data in an editable table format for allergen verification and modification.
- Tag Preview: Preview page to display a gallery of generated food tag cards for all menu items, with a 'Download as PNG' button on each card. Previews should be 13mm length x 9mm width, with print area of 6.5mm length.
- Food Tag Card: Reusable React component to render the visual design of a food tag, displaying the English name, Japanese name, and the icons for the specified allergens.
- Data Structures: Define and use TypeScript interfaces (MenuItem, AllergenInfo) throughout the application for type safety and data structure consistency.
- Allergen Mapping: Store Allergen Mapping data, that represents all 20 allergens as AllergenInfo objects with keys, names and icons. This can be used to populate labels, pick allergen icons etc.

## Style Guidelines:

- Primary color: Light green (#90EE90) for a fresh, food-related aesthetic.
- Background color: Light cyan (#E0FFFF). This blue tone matches well with the green.
- Accent color: Pale yellow (#F0E68C) for interactive elements.
- Font pairing: 'Poppins' (sans-serif) for headings, 'PT Sans' (sans-serif) for body.
- Code font: 'Source Code Pro' for displaying code snippets.
- Simple, clear icons for each allergen, sourced from a consistent icon set.
- Clean, minimalist layout with ample whitespace for readability.