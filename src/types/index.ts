/**
 * Type definitions index file
 * Re-exports all types from the types directory
 */

// Navigation types
export * from './navigation';

// Building configuration types
export * from './building-config';

// UI component types
export * from './ui';

// Common event types
export type EventHandler<E = Event> = (event: E) => void;