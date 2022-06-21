import getRandomListItem from "./getRandomListItem";

/** 
 * This function builds a list of objects by randomly selecting from another 
 * list of objects.
 */
function randomListBuilder(
    listOfObjects, newListLength, noOfRepetitionAllowed) {
    
    if (listOfObjects.length*noOfRepetitionAllowed<newListLength) {
        console.error(`Unable to build list with the given parameters. New list
            cannot be built without violating the number of repetition allowed 
            parameter.`);
        return
    }

    const newList = [];
    while (newList.length<newListLength) {
        const listItem = getRandomListItem(listOfObjects);
        if (newList.filter(e => {
            return JSON.stringify(e)===JSON.stringify(listItem)
            }).length<noOfRepetitionAllowed) {
            newList.push(listItem);
        }
    }
    return newList;
}

export default randomListBuilder;
