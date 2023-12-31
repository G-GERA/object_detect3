video = "";
Status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectName = document.getElementById("chooseObj").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.long(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if(Status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("object_found").innerHTML = "Object Found is " + objects;
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}



