const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

const port = 8080

const maxSize = 8

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get('/getRequest/Voltmeter', (req, res) => {
    fs.readFile('ESP32-VOLTMETER.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        // const jsonData = JSON.parse(data);
        // const Flow = jsonData.find((item) => {
        //     return item.sendDat
        // })

        const FLOW = JSON.parse(data);
        // console.log(FLOW);
        res.json(FLOW);
    })
});

app.post('/postRequest/Voltmeter', (req, res) => {
    // * read file
    fs.readFile('ESP32-VOLTMETER.json', 'utf8', (err, data) => {
        if(err) {
            console.log('Error reading file:', err)
            return;
        }

        let FlOW = JSON.parse(data);
        console.log(FlOW.length)

        if(FlOW.length >= maxSize){
            for(i = 0; FlOW.length >= maxSize; i++){
                console.log("Delete : " + FlOW[0] + " because length's over size.")
                FlOW.splice(FlOW[0], 1)
            }
        }

        req.body.date = new Date().toLocaleDateString()
        req.body.timeStamp = new Date().toLocaleTimeString()

        const newData = req.body

        FlOW.push(newData)
        const nextDat = JSON.stringify(FlOW, null, 2)

        // * write new data
        fs.writeFile('ESP32-VOLTMETER.json', (nextDat), (err) => {
            if(err) {
                console.log('Error reading file:', err)
                return;
            }

            console.log('Data update : Success')
            res.json(JSON.parse(nextDat))
        })
    }, [])
});

app.listen(port, () => console.log(`Server running on port ${port}`));