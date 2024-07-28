import { writable } from 'svelte/store';
import type { KnittingActions } from '../../routes/knitting/interfaces';

export const knittingActionsStore = writable<KnittingActions>();
