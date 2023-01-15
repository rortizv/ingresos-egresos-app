import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems, borrarItem } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateIngresos extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({ ...state, items: [] })),
    on(borrarItem, (state, { uid }) => ({ ...state, items: state.items.filter(item => item.uid !== uid) }))

);

export function ingresoEgresoReducer(state: any, action: any) {
    return _ingresoEgresoReducer(state, action);
}