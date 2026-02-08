# Figma Interpretation Rules

These rules govern how Figma designs are translated into code by Antigravity.

1. **Slots**: Interpret all frames named 'Slot' as dynamic content areas (e.g., as `children` in React or placeholders in HTML).
2. **Color Tokens**: Use 'Variables' from Figma for color tokens instead of hardcoded hex values.
3. **Component Mapping**: 
   - Mapping `Main_Button` (Figma) -> `PrimaryButton` (React component).
