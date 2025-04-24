import { AppEvents, UpdateScriptEvent } from "../events";
import { StoreState } from "./state";

type ReducerFunctionReturnValue = [StoreState | null, CustomEvent | null];

type ReducerFunction = (
  state: StoreState,
  event: CustomEvent
) => ReducerFunctionReturnValue;

type ReducerMap = {
  [key: string]: ReducerFunction;
};

export class Reducer {
  static map: ReducerMap = {
    // Add handlers for further Events mutating state here
    [AppEvents.updateScript]: (state: StoreState, event: UpdateScriptEvent) => {
      state.script = event.detail;
      return [state, null];
    },
  };

  static reduce(state: StoreState, event: Event): ReducerFunctionReturnValue {
    if (Reducer.map[event.type]) {
      return Reducer.map[event.type](state, event as CustomEvent);
    }

    return [null, null];
  }
}
