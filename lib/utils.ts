import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeShareableUrl(regex: string, testString: string, flags: string[]): string {
  const params = new URLSearchParams()
  if (regex) params.set('regex', regex)
  if (testString) params.set('test', testString)
  if (flags.length > 0) params.set('flags', flags.join(''))
  
  return `${window.location.origin}/regex-tester?${params.toString()}`
}

export function parseRegexFlags(flagString: string): string[] {
  return flagString.split('').filter(flag => ['g', 'i', 'm', 's', 'u', 'y'].includes(flag))
}
