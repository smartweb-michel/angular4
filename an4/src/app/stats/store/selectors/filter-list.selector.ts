import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getCoins = createSelector(
    createFeatureSelector<any>('CoinsData'),
    (coins: any) => {
        return getSortData(coins.coins, coins.filter);
    }
);
function getSortData (coins, filter)  {
    let result = coins.slice();
    switch (filter.active) {
        case 'rank':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.finance.rank - a.finance.rank;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.finance.rank - b.finance.rank;
                });
            }
            break;
        case 'name':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
                });
            }
            break;
        case 'price':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.finance.price - a.finance.price;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.finance.price - b.finance.price;
                });
            }
            break;
        case 'marketCap':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.finance.marketCap - a.finance.marketCap;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.finance.marketCap - b.finance.marketCap;
                });
            }
            break;
        case 'currentSupply':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.finance.currentSupply - a.finance.currentSupply;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.finance.currentSupply - b.finance.currentSupply;
                });
            }
            break;
        case 'volume':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.finance.volume - a.finance.volume;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.finance.volume - b.finance.volume;
                });
            }
            break;
        case 'changeDay':
            if (filter.direction === 'desc') {
                result = result.sort((a, b) => {
                    return b.finance.changeDay - a.finance.changeDay;
                });
            } else {
                result = result.sort((a, b) => {
                    return a.finance.changeDay - b.finance.changeDay;
                });
            }
            break;
    }
    return result;
}
