import { combineEpics, ofType } from 'redux-observable';
import { FETCH_USER } from './constants';
import { fetchUserSuccess, fetchUserFailed } from './actions';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, takeUntil, retry, catchError, debounce } from 'rxjs/operators';
import { of, timer } from 'rxjs';

export const fetchUser = actions$ =>
  actions$.pipe(
    ofType(FETCH_USER),
    debounce(() => timer(1000)),
    mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
        .pipe(
          map(user => fetchUserSuccess(user)),
          takeUntil(actions$.ofType(FETCH_USER)),
          retry(2),
          catchError(error => of(fetchUserFailed(error)))
        )
    )
  )


export default combineEpics(
  fetchUser
);
