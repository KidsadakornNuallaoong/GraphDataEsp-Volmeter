import './App.css';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement
// );

// // var event:Array<number> = [2, 4, 3, 4, 6, 2, 9, 2, 4, 4, 8, 3, 5, 6];
// var event = data.event3;

// console.log(JSON.stringify(event));

// export function App() {
//   const data = {
//     labels: ['monday:01', 'teusday:02', 'wednesday:03', 'thursday:04', 'friday:05', 'saturday:06', 'sunday:07',
//     'monday:1.2', 'teusday:1.3', 'wednesday:1.4', 'thursday:1.5', 'friday:1.6', 'saturday:1.7', 'sunday:1.8'],
//     datasets: [{
//       data: event,
//       backgroundColor: 'black',
//       borderColor: '#45009D',
//       pointbackgroundColor: 'transparent',
//       pointborderWidth: 10,
//       borderWidth: 5,
//       pointRadius: 10,
//       pointHoverRadius: 20,
//       tension: 0.4,
//     }]
//   };

//   const option:any = {
//     plugins: {
//       Legend: {
//         display: true
//       }
//     },

//     scales: {
//       x: {
//         grid: {
//           display: true
//         }
//       },
//       y: {
//         beginAtZero: true,
//         min: 0,
//         max: 10,
//         ticks: {
//           stepSize: 1,
//           callback: function (value: any) {
//             return value + 'K';
//           },
//         },
//         grid: {
//           borderDash: [10],
//         },
//       },
//     },
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Line className='Dat'  data={data} options={option}></Line>
//       </header>
//     </div>
//   )
// }
let selected = "hidden"
let selected2 = "hidden"
let selected_plug = "show"

const sizePointer = 7;

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

