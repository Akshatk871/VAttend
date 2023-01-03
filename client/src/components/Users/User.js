import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import SpecificuserContext from '../../context/specificuser/specificuserContext';
import AlertContext from '../../context/alerts/alertContext';

const User = (props) => {
    const {_id, name, employee_id, admin, date} = props.user;

    let navigate = useNavigate();

    // This is for Alert Context
    const alertContext = useContext(AlertContext);
    const { updateAlert } = alertContext;

    const context= useContext(SpecificuserContext);
    const { updateUser, deleteUser } = context;

    const [state, setState] = useState({showModal: false});

    function handleClick(event){
      event.preventDefault();
      updateUser(_id);
      navigate('/specificprofile');
    }

    const handleDelete = async ()=>{
      await deleteUser(_id);
      props.fetchUsers();
      setState({showModal: false});
      updateAlert("Employee \""+ name +" \"deleted successfully", "warning");
    }

    const handleCloseModal = ()=>{
      setState({showModal: false});
    }

    const toggleModal = ()=>{
      setState({showModal: !state.showModal});
    }

  return (
    <>
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
              <span onClick={toggleModal}>
            <i className="fa-solid fa-trash fa-lg"></i>
            </span>
            </td>
          </tr>
          <div>
        {state.showModal && (
          <div className="">
          <div className="modal-body">
            <div>Are you sure you want to delete the employee "{name}"?</div>
            <button className="btn btn-primary" onClick={handleDelete}>Yes</button>
            <button className="btn btn-secondary mx-2" onClick={handleCloseModal}>No</button>
          </div>
        </div>
        )}
      </div>
        </>
  )
}

export default User