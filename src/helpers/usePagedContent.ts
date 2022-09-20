import { RootState } from '@store/index';
import React from 'react';
//import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

interface State {
    loading: boolean;
    page: number;
    init: boolean;
    countInPage: number;
    filter: any;
}

type Actions =
    | { type: 'init' }
    | { type: 'endRequest' }
    | { type: 'startRequest' }
    | { type: 'setPage'; page: number }
    | { type: 'setCountInPage'; countInPage: number }
    | { type: 'setFilter'; filter: any };

function reduce(state: State, action: Actions): State {
    switch (action.type) {
        case 'init':
            return { ...state, init: true, loading: false };
        case 'startRequest':
            return { ...state, loading: true, init: true };
        case 'endRequest':
            return { ...state, loading: false };
        case 'setPage':
            return { ...state, page: action.page };
        case 'setCountInPage':
            return { ...state, page: 1, countInPage: action.countInPage };
        case 'setFilter':
            return { ...state, filter: action.filter };
        default:
            return state;
    }
}

function init(): State {
                // Вот тут надо поменять
    return { page: 1, loading: true, init: false, countInPage: 8, filter: {} };
}

export const usePagedContent = (
    fetch: (data: any) => void,
    selector: (state: RootState) => any,
    filter?: any,
    runsFirstTime = true,
    take?: number,
) => {
    const [state, dispatch] = React.useReducer(reduce, undefined, init);

    const [count, reload] = React.useReducer((c) => c + 1, 0);

    const { data } = useSelector(selector);
    const { total = 0, result } = data ?? {};
    const innerTake = take || state.countInPage;
    const { Skip, pages } = React.useMemo(() => {
        if (state.filter !== filter) {
            dispatch({ type: 'setFilter', filter });
            dispatch({ type: 'setPage', page: 1 });
        }

        const Skip = innerTake * (state.page - 1);
        const pages = total / innerTake;

        return { Skip, pages };
    }, [innerTake, state.page, total, filter, state.filter]);

    React.useEffect(() => {
        if (!state.init && runsFirstTime) {
            // Вот тут надо поменять
            fetch({ ...filter, Skip, Take: 8 });

            dispatch({ type: 'init' });
            dispatch({ type: 'endRequest' });
        } else if (!state.init && !runsFirstTime) {
            dispatch({ type: 'init' });
        } else {
            dispatch({ type: 'startRequest' });
            fetch({ ...filter, Skip, Take: innerTake });
            dispatch({ type: 'endRequest' });
        }
    }, [fetch, state.page, innerTake, Skip, count, filter]);

    const setPage = React.useCallback((page) => {
        dispatch({ type: 'setPage', page });
    }, []);

    const setCountInPage = React.useCallback((countInPage) => {
        dispatch({ type: 'setCountInPage', countInPage });
    }, []);

    return {
        data: result,
        total,
        reload,
        page: state.page,
        pages,
        setPage,
        countInPage: innerTake,
        setCountInPage,
    };
};
