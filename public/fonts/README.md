# Font Files

Place the following font files in this directory:

1. `Montserrat-Variable.woff2` - Variable Montserrat font
2. `MontserratFallback-Regular.woff2` - Montserrat fallback font
3. `AtlassianSans-Regular.woff2` - Atlassian Sans font

If you don't have these files, the system will attempt to load them from the web, but this may cause delays or inconsistencies.

## Getting the Fonts

- Montserrat is available on Google Fonts: https://fonts.google.com/specimen/Montserrat
- Atlassian Sans is Atlassian's corporate font and may require licensing

## Custom Fonts

You can also add your own custom fonts to this directory. If you do, remember to update:

1. The font-face declarations in `src/styles/globals.css`
2. The font family references in `tailwind.config.ts`

See the configuration in the project for more details on how to use custom fonts.