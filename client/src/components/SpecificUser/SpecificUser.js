import React, {useContext} from 'react';
import SpecificuserContext from '../../context/specificuser/specificuserContext';
import Profile from "../../components/Profile/Profile";

const SpecificUser = () => {

    // This is for Alert Context
    const context= useContext(SpecificuserContext);
    const {user} = context;
    console.log("ssss");
  return (
    <div>
        <Profile user={user} route='/api/admin/fetchuser'/>
    </div>
  )
}

export default SpecificUser