import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getUsername(){

  const token = localStorage.getItem("blogger-api-auth-token")

  return JSON.parse(atob(token!.split(".")[1])).username; // Decode JWT payload


}
export function getUseremail(){

  const token = localStorage.getItem("blogger-api-auth-token")

  return JSON.parse(atob(token!.split(".")[1])).email; // Decode JWT payload


}


export function localTimeToUtc(localtimeStr: string) {
  const [hours, minutes] = localtimeStr.split(':').map(Number);
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);

  const utcHours = now.getUTCHours().toString().padStart(2, '0');
  const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');

  return `${utcHours}:${utcMinutes}`;
}
export function utcToLocalTime(utcTimeStr: string) {
  const [hours, minutes] = utcTimeStr.split(':').map(Number);
  const now = new Date();
  now.setUTCHours(hours);
  now.setUTCMinutes(minutes);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);

  let localHours = now.getHours();
  const localMinutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = localHours >= 12 ? 'PM' : 'AM';

  localHours = localHours % 12;
  if (localHours === 0) localHours = 12;  // midnight or noon fix

  return `${localHours}:${localMinutes} ${ampm}`;
}
export function utcToLocalTime24HoursFormat(utcTimeStr: string) {
  const [hours, minutes] = utcTimeStr.split(':').map(Number);
  const now = new Date();
  now.setUTCHours(hours);
  now.setUTCMinutes(minutes);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);

  let localHours = now.getHours();
  const localMinutes = now.getMinutes().toString().padStart(2, '0');

  return `${localHours}:${localMinutes}`;
}
