import { combineEpics, ofType } from 'redux-observable';
import { FETCH_USER } from './constants';
import { fetchUserSuccess, fetchUserFailed } from './actions';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map, mergeMap, takeUntil, retry, catchError } from 'rxjs/operators';

// export const fetchUser = actions$ =>
//   actions$
//     .ofType(FETCH_USER)
//     .mergeMap(action =>
//       ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
//         .map(user => fetchUserSuccess(user))
//         .takeUntil(actions$.ofType(FETCH_USER))
//         .retry(2)
//         .catch(error => Observable.of(fetchUserFailed()))
//     );
export const fetchUser = actions$ =>
  actions$.pipe(
    ofType(FETCH_USER),
    mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
        .pipe(
          map(user => fetchUserSuccess(user)),
          takeUntil(actions$.ofType(FETCH_USER)),
          retry(2),
          catchError(error => fetchUserFailed(error))
        )
    )
  )


export default combineEpics(
  fetchUser
);
