import { AppState } from '../types/ppwr';
import { getInitialAppState } from '../data/initialData';

const STORAGE_KEY = 'ppwr_tracker_app_state_v1';

export function loadStateFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialAppState();
      saveStateToStorage(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as AppState;
    // Basic schema check
    if (!parsed.parameters || !parsed.masterComponents || !parsed.rules) {
      const initial = getInitialAppState();
      saveStateToStorage(initial);
      return initial;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return getInitialAppState();
  }
}

export function saveStateToStorage(state: AppState): string {
  try {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const stateToSave: AppState = {
      ...state,
      lastSaved: timeStr,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    return timeStr;
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
    return state.lastSaved || 'Save failed';
  }
}

export function exportBackupJson(state: AppState): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `ppwr-compliance-backup-${dateStr}.json`;
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function parseBackupFile(file: File): Promise<AppState> {
  const text = await file.text();
  const parsed = JSON.parse(text) as AppState;

  if (
    !parsed.parameters ||
    !Array.isArray(parsed.rules) ||
    !Array.isArray(parsed.masterComponents) ||
    !Array.isArray(parsed.manufacturerIntakes)
  ) {
    throw new Error('Invalid backup file structure: missing required PPWR data collections.');
  }

  return {
    ...parsed,
    lastSaved: `Restored at ${new Date().toLocaleTimeString()}`,
  };
}
