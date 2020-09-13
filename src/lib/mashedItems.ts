const getKeyName = (itemASlug: string, itemBSlug: string) => `masher///${itemASlug}///${itemBSlug}`;

export const markItemsMashed = (itemASlug: string, itemBSlug: string) => {
    const key = getKeyName(itemASlug, itemBSlug);
    localStorage.setItem(key, 'true');
};

export const haveItemsBeenMashed = (itemASlug: string, itemBSlug: string) => {
    const key = getKeyName(itemASlug, itemBSlug);
    return localStorage.getItem(key) === 'true';
};
