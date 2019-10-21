import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
}

const SIZE = 10;

export function query(args: {
  after?: string;
  limit?: number;
  types?: string[];
  q?: string;
}): Connection<Pokemon> {
  const { after, q, types, limit = SIZE } = args;

  const filterByTypes: (as: Pokemon[]) => Pokemon[] =
    types === undefined
      ? identity
      : A.filter(p => p.types.some(el => types.includes(el)));

  const filterByQ: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
      ? identity
      : as =>
          pipe(
            as,
            A.findIndex(a => a.id === after),
            O.map(a => a + 1),
            O.fold(() => as, idx => as.slice(idx))
          );

  const results: Pokemon[] = pipe(
    data,
    filterByQ,
    filterByTypes,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}

export function queryByTypes(args: {
  types: string[];
  after?: string;
  limit?: number;
}): Connection<Pokemon> {
  const { types, after, limit = SIZE } = args;

  const filterByTypes: (as: Pokemon[]) => Pokemon[] = A.filter(p =>
    p.types.some(el => types.includes(el))
  );

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    after === undefined
      ? identity
      : as =>
          pipe(
            as,
            A.findIndex(a => a.id === after),
            O.map(a => a + 1),
            O.fold(() => as, idx => as.slice(idx))
          );

  const results: Pokemon[] = pipe(
    data,
    filterByTypes,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}
