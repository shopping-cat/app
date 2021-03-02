import { InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";


export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                filteredItems: offsetLimitPagination(['category', 'keyword', 'orderBy']),
                recommendedItems: offsetLimitPagination(),
                itemReviews: offsetLimitPagination(['itemId', 'orderBy']),
                shopItems: offsetLimitPagination(['orderBy', 'shopId']),
                createableItemReviews: offsetLimitPagination(),
                myItemReviews: offsetLimitPagination(),
                coupons: offsetLimitPagination(),
                pointReceipts: offsetLimitPagination(),
                zzimItems: {
                    keyArgs: ['category'],
                    merge: function (existing, incoming, _a) {
                        var args = _a.args;
                        var merged = existing ? existing.slice(0) : [];
                        if (args) {
                            if (args.offset) {
                                var _b = args.offset, offset = _b === void 0 ? 0 : _b;
                                for (var i = 0; i < incoming.length; ++i) {
                                    merged[offset + i] = incoming[i];
                                }
                            }
                            else merged = incoming
                        }
                        else {
                            merged.push.apply(merged, incoming);
                        }
                        return merged;
                    },
                },
            },
        }
    },
})