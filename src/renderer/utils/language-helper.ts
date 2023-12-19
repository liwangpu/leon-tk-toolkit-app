const regionNames = new Intl.DisplayNames(['zh'], { type: 'language' });

export function translateLanguageCodeToDisplayName(code: string) {
  return regionNames.of(code);
}
