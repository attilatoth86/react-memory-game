/** 
 * This function returns a random item from a list. 
 */
function getRandomListItem(list) {
    const idx = Math.floor(Math.random()*list.length);
    return list[idx];
}

export default getRandomListItem;
