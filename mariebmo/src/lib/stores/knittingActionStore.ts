import { writable } from 'svelte/store';
import type { KnittingActions } from '../../routes/knitting-tools/calculator/interfaces';

export const knittingActionsStore = writable<KnittingActions | null>();
