import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

/**
 * A pre-typed version of the `useDispatch` hook.
 * Use this throughout the app instead of the plain `useDispatch`.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * A pre-typed version of the `useSelector` hook.
 * Use this throughout the app instead of the plain `useSelector`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
