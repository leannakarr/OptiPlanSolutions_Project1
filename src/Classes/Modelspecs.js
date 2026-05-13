export default class ModelSpecs{
    /* class model specs has id, seat number and take of weight used by aircraft 
    class could be used later for further actions*/
    constructor(modelId, modelString, totalSeats, takeOfWeight){
        this.modelID = modelId;
        this.totalSeats = totalSeats;
        this.takeOfWeight = takeOfWeight;
        this.modelString = modelString;
    }
}
