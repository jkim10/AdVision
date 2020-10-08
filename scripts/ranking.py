def generateRanking(roomData, number_shown, anonymous=True):
    mergedArray = []
    for key in roomData:
        mergedArray = mergedArray + roomData[key]
    return max(set(mergedArray), key=mergedArray.count)
