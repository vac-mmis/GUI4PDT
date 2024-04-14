

self.onmessage = function (event) {
    const chunk = event.data;
    const result = chunk.map((obj) => calculate(obj)); // Perform function r() on each object
    self.postMessage(result); // Send processed data back to main thread
};
function calculate(obj) {


    let data = []


    for (let time = 0; time < obj.parent.getTimeLength(); time++) {


        const dist = obj.location.dist[time];
        if ("type" in dist) {
            data.push(dist.representation(true));

        }


    }

}
