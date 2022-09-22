import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

function View ({users,delUser}) {
    
    return users.map(user=>(
        
        <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.gender}</td>
            <td>{user.hobb}</td>
            <td className='delete-btn' onClick={()=>delUser(user.id)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}

export default View;