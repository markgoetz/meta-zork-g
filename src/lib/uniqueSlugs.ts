interface Item {
    slug: string;
}

const uniqueSlugs = <T extends Item>(items: T[]):T[] => items.filter(
    (item, index) => items.findIndex(i => i.slug === item.slug) === index
);

export default uniqueSlugs;
