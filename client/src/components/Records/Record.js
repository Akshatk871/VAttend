import React from 'react'

const Record = (props) => {
    const {distance, date, present} = props.record;

  return (
        <tr className={present?"present":"absent"}>
            <td>
              <h6>
                {date.split("T")[1].split(".")[0]}
              </h6>
            </td>
            <td>
              <h6>
                {date.split("T")[0]}
              </h6>
            </td>
            <td>
              <h6>
                {(distance)?distance.toFixed(2)+"KM":""}
              </h6>
            </td>
            <td>
              <h6>
                {present?"Present":"Absent"}
              </h6>
            </td>
          </tr>
  )
}

export default Record