function App() {

  const toggle_plug = () => {
    selected = "hidden"
    selected2 = "show"

    selected_plug === "hidden" ?
      selected_plug = "show" : selected_plug = "hidden"
  }

  const toggle_vol = () => {
    selected = "show"
    selected2 = "hidden"
  }


  // * Voltmeter Data Setup
  const [backendData, setBackendData] = useState<any>([{}]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/getRequest/Voltmeter')
        .then(res => res.json())
        .then(data => setBackendData(data))
        .catch(err => console.log(err))
    }, 100);

    return () => clearInterval(interval);
  }, [])

  const Voltage = backendData.map((element: any) => {
    return element.Voltage;
  })

  const local = backendData.map((element: any) => {
    return `${element.timeStamp}`;
  })

  // * Plug no.1 Data Setup

  const [backendData2, setBackendData2] = useState<any>([{}]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8000/getRequest/Plug1')
        .then(res => res.json())
        .then(data2 => setBackendData2(data2))
        .catch(err => console.log(err))
    }, 100);

    return () => clearInterval(interval);
  }, [])

  const Current = backendData2.map((element: any) => {
    return element.Current;
  })

  const Power = backendData2.map((element: any) => {
    return element.Power;
  })

  const Currency = backendData2.map((element: any) => {
    return element.Currency;
  })

  const local1 = backendData2.map((element: any) => {
    return `${element.timeStamp}`;
  })

  // * Plug no.2 Data Setup

  const [backendData3, setBackendData3] = useState<any>([{}]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8000/getRequest/Plug2')
        .then(res => res.json())
        .then(data2 => setBackendData3(data2))
        .catch(err => console.log(err))
    }, 100);

    return () => clearInterval(interval);
  }, [])

  const Current2 = backendData3.map((element: any) => {
    return element.Current;
  })

  const Power2 = backendData3.map((element: any) => {
    return element.Power;
  })

  const Currency2 = backendData3.map((element: any) => {
    return element.Currency;
  })

  const local2 = backendData3.map((element: any) => {
    return `${element.timeStamp}`;
  })

  // * function table
  function table_vol() {
    return (
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Voltage</th>
            <th>Date</th>
            <th>Time Stamp</th>
          </tr>
        </thead>
        <tbody>
          {
            backendData.slice(4, 8).map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{item.Device}</td>
                  <td>{item.Voltage}</td>
                  <td>{item.date}</td>
                  <td>{item.timeStamp}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  function table_plug(props: any) {
    return (
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Current</th>
            <th>Power</th>
            <th>Currency</th>
            <th>Time Stamp</th>
          </tr>
        </thead>
        <tbody>
          {
            props.slice(4, 8).map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td>{item.Device}</td>
                  <td>{item.Current}</td>
                  <td>{item.Power}</td>
                  <td>{item.Currency}</td>
                  <td>{item.timeStamp}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  const data = {
    type: 'line',
    labels: local1,
    datasets: [
      {
        label: 'Current',
        data: Current,
        backgroundColor: 'black',
        borderColor: '#00ff89',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 10,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 12,
        tension: 0.6,
      },
      {
        label: 'Power',
        data: Power,
        backgroundColor: 'black',
        borderColor: '#50FFAA',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 10,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 12,
        tension: 0.6,
      },
      {
        label: 'Currency',
        data: Currency,
        backgroundColor: 'black',
        borderColor: '#FFDE59',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 10,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 12,
        tension: 0.6,
      }
    ]
  };

  const data2 = {
    type: 'line',
    labels: local2,
    datasets: [
      {
        label: 'Current',
        data: Current2,
        backgroundColor: 'black',
        borderColor: '#45009D',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 10,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 12,
        tension: 0.6,
      },
      {
        label: 'Power',
        data: Power2,
        backgroundColor: 'black',
        borderColor: '#0fffff',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 10,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 12,
        tension: 0.6,
      },
      {
        label: 'Currency',
        data: Currency2,
        backgroundColor: 'black',
        borderColor: '#FFDE59',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 10,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 12,
        tension: 0.6,
      }
    ]
  };

  const option: any = {
    plugins: {
      tooltip: {
        padding: 13,
        borderWidth: 3,
        borderColor: '#5900CB',
        titleAlign: 'center',
        bodyAlign: 'center',
        titleFont: {
          size: 20,
        },
        bodyFont: {
          size: 17,
          weight: 'bold',
        },
        yAlign: 'bottom',
      },
      Legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Event',
        color: 'black',
        font: {
          size: 100,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      }
    },

    scales: {
      x: {
        grid: {
          display: true
        }
      },
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 100,
          callback: function (value: any) {
            return value;
          },
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  const option2: any = {
    plugins: {
      tooltip: {
        padding: 13,
        borderWidth: 3,
        borderColor: '#5900CB',
        titleAlign: 'center',
        bodyAlign: 'center',
        titleFont: {
          size: 20,
        },
        bodyFont: {
          size: 17,
          weight: 'bold',
        },
        yAlign: 'bottom',
      },
      Legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Event',
        color: 'black',
        font: {
          size: 100,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      }
    },

    scales: {
      x: {
        grid: {
          display: true
        }
      },
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            return value;
          },
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  const data3 = {
    type: 'bar',
    labels: local,
    datasets: [
      {
        label: 'Event3',
        data: Voltage,
        backgroundColor: 'black',
        borderColor: 'red',
        pointbackgroundColor: 'transparent',
        pointborderWidth: 7,
        borderWidth: 4,
        pointRadius: sizePointer,
        pointHoverRadius: 20,
        tension: 0.4,
      },
    ]
  };

  return (
    <header>
      <div className="Title">
        C<span className='highlight'>S</span>EA AIoT Cloud Management
      </div>
      <div className="bar">
        <div className="head"></div>
        <div className="barSide">
          <a href='https://www.facebook.com/Horiil'><img className='UserIcon' src={require("./component/DB/member1.jpg")}></img></a>
          <a href='https://www.facebook.com/Phumin.Nutsu'><img className='UserIcon' src={require("./component/DB/member2.jpg")}></img></a>
          <a href='https://www.facebook.com/profile.php?id=100082066568788'><img className='UserIcon' src={require("./component/DB/member3.jpg")}></img></a>
        </div>
        <div className="foot"></div>
      </div>
      <div className="main">
        <div className='Graph'>
          {
            selected_plug === "show" ?
              <div className="side" onClick={toggle_plug}>
                <h5 id='Tag'>Plug No.1</h5>
                <Line className='Dat' data={data} options={option}></Line>
              </div> : 
              <div className="side" onClick={toggle_plug}>
                <h5 id='Tag'>Plug No.2</h5>
                <Line className='Dat' data={data2} options={option}></Line>
              </div>
          } 
          <div className='side' onClick={toggle_vol}>
            <h5 id='Tag'>Voltmeter</h5>
            <Line className='Dat' data={data3} options={option2}></Line>
          </div>
        </div>
        <div className="table-overview">
          {
            selected === "show" ? table_vol() : 
            (selected_plug === "show" ? table_plug(backendData2) : table_plug(backendData3))
          }
        </div>
      </div>
    </header>
  )
}

export default App;