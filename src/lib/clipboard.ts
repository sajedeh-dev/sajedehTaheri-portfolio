/**
 * Copies text to the clipboard.
 *
 * @param text - Value to write to the clipboard.
 * @returns Whether the write succeeded.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
