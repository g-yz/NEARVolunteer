import { PostedCertificate, certificates, PostedEvent, events } from './model';
import { context } from "near-sdk-as";

// --- contract code goes below

// The maximum number of latest certificates the contract returns.
const ITEMS_LIMIT = 10;


/// CERTIFICATES


/**
 * Adds a new certificate under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */

export function addCertificate(text: string): bool {
  const numEvents = min(ITEMS_LIMIT, events.length);
  const startIndex = events.length - numEvents;
  for(let i = 0; i < numEvents; i++) {
    if(events[i + startIndex].codeEvent == text){
      // Creating a new certificate and populating fields with our data
      const certificate = new PostedCertificate(events[i + startIndex].text);
      // Adding the certificate to end of the the persistent collection
      certificates.push(certificate);
      return true
    }
  }
  return false
}

/**
 * Returns an array of last N certificates.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
 export function getAllCertificates(): PostedCertificate[] {
  const numCertificates = min(ITEMS_LIMIT, certificates.length);
  const startIndex = certificates.length - numCertificates;
  const result = new Array<PostedCertificate>(numCertificates);
  for(let i = 0; i < numCertificates; i++) {
    result[i] = certificates[i + startIndex];
  }
  return result;
}

/// EVENTS


/**
 * Adds a new event under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
 export function addEvent(text: string, code: string, dateStart: string, dateEnd: string): bool {
  // Creating a new event and populating fields with our data
  const event = new PostedEvent(text, code, dateStart, dateEnd);
  // Adding the event to end of the the persistent collection
  events.push(event);

  return true
}

/**
 * Returns an array of last N events.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
 export function getAllEvents(): PostedEvent[] {
  const numEvents = min(ITEMS_LIMIT, events.length);
  const startIndex = events.length - numEvents;
  const result = new Array<PostedEvent>();
  for(let i = 0; i < numEvents; i++) {
      result.push(events[i + startIndex]);
  }
  return result;
}
