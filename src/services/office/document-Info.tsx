
    /// <summary>
    /// Inserts sample content for testing the find-and-replace functionality..
    /// </summary>
export function  inserText() {
        
    // Run a batch operation against the Word object model.
    Word.run(function (context) {

        // Create a proxy object for the document body.
        let body = context.document.body;

        // Queue a commmand to clear the contents of the body.
        body.clear();

        // Queue commands to insert text into the end of the Word document body.
        // Use insertText for the first to prevent a line break from being inserted 
        // at the top of the document.
        body.insertText("huhu", "End");

        // Synchronize the document state by executing the queued commands, and return a promise to indicate task completion.
        return context.sync();
    })
    .catch(errorHandler);
}

export function errorHandler(error: any){
    console.log("Error: " + error);
    if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
}
