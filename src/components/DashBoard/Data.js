import React,{useState, useEffect} from 'react'
import View from './View';
import { v4 as uuidv4 } from 'uuid';

// getting the values of local storage
const dataLS=()=>{
  const data = localStorage.getItem('Users');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

function Data()  {

  const [users, setUsers]=useState(dataLS());

  const [name, setName]=useState('');
  const [gender, setGender]=useState('');
  const [newUser, setNewUser] = useState({
     hobbies:[]
});


  const checkList = [" Singing", " Cricket", " Guitar", " Dancing"]; 
  const onChangeHobby = (e) =>{

    const { name, value, checked } = e.target;
    const {hobbies} = newUser;
    if (checked)
    {
        hobbies.push(value);
    }
    else{
        const index = hobbies.indexOf(value)
        hobbies.splice(index,1);
    }
    setNewUser({...newUser,[name]: hobbies})
}
// console.log("ppp", newUser.hobbies);


  const handleSubmit=(e)=>{
    e.preventDefault();
    let hobb = newUser.hobbies.toString()
    console.log("aaaaa", hobb)
    let user={
      id: uuidv4(),
      name,
      gender,
      hobb,
    }
    setUsers([...users,user]);
    setName('');
    setGender('');
    setNewUser('');

    console.log("aa", newUser)
    window.location.reload()
  }

  const delUser=(id)=>{
    const filterUser=users.filter((element,index)=>{
      return element.id !== id
    })
    setUsers(filterUser);
  }

  useEffect(()=>{
    localStorage.setItem('Users',JSON.stringify(users));
  },[users])

  return (
    <div className='wrapper'>
      <h1>Users</h1>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setName(e.target.value)} value={name}></input>
            <br></br>
                    <div>Gender</div>
                <input
                    type="radio"
                    name="gender"
                    id ="radio1"
                    value="Male"
                    onChange={(e)=>setGender(e.target.value)}   
                                 />
                 <label className="form-check-label">
                    Male
                </label><br/>
                 <input
                    type="radio"
                    name="gender"
                    id ="radio1"
                    value="Female"
                    onChange={(e)=>setGender(e.target.value)}
                                    />
                <label className="form-check-label" >
                    Female
                </label>
            <br></br>
            <label>Hobbies</label>            
              {checkList.map((item, index) => (
                        <div key={index}>
                            <input name="hobbies" value={item} type="checkbox"
                            onChange = {onChangeHobby}
                            />
                            <span>{item}</span>
                            
                        </div>
                        ))}
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {users.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>gender</th>
                    <th>Hobbies</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View users={users} delUser={delUser}/>
                </tbody>
              </table>
            </div>
          </>}
        </div>

      </div>
    </div>
  )
}

export default Data