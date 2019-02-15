import _ from 'lodash';

/**
 * Check if the filters exist in collection and get limit and offset pass to parameters
 * @param collection
 * @param query
 * @param limitDefault
 * @returns {{filter: {}, limit: (Number|number), offset: (Number|number)}}
 */
export function formatQuery(collection, query, limitDefault = 10) {
    const filter = {};
    const limit = parseInt(query.limit, 10) || limitDefault;
    const page = parseInt(query.page, 10) || 1;
    const offset = (page * limit) - limit;
    _.forEach(query, (value, key) => {
        if (collection.schema.tree[key]) filter[key] = value;
    });
    return { filter, limit, offset };
}
