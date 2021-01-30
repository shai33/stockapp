export const removeNullValues = (arr) => {
    const removedNulls = arr.filter( (item) => {
        return item != null;
    });
    return removedNulls;
};