import './RoadTypeTable.css'

import React from 'react'

function RoadTypeTable() {
  return (
    <div className="frllrtt">
      <p>Road Length (m) of Municipalities by Road Classification</p>
      <table>
        <thead>
          <tr>
            <th className="text-left">Municipalities</th>
            <th className="text-right">National Road</th>
            <th className="text-right">Provincial Road</th>
            <th className="text-right">Municipal Road</th>
            <th className="text-right">Barangay Road</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-blue">Aglipay</td>
            <td className="text-right">38,915.719</td>
            <td className="text-right">68,366.116</td>
            <td className="text-right">3,759.191</td>
            <td className="text-right">198,721.290</td>
          </tr>
          <tr>
            <td className="text-blue">Cabarroguis</td>
            <td className="text-right">7,776.589</td>
            <td className="text-right">76,693.704</td>
            <td className="text-right">7,100.055</td>
            <td className="text-right">206,526.446</td>
          </tr>
          <tr>
            <td className="text-blue">Diffun</td>
            <td className="text-right">12,326.692</td>
            <td className="text-right">107,826.232</td>
            <td className="text-right">39,712.232</td>
            <td className="text-right">231,923.628</td>
          </tr>
          <tr>
            <td className="text-blue">Maddela</td>
            <td className="text-right">37,633.226</td>
            <td className="text-right">37,145.445</td>
            <td className="text-right">3,257.372</td>
            <td className="text-right">117,325.646</td>
          </tr>
          <tr>
            <td className="text-blue">Nagtipunan</td>
            <td className="text-right">69,412.222</td>
            <td className="text-right">17,904.268</td>
            <td className="text-right">27,415.772</td>
            <td className="text-right">79,026.595</td>
          </tr>
          <tr>
            <td className="text-blue">Saguday</td>
            <td className="text-right">13,001.796</td>
            <td className="text-right">30,684.978</td>
            <td className="text-right">5,318.092</td>
            <td className="text-right">55,341.708</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RoadTypeTable
