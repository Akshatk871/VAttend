import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import SpecificuserContext from '../../context/specificuser/specificuserContext';

const User = (props) => {
    const {_id, name, employee_id, admin, date} = props.user;

    let navigate = useNavigate();

    // This is for Alert Context
    const context= useContext(SpecificuserContext);
    const { updateUser, deleteUser } = context;

    function handleClick(event){
      event.preventDefault();
      updateUser(_id);
      navigate('/specificprofile');
    }

    const handleDelete = async ()=>{
      await deleteUser(_id);
      props.fetchUsers();
    }

  return (
        <tr className='user-row'>
            <td onClick={handleClick} className="name">
              <h6>
                {name}
              </h6>
            </td>
            <td>
              <h6>
                {employee_id}
              </h6>
            </td>
            <td>
              <h6>
                {(admin)?"YES":"NO"}
              </h6>
            </td>
            <td>
              <h6>
              {date.split("T")[0]}
              </h6>
            </td>
            <td>
              <span onClick={handleDelete}>
            <i className="fa-solid fa-trash fa-lg"></i>
            </span>
            </td>
          </tr>
        
  )
}

export default User