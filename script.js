const video = document.getElementById("video-input");
const canvas = document.getElementById('canvas-output');

(async () =>{
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });

    let src = new canvas.Mat(video.clientHeight, video.wight, cv.CV_8UCA);
    let cap = new cv.VideoCapture(video);

    if(!stream){
        src.delete();
        dst.delete();
        return;
    }

    video.srcObject = stream;
    video.play();

    const FPS = 30;
    function processVideo(){
        let begin = Date.now();
        cap.read(src);

        // start aproccessing
        let gray = new cv.mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        let thresh = new cv.mat();
        cv.threshold(gray, thresh, 90, 255, cv.THRESH_OTSU);

        cv.findContours(
            thresh,
            contours,
            hierarchy,
            cv.RETR_CCOMP,
            cv.CHAIN_APPROX_SIMPLE
        );
        
        for (let i=0; i< contours.size(); ++i){
            let color = new cv.Scalar(255, 0, 0);
            cv.drawContours(src, contours, i, 1, color, cv.LINE_8, hietatchy, 100);
        }

        cv.imshow("canvas-output", tressh);

        // schedule the next one.
        let delay = 100000 /FPS -(Date.now() - begin);
        setTimeout(processVideo, delay);
    }

    setTimeout(processVideo, 0)
})();